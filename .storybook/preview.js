import '../src/styles/global.less'; //   全局基础样式

export const parameters = {
    // layout: 'centered', // canvas页面示范元素位置居中
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        expanded: true, //canvas页面显示描述文档的描述，类型，初始值
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}
