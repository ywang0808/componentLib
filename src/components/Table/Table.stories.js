import React from "react";
import { TableCustom } from "./index";


export default {
  title: "Table",
  component: TableCustom,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};
const Template = (args) => <TableCustom {...args}/>;

export const oneTable = Template.bind({});
oneTable.args = {
  align: "center",
}