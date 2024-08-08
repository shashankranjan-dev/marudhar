import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import { ledgerRowData } from "../../../services/accountLedgerService";
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
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
import ReactSelect from "react-select";
import theme from "../../../theme/theme";
import { getAllLedgerGroup } from "../../../services/LedgerAccountService";

// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
  reactSelectStyles 
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";
import { currentDate, currentDate1 } from "../HelperComponent/utils";

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
  customSelect : {
    marginBottom: 15,
  }
}));


const onClickSubmit = () => {
  setClassicModal(false);
};
const onChange = (e) => {
  const { value, name } = e.target;
  setAddBrand({ ...allUnits, [name]: value });
};
const LedgerPage = () => {
  const classes = useStyles();

  const [ledgerGroup, setAllLedgerGroup] = React.useState([]);

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allUnits, setAllUnits] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
    category: "",
    brand: "",
    item: "",
  });

  const fetchData = () => {
    getAllLedgerGroup(
      (r) => {
        setAllLedgerGroup(r);
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
    setAllUnits(ledgerRowData);
  }, []);
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
        options: ledgerGroup,
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
  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };

  const headerData = [
    {
      id: "ledDate",
      label: "Date",
      align: "left",
    },
    {
      id: "ledVoucherNo",
      label: "Voucher No",
      align: "left",
    },
    {
      id: "ledVoucherType",
      label: "Voucher Type",
      align: "left",
    },
    {
      id: "ledParticular",
      label: "Particular",
      align: "left",
    },
    {
      id: "ledDebit",
      label: "Debit",
      align: "right",
    },
    {
      id: "ledCredit",
      label: "Credit",
      align: "right",
    },
  ];

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };


  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="Account > Ledger" />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Ledger List" filterIcon>
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="flex-start" alignItems="center">
                <GridItem xs="4">
                  <InputLabel id="label">Group</InputLabel>
                  <ReactSelect
                    options={[{ value: "Group", label: "Group" }]}
                    getOptionLabel={(option) => option.label}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    className={classes.customSelect}
                    styles={reactSelectStyles}
              
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
                    size="small"
                    id="date"
                    variant="outlined"
                    // style={{ marginBottom: -20 }}
                    type="date"
                    fullWidth={true}
                    defaultValue={currentDate1()}
                    // value={startDate}
                    // onChange={(v) => console.log(v.target.value)}
                    // className={classes.dateField}
                    inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                  />
                </GridItem>
                <GridItem xs="2">
                  {/* <InputLabel id="label">Date</InputLabel> */}
                  <TextField
                    size="small"
                    id="date"
                    variant="outlined"
                    style={{ marginBottom: 5 }}
                    type="date"
                    fullWidth={true}
                    defaultValue={currentDate()}
                    // value={startDate}
                    // onChange={(v) => console.log(v.target.value)}
                    className={classes.dateField}
                    inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                  />
                </GridItem>
                <GridItem xs="4">
                  <InputLabel id="label">Ledger</InputLabel>
                  <ReactSelect
                  options={ledgerGroup}
                    getOptionLabel={(option) => option.label}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    className={classes.customSelect}
                    styles={reactSelectStyles}
              
                    // onChange={(v) => onSelect("ddl_brand_id", v)}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                  />
                </GridItem>


                <GridItem xs="12">
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

      <MasterModel
        classicModal={classicModal}
        onCloseModel={() => setClassicModal(false)}
        width={450}
   
        height="auto"
        modelName="Add New Receipt"
        onClickOk={onClickSubmit}
      >
        <form style={{ padding: "20px 10px", width: "100%" }}>
          <GridContainer>
            {formData.fields.map((item, key) => {
              return (
                <>
                  <GridItem xs={item.xs} md={item.md} lg={item.lg} key={key}>
                    {item.html_element === "select" && (
                      <>
                        <InputLabel id="label">{item.label}</InputLabel>
                        <Autocomplete
                          id="combo-box-demo"
                          options={item.options}
                          //   inputValue={billDetail[item.name]}
                          //   value={billDetail[item.name]}
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
                          //   onChange={onChangeBillDate}
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
                          //   value={billDetail[item.name]}
                          variant="outlined"
                        />
                      </>
                    )}
                    {item.html_element === "TextArea" && (
                      <>
                        <InputLabel id="label">{item.label}</InputLabel>

                        <TextField
                          placeholder={item.label}
                          name={item.name}
                          onChange={onChange}
                          multiline
                          rows={5}
                          id="outlined-basic"
                          fullWidth={true}
                          // value={addUnit.details}
                          variant="outlined"
                        />
                      </>
                    )}
                    {item.html_element === "switch" && (
                      <>
                        <span className={classes.activeText}>
                          Active Status
                        </span>
                        <Switch
                          onClick={onSetActive}
                          checked={addUnit.active}
                          name="active"
                          fullWidth={true}
                          inputProps={{
                            "aria-label": "primary checkbox",
                          }}
                          color="primary"
                        />
                      </>
                    )}
                  </GridItem>
                </>
              );
            })}
          </GridContainer>
        </form>
      </MasterModel>

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Ledger List" height={480}>
            <MuiTable columns={headerData} rows={ledgerRowData} />
          </CustomCard>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default LedgerPage;
