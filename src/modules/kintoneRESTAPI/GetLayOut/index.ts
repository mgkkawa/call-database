import { Row } from '@kintone/rest-api-client/lib/KintoneFields/types/layout'
import { getKintoneRestAPIClient } from '../'

const DELETE_TYPES = [
  'CATEGORY',
  'STATUS',
  'RECORD_NUMBER',
  'CREATED_TIME',
  'CREATOR',
  'STATUS_ASSIGNEE',
  'UPDATED_TIME',
  'MODIFIER',
]

type FieldLayoutWith<
  T extends string,
  S = {
    width: string
  },
> = {
  type: T
  code: string
  size: S
}

export const getLayOut = async (appId: number | string) => {
  const result = []
  const client = await getKintoneRestAPIClient()
  const res = await client.app.getFormLayout({ app: appId })
  const layout = res.layout
  // layout.forEach((row:Row<FieldLayoutWith>) => {
  //   row.fields
  // })
  // const layout = res.layout
  // const result: Record<string, any> = {}
  // for (let field in layout) {
  //   const obj = layout[field]
  //   if (!DELETE_TYPES.includes(obj.type)) result[field] = { type: obj.type }
  // }
  // return result
}
