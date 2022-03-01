/** APP入口 **/
// import "core-js/stable";
// import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {ConfigProvider } from "antd";
import store from "./models";
import Routers from "./Layouts";
import zhCN from "antd/lib/locale-provider/zh_CN";
import {BrowserRouter } from "react-router-dom";



/** 公共样式 **/
import "./styles/global.less";
import "./styles/test.less";

function RootContainer() {
  return (
      <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <BrowserRouter >
            <Routers />
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
  );
}
ReactDOM.render(<RootContainer />, document.getElementById("app-root"));

if (module.hot) {
  module.hot.accept();
}
