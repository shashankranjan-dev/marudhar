import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";

import { addQuatationServiceData } from "../../../services/addQuatationService";
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
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";

import theme from "../../../theme/theme";

// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
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
}));

const SalesPage = () => {
  const history = useHistory();
  const [allUnits, setAllUnits] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
    category: "",
    brand: "",
    item: "",
  });
  React.useEffect(() => {
    setAllUnits(addQuatationServiceData);
  }, []);

  const headerData = [
    {
      id: "enquire_serial",
      label: "#",
      align: "left",
    },
    {
      id: "enqDate",
      label: "Enquiry Date",
      align: "left",
    },
    {
      id: "enqNo",
      label: "Enquiry No",
      align: "left",
    },
    {
      id: "enqCustomer",
      label: "Customer",
      align: "left",
    },
    {
      id: "enqMobile",
      label: "Mobile",
      align: "left",
    },
    {
      id: "enqSalesExecutive",
      label: "Sales Executive",
      align: "left",
    },

    {
      id: "enqStatus",
      label: "Status",
      align: "left",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    {
      id: "enqAction",
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
      <PageTitle title="Sales > Quotation > Add" />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle="Search On Enquiry To Generate Quotation"
            filterIcon
          >
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="flex-start" alignItems="center">
                <GridItem xs="3">
                  <InputLabel id="label">Enquiry No</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Enquiry No"
                    name="txtEnquiryNo"
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
                  <Autocomplete
                    id="combo-box-demo"
                    options={[{ value: "Customer", label: "Customer" }]}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        onChange={onAddSearch}
                        value={addSearch.category}
                        placeholder="Customer"
                        fullWidth={true}
                        {...params}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  />
                </GridItem>
                <GridItem xs="5">
                  <InputLabel id="label">Keyword / Pharse</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Keyword/Pharse"
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
                </GridItem>

                <GridItem xs="4">
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
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Enquiry Details" minHeight={300}>
            <MuiTable columns={headerData} rows={addQuatationServiceData} />
          </CustomCard>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default SalesPage;
