export const getConfig = (pluginId: string) => {
  const config: any = kintone.plugin.app.getConfig(pluginId)
  const keys: PluginConfigpropsKey[] = ['appId', 'statusField', 'setFields']

  for (let key of keys) {
    // if (key === 'setFields') {
    //   delete config[key]
    // }
    if (!keys.includes(key)) delete config[key]
    const obj = config[key]
    if (!obj) {
      switch (key) {
        case 'appId':
        case 'statusField':
          config[key] = ''
          continue
        default:
          config[key] = [{ toCode: '', thisCode: '' }]
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
