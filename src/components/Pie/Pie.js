/**
 * <p>Title: BONC - React </p>
 *
 * <p>Description: 饼图</p>
 * <p>Company: 北京东方国信科技股份有限公司 </p>
 *
 * @author wy
 * @date 2022/3/7
 */
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
import "./Pie.less"

export const Pie = (propArgs) => {
  const { data, color, className, ...props } = propArgs;
  const chartRef = useRef();
  let echartsInstance = null;

  const renderChart = () => {
    let chart = echarts.getInstanceByDom(chartRef.current);
    if (chart) {
      echartsInstance = chart;
    } else {
      echartsInstance = echarts.init(chartRef.current);
    }
    const dataList = data?.pieData.length > 0 ? data.pieData : [];
    const unit = data?.unit ? data.unit : '';
    let legend = [];
    dataList.map((item) => {
      legend.push(item.name);
    });
    const option = {
      color: color,
      tooltip: {
        trigger: "item",
        // formatter: () => {
        //   formatter();
        // },
      },
      legend: {
        show: true,
        icon: props.legendIcon,
        top: props.legendGridTop,
        left: props.legendGridLeft,
        itemGap: 28,
        data: legend,
        textStyle: {
          color: "#000",
        },
      },
      series: [
        {
          type: "pie",
          name: "pie",
          clockWise: props.clockWise,
          avoidLabelOverlap: true,
          roseType: props.roseType, // 玫瑰图属性
          selectedMode: false, //支持多选
          center: props.center,
          radius: props.radius,
          label: {
            show: true,
            position: 'outside',
            normal: {
              formatter: [`{b|{d}%}`, `{b|{c}${unit}}`].join("\n"),
              rich: {
                b: props.labelFont,
              },
            },
          },
          labelLine: {
            show: true,
            length: props.labelLineLength,
            length2: props.labelLineLength2,
          },
          data: dataList,
        },
      ],
    };
    echartsInstance.setOption(option);
    window.addEventListener("resize", () => {
      echartsInstance.resize();
    });
  };

  useEffect(renderChart, []);
  useEffect(renderChart, [propArgs]);

  return (
    <div
      ref={chartRef}
      className={["pieStyle", className].join(" ")}
    />
  );
};

Pie.propTypes = {
  /**
   * 类名
   */
  className: PropTypes.string,
  /**
   * 饼图颜色
   */
  color: PropTypes.array,
  /**
   * 饼图颜色
   */
  clockWise: PropTypes.bool,
  /**
   * 饼图圆弧半径
   */
  radius:PropTypes.array,
  /**
   * 饼图位置
   */
  center: PropTypes.array,
  /**
   * false:不展示成南丁格尔图；
   * 'radius':扇区圆心角区分数据大小
   * 'area' 半径区分数据大小
   */
  roseType: PropTypes.bool | PropTypes.string,
  /**
   * 图例位置
   */
  legendGridTop: PropTypes.string,
  legendGridLeft:PropTypes.string,
  /**
   * legend icon
   */
  legendIcon: PropTypes.oneOf([
    "circle",
    "rect",
    "roundRect",
    "triangle",
    "diamond",
    "pin",
    "arrow",
    "none",
  ]),
  /**
   * label Line Length
   */
  labelLineLength: PropTypes.number,
  /**
   * label Line Length
   */
  labelLineLength2: PropTypes.number,
  /**
   * lebel 字体
   */
  labelFont: PropTypes.object,
  /**
   * 饼图数据
   */
  data: PropTypes.object,
};

Pie.defaultProps = {
  center: ["50%", "40%"],
  legendGridTop: "80%",
  legendGridLeft: "center",
  radius:["40","80"],
  clockWise: true,
  labelLineLength: 15,
  labelLineLength2: 15,
  labelFont:{
    color: "#393838",
    fontSize: 14,
    fontWeight: 500,
    height: 23,
  },
  roseType: "area",
  legendIcon: "circle",
  className: " ",
  color: ["#5C7BD9", "#9FE080", "#FAC858", "#F36969", "#7ED3F4"],
  formatter: "{a} <br/>{b} : {c} ({d}%)",
  data: {
    pieData: [
      { value: 1048, name: "Search Engine" },
      { value: 735, name: "Direct" },
      { value: 580, name: "Email" },
      { value: 484, name: "Union Ads" },
      { value: 300, name: "Video Ads" },
    ],
    unit: "(万户)",
  },
};
