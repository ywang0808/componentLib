/**
 * <p>Title: BONC - React </p>
 *
 * <p>Description:表格 </p>
 *  <p>Company: 北京东方国信科技股份有限公司 </p>
 *
 * @author wy
 * @date 2022/3/1
 *
 */
import React from "react";
import { Table } from "antd";
import PropTypes from "prop-types";
import "./index.less";

export const TableCustom = ({
  sorterColumn,
  align,
  tableData,
  width,
  ...props
}) => {
  let tbodyData =
    tableData?.tbody && tableData.tbody.length > 0 ? tableData.tbody : [];
  /**
   * 列渲染
   * @returns {*|boolean}
   */
  const columns = () => {
    let result =
      tableData?.thead &&
      tableData.thead.length > 0 &&
      tableData.thead.map((item, index) => {
        let res = { ...item };
        res.align = [align];
        width
          ? (res.width = width.hasOwnProperty(index) ? width[index] : "")
          : "";
        res.sorter = sorterFunc(index, item.dataIndex);
        return res;
      });
    return result;
  };

  /**
   * 列排序
   * @param index
   * @param col
   * @returns {function(*, *)}
   */
  const sorterFunc = (index, col) => {
    // 排序方法
    let compareSort = (pro, next) => {
      let a = pro[col] && pro[col].replace(/[^\d.]/g, "");
      let b = next[col] && next[col].replace(/[^\d.]/g, "");
      return a - b;
    };
    // 某列需要排序
    if (!sorterColumn.length) return null;
    if (sorterColumn === "all" || sorterColumn.some((value) => value === index))
      return compareSort;
  };

  return (
    <Table
      className={"tableCustom"}
      columns={columns()}
      dataSource={tbodyData}
      bordered={props.bordered}
      rowClassName="tableRow"
      pagination={false}
      ellipsis={props.ellipsis}
      scroll={{ y: props.scrollY }}
    />
  );
};

TableCustom.propTypes = {
  /**
   * 可排序的列。
   * 'all'：所有列全排序; [0,1]：仅0和1列排序
   */
  sorterColumn: PropTypes.array | PropTypes.string,
  /**
   * 列宽{ 0: "20%"}
   */
  width: PropTypes.object,
  /**
   * 列对齐方式
   */
  align: PropTypes.oneOf(["center", "left", "right"]),
  /**
   * 是否有边框
   */
  bordered: PropTypes.bool,
  /**
   * 超宽度自动省略
   */
  ellipsis: PropTypes.bool,
  /**
   * 表头背景颜色
   */
  headerBackColor: PropTypes.string,
  /**
   * 表体背景颜色
   */
  bodyBackColor: PropTypes.string,
  /**
   * Y轴滚动value
   */
  scrollY: PropTypes.number,
  /**
   * 表格数据
   */
  tableData: PropTypes.object,
};

TableCustom.defaultProps = {
  align: "center",
  bordered: true,
  sorterColumn: [],
  headerBackColor: "red",
  bodyBackColor: "green",
  scrollY: null,
  ellipsis: true,
  width: {},
  tableData: {
    thead: [
      {
        key: "zq",
        title: "账期111",
        dataIndex: "zq",
      },
      {
        key: "lw",
        title: "离网用户数(万户)",
        dataIndex: "lw",
      },
      {
        key: "zdlw",
        title: "主动离网用户数(万户)",
        dataIndex: "zdlw",
      },
      {
        key: "bdlw",
        title: "被动离网用户数(万户）",
        dataIndex: "bdlw",
      },
      {
        key: "zwyh",
        title: "在网用户离网率",
        dataIndex: "zwyh",
      },
      {
        key: "czyh",
        title: "出账用户离网率",
        dataIndex: "czyh",
      },
    ],
    tbody: [
      {
        key: "1",
        zq: "2021年1月",
        lw: "83.8",
        zdlw: "290.2",
        bdlw: "583.6",
        zwyh: "2.5%",
        czyh: "2.9%",
      },
      {
        key: "2",
        zq: "2021年2月",
        lw: "87.8",
        zdlw: "290.2",
        bdlw: "583.6",
        zwyh: "5.5%",
        czyh: "2.9%",
      },
      {
        key: "3",
        zq: "2021年3月",
        lw: "87",
        zdlw: "290.2",
        bdlw: "583.6",
        zwyh: "6.5%",
        czyh: "2.9%",
      },
      {
        key: "4",
        zq: "2021年4月",
        lw: "878",
        zdlw: "290.2",
        bdlw: "583.6",
        zwyh: "7.5%",
        czyh: "2.9%",
      },
      {
        key: "5",
        zq: "2021年5月",
        lw: "73.8",
        zdlw: "290.2",
        bdlw: "583.6",
        zwyh: "8.5%",
        czyh: "2.9%",
      },
      {
        key: "6",
        zq: "2021年6月",
        lw: "873.8",
        zdlw: "290.2",
        bdlw: "583.6",
        zwyh: "29.5%",
        czyh: "2.9%",
      },
      {
        key: "7",
        zq: "2021年3月",
        lw: "873.8",
        zdlw: "290.2",
        bdlw: "583.6",
        zwyh: "32.5%",
        czyh: "2.9%",
      },
      {
        key: "8",
        zq: "2021年4月",
        lw: "873.8",
        zdlw: "290.2",
        bdlw: "583.6",
        zwyh: "42.5%",
        czyh: "2.9%",
      },
      {
        key: "9",
        zq: "2021年5月",
        lw: "873.8",
        zdlw: "290.2",
        bdlw: "583.6",
        zwyh: "52.5%",
        czyh: "2.9%",
      },
      {
        key: "10",
        zq: "2021年6月",
        lw: "873.8",
        zdlw: "290.2",
        bdlw: "583.6",
        zwyh: "26.5%",
        czyh: "2.9%",
      },
    ],
  },
};
