<!-- 页面2.2 存证溯源 -->
<template>
  <a-card title="存证溯源">
    <div v-if="route.query.taskId != null">
      <a-button type="primary" @click="() => router.back()">< 返回合成任务列表</a-button>
    </div>
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
            <a-row gutter="{16}" style="width: 50%">
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
            <a-row gutter="{16}" style="width: 50%">
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
          <a-space style="width: 100%; justify-content: center">
            <a-button type="primary" @click="onQuery">查询</a-button>
            <a-button @click="resetSearchForm">重置</a-button>
          </a-space>
        </a-form>
      </a-tab-pane>
      <a-tab-pane v-if="route.query.taskId == null" key="2">
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
          <a-form-item v-if="EpochSearchForm.queryType === 'epochId'" label="合成纪元标识" name="epochId" style="width: 50%">
            <a-input v-model:value="EpochSearchForm.epochId" placeholder="请输入合成纪元标识" />
          </a-form-item>
          <!-- 交易哈希和交易哈希类型 -->
          <a-form-item v-if="EpochSearchForm.queryType === 'transactionHash'" label="交易哈希" name="transactionHash">
            <a-row gutter="{16}" style="width: 50%">
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
          <a-space style="width: 100%; justify-content: center">
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
      <a-card title="存证交易" style="height: 620px; overflow: scroll">
        <!-- <a-badge text="Verified"> -->
        <a-row align="middle" gutter="{16}">
          <!-- Avatar -->
          <a-col :span="2">
            <a-avatar size="large" :style="{ backgroundColor: '#f56a00', verticalAlign: 'middle' }"> 0x </a-avatar>
          </a-col>
          <!-- 交易哈希 -->
          <a-col :span="12" style="line-height: 64px; height: 64px; margin-left: 14px">
            <h3>{{ formattedTxHash }}</h3>
          </a-col>
          <!-- 标签部分 -->
          <a-col :span="4">
            <a-tag v-if="infoType == 'task' && TaskItem.status === 0" color="success">
              <template #icon>
                <check-circle-outlined />
              </template>
              success
            </a-tag>
            <a-tag v-else-if="infoType == 'task' && TaskItem.status === 1" color="processing">
              <template #icon>
                <sync-outlined :spin="true" />
              </template>
              processing
            </a-tag>
            <a-tag v-else-if="infoType == 'task' && TaskItem.status === 2" color="error">
              <template #icon>
                <sync-outlined :spin="true" />
              </template>
              error
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
                <a-row gutter="{16}" style="width: 100%">
                  <a-col :span="12">
                    <strong>任务标识:</strong>
                    <a-tag color="purple" class="break-tag">{{ TaskItem.sign }}</a-tag>
                  </a-col>
                  <a-col :span="12">
                    <strong>任务名称:</strong>
                    <a-tag color="purple" class="break-tag">{{ TaskItem.taskName }}</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>
              <a-list-item>
                <a-row gutter="{16}" style="width: 100%">
                  <a-col :span="12">
                    <strong>合成总量:</strong>
                    <a-tag color="pink" class="break-tag">{{ calculateDataSize(TaskItem.total, TaskItem.model, 'AUTO') }}</a-tag>
                  </a-col>
                  <a-col :span="12">
                    <strong>数据集:</strong>
                    <a-tag color="orange" class="break-tag">{{ TaskItem.dataset }}</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>
              <a-list-item>
                <a-row gutter="{16}" style="width: 100%">
                  <a-col :span="8">
                    <strong>调度数:</strong>
                    <a-tag color="green" class="break-tag">{{ TaskItem.nbSchedule }}</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <strong>提交数:</strong>
                    <a-tag color="blue" class="break-tag">{{ TaskItem.nbFinalized }}</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <strong>已合成:</strong>
                    <a-tag color="red" class="break-tag">{{ calculateDataSize(TaskItem.process, TaskItem.model, 'AUTO') }} </a-tag>
                  </a-col>
                </a-row>
              </a-list-item>
              <!-- <a-list-item style="justify-content: center;">
                <a-button type="primary">查看任务详情</a-button>
              </a-list-item> -->
            </a-list>
            <a-list bordered size="large" v-else-if="infoType == 'epoch'">
              <a-list-item>
                <a-row gutter="{16}" style="width: 100%">
                  <a-col :span="8">
                    <strong>纪元编号:</strong>
                    <a-tag color="purple">{{ EpochItem.epochID }}</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <strong>合成总量:</strong>
                    <a-tag color="pink">{{ calculateDataMapSize(EpochItem.process, 'AUTO') }}</a-tag>
                  </a-col>
                  <a-col :span="8">
                    <strong>确认单元:</strong>
                    <a-tag color="orange">{{ EpochItem.nbFinalized }}</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>

              <a-list-item>
                <a-row gutter="{16}" style="width: 100%">
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
                <a-row gutter="{16}" style="width: 100%">
                  <a-col :span="20">
                    <strong>交易哈希:</strong>
                    <a-tag color="purple" class="break-tag">{{ TransactionItem.txHash }}</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>
              <a-list-item>
                <a-row gutter="{10}" style="width: 100%">
                  <a-col :span="20">
                    <strong>区块哈希:</strong>
                    <a-tag color="pink" class="break-tag">{{ TransactionItem.blockHash }}</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>
              <a-list-item>
                <a-row gutter="{8}" style="width: 100%">
                  <a-col :span="5">
                    <strong>区块高度:</strong>
                    <a-tag color="orange" class="break-tag">{{ TransactionItem.blockHeight }}</a-tag>
                  </a-col>
                  <a-col :span="12">
                    <strong>合约地址:</strong>
                    <a-tag color="green" class="break-tag">{{ TransactionItem.contract }}</a-tag>
                  </a-col>
                  <a-col :span="5">
                    <strong>合约接口:</strong>
                    <a-tag color="blue" class="break-tag">{{ TransactionItem.method }}</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>
              <a-list-item>
                <a-row gutter="{2}" style="width: 100%">
                  <a-col :span="20">
                    <strong>默克尔根:</strong>
                    <a-tag color="red" class="break-tag">{{ TransactionItem.merkleRoot }}</a-tag>
                  </a-col>
                </a-row>
              </a-list-item>
              <a-list-item style="justify-content: center">
                <a-button type="primary" :loading="isChecking" @click="validateMerkleProof">{{ buttonText }}</a-button>
                <!-- 这里最好可以用echarts来一个树状图，验证merkler root -->
              </a-list-item>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </a-card>

      <!-- 这里画initTask->每个epoch的commit+finalized -->
      <a-card title="时间轴" style="height: 340px; overflow: scroll; margin-top: 25px" v-if="infoType == 'task'">
        <a-timeline mode="alternate">
          <a-timeline-item v-for="(item, index) in timelineItems" :key="index" color="red">
            <ClockCircleOutlined style="font-size: 16px" />
            {{ item[1] }}
          </a-timeline-item>
        </a-timeline>
      </a-card>
      <a-card title="异常溯源" style="height: 340px; overflow: scroll; margin-top: 25px" v-else-if="infoType == 'epoch'">
        <a-tabs>
          <a-tab-pane key="1" tab="节点异常检测">
            <a-list bordered :data-source="invalidNodeTable">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-list-item-meta>
                    <template #title>
                      <a-tag color="error">
                        {{ item.errMessage.split('||')[0] }}
                      </a-tag>
                      <a-tag color="error">
                        {{ item.errMessage.split('||')[1].split('Error ')[1].split(': ')[0] }}
                      </a-tag>
                    </template>
                  </a-list-item-meta>
                  <a-tag>
                    {{ item.nodeID }}
                  </a-tag>
                  {{ item.errMessage.split(': ')[1] }}
                </a-list-item>
              </template>
            </a-list>
            <!-- <a-table :columns="invalidNodeTableColumn" :data-source="invalidNodeTable" bordered :showHeader="false" /> -->
          </a-tab-pane>
          <a-tab-pane key="2" tab="提交单元异常">
            <a-list bordered :data-source="invalidSlotTable">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-list-item-meta>
                    <template #title>
                      <a-tag color="error">
                        {{ item.errMessage.split('||')[0] }}
                      </a-tag>
                      <a-tag color="error">
                        {{ item.errMessage.split('||')[1].split('Error ')[1].split(': ')[0] }}
                      </a-tag>
                    </template>
                  </a-list-item-meta>
                  <a-tag>
                    {{ item.slot }}
                  </a-tag>
                  {{ item.errMessage.split(': ')[1] }}
                </a-list-item>
              </template>
            </a-list>
            <!-- <a-table :columns="invalidSlotTableColumn" :data-source="invalidSlotTable" bordered :showHeader="false" /> -->
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
            <a-collapse v-model:activeKey="scheduleActiveKey" accordion style="height: 850px; overflow: scroll">
              <a-collapse-panel v-for="(schedule, index) in schedules" :key="index" :header="schedule.id">
                <a-list bordered size="large" v-if="infoType == 'task'">
                  <a-list-item>
                    <a-row gutter="{16}" style="width: 100%">
                      <a-col :span="8">
                        <strong>调度编号:</strong>
                        <a-tag color="purple">{{ schedule.id }}</a-tag>
                      </a-col>
                      <a-col :span="8">
                        <strong>调度总量:</strong>
                        <a-tag color="pink">{{ calculateDataSize(schedule.total, TaskItem.model, 'AUTO') }}</a-tag>
                      </a-col>
                      <a-col :span="8">
                        <strong>已完成数据:</strong>
                        <a-tag color="orange">{{ calculateDataSize(schedule.process, TaskItem.model, 'AUTO') }}</a-tag>
                      </a-col>
                    </a-row>
                  </a-list-item>
                  <a-list-item>
                    <a-row gutter="{16}" style="width: 100%">
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
                <a-list bordered size="large" v-else-if="infoType == 'epoch'">
                  <a-list-item v-if="index == 0">
                    <a-row gutter="{16}" style="width: 100%">
                      <a-col :span="8">
                        <strong>纪元编号:</strong>
                        <a-tag color="purple">{{ EpochItem.epochID }}</a-tag>
                      </a-col>
                      <a-col :span="8">
                        <strong>合成总量:</strong>
                        <a-tag color="pink">{{ calculateDataMapSize(EpochItem.process, 'AUTO') }}</a-tag>
                      </a-col>
                      <a-col :span="8">
                        <strong>确认单元数:</strong>
                        <a-tag color="orange">{{ EpochItem.nbFinalized }}</a-tag>
                      </a-col>
                    </a-row>
                  </a-list-item>
                  <a-list-item v-else-if="index == 1">
                    <a-row gutter="{16}" style="width: 100%">
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
                <a-table :columns="SchduleSlotTableColumn(infoType)" :data-source="schedule.tableDatas" style="margin-top: 1%">
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
                        <a-tag :color="record.status === 'Finished' ? 'green' : record.status === 'Failed' ? 'red' : 'blue'">
                          {{ record.status }}
                        </a-tag>
                      </span>
                    </template>
                    <template v-else-if="column.key === 'action'">
                      <span>
                        <!-- 如果状态是 'success' 显示 '完整性检验' 按钮 -->
                        <a-button v-if="record.status === 'Finished'" type="link" @click="getSlotInfo(record, false)">完整性检验</a-button>
                        <!-- <a-button v-if="record.status === 'Finished'" type="link" @click="getZKMLProof(record, false)">ZK证明展示</a-button> -->
                        <a-button v-if="record.status === 'Finished'" type="link" @click="showKeyVerification(record)">密钥验证</a-button>
                        <!-- 默认情况下，显示一个提示信息或空的按钮 -->
                        <a-button v-else-if="record.status === 'Processing'" type="link" disabled>等待中</a-button>
                        <a-button v-else type="link" danger>错误原因</a-button>
                      </span>
                    </template>
                  </template>
                </a-table>
                <a-modal
                  v-model:open="FinalizedSlotModalVisable"
                  :title="slotItem.name + ' 完整性检验'"
                  :style="{ width: '1000px' }"
                  :maskStyle="{ backgroundColor: 'rgba(0, 0, 0, 0.1)', boxShadow: 'none' }"
                  centered
                  @ok="FinalizedSlotModalVisable = false"
                >
                  <template #footer>
                    <a-button key="back" @click="FinalizedSlotModalVisable = false">返回</a-button>
                  </template>
                  <a-list bordered size="large">
                    <a-list-item>
                      <span
                        ><strong>单元哈希:</strong> <a-tag color="pink">{{ slotItem.slotHash }}</a-tag></span
                      >
                    </a-list-item>
                    <a-list-item>
                      <span
                        ><strong>任务默克尔根:</strong> <a-tag color="orange">{{ slotItem.merkle_root }}</a-tag></span
                      >
                    </a-list-item>
                    <a-list-item>
                      <span
                        ><strong>承诺检验默克尔根:</strong> <a-tag color="green">{{ slotItem.merkle_root }}</a-tag></span
                      >
                      <span
                        ><strong>校验结果:</strong> <a-tag color="green">{{ slotItem.veritfy }}</a-tag></span
                      >
                    </a-list-item>
                  </a-list>
                  <div id="proof" style="width: 1000px; height: 600px"></div>
                </a-modal>
                <a-modal
                  v-model:open="ZKModalVisible"
                  :title="slotItem.name + ' ZKML证明展示'"
                  :width="{ width: '800px' }"
                  :maskStyle="{ backgroundColor: 'rgba(0, 0, 0, 0.1)', boxShadow: 'none' }"
                  centered
                  @ok="ZKModalVisible = false"
                >
                  <template #footer>
                    <a-button key="verify" type="primary" @click="verifyZKProof">验证</a-button>
                    <a-button key="close" @click="ZKModalVisible = false">关闭</a-button>
                  </template>
                  <a-card>
                    <pre style="max-height: 500px; overflow-y: auto; white-space: pre-wrap;">
                      {{ JSON.stringify(zkProof, null, 2) }}
                    </pre>
                  </a-card>
                </a-modal>

                <a-modal
                  v-model:open="KeyVerificationModalVisible"
                  :title="'提交单元 ' + keyVerificationData.slotHash + ' 密钥验证展示'"
                  :width="800"
                  :maskStyle="{ backgroundColor: 'rgba(0, 0, 0, 0.1)', boxShadow: 'none' }"
                  centered
                  @ok="KeyVerificationModalVisible = false"
                >
                  <template #footer>
                    <a-button key="close" @click="KeyVerificationModalVisible = false">关闭</a-button>
                  </template>
                  <a-list bordered size="large">
                    <a-list-item>
                      <a-row gutter="{16}" style="width: 100%">
                        <a-col :span="24">
                          <strong>提交单元: </strong>
                          <a-tag color="purple" class="break-tag">{{ keyVerificationData.slotHash }}</a-tag>
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row gutter="{16}" style="width: 100%">
                        <a-col :span="24">
                          <strong>节点ID: </strong>
                          <a-tag color="orange">{{ keyVerificationData.nodeID }}</a-tag>
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row gutter="{16}" style="width: 100%">
                        <a-col :span="24">
                          <strong>数据哈希: </strong>
                          <a-tag color="cyan" class="break-tag">{{ keyVerificationData.dataHash }}</a-tag>
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row gutter="{16}" style="width: 100%">
                        <a-col :span="24">
                          <strong>节点公钥: </strong>
                          <a-tag color="blue" class="break-tag">{{ keyVerificationData.publicKey }}</a-tag>
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row gutter="{16}" style="width: 100%">
                        <a-col :span="24">
                          <strong>节点签名: </strong>
                          <a-tag color="green" class="break-tag">{{ keyVerificationData.signature }}</a-tag>
                        </a-col>
                      </a-row>
                    </a-list-item>
                    <a-list-item>
                      <a-row gutter="{16}" style="width: 100%">
                        <a-col :span="24">
                          <strong>CA证书: </strong>
                          <a-textarea
                          :value="keyVerificationData.ca"
                          readonly
                          :rows="4"
                        />
                        </a-col>
                      </a-row>
                    </a-list-item>
                  </a-list>
                </a-modal>

              </a-collapse-panel>
            </a-collapse>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card title="可视化结果" style="height: 1000px">
        <div style="width: 100%; height: 440px">
          <a-tabs activeKey="1" type="card">
            <a-tab-pane key="1">
              <template #tab>
                <span>
                  <LineChartOutlined />
                  合成进度
                </span>
              </template>
              <BarChart :chartData="BarData" :optionConfig="barChartConfig.chartConfig" height="30vh" v-if="infoType == 'task'" />
              <BarChart :chartData="BarData" :optionConfig="barChartConfig.chartConfig" height="30vh" v-else-if="infoType == 'epoch'" />
            </a-tab-pane>
          </a-tabs>
        </div>
        <div style="width: 100%; height: 440px">
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
              <PieChart
                :chartData="PieData"
                :optionConfig="pieChartConfig.chartConfig"
                :seriesConfig="pieChartConfig.seriesConfig"
                height="30vh"
                width="100%"
              />
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
  import {
    InfoCircleOutlined,
    LineChartOutlined,
    PieChartOutlined,
    CheckCircleOutlined,
    SyncOutlined,
    GoldOutlined,
    ClockCircleOutlined,
    ControlOutlined,
    TransactionOutlined,
    ConsoleSqlOutlined,
  } from '@ant-design/icons-vue';
  import { BarChart, PieChart } from '/@/components/Charts';
  import { getQueryDataApi } from '/@/api/demo/finDataSynthSecurityApi';
  import { message } from 'ant-design-vue';
  import { calculateDataSize, calculateDataMapSize } from '/@/utils/value/calDataSize';
  import { useRoute } from 'vue-router';
  import * as echarts from 'echarts';
  import { router } from '/@/router';

  const route = useRoute();
  const infoType = ref('');
  const activeKey1 = ref('1');
  const activeKey2 = ref('1');
  const activeKey3 = ref('1');
  const activeKey4 = ref('1');
  const scheduleActiveKey = ref(['0']);
  const timelineItems = ref([]);
  const FinalizedSlotModalVisable = ref<boolean>(false);
  const ZKModalVisible = ref<boolean>(false);
  const zkProof = ref<any>(null);
  const KeyVerificationModalVisible = ref<boolean>(false);
  const keyVerificationData = ref({
    slotHash: '',
    dataHash: '',
    publicKey: '',
    signature: '',
    nodeID: '',
    ca: ''
  });

  function buildTree(proof, merkleRoot, target) {
    const show = 10;
    let rootNode = {
      name: `${merkleRoot.slice(0, show)}...`,
      value: merkleRoot,
      children: [],
    };
    let currentNode = rootNode;
    for (let i = 0; i < proof.length; i++) {
      const { current, sibling } = proof[i];

      let nextNode = { name: `${current.hash.slice(0, show)}...`, value: current.hash, children: [] };

      if (current.hash === target) {
        nextNode.label = {
          backgroundColor: '#81c5f7',
          color: '#fff',
        };
      }

      let nodes = [nextNode, { name: `${sibling.hash.slice(0, show)}...`, value: sibling.hash }];

      // 排序：index 小的在前，表示左侧
      nodes.sort((a, b) => {
        return current.index < sibling.index ? -1 : 1;
      });

      currentNode.children = nodes;

      currentNode = nextNode;
    }

    return rootNode;
  }

  const getSlotInfo = async (slot, is_err) => {
    const res = await getQueryDataApi({
      query: 'SlotIntegrityVerification',
      slotHash: slot.slotHash,
    });

    // 这里添加merkle tree
    slotItem.merkle_root = res.data.merkleRoot;
    slotItem.err = slot.err;
    slotItem.slotHash = res.data.leaf;
    slotItem.veritfy = res.data.verified;
    slotItem.name = slot.slotHash;
    //处理proof数据
    slotItem.tree = buildTree(res.data.proof, res.data.merkleRoot, res.data.leaf);
    console.log(slotItem.tree);

    message.success('完整性校验成功');
    if (!is_err) {
      FinalizedSlotModalVisable.value = true;
      nextTick(() => {
        const dom = document.getElementById('proof');
        if (echarts.getInstanceByDom(dom)) {
          echarts.dispose(dom); // 销毁已有实例
        }
        const chart = echarts.init(dom);
        chart.setOption({
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: function (params) {
              // 示例：保证长文本换行显示
              return params.value;
            },
          },
          series: [
            {
              type: 'tree',
              id: 0,
              name: 'tree1',
              data: [slotItem.tree],
              avoidLabelOverlap: true, //防止标签重叠
              roam: true, //移动+缩放  'scale' 或 'zoom'：只能够缩放。 'move' 或 'pan'：只能够平移。
              scaleLimit: {
                //缩放比例
                min: 0.7, //最小的缩放值
                max: 6, //最大的缩放值
              },
              layout: 'orthogonal', //树图布局，orthogonal水平垂直方向，radial径向布局 是指以根节点为圆心，每一层节点为环，一层层向外
              orient: 'TB', //树形方向  TB为上下结构  LR为左右结构
              // nodePadding: 100,//结点间距 （发现没用）
              //layerPadding: 30,//连接线长度 （发现没用）
              symbol: 'circle', //图形形状  rect方形  roundRect圆角 emptyCircle圆形 circle实心圆
              symbolSize: 14, //状态大小
              edgeShape: 'polyline', //线条类型  curve曲线
              initialTreeDepth: -1, //初始展开的层级
              expandAndCollapse: true, //子树折叠和展开的交互，默认打开
              lineStyle: {
                //结构线条样式
                width: 0.5,
                color: '#1E9FFF',
                type: 'broken',
              },
              label: {
                //节点文本样式
                normal: {
                  backgroundColor: '#81c5f7',
                  position: 'bottom',
                  verticalAlign: 'middle', //文字垂直对齐方式
                  align: 'center',
                  borderColor: '#1E9FFF',
                  color: '#fff',
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 5,
                  height: 20,
                  width: 100,
                  offset: [0, 30], //节点文字与圆圈之间的距离
                  fontSize: 10,
                  // 节点文本阴影
                  shadowBlur: 10,
                  shadowColor: 'rgba(0,0,0,0.25)',
                  shadowOffsetX: 0,
                  shadowOffsetY: 2,
                },
              },
              leaves: {
                //叶子节点文本样式
                label: {
                  //backgroundColor: '#81c5f7',
                  backgroundColor: '#fff',
                  color: '#333',
                  position: 'bottom',
                  rotate: 0, //标签旋转。
                  verticalAlign: 'middle',
                  align: 'center',
                  //文本框内文字超过6个字折行
                  /* formatter: function(val) {
               let strs = val.name.split(''); //字符串数组
               let str = ''
               for(let i = 0, s; s = strs[i++];) { //遍历字符串数组
                 str += s;
                 if(!(i % 6)) str += '\n'; //按需要求余，目前是一个字换一行
               }
               return str
               }, */
                  //或者
                  overflow: 'break', //break为文字折行，  truncate为文字超出部分省略号显示
                  lineOverflow: 'truncate', //文字超出高度后 直接截取
                },
              },
              animationDuration: 550,
              animationDurationUpdate: 750,
            },
          ],
        });
      });
    } else {
    }
  };

  const getZKMLProof = async (slot, is_err) => {
    const res = await getQueryDataApi({
      query: 'SlotZKMLProof',
      slotHash: slot.slotHash,
    });

    slotItem.name = slot.slotHash;
    
    if (res.status === 'OK') {
      zkProof.value = res.data.proof; 
      message.success('ZK 证明获取成功');
      ZKModalVisible.value = true; 
    } else {
      message.error('ZK 证明获取失败');
    }
  };

  const verifyZKProof = () => {
    // 模拟验证逻辑
    message.loading('正在验证 ZK 证明...');
    setTimeout(() => {
      message.success('ZK 证明验证成功！');
    }, 1000);
  };

  const showKeyVerification = (slot) => {
      try {
          // 解析 base64 编码的 ca 字段
          const caDecoded = atob(slot.ca);
          const caData = JSON.parse(caDecoded);

          // 解析 commit_slot 获取 commitment（数据哈希）
          let dataHashHex = '';
          try {
              // commitment 是 base64 编码的，将其转换为十六进制
              const commitmentBase64 = slot.commitment;
              // 将 base64 转换为字节，再转换为十六进制
              const rawData = atob(commitmentBase64);
              dataHashHex = '0x' + Array.from(rawData)
                  .map(char => ('0' + char.charCodeAt(0).toString(16)).slice(-2))
                  .join('');
          } catch (e) {
              console.error('解析commit_slot失败:', e);
              dataHashHex = '无法解析';
          }

          keyVerificationData.value = {
              slotHash: slot.slotHash, 
              dataHash: dataHashHex, // 直接使用 commitment 作为数据哈希
              publicKey: caData.public_key || '',
              signature: slot.sign, // 直接显示签名
              nodeID: slot.nodeID !== undefined ? slot.nodeID : '',
              ca: caDecoded
          };

          KeyVerificationModalVisible.value = true;
          message.success('密钥信息加载成功');
      } catch (error) {
          console.error('解析密钥信息失败:', error);
          message.error('密钥信息解析失败');
      }
  };

  const SchduleSlotTableColumn = (infoType) => {
    return [
      {
        name: '提交单元',
        dataIndex: 'slotHash',
        key: 'slotHash',
      },
      {
        name: '预期数据量',
        dataIndex: 'size',
        key: 'size',
        customRender: ({ value, record }) => {
          // 对于 epoch，使用 record.model
          const model = infoType === 'task' ? TaskItem.model : record.model;
          return calculateDataSize(value, model, 'AUTO');
        },
      },
      {
        name: '实际完成量',
        dataIndex: 'process',
        key: 'process',
        customRender: ({ value, record }) => {
          // 对于 epoch，使用 record.model
          const model = infoType === 'task' ? TaskItem.model : record.model;
          return calculateDataSize(value, model, 'AUTO');
        },
      },
      {
        name: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '操作',
        key: 'action',
      },
    ];
  };
  let slotItem = reactive({
    name: 'default',
    slotHash: '',
    merkle_root: '',
    err: '',
    tree: [],
    veritfy: false,
  });

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
          formatter: '{value} KB',
        },
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true,
      },
    },
  };
  const PieData = ref([]);
  const BarData = ref([]);
  const TaskSearchForm = reactive({
    queryType: 'taskId', // 查询方式
    taskId: '',
    transactionHash: '',
    transactionType: 'InitTask',
  });

  const EpochSearchForm = reactive({
    queryType: 'epochId',
    epochId: '',
    transactionHash: '',
    transactionType: 'EpochRecord',
  });

  const onQuery = async () => {
    //这里获取查询信息
    if (activeKey1.value == '1') {
      const res = await (TaskSearchForm.queryType == 'taskId'
        ? getQueryDataApi({
            query: 'EvidencePreserveTaskIDQuery',
            taskID: TaskSearchForm.taskId,
          })
        : getQueryDataApi({
            query: 'EvidencePreserveTaskTxQuery',
            txHash: TaskSearchForm.transactionHash,
          }));

      // 更新信息
      // const res = await getQueryDataApi({
      //   query: 'EvidencePreserveTaskIDQuery',
      //   taskID: TaskSearchForm.taskId
      // })
      //更新信息
      if (res.status == 'OK') {
        message.success('查找成功');
        //获取时间信息
        timelineItems.value = res.data.timeline;
        //获取任务信息
        const taskInfo = res.data.task_info;
        TaskItem.sign = taskInfo.taskID;
        TaskItem.taskName = taskInfo.taskName;
        TaskItem.total = taskInfo.total;
        TaskItem.process = taskInfo.process;
        TaskItem.nbSchedule = taskInfo.schedule;
        TaskItem.nbFinalized = taskInfo.commit;
        TaskItem.dataset = taskInfo.dataset;
        TaskItem.model = taskInfo.model;
        TaskItem.status = taskInfo.status;
        //获取交易信息
        const txInfo = res.data.tx_info;
        (TransactionItem.txHash = txInfo.txHash), // 交易哈希
          (TransactionItem.blockHash = txInfo.blockHash), // 区块哈希
          (TransactionItem.blockHeight = txInfo.blockHeight), // 区块高度
          (TransactionItem.contract = txInfo.contractAddress), // 合约地址
          (TransactionItem.method = txInfo.abi);
        (TransactionItem.upchainTime = '2024-10-08 14:15:30'), // 上链时间(这个是假的)
          (TransactionItem.merkleRoot = txInfo.MerkleRoot); // 交易所在的区块的merkle root，下面提供一个按钮验证merkle
        //获取epoch信息
        let epochArray = [];
        for (let i = 0; i < res.data.epochProcessData.length; i++) {
          epochArray.push({
            name: `Epoch${res.data.epochs[i]}`,
            value: calculateDataSize(res.data.epochProcessData[i], TaskItem.model, 'KB', false),
          });
        }
        BarData.value = epochArray;
        PieData.value = [
          { name: '处理中', value: res.data.scheduleDistributionData[2] },
          { name: '已完成', value: res.data.scheduleDistributionData[0] },
          { name: '失败', value: res.data.scheduleDistributionData[1] },
        ];
        //更新schedule
        let scheduleArray = [];
        for (let i = 0; i < res.data.schedules.length; i++) {
          let slotArray = [];
          let item = res.data.schedules[i];
          let sArr = ['Finished', 'Processing', 'Failed'];
          for (let i = 0; i < item.slots.length; i++) {
            slotArray.push({
              slotHash: item.slots[i].slotHash,
              size: item.slots[i].scheduleSize,
              process: item.slots[i].process,
              status: sArr[item.slots[i].status],
              commitment: item.slots[i].commitment,
              err: item.slots[i].err,
              ca: item.slots[i].ca,
              sign: item.slots[i].sign,
              nodeID: item.slots[i].nodeID,
            });
          }
          scheduleArray.push({
            id: `schedule-${i + 1}`, // 每个 Schedule 的 id 按序生成
            total: item.scheduleSize,
            process: item.process,
            nbCommit: item.commitNumber,
            nbInvalid: item.invalidNumber,
            nbNodes: item.commitNumber + item.invalidNumber, //这里暂时用提交数代替
            tableDatas: slotArray,
          });
        }
        schedules.value = scheduleArray;

        evidenceTable.value = [
          { name: '任务标识', value: TaskItem.sign },
          { name: '任务名称', value: TaskItem.taskName },
          { name: '交易哈希', value: TransactionItem.txHash },
          { name: '任务状态', value: TaskItem.process == TaskItem.total ? '已完成' : '处理中' },
        ];
        infoType.value = 'task';
        console.log(schedules);
      } else {
        message.error('查找失败');
      }
    } else if (activeKey1.value == '2') {
      const res = await (EpochSearchForm.queryType == 'epochId'
        ? getQueryDataApi({
            query: 'EvidencePreserveEpochIDQuery',
            epochID: EpochSearchForm.epochId,
          })
        : getQueryDataApi({
            query: 'EvidencePreserveEpochTxQuery',
            txHash: EpochSearchForm.transactionHash,
          }));
      //更新信息
      console.log(res.status);
      if (res.status == 'OK') {
        message.success('查找成功');
        //获取时间信息
        // timelineItems.value = res.data.timeline
        //获取任务信息
        const epochInfo = res.data.epoch_info;
        EpochItem.epochID = epochInfo.epochID;
        EpochItem.nbCommit = epochInfo.nbCommit;
        EpochItem.nbFinalized = epochInfo.nbFinalized;
        EpochItem.nbJustified = epochInfo.nbJustified;
        EpochItem.process = epochInfo.process;
        // EpochItem.nbTasks = epochInfo.nbTasks
        EpochItem.nbInvalid = epochInfo.nbInvalid;
        console.log(epochInfo, EpochItem);
        //获取交易信息
        const txInfo = res.data.tx_info;
        (TransactionItem.txHash = txInfo.txHash), // 交易哈希
          (TransactionItem.blockHash = txInfo.blockHash), // 区块哈希
          (TransactionItem.blockHeight = txInfo.blockHeight), // 区块高度
          (TransactionItem.contract = txInfo.contractAddress), // 合约地址
          (TransactionItem.method = txInfo.abi);
        (TransactionItem.upchainTime = '2024-10-08 14:15:30'), // 上链时间(这个是假的)
          (TransactionItem.merkleRoot = txInfo.MerkleRoot); // 交易所在的区块的merkle root，下面提供一个按钮验证merkle
        evidenceTable.value = [
          { name: '纪元编号', value: EpochItem.epochID },
          { name: '交易哈希', value: TransactionItem.txHash },
          { name: '纪元状态', value: '已完成' },
        ];
        let invalidSlot = [];
        let invalidNode = [];
        for (let i = 0; i < res.data.invalidSlot.length; i++) {
          // console.log(res.data.invalidSlot[i]);
          invalidSlot.push({
            slot: res.data.invalidSlot[i].slotHash,
            errMessage: res.data.invalidSlot[i].Err,
          });
          invalidNode.push({
            nodeID: `ECNU-合成节点-${res.data.invalidSlot[i].nodeID}`,
            errMessage: res.data.invalidSlot[i].Err,
          });
        }
        invalidSlotTable.value = invalidSlot;
        invalidNodeTable.value = invalidNode;
        let scheduleArray = [];
        let finalizedArray = [];
        for (let i = 0; i < res.data.finalized.length; i++) {
          let item = res.data.finalized[i];
          console.log(item);
          let sArr = ['Finished', 'Processing', 'Failed'];
          finalizedArray.push({
            slotHash: item.slotHash,
            size: item.scheduleSize,
            process: item.process,
            model: item.model,
            status: sArr[item.status],
            commitment: item.commitment,
            err: item.err,
            ca: item.ca,
            sign: item.sign,
            nodeID: item.nodeID,
          });
        }
        scheduleArray.push({
          id: `确认单元信息`, // 每个 Schedule 的 id 按序生成
          total: 0,
          process: 0,
          nbCommit: 0,
          nbInvalid: 0,
          nbNodes: 0,
          tableDatas: finalizedArray,
        });
        let commitArray = [];
        for (let i = 0; i < res.data.commit.length; i++) {
          let item = res.data.commit[i];
          let sArr = ['Finished', 'Processing', 'Failed'];
          commitArray.push({
            slotHash: item.slotHash,
            size: item.scheduleSize,
            process: item.process,
            model: item.model,
            status: sArr[item.status],
            commitment: item.commitment,
            err: item.err,
            ca: item.ca,
            sign: item.sign,
            nodeID: item.nodeID,
          });
        }
        scheduleArray.push({
          id: `提交单元信息`, // 每个 Schedule 的 id 按序生成
          total: 0,
          process: 0,
          nbCommit: 0,
          nbInvalid: 0,
          nbNodes: 0,
          tableDatas: commitArray,
        });
        schedules.value = scheduleArray;
        // 遍历 taskProcessDistributionData 对象的每对 key-value
        let taskArray = [];
        Object.entries(res.data.taskProcessDistributionData).forEach(([key, value]) => {
          taskArray.push({ name: key, value: calculateDataSize(value.schedule, value.model, 'KB', false) });
        });
        BarData.value = taskArray;
        PieData.value = [
          { name: '提交单元', value: EpochItem.nbCommit },
          { name: '确认单元', value: EpochItem.nbFinalized },
          { name: '异常单元', value: EpochItem.nbInvalid },
        ];
        infoType.value = 'epoch';
      } else {
        message.error('查找失败');
      }
    }
  };

  // 生成 10 个 Schedule 对象
  let schedules = ref([]);

  let TransactionItem = reactive({
    txHash: `null`, // 交易哈希
    blockHash: `null`, // 区块哈希
    blockHeight: 0, // 区块高度
    contract: `null`, // 合约地址
    method: 'null', // 合约接口
    upchainTime: 'null', // 上链时间
    merkleRoot: `null`, // 交易所在的区块的merkle root，下面提供一个按钮验证merkle
  });
  // 左下角显示的task
  let TaskItem = reactive({
    sign: ``, // 任务标识
    taskName: `default`,
    total: 0, // 总量
    dataset: 'dataset1', // 数据集
    model: 'default',
    nbSchedule: 0, // 调度数量，对应task slot
    nbFinalized: 0, // finalized的slot数量
    process: 0, // 已经完成的合成数
    status: 2,
  });
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
  });

  // const invalidSlotTableColumn = [
  //   { title: '提交单元', dataIndex: 'slot', key: 'slot' },
  //   { title: '异常检测', dataIndex: 'errMessage', key: 'errMessage' },
  // ];
  // const invalidNodeTableColumn = [
  //   { title: '节点名称', dataIndex: 'nodeID', key: 'nodeID' },
  //   { title: '异常检测', dataIndex: 'errMessage', key: 'errMessage' },
  // ];
  let invalidSlotTable = ref([]);
  let invalidNodeTable = ref([]);
  // 左下角显示的epoch/task表格
  // let evidenceTaskTable = ref([]);
  // let evidenceEpochTable = ref([]);
  let evidenceTable = ref([]);
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

  const screenWidth = ref(window.innerWidth);
  // 监听窗口尺寸变化
  const updateScreenSize = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateScreenSize);
    //检查params
    if (route.query.taskId != null) {
      TaskSearchForm.taskId = route.query.taskId;
      TaskSearchForm.queryType = 'taskId';
      onQuery();
    }
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScreenSize);
  });
  const formattedTxHash = computed(() => {
    const hash = TransactionItem.txHash;
    if (screenWidth.value > 2500) {
      return hash.substring(2, 40) + '....';
    } else {
      return hash.substring(2, 18) + '....';
    }
  });

  const buttonText = ref('校验默克尔证明');
  const isChecking = ref(false);
  const validateMerkleProof = () => {
    isChecking.value = true; // 显示加载状态
    // 模拟校验过程（1.5秒后显示“校验成功”）
    setTimeout(() => {
      buttonText.value = '✅ 校验成功'; // 更新按钮文本
      isChecking.value = false; // 关闭加载状态
      // 2秒后自动恢复按钮文本
      setTimeout(() => {
        buttonText.value = '校验默克尔证明';
      }, 2000);
    }, 1500);
  };
</script>

<style scoped>
  .a-card {
    margin-bottom: 20px;
  }

  .table-container {
    margin-top: 20px;
  }

  .break-tag {
    display: inline-block;
    white-space: normal;
    word-break: break-word;
    max-width: 100%;
  }
</style>

<style scoped lang="less">
  .ant-pagination {
    display: none;
  }
</style>
