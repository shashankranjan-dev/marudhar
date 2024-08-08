import {
  container,
  defaultFont,
  cardTitle,
  roseColor,
  whiteColor,
  grayColor,
  blackColor,
  hexToRgb,
} from "assets/jss/material-dashboard-pro-react.js";

const itemgPageStyle = (theme) => ({
  root: {
    "& .MuiTableCell-body": {
      padding: "10px 15px",
    },
    "& .MuiSvgIcon-root": {
      color: "#3E64BB",
    },
    "& .MuiPaper-rounded": {
      borderRadius: 0,
    },
  },
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px",
    },
  },
  title: {
    fontSize: "30px",
    color: blackColor,
  },
  tableHeader: {
    backgroundColor: "#3E64BB",
    color: whiteColor,
  },
  tlbHeadCel: {
    color: whiteColor,
  },
  description: {
    fontSize: "18px",
    color: whiteColor,
    textAlign: "center",
  },
  cardTitleWhite: {
    ...cardTitle,
    color: whiteColor + " !important",
  },
  cardCategory: {
    color: grayColor[0],
    marginTop: "10px",
  },
  cardCategoryWhite: {
    color: whiteColor,
    marginTop: "10px",
  },
  icon: {
    color: "rgba(" + hexToRgb(whiteColor) + ", 0.76)",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid " + grayColor[11],
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px",
    },
  },
  iconWhite: {
    color: whiteColor,
  },
  iconRose: {
    color: roseColor[0],
  },
  marginTop30: {
    marginTop: "30px",
  },
});

export default itemgPageStyle;
