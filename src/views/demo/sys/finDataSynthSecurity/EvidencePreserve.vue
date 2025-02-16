<!-- 页面2.2 存证溯源 -->
<template>
  <a-card title="存证溯源">
    <a-tabs v-model:activeKey="activeKey1">
      <a-tab-pane key="1">
        <template #tab>
          <span>
            <apple-outlined />
            合成任务溯源
          </span>
        </template>
        <a-form :model="TaskSearchForm" layout="vertical">
          <!-- 选择查询方式 -->
          <a-form-item label="查询方式">
            <a-radio-group v-model:value="TaskSearchForm.queryType">
              <a-radio value="taskId">通过任务标识查询</a-radio>
              <a-radio value="transactionHash">通过交易哈希查询</a-radio>
            </a-radio-group>
          </a-form-item>

          <!-- 合成任务ID -->
          <a-form-item v-if="TaskSearchForm.queryType === 'taskId'" label="合成任务标识" name="taskId">
            <a-row gutter={16} style="width: 50%">
              <!-- 交易哈希类型下拉框 -->
              <!-- <a-col :span="4" style="margin-right: 8px">
                <a-select v-model:value="TaskSearchForm.transactionType" placeholder="选择交易类型">
                  <a-select-option value="InitTask">InitTask</a-select-option>
                  <a-select-option value="CommitSlot">CommitSlot</a-select-option>
                </a-select>
              </a-col> -->

              <!-- 交易哈希输入框 -->
              <a-col :span="18">
                <a-input v-model:value="TaskSearchForm.taskId" placeholder="请输入合成任务标识" />
              </a-col>
            </a-row>
          </a-form-item>
          <!-- 交易哈希和交易哈希类型 -->
          <a-form-item v-if="TaskSearchForm.queryType === 'transactionHash'" label="交易哈希" name="transactionHash">
            <a-row gutter={16} style="width: 50%">
              <!-- 交易哈希类型下拉框 -->
              <!-- <a-col :span="4" style="margin-right: 8px">
                <a-select v-model:value="TaskSearchForm.transactionType" placeholder="选择交易类型">
                  <a-select-option value="InitTask">InitTask</a-select-option>
                  <a-select-option value="CommitSlot">CommitSlot</a-select-option>
                </a-select>
              </a-col> -->

              <!-- 交易哈希输入框 -->
              <a-col :span="18">
                <a-input v-model:value="TaskSearchForm.transactionHash" placeholder="请输入交易哈希" />
              </a-col>
            </a-row>
          </a-form-item>
          <a-space style="width: 100%;justify-content: center;">
            <a-button type="primary" @click="onQuery">查询</a-button>
            <a-button @click="resetSearchForm">重置</a-button>
          </a-space>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>
          <span>
            <android-outlined />
            合成纪元查看
          </span>
        </template>
        <a-form :model="EpochSearchForm" layout="vertical">
          <!-- 选择查询方式 -->
          <a-form-item label="查询方式">
            <a-radio-group v-model:value="EpochSearchForm.queryType">
              <a-radio value="epochId">通过纪元标识查询</a-radio>
              <a-radio value="transactionHash">通过交易哈希查询</a-radio>
            </a-radio-group>
          </a-form-item>

          <!-- 合成任务ID -->
          <a-form-item v-if="EpochSearchForm.queryType === 'epochId'" label="合成纪元标识" name="epochId" style="width: 50%;">
            <a-input v-model:value="EpochSearchForm.epochId" placeholder="请输入合成纪元标识" />
          </a-form-item>
          <!-- 交易哈希和交易哈希类型 -->
          <a-form-item v-if="EpochSearchForm.queryType === 'transactionHash'" label="交易哈希" name="transactionHash">
            <a-row gutter={16} style="width: 50%">
              <!-- 交易哈希类型下拉框 -->
              <!-- <a-col :span="4" style="margin-right: 8px">
                <a-select v-model:value="EpochSearchForm.transactionType" placeholder="选择交易类型">
                  <a-select-option value="EpochRecord">EpochRecord</a-select-option>
                  <a-select-option value="TaskInit">TaskInit</a-select-option>
                  <a-select-option value="CommitSlot">CommitSlot</a-select-option>
                </a-select>
              </a-col> -->

              <!-- 交易哈希输入框 -->
              <a-col :span="18">
                <a-input v-model:value="EpochSearchForm.transactionHash" placeholder="请输入交易哈希" />
              </a-col>
            </a-row>
          </a-form-item>
          <a-space style="width: 100%;justify-content: center;">
            <a-button type="primary" @click="onQuery">查询</a-button>
            <a-button @click="resetSearchForm">重置</a-button>
          </a-space>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </a-card>
  <a-row gutter="16" v-if="infoType === 'task' || infoType === 'epoch'">
    <!-- 左侧搜索框 -->
    <a-col :span="8">

      <a-card title="存证交易" style="height: 560px;">
        <!-- <a-badge text="Verified"> -->
        <a-row align="middle" gutter={16}>
          <!-- Avatar -->
          <a-col :span="2">
            <a-avatar size="large" :style="{ backgroundColor: '#f56a00', verticalAlign: 'middle' }">
              0x
            </a-avatar>
          </a-col>
          <!-- 交易哈希 -->
          <a-col :span="12" style="line-height: 64px; height: 64px">
            <h3>{{ TransactionItem.txHash.substring(0, 40) + '....' }}</h3>
          </a-col>
          <!-- 标签部分 -->
          <a-col :span="4">
            <a-tag v-if="(infoType == 'task' && TaskItem.total <= TaskItem.process) || (infoType == 'epoch')" color="success">
              <template #icon>
                <check-circle-outlined />
              </template>
              success
            </a-tag>
            <a-tag v-else color="processing">
              <template #icon>
                <sync-outlined :spin="true" />
              </template>
              processing
            </a-tag>
            <!-- <a-tag color="orange">Tag3</a-tag> -->
          </a-col>
        </a-row>
        <a-tabs v-model:activeKey="activeKey4">
        <a-tab-pane key="1">
        <template #tab>
              <ControlOutlined />
              <span v-if="infoType === 'task'">任务信息</span>
              <span v-else-if="infoType === 'epoch'">纪元信息</span>
            </template>
            <a-list bordered size="large" v-if="infoType == 'task'">
              <a-list-item>
                <a-row gutter={16} style="width: 100%">
                  <a-col :span="8">
                    <strong>任务标识:</strong>
                    <a-tag color="purple">{{ TaskItem.sign }}</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <strong>合成总量:</strong>
                    <a-tag color="pink">{{ TaskItem.total }}GB</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <strong>数据集:</strong>
                    <a-tag color="orange">{{ TaskItem.dataset }}</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>


              <a-list-item>
                <a-row gutter={16} style="width: 100%">
                  <a-col :span="8">
                    <strong>调度数:</strong>
                    <a-tag color="green">{{ TaskItem.nbSchedule }}</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <strong>提交数:</strong>
                    <a-tag color="blue">{{ TaskItem.nbFinalized }}</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <strong>已合成:</strong>
                    <a-tag color="red">{{ TaskItem.process }} GB</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>
              <!-- <a-list-item style="justify-content: center;">
                <a-button type="primary">查看任务详情</a-button>
              </a-list-item> -->
            </a-list>
            <a-list bordered size="large" v-else-if="infoType == 'epoch'">
              <a-list-item>
                <a-row gutter={16} style="width: 100%">
                  <a-col :span="8">
                    <strong>纪元编号:</strong>
                    <a-tag color="purple">{{ EpochItem.epochID }}</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <strong>合成总量:</strong>
                    <a-tag color="pink">{{ EpochItem.process }}GB</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <strong>确认单元:</strong>
                    <a-tag color="orange">{{ EpochItem.nbFinalized }}</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>


              <a-list-item>
                <a-row gutter={16} style="width: 100%">
                  <a-col :span="8">
                    <strong>提交单元:</strong>
                    <a-tag color="green">{{ EpochItem.nbCommit }}</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <strong>异常单元:</strong>
                    <a-tag color="blue">{{ EpochItem.nbInvalid }}</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <strong>异常节点数:</strong>
                    <a-tag color="red">{{ EpochItem.nbInvalidNode }}</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>
              <!-- <a-list-item style="justify-content: center;">
                <a-button type="primary" v-if="infoType == 'task'">查看任务详情</a-button> 

                <a-button type="primary" v-else-if="infoType == 'epoch'">查看纪元详情</a-button> 

              </a-list-item> -->
            </a-list>
        <!-- <a-divider /> -->
         </a-tab-pane>
          </a-tabs>

        <a-tabs v-model:activeKey="activeKey2">
          <a-tab-pane key="1">
            <template #tab>
              <span>
                <GoldOutlined />
                交易信息
              </span>
            </template>
            <a-list bordered size="large">
              <!-- 第一个列表项 -->
              <a-list-item>
                <a-row gutter={16} style="width: 100%">
                  <a-col :span="24">
                    <strong>交易哈希:</strong>
                    <a-tag color="purple">{{ TransactionItem.txHash }}</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>
              <a-list-item>
                <a-row gutter={10} style="width: 100%">
                  <a-col :span="20">
                    <strong>区块哈希:</strong>
                    <a-tag color="pink">{{ TransactionItem.blockHash }}</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>
              <a-list-item>
                <a-row gutter={8} style="width: 100%">
                  <a-col :span="4">
                    <strong>区块高度:</strong>
                    <a-tag color="orange">{{ TransactionItem.blockHeight }}</a-tag>
                  </a-col>
                  <a-col :span="12">
                    <strong>合约地址:</strong>
                    <a-tag color="green">{{ TransactionItem.contract }}</a-tag>
                  </a-col>
                  <a-col :span="5">
                    <strong>合约接口:</strong>
                    <a-tag color="blue">{{ TransactionItem.method }}</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>
              <a-list-item>
                <a-row gutter={2} style="width: 100%">
                  <a-col :span="19">
                    <strong>默克尔根:</strong>
                    <a-tag color="red">{{ TransactionItem.merkleRoot }}</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>
              <a-list-item style="justify-content: center;">
                <a-button type="primary">校验默克尔证明</a-button> <!-- 这里最好可以用echarts来一个树状图，验证merkler root -->
              </a-list-item>
            </a-list>
          </a-tab-pane>


        </a-tabs>
      </a-card>


      <!-- 这里画initTask->每个epoch的commit+finalized -->
      <a-card title="时间轴" style="height: 340px; overflow: scroll;margin-top: 100px;" v-if="infoType == 'task'">
        <a-timeline mode="alternate">
          <a-timeline-item v-for="(item, index) in timelineItems" :key="index" color="red">
            <ClockCircleOutlined style="font-size: 16px" />
            {{ item[1] }}
          </a-timeline-item>
        </a-timeline>
      </a-card>
      <a-card title="异常溯源" style="height: 340px; overflow: scroll; margin-top: 100px;" v-else-if="infoType == 'epoch'">
      <a-tabs>
        <a-tab-pane key="1" tab="节点异常检测">
          <a-table :columns="invalidNodeTableColumn" :data-source="invalidNodeTable" bordered :showHeader="false" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="提交单元异常">
          <a-table :columns="invalidSlotTableColumn" :data-source="invalidSlotTable" bordered :showHeader="false" />
        </a-tab-pane>
        

      </a-tabs>
    </a-card>
    </a-col>

    <!-- 右侧查询结果 -->
    <a-col :span="10">
      <a-card title="溯源结果" style="height: 1000px">
        <a-tabs v-model:activeKey="activeKey3" type="card">
          <a-tab-pane key="1">
            <template #tab>
              <span>
                <InfoCircleOutlined />
                过程查证
              </span>
            </template>
            <a-collapse v-model:activeKey="scheduleActiveKey" accordion style="height: 850px; overflow: scroll;">
              <a-collapse-panel v-for="(schedule, index) in schedules" :key="index" :header="schedule.id">
                <a-list bordered size="large" v-if="infoType=='task'">
                  <a-list-item>
                    <a-row gutter={16} style="width: 100%">
                      <a-col :span="8">
                        <strong>调度编号:</strong>
                        <a-tag color="purple">{{ schedule.id }}</a-tag>
                      </a-col>
                      <a-col :span="8">
                        <strong>调度总量:</strong>
                        <a-tag color="pink">{{ schedule.total }}GB</a-tag>
                      </a-col>
                      <a-col :span="8">
                        <strong>已完成数据:</strong>
                        <a-tag color="orange">{{ schedule.process }} GB</a-tag>
                      </a-col>
                    </a-row>
                  </a-list-item>
                  <a-list-item>
                    <a-row gutter={16} style="width: 100%">
                      <a-col :span="8">
                        <strong>调度节点数:</strong>
                        <a-tag color="blue">{{ schedule.nbNodes }}</a-tag>
                      </a-col>
                      <a-col :span="8">
                        <strong>提交数量:</strong>
                        <a-tag color="green">{{ schedule.nbCommit }}</a-tag>
                      </a-col>
                      <a-col :span="8">
                        <strong>异常数量:</strong>
                        <a-tag color="red">{{ schedule.nbInvalid }}</a-tag>
                      </a-col>
                    </a-row>
                  </a-list-item>
                </a-list>
                <a-list bordered size="large" v-else-if="infoType=='epoch'">
                  <a-list-item v-if="index == 0">
                    <a-row gutter={16} style="width: 100%">
                      <a-col :span="8">
                        <strong>纪元编号:</strong>
                        <a-tag color="purple">{{ EpochItem.epochID }}</a-tag>
                      </a-col>
                      <a-col :span="8">
                        <strong>合成总量:</strong>
                        <a-tag color="pink">{{ EpochItem.process }}GB</a-tag>
                      </a-col>
                      <a-col :span="8">
                        <strong>确认单元数:</strong>
                        <a-tag color="orange">{{ EpochItem.nbFinalized }}</a-tag>
                      </a-col>
                    </a-row>
                  </a-list-item>
                  <a-list-item v-else-if="index == 1">
                    <a-row gutter={16} style="width: 100%">
                      <a-col :span="8">
                        <strong>纪元编号:</strong>
                        <a-tag color="purple">{{ EpochItem.epochID }}</a-tag>
                      </a-col>
                      <a-col :span="8">
                        <strong>提交单元数:</strong>
                        <a-tag color="pink">{{ EpochItem.nbCommit }}</a-tag>
                      </a-col>
                    </a-row>
                  </a-list-item>
                </a-list>
                <a-table :columns="SchduleSlotTableColumn" :data-source="schedule.tableDatas" style="margin-top: 1%;">
                  <template #headerCell="{ column }">
                    <!-- <template v-if="column.key === 'name'">
                      <span>
                        <smile-outlined />
                        Name
                      </span>
                    </template> -->
                    <span>
                      {{ column.name }}
                    </span>
                  </template>

                  <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'slotHash'">
                      <p style="color: blue">
                        {{ record.slotHash }}
                      </p>
                    </template>
                    <template v-else-if="column.key === 'status'">
                      <span>
                        <a-tag
                          :color="record.status === 'Finished' ? 'green' : (record.status === 'Failed' ? 'red' : 'blue')">
                          {{ record.status }}
                        </a-tag>
                      </span>
                    </template>
                    <template v-else-if="column.key === 'action'">
                      <span>
                        <!-- 如果状态是 'success' 显示 '完整性检验' 按钮 -->
                        <a-button v-if="record.status === 'Finished'" type="link">完整性检验</a-button>

                        <!-- 默认情况下，显示一个提示信息或空的按钮 -->
                        <a-button v-else-if="record.status === 'Processing'" type="link" disabled>等待中</a-button>
                        <a-button v-else type="link" danger>错误原因</a-button>
                      </span>
                    </template>

                    <template v-else-if="column.key === 'process' || column.key === 'size'">
                      <!-- <span> -->
                      {{ column.key === 'process' ? record.process : record.size }} GB
                      <!-- </span> -->
                    </template>
                  </template>

                </a-table>
              </a-collapse-panel>
            </a-collapse>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card title="可视化结果" style="height: 1000px;">
        <div style="width: 100%; height: 440px;">
          <a-tabs activeKey="1" type="card">
            <a-tab-pane key="1">
              <template #tab>
                <span>
                  <LineChartOutlined />
                  合成进度
                </span>
              </template>
              <BarChart :chartData="BarData" :optionConfig="barChartConfig.chartConfig" height="30vh" v-if="infoType == 'task'"/>
              <BarChart :chartData="BarData" :optionConfig="barChartConfig.chartConfig" height="30vh" v-else-if="infoType == 'epoch'"/>

            </a-tab-pane>
          </a-tabs>
        </div>
        <div style="width: 100%; height: 440px;">
          <a-tabs activeKey="1" type="card">
            <a-tab-pane key="1">
              <template #tab>
                <span v-if="infoType == 'task'">
                  <PieChartOutlined />
                  调度完成情况
                </span>
                <span v-else-if="infoType == 'epoch'">
                  <PieChartOutlined />
                  单元监控情况
                </span>
              </template>
              <PieChart :chartData="PieData" :optionConfig="pieChartConfig.chartConfig"
                :seriesConfig="pieChartConfig.seriesConfig" height="30vh" width="100%" />
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import {computed, reactive, ref } from 'vue';
import { useEvidenceOnChain } from './useDataOnChain';
import { InfoCircleOutlined, LineChartOutlined, PieChartOutlined, CheckCircleOutlined, SyncOutlined, GoldOutlined, ClockCircleOutlined, ControlOutlined, TransactionOutlined, ConsoleSqlOutlined } from '@ant-design/icons-vue';
import { BarChart, PieChart } from '/@/components/Charts';
import { getQueryDataApi } from '/@/api/demo/finDataSynthSecurityApi';
import { message } from 'ant-design-vue';
const infoType = ref("");
const activeKey1 = ref('1');
const activeKey2 = ref('1');
const activeKey3 = ref('1');
const activeKey4 = ref('1');
const scheduleActiveKey = ref(['0']);
const timelineItems = ref([])
const SchduleSlotTableColumn = [
  {
    name: '提交单元',
    dataIndex: 'slotHash',
    key: 'slotHash',
  },
  {
    name: '预期数据量',
    dataIndex: 'size',
    key: 'size',
  },
  {
    name: '实际完成量',
    dataIndex: 'process',
    key: 'process',

  },
  {
    name: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    key: 'action'
  }
]

