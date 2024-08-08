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
import { getDirectPurchaseByIdForItemR } from "../../../services/directPurchaseFormService";
import {
  upadateItemReceived,
  postJournalFromDirectPurchase,
  getVendorByVendorName,
} from "../../../services/ItemReceivedService";
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";

import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/core";

import { Grid } from "@material-ui/core";
import theme from "../../../theme/theme";

import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  activeText,
  appScrollBar,
} from "assets/jss/material-dashboard-pro-react";
// import { ColoseButton } from "../Components/CustomButton";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import ReactSelect from "react-select";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemViewCard from "../HelperComponent/ItemViewCard";
import PageTitle from "../HelperComponent/PageTitle";
//SERVICE
import {} from "../../../services/ItemReceivedService";
import { getListVendor } from "../../../services/vendorService";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { Typography } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../Sales/AddEnquiryPage";
import { Box, Paper } from "@material-ui/core";
import ItemImg from "../HelperComponent/ItemImg";
import FormComponent from "../HelperComponent/FormComponent";
import StepProceedModel from "../HelperComponent/StepProceedModel";

import {
  currentDate,
  currencyFormate,
  dateFormateField,
} from "../HelperComponent/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },

  tableLabel: {
    fontWeight: 500,
    color: appSecondColor,
  },
  itemImgPaper: {
    width: "80px",
    height: "80px",
    overflow: "hidden",
  },
  customSelect: {
    marginBottom: 15,
  },

  container: {
    ...appScrollBar,
    maxHeight: 360,
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

  actionbtn: {
    marginTop: 10,
    float: "left",
  },
  actionbtns: {
    marginTop: 20,
    float: "right",
  },
  id: {
    width: "0%",
  },

  po_date: {
    width: "10%",
  },
  po_no: {
    width: "20%",
  },
  po_vendor: {
    width: "40%",
  },
  quantity: {
    width: "5%",
  },

  // for addItem
  itemDetails: { width: "25%" },
  itemImg: { width: "8%" },
  rate: { width: "8%" },
  orderQty: { width: "8%" },
  orderQty_uom: { width: "8%" },
  recievedQty: { width: "10%" },
  nowReceiveField: { width: "15%" },
  balanceQty: { width: "8%" },
  valueField: { width: "13%" },
}));

