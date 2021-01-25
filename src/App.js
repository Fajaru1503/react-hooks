import React, { useState } from "react";

import Header from "./components/Header/Header";
import Auth from "./components/Auth/Auth";
import Todo from "./components/Todo/Todo";

const app = (props) => {
  const [page, setPage] = useState("auth");

  const switchPage = (pageName) => {
    setPage(pageName);
  };

  return (
    <div className="App">
      <Header
        onLoadTodos={switchPage.bind(this, "todos")}
        onLoadAuth={switchPage.bind(this, "auth")}
      />

      <hr />

      {page === "auth" ? <Auth /> : <Todo />}
    </div>
  );
};

export default app;
