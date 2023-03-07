import { Button } from '@mui/material'
import React from 'react'
import classes from './Footer.module.css'

export default function Footer({}: FooterProps) {
  return (
    <div>
      <hr className={classes.topLine} />
      <Button variant='outlined' className={classes.button}>
        キャンセル
      </Button>
      <Button variant='contained' type='submit' className={classes.button}>
        保存
      </Button>
    </div>
  )
}
