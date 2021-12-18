import { reactive, h } from 'vue'
import { renderIcon } from '@/utils'
import { RouterLink } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { MenuOption, MenuGroupOption } from 'naive-ui'
import { FolderOpen as FolderOpenIcon, LogoAppleAppstore as LogoAppleAppstoreIcon, } from '@vicons/ionicons5'

export const renderMenuLabel = (option: MenuOption | MenuGroupOption) => {
  return option.label
}

export const menuOptionsInit = () => {
  return reactive([
    {
      key: 'divider-1',
      type: 'divider'
    },
    {
      type: 'group',
      label: '我的',
      key: 'people',
      children: [
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: PageEnum.BASE_HOME_NAME
                }
              },
              { default: () => '全部项目' }
            ),
          key: PageEnum.BASE_HOME_NAME,
          icon: renderIcon(FolderOpenIcon)
        }
      ]
    },
    {
      key: 'divider-1',
      type: 'divider'
    },
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: PageEnum.BASE_HOME_NAME
            }
          },
          { default: () => '模板市场' }
        ),
      key: 'store',
      icon: renderIcon(LogoAppleAppstoreIcon)
    }
  ])
}
