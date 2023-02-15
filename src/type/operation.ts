export const conditionTypes = [
  'is_null',
  'is_non_empty_string',
  'is_empty_string',
] as const
export const transformationTypes = [
  'to_number',
  'set_to',
  'set_undefined',
] as const

export type ConditionType = (typeof conditionTypes)[number]
export type TransformationType = (typeof transformationTypes)[number]

export interface ConditionalUpdate {
  attributeName: string
  condition?: ConditionType
  transformation: {
    type: TransformationType
    value: any
  }
}

export interface ConditionalUpdateConfig {
  config: ConditionalUpdate[]
}

export interface Arguments {
  fromTable: string
  toTable: string
  region: string
  conditionalUpdates?: string
}
