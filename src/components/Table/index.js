/**
 * <p>Title: BONC - React </p>
 *
 * <p>Description:列表 </p>
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

export const TableCustom = ({ align, tableData, ...props }) => {
  let tbodyData =
    tableData?.tbody && tableData.tbody.length > 0 ? tableData.tbody : [];

  const columns = () => {
    let result =
      tableData?.thead &&
      tableData.thead.length > 0 &&
      tableData.thead.map((item, index) => {
        let res = { ...item };
        res.align = [align];
        index !== 0 ? (res.sorter = compareFunc(item.dataIndex)) : "";
        return res;
      });
    return result;
  };

  const compareFunc = (col) => {
    let compareSort = (pro, next) => {
      let a = pro[col] && pro[col].replace(/%/, "");
      let b = next[col] && next[col].replace(/%/, "");
      return a - b;
    };
    return compareSort;
  };

  return (
    <div className="tableCustom">
      <Table
        columns={columns()}
        dataSource={tbodyData}
        bordered={true}
        rowClassName="tableRow"
        pagination={false}
        scroll={{ y: props.scrollY }}
      />
    </div>
  );
};

TableCustom.propTypes = {
  /**
   * Column align
   */
  align: PropTypes.oneOf(["center", "left", "right"]),
  /**
   * Y scroll value
   */
  scrollY: PropTypes.number,
  /**
   * Table data
   */
  tableData: PropTypes.object,
};

TableCustom.defaultProps = {
  align: "center",
  scrollY: 200,
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
