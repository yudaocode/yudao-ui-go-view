export type Chartype = {
  id: number | string
  title: string // 标题
  lableId: string | number
  label: string // 标签
  release: number // 0未发布 | 1已发布
  icon: any
  ['string']: string
}

export type ChartList = Chartype[]