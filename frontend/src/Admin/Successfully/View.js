import React, { Component } from "react";
import { Table } from "reactstrap";
import { CardBody } from "reactstrap";
import "../Admin.css";
import Add from "./Add";

class View extends Component {
  state = {
    isLoading: true
  };

  async componentDidMount() {
    const response4 = await fetch("https://fixsut2019.herokuapp.com/history/");
    const body4 = await response4.json();
    this.setState({ successfully: body4, isLoading: false });
  }

  render() {
    const { successfully, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
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
    );
  }
}

export default View;
