interface AttrType {
  x: number
  y: number
  w: number
  h: number
}

export const useComponentStyle = (attr: AttrType, index: number) => {
  const componentStyle = {
    zIndex: index,
    left: `${attr.x}px`,
    top: `${attr.y}px`,
  }
  return componentStyle
}

export const useSizeStyle = (attr: AttrType) => {
  const sizeStyle = {
    width: `${attr.w}px`,
    height: `${attr.h}px`
  }
  return sizeStyle
}
