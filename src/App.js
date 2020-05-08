import React from 'react';
import './App.css';
import Navbar from './components/default_layout/index';
import ManageCategory from './components/category/Manage_category';
import ManageMainCategory from './components/main_category/Manage_category';
import ManageCountry from './components/country/manage_country';
import ManageRecipe from './components/recipe/Manage_recipe';
import ManageShop from './components/shop/manage_shops';
import ManageIncredient from './components/products_or_incredients/manage_incredients';
import AddRecipe from './components/recipe/Add_recipe';
import AddShop from './components/shop/add_shop';
import AddCountry from './components/country/Add_country';
import AddProduct from './components/products_or_incredients/add_product';
import EditCountry from './components/country/Edit_country';
import EditCategory from './components/category/Edit_category';
import EditMainCategory from './components/main_category/Edit_category';
import AddCategory from './components/category/Add_category';
import AddMainCategory from './components/main_category/Add_category';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/category/manage_category">
          <ManageCategory />
        </Route>
        <Route exact path="/manage_product">
          <ManageCategory />
        </Route>
        <Route exact path="/category/edit">
          <EditCategory />
        </Route>
        <Route exact path="/main_category/edit">
          <EditMainCategory />
        </Route>
        <Route exact path="/country/edit">
          <EditCountry />
        </Route>
        <Route exact path="/category/add_category">
          <AddCategory />
        </Route>
        <Route exact path="/main_category/add_category">
          <AddMainCategory />
        </Route>
        <Route exact path="/shop/add_shop">
          <AddShop />
        </Route>
        <Route exact path="/country/manage_country">
          <ManageCountry />
        </Route>
        <Route exact path="/main_category/manage_category">
          <ManageMainCategory />
        </Route>
        <Route exact path="/recipe/manage_recipe">
          <ManageRecipe />
        </Route>
        <Route exact path="/shop">
          <ManageShop />
        </Route>
        <Route exact path="/incredient/manage_incredients">
          <ManageIncredient />
        </Route>
        <Route exact path="/recipe/add_recipe">
          <AddRecipe />
        </Route>
        <Route exact path="/country/add_country">
          <AddCountry />
        </Route>
        <Route exact path="/incredient/add_product">
          <AddProduct />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
