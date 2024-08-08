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
import React from "react";
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
import { currencyFormate, currentDate, currentDate1, currentDateF } from "../HelperComponent/utils";
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
import { getVendorByVendorName } from "services/outstandingByPurchaseService";
import { getListVendor } from "services/outstandingByPurchaseService";
import { getAllPurchaseOutstandingData } from "services/outstandingByPurchaseService";

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

const OutstandingByPurchase = () => {
  const classes1 = useStyles1();

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);

  const [loading, setLoading] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  // const [outstanding, setOutstanding] = React.useState([]);
  const [outstanding, setOutstanding] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [billDetail, setBillDetail] = React.useState({});
  const [vendorDetail, setVendorDetail] = React.useState([]);
  const [allvendor, setAllVendors] = React.useState([]);

  const [addSearch, setAddSearch] = React.useState({
    ddl_vendor: "",
    txt_from_date: 1648791467,
    txt_to_date: currentDateF(),
  });
  //   const [viewRes, setViewRes] = React.useState("hidden");
  const [ledgerList, setAllledgerList] = React.useState([]);
  const [openingBalance, setOpeningBalance] = React.useState({});
  const [collapsible, setCollapsible] = React.useState(true);
  const [addItem, setAddItem] = React.useState({
    category: "",
    sales_id: "",
    item_id: "",
    category_id: "",
  });

  const [
    OutstandingByPurchasePdf,
    setAllOutstandingByPurchasePdf,
  ] = React.useState([]);
  const [searchPdf, setAllSearchListPdf] = React.useState([]);

  const headerData = [
    {
      id: "id",
      label: "#",
    },
    {
      id: "vendor_name",
      label: "Vendor",
      align: "left",
    },
    {
      id: "purchase_value",
      label: "Purchase Net Value",
      align: "right",
    },
    {
      id: "closing_balance",
      label: "Total Out Standing",
      align: "right",
    },
    {
      id: "dr_cr_status",
      label: "Dr Cr Status",
      align: "right",
    },
   
  ];
  const onChangeBillDate = (e) => {
    const { name, value } = e.target;
    setBillDetail({ ...billDetail, [name]: value });
  };

  const fetchData = () => {
    // getVendorByVendorName(

    //   (r) => {
    //     //console.log(r[0],"sank2703")
    //     setVendorDetail(r[0]);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );

    getListVendor(
      (r) => {
        setAllVendors(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };

  React.useEffect(() => {
    fetchData();
    setAllUnits(directPurchaseFormRowData);
  }, []);

    const headerDataPdf = [
      [
        "Sr. No.",
        "Client Name",
        "Purchase Net Value",
        "Total Outstanding",
        "Dr_Cr_Status",
      ],
    ];
    const searchData = [
      [
       
        addSearch?.ddl_customer?.label
          ? `Customer : ${addSearch?.ddl_customer?.label}`
          : "",
        addSearch?.txt_from_date
          ? `From Date: ${dateFormate(addSearch?.txt_from_date)}`
          : "",
        addSearch?.txt_to_date ? `To Date: ${addSearch?.txt_to_date}` : "",
       
      ],
    ];

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    //console.log(e.target, "22");
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };
  const onSelect = (info, v) => {
    setAddSearch({ ...addSearch, [info.name]: v });
  };

  const onSearchReport = (e) => {
    setRefresh(false);
    e.preventDefault();
    setLoading(true);
    getAllPurchaseOutstandingData(
      (r,pdf) => {
        if (r.length) {
          //console.log(r, "sank070512");

          setOutstanding(r);
          setAllOutstandingByPurchasePdf(pdf)
          setLoading(false);
        } else {
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Purchase Report not found": "info" },
          });
        }
      },
      (err) => {
        setOutstanding([]);

        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      addSearch
    );
  };

  const onClickRefresh = () => {
    setRefresh(!refresh);
    setAddSearch({
      ddl_vendor: "",
      txt_from_date: currentDate1(),
      txt_to_date: currentDate(),
    });
  };

  const onAddItem = (v) => {
    // setAddItem({
    //   ...addItem,
    //   itemImg: v.itemImg,
    //   brand: v.brand,
    //   item: v.item,
    // });
    // setAddedItems([...addedItems, addItem]);
    // //console.log(addItem);
    // setAddItem({
    //   txtQuantity: "",
    //   txtRate: "",
    //   txtValue: "",
    //   item: "",
    //   brand: "",
    //   category: "",
    //   itemImg: "",
    // });
  };

  const onClickView = (r) => {
    //console.log("sen1805", r);
    setClassicModal(true);

    //fetching data

    getSearchLedgerVouchers(
      (enquery) => {
        if (enquery.length) {
          setAllledgerList(enquery);
          // setViewRes("visible");
          setLoading(false);
        } else {
          // setViewRes("visible");
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Journal not found": "info" },
          });
        }
      },
      (err) => {
        setAllledgerList([]);
        // setViewRes("visible");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      r.ledger_account_id,
      r.customer_id,
      addSearch.txt_from_date,
      addSearch.txt_to_date
    );

    getLedgerClosingBalance(
      (clsBalance) => {
        //console.log(clsBalance[0].closing_balance, "test");
        if (clsBalance.length > 0) {
          setOpeningBalance({
            opening: clsBalance[0].closing_balance,
            dr_cr_status: clsBalance[0].dr_cr_status,
          });
        } else {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Journal not found": "info" },
          });
        }
      },
      (err) => {
        setAllledgerList([]);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },

      {
        ...addSearch,
        txt_from_date: "2021-04-01",
        ledger_account_id: r.ledger_account_id,
        txt_to_date: addSearch.txt_from_date,
      }
    );
  };
  const onCloseModel = () => {
    setClassicModal(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setAddItem((prv) => ({ ...prv, [name]: value }));
  };
  const classes = useStyles();

  const onClickCollaps = () => {
    collapsible ? setCollapsible(false) : setCollapsible(true);
  };
// //console.log(outstanding[0],"sankoutstanding")
  // export to excel
  const onhandleExportToExcel = () => {
    const OutstandingByPurchaseTable = outstanding.map((item) => {
      return {
        Sl_No: item.id,
        vendor_name: item.vendor_name[0]  ,
        purchase_value: item.purchase_valueUseForTotal,
        Total_Outstanding: item.closing_balanceUseForTotal,
        Dr_Cr_status: item.dr_cr_status,
      };
    });
    const fileName = "OutStanding By Purchase";
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(OutstandingByPurchaseTable);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  //pdf
  const onClickPdf = (e) => {
    e.preventDefault();

    let doc = new jsPDF("landscape", "pt", "A4");
    autoTable(doc, {
      head: searchData,
      body: searchPdf,
      didDrawCell: (ledgerPdf) => {
        //console.log(ledgerPdf.column.index);
      },
    });
    autoTable(doc, {
      head: headerDataPdf,
      body: OutstandingByPurchasePdf,
      didDrawCell: (purchasePdf) => {
        //console.log(purchasePdf.column.index);
      },
    });
    doc.save(`OutstandingByPurchase${currentDate()}.pdf`);
    // doc.html(document.getElementById('pdf-view'), {
    //   callback: () => {
    //     doc.save(`OutstandingBySalesOrder${currentDate()}.pdf`);
    //   }
    // });
    // setClassicModal(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <PageHeader title="MIS Report > Outstanding By Purchase " />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle=" Outstanding By Purchase"
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon
            onClickFilter={() => {}}
          >
            {collapsible ? (
              <GridContainer
                style={{ padding: "10px" }}
                justifyContent="flex-start"
                alignItems="center"
              >
                {/* <GridItem xs="4">
             <InputLabel id="label">Group</InputLabel>
                <ReactSelect
                  options={allGroup}
                  name="ddl_group"
                  getOptionLabel={(option) => option.label}
                  placeholder="Select"
                  formatGroupLabel={(d) => d.label}
                  menuPortalTarget={document.body}
                  styles={reactSelectStyles}
                  className={classes.customSelect}
                  onChange={(v, info) => onSelect(info, v)}
                  value={addSearch.ddl_group}
                  // onChange={(v) => onSelect("ddl_brand_id", v)}
                  // value={{
                  //   label: addSearch.ddl_brand_label,
                  //   value: addSearch.ddl_brand_id,
                  // }}
                />
              </GridItem> */}
                {/* <GridItem xs="4">
             <InputLabel id="label">Reference</InputLabel>
                <ReactSelect
                  options={allReference}
                  name="ddl_reference"
                  getOptionLabel={(option) => option.label}
                  placeholder="Select"
                  formatGroupLabel={(d) => d.label}
                  menuPortalTarget={document.body}
                  styles={reactSelectStyles}
                  className={classes.customSelect}
                  onChange={(v, info) => onSelect(info, v)}
                  value={addSearch.ddl_reference}
                  // onChange={(v) => onSelect("ddl_brand_id", v)}
                  // value={{
                  //   label: addSearch.ddl_brand_label,
                  //   value: addSearch.ddl_brand_id,
                  // }}
                />
              </GridItem> */}
                <GridItem xs="4">
                  <InputLabel id="label">Vendor</InputLabel>
                  <ReactSelect
                    options={allvendor}
                    name="ddl_vendor"
                    getOptionLabel={(option) => option.label}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_vendor}
                    // onChange={(v) => onSelect("ddl_brand_id", v)}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                  />
                </GridItem>

                {/* <GridItem xs="2">
                    <InputLabel id="label">Min Amount</InputLabel>
                    <TextField
                      size="small"
                      type="search"
                      placeholder="Min Amount"
                      name="txt_min_amount"
                      onChange={onAddSearch}
                      id="outlined-number"
                      value={addSearch.txt_min_amount}
                      variant="outlined"
                    />
                     
                  </GridItem>
                  <GridItem xs="2">
                  <InputLabel id="label">Max Amount</InputLabel>

                  <TextField
                      size="small"
                      type="search"
                      placeholder="Max Amount"
                      name="txt_max_amount"
                      onChange={onAddSearch}
                      id="outlined-number"
                      value={addSearch.txt_max_amount}
                      variant="outlined"
                    />
                  </GridItem> */}
                {/* <GridItem xs="2">
                <InputLabel id="label">Date Between</InputLabel>
                <TextField
                     name="txt_from_date"
                    size="small"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    value={addSearch.txt_from_date}
                    defaultValue={currentDate1()}
                    onChange={onAddSearch}
                   
                    // className={classes.dateField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                />
              </GridItem>
              <GridItem xs="2">
                <InputLabel id="label">Date</InputLabel>
                <TextField
               size="small"
                    name="txt_to_date"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    value={addSearch.txt_to_date}
                    defaultValue={currentDate()}
                    onChange={onAddSearch}
                    className={classes.dateField}

                    InputLabelProps={{
                      shrink: true,
                      
                    }}
                />
              </GridItem> */}

                <GridItem xs="12">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <CustomButton
                      style={{ marginRight: "10px" }}
                      onClick={onSearchReport}
                    >
                      <SearchIcon />
                    </CustomButton>
                    <CustomButton name="btn_refres" onClick={onClickRefresh}>
                      <RotateLeftIcon />
                    </CustomButton>
                  </div>
                </GridItem>
              </GridContainer>
            ) : (
              ""
            )}
          </CustomCard>
        </GridItem>
      </GridContainer>

      {/* Select and Add Items */}
      {loading === true ? (
        <Box mt={10} width="100%" textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <GridContainer className={classes.root}>
          <GridItem xs="12">
            <Card className={classes1.headerCard}>
              <CardHeader
                className={classes1.TbheaderCdhd}
                style={{ height: 60 }}
              >
                <GridContainer
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <GridItem>
                    <h4 className={classes1.headerCdTitle}>
                      Outstanding Search Result
                    </h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? ( 
                  <GridItem style={{ cursor: "pointer",display: "none"  }}>
                    {/* ////////////////////////////PDF/////////////////// */}
                    <IconButton onClick={onClickPdf}>
                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />
                      </Tooltip>
                    </IconButton>

                    <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel(outstanding)}
                    >
                      <Tooltip title="Export to Excel">
                        <img
                          src={require("../../../assets/img/excel.png").default}
                        />
                      </Tooltip>
                    </IconButton>
                  </GridItem>
                  ):(
                    <GridItem style={{ cursor: "pointer" }}>
                    {/* ////////////////////////////PDF/////////////////// */}
                    <IconButton onClick={onClickPdf}>
                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />
                      </Tooltip>
                    </IconButton>

                    <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel(outstanding)}
                    >
                      <Tooltip title="Export to Excel">
                        <img
                          src={require("../../../assets/img/excel.png").default}
                        />
                      </Tooltip>
                    </IconButton>
                  </GridItem>
                  )}
                </GridContainer>
              </CardHeader>
              <CardBody
                style={{ height: "auto", maxHeight: 480, padding: 10 }}
                className={clxs(classes.customScroolBar)}
              >
                {/* <CustomCard cdTitle="Outstanding Search Result" height={450}> */}
                <MuiTable
                  onClickViewOne={onClickView}
                  columns={headerData}
                  rows={outstanding}
                />
  <Box pt={1}>
                  {!refresh ? (
                    <GridContainer>
                      <Grid item xs={1}>
                        <Box className={classes.tableLabel} textAlign="right">
                          <b> Total</b>
                        </Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Box
                          className={classes.tableLabel}
                          textAlign="right"
                        ></Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Box
                          className={classes.tableLabel}
                          textAlign="right"
                        ></Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box
                          className={classes.tableLabel}
                          textAlign="right"
                        ></Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Box
                          className={classes.tableLabel}
                          textAlign="left"
                        ></Box>
                      </Grid>

                    

                      <Grid item xs={2}>
                        <Box
                          className={classes.tableLabel}
                          mr={6}
                          textAlign="left"
                        >
                          <b>
                            {outstanding.length
                              ? currencyFormate(outstanding
                                  .reduce(
                                    (sum, li) =>
                                      Number(sum) + Number( li.purchase_valueUseForTotal),
                                    0
                                  ))
                                  
                              : ""}
                          </b>
                        </Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Box
                          className={classes.tableLabel}
                          textAlign="left"
                          
                        >
                            {/* {outstanding.length
                              ? Math.abs(outstanding
                                  .reduce(
                                    (sum, li) =>
                                      Number(sum) + Number(li.dr_cr_status=== "Cr" ? li.closing_balance:0) ,
                                    0
                                  )).toFixed(2)
                                  
                              : ""} */}
                        </Box>
                      </Grid>
                      

                      <Grid item xs={2}>
                        <Box className={classes.tableLabel} textAlign="left" >
                          <b>
                            {/* {outstanding.length
                              ? Math.abs(outstanding
                                  .reduce(
                                    (sum, li) =>
                                      Number(sum) + Number(li.dr_cr_status=== "Dr" ? li.closing_balance:0) ,
                                    0
                                  )).toFixed(2)
                                  
                              : ""} */}
                              {outstanding.length
                              ? currencyFormate(outstanding
                                  .reduce(
                                    (sum, li) =>
                                      Number(sum) + Number( li.closing_balanceUseForTotal) ,
                                    0
                                  ))
                                  
                              : ""}
                              {/* {outstanding.length
                              ? currencyFormate(Math.abs(outstanding
                                  .reduce(
                                    (sum, li) =>
                                      Number(sum) + Number(li.dr_cr_status=== "Cr" ? li.closing_balanceUseForTotal:0) - Number(li.dr_cr_status=== "Dr" ? li.closing_balanceUseForTotal:0),
                                    0
                                  )))
                                  
                              : ""} */}
                          </b>
                        </Box>
                      </Grid>
                    </GridContainer>
                  ) : (
                    ""
                  )}
                </Box>

              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )}
      <MasterModelForStock
        classicModal={classicModal}
        onCloseModel={onCloseModel}
        height="auto"
        modelName="Ledger View"
      >
        <OutstandingLedgerSalesView
          openingBalance={openingBalance}
          ledgerList={ledgerList}
          outstanding={outstanding}
        />
      </MasterModelForStock>

      <MasterModel
        // classicModal={classicModal}
        // onCloseModel={(e) => {
        //   e.preventDefault();
        //   setClassicModal(false);
        // }}
        height="auto"
        okBtnText="Pdf"
        modelName="Outstanding By Invoice"
        onClickOk={(e) => {
          e.preventDefault();
          window.print();
        }}
      >
        <div
          id="pdf-view"
          style={{
            marginTop: 15,
            display: "flex",
            flexFlow: "row wrap",
            // justifyContent: "center",
            breakBefore: "avoid-page",
          }}
        >
          <div
            style={{
              textAlign: "center",
              borderBottom: "1px solid",
              width: "72%",
            }}
          >
            <h4>Outstanding Search Result</h4>
          </div>

          {addSearch ? (
            <GridContainer style={{ margin: 2 }}>
              <GridItem>
                {addSearch?.ddl_group
                  ? `Group: ${addSearch?.ddl_group?.label}`
                  : ""}
              </GridItem>

              <GridItem>
                {addSearch?.ddl_reference?.label
                  ? `Reference: ${addSearch?.ddl_reference?.label}`
                  : ""}
              </GridItem>

              <GridItem>
                {addSearch?.ddl_customer?.label
                  ? `Customer : ${addSearch?.ddl_customer?.label}`
                  : ""}
              </GridItem>

              <GridItem>
                {addSearch?.txt_from_date
                  ? `From Date: ${addSearch?.txt_from_date}`
                  : ""}
              </GridItem>

              <GridItem>
                {addSearch?.txt_to_date
                  ? `To Date: ${addSearch?.txt_to_date}`
                  : ""}
              </GridItem>
              <GridItem>
                {addSearch?.txt_min_amount
                  ? `Min Amount: ${addSearch?.txt_min_amount}`
                  : ""}
              </GridItem>
              <GridItem>
                {addSearch?.txt_max_amount
                  ? `Max Amount: ${addSearch?.txt_max_amount}`
                  : ""}
              </GridItem>
            </GridContainer>
          ) : (
            ""
          )}

          <TableContainer>
            <GridContainer
              style={{ height: "auto", padding: 12, width: 830, margin: 2 }}
            >
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">#</StyledTableCell>
                    <StyledTableCell align="left">Client Name</StyledTableCell>
                    <StyledTableCell align="left">
                      Sales Order Net Value
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Total Outstanding
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      Dr Cr_Status
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {//console.log(purchaseRegisterList, "sankha51")} */}

                  {outstanding.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="left" className={classes.id}>
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.bill_date}
                      >
                        {row.company_name}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.txt_bill_no}
                      >
                        {row.net_value}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.ddl_vendor}
                      >
                        {row.closing_balance}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.grossamount}
                      >
                        {row.dr_cr_status}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </GridContainer>
          </TableContainer>
        </div>
      </MasterModel>
    </ThemeProvider>
  );
};

export default OutstandingByPurchase;
