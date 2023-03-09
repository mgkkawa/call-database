import React from 'react'
import classes from './Header.module.css'

const headerProps: HeaderProps = {
  title: 'コールデータベースプラグイン 設定画面',
  description: 'コールデータベースのあれやこれや',
}

export default function Header() {
  const { title, description } = headerProps
  return (
    <div>
      <h1 className={classes.title}>{title}</h1>
      <h4 className={classes.description}>{description}</h4>
      <hr className={classes.bottomLine} />
    </div>
  )
}
