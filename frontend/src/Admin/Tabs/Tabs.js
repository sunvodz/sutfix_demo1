import InThePocess from '../WaitTheProcess/Event';
import InRepair from '../Repairing/Report';
import SuccessfulRepair from '../SuccessfulRepair/GetBack';
import Successfully from '../Successfully/View';
import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Typography from "@material-ui/core/Typography";
import { Button,
   Table,
   Modal,
   ModalBody,
   FormGroup,
   ModalHeader, } from "reactstrap";
import firebase from "firebase";
import { registerPlugin } from "react-filepond";
import FilePondImagePreview from "filepond-plugin-image-preview";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
registerPlugin(FilePondImagePreview);
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return ["Wait the process", "Repairing", "Successful Repair", "Successfully"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Step 1:Wait the process";
    case 1:
      return "Step 2: Repairing";
    case 2:
      return "Step 3: Successful Repair";
    case 3:
      return "Step 4: Successfully";
    default:
      return "Unknown step";
  }
}

function Tabs() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed] = React.useState({});
  const steps = getSteps();
  const sst = "";
  function totalSteps() {
    return steps.length;
  }

  function isLastStep() {
    return activeStep === totalSteps() - 1;
  }

  function handleNext() {
    const newActiveStep = isLastStep()
      ? steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const handleStep = step => () => {
    setActiveStep(step);
    console.log(step);
  };

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}
              value={sst}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <div>
        <div>
          <Typography className={classes.instructions}>
            {getStepContent(activeStep)}
          </Typography>
          <div>
            {activeStep === 0 ? (
                <InThePocess />
            ) : activeStep === 1 ? (
                <InRepair />
            ) : activeStep === 2 ? (
                <SuccessfulRepair />
            ) : (
                <Successfully />
            )}

            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
              disabled={activeStep === 3}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Tabs;