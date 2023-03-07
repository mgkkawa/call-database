import React from 'react'
import classes from './Header.module.css'

export default function Header({ title, description }: HeaderProps) {
  return (
    <div>
      <h1 className={classes.title}>{title}</h1>
      <h4 className={classes.description}>{description}</h4>
      <hr className={classes.bottomLine} />
    </div>
  )
}
