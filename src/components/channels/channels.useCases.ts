import Users from './channels.entity'
import {
  ChannelData,
  IChannelsRepository,
  ChannelsRepositoryResults,
  IChannelsUseCases,
} from '../channels/channels.types';

class ChannelsUseCases implements IChannelsUseCases {
  readonly channelRepository: IChannelsRepository

  constructor(repository: IChannelsRepository) {
    this.channelRepository = repository
  }

  async addChannel (channelData: ChannelData): Promise<ChannelsRepositoryResults> {
    const newUser = new Users(channelData)
    const validation = newUser.validate()

    if (validation.errors && validation.errors.length) return validation

    try {
      const { data, error, success } = await this.channelRepository.create(channelData)

      if (!success) throw new Error(`[ChannelsUseCases.addChannel] Unable to add category: ${error}`)

      return { success, data }
    } catch (error: unknown) {
      return {
        success: false,
        error,
        data: null
      }
    }
  }

  async getAllChannels (): Promise<ChannelsRepositoryResults> {
    try {
      const { data, error, success } = await this.channelRepository.getAll()

      if (!success) throw new Error(` [ChannelsUseCases.getAllChannels] Unable to get Channels: ${error}`)

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

export default ChannelsUseCases
