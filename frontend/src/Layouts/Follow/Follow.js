import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Typography from "@material-ui/core/Typography";
import {Container, Button} from "reactstrap";
import "./Follow.css";

import Tep1 from "./Tep1";
import Tep2 from "./Tep2";
import Tep3 from "./Tep3";
import Tep4 from "./Tep4";

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

function Follow() {
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
    <Container>
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
              <Tep1 />
            ) : activeStep === 1 ? (
              <Tep2 />
            ) : activeStep === 2 ? (
              <Tep3 />
            ) : (
              <Tep4 />
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
    </Container>
  );
}

export default Follow;
