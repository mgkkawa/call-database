import React, { useEffect, useState } from 'react'
import { getAppFields, getForm, getKintoneRestAPIClient, setConfig } from '@/common'
import classes from './InLine.module.css'
import Loading from './Loading'
import AppsSelecter from './AppsSelecter'
import UniqueFieldSelecter from './UniqueFieldSelecter'
import { TextField } from '@mui/material'
import { FieldSelecter } from './FieldSelecter'
import SetFields from './SetFields'

// const columns: ColumnDef<any>[] = [
//   { header: 'データベースアプリ', accessorKey: 'toCode' },
//   { header: 'コールアプリ', accessorKey: 'thisCode' },
// ]

type InlineProps = {
  configs: {
    config: PluginConfigProps
    setFunction: Function
  }
}

// tableみたいにしたい。
// <Selecter /> <Selecter /> <Button /> <Button />
// で、一つのパッケージにして
// 行ごとにそれぞれのセレクターの値を保存。管理。
export default function InLine({ configs }: InlineProps) {
  const { config, setFunction } = configs
  const [appId, setAppId] = useState(config.appId || '')
  const [targetFields, setTargetFields] = useState<any[]>([])
  const [thisAppFields, setThisAppFields] = useState<any[]>([])
  const [companyId, setCompanyId] = useState(config.companyId || '')
  const [fields, setFields] = useState(config.setFields || [{ toCode: '', thisCode: '' }])
  const [statusField, setStatusField] = useState(config.statusField || '')

  useEffect(() => {
    const asyncTarget = async () => {
      setTargetFields(await getAppFields(appId))
      setThisAppFields(await getAppFields(kintone.app.getId() as number))
      const newConfig = { ...config }
      newConfig.appId = appId
      setFunction(newConfig)
    }
    asyncTarget()
  }, [appId])

  useEffect(() => {
    const newConfig = { ...config }
    newConfig.companyId = companyId
    newConfig.statusField = statusField
    setFunction(newConfig)
  }, [companyId, statusField])

  return (
    <div className={classes.wrapper}>
      <AppsSelecter defaultValue={appId} setFunction={setAppId} />
      <br />
      {targetFields.length && thisAppFields.length ? (
        <>
          <UniqueFieldSelecter
            defaultValue={companyId}
            setFunction={setCompanyId}
            fields={targetFields.filter(field => field.unique)}
          />
          <br />
          <FieldSelecter
            label='完了ステータスフィールド選択'
            type='DROP_DOWN'
            fields={thisAppFields}
            setFunction={setStatusField}
            defaultValue={statusField}
          />
          <br />
          <SetFields setFields={fields} toFields={targetFields} thisFields={thisAppFields} />
        </>
      ) : (
        <></>
      )}
      <br />
      <hr />
      <Loading />
    </div>
  )
}
