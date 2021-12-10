import { RouteRecordRaw } from 'vue-router';

const projectRoutes: RouteRecordRaw = {
  path: '/project',
  name: 'Project',
  component: () => import('@/views/project/index.vue'),
  meta: {
    title: '项目',
    isRoot: true,
  }
};

export default projectRoutes;