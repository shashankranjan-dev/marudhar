import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
//import Button from "components/CustomButtons/Button.js";
//import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../../Components/CustomButton";
//SERVICE
import { getListShowroomWarehouse } from "../../../../services/showroomWarehouseService";
import { getListCustomers } from "../../../../services/customerListService";
import { useStateValue } from "../../../../context/context";
import { actionTypes } from "../../../../context/reducer";
//import { ReceivedRowData } from "../../../services/receivedService";
import { getAllItemReceivedList,getSearchAllItemReceivedList } from "../../../../services/ItemReceivedService";
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
import { ThemeProvider } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import {  Box } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";

import theme from "../../../../theme/theme";
import ReactSelect from "react-select";
import {
  appDefaultColor,
  appSecondColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../../HelperComponent/PageTitle";
import { getInvoiceBySalesId, getAllSalesReturn } from "../../../../services/invoiceLIstService";
import {updateSalesRetrun,getAllSalesReturnForEditDil,getAllSalesReturnForId,getInvoiceBySalesIdview} from "../../../../services/salesRetrunServices"
import { currentDate,currentDate1,sortWord } from "../../HelperComponent/utils";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import  FileSaver from 'file-saver';
import XLSX from 'xlsx'
import MasterModelForView from "../../../Components/MasterModelForView";
import SalesReturnListView from "./SalesReturnListView";
const ExcelJS = require('exceljs');


const useStyles1 = makeStyles(styles);
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

  searchBar: {
    padding: "10px",
  },
  activeText: {
    fontSize: "15px",
    color: appSecondColor,
    fontWeight: 400,
  },
  input: {
    height: 40,
    lineLight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
  customSelect: {
    marginBottom: 15,
  },
}));

