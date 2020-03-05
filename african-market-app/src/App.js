import React from "react";
import "./App.css";
import {
  Route,
  Link,
  withRouter,
  Router,
  Redirect,
  useHistory
} from "react-router-dom";
import Login from "./Components/Login/login";
import SignUp from "./Components/Login/signUP";
import Products from "./Components/productList";
import AddProduct from "./Components/addProduct";

function App() {
  return (
    <div>
      <Link to='/login'>
        <button>Login</button>
      </Link>
      <Link to='/SignUp'>
        <button>SignUp</button>
      </Link>
      <Link to='/products'>
        <button>Product</button>
      </Link>
      <Link to='/AddProduct'>
        <button>addProduct</button>
      </Link>
      <Route path='/products'>
        <Products />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/SignUp'>
        <SignUp />
      </Route>
      <Route path='/AddProduct'>
        <AddProduct />
      </Route>
    </div>
  );
}

export default withRouter(App);
