import React from "react";
import { Route, Switch } from "react-router-dom";

import "./app.css";
import { HomePage, CartPage } from "../pages";
import ShopHeader from "../shop-header";

const App = () => {
  return (
    <main role="main" className="container">
      <ShopHeader />
      <Switch>
        <Route path="/cart" component={CartPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </main>
  );
};

export default App;
