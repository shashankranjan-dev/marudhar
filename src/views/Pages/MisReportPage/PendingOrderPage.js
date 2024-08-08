import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import CircularProgress from "@material-ui/core/CircularProgress";

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
import {
  currencyFormate,
  currentDate,
  currentDate1,
} from "../HelperComponent/utils";
import { getListUsers } from "../../../services/associateService";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { getListVendor } from "../../../services/vendorService";
import { getJournalByGrn } from "services/journalbygrn";

//PDF
import pdfIcon from "../../../assets/img/pdf-icon.png";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getSalesOrderReport } from "services/pendingOrderService";
import { getAllItemById } from "services/pendingOrderService";
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
  itemImgPaper: {
    marginRight: "15px",
    width: "80px",
    height: "80px",
    overflow: "hidden",
  },
  container: {
    ...appScrollBar,
    maxHeight: 360,
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
    width: "15%",
  },
  itemDetails1: {
    width: "20%",
  },
  itemDetails2: {
    width: "10%",
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
    width: "20%",
  },
  customSelect: {
    marginBottom: 15,
  },
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "22px",
    },
  },
}));

const PendingOrderPage = () => {
  const classes1 = useStyles1();

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [allSalesMan, setAllSalesMan] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [billDetail, setBillDetail] = React.useState({});
  const [allVendor, setAllVendor] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
    txt_sales_order_no: "",
    ddl_item:"",
    txt_from_date: currentDate1(),
    txt_to_date: currentDate(),
  });
  const [viewRes, setViewRes] = React.useState("hidden");
  const [collapsible, setCollapsible] = React.useState(true);
  const [addItem, setAddItem] = React.useState({
    category: "",
    sales_id: "",
    item_id: "",
    category_id: "",
  });
  const [allSalesOrder, setAllSalesOrder] = React.useState([]);
  const [allSalesOrderPdf, setAllSalesOrderPdf] = React.useState([]);
  const [searchPdf, setAllSearchListPdf] = React.useState([])
  const [item, setAllItem] = React.useState([])


  // const fetchData = () => {
  //   getSalesOrderReport(
  //       (r) => {
  //     //console.log(r,"sansales");

  //         if (r.length) {
  //           setAllSalesOrder(r)
  //           setLoading(false);

  //         } else {

  //           setLoading(false);
  //           dispatch({
  //             type: actionTypes.SET_OPEN_MSG,
  //             payload: { msg: err, "sales order  Report not found": "info" },
  //           });
  //         }
  //       },
  //       (err) => {
  //           setAllSalesOrder([])

  //         setLoading(false);
  //         dispatch({
  //           type: actionTypes.SET_OPEN_MSG,
  //           payload: { msg: err, msgType: "error" },
  //         });
  //       },
  //       // addSearch
  //     );
  // };

  //   const headerDataPdf = [["Sr. No.", "GRN No.", "Voucher No.", "Vendor", "Purchase Value","Total Journal","Journal Amount"]];
  //  const searchData = [[
  //                        addSearch?.txt_grn_no ? ` GRN No: ${addSearch?.txt_grn_no}` : '',
  //                        addSearch?.ddl_vendor?.label ? `Vendor: ${addSearch?.ddl_vendor?.label}` : '',
  //                        addSearch?.txt_from_date ? `From Date: ${addSearch?.txt_from_date}` : '',
  //                        addSearch?.txt_to_date ? `To Date: ${addSearch?.txt_to_date}` : ''
  //                     ]];

  // React.useEffect(() => {
  //   fetchData();

  // }, []);

  const fetchData = () => {
    getAllItemById(
      (r) => {
        setAllItem(r);
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
    if (!addSearch.ddl_item) {
      
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Please select an item before searching", msgType: "error" },
      });
      return; 
    }
    setLoading(true);

    getSalesOrderReport(
      addSearch,
      (r,pdf) => {
        //console.log(r, "sansales");
        if (r.length) {
          setAllSalesOrder(r);
          setAllSalesOrderPdf(pdf);
          setLoading(false);
        } else {
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: "Pending Order not found", msgType: "error" },
          });
        }
      },
      (err) => {
        setAllSalesOrder([]);

        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      
    );
  };

  const onClickRefresh = () => {
    setRefresh(!refresh);
    setAddSearch({
      txt_sales_order_no: "",
      ddl_item:"",

      txt_from_date: currentDate1(),
      txt_to_date: currentDate(),
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setAddItem((prv) => ({ ...prv, [name]: value }));
  };
  const classes = useStyles();


  const headerDataPdf = [["Sr. No.", "Sales Date", "Sales Order No", "Status", "Items_name","Quantity","Rate","Amount"]];
  const searchData = [[
    addSearch?.txt_sales_order_no ? ` Sales Order No: ${addSearch?.txt_sales_order_no}` : '',
    addSearch?.txt_item ? `Item: ${addSearch?.txt_item}` : '',
    addSearch?.txt_from_date ? `From Date: ${addSearch?.txt_from_date}` : '',
    addSearch?.txt_to_date ? `To Date: ${addSearch?.txt_to_date}` : ''
 ]];


 const onhandleExportToExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('data');

  const titleRow = worksheet.addRow(['Report Name : Pending Order Report']);
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
    'Sales Date',
    'Sales Order No',
    'Status',
    'Items Name',
    'Quantity',
    'Rate',   
    'Amount',
    

  ];

  // Add headers as a row
  worksheet.addRow(headers);

  const PendingOrderTable = allSalesOrder.map((allSalesOrder) => {
    return {
      Sl_No: allSalesOrder.id,
      Sales_Date:allSalesOrder.sales_order_date,
      SalesOrderNo:allSalesOrder.sales_order_no,
      Status:allSalesOrder.status_name,
      Items_name:allSalesOrder.item_name,
      Quantity : allSalesOrder.quantity,
      Rate: allSalesOrder.rate,
      Amount:allSalesOrder.amount
    };
  });

  const dataStartRow = 4;

  const headerRow = worksheet.getRow(dataStartRow);
  headerRow.height = 20;

  headers.forEach((header, index) => {
    const column = worksheet.getColumn(index + 1);
    column.width = header.length + 5;
  });

  PendingOrderTable.forEach((data) => {
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

  const fromDate = addSearch?.txt_from_date;
  const toDate = addSearch?.txt_to_date;
  const formattedFromDate = formatDate(fromDate);
  const formattedToDate = formatDate(toDate);

   const chosenPeriod = ` ${formattedFromDate}  To  ${formattedToDate}`;
  const item = addSearch?.ddl_item?.label ;
  const sales_order_no = addSearch?.txt_sales_order_no ? addSearch?.txt_sales_order_no:"-";

  // periodCell.value = `Item: ${item}       Period:  ${chosenPeriod} 
  //      Sales Order No: ${sales_order_no} `;
 
       if (addSearch?.ddl_item &&  addSearch?.txt_sales_order_no  ) {
        periodCell.value = `Item: ${item}        Period:  ${chosenPeriod} 
        Sales Order No: ${sales_order_no}`;
    } else if (addSearch?.ddl_item ) {
        periodCell.value = `Item: ${item}   Period :  ${chosenPeriod}`;
    } else if (addSearch?.txt_sales_order_no) {
        periodCell.value = ` Sales Order No: ${sales_order_no}   Period :  ${chosenPeriod}`;
    } else {
        periodCell.value = `Period :  ${chosenPeriod}`;
    }

  const buffer = await workbook.xlsx.writeBuffer();
  const data = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });
  saveAs(data, 'Pending Order List.xlsx');
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
        body: allSalesOrderPdf,
        didDrawCell: (allSalesOrderPdf) => {
          //console.log(allSalesOrderPdf.column.index)
        },
      })
      doc.save(`PendingOrderPdf${currentDate()}.pdf`);
      // doc.html(document.getElementById('pdf-view'), {
      //   callback: () => {
      //     doc.save(`JournalByGRN${currentDate()}.pdf`);
      //   }
      // });
      // setClassicModal(true);
    };

  const onClickCollaps = () => {
    collapsible ? setCollapsible(false) : setCollapsible(true);
  };

  const headerData = [
    {
      id: "id",
      label: "#",
      align: "left",
    },
    {
      id: "sales_order_date",
      label: "Sales Date",
      align: "left",
    },
    {
      id: "sales_order_no",
      label: "S.O No",
      align: "left",
    },
    {
      id: "status_name",
      label: "Status",
      align: "left",
    },
    {
      id: "item_name",
      label: "Items Name",
      align: "left",
    },
    {
      id: "quantity",
      label: "Qty",
      align: "right",
    },
    {
      id: "rate",
      label: "Rate",
      align: "right",
    },
    {
      id: "amount",
      label: "Amount",
      align: "right",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <PageHeader title="MIS Report > Pending Orders" />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle=" Pending Order Search"
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
                <GridItem xs="4">
                  <InputLabel id="label">Sales Order no </InputLabel>
                  <TextField
                    size="small"
                    name="txt_sales_order_no"
                    id="discount"
                    placeholder="sales order no"
                    variant="outlined"
                    type="search"
                    fullWidth={true}
                    onChange={onAddSearch}
                    value={addSearch.txt_sales_order_no}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs="4">
                  <InputLabel id="label">Item </InputLabel>
                  <ReactSelect
                  options={item}
                  name="ddl_item"
                  getOptionLabel={(option) => option.label}
                  placeholder="Select"
                  formatGroupLabel={(d) => d.label}
                  menuPortalTarget={document.body}
                  styles={reactSelectStyles}
                  className={classes.customSelect}
                  onChange={(v, info) => onSelect(info, v)}
                  value={addSearch.ddl_item}           
                
                 
                  />
                </GridItem>

                <GridItem xs="2">
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
                    inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                  />
                </GridItem>
                <GridItem xs="2">
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
                    inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                  />
                </GridItem>

                <GridItem xs="12">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 25,
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
      {/* {
        loading ?
          <Box mt={10} width="100%" textAlign="center">
            <CircularProgress />
          </Box>
          :  */}
      <GridContainer
        className={classes.root}
        //   style={{ "visibility": viewRes }}
      >
        <GridItem xs="12">
          <Card className={classes1.headerCard}>
            <CardHeader
              className={classes1.TbheaderCdhd}
              style={{ height: 60 }}
            >
              <GridContainer justifyContent="space-between" alignItems="center">
                <GridItem>
                  <h4 className={classes1.headerCdTitle}>
                    Pending Order Search Result
                  </h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? (
                <GridItem style={{ cursor: "pointer" ,display: "none" }}>
                  {/* ////////////////////////////PDF/////////////////// */}
                  <IconButton onClick={onClickPdf}>

                        <Tooltip title="Export to PDF">
                          <img src={pdfIcon} style={{ width: 20 }} />

                        </Tooltip>
                      </IconButton>

                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allSalesOrder)} >
                        <Tooltip title="Export to Excel">
                          <img src={require("../../../assets/img/excel.png").default} />
                        </Tooltip>
                      </IconButton>
                </GridItem>
                ):(<GridItem style={{ cursor: "pointer" }}>
                {/* ////////////////////////////PDF/////////////////// */}
                <IconButton onClick={onClickPdf}>

                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />

                      </Tooltip>
                    </IconButton>

                <IconButton variant="text" onClick={() => onhandleExportToExcel(allSalesOrder)} >
                      <Tooltip title="Export to Excel">
                        <img src={require("../../../assets/img/excel.png").default} />
                      </Tooltip>
                    </IconButton>
              </GridItem>)}
              </GridContainer>
            </CardHeader>
            <CardBody
              style={{ height: "auto", maxHeight: 480, padding: 10 }}
              className={clxs(classes.customScroolBar)}
            >
              <MuiTable
                columns={headerData}
                rows={allSalesOrder}

              />
              {/* <div> */}

              {/* <CustomCard cdTitle="Salesman ItemWise Search Result" height={400}> */}
              {/* <TableContainer className={classes.container} >
                      <Table className={classes.table} stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="left">#</StyledTableCell>
                            <StyledTableCell align="left">Sales Date</StyledTableCell>

                            <StyledTableCell align="center">S.O No</StyledTableCell>
                            <StyledTableCell align="center">Items Name</StyledTableCell>

                            <StyledTableCell align="right">Qty</StyledTableCell>

                            <StyledTableCell align="right">Rate</StyledTableCell>
                            
                            <StyledTableCell align="right"> Amount</StyledTableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {allSalesOrder.map((row, i) => ( 

                            //console.log(row, "sen1407"),
                            <StyledTableRow >
                              <StyledTableCell align="left" className={classes.id}>
                                {i + 1}
                              </StyledTableCell>
                              <StyledTableCell
                                align="left"
                                className={classes.itemDetails}
                              >
                                {row.sales_order_date}
                              </StyledTableCell>

                              <StyledTableCell
                                align="center"
                                className={classes.itemDetails}
                              >
                                {row.sales_order_no}
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                className={classes.itemDetails}
                              >
                                {row.item_name}
                              </StyledTableCell>

                              <StyledTableCell
                                align="right"
                                className={classes.itemDetails1}
                              >
                                {row.quantity}
                              </StyledTableCell>

                              <StyledTableCell
                                align="right"
                                className={classes.itemDetails}
                              >
                                {row.rate}

                              </StyledTableCell>
                              <StyledTableCell
                                align="right"
                                className={classes.itemDetails}
                              >
                                {row.amount}


                              </StyledTableCell>
                              


                            </StyledTableRow>
                         ))} 

                        </TableBody>
                      </Table>
                    </TableContainer> */}
              {/* </CustomCard> */}
              {/* </div> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {/* } */}
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
          {addSearch ? (
            <GridContainer style={{ margin: 2 }}>
              <GridItem>
                {/* {addSearch?.txt_grn_no ? ` GRN No: ${addSearch?.txt_grn_no}` : ''} */}
              </GridItem>

              <GridItem>
                {/* {addSearch?.ddl_vendor?.label ? `Vendor: ${addSearch?.ddl_vendor?.label}` : ''} */}
              </GridItem>

              <GridItem style={{ marginLeft: 180 }}>
                {addSearch?.txt_from_date
                  ? `From Date: ${addSearch?.txt_from_date}`
                  : ""}
              </GridItem>

              <GridItem>
                {addSearch?.txt_to_date
                  ? `To Date: ${addSearch?.txt_to_date}`
                  : ""}
              </GridItem>
            </GridContainer>
          ) : (
            ""
          )}
          <TableContainer>
            <GridContainer
              style={{ height: "auto", padding: 15, width: 830, margin: 2 }}
            >
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">#</StyledTableCell>

                    {/* <StyledTableCell align="left">GRN No.</StyledTableCell> */}
                    <StyledTableCell align="left">Voucher No.</StyledTableCell>

                    <StyledTableCell align="left">Vendor</StyledTableCell>

                    <StyledTableCell align="left">
                      Purchase Value
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Total Journal
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Journal Amount
                    </StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allSalesMan.map(
                    (row, i) => (
                      //console.log(row, "sen1407"),
                      (
                        <StyledTableRow>
                          <StyledTableCell align="left" className={classes.id}>
                            {i + 1}
                          </StyledTableCell>

                          <StyledTableCell
                            align="left"
                            className={classes.itemDetails}
                          >
                            {row.transaction_id}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            className={classes.itemDetails}
                          >
                            {row.voucher_no}
                          </StyledTableCell>

                          <StyledTableCell
                            align="left"
                            className={classes.itemDetails1}
                          >
                            {row.vendor_name}
                          </StyledTableCell>

                          <StyledTableCell
                            align="left"
                            className={classes.itemDetails}
                          >
                            {currencyFormate(Number(row.purchase_value))}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            className={classes.itemDetails}
                          >
                            {row.journal_count}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            className={classes.itemDetails}
                            style={
                              Number(row.purchase_value.toFixed()) ===
                              Number(row.voucher_amount.toFixed())
                                ? { background: "Green", color: "white" }
                                : Number(row.purchase_value.toFixed()) >
                                  Number(row.voucher_amount.toFixed())
                                ? { background: "#F17500", color: "White" }
                                : { background: "red", color: "white" }
                            }
                          >
                            {currencyFormate(Number(row.voucher_amount))}
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )
                  )}
                </TableBody>
              </Table>
            </GridContainer>
          </TableContainer>
        </div>
      </MasterModel>
    </ThemeProvider>
  );
};

export default PendingOrderPage;
