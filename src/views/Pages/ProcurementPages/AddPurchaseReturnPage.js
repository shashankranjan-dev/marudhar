import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../Components/CustomButton";
import { getDirectPurchaseById } from "../../../services/directPurchaseFormService";
import { upadateItemReceived } from "../../../services/ItemReceivedService";
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";
import { getAllPurchaseList, PurchaseReturnById, postJournalFromPurchaseReturn,PurchaseReturnByIdForReturn, postPurchaseReturn,getVendorByVendorName } from "../../../services/PurchaseReturnService";

import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/core";

import { Grid } from "@material-ui/core";
import theme from "../../../theme/theme";

import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  activeText,
  appScrollBar,
} from "assets/jss/material-dashboard-pro-react";
// import { ColoseButton } from "../Components/CustomButton";

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
import ItemViewCard from "../HelperComponent/ItemViewCard";
import PageTitle from "../HelperComponent/PageTitle";
//SERVICE
import { } from "../../../services/ItemReceivedService";
import { getAllVendors, getListVendor } from "../../../services/vendorService";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { Typography } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../Sales/AddEnquiryPage";
import { Box, Paper } from "@material-ui/core";
import ItemImg from "../HelperComponent/ItemImg";
import FormComponent from "../HelperComponent/FormComponent";
import StepProceedModel from "../HelperComponent/StepProceedModel";
import { getAllCustomers } from "../../../services/customerListService";



import {
  currentDate,
  currencyFormate,
  dateFormateField,
} from "../HelperComponent/utils";
import AddPurchaseReturnListPage from "./AddPurchaseReturnListPage";

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
  rate: { width: "12%" },
  orderQty: { width: "8%" },
  orderQty_uom: { width: "8%" },
  gst_value: { width: "8%" },
  net_value: { width: "17%" },
  recievedQty: { width: "10%" },
  nowReceiveField: { width: "15%" },
  rate: { width: "8%" },
  gst_percentage: { width: "15%" },
  balanceQty: { width: "8%" },
  valueField: { width: "13%" },
}));

