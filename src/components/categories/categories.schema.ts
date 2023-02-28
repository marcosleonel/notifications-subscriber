import { EntitySchema, EntitySchemaOptions } from 'typeorm'

import { CategoryData } from './categories.types'

export const categorySchema = new EntitySchema({
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
      inverseSide: 'categories',
    },
  }
} as EntitySchemaOptions<CategoryData>)
