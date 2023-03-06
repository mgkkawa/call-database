import { KintoneRestAPIClient } from '@kintone/rest-api-client'
import { getSpaceId } from '../'

type Options = {
  baseUrl?: string
  auth?: any
  guestSpaceId?: number | string
  basicAuth?: any
  proxy?: any
  httpsAgent?: any
  clientCertAuth?:
    | {
        pfx: Buffer
        password: string
      }
    | {
        pfxFilePath: string
        password: string
      }
  featureFlags?: {
    enableAbortSearchError: boolean
  }
  userAgent?: string
}

export const getKintoneRestAPIClient = async (token?: string) => {
  const isGuestSpace = await getSpaceId()
  const options: Options = {}
  if (token) options.auth = { apiToken: token }
  if (isGuestSpace) options.guestSpaceId = isGuestSpace
  return new KintoneRestAPIClient(options)
}
