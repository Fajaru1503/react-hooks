import React, { useState } from "react";

const Todo = (props) => {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoLIst] = useState([]);

  const inputChangeHandler = (event) => {
    setTodoName(event.target.value);
  };

  const submitTodoHandler = () => {
    setTodoLIst(todoList.concat(todoName));
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