const ItemRecievedPageForm = () => {
  const history = useHistory();
  const location = useLocation();
  const [classicModal, setClassicModal] = React.useState(false);
  const classes = useStyles();
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [allvendor, setAllVendors] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  let balance_qty = 0;
  const [vendorDetail, setVendorDetail] = React.useState([]);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [user,setUser]=React.useState('');
  const [error, setError] = React.useState({
    txt_bill_no: false,
    txt_bill_value: false,
    ddl_vendor_group: false,
    txt_challan_no: false,
    txt_vehicle_no: false,
    txt_waybill_no: false,
  });
  const [billDetail, setBillDetail] = React.useState({
    module: "ITEMRECEIVED",
    edit: false,
    purchase_id: "",
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
  const [addItemQty, setAddItemQty] = React.useState({});

  const onChangeBillDate = (e) => {
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

  let gst_Value = 0;

  const onChange = (e, row) => {
    const { name, value } = e.target;

    //console.log(name, "888a");

    if (name === `txt_received_qty${row.item_id}`) {
      if (!value) {
        setAddItemQty((prv) => ({
          ...prv,
          [name]: value,
          [`txt_value${row.item_id}`]: 0,
        }));
      } else {
        const balance_qty =
          row.quantity -
          receivedQtyByItem(addedItems.received_item_details, row.item_id);

        if (balance_qty >= value) {
          //console.log(row.gst_type);
          if (row.gst_type === 0) {
            gst_Value = value * row.rate;
            // ((Number(row.gst_percentage) * Number(afterDisc) / 100) + Number(afterDisc));
          } else {
            gst_Value =
              Number(value) *
              ((Number(row.gst_percentage) * Number(row.rate)) / 100 +
                Number(row.rate));
          }

          // const netValue = Number(row.rate) * Number(value);
          // const discVal=(Number(row.rate) * Number(value) * Number(row.disc_percentage)/100)
          // const afterDisc= netValue - discVal;
          // const gst_Value =
          //   ((Number(row.gst_percentage) * Number(afterDisc)/100)+ Number(afterDisc));

          setAddItemQty((prv) => ({
            ...prv,
            [name]: value,

            [`txt_value${row.item_id}`]: gst_Value,
          }));
        } else {
          setAddItemQty((prv) => ({
            ...prv,
            [name]: 0,
            [`txt_value${row.item_id}`]: 0,
          }));

          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: {
              msg: " Balanced quantity exhausted",
              msgType: "warning",
            },
          });
        }
      }
    }

    let balanceQty =
      row.quantity -
      receivedQtyByItem(addedItems.received_item_details, row.item_id);
    if (Number(value) <= Number(balanceQty)) {
      //console.log(value, Number(balanceQty), "sen1906");

      setAddItemQty((prv) => ({ ...prv, [name]: value }));
    } else {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: {
          msg: "Received Quantity cannot be greater than balanced quantity",
          msgType: "warning",
        },
      });
    }
  };

  const receivedQtyByItem = (received_item_details, item_id) => {
    let returnVal = 0;

    for (let iCtr = 0; iCtr < received_item_details.length; iCtr++) {
      if (received_item_details[iCtr]["item_id"] == item_id) {
        returnVal =
          returnVal + Number(received_item_details[iCtr]["receivedQty"]);
      }
    }
    return returnVal;
  };

  const onSelectDetails = (name, v) => {
    if (v.value === "Vendor") {
      setOpenModel({ ...openModes, newVendor: true });
    } else if (v.value === "openModel") {
      setBillDetail({ ...billDetail, [name]: "" });
    } else {
      setBillDetail({ ...billDetail, [name]: v });
    }
  };
  const fetchData = () => {
    getListVendor(
      (r) => {
        //console.log(r, "sen2424");
        setAllVendors(r);
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
        //console.log(r, "sen2424");
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

    if (location.state?.row) {
      //console.log(location.state?.row.GrnVendor, "sen2004");
      //fetching ledger id by vendor name
      getVendorByVendorName(
        location.state?.row.GrnVendor,
        (r) => {
          setVendorDetail(r[0]);
        },
        (err) => {
          //console.log("sen20041");
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );

      setBillDetail((prv) => ({
        ...prv,
        purchase_id: location.state?.row.purchase_id,
      }));

      //console.log(location.state?.row.purchase_id, "sen1231");
      getDirectPurchaseByIdForItemR(
        location.state?.row.purchase_id,
        (r) => {
          //console.log("sen123", r);
          setAddedItems(r);

          setBillDetail((prv) => ({
            ...prv,
            [`txt_bill_value`]: r.item_details.reduce(
              (sum, li) => Number(sum) + Number(li.net_value),
              0
            ),
            ddl_vendor_group: r.ddl_vendor_group,
          }));

          if (r.item_details) {
            r.item_details.map((item, i) => {
              setAddItemQty((prv) => ({
                ...prv,
                [`txt_received_qty${item.item_id}`]: 0,
                [`txt_value${item.item_id}`]: 0,
              }));

              if (item.receivedQty) {
                // setAddItemQty((prv) => ({
                //   ...prv,
                //   [`receivedQty_${item[r.received_item_details.length - 1].item_id}`]: Number(item[r.received_item_details.length - 1].receivedQty) || 0,
                // }));
              }
            });
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
  };
//console.log(user,"sen25/jpost")
  // on Click Submit
  const onSubmitItemReceived = (e) => {
    let journal_details = [];
    let sales_details = [];
    e.preventDefault();
    if (
      !billDetail.txt_bill_no ||
      !billDetail.ddl_vendor_group ||
      !billDetail.txt_bill_value ||
      !billDetail.txt_vehicle_no ||
      !billDetail.txt_waybill_no
    ) {
      setError({
        txt_bill_no: !billDetail.txt_bill_no,
        txt_bill_value: !billDetail.txt_bill_value,
        ddl_vendor_group: !billDetail.ddl_vendor_group,
        txt_vehicle_no: !billDetail.txt_vehicle_no,
        txt_waybill_no: !billDetail.txt_waybill_no,
      });
    } else {
      let updateItems = [];
      if (addedItems.item_details.length) {
        addedItems.item_details.map((item, i) => {
          if (addItemQty[`txt_received_qty${item.item_id}`] === 0) {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: "Please! Now Received	", msgType: "error" },
            });
          } else {
            if (addItemQty[`txt_received_qty${item.item_id}`] > 0) {
              let itemReceived = addItemQty[`txt_received_qty${item.item_id}`];
              updateItems.push({
                item_id: item.item_id,
                receivedQty: itemReceived,
                uom_id: item.uom_id,
                rate: item.rate,
                gst_percentage: item.gst_percentage,
                gst_value:item.gst_type===0 ? 0 :
                  (Number(itemReceived) * Number(item.rate) * Number(item.gst_percentage)) / 100,
                net_value:item.gst_type===0 ? itemReceived * item.rate:
                  Number(itemReceived) * Number(item.rate) +
                  (Number(itemReceived) * Number(item.rate) * item.gst_percentage) / 100,
                uom_name: item.uom_name,
                gst_type: item.gst_type,
              });
            }
            addedItems.item_details.map((r, i) => {
              journal_details.push({
                amount: Number(r.net_value),
                dr_cr: 2,
                ddl_ledger: billDetail.ddl_vendor_group?.label,
                ddl_ledger_id: vendorDetail.vendor_id,
              }),
              journal_details.push({
                  amount: Number(r.net_value),
                  dr_cr: 1,
                  ddl_ledger: "Purchase",
                  ddl_ledger_id: 2737,
                });
            });
            upadateItemReceived(
              billDetail,
              updateItems,
              journal_details,
              // sales_details,
              addedItems.item_details[0]?.net_value,
              addedItems.purchase_id,
              user,
              (r) => {
                dispatch({
                  type: actionTypes.SET_OPEN_MSG,
                  payload: {
                    msg: "Item Received Submitted Successfully",
                    msgType: "success",
                  },
                });
                onClearState();
                setBillDetail((prv) => ({
                  ...prv,
                  txt_grn_no: r.received_grn_no,
                }));
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
        });
      }
    }
  };

  // useEffect
  React.useEffect(() => {
    fetchData();
    setUser(globalState?.user?.serial_id)
  }, [globalState?.user?.serial_id]);

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
          data_type: "number",
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
    // getListVendor(
    //   (r) => {
    //     setAllVendors([{ value: "Vendor", label: "Add New Vendor" }, ...r]);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );
  };

  const onClearState = () => {
    setError({});
    setBillDetail({
      ...billDetail,
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
  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="Procurement > Item Received " />
      {/* Select and Add Items */}
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Purchase Order Details">
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {/* <StyledTableCell align="left">GRN No</StyledTableCell>
                    <StyledTableCell align="left">GRN Date</StyledTableCell> */}
                    <StyledTableCell align="left">PO Date</StyledTableCell>
                    <StyledTableCell align="left">PO No</StyledTableCell>
                    <StyledTableCell align="left">PO Value</StyledTableCell>
                    <StyledTableCell align="left">Vendor</StyledTableCell>
                    {/* <StyledTableCell align="left">Status</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    {/* <StyledTableCell align="left" className={classes.po_no}>
                      {addedItems.grn_no}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_date}>
                      {addedItems.grn_date}
                    </StyledTableCell> */}
                    <StyledTableCell align="left" className={classes.po_date}>
                      {addedItems.po_date}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_no}>
                      {addedItems.po_number}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_value}>
                      {addedItems.item_details
                        ? currencyFormate(
                            addedItems.item_details.reduce(
                              (sum, li) => Number(sum) + Number(li.net_value),
                              0
                            )
                          )
                        : "00"}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.po_vendor}>
                      {addedItems.dplVendor}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Items in Purchase Order" maxHeight={450}>
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
                    <StyledTableCell align="left">Item Details</StyledTableCell>
                    <StyledTableCell align="right">PO Qty</StyledTableCell>
                    <StyledTableCell align="right">Recd Qty</StyledTableCell>
                    <StyledTableCell align="right">Balance</StyledTableCell>
                    <StyledTableCell align="right">
                      Now Received
                    </StyledTableCell>
                    <StyledTableCell align="right">Rate</StyledTableCell>
                    <StyledTableCell align="right">Discount</StyledTableCell>
                    <StyledTableCell align="right">GST%</StyledTableCell>
                    {/* <StyledTableCell align="left">Unit</StyledTableCell> */}
                    <StyledTableCell align="right">Value</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {/* {//console.log(addedItems, "chk0")} */}
                  {addedItems?.item_details &&
                    addedItems.item_details.map((row, i) => (
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
                          className={classes.itemDetails}
                        >
                          <ItemViewCard item_id={row.item_id} />
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.orderQty}
                        >
                          {row.quantity}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.recievedQty}
                        >
                          {receivedQtyByItem(
                            addedItems.received_item_details,
                            row.item_id
                          )}
                          {/* {addItemQty[[`receivedQty_${row.item_id}`]]
                            ? addItemQty[`receivedQty_${row.item_id}`]
                            : "0"} */}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.balanceQty}
                        >
                          {row.quantity -
                            receivedQtyByItem(
                              addedItems.received_item_details,
                              row.item_id
                            )}
                          {/* {Number(row.quantity) -
                            Number(
                              addItemQty[[`receivedQty_${row.item_id}`]]
                                ? addItemQty[[`receivedQty_${row.item_id}`]]
                                : 0
                            )} */}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.nowReceiveField}
                        >
                          <TextField
                            size="small"
                            placeholder="Now Received"
                            name={`txt_received_qty${row.item_id}`}
                            style={{ marginBottom: -20, width: 90 }}
                            type="number"
                            value={addItemQty[`txt_received_qty${row.item_id}`]}
                            onChange={(e) => onChange(e, row)}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            variant="outlined"
                          />
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.rate}>
                          <TextField
                            size="small"
                            placeholder="Rate"
                            name={`txt_rate${row.item_id}`}
                            style={{ marginBottom: -20, width: 90 }}
                            type="number"
                            value={row.rate}
                            onChange={(e) => onChange(e, row)}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            variant="outlined"
                          />
                          {/* {currencyFormate(row.rate)} */}
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.rate}>
                          <TextField
                            size="small"
                            placeholder="Disc Percentage"
                            name={`txt_disc_percentage${row.item_id}`}
                            style={{ marginBottom: -20, width: 90 }}
                            type="number"
                            value={row.disc_percentage}
                            onChange={(e) => onChange(e, row)}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            variant="outlined"
                          />
                          {/* {currencyFormate(row.rate)} */}
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.rate}>
                          {row.gst_percentage}
                        </StyledTableCell>

                        {/* <StyledTableCell
                          align="left"
                          className={classes.orderQty}
                        >
                          {row.uom_id}
                        </StyledTableCell> */}

                        {/* CGSt field */}

                        <StyledTableCell
                          align="right"
                          className={classes.valueField}
                        >
                          <TextField
                            size="small"
                            placeholder="Value"
                            name={`txt_value${row.item_id}`}
                            style={{ marginBottom: -20, width: 90 }}
                            type="number"
                            value={addItemQty[`txt_value${row.item_id}`]}
                            onChange={(e) => onChange(e, row)}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            variant="outlined"
                          />
                          {/* {currencyFormate(row.net_value)} */}
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
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
                  <Box className={classes.tableLabel} mr={1} textAlign="right">
                    {/* {addedItems.received_item_details
                      ? currencyFormate(
                          addedItems.received_item_details.reduce(
                            (sum, li) => Number(sum) + Number(li.receivedQty) * Number(li.rate),
                            0
                          )
                        )
                      : "00"} */}

                    {addedItems.item_details
                      ? currencyFormate(
                          addedItems.item_details.reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(addItemQty[`txt_value${li.item_id}`]),
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
        <GridItem xs={12}>
          <div className={classes.actionbtns}>
            <Button
              onClick={onSubmitItemReceived}
              className={classes.actionbtn}
              variant="outlined"
              color="primary"
              disabled={buttonDisabled}

            >
              Submit
            </Button>
          </div>
        </GridItem>

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
            history.push("/admin/procurement/received");
          }}
        >
          <StepProceedModel
            step={1}
            isStep={false}
            title="Thank you"
            desc=" Your GRN No"
            generateNo={billDetail.txt_grn_no}
          />
        </MasterModel>
      </GridContainer>
    </ThemeProvider>
  );
};

export default ItemRecievedPageForm;
