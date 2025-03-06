<!--
 * @Author: lyt
 * @Date: 2024-11-18 16:20:29
 * @LastEditTime: 2024-12-13 15:06:03
 * @LastEditors: lyt
 * @Description: demo-首页
 * @FilePath: /osmp-demo/src/views/demo/home/index.vue
 *  
-->
<template>
  <PageWrapper>
    <div class="toolbar">
      <a-button @click="goRoute('dataSynthMonitor')">页面1.1</a-button>
      <a-button @click="goRoute('dataSynthTask')">页面1.2</a-button>
      <a-button @click="goRoute('blockChainMonitor')">页面2.1</a-button>
      <a-button @click="goRoute('evidencePreserve')">页面2.2</a-button>
    </div>
    <div>
      <router-view />
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page';
import { useRouter } from 'vue-router';

const { replace } = useRouter();
const goRoute = (type) => {
  if (type === 'dataSynthMonitor') {
    replace({ path: `/finDataSynthSecurity/dataSynthMonitor` });
  } else if (type === 'dataSynthTask') {
    replace({ path: `/finDataSynthSecurity/dataSynthTask` });
  } else if (type === 'blockChainMonitor') {
    replace({ path: `/finDataSynthSecurity/blockChainMonitor` });
  } else if (type === 'evidencePreserve') {
    replace({ path: `/finDataSynthSecurity/evidencePreserve` });
  } else {
    replace({ path: `/demo/${type}` });
  }
};
</script>
<style lang="scss" scoped>
.toolbar {
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  margin-bottom: 20px;
}
</style>
