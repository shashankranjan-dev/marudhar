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
import {
  getVendorByVendorName,
  // postJournalFromDirectPurchase,
  postDirectPurchase,
  getDirectPurchaseById,
  updateDirectPurchase,
} from "../../../services/directPurchaseFormService";
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";

import { getSearchItem } from "../../../services/saleService/addEnqueryService";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Paper, Box,Checkbox } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput, Grid } from "@material-ui/core";
import ItemViewCard from "../HelperComponent/ItemViewCard";
import StepProceedModel from "../HelperComponent/StepProceedModel";
import theme from "../../../theme/theme";

import React from "react";
import { getListUom } from "../../../services/uomService";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { useHistory, useLocation } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox, InfoTwoTone } from "@mui/icons-material";
import alertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PageTitle from "../HelperComponent/PageTitle";
import ReactSelect from "react-select";
import { Typography } from "@material-ui/core";
import FormComponent from "../HelperComponent/FormComponent";
import AddNewVendor from "../VendorPage/VedorTypeForm";
import { StyledTableCell, StyledTableRow } from "../Sales/AddEnquiryPage";

import {
  calculatePerValue,
  calculatePer,
  currencyFormate,
  currentDate,
  dateFormateField,
} from "../HelperComponent/utils";
import ItemImg from "../HelperComponent/ItemImg";

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
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
  tableLabel: {
    fontWeight: 500,
    color: appSecondColor,
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

  addBtn: {
    width: 30,
    height: 38,
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
    width: "48%",
  },
  itemDetailsView: {
    width: "25%",
  },
  quantity_field: {
    width: "7%",
  },
  viewQuantity: {
    width: "10%",
  },
  value_field: {
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
  quantity: {
    width: "20%",
  },
  quantity_unit: {
    width: "10%",
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
  viewValueGst: {
    width: "5%",
  },
  quantity_sale: {
    width: "10%",
  },
}));

const useAlertCls = makeStyles(alertStyle);

