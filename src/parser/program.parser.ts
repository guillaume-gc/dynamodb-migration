import { Command } from 'commander'

import { runCopyService } from '../command/copy.command'
import { runCountService } from '../command/count.command'
import { runPurgeService } from '../command/purge.command'

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
    .option('--ftl [ftl]', 'Filter Transform Logic')
    .option(
      '--delay [delay]',
      'Add a delay in milliseconds between two database operations to reduce throttle risks',
    )
    .action(runCopyService)

  program
    .command('count')
    .description('Count data in a database')
    .requiredOption('-f , --from-table <fromTable>', 'Origin table name')
    .requiredOption('-r, --region <region>', 'AWS Region')
    .option('--filter [filter]', 'Filter Transform Logic')
    .option(
      '--delay [delay]',
      'Add a delay in milliseconds between two database operations to reduce throttle risks',
    )
    .action(runCountService)

  program
    .command('purge')
    .description('Purge data in a database')
    .requiredOption('-f , --from-table <fromTable>', 'Origin table name')
    .requiredOption('-r, --region <region>', 'AWS Region')
    .requiredOption('--pk [pk]', 'Partition key used to delete items')
    .option('--filter [filter]', 'Filter Transform Logic')
    .option('--sk [pk]', 'Sort key used to delete items')
    .option(
      '--delay [delay]',
      'Add a delay in milliseconds between two database operations to reduce throttle risks',
    )
    .action(runPurgeService)

  program
    .command('export')
    .description('Export data in a database')


  program.parse()
}
