import React, {useState} from 'react';


const Form = (props) => {
//設定name 最初狀態
const [name , setName]=useState('');
function handleChange(e)
{
    setName(e.target.value);

}
//onSubmit 事件設立
function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName(''); //送出後清掉input內容
}
  return (
    //handleSubmit 功能寫在上面
    <form onSubmit={handleSubmit}>
    <h2 className="label-wrapper">
      <label htmlFor="new-todo-input" className="label__lg">
        What needs to be done?
      </label>
    </h2>
    <input
      type="text"
      id="new-todo-input"
      className="input input__lg"
      name={"text"}
      autoComplete="off"
      value={name}
      onChange={handleChange}
    />
    <button type="submit" className="btn btn__primary btn__lg">
      Add
    </button>
  </form>
  )
}

export default Form