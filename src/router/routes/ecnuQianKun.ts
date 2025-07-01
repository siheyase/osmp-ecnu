import type { AppRouteRecordRaw } from '/@/router/types';

export const EcnuQianKunRoute: AppRouteRecordRaw = {
  path: '/finDataSynthSecurity',
  name: 'FinDataSynthSecurity',
  redirect: '/finDataSynthSecurity/home', // 重定向, 访问 /finDataSynthSecurity 时重定向到 /finDataSynthSecurity/home
  meta: {
    title: '金融数据合成',
  },
  children: [
    {
      path: 'home',
      name: 'FinDataSynthSecurity-Home',
      component: () => import('/@/views/home/HomePage.vue'),
      meta: {
        title: '首页',
      },
    },
    {
      path: 'dataSynthMonitor',
      name: 'FinDataSynthSecurity-DataSynthMonitor',
      component: () => import('/@/views/demo/sys/finDataSynthSecurity/DataSynthMonitor.vue'),
      meta: {
        title: '数据合成监控',
      },
    },
    {
      path: 'dataSynthTask',
      name: 'FinDataSynthSecurity-DataSynthTask',
      component: () => import('/@/views/demo/sys/finDataSynthSecurity/DataSynthTask.vue'),
      meta: {
        title: '数据合成任务',
      },
    },
    {
      path: 'blockChainMonitor',
      name: 'FinDataSynthSecurity-BlockChainMonitor',
      component: () => import('/@/views/demo/sys/finDataSynthSecurity/BlockChainMonitor.vue'),
      meta: {
        title: '区块链监控',
      },
    },
    {
      path: 'evidencePreserve',
      name: 'FinDataSynthSecurity-EvidencePreserve',
      component: () => import('/@/views/demo/sys/finDataSynthSecurity/EvidencePreserve.vue'),
      meta: {
        title: '存证溯源',
      },
    },
  ],
};
