import { Button } from '@mui/material'
import React from 'react'
import { getKintoneRestAPIClient } from '../../../common'

export const ListCheckButton = () => {
  const clickHandler = async () => {
    const client = await getKintoneRestAPIClient()
    const records = await client.record.getAllRecords({ app: kintone.app.getId() as number })
    console.log(records)
  }
  return (
    <Button variant='contained' onClick={clickHandler}>
      リストチェック
    </Button>
  )
}
