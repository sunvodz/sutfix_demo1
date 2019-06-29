import React, { Component } from "react";
import { Table, FormGroup, Label, Input, CardBody,Container } from "reactstrap";

import "../Admin.css";

import "bulma/css/bulma.css";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "react-images-uploader/styles.css";
import "react-images-uploader/font.css";
import FilePondImagePreview from "filepond-plugin-image-preview";
import { registerPlugin } from "react-filepond";

registerPlugin(FilePondImagePreview);

class GetBack extends Component {
  state = {
    isLoading: true
  };

  async componentDidMount() {
    const response3 = await fetch(
      "http://localhost:8080/allstatusSuccessfulRepair/"
    );
    const body3 = await response3.json();
    this.setState({ successfulRepair: body3, isLoading: false });
  }

  async componentDidUpdate(){
    const response3 = await fetch(
      "http://localhost:8080/allstatusSuccessfulRepair/"
    );
    const body3 = await response3.json();
    this.setState({ successfulRepair: body3, isLoading: false });
}

  render() {
    const { successfulRepair, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <Container>
      <div>
        <CardBody>
          <Table hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Technic Name</th>
                <th>Technic Phone</th>
                <th>Case</th>
                <th>Case Frome Technic</th>
                <th>Meeting</th>
                <th>SuccessfulRepair Date</th>
                <th>Status</th>
              </tr>
            </thead>

            {successfulRepair.map(group => (
              <tbody
                key={group.successfulRepairId}
                style={{ textAlign: "center" }}
              >
                <tr>
                  <th>{group.manage.repair.customer.customerName}</th>
                  <th>{group.manage.technic.technicName}</th>
                  <th>{group.manage.technic.technicPhone}</th>
                  <td> {group.manage.repair.caseRepair.caseRepairName}</td>
                  <td> {group.caseFromTec}</td>
                  <td> {group.meeting}</td>
                  <td> {group.successfulRepairDate}</td>
                  <td> {group.manage.repair.repairStatus}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </CardBody>
      </div>
      </Container>
    );
  }
}

export default GetBack;
