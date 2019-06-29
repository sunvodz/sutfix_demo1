import React, { Component } from 'react';
import '../Admin.css';
import {
    Button,
    Table,
    ButtonGroup,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CardBody,
    Container
} from "reactstrap";
import Detail from './DetailTec';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Service from '../CourseDataService';
class User extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        isLoading: true,
        technic: []
    };
    this.getTechnic = this.getTechnic.bind(this);
}

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/technic/');
        const body = await response.json();
        this.setState({ technic: body, isLoading: false });
        this.getTechnic();
    }

    componentDidUpdate(prevProps,prevState){
            this.getTechnic();
      }

      getTechnic = () => {
        Service.getTechnic().then(response => {
          this.setState({ technic: response.data});
        });
      }

  
    
    render() {

        const { technic, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (

            <Container>

                <FormGroup>
                    <Label for="exampleName"> Search </Label>
                    <Input
                        className="GG"
                        bsSize="lg"
                        name="name"
                        id="exampleName" />
                </FormGroup>


                <br />

                <Table className='table'>

                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <td>
                                <Add />
                            </td>
                        </tr>
                    </thead>

                    {technic.map(group =>
                        <tbody key={group.technicId} style={{ textAlign: "center" }}>
                            <tr>
                                <th scope="row">{group.technicId}</th>
                                <td>{group.technicName}</td>
                                <td>{group.technicPhone}</td>

                                <td>
                                    <ButtonGroup>
                                        <Edit expense={group}/>
                                    </ButtonGroup>
                                </td>

                                <td>
                                    <ButtonGroup>
                                        <Detail expense={group}/>
                                    </ButtonGroup>
                                </td>

                            </tr>
                        </tbody>)}
                </Table>

            </Container>


        );
    }
}

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

class Add extends React.Component {

