import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable, { ActiveIcon, DeActiveIcon } from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModelForPrint from "../../Components/MasterModelForPrint";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../Components/CustomButton";
//SERVICE
import { getDispatchBySalesId, getDeliveryOrderBySalesIdDpON,getJournalById } from "../../../services/dispatchOrderListService";
import {
  getLedgerByCustomerName,
  postJournalFromInvoice,
  getAllInvoices,
  editpostInvoice,
  getAllOtherCharges,
  getInvoiceBySalesId,
} from "../../../services/invoiceLIstService";
import { getItemDetailById } from "../../../services/saleService/addEnqueryService";
import { getAllCustomers, getCustomerById } from "../../../services/customerListService";
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";

import { ThemeProvider, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Grid, Box } from "@material-ui/core";
import theme from "../../../theme/theme";
import Collapse from "@material-ui/core/Collapse";
import StepProceedModel from "../HelperComponent/StepProceedModel";

import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import ItemViewCard from "../HelperComponent/ItemViewCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { ColoseButton } from "../Components/CustomButton";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
  appScrollBar,
} from "assets/jss/material-dashboard-pro-react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import CollapsibleTable from "../HelperComponent/TableInsideTable";
import PageTitle from "../HelperComponent/PageTitle";
import InvoicePreview from "./InvoiceView/InvoicePreview";
import FormComponent from "../HelperComponent/FormComponent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import {
  currencyFormate,
  currentDate,
  calculatePerValue,
  calculatePer,
  dateFormateField,
} from "../HelperComponent/utils";
import { getListStatus } from "../../../services/addStatusService";
import ItemImg from "../HelperComponent/ItemImg";
import { Typography } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "./AddEnquiryPage";
import { CollectionsOutlined } from "@mui/icons-material";
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
  tableLabel: {
    fontWeight: 500,
    color: appSecondColor,
  },
  addBtn: {
    width: 30,
    height: 38,
  },

  searchBar: {
    marginTop: 10,
    marginBottom: 15,
    padding: "15px 20px",
  },
  actionbtns: {
    marginTop: 20,
    float: "right",
  },

  container: {
    ...appScrollBar,
    maxHeight: 360,
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
    width: "65%",
  },
  quantity: {
    width: "5%",
  },
}));


