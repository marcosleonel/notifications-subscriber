import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { channelSchema } from '../../components/channels/channels.schema'

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        _factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository =  dataSource.getRepository(channelSchema)

        await repository
          .createQueryBuilder()
          .insert()
          .values([
              { name: 'SMS' },
              { name: 'E-Mail' },
              { name: 'Push Notification' },
          ])
          .orUpdate(["name"])
          .execute()
    }
}