/** 主页 **/

/** 所需的各种插件 **/
import React from "react";
import { useSelector, useStore } from "react-redux";

/** 所需的各种资源 **/
import "./index.less";
import ImgLogo from "../../assets/react-logo.jpg";
import { TaskList } from "../../components/TaskList/TaskList";
import { SimpleTable, MergedTable } from "@/components/Table/Table.stories";

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
        <TaskList tasks={tasks} />
        <SimpleTable className="one" rowClassName="rowClassName"/>
        <MergedTable className="two" rowClassName="rowClassName"/>
      </div>
    </div>
  );
}
