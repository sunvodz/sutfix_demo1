import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import StarRatingComponent from "react-star-rating-component";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import Service from "../CourseDataService";
import firebase from "firebase";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}
const styles = theme => ({
  typography: {
    padding: theme.spacing(2)
  }
});
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      comments: "",
      historyids: "",
      isLoading: true,

      history1: [],
      rating: Number,

      idre: "",
      idImgs: "",
      img: "",

      imgsa: [],
      repair: [],

      comment: "",
      status: "",
      case: "",
      date: "",
      idU: "",
      id: "",
      caseT: "",
      Tec: "",
      meeting: ""
    };

    this.toggle = this.toggle.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.getHistory2 = this.getHistory2.bind(this);
    this.getUrlImg = this.getUrlImg.bind(this);
  }

  async componentDidMount() {
    this.getHistory();
    this.getHistory2();
    this.setState({
      historyids: this.props.expense.historyId,
      rating: this.props.expense.point,
      idre: this.props.expense.successfulRepair.manage.repair.repairNumber,
      idImgs: this.props.expense.successfulRepair.manage.repair.repairImage,
      idU: this.props.expense.successfulRepair.manage.repair.customer
        .customerName,
      comment: this.props.expense.successfulRepair.manage.repair.comment,
      status: this.props.expense.successfulRepair.manage.repair.repairStatus,
      case: this.props.expense.successfulRepair.manage.repair.caseRepair
        .caseRepairName,
      date: this.props.expense.successfulRepair.manage.repair.repairDate,
      caseT: this.props.expense.successfulRepair.caseFromTec,
      Tec: this.props.expense.successfulRepair.manage.technic.technicName,
      meeting: this.props.expense.successfulRepair.meeting
    });

    console.log(this.state.idImgs, this.state.idre);
    console.log(this.state.historyids);
  }
  onStarClick(nextValue) {
    this.setState({ rating: nextValue });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.getUrlImg();
  }

  getUrlImg() {
    let storageRef = firebase.storage().ref();
    var starsRef = storageRef.child("imgRepair/" + this.state.idImgs);
    starsRef
      .getDownloadURL()
      .then(url => this.setState({ img: url, isUploading: false }));
    console.log(this.state.img);
  }

  async upHistory() {
    await fetch(
      "http://localhost:8080/uphistory/" +
        this.state.historyids +
        "/" +
        this.state.comments +
        "/" +
        this.state.rating,
      {
        method: "PUT"
      }
    );

    console.log("PUT Success");
    console.log(this.state.comments);
    console.log(this.state.rating);
    console.log(this.state.historyids);
    this.getHistory();
    this.getHistory2();
    this.toggleclo();
  }
  getHistory() {
    Service.getHistory(this.state.uid).then(response => {
      console.log(response);
      this.setState({ history1: response.data, isLoading: false });
    });
  }
  getHistory2() {
    Service.getHistory2(this.state.uid).then(response => {
      console.log(response);
      this.setState({ history1: response.data, isLoading: false });
    });
    
  }
  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
    this.upHistory();
    
  };
  handleClose = Transition => () => {
    this.setState({ open: false, Transition });
  };
  SelectComment = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(this.state.comments);
  };

  toggleclo = () => {
    this.setState(prevState => ({
        modal: !prevState.modal
    }));
}

  render() {
    const { comments, rating, date, id } = this.state;
    return (
      <div>
        <Button color="success" onClick={this.toggle}>
          {this.props.buttonLabel} My Reviews{" "}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="nav">
          <ModalHeader toggle={this.toggle}>My Reviews</ModalHeader>
          <ModalBody>
            <FormGroup>
              <br />

              <Card>
                <CardHeader
                  avatar={<Avatar aria-label="Recipe">{id}</Avatar>}
                  title={this.state.idre}
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
                    <b>Status: </b>
                    {this.state.status}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <b>Case: </b>
                    {this.state.case}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <b>CaseFromTecnic: </b>
                    {this.state.caseT}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <b>NameTecnic: </b>
                    {this.state.Tec}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <b>Meeting: </b>
                    {this.state.meeting}
                  </Typography>
                </CardContent>
              </Card>

              <h2>Review Vote : {rating}</h2>
              <StarRatingComponent
                name="rate2"
                starCount={5}
                value={rating}
                className="rating-stars"
                onStarClick={this.onStarClick.bind(this)}
              />
              <br />
              <Label for="exampleText">Comment</Label>
              <Input
                type="textarea"
                name="comments"
                id="comments"
                value={comments}
                onChange={this.SelectComment}
              />
            </FormGroup>
            <ModalFooter>
              <Button
                color="primary"
                onClick={this.handleClick(TransitionDown)}
              >
                Review
              </Button>{" "}
            </ModalFooter>
          </ModalBody>
        </Modal>

        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Repair Review Confirm</span>}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Add);