const AddPurchaseReturnPage = () => {

  const history = useHistory();
  const location = useLocation();
  const [classicModal, setClassicModal] = React.useState(false);
  const classes = useStyles();
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [vendorDetails, setAllVendors] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  const [purchaseRegisterReturn, setAllPurchaseRegisterReturn] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [customerDetail, setCustomerDetails] = React.useState({});

  // const [addSearch, setAddSearch] = React.useState({

  //   txt_po_no: "",
  //   txt_date_from: currentDate(),
  //   txt_date_to: currentDate(),
  //   ddl_vendor_id: "",
  //   txt_keyword_phrase: "",

  // });

  let balance_qty = 0;
  const [error, setError] = React.useState({
    txt_purchase_return_no: false,
    txt_returned_bill_value: false,
    ddl_vendor_group: false,
    txt_challan_no: false,
    txt_vehicle_no: false,
    txt_waybill_no: false,
  });
  const [billDetail, setBillDetail] = React.useState({
    module: "PURCHASE_RETURN_ORDER",
    edit: false,
    purchase_id: "",
    txt_purchase_return_no: "AUTO GENERATED",
    txt_return_date: currentDate(),
    txt_returned_bill_value: "",
    ddl_vendor_group: "",
    txt_challan_no: "",
    txt_challan_date: currentDate(),
    txt_vehicle_no: "",
    txt_waybill_no: "",
    txt_grn_no: "",
    txt_grn_date: currentDate(),
    ddl_showroom_warehouse: "",
    txt_note: "",
  });

  // const [returnDetails, setReturnDetails] = React.useState([])
  const [addItemQty, setAddItemQty] = React.useState({});
  const [retrunValue, setReturnValue] = React.useState(0);

  const [temp_items, setAllTempItems] = React.useState([]);
  const [vendorDetail,setVendorDetail] = React.useState([]);

  const onChangeReturnDetail = (e) => {
    const { name, value } = e.target;
    //console.log(name,value,"99945")
    
    if (name === "txt_purchase_return_no") {
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
    //console.log(row,"sen2004")
    let item_id = row.item_id;
    //console.log(name,'sen20049995')
    
    if (name === `txt_return_qty${item_id}`) {

      if (!value) {
        //console.log("enter if999")
        setAddItemQty((prv) => ({
          ...prv,
          [name]: value,
          [`txt_value${item_id}`]: 0,
        }));

        setBillDetail((prv)=>({
          ...prv,
          retrunQty: 0,
          item_id:item_id,
          txt_returned_bill_value: 0,
        }))
      } else {
      
        const balance_qty = row.recievedQty ? row.recievedQty : row.quantity;
        // const balance_qty =
        //   row.item_details.quantity -
        //   receivedQtyByItem(addedItems.received_item_details,item_id);

        if (balance_qty < value) {

          setAddItemQty((prv) => ({
            ...prv,
            [name]: 0,
            [`txt_value${item_id}`]: 0,
          }));

          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: {
              msg: " Balanced quantity exhausted",
              msgType: "warning",
            },
          });

          
        } else {
          let net_value = Number(row.rate) * Number(value);
          // const gst_Value =
          //   (Number(row.rate) * Number(value) * Number(row.gst_percentage)) /
          //   100;
        if(row.gst_type===1)
        {
        
          let gst_value = (Number(net_value)+ Number(row.gst_percentage))/100
          net_value = Number(net_value) + Number(gst_value);
        }
         
          // let disc_value =  row.item_details[0]?.disc_value;
          let rate = row.rate;
          let gst_value = row.gst_value;

          // setReturnValue( (Number(rate) * Number(value)) + Number(gst_value));
          // setAddItemQty((prv) => ({
          //   ...prv,
          //   [name]: value,

          //   [`txt_value${item_id}`]: (Number(rate) * Number(value)) + Number(gst_value),
          // }));
          setBillDetail((prv)=>({
            ...prv,
            retrunQty: value,
            item_id:item_id,
            txt_returned_bill_value:net_value 
          }))
          // setAllTempItems((prv)=>({
          //   ...prv,[`net_value${row.item_id}`]: row.net_value * value
          // }))
        }
      }
    }

    let balanceQty =
      row.receivedQty -
      receivedQtyByItem(addedItems.received_item_details, item_id);

    if (Number(value) > Number(balanceQty)) {
   
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: {
          msg: "Received Quantity cannot be greater than balanced quantity",
          msgType: "warning",
        },
      });

     
    } else {
      //console.log(value,balanceQty,name,'sen20049995')
      setAddItemQty((prv) => ({ ...prv, [name]: value }));
    }
  };

  // //console.log(retrunValue,addItemQty,"retrunValue")

  const receivedQtyByItem = (received_item_details, item_id) => {
    let returnVal = 0;



    for (let iCtr = 0; iCtr < received_item_details?.length; iCtr++) {
      if (received_item_details[iCtr]["item_id"] == item_id) {
        returnVal = returnVal + Number(received_item_details[iCtr]["receivedQty"]);

      }
    }
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
  
  // useEffect
  React.useEffect(() => {
  
    //console.log(location.state?.row.polVendor,"row1")
    getVendorByVendorName(
      location.state?.row.polVendor,
      (r)=>{
      
        //console.log(r[0].vendor_id,"999d13")
  
        setVendorDetail(r[0]);
  
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
      PurchaseReturnById(
        //passing values
        location.state?.row.grn,
        location.state?.row.module,
        location.state?.row.purchase_id,
        (purchaseRegisterReturn) => {

          //console.log(purchaseRegisterReturn,"777a")
          setAllPurchaseRegisterReturn(purchaseRegisterReturn);
  
          getAllVendors(
            (vendorDetails) => {
              setAllVendors(vendorDetails);
            },
            (err) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: { msg: err, msgType: "error" },
              });
              // setLoading(false);
            },
            purchaseRegisterReturn[0].vendor_id
          );
          // setLoading(false);   
   
  
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
          // setLoading(false);
        },
        // addSearch
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
  
      if (location.state?.row) {
        setBillDetail((prv) => ({
          ...prv,
          purchase_id: location.state?.row.purchase_id,
        }));
  
       
      }
   

  }, [refresh]);

  //console.log(purchaseRegisterReturn,"29035a")
  //console.log(billDetail?.txt_returned_bill_value,"310302")
  
  // //console.log(addItemQty.txt_return_qty[`${purchaseRegisterReturn[0].received_item_details?.item_id}`],"29035a")
  
  // on Click Submit
  const onSubmitPurchaseReturn = (e) => {

    let updatedItem = [];
    let journal_details=[];
    let grandTotal = 0;
    e.preventDefault();
    if (
      !billDetail.txt_vehicle_no ||
      !billDetail.txt_waybill_no
    ) {
      setError({
        txt_vehicle_no: !billDetail.txt_vehicle_no,
        txt_waybill_no: !billDetail.txt_waybill_no,
      });
    } else {

      journal_details.push({
        amount:Number(billDetail?.txt_returned_bill_value),
        dr_cr: 1,
        ddl_ledger :location.state?.row.polVendor,
        ddl_ledger_id: vendorDetail.vendor_id,
      })

      if (purchaseRegisterReturn[0].received_item_details.length){  
        
        purchaseRegisterReturn[0].received_item_details.map((item) => {

          //console.log(item,"29rech")
          // if (addItemQty[`txt_received_qty${item.item_id}`] > 0) {
          let itemReceived = addItemQty[`txt_return_qty${item.item_id}`];
          updatedItem.push({
            item_id: item.item_id,
            uom_id: item.uom_id,
            uom_name: item.uom_name,
            return_qty:Number(itemReceived),
            gst_percentage: item.gst_percentage,
            rate: item.rate,
            remainQty:item.receivedQty?Number(item.receivedQty)-Number(itemReceived):Number(item.quantity) - Number(itemReceived),
            receivedQty: item.receivedQty?Number(item.receivedQty):Number(item.quantity),
            disc_percentage: item.disc_percentage? Number(item.disc_percentage) : 0
          })
          journal_details.push({
            amount:Number(item.net_value),
            dr_cr: 2,
            ddl_ledger :"Purchase Return",
            ddl_ledger_id: 2735,
          })
        // }
        })
      }
  
     
      postPurchaseReturn(
        // returnDetails,
        billDetail,
        billDetail.ddl_showroom_warehouse?.value,
        // purchaseRegisterReturn[0].vendor_id,
        // purchaseRegisterReturn[0].billVendor,
        purchaseRegisterReturn,
        updatedItem,
        journal_details,
        billDetail?.txt_returned_bill_value,
location.state?.row.polVendor,
        (r) => {
          //console.log("dong 1");
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: {
              msg: "Purchase return Submitted Successfully",
              msgType: "success",
            },
          });
          onClearState();
          setBillDetail((prv) => ({
            ...prv,
            txt_purchase_return_no: r.purchase_return_no
          }));
          setClassicModal(true);
        },
        (err) => {
          //console.log("dong 2");
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );

      //   postJournalFromPurchaseReturn(
      //     billDetail,
      //     journal_details,
      //     billDetail?.txt_returned_bill_value,
      //     location.state?.row.polVendor
      // // (r) => {
      // //   dispatch({
      // //     type: actionTypes.SET_OPEN_MSG,
      // //     payload: {
      // //       msg: "Direct Purchase Approved Successfully",
      // //       msgType: "success",
      // //     },
      // //   });
      
      // //   setClassicModal(true);
      // // },
      // // (err) => {
      // //   dispatch({
      // //     type: actionTypes.SET_OPEN_MSG,
      // //     payload: { msg: err, msgType: "error" },
      // //   });
      // // }
      //   );


    }
  };



  const formData = [
    {
      formName: "PurchaseReturnDetails",
      fields: [
        {
          name: "txt_purchase_return_no",
          label: "Purchase Return No",
          hidden: false,
          required: false,
          disabled: true,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 3,
        },
        {
          name: "txt_return_date",
          label: "Return Date",
          hidden: false,
          required: false,
          align: "left",
          data_type: "date",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 2,
        },
        {
          name: "txt_returned_bill_value",
          label: "Returned Bill Value",
          hidden: false,
          align: "right",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 2,
        },


        {
          name: "txt_challan_no",
          label: "Challan No",
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
          name: "txt_challan_date",
          label: "Challan Date",
          hidden: false,
          required: false,
          align: "left",
          data_type: "date",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 2,
        },
        {
          name: "txt_vehicle_no",
          label: "Vehicle No",
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
          name: "txt_waybill_no",
          label: "Way Bill No",
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
        // {
        //   name: "txt_grn_no",
        //   label: "GRN No",
        //   hidden: false,
        //   required: true,
        //   align: "left",
        //   data_type: "string",
        //   html_element: "TextField",
        //   error: false,
        //   xs: 12,
        //   md: 4,
        //   lg: 3,
        // },
        // {
        //    name:"ddl_vendor_group",
        //    label:"vendor",
        //    hidden:false,
        //    required:true,
        //    data_type:"string",
        //    html_element:"select_two",
        //    xs:12,
        //    md:6,
        //    lg:3,
        //    options:allvendor, 

        // },


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
          lg: 6,
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
      txt_return_date: currentDate(),
      txt_returned_bill_value: "",
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
      <PageTitle title="Procurement > Purchase Return Add " />
      {/* Select and Add Items */}
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Bill Details">
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {/* <StyledTableCell align="left">GRN No</StyledTableCell>
                    <StyledTableCell align="left">GRN Date</StyledTableCell> */}
                    <StyledTableCell align="left">Bill Date</StyledTableCell>
                    <StyledTableCell align="left">Bill No</StyledTableCell>
                    <StyledTableCell align="left">GRN No.</StyledTableCell>
                    <StyledTableCell align="left">Bill Value</StyledTableCell>
                    <StyledTableCell align="left">Vendor</StyledTableCell>
                    {/* <StyledTableCell align="left">Status</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>

                  {purchaseRegisterReturn.map((row, i) =>
                  (
                    <StyledTableRow>
                     <StyledTableCell align="left" className={classes.po_date}>
                        {row.billDate}
                     </StyledTableCell>

                      <StyledTableCell align="left" className={classes.po_no}>
                      {row.billNo}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.po_no}>
                      {location.state?.row.grn}
                      </StyledTableCell>
                      
                      <StyledTableCell align="left" className={classes.po_value}>
                        {row.billValue}
                      </StyledTableCell>

                      <StyledTableCell align="left" className={classes.po_vendor}>
                        {row.billVendor}
                      </StyledTableCell>

                    </StyledTableRow>
                  ) 
                   )}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Items in Bill" maxHeight={450}>
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
                    <StyledTableCell align="right">Recd Qty</StyledTableCell>
                    <StyledTableCell align="right">Return Qty</StyledTableCell>
                    <StyledTableCell align="right">Rate</StyledTableCell>
                    <StyledTableCell align="right">Dis %</StyledTableCell>
                    <StyledTableCell align="right">Dis Value</StyledTableCell>
                    <StyledTableCell align="right">GST Percentage</StyledTableCell>
                    <StyledTableCell align="right">GST Value</StyledTableCell>
                    <StyledTableCell align="right">Net Value</StyledTableCell>
                </TableRow>
                </TableHead>

                <TableBody>

                 {/* {//console.log(purchaseRegisterReturn,"sen1908")}
                 {//console.log(location.state?.row.grn,"sen1909")} */}
                  {
                    
                    purchaseRegisterReturn[0]?.received_item_details.map((row, i) =>
                  (
                    
                    //console.log(row.grn_no,"777a1"),

                    location.state?.row.grn === row.grn_no || location.state?.row.grn === purchaseRegisterReturn[0].grn_no ?
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
                        className={classes.recievedQty}
                      >
                        {row.receivedQty ? row.receivedQty : row.quantity}
                        {/* {row.received_item_details.length > 0 ?
                          row.received_item_details.receivedQty :
                            row.item_detail.quantity} */}

                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.nowReceiveField}
                      >
                     
                        <TextField
                          size="small"
                          placeholder="Now Return"
                          name={`txt_return_qty${ row.item_id}`}
                          style={{ marginBottom: -20, width: 90 }}
                          type="number"
                          value={addItemQty[`txt_return_qty${row.item_id}`]}
                          onChange={(e) => onChange(e, row)}
                          inputProps={{ style: { textAlign: "right" } }}
                          id="outlined-basic"
                          fullWidth={true}
                          variant="outlined"
                        />
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.rate}
                      >
                        {row.rate}
                        {/* {row.received_item_details.length > 0 ? 
                          row.received_item_details.rate : 
                            row.item_details.rate} */}

                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.disc_percentage}
                      >
                        {row.disc_percentage}
                        {/* {row.item_details ? row.item_details.disc_percentage :""} */}

                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.disc_value}
                      >
                        {row.disc_value}
                        {/* {row.item_details? row.item_details.disc_value :""} */}

                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.gst_percentage}
                      >
                        {row.gst_percentage}
                        {/* {row.received_item_details.length>0? row.received_item_details.gst_percentage :row.item_details.gst_percentage} */}

                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.gst_value}
                      >
                        {row.gst_value}
                        {/* {row.received_item_details.length>0? row.received_item_details.gst_value:row.item_details.gst_value} */}

                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.net_value}
                      >
                        {row.net_value}
                        {/* {row.received_item_details.length>0? row.received_item_details.net_value:row.item_details.net_value} */}

                      </StyledTableCell>
                      </StyledTableRow>
                      :''
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <Box pt={2}>
              <Grid container>
                <Grid item xs={7}>
                  Total
                </Grid>

                <Grid item xs={5}>
                  <Box className={classes.tableLabel} mr={1} textAlign="right">

                    {/* {//console.log(purchaseRegisterReturn,"77")} */}
                    {
                      purchaseRegisterReturn[0]?.received_item_details.reduce((sum,li)=> Number(sum) + Number(li.net_value),0)
                    }

                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CustomCard>
        </GridItem>

        <GridItem xs="12">
          <CustomCard
            cdTitle="Return Details"
            width="100%"
            height="100%"
            style={{ marginTop: 0 }}
          >
            {formData.map((form, fkey) => {
              return (
                <GridContainer key={fkey} style={{ padding: "5px 20px" }}>
                  {form.formName === "PurchaseReturnDetails" &&
                    form.fields.map((item, key) => {
                      return (
                        <>
                          <FormComponent
                            item={item}
                            key={key}
                            onMenuOpen={onMenuOpen}
                            onSelect={onSelectDetails}
                            state={billDetail}
                            onChange={onChangeReturnDetail}
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
              onClick={onSubmitPurchaseReturn}
              className={classes.actionbtn}
              variant="outlined"
              color="primary"
            >
              Submit
            </Button>
          </div>
        </GridItem>
        {/* {//console.log(billDetail, "billDetail")} */}
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
            history.push("/admin/procurement/add-purchase-return");
          }}
        >
          <StepProceedModel
            step={1}
            isStep={false}
            title="Thank you"
            desc=" Your Purchase Return No"
            generateNo={`${billDetail.txt_purchase_return_no}`}
          />




        </MasterModel>
      </GridContainer>
    </ThemeProvider>
  );
};

export default AddPurchaseReturnPage;
