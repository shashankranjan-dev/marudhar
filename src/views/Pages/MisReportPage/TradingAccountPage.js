import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import { tradingAccountService } from "../../../services/tradingAccountService";
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
import { ThemeProvider, Box, Grid } from "@material-ui/core";

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
import { currentDate } from "../HelperComponent/utils";

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
  tableLabel: {
    fontWeight: 500,
    color: appSecondColor,
  },
}));

const formData = {
  formName: "Add Category",
  fields: [
    {
      name: "txtBrand",
      label: "Voucher Name & Date",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextField",
      error: false,
      xs: 6,
      md: 6,
      lg: 7,
    },
    {
      name: "txtDate",

      hidden: false,
      required: true,
      data_type: "date",
      html_element: "TextField",
      xs: 6,
      md: 6,
      lg: 5,
    },

    {
      name: "sw_type",
      label: "Ledger",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "select",
      options: [
        {
          label: "Ledger",
          value: "Ledger",
        },
      ],
      xs: 6,
      md: 6,
      lg: 12,
    },

    {
      name: "sw_type",
      label: "Mode & References",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "select",
      options: [
        {
          label: "Bank",
          value: "Bank",
        },
      ],
      xs: 6,
      md: 6,
      lg: 6,
    },
    {
      name: "txtBrand",
      // label: "Mode & References",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextField",
      error: false,
      xs: 6,
      md: 6,
      lg: 6,
    },
    {
      name: "txtBrand",
      label: "Amount",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextField",
      error: false,
      xs: 6,
      md: 6,
      lg: 5,
    },
    {
      name: "txtBrand",
      label: "Narration",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextArea",
      error: false,
      xs: 6,
      md: 6,
      lg: 12,
    },
  ],
};
const onClickSubmit = () => {
  setClassicModal(false);
};
const onChange = (e) => {
  const { value, name } = e.target;
  setAddBrand({ ...allUnits, [name]: value });
};
const TradingAccountPage = () => {
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
    setAllUnits(tradingAccountService);
  }, []);

  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };

  const headerData = [
    {
      id: "traParticular1",
      label: "Particular",
      align: "left",
    },
    {
      id: "traAmount1",
      label: "Amount",
      align: "right",
    },
    {
      id: "traParticular2",
      label: "Particular",
      align: "left",
    },
    {
      id: "traAmount2",
      label: "Amount",
      align: "right",
    },
  ];

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onCaptionChange = (e) => {
    const { value, name } = e.target;
    setAddUnit({ ...addUnit, caption: value });
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="MIS Report > Trading Account" />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Trading Account List" filterIcon>
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="flex-start" alignItems="center">
                <GridItem xs="2">
                  <InputLabel id="label">Date Between</InputLabel>
                  <TextField
                    size="small"
                    id="date"
                    variant="outlined"
                    style={{ marginBottom: -20 }}
                    type="date"
                    fullWidth={true}
                    defaultValue={currentDate()}
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
                    style={{ marginBottom: -20 }}
                    type="date"
                    fullWidth={true}
                    defaultValue={currentDate()}
                    // value={startDate}
                    // onChange={(v) => console.log(v.target.value)}
                    className={classes.dateField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </GridItem>

                <GridItem xs="8">
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
          <CustomCard cdTitle="Trading Account List" height="auto">
            <Box p={1} pb={1}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={2}>
                  <Box className={classes.tableLabel}>Dr</Box>
                </Grid>

                <Grid item xs={2}>
                  <Box className={classes.tableLabel} textAlign="right">
                    Cr
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <MuiTable
              columns={headerData}
              rows={tradingAccountService}
              isTableBodyBorder
              isTableHeaderBorder
            />
          </CustomCard>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default TradingAccountPage;
