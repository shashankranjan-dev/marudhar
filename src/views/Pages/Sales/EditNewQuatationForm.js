import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import { getListStatus } from "../../../services/addStatusService";

// Import Services
import { getEnquiryBySalesId } from "../../../services/saleService/addEnqueryService";
import { getListUom } from "../../../services/uomService";
import {
  updateQuotation,
  getQuotationBySalesId,
} from "../../../services/addNewQuatationFormService";


import TextField from "@material-ui/core/TextField";

import { Input, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";


import { IconButton } from "@material-ui/core";

import { Grid, Box, Checkbox } from "@material-ui/core";
import theme from "../../../theme/theme";
//FOR SEARCHING
import { getSearchItem } from "../../../services/saleService/addEnqueryService";

import React from "react";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { useHistory, useLocation } from "react-router-dom";

import { activeText } from "assets/jss/material-dashboard-pro-react";

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

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

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
import CircularProgress from "@material-ui/core/CircularProgress";
import { StyledTableCell, StyledTableRow } from "./AddEnquiryPage";
import { getAllOtherCharges } from "../../../services/OtherChargesService";


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
  let iflag = 0;
  let iNewFlag = 0;

  //useEffect
  React.useEffect(() => {
    getAllOtherCharges(
      (r) => {
        //console.log(r, "123")
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

  
  React.useEffect(() => {


    //gst enable disable
    setGstDisable(true);
    setNewGstDisable(true);

    setLoading(true);
    fetchData();

    setQouteEdit(true);
    getQuotationBySalesId(
      location.state?.row.sales_id,
      (r) => {
        // //console.log(r.quotation_other_charges.charge_type,"qoc")
        setLoading(false);
        setAllItems(r);
        setOtherCharges(r.quotation_other_charges);
        setBillDetail((prv) => ({
          ...prv,
          sales_id: r.sales_id,
          txt_quotation_no: r.qutNo,
          txt_quotaion_date: dateFormateField(r.qutDate),
          txt_quotation_note: r.quotation_note,
          switch_active_status: r.active_status === "Y" ? true : false,
        }));

        r.quotation_item_details.map((q, i) => {
          //console.log(q, " qty check q")

          setAllTempItems((prv) => ({
            ...prv,
            [`txt_gst_per${q.item_id}`]: q.gst_percentage,
            [`txt_rate${q.item_id}`]: q.mrp,
            [`txt_quantity${q.item_id}`]: q.quantity,
            [`txt_disc_per${q.item_id}`]: q.disc_percentage,

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
            [`gst_type${q.item_id}`]:q.gst_type,
            [`ddl_uom${q.item_id}`]: { value: q.uom_id, label: q.uom_name },
          }));
        });

        r.quotation_other_charges.map((o,i)=>{

          //console.log(o,"qoc")
          
          if (o.charge_type === "+")
          {
            //console.log(o.charge_amount,grandTotal,"reached qoc")
            setGrandTotal((prev) =>  prev + Number(o.charge_amount))
          }
          else{
            setGrandTotal((prev) =>  prev - Number(o.charge_amount))
          }
        })
        
        
        

      },
      (err) => {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );


  },
    []);

  React.useEffect(() => {
    if (searchQuery.length >= 4) {
      onSearchItem();
    } else {
      setNewItems([]);
    }
  }, [searchQuery]);

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
      // //console.log("clicked2")

      if (e.target.checked) {
        iflag = 1;

        // //console.log("clicked", iflag);

        setGstDisable(false);

        const rate = Number(temp_items[`txt_rate${row.item_id}`])
        const qty = Number(temp_items[`txt_quantity${row.item_id}`])
        //console.log("404 ticked....", qty)
        const disc_percentage = itemDetail[`txt_disc_per${row.item_id}`] ? Number(itemDetail[`txt_disc_per${row.item_id}`]) : 0;

        let discValue = calculatePerValue(disc_percentage, rate);
        const afterDiscRate = rate - discValue;
        const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);

        // const gst_value = Number(Number(afterDiscRate) * (Number(gst_rate) / 100)).toFixed(2);

        const gst_amount = Number(Number(afterDiscRate) * Number(qty) * (Number(gst_rate) / 100)).toFixed(2);

        // const netValue = Number( afterDiscRate + gst_amount );
        const netValue = Number(Number(qty) * afterDiscRate) + Number(gst_amount);

        //console.log(rate, "rate");
        //console.log(temp_items, "temp_items");
        //console.log(itemDetail, "itemDetail");
        //console.log(disc_percentage, "disc_percentage")
        //console.log(gst_rate, "gst_rate")

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

        const rate = Number(temp_items[`txt_rate${row.item_id}`])
        const qty = Number(temp_items[`txt_quantity${row.item_id}`])
        const disc_percentage = itemDetail[`txt_disc_per${row.item_id}`] ? Number(itemDetail[`txt_disc_per${row.item_id}`]) : 0;
        const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);
        
        //console.log("404 not ticked....", qty)
        let discValue = calculatePerValue(disc_percentage, rate);

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

    // Rate Check
    if (name === `txt_rate${row.item_id}`) {
      const rate = Number(temp_items[`txt_rate${row.item_id}`])
      setItemDetail((prv) => ({
        ...prv,
        [name]: value,
        [`txt_rate${row.item_id}`]: rate,

      }));
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

      //console.log(value,"value 55")

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
      const disc_percentage = itemDetail[`txt_disc_per${row.item_id}`] ? Number(itemDetail[`txt_disc_per${row.item_id}`]) : Number(temp_items[`txt_disc_per${row.item_id}`])
      const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);
      let discValue = disc_percentage ? calculatePerValue(disc_percentage, rate) : 0;
      const afterDiscRate = rate - discValue;
      let gst_amount = 0;
      let netValue = 0;
      let tick = 0;
      let ticked = document.querySelector(`input[name="chk_gst${row.item_id}"]`);

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
          [`txt_net_value${row.item_id}`]: (netValue).toFixed(2),
          [`txt_rate${row.item_id}`]: afterDiscRate,
          [`txt_disc_value${row.item_id}`]: discValue,
          [`txt_disc_per${row.item_id}`]: disc_percentage,

          [`txt_gst_per${row.item_id}`]: gst_rate,
          [`txt_gst_value${row.item_id}`]: gst_amount,
          [`gst_type${row.item_id}`]: tick,
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
            // [`txt_new_gst_value${r.id}`]: 0,
            [`txt_new_disc_per${r.id}`]: 0,
            // [`txt_new_disc_value${r.id}`]: 0,
            // [`txt_new_rate${r.id}`]: 0,
            // [`txt_new_net_value${r.id}`]: 0,
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
            // [`txt_gst_value${r.id}`]: 0,
            // [`txt_disc_per${r.id}`]: 0,
            // [`txt_disc_value${r.id}`]: 0,
            [`txt_rate${r.id}`]: r.mrp,
            // [`txt_net_value${r.id}`]: 0,
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

  const onClickSubmitQuotation = (e) => {
    e.preventDefault();
    let updateItems = [];
    let chargesItem = [];
    if (allItems.quotation_item_details.length) {
      allItems.quotation_item_details.map((item, i) => {
        updateItems.push({

          item_id: item.item_id,
          quantity: itemDetail[`txt_quantity${item.item_id}`],
          rate: itemDetail[`txt_rate${item.item_id}`],
          mrp: temp_items[`txt_rate${item.item_id}`],
          uom_id: itemDetail[`ddl_uom${item.item_id}`].value,
          uom_name: itemDetail[`ddl_uom${item.item_id}`].label,
          disc_percentage: itemDetail[`txt_disc_per${item.item_id}`],
          disc_value: itemDetail[`txt_disc_value${item.item_id}`],
          gst_percentage: temp_items[`txt_gst_per${item.item_id}`],
          gst_value: itemDetail[`txt_gst_value${item.item_id}`],
          net_value: itemDetail[`txt_net_value${item.item_id}`],
          gst_type: itemDetail[`gst_type${item.item_id}`],
        });
      });

      otherCharges.map((item, index) => {

        chargesItem.push({
          charges: item.otherChargesOption ? item.otherChargesOption.value : item.charges,
          charge_amount: item.chargesValue? item.chargesValue : item.charge_amount,
          charge_type: item.otherChargesOption1? item.otherChargesOption1.value : item.charge_type ,

        });
      });
    }

    updateQuotation(
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
    //console.log(otherCharges,r,id,"qoc")

    if (otherCharges[id].otherChargesOption1 ? 
      otherCharges[id].otherChargesOption1.value === "+" : otherCharges[id].charge_type === "+" ) {

      setGrandTotal(Number(grandTotal) - 
                    Number(otherCharges[id].chargesValue ? 
                      otherCharges[id].chargesValue : 
                      otherCharges[id].charge_amount ));

    }
    else {
      setGrandTotal(Number(grandTotal) + 
        Number(otherCharges[id].chargesValue ? 
        otherCharges[id].chargesValue : 
        otherCharges[id].charge_amount ));
    }

    const restItem = otherCharges.filter((a, i) => id !== i);
    setOtherCharges(restItem);


  }

  //Review Added Items
  const onClickAddItem = (r) => {

    //console.log(r, "check rr")

    if (allItems != []) {

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
            mrp: r.mrp,
            gst_percentage: newItemDetail[`txt_new_gst_per${r.item_id}`],

          },
        );
        allItems.quotation_item_details.map((r, i) => {
          const totalValue = parseFloat(
            (Number(r.quantity) * Number(r.rate)).toFixed(2)
          );

          setItemDetail((prv) => ({
            ...prv,
            [`txt_quantity${r.item_id}`]:itemDetail[`txt_quantity${r.item_id}`]?itemDetail[`txt_quantity${r.item_id}`] : r.quantity,
            [`ddl_uom${r.item_id}`]: { value: r.uom_id, label: r.uom_name },
            [`txt_gst_per${r.item_id}`]: r.gst_percentage,
            [`txt_net_value${r.item_id}`]:itemDetail[`txt_net_value${r.item_id}`] ? itemDetail[`txt_net_value${r.item_id}`] : 0,
          }));

          setAllTempItems((prv) => ({
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
      //console.log("data==>", allItems)

    }
    else {
      allItems.item_details.push(r)
    }

  }

  // Delete Added Item
  const onDelete = (e, index) => {
    //console.log(e, index, "ondel")
    let deleteRef = allItems.quotation_item_details
    deleteRef.splice(index, 1);

    setItemDetail((prv) => ({
      ...prv,
      [`txt_quantity${e.item_id}`]:0,
      [`txt_disc_per${e.item_id}`]:0,
      [`txt_disc_value${e.item_id}`]:0,
      [`ddl_uom${e.item_id}`]: { value: e.uom_id, label: e.uom_name },
      [`txt_gst_per${e.item_id}`]: e.gst_percentage,
      [`txt_net_value${e.item_id}`]:0,
    }));

    setAllTempItems((prv) => ({
      ...prv,
      [`txt_quantity${e.item_id}`]: 0,
      [`txt_gst_per${e.item_id}`]: e.cgst_percentage,
      // [`txt_gst_value${r.id}`]: 0,
      [`txt_disc_per${e.item_id}`]: 0,
      [`txt_disc_value${e.item_id}`]: 0,
      [`txt_rate${e.item_id}`]: e.mrp,
      [`txt_net_value${e.item_id}`]: 0,
    }));
    dispatch({
      type: actionTypes.SET_OPEN_MSG,

      payload: {
        msg: `Item Deleted`,
        msgType: "success",
      },
    });
  };

  //Add OtherCharges
  const onClickAdd = () => {

    if (chargesValue != null && chargesValue != undefined && chargesValue != '') {

      if (otherChargesOption.value === undefined && otherChargesOption1.value === undefined) {
        setOtherCharges([...otherCharges, {
          chargesValue,
          otherChargesOption: {
            value: options[0].value,
            label: options[0].value
          },
          otherChargesOption1: {
            value: option[0].value,
            label: option[0].value
          },

        }])
      } else if (otherChargesOption.value === undefined) {
        setOtherCharges([...otherCharges, {
          chargesValue,
          otherChargesOption: {
            value: options[0].value,
            label: options[0].value
          },
          otherChargesOption1,

        }])
      } else if (otherChargesOption1.value === undefined) {
        setOtherCharges([...otherCharges, {
          chargesValue,
          otherChargesOption,
          otherChargesOption1: {
            value: option[0].value,
            label: option[0].value
          }

        }])
      } else {
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
                                checked={itemDetail[`gst_type${row.item_id}`] === 1 ? true : false}
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

                      {allItems.quotation_item_details
                        ? currencyFormate(
                          allItems.quotation_item_details.reduce(
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
                  {/* {//console.log(option, options, "option")} */}
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

              {/* //New OtherCharges */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>


                       
                <TableContainer style={{ alignSelf: 'left', justifyContent: 'left', alignItems: 'left', width: '30%' }}>
                  <Table aria-label="customized table"
                    style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid', 'alignItems': 'center' }}>
                    {
                      otherCharges.map((item, index) => {

                        return <TableRow>
                          <StyledTableCell align="left">{item.otherChargesOption?.value ?
                                                          item.otherChargesOption.value :
                                                          item.charges}</StyledTableCell>
                          <StyledTableCell align="center">{item.otherChargesOption1?.value ?
                                                          item.otherChargesOption1.value :
                                                          item.charge_type
                                                        }</StyledTableCell>

                          <StyledTableCell align="right">{item.chargesValue? item.chargesValue : item.charge_amount}</StyledTableCell>
                          
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
                      {allItems.quotation_item_details
                        ? currencyFormate(
                          allItems.quotation_item_details.reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(
                                itemDetail[`txt_net_value${li.item_id}`]
                              ),
                            0
                          ) + Number(grandTotal)
                        )
                        : "00"}

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
          onCloseModel={() => setClassicModal(false)}
          onClickAddTask={onClickAddTask}
          closeIcon={false}
          width={600}
          height="auto"
          addTodobtn
          closeBtn={false}
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
