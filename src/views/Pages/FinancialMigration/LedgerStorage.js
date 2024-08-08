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

import { brandReportInsert,getListLedgerAccount } from "../../../services/ledgerStorageService";
import { ledgerStorageInsert } from "../../../services/financialMigrationService";
import { ledgerStorageDrop, migrateLedgerAccountUpdate } from "../../../services/financialMigrationService";
import { getAllBrands } from "../../../services/updateItemStockService";
import { getItemByBrand } from "../../../services/showroomClosingService";
import { getListShowroomWarehouse } from "../../../services/financialMigrationService";
import { showroomWiseSalesData } from "../../../services/ledgerStorageService";

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

const LedgerStorage = () => {
  const classes1 = useStyles1();
  const history = useHistory();
  const [loading, setLoading] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [outstanding, setOutstanding] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState( {
    txt_from_date:currentDate1(),
    txt_to_date:currentDate(),
  });
  const [allBrands, setAllBrands] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [itemList, setItemList] = React.useState([]);
  const [collapsibleRemove, setCollapsibleRemove] = React.useState(false);
  const [collapsible, setCollapsible] = React.useState(false);
  const [collapsibleLedger, setCollapsibleLedger] = React.useState(false);
  const [collapsibleItemStock, setCollapsibleItemStock] = React.useState(false);
  const [itemStockButton, setItemStockButton] = React.useState(false);
  const [addItem, setAddItem] = React.useState({
    category: "",
    sales_id: "",
    item_id: "",
    category_id: "",
  });
  const [ledgerAccList, setAllledgerAccList] = React.useState([]);
  const [ledgerAcc, setAllledgerAcc] = React.useState([]);
  const [fy, setFy] = useState(financialYears());

  const [collapsibleBrand, setCollapsibleBrand] = React.useState(false);

  const [buttonBrand,setButtonBrand] = useState(false)

  const Option = [
    {
      label: "Insert",
      value: 1,
    },
    {
      label: "Update",
      value: 2,
    },
    {
      label: "Delete",
      value: 3,
    },
  ];

  const fetchData = () => {
    getListLedgerAccount(
      (r) => {
        setAllledgerAccList(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    getAllBrands(
      (r) => {
        setAllBrands(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    getListShowroomWarehouse(
      (r) => {
        setAllShowroomWarehouse(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    )
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const onClickAdd = (e) => {
    let arr = []


    // //console.log("seacrh qry=>>", arr)

    ledgerStorageInsert(
      (r) => {
        //console.log("seacrh qry response=>>", r)
        setOutstanding(r)
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Completed", msgType: "success" },
        });
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    )

  }

  const onClickRemove = (e) => {

    ledgerStorageDrop(
      fy,
      (r) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: r, msgType: "success" },
        });
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      })
  }

  const onClickLedger = (e) => {
    migrateLedgerAccountUpdate(
      fy,
      (r) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: r, msgType: "success" },
        });
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "success" },
        });
      })
  }

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    //console.log(e.target, "22");
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onSelect = (name, v) => {
    setAddSearch({ ...addSearch, [name]: v });

    if (name === "ddl_brand") {

      getItemByBrand(v.value, (r) => {

    //console.log(r, "10042023=>>>")

        setItemList(r)
      })
    }
  };




  const onChange = (e) => {
    const { name, value } = e.target;
    setAddItem((prv) => ({ ...prv, [name]: value }));
  };
  const classes = useStyles();

  const onClickCollaps = () => {
    collapsible ? setCollapsible(false) : setCollapsible(true);
  };

  const onClickCollapsLedger = () => {
    collapsibleLedger ? setCollapsibleLedger(false) : setCollapsibleLedger(true);
  };

  const onClickCollapsItemStock = () => {
    collapsibleItemStock ? setCollapsibleItemStock(false) : setCollapsibleItemStock(true);
  };

  const onClickCollapsRemove = () => {
    collapsibleRemove ? setCollapsibleRemove(false) : setCollapsibleRemove(true);
  };

  const onClickItemStorage = () => {

    setItemStockButton(true)
    showroomWiseSalesData(
      addSearch,
      (r) => {
        setItemStockButton(false)
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: r, msgType: "success" },
        });
      },
      (err) => {
        setItemStockButton(false)
        //console.log("10042023=>>>", err)
      })
  }
  const headerData = [
    {
      id: "ledger_account_id",
      label: "Ledger Id",
      // align: "Center",
      ls: 6,
    },
    {
      id: "ledger_account",
      label: "Ledger Account",
      // align: "left",
    },
    {
      id: "opening_balance",
      label: "Opening Balance",
      // align: "left",
    },
    {
      id: "dr_cr_status",
      label: "Open Dr Cr ",
      // align: "left",
    },
    {
      id: "closing_balance",
      label: "Closing Balance",
      // align: "left",
    },
    {
      id: "current_dr_cr",
      label: "Closing Dr Cr",
      // align: "left",
    },
  ];

  const onClickCollapsBrand = () => {
    collapsibleBrand ? setCollapsibleBrand(false) : setCollapsibleBrand(true);
  };

  const onClickBrandReport = () => {
    if(buttonBrand === false){
    console.log("search:1", addSearch)
    setButtonBrand(true)

      brandReportInsert(
        addSearch,
        (r)=>{
          setButtonBrand(false)
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: "Brand Inserted", msgType: "success" },
          });
        },
        (err)=>{
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      )
    }
    else{
    console.log("search:2", addSearch)

      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Wait!!", msgType: "error" },
      });
    }
    
  }

  return (
    <ThemeProvider theme={theme}>
      <PageHeader title="Tools > Ledger Storage Insert" />
      <GridContainer>
      <GridItem xs="12">
        <CustomCard
            cdTitle="Warning!!! 💀"
          >
             <InputLabel id="label" style={{textAlign:"center", fontSize:20, fontWeight:800}}>Disclaimer!</InputLabel>
             <ul>
              <li>This page can directly effect the <b>Main Database</b>. Think Before Use.</li>
              <li>First Check you have log in into the desired <b>Financial Year</b> before proceeding</li>
              <li>Use <b>Step 1</b> before using <b>Step 2</b></li>
              <li>Step 1: It will <b>Drop</b> the current financial year, <b>Ledger Storage Database</b>.</li>
              <li>Step 2: It will <b>Recalculate and reinstate</b> the current financial year <b>Ledger Storage Database</b>.</li>
              <li>Step 3: It will <b>Remigrate</b> the Opening Balance for all the account to the next financial year database.</li>
              <li>Step 4: It will Migrate the <b>Closing Stock</b> for all the Item, BrandWise to the next financial year database.</li>
             </ul>
          </CustomCard>
        </GridItem>
      {/* Clean Closing Balance */}
        <GridItem xs="12">
          <CustomCard
            cdTitle="STEP - 1 : : Clean Closing Balance"
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
                      title="Remove Ledger Storage"
                      onClick={onClickRemove}
                    />
                  </div>
                </GridItem>
              </GridContainer>
            ) : (
              ""
            )}
          </CustomCard>
        </GridItem>
        <GridItem xs="12">
          <CustomCard
            cdTitle="STEP - 2 : : Fresh Closing Balance"
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon
            onClickFilter={() => { }}
          >
            {collapsible ? (
              <GridContainer
                style={{ padding: "10px" }}
                justifyContent="flex-start"
                alignItems="center"
              >
                {/* <GridItem xs="10">
                  <InputLabel id="label">Ledger Accounts</InputLabel>
                  <ReactSelect
                    options={ledgerAccList}
                    name="ddl_ledger"
                    getOptionLabel={(option) => option.label}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_ledger}
                    isMulti
                  // onChange={(v) => onSelect("ddl_brand_id", v)}
                  // value={{
                  //   label: addSearch.ddl_brand_label,
                  //   value: addSearch.ddl_brand_id,
                  // }}
                  />
                </GridItem> */}

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
                      title="Click To Migrate Ledger Storage."
                      onClick={onClickAdd}
                    />
                  </div>
                </GridItem>
              </GridContainer>
            ) : (
              ""
            )}
          </CustomCard>
        </GridItem>
        <GridItem xs="12">
          <CustomCard
            cdTitle="STEP - 3 : : Migrate Opening Balance For Next FY"
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
                      title="Click To Migrate Ledger Storage."
                      onClick={onClickLedger}
                    />
                  </div>
                </GridItem>
              </GridContainer>
            ) : (
              ""
            )}
          </CustomCard>
        </GridItem>
        <GridItem xs="12">
          <CustomCard
            cdTitle="STEP - 4 : : Closing Stock Current FY"
            btnToolTip={collapsibleItemStock ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollapsItemStock}
            buttonAction={collapsibleItemStock}
            filterIcon
            onClickFilter={() => { }}
          >
            {collapsibleItemStock ? (
              <GridContainer
                style={{ padding: "10px" }}
                justifyContent="flex-start"
                alignItems="center"
              >
                <GridItem xs="3">
                  <InputLabel id="label">Brand</InputLabel>
                  <ReactSelect
                    options={allBrands}
                    name="ddl_brand"
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info.name, v)}
                    value={addSearch.ddl_brand}
                  />
                </GridItem>
                <GridItem xs="3">
                  <InputLabel id="label">Showroom / Warehouse</InputLabel>
                  {/* <InputLabel id="label" className={classes.brandName} style={{ margin: 5, padding: 5 }}>{allShowroomWarehouse && allShowroomWarehouse[showCount]?.label}</InputLabel> */}
                  <ReactSelect
                    options={allShowroomWarehouse}
                    name="ddl_showroom"
                    // getOptionLabel={(option) => option.label}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info.name, v)}
                    value={addSearch.ddl_showroom}
                  />
                </GridItem>
                <GridItem xs="3">
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
                      title="Click To Store Closing Stock For Current FY."
                      onClick={onClickItemStorage}
                      disabled={itemStockButton}
                    />
                  </div>
                </GridItem>
              </GridContainer>
            ) : (
              ""
            )}
          </CustomCard>
        </GridItem>

        <GridItem xs="12">
          <CustomCard
            cdTitle="STEP - 5 : : Restore Brand Report Storage"
            btnToolTip={collapsibleBrand ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollapsBrand}
            buttonAction={collapsibleBrand}
            filterIcon
            onClickFilter={() => { }}
          >
            {collapsibleBrand ? (
              <GridContainer
                style={{ padding: "10px" }}
                justifyContent="flex-start"
                alignItems="center"
              >
                <GridItem xs="3">
                  <InputLabel id="label">Brand</InputLabel>
                  <ReactSelect
                    options={allBrands}
                    name="ddl_brand_report"
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info.name, v)}
                    value={addSearch.ddl_brand_report}
                  />
                </GridItem>
                <GridItem xs="2">
                  <InputLabel id="label">Date Between</InputLabel>
                  <TextField
                    size="small"
                    name="txt_from_date"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    value={addSearch.txt_from_date}
                    onChange={onAddSearch}
                    inputProps={{
                      shrink: true,
                      min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                      max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                    }}
                  />
                </GridItem>
                <GridItem xs="2">
                  <TextField
                    name="txt_to_date"
                    size="small"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    value={addSearch.txt_to_date}
                    onChange={onAddSearch}
                    className={classes.dateField}
                    inputProps={{
                      shrink: true,
                      min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                      max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                    }}
                  />
                </GridItem>


                <GridItem xs="3">
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
                      title="Click To Restore Brand Report."
                      onClick={onClickBrandReport}
                      disabled={buttonBrand}
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

export default LedgerStorage;
