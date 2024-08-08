import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable, { ActiveIcon, DeActiveIcon } from "../../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../../Components/MasterModel";
import { CustomCard } from "../../../Components/CustomCard";
import { getListStatus } from "../../../../services/addStatusService";
import { getEnquiryBySalesId } from "../../../../services/saleService/addEnqueryService";

import { Input, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";

import theme from "../../../../theme/theme";

import React from "react";

import {
    appFontWeightThin,
    appDefaultColor,
    appSecondColor,
    appDefaultFamily,
    appFontWeight,
    tblBodyHoverColor,
    appScrollBar,
} from "assets/jss/material-dashboard-pro-react";
import { useHistory, useLocation } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";
import alertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ItemViewCard from "../../HelperComponent/ItemViewCard";
import PageTitle from "../../HelperComponent/PageTitle";
import ItemImg from "../../HelperComponent/ItemImg";
import { useStateValue } from "../../../../context/context";
import { actionTypes } from "../../../../context/reducer";
import FormComponent from "../../HelperComponent/FormComponent";
import UpdateTaskAndStatus from "../../HelperComponent/UpdateTaskAndStatus";
import { StyledTableCell, StyledTableRow } from "../AddEnquiryPage";

import { Typography, Grid, Box } from "@material-ui/core";
import { currencyFormate, currentDate, dateFormate } from "../../HelperComponent/utils";

const useStyles = makeStyles((theme) => ({
    root: {
        switchBtn: {
            width: 180,
            height: "100%",
        },
    },

    container: {
        ...appScrollBar,
        maxHeight: 360,
    },

    actionbtns: {
        marginLeft: 15,
        marginTop: 20,
        float: "right",
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

    id: {
        width: "0%",
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
        width: "35%",
    },
    quantity: {
        width: "5%",
    },
    rate: {
        width: "8%",
    },
    viewvalue1: {
        width: "9%",
    },
}));

const SalesReturnListView = ({
    title,
    title1,
    billData,
    viewData,
    addedItems,
    itemDetails,

    invoiceDetails,
    showroomDetails,
    invoiceItemDetails,
    allShowroomWarehouse,
    allStatus,
    otherCharges,
}) => {
    const classes = useStyles();
    const history = useHistory();
    const [globalState, dispatch] = useStateValue();
    const location = useLocation();
    //   const [allStatus, setAllStatus] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false);
    // const [addedItems1, setAddedItems1] = React.useState(addedItems);
    let db_total = 0;
    let other_charges = 0;

    // console.log(itemDetails,"sen2507/i")
    // console.log(invoiceItemDetails,"sen2507/i")


    return (
        <ThemeProvider theme={theme}>

            <GridContainer>
                <GridItem xs="12">
                    <CustomCard cdTitle={title1}>
                        <TableContainer>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        {/* <StyledTableCell align="center">
                                            {billData[0].label}
                                        </StyledTableCell> */}
                                        <StyledTableCell align="center">
                                            {billData[1].label}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {billData[2].label}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {billData[3].label}

                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {billData[4].label}

                                        </StyledTableCell>
                                    </TableRow>

                                </TableHead>

                                <TableBody>
                                    {/* {itemDetails
                                        .map((row, i) => ( */}
                                    <StyledTableRow>
                                        {/* <StyledTableCell></StyledTableCell> */}
                                        <StyledTableCell align="center" className={classes.endate}>
                                            {/* {console.log("sankh2309", (itemDetails))}
                                            {dateFormate(itemDetails.sales.invoice_details[0]?.invoice_date)} */}
                                            {dateFormate(itemDetails?.sales?.invoice_details[0]?.invoice_date)}
                                        </StyledTableCell>
                                        <StyledTableCell align="center" className={classes.engNo}>
                                            {itemDetails?.invoice_no}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className={classes.enCustomerName}
                                        >
                                            {/* {itemDetails.sales.invoice_item_details[0]?.now_dispatch_qty} */}
                                            {itemDetails?.sales?.invoice_item_details[0].net_value}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className={classes.enqCustomer}
                                        >
                                            {itemDetails.salesRetCustomer}

                                        </StyledTableCell>
                                        {/* <StyledTableCell
                                            align="center"
                                            className={classes.enqEmail}
                                        >
                                            
                                        </StyledTableCell> */}

                                    </StyledTableRow>
                                    {/* ))} */}

                                </TableBody>

                            </Table>
                        </TableContainer>
                    </CustomCard>
                </GridItem>
            </GridContainer>


            <GridContainer>
                <GridItem xs="12">
                    <CustomCard cdTitle={title}>
                        <TableContainer>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">
                                            {viewData[1].label}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {viewData[2].label}
                                        </StyledTableCell>
                                        {/* <StyledTableCell align="center">
                                            {viewData[3].label}
                                        </StyledTableCell> */}
                                        {/* <StyledTableCell align="center">
                                            {viewData[4].label}

                                        </StyledTableCell> */}
                                        <StyledTableCell align="center">
                                            {viewData[5].label}

                                        </StyledTableCell>
                                    </TableRow>

                                </TableHead>

                                <TableBody>
                                    <StyledTableRow>
                                        <StyledTableCell align="center" className={classes.endate}>
                                            {/* {console.log("sen2107", itemDetails)} */}
                                            {itemDetails.salesRetNo}
                                        </StyledTableCell>
                                        <StyledTableCell align="center" className={classes.engNo}>
                                            {itemDetails.salesRetDate}
                                        </StyledTableCell>
                                        {/* <StyledTableCell
                                            align="center"
                                            className={classes.enCustomerName}
                                        >
                                            {addedItems[0]?.invoice_no}
                                        </StyledTableCell> */}
                                        {/* <StyledTableCell
                                            align="center"
                                            className={classes.enqCustomer}
                                        >
                                            {addedItems[0]?.salesRetCustomer}

                                        </StyledTableCell> */}
                                        <StyledTableCell
                                            align="center"
                                            className={classes.enqEmail}
                                        >
                                            {/* {itemDetails.showroom_warehouse_id} */}

                                            { allShowroomWarehouse.find(
                                                           (s, i) => s.value === Number(invoiceDetails[0]?.showroom_warehouse_id)
                                                            )?.label}
                                        </StyledTableCell>

                                    </StyledTableRow>
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </CustomCard>
                </GridItem>
            </GridContainer>





            <GridContainer className={classes.root}>
                <GridItem xs="12">
                    <CustomCard cdTitle="Item Details" maxHeight={380}>
                        <TableContainer className={classes.container}>
                            <Table
                                className={classes.table}
                                stickyHeader
                                aria-label="sticky table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="left">#</StyledTableCell>
                                        <StyledTableCell align="left">Image</StyledTableCell>
                                        <StyledTableCell align="left">Item Details</StyledTableCell>
                                        <StyledTableCell align="right">Invoice Qty</StyledTableCell>
                                        <StyledTableCell align="right">Now Returning</StyledTableCell>
                                        <StyledTableCell align="right">
                                            Rate
                                        </StyledTableCell>


                                        <StyledTableCell align="right">
                                            Value
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

{/* {console.log(invoiceDetails,"sank22525")} */}
                                    {invoiceDetails && invoiceItemDetails.map((row, i) => (
                                        <StyledTableRow key={i}>

                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                                align="left"
                                                className={classes.id}
                                            >
                                                {i + 1}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="left"
                                                className={classes.itemImg}
                                            >
                                                <Paper className={classes.itemImgPaper}>
                                                    <ItemImg item_id={row.item_id} />
                                                </Paper>
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="right"
                                                className={classes.itemDetails}
                                            >
                                                <ItemViewCard item_id={row.item_id} />
                                            </StyledTableCell>

                                            <StyledTableCell
                                                align="right"
                                                className={classes.quantity}
                                            >
                                                {invoiceDetails[0].now_dispatch_qty}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="right"
                                                className={classes.quantity}
                                            >
                                                {row.return_qty}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" className={classes.rate}>
                                                {row.rate}


                                            </StyledTableCell>


                                            <StyledTableCell
                                                align="right"
                                                className={classes.viewvalue1}
                                            >
                                                {row.net_value}


                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}


                                </TableBody>
                            </Table>
                        </TableContainer>


                        {/* Total  */}
                                            
                        <Box pt={2}>
                            <Grid container>
                            <Grid item xs={7}>
                                <Box className={classes.tableLabel} ml={9} textAlign="left">
                                Total
                                </Box>
                            </Grid>

                            <Grid item xs={5}>
                                <Box
                                className={classes.tableLabel}
                                mr={1}
                                textAlign="right"
                                >
                                {invoiceDetails && invoiceItemDetails
                                    ? currencyFormate(
                                        invoiceItemDetails.reduce(
                                        (sum, li) =>
                                            (db_total =
                                            Number(sum) + parseFloat(li.net_value)),
                                        0
                                        )
                                    )
                                    : "00"}
                                </Box>
                            </Grid>
                            </Grid>
                        </Box>
      
                        <div>
                            <Box pt={2}>
                            <Grid container>
                                <Grid item xs={7}>
                                <Box
                                    className={classes.tableLabel}
                                    ml={9}
                                    textAlign="left"
                                >
                                    Other Charges
                                </Box>
                                </Grid>

                                <Grid item xs={5}>
                                <Box
                                    className={classes.tableLabel}
                                    mr={1}
                                    textAlign="right"
                                >
                                    {/* {console.log(addedItems, "chk")} */}
                                    {currencyFormate(
                                    (other_charges = otherCharges
                                        ? otherCharges
                                            .reduce(
                                            (sum, li) =>
                                                li.charge_type === "+"
                                                ? Number(sum) + Number(li.charge_amount)
                                                : Number(sum) - Number(li.charge_amount),
                                            0
                                            )
                                            .toFixed(2)
                                        : "00")
                                    )}
                                </Box>
                                </Grid>
                            </Grid>
                            </Box>
                        </div>

                       {/* other_charges */}
                        {otherCharges && otherCharges.length>0 ?
                            <>
                                <div
                                    style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    }}
                                >
                                    <TableContainer
                                    style={{
                                        alignSelf: "left",
                                        justifyContent: "left",
                                        alignItems: "left",
                                        width: "30%",
                                    }}
                                    >
                                    <Table
                                        aria-label="customized table"
                                        style={{
                                        borderWidth: "1px",
                                        borderColor: "#aaaaaa",
                                        borderStyle: "solid",
                                        alignItems: "center",
                                        }}
                                    >
                                        {otherCharges.map((item, index) => {
                                        return (
                                            <TableRow>
                                            <StyledTableCell align="left">
                                                {item.charges}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {item.charge_type}
                                            </StyledTableCell>

                                            <StyledTableCell align="right">
                                                {item.charge_amount}
                                            </StyledTableCell>
                                            </TableRow>
                                        );
                                        })}
                                    </Table>
                                    </TableContainer>
                                </div>
                            </> : ''
                        }
         

                        {/* Grand Total */}
                    
                        <Box pt={2}>
                            <Grid container>
                            <Grid item xs={7}>
                                <Box className={classes.tableLabel} ml={9} textAlign="left">
                                Grand Total
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <Box
                                className={classes.tableLabel}
                                mr={1}
                                textAlign="right"
                                >
                                {/* {console.log(Number(db_total), "otherchrg")} */}
                                {currencyFormate(
                                    parseFloat(db_total) + parseFloat(other_charges)
                                )}
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

export default SalesReturnListView;
