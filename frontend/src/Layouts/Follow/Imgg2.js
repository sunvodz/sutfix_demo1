import React, { Component } from "react";
import { Button, Modal, ModalBody, FormGroup, ModalHeader } from "reactstrap";
import "./Follow.css";
import firebase from "firebase";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
class Imgg2 extends Component {
  constructor() {
    super();
    this.state = {
     
      imgsa: [],
      iduser: [],
      repair: [],
      idImgs: "",
      id: "None",
      uid: firebase.auth().currentUser.uid,
      img: '',
      isUploading: false,
      comment:'',
          status:'',
          case: '',
          date:'',
          idU:''
    };

    this.toggle = this.toggle.bind(this);
    this.getUrlImg = this.getUrlImg.bind(this);
  }
  async componentDidMount() {
    this.setState({
      idImgs: this.props.expense.repair.repairImage,
      idU: this.props.expense.repair.customer.customerName,
      idre: this.props.expense.repair.repairNumber,
      comment: this.props.expense.repair.comment,
      status: this.props.expense.repair.repairStatus,
      case: this.props.expense.repair.caseRepair.caseRepairName,
      date: this.props.expense.repair.repairDate,
    });
    console.log(this.state.idImgs);
    
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.getUrlImg();
  }

getUrlImg() {
let storageRef = firebase.storage().ref();
var starsRef = storageRef.child('imgRepair/'+this.state.idImgs);
starsRef.getDownloadURL().then(url => this.setState({ img: url, isUploading: false }));
  console.log(this.state.img);
}

  render() {
    const { isUploading ,idU ,date} = this.state;
    if (isUploading) {
      return <p>Loading...</p>;
  }
    return (
      <div>
        <Button color="success" onClick={this.toggle}>
          {this.props.buttonLabel} Image{" "}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="nav">
          <ModalHeader toggle={this.toggle}>Views Image</ModalHeader>
          <ModalBody>
            <FormGroup>
            <Card>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe">
                 {this.state.idre}
                </Avatar>
              }
              title= {idU}
              subheader={date}
            />
            <div align= 'center'>
            <img src={this.state.img} width="300px" height="300px" />
            </div>
            <CardContent>
              <Typography variant="body2" component="p">
                <b>Comment: </b>{this.state.comment}
              </Typography>
              <Typography variant="body2" component="p">
              <b>Case: </b>{this.state.case}
              </Typography>
              <Typography variant="body2" component="p">
              <b>Status: </b>{this.state.status}
              </Typography>
            </CardContent>
          </Card>

            </FormGroup>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Imgg2;
