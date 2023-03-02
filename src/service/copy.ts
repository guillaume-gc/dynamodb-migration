import { Database } from '../helper/database'
import { applyFilterMap } from '../operation/filterMap'
import { CopyOptions } from '../type/arguments'

export const runCopyService = async (options: CopyOptions) => {
  try {
    console.log('Copy arguments: ', options)
    const { toTable, fromTable, region, filterMap } = options

    const database = new Database(region)

    const fromTableItems = await database.scanTable(fromTable)

    const itemsToWrite =
      filterMap != undefined
        ? applyFilterMap(fromTableItems, filterMap)
        : fromTableItems

    await database.writeItemsToTable(toTable, itemsToWrite)

    console.log('Operation completed')

    return process.exit(0)
  } catch (error) {
    console.error('An error occurred')
    console.error(error)

    return process.exit(1)
  }
}
