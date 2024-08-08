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
import { currentDate, currentDate1 } from "../HelperComponent/utils";
//SERVICE
import { getAllLedgerGroup } from "../../../services/LedgerAccountService";

import {
  getSearchLedgerVouchers,
  getLedgerClosingBalance,
} from "../../../services/accountLedgerService";

import { getListLedgerAccount } from "../../../services/LedgerAccountService";
import { getListGroup } from "../../../services/settingGroupService";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: "180px",
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
const LedgerMisPage = ({ ledgerList, openingBalance, outstanding }) => {
  //console.log(currentDate(1), "data increse");
  let closingBalance = 0;
  let closing_balance_dr_cr = "";
  let total = 0;
  let totalDr = 0;
  let totalCr = 0;
  const balanceSheet = () => {
    ledgerList.map((row, i) => {
      //console.log("xx", openingBalance.opening, totalDr, row.dr_cr);

      total =
        row.sales_order_other_charges &&
        row.sales_order_other_charges.reduce(
          (s, l) =>
            l.charge_type === "+"
              ? s + Number(l.charge_amount)
              : s - Number(l.charge_amount),
          0
        );

      if (row.dr_cr === 1) {
        totalDr = total
          ? parseFloat(row.amount) + parseFloat(totalDr) + parseFloat(total)
          : parseFloat(row.amount) + parseFloat(totalDr);
      } else {
        totalCr = total
          ? parseFloat(row.amount) + parseFloat(totalCr) + parseFloat(total)
          : parseFloat(row.amount) + parseFloat(totalCr);
      }
    });

    if (openingBalance.dr_cr_status === "Dr") {
      totalDr = openingBalance.opening + Number(totalDr);
      //console.log(totalDr, "xxx");
    } else {
      totalCr = openingBalance.opening + totalCr;
    }
    //console.log(totalDr, "dr total");
    //console.log(totalCr, "cr total");
  };

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
    // getAllLedgerGroup(
    //   (r) => {
    //     setAllLedgerGroup(r);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );
    // getListLedgerAccount(
    //   (r) => {
    //     //console.log("sen123", r);
    //     setAllLedgerAccount(r);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );
    // getListGroup(
    //   (r) => {
    //     setAllGroup(r);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );
  };
  const tableData = [];
  const headerData = [
    {
      id: "ledDate",
      label: "Date",
      align: "left",
    },
    {
      id: "ledVoucherNo",
      label: "Voucher No",
      align: "left",
    },
    {
      id: "ledVoucherType",
      label: "Voucher Type",
      align: "left",
    },
    {
      id: "ledParticular",
      label: "Particular",
      align: "left",
    },
    {
      id: "ledDebit",
      label: "Debit",
      align: "right",
    },
    {
      id: "ledCredit",
      label: "Credit",
      align: "right",
    },
  ];

  balanceSheet();

  const classes = useStyles();

  const getVType = (voucherType) => {
    if (voucherType === "R") {
      return "Receipt";
    } else if (voucherType === "P") {
      return "Payment";
    } else return voucherType;
  };

  // const getAmount = (row, r_dr_cr) => {
  //   //console.log(row, "sen2405/row");
  //   //console.log(r_dr_cr, "sen2405/row");

  //   if (
  //     (row.particular &&
  //       r_dr_cr.includes(row.dr_cr) &&
  //       row.bank_id === outstanding.ledger_account_id &&
  //       !r_dr_cr.includes(row.ledVoucherType)) ||
  //     (row.bank_id !== outstanding.ledger_account_id &&
  //       r_dr_cr.includes(row.ledVoucherType))
  //   ) {
  //     return Number(row.amount);
  //   }
  //   return "";
  // };

  const getAmount = (row, r_dr_cr) => {
    // //console.log(row.sales_order_other_charges,"sen2705/row")
    // //console.log(row.amount,"sen2705/row1")

   // //console.log( row,"sen2405/row")

    if ((row.particular && r_dr_cr.includes(row.dr_cr)) &&
      row.bank_id === outstanding.ledger_account_id && !r_dr_cr.includes(row.ledVoucherType) ||
      row.bank_id !== outstanding.ledger_account_id && r_dr_cr.includes(row.ledVoucherType)) {
        if (row.sales_status==="37" ){
          return (
            row.invoice_item_details?.length > 0 ? Number(row.amount) : 0
          )
        }else if(row.sales_status==="46"){
          return "0"

        }
        else{
          return row.amount

        }
      
    }
    return "";
  };

  return (
    <ThemeProvider theme={theme}>
      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Ledger List" height="auto">
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
                    <StyledTableCell align="left">Date</StyledTableCell>
                    <StyledTableCell align="left">Voucher No</StyledTableCell>
                    <StyledTableCell align="left">Voucher Type</StyledTableCell>
                    <StyledTableCell align="left">Particular</StyledTableCell>
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
                    <StyledTableCell className={classes.credit}>
                      <b>Opening Balance</b>
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.credit}
                    ></StyledTableCell>
                    <StyledTableCell
                      className={classes.credit}
                    ></StyledTableCell>
                    <StyledTableCell align="right">
                      <b>
                        {openingBalance.dr_cr_status === "Dr"
                          ? currencyFormate(openingBalance.opening)
                          : ""}
                      </b>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {/* <b>{openingBalance ===0?'':openingBalance}</b> */}
                      <b>
                        {openingBalance.dr_cr_status === "Cr"
                          ? currencyFormate(openingBalance.opening)
                          : ""}
                      </b>
                    </StyledTableCell>
                  </StyledTableRow>

                  {/* {//console.log(openingBalance, "ledlist")} */}

                  {ledgerList.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="left" className={classes.id}>
                        {row.length != 0 ? i + 1 : ""}
                      </StyledTableCell>

                      <StyledTableCell align="left" className={classes.ledger}>
                        {row.ledDate}
                      </StyledTableCell>

                      <StyledTableCell align="left" className={classes.ledger}>
                        {row.ledVoucherNo}
                      </StyledTableCell>

                      <StyledTableCell align="left" className={classes.ledger}>
                        {getVType(row.ledVoucherType) === "BR" ||
                        getVType(row.ledVoucherType) === "BP"
                          ? "Bad Debt"
                          : getVType(row.ledVoucherType)}
                      </StyledTableCell>

                      <StyledTableCell align="left" className={classes.ledger}>
                        {
                          /*`${
                          row.ledJournal[0].ddl_ledger ===
                          addSearch.ddl_ledger_account.label
                            ? row.ledJournal[1].ddl_ledger
                            : row.ledJournal[0].ddl_ledger
                        }` */
                          // row.mode ? row.mode : row.particular
                          row.particular
                            ? row.particular
                            : row.ledger_account_for_party
                        }
                      </StyledTableCell>

                      <StyledTableCell align="right" className={classes.ledger}>
                        {/* {//console.log(row, "sen3105")} */}

                        {
                        !getAmount(row, [1, 'P', 'BR']) ? 
                        
                        row.sales_status === "37"?

                       currencyFormate( getAmount(row, [1, 'P', 'BR'])):
                        
                        '' 
                        : 
                        currencyFormate(
                        
                        !row.sales_order_other_charges?
                        getAmount(row, [1, 'P', 'BR']) 
                        :
                        getAmount(row, [1, 'P', 'BR']) 
                        + (row.sales_order_other_charges && row.sales_order_other_charges.reduce((s, l) =>
                            l.charge_type === "+" ?
                              s + Number(l.charge_amount) : s - Number(l.charge_amount)
                            , 0))

                            )
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
                        getAmount(row, [2, 'R', 'BP'])?currencyFormate(getAmount(row, [2, 'R', 'BP'])):getAmount(row, [2, 'R', 'BP'])
                        }
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  <StyledTableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="left">
                      <b> Closing Balance</b>
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    {/* {//console.log("cllh", closingBalance)} */}
                    {/* <StyledTableCell align="right"> <b> { closingBalance !== 0 && (closing_balance_dr_cr === "Cr" ? currencyFormate(closingBalance) : "") } </b> </StyledTableCell>
                    <StyledTableCell align="right"> <b> { closingBalance !== 0 && (closing_balance_dr_cr === "Dr" ? currencyFormate(closingBalance) : "") } </b> </StyledTableCell> */}
                    <StyledTableCell align="right">
                      <b>
                        {" "}
                        {totalCr > totalDr
                          ? currencyFormate(totalCr - totalDr)
                          : ""}
                      </b>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <b>
                        {" "}
                        {totalDr > totalCr
                          ? currencyFormate(totalDr - totalCr)
                          : ""}
                      </b>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="left">
                      <b>Total</b>
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>

                    <StyledTableCell align="right">
                      <b>
                        {totalCr > totalDr
                          ? currencyFormate(totalCr)
                          : currencyFormate(totalDr)}
                      </b>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <b>
                        {totalCr > totalDr
                          ? currencyFormate(totalCr)
                          : currencyFormate(totalDr)}
                      </b>
                    </StyledTableCell>

                    {/* <StyledTableCell align="right"><b> { currencyFormate(( openingBalance.dr_cr_status === "Dr" ? openingBalance.opening : 0 ) + totalDr + ( closing_balance_dr_cr === "Cr" ? closingBalance : 0 )) } </b></StyledTableCell>
                    <StyledTableCell align="right"><b> { currencyFormate(( openingBalance.dr_cr_status === "Cr" ? openingBalance.opening : 0 ) + totalCr + ( closing_balance_dr_cr === "Dr" ? closingBalance : 0 )) } </b></StyledTableCell> */}
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default LedgerMisPage;
