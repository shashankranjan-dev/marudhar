import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { Box, Grid, makeStyles } from "@material-ui/core";
import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
} from "assets/jss/material-dashboard-pro-react";

const useStyles = makeStyles((theme) => ({
  textColor: {
    color: appSecondColor,
  },
  stepContainer: {
    padding: "8px 0",
  },
}));

const StepProceedModel = ({ step, title, desc, generateNo, isStep = true }) => {
  const classes = useStyles();
  return (
    <Box p={1}>
      <Grid container>
        {isStep && (
          <Grid item xs={12}>
            <Box >
              <Stepper
                alternativeLabel
                className={classes.stepContainer}
                activeStep={step}
              >
                <Step active={false}>
                  <StepLabel>Enquiry</StepLabel>
                </Step>
                <Step active={false}>
                  <StepLabel>Quotation</StepLabel>
                </Step>
                <Step active={false}>
                  <StepLabel>Sales Order</StepLabel>
                </Step>
                <Step active={false}>
                  <StepLabel>Delivery Order</StepLabel>
                </Step>
                <Step active={false}>
                  <StepLabel>Dispatch</StepLabel>
                </Step>
                <Step active={false}>
                  <StepLabel>Invoice</StepLabel>
                </Step>
              </Stepper>
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box textAlign="center">
            <Box
              pt={2}
              mb={3}
              fontWeight={500}
              className={classes.textColor}
              fontSize="1.3rem"
              fontFamily={appDefaultFamily}
            >
              <Box fontSize="2.6rem" color="#66b032">
                {title}
              </Box>
            </Box>
            <Box
            
              mb={4}
              fontSize="1.3rem"
              fontWeight={500}
              className={classes.textColor}
              fontFamily={appDefaultFamily}
            >
              {desc} : {generateNo}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepProceedModel;
