/*
 * @Author: lyt
 * @Date: 2024-12-13 14:36:28
 * @LastEditTime: 2024-12-13 15:29:37
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/src/router/routes/dataOnChain.ts
 *
 */
import type { AppRouteRecordRaw } from '/@/router/types';

export const DataOnChainRoute: AppRouteRecordRaw = {
  // 指定了访问该页面的URL路径
  path: '/finDataSynthSecurity/dataOnChain',
  // 该路由的唯一标识符（所有路由的命名都必须是唯一的）
  name: 'FinDataSynthSecurity-DataOnChain',
  // 动态导入页面组件，实现按需加载，优化应用性能
  component: () => import('/@/views/demo/sys/finDataSynthSecurity/DataOnChain.vue'),
  // 提供额外的元数据，如页面标题，可用于导航栏、面包屑导航等
  meta: {
    // 页面标题
    title: '数据合成安全',
  },
};
