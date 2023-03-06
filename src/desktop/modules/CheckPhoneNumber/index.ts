import Swal from 'sweetalert2'
import { appId, getKintoneRestAPIClient, getRecordUrl } from '..'

export const checkPhoneNumber = async (target: string, event: any = kintone.app.record.get()) => {
  const { record } = event
  const companyId = record.companyId.value as string
  const phoneNumber = record[target].value as string
  const client = await getKintoneRestAPIClient()
  const query = `phoneNumber = "${phoneNumber}" or nextPhoneNumber = "${phoneNumber}"`
  const records = await client.record.getRecords({ app: appId, query: query, fields: ['レコード番号', 'companyId'] })
  const result = records.records.filter(record => record.companyId.value != companyId)
  if (result.length) {
    // レコードのURL取得まで。
    // 表示処理はまだ。
    const urls = result.map(record => getRecordUrl(record, appId))

    await Swal.fire({ title: '番号重複あり', icon: 'warning' })
  }
}
