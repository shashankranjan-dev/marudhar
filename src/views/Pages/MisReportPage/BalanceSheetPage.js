import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import { tradingAccountService } from "../../../services/tradingAccountService";
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
import { ThemeProvider, Box, Grid } from "@material-ui/core";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";

import theme from "../../../theme/theme";

// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
  appFontWeight,
  appFontWeightThin
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";
import { currentDate, currentDate1 ,currencyFormate} from "../HelperComponent/utils";

import MasterModelNew from "../../Components/MasterModelNew";
import BalanceSheetViewPage from "./BalanceSheetViewPage";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

import {  getAllLedgerByPurchaseGroupId,getAllClosingBalance ,getAllLedgerByBankOd,
  getAllLedgerByUnsecure,getAllLedgerByCurrent,getAllLedgerByLoan,getAllLedgerBySunday,
  getAllLedgerByCash,getAllLedgerByBank, getAllLedgerLoansTotal, getClosingBalance, getClosingStock} from "../../../services/balanceSheetService";


  import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ProgressBar } from "react-loader-spinner";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import clxs from "classnames";

import {
  
  withStyles,
} from "@material-ui/core";
import {
 
  borderColor,
 
  tblBodyHoverColor,
} from "assets/jss/material-dashboard-pro-react";
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
    fontWeight: 600,
    borderRight: "1px solid " + borderColor,
    color:"blue"
  },
  item_descT: {
    width: "35%",
    fontWeight: 600,
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
const useStyles1 = makeStyles((theme)=>({
  headerCdTitle:{
   
    color: appSecondColor,
    fontWeight: 600,
    paddingLeft: "470px"
    
  }

  
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
const BalanceSheetPage = () => {
  const classes1 = useStyles1()
  const [globalState, dispatch] = useStateValue();
  const [ledgerGroup, setAllLedgerGroup] = React.useState([]);
  const [ledgerBankOd, setAllLedgerBankOd] = React.useState([]);
  const [ledgerUnSecure, setAllLedgerUnSecure] = React.useState([]);
  const [ledgerCurrent, setAllLedgerCurrent] = React.useState([]);
  const [ledgerLoanAdvance, setAllLedgerLoanAdvance] = React.useState([]);
  const [ledgerSunday, setAllLedgerSunday] = React.useState([]);
  const [ledgerCash, setAllLedgerCash] = React.useState([]);
  const [bankAccount, setAllLedgerBankAccount] = React.useState([]); 
  const [total, setAllLedgerTotal] = React.useState([]); 
  const [stockAvgCost, setStockAvgCost] = React.useState([]);
 
  const [closingbalance, setClosingbalance] = React.useState([]);
  const [closingStock, setClosingStock] = React.useState([]);

  
  
  const [openingBalance, setOpeningBalance] = React.useState([]); 
  const [Sum,setSum] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [loadingc, setLoadingc] = React.useState(false);
  const [loadingT, setLoadingT] = React.useState(false);


  const [refresh, setRefresh] = React.useState(false);

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allUnits, setAllUnits] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({   
    txt_from_date: currentDate1(),
    txt_to_date: currentDate(),
  });

  const [addUnit, setAddUnit] = React.useState({
    active: false,
    higher: {
      unit: "",
      value: "",
    },
    lower: {
      unit: "",
      value: "",
    },
    caption: "",
  });

  React.useEffect(() => {
    setAllUnits(tradingAccountService);
    getAllLedgerByPurchaseGroupId(
      (r,sum) => {
        setAllLedgerGroup(r);
        setSum(sum);        
      },
      (err) => {
        
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
    );

    //Loans(total)
    getAllLedgerLoansTotal(
      (r,sum) => {
        setAllLedgerTotal(r);
        setSum(sum);
       
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },{}
    );

    // bank od
    getAllLedgerByBankOd(
      (r,sum) => {
        setAllLedgerBankOd(r);
        setSum(sum);

      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },{}
    );
    //unsecure loan

    getAllLedgerByUnsecure(
      (r,sum) => {
        setAllLedgerUnSecure(r);
        setSum(sum);

      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },{}
    );

    //current liability
    getAllLedgerByCurrent(
      (r,sum) => {
        setAllLedgerCurrent(r);
        setSum(sum);
    setLoadingT(false);

       
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },{}
    );
    // loan and advance
    getAllLedgerByLoan(
      (r,sum) => {
        setAllLedgerLoanAdvance(r);
        setSum(sum);
       
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },{}
    );
    //sunday Debtors
    getAllLedgerBySunday(
      (r,sum) => {
        setAllLedgerSunday(r);
    setLoading(false);

        setSum(sum);
        
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },{}
    );

    //cash in hand
    getAllLedgerByCash(
      (r,sum) => {
        setAllLedgerCash(r);
        setSum(sum);
        
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },{}
    );

    //bank Account
    getAllLedgerByBank(
      (r,sum) => {
        setAllLedgerBankAccount(r);
        setSum(sum);       
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },{}
    );

//closing stock

getClosingBalance(

  (r) => {
    //console.log(r, "sank1002");
    setClosingbalance(r);
    setLoadingc(false);
    
  },

  (err) => {

    dispatch({
      type: actionTypes.SET_OPEN_MSG,
      payload: { msg: err, msgType: "error" },
    });
  }, {}
);


getClosingStock(

  (r) => {
    //console.log(r, "sank1002");
    setClosingStock(r);
    setLoadingc(false);
    
  },

  (err) => {

    dispatch({
      type: actionTypes.SET_OPEN_MSG,
      payload: { msg: err, msgType: "error" },
    });
  }, {}
);
  }, []);

  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };

 

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onCaptionChange = (e) => {
    const { value, name } = e.target;
    setAddUnit({ ...addUnit, caption: value });
  };

  const classes = useStyles();




  const onCloseModel = () => {
    setClassicModal(false);
    setRefresh(!refresh);
   
  };

  return (
    <ThemeProvider theme={theme}>
      <GridContainer>
      <GridItem xs="12" >
        {/* <CustomCard
          cdTitle="Trial Balance" 
          
          > */}
           <Card className={classes1.headerCard}>
           
            <CardBody
              style={{ height: "auto", padding: 10 }}
              className={clxs(classes.customScroolBar)}
            >
       <div className={classes.invoice_prv_container}>
       

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
                      {ledgerGroup.length &&
                        currencyFormate(Math.abs(ledgerGroup
                            .reduce(
                              (sum, li) => {
                                if (li.closeCrDrStatus === 'Dr') {
                                  return Number(sum) + Math.abs(Number(li.closingBalance));
                                } else {
                                  return Number(sum) - Math.abs(Number(li.closingBalance));
                                }
                              },
                              0
                            )))
                            
                        }
                    </StyledTableCell>
                  </StyledTableRow>

                  {ledgerGroup.length &&
                    ledgerGroup.map((row, i) => {
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
                            {row.closeCrDrStatus==='Cr'? '-' : ''}
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
                      {total.length
                        ? currencyFormate(total.reduce(
                            (sum, li) =>
                              Number(sum) + Number(li.closingBalance),
                            0
                          ))
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableCell align="left" className={classes.serial_Id} 
                        style={{ paddingLeft: '20px' }}
                  
                  >
                    Bank OD A/c
                    {/* <StyledTableCell align="left" className={classes.serial_Id1}>
                  Unsecured Loans
                </StyledTableCell> */}
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.serial_Id} >
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
                    <StyledTableCell align="left" className={classes.serial_Id}
                        style={{ paddingLeft: '20px' }}
                    
                    >
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
                        ?
                            currencyFormate(ledgerUnSecure
                              .reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                                0
                              )
                              -
                              ledgerUnSecure
                              .reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                                0
                              )
  
                              )
                            
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
                                Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                              0
                            )
                            -
                            ledgerCurrent
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                              0
                            )

                            )
                            
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id}
                        style={{ paddingLeft: '20px' }}
                    
                    >
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
                                Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                              0
                            )
                            -
                            ledgerCurrent
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                              0
                            )

                            )
                            
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
                         {
                         (
                          Math.abs(ledgerLoanAdvance
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                              0
                            )
                            -
                            ledgerLoanAdvance
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                              0
                            )

                            ) +
                          Math.abs(ledgerSunday
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                              0
                            )
                            -
                            ledgerSunday
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                              0
                            )

                            ) +
                          Math.abs(ledgerCash
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                              0
                            )
                            -
                            ledgerCash
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                              0
                            )

                            ) +
                          Math.abs(bankAccount
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                              0
                            )
                            -
                            bankAccount
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                              0
                            )

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
                           currencyFormate(Math.abs(
                              (ledgerLoanAdvance
                              .reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                                0
                              )
                              -
                              ledgerLoanAdvance
                              .reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                                0
                              )
  
                              ) +
                              (ledgerSunday
                              .reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                                0
                              )
                              -
                              ledgerSunday
                              .reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                                0
                              )
  
                              ) +
                              (ledgerCash
                              .reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                                0
                              )
                              -
                              ledgerCash
                              .reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                                0
                              )
  
                              ) +
                              (bankAccount
                              .reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                                0
                              )
                              -
                              bankAccount
                              .reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                                0
                              )
  
                              ) +
                              closingStock.reduce(
                              (sum, li) =>
                                (Number(sum) + Number( li.itClosingValue )),0
                              )
                            )
                          ) 
                          : (
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
                        ) 
                          
                        }
                      </StyledTableCell>
                    )}
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id}
                        style={{ paddingLeft: '20px' }}
                    
                    >
                      Loan & Advances(Assets)
                    </StyledTableCell>

                    <StyledTableCell
                      align="right"
                      className={classes.serial_Id}
                    >
                      {ledgerLoanAdvance.length
                        ? currencyFormate((ledgerLoanAdvance
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Dr"? li.closingBalance:0),
                              0
                            )
                            -
                            ledgerLoanAdvance
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Cr"? li.closingBalance:0),
                              0
                            ))
                            )
                            
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc1}
                    ></StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id}
                        style={{ paddingLeft: '20px' }}
                    
                    >
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
                        {/* {ledgerSunday.length
                          ? currencyFormate(ledgerSunday
                              .reduce(
                                (sum, li) =>
                                  Number(sum) + Number(li.closingBalance),
                                0
                              ))
                              
                          : ""} */}

                        {ledgerSunday.length
                        ? currencyFormate((ledgerSunday
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                              0
                            )
                            -
                            ledgerSunday
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                              0
                            )

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
                    <StyledTableCell align="left" className={classes.serial_Id}
                        style={{ paddingLeft: '20px' }}
                    
                    >
                      Cash in Hand
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.serial_Id}
                    >
                      {ledgerCash.length
                        ? currencyFormate((ledgerCash
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Dr"? li.closingBalance:0),
                              0
                            )
                            -
                            ledgerCash
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Cr"? li.closingBalance:0),
                              0
                            ))
                            )
                            
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc1}
                    ></StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.serial_Id}
                        style={{ paddingLeft: '20px' }}
                    
                    >
                      Bank Accounts
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.serial_Id}
                    >
                      {bankAccount.length
                        ? currencyFormate((bankAccount
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Dr"?li.closingBalance :0),
                              0
                            )
                            -
                            bankAccount
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Cr"?li.closingBalance:0),
                              0
                            )
                            ))
                           
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      className={classes.item_desc1}
                    ></StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc}
                        style={{ paddingLeft: '20px' }}
                    
                    >
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
                        Math.abs(ledgerGroup
                          .reduce(
                            (sum, li) => {
                              if (li.closeCrDrStatus === 'Dr') {
                                return Number(sum) + Math.abs(Number(li.closingBalance));
                              } else {
                                return Number(sum) - Math.abs(Number(li.closingBalance));
                              }
                            },
                            0
                          )) +
                        total.reduce(
                          (sum, li) => Number(sum) + Number(li.closingBalance),
                          0
                        ) +
                        Math.abs(ledgerCurrent
                          .reduce(
                            (sum, li) => {
                              if (li.closeCrDrStatus === 'Dr') {
                                return Number(sum) + Math.abs(Number(li.closingBalance));
                              } else {
                                return Number(sum) - Math.abs(Number(li.closingBalance));
                              }
                            },
                            0
                          ))
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
                      {
                         currencyFormate(Math.abs(
                            (ledgerLoanAdvance
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                              0
                            )
                            -
                            ledgerLoanAdvance
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                              0
                            )

                            ) +
                            (ledgerSunday
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                              0
                            )
                            -
                            ledgerSunday
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                              0
                            )

                            ) +
                            (ledgerCash
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                              0
                            )
                            -
                            ledgerCash
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                              0
                            )

                            ) +
                            (bankAccount
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Dr" ? li.closingBalance:0  ),   
                              0
                            )
                            -
                            bankAccount
                            .reduce(
                              (sum, li) =>
                                Number(sum) + Number(li.dr_cr_status === "Cr" ? li.closingBalance:0  ),   
                              0
                            )

                            ) +
                          closingStock.reduce(
                            (sum, li) =>
                              (Number(sum) + Number( li.itClosingValue )),0
                            ))
                        )
                      }
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      </CardBody>
      </Card>
      </GridItem>
    </GridContainer>
    </ThemeProvider>
  );
};

export default BalanceSheetPage;