import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { DemoRoute } from './demo';
import { DataOnChainRoute } from './dataOnChain';

import { PageEnum } from '/@/enums/pageEnum';

const modules = import.meta.glob('./modules/**/*.ts', { eager: true });

const routeModuleList: AppRouteModule[] = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = (modules as Recordable)[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.DEMO_INDEX,
  meta: {
    title: 'Root',
  },
};

export const basicRoutes = [RootRoute, PAGE_NOT_FOUND_ROUTE, DemoRoute, DataOnChainRoute];
