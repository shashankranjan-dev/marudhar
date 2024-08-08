import React from "react";
import {
  Paper,
  makeStyles,
  Grid,
  Box,
  Divider,
  withStyles,
} from "@material-ui/core";
// import PageTitle from "../../HelperComponent/PageTitle";
// import { getInvoiceBySalesId } from "../../../../services/invoiceLIstService";
// import { getItemDetailById } from "../../../../services/saleService/addEnqueryService";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { currentDate, currencyFormate } from "../HelperComponent/utils";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  borderColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
} from "assets/jss/material-dashboard-pro-react";
import { NoEncryption, Refresh } from "@mui/icons-material";
import GridContainer from "components/Grid/GridContainer";
import { dateFormate } from "../HelperComponent/utils";
import { timestamp } from "services/Utils/utils";

//PDF
import pdfIcon from "assets/img/pdf-icon.png";
import { jsPDF } from "jspdf";
import { IconButton, OutlinedInput } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { ProgressBar } from "react-loader-spinner";

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
    padding: "0 8px 8px 8px",
    height: "350px",
    borderBottom: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
  },
  section_four: {
    padding: "8px",
    // borderLeft: "1px solid " + borderColor,
  },
  section_three: {
    padding: "8px",
  },
  invoice_prv_container: {
    width: "100%",
    minWidth: 750,
    height: "auto",
    // font: "Arial, sans-s",
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
    // borderBottom: "1px solid " + borderColor,
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
    // borderBottom: "1px solid " + borderColor,
    // borderRight: "1px solid " + borderColor,
    marginBottom: "20px",
  },

  tablContainer: {
    marginBottom: "15px",
    borderLeft: "1px solid " + borderColor,
    borderRight: "1px solid " + borderColor,
    borderTop: "1px solid " + borderColor,
  },
  tablContainer1: {
    marginBottom: "15px",
    borderLeft: "1px solid " + borderColor,
    borderRight: "1px solid " + borderColor,
    borderTop: "1px solid " + borderColor,
    paddingTop: "5px",
  },
  // item_desc0: { width: "10%", fontWeight:550, borderBottom:"none" },
  serial_Id: { width: "50px", borderRight: "1px solid " + borderColor },
  serial_Id1: { width: "50px", borderRight: "none", borderBottom: "none" },

  item_desc: { width: "35%", borderRight: "1px solid " + borderColor },
  item_desc1: {
    width: "30%",
    fontWeight: 300,
    borderRight: "1px solid " + borderColor,
    color:"blue"
  },
  item_descT: {
    width: "35%",
    fontWeight: 300,
    borderRight: "1px solid " + borderColor,
    color:"blue"
  },

  amount: { width: "10%", borderRight: "1px solid " + borderColor },

  large_amount: {
    width: "100%",
    borderBottom: "none",
    fontSize: ".8rem",
    fontWeight: 520,
  },

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
    // borderLeft: "1px solid " + borderColor,
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
    // borderBottom: "1px solid " + borderColor,
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
  // insideBorder11: {
  //   borderBottom: rowInfo.index === lastRowIndex? `1px solid`:``

  // },
}));

