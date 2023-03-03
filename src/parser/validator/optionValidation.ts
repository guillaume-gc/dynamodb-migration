import Joi from 'joi'

import { InvalidCopyOption, InvalidCountOption } from '../../error/parser'
import { CopyOptions, CountOptions } from '../../type/options'

export const validateCopyOptions = (copyOptions: any) => {
  const joiRule = Joi.object({
    fromTable: Joi.string().required(),
    toTable: Joi.string().required(),
    region: Joi.string().required(),
    ftl: Joi.string().optional(),
    delay: Joi.number().optional(),
  })

  const joiValidation = joiRule.validate(copyOptions)

  const { error } = joiValidation

  if (error) {
    throw new InvalidCopyOption(error)
  }

  return copyOptions as CopyOptions
}

export const validationCountOptions = (countOptions: any) => {
  const joiRule = Joi.object({
    targetTable: Joi.string().required(),
    region: Joi.string().required(),
    filter: Joi.string().optional(),
    delay: Joi.number().optional(),
  })

  const joiValidation = joiRule.validate(countOptions)

  const { error } = joiValidation

  if (error) {
    throw new InvalidCountOption(error)
  }

  return countOptions as CountOptions
}
