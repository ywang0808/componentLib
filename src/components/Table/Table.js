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
import "./Table.less";

export const TableCustom = ({
  className,
  rowClassName,
  sorterColumn,
  align,
  tableData,
  width,
  ...props
}) => {
  /**
   * 表格数据
   * @type {*|*[]}
   */
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
        // 列排序
        res.sorter = sorterFunc(index, item.dataIndex);
        // 居中对齐 + 单元格自动省略
        if (res.children && res.children.length > 0) {
          let resItem = res.children.map((i) => {
            let child = { ...i };
            child.align = [align];
            child.ellipsis = props.ellipsis;
            return child;
          });
          res.children = resItem;
        } else {
          res.align = [align];
          res.ellipsis = props.ellipsis;
        }
        // 列宽
        width
          ? (res.width = width.hasOwnProperty(index) ? width[index] : "")
          : "";
        // 哪列--几行合并
        props.rowSpan.hasOwnProperty(index)
          ? (res.render = rowSpanRender(props.rowSpan[index]))
          : "";
        return res;
      });
    return result;
  };
  /**
   *
   * @returns {(function(*=, *, *): ({children, props: {rowSpan: number}}))|*}
   */
  const rowSpanRender = (num) => {
    return (value, data, index) => {
      const obj = { children: value, props: { rowSpan: 1 } };
      if (index % num === 0) {
        obj.props.rowSpan = num;
        return obj;
      } else {
        obj.props.rowSpan = 0;
        return obj;
      }
    };
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
      className={["tableCustom", className].join(" ")}
      rowClassName={rowClassName}
      columns={columns()}
      dataSource={tbodyData}
      bordered={props.bordered}
      pagination={false}
      scroll={{ y: props.scrollY }}
    />
  );
};

TableCustom.propTypes = {
  /**
   * 列对齐方式
   */
  align: PropTypes.oneOf(["center", "left", "right"]),
  /**
   * 是否有边框
   */
  bordered: PropTypes.bool,
  /**
   * 可排序的列（提取列数值）.
   * 'all'：所有列全排序; [0,1]：仅0和1列排序
   */
  sorterColumn: PropTypes.array || PropTypes.string,
  /**
   * 表格类名
   */
  className: PropTypes.string,
  /**
   * 行类名
   */
  rowClassName: PropTypes.string,
  /**
   * 列宽. {0: "20%"}:第0列，宽20%
   */
  width: PropTypes.object,
  /**
   * 超宽度自动省略
   */
  ellipsis: PropTypes.bool,
  /**
   * Y轴滚动value
   */
  scrollY: PropTypes.number,
  /**
   * 几行合并？{0: 4}:第0列，每4行合并
   */
  rowSpan: PropTypes.object,
  /**
   * 表格数据
   */
  tableData: PropTypes.object,
};

TableCustom.defaultProps = {
  className: "",
  rowClassName: "",
  align: "center",
  bordered: false,
  sorterColumn: [],
  scrollY: null,
  ellipsis: false,
  width: {},
  rowSpan: {},
  tableData: {
    thead: [],
    tbody: [],
  },
};
