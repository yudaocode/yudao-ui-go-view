interface Window {
  $loading: any
  $message: any
  $dialog: any
  // 语言
  $t: any
  $vue: any
  // 键盘按键记录
  $KeyboardActive?: { [T: string]: boolean }
  onKeySpacePressHold?: Function

  // 编辑 JSON 的存储对象
  opener: any

  //当画布大小重新计算后
  onCanvsSizecomputed:Function
}

declare type Recordable<T = any> = Record<string, T>
