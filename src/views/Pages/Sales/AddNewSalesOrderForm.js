import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
// import Select from "@material-ui/core/Select";
import MuiTable, { ActiveIcon, DeActiveIcon } from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../Components/CustomButton";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Paper } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import { getSearchItem } from "../../../services/saleService/addEnqueryService";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput, Box } from "@material-ui/core";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Grid, Checkbox } from "@material-ui/core";
import theme from "../../../theme/theme";
import { getListUsers } from "../../../services/associateService";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";
import ItemViewCard from "../HelperComponent/ItemViewCard";
// import { ColoseButton } from "../Components/CustomButton";

import { getQuotationBySalesId, getCustomerById } from "../../../services/addNewQuatationFormService";
import { getListUom } from "../../../services/uomService";
import {
  postSalesOrder,
  getSalesOrderBySalesId,
} from "../../../services/salesOrderListService";
import { getListStatus } from "../../../services/addStatusService";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
} from "assets/jss/material-dashboard-pro-react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { PageHeader } from "../HelperComponent/PageTitle";
import StepProceedModel from "../HelperComponent/StepProceedModel";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { currentDate, dateFormateField,sortWord } from "../HelperComponent/utils";
import FormComponent from "../HelperComponent/FormComponent";
import ItemImg from "../HelperComponent/ItemImg";
import ReactSelect from "react-select";
import Select from "react-select";
import { calculatePerValue, calculatePer } from "../HelperComponent/utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import { currencyFormate } from "../HelperComponent/utils";
import { Typography } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "./AddEnquiryPage";
import { rtlBugs } from "variables/general";
import { getAllOtherCharges } from "../../../services/OtherChargesService";
import AddCustomerPage from "../CustomerPage/CustomerPage";

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
  customSelect: {
    marginBottom: 15,
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 15,
    padding: "15px 20px",
  },
  tableLabel: {
    fontWeight: 500,
    color: appSecondColor,
    // width: "50%",
  },
  // addBtn: {
  //   width: 5
  // },

  otherCharges: {

    fontWeight: 500,
    color: appSecondColor,
    width: "50%",

  },
  activeText: {
    ...activeText,
  },

  actionbtns: {
    marginTop: 20,
    float: "right",
  },

  customSelect: {
    marginBottom: 15,
  },
  ddlError: {
    textAlign: "right",
    color: "#f44336",
    fontSize: "12.6px",
    marginRight: 15,
    marginTop: -15,
    fontWeight: 400,
  },

  id: { width: "0%" },
  doubleFiled: { width: "20%" },
  checked
    : {
    width: "3%",
  },
  rate1
    : {
    width: "5%",
  },

  action: {
    width: "5%",
  },
  value: {
    width: "15%",
  },

  itemImg: { width: "8%" },
  itemDetails: { width: "25%" },
  quantity_field: { width: "8%" },
  ddl_uom: { width: "8%" },
  rate: { width: "9%" },
  discFiled: { width: "6%" },
  gst_value: { width: "8%" },
  gst_per: { width: "6%" },
  discValueFiled: { width: "8%" },
  net_value_field: { width: "10%" },
  unit: { width: "4%" },
  Disc: {
    width: "5%",
  },
}));


const headerDataCustomer = [
  {
    id: "group_name",
    label: "Group",
    align: "left",
  },
  {
    id: "company",
    label: "Company",
    align: "left",
  },
  {
    id: "name",
    label: "Name",
    align: "left",
  },

  {
    id: "mobile",
    label: "Mobile",
    align: "left",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    align: "left",
  },
  {
    id: "email",
    label: "Email",
    align: "left",
  }, {
    id: "ddl_state_label",
    label: "Address",
    align: "left",
    statusBtn: (v) => (v > 0 ? true : false),
  },
  {
    id: "action",
    label: "Action",
    align: "right",
  },
  // {
  //   id: "status",
  //   label: "Status",
  //   align: "left",
  //   statusBtn: (v) => (v === "Y" ? true : false),
  // },
];

const AddQuatationPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [temp_items, setAllTempItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [allUom, setAllUom] = React.useState([]);
  const [allStatus, setAllStatus] = React.useState([]);
  const [classicModal, setClassicModal] = React.useState(false);
  const [classicModalCust, setClassicModalCust] = React.useState(false);
  const [allItems, setAllItems] = React.useState({});
  const [itemDetail, setItemDetail] = React.useState({});
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [gstDisable, setGstDisable] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [newItems, setNewItems] = React.useState({});
  const [newItemDetail, setNewItemDetail] = React.useState({});
  const [options, setOptions] = React.useState([]);
  const [otherChargesOption1, setOtherChargesOption1] = React.useState({});
  const [otherChargesOption, setOtherChargesOption] = React.useState({});
  const [chargesValue, setChargesValue] = React.useState(0);
  const [grandTotal, setGrandTotal] = React.useState(0);
  const [newGstDisable, setNewGstDisable] = React.useState(false);
  const [customerDetails, setCustomerDetails] = React.useState({})
  const [allUser, setAllUsers] = React.useState([]);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  
  let iflag = 0;
  let iNewFlag = 0;
  const [billDetail, setBillDetail] = React.useState({
    edit: false,
    sales_id: "",
    // enquiry_status: "",
    quotation_status: "",
    sales_status: "",
    txt_sales_order_No: "AUTO GENERATED",
    txt_purchase_order_no: "",
    txt_sales_order_date: currentDate(),
    txt_purchase_order_date: currentDate(),
    txt_sales_order_note: "",
  });
  let db_total = 0;
  let other_charges = 0;
  let net_value = 0;

  const onChangeBillDetail = (e) => {
    const { name, value } = e.target;
    setBillDetail({ ...billDetail, [name]: value });
  };

  // //console.log(billDetail,"KillBill")
  const onSelectDetails = (name, v) => {
   if (v.value === "openModel") {
        setBillDetail({ ...billDetail, [name]: "" });
    } else {
        setBillDetail({ ...billDetail, [name]: v });
    }
  };

  const option = [
    { value: '+', label: '+' },
    { value: '-', label: '-' },

  ];

  //For search results
  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setSearchQuery(value);
  };

  // Delete Added Item
  const onDelete = (e, index) => {
  
    let deleteRef = allItems.quotation_item_details
    deleteRef.splice(index, 1);
    dispatch({
      type: actionTypes.SET_OPEN_MSG,
      payload: {
        msg: `Item Deleted`,
        msgType: "success",
      },
    });
  };

  const onClickDeleteChar = (r, id) => {



    if (otherCharges[id].otherChargesOption1 ?
      otherCharges[id].otherChargesOption1.value === "+" : otherCharges[id].charge_type === "+") {

      setGrandTotal(Number(grandTotal) -
        Number(otherCharges[id].chargesValue ?
          otherCharges[id].chargesValue :
          otherCharges[id].charge_amount));

    }
    else {
      setGrandTotal(Number(grandTotal) +
        Number(otherCharges[id].chargesValue ?
          otherCharges[id].chargesValue :
          otherCharges[id].charge_amount));
    }

    const restItem = otherCharges.filter((a, i) => id !== i);
    setOtherCharges(restItem);


  }

  //For Other Charges
  const onClickAdd = () => {
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
      
      allItems.quotation_other_charges.push(
        {
          charge_amount: chargesValue,
          charge_type: otherChargesOption1.value,
          charges: otherChargesOption.value
        }
      );
    }
      
    

      if (otherChargesOption1.value === "+" || otherChargesOption1.value === undefined ) {
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
  }

  React.useEffect(() => {
    getListUsers(
        (r) => {
          setAllUsers([{ value: "openModel", label: "Add New User" }, ...r]);
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
  }, []);

  //Review Added Items
  
  const onClickAddItem = (r) => {
    // //console.log("on add click", otherCharges, r)
    // //console.log("data==>", allItems)
    // debugger;

    if (allItems != []) {
        // //console.log("allItems != []")
      if (allItems.quotation_item_details.find((v, i) => v.item_id === r.item_id)) {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Item already added", msgType: "info" },
        });
      }
      else {
        
        allItems.quotation_item_details.push(

          {
            item_id: r.item_id,
            uom_name: r.uom_name,
            uom_id: r.uom_id,
            rate: r.mrp,
            mrp:r.mrp,
            gst_percentage: newItemDetail[`txt_new_gst_per${r.item_id}`],
            gstvalue: newItemDetail[`txt_new_gst_value${r.item_id}`],
            disc_percentage: newItemDetail[`txt_new_disc_per${r.item_id}`],
            disc_value: newItemDetail[`txt_new_disc_value${r.item_id}`],
            quantity: newItemDetail[`txt_new_quantity${r.item_id}`],
            totalValue: newItemDetail[`txt_new_net_value${r.item_id}`],
          },
        );

        allItems.quotation_item_details.map((r, i) => {
          const totalValue = parseFloat(
            (Number(r.quantity) * Number(Number(r.rate) - Number(r.disc_value))).toFixed(2)
          );
          // //console.log(totalValue, "totAL")

          const gstValue = calculatePerValue(r.gst_percentage, totalValue);

        //   let ticked = document.querySelector(`input[name="chk_new_gst${r.item_id}"]`);

        //   //console.log(ticked, "ticked")

          // if(ticked.checked){
          setItemDetail((prv) => ({
            ...prv,
            [`txt_quantity${r.item_id}`]: r.quantity ? r.quantity : 0,
            [`ddl_uom${r.item_id}`]: { value: r.uom_id, label: r.uom_name },
            [`txt_rate${r.item_id}`]: r.mrp - r.disc_value,
            // [`txt_disc_per${r.item_id}`]: 0,
            // [`txt_disc_value${r.item_id}`]: 0,
            [`txt_gst_per${r.item_id}`]: r.gst_percentage,
            [`txt_gst_value${r.item_id}`]: gstValue,
            // [`txt_net_value${r.item_id}`]: Number(Number(r.quantity) * Number(r.mrp - r.disc_value)) + gstValue,
            [`gst_type${r.item_id}`]:r.gst_type,
            [`txt_net_value${r.item_id}`]:itemDetail[`txt_net_value${r.item_id}`] ? itemDetail[`txt_net_value${r.item_id}`] : 0,
          }));
          setAllTempItems((prv)=>({
            ...prv,
            [`txt_rate${r.item_id}`]: r.mrp,
          }))
  
       
        }),



          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: {
              msg: `Item added`,
              msgType: "success",
            },
          });
      }
    }
    else {
        // //console.log("allItems != [] 55")
      allItems.item_details.push(r)
    }   
    setNewItems([]);
  }

  //new Calculation
  const onChange = (e, row) => {
    const { name, value } = e.target;

    setGstDisable(true);
    if (name === `chk_gst${row.item_id}`) {

      if (e.target.checked) {
        iflag = 1;
        // //console.log("clicked", iflag);
        setGstDisable(false);

        const rate = Number(temp_items[`txt_rate${row.item_id}`])
        // const qty = Number(temp_items[`txt_quantity${row.item_id}`])
        const qty = Number(temp_items[`txt_quantity${row.item_id}`])?Number(temp_items[`txt_quantity${row.item_id}`]) :Number(itemDetail[`txt_quantity${row.item_id}`])
       
        const disc_percentage = Number(itemDetail[`txt_disc_per${row.item_id}`]? itemDetail[`txt_disc_per${row.item_id}`] : 0)
        
        let discValue = itemDetail[`txt_disc_value${row.item_id}`] ? itemDetail[`txt_disc_value${row.item_id}`] : calculatePerValue(disc_percentage, rate);
        const afterDiscRate = rate - discValue;
        const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);
        // const gst_value = Number(Number(afterDiscRate) * (Number(gst_rate) / 100)).toFixed(2);
        const gst_amount = Number(Number(afterDiscRate) * Number(qty) * (Number(gst_rate) / 100)).toFixed(2);
        // const netValue = Number( afterDiscRate + gst_amount );
        const netValue = Number(Number(qty) * (rate - discValue)) + Number(gst_amount);

        
        setItemDetail((prv) => ({
          ...prv,
          [name]: value,
       
          [`txt_gst_per${row.item_id}`]: gst_rate,
          [`txt_gst_value${row.item_id}`]: gst_amount,
          [`txt_net_value${row.item_id}`]: netValue,
          [`gst_type${row.item_id}`]: 1,
        }));
      }

      else {
        iflag = 2;
   
        setGstDisable(true);
        const rate = Number(temp_items[`txt_rate${row.item_id}`])
        // const qty = Number(temp_items[`txt_quantity${row.item_id}`])
        const qty = Number(temp_items[`txt_quantity${row.item_id}`])?Number(temp_items[`txt_quantity${row.item_id}`]) :Number(itemDetail[`txt_quantity${row.item_id}`])
        const disc_percentage = Number(itemDetail[`txt_disc_per${row.item_id}`]? itemDetail[`txt_disc_per${row.item_id}`] : 0)
    
        let discValue = itemDetail[`txt_disc_value${row.item_id}`] ? itemDetail[`txt_disc_value${row.item_id}`] : calculatePerValue(disc_percentage, rate);
        const afterDiscRate = rate - discValue;
        const netValue = qty * afterDiscRate;

        
       

        setItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_quantity${row.item_id}`]: qty,
          [`txt_net_value${row.item_id}`]: (netValue).toFixed(2),
          [`txt_rate${row.item_id}`]: afterDiscRate,
          [`txt_disc_per${row.item_id}`]: disc_percentage,
          [`txt_disc_value${row.item_id}`]: discValue,
          // [`txt_gst_value${row.item_id}`]: 0,
          // [`txt_gst_per${row.item_id}`]: 0,
          [`gst_type${row.item_id}`]: 0,
        }));

      }
    }

    // Discount Percent Check
    if (name === `txt_disc_per${row.item_id}`) {

      const rate = Number(temp_items[`txt_rate${row.item_id}`])
      // const qty = Number(temp_items[`txt_quantity${row.item_id}`])
      const qty = Number(temp_items[`txt_quantity${row.item_id}`])?Number(temp_items[`txt_quantity${row.item_id}`]) :Number(itemDetail[`txt_quantity${row.item_id}`])
      const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);

      if (!value) {


        let gst_amount = Number((Number(rate) * Number(qty)) * (Number(gst_rate) / 100)).toFixed(2);
        let ticked = document.querySelector(`input[name="chk_gst${row.item_id}"]`);

        if (ticked.checked){
          const netValue = Number(qty * rate) +  Number(gst_amount)
          setItemDetail((prv) => ({
            ...prv,
            [name]: value,
            [`txt_quantity${row.item_id}`]: qty,
            [`txt_rate${row.item_id}`]: rate,
            [`txt_net_value${row.item_id}`]: Number((netValue).toFixed(2)),
            [`txt_gst_value${row.item_id}`]: gst_amount,
            // [`txt_disc_value${row.item_id}`]: 0,
            // [`txt_disc_rate${row.item_id}`]: 0,
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
            // [`txt_disc_value${row.item_id}`]: 0,
            // [`txt_disc_rate${row.item_id}`]: 0,
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
          // //console.log("Hello World444", gst_rate);
          gst_amount = Number((Number(afterDiscRate) * Number(qty)) * (Number(gst_rate) / 100)).toFixed(2);

          // //console.log("Hello World666", gst_amount);
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
          [`txt_disc_value${row.item_id}`]: discValue,
          [`txt_net_value${row.item_id}`]: (netValue).toFixed(2),
          [`txt_gst_per${row.item_id}`]: gst_rate,
          [`txt_gst_value${row.item_id}`]: gst_amount,
          [`gst_type${row.item_id}`]:tick,
        }));
      }
    }
    // Discount Value Check
    else if (name === `txt_disc_value${row.item_id}`) {

      const rate = Number(temp_items[`txt_rate${row.item_id}`])
      // const qty = Number(temp_items[`txt_quantity${row.item_id}`])
      const qty = Number(temp_items[`txt_quantity${row.item_id}`])?Number(temp_items[`txt_quantity${row.item_id}`]) :Number(itemDetail[`txt_quantity${row.item_id}`])
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
            // [`txt_disc_value${row.item_id}`]: 0,
            [`txt_gst_value${row.item_id}`]: gst_amount,
            // [`txt_disc_per${row.item_id}`]: 0,
          }));

        }else{
        const netValue = qty * rate;
        setItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_quantity${row.item_id}`]: qty,
          [`txt_rate${row.item_id}`]: rate,
          [`txt_net_value${row.item_id}`]: Number((netValue).toFixed(2)),
          // [`txt_disc_value${row.item_id}`]: 0,
          // [`txt_disc_per${row.item_id}`]: 0,
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
          //console.log("Hello World444", gst_rate);
          gst_amount = Number((Number(afterDiscRate) * Number(qty)) * (Number(gst_rate) / 100)).toFixed(2);

          //console.log("Hello World666", gst_amount);
          netValue = Number(Number(qty) * afterDiscRate) + Number(gst_amount);
        }

        else {
            tick = 0;
          //console.log("Hello World555");
          netValue = qty * afterDiscRate;
        }

        //console.log("Hello World777", gst_amount);
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
      // const disc_percentage = Number(itemDetail[`txt_disc_per${row.item_id}`])
      const disc_percentage = itemDetail[`txt_disc_per${row.item_id}`] ? Number(itemDetail[`txt_disc_per${row.item_id}`]) : Number(temp_items[`txt_disc_per${row.item_id}`]) 

      const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);
      // let discValue = calculatePerValue(disc_percentage, rate);
      // let discValue = disc_percentage ? calculatePerValue(disc_percentage, rate)  : 0;
      let discValue = itemDetail[`txt_disc_value${row.item_id}`] ? itemDetail[`txt_disc_value${row.item_id}`] : calculatePerValue(disc_percentage, rate);
      const afterDiscRate = rate - discValue;
      let gst_amount = 0;
        let netValue = 0;
        let tick = 0;
        //CHECK BOX VALUE CHECKING
        let ticked = document.querySelector(`input[name="chk_gst${row.item_id}"]`);
        if (ticked.checked) {
          tick = 1;
          //console.log("Hello World444", gst_rate);
          gst_amount = Number((Number(afterDiscRate) * Number(value)) * (Number(gst_rate) / 100)).toFixed(2);
  
          //console.log("Hello World666", gst_amount);
          netValue = Number(Number(value) * afterDiscRate) + Number(gst_amount);
        }
  
        else {
         tick = 0;
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
          // [`txt_gst_value${row.item_id}`]: 0,
          // [`txt_disc_value${row.item_id}`]: 0,
          // [`txt_disc_per${row.item_id}`]: 0,
        }));

      } else {
          
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
          [`txt_disc_per${row.item_id}`]: disc_percentage,
          [`gst_type${row.item_id}`]: tick,
        }));
      }
    }

  };

  const onClickClose = (e) => {
    history.push({
      pathname: "/admin/sale/quatation",
    });
  }


  React.useEffect(() => {
    setGstDisable(true);
    getListStatus(
      "Sales-Order",
      (r) => {
        setAllStatus(r);
        r.forEach((s, i) => {
          if (s.label === "New") {
            setBillDetail((prv) => ({
              ...prv,
              quotation_status: 23,
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
    getListUom(
      (r) => {
        setAllUom(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    if (location.state?.row) {
      setLoading(true);
      if (location.state?.edit) {
        //console.log("reached if")

        getSalesOrderBySalesId(
          location.state?.row.sales_id,
          (r) => {
            //console.log(r, "chk r2")
            setAllItems(r);
            setOtherCharges(r.sales_order_other_charges);
            setBillDetail((prv) => ({
              ...prv,
              edit: location.state?.edit,
              sales_id: r.sales_id,
              txt_sales_order_No: r.sales_order_no,
              txt_sales_order_date: dateFormateField(r.sales_order_date),
              txt_purchase_order_no: r.purchase_order_no,
              txt_purchase_order_date: dateFormateField(r.purchase_order_date),
              txt_sales_order_note: r.sales_order_note,
            }));

            r.sales_order_item_details.map((q, i) => {

              setAllTempItems((prv) => ({
                ...prv,
                [`txt_quantity${q.item_id}`]: q.quantity,
                [`txt_gst_per${q.item_id}`]: q.gst_percentage,
                // [`txt_rate${q.item_id}`]: q.rate,
                // [`txt_disc_per${q.item_id}`]: q.disc_percentage,
              }));

              setItemDetail((prv) => ({
                ...prv,
                [`txt_quantity${q.item_id}`]: q.quantity,
                [`txt_rate${q.item_id}`]: q.rate,
                [`txt_disc_per${q.item_id}`]: q.disc_percentage,
                [`txt_disc_value${q.item_id}`]: q.disc_value,
                [`txt_gst_per${q.item_id}`]: q.gst_percentage,
                [`txt_gst_value${q.item_id}`]: q.gst_value,
                [`txt_net_value${q.item_id}`]: q.net_value,
                [`ddl_uom${q.item_id}`]: { value: q.uom_id, label: q.uom_name },
              }));
            });

            getCustomerById(
              r.enqCustomer_id,
              (customerInfo) => {
                //console.log(customerInfo, "customer")
                setCustomerDetails(customerInfo);
              }
            )
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
      } else {
        //console.log("reached else")

        //console.log(location.state?.row.sales_id, "location.state?.row.sales_id")


        getQuotationBySalesId(
          location.state?.row.sales_id,
          (r) => {
            //console.log(r, "r for qout")
            setBillDetail((prv) => ({
              ...prv,
              sales_id: r.sales_id,
            }));
            setAllItems(r);
            setOtherCharges(r.quotation_other_charges);

            r.quotation_item_details.map((q, i) => {
            
              setAllTempItems((prv) => ({
                ...prv,
                [`txt_quantity${q.item_id}`]: q.quantity,
                [`txt_gst_per${q.item_id}`]: q.gst_percentage,
                [`txt_rate${q.item_id}`]: q.mrp,
                [`txt_disc_per${q.item_id}`]: q.disc_percentage,
              }));
            })
            r.quotation_item_details.map((q, i) => {

              setItemDetail((prv) => ({
                ...prv,
                [`txt_quantity${q.item_id}`]: q.quantity,
                [`txt_rate${q.item_id}`]: q.mrp,
                [`txt_disc_per${q.item_id}`]: q.disc_percentage,
                [`txt_disc_value${q.item_id}`]: q.disc_value,
                [`txt_gst_per${q.item_id}`]: q.gst_percentage,
                [`txt_gst_value${q.item_id}`]: q.gst_value,
                [`txt_net_value${q.item_id}`]: q.net_value,
                [`ddl_uom${q.item_id}`]: { value: q.uom_id, label: q.uom_name },
                [`gst_type${q.item_id}`]:q.gst_type,
              }));

            });

            r.quotation_other_charges.map((o, i) => {

              //console.log(o, "qoc")
  
              if (o.charge_type === "+") {
                //console.log(o.charge_amount, grandTotal, "reached qoc")
                setGrandTotal((prev) => prev + Number(o.charge_amount))
              }
              else {
                setGrandTotal((prev) => prev - Number(o.charge_amount))
              }
            })

            getCustomerById(
              r.enqCustomer_id,
              (customerInfo) => {
                //console.log(customerInfo, "customer")
                setCustomerDetails(customerInfo);
              }
            )
            setLoading(false);
            //console.log(allItems, "ddd");

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
    }
  }, []);

  //console.log("otherCharges23", otherCharges);
  const onClickSubmitSalesOrder = (e) => {
    e.preventDefault();
    let updatedItem = [];
    let updateOtherCharges = [];
    //console.log(customerDetails[0]?.ddl_state_label, "chek erros");

    // if (customerDetails[0]?.ddl_state_label > 0) {
     
      //console.log("address")
      if (allItems.quotation_item_details.length) {
        allItems.quotation_item_details.map((item, i) => {
          updatedItem.push({
            item_id: item.item_id,
            quantity: itemDetail[`txt_quantity${item.item_id}`],
            rate: itemDetail[`txt_rate${item.item_id}`],
            mrp: temp_items[`txt_rate${item.item_id}`],
            uom_id: itemDetail[`ddl_uom${item.item_id}`].value,
            uom_name: itemDetail[`ddl_uom${item.item_id}`].label,
            disc_percentage: itemDetail[`txt_disc_per${item.item_id}`],
            disc_value: itemDetail[`txt_disc_value${item.item_id}`],
            gst_percentage: itemDetail[`txt_gst_per${item.item_id}`],
            gst_value: itemDetail[`txt_gst_value${item.item_id}`],
            net_value: itemDetail[`txt_net_value${item.item_id}`],
            gst_type: itemDetail[`gst_type${item.item_id}`]?itemDetail[`gst_type${item.item_id}`] : 0,
            insert_mode:"Web"
          });
        });
      }
      //console.log(updatedItem, "checking")
      if (location.state?.edit) {
        allItems.sales_order_other_charges.map((item, i) => {
          updateOtherCharges.push({
            charges: item.charges,
            charge_amount: item.charge_amount,
            charge_type: item.charge_type,
          });
        });
      } else {
        
        // allItems.quotation_other_charges.map((item, i) => {
        //   updateOtherCharges.push({
        //     charges: item.charges,
        //     charge_amount: item.charge_amount,
        //     charge_type: item.charge_type,
        //   });
        // });

        updateOtherCharges = [...updateOtherCharges, ...otherCharges.map((r,i) => 
          {
            return {
                  charges: r.charges? r.charges : r.otherChargesOption?.value, 
                  charge_amount: r.charge_amount? r.charge_amount : r.chargesValue,
                  charge_type: r.charge_type ? r.charge_type : r.otherChargesOption1?.label
                }})];

      }

      postSalesOrder(
        billDetail,
        updatedItem,
        updateOtherCharges,
        (r) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: {
              msg: billDetail.edit
                ? "Sales Order Updated Successfully"
                : "Sales Order Submited Successfully",
              msgType: "success",
            },
          });
          setClassicModal(true);
          if (!billDetail.edit) {
            setBillDetail((prv) => ({
              ...prv,
              sales_id: r.sales_id,
              txt_sales_order_No: r.sales_order_no,
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
    // } 
    
    // else {
    //   dispatch({
    //     type: actionTypes.SET_OPEN_MSG,
    //     payload: { msg: "Enter Customer Address to procceed ", msgType: "error" },
    //   });


    // }
    setButtonDisabled(true);
    
  };

  const onClickProcedeDeliveryOrder = () => {
    setClassicModal(false);
    history.push({
      pathname: "/admin/sales/create-delivery-order",
      state: {
        row: { sales_id: billDetail.sales_id },
      },
    });
  };

  const onSearchItem = () => {
    getSearchItem(
      (items) => {

        setNewItems(items);
        items.map((r, i) => {
          setNewItemDetail((prv) => ({
            ...prv,
            [`txt_new_quantity${r.id}`]: 0,
            [`txt_new_gst_per${r.id}`]: r.cgst_percentage,
            [`txt_new_gst_value${r.id}`]: 0,
            [`txt_new_disc_per${r.id}`]: 0,
            [`txt_new_disc_value${r.id}`]: 0,
            [`txt_new_rate${r.id}`]: r.mrp,
            [`txt_new_net_value${r.id}`]: 0,
            [`txt_new_uom${r.id}`]: r.uom_name,

          }));

          setAllTempItems((prv) => ({
            ...prv,
            // [name]: value,
            [`txt_new_gst_per${r.item_id}`]: r.cgst_percentage,
            [`txt_new_rate${r.item_id}`]: r.mrp,
          }));

          setAllTempItems((prv) => ({
            ...prv,
            [`txt_quantity${r.id}`]: 0,
            [`txt_gst_per${r.id}`]: r.cgst_percentage,
            [`txt_gst_value${r.id}`]: 0,
            [`txt_disc_per${r.id}`]: 0,
            [`txt_disc_value${r.id}`]: 0,
            [`txt_rate${r.id}`]: r.mrp,
            [`txt_net_value${r.id}`]: 0,
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
  };

  //Customer Edit and View
  const onEditCustomer = (row) => {
    //console.log(row,"142022")
    history.push({
      pathname: "/admin/master/customer-add",
      // search: '?query=abc',
      state: { edit: true, row: row },
    });
  };

  const onViewCustomer = (row) => {

    history.push({
      pathname: "/admin/master/customer-view",
      // search: '?query=abc',
      state: { row: row },
    });
  };

  // useEffect
  React.useEffect(() => {               //for search
    if (searchQuery.length >= 6) {
      onSearchItem();
    } else {
      setNewItems([]);
    }
  }, [searchQuery]);



  const formData = [
    {
      formName: "BillDetails",
      fields: [
        {
          disabled: true,
          name: "txt_sales_order_No",
          label: "Sales Order No",
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
          name: "txt_sales_order_date",
          label: "Date",
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
          name: "txt_purchase_order_no",
          label: "Purchase order No",
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
        {
          name: "txt_purchase_order_date",
          label: "Date",
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
            name: "ddl_sales_executive",
            label: "Sales Executive",
            hidden: false,
            required: false,
            data_type: "string",
            html_element: "select_two",
            xs: 12,
            md: 6,
            lg: 4,
            options: allUser.sort(sortWord("label")),
          },
        {
          name: "txt_sales_order_note",
          label: "Note",
          hidden: false,
          required: false,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          defaultValue: "",
          error: false,
        //   xs: 12,
        //   md: 12,
          lg: 8,
        },
      ],
    },
  ];

  const onClickAddTask = () => {
    history.push({
      pathname: "/admin/sales/selected-sales-order-view",
      state: {
        row: { sales_id: billDetail.sales_id },
        updateTask: true,
      },
    });
  };

  const onClickCloseMod = () => {
    history.push({
      pathname: "/admin/sale/sale-order"
    });
  };


  return (
    <ThemeProvider theme={theme}>
      <PageHeader
        title={
          billDetail.edit
            ? "Sales > Sales Order > Edit"
            : "Sales > Sales Order> Add"
        }
      />
      {/* Selected and Added Items */}
      <GridContainer>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard cdTitle="Quotation Details">
              <TableContainer>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">#</StyledTableCell>
                      <StyledTableCell align="left">
                        Enquiry Date
                      </StyledTableCell>
                      <StyledTableCell align="left">Enquiry No</StyledTableCell>
                      <StyledTableCell align="left">
                        Quotation Date
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Quotation No
                      </StyledTableCell>
                      <StyledTableCell align="left">Customer</StyledTableCell>
                      <StyledTableCell align="left">Mobile</StyledTableCell>
                      <StyledTableCell align="left">Email</StyledTableCell>
                      <StyledTableCell align="center">Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.id}
                        align="left"
                      >
                        1
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.endate}>
                        {allItems.enqDate}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.engNo}>
                        {allItems.enqNo}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.endate}>
                        {allItems.qutDate}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.engNo}>
                        {allItems.qutNo}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.enCustomerName}
                      >
                        {allItems.enqCustomer}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.enqMobile}
                      >
                        {allItems.mobile}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.enqEmail}
                      >
                        {allItems.email}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className={classes.enqStatus}
                      >
                        <div
                          style={{
                            color:
                              allStatus &&
                              allStatus.find(
                                (s, i) => s.value === Number(allItems.status)
                              )?.status_color,
                          }}
                        >
                          {allStatus &&
                            allStatus.find(
                              (s, i) => s.value === Number(allItems.status)
                            )?.label}
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

      {/* Customer Details */}
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Customer" height="auto">
            <MuiTable
              pagination={false}
              onClickEdit={onEditCustomer}
              onClickViewOne={onViewCustomer}
              columns={headerDataCustomer}
              rows={customerDetails}
            />
          </CustomCard>
        </GridItem>
      </GridContainer>

      {/* Search By Item Code/Name */}
      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle="Search by Item Code/Name"
            filterIcon
            onClickFilter={() => { }}
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
                  name="searchQuery"
                  placeholder="Search"
                  onChange={onAddSearch}
                  style={{ marginBottom: -15 }}
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

      {/*Search and Display*/}
      <GridContainer className={classes.root}>
        {newItems.length > 0 && (
          <GridItem xs="12">
            <CustomCard cdTitle="Select and Add Items" maxHeight={400}>
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
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>

                      {/* <StyledTableCell align="center">Qty</StyledTableCell>
                      <StyledTableCell align="center">Unit</StyledTableCell>
                      <StyledTableCell align="center">Rate</StyledTableCell>
                      <StyledTableCell align="left">Disc%</StyledTableCell>
                      <StyledTableCell align="center">Disc Value</StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                      <StyledTableCell align="left">GST%</StyledTableCell>
                      <StyledTableCell align="left">GST Value</StyledTableCell>
                      <StyledTableCell align="center">Net Value</StyledTableCell> */}
                      {/* {<StyledTableCell align="center">Action</StyledTableCell>} */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {console.log("newItems is:\n" + JSON.stringify(newItems, null, 2))} */}
                    {newItems.map((row, i) => (
                      <StyledTableRow key={i}>
                        <StyledTableCell align="center" className={classes.id}>
                          {row.id}
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

                        {/* <StyledTableCell
                          align="right"
                          className={classes.quantity_field}
                        >
                          <TextField
                            size="small"
                            placeholder="Quantity"
                            name={`txt_new_quantity${row.id}`}
                            style={{ marginBottom: -15 }}
                            type="number"
                            inputProps={{ style: { textAlign: "right" } }}
                            onChange={(e) => onNewChange(e, row)}
                            id="outlined-basic"
                            fullWidth={true}
                            value={Number(newItemDetail[`txt_new_quantity${row.id}`]).toString()}
                            variant="outlined"
                            onClick={(e) => {e.target.select()}}
                          />
                        </StyledTableCell> */}
                        {/*                         
                        <StyledTableCell
                          align="right"
                          className={classes.ddl_uom}
                        >
                          <TextField
                            size="small"
                            placeholder="Unit"
                            name={`txt_new_uom${row.id}`}
                            style={{ marginBottom: -15 }}
                            inputProps={{ style: { textAlign: "right" } }}
                            onChange={(e) => onNewChange(e, row)}
                            id="outlined-basic"
                            fullWidth={true}
                            value={row.uom_name}
                            variant="outlined"
                            onClick={(e) => { e.target.select() }}
                          />

                        </StyledTableCell> */}

                        {/* <StyledTableCell
                          align="right"
                          className={classes.rate}
                        >
                          <div>
                            <TextField
                              size="small"
                              placeholder="Rate"
                              name={`txt_new_rate${row.id}`}
                              style={{ marginBottom: -15 }}
                              type="number"
                              onChange={(e) => onNewChange(e, row)}
                              inputProps={{ style: { textAlign: "right" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              value={parseFloat(newItemDetail[`txt_new_rate${row.item_id}`]).toString()}
                              variant="outlined"
                              onClick={(e) => { e.target.select() }}
                            />
                          </div>
                        </StyledTableCell> */}

                        {/* <StyledTableCell
                          align="center"
                          className={classes.disc}
                        >
                          <TextField
                            size="small"
                            placeholder="Disc%"
                            name={`txt_new_disc_per${row.id}`}
                            style={{ marginBottom: -15 }}
                            type="number"
                            onChange={(e) => onNewChange(e, row)}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            value={parseFloat(newItemDetail[`txt_new_disc_per${row.id}`]).toString()}
                            variant="outlined"
                            onClick={(e) => { e.target.select() }}
                          />
                        </StyledTableCell> */}


                        {/* <StyledTableCell
                          align="center"
                          className={classes.discValueFiled}
                        >
                          <TextField
                            size="small"
                            placeholder="Disc Value"
                            name={`txt_new_disc_value${row.id}`}
                            style={{ marginBottom: -15 }}
                            type="number"
                            onChange={(e) => onNewChange(e, row)}
                            value={parseFloat(newItemDetail[`txt_new_disc_value${row.id}`]).toString()}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            variant="outlined"
                            onClick={(e) => { e.target.select() }}
                          />
                        </StyledTableCell>

                      
                        <StyledTableCell
                          align="right"
                          className={classes.checked}
                        >
                          <div>
                            <Checkbox
                              checked={checked[row.id]}
                              name={`chk_new_gst${row.id}`}
                              onChange={(e) => onNewChange(e, row)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />


                          </div>
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          className={classes.valueField}
                        >
                          <TextField
                            size="small"
                            placeholder="GST%"
                            name={`txt_new_gst_per${row.id}`}
                            style={{ marginBottom: -15 }}
                            type="number"
                            onChange={(e) => onNewChange(e, row)}
                            value={parseFloat(newItemDetail[`txt_new_gst_per${row.id}`]).toString()}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            variant="outlined"
                            disabled={newGstDisable}
                            onClick={(e) => { e.target.select() }}
                          />
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          className={classes.valueField}
                        >
                          <TextField
                            size="small"
                            placeholder="GST Value"
                            name={`txt_new_gst_value${row.id}`}
                            style={{ marginBottom: -15 }}
                            type="number"
                            onChange={(e) => onNewChange(e, row)}
                            value={parseFloat(newItemDetail[`txt_new_gst_value${row.id}`]).toString()}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            variant="outlined"
                            disabled={newGstDisable}
                            onClick={(e) => { e.target.select() }}
                          />
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.net_value_field}
                        >
                          <TextField
                            size="small"
                            placeholder="Value"
                            name={`txt_new_net_value${row.id}`}
                            style={{ marginBottom: -15 }}
                            type="string"
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            value={currencyFormate(
                              parseFloat(newItemDetail[`txt_new_net_value${row.id}`]).toString()
                            )}
                            variant="outlined"
                            onClick={(e) => { e.target.select() }}
                          />


                        </StyledTableCell> */}
                        {/* <StyledTableCell align="center"></StyledTableCell> */}
                        <StyledTableCell align="left"></StyledTableCell>
                        <StyledTableCell align="left"></StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.addBtn}
                        >
                          <Button
                            type="submit"
                            onClick={() => onClickAddItem(row)}
                            className={classes.addBtn}
                            size="large"
                            varient="outlined"
                            color="primary"
                          >
                            Add Items
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
      </GridContainer>

      {/*Review*/}
      <GridContainer className={classes.root}>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard
              cdTitle={
                billDetail.edit ? "Edit Added Items" : "Review Added Items"
              }
              maxHeight={400}
            >
              <TableContainer>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell align="left">Image</StyledTableCell>
                      <StyledTableCell align="left">
                        Item Details
                      </StyledTableCell>
                      <StyledTableCell align="right">Qty</StyledTableCell>
                      <StyledTableCell align="left">Unit</StyledTableCell>
                      <StyledTableCell align="left">Rate</StyledTableCell>
                      <StyledTableCell align="left">Disc%</StyledTableCell>
                      <StyledTableCell align="left">Disc Value</StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                      <StyledTableCell align="left">GST%</StyledTableCell>
                      <StyledTableCell align="left">GST Value</StyledTableCell>
                      <StyledTableCell align="left">Net Value</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {//console.log(allItems, "allItems?.quotation_item_details")} */}
                    {allItems?.quotation_item_details &&
                      allItems.quotation_item_details.map((row, i) => (
                        <StyledTableRow key={i}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            className={classes.id}
                            align="center"
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
                            <IconButton
                              onClick={(e) => onDelete(row, i)}
                              aria-label="delete"
                              className={classes.margin}
                            >
                              <DeleteIcon
                                fontSize="small"
                                style={{ color: "#f44336" }}
                              />
                            </IconButton>
                          </StyledTableCell>

                          <StyledTableCell
                            align="right"
                            className={classes.quantity_field}
                          >

                            <TextField
                              size="small"
                              placeholder="Quantity"
                              name={`txt_quantity${row.item_id}`}
                              style={{ marginBottom: -15 }}
                              type="number"
                              inputProps={{ style: { textAlign: "right" } }}
                              onChange={(e) => onChange(e, row)}
                              id="outlined-basic"
                              fullWidth={true}
                              value={Number(itemDetail[`txt_quantity${row.item_id}`]).toString()}
                              variant="outlined"
                              onClick={(e)=> {e.target.select()}}
                            />
                          </StyledTableCell>
                          <StyledTableCell className={classes.ddl_uom}>
                            <ReactSelect
                              options={allUom}
                              isDisabled={true}
                              formatGroupLabel={(d) => d.label}
                              menuPortalTarget={document.body}
                              onChange={(v) =>
                                setItemDetail({
                                  ...itemDetail,
                                  [`ddl_uom${row.item_id}`]: v,
                                })
                              }
                              value={itemDetail[`ddl_uom${row.item_id}`]}
                              onClick={(e)=> {e.target.select()}}
                            />
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.rate}
                          >
                            <div>
                              <TextField
                                size="small"
                                placeholder="Rate"
                                name={`txt_rate${row.item_id}`}
                                style={{ marginBottom: -15 }}
                                type="number"
                                onChange={(e) => onChange(e, row)}
                                inputProps={{ style: { textAlign: "right" } }}
                                id="outlined-basic"
                                fullWidth={true}
                                value={parseFloat(itemDetail[`txt_rate${row.item_id}`]).toString()}
                                variant="outlined"
                                onClick={(e)=> {e.target.select()}}
                              />
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className={classes.discFiled}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div>
                                <TextField
                                  size="small"
                                  placeholder="Disc%"
                                  name={`txt_disc_per${row.item_id}`}
                                  style={{ marginBottom: -15 }}
                                  type="number"
                                  onChange={(e) => onChange(e, row)}
                                  inputProps={{ style: { textAlign: "right" } }}
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={
                                    parseFloat(itemDetail[`txt_disc_per${row.item_id}`]).toString()
                                  }
                                  variant="outlined"
                                  onClick={(e)=> {e.target.select()}}
                                />
                              </div>
                            </div>
                          </StyledTableCell>
                          {/* disc value  field */}
                          <StyledTableCell
                            align="center"
                            className={classes.discValueFiled}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div>
                                <TextField
                                  size="small"
                                  placeholder="Disc Value"
                                  name={`txt_disc_value${row.item_id}`}
                                  style={{ marginBottom: -15 }}
                                  type="number"
                                  onChange={(e) => onChange(e, row)}
                                  value={
                                    parseFloat(itemDetail[`txt_disc_value${row.item_id}`]).toString()
                                  }
                                  inputProps={{ style: { textAlign: "right" } }}
                                  id="outlined-basic"
                                  fullWidth={true}
                                  variant="outlined"
                                  onClick={(e)=> {e.target.select()}}
                                />
                              </div>
                            </div>
                          </StyledTableCell>

                          <StyledTableCell
                            align="right"
                            className={classes.checked}
                          >
                              {/* {//console.log(itemDetail[`gst_type${row.item_id}`],"itemDetail[`gst_type${row.item_id}`]")} */}
                            <div>
                              <Checkbox
                                // checked={checked[row.item_id]}
                                checked={itemDetail[`gst_type${row.item_id}`] === 1? true : false}
                                name={`chk_gst${row.item_id}`}
                                onChange={(e) => onChange(e, row)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                classes
                              />


                            </div>
                          </StyledTableCell>

                          <StyledTableCell
                            align="center"
                            className={classes.gst_per}
                          >
                            <TextField
                              size="small"
                              placeholder="GST%"
                              name={`txt_gst_per${row.id}`}
                              style={{ marginBottom: -15 }}
                              type="number"
                              onChange={(e) => onChange(e, row)}
                              value={parseFloat(itemDetail[`txt_gst_per${row.item_id}`]).toString()}
                              inputProps={{ style: { textAlign: "right" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              variant="outlined"
                              onClick={(e)=> {e.target.select()}}
                            />
                          </StyledTableCell>

                          <StyledTableCell
                            align="center"
                            className={classes.gst_value}
                          >
                            <TextField
                              size="small"
                              placeholder="GST Value"
                              name={`txt_gst_value${row.id}`}
                              style={{ marginBottom: -15 }}
                              type="number"
                              onChange={(e) => onChange(e, row)}
                              value={parseFloat(itemDetail[`txt_gst_value${row.item_id}`]).toString()}
                              inputProps={{ style: { textAlign: "right" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              variant="outlined"
                              onClick={(e)=> {e.target.select()}}
                            />
                          </StyledTableCell>

                          <StyledTableCell
                            align="right"
                            className={classes.net_value_field}
                          >
                            <div>
                              <TextField
                                size="small"
                                placeholder="Value"
                                name={`txt_net_value${row.item_id}`}
                                style={{ marginBottom: -15 }}
                                type="number"
                                inputProps={{ style: { textAlign: "right" } }}
                                id="outlined-basic"
                                fullWidth={true}
                                value={
                                  parseFloat(itemDetail[`txt_net_value${row.item_id}`]).toString()
                                }
                                // value={
                                //   (Number(itemDetail[`txt_quantity${row.item_id}`]) * 
                                //   ((Number(itemDetail[`txt_rate${row.item_id}`])) - Number(itemDetail[`txt_disc_value${row.item_id}`])))}

                                variant="outlined"
                                onClick={(e)=> {e.target.select()}}
                              />
                            </div>
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
                      mr={1}
                      textAlign="right"
                    >
                      {currencyFormate(
                        (db_total = allItems.quotation_item_details
                          ? allItems.quotation_item_details
                            .reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  itemDetail[`txt_net_value${li.item_id}`]
                                ),
                              0
                            )
                            .toFixed(2)
                          : "00")
                      )}
                      {/* {currencyFormate(net_value=Number(itemDetail.txt_net_value17))} */}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              {/* ---------------Other Charges----------------------------------------------------------- */}
              <Box pt={2}>
                <Grid container>
                  <Grid item xs={3}>
                    <Box className={classes.tableLabel} ml={9} textAlign="left">
                      Other Charges
                    </Box>
                  </Grid>

                  <Grid item xs={3}>
                    <Select
                      options={options}
                      //  formatGroupLabel={(d) => d.label}
                      //  menuPortalTarget={document.body}
                      onChange={(event) => setOtherChargesOption({
                        value: event.value,
                        label: event.value,
                      })}
                      style={{ display: 'flex', margin: '5px' }}
                      value={otherChargesOption[0]?.value}
                      defaultValue={options[0] ? options[0] : options[1]}
                    />

                  </Grid>

                  <Grid item xs={1}>
                    <Select
                      options={option}
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      onChange={(event) => setOtherChargesOption1({
                        value: event.value,
                        label: event.value,
                      })}
                      value={otherChargesOption1[0]?.value}
                      defaultValue={option[0] ? option[0] : option[1]}
                    />

                  </Grid>
                  <Grid item xs={1}>
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
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Button
                      onClick={() => onClickAdd()}
                      style={{ marginTop: -2 }}

                      className={classes.addBtn}
                      size="small"
                      varient="outlined"
                      color="primary"  >
                      Add
                    </Button>
                  </Grid>

               


                </Grid>
              </Box>
              {/* ---------------End Other Charges----------------------------------------------------------- */}

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>



                {/* {//console.log(otherCharges.charges, "otherCharges2")} */}
                <TableContainer style={{ alignSelf: 'left', justifyContent: 'left', alignItems: 'left', width: '30%' }}>
                  <Table aria-label="customized table"
                    style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid', 'alignItems': 'center' }}>
                    {
                      otherCharges.map((item, index) => {
                        //console.log(item, "otherCharges2")
                        return <TableRow>
                          <StyledTableCell align="left">{item.charges ? item.charges : item.otherChargesOption.value}</StyledTableCell>
                          <StyledTableCell align="center">{item.charge_type ? item.charge_type : item.otherChargesOption1.value}</StyledTableCell>

                          <StyledTableCell align="right">{item.charge_amount ? item.charge_amount : item.chargesValue}</StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.deleteAction}
                          >
                            <IconButton
                              onClick={(e) => onClickDeleteChar(e, index)}
                              aria-label="delete"
                              className={classes.margin}
                            >
                              <DeleteIcon
                                fontSize="small"
                                style={{ color: "#f44336" }}
                              />
                            </IconButton>
                          </StyledTableCell>
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
                      {/* {//console.log(allItems.quotation_other_charges, "tttt")} */}
                      {currencyFormate(
                        parseFloat(db_total) + parseFloat(grandTotal)
                      )}
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
              billDetail.edit
                ? "Edit Sales Order Details"
                : "Sales Order Details"
            }
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
                            onSelect={onSelectDetails}
                            // onSelect={() => { }}
                            state={billDetail}
                            onChange={onChangeBillDetail}
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

        <MasterModel
          classicModal={classicModal}
          onCloseModel={onClickCloseMod}
          onClickAddTask={onClickAddTask}
          closeIcon={false}
          width={600}
          height="auto"
          addTodobtn
          closeBtn={true}
          okbtnWith={200}
          appLogo
          modelName="Marudhar"
          okBtnText="Proceed to Delivery Order"
          onClickOk={onClickProcedeDeliveryOrder}

        >
          <StepProceedModel
            step={3}
            title="Success!"
            desc=" Sales Order No "
            generateNo={`${billDetail.txt_sales_order_No}`}
          />
        </MasterModel>
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
            <Button
              onClick={onClickSubmitSalesOrder}
              className={classes.actionbtn}
              variant="outlined"
              color="primary"
              disabled={buttonDisabled}
            >
              Submit Sales Order
            </Button>
          </div>
        </GridItem>
      </GridContainer>

    </ThemeProvider>
  );
};

export default AddQuatationPage;
