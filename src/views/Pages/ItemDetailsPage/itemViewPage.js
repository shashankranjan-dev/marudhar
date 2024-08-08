import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";


import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { StyledTableCell, StyledTableRow } from "../Sales/AddEnquiryPage";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";



// IMPORT SERVICES
import {
  getAllCategory,
  getAllBrands,
  postItem,
  updateItem,
  getAllLedgerAccount,
  postFileUpload,
} from "../../../services/itemsService";

import { getListUom } from "../../../services/uomService";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import theme from "../../../theme/theme";
import Paper from "@material-ui/core/Paper";
import styles from "assets/jss/material-dashboard-pro-react/views/addIemPageStyle.js";
import { CustomCard } from "views/Components/CustomCard";
import { appDefaultColor } from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import CustomButton, { ColoseButton } from "views/Components/CustomButton";
import { whiteColor } from "assets/jss/material-dashboard-pro-react";
import PageTitle from "../HelperComponent/PageTitle";
import Select from "react-select";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { currentDate, dateFormateField } from "../HelperComponent/utils";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useLocation, useHistory } from "react-router-dom";
import { IMG_API } from "../../../services/webApi/webApi";
import { TableContainer } from "@material-ui/core";
const useStyles = makeStyles(styles);

const itemViewPage = () => {
    //console.log("i am here");
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [globalState, dispatch] = useStateValue();
  const [fileLoading, setFileLoading] = React.useState(false);

  const [refresh, setRefresh] = React.useState(false);
  const [allCategory, setAllCategory] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [allUoms, setAllUoms] = React.useState([]);
  const [allLedgerAccount, setAllLedgerAccount] = React.useState([]);

  const [addItem, setAddItem] = React.useState({
    edit: false,
    item_id: "",

    ddl_category_id: "",
    ddl_category_label: "Select",

    ddl_brand_id: "",
    ddl_brand_label: "Select",

    ddl_uom_id: "",
    ddl_uom_label: "Select",

    ddl_alt_uom_id: "",
    ddl_alt_uom_label:"Select",

    ddl_reoder_qty_uom_id: "",
    ddl_reoder_qty_uom_label: "Select",

    txt_reorder_level: "",
    ddl_reoder_level_uom_id: "",
    ddl_reoder_level_uom_label: "Select",

    ddl_ledger_account_id: "",
    ddl_ledger_account_id_label: "Select",

    ddl_opening_stock_uom_id: "",
    ddl_opening_stock_uom_label: "Select",

    txt_reorder_qty: "",
    txt_opening_stock: "",
    txt_MRP: "",
    txt_selling_price: "",
    selling_date: currentDate(),
    txt_company_code: "",
    txt_item_own_code: "",
    txt_item_name: "",
    txt_hsn_code: "",

    txt_gst: "",
    txt_igst: "",
    txt_sgst: "",

    txt_size: "",
    opening_stock_date: currentDate(),
    mrp_date: currentDate(),
    txt_details: "",
    switch_active_status: false,
    imgPath: "",
    original_file_name: "",
  });

  // for Error handler state
  const [error, setError] = React.useState({
    txt_item_name: false,
    ddl_category_id: false,
    ddl_brand_id: false,
    txt_gst: false,
    txt_igst: false,
    txt_sgst: false,
    txt_company_code: false,
    ddl_uom_id: false,
    txt_qty: false,
    ddl_alt_uom_id:false,
    ddl_ledger_account_id: false,
  });
  const onSetActive = (e) => {
    setAddItem((prv) => ({ ...prv, switch_active_status: e.target.checked }));
  };

  const fetchData = () => {
    getAllCategory(
      (r) => {
        //console.log(r);
        setAllCategory(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    getAllLedgerAccount(
      (r) => {
        setAllLedgerAccount(r);
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
  const onSelect = (name, v) => {
    switch (name) {
      case "category":
        setAddItem({
          ...addItem,
          ddl_category_id: v.value,
          ddl_category_label: v.label,
          txt_hsn_code : v.hsn,
          txt_gst : v.gst,
        });
        break;
      case "brand":
        setAddItem({
          ...addItem,
          ddl_brand_id: v.value,
          ddl_brand_label: v.label,
        });
        break;
      case "uom":
        setAddItem({
          ...addItem,
          ddl_uom_id: v.value,
          ddl_uom_label: v.label,
        });
        break;
        case "alt_uom":
          setAddItem({
            ...addItem,
            ddl_alt_uom_id: v.value,
            ddl_alt_uom_label: v.label,
          });
          break;
      case "reoder_qty_uom":
        setAddItem({
          ...addItem,
          ddl_reoder_qty_uom_id: v.value,
          ddl_reoder_qty_uom_label: v.label,
        });
        break;
      case "reoder_level_uom":
        setAddItem({
          ...addItem,
          ddl_reoder_level_uom_id: v.value,
          ddl_reoder_level_uom_label: v.label,
        });
        break;
      case "ddl_ledger_account_id":
        setAddItem({
          ...addItem,
          ddl_ledger_account_id: v.value,
          ddl_ledger_account_id_label: v.label,
        });
        break;
      case "opening_stock_uom":
        setAddItem({
          ...addItem,
          ddl_opening_stock_uom_id: v.value,
          ddl_opening_stock_uom_label: v.label,
        });
        break;

      default:
        break;
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "imgPath") {
      setFileLoading(true);
      const file = e.target.files[0];
      if (file.size < 300000) {
        // const reader = new FileReader();
        // var url = reader.readAsDataURL(file);
        postFileUpload(
          file,
          (r) => {
            setAddItem({
              ...addItem,
              [name]: r.fileName,
              original_file_name: r.originalFileName,
            });
            setFileLoading(false);
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      } else {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: "File should be less then 300kb",
            msgType: "warning",
          },
        });
      }
    }
    if (name === "txt_gst") {
      setAddItem((prv) => ({
        ...prv,
        ["txt_gst"]: value,
        ["txt_igst"]: value * 2,
      }));
    } else if (name === "txt_company_code") {
      setAddItem((prv) => ({
        ...prv,
        ["txt_company_code"]: value,
        ["txt_item_own_code"]: value,
      }));
    } else if (name === "switch_active_status") {
      setAddItem((prv) => ({ ...prv, [name]: e.target.checked }));
    } else {
      setAddItem({ ...addItem, [name]: value });
    }
  };
  // onSubmit called
  const onSubmitItem = (e) => {
    e.preventDefault();
    if (
      !addItem.txt_item_name ||
      !addItem.ddl_category_id ||
      !addItem.ddl_brand_id ||
      !addItem.txt_gst ||
      !addItem.txt_company_code ||
      !addItem.ddl_uom_id ||
      !addItem.ddl_alt_uom_id ||
      !addItem.ddl_ledger_account_id
    ) {
      setError({
        txt_item_name: !addItem.txt_item_name,
        ddl_category_id: !addItem.ddl_category_id,
        ddl_brand_id: !addItem.ddl_brand_id,
        txt_gst: !addItem.txt_gst,
        txt_company_code: !addItem.txt_company_code,
        ddl_uom_id: !addItem.ddl_uom_id,
        ddl_alt_uom_id: !addItem.ddl_alt_uom_id,
        ddl_ledger_account_id: !addItem.ddl_ledger_account_id,
      });
    } else {
      if (addItem.edit) {
        updateItem(
          addItem,
          (r) => {
            onClearState();
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Item Updated Successfully",
                msgType: "success",
              },
            });
            setRefresh(!refresh);
            history.push("/admin/master/item");
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      } else {
        postItem(
          addItem,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Item added Successfully",
                msgType: "success",
              },
            });
            onClearState();
            setRefresh(!refresh);
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      }
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  React.useEffect(() => {
    if (location.state?.itemEdit) {
      setAddItem({
        edit: location.state?.itemEdit,
        item_id: location.state?.row?.item_id,

        txt_item_own_code: location.state?.row?.item_own_code,
        txt_company_code: location.state?.row?.item_company_code,
        txt_item_name: location.state?.row?.item,
        txt_hsn_code: location.state?.row?.hsn_code,

        ddl_category_id: location.state?.row?.category_id,
        ddl_category_label: location.state?.row?.category,

        ddl_brand_id: location.state?.row?.brand_id,
        ddl_brand_label: location.state?.row?.brand,

        ddl_uom_id: location.state?.row?.uom_id,
        ddl_uom_label: location.state?.row?.uom_name,

        ddl_alt_uom_id:location.state?.row?.alt_uom_id,
        ddl_alt_uom_label: location.state?.row?.alt_uom_name,

        txt_reorder_qty: location.state?.row?.reorder_quantity,
        ddl_reoder_qty_uom_id: location.state?.row?.reorder_quantity_uom_id,
        ddl_reoder_qty_uom_label:location.state?.row?.reorder_quantity_uom_name,

        txt_qty: location.state?.row?.qty,

        txt_reorder_level: location.state?.row?.reorder_level,
        ddl_reoder_level_uom_id: location.state?.row?.reorder_level_uom_id,
        ddl_reoder_level_uom_label: location.state?.row?.reorder_level_uom_name,

        ddl_ledger_account_id: location.state?.row?.ledger_account_id,
        ddl_ledger_account_id_label: location.state?.row?.ledger_account_name,

        txt_opening_stock: location.state?.row?.opening_stock,
        ddl_opening_stock_uom_id: location.state?.row?.opening_stock_uom_id,
        ddl_opening_stock_uom_label:
          location.state?.row?.opening_stock_uom_name,

        txt_MRP: location.state?.row?.mrp,
        mrp_date: dateFormateField(location.state?.row?.mrp_date),
        txt_size: location.state?.row?.size,

        txt_selling_price: location.state?.row?.selling_price,
        selling_date: dateFormateField(location.state?.row?.selling_date),

        txt_gst: location.state?.row?.gst,
        txt_igst: location.state?.row?.igst,
        txt_sgst: location.state?.row?.sgst,
        opening_stock_date: currentDate(),
        txt_details: location.state?.row?.details,
        switch_active_status:
          location.state?.row?.status === "Y" ? true : false,
        imgPath: location.state?.row?.picture_path,
        original_file_name: location.state?.row?.original_file_name,
      });
    }
  }, []);

  // on Close Model
  const onClearState = () => {
    setError({ txt_item: false });
    setAddItem({
      edit: false,
      item_id: "",

      ddl_category_id: "",
      ddl_category_label: "Select Category",

      ddl_brand_id: "",
      ddl_brand_label: "Select Brand",

      ddl_uom_id: "",
      ddl_uom_label: "Select",

      ddl_alt_uom_id:"",
      ddl_alt_uom_label:"Select",

      ddl_reoder_qty_uom_id: "",
      ddl_reoder_qty_uom_label: "Select",

      txt_reorder_level: "",
      ddl_reoder_level_uom_id: "",
      ddl_reoder_level_uom_label: "Select",

      ddl_ledger_account_id: "",
      ddl_ledger_account_id_label: "Select",

      ddl_opening_stock_uom_id: "",
      ddl_opening_stock_uom_label: "Select",

      txt_reorder_qty: "",
      txt_opening_stock: "",
      txt_MRP: "",
      txt_selling_price: "",
      selling_date: currentDate(),
      txt_company_code: "",
      txt_item_name: "",
      txt_item_own_code:"",
      txt_size: "",
      txt_hsn_code: "",
      txt_gst: "",
      txt_igst: "",
      txt_sgst: "",
      opening_stock_date: currentDate(),
      mrp_date: currentDate(),
      txt_details: "",
      switch_active_status: false,
      imgPath: "",
    });
  };

  const onClickBack = () => {
    history.push("/admin/master/item");
  };
  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title= "Master > Item Details > View"
      />
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs="12">
            <CustomCard
              width="100%"
              height="100%"
              cdTitle="Item"
            >
              <GridContainer alignItems="center" style={{ padding: 20 }}>
                <GridItem xs={12}>
                  <from className={classes.root}>
                    <GridContainer>
                      <GridItem xs={6}>
                        <InputLabel required={true} id="label">
                          Category
                        </InputLabel>                   
                        <TextField
                          disabled={true}
                          size="small"
                          placeholder="Category"
                          name="txt_item_name"
                          onChange={onChange}
                          id="outlined-basic"
                          fullWidth={true}
                          value={addItem.ddl_category_label}
                          variant="outlined"
                        />
                       
                         
                      </GridItem>
                      <GridItem xs={6}>
                        <InputLabel required={true} id="label">
                          Brand
                        </InputLabel>
                        <TextField
                          disabled={true}
                          size="small"
                          placeholder="Brand"
                          name="txt_item_name"
                          onChange={onChange}
                          id="outlined-basic"
                          fullWidth={true}
                          value={addItem.ddl_brand_label}
                          variant="outlined"
                        />
                      
                      </GridItem>
                      <GridItem xs={6}>
                        <InputLabel required={true} id="label">
                          Item
                        </InputLabel>
                        <TextField
                          disabled={true}
                          size="small"
                          placeholder="Item"
                          name="txt_item_name"
                          onChange={onChange}
                          id="outlined-basic"
                          fullWidth={true}
                          value={addItem.txt_item_name}
                          variant="outlined"
                        />
                      </GridItem>

                      <GridItem xs={3}>
                        <InputLabel required={true} id="label">
                          Company Code
                        </InputLabel>
                        <TextField
                          disabled={true}
                          size="small"
                          placeholder="Company Code"
                          name="txt_company_code"
                          onChange={onChange}
                          id="outlined-basic"
                          fullWidth={true}
                          value={addItem.txt_company_code}
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem xs={3}>
                        <InputLabel required={true} id="label">
                          Own Code
                        </InputLabel>
                        <TextField
                          disabled={true}
                          size="small"
                          placeholder="Own Code"
                          name="txt_item_own_code"
                          onChange={onChange}
                          id="outlined-basic"
                          fullWidth={true}
                          value={addItem.txt_item_own_code}
                          variant="outlined"
                        />
                      </GridItem>

                      <GridItem xs={6}>
                        <GridContainer>
                          <GridItem xs={12}>
                            <InputLabel>Size</InputLabel>
                            <TextField
                              disabled={true}
                              size="small"
                              placeholder="Size"
                              name="txt_size"
                              onChange={onChange}
                              id="outlined-basic"
                              fullWidth={true}
                              value={addItem.txt_size}
                              variant="outlined"
                            />
                          </GridItem>
                          <GridItem xs={12}>
                            <InputLabel id="label">Details</InputLabel>
                            <TextField
                              disabled={true}
                              placeholder="Details"
                              name="txt_details"
                              onChange={onChange}
                              multiline
                              rows={8}
                              id="outlined-basic"
                              fullWidth={true}
                              value={addItem.txt_details}
                              variant="outlined"
                            />
                          </GridItem>
                         
                          {/* <GridItem xs="12">
                            <div>
                              <span
                                className={classes.activeText}
                                style={{ marginTop: -20 }}
                              >
                                Active Status
                              </span>
                              <Switch
                                onClick={onSetActive}
                                checked={addItem.switch_active_status}
                                name="switch_active_status"
                                fullWidth={true}
                                inputProps={{
                                  "aria-label": "primary checkbox",
                                }}
                                color="primary"
                              />
                            </div>
                          </GridItem> */}
                        </GridContainer>
                      </GridItem>

                      <GridItem xs="6">
                        <GridContainer>
                          <GridItem xs={3}>
                            <InputLabel required={true} id="label">
                              UOM
                            </InputLabel>
                            <TextField
                          disabled={true}
                          size="small"
                          placeholder="UOM"
                          name="txt_item_name"
                          onChange={onChange}
                          id="outlined-basic"
                          fullWidth={true}
                          value={addItem.ddl_uom_label}
                          variant="outlined"
                        />
                          </GridItem>
                          <GridItem xs={3}>
                            <InputLabel required={true} id="label">
                             Alt UOM
                            </InputLabel>
                            <TextField
                          disabled={true}
                          size="small"
                          placeholder=" Alt UOM"
                          name="txt_item_name"
                          onChange={onChange}
                          id="outlined-basic"
                          fullWidth={true}
                          value={addItem.ddl_alt_uom_label}
                          variant="outlined"
                        />
                          </GridItem>
                          <GridItem xs={2}>
                            <InputLabel id="label">Qty</InputLabel>
                            <TextField
                              disabled={true}
                              size="small"
                              placeholder="Qty"
                              name="txt_qty"
                              onChange={onChange}
                              id="outlined-basic"
                              fullWidth={true}
                              inputProps={{
                                style: { textAlign: "right" },
                              }}
                              type="number"
                              value={addItem.txt_qty}
                              variant="outlined"
                            />
                          </GridItem>
                          <GridItem xs={2}>
                            <InputLabel id="label">HSN </InputLabel>
                            <TextField
                              disabled={true}
                              size="small"
                              placeholder="HSN Code"
                              name="txt_hsn_code"
                              onChange={onChange}
                              id="outlined-basic"
                              fullWidth={true}
                              inputProps={{
                                style: { textAlign: "right" },
                              }}
                              type="number"
                              value={addItem.txt_hsn_code}
                              variant="outlined"
                            />
                          </GridItem>
                          <GridItem xs={2}>
                            <InputLabel required={true} id="label">
                              GST%
                            </InputLabel>
                            <TextField
                              disabled={true}
                              size="small"
                              placeholder="GST%"
                              name="txt_gst"
                              onChange={onChange}
                              id="outlined-basic"
                              error={error.txt_gst}
                              helperText={
                                error.txt_gst ? "GST is Required" : ""
                              }
                              FormHelperTextProps={{
                                style: { textAlign: "right" },
                              }}
                              fullWidth={true}
                              inputProps={{
                                style: { textAlign: "right" },
                              }}
                              type="number"
                              value={addItem.txt_gst}
                              variant="outlined"
                            />
                          </GridItem>

                          <GridItem xs={3}>
                            <InputLabel id="label">Reorder Level</InputLabel>
                            <TextField
                              disabled={true}
                              size="small"
                              placeholder="Reorder Level"
                              name="txt_reorder_level"
                              onChange={onChange}
                              id="outlined-basic"
                              fullWidth={true}
                              value={addItem.txt_reorder_level}
                              inputProps={{
                                style: { textAlign: "right" },
                              }}
                              type="number"
                              variant="outlined"
                            />
                          </GridItem>
                          <GridItem xs={3}>
                            <InputLabel id="label">UOM</InputLabel>
                            <TextField
                          disabled={true}
                          size="small"
                          placeholder="UOM"
                          name="txt_item_name"
                          onChange={onChange}
                          id="outlined-basic"
                          fullWidth={true}
                          value={addItem.ddl_reoder_level_uom_label}
                          variant="outlined"
                        />
                          </GridItem>
                          <GridItem xs={3}>
                            <InputLabel required={true} id="label">
                              Reorder Qty
                            </InputLabel>
                            <TextField
                              disabled={true}
                              size="small"
                              placeholder="Reorder Qty"
                              name="txt_reorder_qty"
                              onChange={onChange}
                              id="outlined-basic"
                              fullWidth={true}
                              value={addItem.txt_reorder_qty}
                              inputProps={{
                                style: { textAlign: "right" },
                              }}
                              type="number"
                              variant="outlined"
                            />
                          </GridItem>
                          <GridItem xs={3}>
                            <InputLabel id="label">UOM</InputLabel>
                            <TextField
                          disabled={true}
                          size="small"
                          placeholder="UOM"
                          name="txt_item_name"
                          onChange={onChange}
                          id="outlined-basic"
                          fullWidth={true}
                          value={addItem.ddl_reoder_qty_uom_label}
                          variant="outlined"
                        />
                          </GridItem>
                          <GridItem xs="8">
                            <GridContainer>
                              {/*<GridItem xs={4}>
                                <InputLabel id="label">
                                  Opening Stock
                                </InputLabel>
                                <TextField
                                  size="small"
                                  placeholder="Opening Stock"
                                  name="txt_opening_stock"
                                  onChange={onChange}
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={addItem.txt_opening_stock}
                                  inputProps={{
                                    style: { textAlign: "left" },
                                  }}
                                  type="number"
                                  variant="outlined"
                                />
                              </GridItem>
                              <GridItem xs={3}>
                                <InputLabel id="label">UOM</InputLabel>
                                <Select
                                  options={allUoms}
                                  formatGroupLabel={(d) => d.label}
                                  menuPortalTarget={document.body}
                                  name="ddl_opening_stock_uom_id"
                                  onChange={(v) =>
                                    onSelect("opening_stock_uom", v)
                                  }
                                  value={{
                                    value: addItem.ddl_opening_stock_uom_id,
                                    label: addItem.ddl_opening_stock_uom_label,
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={5}>
                                <InputLabel id="label">As on Date</InputLabel>
                                <TextField
                                  size="small"
                                  defaultValue={currentDate()}
                                  name="opening_stock_date"
                                  value={addItem.opening_stock_date}
                                  onChange={onChange}
                                  type="date"
                                  id="outlined-basic"
                                  fullWidth={true}
                                  inputProps={{
                                    style: { textAlign: "left" },
                                  }}
                                  variant="outlined"
                                />
                              </GridItem> */}
                              <GridItem xs={6}>
                                <InputLabel id="label">MRP</InputLabel>
                                <TextField
                                  disabled={true}
                                  size="small"
                                  placeholder="MRP"
                                  name="txt_MRP"
                                  onChange={onChange}
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={addItem.txt_MRP}
                                  inputProps={{
                                    style: { textAlign: "left" },
                                  }}
                                  type="number"
                                  variant="outlined"
                                />
                              </GridItem>
                              <GridItem xs={6}>
                                <InputLabel id="label">As on Date</InputLabel>
                                <TextField
                                  disabled={true}
                                  size="small"
                                  name="mrp_date"
                                  onChange={onChange}
                              
                                  type="date"
                                  id="outlined-basic"
                                  value={addItem.mrp_date}
                                  fullWidth={true}
                                  inputProps={{
                                    style: { textAlign: "left" },
                                  }}
                                  variant="outlined"
                                />
                              </GridItem>
                              <GridItem xs={12}>
                            <InputLabel required={true} id="label">
                              Ledger Account
                            </InputLabel>
                            <TextField
                          disabled={true}
                          size="small"
                          placeholder="Ledger Account"
                          name="txt_item_name"
                          onChange={onChange}
                          id="outlined-basic"
                          fullWidth={true}
                          value={addItem.ddl_ledger_account_id_label}
                          variant="outlined"
                        />
                          </GridItem>
                            </GridContainer>
                          </GridItem>
                                  {/* {//console.log(addItem,"23656")} */}
                          <GridItem xs={4}>
                            <GridContainer>
                              <GridItem xs="12">
                                <Paper className={classes.imgPrv} elevation={0}>
                                  {fileLoading ? (
                                    <CircularProgress />
                                  ) : (
                                    <img
                                      id="imgPath"
                                      className={classes.itemImg}
                                      src={
                                        addItem.imgPath
                                          ? IMG_API + addItem.imgPath
                                          : "https://via.placeholder.com/160"
                                      }
                                      height="100%"
                                      alt="image"
                                    />
                                  )}
                                </Paper>
                              </GridItem>
                              <GridItem xs="12">
                                <input
                                  accept="image/*"
                                  className={classes.input}
                                  style={{ display: "none" }}
                                  name="imgPath"
                                  onChange={onChange}
                                  id="raised-button-file"
                                  type="file"
                                />
                                { <label htmlFor="raised-button-file">
                                  {/* <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                    fullWidth={true}
                                    className={classes.browseBtn}
                                  >
                                    Upload Img
                                  </Button> */}
                                </label>}
                              </GridItem>
                            </GridContainer>
                          </GridItem> 
                          {/* <GridItem xs="12">
                            <div className={classes.actionbtn}>
                              <ColoseButton
                                name="btn_close"
                                height={40}
                                onClick={onClickBack}
                              >
                                Cancel
                              </ColoseButton>
                              <Button
                                name="btn_save"
                                onClick={onSubmitItem}
                                style={{
                                  height: 40,
                                  width: "100px",
                                  color: whiteColor,
                                  borderColor: appDefaultColor,
                                  fontFamily: appDefaultFamily,
                                }}
                                variant="outlined"
                                color="primary"
                              >
                                Submit
                              </Button>
                            </div>
                          </GridItem> */}

                         
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </from>
                </GridItem>
              </GridContainer>
            </CustomCard>
          </GridItem>
        </GridContainer>
      </div>
    </ThemeProvider>
  );
};

export default itemViewPage;
