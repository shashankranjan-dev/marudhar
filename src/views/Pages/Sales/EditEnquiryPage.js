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
import { currentDate, dateFormateField ,sortWord} from "../HelperComponent/utils";
import ItemImg from "../HelperComponent/ItemImg";
import CustomDatePicker from "../HelperComponent/DatePicker";

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
    marginTop: -15,
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
    width: "55%",
  },
  txt_uom: { width: "15%" },

  showroom_field: { width: "7%" },
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

const AddEnquiryPage = () => {
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
    sales_id: "",
    txt_enquiry_no: "AUTO GENERATED",
    date_enq: currentDate(),
    ddl_customer: "",
    ddl_sales_executive: "",
    // ddl_sales_source: "",
    ddl_sales_showroom: "",
    date_sales_delivery_start: currentDate(),
    date_sales_delivery_end: currentDate(),
    txt_enquiry_note: "",
    enquiry_status: "",
    switch_active_status: false,
  });

  const [uomError, setUomError] = React.useState({});

  const [error, setError] = React.useState({});
  const [searchQuery, setSearchQuery] = React.useState("");

  const [itemDetail, setItemDetail] = React.useState({});

  // search Query
  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setSearchQuery(value);
  };

  // select Add Items
  const onSelect = (info, v) => {
    setItemDetail({ ...itemDetail, [info.name]: v });
  };

  // on Change TextField
  const onChange = (e, row) => {
    const { name, value } = e.target;

   //console.log(name,value,"11")
   //console.log(allItems,"11")

 

    // Rate Check
    setItemDetail({ ...itemDetail, [name]: value });
  
  };



