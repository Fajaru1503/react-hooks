import React, { useState } from "react";

const Todo = (props) => {
  const inputState = useState("");

  const inputChangeHandler = (event) => {
    inputState[1](event.target.value);
    console.log(inputState[0]);
  };

  return (
    <React.Fragment>
      <input
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={inputState[0]}
      />
      <button>Add</button>
      <ul>
        <li></li>
      </ul>
    </React.Fragment>
  );
};

export default Todo;
