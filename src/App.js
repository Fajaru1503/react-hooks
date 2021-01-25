import React, { useState } from "react";

import AuthContext from "./auth-context";

import Header from "./components/Header/Header";
import Auth from "./components/Auth/Auth";
import Todo from "./components/Todo/Todo";

const app = (props) => {
  const [page, setPage] = useState("auth");
  const [authStatus, setAuthStatus] = useState(false);

  const switchPage = (pageName) => {
    setPage(pageName);
  };

  const login = () => {
    let switchStatus = !authStatus;

    setAuthStatus(switchStatus);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ status: authStatus, login: login }}>
        <Header
          onLoadTodos={switchPage.bind(this, "todos")}
          onLoadAuth={switchPage.bind(this, "auth")}
        />

        <hr />

        {page === "auth" ? <Auth /> : <Todo />}
      </AuthContext.Provider>
    </div>
  );
};

export default app;
