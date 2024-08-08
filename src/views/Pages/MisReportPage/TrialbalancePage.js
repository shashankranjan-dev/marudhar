import React from "react";
import {
  Paper,
  makeStyles,
  Grid,
  Box,
  Divider,
  withStyles,
} from "@material-ui/core";

import { getAllLedgerGroup } from "../../../services/LedgerAccountService";
import { getListLedgerAccount } from "../../../services/LedgerAccountService";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { currentDate } from "../HelperComponent/utils";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { currencyFormate, dateFormate } from "../HelperComponent/utils";
import { timestamp } from "services/Utils/utils";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { CustomCard } from "../../Components/CustomCard";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../../theme/theme";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  borderColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
} from "assets/jss/material-dashboard-pro-react";
import { Refresh } from "@mui/icons-material";

//PDF
import pdfIcon from "assets/img/pdf-icon.png";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { IconButton, OutlinedInput } from "@material-ui/core";

import { ProgressBar } from "react-loader-spinner";
import {
  getAllLedgerByPurchaseGroupTrial,
  getAllClosingBalance,
  getAllLedgerByPurchase,
  getAllLedgerByCapital,
  getAllLedgerByAssets,
  getAllLedgerByLoan,
  getAllLedgerByUnsecure,
  getAllLedgerByBankOd,
  getAllLedgerBySunday,
  getAllLedgerByLoanAdv,
  getAllLedgerBySundayDebtors,
  getAllLedgerByCash,
  getAllLedgerByBank,
  getAllLedgerByDirect,
  getAllLedgerByInDirect,
  getAllLedgerByInDirectExpenses,
  getAllLedgerTotal,
  getClosingBalance,
  getOpeninngStock,
  getClosingStockQty,
  getAvgCost,
  getOpeningStockValue,
  getClosingStock,
  getAllLedgerByLoanForPdf,
  getAllLedgerBysundryForPdf,
} from "../../../services/TrialbalanceService";
import { useHistory } from "react-router-dom";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";

import autoTable from "jspdf-autotable";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import clxs from "classnames";
import XLSX from "xlsx";
import 'jspdf-autotable';
const ExcelJS = require('exceljs');

