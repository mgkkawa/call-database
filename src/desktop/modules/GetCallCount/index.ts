import { getKintoneRestAPIClient } from '..'

type CallRecord = {
  record: any
}

const checkFields = ['法人番号', '案件名', '日付', '時刻', 'MG担当者']

const getQuery = (record: any, fieldCd: string) => {
  const field = record[fieldCd]
  const type = field.type
  if (type === 'USER_SELECT') return fieldCd + ' in ("' + field.value[0].code + '")'
  return `${fieldCd} = "${field.value}"`
}

export const getCallCount = async (event: CallRecord) => {
  // コール履歴アプリに法人番号＆案件名が一致するレコードの件数を確認する。
  const client = await getKintoneRestAPIClient()
  const record = event.record

  const query = checkFields.map(field => getQuery(record, field)).join(' and ')
  const getRecords = await client.record.getRecords({ app: 516, query: query, totalCount: true })
  const totalCount = getRecords.totalCount as string
  return Number(totalCount) + 1
}
