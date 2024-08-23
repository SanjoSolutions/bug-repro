import { type ClientSchema, a, defineData } from '@aws-amplify/backend'
import { retrieveOrganization } from './retrieve-organization/resource.js'

const schema = a
  .schema({
    Organization: a
      .model({
        id: a.id().required(),
        owner: a.string().required(),
        members: a.hasMany('OrganizationMember', 'organizationID'),
      })
      .authorization(allow => [allow.owner().to([])]),
    OrganizationMember: a
      .model({
        owner: a.string().required(),
        organizationID: a.id(),
        organization: a.belongsTo('Organization', 'organizationID'),
      })
      .secondaryIndexes(index => [index('owner')])
      .authorization(allow => [allow.owner().to([])]),
    retrieveOrganization: a
      .query()
      .returns(a.ref('Organization'))
      .handler(a.handler.function(retrieveOrganization))
      .authorization(allow => [allow.guest()]),
  })
  .authorization(allow => [allow.resource(retrieveOrganization)])

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
})
