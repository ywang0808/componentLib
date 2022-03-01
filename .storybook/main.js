const path = require('path');
module.exports = {
  core: {
    "builder": "webpack5"
  },
  webpackFinal: async (config, { configType,presets }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.less$/,
      use: ["style-loader",  "css-loader", {
        loader: "less-loader",
        options: { lessOptions: { javascriptEnabled: true } },
      },],
    //  include: path.resolve(__dirname, '../src')
    });
    // config.module.rules.push({
    //   test: /\.less$/,
    //   use: ["style-loader",  "css-loader", {
    //     loader: "less-loader",
    //     options: { lessOptions: { javascriptEnabled: true } },
    //   },],
    //   include: path.resolve(__dirname, '../src')
    // });

    // end.module.rules[7]={
    //   // .css 解析
    //   test: /\.css$/,
    //   use: ["style-loader", {
    //     loader: "css-loader",
    //     options: {
    //       modules: {
    //         auto: true,
    //         localIdentName: '[path][name]__[local]'
    //       },
    //     }
    //   }, "postcss-loader"],
    // };
   // config.resolve.alias.objectAss
    console.log(config.module.rules[7].use)
    return config;
  },
  stories: [
    "../src/components/**/*.stories.@(js|jsx)",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",     //用于创建在故事之间导航的链接
    "@storybook/addon-essentials",
    'storybook-addon-outline',
    "@storybook/addon-viewport",
    "@storybook/addon-storysource"//面板有分辩率设置
  ],
  "framework": "@storybook/react",

}
