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
    name: { 
      type: 'varchar',
      nullable: false,
      unique: false,
      length: 255,
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
    messages: {
      type: 'many-to-many',
      target: 'messages',
      cascade: false,
    },
    subscribed: {
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
