import { TableOptions } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { getAppFields } from '@/common'
import classes from './InLine.module.css'
import Loading from './Loading'
import Table from './Table'

// const columns: ColumnDef<any>[] = [
//   { header: 'データベースアプリ', accessorKey: 'toCode' },
//   { header: 'コールアプリ', accessorKey: 'thisCode' },
// ]

type InlineProps = {
  config: PluginConfigProps
  setFunction: Function
}

export default function InLine({ config, setFunction }: InlineProps) {
  const [toFields, setToFields] = useState<any[]>([])
  const [thisFields, setThisFields] = useState<any[]>([])
  const [isReady, setIsReady] = useState(false)
  const [fields, setFields] = useState<SetFieldProps[]>(config.setFields)
  console.log(config)

  useEffect(() => {
    const setFields = async () => {
      setToFields(await getAppFields(config.appId))
      setThisFields(await getAppFields(kintone.app.getId() as number))

      if (config.setFields) {
      }

      setIsReady(true)
    }
    setFields()
  }, [])

  return (
    <div className={classes.wrapper}>
      {/* <Table data={tableProps} /> */}
      <Loading />
    </div>
  )
}
