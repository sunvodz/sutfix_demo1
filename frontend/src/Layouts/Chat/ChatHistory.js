
import React from 'react'
import './ChatHistory.css';


const ChatHistory = (props) => {
    return (
         
        <div style={{ marginTop:10 }}>
        
            {
                props.listMsg.map( msg =>{
                     if (msg.username === 'tungao'){
                         return <div className="me"><p key = { msg.key }>  <div className="userColor"> &nbsp;&nbsp;&nbsp; { msg.username } &nbsp;&nbsp;&nbsp; </div> &nbsp; { msg.message } &nbsp;&nbsp;&nbsp; </p></div>
                    }else{
                         return <div className="you"><p key = { msg.key }> <div className="userColor"> &nbsp;&nbsp;&nbsp; { msg.username } &nbsp;&nbsp;&nbsp; </div> &nbsp; { msg.message } &nbsp;&nbsp;&nbsp; </p></div>
                    }
                }) 
            }
        </div>        
    )

}


export default ChatHistory
