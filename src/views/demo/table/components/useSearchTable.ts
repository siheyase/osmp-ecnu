/*
 * @Author: lyt
 * @Date: 2024-12-02 13:28:16
 * @LastEditTime: 2024-12-12 16:19:20
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/views/demo/table/components/useSearchTable.ts
 *
 */
import { useTable } from '/@/components/Table';
import { getHistCompTasksColumns, histCompTaskFormSchema } from './tableData';
import { ref } from 'vue';
import { getHistCompTaskDataApi } from '../../../../api/demo/tableApi';
import dayjs, { Dayjs } from 'dayjs';
import { getQueryAllTasksApi, getQueryDataApi } from '/@/api/demo/finDataSynthSecurityApi';
export const useSearchTable = () => {
  // 表格勾选key
  const checkedKeys = ref();

  // 任务表格配置
  const [histCompTasksTable, { reload, getForm }] = useTable({
    api: getQueryAllTasksApi,
    columns: getHistCompTasksColumns(),
    fetchSetting: {
      pageField: 'pageNum',
    },
    formConfig: {
      schemas: histCompTaskFormSchema,
      showAdvancedButton: false,
      labelWidth: 120,
      autoSubmitOnEnter: true, // 按下回车后自动提交
    },
    // // 选择列配置
    // rowSelection: {
    //   type: 'checkbox',
    //   columnWidth: 20,
    //   // 选择改变事件
    //   onChange: (selectedRowKeys: (string | number)[], selectRow) => {
    //     // selectedRowKeys-选择行key结合，selectRow-选中行数据集合
    //     console.log('onChange', selectedRowKeys);
    //     checkedKeys.value = selectedRowKeys;
    //   },
    // },
    // 是否显示表格设置
    // showTableSetting: true,
    // 是否开启搜索
    useSearchForm: false,
    // 是否显示序号
    showIndexColumn: true,
    // 是否显示边框
    bordered: true,
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
    if (getForm()) {
      // 设置搜索表单值
      getForm().setFieldsValue({
        taskCompTime: [startDate, endDate],
      });
    }
  };

  // 下载数据
  const downloadClick = (record) => {
    console.log('下载数据', record);
  };
  // 查看凭证
  const viewProofClick = (record) => {
    console.log('编辑', record);
  };

  // 删除
  const deleteClick = (record) => {
    console.log('删除', record);
  };
  // 批量操作
  const batchClick = () => {
    console.log('批量操作', checkedKeys.value);
  };

  return { histCompTasksTable, downloadClick, viewProofClick, deleteClick, batchClick, selectDate, reload };
};
