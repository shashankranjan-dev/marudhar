import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
// import MuiTable from "../../Components/MuITable";
import MuiTableWP from "../../Components/MuITableWithoutPage";

import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
// Services


import { getAllSalesRegister, getListShowroomWarehouse } from "../../../services/invoiceLIstService";
import { getInvoiceBySalesId } from "../../../services/invoiceLIstService";
import { getItemDetailById } from "../../../services/saleService/addEnqueryService";
import {
  getAllCustomers,
  getListCustomers,
} from "../../../services/customerListService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Paper, Box, Grid } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
//status service
import { getListStatus } from "../../../services/addStatusService";
import {
  currencyFormate, currentDate1

} from "../HelperComponent/utils";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
// import InvoicePreview from "./InvoiceView/InvoicePreview";
import ReactSelect from "react-select";
import theme from "../../../theme/theme";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

// import React from "react";
import {
  appFontWeight,
  appFontWeightThin,

  appDefaultColor,
  appSecondColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { currentDate } from "../HelperComponent/utils";
import FormComponent from "../HelperComponent/FormComponent";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from 'file-saver';
import XLSX from 'xlsx'

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

//PDF
import pdfIcon from "../../../assets/img/pdf-icon.png"
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
const ExcelJS = require('exceljs');

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
  tableLabel: {
    fontWeight: 500,
    color: appSecondColor,
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

const SalesRegisterPage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const classes = useStyles();
  const [salesId, setSalesId] = React.useState("");
  const [globalState, dispatch] = useStateValue();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allStatus, setAllStatus] = React.useState([]);
  const [allInvoices, setAllInvoices] = React.useState([]);
  const [allCustomer, setAllCustomer] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [invoiceDetails, setInvoiceDetails] = React.useState({});
  const [invItemDetails, setInvItemDetails] = React.useState([]);
  const [customerDetail, setCustomerDetails] = React.useState({});
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [dataCal, setDataCal] = React.useState([]);
  const [searchDetail, setSearchDetail] = React.useState({
    txt_invoice_date_from: currentDate1(),
    txt_invoice_date_to: currentDate(),
    txt_invoice_no: "",
    txt_keyword_phrase: "",
    ddl_status: "",
    ddl_customer: "",
    ddl_showroom_warehouse: "",

  });

  const [salesPdf, setAllSalesPdf] = React.useState([]);
  const [searchPdf, setAllSearchListPdf] = React.useState([])


  const [collapsible, setCollapsible] = React.useState(true)
  const [cal, setCal] = React.useState([])
  const fetchData = () => {
    setLoading(true);
    getListStatus(
      "Sales",
      (r) => {
        setAllStatus(r);
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
        setAllShowroomWarehouse(r)
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
    setLoading(true);
    getListCustomers(
      (r) => {
        setAllCustomer(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    // getAllSalesRegister(
    //   (r) => {
    //     setAllInvoices(r);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );
    ////console.log("hey")
    setLoading(false);
  }, [globalState.refresh]);

  const headerData = [
    {
      id: "inv_serial_no",
      label: "#",
      align: "left",
    },
    {
      id: "inv_invoice_date",
      label: "Invoice Date",
      align: "left",
    },
    {
      id: "inv_invoice_no",
      label: "Invoice No",
      align: "left",
    },
    {
      id: "inv_customer",
      label: "Client",
      align: "left",
    },
    {
      id: "inv_gross_amount",
      label: "Gross Amount",
      align: "right",
    },
    // {
    //   id: "inv_taxes",
    //   label: "SGST",
    //   align: "right",
    // },
    // {
    //   id: "inv_taxes",
    //   label: "CGST",
    //   align: "right",
    // },
    {
      id: "inv_gst1",
      label: "GST Value",
      align: "right",
    },

    {
      id: "inv_OtherCharges1",
      label: "Other Charges",
      align: "right",
    },
    {
      id: "inv_NetAmount2",
      label: "Amount",
      align: "right",
    },
    // {
    //   id: "inv_Action",
    //   label: "Action",
    //   align: "right",
    // },
  ];


  const headerDataPdf = [["Sr. No.", "Invoice Date", "Invoice No", "Client", "Gross Amount", "GSTValue", "Other Charges", "Amount"]];
  const searchData = [[searchDetail?.txt_invoice_no ? `Invoice: ${searchDetail?.txt_invoice_no}` : '',
  searchDetail?.ddl_customer?.label ? `Customer: ${searchDetail?.ddl_customer?.label}` : '',
  searchDetail?.ddl_showroom_warehouse?.label ? `Warehouse : ${searchDetail?.ddl_showroom_warehouse?.label}` : '',
  `From Date: ${searchDetail?.txt_invoice_date_from}`,
  `To Date: ${searchDetail?.txt_invoice_date_to}`,


  ]];

  const totalData = [["          ", "Total",
    "    ", "    ", "           ", "       ", "       ", "          ",
    allInvoices.length
      ? (
        allInvoices.reduce(
          (sum, li) => Number(sum) + Number(li.inv_gross_amount_ForTotal),
          0
        )
      ).toFixed(2)
      : "",
    "    ",
    allInvoices.length
      ? (
        allInvoices.reduce(
          (sum, li) => Number(sum) + Number(li.inv_gst_forTotal),
          0
        )
      ).toFixed(2)
      : "",
    "   ",
    allInvoices.length
      ? (
        allInvoices.reduce(
          (sum, li) => Number(sum) + Number(li.inv_OtherCharges),
          0
        )
      ).toFixed(2)
      : "",
    "          ",
    allInvoices.length
      ? (
        allInvoices.reduce(
          (sum, li) => Number(sum) + Number(li.inv_NetAmount),
          0
        )
      ).toFixed(2)
      : ""

  ]]


  const onSelectDetails = (name, v) => {
    setSearchDetail({ ...searchDetail, [name]: v });
  };
  const onChangeSearchForm = (e) => {
    const { name, value } = e.target;
    setSearchDetail({ ...searchDetail, [name]: value });
  };

  const onClickPrint = (row) => {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: {},
    });
    getInvoiceBySalesId(
      row.sales_id,
      (details) => {
        setInvoiceDetails(details);
        setInvItemDetails(details.invoice_item_details);
        setCustomerDetails(details.invoice_details[0].allAddress[0]);
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: {},
        });
        setClassicModal(true);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: {},
        });
      }
    );
  };

  const onSearch = (e) => {
    e.preventDefault();
    setRefresh(false);
    setLoading(true);
    let gam = 0;
    let nam = 0;
    if (searchDetail.txt_bill_no || searchDetail.ddl_customer || searchDetail.ddl_showroom_warehouse
      || searchDetail.txt_invoice_date_from || searchDetail.txt_invoice_date_to)
      getAllSalesRegister(
        (r, pdf) => {
          if (r.length) {
            //console.log("sen10022023/res", r)
            setAllInvoices(r);
            setAllSalesPdf(pdf);
            setLoading(false);
            r.map((d) => {
              gam = gam + d.inv_gross_amount_ForTotal,
              nam = nam + d.inv_NetAmount2
            })
            // console.log("sen10022023=>>",gam,nam)
            setDataCal({
              grossAmount: gam,
              netAmount: nam
            })

          } else {
            setLoading(false);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, "Invoice Order not found": "info" },
            });
          }
        },
        (err) => {
          setAllInvoices([])
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
          setLoading(false);
        },
        searchDetail
      );
  };

  const onClearState = () => {
    setRefresh(!refresh);
    setSearchDetail({
      txt_invoice_date_from: currentDate1(),
      txt_invoice_date_to: currentDate(),
      txt_bill_no: "",
      ddl_customer: "",
      txt_keyword_pharse: "",
      ddl_status: "",
    });
  };

  const searchFormData = [
    {
      name: "txt_bill_no",
      label: "Invoice No",
      hidden: false,
      required: false,
      align: "left",
      data_type: "search",
      html_element: "TextField",
      error: false,
      xs: 12,
      md: 4,
      lg: 3,
    },
    {
      name: "txt_invoice_date_from",
      label: "Date Between",
      hidden: false,
      required: false,
      align: "left",
      data_type: "date",
      html_element: "TextField",
      error: false,
      xs: 12,
      md: 4,
      lg: 2,
    },
    {
      name: "txt_invoice_date_to",
      hidden: false,
      required: false,
      align: "left",
      data_type: "date",
      html_element: "TextField",
      error: false,
      xs: 12,
      md: 4,
      lg: 2,
    },
    {
      name: "ddl_customer",
      label: "Client",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "select_two",
      xs: 12,
      md: 6,
      lg: 5,
      options: allCustomer,
    },
    {
      name: "ddl_showroom_warehouse",
      label: "Showroom / Warehouse",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "select_two",
      xs: 12,
      md: 6,
      lg: 5,
      options: allShowroomWarehouse,
    },
    // {
    //   name: "txt_keyword_phrase",
    //   label: "Keyword / Pharse",
    //   hidden: false,
    //   required: false,
    //   align: "left",
    //   data_type: "string",
    //   html_element: "TextField",
    //   marginBottom: -15,
    //   defaultValue: "",
    //   error: false,
    //   xs: 12,
    //   md: 4,
    //   lg: 4,
    // },
    // {
    //   name: "ddl_type",
    //   label: "Report Type",
    //   hidden: false,
    //   required: false,
    //   data_type: "string",
    //   html_element: "select_two",
    //   xs: 12,
    //   md: 6,
    //   lg: 4,
    //   options: [
    //     {
    //       label: "Details",
    //       value: "details",
    //     },
    //     {
    //       label: "Summary",
    //       value: "summary",
    //     },
    //   ],
    // },
  ];


  // export to excel

  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Sales Register Report']);
    const periodRow = worksheet.addRow(['Period:']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:H${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:H${periodRow.number}`);
  
    const headers = [
      'Sl No',
      'Bill date',
      'Bill no',
      'Client',
      'Gross amount',
      'Gst value',
      'Other Charges',
      'Net Amount',
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const SalesRegisterTable = allInvoices.map((item) => {
      return {
        Sl_No: item.inv_serial_no,
        Bill_date: item.inv_invoice_date,
        Bill_no: item.inv_invoice_no,
        Client: item.inv_customer,
        Gross_amount: item.inv_gross_amount_ForTotal,
        Gst_value: item.inv_gst,
        OtherCharges: item.inv_OtherCharges,
        NetAmount: item.inv_NetAmount,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    SalesRegisterTable.forEach((data) => {
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
    
  
    const fromDate = searchDetail?.txt_invoice_date_from;
    const toDate = searchDetail?.txt_invoice_date_to;
    
    
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    
    const chosenPeriod = ` ${formattedFromDate}  To  ${formattedToDate}`;
    periodCell.value = `Period :  ${chosenPeriod}`;
    
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'SalesRegisterTable.xlsx');
  };


  //pdf
  const onClickPdf = (e) => {
    e.preventDefault();

    let doc = new jsPDF("landscape", 'pt', 'A4');
    autoTable(doc, {
      head: searchData,
      body: searchPdf,
      didDrawCell: (ledgerPdf) => {
        //console.log(ledgerPdf.column.index)
      },
    })
    autoTable(doc, {
      head: headerDataPdf,
      body: salesPdf,
      didDrawCell: (purchasePdf) => {
        //console.log(purchasePdf.column.index)
      },
    })
    autoTable(doc, {
      head: totalData,
      body: searchPdf,
      didDrawCell: (purchasePdf) => {
        //console.log(purchasePdf.column.index)
      },
    })
    doc.save(`SalesRegister${currentDate()}.pdf`);
    // doc.html(document.getElementById('pdf-view'), {
    //   callback: () => {
    //     doc.save(`JournalByGRN${currentDate()}.pdf`);
    //   }
    // });
    // setClassicModal(true);
  };


  const onClickCollaps = () => {
    collapsible ?
      setCollapsible(false)
      :
      setCollapsible(true)
  }

  // const calculation = () => {
  //   let gam = 0;
  //   let nam = 0;

  //   if (allInvoices) {
  //     allInvoices.map((r) => {
  //       gam = gam + r.inv_gross_amount_ForTotal,
  //       nam=gam + r.inv_NetAmount
  //     })
  //   }

  //   setDataCal({
  //     grossamount:gam,
  //     netAmount:nam
  //   })
  //   //console.log("sen10022023=>>",gam,nam)
  // }
  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="MIS Report > Sales Register "
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Sales Register"
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon>
            {
              collapsible ?
                <GridContainer style={{ padding: "5px 20px" }} alignItems="center">
                  {searchFormData.map((item, key) => {
                    return (
                      <>
                        <FormComponent
                          item={item}
                          key={key}
                          onSelect={onSelectDetails}
                          state={searchDetail}
                          onChange={onChangeSearchForm}
                          error={{}}
                        />
                      </>
                    );
                  })}
                  <GridItem xs="7">
                    <div className={classes.searchbtnRight}>
                      <CustomButton
                        style={{ marginRight: "10px" }}
                        onClick={onSearch}
                      >
                        <SearchIcon />
                      </CustomButton>
                      <CustomButton onClick={onClearState}>
                        <RotateLeftIcon />
                      </CustomButton>
                    </div>
                  </GridItem>
                </GridContainer>
                : ''}
          </CustomCard>
        </GridItem>
      </GridContainer>
      {invoiceDetails?.invoice_no && (
        <MasterModel
          classicModal={classicModal}
          onCloseModel={(e) => {
            e.preventDefault();
            setClassicModal(false);
          }}
          height="auto"
          okBtnText="Print"
          modelName="Invoice"
          onClickOk={(e) => {
            e.preventDefault()
            window.print()
          }}
        >
          <InvoicePreview
            invoiceDetails={invoiceDetails}
            invItemDetails={invItemDetails}
            customerDetail={customerDetail}
          />
        </MasterModel>
      )}

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <Card className={classes1.headerCard}>
              <CardHeader className={classes1.TbheaderCdhd} style={{ height: 60 }}>
                <GridContainer justifyContent="space-between" alignItems="center">
                  <GridItem>
                    <h4 className={classes1.headerCdTitle}>Sales Register Summary</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? (
                  <GridItem style={{ cursor: "pointer",display: "none" }}>

                    {/* ////////////////////////////PDF/////////////////// */}
                    <IconButton onClick={onClickPdf}>

                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />

                      </Tooltip>
                    </IconButton>

                    <IconButton variant="text"
                     onClick={() => onhandleExportToExcel(allInvoices)} 
                     >
                      <Tooltip title="Export to Excel">
                        <img src={require("../../../assets/img/excel.png").default} />
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

                    <IconButton variant="text"
                     onClick={() => onhandleExportToExcel(allInvoices)} 
                     >
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
                {!refresh ?
                  <MuiTableWP
                    columns={headerData}
                    rows={allInvoices}
                    onClickPrint={onClickPrint}
                    pagination={false}
                  /> : ""}
                <Box pt={1} >
                  {!refresh ?
                    <GridContainer>

                      <Grid item xs={1}>
                        <Box className={classes.tableLabel} textAlign="right">
                          <b> Total</b>
                        </Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Box className={classes.tableLabel} textAlign="right">

                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box className={classes.tableLabel} textAlign="left">

                        </Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Box className={classes.tableLabel} textAlign="left">

                        </Box>
                      </Grid>




                      <Grid item xs={2}>
                        <Box className={classes.tableLabel} ml={4} textAlign="right">
                          {/* {//console.log("sen0902",allInvoices.map(
                                 (prev, curr) =>prev.inv_gross_amount_ForTotal === NaN?"true":''
                                
                              ))} */}
                          {/* {allInvoices.length
                            ?
                            allInvoices.reduce(
                              (prev, curr) => { return prev + Number(curr.inv_gross_amount_ForTotal) },
                              0
                            )

                            : ""} */}

                            {dataCal.grossAmount?currencyFormate(dataCal.grossAmount):''}
                        </Box>
                      </Grid>

                      <Grid item xs={1}>
                        <Box className={classes.tableLabel} ml={-4} textAlign="right">
                          {allInvoices.length
                            ? currencyFormate(
                              allInvoices.reduce(
                                (sum, li) => Number(sum) + Number(li.inv_gst_forTotal),
                                0
                              )
                            )
                            : ""}
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Box className={classes.tableLabel} ml={2} textAlign="center">
                          {allInvoices.length
                            ? currencyFormate(
                              allInvoices.reduce(
                                (sum, li) => Number(sum) + Number(li.inv_OtherCharges),
                                0
                              )
                            )
                            : ""}
                        </Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Box className={classes.tableLabel} ml={-3} textAlign="center">
                          {/* {allInvoices.length
                            ? (
                              allInvoices.reduce(
                                (sum, li) => Number(sum) + Number(li.inv_NetAmount_ForTotal),
                                0
                              )
                            ).toFixed(2)
                            : ""} */}
                            {dataCal.netAmount?currencyFormate(dataCal.netAmount):''}
                        </Box>
                      </Grid>
                    </GridContainer>
                    : ""}

                </Box>
              </CardBody>
            </Card>

          )}
        </GridItem>
        {/* <GridItem xs="12" visibility="hidden">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center" display={{xs:"none",lg:"block"}}>
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard cdTitle="Sales Register Details " minHeight="auto">
              <MuiTable
                columns={saleData}
                rows={allInvoices}
                onClickPrint={onClickPrint}
              />
            </CustomCard>
            
          )}
        </GridItem> */}
      </GridContainer>

      {/* pdf */}
      <MasterModel
        // classicModal={classicModal}
        // onCloseModel={(e) => {
        //   e.preventDefault();
        //   setClassicModal(false);
        // }}
        height="auto"
        okBtnText="Pdf"
        modelName="Purchase Register"
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
          }}>
          <div style={{ textAlign: "center", borderBottom: "1px solid", width: "72%" }} ><h4>Sales Register</h4></div>
          <div>
            {
              searchDetail ?
                <GridContainer style={{ margin: 2, textAlign: "center", borderBottom: "1px solid", width: "100%" }}>
                  <GridItem>
                    {searchDetail?.txt_invoice_no ? `Invoice: ${searchDetail?.txt_invoice_no}` : ''}
                  </GridItem>

                  <GridItem>
                    {searchDetail?.ddl_customer?.label ? `Customer: ${searchDetail?.ddl_customer?.label}` : ''}
                  </GridItem>


                  <GridItem>
                    {searchDetail?.ddl_showroom_warehouse?.label ? `Warehouse : ${searchDetail?.ddl_showroom_warehouse?.label}` : ''}
                  </GridItem>

                  <GridItem >
                    {searchDetail?.txt_invoice_date_from ? `From Date: ${searchDetail?.txt_invoice_date_from}` : ''}
                  </GridItem>

                  <GridItem >
                    {searchDetail?.txt_invoice_date_to ? `To Date: ${searchDetail?.txt_invoice_date_to}` : ''}
                  </GridItem>
                </GridContainer>
                : ''
            }
          </div>

          <TableContainer>
            <GridContainer style={{ height: "auto", padding: 12, width: 830, margin: 2, }}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead >
                  <TableRow>
                    <StyledTableCell align="left">#</StyledTableCell>
                    <StyledTableCell align="left">Invoice Date</StyledTableCell>
                    <StyledTableCell align="left">Invoice No</StyledTableCell>
                    <StyledTableCell align="left">Client</StyledTableCell>
                    <StyledTableCell align="left"> Gross Amount</StyledTableCell>
                    <StyledTableCell align="center">GST Value</StyledTableCell>
                    <StyledTableCell align="center">Other Charges</StyledTableCell>
                    <StyledTableCell align="center">Amount</StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>


                  {allInvoices.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="left" className={classes.id}>
                        {row.inv_serial_no}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.bill_date}>
                        {row.inv_invoice_date}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.txt_bill_no}>
                        {row.inv_invoice_no}
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.ddl_vendor}>
                        {row.inv_customer}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.grossamount}
                      >
                        {currencyFormate(row.inv_gross_amount_ForTotal)}
                      </StyledTableCell>

                      <StyledTableCell align="right" className={classes.amount}>
                        {currencyFormate(row.inv_gst)}
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.amount}>
                        {currencyFormate(row.inv_OtherCharges)}
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.amount}>
                        {currencyFormate(row.inv_NetAmount)}
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

export default SalesRegisterPage;
