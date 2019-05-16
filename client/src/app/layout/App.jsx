import React from "react";
import { Switch, Route, withRouter, useRouter } from "react-router-dom";

import Auth from "../../components/auth/Auth";
import ScrollToTop from "../utils/ScrollToTop";

import Layout from "./Layout";
import Home from "../../components/Home/Home";
import Login from "../../components/Login";
import Register from "../../components/Register";

import UserProfile from "../../components/User/UserProfile";
import ProductForm from "../../components/User/Admin/ProductForm";
import ManageCategories from "../../components/User/Admin/ManageCategories";

import Shop from "../../components/Shop";
import ProductPage from "../../components/Product/ProductPage";
import UserCart from "../../components/User/UserCart";
import EditProfileInfo from "../../components/User/EditProfileInfo";

const App = (props) => {
  return (
    <ScrollToTop>
      <Layout>
        <Switch>
          <Route
            path="/user/dashboard"
            exact
            component={Auth(UserProfile, true)}
          />
          <Route path="/user/cart" exact component={Auth(UserCart, true)} />
          <Route
            path="/user/user_profile"
            exact
            component={Auth(EditProfileInfo, true)}
          />
          <Route
            path="/admin/add_product"
            exact
            component={Auth(ProductForm, true)}
          />
          <Route
            path="/admin/manage_categories"
            exact
            component={Auth(ManageCategories, true)}
          />
          <Route
            path="/product_detail/:id"
            exact
            component={Auth(ProductPage, null)}
          />
          <Route path="/register" exact component={Auth(Register, false)} />
          <Route path="/login" exact component={Auth(Login, false)} />
          <Route path="/shop" exact component={Auth(Shop, null)} />
          <Route path="/" exact component={Auth(Home, null)} />
        </Switch>
      </Layout>
    </ScrollToTop>
  );
};

export default withRouter(App);
