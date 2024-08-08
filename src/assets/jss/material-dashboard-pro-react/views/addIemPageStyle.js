import { activeText } from "assets/jss/material-dashboard-pro-react";
import {
  container,
  defaultFont,
  cardTitle,
  roseColor,
  whiteColor,
  grayColor,
  blackColor,
  appLabelFont,
  appSecondColor,
  appFontWeight,
  appDefaultFamily,
  hexToRgb,
} from "assets/jss/material-dashboard-pro-react.js";

const addItemPageStyle = (theme) => ({
  formCard: {},
  browseBtn: {
    fontFamily: "Poppins, Helvetica, sans-serif",
    float: "right",
    marginTop: theme.spacing(2),
  },
  marginRight20: {
    marginRight: "20px",
  },
  descInput: {
    fontFamily: "Poppins, Helvetica, sans-serif",
    padding: 5,
    width: "100%",
    height: "100px",
  },
  activeText: {
    ...activeText,
  },

  customSelectTwo: {
    // marginTop: 15,
    marginBottom: 10,
  },
  customSelect: {
    marginBottom: 15,
  },
  ddlError: {
    textAlign: "right",
    color: "#f44336",
    fontSize: "12.6px",
    marginRight: 15,
    marginTop: -15,
    fontWeight: 400,
  },

  imgPrv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: blackColor,
    fontSize: "20px",
    marginTop: theme.spacing(2),
    width: "100%",
    height: "150px",
    overflow: "hidden",
    backgroundColor: grayColor[5],
  },
  itemImg: {
    objectFit: "contain",
    width: "100%",
  },
  container: {
    marginTop: 10,
  },
  floatRight: {
    float: "right",
  },
  select: {
    fontFamily: "Poppins, Helvetica, sans-serif",
    borderRadius: "4px",
    borderWidth: "2px",
    height: "35px",
    width: "100%",
  },
  input: {
    fontFamily: "Poppins, Helvetica, sans-serif",
    width: "100%",
  },
  title: {
    fontFamily: "Poppins, Helvetica, sans-serif",
    fontSize: "30px",
    color: blackColor,
  },
  description: {
    fontFamily: "Poppins, Helvetica, sans-serif",
    fontSize: "18px",
    color: whiteColor,
    textAlign: "center",
  },
  fontFamily: {
    fontFamily: "Poppins, Helvetica, sans-serif",
  },
  cardTitleWhite: {
    fontFamily: "Poppins, Helvetica, sans-serif",
    ...cardTitle,
    color: whiteColor + " !important",
  },
  cardCategory: {
    color: grayColor[0],
    marginTop: "10px",
  },
  actionbtn: {
    marginTop: 10,
    fontFamily: "Poppins, Helvetica, sans-serif",
    float: "right",
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

  ddlError: {
    textAlign: "right",
    color: "#f44336",
    fontSize: "12px",
    marginRight: 15,
    marginTop: -15,
    fontWeight: 400,
  },
});

export default addItemPageStyle;
