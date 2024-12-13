/*
 * @Author: lyt
 * @Date: 2024-11-18 15:06:42
 * @LastEditTime: 2024-12-12 17:25:11
 * @LastEditors: lyt
 * @Description: demo模块路由
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/router/routes/demo.ts
 *
 */
import type { AppRouteRecordRaw } from '/@/router/types';

export const DemoRoute: AppRouteRecordRaw = {
  path: '/demo',
  name: 'Demo',
  component: () => import('/@/views/demo/home/index.vue'),
  meta: {
    title: 'Demo示例',
  },
  children: [
    {
      path: '',
      name: 'Home',
      redirect: '/demo/charts',
      component: () => import('/@/views/demo/home/index.vue'),
      meta: {
        title: 'Demo-首页',
        currentActiveMenu: '/demo/charts',
      },
    },
    {
      path: 'charts',
      name: 'Charts',
      component: () => import('/@/views/demo/charts/index.vue'),
      meta: {
        title: 'Demo-图表',
      },
    },
    {
      path: 'form',
      name: 'Form',
      component: () => import('/@/views/demo/form/index.vue'),
      meta: {
        title: 'Demo-表单',
      },
    },
    {
      path: 'table',
      name: 'Table',
      component: () => import('/@/views/demo/table/index.vue'),
      meta: {
        title: 'Demo-表格',
      },
    },
    {
      path: 'model',
      name: 'Model',
      component: () => import('/@/views/demo/model/index.vue'),
      meta: {
        title: 'Demo-弹窗',
      },
    },
    {
      path: 'sys/finDataSynthSecurity/dataOnChain',
      name: 'Sys-FinDataSynthSecurity-DataOnChain',
      component: () => import('/@/views/demo/sys/finDataSynthSecurity/DataOnChain.vue'),
      meta: {
        title: 'Demo-数据合成安全',
      },
    },
  ],
};
