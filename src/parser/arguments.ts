import { Command } from 'commander'

import { runCopyService } from '../service/copy'

export const applyCommand = () => {
  const program = new Command()
    .name('dynamodb-migration')
    .description('Tool to make operations on DynamoDB databases')

  program.allowUnknownOption().action(() => {
    console.error('Unknown command')

    process.exit(1)
  })

  program
    .command('copy')
    .description('Copy data from one database to another')
    .requiredOption('-f , --from-table <fromTableName>', 'Origin table name')
    .requiredOption('-t , --to-table <fromTableName>', 'Destination table name')
    .option(
      '--transform [transformObject]',
      'Transformations configuration object',
    )
    .requiredOption('-r, --region <region>', 'AWS Region')
    .action(runCopyService)

  program.parse()
}
