import Joi from 'joi'

import {
  InvalidCopyOption,
  InvalidCountOption,
  InvalidPurgeOption,
} from '../../error/parser.error'
import { CopyOptions, CountOptions, PurgeOptions } from '../../type/options.type'

export const validateCopyOptions = (copyOptions: any) => {
  const joiRule = Joi.object({
    fromTable: Joi.string().required(),
    toTable: Joi.string().required(),
    region: Joi.string().required(),
    ftl: Joi.string().optional(),
    delay: Joi.number().optional(),
  })

  const { error } = joiRule.validate(copyOptions)

  if (error) {
    throw new InvalidCopyOption(error)
  }

  return copyOptions as CopyOptions
}

export const validatePurgeOptions = (purgeOptions: any) => {
  const joiRule = Joi.object({
    targetTable: Joi.string().required(),
    region: Joi.string().required(),
    pk: Joi.string().required(),
    filter: Joi.string().optional(),
    sk: Joi.string().optional(),
    delay: Joi.number().optional(),
  })

  const { error } = joiRule.validate(purgeOptions)

  if (error) {
    throw new InvalidPurgeOption(error)
  }

  return purgeOptions as PurgeOptions
}

export const validationCountOptions = (countOptions: any) => {
  const joiRule = Joi.object({
    targetTable: Joi.string().required(),
    region: Joi.string().required(),
    filter: Joi.string().optional(),
    delay: Joi.number().optional(),
  })

  const { error } = joiRule.validate(countOptions)

  if (error) {
    throw new InvalidCountOption(error)
  }

  return countOptions as CountOptions
}