    constructor(props) {
        super(props);

        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeInstitute = this.handleChangeInstitute.bind(this);
        this.handleChangeMajor = this.handleChangeMajor.bind(this);
        this.handleChangeTelephone = this.handleChangeTelephone.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            number: '',
            name: '',
            institute: '',
            major: '',
            telephone: '',
            open: false,
            modal: false,
            showText: [],caseSelect: true,
            groups: [], isLoading: true,
            groups2: []
        };
        this.toggle = this.toggle.bind(this);
    }

    onClick = Transition => () => {
        this.setState({ open: true, Transition });
        this.handleSubmit();
        this.toggle();
    };

    offClick = () => {
        this.setState({ open: false });
    };

    handleChange(event) {
        if (event.target.number === "number") {
            this.setState({
                number: event.target.value
            });
        }
        if (event.target.name === "name") {
            this.setState({
                name: event.target.value
            });
        }
        if (event.target.institute === "institute") {
            this.setState({
                institute: event.target.value
            });
        }
        if (event.target.majo === "major") {
            this.setState({
                major: event.target.value
            });
        }
        if (event.target.telephone === "telephone") {
            this.setState({
                telephone: event.target.value
            });
        }
    }

    async handleSubmit() {

        await fetch('http://localhost:8080/technic/' + this.state.number + '/' + this.state.name + '/'
            + this.state.telephone + '/' + this.state.major + '/' + this.state.institute, {
                method: 'POST'
            });
            console.log(this.state.institute)
            console.log(this.state.major)
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch('http://localhost:8080/major')
            .then(response => response.json())
            .then(data => this.setState({ groups2: data, isLoading: false }));

        fetch('http://localhost:8080/institute')
            .then(response => response.json())
            .then(data => this.setState({ groups: data, isLoading: false }));
    }

    handleChangeNumber(event) {
        this.setState({ number: event.target.value });
        console.log(this.state.number);
    };

    handleChangeName(event) {
        this.setState({ name: event.target.value });
        console.log(this.state.name);
    };

    handleChangeInstitute(event) {
        this.setState({ institute: event.target.value });
        console.log(this.state.institute);
    };

    handleChangeMajor(event) {
        this.setState({ major: event.target.value });
        console.log(this.state.major);
    };

    handleChangeTelephone(event) {
        this.setState({ telephone: event.target.value });
        console.log(this.state.telephone);
    };

    handleClickShowText = () => {
        this.setState(state => ({ showText: !state.showText }));
    };

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const {  groups,groups2 } = this.state;
        return (
            <Container>
            <div >
                <Button color="success" onClick={this.toggle}>{this.props.buttonLabel} Add </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="nav">
                    <ModalHeader toggle={this.toggle}>Technician</ModalHeader>
                    <ModalBody >

                        <FormGroup>
                            <Label for="exampleName"> Student Number</Label>
                            <Input
                                id="number"
                                label="Number"
                                htmlFor="number"

                                value={this.state.number}
                                onChange={this.handleChangeNumber}
                                inputprops={{
                                    readOnly: this.state.showText ? false : true,
                                }} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleName"> Name </Label>
                            <Input
                                id="name"
                                label="Name"
                                htmlFor="name"

                                value={this.state.name}
                                onChange={this.handleChangeName}
                                inputprops={{
                                    readOnly: this.state.showText ? false : true,
                                }} />
                        </FormGroup>

                        <FormGroup >
                            <Label for="exampleCheckbox">institute</Label>
                            <br />

                            <Select
                                style={{
                                    width: "80%",
                                    left: "10%"
                                }}
                                defaultValue={this.state.institute}
                                value={this.state.institute}
                                onChange={this.handleChangeInstitute}
                                inputprops={{
                                    readOnly: this.state.showText ? false : true,
                                }}
                            >
                                {groups.map(casess => (
                                    <MenuItem key={casess.instituteName} value={casess.instituteName} >
                                        {casess.instituteName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormGroup>

                        <FormGroup >
                            <Label for="exampleCheckbox">major</Label>
                            <br />

                            <Select
                                style={{
                                    width: "80%",
                                    left: "10%"
                                }}
                                defaultValue={this.state.major}
                                value={this.state.major}
                                onChange={this.handleChangeMajor}
                                inputprops={{
                                    readOnly: this.state.showText ? false : true,
                                }}
                            >
                                {groups2.map(casess => (
                                    <MenuItem key={casess.majorName} value={casess.majorName} >
                                        {casess.majorName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleName"> Telephone Number </Label>
                            <Input
                                id="telephone"
                                label="Telephone"
                                htmlFor="telephone"

                                value={this.state.telephone}
                                onChange={this.handleChangeTelephone}
                                inputprops={{
                                    readOnly: this.state.showText ? false : true,
                                }} />
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onClick(TransitionDown)} >Add</Button>{''}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>


            </div>
            </Container>
        );
    }
}


class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            technic:[],
            idte:'',
            number: '',
            name: '',
            phone: '',
            institute: '',
            major: '',
            groups2:[],
            groups:[],
            showText: [],
            showText2: [],
        };

        this.toggle = this.toggle.bind(this);
        this.SelectMajor = this.SelectMajor.bind(this);
        this.SelectInstitute = this.SelectInstitute.bind(this);

    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    upTec = () => {
        fetch('http://localhost:8080/upTec/' + this.state.number +'/'
        +this.state.name+'/'+this.state.phone+'/'+this.state.institute+'/'
        +this.state.major+'/'+this.state.idte, {
          method: "PUT"
        });
        console.log("PUT Success");
        console.log(this.state);
        this.toggleclo();
      }
      toggleclo = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentDidMount() {
        fetch('http://localhost:8080/major')
        .then(response => response.json())
        .then(data => this.setState({ groups2: data, isLoading: false }));

    fetch('http://localhost:8080/institute')
        .then(response => response.json())
        .then(data => this.setState({ groups: data, isLoading: false }));


        this.setState({
            idte: this.props.expense.technicId,
            number: this.props.expense.technicNumber,
            name: this.props.expense.technicName,
            phone: this.props.expense.technicPhone,
          });
    }


    SelectNumber = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }

      SelectName = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }


      SelectInstitute(event) {
        this.setState({ institute: event.target.value });
        console.log(this.state.institute);
      };

      SelectMajor(event) {
        this.setState({ major: event.target.value });
        console.log(this.state.major);
      };
      SelectPhone = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }
    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel} Edit </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} className="nav">
                    <ModalHeader toggle={this.toggle}>Technician</ModalHeader>
                    <ModalBody>

                        <FormGroup>
                    <Label >Number</Label>
                    <Input type="text"
                      name="number" id="number"
                      value={this.state.number}
                      onChange={this.SelectNumber}
                    />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleName"> Name </Label>
                    <Input type="text"
                      name="name" id="name"
                      value={this.state.name}
                      onChange={this.SelectName}
                    />
                        </FormGroup>

                 

                        <FormGroup >
                            <Label for="exampleCheckbox">institute</Label>
                            <br />

                            <Select
                                style={{
                                    width: "80%",
                                    left: "10%"
                                }}
                                defaultValue={this.state.institute}
                                value={this.state.institute}
                                onChange={this.SelectInstitute}
                                inputprops={{
                                    readOnly: this.state.showText ? false : true,
                                }}
                            >
                                {this.state.groups.map(casess => (
                                    <MenuItem key={casess.instituteId} value={casess.instituteId} >
                                        {casess.instituteName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormGroup>

                        <FormGroup >
                            <Label for="exampleCheckbox">major</Label>
                            <br />

                            <Select
                                style={{
                                    width: "80%",
                                    left: "10%"
                                }}
                                defaultValue={this.state.major}
                                value={this.state.major}
                                onChange={this.SelectMajor}
                                inputprops={{
                                    readOnly: this.state.showText2 ? false : true,
                                }}
                            >
                                {this.state.groups2.map(casess => (
                                    <MenuItem key={casess.majorId} value={casess.majorId} >
                                        {casess.majorName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleName"> Telephone Number </Label>
                           
                                <Input type="text"
                                name="phone" id="phone"
                                value={this.state.phone}
                                onChange={this.SelectPhone}
                              />
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.upTec}>Edit</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>


            </div>
        );
    }
}

export default User;
