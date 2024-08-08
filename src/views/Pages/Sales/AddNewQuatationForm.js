import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "react-select";
import MuiTable, { ActiveIcon, DeActiveIcon } from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import { getListStatus } from "../../../services/addStatusService";

import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../Components/CustomButton";

// Import Services
import { getEnquiryBySalesId } from "../../../services/saleService/addEnqueryService";
import { getListUom } from "../../../services/uomService";
import {
  postQuotation,
  getQuotationBySalesId,
} from "../../../services/addNewQuatationFormService";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Grid, Box, Checkbox } from "@material-ui/core";
import theme from "../../../theme/theme";
//FOR SEARCHING
import { getSearchItem } from "../../../services/saleService/addEnqueryService";

import React from "react";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { useHistory, useLocation } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox, CompareArrowsOutlined } from "@mui/icons-material";
import ReactSelect from "react-select";
import ItemImg from "../HelperComponent/ItemImg";
import FormComponent from "../HelperComponent/FormComponent";
import { currencyFormate } from "../HelperComponent/utils";
// import { ColoseButton } from "../Components/CustomButton";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
} from "assets/jss/material-dashboard-pro-react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemViewCard from "../HelperComponent/ItemViewCard";
import { PageHeader } from "../HelperComponent/PageTitle";
import {
  calculatePerValue,
  calculatePer,
  currentDate,
} from "../HelperComponent/utils";
import StepProceedModel from "../HelperComponent/StepProceedModel";
import { dateFormateField } from "../HelperComponent/utils";

import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { StyledTableCell, StyledTableRow } from "./AddEnquiryPage";
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle";
import { isValid } from "date-fns";
import { getAllOtherCharges } from "../../../services/OtherChargesService";
// const options = [
//   { value: 'Shipping Charges', label: 'Shipping Charges' },
//   { value: 'Handling Charges', label: 'Handling Charges' },
//   { value: 'Round Off', label: 'Round Off' },
// ];

const option = [
  { value: '+', label: '+' },
  { value: '-', label: '-' },

];
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

const AddQuatationPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  //for search
  const [searchQuery, setSearchQuery] = React.useState("");

  const [classicModal, setClassicModal] = React.useState(false);
  // const [addedItems, setAddedItems] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [allItems, setAllItems] = React.useState({});
  const [newItems, setNewItems] = React.useState({});

  const [allUom, setAllUom] = React.useState([]);
  const [allStatus, setAllStatus] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [billDetail, setBillDetail] = React.useState({
    edit: false,
    sales_id: "",
    txt_quotation_no: "AUTO GENERATED",
    quotation_status: "",
    enquiry_status: "",
    txt_quotation_date: currentDate(),
    txt_quotation_note: "",
  });
  const [checked, setChecked] = React.useState([]);

  const [qouteEdit, setQouteEdit] = React.useState(false);
  const [itemDetail, setItemDetail] = React.useState({});
  //FOR NEW ITEM
  const [newItemDetail, setNewItemDetail] = React.useState({});

  const [otherCharges, setOtherCharges] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  const [chargesValue, setChargesValue] = React.useState(0);
  const [otherChargesOption, setOtherChargesOption] = React.useState({});
  const [otherChargesOption1, setOtherChargesOption1] = React.useState({});
  const [grandTotal, setGrandTotal] = React.useState(0);
  const [temp_items, setAllTempItems] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [gstDisable, setGstDisable] = React.useState(false);
  const [newGstDisable, setNewGstDisable] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [posting,setPosting] = React.useState(false);

  let iflag = 0;
  let iNewFlag = 0;

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
  }, []);

  const onChangeBillDetail = (e) => {
    const { name, value } = e.target;
    setBillDetail({ ...billDetail, [name]: value });
  };


  //For search results
  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setSearchQuery(value);
  };


  const handleChange = (event, row) => {
    setChecked(event.target.checked);
    // //console.log("even called");
  };


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

        //console.log(discPer,"chk 1")
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
      //console.log(temp_items,"chk 02")

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
          // [`txt_disc_value${row.item_id}`]: 0,
          // [`txt_disc_per${row.item_id}`]: 0,
          [`txt_gst_per${row.item_id}`]: gst_rate,
        }));

      } else {
        //console.log("else55", rate, discValue,)
        // if (name === `chk_gst${row.item_id}`) {
        setItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_quantity${row.item_id}`]: value,
          [`txt_net_value${row.item_id}`]: afterDiscRate ?afterDiscRate * value : value *  Number(temp_items[`txt_rate${row.item_id}`]),
          [`txt_rate${row.item_id}`]: afterDiscRate ? afterDiscRate : Number(temp_items[`txt_rate${row.item_id}`]),
          [`txt_disc_per${row.item_id}`]: disc_percentage,
          [`txt_disc_value${row.item_id}`]: discValue,
          [`txt_gst_per${row.item_id}`]: gst_rate,
          [`txt_gst_value${row.item_id}`]: gst_amount,
          [`gst_type${row.item_id}`]: tick,
        }));
      }
    }

    // }

  };

  //On New Change new calculation

  const onNewChange = (e, row) => {
    const { name, value } = e.target;

    setNewGstDisable(true);
    if (name === `chk_new_gst${row.item_id}`) {
      // //console.log("clicked2")

      if (e.target.checked) {
        iNewFlag = 1;

        //console.log("clicked", iNewFlag);

        setNewGstDisable(false);
        const rate = Number(temp_items[`txt_new_rate${row.item_id}`]);
        const qty = Number(newItemDetail[`txt_new_quantity${row.item_id}`]);

        const disc_percentage = Number(newItemDetail[`txt_new_disc_per${row.item_id}`])
        let discValue = calculatePerValue(disc_percentage, rate);
        const afterDiscRate = rate - discValue;
        const gst_rate = Number(temp_items[`txt_new_gst_per${row.item_id}`]);

        // const gst_value = Number(Number(afterDiscRate) * (Number(gst_rate) / 100)).toFixed(2);

        const gst_amount = Number(Number(afterDiscRate) * Number(qty) * (Number(gst_rate) / 100)).toFixed(2);

        // const netValue = Number( afterDiscRate + gst_amount );
        const netValue = Number(qty) * Number(afterDiscRate) + Number(gst_amount);

        //console.log(netValue, afterDiscRate, "netvaluenew afterDiscRate");
        //console.log(disc_percentage, qty, "disc_percentagenew qty");
        //console.log(gst_rate, "gst_rate");

        setNewItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_new_quantity${row.item_id}`]: qty,

          [`txt_new_rate${row.item_id}`]: afterDiscRate,
          [`txt_new_disc_value${row.item_id}`]: discValue,
          [`txt_new_gst_per${row.item_id}`]: gst_rate,
          [`txt_new_gst_value${row.item_id}`]: gst_amount,
          [`txt_new_net_value${row.item_id}`]: netValue.toFixed(2),
          [`new_gst_type${row.item_id}`]: "Ex",
        }));
        //}

      }
      else {
        iNewFlag = 2;
        //console.log("not ticked")
        setNewGstDisable(true);

        const rate = Number(temp_items[`txt_new_rate${row.item_id}`])
        const qty = Number(newItemDetail[`txt_new_quantity${row.item_id}`])
        const disc_percentage = Number(newItemDetail[`txt_new_disc_per${row.item_id}`])

        //console.log("not ticked....", qty)
        let discValue = calculatePerValue(disc_percentage, rate);

        const afterDiscRate = rate - discValue;

        const netValue = qty * afterDiscRate;


        setNewItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_new_quantity${row.item_id}`]: qty,
          [`txt_new_net_value${row.item_id}`]: (netValue).toFixed(2),
          [`txt_new_rate${row.item_id}`]: afterDiscRate,
          [`txt_new_disc_value${row.item_id}`]: discValue,
          [`txt_new_gst_value${row.item_id}`]: 0,
          [`txt_new_gst_per${row.item_id}`]: 0,
          [`new_gst_type${row.item_id}`]: "Ex",
        }));
        // }

      }
    }

    // Discount Percent Check
    if (name === `txt_new_disc_per${row.item_id}`) {

      const rate = Number(temp_items[`txt_new_rate${row.item_id}`])
      const qty = Number(newItemDetail[`txt_new_quantity${row.item_id}`])
      const gst_rate = Number(temp_items[`txt_new_gst_per${row.item_id}`]);


      if (!value) {


        const netValue = qty * rate;
        setNewItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_new_quantity${row.item_id}`]: qty,
          [`txt_new_rate${row.item_id}`]: rate,
          [`txt_new_net_value${row.item_id}`]: Number((netValue).toFixed(2)
          ),
          // [`txt_gst_value${row.item_id}`]: 0,
          [`txt_new_disc_value${row.item_id}`]: 0,
        }));

      }
      else {
        let netValue = 0;
        let gst_amount = 0;

        let discValue = calculatePerValue(value, rate);
        const afterDiscRate = Number(temp_items[`txt_new_rate${row.item_id}`]) - discValue;

        let ticked = document.querySelector(`input[name="chk_new_gst${row.item_id}"]`);
        if (ticked.checked) {

          //console.log("Hello World444", gst_rate);
          gst_amount = Number((Number(afterDiscRate) * Number(qty)) * (Number(gst_rate) / 100)).toFixed(2);

          //console.log("Hello World666", gst_amount);
          netValue = Number(Number(qty) * afterDiscRate) + Number(gst_amount);
        }

        else {
          //console.log(afterDiscRate, "Hello World555");
          netValue = qty * afterDiscRate;
        }

        //console.log("Hello World777", afterDiscRate);
        setNewItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_new_quantity${row.item_id}`]: qty,
          [`txt_new_rate${row.item_id}`]: afterDiscRate,
          [`txt_new_disc_value${row.item_id}`]: discValue,
          [`txt_new_net_value${row.item_id}`]: (netValue).toFixed(2),
          [`txt_new_gst_per${row.item_id}`]: gst_rate,
          [`txt_new_gst_value${row.item_id}`]: gst_amount,
          [`new_gst_type${row.item_id}`]: "Ex",
        }));
      }
    }
    // Discount Value Check
    else if (name === `txt_new_disc_value${row.item_id}`) {

      const rate = Number(temp_items[`txt_new_rate${row.item_id}`])
      const qty = Number(newItemDetail[`txt_new_quantity${row.item_id}`])
      const gst_rate = Number(temp_items[`txt_new_gst_per${row.item_id}`]);


      if (!value) {


        const netValue = qty * rate;
        setNewItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_new_quantity${row.item_id}`]: qty,
          [`txt_new_rate${row.item_id}`]: rate,
          [`txt_new_net_value${row.item_id}`]: Number((netValue).toFixed(2)
          ),
          // [`txt_gst_value${row.item_id}`]: 0,
          [`txt_new_disc_value${row.item_id}`]: 0,
        }));

      }
      else {
        let netValue = 0;
        let gst_amount = 0;

        let discPer = calculatePer(value, rate);
        let discValue = value;
        const afterDiscRate = Number(temp_items[`txt_new_rate${row.item_id}`]) - discValue;

        let ticked = document.querySelector(`input[name="chk_new_gst${row.item_id}"]`);
        if (ticked.checked) {

          //console.log("Hello World444", gst_rate);
          gst_amount = Number((Number(afterDiscRate) * Number(qty)) * (Number(gst_rate) / 100)).toFixed(2);

          //console.log("Hello World666", gst_amount);
          netValue = Number(Number(qty) * afterDiscRate) + Number(gst_amount);
        }

        else {
          //console.log("Hello World555");
          netValue = qty * afterDiscRate;
        }

        //console.log("Hello World777", gst_amount);
        setNewItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_new_quantity${row.item_id}`]: qty,
          [`txt_new_rate${row.item_id}`]: afterDiscRate,
          [`txt_new_disc_per${row.item_id}`]: discPer,
          [`txt_new_disc_value${row.item_id}`]: discValue,
          [`txt_new_net_value${row.item_id}`]: (netValue).toFixed(2),
          [`txt_new_gst_per${row.item_id}`]: gst_rate,
          [`txt_new_gst_value${row.item_id}`]: gst_amount,
          [`new_gst_type${row.item_id}`]: "Ex",
        }));
      }
    }

    ////quantity check
    else if (name === `txt_new_quantity${row.item_id}`) {

      setAllTempItems((prv) => ({
        ...prv,
        [`txt_new_quantity${row.item_id}`]: value,
      }));

      const rate = Number(temp_items[`txt_new_rate${row.item_id}`])
      const disc_percentage = Number(newItemDetail[`txt_new_disc_per${row.item_id}`])
      const gst_rate = Number(temp_items[`txt_new_gst_per${row.item_id}`]);
      let discValue = calculatePerValue(disc_percentage, rate);
      const afterDiscRate = rate - discValue;
      let gst_amount = 0;
      let netValue = 0;

      let ticked = document.querySelector(`input[name="chk_new_gst${row.item_id}"]`);
      if (ticked.checked) {

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
        setNewItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_new_net_value${row.item_id}`]: Number(
            (netValue).toFixed(2)
          ),
          [`txt_new_quantity${row.item_id}`]: 0,
          // [`txt_gst_value${row.item_id}`]: 0,
          [`txt_new_disc_value${row.item_id}`]: 0,
          [`txt_disc_per${row.item_id}`]: 0,
        }));

      } else {
        // if (name === `chk_gst${row.item_id}`) {
        setNewItemDetail((prv) => ({
          ...prv,
          [name]: value,
          [`txt_new_quantity${row.item_id}`]: value,
          [`txt_new_net_value${row.item_id}`]: (netValue).toFixed(2),
          [`txt_new_rate${row.item_id}`]: afterDiscRate,
          [`txt_new_disc_value${row.item_id}`]: discValue,
          [`txt_new_gst_per${row.item_id}`]: gst_rate,
          [`txt_new_gst_value${row.item_id}`]: gst_amount,
          [`new_gst_type${row.item_id}`]: "Ex",
        }));
      }
    }

    // }

  };

  // search Item by api

  const onSearchItem = () => {
    getSearchItem(
      (items) => {
        //console.log(items, "ii")
        setNewItems(items);
        items.map((r, i) => {
          setNewItemDetail((prv) => ({
            ...prv,
            // [`txt_new_quantity${r.id}`]: 0,
            [`txt_new_gst_per${r.id}`]: r.cgst_percentage,
            [`txt_new_gst_value${r.id}`]: 0,
            [`txt_new_disc_per${r.id}`]: 0,
            [`txt_new_disc_value${r.id}`]: 0,
            [`txt_new_rate${r.id}`]: 0,
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
            // [`txt_quantity${r.id}`]: 0,
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

  //console.log(searchQuery, "searchQuery")

  const formData = [
    {
      formName: "BillDetails",
      fields: [
        {
          disabled: true,
          name: "txt_quotation_no",
          label: "Quotation No",
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
          name: "txt_quotation_date",
          label: "Date",
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
          name: "txt_quotation_note",
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
          lg: 7,
        },
      ],
    },
  ];

  const onClickClose = (e) => {
    history.push({
      pathname: "/admin/sales/enquiry",
    });
  }

  const onClickCloseQuotation = (e) => {
    history.push({
      pathname: "/admin/sale/quatation",
    });
  }

  
  const onClickSubmitQuotation = (e) => {
    
    e.preventDefault();

    getQuotationBySalesId(
      location.state?.row.sales_id,
      (r) => {
        //console.log("quoso", r);
        if(r.qutNo) {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: "Quotation already created", msgType: "error" },
          });
        }

        else {
            let updateItems = [];
            let chargesItem = [];
            if (allItems.item_details.length) {
              allItems.item_details.map((item, i) => {
    
              updateItems.push({
                  item_id: item.item_id,
                  quantity: Number(itemDetail[`txt_quantity${item.item_id}`]),
                  rate: itemDetail[`txt_rate${item.item_id}`],
                  mrp: temp_items[`txt_rate${item.item_id}`],
                  uom_id: itemDetail[`ddl_uom${item.item_id}`].value,
                  uom_name: itemDetail[`ddl_uom${item.item_id}`].label,
                  disc_percentage: itemDetail[`txt_disc_per${item.item_id}`],
                  disc_value: itemDetail[`txt_disc_value${item.item_id}`],
                  gst_percentage: temp_items[`txt_gst_per${item.item_id}`],
                  gst_value: itemDetail[`txt_gst_value${item.item_id}`],
                  net_value: itemDetail[`txt_net_value${item.item_id}`],
                  gst_type: itemDetail[`gst_type${item.item_id}`]?itemDetail[`gst_type${item.item_id}`] : 0,
                  insert_mode:"Web"
                });
              });
    
              // if (otherCharges?.length) {
              //console.log("reached other if")
              otherCharges.map((item, index) => {
                chargesItem.push({
                  charges: item.otherChargesOption.value,
                  charge_amount: item.chargesValue,
                  charge_type: item.otherChargesOption1.value,
    
                });
              });
          
    
            }
    
            allItems.item_details.map((item, i) => {
    
              //console.log(item,"5656")
              Number(itemDetail[`txt_quantity${item.item_id}`]) === 0 ?
            
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: { msg: "Please Enter Quantity", msgType: "error" },
              }) 
              
              :
            
              postQuotation(
                billDetail,
                updateItems,
                chargesItem,
                (r) => {
                  dispatch({
                    type: actionTypes.SET_OPEN_MSG,
                    payload: {
                      msg: billDetail.edit
                        ? "Quotation Updated Successfully"
                        : "Quotation Submited Successfully",
                      msgType: "success",
                    },
                  });
                  setClassicModal(true);
                  if (!billDetail.edit) {
                    setBillDetail((prv) => ({
                      ...prv,
                      sales_id: r.sales_id,
                      txt_quotation_no: r.quotation_no,
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
            })
        }
        setButtonDisabled(true);
      },

      (err) => {
        //console.log("Error");
      }
      
    );

   
       
  };





  const fetchData = () => {
    getListStatus(
      "Sales",
      (r) => {
        setAllStatus(r);
        r.forEach((s, i) => {
          if (s.label === "Quoted") {
            setBillDetail((prv) => ({ ...prv, enquiry_status: s.value, quotation_status: '22', }));
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
  };

  const onClickProcedeSalesOrder = () => {
    setClassicModal(false);
    history.push({
      pathname: "/admin/sales/add-new-sales-order",
      state: {
        row: { sales_id: billDetail.sales_id },
      },
    });
  };

  const onClickAddTask = () => {
    history.push({
      pathname: "/admin/sale/quatation-view",
      state: {
        row: { sales_id: billDetail.sales_id },
        updateTask: true,
      },
    });
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

  //Review Added Items
  const onClickAddItem = (r) => {
    // //console.log("on add click", otherCharges, r)
    // debugger;

    if (allItems != []) {
      if (allItems.item_details.find((v, i) => v.item_id === r.item_id)) {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Item already added", msgType: "info" },
        });
      }
      else {

        //   allItems.item_details.push(r)
        // //console.log(newItemDetail[`txt_new_quantity${r.item_id}`],"monday")
        allItems.item_details.push(
          {
            item_id: r.item_id,
            uom_name: r.uom_name,
            uom_id: r.uom_id,
            selling_price: r.mrp,
            gst_percentage: newItemDetail[`txt_new_gst_per${r.item_id}`],
            gstvalue: newItemDetail[`txt_new_gst_value${r.item_id}`],
            disc_percentage: newItemDetail[`txt_new_disc_per${r.item_id}`],
            disc_value: newItemDetail[`txt_new_disc_value${r.item_id}`],
            quantity: newItemDetail[`txt_new_quantity${r.item_id}`],
            totalValue: newItemDetail[`txt_new_net_value${r.item_id}`],
          },
        );
        allItems.item_details.map((r, i) => {
          const totalValue = parseFloat(
            (Number(r.quantity) * Number(r.selling_price)).toFixed(2)
          );
          const gstValue = calculatePerValue(r.gst_percentage, totalValue);
          setItemDetail((prv) => ({
            ...prv,
            [`txt_quantity${r.item_id}`]: r.quantity?r.quantity:0,
            [`ddl_uom${r.item_id}`]: { value: r.uom_id, label: r.uom_name },
            [`txt_rate${r.item_id}`]: r.selling_price,
            // [`txt_disc_per${r.item_id}`]: 0,
            // [`txt_disc_value${r.item_id}`]: r.disc_value,
            [`txt_gst_per${r.item_id}`]: r.gst_percentage,
            // [`txt_gst_value${r.item_id}`]: gstValue,
            [`txt_net_value${r.item_id}`]:totalValue ? totalValue : 0,
            //   Number(totalValue) + Number(calculatePerValue(r.gst_percentage, totalValue)),
            // [`txt_net_value${r.item_id}`]: Number(totalValue),
          }));
          setAllTempItems((prv) => ({
            ...prv,
            [`txt_rate${r.item_id}`]: r.selling_price,
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
      //console.log("data==>", allItems)

    }
    else {
      allItems.item_details.push(r)
    }

  }

  // Delete Added Item
  const onDelete = (e, index) => {
    //console.log(e, index, "ondel")
    let deleteRef = allItems.item_details
    deleteRef.splice(index, 1);
    dispatch({
      type: actionTypes.SET_OPEN_MSG,

      payload: {
        msg: `Item Deleted`,
        msgType: "success",
      },
    });
  };




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
  }

  // //console.log(otherChargesOption,"defchk")


  React.useEffect(() => {

    //gst enable disable
    setGstDisable(true);
    setNewGstDisable(true);

    setLoading(true);
    fetchData();
    if (location.state?.edit) {

      setQouteEdit(true);
      getQuotationBySalesId(
        location.state?.row.sales_id,
        (r) => {
          setLoading(false);
          setAllItems(r);
          setBillDetail((prv) => ({
            ...prv,
            // edit: location.state?.edit,
            sales_id: r.sales_id,
            txt_quotation_no: r.qutNo,
            txt_quotaion_date: dateFormateField(r.qutDate),
            txt_quotation_note: r.quotation_note,
            switch_active_status: r.active_status === "Y" ? true : false,
          }));

          r.quotation_item_details.map((q, i) => {
            //console.log(r, " qty check r")

            setAllTempItems((prv) => ({
              ...prv,
              [`txt_gst_per${q.item_id}`]: q.gst_percentage,
              [`txt_rate${q.item_id}`]: q.mrp,
              [`txt_quantity${q.item_id}`]: q.quantity,
              [`txt_disc_per${q.item_id}`]:q.disc_percentage,

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
      getEnquiryBySalesId(
        location.state?.row.sales_id,
        (items) => {
          setLoading(false);
          setAllItems(items);
          setBillDetail((prv) => ({
            ...prv,
            sales_id: items.sales_id,
            txt_quotation_no: items.quotation_no,
          }));

          //keeping gst per for temp calculation

          items.item_details.map((r, i) => {
            //console.log(r, "check r")
            setAllTempItems((prv) => ({
              ...prv,
              [`txt_gst_per${r.item_id}`]: r.gst_percentage,
              [`txt_rate${r.item_id}`]: r.selling_price,
              [`txt_quantity${r.item_id}`]: r.quantity,
              [`txt_disc_per${r.item_id}`]: 0,

            }));

            const totalValue = parseFloat(
              (Number(r.quantity) * Number(r.selling_price)).toFixed(2)
            );
            // const gstValue = calculatePerValue(r.gst_percentage, totalValue);
            setItemDetail((prv) => ({
              ...prv,
              [`txt_quantity${r.item_id}`]: r.quantity,
              [`ddl_uom${r.item_id}`]: { value: r.uom_id, label: r.uom_name },
              [`txt_rate${r.item_id}`]: r.selling_price,
              [`txt_disc_per${r.item_id}`]: 0,
              [`txt_disc_value${r.item_id}`]: 0,
              [`txt_gst_per${r.item_id}`]: r.gst_percentage,
              [`txt_gst_value${r.item_id}`]: 0,
              [`txt_net_value${r.item_id}`]: Number(totalValue),
              // [`txt_net_value${r.item_id}`]:
              //   (Number(totalValue) + Number(calculatePerValue(r.gst_percentage, totalValue))).toFixed(2),
            }));

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
    }

  },
    []);

  React.useEffect(() => {
    if (searchQuery.length >= 6) {
      onSearchItem();
    } else {
      setNewItems([]);
    }
  }, [searchQuery]);

  return (
    <ThemeProvider theme={theme}>
      <PageHeader
        title={
          qouteEdit
            ? "Sales > Quotation > Edit"
            : "Sales > Quotation > Add"
        }
      />
      {/* Select and Add Items */}
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Enquiry">
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Enquiry Date</StyledTableCell>
                    <StyledTableCell align="left">Enquiry No</StyledTableCell>
                    <StyledTableCell align="left">Customer</StyledTableCell>
                    <StyledTableCell align="left">
                      Sales Executive
                    </StyledTableCell>
                    <StyledTableCell align="left"> Showroom / warehouse </StyledTableCell>
                    <StyledTableCell align="left">Source</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.endate}>
                      {allItems.enqDate}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.endate}>
                      {allItems.enqNo}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.engNo}>
                      {allItems.enqCustomer}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.enCustomerName}
                    >
                      {allItems.enqSalesExecutive}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.enqCustomer}
                    >
                      {allItems.enqShowroom}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.enqEmail}>
                      {allItems.enqSource}
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
        </GridItem>
      </GridContainer>






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
                />
              </GridItem>
            </GridContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>




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
                      {/* <StyledTableCell align="right">Qty</StyledTableCell>
                      <StyledTableCell align="left">Unit</StyledTableCell>
                      <StyledTableCell align="left">Rate</StyledTableCell>
                      <StyledTableCell align="left">Disc%</StyledTableCell>
                      <StyledTableCell align="left">Disc Value</StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                      <StyledTableCell align="left">GST%</StyledTableCell>
                      <StyledTableCell align="left">GST Value</StyledTableCell>
                      <StyledTableCell align="left">Net Value</StyledTableCell> */}
                      {/* {<StyledTableCell align="center">Action</StyledTableCell>} */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {//console.log("newItems is:\n" + JSON.stringify(newItems, null, 2))} */}
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
                            onClick={(e) => { e.target.select() }}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.unit}
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

                        </StyledTableCell>

                        <StyledTableCell
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
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          className={classes.valueField}
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
                        {/* disc value  field */}
                        {/* <StyledTableCell
                          align="center"
                          className={classes.valueField}
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
                        </StyledTableCell> */}

                        {/* check box */}
                        {/* <StyledTableCell
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
                        </StyledTableCell> */}

                        {<StyledTableCell
                          align="right"
                          className={classes.addBtn}
                        >
                           <Button
                            type="submit"
                            onClick={() => onClickAddItem(row)}
                            className={classes.addBtn}
                            size="small"
                            varient="outlined"
                            color="primary"
                          >
                            Add Items
                          </Button>
                        </StyledTableCell>}
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
                  stickyHeader
                  aria-label="sticky table"
                  className={classes.table}
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

                      <StyledTableCell
                        align="right"
                        className={classes.viewValue}
                      >
                        Rate
                      </StyledTableCell>

                      <StyledTableCell align="right">Disc%</StyledTableCell>
                      <StyledTableCell align="right">Disc Value</StyledTableCell>
                      <StyledTableCell align="right">GST%</StyledTableCell>
                      <StyledTableCell align="right">GST Value</StyledTableCell>
                      <StyledTableCell align="right">Net Value</StyledTableCell>
                      <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
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
                          {/* {//console.log(row.quantity,"4545")} */}
                          {row.quantity}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.viewno}
                        >
                          {row.uom_name}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.viewValue}
                        >
                          {currencyFormate(row.mrp)}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.viewno}
                        >
                          {row.disc_percentage}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.discValue}
                        >
                          {currencyFormate(row.disc_value)}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.viewno}

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
                          className={classes.viewTotalValue}
                        >
                          {currencyFormate(row.net_value)}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.deleteAction}
                        >
                          <IconButton
                            onClick={(e) => onDeleteItem(e, i)}
                            aria-label="delete"
                            className={classes.margin}
                          >
                            <DeleteIcon
                              fontSize="small"
                              style={{ color: "#f44336" }}
                            />
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
                  <Grid item xs={5}>

                  </Grid>
                </Grid>
              </Box>

              <Box pt={2}>
                <Grid container>

                  <Grid item xs={3}>
                    <Box className={classes.otherCharges} ml={9} textAlign="right">
                      Other Charges
                    </Box>
                  </Grid>

                  <Grid item xs={3}>
                    <Select

                      options={options}
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      onChange={(event) =>
                        setOtherChargesOption({
                          value: event.value,
                          label: event.value,
                        })}
                      //defaultValue={options[0]}
                      style={{ display: 'flex', margin: '5px' }}
                      value={otherChargesOption}
                    />

                  </Grid>

                  <Grid item xs={1}>
                    <Select options={option}
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      onChange={(event) => setOtherChargesOption1({
                        value: event.value,
                        label: event.value,
                      })}
                      value={otherChargesOption1}
                      //defaultValue={option[0]}
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
                      onClick={() => onClickAddOtherCharges()}
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
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>



                <TableContainer style={{ alignSelf: 'left', justifyContent: 'left', alignItems: 'left', width: '30%' }}>
                  <Table aria-label="customized table"
                    style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid', 'alignItems': 'center' }}>
                    {
                      otherCharges.map((item, index) => {
                        // { //console.log("on map function", item) }
                        return <TableRow>
                          <StyledTableCell align="left">{item.otherChargesOption.value}</StyledTableCell>
                          <StyledTableCell align="center">{item.otherChargesOption1.value}</StyledTableCell>
                          <StyledTableCell align="right">{item.chargesValue}</StyledTableCell>
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
                      mr={1}
                      textAlign="right"
                    >
                      {addedItems.length
                        ? currencyFormate(
                          addedItems.reduce(
                            (sum, li) => Number(sum) + Number(li.net_value) + Number(grandTotal),
                            0
                          )
                        )
                        : "00"}


                      {/* {allItems.item_details
                        ? currencyFormate(
                            allItems.item_details.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  itemDetail[`txt_net_value${li.item_id}`]
                                )
                            )+Number(grandTotal)
                            
                          )
                        : "00"} */}
                    </Box>
                  </Grid>
                  <Grid item xs={5}>

                  </Grid>
                </Grid>
              </Box>
            </CustomCard>
          </GridItem>
        )}

        {(addedItems.length > 0 || billDetail.edit) && (
          <GridItem xs="12">
            <CustomCard
              cdTitle="Quotation Details"
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

                              // onMenuOpen={onMenuOpen}
                              // onSelect={onSelectDetails}
                              state={billDetail}
                              onChange={onChangeBillDetail}
                              // error={error}
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

        )}
        <MasterModel
          classicModal={classicModal}
          onCloseModel={() => setClassicModal(false)}
          width={600}
          height="auto"
          addTodobtn
          closeBtn={true}
          closeIcon={false}
          okbtnWith={200}
          appLogo
          modelName="Marudhar"
          okBtnText="Proceed to Sales Order"
          onClickOk={onClickProcedeSalesOrder}
        >
          <StepProceedModel
            step={2}
            title="Success!"
            desc="Quotation No"
            generateNo={`${billDetail.txt_quotation_no}`}
          />
        </MasterModel>
        {(addedItems.length > 0 || billDetail.edit) && (
          {/* <GridItem xs={12}>
            <div className={classes.actionbtns}>
              <Button
                onClick={onClickSubmitQuation}
                className={classes.actionbtn}
                variant="outlined"
                color="primary"
              >
                Submit Quotation
              </Button>
            </div>
          </GridItem> */}
        )}

        {/* <MasterModel
          classicModal={openModes.addNewCustomer}
          onCloseModel={() =>
            setOpenModel({ ...openModes, addNewCustomer: false })
          }
          width={1200}
          height="auto"
          appLogo
          okbtnWith={200}
          closeBtn={false}
          modelName="Marudhar"
          okbtn={false}
          onClickOk={() => {}}
        >
          <Box p={1}>
            <AddCustomerPage menuPortal={false} />
          </Box>
        </MasterModel> */}
      </GridContainer>









      <GridContainer className={classes.root}>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard
              cdTitle={
                billDetail.edit ? "Edit Added item " : "Review Added Items"
              }
              maxHeight={400}
            >
              <TableContainer>
                <Table className={classes.table} aria-label="customized table">
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
                      <StyledTableCell align="left"></StyledTableCell>
                      <StyledTableCell align="left">GST%</StyledTableCell>
                      <StyledTableCell align="left">GST Value</StyledTableCell>
                      <StyledTableCell align="left">Net Value</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allItems?.item_details &&
                      allItems.item_details.map((row, i) => (
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
                              value={Number(itemDetail[`txt_quantity${row.item_id}`]).toString()}
                              variant="outlined"
                              onClick={(e) => { e.target.select() }}
                            />
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.ddl_uom}
                          >
                            {/* <ReactSelect
                                options={allUom}
                                formatGroupLabel={(d) => d.label}
                                menuPortalTarget={document.body}
                                onChange={(v) =>
                                  setNewItemDetail({
                                    ...itemDetail,
                                    [`ddl_uom${row.item_id}`]: v,
                                  })
                                }
                                value={itemDetail[`ddl_uom${row.item_id}`]}
                              /> */}

                            <TextField
                              size="small"
                              placeholder="Unit"
                              name={`ddl_uom${row.item_id}`}
                              style={{ marginBottom: -15 }}
                              inputProps={{ style: { textAlign: "right" } }}
                              onChange={(e) => onNewChange(e, row)}
                              id="outlined-basic"
                              fullWidth={true}
                              value={row.uom_name}
                              variant="outlined"
                              onClick={(e) => { e.target.select() }}
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
                                onClick={(e) => { e.target.select() }}
                                variant="outlined"
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
                                  value={parseFloat(itemDetail[`txt_disc_per${row.item_id}`]).toString()}
                                  onClick={(e) => { e.target.select() }}
                                  variant="outlined"
                                />
                              </div>
                            </div>
                          </StyledTableCell>
                          {/* disc value  field */}
                          <StyledTableCell
                            align="center"
                            className={classes.discValueFiled}
                          >
                            <TextField
                              size="small"
                              placeholder="Disc Value"
                              name={`txt_disc_value${row.item_id}`}
                              style={{ marginBottom: -15 }}
                              type="number"
                              onChange={(e) => onChange(e, row)}
                              value={parseFloat(itemDetail[`txt_disc_value${row.item_id}`]).toString()}
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
                            className={classes.gst_per}
                          >
                            <TextField
                              size="small"
                              placeholder="GST%"
                              name={`txt_gst_per${row.item_id}`}
                              style={{ marginBottom: -15 }}
                              type="number"
                              onChange={(e) => onChange(e, row)}
                              value={parseFloat(itemDetail[`txt_gst_per${row.item_id}`]).toString()}
                              inputProps={{ style: { textAlign: "right" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              variant="outlined"
                              disabled={gstDisable}
                              onClick={(e) => { e.target.select() }}
                            />
                          </StyledTableCell>


                          <StyledTableCell
                            align="center"
                            className={classes.gst_value}
                          >
                            <TextField
                              size="small"
                              placeholder="GST Value"
                              name={`txt_gst_value${row.item_id}`}
                              style={{ marginBottom: -15 }}
                              type="number"
                              onChange={(e) => onChange(e, row)}
                              value={parseFloat(itemDetail[`txt_gst_value${row.item_id}`]).toString()}
                              inputProps={{ style: { textAlign: "right" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              variant="outlined"
                              disabled={gstDisable}
                              onClick={(e) => { e.target.select() }}
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
                                type="string"
                                inputProps={{ style: { textAlign: "right" } }}
                                id="outlined-basic"
                                fullWidth={true}
                                value={parseFloat(itemDetail[`txt_net_value${row.item_id}`])}
                                variant="outlined"
                                onClick={(e) => { e.target.select() }}
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

                      {allItems.item_details
                        ? currencyFormate(
                          allItems.item_details.reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(itemDetail[`txt_net_value${li.item_id}`]),
                            0
                          )
                        )
                        : "00"}
                    </Box>
                  </Grid>
                  <Grid item xs={5}>

                  </Grid>
                </Grid>
              </Box>

              <Box pt={2}>
                <Grid container>
                  <Grid item xs={3}>
                    <Box className={classes.otherCharges} ml={9} textAlign="right">
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
                  {/* {//console.log(option,options,"option")} */}
                  <Grid item xs={1}>
                    <Select
                      options={option}
                      defaultValue={option[0] ? option[0] : option[1]}
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      onChange={(event) =>
                        setOtherChargesOption1({
                          value: event.value,
                          label: event.value,
                        })}
                      value={otherChargesOption1[0]?.value}
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
                      onClick={(e) => { e.target.select() }}
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
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>



                <TableContainer style={{ alignSelf: 'left', justifyContent: 'left', alignItems: 'left', width: '30%' }}>
                  <Table aria-label="customized table"
                    style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid', 'alignItems': 'center' }}>
                    {
                      otherCharges.map((item, index) => {

                        return <TableRow>
                          <StyledTableCell align="left">{item.otherChargesOption.value}</StyledTableCell>
                          <StyledTableCell align="center">{item.otherChargesOption1.value}</StyledTableCell>

                          <StyledTableCell align="right">{item.chargesValue}</StyledTableCell>
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
                      mr={1}
                      textAlign="right"
                    >
                      {allItems.item_details
                        ? currencyFormate(
                          allItems.item_details.reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                itemDetail[`txt_net_value${li.item_id}`]
                              ),
                            0
                          ) + Number(grandTotal)
                        )
                        : "00"}

                      {/* {allItems.item_details
                        ? currencyFormate(
                            allItems.item_details.reduce(
                              (sum, li) =>
                                Number(sum) +
                                Number(
                                  itemDetail[`txt_net_value${li.item_id}`]
                                )
                            )+Number(grandTotal)
                            
                          )
                        : "00"} */}
                    </Box>
                  </Grid>
                  <Grid item xs={5}>

                  </Grid>
                </Grid>
              </Box>
            </CustomCard>
          )}
        </GridItem>

        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard
              cdTitle={
                billDetail.edit ? "Edit Quotation Details" : "Quotation Detail"
              }
              width="100%"
              height="100%"
            >
              {formData.map((form, fkey) => {
                return (
                  <GridContainer key={fkey} style={{ padding: "5px 20px" }}>
                    {form.formName === "BillDetails" &&
                      form.fields.map((item, key) => {
                        return (
                          <FormComponent
                            item={item}
                            key={key}
                            onSelect={() => { }}
                            state={billDetail}
                            onChange={onChangeBillDetail}
                            error={{}}
                          />
                        );
                      })}
                  </GridContainer>
                );
              })}
            </CustomCard>
          )}
        </GridItem>
        <MasterModel
          classicModal={classicModal}
          onCloseModel={onClickCloseQuotation}
          onClickAddTask={onClickAddTask}
          closeIcon={false}
          width={600}
          height="auto"
          addTodobtn
          closeBtn={true}
          okbtnWith={200}
          appLogo
          modelName="Marudhar"

          okBtnText="Proceed to Sales Order"
          onClickOk={onClickProcedeSalesOrder}
        >
          <StepProceedModel
            step={2}
            title="Success!"
            desc="Quotation No"
            generateNo={`${billDetail.txt_quotation_no}`}
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
              onClick={onClickSubmitQuotation}
              className={classes.actionbtn}
              variant="outlined"
              color="primary"
              disabled={buttonDisabled}
            >
              Submit Quotation
            </Button>
          </div>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default AddQuatationPage;
