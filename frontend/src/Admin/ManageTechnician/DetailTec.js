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
import firebase from "firebase";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Service from '../CourseDataService';
import { number } from "prop-types";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}
const styles = theme => ({
  typography: {
    padding: theme.spacing(2)
  }
});



class DetailTec extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tecid:'',
      tecnum:'',
      tecname:'',
      tecphone:'',
      tecma:'',
      tecin:'',
      pp: 0,
      tec1:[],
      i:0,
      tecc: Number,
      pointh: 0,
      apoint: Number,
      TAX_RATE: 0,
      sumpoint:0,
      invoiceTaxes:0,
      invoiceTotal:0,
      sum:0,
      sumid:0,
      sumida:0
    };
    this.toggle = this.toggle.bind(this);
    this.getTechnicPointss = this.getTechnicPointss.bind(this);
    this.subtotal = this.subtotal.bind(this);
    
  }

  async componentDidMount() {
    this.setState({
      tecid: this.props.expense.technicId,
      tecnum: this.props.expense.technicNumber,
      tecname: this.props.expense.technicName,
      tecphone: this.props.expense.technicPhone,
      tecma: this.props.expense.major.majorName,
      tecin: this.props.expense.institute.instituteName,
    });
  }
  componentDidUpdate(prevProps,prevState){
    if (this.state.sumpoint !== this.subtotal(this.state.tec1)) {
      console.log("daffffff");
      this.getTechnicPointss();
  }
}


  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.getTechnicPointss();
  }

  getTechnicPointss = () => {
    Service.getTechnicPointss(this.state.tecid).then(response => {
      this.setState({ tec1: response.data});
    });
    this.state.sumpoint = this.subtotal(this.state.tec1);
    this.state.sumid = this.state.tec1.length;
    this.state.invoiceTotal = this.state.sumpoint / this.state.sumid;
  }

  subtotal = (items) => {
    return items.map(({ point }) => point).reduce((sum, i) => sum + i, 0);
  }

  render() {
    
    return (
      <div>
        <Button color="success" onClick={this.toggle}>
          {this.props.buttonLabel} Detail Technic
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="nav">
          <ModalHeader toggle={this.toggle}>Detail Technic</ModalHeader>
          <ModalBody>
            <FormGroup>
              <br />
              
              <Card>
                <CardContent>
                
                  <Typography variant="body2" component="p">
                    <b>TechnicId : </b>
                    {this.state.tecid}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <b>TechnicNumber : </b>
                    {this.state.tecnum}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <b>TechnicName : </b>
                    {this.state.tecname}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <b>TechnicPhone : </b>
                    {this.state.tecphone}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <b>TechnicMajor : </b>
                    {this.state.tecma}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <b>TechnicInstitute : </b>
                    {this.state.tecin}
                  </Typography>
                  <Typography variant="body2" component="p">
                  <b>TechnicAveragePoint : </b>
                  {this.state.invoiceTotal}

                </Typography>
                </CardContent>
              </Card>



            </FormGroup>
          </ModalBody>
        </Modal>


      </div>
    );
  }
}

export default withStyles(styles)(DetailTec);
