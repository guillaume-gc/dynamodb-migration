import { Database } from '../helper/database'
import { validationCountOptions } from '../parser/validator/optionValidation'
import { applyFilterLogic } from '../service/ftl'

export const runCountService = async (options: any) => {
  try {
    console.log('Count arguments: ', options)

    const countOptions = validationCountOptions(options)

    const { targetTable, region, filter, delay } = countOptions

    const database = new Database(region)

    const fromTableItems = await database.scanTable(targetTable, delay)

    const itemsToCount =
      filter != undefined
        ? applyFilterLogic(fromTableItems, filter)
        : fromTableItems

    console.log(`Operation completed`)

    console.log(itemsToCount.length)

    return process.exit(0)
  } catch (error) {
    console.error('An error occurred')
    console.error(error)

    return process.exit(1)
  }
}
