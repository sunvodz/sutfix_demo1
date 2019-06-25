import React, { Component } from 'react';
import 'bulma/css/bulma.css'
import {
  FormGroup,
  Label,
  Button,
  Container,
  Row,
  Col,
  Form,
  Input,
  CardBody
} from "reactstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Service from "../CourseDataService";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import firebase,{storage, database} from "firebase";
import FileUploader from "react-firebase-file-uploader";

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

class Repair extends Component {
  

  constructor(props) {

    super(props);
    this.state = {
      iduser: [],
      id: 'None', uid: firebase.auth().currentUser.uid,
      
      file: '',
      error: '',
      msg: '',
      imgs:'',
      asas:'',
      imgsa:[],

      repair:[],

      comments: '',
      caserepair: '',
      showText: [], caseSelect: true,
      open: false,
      groups: [], isLoading: true,

      image: '',
      imagedd:'',
      isUploading: false,
      progress: 0,
      imageURL: ''
    }

    this.getCustomer = this.getCustomer.bind(this);
    this.getCaseRepair = this.getCaseRepair.bind(this);
    this.addRepair = this.addRepair.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);

  
}

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getCustomer();
    this.getCaseRepair();      
  }
  getCustomer() {
    Service.getCustomer(this.state.uid).then(response => {
      console.log(response);
      this.setState({ iduser: response.data });
    });
  }
  getCaseRepair() {
    Service.getCaseRepair().then(response => {
      console.log(response);
      this.setState({ groups: response.data , isLoading: false});
    });
  }
  addRepair() {
    Service.postRepair(this.state.comments,this.state.image,this.state.uid,this.state.caserepair).then(response => {
    });
    console.log("POST Success")
    console.log(this.state.comments)
    console.log(this.state.caserepair)
    console.log(this.state.uid)
    console.log(this.state.image)
  }

  handleChangeSelect(event) {
    this.setState({ caserepair: event.target.value });
    console.log(this.state.caserepair);
  };
  SelectComment = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  onChangeImg = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
    this.addRepair();
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ image: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("imgRepair")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ imageURL: url }));
  };

  detele = () => {

    let storageRef = firebase.storage().ref();
    storageRef.child('imgRepair/'+this.state.image).delete().then(url => this.setState({ imageURL: url }));
    console.log("delete Success")

  }

  render() {
    
    const { comments, groups } = this.state;
console.log(this.state);
    return (
      <div className="Margin-25">
        <Container>
          <Row>
            <Col>
              <Form>
                <CardBody>
                  <FormGroup >
                  <Label for="exampleCheckbox">Repair Cause</Label>
                    <br />
                   
                    <Select
                      style={{
                        width: "60%"
                      }}
                      defaultValue={this.state.caserepair}
                      value={this.state.caserepair}
                      onChange={this.handleChangeSelect}
                      inputprops={{
                        readOnly: this.state.showText ? false : true,
                      }}
                    >
                      {groups.map(casess => (
                        <MenuItem key={casess.caseRepairId} value={casess.caseRepairId} >
                          {casess.caseRepairName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <Label >More Details</Label>
                    <Input type="textarea"
                      name="comments" id="comments"
                      value={comments}
                      onChange={this.SelectComment}
                    />
                  </FormGroup>

                </CardBody>
              </Form>
            </Col>

            <Col>
              <Form>
                <CardBody>

  <h3>Upload a file</h3>
<br/>
  
  {this.state.isUploading && <ProgressBar animated now={this.state.progress} label={this.state.progress} />}
  {this.state.imageURL && <img src={this.state.imageURL} width="50%" height="50%"/>}
  <br/><br/>
  {this.state.imageURL && <DeleteForeverIcon onClick={this.detele} />}
  <br/><br/>


  <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'}}>
    Upload Image Computer
    <FileUploader
      hidden
      accept="image/*"
      storageRef={firebase.storage().ref('imgRepair')}
      onUploadStart={this.handleUploadStart}
      onUploadError={this.handleUploadError}
      onUploadSuccess={this.handleUploadSuccess}
      onProgress={this.handleProgress}
      
    />
  </label>


                </CardBody>
              </Form>
            </Col>

          </Row>
          <br /><br />

          <div align="center" >
            <Button color="success" onClick={this.handleClick(TransitionDown)}>
              Confirm
          </Button></div>

          <br /><br />
        </Container>

        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Repair Confirm</span>}
        />
      </div>
    );
  }

}

export default Repair;
