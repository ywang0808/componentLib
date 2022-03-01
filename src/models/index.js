/** 全局唯一数据中心 **/
import { init } from "@rematch/core";
import createLoadingPlugin from "@rematch/loading";
import app from "./app";
import test from "./test";
import task from "./task";
const loading  = createLoadingPlugin({});
export default init({
  models: {
    app,
    test,
    task
  },
  plugins: [loading],
});
