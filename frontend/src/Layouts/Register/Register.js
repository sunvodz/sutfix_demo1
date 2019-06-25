import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  MenuItem, Paper, Typography, TextField, InputAdornment, FormControl, InputLabel, Select, IconButton
} from '@material-ui/core';
import {
  Button
} from "reactstrap";

import { VisibilityOff, Visibility } from '@material-ui/icons';

import { major } from "./DataSelect";
import Head from "../head/Head";


const styles = theme => ({
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
  avatar: {
    margin: 10,
    width: 80,
    height: 80,
  },
});

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}

const paperStyle = {
  height: '85%',
  width: "85%",
  margin: '7%',
  textAlign: 'center',
  display: 'inline-block',
};

class Register extends React.Component {
  state = {
    name: [],
    amount: '',
    password: '',
    weight: '',
    groupedOptionsRange: '',
    OP1Range: '',
    showPassword: false,
  };


  handleChange1 = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      name: value,
    });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  nextPath(path) {
    this.props.history.push(path);
  }


  render() {

    const { classes } = this.props;

    return (

      <div className={classes.root}>
        <Typography variant="subtitle1" gutterBottom>
          <Head />
        </Typography>

        <Paper style={paperStyle} zDepth={5}>

          <br />
          <br />
          <br />
          <br />
          <TextField
            id="standard-name"
            // variant="outlined"
            label="Name"
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
          />
          <br />
          <br />
          <TextField
            id="standard-nickname"
            // variant="outlined"
            label="Nickname"
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
          />
          <br />
          <br />
          <TextField
            id="standard-name"
            // variant="outlined"
            label="Phone"
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
          />

          <br />
          <br />

          <form noValidate>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>

          <br />
          <br />

          <TextField
            id="standard-name"
            // variant="outlined"
            label="Email"
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
          />

          <br />
          <br />

          <TextField
            id="standard-password"
            // variant="outlined"
            type={this.state.showPassword ? 'text' : 'password'}
            label="Password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.handleChange1('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <br />
          <br />

          <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-simple">Name</InputLabel>
          <Select
            value={this.state.name}
            onChange={this.handleChange}
            inputProps={{
              name: 'name',
              id: 'name-simple',
            }}
          >

            {major.map(name => (
              <MenuItem key={name} value={name} style={getStyles(name, this)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

          <br />
          <br />

          <Button
            variant="contained"
            color="primary"
            disableRipple
            onClick={() => this.nextPath("/")}
          >
            Save
      </Button>
          {" "}
          <Button
            variant="contained"
            color="primary"
            disableRipple
            onClick={() => this.nextPath("/")}
          >
            Back
      </Button>
        </Paper>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(Register);
