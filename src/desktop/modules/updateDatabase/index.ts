import { getKintoneRestAPIClient } from '../../../common'
import { getRecord } from '../GetRecord'

const companyId = 'companyId'
const setFields = [
  { thisCode: 'date', toCode: 'date' },
  { thisCode: 'time', toCode: 'time' },
  { thisCode: 'user', toCode: 'user' },
  { thisCode: 'callMemo', toCode: 'callMemo' },
  { thisCode: 'commission', toCode: 'commission' },
  { thisCode: 'notCallDetail', toCode: 'notCallDetail' },
  { thisCode: 'isCanAfterCall', toCode: 'isCanAfterCall' },
  { thisCode: 'sendClass', toCode: 'sendClass' },
  { thisCode: 'isCompanyNameOnly', toCode: 'isCompanyNameOnly' },
  { thisCode: 'toCompanyName', toCode: 'toCompanyName' },
  { thisCode: 'toDepartment', toCode: 'toDepartment' },
  { thisCode: 'toZipcode', toCode: 'toZipcode' },
  { thisCode: 'toLocation', toCode: 'toLocation' },
  { thisCode: 'toEmail', toCode: 'toEmail' },
  { thisCode: 'CompleteStatus', toCode: 'priorCompleteStatus' },
  { thisCode: 'CompleteDetail', toCode: 'priorCompleteDetail' },
  { thisCode: 'NGDetail', toCode: 'priorNGDetail' },
  { thisCode: 'CallCount', toCode: 'priorCallCount' },
  { thisCode: 'CompleteDate', toCode: 'priorCompleteDate' },
  { thisCode: 'CompleteUser', toCode: 'priorCompleteUser' },
]

export const updateDatabase = async (event: any, config: PluginConfigProps) => {
  const { record } = event
  const { appId } = config
  const id = record[companyId].value as string

  const client = await getKintoneRestAPIClient()
  const toRecord = await getRecord(appId, id)

  if (!toRecord) return

  const newRecord = { ...toRecord }
  const $id = { ...newRecord['レコード番号'] } as { type: 'RECORD_NUMBER'; value: string }
  delete newRecord['レコード番号']
  for (let fieldProps of setFields) {
    const { toCode, thisCode } = fieldProps
    newRecord[toCode] = record[thisCode]
  }

  const response = await client.record.updateRecord({ app: appId, id: $id.value, record: newRecord })
  console.log(response)
}
