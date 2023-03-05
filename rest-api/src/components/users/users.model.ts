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
import { MessageModel } from '../messages/messages.model';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id!: number

  @Column('varchar', { nullable: false, unique: false, length: 255 })
  name!: string

  @Column('varchar', { nullable: false, unique: true, length: 100 })
  email!: string

  @Column('varchar', { name: 'phone_number', nullable: false, unique: true, length: 18 })
  phoneNumber!: string

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt!: Date

  @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt!: Date

  @ManyToMany(() => Category, { cascade: false })
  @JoinTable()
  subscribed?: Category[]

  @ManyToMany(() => ChannelModel, { cascade: false })
  @JoinTable()
  channels?: ChannelModel[]

  @ManyToMany(() => MessageModel, { cascade: false })
  @JoinTable()
  messages?: MessageModel[]
}
