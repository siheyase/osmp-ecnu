<!--
 * @Author: lyt
 * @Date: 2024-12-11 16:16:37
 * @LastEditTime: 2024-12-12 12:27:16
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/views/demo/form/components/Basic.vue
 *  
-->
<template>
  <div class="basic-form">
    <BasicForm @register="basicForm">
      <!-- 自定义表单项 -->
      <template #formSlot="{ model, field }">
        <div class="formSlot">
          <a-range-picker v-model:value="model[field]" format="YYYY-MM-DD" />
          <div class="date-select-btn">
            <a-button type="text" @click="selectDate('today')">今日</a-button>
            <a-button type="text" @click="selectDate('yesterday')">昨日</a-button>
            <a-button type="text" @click="selectDate('lastSevendays')">最近7天</a-button>
            <a-button type="text" @click="selectDate('lastThirtyDays')">最近30天</a-button>
          </div>
        </div>
      </template>
    </BasicForm>
    <div class="btns">
      <a-button type="primary" @click="submit">提交</a-button>
      <a-button @click="() => validateFields()">校验</a-button>
      <a-button @click="resetFields()">重置</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm } from '/@/components/Form/index';
  import { useBasicForm } from './useBasicForm';
  const { basicForm, submit, validateFields, resetFields, selectDate } = useBasicForm();
</script>
<style scoped lang="less">
  .basic-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    .formSlot {
      width: 100%;
      display: flex;
      flex-direction: row;
      column-gap: 10px;
    }
    .btns {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      column-gap: 10px;
    }
  }
</style>
