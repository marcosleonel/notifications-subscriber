import cluster from 'cluster'
import os from 'os'
import { Server } from 'http'
import app from './app/app'
import logger from './logger'
// TODO: add 'compression'  (gzip)
// TODO: add montoring tool (prometheus)

const port: number = Number(process.env.PORT ?? 8080)
const host: string = process.env.HOST ?? 'localhost'
let server: Server

if (cluster.isPrimary) {
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
      // TODO: Close database conection
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
