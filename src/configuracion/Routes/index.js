import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./../../Containers/Home";
import Workers from "./../../Containers/Workers";
import Tools from "./../../Containers/Tools";
import Clasifications from "./../../Containers/Clasification";
import Login from "./../../Containers/Login";

import { Authenticated, Unauthenticated } from "./helpers";

function NoMatch() {
  return (
    <div>
      <h1>Error</h1>
    </div>
  );
}

const Routes = () => (
  <Switch>
    <Unauthenticated path="/login" component={Login} />
    <Authenticated path="/workers" component={Workers} />
    <Authenticated path="/clasifications" component={Clasifications} />
    <Authenticated path="/tools" component={Tools} />
    <Authenticated path="/kitTools" component={Tools} />
    <Authenticated path="/proveedores" component={Tools} />
    <Authenticated exact path="/" component={Home} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
