import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import { addDeliveryServiceData } from "../../../services/addDeliveryService";

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
import ReactSelect from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";

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
  salesExcutive: {
    width: "20px",
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
  input: {
    height: 40,
    lineLight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
  customSelect: {
    marginBottom: 15,
  },
}));

const DeliveryOrdersPage = () => {
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allQuatation, setAllQuatations] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
    category: "",
    brand: "",
    item: "",
  });

  const [addUnit, setAddUnit] = React.useState({
    active: false,
    higher: {
      unit: "",
      value: "",
    },
    lower: {
      unit: "",
      value: "",
    },
    caption: "",
  });

  React.useEffect(() => {
    setAllQuatations(addDeliveryServiceData);
  }, []);

  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };

  const headerData = [
    {
      id: "DelID",
      label: "#",
      align: "left",
    },
    {
      id: "DelDate",
      label: "Delivery Between",
      align: "left",
    },
    {
      id: "DelNo",
      label: "Delivery No",
      align: "left",
    },
    {
      id: "DelSalesOrderNo",
      label: "Sales Order No",
      align: "left",
    },
    {
      id: "DelQuotationNo",
      label: "Quotation No",
      align: "left",
    },
    {
      id: "DelCustomer",
      label: "Customer",
      align: "left",
    },

    {
      id: "DelStatus",
      label: "Status",
      align: "left",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    {
      id: "DelAction",
      label: "Action",
      align: "left",
    },
  ];

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Sales > Invoices > Add"
        btnToolTip="Add Delivery Order"
        addBtnLink="/admin/sale/delivery-order-form"
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle="Search On Delivery Orders To Generate invoices"
            filterIcon
          >
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="flex-start" alignItems="center">
                <GridItem xs="3">
                  <InputLabel id="label">Delivery Order No</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Delivery Order No"
                    name="txtQuatationNo"
                    // onChange={onAddSearch}
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
                    id="date"
                    variant="outlined"
                    name="txtDateStart"
                    type="date"
                    fullWidth={true}
                    defaultValue="2021-08-14"
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
                    id="date"
                    variant="outlined"
                    type="date"
                    name="txtDateEnd"
                    defaultValue="2021-08-14"
                    fullWidth={true}
                    // value={startDate}
                    // onChange={(v) => console.log(v.target.value)}
                    className={classes.dateField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs="5">
                  <InputLabel id="label">Customer</InputLabel>
                  <ReactSelect
                    options={[{ value: "Customer", label: "Customer" }]}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    // onChange={(v) => onSelect("ddl_brand_id", v)}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                  />
                </GridItem>
                <GridItem xs="3">
                  <InputLabel id="label">Sales Order No</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Sales Order No"
                    name="txtQuatationNo"
                    // onChange={onAddSearch}
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
                    id="date"
                    variant="outlined"
                    name="txtDateStart"
                    type="date"
                    fullWidth={true}
                    defaultValue="2021-08-14"
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
                    id="date"
                    variant="outlined"
                    type="date"
                    name="txtDateEnd"
                    defaultValue="2021-08-14"
                    fullWidth={true}
                    // value={startDate}
                    // onChange={(v) => console.log(v.target.value)}
                    className={classes.dateField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>
                <GridItem xs="5">
                  <InputLabel id="label">Quotation No</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Quotation No"
                    name="Keyword/Pharse"
                    // onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    // value={addSerch.item}
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs="5">
                  <InputLabel id="label">Keyword / Pharse</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Keyword/Pharse"
                    style={{ marginBottom: -15 }}
                    name="Keyword/Pharse"
                    // onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    // value={addSerch.item}
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs="3">
                  <InputLabel id="label">Status</InputLabel>
                  <ReactSelect
                    options={[{ value: "Customer", label: "Customer" }]}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}

                    // onChange={(v) => onSelect("ddl_brand_id", v)}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                  />
                </GridItem>

                <GridItem xs="4">
                  <div className={classes.searchbtnRight}>
                    <CustomButton style={{ marginRight: "10px" }}>
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
          <CustomCard cdTitle="Delivery Order Details" minHeight={300}>
            <MuiTable columns={headerData} rows={addDeliveryServiceData} />
          </CustomCard>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default DeliveryOrdersPage;
