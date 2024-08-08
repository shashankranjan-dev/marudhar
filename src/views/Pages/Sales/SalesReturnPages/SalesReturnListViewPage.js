import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
//import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../../Components/MasterModel";
import { CustomCard } from "../../../Components/CustomCard";
import { dateFormate } from "views/Pages/HelperComponent/utils";
// import CustomButton, {
//   CircleAddBtn,
//   ColoseButton,
// } from "../../../Components/CustomButton";
import { getDirectPurchaseById } from "../../../../services/directPurchaseFormService";
import { upadateItemReceived } from "../../../../services/ItemReceivedService";
import { getListShowroomWarehouse } from "../../../../services/showroomWarehouseService";

import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/core";

import { Grid } from "@material-ui/core";
import theme from "../../../../theme/theme";

import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  activeText,
  appScrollBar,
} from "assets/jss/material-dashboard-pro-react";
// import { ColoseButton } from "../Components/CustomButton";
import { getReturnListView,getInvoiceBySalesId, getAllSalesReturn, postSalesReturn } from "../../../../services/invoiceLIstService";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import ReactSelect from "react-select";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemViewCard from "../../HelperComponent/ItemViewCard";
import PageTitle from "../../HelperComponent/PageTitle";

//SERVICE
import {} from "../../../../services/ItemReceivedService";
import { getListVendor } from "../../../../services/vendorService";
import { useStateValue } from "../../../../context/context";
import { actionTypes } from "../../../../context/reducer";
import { Typography } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../AddEnquiryPage";
import { Box, Paper } from "@material-ui/core";
import ItemImg from "../../HelperComponent/ItemImg";
import FormComponent from "../../HelperComponent/FormComponent";
import StepProceedModel from "../../HelperComponent/StepProceedModel";

import {
  currentDate,
  currencyFormate,
  dateFormateField,
} from "../../HelperComponent/utils";
import { roseBoxShadow } from "assets/jss/material-dashboard-pro-react";

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
  customSelect: {
    marginBottom: 15,
  },

  container: {
    ...appScrollBar,
    maxHeight: 360,
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
  activeText: {
    ...activeText,
  },

  actionbtn: {
    marginTop: 10,
    float: "left",
  },
  actionbtns: {
    marginTop: 20,
    float: "right",
  },
  id: {
    width: "0%",
  },

  po_date: {
    width: "10%",
  },
  po_no: {
    width: "20%",
  },
  po_vendor: {
    width: "40%",
  },
  quantity: {
    width: "5%",
  },

  // for addItem
  itemDetails: { width: "25%" },
  itemImg: { width: "8%" },
  rate: { width: "8%" },
  orderQty: { width: "8%" },
  orderQty_uom: { width: "8%" },
  recievedQty: { width: "10%" },
  nowReceiveField: { width: "15%" },
  balanceQty: { width: "8%" },
  valueField: { width: "13%" },
}));

const SalesReturnListViewPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [classicModal, setClassicModal] = React.useState(false);
  const classes = useStyles();
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [allvendor, setAllVendors] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  const [allItems, setAllItems] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  
  let balance_qty = 0;
  const [error, setError] = React.useState({
  });
  const [billDetail, setBillDetail] = React.useState({
    module: "SALES_RETURN",
    edit: false,
    txt_sales_return_no: "AUTO GENERATED",
    txt_sales_return_date: currentDate(),
    txt_showroom_warehouse: "",
    txt_note: "",
  });
  const [addItemQty, setAddItemQty] = React.useState({});
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [invoiceDetail, setInvoiceDetail] = React.useState({});
  const [showroomWarehouses, setAllShowroomWarehouses] = React.useState([]);

  const onChangeBillDetails = (e) => {
    const { name, value } = e.target;
    if (name === "txt_bill_no") {
      setBillDetail({
        ...billDetail,
        [name]: value,
        [`txt_challan_no`]: value,
      });
    } else {
      setBillDetail({ ...billDetail, [name]: value });
    }
  };
  const onChange = (e, row) => {
    const { name, value } = e.target;

    if (name === `txt_received_qty${row.item_id}`) {
      if (!value) {
        setAddItemQty((prv) => ({
          ...prv,
          [name]: value,
          [`txt_value${row.item_id}`]: 0,
        }));
      } else {
        const balance_qty =
          row.now_dispatch_qty -
          receivedQtyByItem(addedItems, row.item_id);
        
          // console.log(e, "401");
        
          if (balance_qty >= value) {
          const netValue = Number(row.rate) * Number(value);
          const discVal=(Number(row.rate) * Number(value) * Number(row.disc_percentage)/100)          
          const afterDisc= netValue - discVal;

          const gst_Value =
            ((Number(row.gst_percentage) * Number(afterDisc)/100)+ Number(afterDisc));

          setAddItemQty((prv) => ({
            ...prv,
            [name]: value,

            [`txt_value${row.item_id}`]: row.gst_type === 0 ? afterDisc : gst_Value,
          }));
        } else {
          setAddItemQty((prv) => ({
            ...prv,
            [name]: 0,
            [`txt_value${row.item_id}`]: 0,
          }));

          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: {
              msg: " Balanced quantity exhausted",
              msgType: "warning",
            },
          });
        }
        //console.log(row.receivedQty,"RECCC")

        // if(Number(value) <= Number(row.quantity - row.receivedQty))
        //  {
        //   const netValue = Number(row.rate) * Number(value) ;
        //   const gst_Value =(Number(row.rate) * Number(value))*Number(row.gst_percentage)/100;
        //   setAddItemQty((prv) => ({ ...prv, [name]: value,

        //     [`txt_value${row.item_id}`]: netValue + gst_Value,
        //     }))
        // }
        // else{

        //   dispatch({
        //     type: actionTypes.SET_OPEN_MSG,
        //     payload: {
        //       msg: "Received Quantity cannot be greater than balanced quantity",
        //       msgType: "warning",
        //     },
        //   });

        // }
      }
    }

    let balanceQty =
      row.now_dispatch_qty -
      receivedQtyByItem(addedItems, row.item_id);
    if (Number(value) <= Number(balanceQty)) {
      setAddItemQty((prv) => ({ ...prv, [name]: value }));
    } else {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: {
          msg: "Received Quantity cannot be greater than balanced quantity",
          msgType: "warning",
        },
      });
    }
  };

  const receivedQtyByItem = (addedItems, item_id) => {
    let returnVal = 0;

    // console.log(addedItems,"404")
    for (let iCtr = 0; iCtr < addedItems?.length; iCtr++) {
        for(let jCtr = 0; jCtr < addedItems[iCtr].sales_return_item_details.length; jCtr++)
        {
            if (addedItems[iCtr].sales_return_item_details[jCtr]["item_id"] === item_id) {
            returnVal = returnVal + Number(addedItems[iCtr].sales_return_item_details[jCtr].return_qty);
            }
        }
    }
    // console.log("retval", returnVal);
    return returnVal;
  };

  const onSelectDetails = (name, v) => {
    if (v.value === "Vendor") {
      setOpenModel({ ...openModes, newVendor: true });
    } else if (v.value === "openModel") {
      setBillDetail({ ...billDetail, [name]: "" });
    } else {
      setBillDetail({ ...billDetail, [name]: v });
    }
  };
  const fetchData = () => {
    getListVendor(
      (r) => {
        setAllVendors(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    // getListShowroomWarehouse(
    //   (r) => {

    //     console.log("sank403",r)
    //     setAllShowroomWarehouse([
    //       { value: "openModel", label: "Add New Showroom / Warehouse" },
    //       ...r,
    //     ]);
    //     let findshowroom = r.find(
    //       (s, i) => s.value == localStorage.getItem("user_location")
    //     );
        
    //     setBillDetail((prv) => ({
    //       ...prv,
    //       ddl_showroom_warehouse: findshowroom,
    //     }));
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );


    getListShowroomWarehouse(
        
        (r) => {
            // console.log("sank403",r)
          setAllShowroomWarehouses(r);
      setLoading(false);
        },
        (err) => {
      setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );

      if (location.state?.row) {
        // setDirectPurchaseId(location.state?.row.purchase_id);
  
        getReturnListView(
          
          location.state?.row.return_delivery_id,
          // Number(location.state?.row.ddl_status),
         
          (r) => {
            // console.log("sank407",r)
           
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
        else{
        
        getReturnListView(
          
          location.state?.row.return_delivery_id,
          // Number(location.state?.row.ddl_status),
         
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








  };
  
//   console.log(invoiceDetail.invoice_item_details,"4545")
  // on Click Submit
  const onSubmitItemReceived = (e) => {
    e.preventDefault();
    // if (
    //   !billDetail.txt_bill_no ||
    //   !billDetail.ddl_vendor_group ||
    //   !billDetail.txt_bill_value ||
    //   !billDetail.txt_vehicle_no ||
    //   !billDetail.txt_waybill_no
    // ) {
    //   setError({
    //     txt_bill_no: !billDetail.txt_bill_no,
    //     txt_bill_value: !billDetail.txt_bill_value,
    //     ddl_vendor_group: !billDetail.ddl_vendor_group,
    //     txt_vehicle_no: !billDetail.txt_vehicle_no,
    //     txt_waybill_no: !billDetail.txt_waybill_no,
    //   });
    // } else {
      if (false) {
        updateDirectPurchase(
          billDetail,
          addedItems,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Direct Purchase Updated Successfully",
                msgType: "success",
              },
            });
            setClassicModal(true);
            setRefresh(!refresh);
            onClearState();
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      } else {
        let updateItems = [];
        if (invoiceDetail.invoice_item_details.length) {
            invoiceDetail.invoice_item_details.map((item, i) => {
            if (addItemQty[`txt_received_qty${item.item_id}`] > 0) {
              let itemReceived = addItemQty[`txt_received_qty${item.item_id}`];

              updateItems.push({
                item_id: item.item_id,
                return_qty: Number(itemReceived),
                gst_type:item.gst_type,
                uom_id: item.uom_id,
                mrp:item.rate,
                rate: item.rate,
                gst_percentage: item.gst_percentage,
                gst_value:
                  (itemReceived * item.rate * item.gst_percentage) / 100,
                net_value: item.gst_type === 0 ?
                     Number(itemReceived * item.rate ) - Number(item.disc_value) 
                :
                      (Number(itemReceived * item.rate ) - Number(item.disc_value)) + Number(item.gst_value) ,
                      uom_name: item.uom_name,
              });
            }
          });          
        }
       
        postSalesReturn(
          billDetail,
          updateItems,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Sales Return Submitted Successfully",
                msgType: "success",
              },
            });
            onClearState();
            setBillDetail((prv) => ({
              ...prv,
              txt_sales_return_no: r.sales_return_no,
            }));
            setClassicModal(true);
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      }
    //}
  };

  // useEffect
  React.useEffect(() => {
    // console.log("state.row", location?.state.row);
    fetchData();
  }, []);

  const formData = [
    {
      formName: "BillDetails",
      fields: [
        {
          name: "txt_sales_return_no",
          label: "Sales Return No",
          disabled: true,
          hidden: false,
          required: false,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 3,
          defaultValue:"sales_return_no",
        },
        {
          name: "txt_sales_return_date",
          label: "Sales Return Date",
          hidden: false,
          required: false,
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
          name: "ddl_showroom_warehouse",
          label: "Showroom / Warehouse",
          hidden: false,
          required: true,
          data_type: "string",
          html_element: "TextField",
          xs: 12,
          md: 6,
          lg: 3,
        //   defaultValue:"head",
        //   options: {allShowroomWarehouse},
        },
        {
          name: "txt_note",
          label: "Note",
          hidden: false,
          required: false,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 4,
        },
      ],
    },
  ];


  const onClearState = () => {
    setError({});
    setBillDetail({
      ...billDetail,
      txt_bill_date: currentDate(),
      txt_bill_value: "",
      ddl_vendor_group: "",
      txt_challan_date: currentDate(),
      txt_vehicle_no: "",
      txt_waybill_no: "",
      txt_grn_date: currentDate(),
      txt_note: "",
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="Sales > Sales Return" />
      {/* Select and Add Items */}
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Bill Details">
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                 
                    <StyledTableCell align="left">Invoice Date</StyledTableCell>
                    <StyledTableCell align="left">Invoice No</StyledTableCell>
                    <StyledTableCell align="left">Invoice Value</StyledTableCell>
                    <StyledTableCell align="left">Customer</StyledTableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                   
                    <StyledTableCell align="left" className={classes.po_date}>
                      {dateFormate(addedItems.sales_return_date)}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_no}>
                      {addedItems.invoice_no}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_value}>
                      {/* {invoiceDetail.invoice_item_details
                        ? currencyFormate(
                            invoiceDetail.invoice_item_details.reduce(
                              (sum, li) => Number(sum) + Number(li.net_value),
                              0
                            )
                          )
                        : "00"} */}

                        {currencyFormate(addedItems.dispatch_value)}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_vendor}>
                      {addedItems.dispatch_name}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Sales Return Details">
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                  
                    <StyledTableCell align="left">Sales Return No</StyledTableCell>
                    <StyledTableCell align="left">Sales Return Date</StyledTableCell>
                    <StyledTableCell align="left">showroom / Warehouse</StyledTableCell>
                   
                  </TableRow>
                </TableHead>
                <TableBody>

                {/* {console.log(showroomWarehouses[0]?.label,"sank3")} */}
                  <StyledTableRow>
                    
                    <StyledTableCell align="left" className={classes.po_value}>
                      {addedItems.sales_return_no}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_value}>
                      {dateFormate(addedItems.sales_return_date)}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_value}>
                    {showroomWarehouses[0]?.label}
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
          <CustomCard cdTitle="Items in Purchase Order" maxHeight={450}>
            <TableContainer className={classes.container}>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">#</StyledTableCell>
                    <StyledTableCell align="left">Image</StyledTableCell>
                    <StyledTableCell align="left">Item Details</StyledTableCell>
                    <StyledTableCell align="right">Invoice Qty</StyledTableCell>
                    {/* <StyledTableCell align="right">Returned Qty</StyledTableCell>
                    <StyledTableCell align="right">Balance</StyledTableCell> */}
                    <StyledTableCell align="right">Now Returning</StyledTableCell>
                    <StyledTableCell align="right">Rate</StyledTableCell>
                    {/* <StyledTableCell align="right">Discount</StyledTableCell> */}
                    <StyledTableCell align="right">GST%</StyledTableCell>                
                    <StyledTableCell align="right">Value</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
               
                      <StyledTableRow >
                        <StyledTableCell
                          align="center"
                          className={classes.id}
                        >
                    {addedItems.item_id} 
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.itemImg}
                        >
                          <Paper className={classes.itemImgPaper}>
                            <ItemImg item_id={addedItems.item_id} />
                          </Paper>
                        </StyledTableCell>

                        <StyledTableCell
                          align="left"
                          className={classes.itemDetails}
                        >
                          <ItemViewCard item_id={addedItems.item_id} />
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.orderQty}
                        >
                          {addedItems.dispatch_qty}
                         
                        </StyledTableCell>
                        {/* <StyledTableCell
                          align="right"
                          className={classes.recievedQty}
                        >
                          {receivedQtyByItem(
                            addedItems,
                            addedItems.item_id
                          )}
                         
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.balanceQty}
                        >
                          {addedItems.dispatch_qty -
                            receivedQtyByItem(
                              addedItems,
                              addedItems.return_qty
                            )}
                    
                        </StyledTableCell> */}
                        <StyledTableCell
                          align="right"
                          className={classes.nowReceiveField}
                        >
                            {addedItems.return_qty}
                         
                        </StyledTableCell>
                       
                        <StyledTableCell align="right" className={classes.rate}>
                          
                        {currencyFormate(addedItems.rate)}
                        </StyledTableCell>
                       
                        <StyledTableCell align="right" className={classes.rate}>
                          {addedItems.gst_percentage}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.valueField}
                        >
                          
                          {currencyFormate(addedItems.net_value)}
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </StyledTableRow>
                    {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <Box pt={2}>
              <Grid container>
                <Grid item xs={7}>
                  <Box className={classes.tableLabel} ml={9} textAlign="left">
                    Total
                  </Box>
                </Grid>

                <Grid item xs={5}>
                  <Box className={classes.tableLabel} mr={1} textAlign="right">

                    {invoiceDetail.invoice_item_details
                      ? currencyFormate(
                        invoiceDetail.invoice_item_details.reduce(
                            (sum, li) =>
                              Number(sum) +
                              (addItemQty[`txt_value${li.item_id}`] ? Number(addItemQty[`txt_value${li.item_id}`]) : 0),
                            0
                          )
                        )
                      : "0"}
                  </Box>
                </Grid>
              </Grid>
            </Box> */}
          </CustomCard>
        </GridItem>

     
        
      
      </GridContainer>
    </ThemeProvider>
  );
};

export default SalesReturnListViewPage;