const InfoCol = [
  { dataIndex: 'name', key: 'name' },
  { dataIndex: 'value', key: 'value' },
]

// 定义类型
interface ScheduleSlot {
  slotHash: string;
  size: string;
  process: string;
  status: string;
}

interface Schedule {
  id: string;
  total: string;
  process: string;
  nbCommit: string;
  nbInvalid: string;
  nbNodes: string;
  tableDatas: ScheduleSlot[];
}

const pieChartConfig = {
  seriesConfig: {
    // 设置图表每块/列/行的颜色（非必填，为空时默认使用系统设定的颜色）
    color: ['#2578F2', '#84B7F9', '#9A9A9A', '#DE868F'],
    itemStyle: {
      // 设置扇形的圆角半径
      borderRadius: 4,
    },
    label: {
      show: true,
      // 标签内容格式器，支持字符串模板和回调函数两种形式
      formatter: '{c}',
    },
  },
  chartConfig: {
    // 图表全局配置
    legend: {
      show: true, // 显示图例
      orient: 'vertical', // 图例排列方向（可选：'horizontal' 或 'vertical'）
      left: 'left', // 图例位置，可选值有 'left', 'right', 'center'
      top: 'center', // 图例垂直位置
      textStyle: {
        fontSize: 12, // 图例字体大小
        color: '#333', // 图例字体颜色
      },
    },
    tooltip: {
      // 提示框配置
      trigger: 'item', // 触发类型（'item' 适合饼图）
      formatter: '{a} <br/>{b}: {c} ({d}%)', // 提示内容格式
    },
  },
};
const barChartConfig = {
  chartConfig: {
    yAxis: {
      axisLabel: {
        formatter: '{value}GB',
      },
    },
  },
};
const PieData = ref([])
const BarData = ref([]);
const TaskSearchForm = reactive({
  queryType: 'taskId', // 查询方式
  taskId: '',
  transactionHash: '',
  transactionType: 'InitTask'
});

