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
import {
  getAllLedgerByPurchaseGroup,
  getAllClosingBalance,
  getAllClosingBalancePls,
  getAllLedgerByDirectExpGroup,
  getAllLedgerByIndirectExpGroup,
  getAllLedgerBySalesGroup,
  getAllLedgerByIncomeGroup,
  getClosingStockAvg,
  getClosingStock,
} from "../../../services/ProfitlossService";
import { getAllLedgerGroup } from "../../../services/LedgerAccountService";
import { getListLedgerAccount } from "../../../services/LedgerAccountService";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { currencyFormate, currentDate, currentDate1 } from "../HelperComponent/utils";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { dateFormate } from "../HelperComponent/utils";
import { timestamp } from "services/Utils/utils";
import { ProgressBar } from "react-loader-spinner";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  borderColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
} from "assets/jss/material-dashboard-pro-react";

//PDF
import pdfIcon from "assets/img/pdf-icon.png";
import { jsPDF } from "jspdf";
import { IconButton, OutlinedInput } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

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
    // borderBottom: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
  },
  open_one: {
    padding: "1px",
    borderTop: "1px solid" + borderColor,
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
    minWidth: 600,
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
  serial_Id: { width: "10%", borderRight: "1px solid " + borderColor },
  serial_IdN: {
    width: "10%",
    fontWeight: 550,
    borderBottom: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
    color: "blue"
  },

  item_desc0: {
    width: "10%",
    fontWeight: 550,
    borderRight: "1px solid " + borderColor,color: "blue"
  },
  serial_Id2: { width: "10%", paddingTop: "20px", borderBottom: "none" ,fontWeight: 550,color:"blue"},
  serial_id3: { width: "10%", borderTop: "none" },
  item_desc: { width: "30%", borderRight: "1px solid " + borderColor },
  item_desc1: {
    width: "30%",
    fontWeight: 550,
    borderRight: "1px solid " + borderColor,
  },
  item_desc9: {
    width: "30%",
    fontWeight: 550,
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
  item_desc1: {
    width: "20%",
    fontWeight: 550,
    borderRight: "1px solid " + borderColor,
    color: "blue"
  },
  item_desc2: {
    width: "24%",
    fontWeight: 200,
    borderRight: "1px solid " + borderColor,
  },
  item_descT: {
    width: "44%",
    fontWeight: 200,
    borderRight: "1px solid " + borderColor,
  },

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

const ProfitlossViewPage = ({
  ledgerGroup,
  ledgerDirect,
  ledgerIndirect,
  ledgerSales,
  searchedInfo,
  openingBalance,
  ledgerIncome,
  openingBalanceDirect,
  openingBalanceIndirect,
  openingBalanceSales,
  openingBalanceIncome,
  stockAvgCost,
  closingStock,
  stockrate,
  loading,
  stockOpeningValue,
  closingQty,
  avgCost
}) => {
  const [globalState, dispatch] = useStateValue();
  const classes = useStyles();

  const [closingBalance, setClosingBalance] = React.useState([]);

  const [addSearch, setAddSearch] = React.useState({
    txt_from_date: currentDate1(),
    txt_to_date: currentDate(),
  });

  React.useEffect(() => {
    // fetchData();
  }, []);

  //pdf
  const onClickPdf = (e) => {
    e.preventDefault();
    let doc = new jsPDF("landscape", "pt", "A4");
    doc.html(document.getElementById("pdf-view"), {
      callback: () => {
        doc.save(`Profit&Loss${currentDate()}.pdf`);
      },
    });
  };
  // console.log(closingQty[0]?.sumClosingStockQty,"sankclodl=",avgCost[0]?.Avg_Cost)
  let closing_stock_valuation = (closingQty[0]?.sumClosingStockQty) * (avgCost[0]?.Avg_Cost)
  // let closing_stock =
  //   Number(closingStock[0]?.sumClosingStock) * Number(stockAvgCost[0]?.Avg_Cost) +
  //   ledgerGroup.reduce(
  //     (sum, li) => Number(sum) + Number(li.closingBalance),
  //     0
  //   ) -
  //   ledgerSales[0]?.closingBalance;

  // console.log( stockAvgCost[0]?.Avg_Cost
  //   ,"sankclosing_stock")

  return (
    <div
      id="pdf-view"
      style={{
        marginTop: 5,
        marginLeft: 25,
        fontSize: "small",
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
            Profit & Loss A/c
            {/* <div>
              {" "}
              {dateFormate(timestamp(searchedInfo.txt_from_date))} To{" "}
              {dateFormate(timestamp(searchedInfo.txt_to_date))}{" "}
            </div> */}
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
                  <TableRow>
                    <StyledTableCell align="left" className={classes.item_desc}>
                      Particulars
                    </StyledTableCell>

                    <StyledTableCell align="left" className={classes.serial_Id}>
                      Amount
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                      Amount
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc9}>
                      Opening stock
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.serial_Id3}
                    ></StyledTableCell>
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
                        className={classes.serial_IdN}
                      >
                         {
                          stockOpeningValue && stockOpeningValue.length
                            ?
                            currencyFormate(stockOpeningValue.reduce(
                              (sum, li) =>
                              (Number(sum) +
                                Number(
                                  li.OpeningValue
                                )),
                              0
                            ))
    
                            : 0
                         ?
                         stockOpeningValue && stockOpeningValue.length
                          ?
                          currencyFormate(stockOpeningValue.reduce(
                            (sum, li) =>
                            (Number(sum) +
                              Number(
                                li.OpeningValue
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
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.item_desc1}
                    >
                      Purchase
                    </StyledTableCell>

                    <StyledTableCell
                      align="left"
                      className={classes.serial_Id}
                    ></StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc0}
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
                  {/* {console.log("conls", openingBalance)} */}
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
                            {/* {(row.opening_balance).toFixed(2)} */}
                            {/* {row.openingBalance} */}
                          </StyledTableCell>

                          <StyledTableCell
                            align="right"
                            className={classes.serial_Id}
                          >
                            {currencyFormate(row.closingBalance)}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}

                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.item_desc1}
                    >
                      Direct Expenses (Expenses (Direct))
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.serial_Id}
                    ></StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc0}
                    >
                      {ledgerDirect.length
                        ? currencyFormate(ledgerDirect
                          .reduce(
                            (sum, li) =>
                              Number(sum) + Number(li.closingBalance),
                            0
                          ))
                         
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>
                  {ledgerDirect.length &&
                    ledgerDirect.map((row, i) => {
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
                            {/* {(row.opening_balance).toFixed(2)} */}
                            {/* {row.openingBalance} */}
                          </StyledTableCell>

                          <StyledTableCell
                            align="right"
                            className={classes.serial_Id}
                          >
                            {currencyFormate(row.closingBalance)}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}

                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.item_desc1}
                    >
                      Indirect Expenses (Expenses(Indirect))
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.serial_Id}
                    ></StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc0}
                    >
                      {ledgerIndirect.length
                        ? currencyFormate(ledgerIndirect
                          .reduce(
                            (sum, li) =>
                              Number(sum) + Number(li.closingBalance),
                            0
                          ))
                          
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>
                  {ledgerIndirect.map((row, i) => {
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
                  <TableRow>
                    <StyledTableCell align="left" className={classes.item_desc}>
                      Particulars
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                      Amount
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                      Amount
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.item_desc1}
                    >
                      Sales Accounts
                      <StyledTableCell
                        align="left"
                        className={classes.serial_Id2}
                      >
                        {/* {openingBalanceSales[0]?.ledger_account} */}
                      </StyledTableCell>
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                      {/* amount area */}

                      <StyledTableCell
                        align="right"
                        className={classes.serial_Id2}
                      >
                        {/* {Number(openingBalanceSales[0]?.opening_balance).toFixed(2)} */}
                      </StyledTableCell>
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                      <StyledTableCell
                        align="right"
                        className={classes.serial_Id2}
                      >
                        {currencyFormate(ledgerSales[0]?.closingBalance)}
                      </StyledTableCell>
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.item_desc1}
                    >
                      Indirect incomes(Income(indirect))
                      {/* <StyledTableCell
                        align="left"
                        className={classes.serial_Id2}
                      >
                        {ledgerIncome[0]?.ledger_account}
                      </StyledTableCell> */}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                      {/* <StyledTableCell
                        align="right"
                        className={classes.serial_Id2}
                      >
                       
                      </StyledTableCell> */}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc0}
                    >
                      {ledgerIncome.length
                        ? currencyFormate(ledgerIncome
                          .reduce(
                            (sum, li) =>
                              Number(sum) + Number(li.closingBalance),
                            0
                          ))
                         
                        : ""}

                      {/* <StyledTableCell
                        align="right"
                        className={classes.serial_Id2}
                      >
                        {Number(ledgerIncome[0]?.closingBalance).toFixed(2)}
                      </StyledTableCell> */}
                    </StyledTableCell>
                  </StyledTableRow>
                  {ledgerIncome.map((row, i) => {
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
                            ? row.closingBalance.toFixed(2)
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
                    <StyledTableCell align="left" className={classes.item_desc}>
                      Closing stock
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.serial_Id3}
                    ></StyledTableCell>
                    {loading ? (
                      <ProgressBar
                        height="40"
                        width="40"
                        align="center"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{ float: "right" }}
                        wrapperClass="progress-bar-wrapper"
                        borderColor="#51E5FF"
                        barColor="#F4442E"
                      />
                    ) : (
                      <StyledTableCell
                        align="right"
                        className={classes.serial_IdN}
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

                        {/* {closing_stock_valuation ? currencyFormate(closing_stock_valuation) :0} */}
                      </StyledTableCell>
                    )}
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
                      className={classes.item_desc2}
                    ></StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.item_desc1}
                    >
                      {currencyFormate((
                        stockOpeningValue.reduce(
                          (sum, li) =>
                          (Number(sum) +
                            Number(
                              li.OpeningValue
                            )),
                          0
                        )
                        +

                        ledgerGroup.reduce(
                          (sum, li) =>
                            Number(sum) + Number(li.closingBalance),
                          0
                        ) + ledgerDirect
                          .reduce(
                            (sum, li) =>
                              Number(sum) + Number(li.closingBalance),
                            0
                          ) + ledgerIndirect
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.closingBalance),
                              0
                            )

                      ))}
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
                      className={classes.item_desc2}
                    ></StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc1}
                    >
                      {
                        currencyFormate(((ledgerSales[0]?.closingBalance) +

                          ledgerIncome
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.closingBalance),
                              0
                            )
                            -
                            closing_stock_valuation

                         ))
                      }
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

export default ProfitlossViewPage;
