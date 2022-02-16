import { PublicConfigType } from '@/packages/index.d'
type AttrType = Pick<PublicConfigType, 'attr'>['attr']

export const useComponentStyle = (attr: AttrType, index: number) => {
  const componentStyle = {
    zIndex: index + 1,
    left: `${attr.x}px`,
    top: `${attr.y}px`
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
