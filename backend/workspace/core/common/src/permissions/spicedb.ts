import {
  Permission,
  PermissionAction,
  PermissionObjectType,
  PermissionRelation,
  Permissions,
  PermissionSubjectType,
} from '@bosca/protobufs'
import { PermissionError, PermissionManager, SubjectType } from './permissions'
import { v1 } from '@authzed/authzed-node'
import { Subject } from '../authentication/subject_finder'
import * as grpc from '@grpc/grpc-js'

export class SpiceDBPermissionManager implements PermissionManager {
  private readonly client: v1.ZedPromiseClientInterface

  constructor(endpoint: string, token: string) {
    const client = v1.NewClient(
      token,
      endpoint,
      v1.ClientSecurity.INSECURE_PLAINTEXT_CREDENTIALS,
      1,
      grpc.ServerCredentials.createInsecure()
    )
    this.client = client.promises
  }

  async bulkCheck(
    subject: Subject,
    objectType: PermissionObjectType,
    resourceId: string[],
    action: PermissionAction
  ): Promise<string[]> {
    const subjectId = subject.id
    let subjectType = PermissionSubjectType.user
    if (subject.type == SubjectType.serviceaccount) {
      subjectType = PermissionSubjectType.service_account
    }
    const items: v1.CheckBulkPermissionsRequestItem[] = []
    for (const id of resourceId) {
      items.push(
        v1.CheckBulkPermissionsRequestItem.create({
          subject: v1.SubjectReference.create({
            object: v1.ObjectReference.create({
              objectType: this.getSubjectType(subjectType),
              objectId: subjectId,
            }),
          }),
          resource: v1.ObjectReference.create({
            objectType: this.getObjectType(objectType),
            objectId: id,
          }),
          permission: this.getAction(action),
        })
      )
    }
    const check = v1.CheckBulkPermissionsRequest.create({ items: items })
    if (subjectType == PermissionSubjectType.service_account) {
      check.consistency = v1.Consistency.create({
        requirement: {
          oneofKind: 'fullyConsistent',
          fullyConsistent: true,
        },
      })
    }
    const responses = await this.client.checkBulkPermissions(check)
    if (!responses) return []
    const ids: string[] = []
    for (let i = 0; i < responses.pairs.length; i++) {
      const pair = responses.pairs[i]
      const response = pair.response
      switch (response.oneofKind) {
        case 'item':
          // @ts-ignore
          const item = response.item
          if (
            item.permissionship == v1.CheckPermissionResponse_Permissionship.HAS_PERMISSION ||
            item.permissionship == v1.CheckPermissionResponse_Permissionship.CONDITIONAL_PERMISSION
          ) {
            ids.push(resourceId[i])
          } else if (item.permissionship == v1.CheckPermissionResponse_Permissionship.NO_PERMISSION) {
            console.log('permission check failed', resourceId[i], subjectId, this.getAction(action))
          }
          break
        case 'error':
          throw new PermissionError('check failed')
      }
    }
    return ids
  }

  async checkWithError(
    subject: Subject,
    objectType: PermissionObjectType,
    resourceId: string,
    action: PermissionAction
  ): Promise<void> {
    const subjectId = subject.id
    let subjectType = PermissionSubjectType.user
    if (subject.type === SubjectType.serviceaccount) {
      subjectType = PermissionSubjectType.service_account
    }
    return this.checkWithSubjectIdError(subjectType, subjectId, objectType, resourceId, action)
  }

  async checkWithSubjectIdError(
    subjectType: PermissionSubjectType,
    subjectId: string,
    objectType: PermissionObjectType,
    resourceId: string,
    action: PermissionAction
  ): Promise<void> {
    const request = v1.CheckPermissionRequest.create({
      resource: v1.ObjectReference.create({
        objectType: this.getObjectType(objectType),
        objectId: resourceId,
      }),
      subject: v1.SubjectReference.create({
        object: v1.ObjectReference.create({
          objectType: this.getSubjectType(subjectType),
          objectId: subjectId,
        }),
      }),
      permission: this.getAction(action),
    })
    if (subjectType === PermissionSubjectType.service_account) {
      request.consistency = v1.Consistency.create({
        requirement: {
          oneofKind: 'fullyConsistent',
          fullyConsistent: true,
        },
      })
    }
    try {
      const response = await this.client.checkPermission(request)
      if (!response) throw new PermissionError('no response')
      if (
        response.permissionship === v1.CheckPermissionResponse_Permissionship.NO_PERMISSION ||
        response.permissionship === v1.CheckPermissionResponse_Permissionship.UNSPECIFIED
      ) {
        console.error('permission check failed', resourceId, subjectId, this.getAction(action))
        throw new PermissionError('permission check failed')
      }
    } catch (e) {
      console.error('permission check failed', resourceId, subjectId, this.getAction(action))
      throw new PermissionError('permission check failed')
    }
  }

