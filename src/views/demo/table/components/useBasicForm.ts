/*
 * @Author: lyt
 * @Date: 2024-12-11 16:13:34
 * @LastEditTime: 2024-12-12 16:19:33
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/views/demo/table/components/useBasicForm.ts
 *
 */
import { useTable } from '/@/components/Table';
import { getNodeColumns } from './tableData';
import { ref } from 'vue';
import { getNodeTableDataApi } from '../../../../api/demo/tableApi';
export const useBasicForm = () => {
  // 表格勾选key
  const checkedKeys = ref();

  // 任务表格配置
  const [nodeTable, { reload }] = useTable({
    api: getNodeTableDataApi,
    // dataSource: getNodeTableData(),
    columns: getNodeColumns(),
    fetchSetting: {
      pageField: 'pageNum',
    },
    // 选择列配置
    rowSelection: {
      type: 'checkbox',
      columnWidth: 20,
      // 全选事件
      // onSelectAll: (selected, selectedRows, changeRows) => {
      //   console.log('全选', selected, selectedRows, changeRows);
      // },
      // 选择改变事件
      onChange: (selectedRowKeys: (string | number)[], selectRow) => {
        // selectedRowKeys-选择行key结合，selectRow-选中行数据集合
        console.log('onChange', selectedRowKeys);
        checkedKeys.value = selectedRowKeys;
      },
    },
    // 是否显示表格设置
    // showTableSetting: true,
    // 是否开启搜索
    useSearchForm: false,
    // 是否显示序号
    showIndexColumn: false,
    // 是否显示边框
    bordered: true,
  });

  // 节点详情
  const nodeDetail = (record) => {
    console.log('节点详情', record);
  };

  // 存储状态
  const statusClick = (record) => {
    console.log('存储状态', record);
  };
  // 历史合成
  const historyClick = (record) => {
    console.log('历史合成', record);
  };
  // 数据
  const dataClick = (record) => {
    console.log('数据', record);
  };
  // 编辑
  const editClick = (record) => {
    console.log('编辑', record);
  };

  // 新增
  const addClick = () => {
    console.log('新增');
  };
  // 批量删除
  const batchDelete = () => {
    console.log('批量删除', checkedKeys.value);
  };

  const modelConfirm = () => {
    console.log('弹窗新增确认');
  };

  return { nodeTable, nodeDetail, statusClick, historyClick, dataClick, editClick, addClick, batchDelete, modelConfirm };
};
