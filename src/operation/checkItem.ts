import { ConditionType } from '../type/operation'

type ConditionOperators = Record<
  ConditionType,
  (leftOperator: any, rightOperator?: any) => boolean
>

const conditionOperators: ConditionOperators = {
  is_null: (leftOperator) => leftOperator === null,
  is_non_empty_string: (leftOperator) =>
    leftOperator !== '' && typeof leftOperator === 'string',
  is_empty_string: (leftOperator) => leftOperator === '',
  is_greater_than: (leftOperator, rightOperator) =>
    leftOperator > rightOperator,
}

export const checkItem = (
  type: ConditionType | undefined,
  leftOperator: any,
  rightOperator?: any,
): boolean => {
  if (type == undefined) {
    console.log('No condition set, nothing to check')
    return true
  }

  console.log(`Condition type is "${type}"`, {
    leftOperator,
    rightOperator,
  })

  const result = conditionOperators[type](leftOperator, rightOperator)

  console.log(`Result is "${result}"`)

  return result
}
