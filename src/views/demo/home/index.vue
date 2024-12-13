<!--
 * @Author: lyt
 * @Date: 2024-11-18 16:20:29
 * @LastEditTime: 2024-12-12 17:36:29
 * @LastEditors: lyt
 * @Description: demo-首页
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/views/demo/home/index.vue
 *  
-->
<template>
  <PageWrapper>
    <div class="toolbar">
      <a-button color="success" @click="goRoute('charts')">图表示例</a-button>
      <a-button color="error" @click="goRoute('form')">表单示例</a-button>
      <a-button color="warning" @click="goRoute('table')">表格示例</a-button>
      <a-button :style="{ 'background-color': '#6CC8E1', color: '#fff' }" @click="goRoute('model')">弹窗示例</a-button>
      <a-button @click="goRoute('sys/finDataSynthSecurity/dataOnChain')">具体示例</a-button>
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
    replace({ path: `/demo/${type}` });
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
