import { MessageData } from './messages.types';
class Messages {
  readonly category: string
  readonly categoriesAvailable: string[]
  readonly text: string

  constructor (messageData: MessageData, categoriesAvailable: string[]) {
    this.text = messageData.text
    this.category = messageData.category
    this.categoriesAvailable = categoriesAvailable
    Object.freeze(this)
  }

  validate () {
    const isTextMessageValid =  this.text.length >= 2 && this.text.length <= 255
    const categoryExists = this.categoriesAvailable.includes(this.category)
    const success = isTextMessageValid && categoryExists

    return {
      success,
      errors: success ? null : 'Message must have between 2 and 255 characters',
      data: { text: this.text },
    }
  }
}

export default Messages
