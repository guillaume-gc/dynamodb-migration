import { Database } from './helper/database'
import { runConditionalUpdates } from './operation/conditionalUpdater'
import { getArguments } from './parser/arguments'

const main = async () => {
  try {
    const args = getArguments()

    const { fromTable, toTable, region, conditionalUpdates } = args

    console.log('Arguments: ', args)

    const database = new Database(region)

    const fromTableItems = await database.scanTable(fromTable)

    const itemsToWrite =
      conditionalUpdates != undefined
        ? runConditionalUpdates(fromTableItems, conditionalUpdates)
        : fromTableItems

    await database.writeItemsToTable(toTable, itemsToWrite)

    process.exit(0)
  } catch (error) {
    console.error('An error occurred')
    console.error(error)

    process.exit(1)
  }
}

main().then(() => {
  console.log('Completed')
})
