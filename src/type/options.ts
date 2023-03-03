export interface CopyOptions {
  fromTable: string
  toTable: string
  region: string
  ftl?: string
  delay?: number
}

export interface PurgeOptions {
  targetTable: string
  targetPartitionKey: string
  region: string
  filter?: string
  targetSortKey?: string
}

export interface CountOptions {
  targetTable: string
  region: string
  filter?: string
  delay?: number
}
