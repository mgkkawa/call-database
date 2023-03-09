import { MenuItem, Select } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'
import { getAppFields, getKintoneRestAPIClient, getSpaceId } from '@/common'

type UseFormRenderArg = {
  fieldItems: any[]
  field: ControllerRenderProps<PluginConfigProps, any>
  fieldState: ControllerFieldState
  label?: string
  type?: string
  unique?: boolean
}

function FieldSelecter({ fieldItems, field, fieldState, label = '', type, unique = false }: UseFormRenderArg) {
  const returnMenuItem = useCallback((field: any) => {
    const item = <MenuItem key={field.code} value={field.code}>{`${field.label}  [${field.code}]`}</MenuItem>
    if (type && unique) return field.unique && field.type === type ? item : null
    if (type) return field.type === type ? item : null
    if (unique) return field.unique ? item : null
    return item
  }, [])

  return (
    <Select {...field} label={label} error={fieldState.invalid}>
      {fieldItems.map(field => returnMenuItem(field))}
    </Select>
  )
}

export default FieldSelecter
