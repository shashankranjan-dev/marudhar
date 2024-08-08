import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModelForStock from "../../Components/MasterModelForOutstanding";
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

import CircularProgress from "@material-ui/core/CircularProgress";

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
import { activeText } from "assets/jss/material-dashboard-pro-react";
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
import { currencyFormate, currentDate, currentDate1 } from "../HelperComponent/utils";
import { getListUsers } from "../../../services/associateService";
import {
  getAllGroup,
  getAllReference,
  getAllOutstandingData,
  getSearchLedgerVouchers,
  getLedgerClosingBalance,
  // getListLedgerAccount,
  // getAllLedgerGroup,
  // getListGroup,
} from "../../../services/outstandinginvoiceService";

import OutstandingLedgerView from "views/Pages/MisReportPage/OutstandingLedgerView";
import Card from "components/Card/Card.js";

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import MasterModel from "../../Components/MasterModel";


import pdfIcon from "../../../assets/img/pdf-icon.png"
import { jsPDF } from "jspdf";
import { dateFormate } from "views/Pages/HelperComponent/utils";
import FileSaver from 'file-saver';
import XLSX from 'xlsx'
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
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "22px",
    },
  },
}));

const OutstandingByInvoice = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  const [loadingMui, setLoadingMui] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  // const [outstanding, setOutstanding] = React.useState([]);
  const [outstanding, setOutstanding] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [billDetail, setBillDetail] = React.useState({});
  const [allCustomer, setAllCustomer] = React.useState([]);
  const [allGroup, setAllGroup] = React.useState([]);
  const [allReference, setAllReference] = React.useState([]);
  const [ledgerAccount, setAllLedgerAccount] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
    ddl_customer: "",
    ddl_group: "",
    ddl_reference: "",
    txt_from_date: 1648791467,
    txt_to_date: currentDate(),
    txt_min_amount: "",
    txt_max_amount: "",
  });
  const [viewRes, setViewRes] = React.useState("hidden");
  const [ledgerGroup, setAllLedgerGroup] = React.useState([]);
  const [ledgerList, setAllledgerList] = React.useState([]);
  const [openingBalance, setOpeningBalance] = React.useState({});

  const [collapsible, setCollapsible] = React.useState(true);
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

  const [OutstandingByInvoicePdf, setAllOutstandingByInvoicePdf] = React.useState([]);
  const [searchPdf, setAllSearchListPdf] = React.useState([])

  const headerDataPdf = [["Sr. No.", "Client Name", "Net Value", "Total Outstanding", "Dr_Cr_Status"]];
  const searchData = [[
    addSearch?.ddl_group ? `Group: ${addSearch?.ddl_group?.label}` : '',
    addSearch?.ddl_reference?.label ? `Reference: ${addSearch?.ddl_reference?.label}` : '',
    addSearch?.ddl_customer?.label ? `Customer : ${addSearch?.ddl_customer?.label}` : '',
    addSearch?.txt_from_date ? `From Date: ${dateFormate(addSearch?.txt_from_date)}` : '',
    addSearch?.txt_to_date ? `To Date: ${addSearch?.txt_to_date}` : '',
    addSearch?.txt_min_amount ? `Min Amount: ${addSearch?.txt_min_amount}` : '',
    addSearch?.txt_max_amount ? `Max Amount: ${addSearch?.txt_max_amount}` : ''

  ]]


  const headerData = [
    {
      id: "id",
      label: "#",
    },
    {
      id: "company_name",
      label: "Client Name",
      align: "left",
    },
    {
      id: "sumNetValue",
      label: "Net Value",
      align: "right",
    },
    {
      id: "closing_balance",
      label: "Total Outstanding",
      align: "right",
    },
    {
      id: "dr_cr_status",
      label: "Dr Cr_Status",
      align: "right",
    },
    {
      id: "action",
      label: "Action",
      align: "right",
    },
  ];
  const onChangeBillDate = (e) => {
    const { name, value } = e.target;
    setBillDetail({ ...billDetail, [name]: value });
  };

  const fetchData = () => {
    getAllGroup(
      (r) => {
        setAllGroup(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    getAllReference(
      (r) => {
        setAllReference(r);
        // setAllReference([
        //   { value: "addNewReference", label: "Add New Reference" },
        //   ...r,
        // ]);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
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
  };

  React.useEffect(() => {
    fetchData();
    setAllUnits(directPurchaseFormRowData);
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
    setLoading(true);
    getAllOutstandingData(
      (r,pdf) => {
        if (r.length) {
          //console.log(r, "sen1805/id");
          setOutstanding(r);
          setAllOutstandingByInvoicePdf(pdf)

          setViewRes("visible");
          setLoading(false);
        } else {
          setViewRes("visible");
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Sales Report not found": "info" },
          });
        }
      },
      (err) => {
        setOutstanding([]);
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
      txtValue: "",
      ddl_customer: "",
      ddl_reference: "",
      ddl_group: "",
      txt_max_amount: "",
      txt_min_amount: "",
      txt_item: "",
      ddl_brand: "",
      ddl_category: "",
      txt_sales_no: "",
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
    //console.log("sen1805", r.ledger_account_id);
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
      "2021-04-01",
      // addSearch.txt_from_date,
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
        txt_to_date: "2021-04-01",
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


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Outstanding By Invoice Report']);
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
      'Client',
      'Net Value',
      'Total Outstanding',
      'Dr Cr status',
        
      

    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const OutstandingByInvoiceTable = outstanding.map((item) => {
      return {
        Sl_No: item.id,          
          Client: item.company_name,
          Net_Value: item.total,
          Total_Outstanding: item.closing_balanceExcel,          
          Dr_Cr_status: item.dr_cr_status,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    OutstandingByInvoiceTable.forEach((data) => {
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


  
   
    const Customer = addSearch?.ddl_customer?.label  ? addSearch?.ddl_customer?.label : "-";
    const Group = addSearch?.ddl_group?.label ? addSearch?.ddl_group?.label : "-" ;
    const Reference = addSearch?.ddl_reference?.label ? addSearch?.ddl_reference?.label : "-" ;


    if (addSearch?.ddl_customer &&  addSearch?.ddl_group && addSearch?.ddl_reference  ) {
      periodCell.value = `Customer: ${Customer}        Group:  ${Group} 
      Reference: ${Reference}`;
  } else if (addSearch?.ddl_customer ) {
      periodCell.value = `Customer: ${Customer}   `;
  } else if (addSearch?.ddl_group) {
      periodCell.value = ` Group: ${Group}  `;
  } else if (addSearch?.ddl_reference){
    periodCell.value = ` Reference: ${Reference}  `;

  }
  else {
      periodCell.value = ``;
  }
    

    // periodCell.value = `Customer: ${Customer}       Group:  ${Group}       Reference: ${Reference} `;
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Outstanding By Invoice.xlsx');
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
      body: OutstandingByInvoicePdf,
      didDrawCell: (purchasePdf) => {
        //console.log(purchasePdf.column.index)
      },
    })
    doc.save(`OutstandingByInvoice${currentDate()}.pdf`);
    // doc.html(document.getElementById('pdf-view'), {
    //   callback: () => {
    //     doc.save(`OutstandingByInvoice${currentDate()}.pdf`);
    //   }
    // });
    // setClassicModal(true);
  };

  const onClickNext = (event) => {
    //console.log(event, "sen12102022")
    setLoadingMui(true);
    getAllOutstandingData(
      (r) => {
        if (r.length) {
          //console.log(r, "sen1805/id");
          setOutstanding(r);
          setViewRes("visible");
          setLoadingMui(false);
        } else {
          setViewRes("visible");
          setLoadingMui(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Sales Report not found": "info" },
          });
        }
      },
      (err) => {
        setOutstanding([]);
        setViewRes("visible");
        setLoadingMui(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      addSearch,
      event[0],
      event[1],
    );
  }
  const onClickPrevious = (event) => {
    setLoadingMui(true);
    getAllOutstandingData(
      (r) => {
        if (r.length) {
          //console.log(r, "sen1805/id");
          setOutstanding(r);
          setViewRes("visible");
          setLoadingMui(false);

        } else {
          setViewRes("visible");
          setLoadingMui(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Sales Report not found": "info" },
          });
        }
      },
      (err) => {
        setOutstanding([]);
        setViewRes("visible");
        setLoadingMui(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      addSearch,
      event[0],
      event[1],
    );

  }

  return (
    <ThemeProvider theme={theme}>
      <PageHeader title="MIS Report > Outstanding By Invoice " />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle=" Outstanding By Invoice"
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
                <GridItem xs="4">
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
                </GridItem>
                <GridItem xs="4">
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
                </GridItem>
                <GridItem xs="4">
                  <InputLabel id="label">Customer</InputLabel>
                  <ReactSelect
                    options={allCustomer}
                    name="ddl_customer"
                    getOptionLabel={(option) => option.label}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_customer}
                  // onChange={(v) => onSelect("ddl_brand_id", v)}
                  // value={{
                  //   label: addSearch.ddl_brand_label,
                  //   value: addSearch.ddl_brand_id,
                  // }}
                  />
                </GridItem>

                <GridItem xs="2">
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
                </GridItem>
                <GridItem xs="2">
                  {/* <InputLabel id="label">Date</InputLabel> */}
                  {/* <TextField
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
                /> */}
                </GridItem>

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
        <GridContainer className={classes.root} style={{ visibility: viewRes }}>
          <GridItem xs="12">
            <Card className={classes1.headerCard}>
              <CardHeader className={classes1.TbheaderCdhd} style={{ height: 60 }}>
                <GridContainer justifyContent="space-between" alignItems="center">
                  <GridItem>
                    <h4 className={classes1.headerCdTitle}>Outstanding Search Result</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? ( 
                  <GridItem style={{ cursor: "pointer",display: "none"  }}>
                    {/* ////////////////////////////PDF/////////////////// */}
                    <IconButton onClick={onClickPdf}>

                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />

                      </Tooltip>
                    </IconButton>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(outstanding)} >
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
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(outstanding)} >
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
                {/* <CustomCard cdTitle="Outstanding Search Result" height={450}> */}
                <MuiTable
                  onClickViewOne={onClickView}
                  columns={headerData}
                  rows={outstanding}
                  // pagination={false}
                  // newPagination={true}
                  // onClickNext={onClickNext}
                  // onClickPrevious={onClickPrevious}
                  // loading={loadingMui}
                />
                {/* </CustomCard> */}
                {/* <Box pt={1}>
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
                                      Number(sum) + Number( li.total),
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
                        ></Box>
                      </Grid>

                      <Grid item xs={2}>
                        <Box className={classes.tableLabel} textAlign="left">
                          <b>
                          
                              {outstanding.length
                              ? currencyFormate(outstanding
                                  .reduce(
                                    (sum, li) =>
                                      Number(sum) + Number( li.closing_balanceExcel) ,
                                    0
                                  ))
                                  
                              : ""}
                          </b>
                        </Box>
                      </Grid>
                    </GridContainer>
                  ) : (
                    ""
                  )}
                </Box> */}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )}

      {/* 
      <GridContainer className={classes.root} style={{ "visibility": viewRes }}>
        <GridItem xs="12">
          <CustomCard cdTitle="Outstanding Search Result" height={350}>
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">#</StyledTableCell>

                    <StyledTableCell align="left">Client Name</StyledTableCell>

                    <StyledTableCell align="right">Net Value</StyledTableCell>
                    <StyledTableCell align="right">Total Out Standing</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {outstanding.map((row, i) => (
                    <StyledTableRow >
                      <StyledTableCell align="center" className={classes.id}>
                      {i+1}
                      </StyledTableCell>

                      <StyledTableCell
                        align="left"
                        className={classes.itemDetails}
                      >
                     {row.company_name}
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.Salesman}
                      >
                        {Number(row.sumNetValue).toFixed(2)}
                        
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.Salesman}
                      >
                      {Number(row.closing_balance).toFixed(2)}
                    
                      </StyledTableCell>
                    </StyledTableRow>
                   ))}  
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        </GridItem>
      </GridContainer> */}
      <MasterModelForStock
        classicModal={classicModal}
        onCloseModel={onCloseModel}
        height="auto"
        modelName="Ledger View"
      >
        <OutstandingLedgerView
          openingBalance={openingBalance}
          ledgerList={ledgerList}
          outstanding={outstanding}
          pagination={true}

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
          }}>
          <div style={{ textAlign: "center", borderBottom: "1px solid", width: "72%" }} ><h4>Outstanding Search Result</h4></div>

          {
            addSearch ?
              <GridContainer style={{ margin: 2 }}>
                <GridItem>
                  {addSearch?.ddl_group ? `Group: ${addSearch?.ddl_group?.label}` : ''}
                </GridItem>

                <GridItem>
                  {addSearch?.ddl_reference?.label ? `Reference: ${addSearch?.ddl_reference?.label}` : ''}
                </GridItem>


                <GridItem>
                  {addSearch?.ddl_customer?.label ? `Customer : ${addSearch?.ddl_customer?.label}` : ''}
                </GridItem>

                <GridItem >
                  {addSearch?.txt_from_date ? `From Date: ${dateFormate(addSearch?.txt_from_date)}` : ''}
                </GridItem>

                <GridItem >
                  {addSearch?.txt_to_date ? `To Date: ${addSearch?.txt_to_date}` : ''}
                </GridItem>
                <GridItem >
                  {addSearch?.txt_min_amount ? `Min Amount: ${addSearch?.txt_min_amount}` : ''}
                </GridItem>
                <GridItem >
                  {addSearch?.txt_max_amount ? `Max Amount: ${addSearch?.txt_max_amount}` : ''}
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
                    <StyledTableCell align="left">Client Name</StyledTableCell>
                    <StyledTableCell align="left">Net Value</StyledTableCell>
                    <StyledTableCell align="left">Total Outstanding</StyledTableCell>
                    <StyledTableCell align="left"> Dr Cr_Status</StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {//console.log(purchaseRegisterList, "sankha51")} */}

                  {outstanding.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="left" className={classes.id}>
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.bill_date}>
                        {row.company_name}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.txt_bill_no}>




                        {row.sumNetValue}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.ddl_vendor}>
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

export default OutstandingByInvoice;
