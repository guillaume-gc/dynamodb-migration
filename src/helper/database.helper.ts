import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  BatchWriteCommand,
  BatchWriteCommandInput,
  DynamoDBDocumentClient,
  ScanCommand,
  ScanCommandInput,
} from '@aws-sdk/lib-dynamodb'

import { splitArrayIntoChunks } from '../util/array.util'

type DatabaseItems = Record<string, any>[]

export class DatabaseHelper {
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

  async scan(tableName: string, delay?: number) {
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

      if (delay) {
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    } while (lastEvaluatedKey != undefined)

    console.log(`Found all ${allItems.length} items in ${tableName} database`)

    return allItems
  }

  async write(tableName: string, items: DatabaseItems, delay?: number) {
    const itemChunks = splitArrayIntoChunks<DatabaseItems>(items, 25)

    console.log(
      `${items.length} items divided into ${itemChunks.length} chunks`,
    )

    for (const chunk of itemChunks) {
      await this.writeChunk(tableName, chunk)

      if (delay) {
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }

    console.log('All items written to table')
  }

  async delete(
    tableName: string,
    items: DatabaseItems,
    partitionKey: string,
    sortKey?: string,
    delay?: number,
  ) {
    const itemChunks = splitArrayIntoChunks<DatabaseItems>(items, 25)

    console.log(
      `${items.length} items divided into ${itemChunks.length} chunks`,
    )

    for (const chunk of itemChunks) {
      await this.deleteChunk(tableName, chunk, partitionKey, sortKey)

      if (delay) {
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  private async deleteChunk(
    tableName: string,
    chunks: DatabaseItems,
    partitionKey: string,
    sortKey?: string,
  ) {
    const input: BatchWriteCommandInput = {
      RequestItems: {
        [tableName]: chunks.map((item) => ({
          DeleteRequest: {
            Key: {
              [partitionKey]: item[partitionKey],
              // Sort key is optional.
              ...(sortKey && { [sortKey]: item[sortKey] }),
            },
          },
        })),
      },
    }

    const command = new BatchWriteCommand(input)

    await this.documentClient.send(command)

    console.log(
      `Successfully deleted ${chunks.length} items in ${tableName} database`,
    )
  }

  private async writeChunk(tableName: string, chunks: DatabaseItems) {
    const input: BatchWriteCommandInput = {
      RequestItems: {
        [tableName]: chunks.map((item) => ({
          PutRequest: {
            Item: item,
          },
        })),
      },
    }

    const command = new BatchWriteCommand(input)

    await this.documentClient.send(command)

    console.log(
      `Successfully wrote ${chunks.length} items to ${tableName} database`,
    )
  }
}
