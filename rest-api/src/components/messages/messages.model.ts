import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Category } from '../categories/categories.model'
import { ChannelModel } from '../channels/channels.model'
import { UserModel } from '../users/users.model'

@Entity()
export class MessageModel {
  @PrimaryGeneratedColumn('uuid')
  id!: number

  @Column('varchar', { nullable: false, unique: false, length: 255 })
  text!: string

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt!: Date

  @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt!: Date

  @ManyToMany(() => UserModel, { cascade: true })
  @JoinTable()
  user!: UserModel

  @ManyToMany(() => Category, { cascade: false })
  @JoinTable()
  category?: Category

  @ManyToMany(() => ChannelModel, { cascade: false })
  @JoinTable()
  channel!: ChannelModel
}
