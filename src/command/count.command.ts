import { DatabaseHelper } from '../helper/database.helper'
import { validateFilterLogic } from '../parser/validator/command.validation'
import { validationCountOptions } from '../parser/validator/option.validation'
import { applyFilterLogic } from '../service/ftl.service'

export const runCountService = async (options: any) => {
  try {
    console.log('Count arguments: ', options)

    const {
      fromTable,
      region,
      filter: filterLogic,
      delay,
    } = validationCountOptions(options)

    const { filters } = parseFilter(filterLogic)

    const database = new DatabaseHelper(region)

    const fromTableItems = await database.scan(fromTable, delay)

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
