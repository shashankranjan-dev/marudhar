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
import {
  directPurchaseFormRowData,
  addedItemServiceRowData,
  dummyRowData,
} from "../../../services/directPurchaseFormService";
import {
  salesmanWiseData,
  getAllCategory,
  getAllBrands,
} from "../../../services/salesmanWiseSalesService";
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
import { IconButton, OutlinedInput } from "@material-ui/core";
import ViewListIcon from "@mui/icons-material/ViewList";

import theme from "../../../theme/theme";
import ReactSelect from "react-select";
import React from "react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";
// import { ColoseButton } from "../Components/CustomButton";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
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
import { Grid } from "@material-ui/core";
import ItemViewCard from "../HelperComponent/ItemViewCard";
import PageTitle, { PageHeader } from "../HelperComponent/PageTitle";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepProceedModel from "../HelperComponent/StepProceedModel";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

import { Typography } from "@material-ui/core";
import { whiteColor } from "assets/jss/material-dashboard-pro-react";
import { currentDate } from "../HelperComponent/utils";

const StyledTableCell = withStyles((theme) => ({
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

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  itemImgPaper: {
    marginRight: "15px",
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
  input: {
    height: 40,
    lineLight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
  actionbtns: {
    marginTop: 20,
    float: "right",
  },

  id: {
    width: "5%",
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
    width: "35%",
  },
  itemDetailsView: {
    width: "50%",
  },
  quantity: {
    width: "20%",
  },
  viewQuantity: {
    width: "20%",
  },
  net_value_field: {
    width: "10%",
  },
  Disc: {
    width: "5%",
  },
  deleteAction: {
    width: "25%",
  },
  Salesman: {
    width: "15%",
  },
  customSelect: {
    marginBottom: 15,
  },
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "22px",
    },
  },
}));

