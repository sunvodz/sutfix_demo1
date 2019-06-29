import React, { Component } from "react";
import { Button, Modal, ModalBody, FormGroup, ModalHeader } from "reactstrap";
import firebase from "firebase";
class Viewimg extends Component {
  constructor() {
    super();
    this.state = {
      idre: "",
      imgsa: [],
      iduser: [],
      repair: [],
      idImgs: "",
      id: "None",
      uid: firebase.auth().currentUser.uid,
      img: ""
    };

    this.toggle = this.toggle.bind(this);
  }
  async componentDidMount() {
    this.setState({
      idImgs: this.props.expense.fileName
    });
    console.log(this.state.idImgs);
    fetch("http://localhost:8080/api/files/getidImgaa" + this.state.idImgs).then(
      response => {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          this.state.img = a.href;
        });
      }
    );
  
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    
  }

  render() {
    return (
      <div>
        <Button color="success" onClick={this.toggle}>
          {this.props.buttonLabel} View Image Upload{" "}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="nav">
          <ModalHeader toggle={this.toggle}>Views Image</ModalHeader>
          <ModalBody>
            <FormGroup>
              <img src={this.state.img} width="300px" height="300px" />
            </FormGroup>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Viewimg;