const SalesReturnListPage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [salesReturn, setAllsalesReturn] = React.useState([]);
  const [viewRes, setViewRes] = React.useState("hidden");
  const [classicModalView, setClassicModalView] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [invoiceDetails, setInvoiceDetails] = React.useState([]);
  const [invoiceItemDetails, setInvoiceItemDetails] = React.useState([]);
  const [showroomDetails, setShowroomDetails] = React.useState([]);

  const [itemDetails, setItemDetails] = React.useState([]);
  const [allCustomer, setAllCustomers] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [addSearch, setAddSearch] = React.useState({
    sales_return_date_from: currentDate1(),
    sales_return_date_to: currentDate(),
    ddl_customer:"",
    ddl_showroom_warehouse: "",
    txt_sales_ret_no:"",
    txt_invoice_no:"",
  });
  const [collapsible, setCollapsible] = React.useState(true)
  const [otherCharges, setOtherCharges] = React.useState([]);

  const fetchData = () => {
    getListCustomers(
      (r) => {
        setAllCustomers(r);
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
        //console.log(r,"samk2321")
        setAllShowroomWarehouse(r)
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    // getAllItemReceivedList(
    //   (r) => {
    //     setReceivedGRN(r);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );
  };
  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  const headerData = [
    {
      id: "salesRetID",
      label: "#",
      align: "left",
    },
    {
      id: "salesRetNo",
      label: "Sales Return No",
      align: "left",
    },
    {
      id: "salesRetDate",
      label: "Sales Return Date",
      align: "left",
    },
    {
      id: "invoice_no",
      label: "Invoice No",
      align: "left",
    },
    {
      id: "salesRetCustomer",
      label: "Customer",
      align: "left",
    },
    {
      id: "sales_return_bill_value",
      label: "Showroom / Warehouse",
      align: "right",
    },
    {
      id: "salesRetStatus",
      label: "Status",
      align: "center",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    {
      id: "salesRetAction",
      label: "Action",
      align: "right",
    },
  ];
  const billData = [
    {
      id: "",
      label: "#",
      align: "left",
    },
    {
      id: "",
      label: "Invoice Date",
      align: "left",
    },
   
    {
      id: "",
      label: "Invoice No",
      align: "left",
    },
    {
      id: "",
      label: "Invoice Value",
      align: "left",
    },
    {
      id: "",
      label: "Customer",
      align: "left",
    },
    
  ];

  const onSearchSalesReturns = (e) => {
    e.preventDefault();
    setLoading(true);
    
    getAllSalesReturnForEditDil(
      (receivedList) => {
        //console.log("sank2207", receivedList);
        if (receivedList[0]?.sales_return_item_details.length) {    
          setAllsalesReturn(receivedList);
          setViewRes("visible");
          setLoading(false);
        } else {
          setViewRes("visible");
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Sales return not found": "info"},
          });
        }
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
 

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onSelect = (info, v) => {
    setAddSearch({ ...addSearch, [info.name]: v });
  };

  const onClickRefresh = () => {
    setRefresh(!refresh);
    setAddSearch({
      sales_return_date_from: currentDate1(),
      sales_return_date_to: currentDate(),
      ddl_customer:"",
      ddl_showroom_warehouse: "",
      txt_sales_ret_no:"",
      txt_invoice_no:"",
    
    });
  };


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Sales Return List Report']);
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
      'Sales Return No',
      'Sales Return Date',
      'Invoice No',      
      'Customer',
      'Sales Return Bill Value',      
      
      
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const SalesReturnTable = salesReturn.map((salesReturn) => {
      return {
        ID: salesReturn.salesRetID,
        sales_Return_No: salesReturn.salesRetNo,
        sales_Retyrn_Date:salesReturn.salesRetDate,
        invoice_no:salesReturn.invoice_no,
        Customer: salesReturn.salesRetCustomer,
        sales_return_bill_value: (salesReturn.sales_return_bill_value).replace('₹ ',''),
              
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    SalesReturnTable.forEach((data) => {
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
    
  
    const fromDate = addSearch?.sales_return_date_from;
    const toDate = addSearch?.sales_return_date_to;
    
    
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    
    const chosenPeriod = ` ${formattedFromDate}  To  ${formattedToDate}`;
    // const Status = addSearch?.ddl_status?.label ;
    const customer = addSearch?.ddl_customer?.label ? addSearch?.ddl_customer?.label : "-" ;

    
    const sales_order_no = addSearch?.txt_sales_ret_no ? addSearch?.txt_sales_ret_no :"-" ;

    

    // periodCell.value = `Sales Return No : ${sales_order_no}    Period :  ${chosenPeriod}  customer : ${customer}     `;

    if (sales_order_no !=="-" ) {
      periodCell.value = `Sales Return No : ${sales_order_no}    Period :  ${chosenPeriod}  `;
  } else if (customer !=="-"){
    periodCell.value = `Period :  ${chosenPeriod}   customer : ${customer}   `
  }
    else {
      periodCell.value = `Period :  ${chosenPeriod}  `;
  }
    
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Sales Return List.xlsx');
  };

 

    const onClickCollaps = () => {
      collapsible ?
        setCollapsible(false)
        :
        setCollapsible(true)
    }
  

    const onClickView = (e) => {
      //console.log(e,"sannk2307")
      setClassicModalView(true)
      setLoading(true);
      getAllSalesReturnForId(
        e.sales_id,
        e.sales_return_id,
        
        (details) => {
          //console.log("sank220022",details.sales.invoice_item_details);
          setItemDetails(details);
          setInvoiceDetails(details.sales.invoice_item_details);
          setInvoiceItemDetails(details.sales_return_item_details);
          setOtherCharges(details.sales_return_other_charges);
          setLoading(false);
        },
        (err) => {
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );

    }


  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Sales > Sales Return"
        btnToolTip="Add Sales Return"
        addBtnLink="/admin/sales/invoices-sales-return"
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Sales Returns" 
           btnToolTip={collapsible?"Collaps":"Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
          filterIcon>
           {
              collapsible ?
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="flex-start" alignItems="center">
                <GridItem xs="3">
                  <InputLabel id="label">Sales Return No</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Sales Return No"
                    name="txt_sales_ret_no"
                    type="search"
                    id="outlined-basic"
                    fullWidth={true}
                    onChange={onAddSearch}
                    value={addSearch.txt_sales_ret_no}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs="2">
                  <InputLabel id="label">Date Between</InputLabel>
                  <TextField
                    size="small"
                    id="date"
                    variant="outlined"
                    type="date"
                    onChange={onAddSearch}
                    name="sales_return_date_from"
                    value={addSearch.sales_return_date_from}
                    fullWidth={true}
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
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    // defaultValue={currentDate()}
                    onChange={onAddSearch}
                    name="sales_return_date_to"
                    value={addSearch.sales_return_date_to}
                    className={classes.dateField}
                    inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                  />
                </GridItem>
                <GridItem xs="5">
                  <InputLabel id="label">Customer</InputLabel>
                  <ReactSelect
                    options={allCustomer.sort(sortWord("label"))}
                    name="ddl_customer"
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_customer}

                  />
                </GridItem>

                <GridItem xs="3">
                  <InputLabel id="label">Invoice No</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Invoice No"
                    name="txt_invoice_no"
                    type="search"
                    onChange={onAddSearch}
                    value={addSearch.txt_invoice_no}
                    id="outlined-basic"
                    fullWidth={true}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs="5">
                  <InputLabel id="label">Showroom / Warehouse</InputLabel>
                  <ReactSelect
                    options={allShowroomWarehouse.sort(sortWord("label"))}
                    name="ddl_showroom_warehouse"
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_showroom_warehouse}
             
                  />
                </GridItem>
                
                {/* <GridItem xs="5">
                  <InputLabel id="label">Keyword / Pharse</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Keyword / Pharse"
                    name="txt_keyword_Phrase"
                    onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    variant="outlined"
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
                    <CustomButton style={{ marginRight: "10px" }} 
                    onClick={onSearchSalesReturns}>
                      <SearchIcon />
                    </CustomButton>
                    <CustomButton  onClick={onClickRefresh}>
                      <RotateLeftIcon />
                    </CustomButton>
                  </div>
                </GridItem>
              </GridContainer>
            </Paper>
            :''}
          </CustomCard>
        </GridItem>
      </GridContainer>
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
                      <h4 className={classes1.headerCdTitle}>Sales Returns</h4>
                    </GridItem>
                    {globalState.user.user_role !== "Admin" ? ( 
                    <GridItem style={{ cursor: "pointer",display: "none"  }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(salesReturn)} >
                        <Tooltip title="Export to Excel">
                          <img src={require("../../../../assets/img/excel.png").default} />
                        </Tooltip>
                      </IconButton>
                    </GridItem>
                    ):(
                      <GridItem style={{ cursor: "pointer" }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(salesReturn)} >
                        <Tooltip title="Export to Excel">
                          <img src={require("../../../../assets/img/excel.png").default} />
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
            <MuiTable columns={headerData} rows={salesReturn} onClickViewOne={onClickView} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
          )}


      <MasterModelForView
        classicModal={classicModalView}
        viewHeader="Sales Return View"
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModalView(false);
        }}
        onClickOk={(e) => {
          e.preventDefault();
          setClassicModalView(false);
        }}
      >
         {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
        <SalesReturnListView 
          title1="Bill Details"
          title="Sales Return Details"
          billData={billData}
          addedItems={addedItems}
          viewData={headerData}
          itemDetails={itemDetails}
          invoiceDetails={invoiceDetails}
          invoiceItemDetails={invoiceItemDetails}
          allShowroomWarehouse={allShowroomWarehouse}
          otherCharges={otherCharges}
        />
          )}
      </MasterModelForView>
    </ThemeProvider>
  );
};

export default SalesReturnListPage;