// import {currentDate, currentDate1 } from "../Pages/HelperComponent/utils";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#eee",
    color: appSecondColor,
    padding: "0px 5px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "5px 5px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,

    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
    "&:hover": {
      backgroundColor: tblBodyHoverColor,
    },
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  invoicePaper: {
    width: "100%",
    height: "800px",
    borderRadius: "0",
    marginTop: 15,
    padding: "5px 15px",
  },
  title_label: {
    color: appSecondColor,
    fontWeight: 500,
    fontSize: "0.7rem",
    width: "100%",
  },

  text_label1: {
    fontWeight: 500,
    fontSize: "0.7rem",
    width: "100%",
    marginTop: "-10px",
  },
  title_label1: {
    fontWeight: 500,
    fontSize: "0.8rem",
    width: "100%",
  },
  title_label_2: {
    color: appSecondColor,
    fontWeight: 500,
    fontSize: ".6rem",
  },
  title_label_21: {
    color: appSecondColor,
    fontWeight: 500,
    fontSize: ".6rem",
    marginTop: "-18px",
    textDecoration: "underline",
  },
  title_label_3: {
    textAlign: "right",
    color: appSecondColor,
    fontWeight: 500,
    fontSize: ".8rem",
  },
  title_label_4: {
    textAlign: "right",
    color: appSecondColor,
    fontWeight: 500,
    fontSize: ".6rem",
  },
  inv: {
    textAlign: "center",
    color: appSecondColor,
    fontWeight: 600,
    fontSize: "1rem",
  },
  text: {
    color: appSecondColor,
    fontWeight: 400,
    fontSize: ".9rem",
    lineHeight: "1.6",
  },
  heightfull: {
    height: "100%",
  },
  headerDetails: {
    marginBottom: 20,
    height: "auto",
    width: "100%",
    border: "1px solid " + borderColor,
  },
  section_one: {
    padding: "8px",
    height: "145px",
    borderBottom: "1px solid " + borderColor,
  },
  section_two: {
    height: "180px",
    borderLeft: "1px solid " + borderColor,
  },
  open_one: {
    padding: "1px",
    borderTop: "1px solid" + borderColor,
  },
  section_four: {
    padding: "8px",
  },
  section_three: {
    padding: "8px",
  },
  invoice_prv_container: {
    width: "100%",
    minWidth: 750,
    height: "auto",
  },
  boxBorder0: {
    padding: "8px",
  },
  boxBorder1: {
    height: 30,
    padding: "8px",
    borderTop: "1px solid " + borderColor,
    fontWeight: 500,
    fontSize: "1rem",
  },
  boxBorder2: {
    height: 35,
    padding: "8px",
    borderTop: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
  },
  boxBorder4: {
    height: 35,
    padding: "8px",
    borderTop: "1px solid " + borderColor,
    borderBottom: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
  },

  boxBorder3: {
    height: 50,
    padding: "8px",
    borderTop: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
    marginBottom: "20px",
  },

  tablContainer: {
    marginBottom: "15px",
    borderLeft: "1px solid " + borderColor,
    borderRight: "1px solid " + borderColor,
    borderTop: "1px solid " + borderColor,
  },
  serial_Id: { width: "10%", borderRight: "1px solid " + borderColor },
  item_desc: { width: "30%", borderRight: "1px solid " + borderColor },
  item_desc1: {
    width: "10%",
    fontWeight: 600,
    borderRight: "1px solid " + borderColor,
   color:"blue"

  },
  item_descT: {
    width: "30%",
    fontWeight: 600,
    borderRight: "1px solid " + borderColor,
    color:"blue"
  },
  item_descT1: {
    width: "10%",
    fontWeight: 600,
    borderRight: "1px solid " + borderColor,
    color:"blue"

  },
  hsn_code: { width: "13%", borderRight: "1px solid " + borderColor },
  qty: { width: "12%", borderRight: "1px solid " + borderColor },
  rate: { width: "10%", borderRight: "1px solid " + borderColor },
  per: { width: "5%", borderRight: "1px solid " + borderColor },
  disc: { width: "5%", borderRight: "1px solid " + borderColor },
  amount: { width: "10%" },
  // gst: { width: "13%", borderRight: "1px solid " + borderColor },
  // disc: { width: "13%", borderRight: "1px solid " + borderColor },
  large_width: { width: "95%", borderRight: "1px solid " + borderColor },

  large_amount: {
    width: "100%",
    borderBottom: "none",
    fontSize: ".8rem",
    fontWeight: 520,
  },

  hsn_code_2: { width: "25%", borderRight: "1px solid " + borderColor },
  taxable_value: { width: "19%", borderRight: "1px solid " + borderColor },
  central_tax: { width: "18%", borderRight: "1px solid " + borderColor },
  state_tax: { width: "18%", borderRight: "1px solid " + borderColor },
  tax_total_amount: { width: "15%" },

  footerDetails: {
    height: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    width: "100%",
    border: "1px solid " + borderColor,
    borderTop: "none",
  },

  footer_one: {
    padding: "5px",
    borderBottom: "none",
    borderTop: "none",
  },
  footer_two: {
    padding: "5px",
    borderBottom: "1px solid " + borderColor,
  },
  footer_four: {
    padding: "5px",
    borderLeft: "1px solid " + borderColor,
  },
  footer_three: {
    padding: "5px",
  },
  footer_sec_title: {
    marginBottom: 0,
    fontSize: ".8rem",
    fontWeight: 500,
    color: appSecondColor,
    textDecoration: "underline",
  },
  footer_desc: {
    fontSize: ".8rem",
    lineHeight: "1.6",
  },

  insideBorder1: {
    margin: "0 -5px",
  },
  insideBorder2: {
    borderBottom: "none",
    borderRight: "1px solid " + borderColor,
    fontWeight: 650,
  },

  insideBorder6: {
    borderBottom: "none",
    fontSize: ".6rem",
  },
  pdfcontainer: {
    margintop: "5px",
    marginleft: "25px",
    display: "flex",
    flexflow: "row wrap",
    justifycontent: "center"
  },
  

}));


const useStyles1 = makeStyles((theme)=>({
  headerCdTitle:{
   
    color: appSecondColor,
    fontWeight: 600,
    paddingLeft: "470px"
    
  }

  
}));



