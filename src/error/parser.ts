import { ValidationError } from 'joi'

export class InvalidFtl extends Error {
  private validationError: ValidationError

  constructor(validationError: ValidationError) {
    const { details } = validationError
    super(JSON.stringify(details))

    this.validationError = validationError
  }
}
