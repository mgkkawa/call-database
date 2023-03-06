import { getKintoneRestAPIClient, getSpaceId } from '../'

export const getApps = async () => {
  const client = await getKintoneRestAPIClient()
  const spaceId = await getSpaceId()
  if (!spaceId) return
  const res = await client.app.getApps({ spaceIds: [spaceId] })
  return res.apps
}
