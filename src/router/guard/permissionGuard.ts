import type { Router, RouteRecordRaw } from 'vue-router';

// import { usePermissionStoreWithOut } from '/@/store/modules/permission';

import { PageEnum } from '/@/enums/pageEnum';
import { useUserStoreWithOut } from '/@/store/modules/user';

import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

import { RootRoute } from '/@/router/routes';

//auth2登录路由
const ROOT_PATH = RootRoute.path;

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  // const permissionStore = usePermissionStoreWithOut();

  // 自定义首页跳转次数
  let homePathJumpCount = 0;

  router.beforeEach(async (to, from, next) => {
    if (
      // 【#6861】跳转到自定义首页的逻辑，只跳转一次即可
      homePathJumpCount < 1 &&
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo.homePath &&
      userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    ) {
      homePathJumpCount++;
      next(userStore.getUserInfo.homePath);
      return;
    }
    next();

    // const token = userStore.getToken;
    // if (whitePathList.includes(to.path as PageEnum)) {
    //   next();
    //   return;
    // }

    // if (!token) {
    //   if (to.meta.ignoreAuth) {
    //     next();
    //     return;
    //   }

    //   if (whitePathList.includes(to.path as PageEnum)) {
    //     //在免登录白名单，直接进入
    //     next();
    //   }
    //   const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
    //     path: '',
    //     replace: true,
    //   };

    //   if (to.fullPath) {
    //     const getFullPath = to.fullPath;
    //     if (getFullPath == '/' || getFullPath == '/500' || getFullPath == '/400') {
    //       return;
    //     }
    //     redirectData.query = {
    //       ...redirectData.query,
    //       redirect: to.fullPath,
    //     };
    //   }

    //   next(redirectData);
    //   return;
    // }

    // if (userStore.getLastUpdateTime === 0) {
    //   userStore.setAllDictItemsByLocal();
    // }
    // if (permissionStore.getIsDynamicAddedRoute) {
    //   next();
    //   return;
    // }

    // // 构建后台菜单路由
    // const routes = await permissionStore.buildRoutesAction();

    // routes.forEach((route) => {
    //   router.addRoute(route as unknown as RouteRecordRaw);
    // });

    // router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
    // permissionStore.setDynamicAddedRoute(true);

    // if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
    //   // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
    //   next({ path: to.fullPath, replace: true, query: to.query });
    // } else {
    //   const redirectPath = (from.query.redirect || to.path) as string;
    //   const redirect = decodeURIComponent(redirectPath);
    //   const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
    //   next(nextData);
    // }
  });
}
