import React from "react";
import {
  Paper,
  makeStyles,
  Grid,
  Box,
  Divider,
  withStyles,
} from "@material-ui/core";
import {
  getAllLedgerByPurchaseGroupTrial,
  getAllClosingBalance,
  getAllLedgerByPurchase,
  getAllLedgerByCapital,
  getAllLedgerByAssets,
  getAllLedgerByLoan,
} from "../../../services/TrialbalanceService";
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
import { IconButton, OutlinedInput } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { ProgressBar } from "react-loader-spinner";

import autoTable from "jspdf-autotable";
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
    fontWeight: 500,
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
    width: "75%",
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
    color: "blue"
  },
  item_descT: {
    width: "30%",
    fontWeight: 600,
    borderRight: "1px solid " + borderColor,
    color: "blue"
  },
  item_descT1: {
    width: "10%",
    fontWeight: 600,
    borderRight: "1px solid " + borderColor,
    color: "blue"
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
}));

const TrialbalanceViewPage = ({
  ledgerGroup,
  ledgerLoan,
  ledgerBankOd,
  ledgerUnSecure,
  ledgerSunday,
  ledgerLoanAdv,
  ledgerSundayDebtors,
  ledgerCash,
  ledgerBank,
  searchedInfo,
  ledgerAssets,
  ledgerSales,
  ledgerPurchase,
  ledgerDirect,
  ledgerInDirect,
  ledgerInDirectExpenses,
  Total,
  closingbalance,
  loading,
  loadingC,
  loadings,
  openingStockValue,
  closingQty,
  avgCost,
  stockOpeningValue,
  stockClosing,
  closingvalue,
  trilBalancePdf,

  openingBalanceAssets,
  openingBalanceLoan,
}) => {
  const [globalState, dispatch] = useStateValue();
  const classes = useStyles();
  const [closingBalance, setClosingBalance] = React.useState([]);

  const [addSearch, setAddSearch] = React.useState({
    ddl_ledger_account: "",
    ddl_ledger_group: "",
    txt_from_date: currentDate(),
    txt_to_date: currentDate(),
  });
  const [pdfClicked, setPdfClicked] = React.useState(false);
  // console.log( closingvalue.closingStock , "sank290423");



  React.useEffect(() => {
    // fetchData();
  }, [Refresh]);

  let closing_stock = currencyFormate((closingvalue?.closingStock) * (closingvalue?.sumPurchase_Net_Value / closingvalue?.sumPurchaseQty))


  const headerDataPdf = [["Particulars", "Closing Balance"]];
  console.log("sankh////",

    (stockOpeningValue.length
      ?
      stockOpeningValue.reduce(
        (sum, li) =>
        (Number(sum) +
          Number(
            li.OpeningValue
          )),
        0
      ).toFixed(2)

      : 0))


  // //pdf
  // const onClickPdf = (e) => {
  //   e.preventDefault();

  //   let doc = new jsPDF("landscape", 'pt', 'A4');

  //   autoTable(doc, {
  //     head: headerDataPdf,
  //     body: trilBalancePdf,
  //     didDrawCell: (purchasePdf) => {
  //       //console.log(purchasePdf.column.index)
  //     },
  //   })
  //   doc.save(`TrialBalance${currentDate()}.pdf`);

  // };


  //pdf
  const onClickPdf = (e) => {
    e.preventDefault();
    let doc = new jsPDF("landscape", "pt", "A4");
    doc.html(document.getElementById("pdf-view"), {
      callback: () => {
        doc.save(`TrialBalance${currentDate()}.pdf`);
      },
    });
  };
  return (
    <div
      id="pdf-view"
      style={{
        marginTop: 5,
        marginLeft: 25,
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        breakBefore: "avoid-page",
      }}
    >
      <div className={classes.invoice_prv_container}>
        {/* ////////////////////////////PDF/////////////////// */}
        <IconButton onClick={onClickPdf}>
          <Tooltip title="Export to PDF">
            <img src={pdfIcon} style={{ width: 20 }} />
          </Tooltip>
        </IconButton>
        <Box>
          <div className={classes.inv}>
            Trial Balance

            <div>
              {dateFormate(timestamp(searchedInfo.txt_from_date))} To{" "}
              {dateFormate(timestamp(searchedInfo.txt_to_date))}
            </div>
          </div>
        </Box>
        <div style={{ margin: "0px" }} className={classes.tablContainer}>
          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left" className={classes.item_desc}>
                    Particulars
                  </StyledTableCell>

                  <StyledTableCell
                    colSpan={2}
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
                      ? currencyFormate(ledgerGroup
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? (li.closingBalance) : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>

                  <StyledTableCell align="right" className={classes.item_desc1}>
                    {ledgerGroup.length
                      ? currencyFormate(ledgerGroup
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : 0
                            ),
                          0
                        ))

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
                      ? currencyFormate(ledgerLoan
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>

                  <StyledTableCell align="right" className={classes.item_desc1}>
                    {ledgerLoan.length
                      ? currencyFormate(ledgerLoan
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : 0
                            ),
                          0
                        ))

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
                <StyledTableCell align="right" className={classes.serial_Id}>
                  {ledgerBankOd.length
                    ? currencyFormate(ledgerBankOd
                      .reduce(
                        (sum, li) =>
                          Number(sum) +
                          Number(
                            li.dr_cr_status === "Dr" ? li.closingBalance : 0
                          ),
                        0
                      ))

                    : ""}
                </StyledTableCell>
                <StyledTableCell align="right" className={classes.serial_Id} >
                  {ledgerBankOd.length
                    ? currencyFormate(ledgerBankOd
                      .reduce(
                        (sum, li) =>
                          Number(sum) +
                          Number(
                            li.dr_cr_status === "Cr" ? li.closingBalance : 0
                          ),
                        0
                      ))

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
                      ? currencyFormate(ledgerUnSecure
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.serial_Id}>
                    {ledgerUnSecure.length
                      ? currencyFormate(ledgerUnSecure
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell align="left" className={classes.item_desc1}>
                    Current Liability
                  </StyledTableCell>

                  <StyledTableCell align="right" className={classes.item_desc1}>
                    {ledgerSunday.length
                      ? currencyFormate(ledgerSunday
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>

                  <StyledTableCell align="right" className={classes.item_desc1}>
                    {ledgerSunday.length
                      ? currencyFormate(ledgerSunday
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : 0
                            ),
                          0
                        ))

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
                      ? currencyFormate(ledgerSunday
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>
                )}
                <StyledTableCell align="right" className={classes.serial_Id}>
                  {ledgerSunday.length
                    ? currencyFormate(ledgerSunday
                      .reduce(
                        (sum, li) =>
                          Number(sum) +
                          Number(
                            li.dr_cr_status === "Cr" ? li.closingBalance : 0
                          ),
                        0
                      ))

                    : ""}
                </StyledTableCell>

                <StyledTableRow>
                  <StyledTableCell align="left" className={classes.item_desc1}>
                    Current Assets
                  </StyledTableCell>

                  <StyledTableCell align="right" className={classes.item_desc1}>
                    {ledgerAssets.length
                      ? currencyFormate(ledgerAssets
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : ''
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>

                  <StyledTableCell align="right" className={classes.item_desc1}>
                    {ledgerAssets.length
                      ? currencyFormate(ledgerAssets
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : ''
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell align="left" className={classes.serial_Id} style={{ paddingLeft: '20px' }}>
                    Opening Stock
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
                    <StyledTableCell align="right" className={classes.serial_Id}>

                      {stockOpeningValue && stockOpeningValue.length
                        ?
                        currencyFormate(stockOpeningValue.reduce(
                          (sum, li) =>
                          (Number(sum) +
                            Number(
                              li.OpeningValue
                            )),
                          0
                        ))

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
                      {/* {  currencyFormate(openingStockValue[0]?.Value)} */}
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
                      ? currencyFormate(ledgerLoanAdv
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : ''
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.serial_Id}>
                    {ledgerLoanAdv.length
                      ? currencyFormate(ledgerLoanAdv
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : ''
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell align="left" className={classes.serial_Id} style={{ paddingLeft: '20px' }}>
                    Sundry Debtors
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.serial_Id}>
                    {ledgerSundayDebtors.length
                      ? currencyFormate(ledgerSundayDebtors
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.serial_Id}>
                    {ledgerSundayDebtors.length
                      ? currencyFormate(ledgerSundayDebtors
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell align="left" className={classes.serial_Id} style={{ paddingLeft: '20px' }}>
                    Cash in Hand
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.serial_Id}>
                    {ledgerCash.length
                      ? currencyFormate(ledgerCash
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.serial_Id}>
                    {ledgerCash.length
                      ? currencyFormate(ledgerCash
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell align="left" className={classes.serial_Id} style={{ paddingLeft: '20px' }}>
                    Bank Accounts
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.serial_Id}>
                    {ledgerBank.length
                      ? currencyFormate(ledgerBank
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.serial_Id}>
                    {ledgerBank.length
                      ? currencyFormate(ledgerBank
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell align="left" className={classes.item_desc} style={{ paddingLeft: '20px' }}>
                    Closing Stock
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

                      {
                        closingvalue && closingvalue.length
                          ?
                          currencyFormate(closingvalue.reduce(
                            (sum, li) =>
                            (Number(sum) +
                              Number(
                                li.itClosingValue
                              )),
                            0
                          ))

                          : 0
                      }
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
                      ? currencyFormate(ledgerSales
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>

                  <StyledTableCell align="right" className={classes.item_desc1}>
                    {ledgerSales.length
                      ? currencyFormate(ledgerSales
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : 0
                            ),
                          0
                        ))

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
                        {(row.dr_cr_status === "Dr"
                          ? currencyFormate(row.closingBalance)
                          : ''
                        )}
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.serial_Id}
                      >
                        {/* {(row.closing_balance).toFixed(2)} */}
                        {(row.dr_cr_status === "Cr"
                          ? currencyFormate(row.closingBalance)
                          : ''
                        )}
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
                      ? currencyFormate(ledgerPurchase
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>

                  <StyledTableCell align="right" className={classes.item_desc1}>
                    {ledgerPurchase.length
                      ? currencyFormate(ledgerPurchase
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : 0
                            ),
                          0
                        ))

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
                        {(row.dr_cr_status === "Dr"
                          ? currencyFormate(row.closingBalance)
                          : ''
                        )}
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.serial_Id}
                      >
                        {/* {(row.closing_balance).toFixed(2)} */}
                        {(row.dr_cr_status === "Cr"
                          ? currencyFormate(row.closingBalance)
                          : ''
                        )}
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
                      ? currencyFormate(ledgerDirect
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>

                  <StyledTableCell align="right" className={classes.item_desc1}>
                    {ledgerDirect.length
                      ? currencyFormate(ledgerDirect
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : 0
                            ),
                          0
                        ))

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
                        {(row.dr_cr_status === "Dr"
                          ? currencyFormate(row.closingBalance)
                          : ''
                        )}
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.serial_Id}
                      >
                        {/* {(row.closing_balance).toFixed(2)} */}
                        {(row.dr_cr_status === "Cr"
                          ? currencyFormate(row.closingBalance)
                          : ''
                        )}
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
                      ? currencyFormate(ledgerInDirect
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>

                  <StyledTableCell align="right" className={classes.item_desc1}>
                    {ledgerInDirect.length
                      ? currencyFormate(ledgerInDirect
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : 0
                            ),
                          0
                        ))

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
                        {(row.dr_cr_status === "Dr"
                          ? currencyFormate(row.closingBalance)
                          : ''
                        )}
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.serial_Id}
                      >
                        {/* {(row.closing_balance).toFixed(2)} */}
                        {(row.dr_cr_status === "Cr"
                          ? currencyFormate(row.closingBalance)
                          : ''
                        )}
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
                      ? currencyFormate(ledgerInDirectExpenses
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : 0
                            ),
                          0
                        ))

                      : ""}
                  </StyledTableCell>

                  <StyledTableCell align="right" className={classes.item_desc1}>
                    {ledgerInDirectExpenses.length
                      ? currencyFormate(ledgerInDirectExpenses
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : 0
                            ),
                          0
                        ))

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
                        {(row.dr_cr_status === "Dr"
                          ? currencyFormate(row.closingBalance)
                          : ''
                        )}
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.serial_Id}
                      >
                        {/* {(row.closing_balance).toFixed(2)} */}
                        {(row.dr_cr_status === "Cr"
                          ? currencyFormate(row.closingBalance)
                          : ''
                        )}
                      </StyledTableCell>

                      {/* {row.closing_balance} */}
                      {/* <StyledTableCell align="left"  className={classes.serial_Id}>
                                                    {row.closing_balance}
                                                  
                                                  </StyledTableCell> */}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* { console.log("sankhaTotal", (Total.length ? Total.reduce((sum,li)=> (sum) + (li.dr_cr_status === "Dr" ? li.closingBalance :0),0):'' ))}
        { console.log("sankhaTotal", (Total.length ? Total.reduce((sum,li)=> (sum) + (li.dr_cr_status === "Cr" ? li.closingBalance :0),0):'' ))} */}
        <div style={{ width: "100%" }} className={classes.tablContainer}>
          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell
                    align="left"
                    className={classes.item_descT}
                  >
                    Grand Total
                  </StyledTableCell>
                  <StyledTableCell
                    align="Right"
                    className={classes.item_descT1}
                  >
                    {currencyFormate((ledgerGroup.length
                      ? ledgerGroup
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Dr" ? li.closingBalance : 0
                            ),
                          0
                        )

                      : "")
                      +

                      (ledgerLoan.length
                        ? ledgerLoan
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Dr" ? li.closingBalance : 0
                              ),
                            0
                          )

                        : 0)

                      +
                      (ledgerSunday.length
                        ? ledgerSunday
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Dr" ? li.closingBalance : 0
                              ),
                            0
                          )

                        : 0)
                      +

                      (ledgerAssets.length
                        ? ledgerAssets
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Dr" ? li.closingBalance : ''
                              ),
                            0
                          )

                        : 0)
                      +
                      (ledgerSales.length
                        ? ledgerSales
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Dr" ? li.closingBalance : 0
                              ),
                            0
                          )

                        : 0)
                      +

                      (ledgerPurchase.length
                        ? ledgerPurchase
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Dr" ? li.closingBalance : 0
                              ),
                            0
                          )

                        : 0)
                      +
                      (ledgerDirect.length
                        ? ledgerDirect
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Dr" ? li.closingBalance : 0
                              ),
                            0
                          )

                        : 0)
                      +
                      (ledgerInDirect.length
                        ? ledgerInDirect
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Dr" ? li.closingBalance : 0
                              ),
                            0
                          )

                        : 0)
                      +

                      (ledgerInDirectExpenses.length
                        ? ledgerInDirectExpenses
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Dr" ? li.closingBalance : 0
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
                    {currencyFormate((ledgerGroup.length
                      ? ledgerGroup
                        .reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(
                              li.dr_cr_status === "Cr" ? li.closingBalance : 0
                            ),
                          0
                        )

                      : "")
                      +

                      (ledgerLoan.length
                        ? ledgerLoan
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Cr" ? li.closingBalance : 0
                              ),
                            0
                          )

                        : 0)

                      +
                      (ledgerSunday.length
                        ? ledgerSunday
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Cr" ? li.closingBalance : 0
                              ),
                            0
                          )

                        : 0)
                      +

                      (ledgerAssets.length
                        ? ledgerAssets
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Cr" ? li.closingBalance : ''
                              ),
                            0
                          )

                        : 0)
                      +
                      (ledgerSales.length
                        ? ledgerSales
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Cr" ? li.closingBalance : 0
                              ),
                            0
                          )

                        : 0)
                      +

                      (ledgerPurchase.length
                        ? ledgerPurchase
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Cr" ? li.closingBalance : 0
                              ),
                            0
                          )

                        : 0)
                      +
                      (ledgerDirect.length
                        ? ledgerDirect
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Cr" ? li.closingBalance : 0
                              ),
                            0
                          )

                        : 0)
                      +
                      (ledgerInDirect.length
                        ? ledgerInDirect
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Cr" ? li.closingBalance : 0
                              ),
                            0
                          )

                        : 0)
                      +

                      (ledgerInDirectExpenses.length
                        ? ledgerInDirectExpenses
                          .reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                li.dr_cr_status === "Cr" ? li.closingBalance : 0
                              ),
                            0
                          )

                        : 0))}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

      </div>

    </div>
  );
};

export default TrialbalanceViewPage;