const EditInvoice = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [globalState, dispatch] = useStateValue();
  const [classicModal, setClassicModal] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [allItems, setAllItems] = React.useState({});
  const [addedItems, setAddedItems] = React.useState([]);
  const [billDetail, setBillDetail] = React.useState({});
  const [allStatus, setAllStatus] = React.useState([]);
  const [customerDetail, setCustomerDetails] = React.useState({});
  const [ledgerDetail, setLedgerDetails] = React.useState([])
  const [otherCharges, setOtherCharges] = React.useState([])
  const [other_charges_ledger, set_other_charges_ledger] = React.useState([]);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [invoiceDetail, setInvoiceDetail] = React.useState({
    sales_id: "",
    edit: false,
    txt_invoice_no: "AUTO GENERATED",
    txt_invoice_date: currentDate(),
    txt_sales_order_date_from: currentDate(),
    txt_sales_order_date_to: currentDate(),
    txt_invoice_note: "",
  });

  const [journalId,setJournalId] = React.useState(0)
  let db_total = 0;
  let other_charges = 0;
  let grandTotal = 0;
  let net_value=0;

  const onChangeInvoiceDetails = (e) => {
    const { name, value } = e.target;
    setInvoiceDetail({ ...invoiceDetail, [name]: value });
  };

  const onSelectDetails = (name, v) => {
    setInvoiceDetail({ ...invoiceDetail, [name]: v });
  };

  React.useEffect(() => {
    setAddedItems([]);
    fetchData();
    setLoading(true);

      setInvoiceDetail((prv) => ({
        ...prv,
        sales_id: location.state?.row.sales_id,
        dispatch_order_no: location.state?.row.disDispatchNo,
      }));
      //get items
      getDeliveryOrderBySalesIdDpON(
        location.state?.row.sales_id,
        location.state?.row.dispatch_order_no,
        (items) => {
          getLedgerByCustomerName(
            items.enqCustomer,
            (r)=>{
              setLedgerDetails(r[0]);
            },
            (err) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: { msg: err, msgType: "error" },
              });
            }
          );
          setLoading(false);
          setAllItems(items);
          setOtherCharges(items.sales_order_other_charges);
          items.sales_order_other_charges.map((it, i) => {
            getAllOtherCharges(
              it.charges,
              (r) => {
                //console.log(r[0].ledgerAccount, "57g")
                set_other_charges_ledger((prv) =>
                [...prv, {
                  amount: Number(it.charge_amount),
                  dr_cr: it.charge_type === "-" ? 1 : 2,
                  ddl_ledger: it.charges,
                  ddl_ledger_id: r[0].ledgerAccount
                }]);
              })
        
          })

          getAllInvoices(
            (invs) => {
              //console.log("invs", invs);
            },
            (err) => {
              //console.log("adala", err);
            
            },
            { sales_id: location.state?.row.sales_id, 
              txt_invoice_date_from: "2021-04-01",
              txt_invoice_date_to: currentDate()
            }
          );

          if(items.dispatch_order_item_details.filter(item => item.showroom_warehouse_id.toString() === localStorage.getItem("user_location").toString())?.length === 0) {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: "This invoice is not available for this warehouse", msgType: "error" },
            });
          }

          items.dispatch_order_item_details.map((item, i) => {

            if (item.showroom_warehouse_id.toString() === localStorage.getItem("user_location").toString()) {
              const netValue = (item.now_dispatch_qty * item.mrp).toFixed(2);
              const discValue = calculatePerValue(item.disc_percentage, netValue);
              const afterDisc = Number(netValue) - Number(discValue);
              let gst = item.gst_percentage;
              let gstValue = 0;
              if (item.gst_type === 1) {
                gstValue = calculatePerValue(
                  gst,
                  afterDisc
                );
              }

              const totalValue = (afterDisc) + Number(gstValue) ;

              getItemDetailById(
                item.item_id,
                (r) => {
                  setAddedItems((prv) => [
                    ...prv,
                    {
                      showroom_warehouse_id: Number(item.showroom_warehouse_id),
                      item_id: item.item_id,
                      uom_id: item.uom_id,
                      uom_name: item.uom_name,
                      rate: item.mrp ,
                      now_dispatch_qty: item.now_dispatch_qty,
                      disc_percentage: Number(item.disc_percentage),
                      // disc_value: discValue,
                      disc_value: Number(item.disc_value),
                      gst_value: Number(item.gst_value),
                      gst_type: item.gst_type,
                      gst_percentage: Number(item.gst_percentage),
                      net_value: Number(totalValue),
                      item: r[0].item,
                      hsn_code: r[0].hsn_code,
                    },
                  ]);
                },
                (err) => {
                  dispatch({
                    type: actionTypes.SET_OPEN_MSG,
                    payload: { msg: err, msgType: "error" },
                  });
                }
              );
              getCustomerById(
                (r) => {
                  setCustomerDetails(r[0]);
                },
                (err) => {
                  dispatch({
                    type: actionTypes.SET_OPEN_MSG,
                    payload: { msg: err, msgType: "error" },
                  });
                },
                items.customer_id
              );
              setButtonDisabled(false);
            }
          });
        },
        (err) => {
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );

      //journal no
