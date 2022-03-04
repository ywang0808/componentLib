import React from "react";
import { TableCustom } from "./index";


export default {
  title: "Table",
  component: TableCustom,
  argTypes: {
  },
};
const Template = (args) => <TableCustom {...args}/>;

export const OneTable = Template.bind({});
OneTable.args = {
  align: "center",
}