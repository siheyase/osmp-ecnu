<template>
  <PageWrapper>
    <div class="toolbar">
      <a-button v-for="btn in buttons" :key="btn.type" @click="goRoute(btn.type)">
        {{ btn.label }}
      </a-button>
    </div>
    <a-card title="一站式平台当前登录用户信息">
      <p>用户账号：{{ userInfo.username ?? '--' }}</p>
      <p>用户姓名：{{ userInfo.realname ?? '--' }}</p>
      <p>头像：<a-avatar size="large" :src="userInfo.avatar ?? '--'" /></p>
      <p>性别：{{ userInfo.sex_dictText ?? '--' }}</p>
      <p>邮箱：{{ userInfo.email ?? '--' }}</p>
      <p>手机号：{{ userInfo.phone ?? '--' }}</p>
    </a-card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '/@/store/modules/user';
  import { computed } from 'vue';

  const router = useRouter();
  const userStore = useUserStore();

  const buttons = [
    { type: 'dataSynthMonitor', label: '页面1.1' },
    { type: 'dataSynthTask', label: '页面1.2' },
    { type: 'blockChainMonitor', label: '页面2.1' },
    { type: 'evidencePreserve', label: '页面2.2' },
  ];

  const routeMap: Record<string, string> = {
    dataSynthMonitor: '/finDataSynthSecurity/dataSynthMonitor',
    dataSynthTask: '/finDataSynthSecurity/dataSynthTask',
    blockChainMonitor: '/finDataSynthSecurity/blockChainMonitor',
    evidencePreserve: '/finDataSynthSecurity/evidencePreserve',
  };

  const goRoute = (type: string) => {
    router.replace({ path: routeMap[type] || `/demo/${type}` });
  };

  const userInfo = computed(() => userStore.getUserInfo);
</script>

<style lang="scss" scoped>
  .toolbar {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    margin-bottom: 20px;
  }
</style>
