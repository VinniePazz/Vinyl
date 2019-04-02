import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "../../components/Home/Home";
import Login from "../../components/Login";
import Register from "../../components/Register";
import UserDashboard from "../../components/User/UserDashboard";
import Auth from '../../components/auth/Auth';

const App = () => {
  return (
    <Layout>
      <Switch>
				<Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
				<Route path="/register" exact component={Auth(Register,false)}/>
				<Route path="/login" exact component={Auth(Login,false)}/>
				<Route path="/" exact component={Auth(Home,null)}/>
      </Switch>
    </Layout>
  );
};

export default App;
