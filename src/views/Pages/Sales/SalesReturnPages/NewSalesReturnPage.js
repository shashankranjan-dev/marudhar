import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
// import Select from "@material-ui/core/Select";
// import Select from "@material-ui/core/Select";
import Select from "react-select";
import { IconButton, OutlinedInput } from "@material-ui/core";
//import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../../Components/MasterModel";
import { CustomCard } from "../../../Components/CustomCard";
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
import { getInvoiceBySalesId, getAllSalesReturn, postSalesReturn } from "../../../../services/invoiceLIstService";

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
import { } from "../../../../services/ItemReceivedService";
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
import { getAllOtherCharges } from "services/OtherChargesService";

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

const NewSalesReturnPageForm = () => {
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

  const [chargesValue, setChargesValue] = React.useState(0);
  const [grandTotal, setGrandTotal] = React.useState(0);
  const [otherChargesOption, setOtherChargesOption] = React.useState({});
  const [otherChargesOption1, setOtherChargesOption1] = React.useState({});
  const [options, setOptions] = React.useState([]);
  const option = [
    { value: "+", label: "+" },
    { value: "-", label: "-" },
  ];

const userId = globalState?.user?.serial_id;
  let balance_qty = 0;
  const [error, setError] = React.useState({
  });
  const [billDetail, setBillDetail] = React.useState({
    module: "SALES_RETURN",
    edit: false,
    txt_sales_return_no: "AUTO GENERATED",
    txt_sales_return_date: currentDate(),
    ddl_showroom_warehouse: "",
    txt_note: "",
  });
  const [addItemQty, setAddItemQty] = React.useState({});
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [invoiceDetail, setInvoiceDetail] = React.useState({});
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

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
  // const onChange = (e, row) => {
  //   const { name, value } = e.target;

  //   if (name === `txt_received_qty${row.item_id}`) {
  //     if (!value) {
  //       setAddItemQty((prv) => ({
  //         ...prv,
  //         [name]: value,
  //         [`txt_value${row.item_id}`]: 0,
  //       }));
  //     } else {
  //       const balance_qty =
  //         row.now_dispatch_qty -
  //         receivedQtyByItem(addedItems, row.item_id);

  //         // //console.log(e, "401");

  //         if (balance_qty >= value) {
  //         const netValue = Number(row.rate) * Number(value);
  //         const discVal=(Number(row.rate) * Number(value) * Number(row.disc_percentage)/100)          
  //         const afterDisc= netValue - discVal;

  //         const gst_Value =
  //           ((Number(row.gst_percentage) * Number(afterDisc)/100)+ Number(afterDisc));

  //         setAddItemQty((prv) => ({
  //           ...prv,
  //           [name]: value,

  //           [`txt_value${row.item_id}`]: row.gst_type === 0 ? afterDisc : gst_Value,
  //         }));
  //       } else {
  //         setAddItemQty((prv) => ({
  //           ...prv,
  //           [name]: 0,
  //           [`txt_value${row.item_id}`]: 0,
  //         }));

  //         dispatch({
  //           type: actionTypes.SET_OPEN_MSG,
  //           payload: {
  //             msg: " Balanced quantity exhausted",
  //             msgType: "warning",
  //           },
  //         });
  //       }
  //       ////console.log(row.receivedQty,"RECCC")

  //       // if(Number(value) <= Number(row.quantity - row.receivedQty))
  //       //  {
  //       //   const netValue = Number(row.rate) * Number(value) ;
  //       //   const gst_Value =(Number(row.rate) * Number(value))*Number(row.gst_percentage)/100;
  //       //   setAddItemQty((prv) => ({ ...prv, [name]: value,

  //       //     [`txt_value${row.item_id}`]: netValue + gst_Value,
  //       //     }))
  //       // }
  //       // else{

  //       //   dispatch({
  //       //     type: actionTypes.SET_OPEN_MSG,
  //       //     payload: {
  //       //       msg: "Received Quantity cannot be greater than balanced quantity",
  //       //       msgType: "warning",
  //       //     },
  //       //   });

  //       // }
  //     }
  //   }

  //   let balanceQty =
  //     row.now_dispatch_qty -
  //     receivedQtyByItem(addedItems, row.item_id);
  //   if (Number(value) <= Number(balanceQty)) {
  //     setAddItemQty((prv) => ({ ...prv, [name]: value }));
  //   } else {
  //     dispatch({
  //       type: actionTypes.SET_OPEN_MSG,
  //       payload: {
  //         msg: "Received Quantity cannot be greater than balanced quantity",
  //         msgType: "warning",
  //       },
  //     });
  //   }
  // };

     //OTHER CHARGES BUTTONS
     const onClickAddOtherCharges = (r) => {
      if (chargesValue != null && chargesValue != undefined && chargesValue != '') {
       
        if (otherChargesOption?.value === undefined && otherChargesOption1?.value === undefined){
          setOtherCharges([...otherCharges, {
            chargesValue,
            otherChargesOption:{ 
              value: options[0].value,
              label: options[0].value
            },
            otherChargesOption1:{ 
              value: option[0].value,
              label: option[0].value
            },
    
          }])
        }else if(otherChargesOption.value === undefined){
          setOtherCharges([...otherCharges, {
            chargesValue,
            otherChargesOption:{ 
              value: options[0].value,
              label: options[0].value
            },
            otherChargesOption1,
    
          }])
         }else if(otherChargesOption1.value === undefined){
        setOtherCharges([...otherCharges, {
          chargesValue,
          otherChargesOption,
          otherChargesOption1:{ 
            value: option[0].value,
            label: option[0].value}
  
        }])
       }else {
        setOtherCharges([...otherCharges, {
          chargesValue,
          otherChargesOption,
          otherChargesOption1
  
        }])
      }
        //console.log(options[0].value, "111a");
        //console.log(otherChargesOption1, "111a");
        
        if (otherChargesOption1.value === "+" || otherChargesOption1.value === undefined) {
          setGrandTotal(Number(grandTotal) + Number(chargesValue))
        }
        else {
          setGrandTotal(Number(grandTotal) - Number(chargesValue))
        }
        setChargesValue('')
        setOtherChargesOption({})
        setOtherChargesOption1({})
      }
      else {
        setGrandTotal(Number(grandTotal) + Number(chargesValue))
      }
    };
  
    const onClickDeleteChar = (r, id) => {
      if (otherCharges[id].otherChargesOption1.value == "+") {
        setGrandTotal(Number(grandTotal) - Number(otherCharges[id].chargesValue));
      } else {
        setGrandTotal(Number(grandTotal) + Number(otherCharges[id].chargesValue));
      }
  
      const restItem = otherCharges.filter((a, i) => id !== i);
      setOtherCharges(restItem);
    };

  const onChange = (e, row) => {
    const { name, value } = e.target;
    setButtonDisabled(false);

    //console.log(row, "sen0305")
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


        if (balance_qty >= value) {
          const discVal = Number(row.rate) - Number(row.disc_value);
          const netValue = discVal * Number(value);

          const afterDisc = netValue - discVal;

          //console.log(Number(row.rate) - Number(row.disc_value), "40112");
          //console.log(netValue, "40112");
          //console.log(afterDisc, "40112");
          const gst_Value =
            ((Number(row.gst_percentage) * Number(netValue) / 100) + Number(netValue));
          //console.log(gst_Value, "40112");
          setAddItemQty((prv) => ({
            ...prv,
            [name]: value,

            [`txt_value${row.item_id}`]: row.gst_type === 0 ? netValue : gst_Value,
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

    //console.log(addedItems, "404")
    for (let iCtr = 0; iCtr < addedItems?.length; iCtr++) {
      for (let jCtr = 0; jCtr < addedItems[iCtr].sales_return_item_details.length; jCtr++) {
        if (addedItems[iCtr].sales_return_item_details[jCtr]["item_id"] === item_id) {
          returnVal = returnVal + Number(addedItems[iCtr].sales_return_item_details[jCtr].return_qty);
        }
      }
    }
    //console.log("retval", returnVal);
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

    getListShowroomWarehouse(
      (r) => {
        setAllShowroomWarehouse([
          { value: "openModel", label: "Add New Showroom / Warehouse" },
          ...r,
        ]);
        let findshowroom = r.find(
          (s, i) => s.value == localStorage.getItem("user_location")
        );
        setBillDetail((prv) => ({
          ...prv,
          ddl_showroom_warehouse: findshowroom,
        }));
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    getAllOtherCharges(
      (r) => {
        console.log(r,'Other Charges')
        setOptions(
          r.map((chargeType) => ({
            name: chargeType.charges,
            value: chargeType.charges,
            label: chargeType.charges,
          }))
        );
      },
      () => null
    );

    if (location.state?.row) {
      setBillDetail((prv) => ({
        ...prv,
        invoice_no: location.state?.row.inv_invoice_no,
        sales_id: location.state?.row.sales_id,
      }));

      getInvoiceBySalesId(
        location.state?.row.sales_id,
        location.state?.row.inv_invoice_no,
        (items) => {
          setLoading(false);
          setInvoiceDetail(items);
          setBillDetail((prv) => ({
            ...prv,
            customer_id: items.customer_id,
          }));

          getAllSalesReturn(
            (its) => {
              //console.log("srs", its);
              setAddedItems(its);
            },
            (err) => {
              //console.log("Not possible");
            },

            { txt_invoice_no: location.state?.row.inv_invoice_no }
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
  };

  //console.log(invoiceDetail.invoice_item_details, "4545")
  // on Click Submit
  const onSubmitItemReceived = (e) => {
    e.preventDefault();

    
    let chargesItem = [];
    otherCharges.map((item, index) => {
      //console.log("hello->" + item.otherChargesOption.value);
      chargesItem.push({
        charges: item.otherChargesOption.value,
        charge_amount: item.chargesValue,
        charge_type: item.otherChargesOption1.value,
      });
    });
    // console.log(chargesItem,'chargesItem')

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
              gst_type: item.gst_type,
              uom_id: item.uom_id,
              mrp: item.rate,
              rate: item.rate,
              gst_percentage: item.gst_percentage,
              gst_value:
                ((Number(itemReceived) * (item.rate - Number(item.disc_value))) * item.gst_percentage) / 100,

              net_value: item.gst_type === 0 ?
                (Number(itemReceived) * (item.rate - Number(item.disc_value)))
                :
                (Number(itemReceived) * (item.rate - Number(item.disc_value))) + Number(item.gst_value),
              uom_name: item.uom_name,
            });
          }
        });
      }
      //console.log("Add Item qty", addItemQty);
      //console.log("Update items", updateItems);
      //console.log("Bill details", billDetail);
      
      
      updateItems.length>0?
      postSalesReturn(
        billDetail,
        updateItems,
        chargesItem,
        userId,
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
      )
      :
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Please Enter Value", msgType: "error" },
      });
    }
    setButtonDisabled(true);

    //}
  };

  // useEffect
  React.useEffect(() => {
    //console.log("state.row", location?.state.row);
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
          html_element: "select_two",
          xs: 12,
          md: 6,
          lg: 3,
          options: allShowroomWarehouse,
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
  // to get latest vendor when click the ddl menu
  const onMenuOpen = () => {
    // getListVendor(
    //   (r) => {
    //     setAllVendors([{ value: "Vendor", label: "Add New Vendor" }, ...r]);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );
  };

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
          <CustomCard cdTitle="Sales Return Details">
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {/* <StyledTableCell align="left">GRN No</StyledTableCell>
                    <StyledTableCell align="left">GRN Date</StyledTableCell> */}
                    <StyledTableCell align="left">Invoice Date</StyledTableCell>
                    <StyledTableCell align="left">Invoice No</StyledTableCell>
                    <StyledTableCell align="left">Invoice Value</StyledTableCell>
                    <StyledTableCell align="left">Customer</StyledTableCell>
                    {/* <StyledTableCell align="left">Status</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    {/* <StyledTableCell align="left" className={classes.po_no}>
                      {addedItems.grn_no}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_date}>
                      {addedItems.grn_date}
                    </StyledTableCell> */}
                    <StyledTableCell align="left" className={classes.po_date}>
                      {invoiceDetail.invoice_date}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_no}>
                      {invoiceDetail.invoice_details?.invoice_no}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_value}>
                      {invoiceDetail.invoice_item_details
                        ? currencyFormate(
                          invoiceDetail.invoice_item_details.reduce(
                            (sum, li) => Number(sum) + Number(li.net_value),
                            0
                          )
                        )
                        : "00"}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_vendor}>
                      {invoiceDetail.enqCustomer}
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
                    <StyledTableCell align="right">Returned Qty</StyledTableCell>
                    <StyledTableCell align="right">Balance</StyledTableCell>
                    <StyledTableCell align="right">Now Returning</StyledTableCell>
                    <StyledTableCell align="right">Rate</StyledTableCell>
                    <StyledTableCell align="right">Discount</StyledTableCell>
                    <StyledTableCell align="right">GST%</StyledTableCell>
                    {/* <StyledTableCell align="left">Unit</StyledTableCell> */}
                    <StyledTableCell align="right">Value</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {/* {//console.log(invoiceDetail, "chk0")} */}
                  {invoiceDetail?.invoice_item_details &&
                    invoiceDetail.invoice_item_details.map((row, i) => (
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
                          className={classes.itemDetails}
                        >
                          <ItemViewCard item_id={row.item_id} />
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.orderQty}
                        >
                          {row.now_dispatch_qty}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.recievedQty}
                        >
                          {receivedQtyByItem(
                            addedItems,
                            row.item_id
                          )}
                          {/* {addItemQty[[`receivedQty_${row.item_id}`]]
                            ? addItemQty[`receivedQty_${row.item_id}`]
                            : "0"} */}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.balanceQty}
                        >
                          {row.now_dispatch_qty -
                            receivedQtyByItem(
                              addedItems,
                              row.item_id
                            )}
                          {/* {Number(row.quantity) -
                            Number(
                              addItemQty[[`receivedQty_${row.item_id}`]]
                                ? addItemQty[[`receivedQty_${row.item_id}`]]
                                : 0
                            )} */}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.nowReceiveField}
                        >
                          <TextField
                            size="small"
                            placeholder="Now Received"
                            name={`txt_received_qty${row.item_id}`}
                            style={{ marginBottom: -20, width: 90 }}
                            type="number"
                            value={addItemQty[`txt_received_qty${row.item_id}`]}
                            onChange={(e) => onChange(e, row)}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            variant="outlined"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.rate}>
                          <TextField
                            size="small"
                            placeholder="Rate"
                            name={`txt_rate${row.item_id}`}
                            style={{ marginBottom: -20, width: 90 }}
                            type="number"
                            value={row.rate}
                            onChange={(e) => onChange(e, row)}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            variant="outlined"
                          />
                          {/* {currencyFormate(row.rate)} */}
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.rate}>
                          <TextField
                            size="small"
                            placeholder="Disc Percentage"
                            name={`txt_disc_percentage${row.item_id}`}
                            style={{ marginBottom: -20, width: 90 }}
                            type="number"
                            value={row.disc_percentage}
                            onChange={(e) => onChange(e, row)}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            variant="outlined"
                          />
                          {/* {currencyFormate(row.rate)} */}
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.rate}>
                          {row.gst_percentage}
                        </StyledTableCell>

                        {/* <StyledTableCell
                          align="left"
                          className={classes.orderQty}
                        >
                          {row.uom_id}
                        </StyledTableCell> */}

                        {/* CGSt field */}

                        <StyledTableCell
                          align="right"
                          className={classes.valueField}
                        >
                          <TextField
                            size="small"
                            placeholder="Value"
                            name={`txt_value${row.item_id}`}
                            style={{ marginBottom: -20, width: 90 }}
                            type="number"
                            value={addItemQty[`txt_value${row.item_id}`]}
                            onChange={(e) => onChange(e, row)}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            variant="outlined"
                          />
                          {/* {currencyFormate(row.net_value)} */}
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
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
            </Box>

            <Box pt={3}>
                <Grid
                  container
                  style={{
                    paddingLeft: "10px",
                    fontWeight: "normal",
                    borderBottom: "1px solid #E0E0E0",
                    paddingBottom: "10px",
                  }}
                >
                  <Grid item xs={3} style={{ paddingLeft: "130px" }}>
                    Other Charges
                  </Grid>
                  {/* {//console.log(otherChargesOption[0]?.value,"852")} */}
                  <Grid item xs={4}>
                    <Select
                      options={options}
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      onChange={(event) =>
                        setOtherChargesOption({
                          label: event.value,
                          value: event.value,
                        })
                      }
                      styles={reactSelectStyles}
                      value={otherChargesOption[0]?.value}
                      defaultValue={options[0] ? options[0] : options[1]}
                    />
                  </Grid>

                  <Grid item xs={1} style={{ paddingLeft: "15px" }}>
                    <Select
                      options={option}
                      defaultValue={option[0] ? option[0] : option[1]}
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      onChange={(event) =>
                        setOtherChargesOption1({
                          value: event.value,
                          label: event.value,
                        })
                      }
                      value={otherChargesOption1[0]?.value}
                    />
                  </Grid>

                  <Grid item xs={1} style={{ paddingLeft: "10px" }}>
                    <TextField
                      size="small"
                      placeholder="Charges"
                      name="txt_charge"
                      style={{ marginBottom: -15 }}
                      type="number"
                      inputProps={{ style: { textAlign: "right" } }}
                      id="outlined-basic"
                      fullWidth={true}
                      required={true}
                      value={chargesValue}
                      onChange={(event) => setChargesValue(event.target.value)}
                      variant="outlined"
                      onClick={(e) => { e.target.select() }}
                    />
                  </Grid>

                  <Grid item xs={2} style={{ paddingLeft: "10px" }}>
                    <Button
                      onClick={() => onClickAddOtherCharges()}
                      style={{ marginTop: -2 }}
                      className={classes.addBtn}
                      size="small"
                      varient="outlined"
                      color="primary"
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
            </Box>

            <Table
                aria-label="customized table"
                style={{ width: "100%", align: "right" }}
              >
                {otherCharges.map((item, index) => {
                  {
                    //console.log("on map function", item);
                  }
                  return (
                    <TableRow>
                      <StyledTableCell align="right" width="85%">
                        {" "}
                        {item.otherChargesOption.value}
                      </StyledTableCell>
                      <StyledTableCell align="right" width="10%">
                        {item.otherChargesOption1.value}&nbsp;&nbsp;
                        {item.chargesValue}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        width="5%"
                        className={classes.deleteAction}
                      >
                        <IconButton
                          onClick={(e) => onClickDeleteChar(e, index)}
                          aria-label="delete"
                          className={classes.margin}
                        >
                          <DeleteIcon
                            fontSize="small"
                            style={{ color: "#f44336", textAlign: "left" }}
                          />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  );
                })}
              </Table>

              <Box pt={2}>
                <Grid
                  container
                  style={{ paddingLeft: "20px", fontWeight: "normal" }}
                >
                  <Grid item xs={10} align="right">
                    Grand Total
                  </Grid>

                  <Grid item xs={2}>
                    <Box
                      className={classes.tableLabel}
                      mr={5}
                      textAlign="right"
                    >
                    {/* { //console.log(grandTotal,"8686")} */}
                      {invoiceDetail.invoice_item_details
                        ?
                        currencyFormate(
                          invoiceDetail.invoice_item_details.reduce(
                            (sum, li) =>
                              Number(sum) +
                              (addItemQty[`txt_value${li.item_id}`] ? Number(addItemQty[`txt_value${li.item_id}`]) : 0),
                            0
                          ) +  Number(grandTotal),
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
            {formData.map((form, fkey) => {
              return (
                <GridContainer key={fkey} style={{ padding: "5px 20px" }}>
                  {form.formName === "BillDetails" &&
                    form.fields.map((item, key) => {
                      return (
                        <>
                          <FormComponent
                            item={item}
                            key={key}
                            onMenuOpen={onMenuOpen}
                            onSelect={onSelectDetails}
                            state={billDetail}
                            onChange={onChangeBillDetails}
                            error={error}
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
              onClick={onSubmitItemReceived}
              className={classes.actionbtn}
              variant="outlined"
              color="primary"
              disabled={buttonDisabled}

            >
              Submit
            </Button>
          </div>
        </GridItem>

        <MasterModel
          classicModal={classicModal}
          onCloseModel={() => setClassicModal(false)}
          width={600}
          closeIcon={false}
          height="auto"
          addTodobtn
          closeBtn={false}
          okbtnWith={200}
          appLogo
          modelName=""
          okBtnText="OK"
          onClickOk={(e) => {
            e.preventDefault();
            setClassicModal(false);
            history.push("/admin/sales/invoices-sales-return");
          }}
        >
          <StepProceedModel
            step={1}
            isStep={false}
            title="Thank you"
            desc=" Your Return Delivery No"
            generateNo={billDetail.txt_sales_return_no}
          />
        </MasterModel>
      </GridContainer>
    </ThemeProvider>
  );
};

export default NewSalesReturnPageForm;
