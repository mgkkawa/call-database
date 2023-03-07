import React, { useCallback, useEffect, useState } from 'react'
import { getKintoneRestAPIClient, getSpaceId } from '@/common'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { App } from '@kintone/rest-api-client/lib/client/types'
import classes from '../InLine.module.css'

type AppsSelecterProps = {
  defaultValue: string
  setFunction: React.Dispatch<React.SetStateAction<string>>
}

function AppsSelecter({ defaultValue, setFunction }: AppsSelecterProps) {
  const [apps, setApps] = useState<App[]>([])

  const changeHandler = useCallback((e: SelectChangeEvent) => {
    setFunction(e.target.value)
  }, [])

  useEffect(() => {
    const asyncApps = async () => {
      const client = await getKintoneRestAPIClient()
      const spaceId = await getSpaceId()
      const response = await client.app.getApps({ spaceIds: [spaceId as number] })
      setApps(response.apps)
    }
    asyncApps()
  }, [])

  return (
    <FormControl className={classes.selecter}>
      <InputLabel>データベースアプリ選択</InputLabel>
      <Select defaultValue={defaultValue} onChange={changeHandler}>
        {apps.map(app => (
          <MenuItem key={app.appId} value={app.appId}>
            {app.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default AppsSelecter
