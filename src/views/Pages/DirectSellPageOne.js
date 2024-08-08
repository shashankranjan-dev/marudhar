import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../Components/MasterModel";
import { CustomCard } from "../Components/CustomCard";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../Components/CustomButton";
import {
  directPurchaseFormRowData,
  addedItemServiceRowData,
  dummyRowData,
} from "../../services/directPurchaseFormService";
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

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import ViewListIcon from "@mui/icons-material/ViewList";

import theme from "../../theme/theme";

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
import { Typography } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: appSecondColor,
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "18px 10px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
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
  searchItemsCards: {
    marginTop: 10,
    marginBottom: 20,
  },
  itemImgPaper: {
    width: "80px",
    height: "80px",
    overflow: "hidden",
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
    width: "5%",
  },
  quantity: {
    width: "5%",
  },
  net_value_field: {
    width: "10%",
  },
}));

const formData = [
  {
    formName: "BillDetails",
    fields: [
      {
        name: "txtCustomer",
        label: "Customer",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "select",
        xs: 12,
        md: 6,
        lg: 6,
        options: [
          {
            label: "Customer",
            value: "customer",
          },
        ],
      },

      {
        name: "txtBillNo",
        label: "Bill No",
        hidden: false,
        required: true,
        align: "left",
        data_type: "string",
        html_element: "TextField",
        defaultValue: "MM/BL/22-22/0786",
        error: false,
        xs: 12,
        md: 4,
        lg: 2,
      },
      {
        name: "txtBillDate",
        label: "Bill Date",
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
        name: "txtBillValue",
        label: "Bill Value",
        hidden: false,
        required: true,
        align: "left",
        data_type: "string",
        html_element: "TextField",
        defaultValue: "158265",
        error: false,
        xs: 12,
        md: 4,
        lg: 2,
      },
      {
        name: "txtSalesExecutive",
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
        name: "txtSalesShowRoom",
        label: "Showroom",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "select",
        xs: 12,
        md: 6,
        lg: 4,
        options: [
          {
            label: "Showroom",
            value: "Showroom",
          },
        ],
      },
      {
        name: "txtSalesDeliveryDate",
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
        name: "txtSalesDeliveryDate",
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
        name: "txtSalesNote",
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
        lg: 4,
      },
    ],
  },
];

