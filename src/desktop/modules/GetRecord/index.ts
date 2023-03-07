import { getKintoneRestAPIClient, DELETE_KEYS } from '../../../common'

const uniqueId = 'companyId'
export const getRecord = async (appId: string | number, companyId: string) => {
  const client = await getKintoneRestAPIClient()
  const query = uniqueId + ' = "' + companyId + '"'
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
