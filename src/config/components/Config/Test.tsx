import { Button, Input } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getConfig, setConfig } from '../'

export const TestForm = () => {
  const [pluginConfig, setPluginConfig] = useState(getConfig())
  const [appId, setAppId] = useState('')

  const appIdChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAppId(e.target.value)
  }, [])

  const submitHandler = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setConfig(pluginConfig)
  }, [])

  useEffect(() => {
    setPluginConfig({ appId: appId })
  }, [appId])

  return (
    <form onSubmit={submitHandler}>
      <Input type='number' onChange={appIdChangeHandler} />
      <Button type='submit' variant='contained'>
        保存
      </Button>
    </form>
  )
}
