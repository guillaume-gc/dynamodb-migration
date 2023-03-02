import Joi from 'joi'

import { InvalidFtl } from '../../error/parser'
import {
  FilterLogic,
  Ftl,
  TransformLogic,
  conditionTypes,
  transformationTypes,
} from '../../type/operation'

const conditionJoiRule = Joi.object({
  type: Joi.string()
    .valid(...conditionTypes)
    .required(),
  rightOperator: Joi.any().optional(),
})

const transformationJoiRule = Joi.object({
  type: Joi.string()
    .valid(...transformationTypes)
    .required(),
  value: Joi.any().required(),
})

const filterJoiRule = Joi.object({
  attributeName: Joi.string().required(),
  condition: conditionJoiRule.optional(),
})

const transformJoiRule = Joi.object({
  attributeName: Joi.string().required(),
  condition: conditionJoiRule.optional(),
  transformation: transformationJoiRule.optional(),
})

export const validateFtl = (ftl: any) => {
  const joiRule = Joi.object({
    filters: Joi.array().items(filterJoiRule).optional(),
    transforms: Joi.array().items(transformJoiRule).optional(),
  })

  const joiValidation = joiRule.validate(ftl)

  const { error } = joiValidation

  if (error) {
    throw new InvalidFtl(error)
  }

  return ftl as Ftl
}

export const validateFilterLogic = (filterLogic: any) => {
  const joiRule = Joi.object({
    filters: Joi.array().items(filterJoiRule).optional(),
  })

  const joiValidation = joiRule.validate(filterLogic)

  const { error } = joiValidation

  if (error) {
    throw new InvalidFtl(error)
  }

  return filterLogic as FilterLogic
}

export const validateTransformLogic = (transformLogic: any) => {
  const joiRule = Joi.object({
    transforms: Joi.array().items(transformJoiRule).optional(),
  })

  const joiValidation = joiRule.validate(transformLogic)

  const { error } = joiValidation

  if (error) {
    throw new InvalidFtl(error)
  }

  return transformLogic as TransformLogic
}
