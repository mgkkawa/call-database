// プラグインに保存する設定情報の型を指定する。
declare type PluginConfigProps = {
  appId: string
  statusField: string
  companyId: string
  setFields: SetFieldProps[]
}

declare type SetFieldProps = {
  toCode: string
  thisCode: string
}

declare type PluginConfigpropsKey = 'appId' | 'statusField' | 'companyId' | 'setFields'
