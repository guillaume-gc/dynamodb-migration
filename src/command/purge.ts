import { Database } from '../helper/database'
import { validateFilterLogic } from '../parser/validator/commandValidation'
import { validatePurgeOptions } from '../parser/validator/optionValidation'
import { applyFilterLogic } from '../service/ftl'
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

    const database = new Database(region)

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
