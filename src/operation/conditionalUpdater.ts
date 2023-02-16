import { TransformationError } from '../error/operation'
import { validateConditionalUpdate } from '../parser/validation'
import { ConditionType, TransformationType } from '../type/operation'

type ConditionOperators = Record<ConditionType, (item: any) => boolean>
type TransformationOperators = Record<
  TransformationType,
  (baseItem: any, newValue?: any) => any
>

const conditionOperators: ConditionOperators = {
  is_null: (value) => value === null,
  is_non_empty_string: (value) => value !== '' && typeof value === 'string',
  is_empty_string: (value) => value === '',
}

const transformationOperators: TransformationOperators = {
  to_number: (baseItem) => {
    const newValue = Number(baseItem)
    if (isNaN(newValue)) {
      throw new TransformationError(
        `${baseItem} cannot be converted to a number`,
      )
    }
    return newValue
  },
  set_to: (baseItem, newValue) => newValue,
  set_undefined: () => undefined,
}

export const runConditionalUpdates = (
  items: Record<string, any>[],
  conditionalUpdatesDesc: string,
) => {
  const conditionalUpdatesObj = JSON.parse(conditionalUpdatesDesc)

  const { config: conditionalUpdateConfig } = validateConditionalUpdate(
    conditionalUpdatesObj,
  )

  return items.map((item) => {
    for (const conditionalUpdate of conditionalUpdateConfig) {
      const { attributeName, condition, transformation } = conditionalUpdate

      const { type: transformationType, value: transformationValue } =
        transformation

      const targetedItemValue = item[attributeName]

      if (targetedItemValue === undefined) {
        console.log(`Item ${attributeName} is not present`, {
          item: JSON.stringify(item),
        })
        continue
      }

      if (!isConditionRespected(targetedItemValue, condition)) {
        console.log(`Item ${attributeName} does not respect condition`, {
          item: JSON.stringify(item),
        })
        continue
      }

      console.log(
        `Item "${attributeName}" respects condition, apply transformation`,
        {
          item: JSON.stringify(item),
          transformation: JSON.stringify(transformation),
        },
      )

      item[attributeName] = applyTransformation(
        targetedItemValue,
        transformationValue,
        transformationType,
      )
    }

    return item
  })
}

const isConditionRespected = (value: any, type?: ConditionType) => {
  if (type == undefined) {
    console.log('No condition set, nothing to check')
    return true
  }

  console.log(`Condition type is "${type}" and value to check is "${value}"`)

  return conditionOperators[type](value)
}

const applyTransformation = (item: any, value: any, type: TransformationType) =>
  transformationOperators[type](item, value)
