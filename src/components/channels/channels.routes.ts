import { Router } from 'express'

import ChannelsController from './channels.controller'
import logger from '../../logger'

const channelsRouter = Router()
const channelsController = new ChannelsController(logger)

channelsRouter.post('./messages', channelsController.create)

export default channelsRouter
