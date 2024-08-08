import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable, { ActiveIcon, DeActiveIcon } from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";

import { getLedgerSalesOrderBySalesId,getSalesOrderBySalesId } from "../../../services/SalesOrderViewPageService";
import { getListStatus } from "../../../services/addStatusService";

import { Input, Paper, Box, Grid } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import UpdateTaskAndStatus from "../HelperComponent/UpdateTaskAndStatus";

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

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ItemViewCard from "../HelperComponent/ItemViewCard";
import PageTitle from "../HelperComponent/PageTitle";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import ItemImg from "../HelperComponent/ItemImg";
import { currencyFormate } from "../HelperComponent/utils";
import FormComponent from "../HelperComponent/FormComponent";

import { StyledTableCell, StyledTableRow } from "../Sales/AddEnquiryPage";

import MasterModelForPrint from "../../Components/MasterModelForPrint";
import SalesOrderViewPrint from "../../Pages/Sales/salesOrderViewPrint";

import { getAllSalesOrderPrint } from "../../../services/SalesOrderViewPageService";
import { IconButton, OutlinedInput } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import printIcon from "assets/img/print.svg";
import MasterModelForLedgerInvoiceView from "../../Components/MasterModelForLedgerInvoiceView";
import { ColoseButton } from "views/Components/CustomButton";
import { whiteColor } from "assets/jss/material-dashboard-pro-react";

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
  tableLabel: {
    fontWeight: 500,
    color: appSecondColor,
  },

  actionbtns: {
    marginLeft: 15,
    marginTop: 20,
    float: "right",
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
    width: "20%",
  },
  mrp: {
    width: "10%",
  },
  quantity: {
    width: "8%",
  },
  slDate: {
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
    width: "8%",
  },
  disc_value: {
    width: "8%",
  },
  net_value: {
    width: "15%",
  },
  enqNo: {
    width: "15%",
  },
  cus: {
    width: "20%",
  },
}));

