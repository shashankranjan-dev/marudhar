import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../Components/CustomButton";
//SERVICE

import {
  getSearchItem,
  getAllSource,
  postEnquery,
  getEnquiryBySalesId,
  updateEnquery,
  getItems,
} from "../../../services/saleService/addEnqueryService";
import { getListUom } from "../../../services/uomService";
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";
import { getListCustomers } from "../../../services/customerListService";
import { getListUsers } from "../../../services/associateService";


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

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput, Tooltip } from "@material-ui/core";
import ViewListIcon from "@mui/icons-material/ViewList";

import theme from "../../../theme/theme";

import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";
// import { ColoseButton } from "../Components/CustomButton";
import { getListStatus } from "../../../services/addStatusService";

import AddCustomerPage from "../CustomerPage/CustomerPage";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  reactSelectStyles,
  tblBodyHoverColor,
  appScrollBar,
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
import ItemViewCard from "../HelperComponent/ItemViewCard";
import PageTitle, { PageHeader } from "../HelperComponent/PageTitle";
import StepProceedModel from "../HelperComponent/StepProceedModel";
import ReactSelect from "react-select";
import FormComponent from "../HelperComponent/FormComponent";
import {
  currentDate,
  dateFormateField,
  sortWord,
  timestamp,
} from "../HelperComponent/utils";
import ItemImg from "../HelperComponent/ItemImg";
import CustomDatePicker from "../HelperComponent/DatePicker";
import { wasteTransfer, postWaste } from "services/wasteManagerService";

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
  ddlError: {
    color: "#f44336",
    fontSize: "12px",
    marginRight: 15,
    marginTop: -5,
    fontWeight: 400,
  },
  container: {
    ...appScrollBar,
    maxHeight: 360,
  },
  customSelect: {
    marginBottom: 15,
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
  closeBtn: {
    marginTop: 10,
    marginBottom: 15,
    padding: "15px 20px",
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
  doubleFiled: { width: "20%" },

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
    width: "25%",
  },
  txt_uom: { width: "15%" },
  wQty: {
    width: "10%",
  },
  wQtyTxt: {
    width: "10%",
  },
  wUnit: { width: "10%" },

  wType: { width: "20%" },

  addAction: { width: "10%" },

  quantity: {
    width: "20%",
  },

  net_value_field: {
    width: "10%",
  },
  txt: {
    width: "6%",
  },
  Disc: {
    width: "5%",
  },
  deleteAction: {
    width: "25%",
  },

  // view Item
  viewId: { width: "0%" },
  viewAction: { width: "27%" },
  viewQuantity: { width: "8%" },
  viewItemImg: { width: "8%" },
  itemDetailsView: { width: "60%" },
}));

export const QuantityView = ({ quantity, uom_name }) => {
  return (
    <Grid container justifyContent="flex-end">
      <Grid item> {quantity}</Grid>
      <Grid item>
        <Box marginLeft="4px"> {uom_name}</Box>
      </Grid>
    </Grid>
  );
};

const WasteManagerForm = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [editedItem, setEditedItem] = React.useState([]);
  const [openModes, setOpenModel] = React.useState({
    addNewCustomer: false,
    newSource: false,
  });

  
  // dd List
  const [allSource, setAllSource] = React.useState([]);
  const [allUoms, setAllUoms] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [allCustomer, setAllCustomer] = React.useState([]);
  const [allUser, setAllUsers] = React.useState([]);

  // add Items
  const [addedItems, setAddedItems] = React.useState([]);
  const [allItems, setAllItems] = React.useState([]);
  const [enqueryDetail, setEnqueryDetail] = React.useState({
    edit: false,
    waste_id: "",
    txt_waste_date:currentDate(),
    ddl_sales_showroom: "",
    switch_active_status: false,
  });

  const [item, setItems] = React.useState([]);
  const [uomError, setUomError] = React.useState({});