const DirectPurchaseForm = () => {
  const alertcls = useAlertCls();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [refresh, setRefresh] = React.useState(false);
  const [classicModal, setClassicModal] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [allvendor, setAllVendors] = React.useState([]);
  const [uomError, setUomError] = React.useState({});
  const [allUoms, setAllUoms] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [itemDetail, setItemDetail] = React.useState({});
  const [allItems, setAllItems] = React.useState([]);
  const [editedItem, setEditedItem] = React.useState([]);
  const [checked, setChecked] = React.useState([]);
  const [gstDisable, setGstDisable] = React.useState(false);
  const [newItems, setNewItems] = React.useState({});
  const [newItemDetail, setNewItemDetail] = React.useState({});
  // const [itemDetail, setItemDetail] = React.useState([]);
  const [temp_items, setAllTempItems] = React.useState([]);
  const [vendorDetail,setVendorDetail] = React.useState([]);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [error, setError] = React.useState({
    txt_bill_no: false,
    txt_bill_value: false,
    ddl_vendor_group: false,
    txt_challan_no: false,
    txt_vehicle_no: false,
    txt_waybill_no: false,
  });
  const user_id = globalState.user?.serial_id;
  let iflag = 0;
  const [openModes, setOpenModel] = React.useState({
    newVendor: false,
    newSource: false,
  });
  const [billDetail, setBillDetail] = React.useState({
    module: "DIRECT PURCHASE",
    stock_update:true,
    edit: false,
    direct_purchase_id: "",
    txt_bill_no: "",
    txt_bill_date: currentDate(),
    txt_bill_value: "",
    ddl_vendor_group: "",
    txt_challan_no: "",
    txt_challan_date: currentDate(),
    txt_vehicle_no: "",
    txt_waybill_no: "",
    txt_grn_no: "AUTO GENERATED",
    txt_grn_date: currentDate(),
    ddl_showroom_warehouse: "",
    txt_note: "",
  });

  const [searchQuery, setSearchQuery] = React.useState("");

  //console.log(location,"2603")

  //console.log(billDetail,"999bb")
  //console.log(vendorDetail.vendor_id,"999aa")
  // on Click Submit
  const onSubmitPurchase = (e) => {
    let journal_details=[];
    let sales_details=[]

    if(addedItems.length){
    e.preventDefault();
    if (
      !billDetail.ddl_vendor_group ||
      !billDetail.txt_bill_value ||
      !billDetail.txt_vehicle_no ||
      !billDetail.txt_waybill_no
    ) {
      setError({
        txt_bill_value: !billDetail.txt_bill_value,
        ddl_vendor_group: !billDetail.ddl_vendor_group,
        txt_vehicle_no: !billDetail.txt_vehicle_no,
        txt_waybill_no: !billDetail.txt_waybill_no,
      });
    } else {
      if (location.state?.edit) {
        updateDirectPurchase(
          billDetail,
          addedItems,
          user_id,
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
        postDirectPurchase(
          billDetail,
          addedItems,
          user_id,
          'DIRECT PURCHASE',
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Direct Purchase Submitted Successfully",
                msgType: "success",
              },
            });
            onClearState();
            if (!billDetail.edit) {
              setBillDetail((prv) => ({
                ...prv,
                txt_grn_no: r.grn_no,
              }));
            }
            setClassicModal(true);
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
    setButtonDisabled(true);

          }
          
        );

     

      }
    }
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
  //console.log(user_id,"abhi");


  const onChangeBillDetail = (e) => {
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
  // on Click add Item
  const onClickAddItem = (r) => {
    if (addedItems.find((v, i) => v.item_id === r.item_id)) {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Item already added", msgType: "info" },
      });
      setItemDetail({
        [`txt_quantity${r.id}`]: 0,
        [`ddl_uom${r.id}`]: "",
      });
    } else {
      if (!itemDetail[`txt_rate${r.id}`]) {
        setUomError({
    
          [`txt_rate${r.id}`]:!itemDetail[`txt_rate${r.id}`]
        });
      } else {
        setUomError({ });
        setAddedItems([
          ...addedItems,
          {
            item_id: r.item_id,
            uom_name: r.uom_name,
            uom_id:r.uom_id,
            quantity: itemDetail[`txt_quantity${r.id}`], 
            rate: itemDetail[`txt_rate${r.id}`],
            disc_percentage: itemDetail[`txt_disc_per${r.id}`],
            disc_value: itemDetail[`txt_disc_value${r.id}`],
            gst_percentage: itemDetail[`txt_gst_per${r.id}`],
            gst_value: itemDetail[`txt_gst_value${r.id}`],
            net_value: itemDetail[`txt_net_value${r.id}`],
            gst_type: itemDetail[`gst_type${r.id}`],
          },
        ]);

        setItemDetail({
          ...itemDetail,
          [`ddl_uom${r.id}`]: "",
          [`txt_quantity${r.id}`]: "",
          [`txt_disc_per${r.id}`]: "",
          [`txt_rate${r.id}`]: "",
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


  React.useEffect(() => {
    if (addedItems.length) {
      setBillDetail((prv) => ({
        ...prv,
        [`txt_bill_value`]: addedItems.reduce((sum, li) => Number(sum) + Number(li.net_value), 0)
        ,
      }));
    }
  }, [addedItems.length]);
  const onSelectDetails = (name, v) => {
    //console.log(name,v,"777")
    if (v.value === "Vendor") {
      setOpenModel({ ...openModes, newVendor: true });
    } else if (v.value === "openModel") {
      setBillDetail({ ...billDetail, [name]: "" });
    } else {
      setBillDetail({ ...billDetail, [name]: v });
    }

    if(name === "ddl_vendor_group"){
      getVendorByVendorName(
        v.label,
        (r)=>{
          //console.log(r[0].vendor_id,"999d13")
    
          setVendorDetail(r[0]);
          setButtonDisabled(false);
          // ledger_account_id.push(r);
          //ledger_account_id = r[0]?.ledger_id;
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
          setButtonDisabled(true);
        }
      );
    }
  };

  // select Add UOM
  const onSelectUOM = (info, v) => {
    setItemDetail({ ...itemDetail, [info.name]: v });
  };

const onChange =(e,row)=>{
  //console.log(e.target.value,"0604")

     const { name, value } = e.target;

  //console.log(name,value,"06041")
  
  if (name === `txt_quantity${row.item_id}`){
    let net_value = Number(itemDetail[`txt_rate${row.id}`]) * value;
    setItemDetail((prv) => ({
              ...prv,
              [name]: value,
              [`txt_rate${row.item_id}`]: net_value? net_value / value : 0 ,
                [`txt_net_value${row.item_id}`]: itemDetail[`txt_net_value${row.id}`]? 
                      net_value
                      : value * 0
            }));
  }
 if (name === `txt_net_value${row.item_id}`){
   //console.log(name,value,"8855")
    setItemDetail((prv) => ({
      ...prv,
      [name]: value,
      [`txt_rate${row.item_id}`]: value / Number(itemDetail[`txt_quantity${row.id}`])
    }));
  }

}
  // const onChange = (e, row) => {
    
 

  //   setGstDisable(true);
  //   if (name === `chk_gst${row.item_id}`) {
// const { name, value } = e.target;
  //     if (e.target.checked) {
  //       iflag = 1;
  //       //console.log("clicked", iflag);
  //       setGstDisable(false);

  //       const rate = Number(temp_items[`txt_rate${row.item_id}`])
  //       const qty = Number(temp_items[`txt_quantity${row.item_id}`])
       
  //       const disc_percentage = Number(itemDetail[`txt_disc_per${row.item_id}`]? itemDetail[`txt_disc_per${row.item_id}`] : 0)
        
  //       let discValue = itemDetail[`txt_disc_value${row.item_id}`] ? itemDetail[`txt_disc_value${row.item_id}`] : calculatePerValue(disc_percentage, rate);
  //       const afterDiscRate = rate - discValue;
  //       const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);
  //       // const gst_value = Number(Number(afterDiscRate) * (Number(gst_rate) / 100)).toFixed(2);
  //       const gst_amount = Number(Number(afterDiscRate) * Number(qty) * (Number(gst_rate) / 100)).toFixed(2);
  //       // const netValue = Number( afterDiscRate + gst_amount );
  //       const netValue = Number(Number(qty) * (rate - discValue)) + Number(gst_amount);

        
  //       setItemDetail((prv) => ({
  //         ...prv,
  //         [name]: value,
       
  //         [`txt_gst_per${row.item_id}`]: gst_rate,
  //         [`txt_gst_value${row.item_id}`]: gst_amount,
  //         [`txt_net_value${row.item_id}`]: netValue,
  //         [`gst_type${row.item_id}`]: 1,
  //       }));
  //     }

  //     else {
  //       iflag = 2;
   
  //       setGstDisable(true);
  //       const rate = Number(temp_items[`txt_rate${row.item_id}`])
  //       const qty = Number(temp_items[`txt_quantity${row.item_id}`])
  //       const disc_percentage = Number(itemDetail[`txt_disc_per${row.item_id}`]? itemDetail[`txt_disc_per${row.item_id}`] : 0)
    
  //       let discValue = itemDetail[`txt_disc_value${row.item_id}`] ? itemDetail[`txt_disc_value${row.item_id}`] : calculatePerValue(disc_percentage, rate);
  //       const afterDiscRate = rate - discValue;
  //       const netValue = qty * afterDiscRate;

        
       

  //       setItemDetail((prv) => ({
  //         ...prv,
  //         [name]: value,
  //         [`txt_quantity${row.item_id}`]: qty,
  //         [`txt_net_value${row.item_id}`]: (netValue).toFixed(2),
  //         [`txt_rate${row.item_id}`]: afterDiscRate,
  //         [`txt_disc_per${row.item_id}`]: disc_percentage,
  //         [`txt_disc_value${row.item_id}`]: discValue,
  //         [`txt_gst_value${row.item_id}`]: 0,
  //         [`txt_gst_per${row.item_id}`]: 0,
  //         [`gst_type${row.item_id}`]: 0,
  //       }));

  //     }
  //   }

  //   // Discount Percent Check
  //   if (name === `txt_disc_per${row.item_id}`) {

  //     const rate = Number(temp_items[`txt_rate${row.item_id}`])
  //     const qty = Number(temp_items[`txt_quantity${row.item_id}`])
  //     const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);

  //     if (!value) {


  //       let gst_amount = Number((Number(rate) * Number(qty)) * (Number(gst_rate) / 100)).toFixed(2);
  //       let ticked = document.querySelector(`input[name="chk_gst${row.item_id}"]`);

  //       if (ticked.checked){
  //         const netValue = Number(qty * rate) +  Number(gst_amount)
  //         setItemDetail((prv) => ({
  //           ...prv,
  //           [name]: value,
  //           [`txt_quantity${row.item_id}`]: qty,
  //           [`t${row.item_id}`]: rate,
  //           [`txt_net_value${row.item_id}`]: Number((netValue).toFixed(2)),
  //           [`txt_gst_value${row.item_id}`]: gst_amount,
  //           [`txt_disc_value${row.item_id}`]: 0,
  //           [`txt_disc_rate${row.item_id}`]: 0,
  //         }));
  //       }else{
  //         const netValue = qty * rate;
  //         setItemDetail((prv) => ({
  //           ...prv,
  //           [name]: value,
  //           [`txt_quantity${row.item_id}`]: qty,
  //           [`txt_rate${row.item_id}`]: rate,
  //           [`txt_net_value${row.item_id}`]: Number((netValue).toFixed(2)),
  //           // [`txt_gst_value${row.item_id}`]: 0,
  //           [`txt_disc_value${row.item_id}`]: 0,
  //           [`txt_disc_rate${row.item_id}`]: 0,
  //         }));
  //       }

  //     }
  //     else {
  //       let netValue = 0;
  //       let gst_amount = 0;
  //       let tick = 0;
  //       let discValue = calculatePerValue(value, rate);
  //       const afterDiscRate = Number(temp_items[`txt_rate${row.item_id}`]) - discValue;

  //       let ticked = document.querySelector(`input[name="chk_gst${row.item_id}"]`);
  //       if (ticked.checked) {
  //           tick = 1
  //         //console.log("Hello World444", gst_rate);
  //         gst_amount = Number((Number(afterDiscRate) * Number(qty)) * (Number(gst_rate) / 100)).toFixed(2);

  //         //console.log("Hello World666", gst_amount);
  //         netValue = Number(Number(qty) * afterDiscRate) + Number(gst_amount);
  //       }

  //       else {
  //           tick = 0
  //         //console.log("Hello World555");
  //         netValue = qty * afterDiscRate;
  //       }

  //       //console.log("Hello World777", gst_amount);
  //       setItemDetail((prv) => ({
  //         ...prv,
  //         [name]: value,
  //         [`txt_quantity${row.item_id}`]: qty,
  //         [`txt_rate${row.item_id}`]: afterDiscRate,
  //         [`txt_disc_value${row.item_id}`]: discValue,
  //         [`txt_net_value${row.item_id}`]: (netValue).toFixed(2),
  //         [`txt_gst_per${row.item_id}`]: gst_rate,
  //         [`txt_gst_value${row.item_id}`]: gst_amount,
  //         [`gst_type${row.item_id}`]:tick,
  //       }));
  //     }
  //   }
  //   // Discount Value Check
  //   else if (name === `txt_disc_value${row.item_id}`) {

  //     const rate = Number(temp_items[`txt_rate${row.item_id}`])
  //     const qty = Number(temp_items[`txt_quantity${row.item_id}`])
  //     const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);

  //     if (!value) {
  //       let gst_amount = Number((Number(rate) * Number(qty)) * (Number(gst_rate) / 100)).toFixed(2);
  //       let ticked = document.querySelector(`input[name="chk_gst${row.item_id}"]`);

  //       if (ticked.checked){
  //         const netValue = Number(qty * rate) +  Number(gst_amount);
  //         setItemDetail((prv) => ({
  //           ...prv,
  //           [name]: value,
  //           [`txt_quantity${row.item_id}`]: qty,
  //           [`txt_rate${row.item_id}`]: rate,
  //           [`txt_net_value${row.item_id}`]: Number((netValue).toFixed(2)
  //           ),
  //           [`txt_disc_value${row.item_id}`]: 0,
  //           [`txt_gst_value${row.item_id}`]: gst_amount,
  //           [`txt_disc_per${row.item_id}`]: 0,
  //         }));

  //       }else{
  //       const netValue = qty * rate;
  //       setItemDetail((prv) => ({
  //         ...prv,
  //         [name]: value,
  //         [`txt_quantity${row.item_id}`]: qty,
  //         [`txt_rate${row.item_id}`]: rate,
  //         [`txt_net_value${row.item_id}`]: Number((netValue).toFixed(2)),
  //         [`txt_disc_value${row.item_id}`]: 0,
  //         [`txt_disc_per${row.item_id}`]: 0,
  //         [`txt_gst_value${row.item_id}`]: gst_amount,
  //       }));
  //     }

  //     }
  //     else {
  //       let netValue = 0;
  //       let gst_amount = 0;
  //       let tick = 0;
  //       let discPer = calculatePer(value, rate);
  //       let discValue = value;
  //       const afterDiscRate = Number(temp_items[`txt_rate${row.item_id}`]) - discValue;

  //       let ticked = document.querySelector(`input[name="chk_gst${row.item_id}"]`);
  //       if (ticked.checked) {
  //            tick = 1;
  //         //console.log("Hello World444", gst_rate);
  //         gst_amount = Number((Number(afterDiscRate) * Number(qty)) * (Number(gst_rate) / 100)).toFixed(2);

  //         //console.log("Hello World666", gst_amount);
  //         netValue = Number(Number(qty) * afterDiscRate) + Number(gst_amount);
  //       }

  //       else {
  //           tick = 0;
  //         //console.log("Hello World555");
  //         netValue = qty * afterDiscRate;
  //       }

  //       //console.log("Hello World777", gst_amount);
  //       setItemDetail((prv) => ({
  //         ...prv,
  //         [name]: value,
  //         [`txt_quantity${row.item_id}`]: qty,
  //         [`txt_rate${row.item_id}`]: afterDiscRate,
  //         [`txt_disc_per${row.item_id}`]: discPer,
  //         [`txt_disc_value${row.item_id}`]: discValue,
  //         [`txt_net_value${row.item_id}`]: (netValue).toFixed(2),
  //         [`txt_gst_per${row.item_id}`]: gst_rate,
  //         [`txt_gst_value${row.item_id}`]: gst_amount,
  //         [`gst_type${row.item_id}`]: tick,
  //       }));
  //     }
  //   }

  //   ////quantity check
  //   else if (name === `txt_quantity${row.item_id}`) {

  //     setAllTempItems((prv) => ({
  //       ...prv,
  //       [`txt_quantity${row.item_id}`]: value,
  //     }));

  //     const rate = Number(temp_items[`txt_rate${row.item_id}`])
  //     // const disc_percentage = Number(itemDetail[`txt_disc_per${row.item_id}`])
  //     const disc_percentage = itemDetail[`txt_disc_per${row.item_id}`] ? Number(itemDetail[`txt_disc_per${row.item_id}`]) : Number(temp_items[`txt_disc_per${row.item_id}`]) 

  //     const gst_rate = Number(temp_items[`txt_gst_per${row.item_id}`]);
  //     // let discValue = calculatePerValue(disc_percentage, rate);
  //     let discValue = itemDetail[`txt_disc_value${row.item_id}`] ? itemDetail[`txt_disc_value${row.item_id}`] : calculatePerValue(disc_percentage, rate);
  //     const afterDiscRate = rate - discValue;
  //     let gst_amount = 0;
  //       let netValue = 0;
  //       let tick = 0;
  //       //CHECK BOX VALUE CHECKING
  //       let ticked = document.querySelector(`input[name="chk_gst${row.item_id}"]`);
  //       if (ticked.checked) {
  //         tick = 1;
  //         //console.log("Hello World444", gst_rate);
  //         gst_amount = Number((Number(afterDiscRate) * Number(value)) * (Number(gst_rate) / 100)).toFixed(2);
  
  //         //console.log("Hello World666", gst_amount);
  //         netValue = Number(Number(value) * afterDiscRate) + Number(gst_amount);
  //       }
  
  //       else {
  //        tick = 0;
  //         //console.log("Hello World555");
  //         netValue = value * afterDiscRate;
  //       }
  //     //   const netValue = value * afterDiscRate;

  //     if (!value) {
  //       setItemDetail((prv) => ({
  //         ...prv,
  //         [name]: value,
  //         [`txt_net_value${row.item_id}`]: Number(
  //           (netValue).toFixed(2)
  //         ),
  //         [`txt_quantity${row.item_id}`]: 0,
  //         // [`txt_gst_value${row.item_id}`]: 0,
  //         [`txt_disc_value${row.item_id}`]: 0,
  //       }));

  //     } else {
          
  //       // if (name === `chk_gst${row.item_id}`) {
  //       setItemDetail((prv) => ({
  //         ...prv,
  //         [name]: value,
  //         [`txt_quantity${row.item_id}`]: value,
  //         [`txt_net_value${row.item_id}`]: (netValue).toFixed(2),
  //         [`txt_rate${row.item_id}`]: afterDiscRate,
  //         [`txt_disc_value${row.item_id}`]: discValue,
  //         [`txt_gst_per${row.item_id}`]: gst_rate,
  //         [`txt_gst_value${row.item_id}`]: gst_amount,
  //         [`gst_type${row.item_id}`]: tick,
  //       }));
  //     }
  //   }

  // };

  // search Query
  
  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setSearchQuery(value);
  };



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
              [`txt_disc_per${r.id}`]: '0',
              [`txt_disc_value${r.id}`]: '0',
              [`txt_rate${r.id}`]: 0,
              [`txt_net_value${r.id}`]: 0,
              [`ddl_uom${r.id}`]: 0,

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
  };

  // useEffect
  React.useEffect(() => {
    fetchData();
    if (searchQuery.length >= 6) {
      onSearchItem();
    } else {
      setAllItems([]);
    }
  }, [searchQuery]);

  // useEffect
  React.useEffect(() => {
    fetchData();

        
        //console.log(location.state?.row?.purchase_id,"26032")
    if (location.state?.edit) {
      getDirectPurchaseById(
        location.state?.row?.purchase_id,
        (r) => {
          //console.log(r,"26033")
          // setAddedItems(r.itemDetail);
          setAllItems(r.item_details);
        //  //console.log(r.itemDetail);
          // var result = r.itemDetail.map(function(el) {
          //   var o = Object.assign({}, el);
          //   o.id = o.item_id;
          //   return o;
          // })

          // r.itemDetail=result;
        
          r.itemDetail.map((r, i) => {
            setItemDetail((prv) => ({
              ...prv,
              [`txt_quantity${r.id}`]: r.quantity,
              [`txt_gst_per${r.id}`]: r.gst_percentage,
              [`txt_gst_value${r.id}`]: r.gst_value,
              [`txt_disc_per${r.id}`]: r.disc_percentage,
              [`txt_disc_value${r.id}`]: r.disc_value,
              [`txt_rate${r.id}`]: r.rate,
              [`txt_net_value${r.id}`]: r.net_value,
              [`ddl_uom${r.id}`]: r.uom_name,

           
            }));
          });
          setEditedItem(r.itemDetail);
          setBillDetail((prv) => ({
            ...prv,
            edit: location.state?.edit,
            direct_purchase_id: r.purchase_id,
            txt_bill_no: r.bill_no,
            txt_bill_date: dateFormateField(r.bill_date),
            txt_bill_value: r.bill_value,
            ddl_vendor_group: r.ddl_vendor_group,
            txt_challan_no: r.challan_no,
            txt_challan_date: dateFormateField(r.challan_date),
            txt_vehicle_no: r.vehicle_no,
            txt_waybill_no: r.waybill_no,
            txt_grn_no: r.grn_no,
            txt_grn_date: dateFormateField(r.grn_date),
            txt_note: r.note,
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

  const onClearState = () => {
    setAddedItems([]);
    setError({});
    setOpenModel((prv) => ({ newVendor: false }));
    setBillDetail({
      ...billDetail,
      edit: false,
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

  const formData = [
    {
      formName: "BillDetails",
      fields: [
        {
          name: "txt_bill_no",
          label: "Bill No",
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
          name: "txt_bill_date",
          label: "Bill Date",
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
          name: "txt_bill_value",
          label: "Bill Value",
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
          name: "ddl_vendor_group",
          label: "Vendor",
          hidden: false,
          required: true,
          data_type: "string",
          html_element: "select_two",
          xs: 12,
          md: 6,
          lg: 5,
          options: allvendor,
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
          lg: 4,
        },
        {
          name: "txt_grn_no",
          label: "GRN No",
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
          name: "txt_grn_date",
          label: "GRN Date",
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

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title={
          billDetail.edit
            ? "Procurement > Direct Purchase > Edit"
            : "Procurement > Direct Purchase"
        }
      />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search by Item Code/Name" filterIcon>
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
        {allItems.length > 0 && (
          <GridItem xs="12">
            <CustomCard cdTitle="Select and Add Items" maxHeight={400}>
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
                      {/* <StyledTableCell align="left">Disc%</StyledTableCell>
                      <StyledTableCell align="left">Disc Value</StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                      <StyledTableCell align="left">GST%</StyledTableCell>
                      <StyledTableCell align="left">GST Value</StyledTableCell> */}
                      <StyledTableCell align="left">Value</StyledTableCell>
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
                          {i+1}
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
                        {/* {//console.log(allItems,"26034")} */}
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
                          {/* <ReactSelect
                            options={allUoms}
                            formatGroupLabel={(d) => d.label}
                            menuPortalTarget={document.body}
                            onChange={(v) =>
                              setItemDetail({
                                ...itemDetail,
                                [`ddl_uom${row.id}`]: v,
                              })
                            }
                            value={itemDetail[`ddl_uom${row.id}`]}
                          /> */}
                         
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.valueField}
                        >
                      
                            <TextField
                              size="small"
                              placeholder="Rate"
                              name={`txt_rate${row.id}`}
                              style={{ marginBottom: -15 }}
                              type="number"
                              onChange={(e) => onChange(e, row)}
                              defaultValue={row.rate}
                              inputProps={{ style: { textAlign: "right" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              error={uomError[`txt_rate${row.id}`]}
                              helperText={uomError[`txt_rate${row.id}`]?'Required': ""}
                              value={itemDetail[`txt_rate${row.id}`]}
                              variant="outlined"

                            />
                        
                        </StyledTableCell>

                        {/* <StyledTableCell
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
                        </StyledTableCell> */}
                        {/* CGSt field */}
                        {/* <StyledTableCell
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
                                defaultValue={row.discVal_field}
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
                        </StyledTableCell> */}


                          {/* checkedBox */}

                        {/* <StyledTableCell
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
                          </StyledTableCell> */}

                        {/* IGST Field */}
                        {/* <StyledTableCell
                          align="right"
                          className={classes.valueField}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <TextField
                              size="small"
                              placeholder="GST%"
                              name={`txt_gst_per${row.id}`}
                              style={{ marginBottom: -15 }}
                              defaultValue={row.gst_field}
                              type="number"
                              onChange={(e) => onChange(e, row)}
                              value={itemDetail[`txt_gst_per${row.id}`]}
                              inputProps={{ style: { textAlign: "right" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              variant="outlined"
                            />
                          </div>
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
                            defaultValue={row.gst_field}
                            type="number"
                            onChange={(e) => onChange(e, row)}
                            value={itemDetail[`txt_gst_value${row.id}`]}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            variant="outlined"
                          />
                        </StyledTableCell> */}

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
                              type="number"
                              inputProps={{ style: { textAlign: "right" } }}
                              defaultValue={row.net_value_field}
                              onChange={(e) => onChange(e, row)}
                              id="outlined-basic"
                              fullWidth={true}
                              value={itemDetail[`txt_net_value${row.id}`]}
                              variant="outlined"
                              onClick={(e) => { e.target.select() }}
                            />
                          </div>
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
            <CustomCard cdTitle="Review Added Items" maxHeight={400}>
              <TableContainer>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left" className={classes.id}>#</StyledTableCell>
                      <StyledTableCell align="left">Image</StyledTableCell>
                      <StyledTableCell align="left">
                        Item Details
                      </StyledTableCell>

                      <StyledTableCell align="right">Qty</StyledTableCell>
                      <StyledTableCell align="left">Unit</StyledTableCell>
                      <StyledTableCell align="right">Rate</StyledTableCell>
                      {/* <StyledTableCell align="right">Disc%</StyledTableCell>
                      <StyledTableCell align="right">
                        Disc Value
                      </StyledTableCell>
                      <StyledTableCell align="right">GST%</StyledTableCell>
                      <StyledTableCell align="right">GST Value</StyledTableCell> */}
                      <StyledTableCell align="right">Value</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {addedItems.map((row, i) => (
                      <StyledTableRow key={i}>
                        <StyledTableCell
        
                          align="left"
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
                          {row.rate}
                        </StyledTableCell>

                        {/* <StyledTableCell
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
                          className={classes.viewValueGst}
                        >
                          {row.gst_percentage}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.viewValue}
                        >
                          {currencyFormate(row.gst_value)}
                        </StyledTableCell> */}

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
              cdTitle={billDetail.edit ? "Edit Bill Details" : "Bill Details"}
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
                              onChange={onChangeBillDetail}
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
                Submit Direct Purchase
              </Button>
            </div>
          </GridItem>
        )}

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
            history.push("/admin/procurement/direct-purchase");
          }}
        >
          <StepProceedModel
            step={1}
            isStep={false}
            title="Thank you"
            desc=" Your GRN No is "
            generateNo={billDetail.txt_grn_no}
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

export default DirectPurchaseForm;
