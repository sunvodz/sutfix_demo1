import React, { Component } from "react";
import { Container,Table } from "reactstrap";
import "./History.css";
import Add from "./Add";
import firebase from "firebase";
import { withStyles } from "@material-ui/core/styles";
import Service from "../CourseDataService";
const styles = theme => ({
  typography: {
    padding: theme.spacing(2)
  }
});
class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      history: [],
      iduser: [],
      id: "None",
      uid: firebase.auth().currentUser.uid
    };
    this.getCustomer = this.getCustomer.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.getHistory2 = this.getHistory2.bind(this);
  }

  async componentDidMount() {
    this.getCustomer();
    this.getHistory();
    this.getHistory2();
  }

  getCustomer() {
    Service.getCustomer(this.state.uid).then(response => {
      console.log(response);
      this.setState({ iduser: response.data });
    });
  }
  getHistory() {
    Service.getHistory(this.state.uid).then(response => {
      this.setState({ history: response.data, isLoading: false });
    });
  }
  getHistory2() {
    Service.getHistory2(this.state.uid).then(response => {
      this.setState({ history: response.data, isLoading: false });
    });
  }

  componentDidUpdate(){
    this.getHistory2();
}

  render() {
    const { history, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <Container>
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Type to repair</th>
              <th>Date</th>
              <th>Status</th>
              <th>Point</th>
              <th>Review Comment</th>
            </tr>
          </thead>
          {history.map(group => (
            <tbody key={group.historyId} style={{ textAlign: "center" }}>
              <tr>
                <th scope="row" key={group.historyId}>
                  {group.successfulRepair.manage.repair.repairId}
                </th>
                <td>
                  {" "}
                  {
                    group.successfulRepair.manage.repair.caseRepair
                      .caseRepairName
                  }
                </td>
                <td> {group.historyDate}</td>
                <td> {group.successfulRepair.manage.repair.repairStatus}</td>
                <td> {group.point}</td>
                <td> {group.historyComment}</td>

                <td>
                  {" "}
                  <Add expense={group} />{" "}
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

export default withStyles(styles)(History);
