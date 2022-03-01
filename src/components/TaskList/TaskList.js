import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Task from "../Task/Task";

export function PureTaskList({ loading, tasks, onPinTask, onArchiveTask }) {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );
  if (loading) {
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }
  const tasksInOrder = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];
  return (
    <div className="list-items">
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}
PureTaskList.propTypes = {
  /** Checks if it's in loading state */
  loading: PropTypes.bool,
  /** The list of tasks */
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
};
PureTaskList.defaultProps = {
  loading: false,
};

export function TaskList(props) {


  const dispatch = useDispatch();
  const pinTask = (value) => {
    dispatch({
      type: "task/changeTaskState",
      payload: { id: value, newTaskState: "TASK_PINNED"},
    });
    dispatch({
      type: "task/onTestAdd",
    });
  };
  const archiveTask = (value) => {
    debugger
    dispatch({
      type: "task/changeTaskState",
      payload: { id: value, newTaskState: "TASK_ARCHIVED"},
    });
    // dispatch({
    //   type: "task/onTestAdd",
    // });
  };
  const filteredTasks = props.tasks.filter(
    (t) =>{
      console.log( t.state === "TASK_INBOX" || t.state === "TASK_PINNED")
      return t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    }
  );
  console.log(filteredTasks,'filteredTasks')
  return (
    <PureTaskList
      tasks={filteredTasks}
      onPinTask={(task) => pinTask(task)}
      onArchiveTask={(task) => archiveTask(task)}
    />
  );
}
