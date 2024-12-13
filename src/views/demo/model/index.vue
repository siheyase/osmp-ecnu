<!--
 * @Author: lyt
 * @Date: 2024-12-12 16:12:37
 * @LastEditTime: 2024-12-12 16:31:19
 * @LastEditors: lyt
 * @Description: 弹窗系列
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/views/demo/model/index.vue
 *  
-->
<template>
  <a-button type="primary" preIcon="ant-design:plus-outlined" @click="addClick"> 新增</a-button>
  <a-button type="primary" style="margin-left: 20px" @click="editClick"> 编辑</a-button>
  <BasicModal v-bind="$attrs" @register="registerModal" title="新增" @ok="handleSubmit" width="900px" destroyOnClose>
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { requestSchema } from './formData';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { nextTick } from 'vue';

  const [registerModal, { openModal, closeModal }] = useModal();

  const { createMessage } = useMessage();

  // 基础表单配置
  const [registerForm, { setFieldsValue, validateFields, getFieldsValue, resetFields }] = useForm({
    schemas: requestSchema,
    labelWidth: 150,
    showAdvancedButton: false,
    showActionButtonGroup: false,
  });

  // 新增
  const addClick = () => {
    openModal();
  };

  // 编辑
  const editClick = () => {
    openModal();
    nextTick(() => {
      setFieldsValue({ randomParameters: '123', dataSize: '123', numberOfNodes: 900, trustEvidence: false });
    });
  };

  //表单提交事件
  const handleSubmit = async () => {
    try {
      // 表单校验
      await validateFields();
      createMessage.success('新增成功！' + JSON.stringify(getFieldsValue()));
      // 关闭弹窗
      closeModal();
    } catch (error: any) {
      if (error && error?.errorFields && error?.errorFields.length > 0) {
        createMessage.warn(error.errorFields[0].errors);
      }
    }
  };
</script>
