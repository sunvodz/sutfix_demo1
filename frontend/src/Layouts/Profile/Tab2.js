import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import {
  Button,
  FormGroup,
  Label,
  Form
} from "reactstrap";
import "./Profile.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


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

class Tap2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL:[],
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
      open: false,
      isLoading: true,
      customeruid: [],
      customerall: [],
      img:''
    }
  }


  componentWillMount = async () => {

  }


  componentDidMount = async () => {
    this.setState({ isLoading: true });
    this.getCustomer();
    this.getCustomerUID();
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
        major: this.state.customeruid[0].major.majorName,
        institute: this.state.customeruid[0].institute.instituteName
      });
      console.log(this.state.customeruid);
      console.log(this.state.major);
      console.log(this.state.institute);
      this.getUrlImg();
    });
  }


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

  handleChangeInstitute = (event) => {
    this.setState({ institute: event.target.value });
    console.log(this.state.institute);
  };

  handleChangeMajor = (event) => {
    this.setState({ major: event.target.value });
    console.log(this.state.major);
  };

  handleChangeEmail = (event) => {
    this.setState({ customerEmail: event.target.value });
    console.log(this.state.customerEmail);
  };

  getUrlImg = () =>  {

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
    return (
      <div><Form>

      <Grid container justify="center" alignItems="center">
      <Avatar alt="Remy Sharp" src={this.state.img} className={classes.avatar} />
    </Grid>
        <br />
        <br />


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
          InputProps={{
            readOnly: true,

          }}
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
          InputProps={{
            readOnly: true,

          }}
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
          InputProps={{
            readOnly: true,

          }}
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
          InputProps={{
            readOnly: true,

          }}
        />
        <br />
        <br />

        <TextField
          id="institute"
          for="institute"
          label="institute"
          name="institute"
          className={classes.textField}
          value={this.state.institute || ''}
          onChange={this.handleChangeInstitute}
          InputProps={{
            readOnly: true,

          }}
        />

        <br />
        <br />

        <TextField
          id="major"
          for="major"
          label="major"
          name="major"
          className={classes.textField}
          value={this.state.major || ''}
          onChange={this.handleChangeMajor}
          InputProps={{
            readOnly: true,

          }}
        />

        <br />
        <br />

        <TextField
          id="customerGender"
          for="customerGender"
          label="customerGender"
          name="customerGender"
          className={classes.textField}
          value={this.state.customerGender || ''}
          onChange={this.handleChangeGender}
          InputProps={{
            readOnly: true,

          }}
        />

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
          InputProps={{
            readOnly: true,

          }} />
        <br />
        <br />

      </Form>
      </div>
    );
  }
}


Tap2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, withRouter, { withTheme: true })(Tap2);
