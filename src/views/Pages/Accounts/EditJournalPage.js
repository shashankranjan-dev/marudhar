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
  getJournalByJournalId,
} from "../../../services/journalService";
import { updateJournal } from "../../../services/journalService";
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
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox, SettingsInputAntenna } from "@mui/icons-material";
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
import { currentDate1 } from "../HelperComponent/utils";
import { actionTypes } from "../../../context/reducer";
import { Typography } from "@material-ui/core";
import { currencyFormate } from "../HelperComponent/utils";
import {
  whiteColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";

//SERVICE
import {
  getListLedgerAccount,
} from "../../../services/LedgerAccountService";
import set from "date-fns/set";

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
  viewAction: { width: "10%" },
}));

const EditJournalPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [refresh, setRefresh] = React.useState(false);
  const [journal, setJournal] = React.useState([]);
  const [journalDetails, setJournalDetails] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [amount, setAmount] = React.useState(null);
  const [journalCharges, setJournalCharges] = React.useState([]);
  const [journalChargesOption, setJournalChargesOption] = React.useState({});
  const [journalChargesOption1, setJournalChargesOption1] = React.useState({});
  const [ledgerAccount, setAllLedgerAccount] = React.useState([]);
  const [ledgerErr, setLedgerErr] = React.useState(false);
  const [narration, setNarration] = React.useState("");
  const [ledger, setLedger] = React.useState([]);
  const [aErr, setAerr] = React.useState(false);
  const [crdrErr, setCrdrErr] = React.useState(false);
  const [DrTotal, setDrTotal] = React.useState([]);
  const [CrTotal, setCrTotal] = React.useState([]);
  const [drErr, setDrErr] = React.useState(false);
  const [editDetails, setEditDetails] = React.useState([]);
  const [tempDetails, setTempDetails] = React.useState([]);
  const [crErr, setCrErr] = React.useState(false);
  let dr = 0;
  let cr = 0;
  let crTotal = 0;
  let drTotal = 0;
  // let journal_id= journ;
  let totalDr = 0;
  let totalCr = 0;

  const user_id = globalState.user?.serial_Id;

  // for narration
  const narrationHandler = (e) => {
    setNarration(e.target.value);
  };
  const ledgerHandler = (e) => {
    //console.log(e, "sen12345ee")
    //for table output
    setLedgerErr(true);
    setJournalChargesOption({
      value: e.value,
      label: e.label,
    });
  };
  const amountHandler = (e) => {
    //for table output
    setAerr(true);
    setAmount(e.currentTarget.value);
  };
  const creditHandler = (e) => {
    //for table output
    //console.log(e.value, "eeeeee")
    setCrdrErr(true);
    setJournalChargesOption1({
      value: e.value,
      label: e.label,
    });
  };
  //console.log(journal, "sen1806")
  //for journal entry on services

  const submitJournalHandler = (e) => {
    e.preventDefault();

    if (CrTotal === DrTotal) {
      updateJournal(
        journal,
        journalDetails,
        tempDetails,
        narration,
        DrTotal,
        user_id,
        (r) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: {
              msg: "Journal Updated Successfully",
              msgType: "success",
            },
          });
          history.push({
            pathname:'/admin/account/journal'
          })

        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
    } else {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Debit and Credit Does Not Matched", msgType: "info" },
      });
    }
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

    getJournalByJournalId(
      location?.state?.row.journal_id,
      user_id,
      (r) => {
        setNarration(r.narration)
        setJournal(r);
        setJournalDetails(r.journal_details);
        setTempDetails(r.journal_details)
        r.journal_details.map((res, i) => {
          dr = res.dr_cr === 1 ? res.amount : 0;
          drTotal = drTotal + Number(dr);
          setDrTotal(drTotal);

          cr = res.dr_cr === 2 ? res.amount : 0;
          crTotal = crTotal + Number(cr);
          setCrTotal(crTotal);
        })
      },
      (err) => {
        setJournal([]);
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

  const onClickAddItem = (e) => {
    //console.log(e, "sen1234ee")
    if (ledgerErr != false && aErr != false && crdrErr != false) {
      // setJournalDetails((prv) => [...prv, {
      //   // amount:amount,
      //   // dr_cr:journalChargesOption.value,
      //   // ddl_ledger:journalChargesOption1.value,
      //   // ddl_ledger:journalChargesOption1.label, 
      //   amount: Number(amount),
      //   dr_cr: journalChargesOption1.value,
      //   ddl_ledger: journalChargesOption.label,
      //   ddl_ledger_id: journalChargesOption.value,
      // }])
      if (journalDetails.find((v, i) => v.ddl_ledger === e)) {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Item already added", msgType: "info" },
        });
      }
      else {
        setJournalDetails([
          ...journalDetails,
          {
            amount: Number(amount),
            dr_cr: journalChargesOption1.value,
            ddl_ledger: journalChargesOption.label,
            ddl_ledger_id: journalChargesOption.value,
          },
        ]);
        if (journalChargesOption1.value === 1) {
          totalDr = totalDr + parseFloat(amount);
          //console.log(totalDr, "DR")
          setDrTotal((prev) => parseFloat(prev + totalDr));
        } else {
          totalCr = totalCr + parseFloat(amount);
          setCrTotal((prev) => prev + totalCr);
        }
      }
    }
    else {
      //console.log("error");
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Data is Required", msgType: "error" },
      });
    }


    setJournalChargesOption({});
    setJournalChargesOption1({});
    setAmount("");

  };

  //console.log(journalDetails, "sen1234")
  //console.log(DrTotal, "sen1234")
  //console.log(CrTotal, "sen1234")



  const onDeleteData = (e, id) => {
    const del = journalDetails.filter((r, i) => id !== i);
    // const del2 = ledger.filter((r,i)=> id-2 !== i);
    // setLedger(del2)    
    // //console.log("sen1706/jj", id, journalDetails,del.length)

    if (del.length > 0) {
      {
        del.map((res, i) => {
          // //console.log("sen1706/jj", res)
          dr = res.dr_cr === 1 ? res.amount : 0;
          drTotal = drTotal + Number(dr);
          setDrTotal(drTotal);

          cr = res.dr_cr === 2 ? res.amount : 0;
          crTotal = crTotal + Number(cr);
          setCrTotal(crTotal);
        });
      }
    }
    else {
      setDrTotal(0);
      setCrTotal(0);

    }
    setJournalDetails(del);
  };
  // //console.log(ledger,"sen1234e")

  const formData = {
    formName: "Bill Ditails",
    fields: [
      {
        name: "voucher_no",
        label: "Voucher No",
        hidden: false,
        required: true,
        data_type: "number",
        html_element: "select",
        xs: 6,
        md: 6,
        lg: 12,
      },
      {
        name: "narration",
        label: "Narration",
        hidden: false,
        required: true,
        data_type: "Text",
        html_element: "select",
        xs: 6,
        md: 6,
        lg: 12,
      },
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
      <PageHeader title="Sales > Journal > Edit " />
      <GridContainer>
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
                  value={journal.voucher_no}
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
                  defaultValue={currentDate1()}
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
        <GridItem xs="12">
          <CustomCard cdTitle="Add Journal" filterIcon onClickFilter={() => { }}>
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
                  value={journalChargesOption}
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
                  value={journalChargesOption1}
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
                    onClick={() => onClickAddItem(journalChargesOption.label)}
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
                  {journalDetails && journalDetails.map((row, i) => (

                    <StyledTableRow >
                      <StyledTableCell align="center" className={classes.id}>
                        {row.length != 0 ? i + 1 : ""}
                      </StyledTableCell>
                      {/* {//console.log(row, "sen14")} */}
                      <StyledTableCell align="left" className={classes.ledger}>
                        {row.ddl_ledger}
                      </StyledTableCell>

                      <StyledTableCell align="right" className={classes.debit}>
                        {row.dr_cr === 1 ? currencyFormate(row.amount)
                          : null
                        }
                      </StyledTableCell>

                      <StyledTableCell align="right" className={classes.credit}>
                        {row.dr_cr === 2
                          ? currencyFormate(row.amount)
                          : null
                        }
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.viewAction}
                      >
                        <IconButton
                          onClick={(e) => onDeleteData(e, i)}
                          aria-label="delete"
                        >
                          <DeleteIcon
                            fontSize="small"
                            style={{ color: "#f44336" }}
                          />
                        </IconButton>

                      </StyledTableCell>
                    </StyledTableRow>
                  ))}

                  <StyledTableRow >
                    <StyledTableCell align="right">

                    </StyledTableCell>
                    <StyledTableCell align="left" >
                      <b>Total</b>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <b>{currencyFormate(DrTotal)}  </b>
                    </StyledTableCell>
                    <StyledTableCell align="right" >
                      <b>{currencyFormate(CrTotal)}  </b>
                    </StyledTableCell>
                    <StyledTableCell align="right">

                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>

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
            >
              Submit Journal
            </Button>
          </div>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default EditJournalPage;
