import Messages from './messages.entity'
import {
  IMessagesUseCases,
  IMessagesRepository,
  MessagesRepositoryResults,
  MessageData,
} from './messages.types';

class MessagesUseCases implements IMessagesUseCases {
  readonly messageRepository: IMessagesRepository

  constructor(repository: IMessagesRepository) {
    this.messageRepository = repository
  }

  async addMessage (messageData: MessageData): Promise<MessagesRepositoryResults> {
    const newMessage = new Messages(messageData, []) // TODO: get categories and pass here
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
