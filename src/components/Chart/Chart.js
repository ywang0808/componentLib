import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import PropTypes from "prop-types";
import "./Chart.less";

export const Chart = (propArgs) => {
  const { className, color, data, grid, ...props } = propArgs;
  let instance = null;
  const chartRef = useRef();

  let lineData = []; //折线图数据
  let yAxisMax0, yAxisMax1; // 两侧坐标轴最大值-左右

  const series = [];
  data?.yData.length > 0 &&
    data.yData.map((item, index) => {
      if (item.type === "bar") {
        yAxisMax0 = Math.max(...item.data) * 1.2;
        series.push({
          type: "bar",
          name: item.name,
          barWidth: props.barWidth,
          itemStyle: {
            color: color[index],
            borderRadius: props.barBorderRadius,
          },
          data: item.data,
          yAxisIndex: 0,
        });
      } else if (item.type === "line") {
        series.push({
          type: "line",
          name: item.name,
          color: color[index],
          data: item.data,
          yAxisIndex: 1,
        });
        lineData.push(...item.data);
        yAxisMax1 = Math.max(...lineData) * 1.2;
      }
    });
  //组件位置，防止输入长度小于4报错
  let grids = grid;
  if (grid.length < 4) {
    for (let i = grid.length; i < 4; i++) {
      grids.push(0);
    }
  }
  // 渲染组件
  const renderChart = () => {
    const chart = echarts.getInstanceByDom(chartRef.current);
    if (chart) {
      instance = chart;
    } else {
      instance = echarts.init(chartRef.current);
    }
    const option = {
      grid: {
        top: grids[0],
        right: grids[1],
        bottom: grids[2],
        left: grids[3],
      },
      legend: {
        left: "2%",
        top: "2%",
        data: data?.legend,
      },
      tooltip: {
        show: true,
        trigger: "axis",
        fontSize: 13,
        formatter: (params) => {
          let relVal = params[0].name;
          params.length > 0 &&
            params.forEach((item, index) => {
              index !== 1
                ? (relVal +=
                    "<br/>" +
                    item.marker +
                    item.seriesName +
                    "：" +
                    item.value +
                    (index === 0 ? data.yName : "%"))
                : null;
            });
          return relVal;
        },
      },
      xAxis: {
        type: "category",
        axisLabel: {
          show: true,
          fontSize: 14,
          color:'#666666',
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(0,0,0, 0.1)",
          },
        },
        xName: data?.xName,
        data: data?.xData,
      },
      yAxis: [
        {
          type: "value",
          max: yAxisMax0,
          position: "left",
          name: data?.yName,
          nameTextStyle: {
            color: "#666666",
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(0,0,0, 0.1)",
            },
          },
          axisLabel: {
            fontSize: 13,
            color: "#666666",
          },
        },
        {
          type: "value",
          max: yAxisMax1,
          position: "right",
          name: data?.legend && data.legend.length > 0 ? "(%)" : null,
          nameTextStyle: {
            fontSize: 13,
            color: "#666666",
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(0,0,0, 0.1)",
            },
          },
          axisLabel: {
            fontSize: 13,
            color: "#666666",
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: series,
      dataZoom: {
        show: props.dataZoom,
      },
    };
    instance.setOption(option);
    window.addEventListener("resize", () => {
      instance.resize();
    });
  };
  useEffect(renderChart, []);
  useEffect(renderChart, [props]);
  return (
    <div
      ref={chartRef}
      className={className}
      style={{ width: "100%", height: 400 }}
    />
  );
};
Chart.propTypes = {
  /**
   * 类名
   */
  className: PropTypes.string,
  /**
   * 颜色
   */
  color: PropTypes.array,
  /**
   * 图表位置
   */
  grid: PropTypes.array,
  /**
   * dataZoom
   */
  dataZoom: PropTypes.bool,
  /**
   * bar宽度,可配置为百分比
   */
  barWidth: PropTypes.number | PropTypes.string,
  /**
   * bar Border Radius
   */
  barBorderRadius: PropTypes.array,
  /**
   * 图表数据
   */
  data: PropTypes.object,
};
Chart.defaultProps = {
  dataZoom: true,
  barWidth: 20,
  grid: ["8%", "8%", "20%", "8%"],
  barBorderRadius: [20],
  color: ["rgba(240,177,154, 1)", "rgb(146,204,237)", "rgb(255,131,131)"],
  data: {
    xData: ["Mon", "Tue", "Wed", "全国", "Fri", "Sat", "Sun"],
    yData: [
      {
        id: "sum",
        type: "bar",
        name: "总数",
        data: [120, 100, 170, 80, 70, 110, 130],
      },
      {
        id: "sum1",
        type: "line",
        name: "总数",
        data: [0.2, 0.3, 0.4, 0.8, 0.27, 0.1, 0.23],
      },
      {
        id: "sum2",
        type: "line",
        name: "总数",
        data: [0.24, 0.5, 0.4, 0.7, 0.7, 0.9, 0.3],
      },
    ],
    legend: ["1", "2", "3"],
    xName: "",
    yName: "(万户)",
  },
};
