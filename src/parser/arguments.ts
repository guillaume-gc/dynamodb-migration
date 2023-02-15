import { Command } from 'commander'

import { Arguments } from '../type/operation'

export const getArguments = () => {
  const program = new Command()

  program
    .name('dynamodb-migration')
    .description(
      'Tool to copy small DynamoDB database data to another DynamoDB database',
    )

  program.option('-f , --from-table <fromTableName>', 'Origin table name')

  program.option('-t , --to-table <fromTableName>', 'Destination table name')

  program.option(
    '--conditional-updates [conditionalUpdates]',
    'Object describing conditional updates',
  )

  program.option('-r, --region <region>', 'AWS Region')

  program.parse()

  return program.opts<Arguments>()
}
