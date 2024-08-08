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
import { getAllPurchaseList ,getSearchAllRegisterList} from "../../../services/purchaseOrderService";
import { getSearchPurchaseReturnList} from "../../../services/PurchaseReturnService";

import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {   Box,Grid } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import CircularProgress from "@material-ui/core/CircularProgress";


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
import {
  currencyFormate, currentDate1

} from "../HelperComponent/utils";

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
import { currentDate,sortWord } from "../HelperComponent/utils";
// import PurchaseOrderInvoice from "../../../PurchaseOrderInvoice";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import  FileSaver from 'file-saver';
import XLSX from 'xlsx'
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


const PurchaseReturnListPage = () => {
  const classes1 = useStyles1()
  const classes = useStyles();
  const history = useHistory();
  const [purchaseReturnList, setAllPurchaseReturnList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [allStatus, setAllStatus] = React.useState([]);
  const [allItems, setAllItems] = React.useState({});
  const [viewRes, setViewRes] = React.useState("hidden");


  const [invoiceDetail, setInvoiceDetail] = React.useState({});
  const [allvendor, setAllVendors] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [vendorDetail, setVendorDetail] = React.useState({});
  const [vendorAddrss, setVendorAddres] = React.useState({});
  const [allPurchase, setAllPurchase] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [addSearch, setAddSearch] = React.useState({
    txt_purchase_return_no: "",  
    ddl_vendor: "",
    txt_return_bill_from_date: currentDate1(),
    txt_return_bill_to_date: currentDate(),
    });
    const [collapsible, setCollapsible] = React.useState(true)
  const fetchData = () => {
    getListShowroomWarehouse(
      (r) => {
        setAllShowroomWarehouse(r)
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
      id: "polGross",
      label: "Gross Amount",
      align: "right",
    },
    {
      id: "polDiscount",
      label: "Discount",
      align: "right",
    },
    {
      id: "polGst",
      label: "GST Value",
      align: "right",
    },
    {
      id: "polOtherCharges",
      label: "Other Charges",
      align: "right",
    },
 
    {
      id: "polValue",
      label: "Amount",
      align: "right",
    },
   
    // {
    //   id: "poStatus",
    //   label: "Status",
    //   align: "left",
    //   salesStatus: (v) => v,
    // },

    {
      id: "polAction",
      label: "Action",
      align: "right",
    },
  ];
  const onSearchPurchaseReturn = (e) => {
  
    e.preventDefault();
    setLoading(true);
    getSearchPurchaseReturnList(
      (purchaseReturnList) => {
     
       
        //console.log(purchaseReturnList, "sen20045");
          setAllPurchaseReturnList(purchaseReturnList);
          setViewRes("visible");
          setLoading(false);
  
      },
      (err) => {
        setViewRes("visible");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      addSearch
    );

  };


  const onClickRefresh = () => {
   
    setRefresh(!refresh);
    setAddSearch({
      txt_purchase_return_no: "",  
      ddl_vendor: "",
      txt_return_bill_from_date: currentDate1(),
      txt_return_bill_to_date: currentDate(),
   
    });
  };
 

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    //console.log(e.target);
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onSelect = (info, v) => {
    setAddSearch({ ...addSearch, [info.name]: v });
  };
 

  const onClickPrint = (row) => {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: {},
    })
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


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Purchase Return List Report']);
    const periodRow = worksheet.addRow(['Period:']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:E${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:E${periodRow.number}`);
  
    const headers = [
      'Sl No',
      
      'Purchase Return Date',
      'Purchase Return No',
      'Vendor',
     
      'Note',
      

    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const PurchaseReturnListTable = purchaseReturnList.map((purchaseReturn) => {
      return {
        ID: purchaseReturn.polID,
        Purchase_Return_Date: purchaseReturn.polDate,
        Purchase_Return_No: purchaseReturn.polNo,
        Vendor: purchaseReturn.polVendor,
        Note: purchaseReturn.polNote,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    PurchaseReturnListTable.forEach((data) => {
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
  
    const fromDate = addSearch?.txt_return_bill_from_date;
    const toDate = addSearch?.txt_return_bill_to_date;
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);

     const chosenPeriod = ` ${formattedFromDate}  To  ${formattedToDate}`;
    const purchase_return_no = addSearch?.txt_purchase_return_no ? addSearch?.txt_purchase_return_no :"-" ;
    const vendor = addSearch?.ddl_vendor?.label ? addSearch?.ddl_vendor?.label :"-" ;

    // periodCell.value = ` Purchase Return No: ${purchase_return_no}       Period:  ${chosenPeriod} 
    // Vendor: ${vendor} `;

    if (sales_order_no !=="-" ) {
      periodCell.value = ` Purchase Return No : ${purchase_return_no}    Period :  ${chosenPeriod}    `;
  } else if (vendor !=="-"){
    periodCell.value = `Vendor : ${vendor}   Period :  ${chosenPeriod}      `
  }
    else {
      periodCell.value = `Period :  ${chosenPeriod}   `;
  }
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Purchase Return List.xlsx');
  };





const onClickCollaps = () => {
  collapsible ?
    setCollapsible(false)
    :
    setCollapsible(true)
}

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Procurement> Purchase Return"
        btnToolTip="Add Purchase Return"
        addBtnLink="/admin/procurement/add-purchase-return"
    
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Purchase Return"
           btnToolTip={collapsible?"Collaps":"Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
           filterIcon>
           {
              collapsible ?
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="flex-start" alignItems="center">
                <GridItem xs="3">
                  <InputLabel id="label">Purchase Return No</InputLabel>
                  <TextField
                    size="small"
                    type="search"
                    placeholder="Purchase return no"
                    name="txt_purchase_return_no"
                    onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    value={addSearch.txt_purchase_return_no}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs="2">
                  <InputLabel id="label">Date Between</InputLabel>
                  <TextField
                    size="small"
                    name="txt_return_bill_from_date"
                    id="date"
                    variant="outlined"
                    type="date"
                    defaultValue={currentDate1()}
                    fullWidth={true}
                    onChange={onAddSearch}
                    value={addSearch.txt_return_bill_from_date}

                    // value={startDate}
                    // onChange={(v) => //console.log(v.target.value)}
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
                    name="txt_return_bill_to_date"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    defaultValue={currentDate()}
                    onChange={onAddSearch}
                    value={addSearch.txt_return_bill_to_date}

                    // value={startDate}
                    // onChange={(v) => //console.log(v.target.value)}
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
                {/* <GridItem xs="5">
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

                    // onChange={(v) => onSelect("ddl_brand_id", v)}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                  />
                </GridItem> */}
                {/* <GridItem xs="5">
                  <InputLabel id="label">Keyword / Phrase</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Keyword / Pharse"
                    name="txt_keyword_phrase"
                    onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    // value={addSerch.item}
                    variant="outlined"
                  />
                </GridItem> */}

                <GridItem xs="12">
                  <div
                   className={classes.searchbtnRight}
                  >
                    <CustomButton style={{ marginRight: "10px" }}
                     onClick={onSearchPurchaseReturn}>
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
            :''}
          </CustomCard>
        </GridItem>
      </GridContainer>

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
          window.print()
        }}
      >
       
      </MasterModel>
      {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
      <GridContainer className={classes.root} style={{ "visibility": viewRes }}>
        <GridItem xs="12">
        <Card className={classes1.headerCard}>
        <CardHeader className={classes1.TbheaderCdhd} style={{ height: 60 }}>
                  <GridContainer justifyContent="space-between" alignItems="center">
                    <GridItem>
                      <h4 className={classes1.headerCdTitle}>Purchase Order</h4>
                    </GridItem>
                    {globalState.user.user_role !== "Admin" ? ( 
                    <GridItem style={{ cursor: "pointer",display: "none"  }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(purchaseReturnList)} >
                        <Tooltip title="Export to Excel">
                          <img src={require("../../../assets/img/excel.png").default} />
                        </Tooltip>
                      </IconButton>
                    </GridItem>
                    ):(
                      <GridItem style={{ cursor: "pointer" }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(purchaseReturnList)} >
                        <Tooltip title="Export to Excel">
                          <img src={require("../../../assets/img/excel.png").default} />
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

          <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">#</StyledTableCell>
                    <StyledTableCell align="left">Purchase Return Date</StyledTableCell>
                    {/* <StyledTableCell align="left">GRN No</StyledTableCell> */}
                    <StyledTableCell align="left">Purchase Return No</StyledTableCell>
                    <StyledTableCell align="left">Vendor</StyledTableCell>
                    <StyledTableCell align="left">Note</StyledTableCell>

                    {/* <StyledTableCell align="left"> Gross Amount</StyledTableCell>
                    <StyledTableCell align="left">Discount</StyledTableCell>
                    <StyledTableCell align="left">Gst Value</StyledTableCell>
                    <StyledTableCell align="center">Other Charges</StyledTableCell>
                    <StyledTableCell align="center">Amount</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>

                {purchaseReturnList.map((row,i)=>(
                  <StyledTableRow key={i}>
                    <StyledTableCell align="left" className={classes.id}>
                      {row.polID}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.bill_date}>
                      {row.polDate}
                    </StyledTableCell>
                       {/* <StyledTableCell
                      align="left"
                      className={classes.ddl_vendor}>
                      {row.grn_no}
                    </StyledTableCell> */}
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
                      className={classes.ddl_vendor}>
                      {row.polNote}
                    </StyledTableCell>
                    {/* <StyledTableCell
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
                    </StyledTableCell> */}
                  </StyledTableRow>
                ))
                          }

                      
{ purchaseReturnList.length?

                      <StyledTableRow>
                      {/* <StyledTableCell>
                          Total
                      </StyledTableCell>
                     
                      <StyledTableCell>
                      {purchaseReturnList.length
                        ? currencyFormate(
                          purchaseReturnList.reduce(
                              (sum, li) => Number(sum) + parseFloat(li.polGross),
                              0
                            )
                          )
                        : "00"}
                      </StyledTableCell>

                      <StyledTableCell>
                      {purchaseReturnList.length
                        ? currencyFormate(
                          purchaseReturnList.reduce(
                              (sum, li) => Number(sum) + parseFloat(li.polDiscount),
                              0
                            )
                          )
                        : "00"}
                        </StyledTableCell>
                      
                      <StyledTableCell>
                      {purchaseReturnList.length
                        ? currencyFormate(
                          purchaseReturnList.reduce(
                              (sum, li) => Number(sum) + Number(li.polGst),
                              0
                            )
                          )
                        : "00"}
                      </StyledTableCell>
                      <StyledTableCell>
                      {purchaseReturnList.length
                        ? currencyFormate(
                          purchaseReturnList.reduce(
                              (sum, li) => Number(sum) + Number(li.polOtherCharges),
                              0
                            )
                          )
                        : "00"}
                      </StyledTableCell>
                      <StyledTableCell>
                      {purchaseReturnList.length
                        ? currencyFormate(
                          purchaseReturnList.reduce(
                              (sum, li) => Number(sum) + parseFloat(li.polGross+li.polGst+li.polOtherCharges),
                              0
                            )
                          )
                        : "00"}
                      </StyledTableCell> */}
                   </StyledTableRow>  :<StyledTableRow></StyledTableRow>
}
                      {/* ENd of Total */}


                </TableBody>
              </Table>
            </TableContainer>


        


            {/* do not remove the below code */}
             {/* <Box pt={1} >           
                <GridContainer>

                  <Grid item xs={3}>
                    <Box className={classes.tableLabel} ml={21} textAlign="left">
                     <b> Total</b>
                    </Box>
                  </Grid>      


                    <Grid item xs={4}>
                     <Box className={classes.tableLabel} ml={19} textAlign="right">
                      {purchaseReturnList.length
                        ? currencyFormate(
                          purchaseReturnList.reduce(
                              (sum, li) => Number(sum) + Number(li.polGross),
                              0
                            )
                          )
                        : "00"}
                      </Box>
                    </Grid>

                    <Grid item xs={2}>
                     <Box className={classes.tableLabel} ml={9} textAlign="left">
                      {purchaseReturnList.length
                        ? currencyFormate(
                          purchaseReturnList.reduce(
                              (sum, li) => Number(sum) + Number(li.polGst),
                              0
                            )
                          )
                        : "00"}
                      </Box>
                    </Grid> 
                    <Grid item xs={1}>
                     <Box className={classes.tableLabel} ml={1} textAlign="left">
                      {purchaseReturnList.length
                        ? currencyFormate(
                          purchaseReturnList.reduce(
                              (sum, li) => Number(sum) + Number(li.polOtherCharges),
                              0
                            )
                          )
                        : "00"}
                      </Box>
                    </Grid> 
                    <Grid item xs={2}>
                     <Box className={classes.tableLabel} ml={3} textAlign="left">
                      {purchaseReturnList.length
                        ? currencyFormate(
                          purchaseReturnList.reduce(
                              (sum, li) => Number(sum) + Number(li.polValue),
                              0
                            )
                          )
                        : "00"}
                      </Box>
                    </Grid>    
                </GridContainer>

            
              </Box> */}
             </CardBody>
            </Card>
        </GridItem>
      </GridContainer>
          )}

    </ThemeProvider>
  );
};

export default PurchaseReturnListPage;
