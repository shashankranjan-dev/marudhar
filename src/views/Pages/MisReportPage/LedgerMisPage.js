import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import {
  ledgerRowData,
  getSearchAllJournalList,
} from "../../../services/accountLedgerService";
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
import CircularProgress from "@material-ui/core/CircularProgress";


import ReactSelect from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
import { currencyFormate } from "views/Pages/HelperComponent/utils";

//Tables
import {
  appFontWeightThin,
  appFontWeight,
} from "assets/jss/material-dashboard-pro-react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import InvoiceViewForLedger from "./InvoiceViewForLedger";
import ItemReceivedViewPageForLedger from './ItemReceivedViewPageForLedger'
import DirectPurchaseViewForLedger from "./DirectPurchaseViewForLedger";
import MasterModelForLedgerInvoiceView from "../../Components/MasterModelForLedgerInvoiceView";
const ExcelJS = require('exceljs');

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: appSecondColor,
    padding: "6px 5px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "0px 5px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
  customSelect: {
    marginBottom: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 40,
    "&:hover": {
      backgroundColor: "rgba(43,43, 43, 0.03)",
    },
    "&:nth-of-type(odd)": {},
  },
}))(TableRow);
//Theme
import theme from "../../../theme/theme";
//Services

// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";
import { currentDate, currentDate1, currentDate1Pdf, currentDatePdf } from "../HelperComponent/utils";
//SERVICE
import { getAllLedgerGroup } from "../../../services/LedgerAccountService";

import { getSearchLedgerVouchers, getLedgerClosingBalance } from "../../../services/accountLedgerService";

import { getListLedgerAccount } from "../../../services/LedgerAccountService";
import { getListGroup } from "../../../services/settingGroupService";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import autoTable from "jspdf-autotable";

const useStyles1 = makeStyles(styles);

