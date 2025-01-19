<!-- 页面2.1 区块链监控 -->
<template>
  <div class="demo-charts">
    <a-card :bordered="false" v-if="chartsListData && chartsListData.length > 0">
      <div v-for="board in chartsListData" :key="board?.id">
        <div class="charts-row">
          <div class="realtime-monitor">
              <h3 class="title">区块链数据实时监控</h3>
              <a-row gutter="16">
              <!-- 链上区块统计 -->
              <a-col :span="8">
                  <a-card :style="cardStyles.red">
                  <p class="title">链上区块统计</p>
                  <h2 class="value">1023456</h2>
                  <p class="subtitle">当前区块总数</p>
                  </a-card>
              </a-col>

              <!-- 交易存证信息 -->
              <a-col :span="8">
                  <a-card :style="cardStyles.blue">
                  <p class="title">交易存证信息</p>
                  <h2 class="value">256000</h2>
                  <p class="subtitle">已上链存证数量</p>
                  </a-card>
              </a-col>

              <!-- 合成数据统计 -->
              <a-col :span="8">
                  <a-card :style="cardStyles.green">
                  <p class="title">合成数据统计</p>
                  <h2 class="value">128TB</h2>
                  <p class="subtitle">已合成数据量</p>
                  </a-card>
              </a-col>
              </a-row>
              <a-row gutter="16" style="margin-top: 16px;">
              <!-- 稳定运行时间 -->
              <a-col :span="8">
                  <a-card :style="cardStyles.yellow">
                  <p class="title">稳定运行时间</p>
                  <h2 class="value">365天</h2>
                  <p class="subtitle">已稳定运行时间</p>
                  </a-card>
              </a-col>

              <!-- FISCO BCOS -->
              <a-col :span="8">
                  <a-card :style="cardStyles.purple">
                  <p class="title">历史纪元数</p>
                  <h2 class="value">15</h2>
                  <p class="subtitle">Epoch</p>
                  </a-card>
              </a-col>

              <!-- 总TPS -->
              <a-col :span="8">
                  <a-card :style="cardStyles.lightBlue">
                  <p class="title">提交单元数</p>
                  <h2 class="value">167</h2>
                  <p class="subtitle">Slots</p>
                  </a-card>
              </a-col>
              </a-row>

              <a-form layout="vertical">
              <!-- 区块哈希查询 -->
              <a-row :gutter="16" align="middle" style="margin-top: 30px;">
              <a-col :span="16">
                  <a-form-item label="区块哈希">
                  <a-input v-model:value="searchForm.blockHash" placeholder="请输入区块哈希" />
                  </a-form-item>
              </a-col>
              <a-col :span="4">
                  <a-button type="primary" @click="queryBlockInfo">查询区块信息</a-button>
              </a-col>
              <!-- <a-col :span="4">
                  <a-button @click="resetBlockHash">重置</a-button>
              </a-col> -->
            <!--
              NOTE: add by zhmye
              这里点击查询区块信息后要跳出一个弹窗，展示区块内容
              下面的交易同理  
            -->
            <a-modal
                v-model:open="blockModalVisable"
                title="区块详情"
                centered
                @ok="blockModalVisable = false"

              >
              <template #footer>
                <a-button key="back" @click="blockModalVisable = false">返回</a-button>
              </template>
                <a-list
                  bordered
                  size="large"
                >
                  <a-list-item>
                    <span><strong>区块哈希:</strong> <a-tag color="pink">{{ blockItem.blockHash }}</a-tag></span>
                    <span><strong>父区块哈希:</strong> <a-tag color="orange">{{ blockItem.parentHash }}</a-tag></span>
                  </a-list-item>
                  <a-list-item>
                    <span><strong>区块高度:</strong> <a-tag color="green">{{ blockItem.blockHeight }}</a-tag></span>
                    <span><strong>交易数量:</strong> <a-tag color="blue">{{ blockItem.nbTransactions }}</a-tag></span>
                    <span><strong>Merkle Root:</strong> <a-tag color="cyan">{{ blockItem.merkleRoot }}</a-tag></span>
                  </a-list-item>

                  <a-list-item>
                    <div>
                      <span><strong>交易哈希:</strong></span>
                      <a-table
                        v-if="blockItem.txHashs && blockItem.txHashs.length > 0"
                        :data-source="blockItem.txHashs"
                        :columns="blockInfoColumn"
                        bordered
                        size="small"
                        row-key="index"
                        :scroll="{ y: 'calc(30vh)' }"
                        :pagination="false"
                      />
                      <span v-else>暂无交易</span>
                    </div>
                  </a-list-item>
                </a-list>
              </a-modal>

              </a-row>
              <!-- 交易哈希查询 -->
              <a-row :gutter="16" align="middle" style="margin-top: 5px;">
              <a-col :span="16">
                  <a-form-item label="交易哈希">
                  <a-input v-model:value="searchForm.transactionHash" placeholder="请输入交易哈希" />
                  </a-form-item>
              </a-col>
              <a-col :span="4">
                  <a-button type="primary" @click="queryTransactionInfo">查询交易信息</a-button>
              </a-col>
              <!-- <a-col :span="4">
                  <a-button @click="resetTransactionHash">重置</a-button>
              </a-col> -->
              </a-row>
          </a-form>
          </div>
          <div class="charts-row-item" v-for="(chart, i) in board?.chartList" >
              <h3 class="chart-title" style="margin-top: 20px;">上链交易数</h3>
              <component
              :is="getChartComponent(board.type)"
              :dataType="'origVal'"
              :title="board?.title"
              :chartData="chart?.chartData"
              :optionConfig="chart?.chartConfig"
              :seriesConfig="chart?.seriesConfig"
            />
          </div>
          <div class="realtime-monitor">
            <h3 class="title">最新纪元信息</h3>
            <a-divider />
            <BasicTable @register="epochTable">
            </BasicTable>
          </div>
          <div class="realtime-monitor">
            <h3 class="title">最新交易信息</h3>
            <a-divider />
            <BasicTable @register="transactionTable">
            </BasicTable>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>
