export interface CopyOptions {
  fromTable: string
  toTable: string
  region: string
  ftl?: string
  delay?: number
}

export interface PurgeOptions {
  fromTable: string
  pk: string
  region: string
  filter?: string
  sk?: string
  delay?: number
}

export interface CountOptions {
  fromTable: string
  region: string
  filter?: string
  delay?: number
}
