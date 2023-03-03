import { DatabaseHelper } from '../helper/database.helper'
import { validateFilterLogic } from '../parser/validator/command.validation'
import { validatePurgeOptions } from '../parser/validator/option.validation'
import { applyFilterLogic } from '../service/ftl.service'
import { continueOrQuit } from '../helper/prompt.helper'

export const runPurgeService = async (options: any) => {
  try {
    console.log('Purge arguments: ', options)

    const {
      fromTable,
      pk,
      region,
      filter: filterLogic,
      sk,
      delay,
    } = validatePurgeOptions(options)

    const { filters } = parseFilter(filterLogic)

    const database = new DatabaseHelper(region)

    const fromTableItems = await database.scan(fromTable, delay)

    const itemsToDelete = applyFilterLogic(fromTableItems, filters)

    await continueOrQuit(
      `${itemsToDelete.length} items to delete in table "${fromTable}", continue ? (Y/N) `,
    )

    await database.delete(
      fromTable,
      itemsToDelete,
      pk,
      sk,
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
