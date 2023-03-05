import { Router } from 'express'

import ChannelsController from './channels.controller'
import logger from '../../logger'

const channelsRouter = Router()
const channelsController = new ChannelsController(logger)

channelsRouter.get('/channels', channelsController.getAll)
channelsRouter.post('/channels', channelsController.create)

export default channelsRouter
