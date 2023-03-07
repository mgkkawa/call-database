import { FormControl, Select, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import classes from './FieldSelecter.module.css'

type Field = { label: string; code: string; type: string }
type FieldSelecterProps = {
  fields: Field[]
  value?: string
  type?: string
  setFunction: Function
}

export const FieldSelecter = ({ fields, value, type, setFunction }: FieldSelecterProps) => {
  const [selects, setSelects] = useState(fields)
  useEffect(() => {
    if (type) {
      setSelects(prevSelects => prevSelects.filter(field => field.type === type))
    }
  }, [])
  return (
    <FormControl>
      <Select
        className={classes.fieldSelecter}
        defaultValue={value}
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
