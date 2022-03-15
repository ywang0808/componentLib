import React from "react";
import { TemplateComp } from "./TemplateComp";

export default {
  title: "TemplateComp",
  component: TemplateComp,
  argTypes: {},
};
const Template = (args) => <TemplateComp {...args} />;

export const SimpleTemplate = Template.bind({});
SimpleTemplate.args = {
  center: "left",
};

export const MergedTemplate = Template.bind({});
MergedTemplate.args = {};
