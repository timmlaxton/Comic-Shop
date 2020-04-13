import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Auth from './hoc/auth';
import Layout from './hoc/layout'

import BackIssues from './components/Shop/back_issues'
import NewComics from './components/Shop/new_comics'
import Trades from './components/Shop/trades'
import Home from "./components/Home";
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import ManageCatergories from './components/User/Admin/manage_catergories';


import UserDashboard from './components/User';
import AddProduct from './components/User/Admin/add_product'

const Routes = () => {
  return (
    <Layout> 
    <Switch>

      <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
      <Route path="/admin/add_product" exact component={Auth(AddProduct,true)}/>
      <Route path="/admin/manage_catergories" exact component={Auth(ManageCatergories,true)}/>



      <Route path="/register_login" exact component={Auth(RegisterLogin,false)}/>
      <Route path="/register" exact component={Auth(Register,false)}/>
      <Route path="/" exact component={Auth(Home,null)}/>
      <Route path="/back_issues" exact component={Auth(BackIssues,null)}/>
      <Route path="/trades" exact component={Auth(Trades,null)}/>
      <Route path="/new_comics" exact component={Auth(NewComics,null)}/>
      
    </Switch>
    </Layout>
  );
};

export default Routes;