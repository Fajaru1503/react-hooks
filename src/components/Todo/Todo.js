import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = (props) => {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoLIst] = useState([]);

  // other way to using Hooks
  // const [todoState, setTodoState] = useState({ userInput: "", todoList: [] });

  useEffect(() => {
    axios
      .get("https://simple-todo-list-59707.firebaseio.com/todos.json")
      .then((result) => {
        const todoData = result.data;
        const todos = [];

        for (let data in todoData) {
          todos.push({ key: data, name: todoData[data].name });
        }

        setTodoLIst(todos);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      console.log("cleanup");
    };
  }, []);

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
    axios
      .post("https://simple-todo-list-59707.firebaseio.com/todos.json", {
        name: todoName,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <li key={todo.key}>{todo.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
