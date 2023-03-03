import { DatabaseHelper } from '../helper/database.helper'
import { validateFilterLogic } from '../parser/validator/command.validation'
import { validatePurgeOptions } from '../parser/validator/option.validation'
import { applyFilterLogic } from '../service/ftl.service'
import { continueOrQuit } from '../service/prompt.service'

export const runPurgeService = async (options: any) => {
  try {
    console.log('Purge arguments: ', options)

    const {
      targetTable,
      pk: targetPartitionKey,
      region,
      filter: filterLogic,
      sk: targetSortKey,
      delay,
    } = validatePurgeOptions(options)

    const { filters } = parseFilter(filterLogic)

    const database = new DatabaseHelper(region)

    const fromTableItems = await database.scan(targetTable, delay)

    const itemsToDelete = applyFilterLogic(fromTableItems, filters)

    await continueOrQuit(
      `${itemsToDelete.length} items to delete, continue ? (Y/N) `,
    )

    await database.delete(
      targetTable,
      itemsToDelete,
      targetPartitionKey,
      targetSortKey,
      delay,
    )

    console.log(`Operation completed`)

    return process.exit(0)
  } catch (error) {
    console.error('An error occurred')
    console.error(error)

    return process.exit(1)
  }
}

const parseFilter = (filterLogic?: string) =>
  filterLogic != undefined ? validateFilterLogic(JSON.parse(filterLogic)) : {}
