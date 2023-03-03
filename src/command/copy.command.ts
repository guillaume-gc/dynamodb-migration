import { DatabaseHelper } from '../helper/database.helper'
import { validateFtl } from '../parser/validator/command.validation'
import { validateCopyOptions } from '../parser/validator/option.validation'
import { applyFilterTransformLogic } from '../service/ftl.service'
import { continueOrQuit } from '../helper/prompt.helper'

export const runCopyService = async (options: any) => {
  try {
    console.log('Copy arguments: ', options)

    const { toTable, fromTable, region, ftl, delay } =
      validateCopyOptions(options)

    const { transforms, filters } = parseFtl(ftl)

    const database = new DatabaseHelper(region)

    const fromTableItems = await database.scan(fromTable, delay)

    const itemsToCopy = applyFilterTransformLogic(
      fromTableItems,
      filters,
      transforms,
    )

    await continueOrQuit(
      `${itemsToCopy.length} items to copy, continue ? (Y/N) `,
    )

    await database.write(toTable, itemsToCopy, delay)

    console.log('Operation completed')

    return process.exit(0)
  } catch (error) {
    console.error('An error occurred')
    console.error(error)

    return process.exit(1)
  }
}

const parseFtl = (ftl?: string) =>
  ftl != undefined ? validateFtl(JSON.parse(ftl)) : {}
