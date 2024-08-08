import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import ReactSelect from "react-select";
import { wishListData } from "../../../services/enquiryListService";
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
import { getAllLedgerAccount  } from "../../../services/taxMasterService";

import theme from "../../../theme/theme";

// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
  appFontWeightThin,
  tblBodyHoverColor,
  reactSelectStyles,
  whiteColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";

import { appFontWeight } from "assets/jss/material-dashboard-pro-react";
import { PageHeader } from "../HelperComponent/PageTitle";
import { currentDate } from "../HelperComponent/utils";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ItemViewCard from "../HelperComponent/ItemViewCard";
import PageTitle from "../HelperComponent/PageTitle";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: appSecondColor,
    padding: "6px 10px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
  },
  body: {
    color: appSecondColor,
    padding: "6px 10px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
  },
  customSelect: {
    marginBottom: 15
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
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "25px",
    },
  },
  salesExcutive: {
    width: "20px",
  },

  searchBar: {
    padding: "10px",
  },
  searchbtnRight: {
    marginBottom: -20,
    float: "right",
    display: "flex",
    alignItems: "center",
  },
  activeText: {
    fontSize: "15px",
    color: appSecondColor,
    fontWeight: 400,
  },
  tableLabel: {
    fontWeight: 500,
    color: appSecondColor,
  },
  debit: { width: "5%" },
  receipt: { width: "40%" },
  payment: { width: "40%" },
  credit: { width: "5%" },
  blank: { width: "10%" },
  repParticuler: { width: "20%" },
  paParticuler: { width: "20%" },
  repdate: { width: "8%" },
  padate: { width: "8%" },
}));

const rowData = [
  {
    reptDate: "05-08-2021",
    paDate: "05-08-2021",
    particuler: "Ledger1",
    amount: "10,000",
  },
  {
    reptDate: "05-08-2021",
    paDate: "05-08-2021",
    particuler: "Ledger1",
    amount: "10,000",
  },
  {
    reptDate: "05-08-2021",
    paDate: "05-08-2021",
    particuler: "Ledger1",
    amount: "10,000",
  },
];

const BankBook = () => {
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allUnits, setAllUnits] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
    category: "",
    brand: "",
    item: "",
  });
  const [ledgerAccount, setAllLedgerAccount] = React.useState([]);

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
    fetchData()
      setAllUnits(wishListData);
  }, []);

  const fetchData = () => {
    getAllLedgerAccount(
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
  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <PageHeader title="MIS Report > Bank Book" />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Bank Book" filterIcon>
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="center" alignItems="center">
                <GridItem xs="5">
                  <InputLabel id="label">Bank Book</InputLabel>
                  <ReactSelect
                     options={ledgerAccount}
                     getOptionLabel={(option) => option.label}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    className={classes.customSelect}
                    styles={reactSelectStyles}
              
                    // onChange={(v) => onSelect("ddl_brand_id", v)}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
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
                    style={{ marginBottom: -20 }}
                    defaultValue={currentDate()}
                    // onChange={(v) => console.log(v.target.value)}
                    // className={classes.dateField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs="2">
                  {/* <InputLabel id="label">Date</InputLabel> */}
                  <TextField
                    size="small"
                    id="date"
                    variant="outlined"
                    type="date"
                    style={{ marginBottom: -15 }}
                    defaultValue={currentDate()}
                    fullWidth={true}
                    // value={startDate}
                    // onChange={(v) => console.log(v.target.value)}
                    className={classes.dateField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>

                <GridItem xs="3">
                  <div className={classes.searchbtnRight}>
                    <CustomButton style={{ marginRight: "10px" }}>
                      <SearchIcon />
                    </CustomButton>
                    <CustomButton>
                      <RotateLeftIcon />
                    </CustomButton>
                  </div>
                </GridItem>
              </GridContainer>
            </Paper>
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Bank Book">
            <Box p={1} pb={1} borderBottom="1px solid rgba(224, 224, 224, 1)">
              <Grid container justify="center" alignItems="center">
                <Grid item xs={2}>
                  <Box className={classes.tableLabel}>Debit</Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    className={classes.tableLabel}
                    mr={10}
                    textAlign="center"
                  >
                    Receipt
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box className={classes.tableLabel} ml={10} textAlign="right">
                    Payment
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box className={classes.tableLabel} textAlign="right">
                    Credit
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Date</StyledTableCell>
                    <StyledTableCell align="left">Particulers</StyledTableCell>
                    <StyledTableCell align="right">Amount</StyledTableCell>
                    <StyledTableCell align="left">Date</StyledTableCell>
                    <StyledTableCell align="left">Particulers</StyledTableCell>
                    <StyledTableCell align="right">Amount</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData.map((row, key) => (
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.repdate}
                      >
                        {row.reptDate}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.repParticuler}
                      >
                        {row.particuler}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.pamentAmount}
                      >
                        {row.amount}
                      </StyledTableCell>

                      <StyledTableCell align="left" className={classes.padate}>
                        {row.reptDate}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.paParticuler}
                      >
                        {row.particuler}
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.amount}>
                        {row.amount}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box py={1}>
              <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                  <Box className={classes.tableLabel} mr={4} textAlign="right">
                    Total
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box className={classes.tableLabel} mr={1} textAlign="right">
                    00000
                  </Box>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={3}>
                  <Box className={classes.tableLabel} textAlign="center">
                    Total
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <Box className={classes.tableLabel} mr={1} textAlign="right">
                    00000
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CustomCard>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default BankBook;
