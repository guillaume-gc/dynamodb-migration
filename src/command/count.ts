import { Database } from '../helper/database'
import { validateFilterLogic } from '../parser/validator/commandValidation'
import { validationCountOptions } from '../parser/validator/optionValidation'
import { applyFilterLogic } from '../service/ftl'

export const runCountService = async (options: any) => {
  try {
    console.log('Count arguments: ', options)

    const {
      targetTable,
      region,
      filter: filterLogic,
      delay,
    } = validationCountOptions(options)

    const { filters } = parseFilter(filterLogic)

    const database = new Database(region)

    const fromTableItems = await database.scanTable(targetTable, delay)

    const itemsToCount = applyFilterLogic(fromTableItems, filters)

    console.log(`Operation completed`)

    console.log(itemsToCount.length)

    return process.exit(0)
  } catch (error) {
    console.error('An error occurred')
    console.error(error)

    return process.exit(1)
  }
}

const parseFilter = (filterLogic?: string) =>
  filterLogic != undefined ? validateFilterLogic(JSON.parse(filterLogic)) : {}
