import customed from './themes/customed.json'
import dark from './themes/dark.json'
import chalk from './themes/chalk.json'
import essos from './themes/essos.json'
import macarons from './themes/macarons.json'
import purplePassion from './themes/purple-passion.json'
import roma from './themes/roma.json'
import shine from './themes/shine.json'
import vintage from './themes/vintage.json'
import walden from './themes/walden.json'
import westeros from './themes/westeros.json'
import wonderland from './themes/wonderland.json'
// 默认主题详细配置
import themeJson from './global.theme.json'

export const chartColors = {
  dark,
  customed,
  macarons,
  walden,
  purplePassion,
  vintage,
  chalk,
  westeros,
  wonderland,
  essos,
  shine,
  roma
}

// 默认主题
export const defaultTheme = 'dark'

// 主题色列表
export type ChartColorsNameType = keyof typeof chartColorsName
export const chartColorsName = {
  dark: '明亮',
  customed: '暗淡',
  macarons: '马卡龙',
  walden: '蓝绿',
  wonderland: '青草',
  purplePassion: '深紫',
  vintage: '复古',
  chalk: '粉红',
  westeros: '灰粉',
  essos: '橘红',
  shine: '深色',
  roma: '罗马红'
}

// 主题色列表
export const chartColorsshow = {
  dark: 'linear-gradient(to right, #4992ff 0%, #7cffb2 100%)',
  customed: 'linear-gradient(to right, #5470c6 0%, #91cc75 100%)',
  macarons: 'linear-gradient(to right, #2ec7c9 0%, #b6a2de 100%)',
  walden: 'linear-gradient(to right, #3fb1e3 0%, #6be6c1 100%)',
  wonderland: 'linear-gradient(to right, #4ea397 0%, #22c3aa 100%)',
  purplePassion: 'linear-gradient(to right, #9b8bba 0%, #e098c7 100%)',
  vintage: 'linear-gradient(to right, #d87c7c 0%, #919e8b 100%)',
  chalk: 'linear-gradient(to right, #fc97af 0%, #d4a4eb 100%)',
  westeros: 'linear-gradient(to right, #516b91 0%, #edafda 100%)',
  essos: 'linear-gradient(to right, #893448 0%, #d95850 100%)',
  shine: 'linear-gradient(to right, #c12e34 0%, #0098d9 100%)',
  roma: 'linear-gradient(to right, #e01f54 0%, #5e4ea5 100%)'
}
// 主题色列表
export const chartColorsSearch = {
  dark: ['#4992ff', '#7cffb2'],
  customed: ['#5470c6', '#91cc75'],
  macarons: ['#2ec7c9', '#b6a2de'],
  walden: ['#3fb1e3', '#6be6c1'],
  wonderland: ['#4ea397', '#22c3aa'],
  purplePassion: ['#9b8bba', '#e098c7'],
  vintage: ['#d87c7c', '#919e8b'],
  chalk: ['#fc97af', '#d4a4eb'],
  westeros: ['#516b91', '#edafda'],
  essos: ['#893448', '#d95850'],
  shine: ['#c12e34', '#0098d9'],
  roma: ['#e01f54', '#5e4ea5'],
}

// 默认主题详细配置
export type GlobalThemeJsonType = typeof themeJson
export const globalThemeJson = themeJson