// //console.log(itemDetail,"itemDetail");

  // on Click add Item
  const onClickAddItem = (r) => {
    //console.log("data_onClickAddItem==>",r)

// if(itemDetail.txt_quantity =0)
// {
//   dispatch({
//     type: actionTypes.SET_OPEN_MSG,
//     payload: { msg:"Enter Valid Quantity", msgType: "error" },
//   });
// }

// else if (itemDetail[`txt_quantity${r.item_id}`] === '') {
//   dispatch({
//     type: actionTypes.SET_OPEN_MSG,
//     payload: { msg: `Invalid Quantity`, msgType: "info" },
//   });
// }


// else{
  if (addedItems.find((v, i) => v.item_id === r.item_id)) {
    dispatch({
      type: actionTypes.SET_OPEN_MSG,
      payload: { msg: "Item already added", msgType: "info" },
    });
    setItemDetail({
      [`txt_quantity${r.item_id}`]: "",
      [`txt${r.item_id}`]: "",
    });
  } 
  

  
  else 
  {
   // if (!itemDetail[`txt${r.item_id}`]?.value) {
     // setUomError({
      //  [`txt${r.item_id}`]: !itemDetail[`txt${r.item_id}`],
    //  });
 //   } else {
     // setUomError({});
      setAddedItems([
        ...addedItems,
        {
          item_id: r.item_id,
          disc_percentage:0,
          disc_value:0,
          selling_price: r.mrp,
          gst_percentage: r.cgst_percentage,
          uom_name:r.uom_name,
          // alt_uom_name:r.alt_uom_name,
          uom_id:r.uom_id,
          quantity: itemDetail[`txt_quantity${r.item_id}`]
           ? itemDetail[`txt_quantity${r.item_id}`] : 0,
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
// }

  };









  // on Click Submit Enquery
  const onClickSubmitForm = (e) => {
    e.preventDefault();
    if (
      !enqueryDetail.ddl_customer ||
      !enqueryDetail.ddl_sales_executive ||
      !enqueryDetail.ddl_sales_showroom ||
      // !enqueryDetail.ddl_sales_source ||
      !enqueryDetail.date_sales_delivery_start
    ) {
      setError({
        ddl_customer: !enqueryDetail.ddl_customer,
        // ddl_sales_source: !enqueryDetail.ddl_sales_source,
        ddl_sales_showroom: !enqueryDetail.ddl_sales_showroom,
        ddl_sales_executive: !enqueryDetail.ddl_sales_executive,
        date_sales_delivery_start: !enqueryDetail.date_sales_delivery_start,
      });
    } else {
      if (addedItems.length > 0) {
        if (enqueryDetail.edit) {
          updateEnquery(
            enqueryDetail,
            addedItems,
            (r) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: {
                  msg: "Enquiry Updated Successfully",
                  msgType: "success",
                },
              });
              setClassicModal(true);
              setEnqueryDetail((prv) => ({
                ...prv,
                sales_id: r.sales_id,
              }));
            },
            (err) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: { msg: err, msgType: "error" },
              });
            }
          );
        } else {
          postEnquery(
            enqueryDetail,
            addedItems,
            (r) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: {
                  msg: "Enquiry Submited Successfully",
                  msgType: "success",
                },
              });
              onClearState();
              setClassicModal(true);
              setEnqueryDetail((prv) => ({
                ...prv,
                sales_id: r.sales_id,
                txt_enquiry_no: r.enquiry_no,
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
      } else {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: "Please Add an Item",
            msgType: "warning",
          },
        });
      }
    }
  };

  const onClickProcedeQuotation = () => {
    setClassicModal(false);
    history.push({
      pathname: "/admin/sales/add-new-quatation",
      state: {
        row: { sales_id: enqueryDetail.sales_id },
      },
    });
  };

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
        setAllCustomer( !location.state?.edit ? ([
          { value: "addNewCustomer", label: "-- Add New Customer --" },
          ...r,
        ]) : r);
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

  // onChange BillDetails
  const onChangeEnqueryDetails = (e) => {
    const { name, value } = e.target;
    setEnqueryDetail({ ...enqueryDetail, [name]: value });
  };
  const onSelectDetails = (name, v) => {
    if (v.value === "addNewCustomer") {
      setOpenModel({ ...openModes, addNewCustomer: true });
      setEnqueryDetail({ ...enqueryDetail, [name]: "" });
    } else if (v.value === "openModel") {
      setEnqueryDetail({ ...enqueryDetail, [name]: "" });
    } else {
      setEnqueryDetail({ ...enqueryDetail, [name]: v });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [globalState.refresh]);

  // on Edit Enquiry
  React.useEffect(() => {
    //console.log("sen133",location.state?.row)
    if (location.state?.row) {
      getEnquiryBySalesId(
        location.state?.row.sales_id,

        (r) => {
          setAddedItems(r.item_details); //chnged by priyanka
          setEditedItem(r.item_details);
          r.item_details.map((v, i) => {
            setItemDetail((prv) => ({
              ...prv,
              [`txt_quantity${v.item_id}`]: v.quantity,
              [`txt${v.item_id}`]: { value: v.uom_id, label: v.uom_name },

            }));
          });
          setEnqueryDetail({
            edit: location.state?.edit,
            sales_id: r.sales_id,
            txt_enquiry_no: r.enqNo,
            date_enq: dateFormateField(r.enqDate),
            ddl_customer: r.ddl_enqCustomer,
            ddl_sales_executive: r.ddl_enqSalesExecutive,
            // ddl_sales_source: r.ddl_enqSource,
            ddl_sales_showroom: r.ddl_enqShowroom,
            date_sales_delivery_start: dateFormateField(r.delivery_from_date),
            date_sales_delivery_end: dateFormateField(r.delivery_to_date),
            txt_enquiry_note: r.note,
            switch_active_status: r.active_status === "Y" ? true : false,
          });
          //console.log("PLS HELP",location.state?.edit)
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
  //  getListUom(
      
    //  (r) => {
     //   setAllUoms(r);
     // },
      //(err) => {
       // dispatch({
        //  type: actionTypes.SET_OPEN_MSG,
         // payload: { msg: err, msgType: "error" },
        //});
    //  }
    //);
    getSearchItem(
      (items) => {
        if (enqueryDetail.edit) {
          
          //console.log("sen13",items)
          let newArr = items.filter((item, i) => !editedItem.includes(item));
          setAllItems(newArr);
        } else {
          //console.log("sen131",items)
          setAllItems(items);
          // items.map((v, i) => {
          //   setItemDetail((prv) => ({
          //     ...prv,
          //     [`txt_quantity${v.item_id}`]: 0,
          //   }));
          // });
        }
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

  const onClearState = () => {
    setAddedItems([]);
    setError({});
    setEnqueryDetail({
      ...enqueryDetail,
      edit: false,
      date_enq: currentDate(),
      // ddl_customer: "",
      ddl_sales_executive: "",
      // ddl_sales_source: "",
      ddl_sales_showroom: "",
      date_sales_delivery_start: currentDate(),
      date_sales_delivery_end: currentDate(),
      txt_enquiry_note: "",
      switch_active_status: false,
    });
  };

  // useEffect
  React.useEffect(() => {
    if (searchQuery.length >= 4)
     {
      onSearchItem();
     }
     else
      {
      setAllItems([]);
      }
  }, [searchQuery]);

  // Form Data
  const formData = [
    {
      formName: "enqueryDetails",
      fields: [
        {
          disabled: true,
          name: "txt_enquiry_no",
          label: "Enquiry No",
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
          name: "date_enq",
          label: "Enquiry Date",
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
        //   options: allSource.sort(sortWord("label")),
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
          options: allCustomer, //.sort(sortWord("label")),
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
          options: allUser.sort(sortWord("label")),
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
          options: allShowroomWarehouse.sort(sortWord("label")),
        },
        {
          name: "date_sales_delivery_start",
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
          name: "date_sales_delivery_end",
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
          name: "txt_enquiry_note",
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

  const onClickAddTask = () => {
    
    history.push({
      pathname: "/admin/enquiry-list-view",
      state: {
        row: { sales_id: enqueryDetail.sales_id},
        customer_name: enqueryDetail.ddl_customer.label,
        updateTask: true,
      },
    });
  };

  const onMenuOpen = () => {
    getListCustomers(
      (r) => {
        setAllCustomer(!location.state?.edit ? ([
          { value: "addNewCustomer", label: "Add New Customer" },
          ...r,
        ]) : r);
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
      <PageHeader
        title={
          enqueryDetail.edit
            ? "Sales > Enquiry > Edit"
            : "Sales > Enquiry > Add"
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
              cdTitle={  "Select and Add Item"
           
              }
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
                      <StyledTableCell
                        align="right"
                        className={classes.showroom_field}
                      >
                        Qty
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.txt}>
                        Unit
                      </StyledTableCell>
                      <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
              {/* {    //console.log(allItems,"allItems")} */}
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
                          className={classes.showroom_field}
                        >
                          <TextField
                            size="small"
                            placeholder="Qty"
                            name={`txt_quantity${row.item_id}`}
                            style={{ marginBottom: -15 }}
                            type="number"
                            inputProps={{ style: { textAlign: "right" } }}
                            onChange={(e) => onChange(e, row)}
                            id="outlined-basic"
                            fullWidth={true}
                            value={Number(itemDetail[`txt_quantity${row.item_id}`]).toString()}
                            variant="outlined"
                          />
                         
                          <Box className={classes.tableLabel} ml={0} textAlign="left">

                          {Number(itemDetail[`txt_quantity${row.item_id}`]) ?
                         ( Number(itemDetail[`txt_quantity${row.item_id}`]) / row.lower_unit_value).toFixed(2) : 0} {row.lower_caption}
                            
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.txt}
                        >
                          <TextField
                           size="small"
                           placeholder="Unit"
                           name={`txt_uom${row.item_id}`}
                          //  style={{ marginBottom: -15 }}
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
              cdTitle={ "Review Edited Items" }
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
                        className={classes.itemDetailsView}
                      >
                        Item Details
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.viewQuantity}
                      >
                        Qty
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.viewUOM}>
                        Unit
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.viewAction}
                      >
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {//console.log(addedItems,"sen2")} */}
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
                          className={classes.itemDetailsView}
                        >
                          <ItemViewCard item_id={row.item_id} />
                        </StyledTableCell>

                        <StyledTableCell
                          align="left"
                          className={classes.viewQuantity}
                        >
                          <QuantityView quantity={row.quantity} />
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.viewUOM}
                        >
                          {row.uom_name}
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
        {/* edit Enquiry details  */}
        {(addedItems.length > 0 || enqueryDetail.edit) && (
          <GridItem xs="12">
            <CustomCard
              cdTitle={
                enqueryDetail.edit ? "Edit Enquiry Details" : "Enquiry Details"
              }
              width="100%"
              height="100%"
              style={{ marginTop: 0 }}
            >
              {formData.map((form, fkey) => {
                return (
                  <GridContainer key={fkey} style={{ padding: "5px 20px" }}>
                    {form.formName === "enqueryDetails" &&
                      form.fields.map((item, key) => {
                        return (
                          <FormComponent
                            item={item}
                            key={key}
                            onMenuOpen={onMenuOpen}
                            onSelect={onSelectDetails}
                            state={enqueryDetail}
                            onChange={onChangeEnqueryDetails}
                            error={error}
                          />
                        );
                      })}
                  </GridContainer>
                );
              })}
            </CustomCard>
          </GridItem>
        )}
        {/* Submit Enquiry details on Edit or Add */}
        {(addedItems.length > 0 || enqueryDetail.edit) && (
          <GridItem xs={12}>
            <div className={classes.actionbtns}>
              <Button
                onClick={onClickSubmitForm}
                className={classes.actionbtn}
                variant="outlined"
                color="primary"
              >
                Submit Enquiry
              </Button>
            </div>
          </GridItem>
        )}

        <MasterModel
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

        { !location.state?.edit && (<MasterModel
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
          onClickOk={() => {}}
        >
          <Box p={1}>
            <AddCustomerPage menuPortal={false} />
          </Box>
        </MasterModel>)}
      </GridContainer>
    </ThemeProvider>
  );
};

export default AddEnquiryPage;
