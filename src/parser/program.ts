import { Command } from 'commander'

import { runCopyService } from '../command/copy'
import { runCountService } from '../command/count'

export const applyCommand = () => {
  const program = new Command()
    .name('dynamodb-migration')
    .description('Tool to make operations on DynamoDB databases')

  program.allowUnknownOption().action(() => {
    console.error('Unknown command')

    return process.exit(1)
  })

  program
    .command('copy')
    .description('Copy data from one database to another')
    .requiredOption('-f , --from-table <fromTableName>', 'Origin table name')
    .requiredOption('-t , --to-table <fromTableName>', 'Destination table name')
    .requiredOption('-r, --region <region>', 'AWS Region')
    .option('--ftl [ftlConfig]', 'Filter Transform Logic configuration')
    .option(
      '--delay [delay]',
      'Add a delay in milliseconds between two database operations to reduce throttle risks',
    )
    .action(runCopyService)

  program
    .command('count')
    .description('Copy data from one database to another')
    .requiredOption('-t , --target-table <targetTable>', 'Origin table name')
    .requiredOption('-r, --region <region>', 'AWS Region')
    .option('--ftl [ftl]', 'Filter Transform Logic')
    .option(
      '--delay [delay]',
      'Add a delay in milliseconds between two database operations to reduce throttle risks',
    )
    .action(runCountService)

  program.parse()
}