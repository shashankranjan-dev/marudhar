import React from "react";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomButton from "../Components/CustomButton";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { appDefaultColor } from "assets/jss/material-dashboard-pro-react";
import { Button } from "@material-ui/core";
import { appSecondColor } from "assets/jss/material-dashboard-pro-react";
import cls from "classnames";
import { whiteColor } from "assets/jss/material-dashboard-pro-react";
import { Tooltip } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: appDefaultColor,
      color: appDefaultColor,
    },
    "&:active": {
      backgroundColor: "transparent",
    },
    "&:focus": {
      backgroundColor: "transparent",
    },
    "&:visited": {
      backgroundColor: "transparent",
    },
  },
  active: {
    borderColor: appDefaultColor,
    color: appDefaultColor,
    border: "2px solid ",
  },
  inactive: {
    borderColor: appSecondColor,
    color: appSecondColor,
    border: "1px solid ",
  },
  switchBtn: {
    background: "tranparent",
    fontSize: 16,
  },
}));

const CardLinkButton = ({ active, link, name }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.categoryCard}>
      <Button
        varient="outlined"
        disableRipple={true}
        style={{
          fontSize: "16px",
          width: "180px",
          height: "60px",
          padding: "10px 20px",
        }}
        className={cls(
          classes.switchBtn,
          classes.root,
          active ? classes.active : classes.inactive
        )}
        onClick={() => history.push(link)}
      >
        {name}
      </Button>
    </div>
  );
};

export default CardLinkButton;
