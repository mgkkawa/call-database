type KintoneRecord = {
  $id: { type: '__ID__'; value: string }
  $revision: { type: '__REVISION__'; value: string }
  レコード番号: { type: 'RECORD_NUMBER'; value: string }
  更新日時: { type: 'UPDATED_TIME'; value: string }
  更新者: { type: 'MODIFIER'; value: kintone.LoginUser }
  作成日時: { type: 'CREATED_TIME'; value: string }
  作成者: { type: 'CREATOR'; value: kintone.LoginUser }
}

export type KintoneEvent = {
  appId: number
  record: KintoneRecord
  recordId: number
  type: string
}