  async createRelationships(objectType: PermissionObjectType, permissions: Permission[]): Promise<void> {
    const updates: v1.RelationshipUpdate[] = []
    for (const permission of permissions) {
      updates.push(
        v1.RelationshipUpdate.create({
          operation: v1.RelationshipUpdate_Operation.CREATE,
          relationship: v1.Relationship.create({
            resource: v1.ObjectReference.create({
              objectType: this.getObjectType(objectType),
              objectId: permission.id,
            }),
            relation: this.getRelation(permission.relation),
            subject: v1.SubjectReference.create({
              object: v1.ObjectReference.create({
                objectType: this.getSubjectType(permission.subjectType),
                objectId: permission.subject,
              }),
            }),
          }),
        })
      )
    }
    await this.client.writeRelationships(v1.WriteRelationshipsRequest.create({ updates: updates }))
  }

  async createRelationship(objectType: PermissionObjectType, permission: Permission): Promise<void> {
    await this.createRelationships(objectType, [permission])
  }

  async getPermissions(objectType: PermissionObjectType, resourceId: string): Promise<Permissions> {
    const response = await this.client.readRelationships(
      v1.ReadRelationshipsRequest.create({
        relationshipFilter: {
          resourceType: this.getObjectType(objectType),
          optionalResourceId: resourceId,
        },
        optionalLimit: 0,
        consistency: v1.Consistency.create({ requirement: { oneofKind: 'fullyConsistent', fullyConsistent: true } }),
      })
    )

    const permissions = []
    for (const r of response) {
      const relationship = r.relationship
      if (!relationship || !relationship.subject || !relationship.subject.object) continue
      let action = PermissionRelation.viewers
      switch (relationship.relation) {
        case 'viewers':
          action = PermissionRelation.viewers
          break
        case 'discoverers':
          action = PermissionRelation.discoverers
          break
        case 'editors':
          action = PermissionRelation.editors
          break
        case 'managers':
          action = PermissionRelation.managers
          break
        case 'servicers':
          action = PermissionRelation.serviceaccounts
          break
        case 'owners':
          action = PermissionRelation.owners
          break
      }
      const permission = new Permission({
        id: relationship.subject.object.objectId,
        relation: action,
        subject: relationship.subject.object.objectId,
        subjectType: PermissionSubjectType.user,
      })
      switch (relationship.subject.object.objectType) {
        case SubjectType.user:
          permission.subjectType = PermissionSubjectType.user
          break
        case SubjectType.group:
          permission.subjectType = PermissionSubjectType.group
          break
        case SubjectType.serviceaccount:
          permission.subjectType = PermissionSubjectType.service_account
          break
      }
      permissions.push(permission)
    }

    return new Permissions({ permissions: permissions })
  }

  private getObjectType(objectType: PermissionObjectType): string {
    switch (objectType) {
      case PermissionObjectType.metadata_type:
        return 'metadata'
      case PermissionObjectType.collection_type:
        return 'collection'
      case PermissionObjectType.system_resource_type:
        return 'systemresource'
      case PermissionObjectType.workflow_type:
        return 'workflow'
      case PermissionObjectType.workflow_state_type:
        return 'workflowstate'
    }
    return ''
  }

  private getSubjectType(objectType: PermissionSubjectType): string {
    switch (objectType) {
      case PermissionSubjectType.user:
        return 'user'
      case PermissionSubjectType.group:
        return 'group'
      case PermissionSubjectType.service_account:
        return 'serviceaccount'
    }
    return ''
  }

  private getRelation(relation: PermissionRelation): string {
    switch (relation) {
      case PermissionRelation.viewers:
        return 'viewers'
      case PermissionRelation.discoverers:
        return 'discoverers'
      case PermissionRelation.editors:
        return 'editors'
      case PermissionRelation.managers:
        return 'managers'
      case PermissionRelation.serviceaccounts:
        return 'servicers'
      case PermissionRelation.owners:
        return 'owners'
    }
  }

  private getAction(relation: PermissionAction): string {
    switch (relation) {
      case PermissionAction.view:
        return 'view'
      case PermissionAction.list:
        return 'list'
      case PermissionAction.edit:
        return 'edit'
      case PermissionAction.manage:
        return 'manage'
      case PermissionAction.service:
        return 'service'
      case PermissionAction.delete:
        return 'delete'
    }
  }
}
