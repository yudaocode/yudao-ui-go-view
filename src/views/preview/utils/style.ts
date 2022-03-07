import { PickCreateComponentType } from '@/packages/index.d'
import { EditCanvasConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'

type AttrType = PickCreateComponentType<'attr'>

export const useComponentStyle = (attr: AttrType, index: number) => {
  const componentStyle = {
    zIndex: index + 1,
    left: `${attr.x}px`,
    top: `${attr.y}px`
  }
  return componentStyle
}

export const useSizeStyle = (attr: AttrType, scale?: number) => {
  const sizeStyle = {
    width: `${scale ? scale * attr.w : attr.w}px`,
    height: `${scale ? scale * attr.h : attr.h}px`,
  }
  return sizeStyle
}

export const useEditCanvasConfigStyle = (canvas: EditCanvasConfigType) => {
  // 背景
  const computedBackground = canvas.selectColor
    ? { background: canvas.background }
    : { background: `url(${canvas.backgroundImage}) no-repeat center/100% !important` }
  return {
    position: 'relative',
    width: canvas.width ? `${canvas.width || 100}px` : '100%',
    height: canvas.height ? `${canvas.height}px` : '100%',
    ...computedBackground
  }
}
