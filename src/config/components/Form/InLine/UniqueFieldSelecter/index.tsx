import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import classes from '../InLine.module.css'

type UniqueFieldSelecterProps = {
  defaultValue: string
  fields: any[]
  setFunction: Dispatch<SetStateAction<string>>
}

function UniqueFieldSelecter({ defaultValue, fields, setFunction }: UniqueFieldSelecterProps) {
  const [items, setItems] = useState(fields)

  const changeHandler = useCallback((e: SelectChangeEvent) => {
    setFunction(e.target.value)
  }, [])

  return (
    <FormControl className={classes.selecter}>
      <InputLabel>リレーションフィールド選択</InputLabel>
      <Select defaultValue={defaultValue} onChange={changeHandler}>
        {items.map(field => {
          return <MenuItem key={field.code} value={field.code}>{`${field.label} [${field.code}]`}</MenuItem>
        })}
      </Select>
    </FormControl>
  )
}

export default UniqueFieldSelecter
