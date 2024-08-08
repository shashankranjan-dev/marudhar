import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
//SERVICE
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";
import { getListVendor, getAllVendors } from "../../../services/vendorService";
import {
  getAllPurchaseList,
  getSearchAllRegisterList,
} from "../../../services/purchaseOrderService";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Paper } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import ReactSelect from "react-select";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import { currencyFormate, currentDate1, currentDate1Pdf, currentDatePdf } from "../HelperComponent/utils";

import theme from "../../../theme/theme";

// import React from "react";
import {
  appFontWeightThin,
  appFontWeight,
  tblBodyHoverColor,
  appDefaultColor,
  appSecondColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";
import { currentDate, sortWord } from "../HelperComponent/utils";
// import PurchaseOrderInvoice from "../../../PurchaseOrderInvoice";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from "file-saver";
import XLSX from "xlsx";

//PDF
import pdfIcon from "../../../assets/img/pdf-icon.png"
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { dateFormate } from "views/Pages/HelperComponent/utils";
const ExcelJS = require('exceljs');


const useStyles1 = makeStyles(styles);
export const StyledTableCell = withStyles((theme) => ({
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

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
    "&:hover": {
      backgroundColor: tblBodyHoverColor,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "25px",
    },
  },
  searchbtnRight: {
    float: "right",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },

  searchBar: {
    padding: "10px",
  },
  activeText: {
    fontSize: "15px",
    color: appSecondColor,
    fontWeight: 400,
  },
  customSelect: {
    marginBottom: 15,
  },
}));

