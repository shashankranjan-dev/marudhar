import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { makeStyles } from "@material-ui/core/styles";
import { CustomCard } from "../../../Components/CustomCard";
import { getAllStockTransfer } from "../../../../services/saleService/updateStockTransferService";
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
import { activeText } from "assets/jss/material-dashboard-pro-react";

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

import { Typography, Grid, Box } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: appSecondColor,
    padding: "5px 5px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "10px 5px",
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

  //  STOCK TRANSFER LIST - stk
  serial_id: { width: "2%" },
  stk_transfer_date: { width: "10%" },
  stk_transfer_no: { width: "20%" },
  stk_transfer_from: { width: "20%" },
  stk_transfer_to: { width: "20%" },
  stk_note: { width: "20%" },
  stk_action: { width: "8%" },

  id: { width: "0%" },

  rate: { width: "8%" },
  value: { width: "15%" },
  itemImg: { width: "8%" },
  itemDetails: { width: "65%" },
  quantity: { width: "30%" },
}));

const StockTransferView = () => {
  const classes = useStyles();
  const history = useHistory();
  const [globalState, dispatch] = useStateValue();
  const location = useLocation();
  const [refresh, setRefresh] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState({});

  React.useEffect(() => {
    if (location.state?.row) {
      getAllStockTransfer(
        (r) => {
          setAddedItems(r[0]);
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        },
        location.state?.row.stk_stock_transfer_id
      );
    }
  }, [refresh]);

  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="Sales > Stock Transfer > View" />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Stock Transfer Details">
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.stk_transfer_date}
                    >
                      Date
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.stk_transfer_no}
                    >
                      Stock Transfer No
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.stk_transfer_from}
                    >
                      From
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.stk_transfer_to}
                    >
                      To
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.stk_note}>
                      Note
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell
                      align="left"
                      className={classes.stk_transfer_date}
                    >
                      {addedItems.stk_transfer_date}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.stk_transfer_no}
                    >
                      {addedItems.stk_transfer_no}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.stk_transfer_from}
                    >
                      {addedItems.stk_transfer_from}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.stk_transfer_to}
                    >
                      {addedItems.stk_transfer_to}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.stk_note}>
                      {addedItems.stk_note}
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
                    <StyledTableCell align="right">Qty</StyledTableCell>
                    <StyledTableCell align="left">Unit</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addedItems?.stock_transfer_details &&
                    addedItems.stock_transfer_details.map((row, i) => (
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
                          align="right"
                          className={classes.quantity}
                        >
                          {row.quantity}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
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

export default StockTransferView;
