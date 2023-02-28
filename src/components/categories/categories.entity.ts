import { CategoryData } from "./categories.types"

class Categories {
  readonly name: string

  constructor (categoryData: CategoryData) {
    this.name = categoryData.name
    Object.freeze(this)
  }

  validate () {
    const isNameValid =  this.name.length >= 2 && this.name.length <= 100

    return {
      success: isNameValid,
      errors: isNameValid ? null : 'Name must have between 2 and 100 characters',
      data: { name: this.name },
    }
  }
}

export default Categories
