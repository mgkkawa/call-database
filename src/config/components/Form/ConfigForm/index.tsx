import React, { useCallback, useEffect, useState } from 'react'
import {
  Stack,
  Box,
  Select,
  MenuItem,
  IconButton,
  Button,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material'
import { useForm, SubmitHandler, useFieldArray, Controller, useWatch } from 'react-hook-form'
import { getAppFields, getKintoneRestAPIClient, getSpaceId, setConfig } from '@/common'
import { App } from '@kintone/rest-api-client/lib/client/types'
import { Add as AddIcon, DeleteForever, DeleteOutline as DeleteOutlineIcon } from '@mui/icons-material'
import classes from './ConfigForm.module.css'

export default function ConfigForm(props: PluginConfigProps) {
  // 描画フラグ
  const [isReady, setIsReady] = useState(false)

  // データベースアプリID
  // const [appId, setAppId] = useState<string>(props.appId || '')

  // スペース内アプリ一覧データ
  const [apps, setApps] = useState<App[]>([])

  // アプリ内フィールドデータ
  const [thisFields, setThisFields] = useState<any[]>([])

  // データベースアプリ内フィールドデータ
  const [toFields, setTofields] = useState<any[]>([])

  // useFormで必要な関数を取得し、デフォルト値を指定。
  const { register, reset, control, handleSubmit } = useForm<PluginConfigProps>({
    defaultValues: props,
  })

  const appId = useWatch({ control, name: 'appId' })

  // サブミット時の処理を作成
  const onSubmit: SubmitHandler<PluginConfigProps> = (data: PluginConfigProps) => {
    console.log(data)
    setConfig(data)
    window.history.back()
  }

  // useFieldArray 設定
  const { fields, append, remove } = useFieldArray({
    name: 'setFields',
    control,
  })

  // Component生成時の処理
  useEffect(() => {
    const asyncGets = async () => {
      // kintoneRESTAPIClientを呼び出し
      const client = await getKintoneRestAPIClient()
      // 自分が今いるスペースIDを取得（ゲストスペースのみ）
      // 必ず取得するようにしてもいいかも。
      const spaceId = (await getSpaceId()) as number
      // spaceIdに対して、アプリ一覧を取得。
      const appsResponse = await client.app.getApps({ spaceIds: [spaceId] })
      // appsにアプリ一覧を保存
      setApps(appsResponse.apps)
      // thisFieldsにアプリのフィールド一覧を保存
      setThisFields(await getAppFields(kintone.app.getId() as number))
    }
    asyncGets()
  }, [])

  // appIdが入力された時
  useEffect(() => {
    // appId が空白（初期値）なら処理終了
    if (appId === '') return

    const asyncGets = async () => {
      setTofields(await getAppFields(appId))
      setIsReady(true)
    }

    asyncGets()
  }, [appId])

  const returnMenuItem = useCallback((field: any, type: string | false = false, unique = false) => {
    const item = <MenuItem key={field.code} value={field.code}>{`${field.label}  [${field.code}]`}</MenuItem>
    if (type && unique) return field.unique && field.type === type ? item : null
    if (type) return field.type === type ? item : null
    if (unique) return field.unique ? item : null
    return item
  }, [])

  const dbItem = useCallback((field: any) => {
    const REMOVE_CODES = [
      'serialNumber',
      'sendDate',
      'accountLimit',
      'companyId',
      'responseDate',
      'name',
      'nameKana',
      'presidentPostName',
      'president',
      'presidentNameKana',
      'zipCode',
      'location',
      'mediumCategory',
      'subCategory',
      'employees',
      'phoneNumber',
      'isPriorOnly',
      'isOtherService',
      'remarks',
    ]
    if (REMOVE_CODES.includes(field.code)) return null
    const item = <MenuItem key={field.code} value={field.code}>{`${field.label}  [${field.code}]`}</MenuItem>
    return item
  }, [])

  return (
    <>
      {/* 5. form要素のonSubmitに1.で取得しているhandleSubmitを指定します */}
      <Stack component='form' noValidate onSubmit={handleSubmit(onSubmit)} spacing={2} sx={{ m: 2, width: '20%' }}>
        <Controller
          name='appId'
          control={control}
          render={({ field, fieldState }) => (
            <FormControl className={classes.configRow} error={fieldState.invalid}>
              <InputLabel id='app-id-label'>データベースアプリ</InputLabel>
              <Select
                labelId='app-id-label'
                label='データベースアプリ'
                {...register('appId', { required: true })}
                {...field}>
                {apps.map(app => (
                  <MenuItem key={app.appId} value={app.appId}>{`${app.name}  [${app.appId}]`}</MenuItem>
                ))}
              </Select>
              <FormHelperText>保存先データベースアプリを選択してください。{fieldState.error?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name='statusField'
          control={control}
          render={({ field, fieldState }) => (
            <FormControl className={classes.configRow} error={fieldState.invalid}>
              <InputLabel id='status-field-label'>完了ステータスフィールド</InputLabel>
              <Select
                labelId='status-field-label'
                label='完了ステータスフィールド'
                {...register('statusField', { required: true })}
                {...field}>
                {thisFields.map(field => returnMenuItem(field, 'DROP_DOWN'))}
              </Select>
              <FormHelperText>
                完了ステータスを管理するフィールドを選択してください。{fieldState.error?.message}
              </FormHelperText>
            </FormControl>
          )}
        />

        {isReady ? (
          <>
            {fields.map((field, index) => (
              <React.Fragment key={field.id}>
                <Box display='flex' sx={{ m: 1, alignContent: 'center' }}>
                  <Controller
                    name={`setFields.${index}.toCode`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <FormControl error={fieldState.invalid} sx={{ mt: 1, mb: 1, mr: 1, width: '40%' }}>
                        <InputLabel id='to-code-label'>データベース側</InputLabel>
                        <Select
                          labelId='to-code-label'
                          label='データベース側'
                          {...register(`setFields.${index}.toCode`)}
                          {...field}>
                          {toFields.map(field => dbItem(field))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <p>←</p>
                  <Controller
                    name={`setFields.${index}.thisCode`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <FormControl error={fieldState.invalid} sx={{ m: 1, width: '40%' }}>
                        <InputLabel id='this-code-label'>コールアプリ側</InputLabel>
                        <Select
                          labelId='this-code-label'
                          label='コールアプリ側'
                          {...register(`setFields.${index}.thisCode`)}
                          {...field}>
                          {thisFields.map(field => returnMenuItem(field))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <IconButton aria-label='delete' onClick={() => remove(index)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              </React.Fragment>
            ))}
          </>
        ) : null}
      </Stack>
      <Button
        // MUI v5 から sx props で Button コンポーネントにも直接スタイルを書けるようになった
        sx={{ mr: 1 }}
        startIcon={<AddIcon />}
        // append 関数はフィールドの最後に input を追加する
        onClick={() =>
          append({
            toCode: '',
            thisCode: '',
          })
        }>
        行を追加する
      </Button>
      <Button
        startIcon={<DeleteForever />}
        sx={{ mr: 1 }}
        onClick={() =>
          reset({
            appId: '',
            statusField: '',
            setFields: [
              {
                toCode: '',
                thisCode: '',
              },
            ],
          })
        }>
        リセット
      </Button>
      <hr />
      <Box textAlign='left'>
        <Button
          className={classes.formButton}
          color='primary'
          variant='outlined'
          disableElevation
          size='large'
          onClick={() => window.history.back()}>
          キャンセル
        </Button>
        <Button
          className={classes.formButton}
          color='primary'
          variant='contained'
          disableElevation
          size='large'
          // submit イベントからバリデーションがトリガーされる
          onClick={handleSubmit(onSubmit)}>
          保存
        </Button>
      </Box>
    </>
  )
}
