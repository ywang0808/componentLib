/** 主页 **/

/** 所需的各种插件 **/
import React from "react";
import { useSelector, useStore } from "react-redux";

/** 所需的各种资源 **/
import "./home.less";
import ImgLogo from "../../assets/react-logo.jpg";
import { TaskList } from "../../components/TaskList/TaskList";
import { SimpleTable, MergedTable } from "@/components/Table/Table.stories";
import {SimplePie} from "@/components/Pie/Pie.stories";

export default function HomePageContainer(props) {
  const tasks = useSelector((state) => {
    return state.task.tasks;
  });
  const count = useSelector((state) => {
    return state.task.count;
  });
  console.log("what tasks:", tasks);

  return (
    <div className="page-home all_nowarp">
      <div className="box">
        {/*{count}*/}
        <SimplePie className="pie"/>
        <TaskList tasks={tasks} />
        <SimpleTable className="oneTable" rowClassName="rowClassName"/>
        <MergedTable className="twoTable" rowClassName="rowClassName"/>
      </div>
    </div>
  );
}
