import { getKintoneRestAPIClient, DELETE_KEYS } from '@/common'

export async function getForm(appId: string | number) {
  const client = await getKintoneRestAPIClient()
  const formFieldsRequest = await client.app.getFormFields({ app: appId })
  const formFields = formFieldsRequest.properties
  const returnFields = { ...formFields }
  DELETE_KEYS.forEach((key: string) => delete returnFields[key])
  return returnFields
}