const TrialbalanceTest = ({}) => {
  const [globalState, dispatch] = useStateValue();
  const classes = useStyles();
  const classes1 = useStyles1()

  const [addSearch, setAddSearch] = React.useState({
    ddl_ledger_account: "",
    ddl_ledger_group: "",
    txt_from_date: currentDate(),
    txt_to_date: currentDate(),
  });
  const [pdfClicked, setPdfClicked] = React.useState(false);

  const history = useHistory();

  const [classicModal, setClassicModal] = React.useState(false);
  const [allUnits, setAllUnits] = React.useState([]);
  const [invItemDetails, setInvItemDetails] = React.useState([]);
  const [openingBalance, setOpeningBalance] = React.useState([]);
  const [openingBalancePurchase, setOpeningBalancePurchase] = React.useState(
    []
  );
  const [openingBalanceCapital, setOpeningBalanceCapital] = React.useState([]);
  const [Capital, setCapital] = React.useState([]);
  
  const [openingBalanceAssets, setOpeningBalanceAssets] = React.useState([]);
  const [openingBalanceLoan, setOpeningBalanceLoan] = React.useState([]);
  const [ledgerGroup, setAllLedgerGroup] = React.useState([]);
  const [ledgerLoan, setAllLedgerLoan] = React.useState([]);
  const [ledgerBankOd, setAllLedgerBankOd] = React.useState([]);
  const [ledgerUnSecure, setAllLedgerUnSecure] = React.useState([]);
  const [ledgerSunday, setAllLedgerSunday] = React.useState([]);
  const [ledgerLoanAdv, setAllLedgerLoanAdv] = React.useState([]);
  const [ledgerSundayDebtors, setAllLedgerSundayDebtors] = React.useState([]);
  const [ledgerCash, setAllLedgerCash] = React.useState([]);
  const [ledgerBank, setAllLedgerBank] = React.useState([]);
  const [ledgerAssets, setAllLedgerAssets] = React.useState([]);
  const [ledgerSales, setAllLedgerSales] = React.useState([]);
  const [ledgerPurchase, setAllLedgerPurchase] = React.useState([]);
  const [ledgerDirect, setAllLedgerDirect] = React.useState([]);
  const [ledgerInDirect, setAllLedgerInDirect] = React.useState([]);
  const [ledgerInDirectExpenses, setAllLedgerInDirectExpenses] = React.useState(
    []
  );
  const [Total, setAllLedgerTotal] = React.useState([]);
  const [closingbalance, setClosingbalance] = React.useState([]);
  const [openingStockValue, setOpeningStock] = React.useState([]);
  const [closingQty, setClosingQty] = React.useState([]);
  const [avgCost, setAvgCost] = React.useState([]);
  const [stockOpeningValue, setStockOpeningValue] = React.useState([]);
  const [stockClosing, setStockClosing] = React.useState([]);
  const [closingBalance, setClosingBalance] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingC, setLoadingC] = React.useState(false);
  const [loadings, setLoadings] = React.useState(false);

  const [refresh, setRefresh] = React.useState(false);
  const [ledgerLoanPdf, setAllLedgerLoanpdf] = React.useState([]);
  const [loan, setLoan] = React.useState([]);
   const [ledgerSundrypdf, setAllLedgerSundrypdf] = React.useState([]);
  const [sundry, setsundry] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    setLoadingC(true);
    setLoadings(true);

    //capital Account
    getAllLedgerByCapital(
      (r,pdf) => {
        //console.log(r, "nabla");
        setAllLedgerGroup(r);
        setCapital(pdf) 
      },

      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );

    // loan and liability

    getAllLedgerByLoan(
      (r) => {
        //console.log("sank22", r);
        setAllLedgerLoan(r);
      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );


    // getAllLedgerByLoanForPdf(
    //   (r,pdf) => {
    //     console.log("sankpdf19", pdf);
    //     setAllLedgerLoanpdf(r);
    //     setLoan(pdf)
    //   },

    //   (err) => {
    //     console.log("nabla");
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   },
    //   {}
    // );

    // current liability //

    getAllLedgerBySunday(
      (r) => {
        //console.log("sank22", r);
        setAllLedgerSunday(r);
        setLoadings(false);
      },

      (err) => {
        setLoadings(false);

        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );



    // getAllLedgerBysundryForPdf(
    //   (r,pdf) => {
    //     console.log("sankpdf19", pdf);
    //     setAllLedgerSundrypdf(r);
    //     setsundry(pdf)
    //   },

    //   (err) => {
    //     console.log("nabla");
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   },
    //   {}
    // );

    //Loans & Advance
    getAllLedgerByLoanAdv(
      (r) => {
        //console.log("sank22", r);
        setAllLedgerLoanAdv(r);
      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );

    //sunday Debtors//
    getAllLedgerBySundayDebtors(
      (r) => {
        //console.log("sank22", r);
        setAllLedgerSundayDebtors(r);
      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );
    //cash//
    getAllLedgerByCash(
      (r) => {
        //console.log("sank22", r);
        setAllLedgerCash(r);
      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );
    //Bank Account//
    getAllLedgerByBank(
      (r) => {
        //console.log("sank22", r);
        setAllLedgerBank(r);
      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );
    // bank od
    getAllLedgerByBankOd(
      (r) => {
        setAllLedgerBankOd(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );
    //unsecure loan

    getAllLedgerByUnsecure(
      (r) => {
        setAllLedgerUnSecure(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );

    // current Assets
    getAllLedgerByAssets(
      (r) => {
        //console.log("sank22", r);
        setAllLedgerAssets(r);
      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );

    //sales account
    getAllLedgerByPurchaseGroupTrial(
      (r) => {
        //console.log("sank22", r);
        setAllLedgerSales(r);
      },

      (err) => {
        //console.log("nabla");

        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );

    // purchase

    getAllLedgerByPurchase(
      (r) => {
        //console.log("sank22", r);
        setAllLedgerPurchase(r);
      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );

    // Direct Expences

    getAllLedgerByDirect(
      (r) => {
        //console.log("sank22", r);
        setAllLedgerDirect(r);
      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );

    // InDirect Income

    getAllLedgerByInDirect(
      (r) => {
        //console.log("sank22", r);
        setAllLedgerInDirect(r);
      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );

    // InDirect Expenses

    getAllLedgerByInDirectExpenses(
      (r) => {
        //console.log("sank22", r);
        setAllLedgerInDirectExpenses(r);
      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );

    //ledger Total
    getAllLedgerTotal(
      (r) => {
        //console.log("sank22", r);
        setAllLedgerTotal(r);
      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );

    //closing stock

    getClosingBalance(
      (r) => {
        //console.log(r, "sank1002");
        setClosingbalance(r);
        setLoading(false);
      },

      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );

    //opening Stock Valuation
    getOpeninngStock(
      (r) => {
        //console.log(r, "sank1002");
        setOpeningStock(r);
      },

      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );

    getClosingStockQty(
      (r) => {
        //console.log(r, "sank1002");
        setClosingQty(r);
      },

      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );

    getAvgCost(
      (r) => {
        //console.log(r, "sank1002");
        setAvgCost(r);
      },

      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      {}
    );

    getOpeningStockValue(
      (stock) => {
        console.log(stock, "sankh,,,,,");
        setStockOpeningValue(stock);

        setLoading(false);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      addSearch
    );
    getClosingStock(
      (stock) => {
        console.log(stock, "sen22/04/check");
        setStockClosing(stock);

        setLoading(false);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      addSearch
    );
  
  }, [Refresh]);


  const header = [["Particulars","Closing Balance"]];
  const headerDataPdf = [["Particulars","Debit","Credit"]];
  const headerDataPdf1 = [["Particulars"]];


const onClickPdf = (e) => {
  e.preventDefault();

  let doc = new jsPDF("landscape", 'pt', 'A4');
  console.log(loan, "sen123")

  // const Capital = [];

  loan.forEach((r) => {
    console.log(r[1], "sankr", r[2]);
    if (Number.isInteger(r[1]) || Number.isInteger(r[2])) {
      const sum = Number.isInteger(r[1]) ? r[1] : 0;
      const sum1 = Number.isInteger(r[2]) ? r[2] : 0;
      Capital.push(["Loan (Liability)", sum, sum1]);
      console.log(sum, "sankhasum", sum1);
    } else {
      console.log("r[1] and r[2] are not integers.");
    }
  });

  loan.forEach((r) => {
    Capital.push(r);
  });

  Capital.push(["Current Liability", "", "la la la2"]);
  // sundry.forEach((r) => {
  //   console.log(r[1], "sankr", r[2]);
  //   if (Number.isInteger(r[1]) || Number.isInteger(r[2])) {
  //     const sum = Number.isInteger(r[1]) ? r[1] : 0;
  //     const sum1 = Number.isInteger(r[2]) ? r[2] : 0;
  //     Capital.push(["Current Liability", sum, sum1]);
  //     // console.log(sum, "sankhasum", sum1);
  //   } else {
  //     console.log("r[1] and r[2] are not integers.");
  //   }
  // });

  sundry.forEach((r) => {
    Capital.push(r);
  });

  Capital.push(["Current Assets", "", ""]);

  autoTable(doc, {
    head: header,
  });

  autoTable(doc, {
    head: headerDataPdf,
    body: Capital,
  });

  doc.save(`TrialBalance${currentDate()}.pdf`);
};



const printPdf = () =>{
  var printContents = document.getElementById('table_trial_balance').innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  document.title=`TrialBalance${currentDate()}`;
  window.print();
  location.reload();
}

// function exportTableToExcel() {
//   const table = document.getElementById('excel_table_trial_balance');
  
//   // Clone the table to avoid modifying the original table
//   const clonedTable = table.cloneNode(true);
  
//   // Remove ₹ sign from cell values
//   const cells = clonedTable.querySelectorAll('td');
//   cells.forEach(cell => {
//     cell.textContent = cell.textContent.replace('₹', '');
//   });
  
//   const ws = XLSX.utils.table_to_sheet(clonedTable);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, 'Trial Balance');
//   XLSX.writeFile(wb, 'trial_balance.xlsx');
// }


const exportTableToExcel = async () => {
  const table = document.getElementById('excel_table_trial_balance');

  // Create a new workbook and add a worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Trial Balance');

  // Add header row with formatting
  const headerRow = worksheet.addRow(Array.from(table.querySelectorAll('thead th')).map(th => th.textContent));
  headerRow.font = { bold: true };
  headerRow.eachCell(cell => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'cce6ff' } };
  });

  // Add data rows
  table.querySelectorAll('tbody tr').forEach(row => {
    const rowData = Array.from(row.querySelectorAll('td')).map(td => {
      if (td.textContent.includes('₹')) {
        return parseFloat(td.textContent.replace(/₹/g, '').replace(/,/g, ''));
      } else {
        return td.textContent;
      }
    });
    worksheet.addRow(rowData);
  });

  // Set custom widths for each column
  const columnWidths = [20, 30, 15, 25]; // Add the desired widths for each column in the order they appear
  columnWidths.forEach((width, index) => {
    worksheet.getColumn(index + 1).width = width;
  });

  // Create a Promise for the Blob creation
  const blobPromise = new Promise((resolve) => {
    workbook.xlsx.writeBuffer().then(buffer => {
      resolve(new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      }));
    });
  });

  try {
    // Wait for the Blob to be created before saving the file
    const data = await blobPromise;
    saveAs(data, 'Trial Balance.xlsx');
    console.log('Excel file written successfully');
  } catch (error) {
    console.error('Error writing Excel file:', error);
  }
};




  return (

    <ThemeProvider theme={theme}>
      <GridContainer>
        <GridItem xs="12" >
          {/* <CustomCard
            cdTitle="Trial Balance" 
            
            > */}
            <Card className={classes1.headerCard}>
              <CardHeader className={classes1.TbheaderCdhd} style={{ height: 60 }}>
                <GridContainer justifyContent="space-between" alignItems="center">
                  <GridItem>
                    <h4 className={classes1.headerCdTitle}>Trial Balance</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? ( 
                  <GridItem style={{ cursor: "pointer",display: "none"  }}>
                    {/* ////////////////////////////PDF/////////////////// */}
                    {/* <IconButton onClick={onClickPdf}>
                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />
                      </Tooltip>
                    </IconButton> */}

                    <IconButton onClick={printPdf}>
                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />
                      </Tooltip>
                    </IconButton>

                    <IconButton
                        variant="text"
                        onClick={() => exportTableToExcel()}
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
                    {/* <IconButton onClick={onClickPdf}>
                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />
                      </Tooltip>
                    </IconButton> */}

                    <IconButton onClick={printPdf}>
                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />
                      </Tooltip>
                    </IconButton>

                    <IconButton
                        variant="text"
                        onClick={() => exportTableToExcel()}
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
                style={{ height: "auto", padding: 10 }}
                className={clxs(classes.customScroolBar)}
              >
        <div className={classes.invoice_prv_container}>
         
          <div style={{ margin: "0px" }} className={classes.tablContainer} id="table_trial_balance">
            <TableContainer >
              <Table className={classes.table} aria-label="customized table" id="excel_table_trial_balance">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" className={classes.item_desc}>
                      Particulars
                    </StyledTableCell>

                    <StyledTableCell
                      // colSpan={2}
                      align="center"
                      className={classes.serial_Id}
                    >
                      Closing Balance
                    </StyledTableCell>
                    <StyledTableCell
                      // colSpan={2}
                      align="center"
                      className={classes.serial_Id}
                    >
                      Closing Balance
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.item_desc}
                    ></StyledTableCell>

                    <StyledTableCell align="center" className={classes.serial_Id}>
                      Debit
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.serial_Id}>
                      Credit
                    </StyledTableCell>
                  </StyledTableRow>
                  {/* //////////Capitan account */}
                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc1}>
                      Capital Accounts
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerGroup.length
                        ? currencyFormate(
                            ledgerGroup.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerGroup.length
                        ? currencyFormate(
                            ledgerGroup.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>

                  {ledgerGroup.map((row, i) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell
                          align="left"
                          className={classes.item_desc}
                          style={{ paddingLeft: '20px' }}
                        >
                          {row.ledger_account}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.serial_Id}
                        >
                          {
                            // (row.opening_balance).toFixed(2)
                            row.dr_cr_status === "Dr"
                              ? currencyFormate(row.closingBalance)
                              : ""
                          }
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.serial_Id}
                        >
                          {
                            // (row.closing_balance).toFixed(2)
                            row.dr_cr_status === "Cr"
                              ? currencyFormate(row.closingBalance)
                              : ""
                          }
                        </StyledTableCell>

                        {/* {row.closing_balance} */}
                        {/* <StyledTableCell align="left"  className={classes.serial_Id}>
                                                      {row.closing_balance}
                                                    
                                                    </StyledTableCell> */}
                      </StyledTableRow>
                    );
                  })}
                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc1}>
                      Loan (Liability)
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerLoan.length
                        ? currencyFormate(
                            ledgerLoan.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerLoan.length
                        ? currencyFormate(
                            ledgerLoan.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    {/* {row.closing_balance} */}
                    {/* <StyledTableCell align="left"  className={classes.serial_Id}>
                                                      {row.closing_balance}
                                                    
                                                    </StyledTableCell> */}
                  </StyledTableRow>

                  <StyledTableCell align="left" className={classes.serial_Id} style={{ paddingLeft: '20px' }}>
                    Bank OD A/c
                    {/* <StyledTableCell align="left" className={classes.serial_Id1}>
                    Unsecured Loans
                  </StyledTableCell> */}
                  </StyledTableCell>

                  <StyledTableCell align="right" className={classes.serial_Id} >
                    {ledgerBankOd.length
                      ? currencyFormate(
                          ledgerBankOd.reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Dr" ? li.closingBalance : 0
                              ),
                            0
                          )
                        )
                      : ""}
                  </StyledTableCell>

                  <StyledTableCell align="right" className={classes.serial_Id}>
                    {ledgerBankOd.length
                      ? currencyFormate(
                          ledgerBankOd.reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Cr" ? li.closingBalance : 0
                              ),
                            0
                          )
                        )
                      : ""}
                  </StyledTableCell>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id} style={{ paddingLeft: '20px' }}>
                      Unsecured Loans
                      {/* <StyledTableCell align="left" className={classes.serial_Id1}>
                    Unsecured Loans
                  </StyledTableCell> */}
                    </StyledTableCell>
                    <StyledTableCell align="right" className={classes.serial_Id}>
                      {ledgerUnSecure.length
                        ? currencyFormate(
                            ledgerUnSecure.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell align="right" className={classes.serial_Id}>
                      {ledgerUnSecure.length
                        ? currencyFormate(
                            ledgerUnSecure.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc1}>
                      Current Liability
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerSunday.length
                        ? currencyFormate(
                            ledgerSunday.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerSunday.length
                        ? currencyFormate(
                            ledgerSunday.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    {/* {row.closing_balance} */}
                    {/* <StyledTableCell align="left"  className={classes.serial_Id}>
                                                      {row.closing_balance}
                                                    
                                                    </StyledTableCell> */}
                  </StyledTableRow>

                  <StyledTableCell align="left" className={classes.serial_Id} style={{ paddingLeft: '20px' }}>
                    Sundry Creditors
                    {/* <StyledTableCell align="left" className={classes.serial_Id1}>
                    Unsecured Loans
                  </StyledTableCell> */}
                  </StyledTableCell>

                  {loadings ? (
                    <ProgressBar
                      height="40"
                      width="40"
                      align="center"
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{ float: "right" }}
                      wrapperClass="progress-bar-wrapper"
                      borderColor="#F4442E"
                      barColor="#51E5FF"
                    />
                  ) : (
                    <StyledTableCell align="right" className={classes.serial_Id}>
                      {ledgerSunday.length
                        ? currencyFormate(
                            ledgerSunday.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>
                  )}

                  <StyledTableCell align="right" className={classes.serial_Id}>
                    {ledgerSunday.length
                      ? currencyFormate(
                          ledgerSunday.reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Cr" ? li.closingBalance : 0
                              ),
                            0
                          )
                        )
                      : ""}
                  </StyledTableCell>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc1}>
                      Current Assets
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerAssets.length
                        ? currencyFormate(
                            ledgerAssets.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr"
                                    ? li.closingBalance
                                    : ""
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerAssets.length
                        ? currencyFormate(
                            ledgerAssets.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr"
                                    ? li.closingBalance
                                    : ""
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id} style={{ paddingLeft: '20px' }}>
                      Opening Stock ( Not include in grand total )
                    </StyledTableCell>
                    {loading ? (
                      <ProgressBar
                        height="40"
                        width="40"
                        align="center"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{ float: "right" }}
                        wrapperClass="progress-bar-wrapper"
                        borderColor="#F4442E"
                        barColor="#51E5FF"
                      />
                    ) : (
                      <StyledTableCell
                        align="right"
                        className={classes.serial_Id}
                      >
                        {stockOpeningValue.length
                          ? currencyFormate(
                              stockOpeningValue.reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.OpeningValue),
                                0
                              )
                            )
                          : 0}

                        {/* {ledgerLoanAdvance.length
                          ? ledgerLoanAdvance
                              .reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.closingBalance),
                                0
                              )
                              .toFixed(2)
                          : ""} */}
                        {/* {  openingStockValue[0]?.Value} */}
                      </StyledTableCell>
                    )}
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc1}
                    ></StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id} style={{ paddingLeft: '20px' }}>
                      Loan & Advances(Assets)
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.serial_Id}>
                      {ledgerLoanAdv.length
                        ? currencyFormate(
                            ledgerLoanAdv.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr"
                                    ? li.closingBalance
                                    : ""
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell align="right" className={classes.serial_Id}>
                      {ledgerLoanAdv.length
                        ? currencyFormate(
                            ledgerLoanAdv.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr"
                                    ? li.closingBalance
                                    : ""
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id} style={{ paddingLeft: '20px' }}>
                      Sundry Debtors
                    </StyledTableCell>
                    <StyledTableCell align="right" className={classes.serial_Id}>
                      {ledgerSundayDebtors.length
                        ? currencyFormate(
                            ledgerSundayDebtors.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell align="right" className={classes.serial_Id}>
                      {ledgerSundayDebtors.length
                        ? currencyFormate(
                            ledgerSundayDebtors.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id} style={{ paddingLeft: '20px' }}>
                      Cash in Hand
                    </StyledTableCell>
                    <StyledTableCell align="right" className={classes.serial_Id}>
                      {ledgerCash.length
                        ? currencyFormate(
                            ledgerCash.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell align="right" className={classes.serial_Id}>
                      {ledgerCash.length
                        ? currencyFormate(
                            ledgerCash.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id} style={{ paddingLeft: '20px' }}>
                      Bank Accounts
                    </StyledTableCell>
                    <StyledTableCell align="right" className={classes.serial_Id}>
                      {ledgerBank.length
                        ? currencyFormate(
                            ledgerBank.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell align="right" className={classes.serial_Id}>
                      {ledgerBank.length
                        ? currencyFormate(
                            ledgerBank.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc} style={{ paddingLeft: '20px' }}>
                      Closing Stock ( Not include in grand total )
                    </StyledTableCell>
                    {loading ? (
                      <ProgressBar
                        height="40"
                        width="40"
                        align="center"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{ float: "right" }}
                        wrapperClass="progress-bar-wrapper"
                        borderColor="#F4442E"
                        barColor="#51E5FF"
                      />
                    ) : (
                      <StyledTableCell
                        align="right"
                        className={classes.serial_Id}
                      >
                        {/* {closing_stock} */}

                        {stockClosing && stockClosing.length
                          ? currencyFormate(
                              stockClosing.reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.itClosingValue),
                                0
                              )
                            )
                          : 0}
                      </StyledTableCell>
                    )}
                    <StyledTableCell
                      align="right"
                      className={classes.serial_Id}
                    ></StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc1}>
                      Sales Accounts
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {/* {console.log("sank2806",openingBalance[0]?.dr_cr_status)} */}
                      {ledgerSales.length
                        ? currencyFormate(
                            ledgerSales.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerSales.length
                        ? currencyFormate(
                            ledgerSales.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>

                  {/* {console.log("conls", openingBalance)} */}
                  {ledgerSales.map((row, i) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell
                          align="left"
                          className={classes.item_desc}
                          style={{ paddingLeft: '20px' }}
                        >
                          {row.ledger_account}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.serial_Id}
                        >
                          {/* {(row.opening_balance).toFixed(2)} */}
                          {row.dr_cr_status === "Dr"
                            ? currencyFormate(row.closingBalance)
                            : ""}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.serial_Id}
                        >
                          {/* {(row.closing_balance).toFixed(2)} */}
                          {row.dr_cr_status === "Cr"
                            ? currencyFormate(row.closingBalance)
                            : ""}
                        </StyledTableCell>

                        {/* {row.closing_balance} */}
                        {/* <StyledTableCell align="left"  className={classes.serial_Id}>
                                                      {row.closing_balance}
                                                    
                                                    </StyledTableCell> */}
                      </StyledTableRow>
                    );
                  })}

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc1}>
                      Purchase Accounts
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerPurchase.length
                        ? currencyFormate(
                            ledgerPurchase.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerPurchase.length
                        ? currencyFormate(
                            ledgerPurchase.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    {/* {row.closing_balance} */}
                    {/* <StyledTableCell align="left"  className={classes.serial_Id}>
                                                      {row.closing_balance}
                                                    
                                                    </StyledTableCell> */}
                  </StyledTableRow>

                  {ledgerPurchase.map((row, i) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell
                          align="left"
                          className={classes.item_desc}
                          style={{ paddingLeft: '20px' }}
                        >
                          {row.ledger_account}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.serial_Id}
                        >
                          {/* {(row.opening_balance).toFixed(2)} */}
                          {row.dr_cr_status === "Dr"
                            ? currencyFormate(row.closingBalance)
                            : ""}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.serial_Id}
                        >
                          {/* {(row.closing_balance).toFixed(2)} */}
                          {row.dr_cr_status === "Cr"
                            ? currencyFormate(row.closingBalance)
                            : ""}
                        </StyledTableCell>

                        {/* {row.closing_balance} */}
                        {/* <StyledTableCell align="left"  className={classes.serial_Id}>
                                                      {row.closing_balance}
                                                    
                                                    </StyledTableCell> */}
                      </StyledTableRow>
                    );
                  })}

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc1}>
                      Direct Expenses (Expences(Direct))
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerDirect.length
                        ? currencyFormate(
                            ledgerDirect.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerDirect.length
                        ? currencyFormate(
                            ledgerDirect.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    {/* {row.closing_balance} */}
                    {/* <StyledTableCell align="left"  className={classes.serial_Id}>
                                                      {row.closing_balance}
                                                    
                                                    </StyledTableCell> */}
                  </StyledTableRow>

                  {ledgerDirect.map((row, i) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell
                          align="left"
                          className={classes.item_desc}
                          style={{ paddingLeft: '20px' }}
                        >
                          {row.ledger_account}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.serial_Id}
                        >
                          {/* {(row.opening_balance).toFixed(2)} */}
                          {row.dr_cr_status === "Dr"
                            ? currencyFormate(row.closingBalance)
                            : ""}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.serial_Id}
                        >
                          {/* {(row.closing_balance).toFixed(2)} */}
                          {row.dr_cr_status === "Cr"
                            ? currencyFormate(row.closingBalance)
                            : ""}
                        </StyledTableCell>

                        {/* {row.closing_balance} */}
                        {/* <StyledTableCell align="left"  className={classes.serial_Id}>
                                                      {row.closing_balance}
                                                    
                                                    </StyledTableCell> */}
                      </StyledTableRow>
                    );
                  })}

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc1}>
                      Indirect Incomes (Income(Indirect))
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerInDirect.length
                        ? currencyFormate(
                            ledgerInDirect.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerInDirect.length
                        ? currencyFormate(
                            ledgerInDirect.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    {/* {row.closing_balance} */}
                    {/* <StyledTableCell align="left"  className={classes.serial_Id}>
                                                      {row.closing_balance}
                                                    
                                                    </StyledTableCell> */}
                  </StyledTableRow>

                  {ledgerInDirect.map((row, i) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell
                          align="left"
                          className={classes.item_desc}
                          style={{ paddingLeft: '20px' }}
                        >
                          {row.ledger_account}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.serial_Id}
                        >
                          {/* {(row.opening_balance).toFixed(2)} */}
                          {row.dr_cr_status === "Dr"
                            ? currencyFormate(row.closingBalance)
                            : ""}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.serial_Id}
                        >
                          {/* {(row.closing_balance).toFixed(2)} */}
                          {row.dr_cr_status === "Cr"
                            ? currencyFormate(row.closingBalance)
                            : ""}
                        </StyledTableCell>

                        {/* {row.closing_balance} */}
                        {/* <StyledTableCell align="left"  className={classes.serial_Id}>
                                                      {row.closing_balance}
                                                    
                                                    </StyledTableCell> */}
                      </StyledTableRow>
                    );
                  })}

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc1}>
                      Indirect Expenses (Expenses(Indirect))
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerInDirectExpenses.length
                        ? currencyFormate(
                            ledgerInDirectExpenses.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    <StyledTableCell align="right" className={classes.item_desc1}>
                      {ledgerInDirectExpenses.length
                        ? currencyFormate(
                            ledgerInDirectExpenses.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          )
                        : ""}
                    </StyledTableCell>

                    {/* {row.closing_balance} */}
                    {/* <StyledTableCell align="left"  className={classes.serial_Id}>
                                                      {row.closing_balance}
                                                    
                                                    </StyledTableCell> */}
                  </StyledTableRow>

                  {ledgerInDirectExpenses.map((row, i) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell
                          align="left"
                          className={classes.item_desc}
                          style={{ paddingLeft: '20px' }}
                        >
                          {row.ledger_account}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.serial_Id}
                        >
                          {/* {(row.opening_balance).toFixed(2)} */}
                          {row.dr_cr_status === "Dr"
                            ? currencyFormate(row.closingBalance)
                            : ""}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.serial_Id}
                        >
                          {/* {(row.closing_balance).toFixed(2)} */}
                          {row.dr_cr_status === "Cr"
                            ? currencyFormate(row.closingBalance)
                            : ""}
                        </StyledTableCell>

                        {/* {row.closing_balance} */}
                        {/* <StyledTableCell align="left"  className={classes.serial_Id}>
                                                      {row.closing_balance}
                                                    
                                                    </StyledTableCell> */}
                      </StyledTableRow>
                    );
                  })}

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_descT}>
                      Grand Total
                    </StyledTableCell>
                    <StyledTableCell
                      align="Right"
                      className={classes.item_descT1}
                    >
                      {currencyFormate(
                        (ledgerGroup.length
                          ? ledgerGroup.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Dr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          : "") +
                          (ledgerLoan.length
                            ? ledgerLoan.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Dr"
                                      ? li.closingBalance
                                      : 0
                                  ),
                                0
                              )
                            : 0) +
                          (ledgerSunday.length
                            ? ledgerSunday.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Dr"
                                      ? li.closingBalance
                                      : 0
                                  ),
                                0
                              )
                            : 0) +
                          (ledgerAssets.length
                            ? ledgerAssets.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Dr"
                                      ? li.closingBalance
                                      : ""
                                  ),
                                0
                              )
                            : 0) +
                          (ledgerSales.length
                            ? ledgerSales.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Dr"
                                      ? li.closingBalance
                                      : 0
                                  ),
                                0
                              )
                            : 0) +
                          (ledgerPurchase.length
                            ? ledgerPurchase.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Dr"
                                      ? li.closingBalance
                                      : 0
                                  ),
                                0
                              )
                            : 0) +
                          (ledgerDirect.length
                            ? ledgerDirect.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Dr"
                                      ? li.closingBalance
                                      : 0
                                  ),
                                0
                              )
                            : 0) +
                          (ledgerInDirect.length
                            ? ledgerInDirect.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Dr"
                                      ? li.closingBalance
                                      : 0
                                  ),
                                0
                              )
                            : 0) +
                          (ledgerInDirectExpenses.length
                            ? ledgerInDirectExpenses.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Dr"
                                      ? li.closingBalance
                                      : 0
                                  ),
                                0
                              )
                            : 0)
                            
                      )}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_descT1}
                    >
                      {currencyFormate(
                        (ledgerGroup.length
                          ? ledgerGroup.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  li.dr_cr_status === "Cr" ? li.closingBalance : 0
                                ),
                              0
                            )
                          : "") +
                          (ledgerLoan.length
                            ? ledgerLoan.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Cr"
                                      ? li.closingBalance
                                      : 0
                                  ),
                                0
                              )
                            : 0) +
                          (ledgerSunday.length
                            ? ledgerSunday.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Cr"
                                      ? li.closingBalance
                                      : 0
                                  ),
                                0
                              )
                            : 0) +
                          (ledgerAssets.length
                            ? ledgerAssets.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Cr"
                                      ? li.closingBalance
                                      : ""
                                  ),
                                0
                              )
                            : 0) +
                          (ledgerSales.length
                            ? ledgerSales.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Cr"
                                      ? li.closingBalance
                                      : 0
                                  ),
                                0
                              )
                            : 0) +
                          (ledgerPurchase.length
                            ? ledgerPurchase.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Cr"
                                      ? li.closingBalance
                                      : 0
                                  ),
                                0
                              )
                            : 0) +
                          (ledgerDirect.length
                            ? ledgerDirect.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Cr"
                                      ? li.closingBalance
                                      : 0
                                  ),
                                0
                              )
                            : 0) +
                          (ledgerInDirect.length
                            ? ledgerInDirect.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Cr"
                                      ? li.closingBalance
                                      : 0
                                  ),
                                0
                              )
                            : 0) +
                          (ledgerInDirectExpenses.length
                            ? ledgerInDirectExpenses.reduce(
                                (sum, li) =>
                                  Number(sum) +
                                  Number(
                                    li.dr_cr_status === "Cr"
                                      ? li.closingBalance
                                      : 0
                                  ),
                                0
                              )
                            : 0)
                      )}
                    </StyledTableCell>
                  </StyledTableRow>


                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        {/* </CustomCard> */}
        </CardBody>
        </Card>
        </GridItem>
      </GridContainer>
    </ThemeProvider>

   
  );
};

export default TrialbalanceTest;
