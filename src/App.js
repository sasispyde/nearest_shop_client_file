import React from 'react';
import './App.css';
import Navbar from './components/default_layout/index';
import ManageCategory from './components/category/Manage_category';
import EditCategory from './components/category/Edit_category';
import AddCategory from './components/category/Add_category';

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
        <Route exact path="/category/edit/:category_id">
          <EditCategory />
        </Route>
        <Route exact path="/category/add_category">
          <AddCategory />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
