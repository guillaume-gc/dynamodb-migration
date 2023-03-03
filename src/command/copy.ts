import { Database } from '../helper/database'
import { validateFtl } from '../parser/validator/commandValidation'
import { validateCopyOptions } from '../parser/validator/optionValidation'
import { applyFilterTransformLogic } from '../service/ftl'

export const runCopyService = async (options: any) => {
  try {
    console.log('Copy arguments: ', options)

    const { toTable, fromTable, region, ftl, delay } =
      validateCopyOptions(options)

    const { transforms, filters } = parseFtl(ftl)

    const database = new Database(region)

    const fromTableItems = await database.scanTable(fromTable, delay)

    const itemsToWrite = applyFilterTransformLogic(
      fromTableItems,
      filters,
      transforms,
    )

    await database.writeItemsToTable(toTable, itemsToWrite, delay)

    console.log('Operation completed')

    return process.exit(0)
  } catch (error) {
    console.error('An error occurred')
    console.error(error)

    return process.exit(1)
  }
}

const parseFtl = (ftl?: string) => (ftl != undefined ? validateFtl(JSON.parse(ftl)) : {})
