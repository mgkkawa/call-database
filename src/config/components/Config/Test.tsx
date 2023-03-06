import { Button, Input } from '@mui/material'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getConfig, setConfig } from '../'
import { PluginContext } from '../../config'

export const TestForm = () => {
  const PLUGIN_ID = useContext(PluginContext)
  const config = useMemo(() => getConfig(PLUGIN_ID), [])
  const [pluginConfig, setPluginConfig] = useState(config)
  const [appId, setAppId] = useState('')

  const appIdChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAppId(e.target.value)
  }, [])

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    setConfig(pluginConfig)
  }

  useEffect(() => {
    setPluginConfig((prevPluginConfig: any) => {
      const newConfig = { ...prevPluginConfig }
      newConfig.appId = appId
      return newConfig
    })
    console.log(pluginConfig)
  }, [appId])

  return (
    <form onSubmit={submitHandler}>
      <Input type='text' onChange={appIdChangeHandler} defaultValue={pluginConfig.appId} />
      <Button type='submit' variant='contained'>
        保存
      </Button>
    </form>
  )
}
