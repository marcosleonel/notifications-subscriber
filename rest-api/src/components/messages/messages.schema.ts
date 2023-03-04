import { EntitySchema, EntitySchemaOptions } from 'typeorm'
import { MessageData } from './messages.types';

export const messageSchema = new EntitySchema({
  name: 'messages',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      unique: true,
    },
    text: { 
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
    users: {
      type: 'many-to-many',
      target: 'users',
      cascade: true,
    },
    categories: {
      type: 'many-to-many',
      target: 'categories',
      cascade: false,
    },
  }
} as EntitySchemaOptions<MessageData>)
