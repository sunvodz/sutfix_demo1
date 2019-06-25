import React, { Component } from 'react';
import Chatroom from './Chatroom';
import ChatHistory from './ChatHistory';
import firebase from 'firebase';
import { Config } from './Config';
import './Messenger.css';

firebase.initializeApp(Config)
class Messenger extends Component {

  state = { listMsg: [] }

  constructor(props) {
    super(props)
    var that  = this;
    firebase.database().ref('message/').on('value', function(snapshot) {
      if(snapshot.val() != null) { 
         that.setState({
          listMsg:snapshot.val()
         })
       }
    });
  }

  onClickButtonHandlerData = (msg,user) => {
    const listMsgData = this.state.listMsg.concat({
      key: Math.random().toString().replace('.',''),
      message: msg,
      username: user,
     })
    firebase.database().ref('message/').set(listMsgData);
  }

  render() {
    this.state.listMsg.map( msg => {
      return <p>{msg.message}</p>
    })
    return (
     
      <div className="container">
      <div className="left-col">
      
      </div>
      <div className="center-col">
        <span><ChatHistory
        listMsg = {this.state.listMsg} /></span>

      </div>
      
      <div className="right-col">
      
      </div>
      
        <Chatroom 
            onClickButtonHandler = {this.onClickButtonHandlerData}
        />
        
      </div>
      
    );
  }
}

export default Messenger;