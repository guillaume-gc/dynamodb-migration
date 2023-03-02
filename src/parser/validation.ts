import Joi from 'joi'

import { InvalidConditionalUpdates } from '../error/parser'
import {
  ConditionalUpdateConfig,
  conditionTypes,
  transformationTypes,
} from '../type/operation'

export const validateFilterMap = (transformObject: any) => {
  const joiRule = Joi.object({
    config: Joi.array()
      .items(
        Joi.object({
          attributeName: Joi.string().required(),
          condition: Joi.object({
            type: Joi.string()
              .valid(...conditionTypes)
              .required(),
            rightOperator: Joi.any().optional(),
          }).optional(),
          transformation: Joi.object({
            type: Joi.string()
              .valid(...transformationTypes)
              .required(),
            value: Joi.any().optional(),
          }).optional(),
        }),
      )
      .required(),
  })

  const joiValidation = joiRule.validate(transformObject)

  const { error } = joiValidation

  if (error) {
    throw new InvalidConditionalUpdates(error)
  }

  return transformObject as ConditionalUpdateConfig
}
