import { getKintoneRestAPIClient } from '@/common'
import { Row } from '@kintone/rest-api-client/lib/KintoneFields/types/layout'

export async function getLayout(appId: string | number) {
  const client = await getKintoneRestAPIClient()
  const formLayoutRequest = await client.app.getFormLayout({ app: appId })
  const formLayout = formLayoutRequest.layout
  const returnLayout = formLayout
    .flatMap(row => {
      row = row as Row<any>
      return row.fields.map(field => field)
    })
    .filter(row => Boolean(row))
  return returnLayout
}