const SalesPurchaseForm = () => {
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [billDetail, setBillDetail] = React.useState({});
  const [addSearch, setAddSearch] = React.useState({
    serarchItem: "",
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

  React.useEffect(() => {
    setAllUnits(directPurchaseFormRowData);
  }, []);

  const headerData = [
    {
      id: "id",
      label: "#",
      align: "left",
    },
    {
      id: "item_Img",
      label: "Image",
      align: "left",
    },
    {
      id: "item_details",
      label: "Item Details",
      align: "left",
    },
    {
      id: "stock",
      label: "Stock",
      align: "right",
    },
    {
      id: "mrp",
      label: "MRP",
      align: "right",
    },
    {
      id: "quantity_field",
      label: "Quantity",
      align: "left",
    },
    {
      id: "rate_field",
      label: "Rate",
      align: "left",
    },

    {
      id: "disc_field",
      label: "Disc%",
      align: "left",
    },
    {
      id: "disc_value_field",
      label: "Disc.Value",
      align: "left",
    },
    {
      id: "net_value_field",
      label: "Net Value",
      align: "left",
    },
    {
      id: "action",
      label: "Action",
      align: "center",
    },
  ];

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
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

  const onChange = (e) => {
    const { name, value } = e.target;
    setAddItem((prv) => ({ ...prv, [name]: value }));
  };
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
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
              <GridItem xs="6">
                <TextField
                  autoFocus={true}
                  size="small"
                  placeholder="Search"
                  name="serarchItem"
                  onChange={onAddSearch}
                  style={{ marginBottom: -20 }}
                  type="search"
                  id="outlined-basic"
                  fullWidth={true}
                  value={addSearch.serarchItem}
                  variant="outlined"
                />
              </GridItem>
              <GridItem xs="6">
                <div
                  style={{
                    float: "right",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CustomButton
                    name="btn_refres"
                    style={{ marginRight: "10px" }}
                  >
                    <SearchIcon />
                  </CustomButton>
                  <CustomButton name="btn_refres">
                    <RotateLeftIcon />
                  </CustomButton>
                </div>
              </GridItem>
            </GridContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Select and Add Items" height={450}>
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell align="left">Image</StyledTableCell>
                    <StyledTableCell align="left">Item Details</StyledTableCell>
                    <StyledTableCell align="right">Stock</StyledTableCell>
                    <StyledTableCell align="right">MRP</StyledTableCell>
                    <StyledTableCell align="right">Quantity</StyledTableCell>
                    <StyledTableCell align="right">Rate</StyledTableCell>
                    <StyledTableCell align="center">Disc%</StyledTableCell>
                    <StyledTableCell align="center">CGST%</StyledTableCell>
                    <StyledTableCell align="center">SGST%</StyledTableCell>
                    <StyledTableCell align="center">IGST%</StyledTableCell>
                    <StyledTableCell align="right">Net Value</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {directPurchaseFormRowData.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.id}
                      >
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.itemImg}>
                        <Paper className={classes.itemImgPaper}>
                          <img
                            src={
                              row.item_Img
                                ? row.item_Img
                                : "https://via.placeholder.com/80"
                            }
                            alt=""
                          />
                        </Paper>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.itemDetails}
                      >
                        <div className={classes.itemProDetail}>
                          <Typography variant="subtitle1" component="div">
                            {row.item_details.brand}
                          </Typography>
                          <Typography variant="subtitle1" component="div">
                            {row.item_details.category}
                          </Typography>
                          <Typography variant="subtitle1" component="div">
                            {row.item_details.item}
                          </Typography>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.stock}>
                        {row.stock}
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.mrp}>
                        {row.mrp}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.quantity}
                      >
                        <div>
                          <TextField
                            size="small"
                            placeholder="Quantity"
                            name={`txtQuantity${row.id}`}
                            style={{ marginBottom: -20, width: "80px" }}
                            type="number"
                            inputProps={{ style: { textAlign: "right" } }}
                            onChange={onChange}
                            id="outlined-basic"
                            fullWidth={true}
                            value={addItem[`txtQuantity${row.id}`]}
                            variant="outlined"
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.rate}>
                        <div>
                          <TextField
                            size="small"
                            placeholder="Rate"
                            name={`txtRate${row.id}`}
                            style={{ marginBottom: -20 }}
                            type="number"
                            value={row.rate}
                            defaultValue={row.rate}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            // value={addItem["txtRate",`${row.id}`].join('')}
                            variant="outlined"
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className={classes.doubleFiled}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div>
                            <TextField
                              size="small"
                              placeholder=""
                              name={`txtDiscount${row.id}`}
                              style={{ marginBottom: -20 }}
                              type="number"
                              // value={row.disc_field}
                              // defaultValue={row.disc_field}
                              inputProps={{ style: { textAlign: "right" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              // value={addItem["txtRate",`${row.id}`].join('')}
                              variant="outlined"
                            />
                          </div>
                          <div style={{ margin: "0 4px" }}>%</div>
                          <div>
                            <TextField
                              size="small"
                              placeholder=""
                              name={`txtDiscount${row.id}`}
                              style={{ marginBottom: -20 }}
                              type="number"
                              // value={row.disc_field}
                              // defaultValue={row.disc_field}
                              inputProps={{ style: { textAlign: "left" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              // value={addItem["txtRate",`${row.id}`].join('')}
                              variant="outlined"
                            />
                          </div>
                        </div>
                      </StyledTableCell>
                      {/* CGSt field */}
                      <StyledTableCell
                        align="center"
                        className={classes.doubleFiled}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div>
                            <TextField
                              size="small"
                              placeholder=""
                              name={`txtCgst1${row.id}`}
                              style={{ marginBottom: -20 }}
                              type="number"
                              // value={row.disc_field}
                              // defaultValue={row.disc_field}
                              inputProps={{ style: { textAlign: "left" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              variant="outlined"
                            />
                          </div>
                          <div style={{ margin: "0 4px" }}>%</div>
                          <div>
                            <TextField
                              size="small"
                              placeholder=""
                              name={`txtCgst2${row.id}`}
                              style={{ marginBottom: -20 }}
                              type="number"
                              // value={row.disc_field}
                              // defaultValue={row.disc_field}
                              inputProps={{ style: { textAlign: "left" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              variant="outlined"
                            />
                          </div>
                        </div>
                      </StyledTableCell>
                      {/* SGSt field */}

                      <StyledTableCell
                        align="center"
                        className={classes.doubleFiled}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div>
                            <TextField
                              size="small"
                              placeholder=""
                              name={`txtCgst1${row.id}`}
                              style={{ marginBottom: -20 }}
                              type="number"
                              // value={row.disc_field}
                              // defaultValue={row.disc_field}
                              inputProps={{ style: { textAlign: "left" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              variant="outlined"
                            />
                          </div>
                          <div style={{ margin: "0 4px" }}>%</div>
                          <div>
                            <TextField
                              size="small"
                              placeholder=""
                              name={`txtCgst2${row.id}`}
                              style={{ marginBottom: -20 }}
                              type="number"
                              // value={row.disc_field}
                              // defaultValue={row.disc_field}
                              inputProps={{ style: { textAlign: "left" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              variant="outlined"
                            />
                          </div>
                        </div>
                      </StyledTableCell>
                      {/* IGST Field */}
                      <StyledTableCell
                        align="right"
                        className={classes.doubleFiled}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div>
                            <TextField
                              size="small"
                              placeholder=""
                              name={`txtCgst1${row.id}`}
                              style={{ marginBottom: -20 }}
                              type="number"
                              // value={row.disc_field}
                              // defaultValue={row.disc_field}
                              inputProps={{ style: { textAlign: "left" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              variant="outlined"
                            />
                          </div>
                          <div style={{ margin: "0 4px" }}>%</div>
                          <div>
                            <TextField
                              size="small"
                              placeholder=""
                              name={`txtCgst2${row.id}`}
                              style={{ marginBottom: -20 }}
                              type="number"
                              // value={row.disc_field}
                              // defaultValue={row.disc_field}
                              inputProps={{ style: { textAlign: "left" } }}
                              id="outlined-basic"
                              fullWidth={true}
                              variant="outlined"
                            />
                          </div>
                        </div>
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.net_value_field}
                      >
                        <div>
                          <TextField
                            size="small"
                            placeholder="Value"
                            name={`txtValue${row.id}`}
                            style={{ marginBottom: -20 }}
                            type="number"
                            inputProps={{ style: { textAlign: "right" } }}
                            onChange={onChange}
                            id="outlined-basic"
                            fullWidth={true}
                            value={`${
                              addItem[`txtQuantity${row.id}`] * row.rate
                            }`}
                            variant="outlined"
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes[row.action]}
                      >
                        <div>
                          <Button
                            style={{ width: "30px", hight: "10px" }}
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

        <GridItem xs="12">
          <CustomCard cdTitle="Review Added Items" height={450}>
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell align="left">Image</StyledTableCell>
                    <StyledTableCell align="left">Item Details</StyledTableCell>
                    <StyledTableCell align="right">Stock</StyledTableCell>
                    <StyledTableCell align="right">MRP</StyledTableCell>
                    <StyledTableCell align="right">Quantity</StyledTableCell>
                    <StyledTableCell align="right">Rate</StyledTableCell>
                    <StyledTableCell align="center">Disc%</StyledTableCell>
                    <StyledTableCell align="center">CGST%</StyledTableCell>
                    <StyledTableCell align="center">SGST%</StyledTableCell>
                    <StyledTableCell align="center">IGST%</StyledTableCell>
                    <StyledTableCell align="right">Net Value</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addedItemServiceRowData.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                        className={classes.id}
                      >
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.itemImg}>
                        <Paper className={classes.itemImgPaper}>
                          <img
                            src={
                              row.item_Img
                                ? row.item_Img
                                : "https://via.placeholder.com/80"
                            }
                            alt=""
                          />
                        </Paper>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.itemDetails}
                      >
                        <div className={classes.itemProDetail}>
                          <Typography variant="subtitle1" component="div">
                            {row.item_details.brand}
                          </Typography>
                          <Typography variant="subtitle1" component="div">
                            {row.item_details.category}
                          </Typography>
                          <Typography variant="subtitle1" component="div">
                            {row.item_details.item}
                          </Typography>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.stock}>
                        {row.stock}
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.mrp}>
                        {row.mrp}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.quantity}
                      >
                        {row.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.rate}>
                        {row.rate}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes[row.value]}
                      >
                        {row.disc_field}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes[row.value]}
                      >
                        {row.cgst_field}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes[row.value]}
                      >
                        {row.sgst_field}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes[row.value]}
                      >
                        {row.igst_field}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes[row.value]}
                      >
                        {row.net_value_field}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes[row.action]}
                      >
                        <IconButton
                          aria-label="delete"
                          className={classes.margin}
                        >
                          <DeleteIcon style={{ color: "#f44336" }} />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        </GridItem>
        <GridItem xs="12">
          <CustomCard
            cdTitle="Bill Details"
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
                          <GridItem
                            xs={item.xs}
                            md={item.md}
                            lg={item.lg}
                            key={key}
                          >
                            {item.html_element === "select" && (
                              <>
                                <InputLabel id="label">{item.label}</InputLabel>
                                <Autocomplete
                                  id="combo-box-demo"
                                  options={item.options}
                                  inputValue={billDetail[item.name]}
                                  value={billDetail[item.name]}
                                  getOptionLabel={(option) => option.label}
                                  // onChange={(event, bank) => {
                                  //   onSelectBank(bank.value);
                                  // }}
                                  renderInput={(params) => (
                                    <TextField
                                      placeholder={item.label}
                                      fullWidth={true}
                                      {...params}
                                      size="small"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </>
                            )}

                            {item.html_element === "TextField" && (
                              <>
                                <InputLabel id="label">{item.label}</InputLabel>
                                <TextField
                                  size="small"
                                  placeholder={item.label}
                                  name={item.name}
                                  onChange={onChangeBillDate}
                                  type={item.data_type}
                                  style={{
                                    marginTop: !item.label ? "12px" : "",
                                  }}
                                  defaultValue={item.defaultValue}
                                  inputProps={{
                                    style: {
                                      textAlign: item.align,
                                    },
                                  }}
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={billDetail[item.name]}
                                  variant="outlined"
                                />
                              </>
                            )}
                            {item.noField === "noField" && (
                              <>
                                <div></div>
                              </>
                            )}
                            {item.html_element === "TextArea" && (
                              <>
                                <InputLabel id="label">{item.label}</InputLabel>
                                <TextField
                                  placeholder={item.label}
                                  name={item.name}
                                  onChange={onChangeBillDate}
                                  multiline
                                  rows={5}
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={billDetail[item.name]}
                                  variant="outlined"
                                />
                              </>
                            )}
                            {item.html_element === "switch" && (
                              <>
                                {/* <span className={classes.activeText}>
                                          {item.label}
                                        </span>
                                        <Switch
                                          onClick={onSetActive}
                                          checked={addBrand[item.name]}
                                          name={item.name}
                                          fullWidth={true}
                                          inputProps={{
                                            "aria-label": "primary checkbox",
                                          }}
                                          color="primary"
                                        /> */}
                              </>
                            )}
                            {item.html_element === "addBtn" && (
                              <>
                                <div style={{ float: "right" }}>
                                  <CircleAddBtn
                                    size="medium"
                                    title="Add"
                                    // onClick={onClickAddBank}
                                  />
                                </div>
                              </>
                            )}
                          </GridItem>
                        </>
                      );
                    })}
                </GridContainer>
              );
            })}
          </CustomCard>
        </GridItem>
        <GridItem xs={12}>
          <div className={classes.actionbtns}>
            <ColoseButton height={43} onClick={() => {}}>
              Close
            </ColoseButton>
            <Button
              // onClick={onAddCustomerForm}
              className={classes.actionbtn}
              variant="outlined"
              color="primary"
            >
              Save
            </Button>
          </div>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default SalesPurchaseForm;
