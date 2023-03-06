import Swal from 'sweetalert2'
import { KintoneRecordEvent } from '../../../types'
import { ConfigProps } from '../../Plugin'

export const editCheck = async (event: KintoneRecordEvent, config: ConfigProps) => {
  const record = event.record
  const field = config.editCheckField as string
  const check = record[field]
  const value = config.editCheckValue
  let isCheck: boolean = false

  if (typeof check.value === 'string') {
    isCheck = check.value == value
  }

  if (!isCheck) return false

  const popup = await Swal.fire({
    title: 'コールしますか？',
    confirmButtonText: 'はい',
    showCancelButton: true,
    cancelButtonText: 'いいえ',
  })
  return popup.isDismissed
}
