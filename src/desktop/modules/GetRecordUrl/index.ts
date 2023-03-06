export const getRecordUrl = (record: any, appId: number | string) => {
  const reg = new RegExp(`.*(?=${appId})`)
  const url = location.href
  const urlMatch = url.match(reg)
  if (!urlMatch) return
  const baseUrl = urlMatch[0]
  const appUrl = baseUrl + appId + '/'
  const recordUrl = appUrl + 'show#record=' + record.レコード番号.value
  return recordUrl
}
