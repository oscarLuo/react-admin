import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
// import { Button, message } from 'antd';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import WrappedNormalLoginForm from "./pages/login/login";
import Admin from "./pages/admin/admin";
export default class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route path="/login" component={WrappedNormalLoginForm}></Route>
            <Route path="/" component={Admin}></Route>
          </Switch>
        </React.Fragment>  
      </Router>
    );
  }
}
