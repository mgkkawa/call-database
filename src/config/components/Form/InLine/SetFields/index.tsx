import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getAppFields } from '@/common'
import { FormControl, Select, MenuItem, Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { ConfigContext } from '../../../../config'
import classes from './SetFields.module.css'
import { SelectChangeEvent } from '@mui/material'

type FieldSelecterProps = {
  fields: any[]
  value?: string
  type?: string
  setFunction: Function
}

function FieldSelecter({ fields, value = '', type, setFunction }: FieldSelecterProps) {
  const [selectFields, setSelectFields] = useState(fields)
  if (type) setSelectFields(prevSelectFields => prevSelectFields.filter(field => field.type === type))

  const changeHandler = useCallback((e: SelectChangeEvent) => {
    if (value === e.target.value) return
    console.log(value, e.target.value)
    setFunction(e.target.value)
  }, [])

  return (
    <FormControl>
      <Select className={classes.fieldSelecter} defaultValue={value} onChange={changeHandler}>
        {selectFields.map((field, key) => (
          <MenuItem key={key} value={field.code}>
            {field.label + ' [' + field.code + ']'}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

type SelectersProps = {
  index: number
  setFunction: Function
  left?: string
  leftFields: any[]
  right?: string
  rightFields: any[]
}

type ConfigRowProps = {
  toCode: string
  thisCode: string
}

function Selecters(props: SelectersProps) {
  const { left, right, index, setFunction, leftFields, rightFields } = props

  const [toCode, setToCode] = useState(left || '')
  const [thisCode, setThisCode] = useState(right || '')
  const [row, setRow] = useState<ConfigRowProps>({ toCode: toCode, thisCode: thisCode })

  const leftType = useMemo(() => {
    const leftField = leftFields.filter(field => field.code === toCode)
    if (!leftField || !leftField.length) return undefined
    return leftField[0].type
  }, [toCode])
  const rightType = useMemo(() => {
    const rightField = rightFields.filter(field => field.code === thisCode)
    if (!rightField || !rightField.length) return undefined
    return rightField[0].type
  }, [thisCode])

  useEffect(() => {
    if (!toCode && !thisCode) return
    console.log(toCode, thisCode)
    setRow({ toCode: toCode, thisCode: thisCode })
  }, [toCode, thisCode])

  useEffect(() => {
    setFunction((prevArray: ConfigRowProps[]) => {
      const thisConfigRow = prevArray[index]
      const prevToCode = thisConfigRow.toCode
      const prevThisCode = thisConfigRow.thisCode
      if (prevToCode === toCode && prevThisCode === thisCode) return prevArray
      const newArray = [...prevArray]
      newArray.splice(index, 1, row)
      return newArray
    })
  }, [row])

  const addClickHandler = useCallback(() => {
    setFunction((prevValues: ConfigRowProps[]) => {
      const newValues = [...prevValues]
      newValues.splice(index, 0, { toCode: '', thisCode: '' })
      return newValues
    })
  }, [])

  const removeClickHandler = useCallback(() => {
    setFunction((prevValues: ConfigRowProps[]) => {
      const newValues = [...prevValues]
      newValues.splice(index, 1)
      return newValues
    })
  }, [])

  return (
    <div className={classes.selecterRowWrapper}>
      <FieldSelecter fields={leftFields} setFunction={setToCode} type={leftType} />
      <FieldSelecter fields={rightFields} setFunction={setThisCode} type={rightType} />
      <Button onClick={addClickHandler}>
        <AddCircleIcon />
      </Button>
      <Button onClick={removeClickHandler}>
        <RemoveCircleOutlineIcon />
      </Button>
    </div>
  )
}

function SetFields({ appId }: PluginConfigProps) {
  const config = useContext(ConfigContext)
  const [toFields, setToFields] = useState<any[]>([])
  const [thisFields, setThisFields] = useState<any[]>([])
  const [fieldArray, setFieldArray] = useState<ConfigRowProps[]>(config.setFields || [{ toCode: '', thisCode: '' }])
  const [isReady, setReady] = useState(false)

  useEffect(() => {
    const getReady = async () => {
      setToFields(await getAppFields(appId))
      setThisFields(await getAppFields(kintone.app.getId() as number))
      setReady(!!toFields && !!thisFields)
    }
    getReady()
  }, [toFields, thisFields])

  return (
    <div>
      {isReady ? (
        fieldArray.map((value, index) => (
          <Selecters
            key={index}
            index={index}
            setFunction={setFieldArray}
            leftFields={toFields}
            rightFields={thisFields}
          />
        ))
      ) : (
        <div>読み込み中</div>
      )}
    </div>
  )
}

export default SetFields
