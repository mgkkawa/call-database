import React, { useCallback, useEffect, useState } from 'react'
import { ConfigProps, getKintoneRestAPIClient } from '../../../modules'
import { Description, Title } from '.'
import { AppsSelect } from '..'
import { Submits } from './Submits'
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'

const PLUGIN_ID = kintone.$PLUGIN_ID
const PLUGIN_DESCRIPTION =
  'コール履歴アプリの設定。\n保存先アプリを選択後、対応フィールドの設定をお願いします。\n対応フィールドの設定をスキップした場合は、\n同じフィールドコードを自動で検出し保存します。'
const DELETE_TYPES = [
  'CATEGORY',
  'STATUS',
  'RECORD_NUMBER',
  'CREATED_TIME',
  'CREATOR',
  'STATUS_ASSIGNEE',
  'UPDATED_TIME',
  'MODIFIER',
]

export function Form() {
  const [config, setConfig] = useState<ConfigProps>(kintone.plugin.app.getConfig(PLUGIN_ID))
  const [appId, setAppId] = useState<number | string>(config.historyAppId ? config.historyAppId : '')
  const [fields, setFields] = useState<any[]>([])
  const [isFields, setIsFields] = useState<boolean>(false)
  const [thisFields, setThisFields] = useState<any[]>([])
  const [fieldsIds, setFieldsIds] = useState<string[]>([])

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    kintone.plugin.app.setConfig(config)
  }

  function cancelHandler() {}

  type GetFieldsProps = {
    setFunction: Function
    appId?: number
  }

  const useGetFields = useCallback(async ({ setFunction, appId }: GetFieldsProps) => {
    const client = await getKintoneRestAPIClient()
    const params = { app: appId ? appId : (kintone.app.getId() as number) }
    const layout = await client.app.getFormLayout(params)
    const formFields = await client.app.getFormFields(params)
    const properties = formFields.properties

    for (let row of layout.layout) {
      if (!('fields' in row)) continue
      for (let field of row.fields) {
        if (DELETE_TYPES.includes(field.type) || !('code' in field)) continue
        const code = field.code as string
        setFunction((prevFields: any) => {
          if (!properties[code]) return prevFields
          const result = [...prevFields, LayoutCheck(properties[code])]
          return result
        })
      }
    }
    return
  }, [])

  const getFields = useCallback(async () => {
    await useGetFields({ setFunction: setFields, appId: Number(appId) })
    return
  }, [appId])

  const getThisFields = useCallback(async () => {
    await useGetFields({ setFunction: setThisFields })
  }, [])

  useEffect(() => {
    if (appId) {
      getFields()
    }
  }, [appId])

  useEffect(() => {
    if (fields.length) {
      setIsFields(true)
      getThisFields()
    }
  }, [fields])

  return (
    <form onSubmit={submitHandler}>
      <Title />
      <Description text={PLUGIN_DESCRIPTION} />
      <br />
      <AppsSelect setFunction={setAppId} value={appId} />
      <br />
      <hr />
      {isFields ? (
        <>
          <FieldsSelect fields={fields} thisFields={thisFields} />
        </>
      ) : (
        <></>
      )}
      <br />
      <Submits />
    </form>
  )
}

type FieldsSelectProps = {
  fields: { code: string; label: string }[]
  thisFields: { code: string; label: string }[]
  defaultValue?: string
  id?: string
  setHandler?: Function
}

function FieldsSelect({ fields, thisFields, defaultValue, setHandler, id }: FieldsSelectProps) {
  const Style: React.CSSProperties = { marginTop: 20, width: 300 }
  const defaultId: string = 'default-label-id'
  id = id ? id : defaultId

  const [code, setCode] = useState((defaultValue ??= ''))

  function changeHandler(e: SelectChangeEvent) {
    setCode(e.target.value)
  }

  useEffect(() => {
    setHandler ? setHandler(code) : null
  }, [code])

  return (
    <>
      <FormControl style={Style}>
        <InputLabel id={id}>保存フィールド選択</InputLabel>
        <Select labelId={id} onChange={changeHandler}>
          {fields.map((field, key) => (
            <MenuItem key={key} value={field.code} defaultValue={code}>
              {field.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {code ? (
        <FormControl style={Style}>
          <InputLabel>対応フィールド選択</InputLabel>
          <Select>
            {thisFields.map((field, key) => {
              const appField = fields.filter(f => f.code === code)[0]
              // if(appField.)
              return (
                <MenuItem key={key + 'this'} value={field.code} defaultValue={code}>
                  {field.label}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      ) : (
        <></>
      )}
    </>
  )
}

function LayoutCheck(obj: any) {
  const deletes = [
    'noLabel',
    'required',
    'defaultValue',
    'defaultNowValue',
    'expression',
    'entities',
    'hideExpression',
    'maxLength',
    'minLength',
    'unique',
  ]
  const returnObject = { ...obj }
  for (let key of deletes) delete returnObject[key]
  return returnObject
}
