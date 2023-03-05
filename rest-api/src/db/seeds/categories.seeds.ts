import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Category } from '../../components/categories/categories.model'

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        _factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository =  dataSource.getRepository(Category)

        await repository
            .createQueryBuilder()
            .insert()
            .values([
                { name: 'Sports' },
                { name: 'Finance' },
                { name: 'Movies' },
            ])
            .orUpdate(['name'])
            .execute()
    }
}

