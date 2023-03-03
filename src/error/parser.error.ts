import { ValidationError } from 'joi'

export abstract class JoiError extends Error {
  protected validationError: ValidationError

  constructor(validationError: ValidationError) {
    const { details } = validationError
    super(JSON.stringify(details))

    this.validationError = validationError
  }
}

export class InvalidFtl extends JoiError {}

export class InvalidCountOption extends JoiError {}

export class InvalidCopyOption extends JoiError {}

export class InvalidPurgeOption extends JoiError {}

export class InvalidFilterLogic extends JoiError {}

export class InvalidTransformLogic extends JoiError {}
