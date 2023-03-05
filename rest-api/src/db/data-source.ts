import { DataSource, DataSourceOptions } from 'typeorm'
import dotenv from 'dotenv'
import { SeederOptions } from 'typeorm-extension'

const env = process.env.NODE_ENV ?? 'development'
const dbDict = { development: 'postgres', test: 'sqlite' }
const envFileDict = { development: '.env', test: '.env.test' }

dotenv.config({ path: envFileDict[env] ?? '.env' })

const options: DataSourceOptions & SeederOptions = {
  type: dbDict[env] ?? 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  entities: [__dirname + 'src/**/*/*.model.ts'],
  migrations: [__dirname + 'src/db/migrations/*.ts'],
  logging: true,
  synchronize: true,
  cache: true,
  seeds: [],
}

const dataSource = new DataSource(options)

export default dataSource
