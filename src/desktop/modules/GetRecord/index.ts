import { getKintoneRestAPIClient } from '../../../common'

const uniqueId = 'companyId'
const DELETE_KEYS = ['$id', '$revision', '作成日時', '作成者', '更新日時', '更新者']
export const getRecord = async (appId: string | number, serialNumber: string) => {
  const client = await getKintoneRestAPIClient()
  const query = uniqueId + ' = "' + serialNumber + '"'
  const records = await client.record.getRecords({
    app: appId,
    query: query,
    totalCount: true,
    fields: ['レコード番号'],
  })
  if (!records.totalCount) return
  const recordId = records.records[0].レコード番号.value as string
  const record = await client.record.getRecord({ app: appId, id: recordId })
  const newRecord = { ...record.record }
  DELETE_KEYS.forEach(key => delete newRecord[key])
  return newRecord
}
