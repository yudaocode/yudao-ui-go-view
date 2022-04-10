export enum TypeEnum {
  BOTTON = 'bottom',
  IMPORTUPLOAD = 'importUpload'
}

export type BtnListType = {
  key: string
  type: TypeEnum
  name: string
  icon: any
  handle?: () => void
}
