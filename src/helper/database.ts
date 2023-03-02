import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  BatchWriteCommand,
  BatchWriteCommandInput,
  DynamoDBDocumentClient,
  ScanCommand,
  ScanCommandInput,
} from '@aws-sdk/lib-dynamodb'

import { splitArrayIntoChunks } from '../util'

type DatabaseItems = Record<string, any>[]

export class Database {
  private documentClient

  constructor(region: string) {
    const marshallOptions = {
      // Whether to automatically convert empty strings, blobs, and sets to `null`.
      convertEmptyValues: false, // false, by default.
      // Whether to remove undefined values while marshalling.
      removeUndefinedValues: true, // false, by default.
      // Whether to convert typeof object to map attribute.
      convertClassInstanceToMap: true, // false, by default.
    }

    const unmarshallOptions = {
      // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
      wrapNumbers: false, // false, by default.
    }

    const client = new DynamoDBClient({
      region,
    })
    this.documentClient = DynamoDBDocumentClient.from(client, {
      marshallOptions,
      unmarshallOptions,
    })
  }

  async scanTable(tableName: string) {
    const allItems: Record<string, any>[] = []
    let lastEvaluatedKey: Record<string, any> | undefined = undefined

    console.log(`Scanning table ${tableName}`)

    do {
      const input: ScanCommandInput = {
        TableName: tableName,
        Limit: 100,
        ExclusiveStartKey: lastEvaluatedKey,
      }

      const command = new ScanCommand(input)
      const output = await this.documentClient.send(command)
      const iterationItems = output.Items || []

      lastEvaluatedKey = output.LastEvaluatedKey

      allItems.push(...iterationItems)

      console.log(
        `Found ${iterationItems.length} items in ${tableName} database`,
      )
    } while (lastEvaluatedKey != undefined)

    console.log(`Found all ${allItems.length} items in ${tableName} database`)

    return allItems
  }

  async writeItemsToTable(tableName: string, items: DatabaseItems) {
    const itemChunks = splitArrayIntoChunks<DatabaseItems>(items, 25)

    console.log(
      `${items.length} items divided into ${itemChunks.length} chunks`,
    )

    for (const chunk of itemChunks) {
      await this.writeChunkToTable(tableName, chunk)
    }

    console.log('All items written to table')
  }

  private async writeChunkToTable(tableName: string, chunk: DatabaseItems) {
    const input: BatchWriteCommandInput = {
      RequestItems: {
        [tableName]: chunk.map((item) => ({
          PutRequest: {
            Item: item,
          },
        })),
      },
    }

    const command = new BatchWriteCommand(input)

    await this.documentClient.send(command)

    console.log(
      `Successfully wrote ${chunk.length} items to ${tableName} database`,
    )
  }
}
