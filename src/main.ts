import { getArguments } from './arguments'
import { Database } from './database'

const main = async () => {
  const args = getArguments()

  const { from, to,  region } = args

  const database = new Database(region)

  const items = await database.scanTable(from)

  await database.writeItemsToTable(to, items)
}

main().then(() => {
  console.log('Completed')
})

