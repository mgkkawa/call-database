import { FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'
import classes from '../InLine.module.css'

type Field = { label: string; code: string; type: string }
type FieldSelecterProps = {
  fields: Field[]
  defaultValue?: string
  type?: string
  setFunction: Function
  label?: string
}

export const FieldSelecter = ({ fields, defaultValue, type, setFunction, label }: FieldSelecterProps) => {
  const [selects, setSelects] = useState(fields)
  useEffect(() => {
    if (type) {
      setSelects(prevSelects => prevSelects.filter(field => field.type === type))
    }
  }, [])
  return (
    <FormControl className={classes.selecter}>
      <InputLabel>{label ? label : ''}</InputLabel>
      <Select
        defaultValue={defaultValue}
        onChange={e => {
          setFunction(e.target.value)
        }}>
        {selects.map(field => (
          <MenuItem key={field.code} value={field.code}>
            {field.label + ' [' + field.code + ']'}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