const BalanceSheetViewPage = ({
  ledgerGroup,
  LoansTotal,
  ledgerBankOd,
  ledgerUnSecure,
  ledgerCurrent,
  ledgerLoanAdvance,
  ledgerSunday,
  ledgerCash,
  bankAccount,
  closingbalance,
  searchedInfo,
  openingBalanceLoan,
  loading,
  loadingc,
  loadingT,
  closingStock
}) => {
  const classes = useStyles();
  const [globalState, dispatch] = useStateValue();
  const [allPrimaryGroup, setAllPrimaryGroup] = React.useState([]);

  const [addSearch, setAddSearch] = React.useState({
    ddl_ledger_account: "",
    ddl_ledger_group: "",
    txt_from_date: currentDate(),
    txt_to_date: currentDate(),
  });

  React.useEffect(() => {}, []);

  //pdf
  const onClickPdf = (e) => {
    e.preventDefault();
    let doc = new jsPDF("landscape", "pt", "A4");
    doc.html(document.getElementById("pdf-view"), {
      callback: () => {
        doc.save(`BalanceSheet${currentDate()}.pdf`);
      },
    });
  };

  let closing_stock =
    closingbalance[0]?.sumClosingStock * closingbalance[0]?.Avg_Cost +
    closingbalance[0]?.purchaseClosing -
    closingbalance[0]?.salesClosing;

  // console.log("closingCheck",closing_stock)
  return (
    <div
      id="pdf-view"
      style={{
        marginTop: 10,
        marginLeft: 15,
        display: "flex",
        flexFlow: "row wrap",
        // justifyContent: "center",
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
            Balance Sheet
             {/* for{" "}
            {dateFormate(timestamp(searchedInfo.txt_from_date))} To{" "}
            {dateFormate(timestamp(searchedInfo.txt_to_date))} */}
          </div>
        </Box>
        <div
          style={{
            display: "inline-flex",
            float: "left",
            "flex-direction": "row",
            width: "100%",
          }}
        >
          <div
            style={{ width: "50%", margin: "0px" }}
            className={classes.tablContainer}
          >
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc}>
                      Liabilities
                    </StyledTableCell>

                    <StyledTableCell align="left" className={classes.serial_Id}>
                      Amount
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                      Amount
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.item_desc1}
                    >
                      Capital Account
                    </StyledTableCell>

                    <StyledTableCell
                      align="left"
                      className={classes.serial_Id}
                    ></StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc1}
                    >
                      {ledgerGroup.length
                        ? currencyFormate(ledgerGroup
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.closingBalance),
                              0
                            ))
                            
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>

                  {ledgerGroup.length &&
                    ledgerGroup.map((row, i) => {
                      return (
                        <StyledTableRow>
                          <StyledTableCell
                            align="left"
                            className={classes.item_desc}
                          >
                            {row.ledger_account}
                          </StyledTableCell>

                          <StyledTableCell
                            align="right"
                            className={classes.serial_Id}
                          >
                            {currencyFormate(row.closingBalance)}
                          </StyledTableCell>

                          <StyledTableCell
                            align="right"
                            className={classes.serial_Id}
                          ></StyledTableCell>
                        </StyledTableRow>
                      );
                    })}

                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.item_desc1}
                    >
                      Loans (Liability)
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.serial_Id}
                    ></StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc1}
                    >
                      {LoansTotal.length
                        ? currencyFormate(LoansTotal.reduce(
                            (sum, li) =>
                              Number(sum) + Number(li.closingBalance),
                            0
                          ))
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableCell align="left" className={classes.serial_Id}>
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
                              Number(sum) + Number(li.closingBalance),
                            0
                          ))
                          
                      : ""}
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.serial_Id}>
                    {/* <StyledTableCell align="left" className={classes.serial_Id1}>
                  {openingBalanceBankOd.length
                    ? currencyFormate(
                      openingBalanceBankOd.reduce(
                        (sum, li) => Number(sum) + Number(li.closing_balance),
                        0
                      )
                    )
                    : ""}
                </StyledTableCell> */}
                  </StyledTableCell>
                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                      Unsecured Loans
                      {/* <StyledTableCell align="left" className={classes.serial_Id1}>
                  Unsecured Loans
                </StyledTableCell> */}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.serial_Id}
                    >
                      {ledgerUnSecure.length
                        ? currencyFormate(ledgerUnSecure
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.closingBalance),
                              0
                            ))
                            
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.serial_Id}
                    >
                      {/* <StyledTableCell align="left" className={classes.serial_Id1}>
                  {openingBalanceBankOd.length
                    ? currencyFormate(
                      openingBalanceBankOd.reduce(
                        (sum, li) => Number(sum) + Number(li.closing_balance),
                        0
                      )
                    )
                    : ""}
                </StyledTableCell> */}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.item_desc1}
                    >
                      Current Liabilities
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.serial_Id}
                    ></StyledTableCell>

                    <StyledTableCell
                      align="right"
                      className={classes.item_desc1}
                    >
                      {ledgerCurrent.length
                        ? currencyFormate(ledgerCurrent
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.closingBalance),
                              0
                            ))
                            
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                    Sundry Creditors
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.serial_Id}
                    >
                      {ledgerCurrent.length
                        ? currencyFormate(ledgerCurrent
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.closingBalance),
                              0
                            ))
                            
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.serial_Id}
                    ></StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.item_desc1}
                    >
                      Profit & Loss A/c
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.serial_Id}
                    ></StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.serial_Id}
                    ></StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div
            style={{ width: "50%", margin: "0px" }}
            className={classes.tablContainer}
          >
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc}>
                      Assets
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                      Amount
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                      Amount
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.item_desc1}
                    >
                      Current Assets
                    </StyledTableCell>

                    <StyledTableCell
                      align="left"
                      className={classes.serial_Id}
                    ></StyledTableCell>
                    {loadingT ? (
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
                        className={classes.item_desc1}
                      >
                        {ledgerCurrent.length ? (
                          ledgerCurrent.reduce(
                            (sum, li) =>
                              Number(sum) + Number(li.closingBalance),
                            0
                          ) +
                          closingStock.reduce(
                            (sum, li) =>
                            (Number(sum) +
                              Number(
                                li.itClosingValue
                              )),
                            0
                          )
                           ? 
                           (
                            currencyFormate (
                              ledgerCurrent.reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.closingBalance),
                                0
                              )
                               +
                               closingStock.reduce(
                                (sum, li) =>
                                (Number(sum) +
                                  Number(
                                    li.itClosingValue
                                  )),
                                0
                              )
                            )
                          ) : (
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
                          )
                        ) : (
                          ""
                        )}
                      </StyledTableCell>
                    )}
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                      Loan & Advances(Assets)
                    </StyledTableCell>

                    <StyledTableCell
                      align="right"
                      className={classes.serial_Id}
                    >
                      {ledgerLoanAdvance.length
                        ? currencyFormate(ledgerLoanAdvance
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.closingBalance),
                              0
                            ))
                            
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc1}
                    ></StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                    Sundry Debtors
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
                        {ledgerSunday.length
                          ? currencyFormate(ledgerSunday
                              .reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.closingBalance),
                                0
                              ))
                              
                          : ""}
                      </StyledTableCell>
                    )}
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc1}
                    ></StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                      Cash in Hand
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.serial_Id}
                    >
                      {ledgerCash.length
                        ? currencyFormate(ledgerCash
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.closingBalance),
                              0
                            ))
                            
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc1}
                    ></StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                      Bank Accounts
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.serial_Id}
                    >
                      {bankAccount.length
                        ? currencyFormate(bankAccount
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.closingBalance),
                              0
                            ))
                           
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc1}
                    ></StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc}>
                      Closing Stock
                    </StyledTableCell>
                    {loadingc ? (
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
                             {
                        closingStock && closingStock.length
                          ?
                          currencyFormate(closingStock.reduce(
                            (sum, li) =>
                            (Number(sum) +
                              Number(
                                li.itClosingValue
                              )),
                            0
                          ))

                          : 0

                          ?  closingStock && closingStock.length
                          ?
                          currencyFormate(closingStock.reduce(
                            (sum, li) =>
                            (Number(sum) +
                              Number(
                                li.itClosingValue
                              )),
                            0
                          ))

                          : 0

                          :
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
                      }
                      </StyledTableCell>
                    )}
                    <StyledTableCell
                      align="right"
                      className={classes.serial_Id}
                    ></StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div
          style={{
            display: "inline-flex",
            width: "100%",
            borderTop: "-8px",
          }}
        >
          <div style={{ width: "50%" }} className={classes.tablContainer}>
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.item_descT}
                    >
                      Total
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.item_descT}
                    ></StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_descT}
                    >
                      {currencyFormate(
                        ledgerGroup.reduce(
                          (sum, li) => Number(sum) + Number(li.closingBalance),
                          0
                        ) +
                        LoansTotal.reduce(
                          (sum, li) => Number(sum) + Number(li.closingBalance),
                          0
                        ) +
                        ledgerCurrent.reduce(
                          (sum, li) => Number(sum) + Number(li.closingBalance),
                          0
                        )
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ width: "50%" }} className={classes.tablContainer}>
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.item_descT}
                    >
                      Total
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.item_descT}
                    ></StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_descT}
                    >
                      {currencyFormate(
                        ledgerCurrent.reduce(
                          (sum, li) => Number(sum) + Number(li.closingBalance),
                          0
                        ) + closingStock.reduce(
                          (sum, li) =>
                          (Number(sum) +
                            Number(
                              li.itClosingValue
                            )),
                          0
                        )
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheetViewPage;
