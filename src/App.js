import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Home, Project, Simulator, Datasets, DoubleBlind} from "./components/Pages";
import {Header} from "./components/Header";
import Footer from "./components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Project" component={Project} />
            <Route exact path="/Simulator" component={Simulator} />
            <Route exact path="/Datasets" component={Datasets} />
            <Route exact path="/DoubleBlind" component={DoubleBlind} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
