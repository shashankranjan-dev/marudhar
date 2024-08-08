import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable, {
  ActiveIcon,
  DeActiveIcon,
} from "../../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../../Components/MasterModel";
import { CustomCard } from "../../../Components/CustomCard";
import { getListStatus } from "../../../../services/addStatusService";
import { getDeliveryOrderBySalesIdDpON,getContractorById } from "../../../../services/dispatchOrderListService";

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

import { Typography, Grid, Box } from "@material-ui/core";
import { currentDate, currencyFormate } from "../../HelperComponent/utils";
import { StyledTableCell, StyledTableRow } from "../AddEnquiryPage";

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
  rate: { width: "8%" },
  itemImg: { width: "8%" },
  itemDetails: { width: "50%" },
  quantity: { width: "8%" },
  now_dispatch_qty: { width: "10%" },
  dispatched_qty: { width: "15%" },
}));

const DispatchOrderView = () => {
  const classes = useStyles();
  const history = useHistory();
  const [globalState, dispatch] = useStateValue();
  const location = useLocation();
  const [allStatus, setAllStatus] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [contractorName,setContractorName] = React.useState('');

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
      getDeliveryOrderBySalesIdDpON(
        location.state?.row.sales_id,
        location.state?.row.disDispatchNo,
        (r) => {
          setAddedItems(r);
          // console.log(r);
          getContractorById(
            r.contractor_id,
            (v)=>{
            setContractorName(v)
          })
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
    }
  }, [refresh]);

  const onClickClose = (e) => {
    history.push({
      pathname: "/admin/sales/dispatch-order-list",
    });
  }

  // const onClickProcedeInvoice = (e) => {
  //   e.preventDefault();
  //   history.push({
  //     pathname: "/admin/sales/invoice/create",
  //     state: {
  //       row: { sales_id: location.state?.row.sales_id },
  //     },
  //   });
  // };

  return (
    <ThemeProvider theme={theme}>
      {location.state?.updateTask ? (
        <PageTitle title="Sales > Dispatch > Update To Do" />
      ) : (
        <PageTitle title="Sales > Dispatch > View" />
      )}

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Dispatch Order details">
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">
                      Dispatch Date
                    </StyledTableCell>
                    <StyledTableCell align="left">Dispatch No</StyledTableCell>

                    <StyledTableCell align="left">
                      Delivery Order No
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Sales Order No
                    </StyledTableCell>
                    <StyledTableCell align="left">Customer</StyledTableCell>
                    <StyledTableCell align="left">Vehicle No</StyledTableCell>
                    <StyledTableCell align="left">Contractor</StyledTableCell>
                    <StyledTableCell align="right">Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.endate}>
                      {addedItems.dispatch_order_date}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.engNo}>
                      {addedItems.dispatch_order_no}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.enCustomerName}
                    >
                      {addedItems.delivery_order_no}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.enqCustomer}
                    >
                      {addedItems.sales_order_no}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.enqEmail}>
                      {addedItems.enqCustomer}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.enqEmail}>
                      {addedItems.vehicle_no}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.enqEmail}>
                    {contractorName[0]?.label}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
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
                            (s, i) => s.value === Number(addedItems.status)
                          )?.label
                        }
                      </div>
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
                    <StyledTableCell align="left">Unit</StyledTableCell>
                    <StyledTableCell align="right">Order Qty</StyledTableCell>
                    <StyledTableCell align="right">
                      Dispatched Qty
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Now Dispatch
                    </StyledTableCell>
                    {/* <StyledTableCell align="right">Rate</StyledTableCell>
                    <StyledTableCell align="right">Disc%</StyledTableCell>
                    <StyledTableCell align="right">Disc Value</StyledTableCell>
                    <StyledTableCell align="right">GST%</StyledTableCell>
                    <StyledTableCell align="right">GST Value</StyledTableCell>
                    <StyledTableCell align="right">Net Value</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addedItems?.dispatch_order_item_details &&
                    addedItems.dispatch_order_item_details.map((row, i) => (
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
                          {row.uom_name}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.quantity}
                        >
                          {row.quantity}
                        </StyledTableCell>
                        
                        <StyledTableCell
                          align="right"
                          className={classes.dispatched_qty}
                        >
                          {row.dispatched_qty}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.now_dispatch_qty}
                        >
                          {row.now_dispatch_qty}
                        </StyledTableCell>

                        {/* <StyledTableCell
                          align="right"
                          className={classes.quantity}
                        >
                          {currencyFormate(row.rate)}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.quantity}
                        >
                          {row.disc_percentage ? row.disc_percentage : "00"}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.quantity}
                        >
                          {currencyFormate(row.disc_value)}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.quantity}
                        >
                          {row.gst_percentage ? row.gst_percentage : "00"}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.quantity}
                        >
                          {currencyFormate(row.gst_value)}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.quantity}
                        >
                          {currencyFormate(row.net_value)}
                        </StyledTableCell> */}
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        </GridItem>
        {/* <UpdateTaskAndStatus
          setRefresh={setRefresh}
          refresh={refresh}
          id={addedItems.dispatch_order_no}
          status_id={addedItems.status}
          module="dispatch"
          location={location}
          procedeTo="Invoice"
          onProcedeToNext={onClickProcedeInvoice}
        /> */}

        {/* <Button
          onClick={onClickProcedeInvoice}
          className={classes.actionbtns}
          variant="outlined"
          color="primary"
        >
          Proceed to Invoice
        </Button> */}

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

export default DispatchOrderView;
