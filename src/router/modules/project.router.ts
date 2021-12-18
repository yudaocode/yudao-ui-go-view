import { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

const projectRoutes: RouteRecordRaw = {
  path: PageEnum.BASE_HOME,
  name: PageEnum.BASE_HOME_NAME,
  component: () => import('@/views/project/index.vue'),
  meta: {
    title: '项目',
    isRoot: true
  }
}

export default projectRoutes
