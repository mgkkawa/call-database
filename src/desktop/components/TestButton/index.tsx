import { Button } from '@mui/material'
import React, { useCallback, useContext } from 'react'
import { config } from '../../desktop'
import { updateDatabase } from '../../modules'

export const TestButton = () => {
  const clickHandler = useCallback(async () => {
    const event = kintone.app.record.get()
    await updateDatabase(event, config)
  }, [])
  return (
    <Button variant='outlined' onClick={clickHandler}>
      TestButton
    </Button>
  )
}
