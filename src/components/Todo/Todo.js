import React, { useState } from "react";

const Todo = (props) => {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoLIst] = useState([]);

  // other way to using Hooks
  // const [todoState, setTodoState] = useState({ userInput: "", todoList: [] });

  const inputChangeHandler = (event) => {
    setTodoName(event.target.value);
    // setTodoState({
    //   userInput: event.target.value,
    //   todoList: todoState.todoList,
    // });
  };

  const submitTodoHandler = () => {
    setTodoLIst(todoList.concat(todoName));
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: todoState.todoList.concat(todoState.userInput),
    // });
  };

  return (
    <React.Fragment>
      <input
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button role="button" onClick={submitTodoHandler}>
        Add
      </button>
      <ul>
        {todoList.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
