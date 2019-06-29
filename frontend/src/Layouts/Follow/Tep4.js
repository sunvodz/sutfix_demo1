import React, { Component } from "react";
import { Container,Table } from "reactstrap";
import "./Follow.css";
import firebase from "firebase";
import Service from "../CourseDataService";
class Tep4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      successfully: [],
      iduser: [],
      id: "None",
      uid: firebase.auth().currentUser.uid
    };
    this.getCustomer = this.getCustomer.bind(this);
    this.getHistory = this.getHistory.bind(this);
  }
  async componentDidMount() {
    this.getCustomer();
    this.getHistory();
  }

  getCustomer() {
    Service.getCustomer(this.state.uid).then(response => {
      console.log(response);
      this.setState({ iduser: response.data });
    });
  }
  getHistory() {
    Service.getHistory(this.state.uid).then(response => {
      console.log(response);
      this.setState({ successfully: response.data, isLoading: false });
    });
  }

  render() {
    const { successfully, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <Container>
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type to repair</th>
              <th>Name Technic</th>
              <th>Completed Date</th>
              <th>Status</th>
            </tr>
          </thead>

          {successfully.map(group => (
            <tbody style={{ textAlign: "center" }}>
              <tr key={group.historyId}>
                <td> {group.successfulRepair.manage.repair.repairNumber}</td>
                <td>
                  {" "}
                  {
                    group.successfulRepair.manage.repair.caseRepair
                      .caseRepairName
                  }
                </td>
                <td> {group.successfulRepair.manage.technic.technicName}</td>
                <td> {group.historyDate}</td>
                <td> {group.successfulRepair.manage.repair.repairStatus}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
      </Container>
    );
  }
}

export default Tep4;