//PDF
import pdfIcon from "../../../assets/img/pdf-icon.png"
import { jsPDF } from "jspdf";
import { Refresh } from "@mui/icons-material";
const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  narraction: {
    width: 155,
  },
  date: {
    width: 88
  },
  voucher: {
    width: 190
  },
  particular: {
    width: 110
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

const formData = {
  formName: "Add Category",
  fields: [
    {
      name: "txtBrand",
      label: "Voucher Name & Date",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextField",
      error: false,
      xs: 6,
      md: 6,
      lg: 7,
    },
    {
      name: "txtDate",

      hidden: false,
      required: true,
      data_type: "date",
      html_element: "TextField",
      xs: 6,
      md: 6,
      lg: 5,
    },

    {
      name: "sw_type",
      label: "Ledger",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "select",
      options: [
        {
          label: "Ledger",
          value: "Ledger",
        },
      ],
      xs: 6,
      md: 6,
      lg: 12,
    },

    {
      name: "sw_type",
      label: "Mode & References",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "select",
      options: [
        {
          label: "Bank",
          value: "Bank",
        },
      ],
      xs: 6,
      md: 6,
      lg: 6,
    },
    {
      name: "txtBrand",
      // label: "Mode & References",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextField",
      error: false,
      xs: 6,
      md: 6,
      lg: 6,
    },
    {
      name: "txtBrand",
      label: "Amount",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextField",
      error: false,
      xs: 6,
      md: 6,
      lg: 5,
    },
    {
      name: "txtBrand",
      label: "Narration",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextArea",
      error: false,
      xs: 6,
      md: 6,
      lg: 12,
    },
  ],
};
const onClickSubmit = () => {
  setClassicModal(false);
};
const onChange = (e) => {
  const { value, name } = e.target;
  setAddBrand({ ...allUnits, [name]: value });
};
const LedgerMisPage = () => {
  const classes1 = useStyles1();

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const [allUnits, setAllUnits] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [allGroup, setAllGroup] = React.useState([]);
  const [ledgerAccount, setAllLedgerAccount] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
    ddl_ledger_account: "",
    ddl_ledger_group: "",
    txt_from_date: currentDate1(),
    txt_to_date: currentDate(),
  });
  // const [addSearch, setAddSearch] = React.useState({
  //   ddl_ledger_account: location.state && location.state.edit === true ?
  //     ledgerAccount.filter(o => o.value === location?.state?.row?.ledger_account_id[0])
  //     : "",
  //   ddl_ledger_group: "",
  //   txt_from_date: location.state && location.state.edit === true ?
  //     location.state.addSearch.txt_from_date
  //     : currentDate1(),
  //   txt_to_date: location.state && location.state.edit === true ?
  //     location.state.addSearch.txt_to_date
  //     : currentDate(),
  // });
  // console.log(currentDate(1), "data increse")

  const [openingBalance, setOpeningBalance] = React.useState({});
  const [ledgerGroup, setAllLedgerGroup] = React.useState([]);
  const [ledgerList, setAllledgerList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [viewRes, setViewRes] = React.useState("hidden");
  const [billNo, setBillNo] = React.useState('');
  const [transaction_type, set_transaction_type] = React.useState();
  const [collapsible, setCollapsible] = React.useState(true)
  let closingBalance = 0;
  let closing_balance_dr_cr = "";
  let total = 0;
  let totalDr = 0;
  let totalCr = 0;
  const [ledgerPdf, setAllledgerListPdf] = React.useState([]);
  const [searchPdf, setAllSearchListPdf] = React.useState([]);

  const balanceSheet = () => {
    ledgerList.map((row, i) => {

      // console.log("xx", openingBalance.opening, totalDr, row.dr_cr);
      // console.log("sen2505/row", row);

      if (row.dr_cr === 1) {
        totalDr = parseFloat(row.amount) + parseFloat(totalDr);
      } else {
        totalCr = parseFloat(row.amount) + parseFloat(totalCr);
      }
      // if(row.particular) {
      //   //if (row.ledJournal?.ddl_ledger === addSearch.ddl_ledger_account.label) {
      //   if (row.dr_cr === 1) {
      //     totalDr = parseFloat(row.amount) + parseFloat(totalDr);
      //   } else {
      //     totalCr = parseFloat(row.amount) + parseFloat(totalCr);
      //   }
      //   //} else {
      //   //  totalDr = parseFloat(row.ledJournal?.amount) + parseFloat(totalDr);
      //   //}
      // }

      // else {
      //   if(row.ledVoucherType == 'P')
      //     totalDr = parseFloat(row.amount) + parseFloat(totalDr);
      //   else
      //     totalCr = parseFloat(row.amount) + parseFloat(totalCr);
      // }
      // if(row.ledJournal[0].ddl_ledger === addSearch.ddl_ledger_account.label){
      //   if(row.ledJournal[1].dr_cr === 2){
      //     totalCr= parseFloat(row.ledJournal[0].amount) + parseFloat(totalCr)
      //   }else{
      //     totalCr = 0;
      //   }
      // }else{
      //   totalCr=0;
      // }
    });


    // console.log("xx", openingBalance.opening, totalDr);

    if (openingBalance.dr_cr_status === "Dr") {
      totalDr = openingBalance.opening + Number(totalDr);
      // total = closingBalance + (totalCr - totalDr);
      // if(closingBalance > 0) closing_balance_dr_cr = "Dr";
      // else {
      //   closing_balance_dr_cr = "Cr";
      //   closingBalance = -closingBalance;
      // }
      // console.log(totalDr, "xxx");
    }
    else {

      totalCr = openingBalance.opening + (totalCr);


      // total = closingBalance + (totalDr - totalCr);
      // if(closingBalance > 0) closing_balance_dr_cr = "Cr";
      // else {
      //   closing_balance_dr_cr = "Dr";
      //   closingBalance = -closingBalance;
      // }
      // console.log(total, "small dr");
    }
    // if(closingBalance != 0){
    //   openingBalance = closingBalance;
    // }
    // console.log(totalDr, "dr total");
    // console.log(totalCr, "cr total");
  };


  //   if (openingBalance.dr_cr_status === "Dr") 
  //   {
  //     closingBalance = openingBalance.opening + (totalDr - totalCr);
  //     // total = closingBalance + (totalCr - totalDr);
  //     if(closingBalance > 0) closing_balance_dr_cr = "Dr";
  //     else {
  //       closing_balance_dr_cr = "Cr";
  //       closingBalance = -closingBalance;
  //     }
  //     console.log(total, "small cr");
  //   } 
  //   else 
  //   {

  //     closingBalance = openingBalance.opening + (totalCr - totalDr);

  //     console.log("xx", closingBalance);
  //     // total = closingBalance + (totalDr - totalCr);
  //     if(closingBalance > 0) closing_balance_dr_cr = "Cr";
  //     else {
  //       closing_balance_dr_cr = "Dr";
  //       closingBalance = -closingBalance;
  //     }
  //     console.log(total, "small dr");
  //   }
  //   // if(closingBalance != 0){
  //   //   openingBalance = closingBalance;
  //   // }
  //   console.log(totalDr, "dr total");
  //   console.log(totalCr, "cr total");
  // };

  const fetchData = () => {
    // getAllJournal(
    //   (r) => {
    //     setAllledgerList(r);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // )
    getAllLedgerGroup(
      (r) => {
        setAllLedgerGroup(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

   

    getListGroup(
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
  };

  React.useEffect(() => {
    getListLedgerAccount(
      (r) => {
        // console.log("ab", r);
        setAllLedgerAccount(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    
    fetchData();
    // console.log("infa", ledgerAccount);
    // setAllUnits(ledgerRowData);
  }, [refresh]);



  balanceSheet()

  const headerData = [
    [
      "Sr. No.",
      "Date",
      "Voucher No",
      "Voucher Type",
      "Particular",
      "Transaction No",
      "Narration",
      "Debit",
      "Credit",
    ],
  ];
  const searchData = [
    [
      `Ledger Account : ${addSearch.ddl_ledger_account.label}`,
      `From Date: ${currentDate1Pdf(addSearch?.txt_from_date)}`,
      `To Date: ${currentDatePdf(addSearch?.txt_to_date)}`,
    ],
  ];
  const openingData = [
    [
      `Opening Balance :    ${openingBalance.dr_cr_status === "Dr"
        ? parseFloat(openingBalance.opening).toFixed(2)
        : ""
      }  ${openingBalance.dr_cr_status === "Dr" ? "Dr" : ""}    ${openingBalance.dr_cr_status === "Cr" ? openingBalance.opening : ""
      } ${openingBalance.dr_cr_status === "Cr" ? "Cr" : ""}  `,
    ],
  ];
  const closingData = [
    [
      `Closing Balance:     ${totalCr > totalDr ? parseFloat(totalCr - totalDr).toFixed(2) : ""
      } ${totalCr > totalDr ? "Dr" : ""}  ${totalDr > totalCr ? (totalDr - totalCr).toFixed(2) : ""
      } ${totalDr > totalCr ? "Cr" : ""}  `,
    ],
  ];

  const TotalData = [
    [
      "                      ",
      "        ",
      "            ",
      "       ",
      "        ",
      "       ",
      "        ",
      "       ",
      `Total :                                                                                                                    ${totalCr > totalDr ? totalCr.toFixed(2) : totalDr.toFixed(2)
      }        ${totalCr > totalDr ? totalCr.toFixed(2) : totalDr.toFixed(2)}`,
    ],
  ];

  const tableData = [];
  // const headerData = [
  //   {
  //     id: "ledDate",
  //     label: "Date",
  //     align: "left",
  //   },
  //   {
  //     id: "ledVoucherNo",
  //     label: "Voucher No",
  //     align: "left",
  //   },
  //   {
  //     id: "ledVoucherType",
  //     label: "Voucher Type",
  //     align: "left",
  //   },
  //   {
  //     id: "ledParticular",
  //     label: "Particular",
  //     align: "left",
  //   },
  //   {
  //     id: "ledDebit",
  //     label: "Debit",
  //     align: "right",
  //   },
  //   {
  //     id: "ledCredit",
  //     label: "Credit",
  //     align: "right",
  //   },
  // ];

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onSelect = (info, v) => {
    // console.log(info, "ifo");
    // console.log(v, "ifov");

    setAddSearch({
      ...addSearch,
      [info.name]: v,
      ...(info.name === "ddl_ledger_group" ? { ddl_ledger_account: "" } : {}),
    });
  };


  //search
  const onSearchLedgerMisPage = () => {
    // console.log(addSearch, "selected");
    // console.log({ ...addSearch, txt_from_date: "2021-04-01", txt_to_date: addSearch.txt_from_date }, "selected1");
    // console.log(addSearch, "selected2");

    if (addSearch.ddl_ledger_account) {
      setLoading(true);

      getLedgerClosingBalance(
        (clsBalance) => {
          console.log(clsBalance[0].closing_balance, "closing_balance");
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
        { ...addSearch, txt_from_date: "2021-04-01", txt_to_date: addSearch.txt_from_date }
      );

      getSearchLedgerVouchers(
        (enquery, pdf) => {
          if (enquery.length) {
            setAllledgerList(enquery);
            setAllledgerListPdf(pdf);

            setViewRes("visible");
            setLoading(false);
          } else {
            setViewRes("visible");
            setLoading(false);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, "Journal not found": "info" },
            });
          }
        },
        (err) => {
          setAllledgerList([]);
          setViewRes("visible");
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
          setLoading(false);
        },
        addSearch
      )
        ;

    } else {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Select Ledger Account", msgType: "info" },
      });
    }

  };
  const classes = useStyles();

  const getVType = (voucherType) => {
    if (voucherType === 'R') {
      return 'Receipt';
    }
    else if (voucherType === 'P') {
      return 'Payment';
    }
    else return voucherType;
  };

  const getAmount = (row, r_dr_cr) => {

   console.log(row, "ledgerCheck")
    console.log(r_dr_cr,"ledgerCheckDRCR")


    if ((row.particular && r_dr_cr.includes(row.dr_cr))
     || row.bank_id === addSearch.ddl_ledger_account.value && !r_dr_cr.includes(row.ledVoucherType) ||
      row.bank_id !== addSearch.ddl_ledger_account.value && r_dr_cr.includes(row.ledVoucherType)
      // || row.ddl_ledger_id == addSearch.ddl_ledger.value && !r_dr_cr.includes(row.transaction_type)

    ) {
      return currencyFormate(row.amount);
    }

    return "";
  };

  const getAmountexcel = (row, r_dr_cr) => {

   // console.log(row, "hkhkhk")
    ///console.log( r_dr_cr,"sen3004/amt")


    if ((row.particular && r_dr_cr.includes(row.dr_cr)) || row.bank_id === addSearch.ddl_ledger_account.value && !r_dr_cr.includes(row.ledVoucherType) ||
      row.bank_id !== addSearch.ddl_ledger_account.value && r_dr_cr.includes(row.ledVoucherType)
      // || row.ddl_ledger_id == addSearch.ddl_ledger.value && !r_dr_cr.includes(row.transaction_type)

    ) {
      return (row.amount).toFixed(2);
    }

    return "";
  };

  const OnCellClicked = (e, row) => {
    setBillNo(e.target.innerHTML)

    set_transaction_type(row.transaction_type)
    // console.log(BillNo, row.transaction_type, "cell clicked")

    if (row.transaction_type === "Sales") {
      setClassicModal(true);
    }
    else if (row.transaction_type === "Direct Purchase") {
      setClassicModal(true);
    }
    else if (row.transaction_type === "Purchase") {
      setClassicModal(true);
    }

  }

  const onCloseModel = () => {
    setClassicModal(false);
    // setBillNo('')
  };

  const onClickCollaps = () => {
    collapsible ?
      setCollapsible(false)
      :
      setCollapsible(true)
  }

  //pdf
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
      head: openingData,
      body: searchPdf,
      styles: {
        overflow: "linebreak",
        halign: "right",
        valign: "middle",
      },
      didDrawCell: (ledgerPdf) => {
        // console.log(ledgerPdf.column.index);
      },
    });
    autoTable(doc, {
      head: headerData,
      body: ledgerPdf,
      didDrawCell: (ledgerPdf) => {
        openingData;
        // console.log(ledgerPdf.column.index);
      },

      // drawHeaderRow: function(row, data) {
      //   row.height = 20;
      // },
      // drawRow: function(row, data) {
      //   if (row.index === 0) return false;
      // },
    });
    autoTable(doc, {
      head: closingData,
      body: searchPdf,
      styles: {
        overflow: "linebreak",
        halign: "right",
        valign: "middle",
      },
      didDrawCell: (ledgerPdf) => {
        // console.log(ledgerPdf.column.index);
      },
    });
    autoTable(doc, {
      head: TotalData,
      body: searchPdf,
      didDrawCell: (ledgerPdf) => {
        // console.log(ledgerPdf.column.index);
      },
    });

    doc.save(`ledger${currentDate()}.pdf`);

    // doc.html(document.getElementById('pdf-view'), {
    //   callback: () => {
    //     doc.save(`ledgerList ${currentDate()}.pdf`);
    //   }
    // });
  };

  
const calculateOpeningBalance = (ledgerList) => {
  console.log(ledgerList,"sankhaledger")
   
  const openingBalance = ledgerList.reduce((sum, ledger) => {
      return sum + getAmountexcel(ledger, [1, "P", "BR"]);
  }, 0);

  return openingBalance;
};


const calculateClosingBalance = (ledgerList) => {
  
  const closingBalance = ledgerList.reduce((sum, ledger) => {
      return sum + getAmountexcel(ledger, [2, "R", "BP"]);
  }, 0);

  return closingBalance;
};


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : ledger List Report']);
    const periodRow = worksheet.addRow(['Period:']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:I${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:I${periodRow.number}`);
  
    const headers = [
      'Sl No',
      'Date',
      'Voucher No',
      'Voucher Type',
      'Particular',
      'Transaction No',
      'Narraction',
      'Debit',
      'Credit'
      
    ];
  
    worksheet.addRow(headers);

    const openingBalance = calculateOpeningBalance(ledgerList);
    const closingBalance = calculateClosingBalance(ledgerList);
  
    const ledgerMisReportTable = ledgerList.map((ledger) => {
      return {
        Sl_No: ledger._id,
        Date: ledger.ledDate,
        Voucher_No: ledger.ledVoucherNo,
        Voucher_Type: ledger.ledVoucherType,
        Particular: ledger.particular
          ? ledger.particular
          : ledger.ledger_account_for_party,
        Transaction_No:
          ledger.ledVoucherType === "Journal"
            ? ledger.ledTransectionId
            : ledger.mode,
        Narraction: ledger.narraction,
        Debit: getAmountexcel(ledger, [1, "P", "BR"]),
        Credit: getAmountexcel(ledger, [2, "R", "BP"]),
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
    worksheet.addRow(['', '', '', 'Opening Balance:', '', '', '', openingBalance, '']);
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    ledgerMisReportTable.forEach((data) => {
      worksheet.addRow(Object.values(data));
    });
  
    headerRow.font = { bold: true };
    headerRow.eachCell((cell, colNumber) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'cce6ff' } };
    });
  
    worksheet.eachRow({ startingRow: dataStartRow + 1 }, (row, rowNumber) => {});
    worksheet.addRow(['', '', '', 'Closing Balance:', '', '', '', '', closingBalance]);
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
   
    const ledger = addSearch?.ddl_ledger_account?.label ? addSearch?.ddl_ledger_account?.label : " - " ;

    periodCell.value = `ledger : ${ledger}      Period:  ${chosenPeriod} 
     `;
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Ledger List.xlsx');
  };

  //old excel

  // const onhandleExportToExcel = () => {
  //   const ledgerMisReportTable = ledgerList.map((ledger, index) => {
  //     return {

  //       Sl_No: ledger._id,
  //       Date: ledger.ledDate,
  //       Voucher_No: ledger.ledVoucherNo,
  //       Voucher_Type: ledger.ledVoucherType,
  //       Particular: ledger.particular
  //         ? ledger.particular
  //         : ledger.ledger_account_for_party,
  //       Transaction_No:
  //         ledger.ledVoucherType === "Journal"
  //           ? ledger.ledTransectionId
  //           : ledger.mode,
  //       Narraction: ledger.narraction,
  //       Debit: getAmountexcel(ledger, [1, "P", "BR"]),
  //       Credit: getAmountexcel(ledger, [2, "R", "BP"]),

        
  //     };
  //   });

  //   const newData = [{ openingBalance: openingBalance.opening }];
  //   const closeData = [{
  //     closingBalance: totalCr > totalDr
  //       ? currencyFormate(totalCr - totalDr)
  //       : currencyFormate(totalDr - totalCr)
  //   }]
    

  //   ledgerMisReportTable.unshift(...newData);
  //   ledgerMisReportTable.push(...closeData);
   


  //   const fileName = " Ledger Mis Report";
  //   const fileType =
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //   const fileExtension = ".xlsx";
  //   const ws = XLSX.utils.json_to_sheet(ledgerMisReportTable);

  //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //   XLSX.utils.sheet_add_json(wb.Sheets.data, ledgerMisReportTable, {
  //     newData,
    
  //     origin: "A1",
  //   });
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // };


  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="MIS Report > Ledger" />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Ledger List"
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon>
            {
              collapsible ?
                <Paper elevation="0" className={classes.searchBar}>
                  <GridContainer justifyContent="flex-start" alignItems="center">
                    {/* <GridItem xs="6">
                  <InputLabel id="label">Group</InputLabel>
                  <ReactSelect
                    options={ledgerGroup}
                    name="ddl_ledger_group"
                    //getOptionLabel={(option) => option.label}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    className={classes.customSelect}
                    styles={reactSelectStyles}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_ledger_group}
                  />
                </GridItem> */}

                    <GridItem xs="8">
                      <InputLabel id="label">Ledger Account </InputLabel>
                      <ReactSelect
                        options={ledgerAccount}
                        getOptionLabel={(option) => option.label}
                        placeholder="Select"
                        formatGroupLabel={(d) => d.label}
                        menuPortalTarget={document.body}
                        className={classes.customSelect}
                        styles={reactSelectStyles}
                        name="ddl_ledger_account"
                        onChange={(v, info) => onSelect(info, v)}
                        value={addSearch.ddl_ledger_account}
                      />
                    </GridItem>

                    <GridItem xs="2">
                      <InputLabel id="label">Date Between</InputLabel>
                      <TextField
                        name="txt_from_date"
                        size="small"
                        id="date"
                        variant="outlined"
                        // style={{ marginBottom: -10 }}
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
                      {/* <InputLabel id="label">Date</InputLabel> */}
                      <TextField
                        name="txt_to_date"
                        size="small"
                        id="date"
                        variant="outlined"
                        // style={{ marginBottom: -20 }}
                        type="date"
                        fullWidth={true}
                        defaultValue={currentDate()}
                        onChange={onAddSearch}
                        value={addSearch.txt_to_date}
                        //onChange={onAddSearch}
                        className={classes.dateField}
                        inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                      />
                    </GridItem>

                    {/* {console.log("opening balance", openingBalance)} */}

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
                          onClick={onSearchLedgerMisPage}
                        >
                          <SearchIcon />
                        </CustomButton>
                        <CustomButton>
                          <RotateLeftIcon />
                        </CustomButton>
                      </div>
                    </GridItem>
                  </GridContainer>
                </Paper>
                : ''}
          </CustomCard>
        </GridItem>
      </GridContainer>

      {/* <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Ledger List" height="auto">
            <MuiTable
              columns={headerData}
              rows={ledgerRowData}
              isTableBodyBorder
              isTableHeaderBorder
            />
          </CustomCard>
        </GridItem>
      </GridContainer> */}
      {loading ? (
        <Box mt={10} width="100%" textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <GridContainer className={classes.root} style={{ "visibility": viewRes }}>
          <GridItem xs="12">
            <Card className={classes1.headerCard}>
              <CardHeader
                className={classes1.TbheaderCdhd}
                style={{ height: 60 }}
              >
                <GridContainer justifyContent="space-between" alignItems="center">
                  <GridItem>
                    <h4 className={classes1.headerCdTitle}>Ledger List</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? ( 
                  <GridItem style={{ cursor: "pointer",display: "none" }}>
                    <IconButton onClick={onClickPdf}>
                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />

                      </Tooltip>
                    </IconButton>
                    <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel(ledgerList)}
                    >
                      <Tooltip title="Export to Excel">
                        <img
                          src={require("../../../assets/img/excel.png").default}
                        />
                      </Tooltip>
                    </IconButton>
                    {/* <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel(ledgerList)}
                    >
                      <Tooltip title="Export to Excel">
                        <img
                          src={require("../../../assets/img/excel.png").default}
                        />
                      </Tooltip>
                    </IconButton> */}
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
                      onClick={() => onhandleExportToExcel(ledgerList)}
                    >
                      <Tooltip title="Export to Excel">
                        <img
                          src={require("../../../assets/img/excel.png").default}
                        />
                      </Tooltip>
                    </IconButton>
                    {/* <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel(ledgerList)}
                    >
                      <Tooltip title="Export to Excel">
                        <img
                          src={require("../../../assets/img/excel.png").default}
                        />
                      </Tooltip>
                    </IconButton> */}
                  </GridItem>
                  )}
                </GridContainer>
              </CardHeader>
              <CardBody
                style={{ height: "auto", maxHeight: 480, padding: 10 }}
                className={clxs(classes.customScroolBar)}
              >

                {/* <MuiTable
              columns={headerData}
              rows={ledgerList}
              isTableBodyBorder
              isTableHeaderBorder
            /> */}

                <TableContainer>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">#</StyledTableCell>
                        <StyledTableCell align="center">Date</StyledTableCell>
                        <StyledTableCell align="center">Voucher No</StyledTableCell>
                        <StyledTableCell align="center">Voucher Type</StyledTableCell>
                        <StyledTableCell align="center">Particular</StyledTableCell>
                        <StyledTableCell align="center">Transaction No</StyledTableCell>
                        <StyledTableCell align="center">Narration</StyledTableCell>


                        <StyledTableCell align="right">Debit</StyledTableCell>
                        <StyledTableCell align="right">Credit</StyledTableCell>
                        {/* <StyledTableCell align="right">Action</StyledTableCell> */}
                      </TableRow>
                    </TableHead>
                    {/* table Body start */}
                    <TableBody>
                      <StyledTableRow className={classes.openingBalances}>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell
                          className={classes.credit}
                        ></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell className={classes.voucher}>
                          <b>Opening Balance</b>
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.credit}
                        >

                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.credit}
                        ></StyledTableCell>
                        <StyledTableCell
                          className={classes.credit}
                        ></StyledTableCell>
                        <StyledTableCell
                          align="right"
                        >
                          <b>{openingBalance.dr_cr_status === "Dr" ? currencyFormate(openingBalance.opening) : ""}</b>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {/* <b>{openingBalance ===0?'':openingBalance}</b> */}
                          <b>{openingBalance.dr_cr_status === "Cr" ? currencyFormate(openingBalance.opening) : ""}</b>
                        </StyledTableCell>
                      </StyledTableRow>

                      {/* {console.log(ledgerList, "ledgerList")} */}

                      {ledgerList.map((row, i) => (

                        <StyledTableRow key={i}>
                          <StyledTableCell align="left" className={classes.id}>
                            {row.length != 0 ? i + 1 : ""}
                          </StyledTableCell>

                          <StyledTableCell align="center" className={classes.date}>
                            {row.ledDate}
                          </StyledTableCell>

                          <StyledTableCell align="center" className={classes.voucher}>
                            {row.ledVoucherNo}
                          </StyledTableCell>

                          <StyledTableCell align="center" className={classes.ledger}>
                            {getVType(row.ledVoucherType) === "BR" || getVType(row.ledVoucherType) === "BP" ? "Bad Debt" : getVType(row.ledVoucherType)}
                          </StyledTableCell>

                          <StyledTableCell align="center" className={classes.particular}>
                            { /*`${
                          row.ledJournal[0].ddl_ledger ===
                          addSearch.ddl_ledger_account.label
                            ? row.ledJournal[1].ddl_ledger
                            : row.ledJournal[0].ddl_ledger
                        }` */
                              // row.mode ? row.mode : row.particular 
                              row.particular ? row.particular : row.ledger_account_for_party
                            }
                          </StyledTableCell>

                          <StyledTableCell
                            align="center" className={classes.ledger}
                            style={row.ledVoucherType === "Journal" ? { cursor: "pointer", background: "lightBlue" } : { cursor: "no-drop" }}
                            onClick={(e) => OnCellClicked(e, row)}>
                            {row.ledVoucherType === "Journal" ? row.ledTransectionId : row.mode}
                          </StyledTableCell>
                          <StyledTableCell align="center" className={classes.narraction}>
                            {row.narraction}
                          </StyledTableCell>

                          <StyledTableCell align="right" className={classes.ledger}>
                            {/* {`${
                          row.ledJournal?.ddl_ledger ===
                          addSearch.ddl_ledger_account.label
                            ? (row.ledJournal.dr_cr === 1
                              ? row.ledJournal.amount
                              : "")
                            : row.ledJournal?.amount
                        }`} */
                              getAmount(row, [1, 'P', 'BR']) //dr
                            }
                          </StyledTableCell>

                          <StyledTableCell align="right" className={classes.ledger}>
                            {/* {`${
                          row.ledJournal?.ddl_ledger ===
                          addSearch.ddl_ledger_account.label
                            ? row.ledJournal.dr_cr === 2
                              ? row.ledJournal.amount
                              : ""
                            : ""
                        }`} */
                              getAmount(row, [2, 'R', 'BP'])
                            }
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                      <StyledTableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="left" className={classes.voucher}>
                          <b> Closing Balance</b>

                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        {/* {console.log("cllh", closingBalance)} */}
                        {/* <StyledTableCell align="right"> <b> { closingBalance !== 0 && (closing_balance_dr_cr === "Cr" ? currencyFormate(closingBalance) : "") } </b> </StyledTableCell>
                    <StyledTableCell align="right"> <b> { closingBalance !== 0 && (closing_balance_dr_cr === "Dr" ? currencyFormate(closingBalance) : "") } </b> </StyledTableCell> */}
                        <StyledTableCell align="right"><b> {totalCr > totalDr ? currencyFormate(totalCr - totalDr) : ''}</b></StyledTableCell>
                        <StyledTableCell align="right"><b> {totalDr > totalCr ? currencyFormate(totalDr - totalCr) : ''}</b></StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="left"><b>Total</b></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>

                        <StyledTableCell align="right"><b>{totalCr > totalDr ? currencyFormate(totalCr) : currencyFormate(totalDr)}</b></StyledTableCell>
                        <StyledTableCell align="right"><b>{totalCr > totalDr ? currencyFormate(totalCr) : currencyFormate(totalDr)}</b></StyledTableCell>

                        {/* <StyledTableCell align="right"><b> { currencyFormate(( openingBalance.dr_cr_status === "Dr" ? openingBalance.opening : 0 ) + totalDr + ( closing_balance_dr_cr === "Cr" ? closingBalance : 0 )) } </b></StyledTableCell>
                    <StyledTableCell align="right"><b> { currencyFormate(( openingBalance.dr_cr_status === "Cr" ? openingBalance.opening : 0 ) + totalCr + ( closing_balance_dr_cr === "Dr" ? closingBalance : 0 )) } </b></StyledTableCell> */}
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

      )}
      <MasterModelForLedgerInvoiceView
        classicModal={classicModal}
        onCloseModel={onCloseModel}
        width={450}
        okBtnText="Submit"
        height="auto"
        modelName="Invoice View"
      // onClickOk={onSubmitModel}
      >
        {
          transaction_type === "Sales" ?
            <InvoiceViewForLedger inv_invoice_no={billNo} />
            // ""
            :
            transaction_type === "Purchase" ?
              <ItemReceivedViewPageForLedger grn_no={billNo} />
              :
              transaction_type === "Direct Purchase" ?
                <DirectPurchaseViewForLedger grnNo={billNo} />
                :
                ''
        }
        {/* {billNo} */}
      </MasterModelForLedgerInvoiceView>
      <MasterModel
        // classicModal={classicModal}
        // onCloseModel={(e) => {
        //   e.preventDefault();
        //   setClassicModal(false);
        // }}
        height="auto"
        okBtnText="Pdf"
        modelName="ledger"
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
            marginLeft: 90,
            // border:"1px solid", 
          }}>

          <div style={{ textAlign: "center", borderBottom: "1px solid", width: "100%" }} ><h4>Ledger List</h4></div>

          <GridContainer style={{ margin: 2, textAlign: "center", borderBottom: "1px solid", width: "100%" }}>
            <GridItem>
              {addSearch?.ddl_ledger_account ? `Ledger Account: ${addSearch?.ddl_ledger_account?.label}` : ''}
            </GridItem>

            <GridItem >
              {addSearch?.txt_from_date ? `From Date: ${currentDate1Pdf(addSearch?.txt_from_date)}` : ''}
            </GridItem>

            <GridItem >
              {addSearch?.txt_to_date ? `To Date: ${currentDatePdf(addSearch?.txt_to_date)}` : ''}
            </GridItem>
          </GridContainer>


          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left" style={{ fontSize: 12 }}>#</StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: 12 }}>Date</StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: 12 }}>Voucher No</StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: 12 }}>Voucher Type</StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: 12 }}>Particular</StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: 12 }}>Transaction No</StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: 12 }}>Narration</StyledTableCell>


                  <StyledTableCell align="right">Debit</StyledTableCell>
                  <StyledTableCell align="right">Credit</StyledTableCell>
                  {/* <StyledTableCell align="right">Action</StyledTableCell> */}
                </TableRow>
              </TableHead>
              {/* table Body start */}
              <TableBody >
                <StyledTableRow className={classes.openingBalances} style={{ fontSize: 10 }}>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell
                    className={classes.credit}
                  ></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell className={classes.credit} style={{ fontSize: 12 }}>
                    <b>Opening</b>
                  </StyledTableCell>
                  <StyledTableCell
                    className={classes.credit}
                  > <b>Balance</b></StyledTableCell>
                  <StyledTableCell
                    className={classes.credit}
                  ></StyledTableCell>
                  <StyledTableCell
                    className={classes.credit}
                  ></StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{ fontSize: 10 }}
                  >
                    <b>{openingBalance.dr_cr_status === "Dr" ? (openingBalance.opening).toFixed(2) : ""}</b>
                  </StyledTableCell>
                  <StyledTableCell align="right" style={{ fontSize: 10 }}>
                    {/* <b>{openingBalance ===0?'':openingBalance}</b> */}
                    <b>{openingBalance.dr_cr_status === "Cr" ? (openingBalance.opening).toFixed(2) : ""}</b>
                  </StyledTableCell>
                </StyledTableRow>

                {/* {console.log(ledgerList, "ledgerList")} */}

                {ledgerList.map((row, i) => (

                  <StyledTableRow key={i}>
                    <StyledTableCell align="left" className={classes.id} style={{ fontSize: 10 }}>
                      {row.length != 0 ? i + 1 : ""}
                    </StyledTableCell>

                    <StyledTableCell align="center" className={classes.date} style={{ fontSize: 10 }}>
                      {row.ledDate}
                    </StyledTableCell>

                    <StyledTableCell align="center" className={classes.ledger} style={{ fontSize: 10 }}>
                      {row.ledVoucherNo}
                    </StyledTableCell>

                    <StyledTableCell align="center" className={classes.ledger} style={{ fontSize: 10 }}>
                      {getVType(row.ledVoucherType) === "BR" || getVType(row.ledVoucherType) === "BP" ? "Bad Debt" : getVType(row.ledVoucherType)}
                    </StyledTableCell>

                    <StyledTableCell align="center" className={classes.ledger} style={{ fontSize: 10 }}>
                      { /*`${
                          row.ledJournal[0].ddl_ledger ===
                          addSearch.ddl_ledger_account.label
                            ? row.ledJournal[1].ddl_ledger
                            : row.ledJournal[0].ddl_ledger
                        }` */
                        // row.mode ? row.mode : row.particular 
                        row.particular ? row.particular : row.ledger_account_for_party
                      }
                    </StyledTableCell>

                    <StyledTableCell
                      align="center" className={classes.ledger}
                      style={{ fontSize: 10 }}

                    >
                      {row.ledVoucherType === "Journal" ? row.ledTransectionId : row.mode}
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.ledger} style={{ fontSize: 10, webkitlineclamp: 3 }}>
                      {row.narraction}
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.ledger} style={{ fontSize: 10 }}>
                      {/* {`${
                          row.ledJournal?.ddl_ledger ===
                          addSearch.ddl_ledger_account.label
                            ? (row.ledJournal.dr_cr === 1
                              ? row.ledJournal.amount
                              : "")
                            : row.ledJournal?.amount
                        }`} */
                        getAmountexcel(row, [1, 'P', 'BR']) //dr
                      }
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.ledger} style={{ fontSize: 10 }}>
                      {/* {`${
                          row.ledJournal?.ddl_ledger ===
                          addSearch.ddl_ledger_account.label
                            ? row.ledJournal.dr_cr === 2
                              ? row.ledJournal.amount
                              : ""
                            : ""
                        }`} */
                        getAmountexcel(row, [2, 'R', 'BP'])
                      }
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <StyledTableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align="left" style={{ fontSize: 12 }}>
                    <b> Closing</b>

                  </StyledTableCell>
                  <StyledTableCell> <b>Balance</b></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  {/* {console.log(totalDr > totalCr ? (totalDr - totalCr) : '', "cllh", totalCr > totalDr ? (totalCr - totalDr) : "")} */}
                  {/* <StyledTableCell align="right"> <b> { closingBalance !== 0 && (closing_balance_dr_cr === "Cr" ? currencyFormate(closingBalance) : "") } </b> </StyledTableCell>
                    <StyledTableCell align="right"> <b> { closingBalance !== 0 && (closing_balance_dr_cr === "Dr" ? currencyFormate(closingBalance) : "") } </b> </StyledTableCell> */}
                  <StyledTableCell align="right" style={{ fontSize: 10 }}><b> {totalCr > totalDr ? (totalCr - totalDr).toFixed(2) : ''}</b></StyledTableCell>
                  <StyledTableCell align="right" style={{ fontSize: 10 }}><b> {totalDr > totalCr ? (totalDr - totalCr).toFixed(2) : ''}</b></StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align="left"><b>Total</b></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>

                  <StyledTableCell align="right" style={{ fontSize: 10 }}><b>{totalCr > totalDr ? (totalCr).toFixed(2) : (totalDr).toFixed(2)}</b></StyledTableCell>
                  <StyledTableCell align="right" style={{ fontSize: 10 }}><b>{totalCr > totalDr ? (totalCr).toFixed(2) : (totalDr).toFixed(2)}</b></StyledTableCell>

                  {/* <StyledTableCell align="right"><b> { currencyFormate(( openingBalance.dr_cr_status === "Dr" ? openingBalance.opening : 0 ) + totalDr + ( closing_balance_dr_cr === "Cr" ? closingBalance : 0 )) } </b></StyledTableCell>
                    <StyledTableCell align="right"><b> { currencyFormate(( openingBalance.dr_cr_status === "Cr" ? openingBalance.opening : 0 ) + totalCr + ( closing_balance_dr_cr === "Dr" ? closingBalance : 0 )) } </b></StyledTableCell> */}
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </MasterModel>
    </ThemeProvider>
  );
};

export default LedgerMisPage;
