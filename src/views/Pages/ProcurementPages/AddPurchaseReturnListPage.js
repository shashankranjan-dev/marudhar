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
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";
import { getListVendor, getAllVendors } from "../../../services/vendorService";
import { getAllPurchaseList ,PurchaseReturnSearchList} from "../../../services/PurchaseReturnService";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {   Box,Grid } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";



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
import ReactSelect from "react-select";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import {
  currencyFormate, currentDate1

} from "../HelperComponent/utils";

import theme from "../../../theme/theme";

import AddPurchaseReturnPage from '../ProcurementPages/AddPurchaseReturnPage';

// import React from "react";
import {
  appFontWeightThin,
  appFontWeight,
  tblBodyHoverColor,
  appDefaultColor,
  appSecondColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";
import { currentDate,sortWord } from "../HelperComponent/utils";
// import PurchaseOrderInvoice from "../../../PurchaseOrderInvoice";
export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: appSecondColor,
    padding: "5px 5px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "10px 5px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
    "&:hover": {
      backgroundColor: tblBodyHoverColor,
    },
  },
}))(TableRow);




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
  searchbtnRight: {
    float: "right",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
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


const AddPurchaseReturnListPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [purchaseRegisterList, setAllPurchaseRegisterList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [allStatus, setAllStatus] = React.useState([]);
  const [allItems, setAllItems] = React.useState({});


  const [invoiceDetail, setInvoiceDetail] = React.useState({});
  const [allvendor, setAllVendors] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [vendorDetail, setVendorDetail] = React.useState({});
  const [vendorAddrss, setVendorAddres] = React.useState({});
  // const [allPurchase, setAllPurchase] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
    txt_bill_no: "",  
    txt_item: "",  
    ddl_vendor: "",
    txt_keyword_phrase: "",
    ddl_showroom_warehouse:"",
    txt_bill_from_date: currentDate1(),
    txt_bill_to_date: currentDate(),
    });

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
  }, []);

  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };

  const headerData = [
    {
      id: "polID",
      label: "#",
      align: "left",
    },
    {
      id: "grn",
      label: "GRN No.",
      align: "left",
    },
    {
      id: "polDate",
      label: "Bill Date",
      align: "center",
    },
    {
      id: "polNo",
      label: "Bill No",
      align: "center",
    },
    {
      id: "polVendor",
      label: "Vendor",
      align: "center",
    },
    {
      id: "polItem_name",
      label: "Item Details",
      align: "left",
    },
    {
      id: "polGross",
      label: "Gross Amount",
      align: "right",
    },
    {
      id: "polAction",
      label: "Action",
      align: "right",
    },
  ];
  const onSearchPurchaseRegister = (e) => {

    e.preventDefault();
    setLoading(true);
    PurchaseReturnSearchList(
      (purchaseRegisterList) => {        
        console.log(purchaseRegisterList,'purchaseRegisterList');
          setAllPurchaseRegisterList(purchaseRegisterList);
          setLoading(false);   
              
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      addSearch
    );

    
  };
 
  // console.log(purchaseRegisterList,"sen1907");

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onSelect = (info, v) => {
    setAddSearch({ ...addSearch, [info.name]: v });
  };

 

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Procurement> Add Purchase Return"
        btnToolTip="Add Purchase Return"
   
    
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Item Received" filterIcon>
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
                    // value={addSerch.item}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs="2">
                  <InputLabel id="label">Date Between</InputLabel>
                  <TextField
                    size="small"
                    name="txt_bill_from_date"
                    id="date"
                    variant="outlined"
                    type="date"
                    defaultValue={currentDate1()}
                    fullWidth={true}
                    onChange={onAddSearch}
                    // value={startDate}
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
                    name="txt_bill_to_date"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    defaultValue={currentDate()}
                    onChange={onAddSearch}
                    // value={startDate}
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
                    options={allvendor.sort(sortWord("label"))}
                    placeholder="Select"
                    name="ddl_vendor"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                  />
                </GridItem>
                <GridItem xs="5">
                  <InputLabel id="label">Showroom / Warehouse</InputLabel>
                  <ReactSelect
                    options={allShowroomWarehouse.sort(sortWord("label"))}
                    placeholder="Select"
                    name="ddl_showroom_warehouse"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                  />
                </GridItem>
                <GridItem xs="3">
                  <InputLabel id="label">Item</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Item"
                    name="txt_item"
                    onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    // value={addSerch.item}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs="12">
                  <div
                   className={classes.searchbtnRight}
                  >
                    <CustomButton style={{ marginRight: "10px" }}
                     onClick={onSearchPurchaseRegister}>
                      <SearchIcon />
                    </CustomButton>
                    <CustomButton>
                      <RotateLeftIcon />
                    </CustomButton>
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer
                justifyContent="flex-start"
                alignItems="center"
              ></GridContainer>
            </Paper>
          </CustomCard>
        </GridItem>
      </GridContainer>

      <MasterModel
        classicModal={classicModal}
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModal(false);
        }}
        height="auto"
        okBtnText="Print"
        modelName="Purchase Order"
        onClickOk={(e) => {
          e.preventDefault();
          window.print()
        }}
      >
       
      </MasterModel>
        {/* {console.log(purchaseRegisterList,"purchaseRegisterList")} */}
      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="List Item Received" maxHeight="auto">
            <MuiTable
            
            columns={headerData} 
            rows={purchaseRegisterList.sort(sortWord("grn"))}
            
            />


            {/* do not remove the below code */}
             {/* <Box pt={1} >           
                <GridContainer>

                  <Grid item xs={3}>
                    <Box className={classes.tableLabel} ml={21} textAlign="left">
                     <b> Total</b>
                    </Box>
                  </Grid>      


                    <Grid item xs={4}>
                     <Box className={classes.tableLabel} ml={19} textAlign="right">
                      {purchaseRegisterList.length
                        ? currencyFormate(
                          purchaseRegisterList.reduce(
                              (sum, li) => Number(sum) + Number(li.polGross),
                              0
                            )
                          )
                        : "00"}
                      </Box>
                    </Grid>

                    <Grid item xs={2}>
                     <Box className={classes.tableLabel} ml={9} textAlign="left">
                      {purchaseRegisterList.length
                        ? currencyFormate(
                          purchaseRegisterList.reduce(
                              (sum, li) => Number(sum) + Number(li.polGst),
                              0
                            )
                          )
                        : "00"}
                      </Box>
                    </Grid> 
                    <Grid item xs={1}>
                     <Box className={classes.tableLabel} ml={1} textAlign="left">
                      {purchaseRegisterList.length
                        ? currencyFormate(
                          purchaseRegisterList.reduce(
                              (sum, li) => Number(sum) + Number(li.polOtherCharges),
                              0
                            )
                          )
                        : "00"}
                      </Box>
                    </Grid> 
                    <Grid item xs={2}>
                     <Box className={classes.tableLabel} ml={3} textAlign="left">
                      {purchaseRegisterList.length
                        ? currencyFormate(
                          purchaseRegisterList.reduce(
                              (sum, li) => Number(sum) + Number(li.polValue),
                              0
                            )
                          )
                        : "00"}
                      </Box>
                    </Grid>    
                </GridContainer>

            
              </Box> */}
          </CustomCard>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default AddPurchaseReturnListPage;
