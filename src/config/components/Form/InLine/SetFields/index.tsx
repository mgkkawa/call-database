import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

type SetFieldProps = {
  toCode: string
  toType?: string
  thisCode: string
  thisType?: string
}
type SetFieldsProps = {
  setFields: SetFieldProps[]
  toFields: any[]
  thisFields: any[]
}

function SetFields({ setFields, toFields, thisFields }: SetFieldsProps) {
  const [arry, setArry] = useState(setFields)

  return (
    <FormControl>
      <InputLabel>データベース側</InputLabel>
      <Select>
        {toFields.map(field => (
          <MenuItem value={field.code} key={field.code}>{`${field.label} == [${field.code}]`}</MenuItem>
        ))}
      </Select>
      <InputLabel>このアプリ側</InputLabel>
      <Select>
        {thisFields.map(field => (
          <MenuItem value={field.code} key={field.code}>{`${field.label} == [${field.code}]`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SetFields
