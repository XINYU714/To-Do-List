import React , {useState} from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FiliterButton from "./components/FilterButton";
import {nanoid} from "nanoid";

function App(props) {
  
  //props.tasks into the useState() hook
  //tasks初始值是props.tasks
  const [tasks,setTasks]=useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const FILTER_MAP = {
    All: () => true,
    //All filter shows all tasks
    Active: (task) => !task.completed,
    //shows tasks whose completed
    Completed: (task) => task.completed
    //Completed filter shows tasks whose completed prop

  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);
      // 簡化寫法 從index 
      const taskList = tasks
      .filter(FILTER_MAP[filter])
      .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const filterList = FILTER_NAMES.map((name) => (
    <FiliterButton 
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
  ));
  //需要一種方法將信息從 <Form /> 傳遞到 <App />
  //we can write a function in <App /> that will expect some data from our form as an input
  function addTask(name) {
    const newTask={  id: `todo-${nanoid()}`, name,completed:false};
    // copy the existing array, and add our object at the end
    setTasks([...tasks,newTask]);
  }
  function toggleTaskCompleted(id) {
    //重組更新陣列跟filter 不太一樣
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  //delete (del-btn)  
  function deleteTask(id) {
    ///重組陣列 排除該id的內容 然後用setTasks更新資料
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  return (
    <div className="todoapp stack-large">
      <h1>To Do List</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {/* 上面簡化了  */}
      {filterList}
      </div>

      <h2 id="list-heading">{headingText}</h2>
      <ul
        // role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
      {/* Todo簡化 */}
      {taskList}
      </ul>
    </div>
  );
}


export default App;
