import cluster from 'cluster'
import os from 'os'
import { Server } from 'http'
import 'reflect-metadata'
import app from './app/app'
import { dataSource } from './db'
import logger from './logger'

const port: number = Number(process.env.PORT ?? 8080)
const host: string = process.env.HOST ?? 'localhost'
let server: Server

if (cluster.isPrimary) {
  dataSource
    .initialize()
    .then(() => logger.info('Database has been initialized!'))
    .catch(error => logger.error('Error during database initialization: ', error))

  const numOfCpus = os.cpus().length

  for (let i = 0; i <= numOfCpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    logger.error(`Worker ${worker.process.pid} died`)
    cluster.fork()
  })
} else {
  server = app.listen(Number(process.env.PORT ?? 8080), '0.0.0.0', () => {
    logger.info(`The server on process ${process.pid} started at: http://${host}:${port}`)
  })
}

function handleUnhandledRejectionError (unhandledRejectionError: Error): void {
  logger.error(unhandledRejectionError.stack)
  process.exit(1)
}

function handleSigterm (): void {
  logger.info('SIGTERM signal received.')
  logger.info('Closing HTTP server...')

  server.close(async (): Promise<Promise<void>> => {
    logger.info('Closing the database connection...')

    try {
      await dataSource.destroy()
      logger.info('Database connection closed.')
    } catch (error) {
      logger.error('Error during database connection closing.')
    }

    logger.info('Closing HTTP server...')
    process.exit(0)
  })
}

process.on('unhandledRejection', handleUnhandledRejectionError)
process.on('SIGTERM', handleSigterm)
