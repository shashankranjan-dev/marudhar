import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../Components/MasterModel";
import { CustomCard } from "../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../Components/CustomButton";
import { itemRowData } from "../../services/itemsService";
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

import theme from "../../theme/theme";

import React from "react";
import {
  appDefaultColor,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
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

const ProcurementPage = () => {
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
    setAllUnits(itemRowData);
  }, []);

  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };

  const headerData = [
    {
      id: "id",
      label: "#",
      align: "left",
    },
    {
      id: "category",
      label: "Category",
      align: "left",
    },
    {
      id: "brand",
      label: "Brand",
      align: "left",
    },
    {
      id: "item",
      label: "Item",
      align: "left",
    },
    {
      id: "unit",
      label: "Unit",
      align: "left",
    },
    {
      id: "hsn",
      label: "HSN",
      align: "left",
    },
    {
      id: "cgst",
      label: "CGST%",
      align: "center",
    },
    {
      id: "sgst",
      label: "SGST%",
      align: "center",
    },
    {
      id: "igst",
      label: "IGST%",
      align: "center",
    },
    {
      id: "status",
      label: "Status",
      align: "left",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    {
      id: "action",
      label: "Action",
      align: "left",
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
      <GridContainer alignItems="center" justifyContent="space-between">
        <GridItem>
          <GridContainer justifyContent="flex-start">
            <GridItem>
              <CardLinkButton
                active
                name="Direct Purchase"
                link="/admin/procurement/direct-purchase"
              />
            </GridItem>
            <GridItem>
              <CardLinkButton name="Purchase Order" link="#" />
            </GridItem>
            {/* <GridItem>
              <CardLinkButton name="UOM" link="/admin/unit-measurement" />
            </GridItem> */}
            <GridItem>
              <CardLinkButton name="Goods Received" link="#" />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <CircleAddBtn
            title="Add New Item"
            style={{ marginRight: 0 }}
            onClick={() => history.push("/admin/add-items")}
          />
        </GridItem>
      </GridContainer>

      {/* <GridContainer>
        <GridItem xs="12">
          <Paper elevation="0" className={classes.searchBar}>
            <GridContainer justifyContent="flex-start" alignItems="center">
              <GridItem xs="3">
                <InputLabel id="label">Category</InputLabel>
                <Select
                  size="small"
                  variant="outlined"
                  fullWidth
                  input={<OutlinedInput margin="dense" />}
                  id="label"
                  name="category"
                  onChange={onAddSearch}
                  value={addSearch.category}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  {[
                    {
                      value: "first",
                      label: "First",
                    },
                  ].map((a) => (
                    <MenuItem key={a.value} value={a.value}>
                      {a.label}
                    </MenuItem>
                  ))}
                </Select>
              </GridItem>
              <GridItem xs="3">
                <InputLabel id="label">Brand</InputLabel>
                <Select
                  size="small"
                  variant="outlined"
                  fullWidth
                  input={<OutlinedInput margin="dense" />}
                  id="label"
                  name="brand"
                  onChange={onAddSearch}
                  value={addSearch.brand}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Brand
                  </MenuItem>
                  {[
                    {
                      value: "first",
                      label: "First",
                    },
                    {
                      value: "two",
                      label: "brand two",
                    },
                  ].map((a) => (
                    <MenuItem key={a.value} value={a.value}>
                      {a.label}
                    </MenuItem>
                  ))}
                </Select>
              </GridItem>
              <GridItem xs="3">
                <InputLabel id="label">Item</InputLabel>
                <TextField
                  size="small"
                  placeholder="Item"
                  name="item"
                  // onChange={onAddSearch}
                  id="outlined-basic"
                  fullWidth={true}
                  // value={addSerch.item}
                  variant="outlined"
                />
              </GridItem>
              <GridItem xs="3">
                <div
                  style={{
                    float: "right",
                    display: "flex",
                    alignItems: "center",
                    marginTop: 15,
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
      </GridContainer> */}

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Items" height={480}>
            <MuiTable columns={headerData} rows={[]} />
          </CustomCard>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default ProcurementPage;
