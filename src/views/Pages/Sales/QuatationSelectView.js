import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable, { ActiveIcon, DeActiveIcon } from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";

import { getQuotationBySalesId } from "../../../services/quatationService";
import { getListStatus } from "../../../services/addStatusService";

import { Input, Paper, Grid, Box } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
// import DeleteIcon from "@mui/icons-material/Delete";
import theme from "../../../theme/theme";

import React from "react";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
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
import PageTitle from "../HelperComponent/PageTitle";
import ItemViewCard from "../HelperComponent/ItemViewCard";
import ItemImg from "../HelperComponent/ItemImg";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import { currencyFormate } from "../HelperComponent/utils";
import FormComponent from "../HelperComponent/FormComponent";
import UpdateTaskAndStatus from "../HelperComponent/UpdateTaskAndStatus";

import { Typography } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "./AddEnquiryPage";
// import { IconButton, OutlinedInput } from "@material-ui/core";
// import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
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

  actionbtns: {
    marginLeft: 15,
    marginTop: 20,
    float: "right",
  },
  tableLabel: {
    fontWeight: 500,
    color: appSecondColor,
  },
  id: {
    width: "0%",
  },

  action: {
    width: "5%",
  },
  rate: {
    width: "5%",
  },
  value: {
    width: "15%",
  },
  itemImg: {
    width: "8%",
  },
  itemDetails: {
    width: "50%",
  },
  disc: {
    width: "5%",
  },
  disc_value: {
    width: "8%",
  },
  net_value: {
    width: "10%",
  },
  mrp: {
    width: "10%",
  },
  quantity: {
    width: "5%",
  },
}));

const QuotationView = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [allStatus, setAllStatus] = React.useState([]);
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  
  let db_total = 0;
  let other_charges = 0;
  let db=0;

  React.useEffect(() => {
    getListStatus(
      "Sales",
      (r) => {
        setAllStatus(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    if (location.state?.row) {
      setLoading(true);
      getQuotationBySalesId(
        location.state?.row.sales_id,
        (r) => {
          setAddedItems(r);
          setOtherCharges(r.quotation_other_charges);
          setLoading(false);
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
          setLoading(false);
        }
      );
    }
  }, [refresh]);

  // const onClickProcedeSalesOrder = () => {
  //   history.push({
  //     pathname: "/admin/sales/create-delivery-order",
  //     state: {
  //       row: { sales_id: location.state?.row.sales_id },
  //     },
  //   });
  // };

  return (
    <ThemeProvider theme={theme}>
      {location.state?.updateTask ? (
        <PageTitle title="Sales > Quotation > Update" />
      ) : (
        <PageTitle title="Sales > Quotation > View" />
      )}

      <GridContainer>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard cdTitle="Quotation">
              <TableContainer>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell align="left">
                        Quotation Date
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Quotation No
                      </StyledTableCell>
                      <StyledTableCell align="left">Enquiry No</StyledTableCell>
                      <StyledTableCell align="left">Customer</StyledTableCell>
                      <StyledTableCell align="left">
                        Sales Executive
                      </StyledTableCell>
                      {/* <StyledTableCell align="left">Source</StyledTableCell> */}
                      <StyledTableCell align="center">Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.id}
                      >
                        1
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.endate}>
                        {addedItems.qutDate}
                      </StyledTableCell>

                      <StyledTableCell
                        align="left"
                        className={classes.enCustomerName}
                      >
                        {addedItems.qutNo}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.enCustomerName}
                      >
                        {addedItems.enqNo}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.enCustomerName}
                      >
                        {addedItems.enqCustomer}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.enqCustomerName}
                      >
                        {addedItems.enqSalesExecutive}
                      </StyledTableCell>
                      {/* <StyledTableCell
                        align="left"
                        className={classes.enqEmail}
                      >
                        {addedItems.enqSource}
                      </StyledTableCell> */}
                      <StyledTableCell
                        align="center"
                        className={classes.enqStatus}
                      >
                        <div
                          style={{
                            color: allStatus.find(
                              (s, i) => s.value === Number(addedItems.status)
                            )?.status_color,
                          }}
                        >
                          {
                            allStatus.find(
                              (s, i) => s.value === parseFloat(addedItems.status)
                            )?.label
                          }
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CustomCard>
          )}
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard cdTitle="Item Details" maxHeight={400}>
              <TableContainer>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell align="left">Image</StyledTableCell>
                      <StyledTableCell align="left">
                        Item Details
                      </StyledTableCell>
                      <StyledTableCell align="right">Qty</StyledTableCell>
                      <StyledTableCell align="left">Unit</StyledTableCell>
                      <StyledTableCell align="right">Rate</StyledTableCell>
                      <StyledTableCell align="right">Disc%</StyledTableCell>
                      <StyledTableCell align="right">
                        Disc Value
                      </StyledTableCell>
                      <StyledTableCell align="left">Gst Percent</StyledTableCell>
                      
                      <StyledTableCell align="right">Gst Value</StyledTableCell>
                      <StyledTableCell align="right">Net Value</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {/* {console.log(addedItems,"abishek")} */}
                    {addedItems?.quotation_item_details &&
                      addedItems.quotation_item_details.map((row, i) => (
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
                            align="left"
                            className={classes.quantity}
                          >
                            {row.uom_name}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.rate}
                          >
                            {row.mrp ? currencyFormate(row?.mrp) : currencyFormate(row?.rate)}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.disc}
                          >
                           {(row.disc_percentage ? Number(row.disc_percentage) : 0).toFixed(2)}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.disc_value}
                          >
                            {currencyFormate(row.disc_value)}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.disc_percentage}
                          >
                            {row.gst_percentage}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.gst_value}
                          >
                            {currencyFormate(row.gst_value)}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.net_value}
                          >
                            {currencyFormate(row.net_value)}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
                      {
                      
                        (addedItems.quotation_item_details
                          ? currencyFormate(
                              addedItems.quotation_item_details.reduce(
                                (sum, li) => db_total= Number(sum) + parseFloat(li.net_value),
                                0
                  
                              )
                            )
                          : "00")
                      }
                    </Box>
                  </Grid>
                </Grid>
              </Box>
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
                          {
                           currencyFormate( (other_charges = addedItems.quotation_other_charges
                              ? addedItems.quotation_other_charges
                                  .reduce(
                                    (sum, li) =>
                                    li.charge_type === "+"?
                                    Number(sum) + Number(li.charge_amount)
                                    : Number(sum) - Number(li.charge_amount),
                                    0
                                  )
                                  .toFixed(2)
                              : "00"))
                          }
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>



