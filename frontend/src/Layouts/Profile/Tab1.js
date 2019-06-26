import React, { Component } from "react";
import { Link, withRouter, Route } from 'react-router-dom';
import { Router, browserHistory } from 'react-router';
import Service from "../CourseDataService";
import {
  Avatar,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  MenuItem,
  Grid,
  Switch,
  Slide,
  Input,
  Chip,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  NativeSelect
} from '@material-ui/core';

import firebase from "firebase";

import {
  Button,
  FormGroup,
  Label,
  Form
} from "reactstrap";
import { Edit, Lock, VisibilityOff, Visibility } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Login from '../Login/Login';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Delete from '@material-ui/icons/Delete';

const styles = theme => ({
  avatar: {
    margin: 20,
    width: 150,
    height: 150,
  },
  button: {
    margin: 1,
  },
  input: {
    display: 'none',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  margin: {
    margin: 1,
    width: 5,
    height: 5,
  },
  textField: {
    margin: theme.spacing.unit,
    width: 300,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

class Tab1 extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      name: [],
      cusId: '',
      customerUid: firebase.auth().currentUser.uid,
      customerIDs: '',
      customerName: '',
      customerPhone: '',
      customerImg: '',
      customerEmail: '',
      customerGender: '',
      major: '',
      institute: '',
      dropdownOpen: false,
      modal: false,
      activeTab: '',
      messageFromServer: '',
      selectedOption: null,
      open: false,
      groups: [],
      isLoading: true,
      groups2: [],
      condition: '',
      customeruid: [],
      customerall: [],
      imageURL: [],

    }
  }

  componentWillMount = async () => {

  }

  nextPath = (path) => {
    this.props.history.push(path);
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    this.getCustomer();
    this.getCustomerUID();
    this.getMajor();
    this.getInstitute();
  }

  getMajor = () => {
    Service.getMajor().then(response => {
      console.log(response);
      this.setState({ groups: response.data, isLoading: false });
      console.log(this.state.groups);
    });
  }

  getInstitute = () => {
    Service.getInstitute().then(response => {
      console.log(response);
      this.setState({ groups2: response.data, isLoading: false });
      console.log(this.state.groups2);
    });
  }

  getCustomer = () => {
    Service.getCustomer().then(response => {
      console.log(response);
      this.setState({ customerall: response.data });
      console.log(this.state.customerall);
    });
  }

  getCustomerUID = () => {
    Service.getCustomerUID(firebase.auth().currentUser.uid).then(response => {
      console.log(response);
      this.setState({ customeruid: response.data })
      console.log(this.state.customeruid);
      this.setState({
        cusId: this.state.customeruid[0].cusId,
        customerUid: firebase.auth().currentUser.uid,
        customerIDs: this.state.customeruid[0].customerIDs,
        customerName: firebase.auth().currentUser.displayName,
        customerPhone: this.state.customeruid[0].customerPhone,
        customerImg: this.state.customeruid[0].customerImg,
        customerEmail: firebase.auth().currentUser.email,
        customerGender: this.state.customeruid[0].customerGender,
        major: this.state.customeruid[0].majorName,
        institute: this.state.customeruid[0].instituteName
      });
      console.log(this.state.customeruid);
      this.getUrlImg();
    });
  }

  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
    alert('ข้อมูลถูกบันทึกแล้ว โปรด Login ใหม่อีกครั้ง');
    this.putCustomer();
    firebase.auth().signOut();

  };

  putCustomer = () => {
    Service.putCustomer(this.state.cusId, this.state.customerUid, this.state.customerIDs, this.state.customerName, this.state.customerPhone, this.state.customerImg, this.state.customerEmail, this.state.customerGender, this.state.major, this.state.institute).then(response => {
      console.log(response);
      console.log('PUT : ', this.state.customerUid);
    });
  }

  handleChangeSelect = (event) => {
    this.setState({ major: event.target.value });
    console.log(this.state.major);
  };

  handleChangeSelect2 = (event) => {
    this.setState({ institute: event.target.value });
    console.log(this.state.institute);
  };

  handleChangeId1 = (event) => {

    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  };

  handleChangeCusId = (event) => {
    this.setState({ cusId: event.target.value });

    console.log(this.state.cusId);
  };

  handleChangeId = (event) => {
    this.setState({ customerIDs: event.target.value });

    console.log(this.state.customerIDs);
  };

  handleChangeUsername = (event) => {
    this.setState({ customerName: event.target.value });
    console.log(this.state.customerName);
  };

  handleChangeGender = (event) => {
    this.setState({ customerGender: event.target.value });
    console.log(this.state.customerGender);
  };

  handleChangePhone = (event) => {
    this.setState({ customerPhone: event.target.value });
    console.log(this.state.customerPhone);
  };


  handleChangeEmail = (event) => {
    this.setState({ customerEmail: event.target.value });
    console.log(this.state.customerEmail);
  };


  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickShowText = () => {
    this.setState(state => ({ showText: !state.showText }));
  };



  sendMail() {
    console.log("emailVerified :" + firebase.auth().currentUser.emailVerified)

    // document.getElementById('verify').disabled = false;
    if (!firebase.auth().currentUser.emailVerified) {
      firebase.auth().currentUser.sendEmailVerification().then(function () {
        alert('Email Verification Sent !');
      });
      // document.getElementById('verify').disabled = false;
    } else {
      alert('You Email Verification Completed !');
      // document.getElementById('verify').disabled = true;
    }
  }

  CheckVerify() {
    if (!this.state.verify) {
      document.getElementById('verify').disabled = false;
    } else {
      document.getElementById('verify').disabled = true;
    }
  }

  resetPass() {
    var email = document.getElementById('customerEmail').value;

    firebase.auth().sendPasswordResetEmail(email).then(function () {
      alert('Password Reset Email Your Sent !');
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      }
      else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
    });
  }



  handleUploadStartimg = () => this.setState({ isUploading: true });
  handleUploadSuccessimg = filename => {
    this.setState({ customerImg: filename, isUploading: false });
    firebase
      .storage()
      .ref("imgProfile")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ imageURL: url }));
    console.log("UP Success");
  };

  deteleimg = () => {
    let storageRef = firebase.storage().ref();
    storageRef.child("imgProfile/" + this.state.customerImg).delete().then(url => this.setState({ imageURL: url }));
    console.log("delete Success");
  };

  getUrlImg = () => {
    
    if (this.state.customerImg != null){
      let storageRef = firebase.storage().ref();
      var starsRef = storageRef.child("imgProfile/" + this.state.customerImg);
      starsRef
        .getDownloadURL()
        .then(url => this.setState({ imageURL: url }));
      console.log('img');
    }
    else{
      console.log('img null');
    }
  }

  

  render() {
    const { classes } = this.props;
    const { groups, groups2, groups3, isLoading, item, item2 } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <Route path='/' exact={true} component={Login} />
        <Form>

          <Grid container justify="center" alignItems="center">
            <Avatar alt="Remy Sharp" src={this.state.imageURL} className={classes.avatar} />
            <input accept="image/*" className={classes.input} id="customerImg" type="file" />
          </Grid>
          <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file" >
            <CustomUploadButton
              color="primary"
              className={classes.button}
              aria-label="Upload picture"
              component="span"
              storageRef={firebase.storage().ref("imgProfile")}
              onUploadStart={this.handleUploadStartimg}
              onUploadSuccess={this.handleUploadSuccessimg}
            >
              <PhotoCamera />
            </CustomUploadButton>
          </label>
          &nbsp; &nbsp;
        {this.state.imageURL && <DeleteForeverIcon onClick={this.deteleimg} />}

          <br />
          <br />

          {/* <div style={{ display: "none" }}>
                        {this.state.cusId = item2.cusId}
                    </div> */}


          {/* CusId   */}
          <TextField
            id="cusId"
            refs="cusId"
            for="cusId"
            label="cusId"
            name="cusId"
            className={classes.textField}
            style={{ display: "none" }}
            // placeholder={this.state.item2[0]}
            value={this.state.cusId || ''}
            onChange={this.handleChangeCusId}
            autoComplete="cusId"


          >
          </TextField>


          {/* ID   */}



          <TextField
            id="customerIDs"
            refs="customerIDs"
            for="customerIDs"
            label="customerIDs"
            name="customerIDs"
            className={classes.textField}
            // placeholder={this.state.item2[0]}
            value={this.state.customerIDs || ''}
            onChange={this.handleChangeId}
            autoComplete="customerIDs"


          >
          </TextField>
          <br />
          <br />

          {/* UserName */}
          <TextField
            id="customerName"
            label="customerName"
            for="customerName"
            name="customerName"
            className={classes.textField}
            value={this.state.customerName || ''}
            onChange={this.handleChangeUsername}


          />
          <br />
          <br />
          {/* Phone */}

          <TextField
            id="customerPhone"
            for="customerPhone"
            label="customerPhone"
            name="customerPhone"
            className={classes.textField}
            value={this.state.customerPhone || ''}
            onChange={this.handleChangePhone}


          />
          <br />
          <br />

          <FormGroup >
            <Label for="exampleCheckbox">Institute</Label>
            <br />
            <Select

              id="institute"
              for="institute"
              label="institute"
              name="institute"
              className={classes.textField}
              defaultValue={this.state.groups2.instituteId}
              value={this.state.institute}
              onChange={this.handleChangeSelect2}


              MenuProps={MenuProps}
            >
              {groups2.map(name => (
                <MenuItem key={name.instituteName} value={name.instituteId} >
                  {name.instituteName}
                </MenuItem>
              ))}
            </Select>

          </FormGroup>

          <br />
          <br />

          <FormGroup >
            <Label for="exampleCheckbox">Major</Label>
            <br />
            <Select

              id="major"
              for="major"
              label="major"
              name="major"
              className={classes.textField}
              defaultValue={this.state.groups.majorId}
              value={this.state.major}
              onChange={this.handleChangeSelect}


              MenuProps={MenuProps}
            >
              {groups.map(name => (
                <MenuItem key={name.majorName} value={name.majorId} >
                  {name.majorName}
                </MenuItem>
              ))}
            </Select>

          </FormGroup>


          <br />
          <br />
          <FormGroup >
            <Label for="exampleCheckbox">Gender</Label>
            <br />
            <Select
              id="customerGender"
              for="customerGender"
              label="customerGender"
              name="customerGender"
              className={classes.textField}
              defaultValue={this.state.customerGender}
              value={this.state.customerGender}
              onChange={this.handleChangeGender}


              MenuProps={MenuProps}
            >
              <MenuItem value='Male'>Male</MenuItem>
              <MenuItem value='Female'>Female</MenuItem>
              <MenuItem value='Other'>Other</MenuItem>
            </Select>
          </FormGroup>

          <br />
          <br />
          <TextField
            id="customerEmail"
            label="customerEmail"
            for="customerEmail"
            name="customerEmail"
            className={classes.textField}
            value={this.state.customerEmail}
            onChange={this.handleChangeEmail}



          />
          <br />
          <br />

          <Link to='/'>
          <Button
            variant="contained"
            color="primary"
            disableRipple
            onClick={this.handleClick(TransitionDown)
            }
          >
            Save
          </Button>
          </Link>
          {" "}
          <Button
            id='verify'
            name='verify'
            variant="contained"
            color="primary"
            disableRipple
            onClick={this.sendMail}
          >
            Verification
</Button>
          {" "}
          <Button
            variant="contained"
            color="primary"
            disableRipple
            onClick={this.resetPass}
          >
            ReserPasswprd
</Button>
          <br />
          <br />
        </Form>
      </div>
    );
  }
}

Tab1.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, withRouter, { withTheme: true })(Tab1);
