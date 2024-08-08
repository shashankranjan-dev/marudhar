import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable, { ActiveIcon, DeActiveIcon } from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import { getListStatus } from "../../../services/addStatusService";
import { getItemReceivedById } from "../../../services/ItemReceivedService";

import { Input, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";

import theme from "../../../theme/theme";

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
import ItemViewCard from "../HelperComponent/ItemViewCard";
import PageTitle from "../HelperComponent/PageTitle";
import ItemImg from "../HelperComponent/ItemImg";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import FormComponent from "../HelperComponent/FormComponent";
import UpdateTaskAndStatus from "../HelperComponent/UpdateTaskAndStatus";

import { Typography, Grid, Box } from "@material-ui/core";
import { currentDate, currencyFormate } from "../HelperComponent/utils";
import { StyledTableCell, StyledTableRow } from "../Sales/AddEnquiryPage";
import { sum } from "chartist";

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
  tableLabel: {
    fontWeight: 500,
    color: appSecondColor,
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

  po_date: {
    width: "10%",
  },
  po_value: {
    width: "15%",
  },
  
  bill_no: {
    width: "15%",
  },
  
  po_no: {
    width: "20%",
  },
  po_vendor: {
    width: "40%",
  },
  itemImg: {
    width: "8%",
  },
  itemDetails: {
    width: "65%",
  },
  quantity: {
    width: "5%",
  },
}));

const ReceivedViewPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [globalState, dispatch] = useStateValue();
  const location = useLocation();
  const [allStatus, setAllStatus] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [purchaseId, setPurchaseId] = React.useState("");
  let dbTotal=0;
  React.useEffect(() => {
    getListStatus(
      "Purchase",
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
   
      //setPurchaseId(location.state?.row.grnNo);
      //console.log(location.state?.row,"90901")
      getItemReceivedById(
        location.state?.row.grnNo,
        (r) => {
          setAddedItems(r);
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

  return (
    <ThemeProvider theme={theme}>
      {location.state?.updateTask ? (
        <PageTitle title="Procurement > Item Received > Update To Do" />
      ) : (
        <PageTitle title="Procurement > Item Received > View" />
      )}

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Item Received">
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                  <StyledTableCell align="left">GRN No</StyledTableCell>
                  <StyledTableCell align="left">GRN Date</StyledTableCell>
                  
                    <StyledTableCell align="left">PO Date</StyledTableCell>
                    <StyledTableCell align="left">PO No</StyledTableCell>
                    <StyledTableCell align="left">PO Value (Rs)</StyledTableCell>
                    <StyledTableCell align="left">Vendor</StyledTableCell>
                    {/* <StyledTableCell align="left">Status</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                  {/* {//console.log(addedItems,"9090")} */}
                  <StyledTableCell align="left" className={classes.bill_no}>
                      {addedItems?.grn_no}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_date}>
                      {addedItems?.po_date}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_date}>
                      {addedItems?.po_date}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_no}>
                      {addedItems?.po_number}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_value}>
                    {addedItems?.received_item_details
                      ? currencyFormate(
                          addedItems.received_item_details.reduce(
                            (sum, li) => Number(sum) + Number(li.net_value),
                            0
                          )
                        )
                      : "00"}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_vendor}>
                      {addedItems.dplVendor}
                    </StyledTableCell>
                    {/* <StyledTableCell
                      align="left"
                      className={classes.enqCustomer}
                    >
                      <div
                        style={{
                          color: allStatus.find(
                            (s, i) =>
                              s.value ===
                              Number(addedItems.purchase_order_status)
                          )?.status_color,
                        }}
                      >
                        {
                          allStatus.find(
                            (s, i) =>
                              s.value ===
                              Number(addedItems.purchase_order_status)
                          )?.label
                        }
                      </div>
                    </StyledTableCell> */}
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
                    <StyledTableCell align="right">Recd Qty</StyledTableCell>
                    {/* <StyledTableCell align="left">Unit</StyledTableCell> */}
                    <StyledTableCell align="right">Rate</StyledTableCell>
                    {/* <StyledTableCell align="right">Disc%</StyledTableCell>
                    <StyledTableCell align="right">Disc Value</StyledTableCell> */}
                    <StyledTableCell align="right">GST%</StyledTableCell>
                    <StyledTableCell align="right">GST Value</StyledTableCell>
                    <StyledTableCell align="right">Net Value</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {/* {//console.log(addedItems,"90903")} */}
                  {addedItems?.received_item_details &&
                    addedItems.received_item_details.map((row, i) => {
                    {/* if(row.grn_no===addedItems.grn_no)
                    { */}
                       {/* dbTotal = currencyFormate(
                          addedItems.received_item_details.reduce(
                            (sum, li) => 
                            {
                              if(li.grn_no===row.grn_no)
                              return sum + li.net_value;
                                  //console.log( li.net_value,"first")
                                  //console.log( li.grn_no,"second")
                                  //console.log( sum,"third")


                                  //console.log( row.grn_no,"fourth")


                            },
                            0
                          )
                        ) */}
                     
                      return(
                      <StyledTableRow key={i}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
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
                          className={classes.itemDetailsView}
                        >
                          <ItemViewCard item_id={row.item_id} />
                        </StyledTableCell>
                        
                        <StyledTableCell
                          align="right"
                          className={classes.quantity}
                        >
                         {row.receivedQty}
                         {/* {addedItems.received_item_details[0].receivedQty} */}
                    
                    
                        </StyledTableCell>
                        {/* <StyledTableCell
                          align="left"
                          className={classes.quantity}
                        >
                          {row.uom_name}
                        </StyledTableCell> */}

                        <StyledTableCell
                          align="right"
                          className={classes.viewValue}
                        >
                          {row.rate}
                        </StyledTableCell>
                        {/* <StyledTableCell
                          align="right"
                          className={classes.viewValue}
                        >
                          {row.disc_percentage}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.viewValue}
                        >
                          {currencyFormate(row.disc_value)}
                        </StyledTableCell> */}
                        <StyledTableCell
                          align="right"
                          className={classes.viewQuantity}
                        >
                          {row.gst_percentage}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.viewValue}
                        >
                          {currencyFormate(row.gst_value)}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.viewValue}
                        >
                          {currencyFormate(row.net_value)}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
             
                   
                        
                     
                {/* } */}
                    
                  })}
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
                  <Box className={classes.tableLabel} mr={1} textAlign="right">
                  
                {/* {dbTotal} */}
                  
                    {addedItems.received_item_details
                      ? currencyFormate(
                          addedItems.received_item_details.reduce(
                            (sum, li) => Number(sum) + Number(li.net_value),
                            0
                          )
                        )
                      : "00"}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CustomCard>
        </GridItem>
           <GridItem xs="12">
          <CustomCard
            cdTitle="Bill Details"
            width="100%"
            height="100%"
            style={{ marginTop: 0 }}
          >
           
           <GridContainer>
        <GridItem xs="12">
        
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">

              
                <TableHead>
                  <TableRow>
                  <StyledTableCell align="left">Bill No</StyledTableCell>
                  <StyledTableCell align="left">Bill Date</StyledTableCell>
                  
                    <StyledTableCell align="left">Bill Value</StyledTableCell>
                    <StyledTableCell align="left">Vendor </StyledTableCell>
                    <StyledTableCell align="left">Challan No</StyledTableCell>
                    <StyledTableCell align="left">Challan Date</StyledTableCell>
                    {/* <StyledTableCell align="left">Status</StyledTableCell> */}
                  </TableRow>
                </TableHead>


                <TableBody>
                {/* {//console.log(addedItems,"sen19043")} */}
                  <StyledTableRow>
                  <StyledTableCell align="left" className={classes.bill_no}>
                      {addedItems.bill_no}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_date}>
                      {addedItems.bill_date}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_date}>
                      {currencyFormate(addedItems.bill_value)}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_no}>
                      {addedItems.dplVendor}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_value}>
                    {addedItems.challan_no}
                    {/* {addedItems.received_item_details
                      ? currencyFormate(
                          addedItems.received_item_details.reduce(
                            (sum, li) => Number(sum) + Number(li.net_value),
                            0
                          )
                        )
                      : "00"} */}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_vendor}>
                      {addedItems.challan_date}
                    </StyledTableCell>
                    {/* <StyledTableCell
                      align="left"
                      className={classes.enqCustomer}
                    >
                      <div
                        style={{
                          color: allStatus.find(
                            (s, i) =>
                              s.value ===
                              Number(addedItems.purchase_order_status)
                          )?.status_color,
                        }}
                      >
                        {
                          allStatus.find(
                            (s, i) =>
                              s.value ===
                              Number(addedItems.purchase_order_status)
                          )?.label
                        }
                      </div>
                    </StyledTableCell> */}
                  </StyledTableRow>
                </TableBody>


                <TableHead>
                  <TableRow>
                  <StyledTableCell align="left">Vehicle No</StyledTableCell>
                  <StyledTableCell align="left">Way Bill No</StyledTableCell>
                  
                    <StyledTableCell align="left">GRN No</StyledTableCell>
                    <StyledTableCell align="left">GRN Date</StyledTableCell>
                    <StyledTableCell align="left">Showroom / Warehouse</StyledTableCell>
                    <StyledTableCell align="left">Note</StyledTableCell>
                    {/* <StyledTableCell align="left">Status</StyledTableCell> */}
                  </TableRow>
                </TableHead>



                <TableBody>
                  <StyledTableRow>
                  <StyledTableCell align="left" className={classes.bill_no}>
                      {addedItems.vehicle_no}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_date}>
                      {addedItems.waybill_no}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_date}>
                      {addedItems.grn_no}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_no}>
                      {addedItems.grn_date}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_value}>
                    {addedItems.showroom_warehouse_id}
                    {/* {addedItems.received_item_details
                      ? currencyFormate(
                          addedItems.received_item_details.reduce(
                            (sum, li) => Number(sum) + Number(li.net_value),
                            0
                          )
                        )
                      : "00"} */}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_vendor}>
                      {addedItems.note}
                    </StyledTableCell>
                    {/* <StyledTableCell
                      align="left"
                      className={classes.enqCustomer}
                    >
                      <div
                        style={{
                          color: allStatus.find(
                            (s, i) =>
                              s.value ===
                              Number(addedItems.purchase_order_status)
                          )?.status_color,
                        }}
                      >
                        {
                          allStatus.find(
                            (s, i) =>
                              s.value ===
                              Number(addedItems.purchase_order_status)
                          )?.label
                        }
                      </div>
                    </StyledTableCell> */}
                  </StyledTableRow>
                  
                </TableBody>


              </Table>
            </TableContainer>
      
        </GridItem>
      </GridContainer>
       
          </CustomCard>
        </GridItem>
        <UpdateTaskAndStatus
          statusBtn={false}
          setRefresh={setRefresh}
          refresh={refresh}
          id={""}
          status_id={addedItems.status}
          module="PURCHASE_ORDER"
          location={location}
          statusFor="Purchase"
        />
      </GridContainer>
    </ThemeProvider>
  );
};


export default ReceivedViewPage;
