import { App } from '@kintone/rest-api-client/lib/client/types'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { getApps } from '../../modules'
import { AppIdContext } from '../config'

const AppsSelect = ({ setFunction, value }: { setFunction: Function; value: number | string }) => {
  const [apps, setApps] = useState<App[]>([])
  const thisId = useContext(AppIdContext)

  useEffect(() => {
    const awaitApps = async () => {
      const apps = await getApps()
      setApps(apps ? apps : [])
    }
    awaitApps()
  }, [])

  return (
    <FormControl style={{ marginTop: 20, width: 300 }}>
      <InputLabel id='app-id-selecter'>アプリ選択</InputLabel>
      <Select
        labelId='app-id-selecter'
        id='app-id'
        value={value ? value : ''}
        onChange={e => setFunction(e.target.value)}>
        {apps.map(({ appId, name }, key) => {
          if (appId != thisId) {
            return (
              <MenuItem key={key} value={appId}>
                {name}
              </MenuItem>
            )
          }
        })}
      </Select>
    </FormControl>
  )
}

export default AppsSelect
