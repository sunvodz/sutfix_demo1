import React, { Component } from "react";
import logohead from "../img/Logo-head.png";
import "./Head.css";
class Head extends Component {

  render() {
    return (
      <div className="header">
        <header className="header-from">
                  <img src={logohead} className="logo" alt="logohead" />
        </header>
      </div>
    );
  }
}

export default Head;