const [enable,setEnabled] = React.useState(false);
  const [error, setError] = React.useState({
    txt_quantity : false,
    wType : false,
    converted_quantity:false,
    convertedTo:false,
    convertedToId:false
  });
  const [searchQuery, setSearchQuery] = React.useState("");

  const [itemDetail, setItemDetail] = React.useState([]);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const options = [
    { value: 1, label: "Converted" },
    { value: 2, label: "Fully Damaged" },
  ];
  // search Query
  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setSearchQuery(value);
  };

  // select Add Items
  const onSelect = (e, info) => {
    // console.log(e.label, "sen23112022/s")
    if (e.label === 'Fully Damaged')
    setEnabled(true)
    else
    setEnabled(false)
    setItemDetail({
      ...itemDetail,
      
      [info.name]: e.label,
      [`${info.name}Id`]: e.value,
      
    });

   

  };

  

  // on Change TextField
  const onChange = (e, row) => {
    const { name, value } = e.target;
    // Rate Check
    setItemDetail({ ...itemDetail, [name]: value });
  };
  // on Click add Item
  const onClickAddItem = (r) => {
    // console.log(itemDetail[`wType${r.item_id}`],"onclickadd")
    if(itemDetail[`wType${r.item_id}`] === 'Converted')
    {
      setError({
        convertedTo:!itemDetail['wType{r.item_id}']
      })
    }
    
    else{
     if (addedItems.find((v, i) => v.item_id === r.item_id)) {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Item already added", msgType: "info" },
      });
      setItemDetail({
        [`txt_quantity${r.item_id}`]: "",
        [`txt${r.item_id}`]: "",
      });
    } else {
      // console.log(itemDetail, "sen23112022/iu");
      setAddedItems([
        ...addedItems,
        {
          item_id: r.item_id,
          item_name:r.item,
          showroom_warehouse_id:localStorage.user_location,
          uom_name: r.uom_name,
          waste_date:timestamp(r.waste_date),
          // alt_uom_name:r.alt_uom_name,
          uom_id: r.uom_id,
          quantity: itemDetail[`txt_quantity${r.item_id}`]
            ? itemDetail[`txt_quantity${r.item_id}`]
            : 0,
          wasteType: itemDetail[`wType${r.item_id}`]
            ? itemDetail[`wType${r.item_id}`]
            : 0,
          convertedQty: itemDetail[`converted_quantity${r.item_id}`]
            ? itemDetail[`converted_quantity${r.item_id}`]
            : 0,
          convertedTo: itemDetail[`convertedTo${r.item_id}`]
            ? itemDetail[`convertedTo${r.item_id}`]
            : 0,
          convertedToId: itemDetail[`convertedTo${r.item_id}Id`]
            ? itemDetail[`convertedTo${r.item_id}Id`]
            : 0,
        },
      ]);

      setItemDetail({
        ...itemDetail,
        [`txt_quantity${r.item_id}`]: "",
        [`txt${r.item_id}`]: "",
      });
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: {
          msg: `Item added`,
          msgType: "success",
        },
      });
      // }
    }
    }
  };
  // console.log( globalState, "onSubmit");
  // on Click Submit Enquery
  const onClickSubmitForm = (e) => {
    e.preventDefault();
    // if (
    //     !addedItems.convertedQty ||
    //     !addedItems.convertedTo ||
    //     !addedItems.convertedToId ||
    //     !addedItems.uom_name||
    //     !addedItems.quantity||
    //     !addedItems.wasteType
    //   ) {
    //     setError({
    //         convertedQty: !addedItems.convertedQty,
    //         convertedTo: !addedItems.convertedTo,
    //         convertedToId: !addedItems.convertedToId,
    //         quantity: !addedItems.quantity,
    //         uom_name: !addedItems.uom_name,
    //         wasteType:!addedItems.wasteType
    //     });
    //   }
    //   else{
    
    addedItems.map((row) => {
        
         postWaste(
                row,
               localStorage.user_location,
               globalState?.user?.serial_id,

               currentDate(),
           (r) => {
          dispatch({
                   type: actionTypes.SET_OPEN_MSG,
                   payload: {
                       msg: "Waste Item Submited Successfully",
                       msgType: "success",
                       },
                       });
                },)
    }
    );

   
// }
setButtonDisabled(true);
history.push({
      pathname: "/admin/stock/WasteManager",

    });
  };

  // setButtonDisabled(true);
  // history.push({
  //     pathname: "/admin/stockJournal/stock",

  //   });

  const fetchData = () => {
    getListStatus(
      "Sales-Enquiry",
      (r) => {
        r.forEach((s, i) => {
          if (s.label === "New") {
            setEnqueryDetail((prv) => ({
              ...enqueryDetail,
              enquiry_status: s.value,
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
    getAllSource(
      (r) => {
        setAllSource([{ value: "", label: "" }, ...r]);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    getListUsers(
      (r) => {
        setAllUsers([{ value: "openModel", label: "Add New User" }, ...r]);
        if (globalState?.user?.serial_id) {
          let findUser = r.find(
            (s, i) => s.value == globalState?.user?.serial_id
          );
          setEnqueryDetail((prv) => ({
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
    getListCustomers(
      (r) => {
        setAllCustomer(
          !location.state?.edit
            ? [
                { value: "addNewCustomer", label: "-- Add New Customer --" },
                ...r,
              ]
            : r
        );
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
        let findUom = r.find(
          (s, i) => s.value == localStorage.getItem("user_location")
        );
        setEnqueryDetail((prv) => ({ ...prv, ddl_sales_showroom: findUom }));
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
  }, [globalState.refresh]);

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

  // search Item
  const onSearchItem = () => {
    getSearchItem(
      (items) => {
        setAllItems(items);
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

  // useEffect
  React.useEffect(() => {
    if (searchQuery.length >= 3) {
      onSearchItem();
    } else {
      //   //  console.log(enqueryDetail.edit,"PLS HELP LORD")
      //     if (enqueryDetail.edit)
      //     {
      //       console.log("HK")
      //       setAddedItems(editedItem);
      //     }
      //     else
      //      {
      // console.log("HK11");
      setAllItems([]);
      // }
    }

    getItems((res) => {
      setItems(res);
    });
  }, [searchQuery]);

  return (
    <ThemeProvider theme={theme}>
      <PageHeader
        title={
          enqueryDetail.edit
            ? "Stock Journal > Waste Manager"
            : "Stock Journal > Waste Manager"
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
              justifyContent="space-between"
              alignItems="center"
            >
              <GridItem xs="12">
                <TextField
                  autoFocus={true}
                  size="small"
                  placeholder="Search"
                  name="searchQuery"
                  style={{ marginBottom: -15 }}
                  type="search"
                  value={searchQuery}
                  onChange={onAddSearch}
                  id="outlined-basic"
                  fullWidth={true}
                  variant="outlined"
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
            <CustomCard
              cdTitle={"Select Items"}
              minHeight={200}
              maxHeight={400}
            >
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
                      <StyledTableCell align="right" className={classes.wQty}>
                        Waste Qty
                      </StyledTableCell>
                      <StyledTableCell align="center" className={classes.wUnit}>
                        Unit
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.wType}>
                        Waste Type
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.wQty}>
                        Convert Qty
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.wType}>
                        Convert To
                      </StyledTableCell>
                      <StyledTableCell align="right">Action</StyledTableCell>
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
                          className={classes.wQtyTxt}
                        >
                          <TextField
                            size="small"
                            placeholder="Qty"
                            name={`txt_quantity${row.item_id}`}
                            style={{ marginBottom: -9 }}
                            type="number"
                            inputProps={{ style: { textAlign: "right" } }}
                            onChange={(e) => onChange(e, row)}
                            id="outlined-basic"
                            error={error.txt_quantity}
                            // helperText={
                            //     error.txt_quantity ? "quantity is Required" : ""
                            //   }
                            fullWidth={true}
                            value={Number(
                              itemDetail[`txt_quantity${row.item_id}`]
                            ).toString()}
                            variant="outlined"
                          />
                          <Box style={{ marginBottom: -25 }}>
                            {Number(itemDetail[`txt_quantity${row.item_id}`])
                              ? (
                                  Number(
                                    itemDetail[`txt_quantity${row.item_id}`]
                                  ) / row.lower_unit_value
                                ).toFixed(2)
                              : 0}{" "}
                            {row.lower_caption}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.txt}>
                          <TextField
                            size="small"
                            placeholder="Unit"
                            name={`txt_uom${row.item_id}`}
                            style={{ marginBottom: -15 }}
                            inputProps={{
                              style: { textAlign: "right", color: "green" },
                            }}
                            onChange={(e) => onChange(e, row)}
                            id="outlined-basic"
                            fullWidth={true}
                            value={row.uom_name}
                            variant="outlined"
                            disabled
                          />
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.wType}
                        >
                          <ReactSelect
                            size="small"
                            options={options}
                            name={`wType${row.item_id}`}
                      

                            // getOptionLabel={(options) => options.label}
                            placeholder="Select"
                            formatGroupLabel={(d) => d.label}
                            menuPortalTarget={document.body}
                            onChange={onSelect}
                            style={{ width: "100%",menuPortal:base=>({...base,zIndex:9999}) }}
                            variant="outlined"
                            
                            // value={setItemDetail.wType}
                          />
                          {/* {error.wType && (
                          <div className={classes.ddlError}>
                            Type is Required
                          </div>
                        )} */}
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.txt}>
                          <TextField
                            size="small"
                            placeholder="Qty"
                            name={`converted_quantity${row.item_id}`}
                            style={{ marginBottom: -9 }}
                            type="number"
                            inputProps={{ style: { textAlign: "right" } }}
                            onChange={(e) => onChange(e, row)}
                            id="outlined-basic"
                            fullWidth={true}
                            disabled ={enable}
                            value={Number(
                              itemDetail[`converted_quantity${row.item_id}`]
                            ).toString()}
                            variant="outlined"
                          />
                          <Box style={{ marginBottom: -25 }}>
                            {Number(
                              itemDetail[`converted_quantity${row.item_id}`]
                            )
                              ? (
                                  Number(
                                    itemDetail[
                                      `converted_quantity${row.item_id}`
                                    ]
                                  ) / row.lower_unit_value
                                ).toFixed(2)
                              : 0}{" "}
                            {row.lower_caption}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.wType}
                        >
                          <ReactSelect
                            size="small"
                            options={item}
                            name={`convertedTo${row.item_id}`}
                            // getOptionLabel={(options) => options.label}
                            placeholder="Select"
                            formatGroupLabel={(d) => d.label}
                            menuPortalTarget={document.body}
                            onChange={onSelect}
                            style={{ width: "100%",menuPortal:base=>({...base,zIndex:9999}) }}
                            variant="outlined"
                            isDisabled = {enable}
                            // value={setItemDetail.wType}
                          />
                           {error.convertedTo && (
                          <div className={classes.ddlError}>
                             is Required
                          </div>
                        )}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.addAction}
                        >
                          <Button
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

        {addedItems.length > 0 && (
          <GridItem xs="12">
            <CustomCard
              cdTitle={
                enqueryDetail.edit
                  ? "Review Edited Items"
                  : "Review Added Items"
              }
              maxHeight={400}
            >
              <TableContainer className={classes.container}>
                <Table
                  className={classes.table}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        align="center"
                        className={classes.viewId}
                      >
                        #
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.viewItemImg}
                      >
                        Image
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.itemDetails}
                      >
                        Item Details
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.wQty}>
                        Waste Qty
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.wUnit}>
                        Unit
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.wType}>
                        Waste Type
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.wUnit}>
                        Converted Qty
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.wType}>
                        Converted To
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.viewAction}
                      >
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  {/* {console.log(addedItems, "sen23112022/rr")} */}
                  <TableBody>
                    {addedItems.map((row, i) => (
                      <StyledTableRow key={i}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                          className={classes.viewId}
                        >
                          {1 + i}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.viewItemImg}
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

                        <StyledTableCell align="left" className={classes.wQty}>
                          <QuantityView quantity={row.quantity} />
                        </StyledTableCell>
                        <StyledTableCell align="left" className={classes.wUnit}>
                          {row.uom_name}
                        </StyledTableCell>
                        <StyledTableCell align="left" className={classes.wType}>
                          {row.wasteType}
                        </StyledTableCell>
                        <StyledTableCell align="left" className={classes.wUnit}>
                          {row.convertedQty}
                        </StyledTableCell>
                        <StyledTableCell align="left" className={classes.wUnit}>
                          {row.convertedTo}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.viewAction}
                        >
                          <IconButton
                            onClick={(e) => onDeleteItem(e, i)}
                            aria-label="delete"
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
            </CustomCard>
          </GridItem>
        )}
        {/* Submit Enquiry details on Edit or Add */}
        {addedItems.length > 0 && (
          <GridItem xs={12}>
            <div className={classes.actionbtns}>
              <Button
                onClick={onClickSubmitForm}
                className={classes.actionbtn}
                variant="outlined"
                color="primary"
                disabled={buttonDisabled}
              >
                Submit
              </Button>
            </div>
          </GridItem>
        )}

        {/* <MasterModel
                    classicModal={classicModal}
                    onCloseModel={() => setClassicModal(false)}
                    onClickAddTask={onClickAddTask}
                    closeIcon={false}
                    width={600}
                    height="auto"
                    appLogo
                    addTodobtn
                    okbtnWith={200}
                    closeBtn={false}
                    modelName="Marudhar"
                    okBtnText="Proceed to Quotation"
                    onClickOk={onClickProcedeQuotation}
                >
                    <StepProceedModel
                        step={1}
                        title="Success!"
                        desc="Enquiry No"
                        generateNo={`${enqueryDetail.txt_enquiry_no}`}
                    />
                </MasterModel>

                {!location.state?.edit && (<MasterModel
                    classicModal={openModes.addNewCustomer}
                    onCloseModel={() =>
                        setOpenModel({ ...openModes, addNewCustomer: false })
                    }
                    width={1200}
                    height="auto"
                    appLogo
                    okbtnWith={200}
                    closeBtn={false}
                    okbtn={false}
                    onClickOk={() => { }}
                >
                    <Box p={1}>
                        <AddCustomerPage menuPortal={false} />
                    </Box>
                </MasterModel>)} */}
      </GridContainer>
    </ThemeProvider>
  );
};

export default WasteManagerForm;
