import React, { Component } from "react";
import { Container,Table } from "reactstrap";
import "./Follow.css";
import firebase from "firebase";
import Service from "../CourseDataService";
import Imgg from "./Imgg";

class Tep1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      repair: [],
      iduser: [],
      id: "None",
      uid: firebase.auth().currentUser.uid
    };
    this.getRepair = this.getRepair.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
  }
  async componentDidMount() {
    this.getCustomer();
    this.getRepair();
  }

  getCustomer() {
    Service.getCustomer(this.state.uid).then(response => {
      console.log(response);
      this.setState({ iduser: response.data });
    });
  }
  getRepair() {
    Service.getRepair(this.state.uid).then(response => {
      this.setState({ repair: response.data, isLoading: false });
    });
  }
  componentDidUpdate(){
    this.getRepair();
}
  render() {
    const { repair, isLoading } = this.state;
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
              <th>Completed Date</th>
              <th>Status</th>
              <th>Name Image</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {repair.map(group => (
              <tr key={group.repairId}>
                <td> {group.repairNumber}</td>
                <td> {group.caseRepair.caseRepairName}</td>
                <td> {group.repairDate}</td>
                <td> {group.repairStatus}</td>
                <td>
                  <Imgg expense={group} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </Container>
    );
  }
}
export default Tep1;
