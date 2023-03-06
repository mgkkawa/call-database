export const getConfig = () => {
  const pluginId = kintone.$PLUGIN_ID
  console.log(pluginId)
  const config = kintone.plugin.app.getConfig(pluginId)

  for (let key in config) {
    if (!config[key]) {
      continue
    }
    try {
      config[key] = JSON.parse(config[key])
    } catch {
      continue
    }
  }

  return config
}
