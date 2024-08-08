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
//SERVICE
import { getListVendor } from "../../../services/vendorService";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import {
  postDirectPurchase,
  getDirectPurchaseByIdedit,
  updateDirectPurchase,
  getVendorByVendorName,
} from "../../../services/directPurchaseFormService";
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";

import { getSearchItem } from "../../../services/saleService/addEnqueryService";
import { getListUom } from "../../../services/uomService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Paper, Grid, Box, Checkbox } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import { useLocation } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import ItemViewCard from "../HelperComponent/ItemViewCard";
import theme from "../../../theme/theme";

import React from "react";
import ReactSelect from "react-select";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";

// import { ColoseButton } from "../Components/CustomButton";

import {
  appScrollBar,
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
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
import PageTitle from "../HelperComponent/PageTitle";
import ItemImg from "../HelperComponent/ItemImg";
import FormComponent from "../HelperComponent/FormComponent";
import {
  calculatePerValue,
  calculatePer,
  currencyFormate,
  currentDate,
  dateFormateField,
  currentDate1,
} from "../HelperComponent/utils";
import StepProceedModel from "../HelperComponent/StepProceedModel";
import { Typography } from "@material-ui/core";
import AddNewVendor from "../VendorPage/VedorTypeForm";

import { StyledTableCell, StyledTableRow } from "../Sales/AddEnquiryPage";

const useStyles = makeStyles((theme) => ({
  root: {
    customSelect: {
      marginBottom: 15,
    },

    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  tableLabel: {
    fontWeight: 500,
    color: appSecondColor,
  },
  container: {
    ...appScrollBar,
    maxHeight: 360,
  },
  ddlError: {
    textAlign: "right",
    color: "#f44336",
    fontSize: "12px",
    marginRight: 15,
    marginTop: -15,
    fontWeight: 400,
  },
  itemImgPaper: {
    width: "80px",
    height: "80px",
    overflow: "hidden",
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

  actionbtns: {
    marginTop: 20,
    float: "right",
  },

  id: {
    width: "0%",
  },
  doubleFiled: {
    width: "20%",
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
    width: "55%",
  },
  itemDetailsView: {
    width: "20%",
  },
  quantity_unit: {
    width: "8%",
  },
  viewQuantity: {
    width: "10%",
  },
  net_value_field: {
    width: "10%",
  },
  Disc: {
    width: "5%",
  },
  deleteAction: {
    width: "5%",
  },
  id: {
    width: "0%",
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
  quantity_field: {
    width: "20%",
  },
  net_value_field: {
    width: "10%",
  },
  discValueFiled: {
    width: "10%",
  },
  Disc: {
    width: "5%",
  },
  valueField: {
    width: "7%",
  },
  viewValue: {
    width: "7%",
  },
  quantity_field: {
    width: "7%",
  },
}));

const PurchaseForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [allvendor, setAllVendors] = React.useState([]);
  const [itemDetail, setItemDetail] = React.useState({});
  const [allUoms, setAllUoms] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [temp_items, setAllTempItems] = React.useState([]);
  const [uomError, setUomError] = React.useState({});
  const [editedItem, setEditedItem] = React.useState([]);
  const [checked, setChecked] = React.useState([]);
  const [openModes, setOpenModel] = React.useState({
    newVendor: false,
    newSource: false,
  });
  const [addedItems, setAddedItems] = React.useState([]);
  const [allItems, setAllItems] = React.useState([]);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  
  const [gstDisable, setGstDisable] = React.useState(false);
  const [billDetail, setBillDetail] = React.useState({
    module: "PURCHASE_ORDER",
    edit: false,
    purchase_order_id: "",
    txt_po_date: currentDate(),
    ddl_vendor_group: "",
    txt_po_no: "AUTO GENERATED",
    txt_po_value: 0,
    ddl_showroom_warehouse:"",
    txt_note: "",
    txt_reference_no:"",
    txt_reference_date:currentDate(),
  });
  const [error, setError] = React.useState({
    ddl_vendor_group: false,
  });
  const user_id = globalState.user?.serial_id;
  let iflag = 0;
  // search State
  const [searchQuery, setSearchQuery] = React.useState("");
  



  const onSubmitPurchase = (e) => {

    e.preventDefault();
    if(addedItems.length){
     
    if (!billDetail.ddl_vendor_group) {
      setError({ ddl_vendor_group: !billDetail.ddl_vendor_group });
    } else {
      if (location.state?.edit) {
        updateDirectPurchase(
          billDetail,
          addedItems,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Purchase Updated Successfully",
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
      } else {
      
        postDirectPurchase(
          billDetail,
          addedItems,
          user_id,
          "PURCHASE_ORDER",
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Purchase Order Submitted Successfully",
                msgType: "success",
              },
            });
            onClearState();
            if (!billDetail.edit) {
              setBillDetail((prv) => ({
                ...prv,
                txt_po_no: r.po_number,
              }));
              setClassicModal(true);
            }
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      }
    }
    setButtonDisabled(true);

  }else{
    dispatch({
      type: actionTypes.SET_OPEN_MSG,
      payload: {
        msg: "Please Add an Item",
        msgType: "warning",
      },
    });
  }
  };

  const onChangeBillDate = (e) => {
    const { name, value } = e.target;
    setBillDetail({ ...billDetail, [name]: value });
  };
  // search Query
  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setSearchQuery(value);
  };
  const onClickAddItem = (r) => {
    if (addedItems.find((v, i) => v.item_id === r.item_id)) {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Item already added", msgType: "info" },
      });
 
      setItemDetail({
        [`txt_quantity${r.id}`]: 0,
        [`ddl_uom${r.id}`]: "",
        [`txt_net_value${r.id}`]: "",
        [`txt_disc_value${r.id}`]: "",
      });
    } else {
      // //console.log(itemDetail[`ddl_uom${r.id}`]);
      // //console.log("gagaga")
      if ( itemDetail[`txt_quantity${r.id}`] === 0){
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Please! Enter Qty", msgType: "error" },
        });
      }else{

        if ( !itemDetail[`txt_rate${r.id}`]) {
          setUomError({
            // [`ddl_uom${r.id}`]: !itemDetail[`ddl_uom${r.id}`],
            [`txt_rate${r.id}`]: !itemDetail[`txt_rate${r.id}`],
  
          });
        } else {
          //console.log()
          setUomError({});
          setAddedItems([
            ...addedItems,
            {
              item_id: r.item_id,
              uom_name: r.uom_name,
              uom_id:r.uom_id,
              // uom_id: itemDetail[`ddl_uom${r.id}`].value,
              quantity: itemDetail[`txt_quantity${r.id}`],
              rate: itemDetail[`txt_rate${r.id}`],
              disc_percentage: itemDetail[`txt_disc_per${r.id}`],
              disc_value: itemDetail[`txt_disc_value${r.id}`],
              gst_percentage: itemDetail[`txt_gst_per${r.id}`],
              gst_value: itemDetail[`txt_gst_value${r.id}`],
              net_value: itemDetail[`txt_net_value${r.id}`],
              gst_type:itemDetail[`gst_type${r.id}`],
              item:r.item,
              hsn_code: r.hsn_code,
            },
          ]);
          setItemDetail({
            ...itemDetail,
            [`ddl_uom${r.id}`]: "",
            [`txt_quantity${r.id}`]: "",
            [`txt_disc_per${r.id}`]: "",
            [`txt_disc_value${r.id}`]: "",
            [`txt_rate${r.id}`]: "",
            [`txt_gst_value${r.id}`]: "",
            [`txt_net_value${r.id}`]:"",
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

    }
  };

  // to set po value
  React.useEffect(() => {
    if (addedItems.length) {
      setBillDetail((prv) => ({
        ...prv,
        [`txt_po_value`]: addedItems.reduce(
          (sum, li) => Number(sum) + Number(li.net_value),
          0
        ),
      }));
    }
  }, [addedItems.length]);

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
  const onSelectDetails = (name, v) => {
    if (v.value === "Vendor") {
      setOpenModel({ ...openModes, newVendor: true });
    } else if (v.value === "openModel") {
      setBillDetail({ ...billDetail, [name]: "" });
    } else {
      setBillDetail({ ...billDetail, [name]: v });
    }

    if(name === "ddl_vendor_group"){
      // console.log(v,'RAJA');
      getVendorByVendorName(
        v.label,
        (r)=>{
          setButtonDisabled(false);
        },
        (err) => {
          setButtonDisabled(true);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
    }
  };

  const fetchData = () => {
    getListVendor(
      (r) => {
        setAllVendors([{ value: "Vendor", label: "Add New Vendor" }, ...r]);
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
        setAllUoms(r);
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
  };
  React.useEffect(() => {
    fetchData();
  }, [refresh]);
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
      const disc_percentage = itemDetail[`txt_disc_per${row.item_id}`] ? Number(itemDetail[`txt_disc_per${row.item_id}`]) : Number(0)
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
      //console.log(itemDetail[`txt_disc_value${row.item_id}`],"qty")

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

  //console.log( location.state?.row,"888");

  // useEffect
  React.useEffect(() => {
 
    fetchData();
    if (location.state?.edit) {
      
      getDirectPurchaseByIdedit(
        location.state?.row?.purchase_id,
        // location.state?.row?.polNo,
        (r) => {
          // setAddedItems(r.item_details);
          setAllItems(r.item_details);
          setEditedItem(r.item_details);

          r.item_details.map((r, i) => {
            setItemDetail((prv) => ({
              ...prv,
              [`txt_quantity${r.id}`]: r.quantity,
              [`txt_gst_per${r.id}`]: r.gst_percentage,
              [`txt_gst_value${r.id}`]: r.gst_value,
              [`txt_disc_per${r.id}`]: r.disc_percentage,
              [`txt_disc_value${r.id}`]: r.disc_value,
              [`txt_rate${r.id}`]: r.rate,
              [`txt_net_value${r.id}`]: r.net_value,
              [`ddl_uom${r.id}`]:r.uom_name,
           
            }));
          });
          setBillDetail((prv) => ({
            ...prv,
            edit: location.state?.edit,
            txt_po_date: dateFormateField(r.po_date),
            purchase_order_id: r.purchase_id,
            ddl_vendor_group: r.ddl_vendor_group,
            txt_note: r.po_note,
            txt_po_no: r.po_number,
            txt_reference_no:r.reference_no,
            txt_reference_date: dateFormateField(r.reference_date),

          }));
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
    }
  }, []);
  const formData = [
    {
      formName: "BillDetails",
      fields: [
        {
          name: "ddl_vendor_group",
          label: "Vendor",
          hidden: false,
          required: true,
          data_type: "string",
          html_element: "select_two",
          xs: 12,
          md: 6,
          lg: 6,
          options: allvendor,
        },
        {
          disabled: false,
          name: "txt_reference_no",
          label: "Reference No",
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
          name: "txt_reference_date",
          label: "Reference Date",
          hidden: false,
          required: false,
          align: "left",
          data_type: "date",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 3,
        },

        {
          disabled: true,
          name: "txt_po_no",
          label: "PO No",
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
          name: "txt_po_date",
          label: "PO Date",
          disabled: false,
          hidden: false,
          required: false,
          align: "left",
          data_type: "date",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 3,
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
          lg: 12,
        },

      ],
    },
  ];
  // search Item by api
  const onSearchItem = () => {
    if (searchQuery) {
      getSearchItem(
        (items) => {
          let newArr = items.filter((item, i) => !editedItem.includes(item));
          setAllItems(newArr);
          items.map((r, i) => {

            setAllTempItems((prv) => ({
              ...prv,
              // [name]: value,
              [`txt_gst_per${r.item_id}`]: r.cgst_percentage,
              [`txt_rate${r.item_id}`]: r.mrp,
            }));
            setItemDetail((prv) => ({
              ...prv,
              [`txt_quantity${r.id}`]: 0,
              [`txt_gst_per${r.id}`]: r.cgst_percentage,
              [`txt_gst_value${r.id}`]: 0,
              [`txt_disc_per${r.id}`]: 0,
              [`txt_disc_value${r.id}`]: 0,
              [`txt_rate${r.id}`]: 0,
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
    }
  };

  // useEffect
  React.useEffect(() => {
    if (searchQuery.length >= 6) {
      onSearchItem();
    } else {
      setAllItems([]);
    }
  }, [searchQuery]);
  // select Add UOM
  const onSelectUOM = (info, v) => {
    setItemDetail({ ...itemDetail, [info.name]: v });
  };

  // to get latest vendor when click the ddl menu
  const onMenuOpen = () => {
    getListVendor(
      (r) => {
        setAllVendors([{ value: "Vendor", label: "Add New Vendor" }, ...r]);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };

  const onClearState = () => {
    setError({});
    setAddedItems([]);
    setBillDetail({
      module: "PURCHASE_ORDER",
      edit: false,
      purchase_order_id: "",
      txt_po_date: currentDate(),
      ddl_vendor_group: "",
      txt_note: "",
      txt_reference_date: currentDate(),

    });
  };

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title={
          billDetail.edit
            ? "Procurement > Purchase Order > Edit"
            : "Procurement > Purchase Order"
        }
      />
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
                  name="serarchItem"
                  onChange={onAddSearch}
                  style={{ marginBottom: -15 }}
                  type="search"
                  id="outlined-basic"
                  fullWidth={true}
                  value={searchQuery}
                  variant="outlined"
                />
              </GridItem>
            </GridContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root}>
        {allItems && allItems.length > 0 && (
          <GridItem xs="12">
            <CustomCard cdTitle="Select and Add Items" maxHeight={440}>
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
                      <StyledTableCell align="right">Net Value</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allItems.map((row, i) => (
                      <StyledTableRow key={i}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                          className={classes.id}
                        >
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
                        <StyledTableCell className={classes.quantity_unit}>
                        <TextField
                           size="small"
                           placeholder="Unit"
                           name={`ddl_uom${row.item_id}`}
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
                              placeholder="Rate"
                              name={`txt_rate${row.id}`}
                              style={{ marginBottom: -15 }}
                              type="number"
                              onChange={(e) => onChange(e, row)}
                              inputProps={{ style: { textAlign: "right" } }}
                              id="outlined-basic"
                              error={uomError[`txt_rate${row.id}`]}
                              helperText={uomError[`txt_rate${row.id}`]?'Required': ""}
                              fullWidth={true}
                              value={itemDetail[`txt_rate${row.id}`]}
                              variant="outlined"
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
                        {/* CGSt field */}
                        <StyledTableCell
                          align="center"
                          className={classes.valueField}
                        >
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
                        </StyledTableCell>

                       {/* checkedBox */}
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

                        {/* IGST Field */}
                        <StyledTableCell
                          align="right"
                          className={classes.valueField}
                        >
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
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.valueField}
                        >
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
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.net_value_field}
                        >
                          <TextField
                            size="small"
                            placeholder="Value"
                            name={`txt_net_value${row.id}`}
                            style={{ marginBottom: -15 }}
                            type="string"
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            value={currencyFormate(
                              itemDetail[`txt_net_value${row.id}`]
                            )}
                            variant="outlined"
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes[row.action]}
                        >
                          
                          <div>
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
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CustomCard>
          </GridItem>
        )}
        {(addedItems.length > 0 ) && (
          <GridItem xs="12">
            <CustomCard cdTitle="Review Added Items" maxHeight="auto">
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
                      <StyledTableCell align="right">Rate</StyledTableCell>
                      <StyledTableCell align="right">Disc%</StyledTableCell>
                      <StyledTableCell align="right">
                        Disc Value
                      </StyledTableCell>
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
                          className={classes.viewQuantity}
                        >
                          {row.quantity}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.viewQuantity}
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
                </Grid>
              </Box>
            </CustomCard>
          </GridItem>
        )}
        {(addedItems.length > 0 || billDetail.edit) && (
          <GridItem xs="12">
            <CustomCard
              cdTitle="PO Details"
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
                              onChange={onChangeBillDate}
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
                onClick={onSubmitPurchase}
                className={classes.actionbtn}
                variant="outlined"
                color="primary"
              disabled={buttonDisabled}

              >
                Submit Purchase
              </Button>
            </div>
          </GridItem>
        )}
        <MasterModel
          classicModal={classicModal}
          onCloseModel={() => setClassicModal(false)}
          width={600}
          height="auto"
          closeIcon={false}
          addTodobtn
          closeBtn={false}
          okbtnWith={200}
          appLogo
          modelName=""
          okBtnText="OK"
          onClickOk={(e) => {
            e.preventDefault();
            setClassicModal(false);
            history.push("/admin/procurement/purchase-order");
          }}
        >
          <StepProceedModel
            step={1}
            isStep={false}
            title="Thank you"
            desc=" Your Purchase No is "
            generateNo={billDetail.txt_po_no}
          />
        </MasterModel>

        <MasterModel
          classicModal={openModes.newVendor}
          onCloseModel={() => setOpenModel({ ...openModes, newVendor: false })}
          width={1200}
          height="auto"
          appLogo
          okbtnWith={200}
          closeBtn={false}
          okbtn={false}
          modelName=""
          onClickOk={() => {}}
        >
          <Box p={1}>
            <AddNewVendor menuPortal={false} directPurchase={true} />
          </Box>
        </MasterModel>
      </GridContainer>
    </ThemeProvider>
  );
};

export default PurchaseForm;
