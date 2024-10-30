<template>
  <n-config-provider
    :theme="darkTheme"
    :hljs="hljsTheme"
    :locale="locale"
    :date-locale="dateLocale"
    :theme-overrides="overridesTheme"
  >
    <go-app-provider>
      <I18n></I18n>
      <router-view></router-view>
    </go-app-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider } from 'naive-ui'
import { GoAppProvider } from '@/components/GoAppProvider'
import { I18n } from '@/components/I18n'
import { useSystemInit, useDarkThemeHook, useThemeOverridesHook, useCode, useLang } from '@/hooks'

//字节图表全局配置部分
import vScreenVolcanoBlue from '@visactor/vchart-theme/public/vScreenVolcanoBlue.json';
import VChart from '@visactor/vchart';
import {IGlobalMarkThemeByName, IGlobalMarkThemeByType, ITheme} from "@visactor/vchart/esm/theme/interface";
import {languages} from "monaco-editor";
import type {IColorKey} from "@visactor/vchart/esm/theme/color-scheme/interface";
import type {ITokenKey} from "@visactor/vchart/esm/theme/token";
import type {ISeriesTheme} from "@visactor/vchart/esm/series/interface";
import type {IComponentTheme} from "@visactor/vchart/esm/component/interface";
const myVScreenVolcanoBlue: Partial<ITheme> = {
   ...vScreenVolcanoBlue,
  type:"dark",
  background:vScreenVolcanoBlue.background as IColorKey,
  fontFamily:vScreenVolcanoBlue.fontFamily as ITokenKey,
  mark:vScreenVolcanoBlue.mark as IGlobalMarkThemeByType,
  markByName:vScreenVolcanoBlue.markByName as IGlobalMarkThemeByName,
  series:vScreenVolcanoBlue.series as ISeriesTheme,
  component: vScreenVolcanoBlue.component as unknown  as IComponentTheme
  // 其他字段逐个检查和断言
};

VChart.ThemeManager.registerTheme('vScreenVolcanoBlue',myVScreenVolcanoBlue);
// apply the theme
VChart.ThemeManager.setCurrentTheme('vScreenVolcanoBlue');
//字节图标配置部分END



// 暗黑主题
const darkTheme = useDarkThemeHook()

// 主题配置
const overridesTheme = useThemeOverridesHook()

// 代码主题
const hljsTheme = useCode()

// 系统全局数据初始化
useSystemInit()

// 全局语言
const { locale, dateLocale } = useLang()

</script>
