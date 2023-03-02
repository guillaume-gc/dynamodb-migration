import { TransformationError } from '../error/operation'
import { validateFilterMap } from '../parser/validation'
import { ConditionType, TransformationType } from '../type/operation'

type ConditionOperators = Record<
  ConditionType,
  (leftOperator: any, rightOperator?: any) => boolean
>
type TransformationOperators = Record<
  TransformationType,
  (baseValue: any, newValue?: any) => any
>

const conditionOperators: ConditionOperators = {
  is_null: (leftOperator) => leftOperator === null,
  is_non_empty_string: (leftOperator) =>
    leftOperator !== '' && typeof leftOperator === 'string',
  is_empty_string: (leftOperator) => leftOperator === '',
  is_greater_than: (leftOperator, rightOperator) =>
    leftOperator > rightOperator,
}

const transformationOperators: TransformationOperators = {
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

export const applyFilterMap = (
  items: Record<string, any>[],
  transformObjectStr: string,
) => {
  const transformObject = JSON.parse(transformObjectStr)

  const { config: filterMapConfig } = validateFilterMap(transformObject)

  return items.map((item) => {
    for (const configElement of filterMapConfig) {
      const { attributeName, condition, transformation } = configElement

      const targetedItemValue = item[attributeName]

      if (targetedItemValue === undefined) {
        console.log(`Item ${attributeName} is not present in this row`)
        continue
      }

      if (
        !isConditionRespected(
          condition?.type,
          targetedItemValue,
          condition?.rightOperator,
        )
      ) {
        console.log(`Item ${attributeName} does not respect condition`)
        continue
      }

      console.log(
        `Item "${attributeName}" respects condition, apply transformation`,
      )

      item[attributeName] = applyTransformation(
        transformation?.type,
        targetedItemValue,
        transformation?.value,
      )
    }

    return item
  })
}

const isConditionRespected = (
  type: ConditionType | undefined,
  leftOperator: any,
  rightOperator?: any,
) => {
  if (type == undefined) {
    console.log('No condition set, nothing to check')
    return true
  }

  console.log(`Condition type is "${type}"`, {
    leftOperator,
    rightOperator,
  })

  return conditionOperators[type](leftOperator, rightOperator)
}

const applyTransformation = (
  type: TransformationType | undefined,
  item: any,
  value?: any,
) => {
  if (type == undefined) {
    console.log('No transformation set, nothing to change')
    return item
  }

  console.log(
    `Transformation type is "${type}" , item is ${item} and value is ${value}"`,
  )

  transformationOperators[type](item, value)
}
