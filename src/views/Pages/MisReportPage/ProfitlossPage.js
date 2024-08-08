import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import pdfIcon from "assets/img/pdf-icon.png";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
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
import ProfitlossViewPage from "./ProfitlossViewPage";


import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import theme from "../../../theme/theme";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { currentDate, currentDate1 } from "../HelperComponent/utils";

// import React from "react";

import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";

import MasterModelNew from "../../Components/MasterModelNew";
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReactSelect from "react-select";
import {
  
  reactSelectStyles
} from "assets/jss/material-dashboard-pro-react"
import {
  getAllLedgerByPurchaseGroup, getAllClosingBalance, getAllClosingBalancePls, getAllLedgerByDirectExpGroup, getAllLedgerByIndirectExpGroup,
  getAllLedgerBySalesGroup, getAllLedgerByIncomeGroup, getClosingStockAvg, getClosingStock, getClosingBalance,getClosingStockRate,getClosingStockQty,getAvgCost, getOpeningStockValue
} from "../../../services/ProfitlossService";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {
  
  
  withStyles,
} from "@material-ui/core";
import { ProgressBar } from "react-loader-spinner";
import { currencyFormate } from "../HelperComponent/utils";
import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  borderColor,
 
  appFontWeight,
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
const useStyles1 = makeStyles((theme)=>({
  headerCdTitle:{
   
    color: appSecondColor,
    fontWeight: 600,
    paddingLeft: "470px"
    
  }

  
}));

