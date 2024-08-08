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
import {
  salesmanWiseData,
  getAllCategory,
  getAllBrands,
} from "../../../services/salesmanWiseSalesService";

import { getAllCustomerCondensed, getAllCustomerDetail } from "../../../services/CustomerWiseReportService";
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
import { activeText, appScrollBar } from "assets/jss/material-dashboard-pro-react";
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
import CircularProgress from "@material-ui/core/CircularProgress";

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
import { currencyFormate, currentDate, currentDate1 } from "../HelperComponent/utils";
import { getListUsers } from "../../../services/associateService";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from 'file-saver';
import XLSX from 'xlsx'

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
    // padding: "10px 5px",
    padding: "7px 3px",

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
  container: {
    ...appScrollBar,
    maxHeight: 360,
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
    width: "25%",
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
    width: "10%",
  },
  uom: {
    width: "10%",
  },
  net: {
    width: "18%",
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

const CustomerWiseSalesReportPage = () => {
  const classes1 = useStyles1()

  let clientName = ""; let cAmt = 0;
  let iFlag = 0; let dbTotal = 0; let iNum = 0;
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [allCustomer, setAllCustomer] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [billDetail, setBillDetail] = React.useState({});
  const [allUser, setAllUsers] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
    ddl_salesman_id: "",
    txt_discount_from: "",
    txt_discount_to: "",
    ddl_type: "",
    txt_from_date: currentDate1(),
    txt_to_date: currentDate(),
  });
  const [viewRes, setViewRes] = React.useState("hidden");
  const [collapsible, setCollapsible] = React.useState(true)
  const [check, setCheck] = React.useState("");
  const [check2, setCheck2] = React.useState(false);
  const [CustomerWiseSalesPdf, setAllCustomerWiseSalesPdf] = React.useState([]);
  const [searchPdf, setAllSearchListPdf] = React.useState([])

  const options = [
    { value: "Condensed", label: "Condensed" },
    { value: "Detailed", label: "Detailed" },
  ];
  const [addItem, setAddItem] = React.useState({
    // txtQuantity: "",
    // txtRate: "",
    // txtValue: "",
    // item: "",
    // brand: "",
    category: "",
    sales_id: "",
    item_id: "",
    category_id: "",

    // itemImg: "",
  });

  const onChangeBillDate = (e) => {
    const { name, value } = e.target;
    setBillDetail({ ...billDetail, [name]: value });
  };

  const fetchData = () => {
    // getAllCustomerWiseSalesReport(
    //   (r) => {
    //     setAllCustomer(r);

    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   },addSearch
    // );

    getListUsers(
      (r) => {
        setAllUsers(r);
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

  const condensedDataPdf =[["Sr. No.", "Client","Amount"]];
  const detailedDataPdf = [["Sr. No.", "Client", "Parent Category", "Qty", "UOM","Amount",]];
  const searchData = [[
                      addSearch?.ddl_salesman_id ? `Salesman: ${addSearch?.ddl_salesman_id?.label}` : '',
                      addSearch?.ddl_type ? `Type: ${addSearch?.ddl_type?.label}` : '',
                      addSearch?.txt_discount_from? `Discount From: ${addSearch?.txt_discount_from}` : '',
                      addSearch?.txt_discount_to? `Discount To : ${addSearch?.txt_discount_to}` : '',
                      addSearch?.txt_from_date ? `From Date: ${addSearch?.txt_from_date}` : '',
                      addSearch?.txt_to_date ? `To Date: ${addSearch?.txt_to_date}` : ''
                    ]];

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    //console.log(e.target, "22");
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };
  const onSelect = (info, v) => {
    //console.log(info, v.label, "eee");

    setCheck(v.label);
    setAddSearch({ ...addSearch, [info.name]: v });
    setCheck2(false);
  };

  const onSearchReport = (e) => {

    // //console.log(addSearch.ddl_type,"dd")


    if (addSearch.ddl_type.value === "Detailed") {

      //console.log("cond")
      setCheck2(true);
      setRefresh(false);
      e.preventDefault();
      if (!addSearch.ddl_salesman_id ) {
      
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Please select  SalesMan ", msgType: "error" },
        });
        return; 
      }
      setLoading(true);
      getAllCustomerDetail(
        (r,pdf) => {
          setAllCustomer(r);
          setAllCustomerWiseSalesPdf(pdf)

          setViewRes("visible");
          setLoading(false);
        },
        (err) => {
          setLoading(false);
          setAllCustomer([]);
          setViewRes("visible");

          dispatch({

            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        },
        addSearch
      );
    }

    else if (addSearch.ddl_type.value === "Condensed") {
      //console.log("deta")
      setCheck2(true);
      setRefresh(false);
      e.preventDefault();
      if (!addSearch.ddl_salesman_id ) {
      
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Please select  SalesMan ", msgType: "error" },
        });
        return; 
      }
      setLoading(true);
      getAllCustomerCondensed(
        (r,pdf) => {
          setAllCustomer(r);
          setAllCustomerWiseSalesPdf(pdf)

          setViewRes("visible");
          setLoading(false);
        },
        (err) => {
          setAllCustomer([]);
          setViewRes("visible");
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        },
        addSearch
      );
    }
    else {
      setCheck2(false);
      setLoading(false);
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Select Type", msgType: "info" },
      });
    }
  };

  const onClickRefresh = () => {
    setCheck(false);
    setRefresh(!refresh);
    setAddSearch({
      txtValue: "",
      ddl_salesman_id: "",
      txt_item: "",
      ddl_brand: "",
      ddl_category: "",
      txt_discount_to: "",
      txt_discount_from: "",
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

  const onChange = (e) => {
    const { name, value } = e.target;
    setAddItem((prv) => ({ ...prv, [name]: value }));
  };
  const classes = useStyles();

  // export to excel

  const onhandleExportToExcelCondensed = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Customer Wise Sales Report']);
    const periodRow = worksheet.addRow(['Period:']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:C${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:C${periodRow.number}`);
  
    const headers = [
      'Sl No',
      'Clint Name',  
      'Amount',
     
      

    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const CustomerWiseSalesTable = allCustomer.map((acc) => {
      return {
       Sl_No: acc.id,
        Clint_Name: acc.customer_name[0],
        Amount: acc.net_value,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    CustomerWiseSalesTable.forEach((data) => {
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
    const category = addSearch?.ddl_salesman_id?.label ;
    const showroom_warehouse = addSearch?.ddl_type?.label ;

    periodCell.value = `SalesMan: ${category}       Period:  ${chosenPeriod} 
        Type: ${showroom_warehouse} `;
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Customer Wise Sales.xlsx');
  };



  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Customer Wise Sales Report']);
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
      'Clint_Name',
      'Parent_Catagory',
      'Qty',
      'Uom',
      'Amount',
     
      

    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const CustomerWiseSalesTable = allCustomer.map((acc) => {
      return {
           Sl_No: acc.id,
        Clint_Name: acc.customer_name,
        Parent_Catagory: acc.child_category[0],
        Qty: acc.quantity,
        Uom: acc.uom_name[0],
       Amount: acc.net_value,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    CustomerWiseSalesTable.forEach((data) => {
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
    const category = addSearch?.ddl_salesman_id?.label ;
    const showroom_warehouse = addSearch?.ddl_type?.label ;

    periodCell.value = `SalesMan: ${category}       Period:  ${chosenPeriod} 
        Type: ${showroom_warehouse} `;
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Customer Wise Sales Report.xlsx');
  };




  const onClickCollaps = () => {
    collapsible ?
      setCollapsible(false)
      :
      setCollapsible(true)
  }

 //pdf
 const onClickPdfDetailed = (e) => {
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
    head: detailedDataPdf,
    body: CustomerWiseSalesPdf,
    didDrawCell: (purchasePdf) => {
      //console.log(purchasePdf.column.index)
    },
  })
  doc.save(`CustomerWiseSalesReport${currentDate()}.pdf`);
  // doc.html(document.getElementById('pdf-view'), {
  //   callback: () => {
  //     doc.save(`CustomerWiseSalesReport${currentDate()}.pdf`);
  //   }
  // });
  // setClassicModal(true);
};
const onClickPdfCondensed = (e) => {
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
    head: condensedDataPdf,
    body: CustomerWiseSalesPdf,
    didDrawCell: (purchasePdf) => {
      //console.log(purchasePdf.column.index)
    },
  })
  doc.save(`CustomerWiseSalesReport${currentDate()}.pdf`);
  // doc.html(document.getElementById('pdf-view'), {
  //   callback: () => {
  //     doc.save(`CustomerWiseSalesReportCondensed${currentDate()}.pdf`);
  //   }
  // });
  // setClassicModal(true);
};

  return (
    <ThemeProvider theme={theme}>
      <PageHeader title="MIS Report > Customer Wise Sales Report " />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle=" Customer Wise Sales Report"
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon
            onClickFilter={() => { }}
          >

            {
              collapsible ?
                <GridContainer
                  style={{ padding: "10px" }}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <GridItem xs="4">
                    <InputLabel id="label">Salesman</InputLabel>
                    <ReactSelect
                      options={allUser}
                      name="ddl_salesman_id"
                      getOptionLabel={(option) => option.label}
                      placeholder="Select"
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      styles={reactSelectStyles}
                      className={classes.customSelect}
                      onChange={(v, info) => onSelect(info, v)}
                      value={addSearch.ddl_salesman_id}
                    // onChange={(v) => onSelect("ddl_brand_id", v)}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
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
                  <GridItem xs="1">
                    <InputLabel id="label">Discount </InputLabel>
                    <TextField
                      size="small"
                      name="txt_discount_from"
                      id="discount"
                      placeholder="%"
                      variant="outlined"
                      type="discount"
                      // className={classes.dateField}
                      fullWidth={true}
                      // value={}
                      // onChange={}
                      // className={}
                      onChange={onAddSearch}
                      value={addSearch.txt_discount_from}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </GridItem>
                  <InputLabel id="label"> to </InputLabel>
                  <GridItem xs="1">
                    <TextField
                      size="small"
                      name="txt_discount_to"
                      id="discount"
                      placeholder="%"
                      variant="outlined"
                      type="discount"
                      className={classes.dateField}
                      fullWidth={true}
                      // value={}
                      // onChange={}
                      // className={}
                      onChange={onAddSearch}
                      value={addSearch.txt_discount_to}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs="4">
                    <InputLabel id="label">Type</InputLabel>
                    <ReactSelect
                      options={options}
                      name="ddl_type"
                      getOptionLabel={(option) => option.label}
                      placeholder="Select"
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      styles={reactSelectStyles}
                      className={classes.customSelect}
                      onChange={(v, info) => onSelect(info, v)}
                      value={addSearch.ddl_type}
                    // onChange={(v) => onSelect("ddl_brand_id", v)}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                    />
                  </GridItem>

                  <GridItem xs="8">
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
                : ''}
          </CustomCard>
        </GridItem>
      </GridContainer>

      {/* Select and Add Items */}

      {/* {//console.log(check, "ch")} */}

      {check2 ? (
        check === "Condensed" ? (
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
                        <h4 className={classes1.headerCdTitle}>Customer Wise Search Result</h4>
                      </GridItem>
                      {globalState.user.user_role !== "Admin" ? ( 
                      <GridItem style={{ cursor: "pointer",display: "none" }}>
                        {/* ////////////////////////////PDF/////////////////// */}

                        <IconButton onClick={onClickPdfCondensed}>

                          <Tooltip title="Export to PDF">
                            <img src={pdfIcon} style={{ width: 20 }} />

                          </Tooltip>
                        </IconButton>

                        <IconButton variant="text" onClick={() => onhandleExportToExcelCondensed(allCustomer)} >
                          <Tooltip title="Export to Excel">
                            <img src={require("../../../assets/img/excel.png").default} />
                          </Tooltip>
                        </IconButton>
                      </GridItem>
                      ):(
                        <GridItem style={{ cursor: "pointer" }}>
                        {/* ////////////////////////////PDF/////////////////// */}

                        <IconButton onClick={onClickPdfCondensed}>

                          <Tooltip title="Export to PDF">
                            <img src={pdfIcon} style={{ width: 20 }} />

                          </Tooltip>
                        </IconButton>

                        <IconButton variant="text" onClick={() => onhandleExportToExcelCondensed(allCustomer)} >
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
                    {/* <CustomCard cdTitle="Customer Wise Search Result" height={400}> */}
                    <TableContainer className={classes.container}>
                      <Table
                        className={classes.table}
                        stickyHeader
                        aria-label="sticky table"

                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="left">#</StyledTableCell>
                            <StyledTableCell align="left">Client</StyledTableCell>
                            {/* <StyledTableCell align="right">Qty(UOM)</StyledTableCell> */}
                            <StyledTableCell align="right">Amount</StyledTableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {allCustomer.map((row, i) => {
                            return (
                              <StyledTableRow>
                                <StyledTableCell
                                  align="left"
                                  className={classes.id}
                                >
                                  {i + 1}
                                </StyledTableCell>

                                <StyledTableCell
                                  align="left"
                                  className={classes.itemDetails}
                                >
                                  {row.customer_name}
                                </StyledTableCell>

                                {/* <StyledTableCell
                        align="right"
                        className={classes.Salesman}
                      >
                        {row.quantity}
                        
                      </StyledTableCell> */}
                                <StyledTableCell
                                  align="right"
                                  className={classes.Salesman}
                                >
                                  {currencyFormate(row.net_value)}
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {/* </CustomCard> */}
                  </CardBody>
                </Card>
              )}
            </GridItem>
          </GridContainer>

        ) : (
          <GridContainer
            className={classes.root}
            style={{ visibility: viewRes }}
          >
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
                        <h4 className={classes1.headerCdTitle}>Customer Wise Search Result</h4>
                      </GridItem>
                      {globalState.user.user_role !== "Admin" ? ( 
                      <GridItem style={{ cursor: "pointer",display: "none" }}>
                        {/* ////////////////////////////PDF/////////////////// */}
                        <IconButton onClick={onClickPdfDetailed}>

                          <Tooltip title="Export to PDF">
                            <img src={pdfIcon} style={{ width: 20 }} />

                          </Tooltip>
                        </IconButton>
                        <IconButton variant="text" onClick={() => onhandleExportToExcel(allCustomer)} >
                          <Tooltip title="Export to Excel">
                            <img src={require("../../../assets/img/excel.png").default} />
                          </Tooltip>
                        </IconButton>
                      </GridItem>
                      ):(
                        <GridItem style={{ cursor: "pointer" }}>
                        {/* ////////////////////////////PDF/////////////////// */}
                        <IconButton onClick={onClickPdfDetailed}>

                          <Tooltip title="Export to PDF">
                            <img src={pdfIcon} style={{ width: 20 }} />

                          </Tooltip>
                        </IconButton>
                        <IconButton variant="text" onClick={() => onhandleExportToExcel(allCustomer)} >
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
                    {/* <CustomCard cdTitle="Customer Wise Search Result" height={500} filterIcon> */}
                    <Paper elevation="0" className={classes.searchBar}>

                      <TableContainer className={classes.container}>
                        <Table
                          className={classes.table}
                          stickyHeader
                          aria-label="sticky table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">#</StyledTableCell>
                              <StyledTableCell align="left">
                                Client
                              </StyledTableCell>
                              <StyledTableCell align="left">Parent Category</StyledTableCell>
                              <StyledTableCell align="right">Qty</StyledTableCell>

                              <StyledTableCell align="right">UOM</StyledTableCell>

                              <StyledTableCell align="right">Amount</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {allCustomer.map((row, i) => {

                              //console.log(clientName, iFlag, "1st time");

                              if (clientName.toString() === row.customer_name.toString()) {


                                iFlag = 1;
                                cAmt = row.net_value;
                              } else {

                                clientName = row.customer_name;
                                iFlag = 0;
                                iNum = iNum + 1;
                                cAmt += row.net_value;
                              }
                              dbTotal = dbTotal + row.net_value;


                              return (

                                <StyledTableRow>
                                  <StyledTableCell
                                    align="center"
                                    className={classes.id}
                                  >
                                    {iFlag === 0 ? iNum : ""}
                                  </StyledTableCell>

                                  <StyledTableCell
                                    align="left"
                                    className={classes.itemDetails}
                                  >
                                    {iFlag === 0 ? clientName : ""}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="left"
                                    className={classes.itemDetails}
                                  >
                                    {row.category ? row.category : row.child_category}
                                  </StyledTableCell>

                                  <StyledTableCell
                                    align="right"
                                    className={classes.Salesman}
                                  >
                                    {Number(row.quantity).toFixed(2)}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="right"
                                    className={classes.uom}
                                  >
                                    {row.uom_name}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="right"
                                    className={classes.net}
                                  >
                                    {currencyFormate(row.net_value)}


                                  </StyledTableCell>
                                </StyledTableRow>


                              );

                              {/* if (iFlag===0)
                        {return(    
                          <StyledTableRow>
                          <StyledTableCell
                              align="right"
                              className={classes.Salesman}
                              colspan="6"
                            >
                              {dbTotal}
                            </StyledTableCell>
                          </StyledTableRow>);} */}
                            })}
                          </TableBody>
                        </Table>

                      </TableContainer>
                    </Paper>
                  </CardBody>
                </Card>
                // {/* </CustomCard> */}
              )}
            </GridItem>
          </GridContainer>
        )
      ) : (
        ""
      )}
      {/* PDF */}

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
            width: "75%",
            marginLeft: 15,
          }}>
          <div style={{ textAlign: "center", borderBottom: "1px solid", width: "100%" }} ><h4>Customer Wise Sales Report</h4></div>
          {
            addSearch ?
              <GridContainer style={{margin: 2,textAlign:"center",borderBottom:"1px solid",width: "100%" }}>
                <GridItem>
                  {addSearch?.ddl_salesman_id ? `Salesman: ${addSearch?.ddl_salesman_id?.label}` : ''}
                </GridItem>

                <GridItem>
                  {addSearch?.ddl_type ? `Type: ${addSearch?.ddl_type?.label}` : ''}
                </GridItem>

                <GridItem>
                  {addSearch?.txt_discount_from? `Discount From: ${addSearch?.txt_discount_from}` : ''}
                </GridItem>


                <GridItem>
                  {addSearch?.txt_discount_to? `Discount To : ${addSearch?.txt_discount_to}` : ''}
                </GridItem>

                <GridItem >
                  {addSearch?.txt_from_date ? `From Date: ${addSearch?.txt_from_date}` : ''}
                </GridItem>

                <GridItem >
                  {addSearch?.txt_to_date ? `To Date: ${addSearch?.txt_to_date}` : ''}
                </GridItem>
              </GridContainer>
              : ''
          }
          {check === "Condensed" ? (

            <TableContainer>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"

              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">#</StyledTableCell>
                    <StyledTableCell align="left">Client</StyledTableCell>
                    {/* <StyledTableCell align="right">Qty(UOM)</StyledTableCell> */}
                    <StyledTableCell align="right">Amount</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allCustomer.map((row, i) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell
                          align="left"
                          className={classes.id}
                        >
                          {i + 1}
                        </StyledTableCell>

                        <StyledTableCell
                          align="left"
                          className={classes.itemDetails}
                        >
                          {row.customer_name}
                        </StyledTableCell>

                        {/* <StyledTableCell
                        align="right"
                        className={classes.Salesman}
                      >
                        {row.quantity}
                        
                      </StyledTableCell> */}
                        <StyledTableCell
                          align="right"
                          className={classes.Salesman}
                        >
                          {Number(row.net_value).toFixed(2)}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <GridContainer
              className={classes.root}
              style={{ visibility: viewRes }}
            >
              <GridItem xs="12">
                <TableContainer>
                  <Table
                    className={classes.table}
                    stickyHeader
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">#</StyledTableCell>
                        <StyledTableCell align="left">
                          Client
                        </StyledTableCell>
                        <StyledTableCell align="left">Parent Category</StyledTableCell>
                        <StyledTableCell align="right">Qty</StyledTableCell>

                        <StyledTableCell align="right">UOM</StyledTableCell>

                        <StyledTableCell align="right">Amount</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allCustomer.map((row, i) => {

                        //console.log(clientName, iFlag, "1st time");

                        if (clientName.toString() === row.customer_name.toString()) {


                          iFlag = 1;
                          cAmt = row.net_value;
                        } else {

                          clientName = row.customer_name;
                          iFlag = 0;
                          iNum = iNum + 1;
                          cAmt += row.net_value;
                        }
                        dbTotal = dbTotal + row.net_value;
                        {/* //console.log(row.customer_name, "clientNameahh3"); */ }
                        //console.log(clientName, iFlag, "after loop");

                        return (

                          <StyledTableRow>
                            <StyledTableCell
                              align="center"
                              className={classes.id}
                            >
                              {iFlag === 0 ? iNum : ""}
                            </StyledTableCell>

                            <StyledTableCell
                              align="left"
                              className={classes.itemDetails}
                            >
                              {iFlag === 0 ? clientName : ""}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className={classes.itemDetails}
                            >
                              {row.category ? row.category : row.child_category}
                            </StyledTableCell>

                            <StyledTableCell
                              align="right"
                              className={classes.Salesman}
                            >
                              {Number(row.quantity).toFixed(2)}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.uom}
                            >
                              {row.uom_name}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.net}
                            >
                              {Number(row.net_value).toFixed(2)}


                            </StyledTableCell>
                          </StyledTableRow>


                        );


                      })}
                    </TableBody>
                  </Table>

                </TableContainer>
              </GridItem>
            </GridContainer>
          )}

        </div>
      </MasterModel>
    </ThemeProvider>
  );
};

export default CustomerWiseSalesReportPage;
