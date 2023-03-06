import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { getLayOut } from '../../modules'
import { AppIdContext } from '../config'

const FieldsSelect = ({
  setFunction,
  value,
  appId,
}: {
  setFunction: Function
  value: number | string
  appId: number | string
}) => {
  const [fields, setFields] = useState<Record<string, any>[]>([])
  const thisId = useContext(AppIdContext)

  useEffect(() => {
    const awaitFields = async () => {
      const layout = await getLayOut(appId)
      // setFields(fields ? fields : [])
    }
    awaitFields()
  }, [])

  return (
    <FormControl style={{ marginTop: 20, width: 300 }}>
      <InputLabel id='app-id-selecter'>アプリ選択</InputLabel>
      <Select
        labelId='app-id-selecter'
        id='app-id'
        value={value ? value : ''}
        onChange={e => setFunction(e.target.value)}>
        {fields.map(({ appId, name }, key) => {
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

export default FieldsSelect
