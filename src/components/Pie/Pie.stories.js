import React from "react";
import { Pie } from "./Pie";

export default {
  title: "Pie",
  component: Pie,
  argTypes: {},
};
const Template = (args) => <Pie {...args} />;

export const SimplePie = Template.bind({});
SimplePie.args = {};

