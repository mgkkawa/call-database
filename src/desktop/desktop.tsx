import React from 'react'
import ReactDOM from 'react-dom/client'
import { DeleteButton, ListCheckButton } from './components'
import { checkPhoneNumber, getConfig, getRecord } from './modules'

const config = getConfig(kintone.$PLUGIN_ID)
export const { appId, statusField } = config

const phoneNumber = 'phoneNumber'
const nextCall = 'nextPhoneNumber'

const priorConfig = [
  { th: 'date', to: 'date' },
  { th: 'time', to: 'time' },
  { th: 'user', to: 'user' },
  { th: 'callMemo', to: 'callMemo' },
]

kintone.events.on('app.record.index.show', async event => {
  const user = kintone.getLoginUser()
  if (user.id != '93') return

  const menuSpace = kintone.app.getHeaderMenuSpaceElement() as HTMLElement
  const root = ReactDOM.createRoot(menuSpace)
  root.render(
    <>
      <ListCheckButton />
      <DeleteButton />
    </>,
  )
})

kintone.events.on('app.record.detail.show', async event => {
  await checkPhoneNumber(phoneNumber, event)
  const record = await getRecord(appId, event.record.companyId.value as string)
  if (!record) return
  const newRecord = { ...record }
  priorConfig.forEach(configure => {
    const { th, to } = configure
    newRecord[to].value = event.record[th].value
  })
  console.log(newRecord)
})

kintone.events.on('app.record.edit.show', event => {
  event.record.companyId.disabled = true
  return event
})

kintone.events.on('app.record.edit.change.nextCall', event => {
  checkPhoneNumber(nextCall)
})

kintone.events.on('app.record.edit.submit.success', async event => {
  if (!appId) return event
  const { record } = event
  const completeStatus = record[statusField].value
  if (completeStatus != '完了') return
})
