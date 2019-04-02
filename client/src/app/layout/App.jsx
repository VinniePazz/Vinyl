import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "../../components/Home/Home";
import Login from "../../components/Login";
import Register from "../../components/Register";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Layout>
  );
};

export default App;
