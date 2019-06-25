import React, { Component } from 'react';

import Messenger from './Chat/Messenger';
import History from './History/History';
import Repair from './Repair/Repair';
import Profile from './Profile/Profile';
import Follow from './Follow/Follow';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import Service from "./CourseDataService";

import firebase from "firebase";

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import '../App.css';

const paperStyle = {
    height: '85%',
    width: "85%",
    margin: '7%',
    textAlign: 'center',
    display: 'inline-block',
};



class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 'None',
            uid: firebase.auth().currentUser.uid,
            groups: [],
            customeruid: [],
            "open": false,
            "show": null
        };
    }


    componentDidMount = () => {

        this.getCustomerUID();


    }
    getCustomerUID = () => {
        Service.getCustomerUID(firebase.auth().currentUser.uid).then(response => {
            console.log(response);
            this.setState({ customeruid: response.data });
            console.log(this.state.customeruid);
        });
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    showProfile = () => {
        this.setState({ show: 'Profile', open: false });
    };

    showHistory = () => {
        this.setState({ show: 'History', open: false });
    };

    showMessenger = () => {
        this.setState({ show: 'Messenger', open: false });
    };

    showRepair = () => {
        this.setState({ show: 'Repair', open: false });
    };

    showFollow = () => {
        this.setState({ show: 'Follow', open: false });
    };

    render() {
        let content = null;

        const { customeruid } = this.state;
        switch (this.state.show) {

            case 'Profile':
                content = (<Profile />);
                break;

            case 'History':
                content = (<History />);
                break;

            case 'Messenger':
                content = (<Messenger />);
                break;

            case 'Repair':
                content = (<Repair />);
                break;

            case 'Follow':
                content = (<Follow />);
                break;

            default:
                content = (<Profile />);
        }
        return (


            <div>
                <div align='center'>
                    <AppBar

                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        title="SUT Repair Computer"
                        onLeftIconButtonClick={this.handleToggle}
                    >

                        <Button>
                            {customeruid.map(group =>
                                <div key={group.customerIDs}>
                                    {group.customerIDs}
                                </div>)}
                        </Button>

                        <Button onClick={() => firebase.auth().signOut()} ><Link to={`/`}>SignOut</Link></Button>
                    </AppBar>
                </div>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}>

                    <AppBar title="MENU" />
                    <MenuItem id="showProfileId" onClick={this.showProfile}>Profile</MenuItem>
                    <MenuItem id="showHistoryId" onClick={this.showHistory}>History</MenuItem>
                    <MenuItem id="showMessengerId" onClick={this.showMessenger}>Messenger</MenuItem>
                    <MenuItem id="showRepairId" onClick={this.showRepair}>Repair</MenuItem>
                    <MenuItem id="showFollowId" onClick={this.showFollow}>Follow</MenuItem>
                </Drawer>
                <Paper style={paperStyle} zDepth={5}>
                    <Toolbar style={{ "justifyContent": "center" }}>
                        <ToolbarTitle text={this.state.show} />
                    </Toolbar>
                    {content}
                </Paper>
            </div>
        );
    }
}

export default index;