import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../Components/CustomButton";
import {
  directPurchaseFormRowData,
  addedItemServiceRowData,
  dummyRowData,
} from "../../../services/directPurchaseFormService";
import { getListCustomers } from "../../../services/customerListService";

import { getAllSalesOrderByInvoice } from "../../../services/salesOrderByInvoiceService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Paper } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider, Box } from "@material-ui/core";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import ViewListIcon from "@mui/icons-material/ViewList";

import theme from "../../../theme/theme";
import ReactSelect from "react-select";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import {
  activeText,
  appScrollBar,
} from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";
// import { ColoseButton } from "../Components/CustomButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import CircleAddBtnAnim from "../../Components/CustomButton";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@material-ui/core";
import ItemViewCard from "../HelperComponent/ItemViewCard";
import PageTitle, { PageHeader } from "../HelperComponent/PageTitle";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepProceedModel from "../HelperComponent/StepProceedModel";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

import { Typography } from "@material-ui/core";
import { whiteColor } from "assets/jss/material-dashboard-pro-react";
import { financialYears, currentDate, currentDate1 } from "../HelperComponent/utils";
import { getListUsers } from "../../../services/associateService";
import {
  getAllGroup,
  getAllReference,
  getAllOutstandingData,
  getSearchLedgerVouchers,
  getLedgerClosingBalance,
} from "../../../services/outstandingsalesorderService";

import OutstandingLedgerSalesView from "views/Pages/MisReportPage/OutstandingLedgerSalesView";
import MasterModelForStock from "../../Components/MasterModelForOutstanding";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";

import pdfIcon from "../../../assets/img/pdf-icon.png";
import { jsPDF } from "jspdf";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import autoTable from "jspdf-autotable";
import { dateFormate } from "views/Pages/HelperComponent/utils";
import { RemigrationCustomer, RemigrationItem, RemigrationLedger, RemigrationVendor } from "../../../services/RemigrationService";


const useStyles1 = makeStyles(styles);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: appSecondColor,
    padding: "5px 5px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "10px 5px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  itemImgPaper: {
    marginRight: "15px",
    width: "80px",
    height: "80px",
    overflow: "hidden",
  },
  addBtn: {
    width: 30,
    height: 38,
  },

  searchBar: {
    marginTop: 10,
    marginBottom: 15,
    padding: "15px 20px",
  },
  activeText: {
    ...activeText,
  },
  input: {
    height: 40,
    lineLight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
  actionbtns: {
    marginTop: 20,
    float: "right",
  },

  id: {
    width: "5%",
  },
  doubleFiled: {
    width: "20%",
  },

  action: {
    width: "5%",
  },
  rate: {
    width: "8%",
  },
  value: {
    width: "15%",
  },
  itemImg: {
    width: "8%",
  },
  itemDetails: {
    width: "35%",
  },
  itemDetailsView: {
    width: "50%",
  },
  quantity: {
    width: "20%",
  },
  viewQuantity: {
    width: "20%",
  },
  net_value_field: {
    width: "10%",
  },
  Disc: {
    width: "5%",
  },
  deleteAction: {
    width: "25%",
  },
  Salesman: {
    width: "15%",
  },
  customSelect: {
    marginBottom: 15,
  },
  container: {
    ...appScrollBar,
    maxHeight: 360,
  },
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "22px",
    },
  },
}));

