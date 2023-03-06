import Swal from 'sweetalert2'
import { getFields, getKintoneRestAPIClient } from '../../kintoneRESTAPI'
import type { KintoneRecord } from '../../../types'
import { DELETE_TYPES } from '../enviroment'

const UPDATE_KEY = 'レコード番号'

type BaseRecord = {
  app: number | string
  record: KintoneRecord
}

type UpdateRecord = (BaseRecord & { id: number | string }) | (BaseRecord & { updateKey: { field: string; value: any } })

const getQuery = (record: any, fieldCd: string) => {
  const field = record[fieldCd]
  if (!field) return ''
  const type = field.type
  if (type === 'USER_SELECT') return fieldCd + ' in ("' + field.value[0].code + '")'
  return `${fieldCd} = "${field.value}"`
}

const checkFields = ['企業コード', '日付']
export const checkCallHistory = async (record: KintoneRecord, appId: number | string) => {
  console.log(record)
  const fields = await getFields(appId)
  for (let field in fields) {
    const obj = fields[field]
    if (field in record) {
      obj.value = record[field].value
    } else {
      delete fields[field]
    }
  }

  const client = await getKintoneRestAPIClient()
  const query = checkFields
    .map(field => getQuery(record, field))
    .filter(string => string)
    .join(' and ')
  const getRecords = await client.record.getRecords({ app: appId, query: query, totalCount: true })
  const totalCount: number = Number(getRecords.totalCount)

  if (totalCount > 0) {
    const history = getRecords.records[0]
    const id = history[UPDATE_KEY].value as string
    for (let field in history) {
      const obj = history[field]
      if (DELETE_TYPES.includes(obj.type)) delete history[field]
      if (record[field]) obj.value = record[field].value
    }
    const result: UpdateRecord = {
      app: appId,
      id: id,
      record: history,
    }
    console.log(result)
    const res = await client.record.updateRecord(result)
    toastPopup(res)
    return
  }

  console.log(fields)
  const res = await client.record.addRecord({ app: appId, record: fields })
  await toastPopup(res)
  return
}

const toastPopup = async ({ id, revision }: { id?: string; revision: string }) => {
  const isAddRecord = Number(revision) > 1
  if (isAddRecord) {
    await Swal.fire({
      title: 'コール履歴更新完了',
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
    })
    return
  }
  await Swal.fire({
    title: 'コール履歴登録完了',
    text: 'レコード番号:' + id,
    icon: 'success',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
  })
}
