# osmp-demo

#### 介绍

一站式平台demo项目

#### 软件架构

- 前端IDE建议：Vscode、WebStorm
- 采用 Vue3.0+TypeScript+Vite+Ant-Design-Vue等新技术方案，包括二次封装组件、utils、hooks、动态菜单、权限校验、按钮级别权限控制等功能
- 最新技术栈：Vue3.0 + TypeScript + Vite5 + ant-design-vue4 + pinia + echarts + unocss + vxe-table + qiankun + es6
- 依赖管理：node、npm、pnpm

#### 环境部署参考教程

- [Node.js、npm版本（18 / 20+）](https://blog.csdn.net/weixin_45565886/article/details/141828707)
- [pnpm](https://cloud.tencent.com/developer/article/2427836)


#### 使用说明

参考文档：[【腾讯文档】一站式平台-demo示例文档](https://docs.qq.com/doc/DWXZ5ZWFZSWJLQ1JC)
在线演示：[demo项目在线演示](http://140.207.154.218:42218/)

1.  安装依赖：pnpm install
2.  启动项目：
    方式1 pnpm dev
    方式2 npm run dev

若运行失败 可能是没安装sass  
安装命令：`pnpm add -D sass`


#### 前端公网地址

http://140.207.154.218:42217/

#### 墨刀

https://modao.cc/proto/3DHPOjvslhwwlTuY8fx4Z/sharing?view_mode=read_only&screen=rbpURzSjDLbyIQZc1

#### 前端使用的开源项目JeecgBoot文档

https://help.jeecg.com/



## 课题二页面TODO

- 区块链数据监控页面
  - 最新`Epoch`信息：
    - `EpochID`
    - 提交单元数(`Commit Slot`)
    - 最终确认单元数(`finalized Slot`)
    - 检测异常单元数(`Invalid Slot`)
    - 交易哈希(`tx hash`)
  - 最新交易信息
    - 交易类型：`InitTask/TaskProcess/EpochRecord`
    - 交易哈希(`tx hash`)
    - 上链时间
    - 区块信息
- 存证溯源界面：分为两种类型的溯源功能
  - `Task`：对应一个`InitTask`的交易哈希
    - 过程查证：`schedule + slot`列表，每个`slot`对应一个`TaskProcess`的交易哈希
    - 完整性查证：`slot`列表，对应交易哈希、KZG承诺、Merkle Root和对应的聚合签名
    - 没有异常溯源
  - `Epoch`：对应一个`EpochRecord`的交易哈希
    - 过程查证：`Epoch`中的`Slot`列表，每个`slot`对应一个`TaskProcess`的交易哈希，另外加上`commit`和`invalid`的列表
    - 异常检测：`Heartbeat`列表+`invalid`列表
    - 没有完整性
  - 上面两种溯源都提供一个时间轴
  - 可视化图表
- 数据合成安全（节点状态）
  - 图表
    - 合成数据日分布图
    - 存储空间使用情况
    - 合成节点状态总览
    - 合成任务状态总览(处理中/已完成/异常)：结合`Slot/Schedule/Epoch`概念
  - 节点列表
    - 节点名称
    - 存储状态（百分比）
    - 节点状态（关机/故障/正常）
    - 负载状态（空闲/忙碌，表示为待处理任务数）
    - 操作：`查看历史=Slot+日完成合成量等`，`节点状态=存储情况，负载情况等`，图表
- 合成任务界面
  - 任务检索（在代码中要提供日期）
  - 新建合成任务
    - 模型
    - 数据集
    - 数据量
  - 任务列表
    - 合成任务ID（`sign`）
    - 交易哈希：`InitTask`
    - 总量（`Total`）
    - 已合成（`Process`）
    - 状态（已完成/进行中）
    - 时间
    - ...
