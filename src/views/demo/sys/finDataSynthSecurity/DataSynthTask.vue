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
            <a-form-item label="选择参数集">
              <a-select v-model:value="newTask.dataset" placeholder="请选择参数集" :disabled="!newTask.model">
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
            <a-form-item label="合成数量（单位：条）">
              <a-input-number v-model:value="newTask.synthesisAmount" :min="1" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="合成任务名称">
              <a-input v-model:value="newTask.taskName" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="需要可信证明">
              <a-switch v-model:checked="newTask.trustedProof" />
            </a-form-item>
          </a-col>
        </a-row>
        <div style="width: 100%; display: flex; justify-content: center">
          <a-button type="primary" @click="createTask">提交任务</a-button>
        </div>
      </a-form>
    </a-card>
    <!-- 任务管理 Tabs -->
    <div style="margin-top: 0px; padding: 20px; justify-content: center">
      <a-tabs v-model:activeKey="activeTab" type="card">
        <a-tab-pane key="history" tab="历史合成任务">
          <!-- 搜索栏 -->
          <!-- <a-card>
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
          </a-card> -->

          <!-- 任务表格 -->
          <BasicTable @register="histCompTasksTable" :scroll="{ x: 100, y: 400 }">
            <!-- <template #form-taskCompTime="{ model, field }">
              <div class="formSlot">
                <a-range-picker v-model:value="model[field]" format="YYYY-MM-DD" />
                <div class="date-select-btn">
                  <a-button type="text" @click="selectDate('today')">今日</a-button>
                  <a-button type="text" @click="selectDate('yesterday')">昨日</a-button>
                  <a-button type="text" @click="selectDate('lastSevendays')">最近7天</a-button>
                  <a-button type="text" @click="selectDate('lastThirtyDays')">最近30天</a-button>
                </div>
              </div>
            </template> -->
            <template #action="{ record }">
              <a-button type="link" @click="showSynthModal(record)">合成详情</a-button>
              <a-button type="link" :disabled="record.status !== 0" @click="handleDownloadStream(record)">下载数据</a-button>
              <a-button type="link" @click="evidencePage(record.taskID)">查看凭证</a-button>
              <a-button type="link" :disabled="record.status !== 0" @click="handleUploadTaskStream(record)">上传数据</a-button>
              <!-- <a-button type="link" danger @click="deleteClick(record)">删除</a-button> -->
            </template>
            <template #txHash="{ record }">
              <a-typography-paragraph copyable>
                {{ record.txHash }}
              </a-typography-paragraph>
            </template>
            <template #taskId="{ record }">
              <a-typography-paragraph copyable>
                {{ record.taskID }}
              </a-typography-paragraph>
            </template>
          </BasicTable>
        </a-tab-pane>
      </a-tabs>
    </div>

    <a-modal v-model:open="nodeModalVisable" title="并行合成详情" :style="{ width: '800px' }" centered @ok="nodeModalVisable = false">
      <template #footer>
        <a-button key="back" @click="nodeModalVisable = false">返回</a-button>
      </template>
      <!-- <a-list bordered size="large">
        <a-list-item>
          <span><strong>区块哈希:</strong> <a-tag color="pink">{{ blockItem.blockHash }}</a-tag></span>
        </a-list-item>
        <a-list-item>
          <span><strong>父区块哈希:</strong> <a-tag color="orange">{{ blockItem.parentHash }}</a-tag></span>
        </a-list-item>
        <a-list-item>
          <span><strong>区块高度:</strong> <a-tag color="green">{{ blockItem.blockHeight }}</a-tag></span>
          <span><strong>交易数量:</strong> <a-tag color="blue">{{ blockItem.nbTransactions }}</a-tag></span>
        </a-list-item>
        <a-list-item>
          <span><strong>Merkle Root:</strong> <a-tag color="cyan">{{ blockItem.merkleRoot }}</a-tag></span>
        </a-list-item>
        <a-list-item>
          <div>
            <span><strong>交易哈希:</strong></span>
            <BasicTable v-if="blockItem.txHashs && blockItem.txHashs.length > 0" :data-source="blockItem.txHashs"
              :columns="blockInfoColumn" bordered size="small" row-key="index" :pagination="false" />
            <span v-else>暂无交易</span>
          </div>
        </a-list-item>
      </a-list> -->
      <BasicTable :data-source="dataItem.nodes" :columns="nodeInfoColumn" bordered size="small" row-key="index" :pagination="false">
        <template #nodeId="{ record }">
          <div>
            <img :src="ECNU_ICON" :style="{ width: '50px', height: '50px' }" />
            {{ record.nodeId }}
          </div>
        </template>
      </BasicTable>
    </a-modal>
    <!-- 上传数据弹窗 -->
    <a-modal 
      v-model:open="uploadModalVisible" 
      title="上传任务数据" 
      :style="{ width: '800px' }" 
      :maskStyle="{ backgroundColor: 'rgba(0, 0, 0, 0.1)', boxShadow: 'none' }"
      centered
      :closable="true"
      :maskClosable="false"
      @ok="handleUploadConfirm"
      @cancel="handleUploadCancel"
    >

      <template #footer>
        <a-button key="cancel" @click="handleUploadCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="uploading" @click="handleUploadConfirm">上传</a-button>
      </template>

      <div style="padding: 20px 25px;">
        <div style="margin-bottom: 20px; font-size: 16px; color: #333;">
          <strong>合成任务ID：</strong>{{ uploadForm.taskID }}
          <span style="margin-left: 20px;">
            <strong>任务名称：</strong>{{ uploadForm.taskName }}
          </span>
        </div>

        <a-form :model="uploadForm" layout="vertical">
          <a-form-item label="用途">
            <a-input v-model:value="uploadForm.purpose" placeholder="请输入用途（可选）" />
          </a-form-item>

          <a-form-item label="描述">
            <a-textarea
              v-model:value="uploadForm.description"
              placeholder="请输入描述（可选）"
              :rows="3"
            />
          </a-form-item>

          <a-form-item label="创建人">
            <a-input v-model:value="uploadForm.createBy" placeholder="请输入创建人（可选）" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { useSearchTable } from '../../table/components/useSearchTable';
  import { createTaskApi, downLoadCollectApi, getSynthDataApi, uploadTaskApi } from '/@/api/demo/finDataSynthSecurityApi';
  import { message } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { calculateDataSize } from '/@/utils/value/calDataSize';
  import ECNU_ICON from '/@/assets/ecnu.png';

  const router = useRouter();

  // 跳转并传参（query 方式）
  const evidencePage = (taskId) => {
    router.push({
      path: '/finDataSynthSecurity/evidencePreserve',
      query: { taskId: taskId },
    });
  };

  const { histCompTasksTable, viewProofClick, reload } = useSearchTable();

  // 任务搜索条件
  const filters = ref({
    taskId: '',
    txHash: '',
    status: null,
  });

  // 选中的 tab
  const activeTab = ref('history');

  // 合成详情
  const nodeModalVisable = ref<boolean>(false);

  // 新建任务表单数据
  const newTask = ref({
    taskName: 'default',
    dataType: '', // 数据类型
    model: '', // 选择的模型
    dataset: '', // 选择的数据集
    synthesisAmount: 1, // 合成数量（条）
    trustedProof: false,
  });

  // 可用模型映射
  const modelMapping = {
    time_series: [{ label: 'ABM', value: 'ABM' }],
    graph: [{ label: 'BAED', value: 'BAED' }],
    table: [{ label: 'FINKAN', value: 'FINKAN' }],
  };

  // 可用数据集映射
  const datasetMapping = {
    ABM: [{ label: 'ABM_SHL2', value: 'SHL2 TA0_600519_202401-202402_defreg' }],
    BAED: [{ label: 'elliptic', value: 'elliptic' }],
    FINKAN: [{ label: 'FINKAN_default', value: 'default of credit card clients' }],
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
  const createTask = async () => {
    console.log('创建任务:', newTask.value);
    if (newTask.value.trustedProof == true) {
      message.info('可信证明，该功能未实现');
      return;
    }
    const res = await createTaskApi({
      name: newTask.value.taskName,
      model: newTask.value.model,
      params: {
        dataset: newTask.value.dataset,
      },
      size: newTask.value.synthesisAmount,
      isReliable: !newTask.value.trustedProof,
    });
    if (res.status == 'OK') {
      message.success('创建成功');
      newTask.value = {
        dataType: '', // 数据类型
        model: '', // 选择的模型
        dataset: '', // 选择的数据集
        synthesisAmount: 1, // 合成数量（条）
        trustedProof: false,
      };
      setTimeout(() => reload(), 5000);
    } else {
      message.error('创建失败');
    }
  };

  onMounted(() => {
    setInterval(function () {
      reload();
    }, 10000);
  });

  let dataItem = ref({
    model: 'default',
    nodes: [],
  });

  const nodeInfoColumn = [
    {
      title: '节点ID',
      dataIndex: 'nodeId',
      key: 'nodeId',
      slots: {
        customRender: 'nodeId',
      },
    },
    { title: '合成数据量', dataIndex: 'data', key: 'data' },
  ];

  //查询合成详情
  const showSynthModal = async (task) => {
    // 1. 调用接口获取数据（假设已通过其他方式获取到接口返回的data）
    const res = await getSynthDataApi({
      query: 'TaskOnNodesQuery',
      taskID: task.taskID,
    });
    dataItem.value = {
      model: task.model,
      nodes: Object.entries(res.data.nodeInfo).map(([nodeId, data]) => ({
        nodeId: `ECNU-合成节点-${nodeId}`,
        data: calculateDataSize(data, task.model, 'AUTO'),
      })),
    };
    nodeModalVisable.value = true;
  };

  // const handleDownload = async (task) => {
  //   try {
  //     // 1. 调用接口获取数据（假设已通过其他方式获取到接口返回的data）
  //     const response = await getCollectApi({
  //       query: "CollectTaskQuery",
  //       taskID: task.taskID,
  //       size: task.total
  //     })
  //     const { file, filename } = response.data

  //     // 2. Base64转Blob
  //     const byteCharacters = atob(file)
  //     const byteNumbers = new Uint8Array(byteCharacters.length)
  //     for (let i = 0; i < byteCharacters.length; i++) {
  //       byteNumbers[i] = byteCharacters.charCodeAt(i)
  //     }
  //     const byteArray = new Uint8Array(byteNumbers)
  //     const blob = new Blob([byteArray])

  //     // 3. 创建下载链接
  //     const link = document.createElement('a')
  //     link.href = URL.createObjectURL(blob)
  //     // 根据数据类型决定文件扩展名: 图数据类型返回json文件，其他返回csv文件
  //     const fileExtension = task.model === 'BAED' ? '.json' : '.csv'
  //     link.download = filename + fileExtension // 使用接口返回的文件名
  //     link.style.display = 'none'

  //     // 4. 触发下载
  //     document.body.appendChild(link)
  //     link.click()
  //     document.body.removeChild(link)
  //     URL.revokeObjectURL(link.href)

  //     // 5. 可选：显示成功提示
  //     message.success('文件下载成功')
  //   } catch (error) {
  //     console.error('下载失败:', error)
  //     message.error('文件下载失败')
  //   }
  // }

  const handleDownloadStream = async (task) => {
    // 1. 调用接口获取数据（假设已通过其他方式获取到接口返回的data）
    downLoadCollectApi({
      query: 'CollectTaskQuery',
      taskID: task.taskID,
      size: task.total,
    });
  };

  // 上传数据弹窗
  const uploadModalVisible = ref<boolean>(false);
  const uploading = ref<boolean>(false);
  const uploadForm = ref({
    taskID: '',
    taskName: '',
    purpose: '',
    description: '',
    createBy: ''
  });

  const handleUploadTaskStream = async (task) => {
    uploadForm.value = {
      taskID: task.taskID,
      taskName: task.taskName || 'default',
      purpose: '',
      description: '',
      createBy: ''
    };
    uploadModalVisible.value = true;
  };
  // 确认上传
  const handleUploadConfirm = async () => {
    try {
      uploading.value = true;

      const res = await uploadTaskApi({
        query: 'UploadTaskQuery',
        taskID: uploadForm.value.taskID,
        purpose: uploadForm.value.purpose,
        description: uploadForm.value.description,
        createBy: uploadForm.value.createBy
      });

      if (res.status === 'OK') {
        message.success('上传成功！');
        uploadModalVisible.value = false;
        // 重置表单
        uploadForm.value = {
          taskID: '',
          taskName: '',
          purpose: '',
          description: '',
          createBy: ''
        };
      } else {
        message.error('上传失败：' + (res.message || '未知错误'));
      }
    } catch (error) {
      console.error('上传失败:', error);
      message.error('上传失败：' + error.message);
    } finally {
      uploading.value = false;
    }
  };

  const handleUploadCancel = () => {
    uploadModalVisible.value = false;
    uploadForm.value = {
      taskID: '',
      taskName: '',
      purpose: '',
      description: '',
      createBy: ''
    };
  };

  // 过滤任务
  const applyFilters = async () => {
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