const onClickSubmit = () => {
  setClassicModal(false);
};
const onChange = (e) => {
  const { value, name } = e.target;
  setAddBrand({ ...allUnits, [name]: value });
};
const ProfitlossPage = () => {
  const history = useHistory();
  const [globalState, dispatch] = useStateValue();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allUnits, setAllUnits] = React.useState([]);
  const [invItemDetails, setInvItemDetails] = React.useState([]);
  const [allGroup, setAllGroup] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [addSearch, setAddSearch] = React.useState({
   
    txt_from_date: currentDate1(),
    txt_to_date: currentDate(),
  }); 
  const [addReference, setAddReference] = React.useState({
    edit: false,
    reference_id: "",
    switch_active_status: true,
    txt_name: "",
    txt_mobile: "",
    txt_whatsapp: "",
    txt_email: "",
    txt_note: "",
  });
  const [error, setError] = React.useState({
    txt_name: false,
    txt_mobile: false,
  });
  const [openingBalance, setOpeningBalance] = React.useState([]);
  const [openingBalanceDirect, setOpeningBalanceDirect] = React.useState([]);
  const [openingBalanceIndirect, setOpeningBalanceIndirect] = React.useState([]);
  const [openingBalanceSales, setOpeningBalanceSales] = React.useState([]);
  const [openingBalanceIncome, setOpeningBalanceIncome] = React.useState([]);
  const [ledgerGroup, setAllLedgerGroup] = React.useState([]);
  const [ledgerDirect, setAllLedgerDirect] = React.useState([]);
  const [ledgerIndirect, setAllLedgerIndirect] = React.useState([]);
  const [ledgerSales, setAllLedgerSales] = React.useState([]);
  const [ledgerIncome, setAllLedgerIncome] = React.useState([]);
  const [closingbalance, setClosingbalance] = React.useState([]);

  
  const [closingQty, setClosingQty] = React.useState([]);
  const [avgCost, setAvgCost] = React.useState([]);
  
  
  const [stockAvgCost, setStockAvgCost] = React.useState([]);
  const [closingStock, setClosingStock] = React.useState([]);
  const [stockrate, setStockrate] = React.useState([]);

  const [stockOpeningValue, setStockOpeningValue] = React.useState([]);
  
  const [refresh, setRefresh] = React.useState(false);


  const onOpenProfitloss = (e) => {
   
  //  //console.log(onOpenProfitloss,"ooo")
};

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

  let closing_stock_valuation = (closingQty[0]?.sumClosingStockQty) * (avgCost[0]?.Avg_Cost)

  React.useEffect(() => {
    setAllUnits(tradingAccountService);

      getAllLedgerByPurchaseGroup(
      (r) => {
        //console.log("abla", r);
        setAllLedgerGroup(r);

        
      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }, {}
    );

    //DIRECT Expenses

    getAllLedgerByDirectExpGroup(
      (r) => {
        //console.log("abla", r);
        setAllLedgerDirect(r);

      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }, {}
    );

    // indirect Expenses
    getAllLedgerByIndirectExpGroup(
      (r) => {
        //console.log("abla", r);
        setAllLedgerIndirect(r);

      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }, {}
    );
    //sales account
    getAllLedgerBySalesGroup(
      (r) => {
        //console.log("abla", r);
        setAllLedgerSales(r);

      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }, {}
    );

    // indirect income
    getAllLedgerByIncomeGroup(
      (r) => {
        //console.log("abla", r);
        setAllLedgerIncome(r);

      },

      (err) => {
        //console.log("nabla");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }, {}
    );

    // ava_cost
    getClosingStockAvg(
      (r) => {
        //console.log(r, "sank10023");
        setStockAvgCost(r);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    // closing stock
    // getClosingStock(

    //   (r) => {
    //     //console.log(r, "sank1002");
    //     setClosingStock(r);
        
    //   },

    //   (err) => {

    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }, {}
    // );

    getClosingBalance(

      (r) => {
        //console.log(r, "check");
        setClosingbalance(r);
        
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
        
      },

      (err) => {

        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }, {}
    );

    // getClosingStockRate(
    //   (r) => {
    //     //console.log(r, "chet it now");
    //     setStockrate(r);
    //     setLoading(false);
    //   },
    //   (err) => {
    //     setLoading(false);
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );


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
      }, {}
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
      }, {}
    );


    getOpeningStockValue(
      (stock) => {
        console.log(stock,"sankh,,,,,")
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
  }, [refresh]);

  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };

  const headerData = [
    {
      id: "traParticular1",
      label: "Particular",
      align: "left",
    },
    {
      id: "traAmount1",
      label: "Amount",
      align: "right",
    },
    {
      id: "traParticular2",
      label: "Particular",
      align: "left",
    },
    {
      id: "traAmount2",
      label: "Amount",
      align: "right",
    },
  ];

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onCaptionChange = (e) => {
    const { value, name } = e.target;
    setAddUnit({ ...addUnit, caption: value });
  };

  const classes = useStyles();
  const classes1 = useStyles1()
  // const onSearch=()=>{
  //   setClassicModal(true);
  //   setLoading(true);
  //   //PURCHASE ACCOUNT

  


  //   // setLoading(false);
  // }


  const onCloseModel = () => {
    setClassicModal(false);
    setRefresh(refresh);
    setOpeningBalance([]);
    setOpeningBalanceDirect([]);
    setOpeningBalanceIndirect([]);
    setOpeningBalanceSales([]);
    setOpeningBalanceIncome([]);
    setAllLedgerGroup([]);
    setStockAvgCost([]);
    setClosingStock([]);
  };

  const printPdf = () =>{
    var printContents = document.getElementById('table_profit_and_loss').innerHTML;
    // var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    document.title=`Profit_and_Loss${currentDate()}`;
    window.print();
    
    location.reload();
  }


  return (
    <ThemeProvider theme={theme}>
      <GridContainer>
      <GridItem xs="12" >
      <Card className={classes1.headerCard}>
        <CardHeader className={classes1.TbheaderCdhd} style={{ height: 60 }}>
          <GridContainer justifyContent="space-between" alignItems="center">
            <GridItem>
              <h4 className={classes1.headerCdTitle}>Profit & Loss A/c</h4>
            </GridItem>
            {globalState.user.user_role !== "Admin" ? ( 
            <GridItem style={{ cursor: "pointer",display: "none" }}>

              <IconButton onClick={printPdf}>
                <Tooltip title="Export to PDF">
                  <img src={pdfIcon} style={{ width: 20 }} />
                </Tooltip>
              </IconButton>
            </GridItem>
            ):(
              <GridItem style={{ cursor: "pointer" }}>

              <IconButton onClick={printPdf}>
                <Tooltip title="Export to PDF">
                  <img src={pdfIcon} style={{ width: 20 }} />
                </Tooltip>
              </IconButton>
            </GridItem>
            )}
          </GridContainer>
        </CardHeader>

        <CardBody>
     
        <div className={classes.invoice_prv_container}>
        {/* ////////////////////////////PDF/////////////////// */}
        
        <div style={{ display: "inline-flex", float: "left", "flex-direction": "row", width: "100%", }} id="table_profit_and_loss" >
          <div style={{ width: "50%", margin: "0px" }} className={classes.tablContainer} >
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
                    <StyledTableCell align="left" className={classes.serial_Id3} ></StyledTableCell>
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
                      <StyledTableCell align="right" className={classes.serial_IdN} >
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
                    <StyledTableCell align="left" className={classes.item_desc1} >
                      Purchase
                    </StyledTableCell>

                    <StyledTableCell align="left" className={classes.serial_Id}></StyledTableCell>
                    <StyledTableCell align="right" className={classes.item_desc0} >
                      {ledgerGroup.length
                        ? currencyFormate(Math.abs(ledgerGroup
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
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>

                  {ledgerGroup.length &&
                    ledgerGroup.map((row, i) => {
                      return (
                        <StyledTableRow>
                          <StyledTableCell align="left" className={classes.item_desc} style={{ paddingLeft: '20px' }} >
                            {row.ledger_account}
                          </StyledTableCell>

                          <StyledTableCell align="right" className={classes.serial_Id} >
                            {row.closeCrDrStatus=='Cr' ? ' - ' : ''}
                            {currencyFormate(row.closingBalance)}
                          </StyledTableCell>
                          <StyledTableCell align="right" className={classes.serial_Id} ></StyledTableCell>

                        </StyledTableRow>
                      );
                    })}

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc1} >
                      Direct Expenses (Expenses (Direct))
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.serial_Id}></StyledTableCell>
                    <StyledTableCell align="right" className={classes.item_desc0} >
                      {ledgerDirect.length
                        ? currencyFormate(ledgerDirect
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
                         
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>

                  {ledgerDirect.length &&
                    ledgerDirect.map((row, i) => {
                      return (
                        <StyledTableRow>
                          <StyledTableCell align="left" className={classes.item_desc} style={{ paddingLeft: '20px' }} >
                            {row.ledger_account}
                          </StyledTableCell>

                          <StyledTableCell align="right" className={classes.serial_Id} >
                            {row.closeCrDrStatus=='Cr' ? ' - ' : ''}
                            {currencyFormate(row.closingBalance)}
                          </StyledTableCell>
                          
                          <StyledTableCell align="right" className={classes.serial_Id} ></StyledTableCell>

                        </StyledTableRow>
                      );
                    })}

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc1} >
                      Indirect Expenses (Expenses(Indirect))
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.serial_Id} ></StyledTableCell>
                    <StyledTableCell align="right" className={classes.item_desc0} >
                      {ledgerIndirect.length
                        ? currencyFormate(ledgerIndirect
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
                          
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>

                  {ledgerIndirect.map((row, i) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell align="left" className={classes.item_desc} style={{ paddingLeft: '20px' }} >
                          {row.ledger_account}
                        </StyledTableCell>

                        <StyledTableCell align="right" className={classes.serial_Id} >
                          {row.closeCrDrStatus=='Cr' ? ' - ' : ''}
                          { currencyFormate(row.closingBalance) }
                        </StyledTableCell>

                        <StyledTableCell align="right" className={classes.serial_Id} > </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div style={{ width: "50%", margin: "0px" }} className={classes.tablContainer} >
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
                    <StyledTableCell align="left" className={classes.item_desc1} >
                      Sales Accounts
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.item_desc1}></StyledTableCell>
                    <StyledTableCell align="right" className={classes.item_desc1} >
                      {
                        ledgerSales && ledgerSales.length
                          ?
                          currencyFormate(Math.abs(ledgerSales.reduce(
                            (sum, li) => {
                              if (li.closeCrDrStatus === 'Dr') {
                                return Number(sum) + Math.abs(Number(li.closingBalance));
                              } else {
                                return Number(sum) - Math.abs(Number(li.closingBalance));
                              }
                            },
                            0
                          )))

                          : 0
                              }
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc1} >
                      Indirect incomes <br />(Income (indirect))
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.serial_Id}></StyledTableCell>
                    <StyledTableCell align="right" className={classes.item_desc0} >
                      {ledgerIncome.length
                        ? currencyFormate(Math.abs(ledgerIncome
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
                         
                        : ""}
                    </StyledTableCell>
                  </StyledTableRow>
                  {ledgerIncome.map((row, i) => {
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
                           {row.closeCrDrStatus=='Cr' ? ' - ' : ''}
                          {currencyFormate(row.closingBalance) }
                        </StyledTableCell>

                        <StyledTableCell align="right" className={classes.serial_Id} ></StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.item_desc1}>
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
                          currencyFormate(Math.abs(closingStock.reduce(
                            (sum, li) =>
                            (Number(sum) +
                              Number(
                                li.itClosingValue
                              )),
                            0
                          )))

                          : 0

                          ?  closingStock && closingStock.length
                          ?
                          currencyFormate(Math.abs(closingStock.reduce(
                            (sum, li) =>
                            (Number(sum) +
                              Number(
                                li.itClosingValue
                              )),
                            0
                          )))

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
                        Math.abs(stockOpeningValue.reduce(
                          (sum, li) =>
                          (Number(sum) +
                            Number(
                              li.OpeningValue
                            )),
                          0
                        ))
                        +

                        Math.abs(ledgerGroup.reduce(
                          (sum, li) => {
                            if (li.closeCrDrStatus === 'Dr') {
                              return Number(sum) + Math.abs(Number(li.closingBalance));
                            } else {
                              return Number(sum) - Math.abs(Number(li.closingBalance));
                            }
                          },
                          0
                        )) + Math.abs(ledgerDirect
                          .reduce(
                            (sum, li) => {
                              if (li.closeCrDrStatus === 'Dr') {
                                return Number(sum) + Math.abs(Number(li.closingBalance));
                              } else {
                                return Number(sum) - Math.abs(Number(li.closingBalance));
                              }
                            },
                            0
                          )) + Math.abs(ledgerIndirect
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
                        currencyFormate((
                          Math.abs(ledgerSales.reduce(
                            (sum, li) => {
                              if (li.closeCrDrStatus === 'Dr') {
                                return Number(sum) + Math.abs(Number(li.closingBalance));
                              } else {
                                return Number(sum) - Math.abs(Number(li.closingBalance));
                              }
                            },
                            0
                          ))
                           +

                           Math.abs(ledgerIncome
                            .reduce(
                              (sum, li) => {
                                if (li.closeCrDrStatus === 'Dr') {
                                  return Number(sum) + Math.abs(Number(li.closingBalance));
                                } else {
                                  return Number(sum) - Math.abs(Number(li.closingBalance));
                                }
                              },
                              0
                            ) )
                            -
                            Math.abs(closingStock.reduce(
                              (sum, li) =>
                              (Number(sum) +
                                Number(
                                  li.itClosingValue
                                )),
                              0
                            ))

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
        </CardBody>
        </Card>
        </GridItem>
        </GridContainer>
    </ThemeProvider>
  );
};

export default ProfitlossPage;
