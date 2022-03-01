/**
 * 基本Model app.js, 在src/store/index.js中被挂载到store上，命名为app
 * 可用于存放通用信息，比如用户数据、角色、权限、省市区等通用数据
 * **/

const defaultTasks = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];
export default {
  state: {
    tasks :defaultTasks,
    count: 0, // 测试数字
  },

  reducers: {
    updateTaskState: (state, payload) => {
    //  Object.assign({}, state , payload )
      console.log(  payload )
      return    { ...state, tasks: payload };
    },
    setCount(state, payload) {
      return { ...state, count: payload };
    },
  },

  /** actions 可以是一个对象，也可以是一个函数，函数的第1个参数自动被注入dispatch(见models/test.js) **/
  effects:(dispatch) => ({
    async changeTaskState(payload = {},rootState) {
      const { id, newTaskState } = payload;
      let tasks =Array.from( rootState.task.tasks ) ;
      const task = tasks.findIndex((task) => task.id === id);
      if (task >= 0) {
        tasks[task].state = newTaskState;
      }
      dispatch({ type: "task/updateTaskState", payload: tasks });
    },
    onTestAdd(params, rootState) {
      this.setCount(rootState.task.count + 1); //. 这里会指向上面reducers中的setCount
    },

  }),
};
