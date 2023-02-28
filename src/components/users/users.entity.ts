import { UserData } from './users.types';

class Users {
  readonly name: string
  readonly email: string
  readonly phoneNumber: string

  constructor (userData: UserData) {
    this.name = userData.name
    this.email = userData.email
    this.phoneNumber = userData.phoneNumber
    Object.freeze(this)
  }

  validate () {
    const emailRegex = /^[^@\s]+@[^@\s.]+.[^@\s.]+$/
    const phoneNumberRegEx = /^\+?([0-9]{2})\)?[-\s\.]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3,5}[-\s\.]?[0-9]{4,6}$/im
    const isNameNotValid = this.name.length < 2 || this.name.length > 100
    const isEmailNotValid = !(emailRegex.test(this.email))
    const isPhoneNumberNotValid = !(phoneNumberRegEx.test(this.phoneNumber))

    const errors: Object[] = []

    if (isNameNotValid) {
      errors.push({ message: 'Name must have between 2 and 100 characters' })
    }

    if (isEmailNotValid) {
      errors.push({ message: 'E-mail is not in a valid format (ex: email@email.com)' })
    }

    if (isPhoneNumberNotValid) {
      errors.push({ message: 'Password must contain at least 8 characters' })
    }

    return {
      success: !(errors.length > 0),
      errors: errors.toString(),
      data: {
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
      }
    }
  }
}

export default Users
