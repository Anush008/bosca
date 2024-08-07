/*
 * Copyright 2024 Sowers, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { fastify } from 'fastify'
import { fastifyConnectPlugin } from '@connectrpc/connect-fastify'
import { newLoggingInterceptor } from '@bosca/common'
import { ProcessBibleActivity } from './activities/bible/process'
import { DefaultDownloader } from './util/downloader'
import { Activity } from '@bosca/workflow-activities-api'
import { ProcessTraitsActivity } from './activities/metadata/traits/process'
import { DeleteBibleActivity } from './activities/bible/delete'
import { TransitionToActivity } from './activities/metadata/transition_to'
import { getConfiguration } from './configuration'
import { CreateVerseJsonTable } from './activities/bible/book/verse_table'
import { CreateVerses } from './activities/bible/book/verse_create'
import { PromptActivity } from './activities/ai/prompt'
import { ChildWorkflow } from './activities/metadata/child_workflow'
import { ConnectionOptions, QueueEvents, WaitingChildrenError, Worker } from 'bullmq'
import { WorkflowJob } from '@bosca/protobufs'
import { CreatePendingEmbeddingsFromJsonTable } from './activities/ai/create_pending_embeddings_json'
import { CreateTextEmbeddings } from './activities/ai/create_text_embeddings'
import { CreatePendingEmbeddingsIndex } from './activities/ai/create_pending_embeddings_index'
import { IndexText } from './activities/metadata/text'
import { logger } from '@bosca/common/lib/logger'
import { Job } from 'bullmq/dist/esm/classes/job'
import { jobStartedCount, jobErrorCount, jobFinishedCount, jobAddedCount, jobFailedCount, workerCount } from './metrics'
import routes from './routes'

const downloader = new DefaultDownloader()

function getAvailableActivities(): { [id: string]: Activity } {
  const activities = [
    new ProcessTraitsActivity(),
    new ProcessBibleActivity(downloader),
    new DeleteBibleActivity(downloader),
    new CreateVerseJsonTable(downloader),
    new CreateVerses(downloader),
    new TransitionToActivity(),
    new PromptActivity(),
    new ChildWorkflow(),
    new CreatePendingEmbeddingsFromJsonTable(),
    new CreatePendingEmbeddingsIndex(),
    new CreateTextEmbeddings(),
    new IndexText(),
  ]
  const activitiesById: { [id: string]: Activity } = {}
  for (const activity of activities) {
    activitiesById[activity.id] = activity
  }
  return activitiesById
}

async function runJob(job: Job, definition: WorkflowJob, activities: { [id: string]: Activity }): Promise<any> {
  if (!definition.activity) return
  const activity = activities[definition.activity.activityId]
  if (!activity) {
    throw new Error('activity not found: ' + definition.activity.activityId)
  }
  const executor = activity.newJobExecutor(job, definition)
  try {
    const result = await executor.execute()
    logger.trace({ jobId: job.id, jobName: job.name }, 'finished job')
    return result
  } catch (e) {
    if (e instanceof WaitingChildrenError) {
      logger.trace({ jobId: job.id, jobName: job.name }, 'job waiting on children')
    } else {
      logger.error({ jobId: job.id, jobName: job.name, error: e }, 'error running job')
    }
    throw e
  }
}

async function main() {
  const configuration = getConfiguration()
  const activities = getAvailableActivities()

  const connection: ConnectionOptions = {
    host: process.env.BOSCA_REDIS_HOST!,
    port: parseInt(process.env.BOSCA_REDIS_PORT!),
  }

  for (const queueConfigurationId in configuration.queues) {
    const queueConfiguration = configuration.queues[queueConfigurationId]
    const worker = new Worker(
      queueConfigurationId,
      async (job) => {
        logger.trace({ jobId: job.id, jobName: job.name }, 'running job')
        switch (job.data.type) {
          case 'job': {
            jobStartedCount.add(1)
            const definition = WorkflowJob.fromJson(job.data.job)
            return await runJob(job, definition, activities)
          }
          case 'workflow':
            break
        }
      },
      {
        connection: connection,
        concurrency: queueConfiguration.maxConcurrency,
        stalledInterval: 60000,
        lockDuration: 60000,
        maxStalledCount: 50,
      },
    )
    worker.on('completed', (job) => {
      if (job.data.type === 'job') {
        jobFinishedCount.add(1)
      }
      logger.trace({ jobId: job.id }, 'job completed')
    })
    worker.on('failed', (job, err) => {
      jobFailedCount.add(1)
      logger.error({ jobId: job?.id, error: err }, 'job failed')
    })

    const events = new QueueEvents(queueConfigurationId, { connection })
    events.on('added', async (job) => {
      jobAddedCount.add(1)
      logger.trace({ jobId: job.jobId, jobName: job.name }, 'job added')
    })
    events.on('error', async (error) => {
      if (error instanceof WaitingChildrenError) {
        logger.trace('job waiting on children')
      } else {
        jobErrorCount.add(1)
        logger.error({ error }, 'job error')
      }
    })

    workerCount.add(1)
    logger.info({ queue: queueConfigurationId, concurrency: queueConfiguration.maxConcurrency }, 'worker started')
  }
  logger.info('running...')

  process.on('SIGTERM', () => {
    workerCount.add(-1)
  })

  const server = fastify({
    http2: true,
  })
  await server.register(fastifyConnectPlugin, {
    routes,
    interceptors: [newLoggingInterceptor()],
  })
  await server.listen({ host: '0.0.0.0', port: 7800 })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
