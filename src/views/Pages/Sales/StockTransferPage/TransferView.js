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
import { StyledTableCell, StyledTableRow } from "../../Sales/AddEnquiryPage";


import { Typography, Grid, Box } from "@material-ui/core";
import { currencyFormate, currentDate } from "../../HelperComponent/utils";

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
}));

const TransferView = ({
    title,
    viewData,
    inWarehouse,
    addedItems,
    itemDetails,
    allStatus,
    otherCharges
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
    return (
        <ThemeProvider theme={theme}>
            <GridContainer>
                <GridItem xs="12">
                    <CustomCard cdTitle={title}>


                        <TableContainer>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">{viewData[0]?.label}</StyledTableCell>
                                        <StyledTableCell align="center">{viewData[1]?.label}</StyledTableCell>
                                        <StyledTableCell align="center">{viewData[2]?.label}</StyledTableCell>
                                        <StyledTableCell align="center">{viewData[3]?.label}</StyledTableCell>
                                        <StyledTableCell align="center">{viewData[4]?.label}</StyledTableCell>
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow>
                                        <StyledTableCell align="center" className={classes.endate}>
                                           
                                            {
                                            
                                                            title === "Stock Transfer " ?
                                                            addedItems.stk_transfer_date
                                                            :''
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell align="center" className={classes.engNo}>
                                            {
                                                
                                                            title === "Stock Transfer " ?
                                                            addedItems.stk_transfer_no
                                                            :''
                                                            
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className={classes.enCustomerName}
                                        >
                                            {
                                                
                                                            title === "Stock Transfer " ?
                                                            addedItems?.stk_transfer_from
                                                            :''
                                          
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            className={classes.enqCustomer}
                                        >
                                            {
                                                            title === "Stock Transfer " ?
                                                            addedItems?.stk_transfer_to  
                                                            :''                
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell align="center" className={classes.enqEmail}>
                                            {
                                                
                                                            title === "Stock Transfer " ?
                                                            addedItems?.stk_note
                                                            :''
                                                            
                                            }
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
                                        <StyledTableCell align="left">Qty</StyledTableCell>
                                        <StyledTableCell align="left">Unit</StyledTableCell>
                            
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {itemDetails &&
                                        itemDetails.map((row, i) => (
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
                                                    align="left"
                                                    className={classes.itemDetails}
                                                >
                                                    <ItemViewCard item_id={row.item_id} />
                                                </StyledTableCell>

                                                <StyledTableCell
                                                    align="left"
                                                    className={classes.quantity}
                                                >
                                                    {row.quantity}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align="left"
                                                    className={classes.quantity}
                                                >
                                                    {row.uom_name}
                                                </StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                    </CustomCard>
                </GridItem>

            </GridContainer>
        </ThemeProvider>
    );
};

export default TransferView;
