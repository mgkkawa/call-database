import { Button } from '@mui/material'
import React from 'react'
import { getKintoneRestAPIClient } from '../../../common'

export const DeleteButton = () => {
  const clickHandler = async () => {
    const appId = kintone.app.getId() as number
    const client = await getKintoneRestAPIClient()
    const records = await client.record.getAllRecords({ app: appId })
    const ids = records.map(record => {
      return { id: record.レコード番号.value as string }
    })
    client.record.deleteAllRecords({ app: appId, records: ids })
  }
  return (
    <Button variant='outlined' onClick={clickHandler}>
      レコード削除
    </Button>
  )
}
