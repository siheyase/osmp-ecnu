/*
 * @Author: lyt
 * @Date: 2024-11-08 14:05:04
 * @LastEditTime: 2024-12-16 17:58:05
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/src/api/demo/model/chartsModel.ts
 *
 */
// 图表类型: bar-柱状图，barMulti-多柱图，hbar-横向柱状图，pie-饼图，radar-雷达图，direct-堆叠图，line-折线图，ring-环形图，tangPolar-极坐标图
export type ChartsType = 'bar' | 'barMulti' | 'hbar' | 'pie' | 'radar' | 'direct' | 'line' | 'ring' | 'tangPolar';
export type DataType = 'origVal' | 'modVal';

export interface ChartsInfo {
  id?: string;
  title: string; // 看板标题
  type?: string; // 图表类型
  chartList?: ChartList[];
}

export interface ChartList {
  seriesConfig?: any; // 系列配置
  chartConfig?: any; // 图表配置
  // 看板数据
  chartData?: any;
}
