import React, { Component } from "react";
import "../Admin.css";
import {
  Button,
  Table,
  Label,
  Input,
  CardBody,
  Modal,
  ModalHeader,
  Container,
  ModalBody,
  ModalFooter
} from "reactstrap";
import FilePondImagePreview from "filepond-plugin-image-preview";
import { registerPlugin } from "react-filepond";
import Slide from "@material-ui/core/Slide";
import firebase from "firebase";
import Service from "../CourseDataService";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
registerPlugin(FilePondImagePreview);
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

class Report extends Component {
  state = {
    isLoading: true,
    manage: [],
    message: null
  };

  async componentDidMount() {
    const response3 = await fetch("http://localhost:8080/getManage/");
    const body3 = await response3.json();
    this.setState({ manage: body3, isLoading: false });
  }
  async componentDidUpdate(){
    const response3 = await fetch("http://localhost:8080/getManage/");
    const body3 = await response3.json();
    this.setState({ manage: body3, isLoading: false });
}

  render() {
    const { manage, isLoading, message } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <Container>
      <CardBody>
        <Table hover>
          <thead>
            <tr>
              <th>Assigned Person</th>
              <th>Phone Number Person</th>
              <th>Cause</th>
              <th>Technic Name</th>
              <th>Repairing date</th>
              <th>Status</th>
              <th> </th>
            </tr>
          </thead>

          {manage.map(group => (
            <tbody key={group.manageId} style={{ textAlign: "center" }}>
              <tr>
                <th> {group.repair.customer.customerName}</th>
                <td> {group.repair.customer.customerPhone}</td>
                <td> {group.repair.caseRepair.caseRepairName}</td>
                <td> {group.technic.technicName}</td>
                <td> {group.manageDate}</td>
                <td> {group.repair.repairStatus}</td>
                <td>
                  {" "}
                  <ModalExample expense={group} />
                </td>
              </tr>
              {this.state.message && (
                <div
                  class="alert alert-success"
                  style={{ textAlign: "center" }}
                >
                  {this.state.message}
                </div>
              )}
            </tbody>
          ))}
        </Table>
      </CardBody>
      </Container>
    );
  }
}

class ModalExample extends Report {
  constructor() {
    super();
    this.state = {
      manageIdss: "",
      groups: [],
      caserepair: "",
      isLoading: false,
      isUploading: false,
      showText: [],
      caseSelect: true,
      comment: "",
      idre: "",
      idImgs: "",
      id: "None",
      uid: firebase.auth().currentUser.uid,
      img: "",
      isUploading: false,
      comment: "",
      status: "",
      case: "",
      date: "",
      idU: "",
      meeting: "",
      PhoneU: "",
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.getCaseRepair = this.getCaseRepair.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.getUrlImg = this.getUrlImg.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.getUrlImg();
  }
  handleChangeSelect(event) {
    this.setState({ caserepair: event.target.value });
    console.log(this.state.caserepair);
  }

  async componentDidMount() {
    this.setState({
      manageIdss: this.props.expense.manageId,
      idImgs: this.props.expense.repair.repairImage,
      idU: this.props.expense.repair.customer.customerName,
      idre: this.props.expense.repair.repairNumber,
      comment: this.props.expense.repair.comment,
      status: this.props.expense.repair.repairStatus,
      case: this.props.expense.repair.caseRepair.caseRepairName,
      date: this.props.expense.manageDate,
      PhoneU: this.props.expense.repair.customer.customerPhone
    });
    console.log(this.state.manageIdss);
    this.getCaseRepair();
  }

  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
    fetch(
      "http://localhost:8080/newSuccessfullyRepair/" +
        this.state.manageIdss +
        "/" +
        this.state.caserepair +
        "/" +
        this.state.meeting,
      {
        method: "POST"
      }
    );
    fetch("http://localhost:8080/putManage/" + this.state.manageIdss, {
      method: "PUT"
    });

    console.log("PUT Success");
    console.log(this.state.manageIdss);
    this.toggleclo();
  };

  getCaseRepair() {
    Service.getCaseRepair().then(response => {
      console.log(response);
      this.setState({ groups: response.data, isLoading: false });
    });
  }

  getUrlImg() {
    let storageRef = firebase.storage().ref();
    var starsRef = storageRef.child("imgRepair/" + this.state.idImgs);
    starsRef
      .getDownloadURL()
      .then(url => this.setState({ img: url, isUploading: false }));
    console.log(this.state.img);
  }

  SelectMeeting = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(this.state.meeting);
  }

  toggleclo = () => {
    this.setState(prevState => ({
        modal: !prevState.modal
    }));
}

  render() {
    const { groups, idU, date, idre, meeting } = this.state;
    return (
      <div align="center">
        <Button color="success" onClick={this.toggle}>
          {this.props.buttonLabel} Add Case{" "}
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className="nav2">
          <ModalHeader toggle={this.toggle}>Details</ModalHeader>
          <ModalBody>
            <Card>
              <CardHeader
                avatar={<Avatar aria-label="Recipe">{idre}</Avatar>}
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
            <h5>Select Case Repair</h5>
            <Select
              style={{
                width: "60%"
              }}
              defaultValue={this.state.caserepair}
              value={this.state.caserepair}
              onChange={this.handleChangeSelect}
              inputprops={{
                readOnly: this.state.showText ? false : true
              }}
            >
              {groups.map(casess => (
                <MenuItem
                  key={casess.caseRepairId}
                  value={casess.caseRepairName}
                >
                  {casess.caseRepairName}
                </MenuItem>
              ))}
            </Select>
            <br />
            <br />
            <Label for="exampleText">Meeting</Label>
            <Input
              type="textarea"
              name="meeting"
              id="meeting"
              value={meeting}
              onChange={this.SelectMeeting}
            />
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

export default Report;
