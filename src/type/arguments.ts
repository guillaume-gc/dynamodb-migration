export interface CopyOptions {
  fromTable: string
  toTable: string
  region: string
  filterMap?: string
}

export interface PurgeArguments {
  fromTable: string
  toFile: string
  region: string
  filter?: string
}
