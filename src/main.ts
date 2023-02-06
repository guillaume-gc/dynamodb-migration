import { getArguments } from './arguments'
import { Database } from './database'

const main = async () => {
  const args = getArguments()

  const { fromTable, toTable, region } = args

  console.log('Arguments: ', args)

  const database = new Database(region)

  const items = await database.scanTable(fromTable)

  await database.writeItemsToTable(toTable, items)
}

main().then(() => {
  console.log('Completed')
})
