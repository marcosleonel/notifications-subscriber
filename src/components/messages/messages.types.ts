import type { Request, Response } from 'express'

export type MessageData = {
  id?: string | undefined | unknown
  text: string
  category: string
  createdAt?: string
  updatedAt?: string
}

export type MessagesRepositoryResults = {
  success: boolean,
  data: Object | Object[] | MessageData | null
  error?: unknown | null 
}

export interface IMessagesRepository {
  create: (data: MessageData) => Promise<MessagesRepositoryResults>
  getAll: () => Promise<MessagesRepositoryResults>
}

export interface IMessagesUseCases {
  readonly messageRepository: IMessagesRepository
  addMessage: (data: MessageData) => Promise<MessagesRepositoryResults>
  getAllMessages: () => Promise<MessagesRepositoryResults>
}

export interface IMessageController {
  create: (req: Request, res: Response) => Promise<Response>
  getAll: (_: Request, res: Response) => Promise<Response>
}