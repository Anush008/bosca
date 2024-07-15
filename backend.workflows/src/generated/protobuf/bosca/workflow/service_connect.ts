//
// Copyright 2024 Sowers, LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts,import_extension=none"
// @generated from file bosca/workflow/service.proto (package bosca.workflow, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Empty } from "../empty_pb";
import { Model, Models } from "./models_pb";
import { MethodKind } from "@bufbuild/protobuf";
import { IdRequest, IdsResponse } from "../requests_pb";
import { Prompt, Prompts } from "./prompts_pb";
import { StorageSystem, StorageSystemModels, StorageSystems } from "./storage_systems_pb";
import { Workflow, Workflows, WorkflowState, WorkflowStates } from "./workflows_pb";
import { WorkflowActivities, WorkflowActivityIdRequest, WorkflowActivityPrompts, WorkflowActivityStorageSystems } from "./activities_pb";
import { BeginTransitionWorkflowRequest, CompleteTransitionWorkflowRequest } from "./transitions_pb";
import { FindAndWorkflowExecutionRequest, WorkflowActivityJob, WorkflowActivityJobRequest, WorkflowActivityJobStatus, WorkflowExecutionRequest, WorkflowExecutionResponse, WorkflowExecutionResponses } from "./execution_context_pb";

/**
 * @generated from service bosca.workflow.WorkflowService
 */
export const WorkflowService = {
  typeName: "bosca.workflow.WorkflowService",
  methods: {
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetModels
     */
    getModels: {
      name: "GetModels",
      I: Empty,
      O: Models,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetModel
     */
    getModel: {
      name: "GetModel",
      I: IdRequest,
      O: Model,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetPrompts
     */
    getPrompts: {
      name: "GetPrompts",
      I: Empty,
      O: Prompts,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetPrompt
     */
    getPrompt: {
      name: "GetPrompt",
      I: IdRequest,
      O: Prompt,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetStorageSystems
     */
    getStorageSystems: {
      name: "GetStorageSystems",
      I: Empty,
      O: StorageSystems,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetStorageSystem
     */
    getStorageSystem: {
      name: "GetStorageSystem",
      I: IdRequest,
      O: StorageSystem,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetStorageSystemModels
     */
    getStorageSystemModels: {
      name: "GetStorageSystemModels",
      I: IdRequest,
      O: StorageSystemModels,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetWorkflows
     */
    getWorkflows: {
      name: "GetWorkflows",
      I: Empty,
      O: Workflows,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetWorkflow
     */
    getWorkflow: {
      name: "GetWorkflow",
      I: IdRequest,
      O: Workflow,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetWorkflowState
     */
    getWorkflowState: {
      name: "GetWorkflowState",
      I: IdRequest,
      O: WorkflowState,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetWorkflowStates
     */
    getWorkflowStates: {
      name: "GetWorkflowStates",
      I: Empty,
      O: WorkflowStates,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetWorkflowActivities
     */
    getWorkflowActivities: {
      name: "GetWorkflowActivities",
      I: IdRequest,
      O: WorkflowActivities,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetWorkflowActivityStorageSystems
     */
    getWorkflowActivityStorageSystems: {
      name: "GetWorkflowActivityStorageSystems",
      I: WorkflowActivityIdRequest,
      O: WorkflowActivityStorageSystems,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetWorkflowActivityPrompts
     */
    getWorkflowActivityPrompts: {
      name: "GetWorkflowActivityPrompts",
      I: WorkflowActivityIdRequest,
      O: WorkflowActivityPrompts,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.BeginTransitionWorkflow
     */
    beginTransitionWorkflow: {
      name: "BeginTransitionWorkflow",
      I: BeginTransitionWorkflowRequest,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.CompleteTransitionWorkflow
     */
    completeTransitionWorkflow: {
      name: "CompleteTransitionWorkflow",
      I: CompleteTransitionWorkflowRequest,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.ExecuteWorkflow
     */
    executeWorkflow: {
      name: "ExecuteWorkflow",
      I: WorkflowExecutionRequest,
      O: WorkflowExecutionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.FindAndExecuteWorkflow
     */
    findAndExecuteWorkflow: {
      name: "FindAndExecuteWorkflow",
      I: FindAndWorkflowExecutionRequest,
      O: WorkflowExecutionResponses,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetWorkflowExecutionStatus
     */
    getWorkflowExecutionStatus: {
      name: "GetWorkflowExecutionStatus",
      I: IdRequest,
      O: WorkflowExecutionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetChildWorkflowExecutions
     */
    getChildWorkflowExecutions: {
      name: "GetChildWorkflowExecutions",
      I: IdRequest,
      O: IdsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.GetWorkflowActivityJobs
     */
    getWorkflowActivityJobs: {
      name: "GetWorkflowActivityJobs",
      I: WorkflowActivityJobRequest,
      O: WorkflowActivityJob,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * @generated from rpc bosca.workflow.WorkflowService.SetWorkflowActivityJobStatus
     */
    setWorkflowActivityJobStatus: {
      name: "SetWorkflowActivityJobStatus",
      I: WorkflowActivityJobStatus,
      O: Empty,
      kind: MethodKind.Unary,
    },
  }
} as const;

