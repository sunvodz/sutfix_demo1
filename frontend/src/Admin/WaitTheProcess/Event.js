import React, { Component } from "react";
import "../Admin.css";
import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardBody,
  Container
} from "reactstrap";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FilePondImagePreview from "filepond-plugin-image-preview";
import { registerPlugin } from "react-filepond";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import firebase from "firebase";
registerPlugin(FilePondImagePreview);
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

class Event extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      repair: []
    };
  }
  async componentDidMount() {
    const response = await fetch("http://localhost:8080/allstatusRepair/");
    const body = await response.json();
    this.setState({ repair: body, isLoading: false });
    console.log(this.state.repair);
  }
  async componentDidUpdate(){
    const response = await fetch("http://localhost:8080/allstatusRepair/");
    const body = await response.json();
    this.setState({ repair: body, isLoading: false });
  }
  

  render() {
    const { repair, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <Container>
      <CardBody>
        <Table hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Cause</th>
              <th>Report date</th>
              <th>Status</th>
            </tr>
          </thead>

          {repair.map(group => (
            <tbody key={group.repairId} style={{ textAlign: "center" }}>
              <tr>
                <th scope="row">{group.repairId}</th>
                <td>{group.customer.customerName}</td>
                <td>{group.caseRepair.caseRepairName}</td>
                <td>{group.repairDate}</td>
                <td>{group.repairStatus}</td>
                <td>
                  <ModalExample expense={group} />
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </CardBody>
      </Container>
    );
  }
}

class ModalExample extends Event {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      modal: false,
      idre: "",
      idImgs: "",
      img: "",
      technic: [],
      technicName: "",
      technicIdS: "",
      mass: "",
      repairs: [],
      manageaaa: [],
      comment: "",
      status: "",
      case: "",
      date: "",
      idU: "",
      id: "",
      PhoneU: ""
    };
    this.addManage = this.addManage.bind(this);
    this.toggle = this.toggle.bind(this);

    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.getUrlImg();
  }

  async componentDidMount() {
    this.setState({
      idU: this.props.expense.customer.customerName,
      id: this.props.expense.customer.cusId,
      idre: this.props.expense.repairId,
      idImgs: this.props.expense.repairImage,
      comment: this.props.expense.comment,
      status: this.props.expense.repairStatus,
      case: this.props.expense.caseRepair.caseRepairName,
      date: this.props.expense.repairDate,
      PhoneU: this.props.expense.customer.customerPhone
    });
    console.log(this.state.idre);
    console.log(this.state.idImgs);
    console.log(this.state.comment);
    console.log(this.state.status);
    console.log(this.state.case);
    console.log(this.state.date);

    const response = await fetch("http://localhost:8080/technic/");
    const body = await response.json();
    this.setState({ technic: body, isLoading: false });
    console.log(this.state.technic);
  }
  handleChangeSelect(event) {
    this.setState({ technicIdS: event.target.value });
    console.log(this.state.technicIdS);
  }
  async addManage() {
    await fetch(
      "http://localhost:8080/newManage/" +
        this.state.idre +
        "/" +
        this.state.technicIdS,
      {
        method: "POST"
      }
    );
    console.log("POST Success");
    console.log(this.state.technicIdS, this.state.idre);
    this.upManage();
  }

  async upManage() {
    await fetch("http://localhost:8080/putManage2/" + this.state.idre, {
      method: "PUT"
    });
    console.log("PUT Success");
    console.log(this.state.idre);
    this.toggleclo();
  }

  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
    this.addManage();
  };

  getUrlImg() {
    let storageRef = firebase.storage().ref();
    var starsRef = storageRef.child("imgRepair/" + this.state.idImgs);
    starsRef
      .getDownloadURL()
      .then(url => this.setState({ img: url, isUploading: false }));
    console.log(this.state.img);
  }
  toggleclo = () => {
    this.setState(prevState => ({
        modal: !prevState.modal
    }));
}


  render() {
    const { isLoading, technic, idU, date, id } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <Button color="success" onClick={this.toggle}>
          {this.props.buttonLabel} select{" "}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="nav2">
          <ModalHeader toggle={this.toggle}>Details</ModalHeader>
          <ModalBody>
            <Card>
              <CardHeader
                avatar={<Avatar aria-label="Recipe">{id}</Avatar>}
                title={idU}
                subheader={date}
              />
              <div align="center">
                <img src={this.state.img} width="300px" height="300px" />
              </div>
              <CardContent>
                <Typography variant="body2" component="p">
                  <b>Comment: </b>
                  {this.state.comment}
                </Typography>
                <Typography variant="body2" component="p">
                  <b>Case: </b>
                  {this.state.case}
                </Typography>
                <Typography variant="body2" component="p">
                  <b>Status: </b>
                  {this.state.status}
                </Typography>
                <Typography variant="body2" component="p">
                  <b>Phone Number: </b>
                  {this.state.PhoneU}
                </Typography>
              </CardContent>
            </Card>

            <br />
            <br />
            <h5>Select Name Technic</h5>
            <Select
              style={{
                width: "60%",
                left: "15%"
              }}
              defaultValue={this.state.technicIdS}
              value={this.state.technicIdS}
              onChange={this.handleChangeSelect}
              InputProps={{
                readOnly: this.state.showText ? false : true
              }}
            >
              {technic.map(casess => (
                <MenuItem key={casess.technicId} value={casess.technicId}>
                  {casess.technicName}
                </MenuItem>
              ))}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.handleClick(TransitionDown)}>
              Confirm
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Event;
