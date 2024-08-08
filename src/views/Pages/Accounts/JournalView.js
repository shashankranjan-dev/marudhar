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
    tblBodyHoverColor,
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
import {
    getListLedgerAccount,
} from "../../../services/LedgerAccountService";
import set from "date-fns/set";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#fff",
        color: appSecondColor,
        fontWeight: appFontWeight,
        fontFamily: appDefaultFamily,
        fontSize: "14px",
    },
    body: {
        color: appSecondColor,
        padding: "18px 10px",
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
    root: {
        switchBtn: {
            width: 180,
            height: "100%",
        },
    },
    searchItemsCards: {
        marginTop: 10,
        marginBottom: 20,
    },
    itemImgPaper: {
        width: "80px",
        height: "80px",
        overflow: "hidden",
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

}));

const journalView = ({ row, journalDetails, DrTotal, CrTotal }) => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <GridContainer>
                <GridItem xs="12">
                    <CustomCard
                        cdTitle="Journal View"
                        width="100%"
                        height="100%"
                        style={{ marginTop: 0 }}
                    >

                        <TableContainer>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>

                                        <StyledTableCell align="center">Voucher No</StyledTableCell>
                                        <StyledTableCell align="center">Date</StyledTableCell>
                                        <StyledTableCell align="center">Narration</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow>
                                        <StyledTableCell align="center">
                                            {row.ledVoucherNo}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.ledDate}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.ledNarration}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CustomCard>
                </GridItem>
            </GridContainer>
            <GridContainer className={classes.root}>
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

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {journalDetails && journalDetails.map((row, i) => (

                                        <StyledTableRow >
                                            <StyledTableCell align="center" className={classes.id}>
                                                {row.length != 0 ? i + 1 : ""}
                                            </StyledTableCell>

                                            <StyledTableCell align="left" className={classes.ledger}>
                                                {row.ddl_ledger}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" className={classes.debit}>
                                                {row.dr_cr === 1 ? currencyFormate(Math.abs(row.amount))
                                                    : null
                                                }
                                            </StyledTableCell>

                                            <StyledTableCell align="right" className={classes.credit}>
                                                {row.dr_cr === 2
                                                    ? currencyFormate(Math.abs(row.amount))
                                                    : null
                                                }
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


            </GridContainer>

        </ThemeProvider>
    )
}

export default journalView