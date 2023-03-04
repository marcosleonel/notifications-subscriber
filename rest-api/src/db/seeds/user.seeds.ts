import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { userSchema } from '../../components/users/users.schema'
import { categorySchema } from '../../components/categories/categories.schema'
import { channelSchema } from '../../components/channels/channels.schema'
import Categories from '../../components/categories/categories.entity';

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        // TODO: Get the existing categories  and channels in the database to save them here
        // @see https://typeorm.io/many-to-many-relations#saving-many-to-many-relations
        const categoriesRepository =  await dataSource
            .getRepository(categorySchema)
            .createQueryBuilder()
            .getMany()
        const channelsRepository =  await dataSource
            .getRepository(channelSchema)
            .createQueryBuilder()
            .getMany()

        const usersRepository = await dataSource.getRepository(userSchema)
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
            .orUpdate(["name"])
            .execute()
    }
}