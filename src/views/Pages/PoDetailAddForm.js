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
import DeleteIcon from "@mui/icons-material/Delete";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";

import theme from "../../theme/theme";

import React from "react";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
} from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";
import alertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
    padding: "18px 14px",
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

  itemImgPaper: {
    marginRight: "15px",
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
    width: "40%",
  },
  quantity: {
    width: "5%",
  },
}));

const formData = [
  {
    formName: "BillDetails",
    fields: [
      //   {
      //     name: "txtVendorGroup",
      //     label: "Vendor",
      //     hidden: false,
      //     required: true,
      //     data_type: "string",
      //     html_element: "select",
      //     xs: 12,
      //     md: 6,
      //     lg: 6,
      //     options: [
      //       {
      //         label: "Vendor1",
      //         value: "vendor1",
      //       },
      //       {
      //         label: "Kolkata",
      //         value: "KolKata",
      //       },
      //       {
      //         label: "first",
      //         value: "firdrtdsst",
      //       },
      //     ],
      //   },
      // {
      //   noField: "noField",
      //   xs: 12,
      //   md: 6,
      //   lg: 6,
      // },
      {
        name: "txtGrnNo",
        label: "GRN No",
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
        name: "txtPODate",
        label: "Date",
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
        name: "txtBillNo",
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
        name: "txtPODate",
        label: "Date",
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
        name: "txtPOValue",
        label: "Value",
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
        name: "txtChallanNo",
        label: "Challan No",
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
        name: "txtPODate",
        label: "Date",
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
        name: "txtNote",
        label: "Note",
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
    ],
  },
];

const useAlertCls = makeStyles(alertStyle);

const PODetailsAddForm = () => {
  const alertcls = useAlertCls();
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [addItem, setAddItem] = React.useState({});
  const [billDetail, setBillDetail] = React.useState({});

  const [alert, setAlert] = React.useState(null);
  const [addSearch, setAddSearch] = React.useState({
    serarchItem: "",
  });

  const hideAlert = () => {
    setAlert(null);
  };

  const addedItemSuccess = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Added!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={alertcls.button + " " + alertcls.success}
      >
        Your Item has been Added.
      </SweetAlert>
    );
  };

  const titleAndTextAlert = () => {
    setAlert(
      <SweetAlert
        style={{ display: "block", marginTop: "-100px" }}
        title="Please Enter Quntity"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.info}
      >
        It{"'"}s pretty, isn{"'"}t it?
      </SweetAlert>
    );
  };

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
      id: "value_field",
      label: "Value",
      align: "left",
    },
    {
      id: "action",
      label: "Action",
      align: "center",
    },
  ];
  const addedItemHeaderData = [
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
      id: "quantity",
      label: "Quantity",
      align: "right",
    },
    {
      id: "rate",
      label: "Rate",
      align: "right",
    },
    {
      id: "value",
      label: "Value",
      align: "right",
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

  React.useEffect(() => {
    let totalValue = addItem.txtQuantity * addItem.txtRate;
    setAddItem({ ...addItem, txtValue: totalValue });
  }, [addItem.txtQuantity, addItem.txtRate]);

  const onAddItem = (row) => {
    if (!addItem[`txtQuantity${row.id}`]) {
      //   titleAndTextAlert();
      return;
    }
    setAddItem({ ...addItem, [`txtQuantity${row.id}`]: "" });
    addedItemSuccess();
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
          <CustomCard cdTitle="PO Details">
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell align="left">PO No</StyledTableCell>
                    <StyledTableCell align="left">Date</StyledTableCell>
                    <StyledTableCell align="right">Vendor</StyledTableCell>
                    <StyledTableCell align="right">value</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[].map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.id}
                      >
                        -
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.podate}>
                        -
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.itemDetails}
                      >
                        -
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.stock}>
                        -
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.mrp}>
                        -
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Item Recived" height={450}>
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell align="left">Image</StyledTableCell>
                    <StyledTableCell align="left">Item Details</StyledTableCell>
                    <StyledTableCell align="right">
                      Order Quantity
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Recived Quantity
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Recived Quntity
                    </StyledTableCell>
                    <StyledTableCell align="right">Balance</StyledTableCell>
                    <StyledTableCell align="right">Value</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyRowData.map((row, i) => (
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
                        -
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.mrp}>
                        -
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.quantity}
                      >
                        <div>
                          <TextField
                            size="small"
                            placeholder="Quantity"
                            name={`txtRecivedQuantity${row.id}`}
                            style={{ marginBottom: -20, width: "80px" }}
                            type="number"
                            inputProps={{ style: { textAlign: "right" } }}
                            onChange={onChange}
                            id="outlined-basic"
                            fullWidth={true}
                            value={addItem[`txtRecivedQuantity${row.id}`]}
                            variant="outlined"
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.rate}>
                        -
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes[row.value]}
                      >
                        -
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
                                  inputProps={{
                                    style: { textAlign: item.align },
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
        {alert}
      </GridContainer>
    </ThemeProvider>
  );
};

export default PODetailsAddForm;
