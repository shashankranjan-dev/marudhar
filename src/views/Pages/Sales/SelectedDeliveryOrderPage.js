import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable, { ActiveIcon, DeActiveIcon } from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import { getListStatus } from "../../../services/addStatusService";
import { getAllDeliveryOrder,getAllDeliveryOrderOnLoad } from "../../../services/createDeliveryOrderService";

import FormComponent from "../HelperComponent/FormComponent";
import UpdateTaskAndStatus from "../HelperComponent/UpdateTaskAndStatus";

import { getDeliveryOrderBySalesIdDON } from "../../../services/createDeliveryOrderService";

import { Input, Paper, Box, Grid } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";

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
import ItemViewCard from "../HelperComponent/ItemViewCard";
import PageTitle from "../HelperComponent/PageTitle";
import { currencyFormate } from "../HelperComponent/utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import ItemImg from "../HelperComponent/ItemImg";
import { StyledTableCell, StyledTableRow } from "./AddEnquiryPage";

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  tableLabel: {
    fontWeight: 500,
    color: appSecondColor,
  },
  itemImgPaper: {
    width: "80px",
    height: "80px",
    overflow: "hidden",
  },

  actionbtns: {
    marginLeft: 15,
    marginTop: 20,
    float: "right",
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
    width: "40%",
  },
  mrp: {
    width: "10%",
  },
  quantity: {
    width: "15%",
  },
  uom: {
    width: "8%",
  },
  dldate: {
    width: "15%",
  },
  dlNo: {
    width: "15%",
  },
  slNo: {
    width: "15%",
  },
  qNo: {
    width: "15%",
  },
  rate: {
    width: "5%",
  },
  disc_percentage: {
    width: "5%",
  },
  disc_value: {
    width: "10%",
  },
  net_value: {
    width: "15%",
  },
  cus: {
    width: "10%",
  },
  noDispatchOrder: {
    color: "red", 
    textAlign: "center",
    margin: "10px"
  },
}));

const SelectedDeliveryOrderPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [deliveryDetails, setDeliveryDetails] = React.useState({});

  const [loading, setLoading] = React.useState(false);
  const [allItems, setAllItems] = React.useState({});
  const [allStatus, setAllStatus] = React.useState([]);

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
    setLoading(true);
    // console.log("ahir", location.state);
    getDeliveryOrderBySalesIdDON(
      location.state?.row.sales_id,
      location.state?.row.DelNo,
      (items) => {
        // console.log(items,"8988")
        setLoading(false);
        setAllItems(items);
      },
      (err) => {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    getAllDeliveryOrder(
      (row) => {
        // setVendorDetail(row[0]);
        // setVendorAddres(row[0].allAddress[0]);
        setDeliveryDetails(row);
        
      },
      (err) => {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      //row.customer_id
      { txt_delivery_order_no: location.state?.row.DelNo }
    );

  }, [refresh]);

  const onClickProcedeCreateInvoice = () => {
    history.push({
      pathname: "/admin/sales/invoice/create",
      state: {
        row: { sales_id: location.state?.row.sales_id },
      },
    });
  };

  const onClickClose = (e) => {
    history.push({
      pathname: "/admin/sale/delivery-order",
    });
  }

  return (
    <ThemeProvider theme={theme}>
      {location.state?.updateTask ? (
        <PageTitle title="Sales > Delivery Order > Update To Do" />
      ) : (
        <PageTitle title="Sales > Delivery Order > View" />
      )}
      {/* {console.log("alta", allItems)} */}
      <GridContainer>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard cdTitle="Delivery Order">
              <TableContainer>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">
                        Delivery Order Date
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Delivery Order No
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Sales Order No
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Quotation No
                      </StyledTableCell>
                      <StyledTableCell align="left">Enquiry No</StyledTableCell>
                      <StyledTableCell align="left">Customer</StyledTableCell>
                      <StyledTableCell align="right">Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.dldate}
                      >
                        { allItems.DelDate }
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.dldate}>
                        {allItems.DelNo}
                      </StyledTableCell>

                      <StyledTableCell align="left" className={classes.dlNo}>
                        {allItems.sales_order_no}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.slNo}>
                        {allItems.qutNo}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.qNo}>
                        {allItems.enqNo}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.cus}>
                        { allItems.enqCustomer}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.enqStatus}
                      >
                        {/* { console.log("yt", Number(allItems.DelStatus)) } */}
                        <div
                          style={{
                            color: allStatus.find(
                              (s, i) =>
                                s.value === Number(allItems.DelStatus)
                            )?.status_color,
                          }}
                        >
                          {
                            allStatus.find(
                              (s, i) =>
                                s.value === Number(allItems.DelStatus)
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
                      <StyledTableCell align="left">
                        Qty (Showroom breakup)
                      </StyledTableCell>
                      <StyledTableCell align="center">Unit</StyledTableCell>
                      {/* <StyledTableCell align="right">Rate</StyledTableCell>
                      <StyledTableCell align="right">Disc%</StyledTableCell>
                      <StyledTableCell align="right">
                        Disc Value
                      </StyledTableCell>
                      <StyledTableCell align="right">GST%</StyledTableCell>
                      <StyledTableCell align="right">Gst Value</StyledTableCell>

                      <StyledTableCell align="right">Net Value</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allItems?.delivery_order_item_details &&
                      allItems.delivery_order_item_details?.map((row, i) => (
                       
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
                            <Table className={classes.table} aria-label="customized table">
                              <TableBody>
                                { deliveryDetails?.enqShowroom && deliveryDetails?.enqShowroom[i].map(det => {
                                  return (
                                    <StyledTableRow style={{borderBottom: "None"}}>
                                      <StyledTableCell style={{borderBottom: "None"}}>
                                        {det.showroom_name}
                                      </StyledTableCell>

                                      <StyledTableCell style={{borderBottom: "None"}}>
                                        {det.quantity}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  )
                                  })}
                              </TableBody>
                              </Table>
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className={classes.uom}
                          >
                            {row.uom_name}
                          </StyledTableCell>
                          {/* <StyledTableCell
                            align="right"
                            className={classes.rate}
                          >
                            {currencyFormate(row.rate)}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.disc_percentage}
                          >
                            {(Number(row.disc_percentage)).toFixed(2)}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.disc_value}
                          >
                            {currencyFormate(row.disc_value)}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.disc_value}
                          >
                            {currencyFormate(row.gst_percentage)}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.disc_value}
                          >
                            {currencyFormate(row.gst_value)}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.net_value}
                          >
                            {currencyFormate( row.delivered_qty * row.rate)}
                          </StyledTableCell> */}
                        </StyledTableRow>
             
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              <Box pt={2}>
                <Grid container>
                  <Grid item xs={7}>
                    <Box className={classes.tableLabel} ml={9} textAlign="left">
                      Total of the original DO
                    </Box>
                  </Grid>

                  <Grid item xs={5}>
                    <Box
                      className={classes.tableLabel}
                      mr={1}
                      textAlign="right"
                    >
                      {allItems.delivery_order_item_details
                        ? currencyFormate(
                            allItems.delivery_order_item_details.reduce(
                              (sum, li) => Number(sum) + (li.delivered_qty * li.rate),
                              0
                            )
                          )
                        : "00"}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              
            </CustomCard>
          )}
        </GridItem>

        {/* <UpdateTaskAndStatus
          setRefresh={setRefresh}
          refresh={refresh}
           module="delivery_order"
           location={location}
          // status_id={allItems.delivery_status}
          // procedeTo="Create Invoice"
          // onProcedeToNext={onClickProcedeCreateInvoice}
        /> */}
         <GridItem xs={12}>
          <div className={classes.actionbtns}>
            <Button
              onClick={onClickClose}
              className={classes.actionbtn}
              variant="outlined"
              color="danger"
            >
              Close
            </Button>
          </div>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default SelectedDeliveryOrderPage;
