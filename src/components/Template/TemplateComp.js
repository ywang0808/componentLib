/**
 * <p>Title: BONC - React </p>
 *
 * <p>Description:模板 </p>
 *  <p>Company: 北京东方国信科技股份有限公司 </p>
 *
 * @author
 * @date
 *
 */
import React from "react";
import PropTypes from "prop-types";
import "./TemplateComp.less";

export const TemplateComp = (props) => {
  const { align } = props;
  return (
    <div className="template" style={{ textAlign: align }}>
      123
    </div>
  );
};

TemplateComp.propTypes = {
  /**
   * 列对齐方式
   */
  align: PropTypes.oneOf(["center", "left", "right"]),
};

TemplateComp.defaultProps = {
  align: "center",
};
