import { App } from '@kintone/rest-api-client/lib/client/types'
import { MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'
import { getKintoneRestAPIClient, getSpaceId } from '@/common'

type UseFormRenderArg = {
  field: ControllerRenderProps<PluginConfigProps, 'appId'>
  fieldState: ControllerFieldState
  label?: string
}

function AppsSelecter({ field, fieldState, label = '' }: UseFormRenderArg) {
  const [apps, setApps] = useState<App[]>([])

  useEffect(() => {
    const asyncGetApps = async () => {
      const client = await getKintoneRestAPIClient()
      const spaceId = (await getSpaceId()) as number
      const response = await client.app.getApps({ spaceIds: [spaceId] })
      setApps(response.apps)
    }
    asyncGetApps()
  }, [])

  return (
    <Select {...field} label={label} error={fieldState.invalid}>
      {apps.map(app => (
        <MenuItem key={app.appId} value={app.appId}>{`${app.name}  [${app.appId}]`}</MenuItem>
      ))}
    </Select>
  )
}

export default AppsSelecter
