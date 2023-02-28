import { EntitySchema, EntitySchemaOptions } from 'typeorm'

import { UserData } from './users.types'

export const userSchema = new EntitySchema({
  name: 'users',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      unique: true,
    },
    email: { 
      type: 'varchar',
      nullable: false,
      unique: true,
      length: 255,
    },
    phoneNumber: {
      name: 'phone_number',
      type: 'varchar',
      nullable: false,
      unique: true,
      length: 255,
    },
    subscribed: {
      name: 'subscribed',
      type: 'boolean',
      nullable: false,
      default: false
    },
    channels: {
      name: 'subscription_id',
      type: 'varchar',
      nullable: true,
      unique: true,
      length: 255
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp with time zone',
      createDate: true,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp with time zone',
      updateDate: true,
    }
  },
  relations: {
    notifications: {
      type: 'one-to-many',
      target: 'notifications',
      cascade: false,
      inverseSide: 'user'
    },
    categories: {
      type: 'many-to-many',
      target: 'categories',
      cascade: false,
    },
    channels: {
      type: 'many-to-many',
      target: 'channels',
      cascade: false,
    }
  }
} as EntitySchemaOptions<UserData>)
