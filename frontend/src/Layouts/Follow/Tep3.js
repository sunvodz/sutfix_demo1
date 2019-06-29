import React, { Component } from "react";
import { Button, Table,Container } from "reactstrap";
import "./Follow.css";
import firebase from "firebase";
import { registerPlugin } from "react-filepond";
import FilePondImagePreview from "filepond-plugin-image-preview";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import Service from "../CourseDataService";

registerPlugin(FilePondImagePreview);
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

class Tep3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      successfulRepair: [],
      message: null,
      iduser: [],
      id: "None",
      uid: firebase.auth().currentUser.uid
    };
    this.getCustomer = this.getCustomer.bind(this);
    this.getStatusSuccessfulRepair = this.getStatusSuccessfulRepair.bind(this);
  }
  async componentDidMount() {
    this.getCustomer();
    this.getStatusSuccessfulRepair();
  }

  getCustomer() {
    Service.getCustomer(this.state.uid).then(response => {
      console.log(response);
      this.setState({ iduser: response.data });
    });
  }
  getStatusSuccessfulRepair() {
    Service.getStatusSuccessfulRepair(this.state.uid).then(response => {
      this.setState({ successfulRepair: response.data, isLoading: false });
    });
  }

  addSuccessfully(id) {
    Service.postSuccessfully(id).then(response => {});
    this.upStatusHistory(id);
  }

  upStatusHistory(id) {
    Service.putSuccessfully(id).then(response => {
      this.getStatusSuccessfulRepair();
    });
  }

  componentDidUpdate(){
    this.getStatusSuccessfulRepair();
}
  render() {
    const { successfulRepair, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <Container>
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>Technic Name</th>
              <th>Technic Phone</th>
              <th>Case</th>
              <th>Case Frome Technic</th>
              <th>Meeting</th>
              <th>Completed Date</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>

          {successfulRepair.map(group => (
            <tbody style={{ textAlign: "center" }}>
              <tr key={group.successfulRepairId}>
                <th>{group.manage.technic.technicName}</th>
                <th>{group.manage.technic.technicPhone}</th>
                <td> {group.manage.repair.caseRepair.caseRepairName}</td>
                <td> {group.caseFromTec}</td>
                <td> {group.meeting}</td>
                <td> {group.successfulRepairDate}</td>
                <td> {group.manage.repair.repairStatus}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      this.addSuccessfully(group.successfulRepairId)
                    }
                  >
                    Accept
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>

        {this.state.message && (
          <div class="alert alert-success" style={{ textAlign: "center" }}>
            {this.state.message}
          </div>
        )}
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Successfully Confirm</span>}
        />
      </div>
      </Container>
    );
  }
}

export default Tep3;
