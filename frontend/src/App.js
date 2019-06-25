import React, { Component } from 'react';
// import './App.css';
// import firebase from "firebase";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Login from './Layouts/Login/Login';
import Login2 from './Admin/Login/Login';
import index from './Layouts/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from './Admin/Admin';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Login} />
          <Route path='/2' exact={true} component={Login2} />
          {/* <Route path='/customer' exact={true} component={index} /> */}
          <Route path='/customer/:id' exact={true} component={index} />
          {/* <Route path='/Register' exact={true} component={Register} />
              <Route path='/Profile' exact={true} component={Profile} /> */}
          <Route path='/Admin/:id' exact={true} component={Admin} />
        </Switch>
      </Router>
    )
  }
}

export default App;
