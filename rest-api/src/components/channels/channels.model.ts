import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import { UserModel } from '../users/users.model'

@Entity()
export class ChannelModel {
  @PrimaryGeneratedColumn('uuid')
  id!: number

  @Column('varchar', { nullable: false, unique: false, length: 255 })
  name!: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt!: Date

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt!: Date

  @ManyToMany(() => UserModel, { cascade: true })
  @JoinTable()
  users?: UserModel[]
}
