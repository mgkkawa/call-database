export const getConfig = (pluginId: string) => {
  const config: any = kintone.plugin.app.getConfig(pluginId)
  const keys: PluginConfigpropsKey[] = ['appId', 'statusField', 'companyId', 'setFields']

  for (let key of keys) {
    const obj = config[key]
    if (!obj) {
      switch (key) {
        case 'appId':
        case 'statusField':
        case 'companyId':
          config[key] = ''
          continue
        default:
          config[key] = []
          continue
      }
    }
    try {
      config[key] = JSON.parse(obj)
    } catch {
      continue
    }
  }

  return config
}
