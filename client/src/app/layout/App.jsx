import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "../../components/Home/Home";
import Login from "../../components/Login";
import Register from "../../components/Register";

import UserDashboard from "../../components/User/UserDashboard";
import ProductForm from '../../components/User/Admin/ProductForm';
import ManageCategories from '../../components/User/Admin/ManageCategories';

import Shop from '../../components/Shop';
import ProductPage from '../../components/Product/ProductPage';

import Auth from '../../components/auth/Auth';


const App = () => {
  return (
    <Layout>
      <Switch>
				<Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
				<Route path="/admin/add_product" exact component={Auth(ProductForm,true)}/>
				<Route path="/admin/manage_categories" exact component={Auth(ManageCategories,true)}/>
				<Route path="/product_detail/:id" exact component={Auth(ProductPage,null)}/>			
				<Route path="/register" exact component={Auth(Register,false)}/>
				<Route path="/login" exact component={Auth(Login,false)}/>
				<Route path="/shop" exact component={Auth(Shop,null)}/>
				<Route path="/" exact component={Auth(Home,null)}/>
      </Switch>
    </Layout>
  );
};

export default App;
