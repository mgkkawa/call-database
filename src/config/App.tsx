import { Button, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ConfigProps } from '../modules'
import { AppsSelect, FieldsSelect, Form } from './components'
import { thisAppId } from './config'

const PLUGIN_ID = kintone.$PLUGIN_ID
const checkFields = ['historyAppId', 'editMode', 'editCheckField', 'editCheckValue']
const PLUGIN_DESCRIPTION =
  'コール履歴アプリの設定。\n保存先アプリを選択後、対応フィールドの設定をお願いします。\n対応フィールドの設定をスキップした場合は、\n同じフィールドコードを自動で検出し保存します。'

const App = () => {
  const [config, setConfig] = useState<ConfigProps>(kintone.plugin.app.getConfig(PLUGIN_ID))
  const [appId, setAppId] = useState<number | string>(config.historyAppId ? config.historyAppId : '')
  const [field, setField] = useState<string>(config.editCheckField ? config.editCheckField : '')
  const [value, setValue] = useState<string>(config.editCheckValue ? config.editCheckValue : '')

  // config画面描画時設定
  useEffect(() => {
    if (config.historyAppId) setAppId(config.historyAppId)
    setConfig(config)
  }, [])

  // appIdが更新されると
  useEffect(() => {
    config.historyAppId = appId
    config.editCheckField = field
    config.editCheckValue = value
    setConfig(config)
  }, [appId, field, value])

  return (
    <>
      <Form />
      {/* <PluginConfigTitle />
      <PluginConfigDescription text={PLUGIN_DESCRIPTION} />
      <br />
      <AppsSelect setFunction={setAppId} value={appId} />
      <div style={{ marginTop: 30 }}>
        <Button variant='outlined' style={{ marginRight: 15, minWidth: 150 }} size='large'>
          キャンセル
        </Button>
        <Button
          variant='contained'
          style={{ minWidth: 150 }}
          size='large'
          onClick={() => {
            kintone.plugin.app.setConfig(config)
          }}>
          保存
        </Button>
      </div> */}
    </>
  )
}

export default App
