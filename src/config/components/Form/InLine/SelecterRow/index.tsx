import { Button } from '@mui/material'
import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { FieldSelecter } from '../FieldSelecter'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import classes from './SelecterRow.module.css'

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

export function SelecterRow(props: SelectersProps) {
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
