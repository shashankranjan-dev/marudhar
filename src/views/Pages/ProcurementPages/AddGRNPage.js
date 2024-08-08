import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import { getListVendor } from "../../../services/vendorService";
import { getAllAddGrnList,getSearchAllPurchaseList } from "../../../services/purchaseOrderService";
// getAllAddGrnList,
import { useStateValue } from "../../../context/context";
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
import { Autocomplete } from "@material-ui/lab";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";

import theme from "../../../theme/theme";

// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import ReactSelect from "react-select";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";
import { currentDate,currentDate1 } from "../HelperComponent/utils";
import { actionTypes } from "../../../context/reducer";
import MasterModelForView from "../../Components/MasterModelForView";
import ProcurementView from "./ProcurementView";
import { getPurchaseById } from "../../../services/directPurchaseFormService";
const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "25px",
    },
  },

  searchBar: {
    padding: "10px",
  },
  activeText: {
    fontSize: "15px",
    color: appSecondColor,
    fontWeight: 400,
  },
  customSelect: {
    marginBottom: 15,
  },
}));

const formData = {
  formName: "Add Category",
  fields: [
    {
      name: "brand",
      label: "Brand Name",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextField",
      error: false,
    },
    {
      name: "details",
      label: "Details",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextArea",
      error: false,
    },
    {
      name: "Active Status",
      label: "active",
      defaultValue: false,
      required: true,
      data_type: "string",
      html_element: "switch",
      error: false,
    },
  ],
};

const PurchaseOrderPage = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);

  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [allvendor, setAllVendors] = React.useState([]);
  const [allPurchase, setAllPurchase] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({

    txt_po_no: "",
    txt_date_from: currentDate1(),
    txt_date_to: currentDate(),
    ddl_vendor_id: "",
    txt_keyword_phrase: "",
 
  });
  const [allStatus, setAllStatus] = React.useState([]);

  const [classicModalView, setClassicModalView] = React.useState(false);
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  const [itemDetails, setItemDetails] = React.useState([]);
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

    // getAllPurchaseList(
    //   (r) => {
    //     setAllPurchase(r);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   },
    //   "addGRN"
    // );
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  const headerData = [
    {
      id: "GrnID",
      label: "#",
      align: "left",
    },
    {
      id: "GrnDate",
      label: "PO Date",
      align: "left",
    },
    {
      id: "GrnNo",
      label: "PO No",
      align: "left",
    },
    {
      id: "GrnValue",
      label: "PO Value (Rs)",
      align: "right",
    },
    {
      id: "GrnVendor",
      label: "Vendor",
      align: "left",
    },
    // {
    //   id: "poStatus",
    //   label: "Status",
    //   align: "left",
    //   salesStatus: (v) => v,
    // },

    {
      id: "GrnAction",
      label: "Action",
      align: "right",
    },
  ];
  const viewData = [
    {
      id: "dplBillDate",
      label: "PO Date",
      align: "left",
    },
    {
      id: "po_number",
      label: "PO No",
      align: "left",
    },
    {
      id: "po_value",
      label: "PO Value(Rs)",
      align: "left",
    },
  
    {
      id: "dplVendor",
      label: "Vendor",
      align: "left",
    },
 
  ];
const onSearchGrn =(e) =>{
  e.preventDefault();
  setLoading(true);


  getAllAddGrnList(
    (allPurchase) => {
      //console.log(allPurchase,"sen19013")
      if (allPurchase.length) {     
        setAllPurchase(allPurchase);
        setLoading(false);
      } else {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, "Item Received not found": "info" },
        });
      }
    },
    (err) => {
      // change by sankha
      setAllPurchase([])
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: err, msgType: "error" },
      });
      setLoading(false);
    },
    addSearch,"addGRN"
  );
};


 //////////////view module////////////
 const onClickView = (e) => {
  //console.log(e, "sen/view")
 
  setClassicModalView(true)

  getPurchaseById(
    
    e.purchase_id,
    (r) => {
      //console.log(r,"sank2106")
      setAddedItems(r);
      setItemDetails(r.item_details);
    },
    (err) => {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: err, msgType: "error" },
      });
    }
  );

}


const onSelect = (name, v) => {
  switch (name) {
    case "ddl_vendor_id":
      setAddSearch({
        ...addSearch,
        ddl_vendor_id: v.value,
        ddl_vendor_label: v.label,
      });
      break;
    default:
      break;
  }
};


  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="Procurement > Item Received" />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search On PO To Add Item Received" filterIcon>
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="flex-start" alignItems="flex-end">
                <GridItem xs="3">
                  <InputLabel id="label">PO No</InputLabel>
                  <TextField
                    size="small"
                    placeholder="PO No"
                    name="txt_po_no"
                    onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    value={addSearch.txt_po_no}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs="2">
                  <InputLabel id="label">Date Between</InputLabel>
                  <TextField
                    size="small"
                    id="date"
                    name="txt_date_from"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    defaultValue={currentDate()}
                    value={addSearch.txt_date_from}
                    onChange={onAddSearch}
                    // className={classes.dateField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs="2">
                  {/* <InputLabel id="label">Date</InputLabel> */}
                  <TextField
                    size="small"
                    id="date"
                    variant="outlined"
                    name="txt_date_to"
                    type="date"
                    fullWidth={true}
                    defaultValue={currentDate()}
                    value={addSearch.txt_date_to}
                    onChange={onAddSearch}
                    className={classes.dateField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs="5">
                  <InputLabel id="label">Vendor</InputLabel>
                  <ReactSelect
                    options={allvendor}
                    placeholder="Select"
                    name="ddl_vendor_id"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    // onChange={(v) => onSelect("ddl_vendor_id", v)}
                    // value={{
                    //   label: addSearch.ddl_vendor_label,
                    //   value: addSearch.ddl_vendor_id,
                    // }}
                  />
                </GridItem>
         

                <GridItem xs="12">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <CustomButton style={{ marginRight: "10px" }}
                          onClick={onSearchGrn}>
                      <SearchIcon />
                    </CustomButton>
                    <CustomButton>
                      <RotateLeftIcon />
                    </CustomButton>
                  </div>
                </GridItem>
              </GridContainer>
            </Paper>
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Purchase Order" maxHeight={450}>
            <MuiTable 
            columns={headerData} 
            rows={allPurchase} 
            onClickViewOne={onClickView}
            />
          </CustomCard>
        </GridItem>
      </GridContainer>

      <MasterModelForView
        classicModal={classicModalView}
        viewHeader="Purchase View"
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModalView(false);
        }}
      >
        <ProcurementView
          title="Purchase Order"
          viewData={viewData}
          addedItems={addedItems}
          itemDetails={itemDetails}
          allStatus={allStatus}
          otherCharges={otherCharges}
        />
      </MasterModelForView>
    </ThemeProvider>
  );
};

export default PurchaseOrderPage;
