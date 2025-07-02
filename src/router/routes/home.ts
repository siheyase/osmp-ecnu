import type { AppRouteRecordRaw } from '/@/router/types';
import { PageEnum } from '/@/enums/pageEnum';

// export const HomeRoute: AppRouteRecordRaw = {
//   path: '/home',
//   name: 'Home',
//   component: () => import('/@/views/home/HomePage.vue'),
//   meta: {
//     title: '首页',
//   },
// };

export const HOME_ROUTE_REDIRECT: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  // 重定向, 访问/时重定向到/home
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};
