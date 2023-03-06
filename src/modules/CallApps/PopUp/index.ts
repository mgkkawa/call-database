import Swal from 'sweetalert2'

export const toastPopup = async ({ id, revision }: { id?: string; revision: string }) => {
  const isAddRecord = Number(revision) > 1
  if (isAddRecord) {
    await Swal.fire({
      title: 'コール履歴更新完了',
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
    })
    return
  }
  await Swal.fire({
    title: 'コール履歴登録完了',
    text: 'レコード番号:' + id,
    icon: 'success',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
  })
}
