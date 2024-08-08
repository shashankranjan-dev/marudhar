import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
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
import {updateSalesRetrun,getAllSalesReturnForEdit,getInvoiceBySalesIdEdit,getLedgerByCustomerName,postJournalFromDispatchReturn} from "../../../../services/salesRetrunServices"
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
import { getAllOtherChargesChecking } from "services/DrectSalesOrder/DirectInvoiceOrderService";

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
  const [ledgerDetail, setLedgerDetails] = React.useState([])
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  
  const [chargesValue, setChargesValue] = React.useState(0);
  const [grandTotal, setGrandTotal] = React.useState(0);
  const [otherChargesOption, setOtherChargesOption] = React.useState({});
  const [otherChargesOption1, setOtherChargesOption1] = React.useState({});
  const [options, setOptions] = React.useState([]);
  const option = [
    { value: "+", label: "+" },
    { value: "-", label: "-" },
  ];

  let balance_qty = 0;
  let total = 0;
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

    // //console.log(row,"404")

    if (name === `txt_received_qty${row.item_id}`) {

      if (!value) {
        setAddItemQty((prv) => ({
          ...prv,
          [name]: value,
          [`txt_value${row.item_id}`]: 0,
        }));
      } else {

        const balance_qty =
          receivedQtyByItem(addedItems, row.item_id);

        // //console.log(addedItems[0].sales_return_item_details[0].return_qty, "404");

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

    let returnedQty = receivedQtyByItem(addedItems, row.item_id);
    //console.log(returnedQty,"4045")
    if(!value){
      setAddItemQty((prv) => ({ ...prv, [name]: 0 }));
    }else{
      if (Number(value) <= Number(returnedQty)) {

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
    }
   
  };



  const receivedQtyByItem = (addedItems, item_id) => {
    let returnVal = 0;

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

    //console.log(location.state?.row,"888y")

    
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
        sales_id: location.state?.row.sales_return_id,
      }));

      getInvoiceBySalesIdEdit(
        location.state?.row.invoice_no,
        (items) => {
          //console.log(items,"4045")
          setLoading(false);
          setInvoiceDetail(items);
          setBillDetail((prv) => ({
            ...prv,
            customer_id: items.customer_id,
          }));
          
          getAllSalesReturnForEdit(
            location.state?.row.sales_return_id,
            (its) => {
              //console.log("srs", its);
              setAddedItems(its);
             
              setOtherCharges((prevCharges) => {
                let chargesValueAmount = 0;
                const mappedCharges = its[0]?.sales_return_other_charges?.map((data) => {
                  // Determine whether to increase or decrease grand total based on charge_type
                  data.charge_type === '+' ? (chargesValueAmount += parseFloat(data.charge_amount)) : (chargesValueAmount -= parseFloat(data.charge_amount));
              
                  return {
                    chargesValue: data.charge_amount,
                    otherChargesOption: { label: data.charges, value: data.charges },
                    otherChargesOption1: { value: data.charge_type, label: data.charge_type },
                  };
                });
              
                // Update grand total after the map is finished
                setGrandTotal(chargesValueAmount);
              
                return mappedCharges;
              });
            },
            (err) => {
              //console.log("Not possible");
            },

            location.state?.row
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

  // //console.log("Bill details 666", sales_return_id);
// //console.log(addedItems[0].sales_return_item_details[0].return_qty,"4046")
  // on Click Submit
  //console.log("sen10/return", invoiceDetail);
  const onSubmitItemReceived = (e) => {
    let chargesItems = [];
    let journal_details = [];
    e.preventDefault();

    journal_details.push({
      amount: total,
      dr_cr: 2,
      ddl_ledger: ledgerDetail.ledger_name, //invoiceDetail[0]?.enqCustomer,
      ddl_ledger_id: ledgerDetail.ledger_id
    });
    // //console.log(ledgerDetail.ledger_name,"name")

    journal_details.push({
      amount: total,
      dr_cr: 1,
      ddl_ledger: "Sales Return",
      ddl_ledger_id: 2736,
    });


    otherCharges.map((item, index) => {
        // console.log("hello->" ,item.otherChargesOption.value);
        getAllOtherChargesChecking(
          item.otherChargesOption.value,
          (r) => {
            //console.log(r, "sen2357g")
            journal_details.push({
              amount: Number(item.chargesValue),
              dr_cr: item.otherChargesOption1.value === "-" ? 2 : 1,
              ddl_ledger: item.otherChargesOption.value,
              ddl_ledger_id:r.ledgerAccount,
            })
          })
        // console.log(journal_details,'502');

        chargesItems.push({
          charges: item.otherChargesOption.value,
          charge_amount: item.chargesValue,
          charge_type: item.otherChargesOption1.value,
        });
    });

    const grandTotalValue = invoiceDetail.invoice_item_details.reduce((sum, li) => Number(sum) + (addItemQty[`txt_value${li.item_id}`] ? Number(addItemQty[`txt_value${li.item_id}`]) : 0),0) +  Number(grandTotal);

    let updateItems = [];
    if (invoiceDetail.invoice_item_details.length) {
      invoiceDetail.invoice_item_details.map((item, i) => {

        //console.log(item, "8898")

        if (addItemQty[`txt_received_qty${item.item_id}`] > 0) {

          let itemReceived = addItemQty[`txt_received_qty${item.item_id}`];

          updateItems.push({
            item_id: item.item_id,
            quantity: item.now_dispatch_qty,
            return_qty: addedItems[0]?.sales_return_item_details[0]?.return_qty - Number(itemReceived),
            actualRetrun: Number(itemReceived),
            balanceQty: item.now_dispatch_qty - Number(itemReceived),
            uom_id: item.uom_id,
            rate: item.rate,
            disc_value: item.disc_value,
            disc_percentage: item.disc_percentage,
            gst_percentage: item.gst_percentage,
            gst_value:
              ((Number(itemReceived) * (item.rate - Number(item.disc_value))) * item.gst_percentage) / 100,

            net_value: item.gst_type === 0 ?
              (Number(itemReceived) * (item.rate - Number(item.disc_value)))
              :
              (Number(itemReceived) * (item.rate - Number(item.disc_value))) + Number(item.gst_value),
            uom_name: item.uom_name,
          });

          updateSalesRetrun(
            location.state?.row.sales_return_id,
            updateItems,
            "Dispatch",
            billDetail,
            chargesItems,
            
            invoiceDetail,
            journal_details,
            grandTotalValue,
            location.state?.row.salesRetNo,

            globalState?.user?.serial_id,


            (r) => {
              setButtonDisabled(true);

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

          /************* COMMENT FOR NOT ABLE TO SEND ALL OTHER CHARGES TO JOURNAL AND RE DIRECTED TO UPDATE SALES RETURN FUNCTION *****************/
          // postJournalFromDispatchReturn(
          //   invoiceDetail,
          //   journal_details,
          //   grandTotalValue,
          //   location.state?.row.salesRetNo,
          //   (r) => {
          //     dispatch({
          //       type: actionTypes.SET_OPEN_MSG,
          //       payload: {
          //         msg: "Post JOURNAL",
          //         msgType: "success",
          //       },
          //     });
          //     // setClassicModal(true);
          //     // setRefresh(!refresh);
          //     // // onClearState();
          //     console.log(journal_details,'5021')
          //   },
          //   (err) => {
          //     dispatch({
          //       type: actionTypes.SET_OPEN_MSG,
          //       payload: { msg: err, msgType: "error" },
          //     });
          //   }
          // );
        }
        else{
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: "Please Enter Actual Return", msgType: "error" },
          });
        }

      });
    }
    //console.log("Add Item qty", addItemQty);
    //console.log("Update items", updateItems);






  };
  // useEffect
  React.useEffect(() => {
    //console.log("state.row", location?.state.row.salesRetCustomer);
    fetchData();
    getLedgerByCustomerName(
      location?.state.row.salesRetCustomer,
      (r)=>{
        //console.log(r[0],"999d13")
  
        setLedgerDetails(r[0]);
  
        // ledger_account_id.push(r);
        //ledger_account_id = r[0]?.ledger_id;
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
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
      <PageTitle title="Sales > Edit Delivery Order Return" />
      {/* Select and Add Items */}
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Delivery Order Return Details">
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
          <CustomCard cdTitle="Edit Items in Dispatch Order Return" maxHeight={450}>
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
                    {/* <StyledTableCell align="right">Return Qty</StyledTableCell> */}
                    <StyledTableCell align="right">Actual Return Qty</StyledTableCell>
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

                        {/* <StyledTableCell
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
                        </StyledTableCell> */}

                        <StyledTableCell
                          align="right"
                          className={classes.nowReceiveField}
                        >
                          <TextField
                            size="small"
                            placeholder="Actual Return Qty"
                            name={`txt_received_qty${row.item_id}`}
                            style={{ marginBottom: -20, width: 90 }}
                            type="number"
                            value={addItemQty[`txt_received_qty${row.item_id}`]}
                            onChange={(e) => onChange(e, row)}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            variant="outlined"
                            onClick={(e) => { e.target.select() }}
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
                      ? currencyFormate( total =
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
                      style={reactSelectStyles}
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
            history.push("/admin/sales/dispatch-return-page");
          }}
        >
          <StepProceedModel
            step={1}
            isStep={false}
            title="Thank you"
            desc=" Your GRN No"
            generateNo={billDetail.txt_sales_return_no}
          />
        </MasterModel>
      </GridContainer>
    </ThemeProvider>
  );
};

export default NewSalesReturnPageForm;
