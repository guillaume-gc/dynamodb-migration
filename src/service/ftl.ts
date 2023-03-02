import { checkItem } from '../operation/checkItem'
import { transformItem } from '../operation/transformItem'
import {
  validateFilterLogic,
  validateFtl,
  validateTransformLogic,
} from '../parser/validator/commandValidation'
import { Filter, Transform } from '../type/operation'

export const applyFilterTransformLogic = (
  items: Record<string, any>[],
  ftl: string,
) => {
  const ftlObject = JSON.parse(ftl)

  const { transforms = [], filters = [] } = validateFtl(ftlObject)

  const filteredItems = applyFilter(items, filters)

  return applyTransform(filteredItems, transforms)
}

export const applyFilterLogic = (
  items: Record<string, any>[],
  filter: string,
) => {
  const filterObject = JSON.parse(filter)

  const { filters = [] } = validateFilterLogic(filterObject)

  return applyFilter(items, filters)
}

export const applyTransformLogic = (
  items: Record<string, any>[],
  filter: string,
) => {
  const transformObject = JSON.parse(filter)

  const { transforms = [] } = validateTransformLogic(transformObject)

  return applyTransform(items, transforms)
}

const applyFilter = (items: Record<string, any>[], filters: Filter[]) =>
  items.filter((item) =>
    filters.every((filter) => {
      const targetedItemValue = item[filter.attributeName]

      if (targetedItemValue === undefined) {
        console.log(`Item ${filter.attributeName} is not present in this row`)
        return true
      }

      return !checkItem(
        filter.condition?.type,
        item[filter.attributeName],
        filter.condition?.rightOperator,
      )
    }),
  )

const applyTransform = (
  items: Record<string, any>[],
  transforms: Transform[],
) => {
  return items.map((item) => {
    for (const transform of transforms) {
      const targetedItemValue = item[transform.attributeName]

      if (targetedItemValue === undefined) {
        console.log(
          `Item ${transform.attributeName} is not present in this row`,
        )
        continue
      }

      if (
        !checkItem(
          transform.condition?.type,
          targetedItemValue,
          transform.condition?.rightOperator,
        )
      ) {
        console.log(
          `Item ${transform.attributeName} does not respect transformation condition`,
        )
        continue
      }

      console.log(`Item "${transform.attributeName}" respects condition`)

      item[transform.attributeName] = transformItem(
        transform.transformation?.type,
        targetedItemValue,
        transform.transformation?.value,
      )
    }

    return item
  })
}
