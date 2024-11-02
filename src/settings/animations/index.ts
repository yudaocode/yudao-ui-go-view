export const animations = [
  {
    label: '强调动画',
    children: [
      { label: '弹跳', value: 'bounce' },
      { label: '闪烁', value: 'flash' },
      { label: '放大缩小', value: 'pulse' },
      { label: '放大缩小弹簧', value: 'rubberBand' },
      { label: '左右晃动', value: 'headShake' },
      { label: '左右扇形摇摆', value: 'swing' },
      { label: '放大晃动缩小', value: 'tada' },
      { label: '扇形摇摆', value: 'wobble' },
      { label: '左右上下晃动', value: 'jello' },
    ]
  },
  {
    label: '移入动画',
    children: [
      { label: '渐显', value: 'fadeIn' },
      { label: '向右进入', value: 'fadeInLeft' },
      { label: '向左进入', value: 'fadeInRight' },
      { label: '向上进入', value: 'fadeInUp' },
      { label: '向下进入', value: 'fadeInDown' },
      { label: '向右长距进入', value: 'fadeInLeftBig' },
      { label: '向左长距进入', value: 'fadeInRightBig' },
      { label: '向上长距进入', value: 'fadeInUpBig' },
      { label: '向下长距进入', value: 'fadeInDownBig' },
      { label: '旋转进入', value: 'rotateIn' },
      { label: '左顺时针旋转', value: 'rotateInDownLeft' },
      { label: '右逆时针旋转', value: 'rotateInDownRight' },
      { label: '左逆时针旋转', value: 'rotateInUpLeft' },
      { label: '右逆时针旋转', value: 'rotateInUpRight' },
      { label: '弹入', value: 'bounceIn' },
      { label: '向右弹入', value: 'bounceInLeft' },
      { label: '向左弹入', value: 'bounceInRight' },
      { label: '向上弹入', value: 'bounceInUp' },
      { label: '向下弹入', value: 'bounceInDown' },
      { label: '光速从右进入', value: 'lightSpeedInRight' },
      { label: '光速从左进入', value: 'lightSpeedInLeft' },
      { label: '光速从右退出', value: 'lightSpeedOutRight' },
      { label: '光速从左退出', value: 'lightSpeedOutLeft' },
      { label: 'Y轴旋转', value: 'flip' },
      { label: '中心X轴旋转', value: 'flipInX' },
      { label: '中心Y轴旋转', value: 'flipInY' },
      { label: '左长半径旋转', value: 'rollIn' },
      { label: '由小变大进入', value: 'zoomIn' },
      { label: '左变大进入', value: 'zoomInLeft' },
      { label: '右变大进入', value: 'zoomInRight' },
      { label: '向上变大进入', value: 'zoomInUp' },
      { label: '向下变大进入', value: 'zoomInDown' },
      { label: '向右滑动展开', value: 'slideInLeft' },
      { label: '向左滑动展开', value: 'slideInRight' },
      { label: '向上滑动展开', value: 'slideInUp' },
      { label: '向下滑动展开', value: 'slideInDown' }
    ]
  }
]



//动画曲线
export const animationsCurves = [
  {
    label: 'Easy_In',
    children: [
      { label: 'Linear', value: 'linear' },
      { label: 'Ease-In', value: 'ease-in' },
      { label: 'Sine', value: 'cubic-bezier(.47,0,.74,.71)' },
      { label: 'Quadratic', value: 'cubic-bezier(.55,.09,.68,.53)' },
      { label: 'Cubic', value: 'cubic-bezier(.55,.06,.68,.19)' },
      { label: 'Quartic', value: 'cubic-bezier(.9,.03,.69,.22)' },
      { label: 'Quintic', value: 'cubic-bezier(.76,.05,.86,.06)' },
      { label: 'Exponential', value: 'cubic-bezier(.95,.05,.8,.04)' },
      { label: 'Circular', value: 'cubic-bezier(.6,.04,.98,.34)' },
      { label: 'Backward', value: 'cubic-bezier(.6,-0.28,.74,.05)' },
    ]
  },
  {
    label: 'Easy_Out',
    children: [
      { label: 'Linear', value: 'linear' },
      { label: 'Ease-Out', value: 'ease-out' },
      { label: 'Sine', value: 'cubic-bezier(.39,.58,.57,1)' },
      { label: 'Quadratic', value: 'cubic-bezier(.25,.46,.45,.94)' },
      { label: 'Cubic', value: 'cubic-bezier(.22,.61,.36,1)' },
      { label: 'Quartic', value: 'cubic-bezier(.17,.84,.44,1)' },
      { label: 'Quintic', value: 'cubic-bezier(.23,1,.32,1)' },
      { label: 'Exponential', value: 'cubic-bezier(.19,1,.22,1)' },
      { label: 'Circular', value: 'cubic-bezier(.08,.82,.17,1)' },
      { label: 'Backward', value: 'cubic-bezier(.18,.89,.32,1.28)' },
    ]
  },
  {
    label: 'Easy_In_Out',
    children: [
      { label: 'Linear', value: 'linear' },
      { label: 'Ease', value: 'ease' },
      { label: 'Ease_In_Out', value: 'ease-in-out' },
      { label: 'Sine', value: 'cubic-bezier(.45,.05,.55,.95)' },
      { label: 'Quadratic', value: 'cubic-bezier(.46,.03,.52,.96)' },
      { label: 'Cubic', value: 'cubic-bezier(.65,.05,.36,1)' },
      { label: 'Quartic', value: 'cubic-bezier(.77,0,.18,1)' },
      { label: 'Quintic', value: 'cubic-bezier(.86,0,.07,1)' },
      { label: 'Exponential', value: 'cubic-bezier(1,0,0,1)' },
      { label: 'Circular', value: 'cubic-bezier(.79,.14,.15,.86)' },
      { label: 'Backward', value: 'cubic-bezier(.68,-0.55,.27,1.55)' },
    ]
  }
]


export const animationsDirections = [
  {
    label: '动画方向',
    children: [
      { label: '弹跳', value: 'bounce' },
      { label: '闪烁', value: 'flash' },
      { label: '放大缩小', value: 'pulse' },
      { label: '放大缩小弹簧', value: 'rubberBand' },
      { label: '左右晃动', value: 'headShake' },
      { label: '左右扇形摇摆', value: 'swing' },
      { label: '放大晃动缩小', value: 'tada' },
      { label: '扇形摇摆', value: 'wobble' },
      { label: '左右上下晃动', value: 'jello' },
    ]
  }
]
