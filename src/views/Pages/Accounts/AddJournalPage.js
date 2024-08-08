import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import cls from "classnames";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../Components/CustomButton";
import {
  directPurchaseFormRowData,
  addedItemServiceRowData,
  dummyRowData,
} from "../../../services/directPurchaseFormService";
import { postJournal } from "../../../services/addJournalService";
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
import { useStateValue } from "../../../context/context";
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
import { getAllLedgerGroup } from "../../../services/LedgerAccountService";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
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
import { currentDate } from "../HelperComponent/utils";
import { actionTypes } from "../../../context/reducer";
import { Typography } from "@material-ui/core";
import { currencyFormate } from "../HelperComponent/utils";

import {
  whiteColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";

//SERVICE
import { getListLedgerAccount } from "../../../services/LedgerAccountService";

// const options = [
//   { value: "purchase", label: "purchase" },
//   { value: "amount", label: "amount" },
// ];

const option = [
  { value: 1, label: "Dr" },
  { value: 2, label: "Cr" },
];

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
    width: "55%",
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
  Ledger: {
    width: "75%",
  },
  debit: {
    width: "10%",
  },
  credit: {
    width: "10%",
  },
  boldText: {
    fontWeight: 500,
  },
}));

const AddJournalPage = () => {
  const history = useHistory();
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [allItems, setAllItems] = React.useState({});
  const [globalState, dispatch] = useStateValue();
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [amount, setAmount] = React.useState(null);
  const [classicModal, setClassicModal] = React.useState(false);

  const [aErr, setAerr] = React.useState(false);
  const [otherChargesOption, setOtherChargesOption] = React.useState({});
  const [ledgerErr, setLedgerErr] = React.useState(false);
  const [otherChargesOption1, setOtherChargesOption1] = React.useState({});
  const [crdrErr, setCrdrErr] = React.useState(false);
  // const [journalSubmitButton, setJournalSubmitButton] = React.useState(false);
  const [drErr, setDrErr] = React.useState(false);
  const [crErr, setCrErr] = React.useState(false);
  const [drTotal, setDrTotal] = React.useState(0);
  const [crTotal, setCrTotal] = React.useState(0);
  const [ledgerAccount, setAllLedgerAccount] = React.useState([]);
  const [narration, setNarration] = React.useState("");
  const [jDate, setJDate] = React.useState(currentDate());
  const [ledger, setLedger] = React.useState([]);

  const user_id = globalState.user?.serial_id;

  //   {
  //     edit: false,
  //     txt_voucher_no: "AUTO GENERATED",
  //     // txt_voucher_date: currentDate(),
  //     ddl_ledger: "",
  //     ddl_ledger_label: "Select",
  //     // narration: "",
  //     amount: 0,
  //     dr_cr: "",
  //   },
  // ]);

  // const onAddSearch = (e) => {
  //   const { amount, value } = e.target;
  //   addJournal((prv) => ({ ...prv, [amount]: value }));
  //   setAddJournal([
  //           ...addJournal,
  //           {
  //             ledger_account_id:r.ledger_account_id,
  //             amount:r.amount,
  //             dr_cr:r.dr_cr,
  //           },
  //         ]);
  // };

  // otherAmount.map((amount,index)=>{
  //   amounts.push({
  //     amounts:amount.amountValue.value,
  //   });

  // });

  const headerData = [
    {
      id: "jorID",
      label: "#",
      align: "left",
    },
    {
      id: "jorDate",
      label: "Date",
      align: "left",
    },
    {
      id: "jorNo",
      label: "Voucher No",
      align: "left",
    },
    {
      id: "jorLedger",
      label: "Ledger",
      align: "left",
    },
    {
      id: "jorNarration",
      label: "Narration",
      align: "right",
    },
  ];

  // const formData = [
  //   {
  //     formName: "BillDetails",
  //   },
  //   {
  //     name: "txt_nar",
  //     label: "Narration",
  //     hidden: false,
  //     required: false,
  //     data_type: "string",
  //     html_element: "TextArea",
  //     error: false,
  //     xs: 6,
  //     md: 6,
  //     lg: 12,
  //   },
  // ];

  // for narration
  const narrationHandler = (e) => {
    setNarration(e.target.value);
    // setLedger({ ...ledger, narration: e.target.value });
    //console.log(ledger, "aad");
  };
  const ledgerHandler = (e) => {
    //for table output
    setLedgerErr(true);
    setOtherChargesOption({
      value: e.value,
      label: e.label,
    });

    //for services
    // setLedger((prv) => ({
    //   ...prv,
    //   ddl_ledger: e.value,
    //   ddl_ledger_label: e.label,
    // }));
  };

  const amountHandler = (e) => {
    //for table output
    setAerr(true);
    setAmount(Number(e.currentTarget.value));

    //for services
    // setLedger({ ...ledger, amount: e.currentTarget.value });
  };
  const creditHandler = (e) => {
    //for table output
    setCrdrErr(true);
    setOtherChargesOption1({
      value: e.value,
      label: e.label,
    });

    //for services
    // setLedger((prv) => ({
    //   ...prv,
    //   dr_cr: e.value,
    // }));
  };


  const onClickAddItem = () => {
    //console.log("jdtt", jDate);
    
    setLedger((prv)=>[...prv,{
      amount: amount,
      dr_cr:otherChargesOption1.value,
      ddl_ledger_id: otherChargesOption.value,
      ddl_ledger: otherChargesOption.label
    }])

    if (ledgerErr != false && aErr != false && crdrErr != false) {
      //console.log("done");
      setOtherCharges([
        ...otherCharges,
        {
          amount,
          otherChargesOption,
          otherChargesOption1,
          narration,
          date: currentDate(),
        },
      ]);
      // setAmount("");
      // setOtherChargesOption({});
      // setOtherChargesOption1({});
      // if (otherChargesOption.length === 0) {
      //   dispatch({
      //     type: actionTypes.SET_OPEN_MSG,
      //     payload: { msg: "Ledger is Required", msgType: "error" },
      //   });
      // }else if(amount === null){
      //   dispatch({
      //     type: actionTypes.SET_OPEN_MSG,
      //     payload: { msg: "Amount is Required", msgType: "error" },
      //   });
      // }else if(otherChargesOption1.length === 0 ) {
      //   dispatch({
      //     type: actionTypes.SET_OPEN_MSG,
      //     payload: { msg: "Dr is Required", msgType: "error" },
      //   });
      // }
    } else {
      //console.log("error");
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Data is Required", msgType: "error" },
      });
    }
    let totalDr = 0;
    let totalCr = 0;

    if (otherChargesOption1.value === 1) {
      setDrErr(true);
      // setCrErr(false)
      totalDr = totalDr + parseFloat(amount);
      setDrTotal((prev) => prev + totalDr);
    } else {
      setCrErr(true);
      totalCr = totalCr + parseFloat(amount);
      setCrTotal((prev) => prev + totalCr);
      //for services
      // setLedger((prv) => ({ ...prv, amount: crTotal }));
    }

    setAmount("");
    setOtherChargesOption({});
    setOtherChargesOption1({});
    
    // setLedger({...ledger});
    //console.log(ledger,"led");
    //console.log(otherCharges,"other");
  };

  //for journal entry on services
  const submitJournalHandler = (e) => {
    e.preventDefault();
    //console.log(ledger);
    
    if (crTotal === drTotal) {
      postJournal(
        ledger,
        narration,
        jDate,
        crTotal,
        user_id,
        

        (r) => {
          // onCloseModel();
          setRefresh(!refresh);
          dispatch({
            // type: actionTypes.SET_OPEN_MSG,
            // payload: {
            //   msg: "Journal added Successfully",
            //   msgType: "success",
            // },
          });
          setLedger({voucher_no:r.voucher_no})
          setClassicModal(true);
        },
        (err) => {
           dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
    setButtonDisabled(true);

    } else {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Debit and Credit Does Not Matched", msgType: "info" },
      });
    }

    // setJournalSubmitButton(true);


  };
  const classes = useStyles();
  const fetchData = () => {
    getListLedgerAccount(
      (r) => {
        setAllLedgerAccount(r);
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
  }, [refresh]);

 
  const onDelete = (e, index) => {
    //console.log(otherCharges[index].otherChargesOption1.value,"33")
    let deleteRef = otherCharges
    let deleteRef2 = ledger


    if (otherCharges[index].otherChargesOption1.value === 1) {
      setDrTotal(true);
      setDrTotal(drTotal - otherCharges[index]?.amount)
    } else if  
    (otherCharges[index].otherChargesOption1.value === 2)
    {
      setCrTotal(true);
      setCrTotal(crTotal - otherCharges[index]?.amount)
    }
    deleteRef.splice(index, 1);
   
    deleteRef2.splice(index, 1);
    //console.log(deleteRef,"11")
    dispatch({
      type: actionTypes.SET_OPEN_MSG,
      payload: {
        msg: `Item Deleted`,
        msgType: "success",
      },
    });
  };

  const formData = {
    formName: "Bill Ditails",
    fields: [
      {
        name: "ddl_ledger",
        label: "Party",
        otherLabel: "Amount",
        hidden: false,
        required: true,
        data_type: "number",
        html_element: "select",
        options: ledgerAccount,
        xs: 6,
        md: 6,
        lg: 12,
      },
    ],
  };
  return (
    <ThemeProvider theme={theme}>
      <PageHeader title="Sales > Journal > Add " />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Add Journal" filterIcon onClickFilter={() => {}}>
            <GridContainer
              style={{ padding: "10px" }}
              justifyContent="flex-start"
              alignItems="flex-end"
            >
              <GridItem xs="5">
                <InputLabel id="label">Ledger</InputLabel>
                <ReactSelect
                  options={ledgerAccount}
                  getOptionsLabel={(options) => options.label}
                  placeholder="Select"
                  name="ddl_ledger"
                  formatGroupLabel={(d) => d.label}
                  menuPortalTarget={document.body}
                  className={classes.customSelect}
                  styles={reactSelectStyles}
                  onChange={ledgerHandler}
                  value={otherChargesOption}
                />
              </GridItem>
              <GridItem xs="2">
                <InputLabel id="label">Amount</InputLabel>
                <TextField
                  autoFocus={true}
                  size="small"
                  placeholder="Amount"
                  name="txt_amount"
                  align="right"
                  style={{ marginBottom: -15 }}
                  inputProps={{ style: { textAlign: "right" } }}
                  type="number"
                  id="outlined-basic"
                  fullWidth={true}
                  value={amount}
                  onChange={amountHandler}
                  variant="outlined"
                />
              </GridItem>
              <GridItem xs="2">
                <InputLabel id="label">Dr/Cr</InputLabel>
                <ReactSelect
                  options={option}
                  getOptionsLabel={(options) => options.label}
                  placeholder="Dr/Cr"
                  name="txt_dr_cr"
                  formatGroupLabel={(d) => d.label}
                  menuPortalTarget={document.body}
                  className={classes.customSelect}
                  styles={reactSelectStyles}
                  onChange={creditHandler}
                  value={otherChargesOption1}
                />
              </GridItem>

              <GridItem xs="2">
                <div
                  style={{
                    float: "right",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => onClickAddItem()}
                    className={classes.addBtn}
                    size="small"
                    varient="outlined"
                    color="primary"
                  >
                    Add
                  </Button>
                </div>
              </GridItem>
            </GridContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>

      {/* Select and Add Items */}

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Review Added Journal" height={250}>
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">#</StyledTableCell>
                    <StyledTableCell align="left">Ledger</StyledTableCell>
                    <StyledTableCell align="right">Debit</StyledTableCell>
                    <StyledTableCell align="right">Credit</StyledTableCell>
                    <StyledTableCell align="right">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {otherCharges.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="center" className={classes.id}>
                        {row.length != 0 ? i + 1 : ""}
                      </StyledTableCell>

                      <StyledTableCell align="left" className={classes.ledger}>
                        {" "}
                        {`${
                          ledgerErr != false ? row.otherChargesOption.label : ""
                        }`}
                      </StyledTableCell>

                      <StyledTableCell align="right" className={classes.debit}>
                        {row.otherChargesOption1.value === 1
                          ?  currencyFormate(row.amount)
                          : null}
                      </StyledTableCell>

                      <StyledTableCell align="right" className={classes.credit}>
                        {row.otherChargesOption1.value === 2
                          ? currencyFormate(row.amount)
                          : null}
                      </StyledTableCell>

                      <StyledTableCell
                            align="right"
                            className={classes.credit}
                          >
                           
                            <IconButton
                              onClick={(e) => onDelete(row, i)}
                              aria-label="delete"
                              className={classes.credit}
                            >
                              <DeleteIcon
                                fontSize="small"
                                style={{ color: "#f44336" }}
                              />
                            </IconButton>
                          </StyledTableCell>

                     
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box pt={1}>
              <GridContainer>
                <Grid item xs={9}>
                  <Box
                    className={classes.tableLabel}
                    ml={15}
                    textAlign="left"
                    inputProps={{ style: { marginleft: "80px" } }}
                  >
                    {drErr != false || crErr != false ? <b> Total</b> : ""}
                  </Box>
                </Grid>

                <Grid item xs={1}>
                  <Box className={classes.tableLabel} textAlign="left" ml={2}>
                    {drErr != false ? <b>{currencyFormate(drTotal)}</b> : ""}
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <Box className={classes.tableLabel} textAlign="center">
                    {crErr != false ? <b>{currencyFormate(crTotal)}</b>  : ""}
                  </Box>
                </Grid>
              </GridContainer>
            </Box>
          </CustomCard>
        </GridItem>

        <GridItem xs="12">
          <CustomCard
            cdTitle="Journal Details"
            width="100%"
            height="100%"
            style={{ marginTop: 0 }}
          >
            <GridContainer
              justifyContent="flex-start"
              alignItems="flex-end"
              style={{ padding: "5px 20px" }}
            >
              <GridItem xs="3">
                <InputLabel id="label">Voucher No</InputLabel>
                <TextField
                  size="small"
                  placeholder="Voucher No"
                  name="Bill No"
                  // onChange={onAddSearch}
                  id="outlined-basic"
                  fullWidth={true}
                  // value={addSerch.item}
                  variant="outlined"
                  style={{ marginTop: 0 }}
                />
              </GridItem>

              <GridItem xs="2">
                <InputLabel id="label">Date Between</InputLabel>
                <TextField
                  size="small"
                  id="date"
                  variant="outlined"
                  type="date"
                  fullWidth={true}
                  defaultValue={currentDate()}
                  value={jDate}
                  onChange={(v) => setJDate(v.target.value)}
                  className={classes.dateField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </GridItem>

              <GridItem xs="7">
                <InputLabel id="label">Narration</InputLabel>
                <TextField
                  size="small"
                  placeholder="Narration"
                  name="Narration"
                  id="outlined-basic"
                  fullWidth={true}
                  value={narration}
                  variant="outlined"
                  onChange={narrationHandler}
                />
              </GridItem>
            </GridContainer>
          </CustomCard>
        </GridItem>
        <GridItem xs={12}>
          <div className={classes.actionbtns}>
            <Button
              // onClick={() => history.push("/admin/sales/add-new-quatation")}
              // onClick={() => setClassicModal(true)}
              onClick={submitJournalHandler}
              className={classes.actionbtn}
              variant="outlined"
              color="primary"
              disabled={buttonDisabled}

            >
              Submit Journal
            </Button>
          </div>
        </GridItem>
        <MasterModel
          classicModal={classicModal}
          onCloseModel={() => setClassicModal(false)}
          width={600}
          closeIcon={false}
          height="auto"
          // addTodobtn
          closeBtn={false}
          okbtnWith={200}
          appLogo
          modelName=""
          okBtnText="OK"
          onClickOk={(e) => {
            e.preventDefault();
            setClassicModal(false);
            history.push("/admin/account/journal");
          }}
        >
          <StepProceedModel
            step={1}
            isStep={false}
            title="Thank you"
            desc=" Your journal No is "
            generateNo={ledger.voucher_no}
          />
        </MasterModel>
      </GridContainer>
    </ThemeProvider>
  );
};

export default AddJournalPage;
