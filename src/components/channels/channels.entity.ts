import { ChannelData } from './channels.types'

class Channels {
  readonly name: string

  constructor (channelData: ChannelData) {
    this.name = channelData.name
    Object.freeze(this)
  }

  validate () {
    const isNameValid =  this.name.length >= 2 && this.name.length <= 50

    return {
      success: isNameValid,
      errors: isNameValid ? null : 'Name must have between 2 and 50 characters',
      data: { name: this.name },
    }
  }
}

export default Channels