const PurchaseRegisterPage = () => {
  const classes1 = useStyles1();
  const classes = useStyles();
  const history = useHistory();
  const [purchaseRegisterList, setAllPurchaseRegisterList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [allStatus, setAllStatus] = React.useState([]);
  const [allItems, setAllItems] = React.useState({});
  const [refresh, setRefresh] = React.useState(false);

  const [invoiceDetail, setInvoiceDetail] = React.useState({});
  const [allvendor, setAllVendors] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [vendorDetail, setVendorDetail] = React.useState({});
  const [vendorAddrss, setVendorAddres] = React.useState({});
  const [allPurchase, setAllPurchase] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
    txt_bill_no: "",
    ddl_vendor: "",
    txt_keyword_phrase: "",
    ddl_showroom_warehouse: "",
    txt_grn_no:"",
    txt_bill_from_date: currentDate1(),
    txt_bill_to_date: currentDate(),
    txt_bill_from_date_pdf: currentDate1Pdf(),
    txt_bill_to_date_pdf: currentDatePdf(),
  });
  const [collapsible, setCollapsible] = React.useState(true);

  const [
    PurchaseRegisterPdf,
    setAllPurchaseRegisterPdf,
  ] = React.useState([]);
  const [searchPdf, setAllSearchListPdf] = React.useState([]);


  const fetchData = () => {
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
    );
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
  }, []);

  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };

  const headerData = [
    {
      id: "polID",
      label: "#",
      align: "left",
    },
    {
      id: "polDate",
      label: "Bill Date",
      align: "left",
    },
    {
      id: "polNo",
      label: "Bill No",
      align: "left",
    },
    {
      id: "polVendor",
      label: "Vendor",
      align: "left",
    },
    {
      id: "grn_no",
      label: "GRN No.",
      align: "left",
    },

    // {
    //   id: "polDiscount",
    //   label: "Discount",
    //   align: "right",
    // },
    // {
    //   id: "polGst",
    //   label: "GST Value",
    //   align: "right",
    // },
    {
      id: "polAmount1",
      label: "Amount",
      align: "right",
    },

    // {
    //   id: "poStatus",
    //   label: "Status",
    //   align: "left",
    //   salesStatus: (v) => v,
    // },

    // {
    //   id: "polAction",
    //   label: "Action",
    //   align: "right",
    // },
  ];


  const headerDataPdf = [
    [
      "Sr. No.",
      "Bill Date",
      "BIll No",
      "Vendor",
      "GRN No",
      "Amount"
    ],
  ];
  const searchData = [
    [
      addSearch?.txt_bill_no
      ? `Bill_no : ${addSearch?.txt_bill_no}`
      : "",
      addSearch?.ddl_vendor?.label
        ? `Vendor : ${addSearch?.ddl_vendor?.label}`
        : "",
        addSearch?.ddl_showroom_warehouse?.label
        ? `Showroom_Warehouse : ${addSearch?.ddl_showroom_warehouse?.label}`
        : "",
        addSearch?.txt_grn_no
      ? `Grn No : ${addSearch?.txt_grn_no}`
      : "",
      addSearch?.txt_bill_from_date_pdf
        ? `From Date: ${addSearch?.txt_bill_from_date_pdf}`
        : "",
      addSearch?.txt_bill_to_date_pdf ? `To Date: ${addSearch?.txt_bill_to_date_pdf}` : "",
     
    ],
  ];


  const onSearchPurchaseRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    getSearchAllRegisterList(
      (purchaseRegisterList,pdf) => {
        // if (purchaseRegisterList.length) {

        setAllPurchaseRegisterList(purchaseRegisterList);
        setAllPurchaseRegisterPdf(pdf);
        setLoading(false);
        // }
        // else {
        //   setLoading(false);
        //   dispatch({
        //     type: actionTypes.SET_OPEN_MSG,
        //     payload: { msg: err, "Direct Purchase  not found": "info"},
        //   });
        // }
      },
      (err) => {
        setAllPurchaseRegisterList([]);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      addSearch
    );

    // console.log(purchaseRegisterList,"asda");
  };
  const onClickRefresh = () => {
    setAddSearch({
      txt_bill_no: "",
      ddl_vendor: "",
      txt_keyword_phrase: "",
      txt_grn_no:"",
      ddl_showroom_warehouse: "",
      txt_bill_from_date: currentDate1(),
      txt_bill_to_date: currentDate(),
    });
    setRefresh(!refresh);
  };

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onSelect = (info, v) => {
    setAddSearch({ ...addSearch, [info.name]: v });
  };

  const onClickPrint = (row) => {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: {},
    });
    getAllVendors(
      (r) => {
        setVendorDetail(r[0]);
        setVendorAddres(r[0].allAddress[0]);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      row.vendor_id
    );
    setInvoiceDetail(row);
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: {},
    });
    setClassicModal(true);
  };

  //pdf
  // const onClickPdf = (e) => {
  //   e.preventDefault();

  //   let doc = new jsPDF("landscape", 'pt', 'A4');
  //   doc.html(document.getElementById('pdf-view'), {
  //     callback: () => {
  //       doc.save(`purchaseRegister${currentDate()}.pdf`);
  //     }
  //   });

  //   // setClassicModal(true);
  // };

  const onClickPdf = (e) => {
    e.preventDefault();

    let doc = new jsPDF("landscape", "pt", "A4");
    autoTable(doc, {
      head: searchData,
      body: searchPdf,
      didDrawCell: (ledgerPdf) => {
        // console.log(ledgerPdf.column.index);
      },
    });
    autoTable(doc, {
      head: headerDataPdf,
      body:PurchaseRegisterPdf,
      didDrawCell: (purchasePdf) => {
        // console.log(purchasePdf.column.index);
      },
    });
    doc.save(`purchaseRegister${currentDate()}.pdf`);
    // doc.html(document.getElementById('pdf-view'), {
    //   callback: () => {
    //     doc.save(`OutstandingBySalesOrder${currentDate()}.pdf`);
    //   }
    // });
    // setClassicModal(true);
  };


  
  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Purchase Register Report']);
    const periodRow = worksheet.addRow(['Period:']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:F${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:F${periodRow.number}`);
  
    const headers = [
      'Sl No',
      'Bill Date',
      'Bill No',
      'Vendor',
      'GRN No',      
      'Amount',
    
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const PurchaseRegisterTable = purchaseRegisterList.map((purchase) => {
      return {
        Sl_No: purchase.polID,
        Bill_Date: purchase.polDate,
        Bill_no: purchase.polNo,
        Vendor: purchase.polVendor,
        GRN_No: purchase.grn_no,
        Amount: purchase.polAmount,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    PurchaseRegisterTable.forEach((data) => {
      worksheet.addRow(Object.values(data));
    });
  
    headerRow.font = { bold: true };
    headerRow.eachCell((cell, colNumber) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'cce6ff' } };
    });
  
    worksheet.eachRow({ startingRow: dataStartRow + 1 }, (row, rowNumber) => {});
  
    worksheet.autoFilter = {
      from: {
        row: dataStartRow,
        column: 1,
      },
      to: {
        row: dataStartRow,
        column: headers.length,
      },
    };

    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
      const year = date.getFullYear();
    
      return `${day}-${month}-${year}`;
    }
  
    const fromDate = addSearch?.txt_bill_from_date;
    const toDate = addSearch?.txt_bill_to_date;
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);

     const chosenPeriod = ` ${formattedFromDate}  To  ${formattedToDate}`;
     const showroom_warehouse = addSearch?.ddl_showroom_warehouse?.label ? addSearch?.ddl_showroom_warehouse?.label : " - " ;
    const vendor = addSearch?.ddl_vendor?.label ? addSearch?.ddl_vendor?.label : " - " ;

    // periodCell.value = `Vendor: ${vendor}       Period:  ${chosenPeriod} 
    // Showroom Warehouse : ${showroom_warehouse} `;

    if (addSearch?.ddl_vendor &&  addSearch?.ddl_showroom_warehouse  ) {
      periodCell.value = `Vendor: ${vendor}       Period:  ${chosenPeriod} 
      Showroom Warehouse : ${showroom_warehouse}`;
  } else if (addSearch?.ddl_vendor ) {
      periodCell.value = ` Vendor : ${vendor}   Period :  ${chosenPeriod}`;
  } else if ( addSearch?.ddl_showroom_warehouse) {
      periodCell.value = ` Showroom Warehouse :  ${showroom_warehouse}   Period :  ${chosenPeriod}`;
  } else {
      periodCell.value = `Period :  ${chosenPeriod}`;
  }
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Purchase Register.xlsx');
  };


  
  const onClickCollaps = () => {
    collapsible ? setCollapsible(false) : setCollapsible(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="MIS Report> Purchase Register"
        btnToolTip="Add Purchase Register"
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle="Search Purchase Register"
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon
          >
            {collapsible ? (
              <Paper elevation="0" className={classes.searchBar}>
                <GridContainer justifyContent="flex-start" alignItems="center">
                  <GridItem xs="3">
                    <InputLabel id="label">Bill No</InputLabel>
                    <TextField
                      size="small"
                      type="search"
                      placeholder="Bill No"
                      name="txt_bill_no"
                      onChange={onAddSearch}
                      id="outlined-basic"
                      fullWidth={true}
                      value={addSearch.txt_bill_no}
                      variant="outlined"
                    />
                  </GridItem>

                  <GridItem xs="2">
                    <InputLabel id="label">Date Between</InputLabel>
                    <TextField
                      size="small"
                      name="txt_bill_from_date"
                      id="date"
                      variant="outlined"
                      type="date"
                      defaultValue={currentDate1()}
                      fullWidth={true}
                      onChange={onAddSearch}
                      value={addSearch.txt_bill_from_date}
                      // value={startDate}
                      // onChange={(v) => console.log(v.target.value)}
                      // className={classes.dateField}
                      inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                    />
                  </GridItem>
                  <GridItem xs="2">
                    {/* <InputLabel id="label">Date</InputLabel> */}
                    <TextField
                      size="small"
                      name="txt_bill_to_date"
                      id="date"
                      variant="outlined"
                      type="date"
                      fullWidth={true}
                      defaultValue={currentDate()}
                      onChange={onAddSearch}
                      value={addSearch.txt_bill_to_date}
                      // value={startDate}
                      // onChange={(v) => console.log(v.target.value)}
                      className={classes.dateField}
                      inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                    />
                  </GridItem>
                  <GridItem xs="5">
                    <InputLabel id="label">Vendor</InputLabel>
                    <ReactSelect
                      options={allvendor.sort(sortWord("label"))}
                      placeholder="Select"
                      name="ddl_vendor"
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      styles={reactSelectStyles}
                      className={classes.customSelect}
                      onChange={(v, info) => onSelect(info, v)}
                      value={addSearch.ddl_vendor}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                    />
                  </GridItem>
                  <GridItem xs="3">
                    <InputLabel id="label">Showroom / Warehouse</InputLabel>
                    <ReactSelect
                      options={allShowroomWarehouse.sort(sortWord("label"))}
                      placeholder="Select"
                      name="ddl_showroom_warehouse"
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      styles={reactSelectStyles}
                      className={classes.customSelect}
                      onChange={(v, info) => onSelect(info, v)}
                      value={addSearch.ddl_showroom_warehouse}

                    // onChange={(v) => onSelect("ddl_brand_id", v)}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                    />
                  </GridItem>
                  <GridItem xs="3">
                    <InputLabel id="label">GRN No.</InputLabel>
                    <TextField
                      type="search"
                      size="small"
                      placeholder="GRN No."
                      name="txt_grn_no"
                      onChange={onAddSearch}
                      id="outlined-basic"
                      fullWidth={true}
                      value={addSearch.txt_grn_no}
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs="12">
                    <div className={classes.searchbtnRight}>
                      <CustomButton
                        style={{ marginRight: "10px" }}
                        onClick={onSearchPurchaseRegister}
                      >
                        <SearchIcon />
                      </CustomButton>
                      <CustomButton onClick={onClickRefresh}>
                        <RotateLeftIcon />
                      </CustomButton>
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer
                  justifyContent="flex-start"
                  alignItems="center"
                ></GridContainer>
              </Paper>
            ) : (
              ""
            )}
          </CustomCard>
        </GridItem>
      </GridContainer>
{/* 
      <MasterModel
        classicModal={classicModal}
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModal(false);
        }}
        height="auto"
        okBtnText="Print"
        modelName="Purchase Order"
        onClickOk={(e) => {
          e.preventDefault();
          window.print();
        }}
      ></MasterModel> */}

      {/* pdf screen */}
      <MasterModel
        classicModal={classicModal}
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModal(false);
        }}
        height="auto"
        okBtnText="Pdf"
        modelName="Purchase Register"
        onClickOk={(e) => {
          e.preventDefault();
          window.print();
        }}
      >
        <div id="pdf-view"
          style={{
            marginTop: 15,
            display: "flex",
            flexFlow: "row wrap",
            // justifyContent: "center",
            breakBefore: "avoid-page",
          }}>
          <div style={{textAlign:"center",borderBottom:"1px solid",width:"72%"}} ><h4>Purchase Register</h4></div>
          {
            addSearch ?
              <GridContainer style={{ margin: 2 }}>
                <GridItem>
                  {addSearch?.txt_bill_no ? ` Bill No: ${addSearch?.txt_bill_no}` : ''}
                </GridItem>

                <GridItem>
                  {addSearch?.ddl_vendor?.label ? `Vendor: ${addSearch?.ddl_vendor?.label}` : ''}
                </GridItem>

                <GridItem>
                  {addSearch?.txt_keyword_phrase ? `KeyWord Phrase: ${addSearch?.txt_keyword_phrase}` : ''}
                </GridItem>

                <GridItem>
                  {addSearch?.ddl_showroom_warehouse?.label ? `Showroom Warehouse : ${addSearch?.ddl_showroom_warehouse?.label}` : ''}
                </GridItem>
                                      
                <GridItem style={{ marginLeft:180}}>
                  {addSearch?.txt_bill_from_date ? `From Date: ${addSearch?.txt_bill_from_date}` : ''}
                </GridItem>

                <GridItem >
                  {addSearch?.txt_bill_to_date ? `To Date: ${addSearch?.txt_bill_to_date}` : ''}
                </GridItem>
              </GridContainer>
              : ''
          }

          <TableContainer>
            <GridContainer style={{ height: "auto", padding: 12, width: 830, margin: 2 }}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead >
                  <TableRow>
                    <StyledTableCell align="left">#</StyledTableCell>
                    <StyledTableCell align="left">Bill Date</StyledTableCell>
                    <StyledTableCell align="left">Bill no</StyledTableCell>
                    <StyledTableCell align="left">Vendor</StyledTableCell>
                    <StyledTableCell align="left"> GRN No</StyledTableCell>
                    <StyledTableCell align="center">Amount</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {console.log(purchaseRegisterList, "sankha51")} */}

                  {purchaseRegisterList.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="left" className={classes.id}>
                        {row.polID}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.bill_date}>
                        {row.polDate}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.txt_bill_no}>




                        {row.polNo}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.ddl_vendor}>
                        {row.polVendor}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.grossamount}
                      >
                        {row.grn_no}
                      </StyledTableCell>

                      <StyledTableCell align="center" className={classes.amount}>
                        {row.polAmount}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </GridContainer>
          </TableContainer>

        </div>


      </MasterModel>
      {loading ? (
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
                <GridContainer justifyContent="space-between" alignItems="center">
                  <GridItem>
                    <h4 className={classes1.headerCdTitle}>Purchase Register</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? (
                  <GridItem style={{ cursor: "pointer" ,display: "none" }}>

                    <IconButton onClick={onClickPdf}>

                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />

                      </Tooltip>
                    </IconButton>

                    <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel(purchaseRegisterList)}
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

                    <IconButton onClick={onClickPdf}>

                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />

                      </Tooltip>
                    </IconButton>

                    <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel(purchaseRegisterList)}
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
                <MuiTable columns={headerData} rows={purchaseRegisterList} pagination={true} />

                {/* <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">#</StyledTableCell>
                    <StyledTableCell align="left">Bill Date</StyledTableCell>
                    <StyledTableCell align="left">Bill no</StyledTableCell>
                    <StyledTableCell align="left">Vendor</StyledTableCell>
                    <StyledTableCell align="left"> Gross Amount</StyledTableCell>
                    <StyledTableCell align="left">Discount</StyledTableCell>
                    <StyledTableCell align="left">Gst Value</StyledTableCell>
                    <StyledTableCell align="center">Other Charges</StyledTableCell>
                    <StyledTableCell align="center">Amount</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {console.log(purchaseRegisterList,"check")}
                {purchaseRegisterList.map((row,i)=>(
                  <StyledTableRow key={i}>
                    <StyledTableCell align="left" className={classes.id}>
                      {row.polID}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.bill_date}>
                      {row.polDate}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.txt_bill_no}>    


                   

                    {row.polNo}
                     </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.ddl_vendor}>
                      {row.polVendor}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.grossamount}
                    >
                      {row.polGross}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.discount}>
                      {row.polDiscount}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.polGst}>
                      {row.polGst}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className={classes.enqStatus}
                    >
                     
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.amount}>
                    {Number(row.polGross)+Number(row.polGst)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
                          }

                      */}

                {/* <TableContainer>
              <Table>
                <TableBody>
                  {purchaseRegisterList.length ? (
                    <StyledTableRow align="right">
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell>Total</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      
                      <StyledTableCell align="right" >
                        {purchaseRegisterList.length
                          ? currencyFormate(
                              purchaseRegisterList.reduce(
                                (sum, li) =>
                                  Number(sum) + parseFloat(li.polGross),
                                0
                              )
                            )
                          : "00"}
                      </StyledTableCell>

                      <StyledTableCell align="right" >
                        {purchaseRegisterList.length
                          ? currencyFormate(
                              purchaseRegisterList.reduce(
                                (sum, li) =>
                                  Number(sum) + parseFloat(li.polDiscount),
                                0
                              )
                            )
                          : "00"}
                      </StyledTableCell>

                      <StyledTableCell align="right">
                        {purchaseRegisterList.length
                          ? currencyFormate(
                              purchaseRegisterList.reduce(
                                (sum, li) => Number(sum) + Number(li.polGst),
                                0
                              )
                            )
                          : "00"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {purchaseRegisterList.length
                          ? currencyFormate(
                              purchaseRegisterList.reduce(
                                (sum, li) =>
                                  parseFloat(sum) + parseFloat(li.polOtherCharges),
                                0
                              )
                            )
                          : "00"}
                      </StyledTableCell>
                      <StyledTableCell align="right" size="1rem">
                        {purchaseRegisterList.length
                          ? currencyFormate(
                              purchaseRegisterList.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  parseFloat(
                                    li.polGross + li.polGst + li.polOtherCharges
                                  ),
                                0
                              )
                            )
                          : "00"}
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : (
                    <StyledTableRow></StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer> */}

                {/* do not remove the below code */}
                {/* {console.log(purchaseRegisterList, "1")} */}
                <Box pt={1}>
                  <GridContainer>
                    {purchaseRegisterList.length ? (
                      <Grid item xs={3}>
                        <Box
                          className={classes.tableLabel}
                          ml={21}
                          textAlign="left"
                        >
                          <b> Total</b>
                        </Box>
                      </Grid>
                    ) : (
                      ""
                    )}

                    <Grid item xs={4}>
                      <Box
                        className={classes.tableLabel}
                        ml={30}
                        textAlign="center"
                      >
                        {/* {purchaseRegisterList.length
                        ? currencyFormate(
                            purchaseRegisterList.reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.polGrossForTotal),
                              0
                            )
                          )
                        : ""} */}
                      </Box>
                    </Grid>

                    <Grid item xs={2}>
                      <Box
                        className={classes.tableLabel}
                        mr={1}
                        textAlign="right"
                      >
                        {/* {purchaseRegisterList.length
                        ? currencyFormate(
                            purchaseRegisterList.reduce(
                              (sum, li) =>
                                Number(sum) +
                                parseFloat(li.polDiscountForTotal),
                              0
                            )
                          )
                        : ""} */}
                      </Box>
                    </Grid>

                    <Grid item xs={1}>
                      <Box
                        className={classes.tableLabel}
                        ml={0}
                        textAlign="center"
                      >
                        {/* {purchaseRegisterList.length
                        ? currencyFormate(
                            purchaseRegisterList.reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.polGstForTotal),
                              0
                            )
                          )
                        : ""} */}
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <Box
                        className={classes.tableLabel}
                        mr={3}
                        textAlign="right"
                      >
                        {/* {
                          console.log(purchaseRegisterList, "sen1807")
                        } */}
                        {purchaseRegisterList.length
                          ? currencyFormate(
                            purchaseRegisterList.reduce(
                              (sum, li) =>
                                Number(sum) + li.polGrossForTotal + li.polGst
                              ,
                              0
                            )
                          )
                          : ""}
                      </Box>
                    </Grid>
                  </GridContainer>
                </Box>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )}
    </ThemeProvider>
  );
};

export default PurchaseRegisterPage;
