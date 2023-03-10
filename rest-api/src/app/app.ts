import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import logger from '../logger'
import messagesRouter from '../components/messages/messages.routes'
import channelsRouter from '../components/channels/channels.routes'
import usersRouter from '../components/users/users.routes'
import categoriesRouter from '../components/categories/categories.routes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

const apiVersion1 = '/api/v1'
app.use(apiVersion1, messagesRouter)
app.use(apiVersion1, channelsRouter)
app.use(apiVersion1, usersRouter)
app.use(apiVersion1, categoriesRouter)

app.use((err, _req, res, _next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send({ message: err.message });
    logger.error( `[app]: ${err}`)
    logger.error(err.stack)

    return;
  }

  res.status(404).json({ message: 'This route does not exist.' })
})

app.get('/healthy', (_, res) => {
  res.json('HEALTHY')
})

export default app
