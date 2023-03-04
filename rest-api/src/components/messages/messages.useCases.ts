import Messages from './messages.entity'
import { ICategoriesRepository } from '../categories/categories.types'
import {
  IMessagesUseCases,
  IMessagesRepository,
  MessagesRepositoryResults,
  MessageData,
} from './messages.types'

class MessagesUseCases implements IMessagesUseCases {
  readonly categoryRepository: ICategoriesRepository
  readonly messageRepository: IMessagesRepository

  constructor(messageRepository: IMessagesRepository, categoryRepository: ICategoriesRepository) {
    this.messageRepository = messageRepository
    this.categoryRepository = categoryRepository
  }

  async addMessage (messageData: MessageData): Promise<MessagesRepositoryResults> {
    const categoriesFound = await this.categoryRepository.getAll()
    const categories = categoriesFound.data?.length
      ? categoriesFound.data.map((category) => category.name)
      : []
    const newMessage = new Messages(messageData, categories)
    const validation = newMessage.validate()

    if (validation.errors && validation.errors.length) return validation

    try {
      const { data, error, success } = await this.messageRepository.create(messageData)

      if (!success) throw new Error(`[MessagesUseCases.addChannel] Unable to add category: ${error}`)

      return { success, data }
    } catch (error: unknown) {
      return {
        success: false,
        error,
        data: null
      }
    }
  }

  async getAllMessages (): Promise<MessagesRepositoryResults> {
    try {
      const { data, error, success } = await this.messageRepository.getAll()

      if (!success) throw new Error(` [MessagesUseCases.getAllChannels] Unable to get Channels: ${error}`)

      return { success, data }
    } catch (error: unknown) {
      return {
        success: false,
        data: null,
        error
      }
    }
  }
}

export default MessagesUseCases
