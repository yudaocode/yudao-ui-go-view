// 鼠标点击左右键
export enum MouseEventButton {
  LEFT = 1,
  RIGHT = 2,
}

// 页面拖拽键名
export enum DragKeyEnum {
  DROG_KEY = 'ChartData'
}

// 操作枚举
export enum MenuEnum {
  ARROW_UP = 'up',
  ARROW_RIGHT = 'right',
  ARROW_DOWN = 'down',
  ARROW_LEFT = 'left',
  DELETE = 'delete',
  COPY = 'copy',
  CUT = 'cut',
  PARSE = 'parse',
  TOP = 'top',
  BOTTOM = 'bottom',
  UP = 'up',
  DOWN = 'down',
  CLEAR = 'clear',
  GROUP = 'group',
  UN_GROUP = 'unGroup',

  BACK = 'back',
  FORWORD = 'forward'
}

// Win 键盘枚举
export enum WinKeyboard {
  CTRL = 'ctrl',
  SHIFT = 'shift',
  ALT = ' alt',
  CTRL_SOURCE_KEY = "control",
  SHIFT_SOURCE_KEY = "shift",
  ALT_SOURCE_KEY = "alt"
}

// Mac 键盘枚举
export enum MacKeyboard {
  // 还是用 Command 吧
  CTRL = '⌘',
  SHIFT = '⇧',
  ALT = '⌥',
  CTRL_SOURCE_KEY = "⌘",
  SHIFT_SOURCE_KEY = "⇧",
  ALT_SOURCE_KEY = "⌥"
}
