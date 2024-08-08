import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import Select from "react-select";

import MuiTable from "../../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../../Components/MasterModel";
import { CustomCard } from "../../../Components/CustomCard";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../../Components/CustomButton";

//IMPORT SERVICE OF SERVICES
import { getAllCustomers,getCustomerById } from "../../../../services/customerListService";

import { getListSources } from "../../../../services/sourceService";
import { getListUom } from "../../../../services/uomService";
import { getListCustomers } from "../../../../services/customerListService";
import {
  getLedgerByCustomerName,
  // postJournalFromInvoice,
  postDirectInvoiceOrder,
  getAllOtherCharges,
  getAllOtherChargesChecking,
} from "../../../../services/DrectSalesOrder/DirectInvoiceOrderService";
import { getSearchItem } from "../../../../services/saleService/addEnqueryService";
import { getListStatus } from "../../../../services/addStatusService";
import { getListUsers } from "../../../../services/associateService";
import { getListShowroomWarehouse } from "../../../../services/showroomWarehouseService";
import { ledger_check_by_customer_name } from "../../../../services/DrectSalesOrder/DirectSalesOrderService";

import { Checkbox } from "@material-ui/core";
import ReactSelect from "react-select";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Paper } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider, Box } from "@material-ui/core";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import ViewListIcon from "@mui/icons-material/ViewList";

import theme from "../../../../theme/theme";

import React from "react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";

// import { ColoseButton } from "../Components/CustomButton";
import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appScrollBar,
  appDefaultFamily,
  appFontWeight,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@material-ui/core";
import ItemViewCard from "../../HelperComponent/ItemViewCard";
import PageTitle from "../../HelperComponent/PageTitle";
import {
  currentDate,
  calculatePer,
  calculatePerValue,
  currencyFormate,
} from "../../HelperComponent/utils";
import StepProceedModel from "../../../Pages/HelperComponent/StepProceedModel";
// import StepProceedModel from "views/Pages/HelperComponent/StepProceedModel";
import { useStateValue } from "../../../../context/context";
import { actionTypes } from "../../../../context/reducer";
import FormComponent from "../../HelperComponent/FormComponent";
import ItemImg from "../../HelperComponent/ItemImg";
import { Typography } from "@material-ui/core";
import AddCustomerPage from "../../CustomerPage/CustomerPage";
import { StyledTableCell, StyledTableRow } from "../AddEnquiryPage";
import { timestamp } from "services/Utils/utils";
// import { getInvoiceBySalesId } from "../../../../services/DirectInvoiceOrderService";

const option = [
  { value: "+", label: "+" },
  { value: "-", label: "-" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  itemImgPaper: {
    marginRight: "15px",
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

  container: {
    ...appScrollBar,
    maxHeight: 360,
  },
  customSelect: {
    marginBottom: 15,
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 15,
    padding: "15px 20px",
  },
  activeText: {
    ...activeText,
  },
  input: {
    height: 40,
    lineLight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
  actionbtns: {
    marginTop: 20,
    float: "right",
  },

  id: {
    width: "5%",
  },
  doubleFiled: {
    width: "20%",
  },
  txt: { width: "10%" },
  quantity_field: { width: "8%" },

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
    width: "55%",
  },
  itemDetailsView: {
    width: "20%",
  },
  quantity: {
    width: "20%",
  },
  viewQuantity: {
    width: "10%",
  },
  net_value_field: {
    width: "8%",
  },
  Disc: {
    width: "5%",
  },
  deleteAction: {
    width: "5%",
  },
  id: {
    width: "5%",
  },
  doubleFiled: {
    width: "20%",
  },

  discFiled: {
    width: "10%",
  },
  action: {
    width: "5%",
  },
  rate: {
    width: "10%",
  },
  value: {
    width: "15%",
  },
  itemDetails: {
    width: "20%",
  },
  quantity: {
    width: "15%",
  },
  net_value_field: {
    width: "15%",
  },
  discValueFiled: {
    width: "10%",
  },
  Disc: {
    width: "5%",
  },
  valueField: {
    width: "8%",
  },
  viewValue: {
    width: "7%",
  },
}));

const AddDirectQuotationPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allUoms, setAllUoms] = React.useState([]);
  const [allCustomers, setAllCustomers] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [allsources, setAllSources] = React.useState([]);
  const [allUser, setAllUsers] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [openModes, setOpenModel] = React.useState({
    addNewCustomer: false,
    newSource: false,
  });
  let iflag = 0;
  let iNewFlag = 0;
  let ledger_account_id=0;
  const [temp_items, setAllTempItems] = React.useState([]);
  const [saleOrderNo, setSaleOrderNo] = React.useState("AUTO GENERATED");
  const [quotationNo, setQuotationNo] = React.useState("AUTO GENERATED");
  const [enquiryNo, setEnquiryNo] = React.useState("AUTO GENERATED");
  const [invoiceNo,setInvoiceNo] = React.useState("AUTO GENERATED");

  const [enquiryDetails, setEnquiryDetails] = React.useState([]);
  const [quotationDetails, setQuotationDetails] = React.useState([]);
  const [hasBeenSubmitted, setHasBeenSubmitted] = React.useState(false);
  const [allItems, setAllItems] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  //otherchanges states
  const [options, setOptions] = React.useState([]);
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [chargesValue, setChargesValue] = React.useState(0);
  const [otherChargesOption, setOtherChargesOption] = React.useState({});
  const [otherChargesOption1, setOtherChargesOption1] = React.useState({});
  const [grandTotal, setGrandTotal] = React.useState(0);
  const [customerDetail, setCustomerDetails] = React.useState([]);
  const [gstDisable, setGstDisable] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [ledgerDetail,setLedgerDetails] = React.useState([])
  const [billDetail, setBillDetail] = React.useState({
    edit: false,
    sales_order_id: "",
    customer_id:'',
    enquiry_no: enquiryNo,
    quotation_no: quotationNo,
    txt_sales_order_no: saleOrderNo,
    txt_invoice_order_date: currentDate(),
    // ddl_sales_source: "",
    ddl_customer: "",
    enquiry_status: "",
    quotation_status: "",
    sales_status: "",
    ddl_sales_executive: "",
    ddl_sales_showroom: "",
    txt_sales_delivery_date: currentDate(),
    txt_sales_delivery_end: currentDate(),
    txt_sales_note: "",
    txt_invoice_no: invoiceNo,
  });
  const [checked, setChecked] = React.useState([]);
  let gt =0;
  

  const [uomError, setUomError] = React.useState({});
  const [error, setError] = React.useState({
    ddl_customer: false,
    // ddl_sales_source: false,
    ddl_sales_showroom: false,
    ddl_sales_executive: false,
  });

  const [itemDetail, setItemDetail] = React.useState({});
  // search State
  const [checkLedger, setCheckLedger] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [other_charges_ledger, set_other_charges_ledger] = React.useState([]);
  // search Query
  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setSearchQuery(value);
  };

  // select Add UOM
  const onSelectUOM = (info, v) => {
    setItemDetail({ ...itemDetail, [info.name]: v });
  };

  // on Click add Item
  const onClickAddItem = (r) => {
    if (addedItems.find((v, i) => v.item_id === r.item_id)) {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Item already added", msgType: "info" },
      });
      setItemDetail({
        [`txt_quantity${r.id}`]: r.quantity,
        [`txt${r.item_id}`]: "",
      });
    } else {
      // if (!itemDetail[`ddl_uom${r.id}`]?.value) {
      //   setUomError({
      //     [`ddl_uom${r.id}`]: !itemDetail[`ddl_uom${r.id}`],
      //   });
      // } else {
      //   setUomError({ ...uomError, [`ddl_uom${r.id}`]: false });
      if (itemDetail[`txt_quantity${r.id}`] === 0){
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: `Please Enter Quantity`,
            msgType: "error",
          },
        });
      } 
      else{
      setAddedItems([
        ...addedItems,
        {
          
          showroom_warehouse_id: Number(localStorage.getItem("user_location")),
          item_id: r.item_id,

          uom_name: r.uom_name,
          uom_id: r.uom_id,
          quantity: Number(itemDetail[`txt_quantity${r.id}`]),
          now_dispatch_qty:Number(itemDetail[`txt_quantity${r.id}`]),
          rate: Number(itemDetail[`txt_rate${r.id}`]),
          disc_percentage: Number(itemDetail[`txt_disc_per${r.id}`]),
          disc_value: Number(itemDetail[`txt_disc_value${r.id}`]),
          gst_percentage: Number(itemDetail[`txt_gst_per${r.id}`]),
          gst_value: Number(itemDetail[`txt_gst_value${r.id}`]),
          gst_type: Number(itemDetail[`gst_type${r.id}`]),
          net_value: Number(itemDetail[`txt_net_value${r.id}`]),
        },
      ]);
      setEnquiryDetails([
        ...enquiryDetails,
        {
          item_id: r.item_id,
          uom_name: r.uom,
          uom_id: r.uom_id,
          quantity: itemDetail[`txt_quantity${r.id}`],
          rate: itemDetail[`txt_rate${r.id}`],
        },
      ]);
      setQuotationDetails([
        ...quotationDetails,
        {
          item_id: r.item_id,

          uom_name: r.uom,
          uom_id: r.uom_id,
          quantity: itemDetail[`txt_quantity${r.id}`],
          rate: itemDetail[`txt_rate${r.id}`],
          disc_percentage: itemDetail[`txt_disc_per${r.id}`],
          disc_value: itemDetail[`txt_disc_value${r.id}`],
          gst_percentage: itemDetail[`txt_gst_per${r.id}`],
          gst_value: itemDetail[`txt_gst_value${r.id}`],
          net_value: itemDetail[`txt_net_value${r.id}`],
        },
      ]);

      setItemDetail({
        ...itemDetail,
        [`ddl_uom${r.id}`]: "",
        [`txt_quantity${r.id}`]: "",
        [`txt_rate${r.id}`]: "",
        [`txt_disc_per${r.id}`]: "",
        [`txt_disc_value${r.id}`]: "",
        [`txt_gst_value${r.id}`]: "",
        [`txt_net_value${r.id}`]: "",
      });
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: {
          msg: `Item added`,
          msgType: "success",
        },
      });
      }
    }
  };

  const onChangeBillDetails = (e) => {
    const { name, value } = e.target;
    setBillDetail({ ...billDetail, [name]: value });
  };


  const onClickDeleteChar = (r, id) => {
    if (otherCharges[id].otherChargesOption1.value == "+") {

      setGrandTotal(Number(grandTotal) - Number(otherCharges[id].chargesValue));

    }
    else {
      setGrandTotal(Number(grandTotal) + Number(otherCharges[id].chargesValue));
    }

    const restItem = otherCharges.filter((a, i) => id !== i);
    setOtherCharges(restItem);




  }
  const onSelectDetails = (name, v) => {
    ////console.log(v.label,"999s")
    ////console.log(name,"999s")
    if (v.value === "addNewCustomer") {
      setOpenModel({ ...openModes, addNewCustomer: true });
      setBillDetail({ ...billDetail, [name]: "" });
    } else if (v.value === "openModal") {
      setBillDetail({ ...billDetail, [name]: "" });
    } else {
      setBillDetail({ ...billDetail, [name]: v });
    }

    if(name === "ddl_customer"){
      ledger_check_by_customer_name(
        v.value,
        v.label,
        'C',
        (r)=>{
          setCheckLedger(r);
          if(r.status_code=='failed'){
            setHasBeenSubmitted(true);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: 'Ledger name not match with this customer', msgType: "error" },
            });
          }
          else if(r.status_code=='success'){
            setHasBeenSubmitted(false);
          }
        },
        (err)=>{
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        },
      )

      getCustomerById(
     
        (r) => {

          setCustomerDetails(r);
          // //console.log("HK", customerDetail)
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        },
        v.value
      );
    }
  };

  // on change Row Item
  const onChange = (e, row) => {
    const { name, value } = e.target;

    setGstDisable(true);
    if (name === `chk_gst${row.item_id}`) {
     
      if (e.target.checked) {
        iflag = 1;

        //console.log("ticked",itemDetail)

        setGstDisable(false);

        const rate = Number(temp_items[`txt_rate${row.item_id}`])
        const qty = Number(temp_items[`txt_quantity${row.item_id}`])

        const disc_percentage = itemDetail[`txt_disc_per${row.item_id}`] ? Number(itemDetail[`txt_disc_per${row.item_id}`]) : 0;
        let discValue = itemDetail[`txt_disc_value${row.item_id}`] ? itemDetail[`txt_disc_value${row.item_id}`] : calculatePerValue(disc_percentage, rate);
        const afterDiscRate = rate - discValue;
        const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);

        // const gst_value = Number(Number(afterDiscRate) * (Number(gst_rate) / 100)).toFixed(2);

        const gst_amount = Number(Number(afterDiscRate) * Number(qty) * (Number(gst_rate) / 100)).toFixed(2);

        // const netValue = Number( afterDiscRate + gst_amount );

        const netValue = Number(Number(qty) * afterDiscRate) + Number(gst_amount);

        //console.log(disc_percentage,"55dp")
        //console.log(discValue,"55dv")
       
        setItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_quantity${row.item_id}`]: qty,
          [`txt_rate${row.item_id}`]: afterDiscRate,
          [`txt_disc_value${row.item_id}`]: discValue,
          [`txt_gst_per${row.item_id}`]: gst_rate,
          [`txt_gst_value${row.item_id}`]: gst_amount,
          [`txt_net_value${row.item_id}`]: netValue.toFixed(2),
          [`gst_type${row.item_id}`]: 1,
        }));
        //}

      }
      else {
        iflag = 2;

        //console.log("not ticked")

        setGstDisable(true);
        const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);
        const rate = Number(temp_items[`txt_rate${row.item_id}`])
        const qty = Number(temp_items[`txt_quantity${row.item_id}`])
        const disc_percentage = itemDetail[`txt_disc_per${row.item_id}`] ? Number(itemDetail[`txt_disc_per${row.item_id}`]) : 0;

        //console.log("not ticked....", qty)
        let discValue = itemDetail[`txt_disc_value${row.item_id}`] ? itemDetail[`txt_disc_value${row.item_id}`] : calculatePerValue(disc_percentage, rate);

        const afterDiscRate = rate - discValue;

        const netValue = qty * afterDiscRate;

        setItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_quantity${row.item_id}`]: qty,
          [`txt_net_value${row.item_id}`]: (netValue).toFixed(2),
          [`txt_rate${row.item_id}`]: afterDiscRate,
          [`txt_disc_value${row.item_id}`]: discValue,
          [`txt_gst_value${row.item_id}`]: 0,
          [`txt_gst_per${row.item_id}`]: gst_rate,
          [`gst_type${row.item_id}`]: 0,
        }));
        // }

      }
    }

    // Discount Percent Check
    if (name === `txt_disc_per${row.item_id}`) {

      const rate = Number(temp_items[`txt_rate${row.item_id}`])
      const qty = Number(temp_items[`txt_quantity${row.item_id}`])
      const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);


      if (!value) {


        let gst_amount = Number((Number(rate) * Number(qty)) * (Number(gst_rate) / 100)).toFixed(2);
        let ticked = document.querySelector(`input[name="chk_gst${row.item_id}"]`);

        //console.log(gst_amount,"tick 55")
       
        if (ticked.checked){
          const netValue = Number(qty * rate) +  Number(gst_amount)
          setItemDetail((prv) => ({
            ...prv,
            [name]: value,
            [`txt_quantity${row.item_id}`]: qty,
            [`txt_rate${row.item_id}`]: rate,
            [`txt_net_value${row.item_id}`]: Number((netValue).toFixed(2)),
            [`txt_gst_value${row.item_id}`]: gst_amount,
            [`txt_disc_value${row.item_id}`]: 0,
            [`txt_disc_rate${row.item_id}`]: 0,
          }));
        }else{
          const netValue = qty * rate;
          setItemDetail((prv) => ({
            ...prv,
            [name]: value,
            [`txt_quantity${row.item_id}`]: qty,
            [`txt_rate${row.item_id}`]: rate,
            [`txt_net_value${row.item_id}`]: Number((netValue).toFixed(2)),
            // [`txt_gst_value${row.item_id}`]: 0,
            [`txt_disc_value${row.item_id}`]: 0,
            [`txt_disc_rate${row.item_id}`]: 0,
          }));
        }

      }
      else {
        let netValue = 0;
        let gst_amount = 0;
        let tick = 0;
        let discValue = calculatePerValue(value, rate);
        const afterDiscRate = Number(temp_items[`txt_rate${row.item_id}`]) - discValue;

        let ticked = document.querySelector(`input[name="chk_gst${row.item_id}"]`);
        if (ticked.checked) {
          tick = 1
          //console.log("Hello World444", gst_rate);
          gst_amount = Number((Number(afterDiscRate) * Number(qty)) * (Number(gst_rate) / 100)).toFixed(2);

          //console.log("Hello World666", gst_amount);
          netValue = Number(Number(qty) * afterDiscRate) + Number(gst_amount);
        }

        else {
          tick = 0
          //console.log("Hello World555");
          netValue = qty * afterDiscRate;
        }

        //console.log("Hello World777", gst_amount);
        setItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_quantity${row.item_id}`]: qty,
          [`txt_rate${row.item_id}`]: afterDiscRate,
          [`txt_disc_per${row.item_id}`]: value,
          [`txt_disc_value${row.item_id}`]: discValue,
          [`txt_net_value${row.item_id}`]: (netValue).toFixed(2),
          [`txt_gst_per${row.item_id}`]: gst_rate,
          [`txt_gst_value${row.item_id}`]: gst_amount,
          [`gst_type${row.item_id}`]: tick,
        }));
      }
    }
    // Discount Value Check
    else if (name === `txt_disc_value${row.item_id}`) {

      const rate = Number(temp_items[`txt_rate${row.item_id}`])
      const qty = Number(temp_items[`txt_quantity${row.item_id}`])
      const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);


      if (!value) {


        let gst_amount = Number((Number(rate) * Number(qty)) * (Number(gst_rate) / 100)).toFixed(2);
        let ticked = document.querySelector(`input[name="chk_gst${row.item_id}"]`);

        if (ticked.checked){
          const netValue = Number(qty * rate) +  Number(gst_amount);
          setItemDetail((prv) => ({
            ...prv,
            [name]: value,
            [`txt_quantity${row.item_id}`]: qty,
            [`txt_rate${row.item_id}`]: rate,
            [`txt_net_value${row.item_id}`]: Number((netValue).toFixed(2)
            ),
            [`txt_disc_value${row.item_id}`]: 0,
            [`txt_gst_per${row.item_id}`]: gst_rate,
            [`txt_gst_value${row.item_id}`]: gst_amount,
            [`txt_disc_per${row.item_id}`]: 0,
          }));

        }else{
        const netValue = qty * rate;
        setItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_quantity${row.item_id}`]: qty,
          [`txt_rate${row.item_id}`]: rate,
          [`txt_net_value${row.item_id}`]: Number((netValue).toFixed(2)),
          [`txt_disc_value${row.item_id}`]: 0,
          [`txt_disc_per${row.item_id}`]: 0,
          [`txt_gst_per${row.item_id}`]: gst_rate,
          [`txt_gst_value${row.item_id}`]: gst_amount,
        }));
      }

      }
      else {
        let netValue = 0;
        let gst_amount = 0;
        let tick = 0;
        let discPer = calculatePer(value, rate);
        let discValue = value;
        const afterDiscRate = Number(temp_items[`txt_rate${row.item_id}`]) - discValue;

        let ticked = document.querySelector(`input[name="chk_gst${row.item_id}"]`);
        if (ticked.checked) {
          tick = 1;
         
          gst_amount = Number((Number(afterDiscRate) * Number(qty)) * (Number(gst_rate) / 100)).toFixed(2);

          
          netValue = Number(Number(qty) * afterDiscRate) + Number(gst_amount);
        }

        else {
          tick = 0;
         
          netValue = qty * afterDiscRate;
        }

       
        setItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_quantity${row.item_id}`]: qty,
          [`txt_rate${row.item_id}`]: afterDiscRate,
          [`txt_disc_per${row.item_id}`]: discPer,
          [`txt_disc_value${row.item_id}`]: discValue,
          [`txt_net_value${row.item_id}`]: (netValue).toFixed(2),
          [`txt_gst_per${row.item_id}`]: gst_rate,
          [`txt_gst_value${row.item_id}`]: gst_amount,
          [`gst_type${row.item_id}`]: tick,
        }));
      }
    }

    ////quantity check
    else if (name === `txt_quantity${row.item_id}`) {

      setAllTempItems((prv) => ({
        ...prv,
        [`txt_quantity${row.item_id}`]: value,
      }));


      const rate = Number(temp_items[`txt_rate${row.item_id}`])
      const disc_percentage = itemDetail[`txt_disc_per${row.item_id}`] ? Number(itemDetail[`txt_disc_per${row.item_id}`]) : Number(temp_items[`txt_disc_per${row.item_id}`])
      const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);
      // let discValue = disc_percentage ? calculatePerValue(disc_percentage, rate) : 0;
      let discValue = itemDetail[`txt_disc_value${row.item_id}`] ? itemDetail[`txt_disc_value${row.item_id}`] : calculatePerValue(disc_percentage, rate);
      const afterDiscRate = rate - discValue;
      let gst_amount = 0;
      let netValue = 0;
      let tick = 0;
      let ticked = document.querySelector(`input[name="chk_gst${row.item_id}"]`);

      //console.log(afterDiscRate, gst_amount,rate,discValue, "qty netvalue");
      //console.log(disc_percentage, "qty disc_percentage");
      //console.log(temp_items,"qty")

      if (ticked.checked) {
        tick = 1;
        //console.log("Hello World444", gst_rate);
        gst_amount = Number((Number(afterDiscRate) * Number(value)) * (Number(gst_rate) / 100)).toFixed(2);

        //console.log("Hello World666", gst_amount);
        netValue = Number(Number(value) * afterDiscRate) + Number(gst_amount);
      }

      else {
        //console.log("Hello World555");
        netValue = value * afterDiscRate;
      }

      //   const netValue = value * afterDiscRate;

      if (!value) {
        setItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_net_value${row.item_id}`]: Number(
            (netValue).toFixed(2)
          ),
          [`txt_quantity${row.item_id}`]: 0,
          [`txt_disc_value${row.item_id}`]: 0,
          [`txt_gst_per${row.item_id}`]: gst_rate,
        }));

      } else {
        //console.log("else55", rate, discValue,)
        // if (name === `chk_gst${row.item_id}`) {
        setItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_quantity${row.item_id}`]: value,
          [`txt_net_value${row.item_id}`]: (netValue).toFixed(2),
          [`txt_rate${row.item_id}`]: afterDiscRate,
          [`txt_disc_value${row.item_id}`]: discValue,
          [`txt_gst_per${row.item_id}`]: gst_rate,
          [`txt_gst_value${row.item_id}`]: gst_amount,
          [`gst_type${row.item_id}`]: tick,
        }));
      }
    }

    // }

  };


  const fetchData = () => {
    // list All User
    getListUsers(
      (r) => {
        setAllUsers([{ value: "openModal", label: "Add New User" }, ...r]);
        if (globalState?.user?.serial_id) {
          let findUser = r.find(
            (s, i) => s.value == globalState?.user?.serial_id
          );
          setBillDetail((prv) => ({
            ...prv,
            ddl_sales_executive: findUser,
          }));
        }
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    // list All Status
    getListStatus(
      "Sales",
      (r) => {
        r.forEach((s, i) => {
          if (s.label === "New") {
            setBillDetail((prv) => ({
              ...prv,
              enquiry_status: s.value,
            }));
          } else if (s.label === "Quoted") {
            setBillDetail((prv) => ({
              ...prv,
              quotation_status: s.value,
            }));
          } else if (s.label === "Sales Order") {
            setBillDetail((prv) => ({
              ...prv,
              sales_status: s.value,
            }));
          }
        });
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    // list All User
    getListUom(
      (r) => {
        setAllUoms(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    // list All Custoner
    getListCustomers(
      (r) => {
        setAllCustomers([
          { value: "addNewCustomer", label: "Add New Customer" },
          ...r,
        ]);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    // list All Showrooms_warehouse
    getListShowroomWarehouse(
      (r) => {
        setAllShowroomWarehouse([
          { value: "openModal", label: "Add New Showroom / warehouse" },
          ...r,
        ]);
        let findUom = r.find(
          (s, i) => s.value == localStorage.getItem("user_location")
        );
        setBillDetail((prv) => ({ ...prv, ddl_sales_showroom: findUom }));
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    // list All Source
    getListSources(
      (r) => {
        setAllSources(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    // list All User
    getListUsers(
      (r) => {
        setAllUsers([{ value: "openModal", label: "Add New User" }, ...r]);
        if (globalState?.user?.serial_id) {
          let findUser = r.find(
            (s, i) => s.value == globalState?.user?.serial_id
          );
          setBillDetail((prv) => ({
            ...prv,
            ddl_sales_executive: findUser,
          }));
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
  // search Item by api
  const onSearchItem = () => {
    if (searchQuery) {
      getSearchItem(
        (items) => {
          setAllItems(items);
          items.map((r, i) => {

            setAllTempItems((prv) => ({
              ...prv,
              // [`txt_quantity${r.id}`]: 0,
              [`txt_gst_per${r.id}`]: r.cgst_percentage,
              [`txt_gst_value${r.id}`]: 0,
              [`txt_disc_per${r.id}`]: 0,
              [`txt_disc_value${r.id}`]: 0,
              [`txt_rate${r.id}`]: r.mrp,
              [`txt_net_value${r.id}`]: 0,
            [`txt_uom${r.id}`]:{ value: r.uom_id, label: r.uom_name },

            }));
            
            setItemDetail((prv) => ({
              ...prv,
              [`txt_quantity${r.id}`]: 0,
              [`txt_gst_per${r.id}`]: r.cgst_percentage,
              [`txt_gst_value${r.id}`]: 0,
              [`txt_disc_per${r.id}`]: 0,
              [`txt_disc_value${r.id}`]: 0,
              [`txt_rate${r.id}`]: r.mrp,
              [`txt_net_value${r.id}`]: 0,
              [`txt_uom${r.id}`]:{ value: r.uom_id, label: r.uom_name },

            }));
          });
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        },
        searchQuery
      );
    }
  };

  // Delete Added Item
  const onDeleteItem = (e, id) => {
    const restItem = addedItems.filter((a, i) => id !== i);
    setAddedItems(restItem);
    dispatch({
      type: actionTypes.SET_OPEN_MSG,
      payload: {
        msg: `Item Deleted`,
        msgType: "success",
      },
    });
  };

  // useEffect
  React.useEffect(() => {

    
    getAllOtherCharges(
      (r) => {
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


    if (searchQuery.length >= 6) {
      onSearchItem();
    } else {
      setAllItems([]);
    }
  }, [searchQuery]);

  const onClickAddOtherCharges = (r) => {
   
    if (chargesValue != null && chargesValue != undefined && chargesValue != '') {
     
      if (otherChargesOption.value === undefined && otherChargesOption1.value === undefined){
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
      // //console.log(options[0].value, "111a");
      // //console.log(otherChargesOption1, "111a");
      // //console.log(chargesValue, "111a");
      
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
  



  React.useEffect(() => {
    fetchData();

  }, [globalState.refresh]);

 //console.log(addedItems,"404")

  // on Click Submit Invoice
  const onClickSubmitInvoiceOrder = (e) => {
    // //console.log(gt, "666");
    e.preventDefault();
    // let ledger_account_id=0;
    let chargesItems = [];
    let journal_details=[];
    let sales_details=[]
    
  //   otherCharges.map((item, index) => {
  //  //   //console.log("hello->" + item.otherChargesOption.value);
  //     chargesItems.push({
  //       charges: item.otherChargesOption.value,
  //       charge_amount: item.chargesValue,
  //       charge_type: item.otherChargesOption1.value,
  //     });
  //   });

   
    if (
      !billDetail.ddl_customer ||
      !billDetail.ddl_sales_executive ||
      !billDetail.ddl_sales_showroom 
      // !billDetail.ddl_sales_source
    ) {
      setError({
        ddl_customer: !billDetail.ddl_customer,
        // ddl_sales_source: !billDetail.ddl_sales_source,
        ddl_sales_showroom: !billDetail.ddl_sales_showroom,
        ddl_sales_executive: !billDetail.ddl_sales_executive,
      });
    } else {
      // //console.log(addedItems, "added item");
      // //console.log(chargesItems, "charges item");
      // //console.log(allCustomers, "customer");
      //  //console.log(billDetail.ddl_customer?.value,"customer id");
    
  
      // if( billDetail.ddl_customer?.label){
  // getLedgerByCustomerName(
  //   billDetail.ddl_customer?.label,
  //   (r)=>{
  //     //console.log(r[0]?.ledger_id,"999d13")

  //     setLedgerDetails(r);

  //     // ledger_account_id.push(r);
  //     //ledger_account_id = r[0]?.ledger_id;
  //   },
  //   (err) => {
  //     dispatch({
  //       type: actionTypes.SET_OPEN_MSG,
  //       payload: { msg: err, msgType: "error" },
  //     });
  //   }
  // );
// }

      
// //console.log(customerDetail,"999d1")
//console.log(ledgerDetail,"999d1")
     
      addedItems.map((r,i)=>{
        journal_details.push({
          amount:gt,
          dr_cr: 1,
          ddl_ledger :billDetail.ddl_customer?.label,
          ddl_ledger_id: ledgerDetail.ledger_id,
        }),
        journal_details.push({
          amount:r.net_value,
          dr_cr: 2,
          ddl_ledger :"Sales",
          ddl_ledger_id:2530,
        })
      });
      otherCharges.map((item, index) => {
        //   //console.log("hello->" + item.otherChargesOption.value);
        getAllOtherChargesChecking(
          item.otherChargesOption.value,
          (r) => {
            //console.log(r, "sen2357g")
            journal_details.push({
              amount: Number(item.chargesValue),
              dr_cr: item.otherChargesOption1.value === "-" ? 1 : 2,
              ddl_ledger: item.otherChargesOption.value,
              ddl_ledger_id:r.ledgerAccount,
            })
          })
    
      
        chargesItems.push({
          charges: item.otherChargesOption.value,
          charge_amount: item.chargesValue,
          charge_type: item.otherChargesOption1.value,
        });
      });
      //console.log(journal_details,"999d1")

      postDirectInvoiceOrder(
        billDetail,
        addedItems,
        enquiryDetails,
        quotationDetails,
        chargesItems,
        customerDetail,
        globalState?.user?.serial_id,
        journal_details,
        // sales_details,
        gt,
        (r) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: {
              msg: "Direct Invoice Submited Successfully",
              msgType: "success",
            },
          });
          onClearState();
          setBillDetail((prv) => ({
            ...prv,
            txt_sales_order_no: r.sales_order_no,
            sales_id: r.sales_id,
          }));
          setClassicModal(true);
          if (!billDetail.edit) {
            setBillDetail((prev)=>({...prev,txt_invoice_no: r.invoice_no}))
          }
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );

      // postJournalFromInvoice(
      //   billDetail,
      //   journal_details,
      //   sales_details,
      //   gt,
      //   (r) => {
      //     dispatch({
      //       type: actionTypes.SET_OPEN_MSG,
      //       payload: {
      //         msg: "Journal Submited Successfully",
      //         msgType: "success",
      //       },
      //     });
      //   },
      //   (err) => {
      //     dispatch({
      //       type: actionTypes.SET_OPEN_MSG,
      //       payload: { msg: err, msgType: "error" },
      //     });
      //   }
      // );
      setHasBeenSubmitted(true);
    }
  };

  const onClickOkInvoice = (e) => {
    e.preventDefault();
    setClassicModal(false);
    history.push("/admin/sales/invoices");
    setClassicModal(false);
    // history.push({
    //   pathname: "/admin/sales/invoices",
    // state:{
    //   row:{ sales_id: billDetail.sales_id}
    // }});
    setClassicModal(false);
  };


  const onMenuOpen = () => {
    // list All Custoner
    getListCustomers(
      (r) => {
        setAllCustomers([
          { value: "addNewCustomer", label: "Add New Customer" },
          ...r,
        ]);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };

  const formData = [
    {
      formName: "BillDetails",
      fields: [
        {
          disabled: true,
          name: "txt_invoice_order_no",
          label: "Auto Number Generated",
          hidden: false,
          required: true,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 4,
        },
        {
          name: "txt_invoice_order_date",
          label: "Invoice Order Date",
          hidden: false,
          required: true,
          align: "left",
          data_type: "date",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 2,
        },
        // {
        //   name: "ddl_sales_source",
        //   label: "Source",
        //   hidden: false,
        //   required: true,
        //   data_type: "string",
        //   html_element: "select_two",
        //   xs: 12,
        //   md: 6,
        //   lg: 2,
        //   options: allsources,
        // },
        {
          name: "ddl_customer",
          label: "Customer",
          hidden: false,
          required: true,
          data_type: "string",
          html_element: "select_two",
          xs: 12,
          md: 6,
          lg: 6,
          options: allCustomers,
        },

        {
          name: "ddl_sales_executive",
          label: "Sales Executive",
          hidden: false,
          required: true,
          data_type: "string",
          html_element: "select_two",
          xs: 12,
          md: 6,
          lg: 4,
          options: allUser,
        },
        {
          name: "ddl_sales_showroom",
          label: "Showroom / Warehouse",
          hidden: false,
          required: true,
          data_type: "string",
          html_element: "select_two",
          xs: 12,
          md: 6,
          lg: 4,
          options: allShowroomWarehouse,
        },
        {
          name: "txt_sales_delivery_date",
          label: "Delivery Between",
          hidden: false,
          required: true,
          align: "left",
          data_type: "date",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 2,
        },
        {
          name: "txt_sales_delivery_end",
          label: "",
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
          name: "txt_sales_note",
          label: "Note",
          hidden: false,
          required: false,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          defaultValue: "",
          error: false,
          xs: 12,
          md: 4,
          lg: 12,
        },
      ],
    },
  ];

  const onClearState = () => {
    setAddedItems([]);
    setError({});
    setBillDetail({
      ...billDetail,
      edit: false,
      txt_invoice_order_date: currentDate(),
      // ddl_sales_source: "",
      ddl_customer: "",
      ddl_sales_executive: "",
      ddl_sales_showroom: "",
      txt_sales_delivery_date: currentDate(),
      txt_sales_delivery_end: currentDate(),
      txt_sales_note: "",
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="Sales > Direct Invoice > Add" />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle="Search by Item Code/Name"
            filterIcon
            onClickFilter={() => {}}
          >
            <GridContainer
              style={{ padding: "10px" }}
              justifyContent="flex-start"
              alignItems="center"
            >
              <GridItem xs="12">
                <TextField
                  autoFocus={true}
                  size="small"
                  placeholder="Search"
                  onChange={onAddSearch}
                  style={{ marginBottom: -20 }}
                  type="search"
                  id="outlined-basic"
                  fullWidth={true}
                  variant="outlined"
                  onClick={(e) => { e.target.select() }}
                />
              </GridItem>
            </GridContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>

      {/* Select and Add Items */}

      <GridContainer className={classes.root}>
        {allItems.length > 0 && (
          <GridItem xs="12">
            <CustomCard cdTitle="Select and Add Items" maxHeight={400}>
              <TableContainer className={classes.contaienr}>
                <Table
                  className={classes.table}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">#</StyledTableCell>
                      <StyledTableCell align="left">Image</StyledTableCell>
                      <StyledTableCell align="left">
                        Item Details
                      </StyledTableCell>
                      <StyledTableCell align="right">Qty</StyledTableCell>
                      <StyledTableCell align="left">Unit</StyledTableCell>
                      <StyledTableCell align="left">MRP</StyledTableCell>
                      <StyledTableCell align="left">Disc%</StyledTableCell>
                      <StyledTableCell align="left">Disc Value</StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                      <StyledTableCell align="left">GST%</StyledTableCell>
                      <StyledTableCell align="left">GST Value</StyledTableCell>
                      <StyledTableCell align="left">Net Value</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
            
                  <TableBody>
                    {allItems.map((row, i) => (
                      <StyledTableRow key={i}>
                        <StyledTableCell align="center" className={classes.id}>
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
                          className={classes.quantity_field}
                        >
                          <TextField
                            size="small"
                            placeholder="Quantity"
                            name={`txt_quantity${row.id}`}
                            style={{ marginBottom: -15 }}
                            type="number"
                            inputProps={{ style: { textAlign: "right" } }}
                            onChange={(e) => onChange(e, row)}
                            id="outlined-basic"
                            fullWidth={true}
                            value={itemDetail[`txt_quantity${row.id}`]}
                            variant="outlined"
                            onClick={(e) => { e.target.select() }}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.txt}>
                          <TextField
                            size="small"
                            placeholder="Unit"
                            name={`txt_uom${row.id}`}
                            style={{ marginBottom: -15 }}
                            inputProps={{ style: { textAlign: "right" } }}
                            onChange={(e) => onChange(e, row)}
                            id="outlined-basic"
                            fullWidth={true}
                            value={row.uom_name}
                            variant="outlined"
                          />
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.valueField}
                        >
                          <div>
                            <TextField
                              size="small"
                              placeholder="MRP"
                              name={`txt_rate${row.id}`}
                              style={{ marginBottom: -15 }}
                              type="number"
                              onChange={(e) => onChange(e, row)}
                              inputProps={{ style: { textAlign: "right" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              value={itemDetail[`txt_rate${row.id}`]}
                              variant="outlined"
                              onClick={(e) => { e.target.select() }}
                            />
                          </div>
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.valueField}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              <TextField
                                size="small"
                                placeholder="Disc%"
                                name={`txt_disc_per${row.id}`}
                                style={{ marginBottom: -15 }}
                                type="number"
                                onChange={(e) => onChange(e, row)}
                                inputProps={{ style: { textAlign: "right" } }}
                                id="outlined-basic"
                                fullWidth={true}
                                value={itemDetail[`txt_disc_per${row.id}`]}
                                variant="outlined"
                                onClick={(e) => { e.target.select() }}
                              />
                            </div>
                          </div>
                        </StyledTableCell>
                        {/* disc value  field */}
                        <StyledTableCell
                          align="center"
                          className={classes.valueField}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              <TextField
                                size="small"
                                placeholder="Disc Value"
                                name={`txt_disc_value${row.id}`}
                                style={{ marginBottom: -15 }}
                                type="number"
                                onChange={(e) => onChange(e, row)}
                                value={itemDetail[`txt_disc_value${row.id}`]}
                                inputProps={{ style: { textAlign: "right" } }}
                                id="outlined-basic"
                                fullWidth={true}
                                variant="outlined"
                                onClick={(e) => { e.target.select() }}
                              />
                            </div>
                          </div>
                        </StyledTableCell>

                        <StyledTableCell
                            align="right"
                            className={classes.checked}
                          >
                            <div>
                              <Checkbox
                                checked={checked[row.item_id]}
                                name={`chk_gst${row.item_id}`}
                                onChange={(e) => onChange(e, row)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                classes
                              />


                            </div>
                          </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          className={classes.valueField}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              <TextField
                                size="small"
                                placeholder="GST%"
                                name={`txt_gst_per${row.id}`}
                                style={{ marginBottom: -15 }}
                                type="number"
                                onChange={(e) => onChange(e, row)}
                                value={itemDetail[`txt_gst_per${row.id}`]}
                                inputProps={{ style: { textAlign: "right" } }}
                                id="outlined-basic"
                                fullWidth={true}
                                variant="outlined"
                              />
                            </div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.valueField}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              <TextField
                                size="small"
                                placeholder="GST Value"
                                name={`txt_gst_value${row.id}`}
                                style={{ marginBottom: -15 }}
                                type="number"
                                onChange={(e) => onChange(e, row)}
                                value={itemDetail[`txt_gst_value${row.id}`]}
                                inputProps={{ style: { textAlign: "right" } }}
                                id="outlined-basic"
                                fullWidth={true}
                                variant="outlined"
                              />
                            </div>
                          </div>
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.net_value_field}
                        >
                          <div>
                            <TextField
                              size="small"
                              placeholder="Value"
                              name={`txt_net_value${row.id}`}
                              style={{ marginBottom: -15 }}
                              type="string"
                              inputProps={{ style: { textAlign: "right" } }}
                              defaultValue={row.net_value_field}
                              id="outlined-basic"
                              fullWidth={true}
                              value={currencyFormate(
                                itemDetail[`txt_net_value${row.id}`]
                              )}
                              variant="outlined"
                            />
                          </div>
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          className={classes[row.action]}
                        >
                          <Button
                            type="submit"
                            onClick={() => onClickAddItem(row)}
                            className={classes.addBtn}
                            size="small"
                            varient="outlined"
                            color="primary"
                          >
                            Add
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CustomCard>
          </GridItem>
        )}
        {(addedItems.length > 0 || billDetail.edit) && (
          <GridItem xs="12">
            <CustomCard cdTitle="Review Added Items" maxHeight={400}>
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
                      <StyledTableCell align="left">
                        Item Details
                      </StyledTableCell>
                      <StyledTableCell align="right">Qty</StyledTableCell>
                      <StyledTableCell align="left">Unit</StyledTableCell>
                      <StyledTableCell align="left">Rate</StyledTableCell>
                      <StyledTableCell align="left">Disc%</StyledTableCell>
                      <StyledTableCell align="left">Disc Value</StyledTableCell>
                      <StyledTableCell align="left">GST%</StyledTableCell>
                      <StyledTableCell align="left">GST Value</StyledTableCell>
                      <StyledTableCell align="left">Net Value</StyledTableCell>
                      <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  
                  {/* { //console.log(timestamp(currentDate()),"all2")} */}

                  <TableBody>
                    {addedItems.map((row, i) => (
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
                          className={classes.viewno}
                        >
                          {row.quantity}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.viewno}
                        >
                          {row.uom_name}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.viewValue}
                        >
                          {currencyFormate(row.rate)}
                        </StyledTableCell>
                        <StyledTableCell
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
                        </StyledTableCell>
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

                        <StyledTableCell
                          align="right"
                          className={classes.deleteAction}
                        >
                          <IconButton
                            aria-label="delete"
                            onClick={(e) => onDeleteItem(e, i)}
                            className={classes.margin}
                          >
                            <DeleteIcon style={{ color: "#f44336" }} />
                          </IconButton>
                        </StyledTableCell>
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
                    <Box
                      className={classes.tableLabel}
                      mr={8}
                      textAlign="right"
                    >
                      {addedItems.length
                        ? currencyFormate(
                            addedItems.reduce(
                              (sum, li) => Number(sum) + Number(li.net_value),
                              0
                            )
                          )
                        : "00"}
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
                      style={{ display: "flex", margin: "5px" }}
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
                  // {
                  //   //console.log("on map function", item);
                  // }
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
                      {addedItems.length
                        ? currencyFormate(gt=
                            addedItems.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(li.net_value) +
                                Number(grandTotal),
                              0
                            )
                          )
                        : 0}

                        {/* {//console.log(gt,"666")} */}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CustomCard>
          </GridItem>
        )}
        {(addedItems.length > 0 || billDetail.edit) && (
          <GridItem xs="12">
            <CustomCard
              cdTitle="Invoice Order Details"
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
        )}
       
        {(addedItems.length > 0 || billDetail.edit) && (
          <GridItem xs={12}>
            <div className={classes.actionbtns}>
              <Button
                onClick={onClickSubmitInvoiceOrder}
                className={classes.actionbtn}
                variant="outlined"
                color="primary"
                disabled={hasBeenSubmitted}
              >
                Submit Direct Invoice
              </Button>
            </div>
          </GridItem>
        )}
      </GridContainer>
      {/* {//console.log(billDetail,"bill")} */}
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
          generateNo={`${billDetail.txt_invoice_no}`}
        />
      </MasterModel>
    </ThemeProvider>
  );
};

export default AddDirectQuotationPage;