//console.log(location.state.row.inv_invoice_no,"sen0807/location")
      getJournalById(location.state?.row?.inv_invoice_no,
          (r)=>{
            setJournalId(r)
          },
          (err)=>{
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          })

  }, []);


  const onClickCreateInvoice = (e) => {
    e.preventDefault();
    let updateOtherCharges = [];
    let journal_details = [];

    journal_details.push({
      amount: grandTotal,
      dr_cr: 1,
      ddl_ledger: allItems.enqCustomer,
      ddl_ledger_id: ledgerDetail.ledger_id
    });

    journal_details.push({
      amount: db_total,
      dr_cr: 2,
      ddl_ledger: "Sales",
      ddl_ledger_id: 2530,
    });

    otherCharges.map((item, i) => {

      updateOtherCharges.push({
        charges: item.charges,
        charge_amount: item.charge_amount,
        charge_type: item.charge_type
      })
    });

    editpostInvoice(
      invoiceDetail,
      addedItems,
      customerDetail,
      updateOtherCharges,
      allItems,
      journal_details,
      other_charges_ledger,
      grandTotal,
      journalId,
      (r) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: billDetail.edit
              ? "Invoice Updated Successfully"
              : "Invoice Created Successfully",
            msgType: "success",
          },
        });
        setClassicModal(true);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };


  const fetchData = () => {
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
  };
  // invoiceDetail,
  //     addedItems,
  //     customerDetail,
  //     updateOtherCharges,
  //     allItems,
  //     journal_details,
  //     other_charges_ledger,
  //     grandTotal
  //console.log(invoiceDetail, "sen0807/1")
  //console.log(customerDetail, "sen0807/2")
  // //console.log(updateOtherCharges, "sen0807/3")
  //console.log(allItems, "sen0807/4")
  // //console.log(journal_details, "sen0807/5")
  //console.log(other_charges_ledger, "sen0807/6")
  // //console.log(grandTotal, "sen0807/7")
  //console.log(addedItems, "sen0807/8")

  const formData = [
    {
      formName: "Invoice_details",
      fields: [
        {
          name: "txt_invoice_no",
          disabled: true,
          label: "Invoice No",
          hidden: false,
          required: true,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 3,
        },
        {
          name: "txt_invoice_date",
          label: "Invoice Date",
          hidden: false,
          required: true,
          align: "left",
          data_type: "date",
          html_element: "TextField",
          defaultValue: "2021-08-14",
          error: false,
          xs: 12,
          md: 4,
          lg: 2,
        },
        {
          name: "txt_invoice_note",
          label: "Note",
          hidden: false,
          required: true,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          marginBottom: -20,
          defaultValue: "",
          error: false,
          xs: 12,
          md: 4,
          lg: 7,
        },
      ],
    },
  ];

  const onClickOkInvoice = (e) => {
    e.preventDefault();
    history.push("/admin/sales/invoices");
    setClassicModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title={
          invoiceDetail.edit
            ? "Sales > Invoice > Edit "
            : "Sales > Invoice > Add "
        }
      />
      {/* Select and Add Items */}
      <GridContainer>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard cdTitle="Dispatch Order Details ">
              <TableContainer className={classes.container}>
                <Table
                  className={classes.table}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">
                        Dispatch Date
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Dispatch No
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
                      {/* <StyledTableCell align="center">Status</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell align="left" className={classes.endate}>
                        {allItems.dispatch_order_date}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.endate}>
                        {allItems.dispatch_order_no}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.engNo}>
                        {allItems.delivery_order_no}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.endate}>
                        {allItems.sales_order_no}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.engNo}>
                        {allItems.qutNo}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.engNo}>
                        {allItems.enqNo}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.enCustomerName}
                      >
                        {allItems.enqCustomer}
                      </StyledTableCell>

                      {/* <StyledTableCell
                        align="center"
                        className={classes.enqStatus}
                      >
                        <div
                          style={{
                            color: allStatus.find(
                              (s, i) => s.value === Number(allItems.status)
                            )?.status_color,
                          }}
                        >
                          {
                            allStatus.find(
                              (s, i) => s.value === Number(allItems.status)
                            )?.label
                          }
                        </div>
                      </StyledTableCell> */}
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
            <CustomCard cdTitle="Item Details" maxHeight={450}>
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
                      <StyledTableCell align="right">GST%</StyledTableCell>
                      <StyledTableCell align="right">GST Value</StyledTableCell>
                      <StyledTableCell align="right">Net Value</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {/* {
                      console.log(addedItems, "57")} */}
                    {
                      addedItems.map((row, i) => {
                        return (
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
                              {/* <TextField
                              size="small"
                              placeholder="Quantity"
                              name={`txt_quantity${row.item_id}`}
                              style={{ marginBottom: -15 }}
                              type="number"
                              inputProps={{ style: { textAlign: "right" } }}
                              onChange={(e) => onChange(e, row)}
                              id="outlined-basic"
                              value={row.now_dispatch_qty}
                              // value={itemDetail[`txt_quantity${row.item_id}`]}
                              variant="outlined"
                            /> */}
                              {row.now_dispatch_qty}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className={classes.quantity}
                            >
                              {row.uom_name}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.viewValue}
                            >
                              {currencyFormate(row.rate)}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.viewValue}
                            >
                              {Number(row.disc_percentage).toFixed(2)}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.viewValue}
                            >
                              {currencyFormate(row.disc_value)}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.viewQuantity}
                            >
                              {row.gst_percentage ? row.gst_percentage : 0}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.viewValue}
                            >
                              {row.gst_type === 1 ?
                                ((row.now_dispatch_qty * (row.rate - (row.rate * (row.disc_percentage / 100)))) * row.gst_percentage / 100).toFixed(2) : 0}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.viewValue}
                            >

                              {row.gst_type === 1 ?

                                (
                                  (
                                    (
                                      (row.now_dispatch_qty * (row.rate - (row.rate * (row.disc_percentage / 100))
                                      )
                                      )
                                      * row.gst_percentage / 100)) + row.now_dispatch_qty * (row.rate - (row.rate * (row.disc_percentage / 100)))).toFixed(2)
                                : (row.now_dispatch_qty * (row.rate - (row.rate * (row.disc_percentage / 100))
                                )
                                ).toFixed(2)}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
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
                    <Box
                      className={classes.tableLabel}
                      mr={1}
                      textAlign="right"
                    >
                      {currencyFormate(db_total = addedItems?.length
                        ?
                        addedItems.reduce(
                          (sum, li) => net_value = Number(sum) + Number(li?.net_value),
                          0
                        )
                        : 0)}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              {/* ---------------Other Charges----------------------------------------------------------- */}
              <Box pt={2}>
                <Grid container>
                  <Grid item xs={7}>
                    <Box className={classes.tableLabel} ml={9} textAlign="left">
                      Other Charges
                    </Box>
                  </Grid>

                  <Grid item xs={5}>
                    <Box
                      className={classes.tableLabel}
                      mr={3}
                      textAlign="right"
                    >
                      {
                        other_charges = otherCharges
                          ?
                          //currencyFormate(
                          otherCharges
                            .reduce(
                              (sum, li) =>
                                li.charge_type === "+" ?
                                  Number(sum) + Number(li.charge_amount)
                                  : Number(sum) - Number(li.charge_amount),
                              0
                            )
                            .toFixed(2)
                          //)
                          : currencyFormate(0)

                      }



                    </Box>
                  </Grid>
                </Grid>
              </Box>
              {/* ---------------End Other Charges----------------------------------------------------------- */}

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>



                <TableContainer style={{ alignSelf: 'left', justifyContent: 'left', alignItems: 'left', width: '30%' }}>
                  <Table aria-label="customized table"
                    style={{ "borderWidth": "1px", 'borderColor': "#a77aaa", 'borderStyle': 'solid', 'alignItems': 'center' }}>
                    {
                      otherCharges && otherCharges.map((item, index) => {

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

              {/* ---------------Grand Total----------------------------------------------------------- */}
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
                      mr={3}
                      textAlign="right"
                    >
                      {currencyFormate(grandTotal = parseFloat(db_total) + parseFloat(other_charges))}

                    </Box>
                  </Grid>
                </Grid>
              </Box>
              {/* ---------------End Grand Total----------------------------------------------------------- */}


            </CustomCard>
          )}
        </GridItem>

        <GridItem xs="12">
          <CustomCard
            cdTitle={
              invoiceDetail.edit ? "Edit Invoice Details" : "Invoice Details"
            }
            width="100%"
            height="100%"
            style={{ marginTop: 0 }}
          >
            {formData.map((form, fkey) => {
              return (
                <GridContainer key={fkey} style={{ padding: "5px 20px" }}>
                  {form.formName === "Invoice_details" &&
                    form.fields.map((item, key) => {
                      return (
                        <>
                          <FormComponent
                            item={item}
                            key={key}
                            onSelect={onSelectDetails}
                            state={invoiceDetail}
                            onChange={onChangeInvoiceDetails}
                            error={{}}
                          />
                        </>
                      );
                    })}
                </GridContainer>
              );
            })}
          </CustomCard>
        </GridItem>
        <GridItem xs={12}>
          <div className={classes.actionbtns}>
            <Button
              onClick={onClickCreateInvoice}
              className={classes.actionbtn}
              variant="outlined"
              color="primary"
              disabled={buttonDisabled}
            >
               Update Invoice
            </Button>
          </div>
        </GridItem>
      </GridContainer>

      <MasterModelForPrint
        classicModal={classicModal}
        onCloseModel={() => setClassicModal(false)}
        onClickAddTask={() => { }}
        closeIcon={false}
        width={600}
        height="auto"
        addTodobtn
        closeBtn={false}
        okbtnWith={200}
        appLogo
        modelName="Marudhar"
        okBtnText="Ok"
        onClickOk={onClickOkInvoice}
      >
        <StepProceedModel
          step={5}
          title="Success!"
          desc="Invoice No"
          generateNo={`${invoiceDetail.txt_invoice_no}`}
        />
      </MasterModelForPrint>
    </ThemeProvider>
  );
};

export default EditInvoice;
