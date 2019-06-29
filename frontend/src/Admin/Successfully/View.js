import React, { Component } from "react";
import { Table } from "reactstrap";
import { CardBody,Container } from "reactstrap";
import "../Admin.css";
import Add from "./Add";

class View extends Component {
  state = {
    isLoading: true
  };

  async componentDidMount() {
    const response4 = await fetch("http://localhost:8080/history/");
    const body4 = await response4.json();
    this.setState({ successfully: body4, isLoading: false });
  }
  async componentDidUpdate(){
    const response4 = await fetch("http://localhost:8080/history/");
    const body4 = await response4.json();
    this.setState({ successfully: body4, isLoading: false });
  }

  render() {
    const { successfully, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <Container>
      <CardBody>
        <Table hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Cause</th>
              <th>Repairing date</th>
              <th>Completed Date</th>
              <th>Point</th>
              <th>Comment</th>
            </tr>
          </thead>

          {successfully.map(group => (
            <tbody key={group.historyId} style={{ textAlign: "center" }}>
              <tr>
                <td>
                  {" "}
                  {group.successfulRepair.manage.repair.customer.customerName}
                </td>
                <td>
                  {" "}
                  {
                    group.successfulRepair.manage.repair.caseRepair
                      .caseRepairName
                  }
                </td>
                <td> {group.successfulRepair.manage.repair.repairDate}</td>
                <td> {group.historyDate}</td>
                <td> {group.point}</td>
                <td> {group.historyComment}</td>
                <td>
                  {" "}
                  <Add expense={group} />
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

export default View;
