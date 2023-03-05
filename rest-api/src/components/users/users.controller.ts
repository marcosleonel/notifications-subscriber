import type { Request, Response } from 'express'
import { IUsersController, IUserUseCases, UserData } from './users.types';
import UsersUseCases from './users.useCases';
import UsersRepository from './users.repository';

class UsersController implements IUsersController {
  readonly useCases: IUserUseCases
  readonly logger

  constructor(logger) {
    this.logger = logger
    this.useCases = new UsersUseCases(new UsersRepository())
  }

  async create (req: Request, res: Response): Promise<Response> {
    if (!req.body) {
      return res.status(400).json({ message: 'body is required' })
    }

    try {
      const result = await this.useCases.addUser(req.body as UserData)

      if (result.error) throw new Error(`${result.error}`)

      return res.status(201).json({ success: true, message: 'User created'})
    } catch (error: unknown) {
      this.logger.error(`[UsersController.create] error: ${error}`)
      return res.status(500).json({ message: 'An internal error occured' })
    }
  }

  async getByCategory (req: Request, res: Response): Promise<Response> {
    if (!req.params.category) {
      return res.status(400).json({ message: 'body is required' })
    }

    try {
      const result = await this.useCases.getUsersByCategory(req.params.category)

      if (result.error) throw new Error(`${result.error}`)

      return res.status(200).json(result)
    } catch (error: unknown) {
      this.logger.error(`[UsersController.getAll]: ${error}`)
      return res.status(500).json({ message: 'An internal error occured' })
    }
  }
}

export default UsersController