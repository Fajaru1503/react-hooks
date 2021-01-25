import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

const Todo = (props) => {
  const [todoName, setTodoName] = useState("");
  // const [todoList, setTodoLIst] = useState([]);

  // other way to using Hooks
  // const [todoState, setTodoState] = useState({ userInput: "", todoList: [] });

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "SET":
        return action.payload;
      case "REMOVE":
        return state.filter((todo) => todo.key !== action.payload);
      default:
        return state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    axios
      .get("https://simple-todo-list-59707.firebaseio.com/todos.json")
      .then((result) => {
        const todoData = result.data;
        const todos = [];

        for (let data in todoData) {
          todos.push({ key: data, name: todoData[data].name });
        }

        dispatch({ type: "SET", payload: todos });
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

  const removeTodoHandler = (id) => {
    axios
      .delete(`https://simple-todo-list-59707.firebaseio.com/todos/${id}.json`)
      .then((res) => {
        console.log(res);
        dispatch({ type: "REMOVE", payload: id });
      })
      .catch((err) => console.log(err));
  };

  const submitTodoHandler = () => {
    // setTodoLIst(todoList.concat(todoName));

    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: todoState.todoList.concat(todoState.userInput),
    // });

    axios
      .post("https://simple-todo-list-59707.firebaseio.com/todos.json", {
        name: todoName,
      })
      .then((res) => {
        const newTodo = { key: res.data.name, name: todoName };
        dispatch({ type: "ADD", payload: newTodo });
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
      <button onClick={submitTodoHandler}>Add</button>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.key} onClick={() => removeTodoHandler(todo.key)}>
            {todo.name}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