<script name="demo-monDashboard" lang="ts" setup>
  import { reactive } from 'vue';
  import { LineChart } from '/@/components/Charts';
  import { useUpChainTPSChart } from '@/views/demo/charts/useCharts';
  import { queryEpochAndTransactionTableData } from './useDataOnChain';
  import { BasicTable } from '/@/components/Table';
  import { ref } from 'vue';
  import { getBlockInfoApi } from '../../../../api/demo/finDataSynthSecurityApi';
  import { getBlockInfoColumns } from '../../table/components/tableData';
  const { chartsListData } = useUpChainTPSChart();
  const { epochTable, transactionTable } = queryEpochAndTransactionTableData(); // modify by zhmye 这里用来获取这个页面里面的两个表格数据

  const getChartComponent = (type: string | undefined) => {
    if (!type) {
      return null;
    }
    switch (type) {
      case 'line':
        return LineChart;
      default:
        return null;
    }
  };

  // add by zhmye
  // 这里定义的是两个弹窗是否可见
  const blockModalVisable = ref<boolean>(false);
  const txModalVisable = ref<boolean>(false); 
  const blockInfoColumn = getBlockInfoColumns();
  // 搜索表单数据
  const searchForm = reactive({
  blockHash: '',
  transactionHash: '',
  });
  // 弹窗中显示的区块
  let blockItem = reactive({
    blockHash: '',
    parentHash: '',
    blockHeight: -1,
    merkleRoot: '',
    nbTransactions: -1,
    txHashs: [] as string[],
  })
  const getBlockInfoQuery = async () => {
    const res = await getBlockInfoApi();
    if (res) {
        blockItem.blockHash = res.blockHash;
        blockItem.parentHash = res.parentHash;
        blockItem.blockHeight = res.blockHeight;
        blockItem.merkleRoot = res.merkleRoot;
        blockItem.nbTransactions = res.nbTransactions;

        // 修改数组内容时需要先清空再添加元素，保证响应性
        blockItem.txHashs.length = 0; // 清空数组
        blockItem.txHashs.push(...res.txHashs); // 添加新数据
    }
    console.log(res, blockItem)
  }
  const queryBlockInfo = () => {
  console.log('查询区块信息:', searchForm.blockHash);
  // add by zhmye 
  // 这里打开一个弹窗，里面显示区块信息 具体要看fisco-bcos能给出什么样的数据，至少
  // 1. 区块哈希
  // 2. parent hash
  // 3. 区块高度
  // 4. merkle root
  // 5. 交易数据量
  // 6. 交易哈希数组(折叠)
  // 7. ...
    getBlockInfoQuery(); // todo 这里要把blockHash传过去,post
    blockModalVisable.value = true;
    console.log(111, blockItem)
  };

  const queryTransactionInfo = () => {
  console.log('查询交易信息:', searchForm.transactionHash);
  };

  const resetBlockHash = () => {
  searchForm.blockHash = '';
  };

  const resetTransactionHash = () => {
  searchForm.transactionHash = '';
  };
  const cardStyles = {
  red: {
    backgroundColor: '#FFECEC',
    border: '1px solid #FFCCCC',
    borderRadius: '8px',
    color: '#FF6666',
  },
  blue: {
    backgroundColor: '#ECF7FF',
    border: '1px solid #B3E5FF',
    borderRadius: '8px',
    color: '#6699FF',
  },
  green: {
    backgroundColor: '#E6FFEC',
    border: '1px solid #B3FFCC',
    borderRadius: '8px',
    color: '#33CC99',
  },
  yellow: {
    backgroundColor: '#FFFBE6',
    border: '1px solid #FFEB99',
    borderRadius: '8px',
    color: '#FFCC33',
  },
  purple: {
    backgroundColor: '#F7EFFF',
    border: '1px solid #D9B3FF',
    borderRadius: '8px',
    color: '#9933FF',
  },
  lightBlue: {
    backgroundColor: '#E6F7FF',
    border: '1px solid #99D6FF',
    borderRadius: '8px',
    color: '#3399FF',
  },
};
</script>
<style lang="less" scoped>
  .demo-charts {
    .charts-row {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 40px; /* 模块之间的网格间距 */
      .charts-row-item {
        padding: 8px;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
    }
  }
  .chart-title {
  text-align: left; /* 左对齐 */
  width: 100%;      /* 确保占满父容器 */
  margin: 0;        /* 清除默认外边距 */
  padding-bottom: 3px; /* 添加适当的下边距 */
  padding-left: 50px;
  font-size: 25px;
  font-weight: bold;
  }
  .search-box {
  margin-bottom: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  a-form-item {
  margin-bottom: 0; /* 去掉表单项之间的默认间距 */
  }

</style>

<style scoped>
.realtime-monitor {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 25px;
  font-weight: bold;
}

.value {
  font-size: 24px;
  font-weight: bold;
  margin: 8px 0;
}

.subtitle {
  font-size: 12px;
  color: #666666;
}
</style>

