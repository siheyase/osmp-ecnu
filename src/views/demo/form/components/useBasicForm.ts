/*
 * @Author: lyt
 * @Date: 2024-12-11 16:21:56
 * @LastEditTime: 2024-12-12 16:20:47
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/views/demo/form/components/useBasicForm.ts
 *
 */
import { useForm } from '/@/components/Form/index';
import { useMessage } from '/@/hooks/web/useMessage';
import { basicSchema } from './formData';
import dayjs, { Dayjs } from 'dayjs';

interface ValidateError {
  errorFields?: Array<{ errors: string[] }>;
}
export const useBasicForm = () => {
  const { createMessage } = useMessage();

  // 基础表单配置
  const [basicForm, { setFieldsValue, validateFields, getFieldsValue, resetFields }] = useForm({
    schemas: basicSchema,
    labelWidth: 150,
    showAdvancedButton: false,
    showActionButtonGroup: false,
  });

  // 选择日期
  const selectDate = (value: string) => {
    const today = new Date();
    const formatDate = (date: Date): Dayjs => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return dayjs(`${y}-${m}-${d}`, 'YYYY-MM-DD');
    };

    const calculateDate = (offset: number): Dayjs => {
      const date = new Date(today);
      date.setDate(today.getDate() - offset);
      return formatDate(date);
    };

    let startDate: Dayjs = formatDate(today);
    let endDate: Dayjs = formatDate(today);

    switch (value) {
      case 'today':
        startDate = formatDate(today);
        endDate = formatDate(today);
        break;
      case 'yesterday':
        startDate = calculateDate(1);
        endDate = calculateDate(1);
        break;
      case 'lastSevendays':
        startDate = calculateDate(6);
        break;
      case 'lastThirtyDays':
        startDate = calculateDate(29);
        break;
      default:
        break;
    }
    // 设置表单值
    setFieldsValue({
      formSlotField: [startDate, endDate],
    });
  };

  // 表单提交
  const submit = async () => {
    try {
      // 表单校验
      await validateFields();
      createMessage.success('表单数据:' + JSON.stringify(getFieldsValue()));
    } catch (error) {
      const errorInfo = error as ValidateError;
      if (errorInfo && errorInfo?.errorFields && errorInfo?.errorFields.length > 0) {
        const errorMsg = errorInfo.errorFields[0].errors;
        createMessage.warn(errorMsg);
      }
    }
  };

  return { basicForm, submit, validateFields, resetFields, selectDate };
};