const Remigration = () => {
  const [globalState, dispatch] = useStateValue();
  const [collapsibleRemove, setCollapsibleRemove] = React.useState(false);
  const [collapsibleVendor, setCollapsibleVendor] = React.useState(false);
  const [collapsibleItem, setCollapsibleItem] = React.useState(false);
  const [collapsibleLedger, setCollapsibleLedger] = React.useState(false);

  const [fy, setFy] = useState(financialYears());
  const fetchData = () => {
  };

  React.useEffect(() => {
    fetchData();
  }, []);


  const onClickCustomerRemigration = (e) => {
    RemigrationCustomer(
      fy,
      (r) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Remigratrion Completed", msgType: "success" },
        });
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      })
  }

  const onClickVendorRemigration = (e) => {
    RemigrationVendor(
      fy,
      (r) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Remigratrion Completed", msgType: "success" },
        });
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      })
  }

  const onClickItemRemigrations = (e) => {
    RemigrationItem(
      fy,
      (r) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Remigratrion Completed", msgType: "success" },
        });
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      })
  }

  const onClickLedgerRemigration = (e) => {
    RemigrationLedger(
      fy,
      (r) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Remigratrion Completed", msgType: "success" },
        });
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      })
  }

  const onClickCollapsRemove = () => {
    collapsibleRemove ? setCollapsibleRemove(false) : setCollapsibleRemove(true);
  };

  const onClickCollapsVendor = () => {
    collapsibleVendor ? setCollapsibleVendor(false) : setCollapsibleVendor(true);
  };

  const onClickCollapsItem = () => {
    collapsibleItem ? setCollapsibleItem(false) : setCollapsibleItem(true);
  };

  const onClickCollapsLedger = () => {
    collapsibleLedger ? setCollapsibleLedger(false) : setCollapsibleLedger(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <PageHeader title="Tools > Remigration" />
      <GridContainer>

        {/* customer remigrations */}
        <GridItem xs="12">
          <CustomCard
            cdTitle="Remigration Of Customer"
            btnToolTip={collapsibleRemove ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollapsRemove}
            buttonAction={collapsibleRemove}
            filterIcon
            onClickFilter={() => { }}
          >
            {collapsibleRemove ? (
              <GridContainer
                style={{ padding: "10px" }}
                justifyContent="flex-start"
                alignItems="center"
              >
                <GridItem xs="6">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <CircleAddBtn
                      style={{ size: "small" }}
                      title="Customer Remigration"
                      onClick={onClickCustomerRemigration}
                    />
                  </div>
                </GridItem>
              </GridContainer>
            ) : (
              ""
            )}
          </CustomCard>
        </GridItem>

        {/* vendor remigrations */}
        <GridItem xs="12">
          <CustomCard
            cdTitle="Remigration Of Vendor"
            btnToolTip={collapsibleVendor ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollapsVendor}
            buttonAction={collapsibleVendor}
            filterIcon
            onClickFilter={() => { }}
          >
            {collapsibleVendor ? (
              <GridContainer
                style={{ padding: "10px" }}
                justifyContent="flex-start"
                alignItems="center"
              >
                <GridItem xs="6">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <CircleAddBtn
                      style={{ size: "small" }}
                      title="Vendor Remigration"
                      onClick={onClickVendorRemigration}
                    />
                  </div>
                </GridItem>
              </GridContainer>
            ) : (
              ""
            )}
          </CustomCard>
        </GridItem>

        {/* item remigrations */}
        <GridItem xs="12">
          <CustomCard
            cdTitle="Remigration Of Item"
            btnToolTip={collapsibleItem ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollapsItem}
            buttonAction={collapsibleItem}
            filterIcon
            onClickFilter={() => { }}
          >
            {collapsibleItem ? (
              <GridContainer
                style={{ padding: "10px" }}
                justifyContent="flex-start"
                alignItems="center"
              >
                <GridItem xs="6">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <CircleAddBtn
                      style={{ size: "small" }}
                      title="Item Remigration"
                      onClick={onClickItemRemigrations}
                    />
                  </div>
                </GridItem>
              </GridContainer>
            ) : (
              ""
            )}
          </CustomCard>
        </GridItem>

        {/* ledger account remigrations */}
        <GridItem xs="12">
          <CustomCard
            cdTitle="Remigration Of Ledger Account"
            btnToolTip={collapsibleLedger ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollapsLedger}
            buttonAction={collapsibleLedger}
            filterIcon
            onClickFilter={() => { }}
          >
            {collapsibleLedger ? (
              <GridContainer
                style={{ padding: "10px" }}
                justifyContent="flex-start"
                alignItems="center"
              >
                <GridItem xs="6">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <CircleAddBtn
                      style={{ size: "small" }}
                      title="Ledger Account Remigration"
                      onClick={onClickLedgerRemigration}
                    />
                  </div>
                </GridItem>
              </GridContainer>
            ) : (
              ""
            )}
          </CustomCard>
        </GridItem>
      </GridContainer>

    </ThemeProvider>
  );
};

export default Remigration;
