/*
 * @Author: lyt
 * @Date: 2024-12-11 16:21:22
 * @LastEditTime: 2024-12-12 13:47:03
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/views/demo/form/components/formData.tsx
 *
 */

import { apiSelectDemoApi } from '/@/api/demo/formApi';
import { FormSchema } from '/@/components/Form/index';
import dayjs from 'dayjs';

export const basicSchema: FormSchema[] = [
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '新建合成请求表单',
  },
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
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '其他常用表单项',
  },
  {
    field: 'storage',
    component: 'Input',
    label: '存储量',
    colProps: {
      span: 12,
    },
    componentProps: {
      onChange: (e: any) => {
        console.log('存储量监听事件', e);
      },
    },
    suffix: 'T',
  },
  {
    field: 'storage',
    component: 'Input',
    label: '表单禁用',
    colProps: {
      span: 12,
    },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'radio',
    component: 'RadioGroup',
    label: '单选',
    colProps: {
      span: 12,
    },
    componentProps: {
      options: [
        {
          label: '过程查验',
          value: '1',
        },
        {
          label: '完整性验证',
          value: '2',
        },
        {
          label: '异常追溯',
          value: '3',
        },
      ],
    },
  },
  {
    field: 'checkbox',
    component: 'CheckboxGroup',
    label: '多选',
    colProps: {
      span: 12,
    },
    componentProps: {
      options: [
        {
          label: '过程查验',
          value: '1',
        },
        {
          label: '完整性验证',
          value: '2',
        },
        {
          label: '异常追溯',
          value: '3',
        },
      ],
    },
    defaultValue: ['1', '2'],
  },
  {
    label: '日期选择',
    field: 'dateSelect',
    component: 'DatePicker',
    componentProps: {
      //日期格式化，页面上显示的值
      format: 'YYYY-MM-DD',
      //返回值格式化（绑定值的格式）
      valueFormat: 'YYYY-MM-DD',
      //是否显示今天按钮
      showToday: true,
      //不可选择日期
      disabledDate: (currentDate) => {
        const date = dayjs(currentDate).format('YYYY-MM-DD');
        const nowDate = dayjs(new Date()).format('YYYY-MM-DD');
        //当天以前的日期不可选择
        if (date < nowDate) {
          return true;
        }
        return false;
      },
      placeholder: '请选择',
    },
    colProps: {
      span: 12,
    },
  },
  {
    label: '日期范围',
    field: 'dateRangeSelect',
    component: 'RangeDate',
    componentProps: {
      //日期格式化
      format: 'YYYY/MM/DD',
      //范围文本描述用集合
      placeholder: ['请选择开始日期', '请选择结束日期'],
    },
    colProps: {
      span: 12,
    },
  },
  {
    label: '下拉选择框',
    field: 'jinputtype',
    component: 'Select',
    componentProps: {
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
      ],
      //下拉多选
      mode: 'multiple',
      //配置是否可搜索
      showSearch: true,
      // 配置浮层的挂载容器，默认为元素body
      getPopupContainer: () => document.body,
    },
    colProps: {
      span: 12,
    },
  },
  {
    label: '级联选择',
    field: 'cascade',
    component: 'Cascader',
    componentProps: {
      //最多显示多少个tag
      maxTagCount: 2,
      //浮层预设位置
      placement: 'bottomRight',
      //在选择框中显示搜索框,默认false
      showSearch: true,
      options: [
        {
          label: '上海',
          value: 'Shanghai',
          children: [
            {
              label: '浦东新区',
              value: 'Pudong',
            },
            {
              label: '静安区',
              value: 'Jingan',
            },
          ],
        },
        {
          label: '江苏',
          value: 'JiangSu',
          children: [
            {
              label: '南京',
              value: 'Nanjing',
              children: [
                {
                  label: '中华门',
                  value: 'ZhongHuaMen',
                },
              ],
            },
          ],
        },
      ],
      getPopupContainer: () => document.body,
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'apiSelect',
    component: 'ApiSelect',
    label: '懒加载远程下拉',
    componentProps: {
      // 远程请求的接口
      api: apiSelectDemoApi,
      // 请求参数
      params: {
        id: 1,
      },
      // 返回数据中数据列表的字段中label的字段
      labelField: 'name',
      // 返回数据中数据列表的字段中value的字段
      valueField: 'id',
      immediate: false,
      onChange: (e) => {
        console.log('selected:', e);
      },
      // atfer request callback
      onOptionsChange: (options) => {
        console.log('get options', options.length, options);
      },
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'formSlotField',
    component: 'Input',
    label: '自定义Slot',
    slot: 'formSlot',
    colProps: {
      span: 24,
    },
  },
];
