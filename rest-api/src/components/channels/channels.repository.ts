import { InsertResult } from 'typeorm';

import { dataSource } from '../../db';
import { channelSchema } from './channels.schema';
import {
  IChannelsRepository,
  ChannelData,
  ChannelsRepositoryResults,
} from './channels.types';

class ChannelsRepository implements IChannelsRepository {
  async create (channelData: ChannelData): Promise<ChannelsRepositoryResults> {
    try {
      const channelInserted: InsertResult = await dataSource
        .createQueryBuilder()
        .insert()
        .into(channelSchema)
        .values([{ name: channelData.name as string }])
        .execute()
      const success: boolean = !!channelInserted.identifiers

      if (!success) throw new Error('[ChannelsRepository.create] Unable to create channel')

      return {
        success,
        data: channelInserted.identifiers
      }
    } catch (error: unknown) {
      return {
        success: false,
        data: null,
        error
      }
    }
  }

  async getAll (): Promise<ChannelsRepositoryResults> {
    try {
      const channelsFound = await dataSource
        .getRepository(channelSchema)
        .createQueryBuilder('channels')
        .getMany()
      const success: boolean = !!channelsFound

      if (!success) throw new Error('[ChannelsRepository.getAll] Unable to get the list of channels')

      return {
        success,
        data: channelsFound
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

export default ChannelsRepository