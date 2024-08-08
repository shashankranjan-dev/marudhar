import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable, { ActiveIcon, DeActiveIcon } from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../Components/CustomButton";
//SERVICE
import { getDispatchBySalesId } from "../../../services/dispatchOrderListService";
import {
  getAllInvoices,
  postInvoice,
  getInvoiceBySalesId,
} from "../../../services/invoiceLIstService";
import { getItemDetailById } from "../../../services/saleService/addEnqueryService";
import { getAllCustomers } from "../../../services/customerListService";
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";

import { ThemeProvider, Paper } from "@material-ui/core";

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
import ItemNameCard from "../HelperComponent/ItemNameCard";

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

const CreateInvoive = () => {
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
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [inWarehouse, setInvWarehouse] = React.useState("");
  
  let net_value=0;
  let db_total = 0;
  let other_charges = 0;
  const [invoiceDetail, setInvoiceDetail] = React.useState({
    sales_id: "",
    edit: false,
    txt_invoice_no: "AUTO GENERATED",
    txt_invoice_date: currentDate(),
    txt_sales_order_date_from: currentDate(),
    txt_sales_order_date_to: currentDate(),
    txt_invoice_note: "",
  });

  const onChangeInvoiceDetails = (e) => {
    const { name, value } = e.target;
    setInvoiceDetail({ ...invoiceDetail, [name]: value });
  };

  const onSelectDetails = (name, v) => {
    setInvoiceDetail({ ...invoiceDetail, [name]: v });
  };

  const onClickCreateInvoice = (e) => {
    e.preventDefault();
    postInvoice(
      invoiceDetail,
      addedItems,
      customerDetail,
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
        if (!invoiceDetail.edit) {
          setInvoiceDetail((prv) => ({ ...prv, txt_invoice_no: r.invoice_no }));
        }
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

  React.useEffect(() => {
    setAddedItems([]);
    fetchData();
    setLoading(true);

    //Edit
    if (location.state?.edit) {

      // console.log( allItems,"clicked Edit invoiceview page")
      // console.log( invoiceDetail,"invoice detals clicked Edit")

      getInvoiceBySalesId(
        location.state?.row.sales_id,
        (items) => {

          setLoading(false);
          setAllItems(items);
          // .filter(r => r.showroom_warehouse_id.toString() === localStorage.getItem("user_location"))
          setOtherCharges(items.sales_order_other_charges);
          setInvoiceDetail((prv) => ({
            ...prv,
            edit: true,
            sales_id: location.state?.row.sales_id,
            txt_invoice_no: items.invoice_no,
            txt_invoice_date: dateFormateField(items.invoice_date),
            txt_invoice_note: items.invoice_note,
          }));

          setAddedItems(items.invoice_item_details);
          getAllCustomers(
            (r) => {
              setCustomerDetails(r[0]);
            },
            (err) => {
              setLoading(false);
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: { msg: err, msgType: "error" },
              });
            },
            items.customer_id
          );
        },
        (err) => {
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
    } else{
      getInvoiceBySalesId(
        location.state?.row.sales_id,
        location.state?.row.inv_invoice_no,
        (items) => {
          setLoading(false);
          setAllItems(items);
          setOtherCharges(items.invoice_other_charges);
          setInvoiceDetail((prv) => ({
            ...prv,
            edit: true,
            sales_id: location.state?.row.sales_id,
            txt_invoice_no: items.invoice_no,
            txt_invoice_date: dateFormateField(items.invoice_date),
            txt_invoice_note: items.invoice_note,
          }));

          setAddedItems(items.invoice_item_details);

          getListShowroomWarehouse(
            (l) => {
              setInvWarehouse(l.filter(i => i.value === items.invoice_item_details[0].showroom_warehouse_id)[0].label);
            },

            (err) => console.log(err)
          );
          
          // console.log(allItems,"riched edit")
          
          getAllCustomers(
            (r) => {
              // console.log(r,"cust")
              setCustomerDetails(r[0]);
            },
            (err) => {
              setLoading(false);
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: { msg: err, msgType: "error" },
              });
            },
            items.customer_id
          );
        },
        (err) => {
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
    
    }
    
    // else {
    //   console.log( allItems,"clicked View allItems")
    //   console.log( invoiceDetail,"invoice detals clicked View")
    //   console.log( addedItems,"added clicked View")


    //   setInvoiceDetail((prv) => ({
    //     ...prv,
    //     sales_id: location.state?.row.sales_id,
    //   }));
    //   getInvoiceBySalesId(
    //     location.state?.row.sales_id,
    //     (items) => {
    //       setLoading(false);
    //       setAllItems(items);

    //       items.do_item_details_with_dispatch.map((item, i) => {
    //         const netValue = (item.now_dispatch_qty * item.rate).toFixed(2);
    //         const discValue = calculatePerValue(item.disc_percentage, netValue);
    //         const totalValue = Number(netValue) - Number(discValue);
    //         const gstValue = calculatePerValue(
    //           item.gst_percentage,
    //           totalValue
    //         ).toString();

    //         getItemDetailById(
    //           item.item_id,
    //           (r) => {
                
    //             setAddedItems((prv) => [
    //               ...prv,
    //               {
    //                 showroom_warehouse_id: item.showroom_warehouse_id,
    //                 item_id: item.item_id,
    //                 uom_id: item.uom_id,
    //                 uom_name: item.uom_name,
    //                 rate: item.rate,
    //                 quantity: item.now_dispatch_qty,
    //                 disc_percentage: item.disc_percentage,
    //                 disc_value: discValue,
    //                 gst_value: gstValue,
    //                 gst_percentage: item.gst_percentage,
    //                 net_value: totalValue + Number(gstValue),
    //                 details: r[0].details,
    //                 hsn_code: r[0].hsn_code,
    //               },
    //             ]);
    //           },
    //           (err) => {
    //             dispatch({
    //               type: actionTypes.SET_OPEN_MSG,
    //               payload: { msg: err, msgType: "error" },
    //             });
    //           }
    //         );

    //         getAllCustomers(
    //           (r) => {
    //             setCustomerDetails(r[0]);
    //           },
    //           (err) => {
    //             dispatch({
    //               type: actionTypes.SET_OPEN_MSG,
    //               payload: { msg: err, msgType: "error" },
    //             });
    //           },
    //           items.customer_id
    //         );
    //       });
    //     },
    //     (err) => {
    //       setLoading(false);
    //       dispatch({
    //         type: actionTypes.SET_OPEN_MSG,
    //         payload: { msg: err, msgType: "error" },
    //       });
    //     }
    //   );
    // }
  }, []);

  

  // console.log(addedItems,"55")

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
        title={"Sales > Invoice > View "}
      />
      {/* Select and Add Items */}
      <GridContainer>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : 
          (
            <CustomCard cdTitle="Invoice ">
              <TableContainer className={classes.container}>
                <Table
                  className={classes.table}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">
                        Invoice Date
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Invoice No
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Dispatch No
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Delivery Order No
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Showroom / Warehouse
                      </StyledTableCell>
                     
                      {/* <StyledTableCell align="left">Enquiry No</StyledTableCell> */}
                      <StyledTableCell align="left">Customer</StyledTableCell>
                      {/* <StyledTableCell align="center">Status</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                    {/* {console.log(allItems,"abc")} */}
                      <StyledTableCell align="left" className={classes.endate}>
                        {allItems.invoice_date}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.engNo}>
                        {allItems.invoice_no}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.endate}>
                        {allItems.dispatch_order_no}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.engNo}>
                      
                        {allItems.delivery_order_no}
                      </StyledTableCell>
                      
                      <StyledTableCell align="left" className={classes.endate}>
                      {inWarehouse}
                      </StyledTableCell>
                   
                      {/* <StyledTableCell align="left" className={classes.engNo}>
                        {allItems.enqNo}
                      </StyledTableCell> */}
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
          { loading ? (
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

                  
                    {
                      addedItems?.map((row, i) => 
                        (
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
                              <ItemNameCard item_id={row.item_id} />
                            </StyledTableCell>

                            <StyledTableCell
                              align="right"
                              className={classes.quantity}
                            >
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
                              {(Number(row.disc_percentage)).toFixed(2)}
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
                              {currencyFormate(row.gst_value)}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.viewValue}
                            >
                              {currencyFormate(row.net_value)}
                            </StyledTableCell>
                          </StyledTableRow>
                        )
                      )}
                  </TableBody>
                </Table>
              </TableContainer>

              {addedItems && (<>
              <Box pt={2}>
                <Grid container>
                  <Grid item xs={8}>
                    <Box className={classes.tableLabel} ml={9} textAlign="left">
                      Total
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Box
                      className={classes.tableLabel}
                      mr={1}
                      textAlign="right"
                    >
                      {currencyFormate( db_total =addedItems.length
                        ? 
                            addedItems.reduce(
                              (sum, li) =>net_value= Number(sum) + Number(li.net_value),
                              0
                            )
                           
                        : "00")}
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
                      {/* {console.log(addedItems,"abc")} */}
                      {
                        allItems.invoice_other_charges ?
                    currencyFormate(
                          other_charges = allItems.invoice_other_charges
                            ?
                          
                            allItems.invoice_other_charges
                              .reduce(
                                (sum, li) =>
                                  li.charge_type === "+" ?
                                    Number(sum) + Number(li.charge_amount)
                                    : Number(sum) - Number(li.charge_amount),
                                0
                              )
                              
                            
                            : currencyFormate(0)
                            )
                          :
                          other_charges = allItems.sales_order_other_charges
                            ?
                             currencyFormate(
                            allItems.sales_order_other_charges
                              .reduce(
                                (sum, li) =>
                                  li.charge_type === "+" ?
                                    Number(sum) + Number(li.charge_amount)
                                    : Number(sum) - Number(li.charge_amount),
                                0
                              )
                             
                             )
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
                    > {currencyFormate(parseFloat(db_total) + parseFloat(other_charges))}
                     {/* {
                        (allItems.invoice_other_charges
                          ? currencyFormate(
                            allItems.invoice_other_charges.reduce(
                                (sum, li) =>
                                  li.charge_type === "+"
                                    ? parseFloat(net_value) +
                                      parseFloat(li.charge_amount)
                                    : parseFloat(net_value) -
                                      parseFloat(li.charge_amount),
                                      net_value
                              )
                            )
                          : currencyFormate(net_value)
                          )
                      } */}
                    
                    </Box>
                  </Grid>                  
                </Grid>
              </Box>
              </>)}
                  {/* ---------------End Grand Total----------------------------------------------------------- */}


            </CustomCard>
          )}
        </GridItem>

        {/* <GridItem xs="12">
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
        </GridItem> */}
       {/* <GridItem xs={12}>
          <div className={classes.actionbtns}>
            <Button
                onClick={onClickClose}
              className={classes.actionbtn}
              variant="outlined"
              color="danger"
            >
             close
            </Button>
          </div>
        </GridItem> */}
      </GridContainer>
{/* 
      <MasterModel
        classicModal={classicModal}
        onCloseModel={() => setClassicModal(false)}
        onClickAddTask={() => {}}
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
      </MasterModel> */}
    </ThemeProvider>
  );
};

export default CreateInvoive;