const EpochSearchForm = reactive({
  queryType: 'epochId',
  epochId: '',
  transactionHash: '',
  transactionType: 'EpochRecord'
});

const onQuery = async () => {
  //这里获取查询信息
  if (activeKey1.value == '1') {
    const res = await (TaskSearchForm.queryType == 'taskId'
      ? getQueryDataApi({
          query: 'EvidencePreserveTaskIDQuery',
          taskID: TaskSearchForm.taskId
        })
      : getQueryDataApi({
          query: 'EvidencePreserveTaskTxQuery',
          txHash: TaskSearchForm.transactionHash
        })
    );

    // 更新信息
    console.log(res.status);
      // const res = await getQueryDataApi({
      //   query: 'EvidencePreserveTaskIDQuery',
      //   taskID: TaskSearchForm.taskId
      // })
      //更新信息
      console.log(res.status)
      if (res.status == 'OK') {
        message.success("查找成功")
        //获取时间信息
        timelineItems.value = res.data.timeline
        //获取任务信息
        const taskInfo = res.data.task_info
        TaskItem.sign = taskInfo.taskID
        TaskItem.total = taskInfo.total
        TaskItem.process = taskInfo.process
        TaskItem.nbSchedule = taskInfo.schedule
        TaskItem.nbFinalized = taskInfo.commit
        //获取交易信息
        const txInfo = res.data.tx_info
        TransactionItem.txHash = txInfo.txHash, // 交易哈希
          TransactionItem.blockHash = txInfo.blockHash, // 区块哈希
          TransactionItem.blockHeight = txInfo.blockHeight, // 区块高度
          TransactionItem.contract = txInfo.contractAddress, // 合约地址
          TransactionItem.method = txInfo.abi
        TransactionItem.upchainTime = '2024-10-08 14:15:30', // 上链时间(这个是假的)
          TransactionItem.merkleRoot = txInfo.MerkleRoot // 交易所在的区块的merkle root，下面提供一个按钮验证merkle
        //获取epoch信息
        let epochArray = []
        for (let i = 0; i < res.data.epochProcessData.length; i++) {
          epochArray.push({ name: `Epoch${res.data.epochs[i]}`, value: res.data.epochProcessData[i] })
        }
        BarData.value = epochArray
        PieData.value = [{ name: '处理中', value: res.data.scheduleDistributionData[2] },
        { name: '已完成', value: res.data.scheduleDistributionData[0] },
        { name: '失败', value: res.data.scheduleDistributionData[1] }]
        //更新schedule
        let scheduleArray = []
        for (let i = 0; i < res.data.schedules.length; i++) {
          let slotArray = []
          let item = res.data.schedules[i]
          let sArr = ["Finished", "Processing", "Failed"]
          for (let i = 0; i < item.slots.length; i++) {
            slotArray.push({
              slotHash: item.slots[i].slotHash,
              size: item.slots[i].scheduleSize,
              process: item.slots[i].process,
              status: sArr[item.slots[i].status]
            })
          }
          scheduleArray.push({
            id: `schedule-${i + 1}`,  // 每个 Schedule 的 id 按序生成
            total: item.scheduleSize,
            process: item.process,
            nbCommit: item.commitNumber,
            nbInvalid: item.invalidNumber,
            nbNodes: item.commitNumber + item.invalidNumber,//这里暂时用提交数代替
            tableDatas: slotArray,
          })
        }
        schedules.value = scheduleArray

        evidenceTable.value = [
          { name: '任务标识', value: TaskItem.sign },
          { name: '交易哈希', value: TransactionItem.txHash },
          { name: '任务状态', value: TaskItem.process == TaskItem.total ? '已完成' : '处理中' },
        ]
        infoType.value = "task"
        console.log(schedules)
      } else {
        message.error("查找失败")
      }
  } else if (activeKey1.value == '2') {
      const res = await (EpochSearchForm.queryType == 'epochId'
      ? getQueryDataApi({
          query: 'EvidencePreserveEpochIDQuery',
          epochID: EpochSearchForm.epochId,
        })
      : getQueryDataApi({
          query: 'EvidencePreserveEpochTxQuery',
          txHash: EpochSearchForm.transactionHash
        })
    );
      //更新信息
      console.log(res.status)
      if (res.status == 'OK') {
        message.success("查找成功")
        //获取时间信息
        // timelineItems.value = res.data.timeline
        //获取任务信息
        const epochInfo = res.data.epoch_info
        EpochItem.epochID = epochInfo.epochID
        EpochItem.nbCommit = epochInfo.nbCommit
        EpochItem.nbFinalized = epochInfo.nbFinalized
        EpochItem.nbJustified = epochInfo.nbJustified
        EpochItem.process = epochInfo.process
        // EpochItem.nbTasks = epochInfo.nbTasks
        EpochItem.nbInvalid = epochInfo.nbInvalid
        console.log(epochInfo, EpochItem)
        //获取交易信息
        const txInfo = res.data.tx_info
        TransactionItem.txHash = txInfo.txHash, // 交易哈希
          TransactionItem.blockHash = txInfo.blockHash, // 区块哈希
          TransactionItem.blockHeight = txInfo.blockHeight, // 区块高度
          TransactionItem.contract = txInfo.contractAddress, // 合约地址
          TransactionItem.method = txInfo.abi
        TransactionItem.upchainTime = '2024-10-08 14:15:30', // 上链时间(这个是假的)
          TransactionItem.merkleRoot = txInfo.MerkleRoot // 交易所在的区块的merkle root，下面提供一个按钮验证merkle
        evidenceTable.value = [
          { name: '纪元编号', value: EpochItem.epochID },
          { name: '交易哈希', value: TransactionItem.txHash },
          { name: '纪元状态', value: '已完成' },
        ]
        let invalidSlot = []
        for (let i = 0; i < res.data.invalidSlot.length; i++) {
          // console.log(res.data.invalidSlot[i]);
          invalidSlot.push({
            "slot": res.data.invalidSlot[i].slotHash,
            "errMessage": res.data.invalidSlot[i].err
          })
        }
        invalidSlotTable.value = invalidSlot
        let scheduleArray = []
        let finalizedArray = []
        for (let i = 0; i < res.data.finalized.length; i++) {
          let item = res.data.finalized[i]
          let sArr = ["Finished", "Processing", "Failed"]
            finalizedArray.push({
              slotHash: item.slotHash,
              size: item.scheduleSize,
              process: item.process,
              status: sArr[item.status]
            })
      }
      scheduleArray.push({
            id: `确认单元信息`,  // 每个 Schedule 的 id 按序生成
            total: 0,
            process: 0,
            nbCommit: 0,
            nbInvalid: 0,
            nbNodes: 0,
            tableDatas: finalizedArray,
          })
      let commitArray = []
      for (let i = 0; i < res.data.commit.length; i++) {
        let item = res.data.commit[i]
        let sArr = ["Finished", "Processing", "Failed"]
        commitArray.push({
            slotHash: item.slotHash,
            size: item.scheduleSize,
            process: item.process,
            status: sArr[item.status]
          })
    }
    scheduleArray.push({
          id: `提交单元信息`,  // 每个 Schedule 的 id 按序生成
          total: 0,
          process: 0,
          nbCommit: 0,
          nbInvalid: 0,
          nbNodes: 0,
          tableDatas: commitArray,
        })
      schedules.value = scheduleArray
      //获取epoch信息
      console.log(res.data.taskProcessDistributionData)
      // 遍历 taskProcessDistributionData 对象的每对 key-value
      let taskArray = []
      Object.entries(res.data.taskProcessDistributionData).forEach(([key, value]) => {
        taskArray.push({ name: key, value: value });
      });
      BarData.value = taskArray
      PieData.value = [{ name: '提交单元', value: EpochItem.nbCommit },
      { name: '确认单元', value: EpochItem.nbFinalized },
      { name: '异常单元', value: EpochItem.nbInvalid }]
      infoType.value = "epoch"
    } else {
        message.error("查找失败")
      }
  }
}


