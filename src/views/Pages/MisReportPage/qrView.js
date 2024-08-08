import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import { useMediaQuery } from "@material-ui/core";
import {
  getAllItem,
  getAllCategory,
  getAllBrands,
  deleteItem,
  getSearchItem,
} from "../../../services/itemsService";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

import InputLabel from "@material-ui/core/InputLabel";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Box, Input, Paper, Grid } from "@material-ui/core";

import { ThemeProvider, Checkbox } from "@material-ui/core";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import PageTitle from "../HelperComponent/PageTitle";

import theme from "../../../theme/theme";

import React, { useRef } from "react";
import { useLocation } from "react-router-dom";

import {
  appDefaultColor,
  reactSelectStyles,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { LaptopWindows, TramRounded } from "@mui/icons-material";
import { currentDate } from "../HelperComponent/utils";
import ReactSelect from "react-select";
import CircularProgress from "@material-ui/core/CircularProgress";
import QRCode from "qrcode.react";
import { currencyFormate } from "../HelperComponent/utils";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from 'file-saver';
import XLSX from 'xlsx'
import MasterModelForPrint from "../../Components/MasterModelForPrint";
import { components } from "react-select/dist/react-select.cjs.prod";
import Buttons from "views/Components/Buttons";

//print
import printStyle from './qr.css'
import ReactToPrint from "react-to-print";

const useStyles1 = makeStyles(styles);

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },

  searchBar: {
    padding: "10px",
  },
  activeText: {
    ...activeText,
  },
  itemLabel: {
    width: 70,
    fontWeight: 500,
    color: appSecondColor,
  },
  modelForm: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 10px",
  },
  itemGrid: {
    marginBottom: 4,
  },
  actionbtn: {
    float: "right",
  },
  qrCodeCenterStyle: {
    padding: "0px 0",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:0,
    marginTop:70,

  },
  print: {
    // border:"solid",
    // paddingTop:"2rem",
    // paddingBottom:"2rem"
    // flexDirection: "column",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    breakBefore: "avoid-page",
    // breakAfter:"page"
    // alignItems: "center",

  },
}));


const QrView = ({ selectedQRItem }) => {
  const classes = useStyles();
  const location = useLocation();
  let componentRef = useRef();
  const printPage = () => {
    // console.log(componentRef, "sen1107")
  }

  let item_box_count = 0
  return (
    <div ref={(el) => (componentRef = el)}>
      <Grid
        container
        justifyContent="left"
        alignItem="left"
        style={{ paddingLeft: 80,paddingRight: 20 ,marginBottom:20,marginTop:20 }}
        
        spacing={5}

      >
        {selectedQRItem.map((item, i) => {
          return (

            <Grid item xs={2.9} >
              {/* {console.log(item, "5656")} */}
              <div 
                style={{ marginBottom:-20,marginTop:20 }}

                // style={{ padding: 0,paddingTop:"0pt",height:"60pt"}}
              >
                <QRCode
                  size={100}
                  style={{ marginTop:30 }}

                  value={`
                        ${item.item_id ? item.item_id : "--"},

                        ${item.brand ? item.brand : "--"} - ${item.category ? item.category : "--"
                    }
                              [${item.item_own_code ? item.item_own_code : "--"}] - ${item.item ? item.item : "--"
                    }
                          Size :  ${item.size ? item.size : "--"}
     

                          MRP - ${currencyFormate(item.mrp)}
                                  `}
                />
                <Box
                  fontFamily={appDefaultFamily}
                  fontWeight={700}
                  fontSize="6pt"
                  width={100}
                  height={30}
                  pt={1}
                  align="center"
                  lineHeight={1}
                  style={{ pageBreakAfter: "avoid" }}
                >{`${item.item_own_code}`}</Box>
              </div>
             
              {/* {
                i === 24 ? <div style={{pageBreakAfter:"avoid"}}> </div> : ""
              } */}

            </Grid>


          );

        })}
      </Grid>


      <ReactToPrint
        bodyClass={printStyle.print}
        trigger={() =>
          <Button
            style={{ background: "#5a7326", float: "right" }}
            variant="outlined"
          >
            Print
          </Button>}
        content={() => componentRef}
      />
    </div>

  )
}

export default QrView;