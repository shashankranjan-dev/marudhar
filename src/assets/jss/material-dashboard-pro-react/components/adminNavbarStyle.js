import {
  containerFluid,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
} from "assets/jss/material-dashboard-pro-react.js";

const headerStyle = (theme) => ({
  appBar: {
    backgroundColor: whiteColor,
    // [theme.breakpoints.up("lg")]: {
    //   position: "fixed",
    //   paddingLeft: 250,
    // },
    fontFaimly: "Poppins, Helvetica, sans-serif",
    boxShadow: "none",
    position: "absolute",
    borderBottom: "0",
    marginBottom: "0",
    borderBottom: "1px solid #e0e0e0",
    width: "100%",
    paddingTop: "10px",
    zIndex: "1029",
    color: "#3699FF",
    border: "0",
    borderRadius: "3px",
    padding: "10px 0",
    transition: "all 150ms ease 0s",
    minHeight: "50px",
    display: "block",
  },
  navBarRtBtn: {
    "& .MuiButton-label": {
      color: "#6c7293",
    },
    fontFamily: "var(--fontFamily)",
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: "14px",
    marginRight: "10px",
    "&:hover": {
      color: whiteColor,
    },
    "&:active": {
      color: "#3699ff",
    },
    "&:focus": {
      color: "#3699ff",
    },
    "&:visited": {
      color: "#3699ff",
    },
  },

  container: {
    ...containerFluid,
    minHeight: "50px",
  },
  flex: {
    flex: 1,
  },
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    paddingTop: "0.625rem",
    paddingBottom: "0.625rem",
    margin: "0 !important",
    letterSpacing: "unset",
    "&:hover,&:focus": {
      background: "transparent",
    },
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  info: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  success: {
    backgroundColor: successColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  warning: {
    backgroundColor: warningColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  danger: {
    backgroundColor: dangerColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  sidebarMinimize: {
    float: "left",
    padding: "0 0 0 15px",
    display: "block",
    color: grayColor[6],
  },
  sidebarMinimizeRTL: {
    padding: "0 15px 0 0 !important",
  },
  sidebarMiniIcon: {
    width: "20px",
    height: "17px",
  },
});

export default headerStyle;
