import React, { Component } from 'react';

import User from './ManageTechnician/User';
import Tabs from './Tabs/Tabs';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import Button from '@material-ui/core/Button';

import firebase from "firebase";

import { Link } from 'react-router-dom';

import '../App.css';
import Profile from '../Layouts/Profile/Profile';


const paperStyle = {
    height: '85%',
    width: "85%",
    margin: '7%',
    background: '#ffffff',
    textAlign: 'center',
    display: 'inline-block',
};


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "open": false,
            "show": null
        };
    }


    handleToggle = () => this.setState({ open: !this.state.open });

    showProfile = () => {
        this.setState({ show: 'Profile', open: false });
    };

    showUser = () => {
        this.setState({ show: 'Manage Technician', open: false });
    };


    showTabs = () => {
        this.setState({ show: 'Manage Cause', open: false });
    };


    render() {
        let content = null;

        switch (this.state.show) {

            case 'Profile':
                content = (<Profile />);
                break;

            case 'Manage Technician':
                content = (<User />);
                break;


            case 'Manage Cause':
                content = (<Tabs />);
                break;

            default:
                content = (<User />);
        }

        return (
            <div>

                <div align='center' >
                    <AppBar iconClassNameRight="muidocs-icon-navigation-expand-more" title="SUT Repair Computer" onLeftIconButtonClick={this.handleToggle} >
                        <Button onClick={() => firebase.auth().signOut()} ><Link to={`/`}>SignOut</Link></Button>
                    </AppBar>
                </div>

                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}>

                    <AppBar title="MENU" />
                    {/* <MenuItem id="showProfileId" onClick={this.showProfile}>Profile</MenuItem> */}
                    <MenuItem id="showUserId" onClick={this.showUser}>Manage Technician</MenuItem>
                    <MenuItem id="showTabsId" onClick={this.showTabs} >Manage Cause</MenuItem>

                </Drawer>

                <Paper style={paperStyle} zDepth={5}>
                    <Toolbar style={{ "justifyContent": "center", background: '#00bdd3', color: '#ffffff' }} >
                        <ToolbarTitle text={this.state.show} />
                    </Toolbar>
                    {content}
                </Paper>

            </div>
        );
    }
}

export default Admin;