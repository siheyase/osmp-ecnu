/*
 * @Author: lyt
 * @Date: 2024-11-18 16:18:18
 * @LastEditTime: 2024-11-25 16:07:21
 * @LastEditors: lyt
 * @Description: demo-图表系列
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/views/demo/charts/useCharts.ts
 *
 */
import { getMonDashboardApi } from '/@/api/demo/monDashboardApi';
import { DashboardInfo } from '/@/api/demo/model/monDashboardModel';
import { onMounted, ref } from 'vue';
import { cloneDeep } from 'lodash-es';

export const useCharts = () => {
  const dashboardData = ref<DashboardInfo[]>();

  const setChartOption = (data) => {
    const newData = cloneDeep(data) as any;
    if (newData && newData.length > 0) {
      newData.forEach((modelItem) => {
        modelItem.chartList.forEach((chartItem, chartIndex) => {
          // '#1D7DE9
          if (modelItem.type === 'bar') {
            chartItem.chartConfig = {
              ...chartItem.chartConfig,
              yAxis: {
                axisLabel: {
                  formatter: '{value}T',
                },
              },
            };
          }
          if (modelItem.type === 'direct') {
            chartItem.chartConfig = {
              ...chartItem.chartConfig,
              legend: {
                bottom: '0%',
              },
              xAxis: {
                axisLabel: {
                  // 自定义X轴Label显示内容
                  formatter: (params) => Math.round(params.value * 1000) / 10 + '%',
                },
              },
            };
          }
          if (modelItem.type === 'pie') {
            switch (chartIndex) {
              case 0:
                chartItem.seriesConfig = {
                  ...chartItem.seriesConfig,
                  // 设置图表每块/列/行的颜色（非必填，为空时默认使用系统设定的颜色）
                  color: ['#2578F2', '#84B7F9', '#9A9A9A', '#DE868F'],
                  itemStyle: {
                    // 设置扇形的圆角半径
                    borderRadius: 4,
                  },
                };
                break;
              case 1:
                chartItem.chartConfig = {
                  ...chartItem.chartConfig,
                  legend: {
                    // 展示图例
                    show: true,
                  },
                  // 提示框配置
                  tooltip: {
                    // 触发类型，item-数据项图形触发，axis-坐标轴触发 ，none-不触发'
                    trigger: 'item',
                    // 提示框内容格式器
                    formatter: '{b} : {d}%',
                  },
                };
                chartItem.seriesConfig = {
                  ...chartItem.seriesConfig,
                  // 设置图表每块/列/行的颜色（非必填，为空时默认使用系统设定的颜色）
                  color: ['#1F77B4', '#FF7F0F'],
                  label: {
                    show: true,
                    // 标签内容格式器，支持字符串模板和回调函数两种形式
                    formatter: '{d}%',
                    // formatter: function (params) {
                    //   return `${(params.value * 100).toFixed(2)}%`;
                    // },
                    position: 'inner',
                  },
                };
                break;
              case 2:

              case 3:
                break;
              default:
                break;
            }
          }
          if (modelItem.type === 'line') {
            chartItem.chartConfig = {
              ...chartItem.chartConfig,
              yAxis: {
                axisLabel: {
                  formatter: '{value}TPS',
                },
              },
            };
            chartItem.seriesConfig = {
              ...chartItem.seriesConfig,
              // 平滑曲线
              smooth: true,
              color: ['#13AEFF'],
            };
          }
          if (modelItem.type === 'ring') {
            chartItem.seriesConfig = {
              // 设置图表每块/列/行的颜色（非必填，为空时默认使用系统设定的颜色）
              color: ['#2578F2', '#FEAC00'],
              // 起始角度，支持范围[0, 360]。
              startAngle: 180,
              // 结束角度，默认值是 'auto'，支持范围[0, 360]
              endAngle: 360,
              label: {
                show: true,
                formatter: '{b}{c}',
              },
            };
            // chartItem.chartConfig = {
            //   legend: {
            //     orient: 'vertical',
            //   },
            //   ...chartItem.chartConfig,
            // };
          }
        });
      });
    }

    console.log('newData', newData);

    return newData;
  };
  const getDashboardData = async () => {
    try {
      const res = await getMonDashboardApi({ type: 'pie' });
      dashboardData.value = res ? setChartOption(res) : [];
    } catch (error) {
      console.error('Error:', error);
    }
  };

  onMounted(() => {
    getDashboardData();
  });

  return { dashboardData };
};