const formData = [
  {
    formName: "BillDetails",
    fields: [
      {
        name: "txt_enquiry_no",
        label: "Enquiry No",
        hidden: false,
        required: true,
        align: "left",
        data_type: "string",
        html_element: "TextField",
        defaultValue: "MM/BL/22-22/0786",
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
        defaultValue: "2021-08-16",
        error: false,
        xs: 12,
        md: 4,
        lg: 2,
      },
      {
        name: "ddl_sales_source",
        label: "Source",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "select",
        xs: 12,
        md: 6,
        lg: 2,
        options: [
          {
            label: "Email",
            value: "Email",
          },
          {
            label: "Verbal",
            value: "Verbal",
          },
        ],
      },
      {
        name: "txt_customer",
        label: "Customer",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "select",
        xs: 12,
        md: 6,
        lg: 4,
        options: [
          {
            label: "Customer",
            value: "customer",
          },
        ],
      },

      {
        name: "txt_sales_executive",
        label: "Sales Executive",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "select",
        xs: 12,
        md: 6,
        lg: 4,
        options: [
          {
            label: "Sales Executive",
            value: "Sales Executive",
          },
        ],
      },
      {
        name: "txt_sales_showRoom",
        label: "Show room",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "select",
        xs: 12,
        md: 6,
        lg: 4,
        options: [
          {
            label: "Show room",
            value: "Show room",
          },
        ],
      },
      {
        name: "date_sales_delivery",
        label: "Delivery Between",
        hidden: false,
        required: true,
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
        name: "date_sales_delivery",
        label: "",
        hidden: false,
        required: true,
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
        name: "txt_sales_note",
        label: "Note",
        hidden: false,
        required: true,
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

const SalesmanWiseSalePage = () => {
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [allParentCategory, setAllCategory] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [billDetail, setBillDetail] = React.useState({});
  const [addSearch, setAddSearch] = React.useState({
    ddl_salesman_id:"",
    txt_item: "",
    ddl_brand: "",
    ddl_category: "",
    txt_from_date: currentDate(),
    txt_to_date: currentDate(),
  });

  const [addItem, setAddItem] = React.useState({
    txtQuantity: "",
    txtRate: "",
    txtValue: "",
    item: "",
    brand: "",
    category: "",
    itemImg: "",
  });

  const onChangeBillDate = (e) => {
    const { name, value } = e.target;
    setBillDetail({ ...billDetail, [name]: value });
  };

  const fetchData = () => {
    getAllCategory(
      (r) => {
        setAllCategory(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    getAllBrands(
      (r) => {
        setAllBrands(r);
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
    setAllUnits(directPurchaseFormRowData);
  }, []);

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
      
    
    
    txtValue: "",
    ddl_salesman_id:"",
    txt_item: "",
    ddl_brand: "",
    ddl_category: "",
    txt_from_date: currentDate(),
    txt_to_date: currentDate(),
    });
  };

  const onAddItem = (v) => {
    // setAddItem({
    //   ...addItem,
    //   itemImg: v.itemImg,
    //   brand: v.brand,
    //   item: v.item,
    // });
    // setAddedItems([...addedItems, addItem]);
    // console.log(addItem);
    // setAddItem({
    //   txtQuantity: "",
    //   txtRate: "",
    //   txtValue: "",
    //   item: "",
    //   brand: "",
    //   category: "",
    //   itemImg: "",
    // });
  };

  const onClickSubmit = () => {
    history.push("/admin/sales/add-new-quatation");
    setClassicModal(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setAddItem((prv) => ({ ...prv, [name]: value }));
  };
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <PageHeader title="MIS Report > Salesman Wise Sales " />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle="Search Salesman Wise Sales"
            filterIcon
            onClickFilter={() => {}}
          >
            <GridContainer
              style={{ padding: "10px" }}
              justifyContent="flex-start"
              alignItems="center"
            >
              <GridItem xs="3">
                <InputLabel id="label">Brand</InputLabel>
                <ReactSelect
                  options={allBrands}
                  placeholder="Select"
                  name="ddl_brand"
                  formatGroupLabel={(d) => d.label}
                  menuPortalTarget={document.body}
                  styles={reactSelectStyles}
                  className={classes.customSelect}
                  onChange={(v, info) => onSelect(info, v)}
                  value={addSearch.ddl_brand}
                  // onChange={(v) => onSelect("ddl_brand_id", v)}
                  // value={{
                  //   label: addSearch.ddl_brand_label,
                  //   value: addSearch.ddl_brand_id,
                  // }}
                />
              </GridItem>
              <GridItem xs="3">
                <InputLabel id="label">Category</InputLabel>
                <ReactSelect
                  options={allParentCategory}
                  placeholder="Select"
                  name="ddl_category"
                  formatGroupLabel={(d) => d.label}
                  menuPortalTarget={document.body}
                  styles={reactSelectStyles}
                  className={classes.customSelect}
                  onChange={(v, info) => onSelect(info, v)}
                  value={addSearch.ddl_category}
                  // onChange={(v) => onSelect("ddl_brand_id", v)}
                  // value={{
                  //   label: addSearch.ddl_brand_label,
                  //   value: addSearch.ddl_brand_id,
                  // }}
                />
              </GridItem>
              <GridItem xs="6">
                <InputLabel id="label">Item</InputLabel>
                <TextField
                  size="small"
                  placeholder="Item"
                  name="txt_item"
                  onChange={onAddSearch}
                  id="outlined-basic"
                  fullWidth={true}
                  value={addSearch.txt_item}
                  variant="outlined"
                />
              </GridItem>
              <GridItem xs="3">
                <InputLabel id="label">Salesman</InputLabel>
                <ReactSelect
                  options={[
                    { value: "Salesman1", label: "Salesman1" },
                    { value: "Salesman2", label: "Salesman2" },
                  ]}
                  getOptionLabel={(option) => option.label}
                  placeholder="Select"
                  formatGroupLabel={(d) => d.label}
                  menuPortalTarget={document.body}
                  styles={reactSelectStyles}
                  className={classes.customSelect}
                  onChange={(v, info) => onSelect(info, v)}
                  value={addSearch.ddl_salesman}
                  // onChange={(v) => onSelect("ddl_brand_id", v)}
                  // value={{
                  //   label: addSearch.ddl_brand_label,
                  //   value: addSearch.ddl_brand_id,
                  // }}
                />
              </GridItem>

              <GridItem xs="2">
                <InputLabel id="label">Date Between</InputLabel>
                <TextField
                     name="txt_from_date"
                    size="small"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    value={addSearch.txt_from_date}
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
                    name="txt_to_date"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    value={addSearch.txt_to_date}
                    onChange={onAddSearch}
                    className={classes.dateField}

                    InputLabelProps={{
                      shrink: true,
                      
                    }}
                />
              </GridItem>

              <GridItem xs="5">
                <div
                  style={{
                    float: "right",
                    display: "flex",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <CustomButton style={{ marginRight: "10px" }}>
                    <SearchIcon />
                  </CustomButton>
                  <CustomButton name="btn_refres"onClick={onClickRefresh}>
                    <RotateLeftIcon />
                  </CustomButton>
                </div>
              </GridItem>
              {/* <GridItem xs="3">
                  <InputLabel id="label">Status</InputLabel>
                  <Autocomplete
                    id="combo-box-demo"
                    options={[{ value: "Status", label: "Status" }]}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        onChange={onAddSearch}
                        value={addSearch.category}
                        placeholder="Status"
                        fullWidth={true}
                        {...params}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  />
                </GridItem> */}
            </GridContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>

      {/* Select and Add Items */}

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Salesman Wise Sales List" height={350}>
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">#</StyledTableCell>

                    <StyledTableCell align="left">Item Details</StyledTableCell>

                    <StyledTableCell align="right">Salesman 1</StyledTableCell>
                    <StyledTableCell align="right">Salesman 2</StyledTableCell>
                    <StyledTableCell align="right">Salesman 3</StyledTableCell>
                    <StyledTableCell align="right">Salesman 4</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesmanWiseData.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="center" className={classes.id}>
                        {row.id}
                      </StyledTableCell>

                      <StyledTableCell
                        align="left"
                        className={classes.itemDetails}
                      >
                        <ItemViewCard item_id={row.item_id} />
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.Salesman}
                      >
                        {row.Salesman1}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.Salesman}
                      >
                        {row.Salesman2}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.Salesman}
                      >
                        {row.Salesman3}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.Salesman}
                      >
                        {row.Salesman4}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default SalesmanWiseSalePage;
