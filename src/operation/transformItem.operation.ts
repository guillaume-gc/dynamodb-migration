import { TransformationError } from '../error/operation.error'
import { TransformationType } from '../type/operation.type'

type TransformOperations = Record<
  TransformationType,
  (baseValue: any, newValue?: any) => any
>

const transformationOperations: TransformOperations = {
  to_number: (baseValue) => {
    const newValue = Number(baseValue)
    if (isNaN(newValue)) {
      throw new TransformationError(
        `${baseValue} cannot be converted to a number`,
      )
    }
    return newValue
  },
  set_to: (baseValue, newValue) => newValue,
  set_undefined: () => undefined,
}

export const transformItemOperation = (
  type: TransformationType | undefined,
  baseValue: any,
  newValue?: any,
) => {
  if (type == undefined) {
    console.log('No transformation set, nothing to change')
    return baseValue
  }

  console.log(
    `Transformation type is "${type}", base value is ${baseValue} and new value is ${newValue}"`,
  )

  return transformationOperations[type](baseValue, newValue)
}
