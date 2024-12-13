/*
 * @Author: lyt
 * @Date: 2024-12-12 13:47:31
 * @LastEditTime: 2024-12-12 13:47:31
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/views/demo/model/formData.tsx
 *
 */

import { FormSchema } from '/@/components/Form';

// 新建/编辑合成请求表单配置项
export const requestSchema: FormSchema[] = [
  {
    field: 'randomParameters',
    component: 'Input',
    label: '随机参数',
    // 是否必填（true：label前加红色星号+调用表单校验validateFields()会校验该字段）
    required: true,
    // 宽度占表单整体宽度的24格（常见取值：总-24，半-12）
    colProps: {
      span: 24,
    },
  },
  {
    field: 'dataSize',
    component: 'Input',
    label: '数据规模 ',
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'numberOfNodes',
    component: 'InputNumber',
    label: '节点数量',
    componentProps: {
      placeholder: '请输入', // 自定义placeholder
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'trustEvidence',
    component: 'Switch',
    label: '可信证明',
    defaultValue: true, // 设置默认值
    colProps: {
      span: 24,
    },
  },
];
