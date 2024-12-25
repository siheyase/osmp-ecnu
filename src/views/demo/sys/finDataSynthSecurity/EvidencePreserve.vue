<!-- 页面2.2 存证溯源 -->
<template>
  <a-row gutter="16">
    <!-- 左侧搜索框 -->
    <a-col :span="6">
      <a-card title="存证溯源">
        <a-form :model="searchForm" layout="vertical" @finish="handleSearch">
          <a-form-item label="合成任务ID" name="taskId">
            <a-input v-model:value="searchForm.taskId" placeholder="请输入合成任务ID" />
          </a-form-item>
          <a-form-item label="交易哈希" name="transactionHash">
            <a-input v-model:value="searchForm.transactionHash" placeholder="请输入交易哈希" />
          </a-form-item>
          <a-form-item label="节点信息" name="nodeInfo">
            <a-input v-model:value="searchForm.nodeInfo" placeholder="请输入节点信息" />
          </a-form-item>
          <a-form-item label="查询任务筛选">
            <a-checkbox-group v-model:value="searchForm.filters">
              <a-checkbox value="processTrace">过程查验</a-checkbox>
              <a-checkbox value="integrityValidation">完整性验证</a-checkbox>
              <a-checkbox value="exceptionCleaning">异常清洗</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <a-space>
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button @click="resetSearchForm">重置</a-button>
          </a-space>
        </a-form>
      </a-card>
    </a-col>

    <!-- 右侧查询结果 -->
    <a-col :span="18">
      <a-card title="查询结果" body-style="{ overflowY: 'auto', maxHeight: '600px' }">
        <!-- 基本信息 -->
        <h3>任务信息</h3>
        <a-table :columns="taskProcess.tableColumn" :data-source="taskQueryResult?.taskInfo" bordered pagination="false" :showHeader="false" />
        <a-divider />

        <!-- 过程查验 -->
        <template v-if="searchForm.filters.includes('processTrace')">
          <h3>过程查验</h3>
          <a-table :columns="taskProcess.tableColumn" :data-source="taskProcess?.taskInfo" bordered pagination="false" :showHeader="false" />
          <a-divider />
        </template>

        <!-- 完整性验证和阶段心跳记录 -->
        <template v-if="searchForm.filters.includes('integrityValidation')">
          <h3>完整性验证</h3>
          <a-collapse ghost>
            <a-collapse-panel v-for="(data, index) in taskValidation.tableData" :key="index" :header="'验证结果 Slot ' + (index + 1)">
              <a-table :columns="taskValidation.tableColumn" :data-source="data" bordered pagination="false" />
            </a-collapse-panel>
          </a-collapse>
          <a-divider />

          <h3>阶段心跳记录</h3>
          <a-table :columns="taskPhase.tableColumn" :data-source="taskPhase.taskInfo" bordered pagination="false" />
          <a-divider />
        </template>

        <!-- 异常追溯 -->
        <template v-if="searchForm.filters.includes('exceptionCleaning')">
          <h3>异常追溯</h3>
          <a-table :columns="taskException.tableColumn" :data-source="taskException.taskInfo" bordered pagination="false" />
        </template>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useEvidenceOnChain } from './useDataOnChain';

const { taskQueryResult, taskProcess, taskValidation, taskPhase, taskException } = useEvidenceOnChain();

// 搜索表单数据
const searchForm = reactive({
  taskId: '',
  transactionHash: '',
  nodeInfo: '',
  filters: [], // 用于存储用户勾选的查询类型
});

// 重置表单
function resetSearchForm() {
  searchForm.taskId = '';
  searchForm.transactionHash = '';
  searchForm.nodeInfo = '';
  searchForm.filters = [];
}
</script>

<style scoped>
.a-card {
  margin-bottom: 20px;
}

.table-container {
  margin-top: 20px;
}
</style>

<style scoped lang="less">
.ant-pagination {
  display: none;
}
</style>
