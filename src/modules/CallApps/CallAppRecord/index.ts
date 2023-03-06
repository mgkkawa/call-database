import { getFields } from '../../kintoneRESTAPI/GetFields'
import type { KintoneRecord } from '../../../types'

export const callAppRecord = async (record: KintoneRecord, appId: number | string) => {
  const fields = await getFields(appId)
  for (let field in fields) {
    const obj = fields[field]
    if (field in record) {
      obj.value = record[field].value
    } else {
      obj.value = undefined
    }
  }
}
