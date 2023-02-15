import Joi from 'joi'

import { InvalidConditionalUpdates } from '../error/parser'
import {
  ConditionalUpdateConfig,
  conditionTypes,
  transformationTypes,
} from '../type/operation'

export const validateConditionalUpdate = (conditionalUpdates: any) => {
  const joiRule = Joi.object({
    config: Joi.array()
      .items(
        Joi.object({
          attributeName: Joi.string().required(),
          condition: Joi.string()
            .valid(...conditionTypes)
            .optional(),
          transformation: Joi.object({
            type: Joi.string()
              .valid(...transformationTypes)
              .required(),
            value: Joi.any().optional(),
          }),
        }),
      )
      .required(),
  })

  const joiValidation = joiRule.validate(conditionalUpdates)

  const { error } = joiValidation

  if (error) {
    throw new InvalidConditionalUpdates(error)
  }

  return conditionalUpdates as ConditionalUpdateConfig
}