<TableContainer style={{ alignSelf: 'left', justifyContent: 'left', alignItems: 'left', width: '30%' }}>
  <Table aria-label="customized table"
    style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid', 'alignItems': 'center' }}>
    {
      otherCharges.map((item, index) => {

        return <TableRow>
          <StyledTableCell align="left">{item.charges}</StyledTableCell>
          <StyledTableCell align="center">{item.charge_type}</StyledTableCell>

          <StyledTableCell align="right">{item.charge_amount}</StyledTableCell>
        </TableRow>

      })
    }

  </Table>
</TableContainer>
</div>

                  {/* Grand Total */}
                  <Box pt={2}>
                    <Grid container>
                      <Grid item xs={7}>
                        <Box
                          className={classes.tableLabel}
                          ml={9}
                          textAlign="left"
                        >
                          Grand Total
                        </Box>
                      </Grid>

                      <Grid item xs={5}>
                        <Box
                          className={classes.tableLabel}
                          mr={1}
                          textAlign="right"
                        >
                        {/* {console.log(Number(db_total),"otherchrg")} */}
                        {currencyFormate(parseFloat(db_total) + parseFloat(other_charges))}
                          {/* {console.log(parseFloat(other_charges),"db_total")}
                          {currencyFormate(parseFloat(db_total) + parseFloat(other_charges))} */}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
            </CustomCard>
          )}
        </GridItem>

        <UpdateTaskAndStatus
        statusFor="Sales-Quotation"
          customer_name= {location.state.row ? location.state?.row.enqCustomer : ''}
          setRefresh={setRefresh}
          refresh={refresh}
          module="Quotation"
          status_id={addedItems.status}
          location={location}
          procedeTo="Sales Order"
        />
      </GridContainer>
    </ThemeProvider>
  );
};
export default QuotationView;
