import React, { useCallback, useContext, useState } from 'react'
import { setConfig } from '..'
import { ConfigContext } from '../../config'
import Footer from './Footer'
import Header from './Header'
import InLine from './InLine'

const headerProps: HeaderProps = {
  title: 'コールデータベースプラグイン 設定画面',
  description: 'コールデータベースのあれやこれや',
}

export default function Form({ config }: { config: PluginConfigProps }) {
  const [thisConfig, setThisConfig] = useState(useContext(ConfigContext))
  const setHandler = useCallback((config: PluginConfigProps) => {
    setThisConfig(config)
  }, [])

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    setConfig(thisConfig)
  }

  return (
    <form onSubmit={submitHandler}>
      <Header {...headerProps} />
      <InLine configs={{ config: config, setFunction: setHandler }} />
      <Footer />
    </form>
  )
}
