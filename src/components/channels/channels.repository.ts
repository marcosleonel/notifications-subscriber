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
      const categoryInserted: InsertResult = await dataSource
        .createQueryBuilder()
        .insert()
        .into(channelSchema)
        .values([{ name: channelData.name as string }])
        .execute()
      const success: boolean = !!categoryInserted.identifiers

      if (!success) throw new Error('[ChannelsRepository.create] Unable to create channel')

      return {
        success,
        data: categoryInserted.identifiers
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
      const categoriesFound = await dataSource
        .getRepository(channelSchema)
        .createQueryBuilder('categories')
        .getMany()
      const success: boolean = !!categoriesFound

      if (!success) throw new Error('[ChannelsRepository.getAll] Unable to get the list of categories')
      
      return {
        success,
        data: categoriesFound
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