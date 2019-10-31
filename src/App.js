import React from "react";
import Home from "./Home/index";
import Settings from "./Settings/index";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(App);
