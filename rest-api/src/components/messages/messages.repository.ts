import { InsertResult } from 'typeorm'

import { dataSource } from '../../db'
import { MessageModel } from './messages.model'
import { IMessagesRepository, MessageData, MessagesRepositoryResults } from './messages.types'

class MessagesRepository implements IMessagesRepository {
  async create (messageData: MessageData): Promise<MessagesRepositoryResults> {
    try {
      const messageInserted: InsertResult = await dataSource
        .createQueryBuilder()
        .insert()
        .into(MessageModel)
        .values([{ text: messageData.text as string }])
        .execute()
      const success: boolean = !!messageInserted.identifiers

      if (!success) throw new Error('[MessagesRepository.create] Unable to create message')

      return {
        success,
        data: messageInserted.identifiers
      }
    } catch (error: unknown) {
      return {
        success: false,
        data: null,
        error
      }
    }
  }

  async getAll (): Promise<MessagesRepositoryResults> {
    try {
      const messagesFound = await dataSource
        .getRepository(MessageModel)
        .createQueryBuilder('messages')
        .getMany()
      const success: boolean = !!messagesFound

      if (!success) throw new Error('[MessagesRepository.getAll] Unable to get the list of messages')

      return {
        success,
        data: messagesFound
      }
    } catch (error: unknown) {
      return {
        success: false,
        data: null,
        error
      }
    }
  }
}

export default MessagesRepository