import React, { Component } from "react";
import { Container,Table } from "reactstrap";
import "./Follow.css";
import firebase from "firebase";
import Service from "../CourseDataService";
import Imgg from "./Imgg2";
class Tep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      manage: [],
      iduser: [],
      id: "None",
      uid: firebase.auth().currentUser.uid
    };
    this.getCustomer = this.getCustomer.bind(this);
    this.getStatusManage = this.getStatusManage.bind(this);
  }
  async componentDidMount() {
    this.getCustomer();
    this.getStatusManage();
  }

  getCustomer() {
    Service.getCustomer(this.state.uid).then(response => {
      console.log(response);
      this.setState({ iduser: response.data });
    });
  }
  getStatusManage() {
    Service.getStatusManage(this.state.uid).then(response => {
      this.setState({ manage: response.data, isLoading: false });
    });
  }
  componentDidUpdate(){
    this.getStatusManage();
}

  render() {
    const { manage, isLoading } = this.state;
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
          {manage.map(group => (
            <tbody key={group.manageId} style={{ textAlign: "center" }}>
              <tr>
                <td> {group.repair.repairNumber}</td>
                <td> {group.repair.caseRepair.caseRepairName}</td>
                <td> {group.technic.technicName}</td>
                <td> {group.manageDate}</td>
                <td> {group.repair.repairStatus}</td>
                <td>
                  <Imgg expense={group} />
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
      </Container>
    );
  }
}

export default Tep2;
