import React, { Component } from "react";
import { Paper, Typography, TextField, InputAdornment, Button } from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';
import firebase from 'firebase';
import Head from "../../Layouts/head/Head";
// import Facebook from '../components/Facebook';
import "./Login.css";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBSmOxMT_iEgHDypczpMovVxZTnbsayhw8",
    authDomain: "fixsut2019.firebaseapp.com"
  })
}

var user = firebase.auth().currentUser;

const paperStyle = {
  height: '85%',
  width: "85%",
  margin: '7%',
  textAlign: 'center',
  display: 'inline-block',
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false, users: [],uid: '',cusId :'',
      item: []
    };
  }

  nextPath(path) {
    this.props.history.push(path);
  }
  uiConfig = {
    signInFlow: "redirect",
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID

    ],
    callback: {
      signInSuccess: () => false
    }
  }


 async componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ users: user })
      this.setState({ uid: user.uid });
      console.log("user", user.uid);
      console.log("user0", user);
      // fetch("http://localhost:8080/customer/1v9jt4sAR7OYWkGDK60TlvpDkqy1")
      // .then(response1 => response1.json())
      // .then(data1 => this.setState({ item: data1 }));
      // console.log("user2", this.state.item);
      
    });

    const response = await fetch(
      "http://localhost:8080/customer/"+ "1PE7yFLBvRbqiu6Y51wJruutHwY2"
    );
    const body = await response.json();
    this.setState({ item: Object.assign(body)});
    
    console.log("user1", this.state.uid);
    console.log("user2", Object.assign(this.state.item));
    this.setState({ cusId: this.state.item[0].cusId })
  }


  componentWillUnmount() {
    // firebase.auth().onAuthStateChanged;
  }

  render() {
    const { users, isSignedIn,item } = this.state;
    console.log(this.state.cusId)
    return (
      <div>
        {isSignedIn || users ? (
          <Link to={`Admin/${this.state.cusId}`}>
            Details 
                 </Link>
        ) : (
            <div>

              <Typography variant="subtitle1" gutterBottom>
                <Head />
              </Typography>


              <Paper style={paperStyle} zDepth={5}>
                <h1>Login Or Register (Admin)</h1>

                <br />
                <br />
                <br />



                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                />

                <br />
                <br />

              </Paper>

            </div>
          )}
      </div>
    );
  }
}


export default withRouter(Login);
