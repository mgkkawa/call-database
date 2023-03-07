import React, { useContext, useState } from 'react'
import { setConfig } from '..'
import { ConfigContext } from '../../config'
import Footer from './Footer'
import Header from './Header'
import InLine from './InLine'

const headerProps: HeaderProps = {
  title: 'コールデータベースプラグイン 設定画面',
  description: 'コールデータベースのあれやこれや',
}

export default function Form() {
  const [config, setThisConfig] = useState(useContext(ConfigContext))

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    setConfig(config)
  }

  return (
    <form onSubmit={submitHandler}>
      <Header {...headerProps} />
      <InLine config={config} setFunction={setThisConfig} />
      <Footer />
    </form>
  )
}
