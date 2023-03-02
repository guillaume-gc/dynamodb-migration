export const conditionTypes = [
  'is_null',
  'is_non_empty_string',
  'is_empty_string',
  'is_greater_than',
] as const
export const transformationTypes = [
  'to_number',
  'set_to',
  'set_undefined',
] as const

export type ConditionType = (typeof conditionTypes)[number]
export type TransformationType = (typeof transformationTypes)[number]

export interface Transform {
  attributeName: string
  condition?: {
    type: ConditionType
    rightOperator: any
  }
  transformation?: {
    type: TransformationType
    value: any
  }
}

export interface Filter {
  attributeName: string
  condition?: {
    type: ConditionType
    rightOperator?: any
  }
}

export interface Ftl {
  transforms?: Transform[]
  filters?: Filter[]
}

export interface FilterLogic {
  filters?: Filter[]
}

export interface TransformLogic {
  transforms?: Transform[]
}
