<template>
  <div>
    <a-card title="新建合成任务">
  <a-form layout="vertical">
    <!-- 第一行：合成数据类型、模型、数据集 -->
    <a-row :gutter="16">
      <a-col :span="6">
        <a-form-item label="合成数据类型">
          <a-select v-model:value="newTask.dataType" placeholder="请选择合成数据类型" @change="updateModels">
            <a-select-option value="time_series">时序数据</a-select-option>
            <a-select-option value="graph">图数据</a-select-option>
            <a-select-option value="table">关系表格数据</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="选择模型">
          <a-select v-model:value="newTask.model" placeholder="请选择模型" :disabled="!newTask.dataType" @change="updateDatasets">
            <a-select-option v-for="model in availableModels" :key="model.value" :value="model.value">
              {{ model.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="选择数据集">
          <a-select v-model:value="newTask.dataset" placeholder="请选择数据集" :disabled="!newTask.model">
            <a-select-option v-for="dataset in availableDatasets" :key="dataset.value" :value="dataset.value">
              {{ dataset.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>

    <!-- 第二行：合成数量（占一行）+ 可信证明（右对齐） -->
    <a-row :gutter="16" align="middle">
      <a-col :span="6">
        <a-form-item label="合成数量（条）">
          <a-input-number v-model:value="newTask.synthesisAmount" :min="1" style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="需要可信证明">
          <a-switch v-model:checked="newTask.trustedProof" />
        </a-form-item>
      </a-col>
    </a-row>
    <div style="width: 100%; display: flex; justify-content: center;">
  <a-button type="primary" @click="createTask">提交任务</a-button>
</div>

  </a-form>
</a-card>
<!-- 任务管理 Tabs -->
<div style="margin-top: 20px; padding: 20px; display: flex; justify-content: center;">
  <a-tabs v-model:activeKey="activeTab" type="card">
    <a-tab-pane key="history" tab="历史合成任务">
      <!-- 搜索栏 -->
      <a-card>
        <a-form layout="inline">
          <a-form-item>
            <a-input v-model:value="filters.taskId" placeholder="输入合成任务ID" allow-clear />
          </a-form-item>
          <a-form-item>
            <a-input v-model:value="filters.txHash" placeholder="输入交易哈希" allow-clear />
          </a-form-item>
          <a-form-item>
            <a-select v-model:value="filters.status" placeholder="选择状态" allow-clear>
              <a-select-option value="completed">完成</a-select-option>
              <a-select-option value="pending">未完成</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="applyFilters">搜索</a-button>
            <a-button style="margin-left: 8px" @click="resetFilters">重置</a-button>
          </a-form-item>
        </a-form>
      </a-card>

      <!-- 任务表格 -->
      <BasicTable @register="histCompTasksTable">
        <template #form-taskCompTime="{ model, field }">
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
        <template #action="{ record }">
          <a-button type="link" @click="downloadClick(record)">下载数据</a-button>
          <a-button type="link" @click="viewProofClick(record)">查看凭证</a-button>
          <a-button type="link" danger @click="deleteClick(record)">删除</a-button>
        </template>
      </BasicTable>
    </a-tab-pane>
  </a-tabs>
</div>

  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { BasicTable } from '/@/components/Table';
import { useSearchTable } from '../../table/components/useSearchTable';

const { histCompTasksTable, downloadClick, viewProofClick, deleteClick, selectDate } = useSearchTable();

// 任务搜索条件
const filters = ref({
  taskId: '',
  txHash: '',
  status: null,
});

// 选中的 tab
const activeTab = ref('history');

// 新建任务表单数据
const newTask = ref({
  dataType: '', // 数据类型
  model: '', // 选择的模型
  dataset: '', // 选择的数据集
  synthesisAmount: 1, // 合成数量（条）
});

// 可用模型映射
const modelMapping = {
  time_series: [
    { label: 'ABM', value: 'ABM' },
  ],
  graph: [
    { label: 'BAED', value: 'BAED' },
  ],
  table: [
    { label: 'FINKAN', value: 'FINKAN' },
  ],
};

// 可用数据集映射
const datasetMapping = {
  ABM: [
    { label: 'Dataset 1', value: 'dataset_1' },
    { label: 'Dataset 2', value: 'dataset_2' },
  ],
  BAED: [
    { label: 'Dataset A', value: 'dataset_A' },
    { label: 'Dataset B', value: 'dataset_B' },
  ],
  FINKAN: [
    { label: 'Dataset X', value: 'dataset_X' },
    { label: 'Dataset Y', value: 'dataset_Y' },
  ],
};

// 计算可用模型
const availableModels = computed(() => {
  return newTask.value.dataType ? modelMapping[newTask.value.dataType] : [];
});

// 计算可用数据集
const availableDatasets = computed(() => {
  return newTask.value.model ? datasetMapping[newTask.value.model] : [];
});

// 当选择数据类型时，更新可选模型
const updateModels = () => {
  newTask.value.model = '';
  newTask.value.dataset = '';
};

// 当选择模型时，更新可选数据集
const updateDatasets = () => {
  newTask.value.dataset = '';
};

// 提交任务
const createTask = () => {
  console.log('创建任务:', newTask.value);
};

// 过滤任务
const applyFilters = () => {
  console.log('搜索任务:', filters.value);
};

// 重置搜索
const resetFilters = () => {
  filters.value = { taskId: '', txHash: '', status: null };
};
</script>

<style scoped lang="less">
.formSlot {
  width: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 10px;
}
.date-select-btn {
  margin-left: 10px;
}
</style>
