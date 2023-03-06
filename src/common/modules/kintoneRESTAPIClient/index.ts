import { KintoneRestAPIClient } from '@kintone/rest-api-client'

export const getSpaceId = async (): Promise<number | false> => {
  const currentUrl = kintone.api.url('/k/v1/app', true)
  if (currentUrl.includes('/guest/')) {
    const appId = kintone.app.getId() as number
    return await getGuestSpaceId(appId)
  }
  return false
}

const getGuestSpaceId = async (appId: number): Promise<number> => {
  const appInfo = await getAppInfo(appId)
  return appInfo.spaceId
}

const getAppInfo = async (appId: number): Promise<{ spaceId: number }> => {
  const params = {
    id: appId,
  }
  return await kintone.api(kintone.api.url('/k/v1/app', true), 'GET', params)
}

type ClientOptions = {
  auth?: { apiToken: string }
  guestSpaceId?: number
}

export const getKintoneRestAPIClient = async (token?: string) => {
  const isGuestSpace = await getSpaceId()
  const options: ClientOptions = {}
  if (token) options.auth = { apiToken: token }
  if (isGuestSpace) options.guestSpaceId = isGuestSpace
  return new KintoneRestAPIClient(options)
}
