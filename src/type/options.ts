export interface CopyOptions {
  fromTable: string
  toTable: string
  region: string
  ftl?: string
  delay?: number
}

export interface PurgeOptions {
  targetTable: string
  pk: string
  region: string
  filter?: string
  sk?: string
  delay?: number
}

export interface CountOptions {
  targetTable: string
  region: string
  filter?: string
  delay?: number
}
