import React, { Component } from "react";
import {
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Slide,
  Button
} from "@material-ui/core";

import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Head from "../head/Head";
// import Facebook from '../components/Facebook';
import Index from "../index";
import App from "../../App";
import Profile from "../Profile/Profile";
import "./Login.css";
import Service from "../CourseDataService";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Redirect } from "react-router";

function initializeFirebase() {
  var config = {
    apiKey: "AIzaSyBSmOxMT_iEgHDypczpMovVxZTnbsayhw8",
    authDomain: "fixsut2019.firebaseapp.com"
  };
  firebase.initializeApp(config);
}
var check = 0;

const paperStyle = {
  height: "85%",
  width: "85%",
  margin: "7%",
  textAlign: "center",
  display: "inline-block"
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      users: [],
      customerUid: "",
      customerIDs: "",
      customerName: "",
      customerPhone: "",
      customerImg: "",
      customerEmail: "",
      customerGender: "",
      major: "",
      institute: "",

      uid: "",
      cusId: "",
      displayName: "",
      email: "",

      item2: [],
      item: []
    };

    console.log("State");
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callback: {
      signInSuccess: () => false
    }
  };

  componentWillMount = async () => {
    initializeFirebase;
  };

  GG = user => {
    this.setState({
      users: user,
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      isSignedIn: true
    });
    console.log("user", user.uid);
    console.log("user0", user);
    console.log("Can Sign In");
    console.log("State UID ", this.state.uid);

    this.getCustomer();
    this.setState({ cusId: this.state.item2.length + 1 });
    for (var j = 0; j <= this.state.item2.length; j++) {
      if (this.state.item2[j].customerUid == this.state.uid) {
        this.setState({
          cusId: j + 1,
          customerUid: this.state.item2[j].customerUid,
          customerIDs: this.state.item2[j].customerIDs,
          customerName: firebase.auth().currentUser.displayName,
          customerPhone: this.state.item2[j].customerPhone,
          customerImg: this.state.item2[j].customerImg,
          customerEmail: firebase.auth().currentUser.email,
          customerGender: this.state.item2[j].customerGender,
          major: this.state.item2[j].majorName,
          institute: this.state.item2[j].instituteName
        });
        check = 0;
        break;
      } else {
        console.log("Don't have");
        check++;
      }
    }
  };

  componentDidMount = async () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.GG(user);
        console.log("Sign In");
      } else {
        console.log("Can't Sign In");
      }
    });
    console.log("State UID2 ", this.state.uid);
    console.log("State Item : ", this.state.item);
    console.log("This state UID item :", this.state.item);
    console.log("This state UID item2 :", this.state.item2);
  };

  getCustomer = async () => {
    await Service.getCustomer().then(response => {
      console.log(response);
      this.setState({ item2: response.data });
      console.log(this.state.item2);
    });
  };

  nextPath = async () => {
    console.log(check);
    console.log(this.state.item2.length);
    console.log(this.state.cusId);
    if (check == this.state.item2.length) {
      this.postCustomer();
    }
    if (check == 0) {
      console.log("Can Put ^^ not Post");
    }
  };

  postCustomer = () => {
    Service.postCustomer2(
      this.state.displayName,
      this.state.uid,
      this.state.customerImg,
      this.state.email
    ).then(response => {
      console.log(response);
      console.log("Post : ", this.state.uid);
    });
  };

  render() {
    const { isSignedIn } = this.state;

    console.log(this.state.cusId);
    console.log(this.state.item2);
    return (
      <div>
        {isSignedIn ? (
          <div>
            <Typography variant="subtitle1" gutterBottom>
              <Head />
            </Typography>
            <Paper style={paperStyle}>
              <Typography variant="h5" component="h3" center>
                <h1>We're taking you into SUT FIX.</h1>
              </Typography>
              <Typography component="p">
                <br />
                <br />
                <Button onClick={this.nextPath}>
                  <Link to={`customer/${this.state.cusId}`}>Continue</Link>
                </Button>
                <br />
                <br />
              </Typography>
            </Paper>
          </div>
        ) : (
          <div>
            <Typography variant="subtitle1" gutterBottom>
              <Head />
            </Typography>

            <Paper style={paperStyle} zDepth={5}>
              <h1>Login Or Register (Customer)</h1>
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
