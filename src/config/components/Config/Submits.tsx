import { Button } from '@mui/material'
import React from 'react'

export const Submits = () => {
  return (
    <div style={{ marginTop: 30 }}>
      <Button variant='outlined' style={{ marginRight: 15, minWidth: 150 }} size='large' type='reset'>
        キャンセル
      </Button>
      <Button variant='contained' style={{ minWidth: 150 }} size='large' type='submit'>
        保存
      </Button>
    </div>
  )
}
