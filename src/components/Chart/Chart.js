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

  //柱状图背景
  let barBack = {
    type: "bar",
    data: new Array(data?.yData[0].length).fill(0),
    barWidth: 20,
    showBackground: true,
    barGap: "-125%",
    backgroundStyle: {
      barBorderRadius: [30, 30, 0, 0],
      barBorderWidth: 1.5,
      borderColor: color[0],
      borderType: "solid",
      color: "rgba(255,255,255, 1)",
    },
  };
  //组件位置，防止输入长度小于4报错
  let arrZero = new Array(4 - grid.length).fill(0);
  let grids = grid.length < 4 ? [...grid, ...arrZero] : grid;

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
        show: props.legend,
        fontSize: props.legendFontSize,
        top: props.legendGridTop,
        right: props.legendGridRight,
      },
      tooltip: {
        show: props.tooltip,
        trigger: "axis",
        textStyle: {
          fontSize: props.tooltipFontSize,
        },
        formatter: (params) => {
          let relVal = params[0].name;
          params.length > 0 &&
            params.forEach((item, index) => {
              relVal +=
                "<br/>" +
                item.marker +
                item.seriesName +
                "：" +
                item.value +
                (index === 0 ? data.yName : "%");
            });
          return relVal;
        },
      },
      xAxis: {
        type: "category",
        axisLabel: {
          show: true,
          fontSize: props.xAxisFontSize, // 14,
          color: props.axisLabelColor, //"#666666",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: props.axisLineColor, //"rgba(0,0,0, 0.1)",
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
            color: props.axisLabelColor,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: props.axisLineColor,
            },
          },
          axisLabel: {
            fontSize: props.xAxisFontSize,
            color: props.axisLabelColor,
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
        endValue: props.dataZoomEndValue
          ? props.dataZoomEndValue
          : data?.xData.length,
        height: props.dataZoomHeight,
      },
    };
    instance.setOption(option);
    window.addEventListener("resize", () => {
      instance.resize();
    });
  };
  useEffect(renderChart, []);
  useEffect(renderChart, [props]);
  return <div ref={chartRef} className={[className, "chartStyle"].join(" ")} />;
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
   * legend
   */
  legend: PropTypes.bool,
  legendFontSize: PropTypes.number,
  legendGridTop: PropTypes.string,
  legendGridLeft: PropTypes.string,
  /**
   * dataZoom
   */
  dataZoom: PropTypes.bool,
  /**
   * dataZoom 高度
   */
  dataZoomHeight: PropTypes.number | PropTypes.string,
  /**
   * dataZoomEndValue
   */
  dataZoomEndValue: PropTypes.number,
  /**
   * bar宽度,可配置为百分比
   */
  barWidth: PropTypes.number | PropTypes.string,
  /**
   * bar Border Radius
   */
  barBorderRadius: PropTypes.array,
  /**
   * tooltip
   */
  tooltip: PropTypes.bool,
  /**
   * tooltip字体大小
   */
  tooltipFontSize: PropTypes.number,
  /**
   * x/y轴字体大小、字体颜色、轴线颜色
   */
  xAxisFontSize: PropTypes.number,
  axisLabelColor: PropTypes.string,
  axisLineColor: PropTypes.string,
  /**
   * 图表数据
   */
  data: PropTypes.object,
};
Chart.defaultProps = {
  dataZoom: true,
  dataZoomHeight: "3%",
  dataZoomEndValue: null,
  barWidth: 20,
  grid: ["18%", "8%", "20%", "8%"],
  barBorderRadius: [0],
  color: ["rgba(240,177,154, 1)", "rgb(146,204,237)", "rgb(255,131,131)"],
  tooltip: true,
  tooltipFontSize: 14,
  xAxisFontSize: 14,
  axisLabelColor: "#666666",
  axisLineColor: "rgba(0,0,0,0.1)",
  legend: true,
  legendFontSize: 14,
  legendGridTop: 0,
  legendGridRight: "2%",
  data: {
    xData: ["Mon", "Tue", "Wed", "全国", "Fri", "Sat", "Sun"],
    yData: [
      {
        id: "sum",
        type: "bar",
        name: "总数1",
        data: [120, 100, 170, 80, 70, 110, 130],
      },
      {
        id: "sum1",
        type: "line",
        name: "总数2",
        data: [0.2, 0.3, 0.4, 0.8, 0.27, 0.1, 0.23],
      },
      {
        id: "sum2",
        type: "line",
        name: "总数3",
        data: [0.24, 0.5, 0.4, 0.7, 0.7, 0.9, 0.3],
      },
    ],
    legend: ["1", "2", "总数3"],
    xName: "",
    yName: "(万户)",
  },
};
