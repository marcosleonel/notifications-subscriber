export type ChannelData = {
  id?: string | undefined | unknown
  name: string
  createdAt?: string
  updatedAt?: string
}

export type ChannelsRepositoryResults = {
  success: boolean,
  data: Object | Object[] | ChannelData | null
  error?: unknown | null
}

export interface IChannelsRepository {
  create: (data: ChannelData) => Promise<ChannelsRepositoryResults>
  getAll: () => Promise<ChannelsRepositoryResults>
}

export interface IChannelsUseCases {
  readonly channelRepository: IChannelsRepository
  addChannel: (data: ChannelData) => Promise<ChannelsRepositoryResults>
  getAllChannels: () => Promise<ChannelsRepositoryResults>
}