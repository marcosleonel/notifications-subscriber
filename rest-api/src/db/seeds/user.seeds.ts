import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { UserModel } from '../../components/users/users.model'
import { Category } from '../../components/categories/categories.model'
import { ChannelModel } from '../../components/channels/channels.model'

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        _factoryManager: SeederFactoryManager
    ): Promise<any> {
        const categoriesRepository =  await dataSource
            .getRepository(Category)
            .createQueryBuilder()
            .getMany()
        const channelsRepository =  await dataSource
            .getRepository(ChannelModel)
            .createQueryBuilder()
            .getMany()

        const usersRepository = await dataSource.getRepository(UserModel)
        await usersRepository
            .createQueryBuilder()
            .insert()
            .values([
                {
                    name: 'Caleb',
                    phoneNumber: '+01 (01) 10101-0101',
                    email: 'caleb.barrows@gmail.com',
                    subscribed: [...channelsRepository],
                    channels: [...categoriesRepository],
                },
                {
                    name: 'Caleb',
                    phoneNumber: '+02 (01) 10101-0102',
                    email: 'caleb.barrows@gmail.com',
                    subscribed: [...channelsRepository.slice(0,1)],
                    channels: [...categoriesRepository.slice(0,1)],
                },
                {
                    name: 'Caleb',
                    phoneNumber: '+03 (01) 10101-0103',
                    email: 'caleb.barrows@gmail.com',
                    subscribed: [channelsRepository.pop()],
                    channels: [categoriesRepository.pop()],
                },
            ])
            .orUpdate(['name'])
            .execute()
    }
}