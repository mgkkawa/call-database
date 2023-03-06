export const DELETE_FIELDS = [
  '$id',
  '$revision',
  'レコード番号',
  'カテゴリー',
  'ステータス',
  '作成日時',
  '作成者',
  '作業者',
  '更新日時',
  '更新者',
]

type KintoneField = { type: string; value: any; disabled?: boolean; error?: string }

type CallRecord = {
  record: Record<string, KintoneField>
}
