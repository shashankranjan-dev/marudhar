import { appSecondColor } from "assets/jss/material-dashboard-pro-react";
import {
  container,
  cardTitle,
  whiteColor,
  grayColor,
} from "assets/jss/material-dashboard-pro-react.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import BgImage from "./marudhar.jpg";

const loginPageStyle = (theme) => ({
  ...customCheckboxRadioSwitch,
  loginPage: {
    position: "relative",
    height: "100%",
  },
  container: {
    overflow: "hidden",
    // ...container,
    zIndex: "4",
    width: "100%",
    height: "100vh",
    // [theme.breakpoints.down("sm")]: {
    //   paddingBottom: "100px",
    // },
  },
  cardTitle: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: 300,
    color: "#000",
    fontFaimly: "Poppins, Helvetica, sans-serif",
  },
  textCenter: {
    textAlign: "center",
  },
  loginLeftPanel: {
    position: "relative",
    backgroundRepeat: "no-repeat",
  },
  appLoginImgDiv: {
    overflow: "hidden",
    zIndex: -1,
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: "100%",
  },
  loginBgImg: {
    width: "100%",
    height: "100%",
  },
  appLogo: {
    zIndex: 2,
    marginBottom: 10,
    marginLeft: -13,
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "flex-start",
  },
  appLogoImg: {
    height: 100,
    width: 300,
  },
  justifyContentCenter: {
    marginBottom: "30px",
    justifyContent: "center !important",
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: whiteColor,
    },
    marginLeft: "5px",
    marginRight: "5px",
  },
  inputAdornment: {
    marginRight: "18px",
  },
  inputAdornmentIcon: {
    color: grayColor[6],
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)",
  },
  cardHeader: {
    marginBottom: "20px",
  },
  socialLine: {
    padding: "0.9375rem 0",
  },
});

export default loginPageStyle;
