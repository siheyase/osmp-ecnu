/*
 * @Author: lyt
 * @Date: 2024-11-08 14:05:04
 * @LastEditTime: 2024-11-21 15:00:47
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/api/demo/model/monDashboardModel.ts
 *
 */
// 图表类型: bar-柱状图，barMulti-多柱图，hbar-横向柱状图，pie-饼图，radar-雷达图，direct-堆叠图，line-折线图，ring-环形图，tangPolar-极坐标图
export type ChartsType = 'bar' | 'barMulti' | 'hbar' | 'pie' | 'radar' | 'direct' | 'line' | 'ring' | 'tangPolar';
export type DataType = 'origVal' | 'modVal';

export interface ChartConfig {
  legend?: string[]; // 图例显示的内容
  xAxis?: any; // x轴显示的内容
  yAxis?: any; // y轴显示的内容
  series?: string[]; // 系列显示的内容
  indicator?: any; // 雷达图配置
}

export interface DashboardInfo {
  id?: string;
  title: string; // 看板标题
  type?: string; // 图表类型
  chartList?: ChartInfo[];
}

export interface ChartInfo {
  id?: string;
  name?: string; // 图表标题
  type?: ChartsType; // 看板类型
  chartConfig?: ChartConfig; // 图表配置
  // 看板数据
  chartData?: any;
}
