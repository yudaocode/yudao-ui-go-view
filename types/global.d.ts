interface Window {
  $loading: any
  $message: any
  $dialog: any
  // 语言
  $t: any
  $vue: any
}


declare interface MyResponseType {
  code: number;
  msg: string;
  data: any;
}

declare type Recordable<T = any> = Record<string, T>