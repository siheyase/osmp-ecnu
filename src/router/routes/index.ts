import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
// import { DataSynthMonitorRoute, DataSynthTaskRoute, BlockChainMonitorRoute, EvidencePreserveRoute } from './dataOnChain';
import { EcnuQianKunRoute } from './ecnuQianKun';
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
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const basicRoutes = [
  RootRoute,
  PAGE_NOT_FOUND_ROUTE,
  // DataSynthMonitorRoute,
  // DataSynthTaskRoute,
  // BlockChainMonitorRoute,
  // EvidencePreserveRoute,
  EcnuQianKunRoute,
];