// 创建 Schedule 数据
const testScheduleSlotTableDatas = ref([])

// 生成 10 个 Schedule 对象
let schedules = ref([])

let TransactionItem = reactive({
  txHash: `null`, // 交易哈希
  blockHash: `null`, // 区块哈希
  blockHeight: 0, // 区块高度
  contract: `null`, // 合约地址
  method: 'null', // 合约接口
  upchainTime: 'null', // 上链时间
  merkleRoot: `null` // 交易所在的区块的merkle root，下面提供一个按钮验证merkle
})
// 左下角显示的task
let TaskItem = reactive({
  sign: ``, // 任务标识
  total: 0, // 总量
  dataset: 'dataset1', // 数据集
  nbSchedule: 0, // 调度数量，对应task slot
  nbFinalized: 0, // finalized的slot数量
  process: 0, // 已经完成的合成数
})
// 左下角显示的epoch
let EpochItem = reactive({
  epochID: -1,
  process: 0,
  nbCommit: 0,
  nbFinalized: 0,
  nbJustified: 0,
  nbInvalid: 0,
  // nbTasks: 0, 这个已经不会有了
  nbInvalidNode: 0, // 这里添加异常节点数量，目前后端还没有，先固定为0
})

const invalidSlotTableColumn = [
  { title: '提交单元', dataIndex: 'slot', key: 'slot' },
  { title: '异常检测', dataIndex: 'errMessage', key: 'errMessage' },
];
const invalidNodeTableColumn = [
  { title: '节点名称', dataIndex: 'nodeID', key: 'nodeID' },
  { title: '异常检测', dataIndex: 'errMessage', key: 'errMessage' },
];
let invalidSlotTable = ref([])
let invalidNodeTable = ref([])
// 左下角显示的epoch/task表格
// let evidenceTaskTable = ref([]);
// let evidenceEpochTable = ref([]);
let evidenceTable = ref([])
// 重置表单
function resetSearchForm() {
  TaskSearchForm.taskId = '';
  TaskSearchForm.queryType = 'taskId';
  TaskSearchForm.transactionHash = '';
  TaskSearchForm.transactionType = 'InitTask';
  EpochSearchForm.queryType = 'epochId';
  EpochSearchForm.epochId = '';
  EpochSearchForm.transactionHash = '';
  EpochSearchForm.transactionType = 'EpochRecord';
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
