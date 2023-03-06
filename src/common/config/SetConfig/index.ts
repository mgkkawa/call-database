export const setConfig = (config: any, callback?: VoidFunction) => {
  const newConfig: any = {}
  for (let key in config) {
    try {
      newConfig[key] = JSON.stringify(config[key])
    } catch {
      continue
    }
  }
  console.log(newConfig)
  kintone.plugin.app.setConfig(newConfig, () => {})
}
