import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../Components/MasterModel";
import { CustomCard } from "../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../Components/CustomButton";
import { PurchaseOrderRowData } from "../../services/purchaseOrderService";
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
import { Autocomplete } from "@material-ui/lab";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";

import theme from "../../theme/theme";

// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";

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
    marginTop: 10,
    marginBottom: 15,
    padding: "15px 20px",
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
}));

const formData = {
  formName: "Add Category",
  fields: [
    {
      name: "brand",
      label: "Brand Name",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextField",
      error: false,
    },
    {
      name: "details",
      label: "Details",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextArea",
      error: false,
    },
    {
      name: "Active Status",
      label: "active",
      defaultValue: false,
      required: true,
      data_type: "string",
      html_element: "switch",
      error: false,
    },
  ],
};

const PurchaseOrderPage = () => {
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allUnits, setAllUnits] = React.useState([]);
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
    setAllUnits(PurchaseOrderRowData);
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
      id: "polDate",
      label: "PO Date",
      align: "left",
    },
    {
      id: "polNo",
      label: "PO No",
      align: "left",
    },
    {
      id: "polValue",
      label: "PO Value",
      align: "center",
    },
    {
      id: "polVendor",
      label: "Vendor",
      align: "left",
    },

    {
      id: "polAction",
      label: "Action",
      align: "right",
    },
  ];

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onHigherValueChange = (e) => {
    // const { value, name } = e.target;
    // setAddUnit({ ...addUnit, higher: { [name]: value } });
  };
  const onLowerValueChange = (e) => {
    // const { value, name } = e.target;
    // setAddUnit({ ...addUnit, lower: { ...lower, [name]: value } });
  };

  const onCaptionChange = (e) => {
    const { value, name } = e.target;
    setAddUnit({ ...addUnit, caption: value });
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <GridContainer>
        <GridItem xs="12">
          <Paper elevation="0" className={classes.searchBar}>
            <GridContainer justifyContent="flex-start" alignItems="center">
              <GridItem xs="3">
                <InputLabel id="label">PO No</InputLabel>
                <TextField
                  size="small"
                  placeholder="PO No"
                  name="Bill No"
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
                  type="date"
                  fullWidth={true}
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
                  id="date"
                  variant="outlined"
                  type="date"
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
                <InputLabel id="label">Vendor</InputLabel>
                <Autocomplete
                  id="combo-box-demo"
                  options={[{ value: "vendor", label: "vendor" }]}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      onChange={onAddSearch}
                      value={addSearch.category}
                      placeholder="Vendor"
                      fullWidth={true}
                      {...params}
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
              </GridItem>
              <GridItem xs="6">
                <InputLabel id="label">Keyword / Pharse</InputLabel>
                <TextField
                  size="small"
                  placeholder="Keyword / Pharse"
                  name="Keyword/Pharse"
                  // onChange={onAddSearch}
                  id="outlined-basic"
                  fullWidth={true}
                  // value={addSerch.item}
                  variant="outlined"
                />
              </GridItem>

              <GridItem xs="6">
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
                  <CustomButton>
                    <RotateLeftIcon />
                  </CustomButton>
                </div>
              </GridItem>
            </GridContainer>
          </Paper>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Purchase Order" height={480}>
            <MuiTable columns={headerData} rows={PurchaseOrderRowData} />
          </CustomCard>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default PurchaseOrderPage;
