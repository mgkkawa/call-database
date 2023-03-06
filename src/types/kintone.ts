export type KintoneField = {
  type: string
  value: any
  disabled?: boolean
  error?: string | null
}

export type KintoneRecord = Record<string, KintoneField>

export type KintoneRecordEvent = {
  type: string
  appId: number
  record: KintoneRecord
  recordId: number
}
