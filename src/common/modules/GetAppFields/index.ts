import { OneOf } from '@kintone/rest-api-client/lib/KintoneFields/types/fieldLayout'
import { getForm, getLayout } from '..'

export async function getAppFields(appId: string | number) {
  const fields = await getForm(appId)
  const layout = await getLayout(appId)
  const appFields = layout
    .map(field => {
      const { code } = field
      return fields[code]
    })
    .filter(field => Boolean(field))
  return appFields
}
