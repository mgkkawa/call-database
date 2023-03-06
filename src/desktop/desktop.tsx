import { checkCallHistory, getConfig } from '../modules'

const config = getConfig(kintone.$PLUGIN_ID)
const { historyAppId } = config

kintone.events.on('app.record.edit.submit.success', async event => {
  if (!historyAppId) return event
  await checkCallHistory(event.record, historyAppId)
})
