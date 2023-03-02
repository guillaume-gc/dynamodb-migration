import { Database } from '../helper/database'
import { applyFilterTransformLogic } from '../service/ftl'
import { validateCopyOptions } from '../parser/validator/optionValidation'

export const runCopyService = async (options: any) => {
  try {
    console.log('Copy arguments: ', options)

    const copyOptions = validateCopyOptions(options)

    const { toTable, fromTable, region, ftlConfig, delay } = copyOptions

    const database = new Database(region)

    const fromTableItems = await database.scanTable(fromTable, delay)

    const itemsToWrite =
      ftlConfig != undefined
        ? applyFilterTransformLogic(fromTableItems, ftlConfig)
        : fromTableItems

    await database.writeItemsToTable(toTable, itemsToWrite, delay)

    console.log('Operation completed')

    return process.exit(0)
  } catch (error) {
    console.error('An error occurred')
    console.error(error)

    return process.exit(1)
  }
}
