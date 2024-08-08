import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
//SERVICE
import { getListVendor } from "../../../services/vendorService";

import { getAllDirectPurchaseList,getSearchDirectPurchase} from "../../../services/approveDirectPurchaseService";

import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
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
import { ThemeProvider, Box } from "@material-ui/core";
import ReactSelect from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";


import theme from "../../../theme/theme";

// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";
import { currentDate,currentDate1,sortWord } from "../HelperComponent/utils";
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
  input: {
    height: 40,
    lineLight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
  customSelect: {
    marginBottom: 15,
  },
  searchbtnRight: {
    float: "right",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
}));



const DirectPurchasePage = () => {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [viewRes, setViewRes] = React.useState("hidden");
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [allvendor, setAllVendors] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [directPurchaseList, setDirectPurchaseList] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
  txt_direct_purchase_from_date: currentDate1(),
  txt_direct_purchase_to_date: currentDate(),
  ddl_vendor: "",
  txt_keyword_phrase: "",
  ddl_showroom_warehouse: "",
  txt_bill_no:"",
  });
  const [directlist, setAllDirectList] = React.useState([]);

//for searching Purpose

React.useEffect(() => {
  fetchData();
``}, [refresh]);

const headerData = [
  {
    id: "dplID",
    label: "#",
    align: "left",
  },
  {
    id: "dplBillDate",
    label: "Bill Date",
    align: "left",
  },
  {
    id: "dplBillNo",
    label: "Bill No",
    align: "left",
  },
  {
    id: "dplVendor",
    label: "Vendor",
    align: "left",
  },
  {
    id: "dplBillValue",
    label: "Bill Value",
    align: "right",
  },
  {
    id: "dplgrn_no",
    label: "GRN No",
    align: "left",
  },

  {
    id: "dplgrn_date",
    label: "GRN Date",
    align: "left",
  },

  {
    id: "dplAction",
    label: "Action",
    align: "right",
  },
];
  

  const fetchData = () => {
    getListShowroomWarehouse(
      (r) => {
        setAllShowroomWarehouse(r)
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
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
  };

  React.useEffect(() => {
    fetchData();
    getAllDirectPurchaseList(
      (r) => {
        setAllDirectList(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  }, []);

  const onSearchDirectPurchase = (e) => {
    
    e.preventDefault();
    setLoading(true);
  

    getSearchDirectPurchase(
      (directlist) => {
  
        // console.log(directlist, "poooo123ooo");

        if (directlist.length) {    
          setAllDirectList(directlist);
          setViewRes("visible");
          setLoading(false); 

        } else {
          setViewRes("visible");
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Direct Purchase  not found": "info"},
          });
        }
      },
      (err) => {
      
       
        setAllDirectList([])
        setViewRes("visible");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      addSearch
    );
  };
 

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onSelect = (info, v) => {
    setAddSearch({ ...addSearch, [info.name]: v });
  };

  const onClickRefresh = () => {
   
  
    
    setRefresh(!refresh);
    setAddSearch({
      ddl_vendor: "",
      ddl_vendor_label: "Select",
      txt_keyword_phrase: "",
      ddl_showroom_warehouse: "",
      ddl_showroom_warehouse_label: "Select",
      txt_direct_purchase_from_date: "",
      txt_direct_purchase_to_date: "",
      txt_bill_no:"",
      
   
    });
  };


  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Procurement > Approve Direct Purchase"
        btnToolTip="Add Direct Purchase"
        // addBtnLink="/admin/procurement/add-direct-purchase"
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Direct Purchase" filterIcon>
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="flex-start" alignItems="center">
                <GridItem xs="3">
                  <InputLabel id="label">Bill No</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Bill No"
                    name="txt_bill_no"
                    onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    value={addSearch.txt_bill_no}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs="2">
                  <InputLabel id="label">Date Between</InputLabel>
                  <TextField
                    size="small"
                    name="txt_direct_purchase_from_date"
                    variant="outlined"
                    defaultValue={currentDate1()}
                    type="date"
                    fullWidth={true}
                    onChange={onAddSearch}
                    value={addSearch.txt_direct_purchase_from_date}
                    // onChange={(v) => console.log(v.target.value)}
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
                    name="txt_direct_purchase_to_date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    defaultValue={currentDate()}
                    onChange={onAddSearch}
                    value={addSearch.txt_direct_purchase_to_date}
                    // onChange={(v) => console.log(v.target.value)}
                    className={classes.dateField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs="5">
                  <InputLabel id="label">Vendor</InputLabel>
                  <ReactSelect
                    name="ddl_vendor"
                    options={allvendor.sort(sortWord("label"))}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_vendor}
                  
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                  />
                </GridItem>
                <GridItem xs="4">
                  <InputLabel id="label">Showroom / Warehouse</InputLabel>
                  <ReactSelect
                    name="ddl_showroom_warehouse"
                    options={allShowroomWarehouse.sort(sortWord("label"))}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_showroom_warehouse}
                  />
                </GridItem>

                <GridItem xs="5">
                  <InputLabel id="label">Keyword / Phrase</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Keyword / Pharse"
                    // style={{ marginBottom: -20 }}
                    name="txt_keyword_phrase"
                    onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    value={addSearch.txt_keyword_phrase}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs="3">
                  <div className={classes.searchbtnRight} >
                    <CustomButton style={{ marginRight: "10px" }}
                    onClick={onSearchDirectPurchase}
                    >
                      <SearchIcon />
                    </CustomButton>
                    <CustomButton onClick={onClickRefresh}>
                      <RotateLeftIcon />
                    </CustomButton>
                  </div>
                </GridItem>
              </GridContainer>
            </Paper>
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root} style={{ "visibility": viewRes }}>
        <GridItem xs="12">
          <CustomCard cdTitle="For Approval Direct Purchase" maxHeight="auto">
            <MuiTable columns={headerData} rows={directlist} />
          </CustomCard>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default DirectPurchasePage;
