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
import {
    Button,
    FormGroup,
    Label,
    Form
} from "reactstrap";
import { Edit, Lock, VisibilityOff, Visibility } from '@material-ui/icons';
import "./Profile.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Login from '../Login/Login';
import Tap1 from "./Tab1";
import Tap2 from "./Tab2";
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Delete from '@material-ui/icons/Delete';

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}));


function Profile() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    function handleChange(event, newValue) {
      setValue(newValue);
    }
  
    function handleChangeIndex(index) {
      setValue(index);
    }
  

        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Profile" />
                        <Tab label="Edit" />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}>
                        <Tap2 />
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <Tap1 />
                    </TabContainer>
                </SwipeableViews>

            </div>
        );
    }



export default Profile;
