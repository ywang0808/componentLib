import React from "react";
import { Chart } from "./Chart";

export default {
  title: "chart",
  component: Chart,
  argTypes: {},
};

const Template = (args) => <Chart {...args} />;

export const SimpleBarLines = Template.bind({});
SimpleBarLines.args = {};

export const BackBarLines = Template.bind({});
BackBarLines.args = {

};
