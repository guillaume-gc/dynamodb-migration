import { checkItem } from '../operation/checkItem'
import { transformItem } from '../operation/transformItem'
import { Filter, Transform } from '../type/operation'

export const applyFilterTransformLogic = (
  items: Record<string, any>[],
  filters?: Filter[],
  transforms?: Transform[],
) => {
  const filteredItems =
    filters != undefined ? applyFilter(items, filters) : items

  return transforms != undefined
    ? applyTransform(filteredItems, transforms)
    : filteredItems
}

export const applyFilterLogic = (
  items: Record<string, any>[],
  filters?: Filter[],
) => (filters != undefined ? applyFilter(items, filters) : items)

export const applyTransformLogic = (
  items: Record<string, any>[],
  transforms?: Transform[],
) => (transforms != undefined ? applyTransform(items, transforms) : items)

const applyFilter = (items: Record<string, any>[], filters: Filter[]) =>
  items.filter((item) =>
    filters.every((filter) => {
      const targetedItemValue = item[filter.attributeName]

      if (targetedItemValue === undefined) {
        console.log(`Item ${filter.attributeName} is not present in this row`)
        return true
      }

      // Any element present in filter must be included
      return checkItem(
        filter.condition?.type,
        item[filter.attributeName],
        filter.condition?.rightOperator,
      )
    }),
  )

const applyTransform = (
  items: Record<string, any>[],
  transforms: Transform[],
) =>
  items.map((item) => {
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
