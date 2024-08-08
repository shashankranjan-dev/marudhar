import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import cls from "classnames";
import { grayColor, whiteColor } from "assets/jss/material-dashboard-pro-react";
import {
  appDefaultColor,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from '@mui/icons-material/Update';
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { TitleTwoTone } from "@mui/icons-material";
import { appHoverColor } from "assets/jss/material-dashboard-pro-react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    fontSize: "14px",
    border: "1px solid",
    fontWeight: 400,
    fontFamily: appDefaultFamily,
    textTransform: "none",
    "&:hover": {
      backgroundColor: appDefaultColor,
      color: whiteColor,
    },
    "&:active": {
      backgroundColor: appDefaultColor,
    },
    "&:focus": {
      backgroundColor: appDefaultColor,
    },
    "&:visited": {
      backgroundColor: appDefaultColor,
    },
  },

  closeBtn: {
    width: 100,
    marginRight: "15px",
    color: appDefaultColor,
    borderColor: appDefaultColor,
    fontFamily: appDefaultFamily,
    "&:hover": {
      boxShadow:
        "0 14px 26px -12px rgb(54 153 255 / 42%), 0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(54 153 255 / 20%);",
    },
  },
  fab: {
    color: whiteColor,
    "&:hover": {
      backgroundColor: appHoverColor,
    },
  },
}));

export const ColoseButton = ({
  style,
  onClick,
  children,
  height,
  width,
  name,
}) => {
  const classes = useStyles();
  return (
    <Button
      name={name}
      style={{ height: height, width: width, ...style }}
      className={classes.closeBtn}
      variant="outlined"
      color="primary"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export const CircleAddBtn = ({ disabled,onClick, title, style, nam, size }) => {
  const classes = useStyles();
  return (
    <Tooltip
      style={style}
      title={title}
      color="primary"
      placement="top"
      aria-label="add"
    >
      <Fab
        disableRipple={true}
        size={size}
        color="primary"
        name={name}
        className={classes.fab}
        onClick={onClick}
        disabled={disabled}
      >
  <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export const Collapsible = ({ onClick, title, style, nam, size, buttonAction }) => {
  const classes = useStyles();

  // console.log("sen1606/button", buttonAction)

  return (
    <Tooltip
      style={style}
      title={buttonAction? "collapse" : "Expand"}
      color="primary"
      placement="top"
      aria-label="add"
    >
       { buttonAction?
        <KeyboardArrowUpIcon 
        disableRipple={true}
        size={size}
        onClick={onClick}
        style={{color:"red"}}
        />
        :
        <KeyboardArrowDownIcon 
        disableRipple={true}
        size={size}
        onClick={onClick}
        style={{color:"#3699ff"}}
        />
        }

    </Tooltip>
  );
};


export const CircleUpdateBtn = ({ onClick, title, style, nam, size }) => {
  const classes = useStyles();
  return (
    <Tooltip
      style={style}
      title={title}
      color="primary"
      placement="top"
      aria-label="add"
    >
      <Fab
        disableRipple={true}
        size={size}
        color="primary"
        name={name}
        className={classes.fab}
        onClick={onClick}
      >
  <UpdateIcon />
      </Fab>
    </Tooltip>
  );
};
export const CircleAddBtnAnim = ({ onClick, title, style, nam, size,align,anim }) => {
  const classes = useStyles();

  return (
    <Tooltip
      style={style}
      title={title}
      color="primary"
      placement="top"
      aria-label="add"
    >
      <Fab
        disableRipple={true}
        size={size}
        color="primary"
        name={name}
        className={classes.fab}
        onClick={onClick}
        style={
          anim?
          {backgroundColor:"green", width:"30px",height:"30px",marginTop:"20px"} 
          :
          {backgroundColor:"#3699ff", width:"30px",height:"30px",marginTop:"20px"} 
           }

      >
        {

          anim?<DoneIcon />:<AddIcon />
        }
       {/* { console.log(onClick,"sank27063")} */}
  
      </Fab>
    </Tooltip>
  );
};

export const PaginationButtons = ({ style, onClickNext, onClickPrevious }) => {

  return (
    <div style={{marginTop:15, float: "right", display: "flex", }}>

      <div style={{marginRight: "30px" }}>
        <Tooltip
          style={style}
          title="Previous"
          color="primary"
          placement="right"
          aria-label="add"
        >
          <KeyboardArrowLeftIcon
            disableRipple={true}
            // size={size}
            onClick={onClickPrevious}
            style={{ color: "red",marginRight:25}}
          />
        </Tooltip>
        <Tooltip
          style={style}
          title="Next"
          color="primary"
          placement="right"
          aria-label="add"
        >
          <KeyboardArrowRightIcon
            disableRipple={true}
            // size={size}
            onClick={onClickNext}
            style={{ color: "#66CCFF" }}
          />
        </Tooltip>
      </div>

    </div>
  )
};
const CustomButton = ({
  name,
  children,
  csClass,
  width,
  height,
  color,
  onClick,
  style,
  type,
  fullwidth,
  varient,
  endIcon,
  disabled ,
}) => {
  const classes = useStyles();
  return (
    <Button
      name={name}
      type={type}
      fullwidth={fullwidth}
      endIcon={endIcon}
      onClick={onClick}
      style={{
        width: width,
        height: height,
        color: color,
        ...style,
        backgroundColor: `${appDefaultColor}`,
        color: `${whiteColor}`,
        borderColor: `${appDefaultColor}`,
      }}
      className={cls(classes.root, csClass)}
      disabled={disabled ? disabled :false}

    >
      {children}
    </Button>
  );
};

export default CustomButton;
