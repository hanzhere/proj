import "./App.css";

import { useState } from "react";

// package

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//components
import Desktop2 from "./components/Desktop-2/Desktop2";
import Desktop3 from "./components/Desktop-3/Desktop3";
import Desktop4 from "./components/Desktop-4/Desktop4";

function App() {

  return (
    <Router>
      <div className="App"></div>
      <Switch>
        <Route exact path="/">
          <Desktop2/>
        </Route>
        <Route exact path="/payment">
          <Desktop4 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