const SalesOrderViewPageForLedger = ({ sales_order_no }) => {
  const history = useHistory();
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const location = useLocation();
  const [globalState, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [allStatus, setAllStatus] = React.useState([]);
  const [salesOrderDetails, setSalesOrderDetails] = React.useState({});
  const [
    sales_order_item_details,
    set_sales_order_item_details,
  ] = React.useState({});

  const [showroom, setShowroom] = React.useState({});
  const [classicModalView, setClassicModalView] = React.useState(false);

  let other_charges = 0;
  let db_total = 0;

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
        setLoading(false);
     
      }
    );
    setLoading(true)
    if (sales_order_no) {
      getLedgerSalesOrderBySalesId(
        // location.state?.row.ledVoucherNo,
        sales_order_no,
        (r) => {
          //console.log(r, "sen12345");
          setAddedItems(r);
          setOtherCharges(r.sales_order_other_charges);
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
  }, [sales_order_no])

  const onClickPrint = () => {
    // //console.log(row, "sankrow");
    // location.state?.row.ledVoucherNo,
    setClassicModal(true);
    setLoading(true)
    getAllSalesOrderPrint(
      // addedItems.sales_order_no,
      sales_order_no,
      (row) => {
        setSalesOrderDetails(row);
        set_sales_order_item_details(row);
        
      },
      (err) => {
        
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
       
      }
    );
  };

  const onClickBack = () => {
    history.push("/admin/mis-reports/ledger-by-salesorder");
  };

  const onCloseModel = () => {
    setLoading(false);
    setClassicModal(false);
  };
  // const onClickProcedeDeliveryOrder = () => {
  //   history.push({
  //     pathname: "/admin/sales/add-new-sales-order",
  //     state: {
  //       row: { sales_id: location.state?.row.sales_id },
  //     },
  //   });
  // };

  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="Sales > Sales Order > View" />

      <h5 align={"center"} style={{ fontWeight: "bold", color: "lightcoral" }}>
        Sales Order View
      </h5>
      <div>
        <GridItem style={{ cursor: "pointer",float: "right"}}>
          <IconButton onClick={onClickPrint}>
            <Tooltip title="Print">
              <img src={printIcon} style={{ width: 20, float:"right" }} />
            </Tooltip>
          </IconButton>
        </GridItem>
        
        <GridContainer>
          <GridItem xs="12">
            <GridContainer>
              <GridItem xs="12">
                {loading ? (
                  <Box mt={10} width="100%" textAlign="center">
                    <CircularProgress />
                  </Box>
                ) : (
                  <CustomCard cdTitle="Sales Order">
                    <TableContainer>
                      <Table
                        className={classes.table}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="left">
                              Sales Order Date
                            </StyledTableCell>

                            <StyledTableCell align="left">
                              Sales Order No
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Quotation No
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Enquiry No
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Customer
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Status
                            </StyledTableCell>
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
                            {/* {//console.log(addedItems, "sen1234")} */}
                            <StyledTableCell
                              align="left"
                              className={classes.slDate}
                            >
                              {addedItems.sales_order_date}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className={classes.slDate}
                            >
                              {addedItems.sales_order_no}
                            </StyledTableCell>

                            <StyledTableCell
                              align="left"
                              className={classes.qNo}
                            >
                              {addedItems.qutNo}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className={classes.enqNo}
                            >
                              {addedItems.enqNo}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className={classes.cus}
                            >
                              {addedItems.enqCustomer}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.enqStatus}
                            >
                              <div
                              // style={{
                              //   color: allStatus.find(
                              //     (s, i) => s.value === Number(addedItems.status)
                              //   )?.status_color,
                              // }}
                              >
                                {
                                  allStatus.find(
                                    (s, i) =>
                                      s.value === Number(addedItems.status)
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
                      <Table
                        className={classes.table}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell align="left">
                              Image
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Item Details
                            </StyledTableCell>
                            <StyledTableCell align="right">Qty</StyledTableCell>
                            <StyledTableCell align="left">Unit</StyledTableCell>
                            <StyledTableCell align="right">
                              Rate
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Disc%
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Disc Value
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Net Rate
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              GST%
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              GST Value
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Net Value
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* {//console.log(addedItems, "777q")} */}
                          {addedItems?.sales_order_item_details &&
                            addedItems.sales_order_item_details.map(
                              (row, i) => (
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
                                    className={classes.disc_percentage}
                                  >
                                    {currencyFormate(row.mrp)}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="right"
                                    className={classes.disc_percentage}
                                  >
                                    {Number(row.disc_percentage).toFixed(2)}
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
                                    {currencyFormate(row.mrp - row.disc_value)}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="right"
                                    className={classes.disc_percentage}
                                  >
                                    {row.gst_type === 1
                                      ? row.gst_percentage
                                      : 0}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="right"
                                    className={classes.disc_value}
                                  >
                                    {row.gst_type === 1
                                      ? currencyFormate(row.gst_value)
                                      : 0}
                                  </StyledTableCell>

                                  <StyledTableCell
                                    align="right"
                                    className={classes.net_value}
                                  >
                                    {currencyFormate(row.net_value)}
                                  </StyledTableCell>
                                </StyledTableRow>
                              )
                            )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box pt={2}>
                      <Grid container>
                        <Grid item xs={7}>
                          <Box
                            className={classes.tableLabel}
                            ml={9}
                            textAlign="left"
                          >
                            Total
                          </Box>
                        </Grid>

                        <Grid item xs={5}>
                          <Box
                            className={classes.tableLabel}
                            mr={1}
                            textAlign="right"
                          >
                            {addedItems.sales_order_item_details
                              ? currencyFormate(
                                  addedItems.sales_order_item_details.reduce(
                                    (sum, li) =>
                                      (db_total =
                                        Number(sum) + Number(li.net_value)),
                                    0
                                  )
                                )
                              : ""}
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
                            {addedItems.sales_order_other_charges
                              ? currencyFormate(
                                  (other_charges = addedItems.sales_order_other_charges
                                    ? addedItems?.sales_order_other_charges
                                        .reduce(
                                          (sum, li) =>
                                            li.charge_type === "+"
                                              ? Number(sum) +
                                                Number(li.charge_amount)
                                              : Number(sum) -
                                                Number(li.charge_amount),
                                          0
                                        )
                                        .toFixed(2)
                                    : currencyFormate(0))
                                )
                              : currencyFormate(
                                  (other_charges = addedItems.quotation_other_charges
                                    ? addedItems.quotation_other_charges
                                        .reduce(
                                          (sum, li) =>
                                            li.charge_type === "+"
                                              ? Number(sum) +
                                                Number(li.charge_amount)
                                              : Number(sum) -
                                                Number(li.charge_amount),
                                          0
                                        )
                                        .toFixed(2)
                                    : currencyFormate(0))
                                )}
                            {/* {//console.log(addedItems, "chk")}
                      {
                        (addedItems.sales_order_other_charges
                          ? currencyFormate(
                              addedItems.sales_order_other_charges.reduce(
                                (sum, li) =>
                                  parseFloat(sum) +
                                  parseFloat(li.charge_amount),
                                0
                              )
                            )
                          : "")
                      } */}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
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
                            //console.log(otherCharges, "0000");
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
                            {currencyFormate(
                              parseFloat(db_total) + parseFloat(other_charges)
                            )}

                            {/* {
                        (addedItems.sales_order_other_charges
                          ? currencyFormate(
                              addedItems.sales_order_other_charges.reduce(
                                (sum, li) =>
                                  li.charge_type === "+"
                                    ? parseFloat(db_total) +
                                      parseFloat(li.charge_amount)
                                    : parseFloat(db_total) -
                                      parseFloat(li.charge_amount),
                                0
                              )
                            )
                          : "")
                      } */}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </CustomCard>
                )}
              </GridItem>

              {/* 
        <UpdateTaskAndStatus
          statusFor="Sales-Order"
          customer_name={location.state.row ? location.state?.row.enqCustomer : ''}

          setRefresh={setRefresh}
          refresh={refresh}
          module="sales_order"
          location={location}
          status_id={addedItems.status}
          procedeTo="Delivery Order"
    
        /> */}
            </GridContainer>
          </GridItem>
          {/* <GridItem xs="12">
            <div className={classes.actionbtn} align="right">
              <ColoseButton name="btn_close" height={40} onClick={onClickBack}>
                Cancel
              </ColoseButton>
              <Button
                name="btn_save"
                onClick={(e) => onClickPrint(e)}
                style={{
                  height: 40,
                  width: "100px",
                  color: whiteColor,
                  borderColor: appDefaultColor,
                  fontFamily: appDefaultFamily,
                }}
                variant="outlined"
                color="primary"
                disabled={buttonDisabled}
              >
                Print
              </Button>
            </div>
          </GridItem> */}
        </GridContainer>
        {location && (
          <MasterModelForPrint
            classicModal={classicModal}
            onCloseModel={onCloseModel}

            // onCloseModel={(e) => {
            //   e.preventDefault();
            //   setClassicModal(false);
            // }}
            height="auto"
            okBtnText="Print"
            modelName="Sales View"
            onClickOk={(e) => {
              e.preventDefault();
              window.print();
            }}
          >

            <SalesOrderViewPrint
              salesOrderDetails={salesOrderDetails}
              itemDetails={sales_order_item_details}
              totalOtherCharges={salesOrderDetails}
              totalOtherChargesTotal={salesOrderDetails.totalOtherChargesTotal}
            />
          </MasterModelForPrint>
        )}
      </div>
    </ThemeProvider>
  );
};

export default SalesOrderViewPageForLedger;
