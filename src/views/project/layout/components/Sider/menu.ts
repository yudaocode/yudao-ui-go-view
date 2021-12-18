import { reactive, h } from 'vue'
import { renderIcon } from '@/utils'
import { RouterLink } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { MenuOption, MenuGroupOption } from 'naive-ui'
import {
  Grid as GridIcon,
  LogoAppleAppstore as LogoAppleAppstoreIcon,
  TvOutline as DesktopIcon,
  LaptopOutline as LaptopOutlineIcon,
} from '@vicons/ionicons5'

export const renderMenuLabel = (option: MenuOption | MenuGroupOption) => {
  return option.label
}

export const expandedKeys = () => ['all-project']

export const menuOptionsInit = () => {
  return reactive([
    {
      key: 'divider-1',
      type: 'divider'
    },
    {
      label: '项目',
      key: 'all-project',
      icon: renderIcon(GridIcon),
      children: [
        {
          type: 'group',
          label: '我的',
          key: 'my-project',
          children: [
            {
              label: () =>
                h(
                  RouterLink,
                  {
                    to: {
                      name: PageEnum.BASE_HOME_ITEMS_NAME
                    }
                  },
                  { default: () => '全部项目' }
                ),
              key: PageEnum.BASE_HOME_ITEMS_NAME,
              icon: renderIcon(DesktopIcon)
            },
            {
              label: () =>
                h(
                  RouterLink,
                  {
                    to: {
                      name: PageEnum.BASE_HOME_TEMPLATE_NAME
                    }
                  },
                  { default: () => '我的物料' }
                ),
              key: PageEnum.BASE_HOME_TEMPLATE_NAME,
              icon: renderIcon(LaptopOutlineIcon)
            }
          ]
        }
      ]
    },

    {
      key: 'divider-2',
      type: 'divider'
    },
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: PageEnum.BASE_HOME_TEMPLATE_MARKET_NAME
            }
          },
          { default: () => '物料市场' }
        ),
      key: PageEnum.BASE_HOME_TEMPLATE_MARKET_NAME,
      icon: renderIcon(LogoAppleAppstoreIcon)
    }
  ])
}
