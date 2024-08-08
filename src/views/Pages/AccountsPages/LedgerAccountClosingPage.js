import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "react-select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Box,Grid } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import clx from "classnames";
import theme from "../../../theme/theme";
import {
  deleteLedgerAccount,
  getAllLedgerAccount,
  postLedgerAccount,
  updateLedgerAccount,
  getAllLedgerGroup,
  getListLedgerAccount,
  getsearchAllLedgerAccount,
  getListLedgerAccountByGroupId,
  getAllLedgerGroupUsingFilter
} from "../../../services/ledgerAccountClosingService";

import React from "react";
import {
  appDefaultColor,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { appFontWeight } from "assets/jss/material-dashboard-pro-react";
import { appLabelFont } from "assets/jss/material-dashboard-pro-react";
import { OutlinedInput } from "@material-ui/core";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PageTitle from "../HelperComponent/PageTitle";


import {

  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import {
  currentDate,
  dateFormate,
  dateFormateField,
  currencyFormate
} from "../HelperComponent/utils";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactSelect from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import { Paper } from "@material-ui/core";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
// import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import IconButton from '@material-ui/core/Button';
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import  FileSaver from 'file-saver';
import XLSX from 'xlsx'
const ExcelJS = require('exceljs');

const useStyles1 = makeStyles(styles);

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  activeText: {
    ...activeText,
  },
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "22px",
    },
  },
  tableLabel1: {
    color: appSecondColor,
    fontWeight: 600,
    fontSize: ".8rem",
  },

  helperText: {
    textAlign: "right",
  },
  customSelect: {
    marginBottom: 15,
  },
}));

const Options = [
  { value: "Dr", label: "Dr" },
  { value: "Cr", label: "Cr" },
  ]

  const OptionG = [
    { value: ">0", label: ">0" },
    { value: "<0", label: "<0" },
    ]

const LedgerAccountClosingPage = () => {
  const classes1 = useStyles1()
  const history = useHistory();
  const classes = useStyles();
  const [globalState, dispatch] = useStateValue();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [classicModal, setClassicModal] = React.useState(false);
  const [ledgerAccountDropDown, setAllLedgerAccountDropDown] = React.useState([]);

  const [ledgerAccount, setAllLedgerAccount] = React.useState([]);
  const [ledgerGroup, setAllLedgerGroup] = React.useState([]);
  const [ledgerGroupFilter, setAllLedgerGroupFilter] = React.useState([]);

  const [openingBalance, setOpeningBalance] = React.useState({});
  const [viewRes, setViewRes] = React.useState("hidden");
  const [addSearch, setAddSearch] = React.useState({
    ddl_ledger_account: "",
    ddl_ledger_group: "",
    ddl_Status:"",
    ddl_geter:"",

  });
  const option = [
    { value: 1, label: "Dr" },
    { value: 2, label: "Cr" },
  
  ];

  



  const [collapsible, setCollapsible] = React.useState(true)
  const [value, setValue] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const [addLedgerAccount, setAddLedgerAccount] = React.useState({
    edit: false,
    ledger_account_id: "",
    switch_active_status: false,
    txt_ledger_account: "",
    txt_alias: "",
    txt_credit_limit: "",
    ddl_ledger_group: "",
    ddl_ledger_group_label: "Select",
    txt_opening_balance: "",
    ddl_drcr: "",
    ddl_drcr_label: "",
    dtp_date: currentDate(),
  });
  // Error handler state
  const [error, setError] = React.useState({
    txt_ledger_account: false,
  });

  const formData = {
    formName: "Ledger Account",
    fields: [
      {
        name: "txt_ledger_account",
        label: "Ledger Account",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "TextField",
        error: false,
        xs: 12,
        md: 12,
        lg: 12,
      },
      {
        name: "txt_alias",
        label: "Alias",
        hidden: false,
        required: false,
        data_type: "string",
        html_element: "TextField",
        error: false,
        xs: 12,
        md: 12,
        lg: 12,
      },
      {
        name: "ddl_ledger_group",
        label: "Ledger Group",
        hidden: false,
        required: false,
        data_type: "string",
        html_element: "select",
        options: ledgerGroupFilter,
        xs: 12,
        md: 12,
        lg: 12,
      },

      {
        name: "txt_opening_balance",
        label: "Opening Balance",
        hidden: false,
        required: false,
        data_type: "number",
        align: "right",
        html_element: "TextField",
        error: false,
        xs: 12,
        md: 4,
        lg: 4,
      },
      {
        name: "ddl_drcr",
        label: "Dr/Cr",
        hidden: false,
        required: false,
        data_type: "string",
        html_element: "select",
        options: option,

        xs: 6,
        md: 6,
        lg: 3,
      },
      {
        name: "dtp_date",
        label: "Date",
        hidden: false,
        required: false,
        data_type: "string",
        defaultValue: currentDate(),
        html_element: "date",
        xs: 6,
        md: 6,
        lg: 5,
      },
      {
        name: "txt_credit_limit",
        label: "Credit Limit",
        hidden: false,
        required: false,
        data_type: "number",
        align: "right",
        html_element: "TextField",
        error: false,
        xs: 12,
        md: 6,
        lg: 5,
      },
      {
        name: "switch_active_status",
        label: "Active Status",
        defaultValue: false,
        required: false,
        data_type: "string",
        html_element: "switch",
        error: false,
        xs: 12,
        md: 12,
        lg: 12,
      },
    ],
  };

  const onSelect = (info, v) => {
    console.log(info, "sen19/ifo");
    let abs = []
    setAddSearch({
      ...addSearch,
      [info.name]: v,
      ...(info.name === "ddl_ledger_group" ? 
      
      // { ddl_ledger_account: "" } 
      //ledger acc by g id
        getListLedgerAccountByGroupId(
          (r) => {
            console.log(r, "r for led acc")
            setAllLedgerAccount(r);
            setLoading(false);
          },
          (err) => {
            setLoading(false);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          },v.value
        )
      : {}),
    });
    switch (info) {
      case "ddl_ledger_group":
        setAddLedgerAccount({
          ...addLedgerAccount,
          ddl_ledger_group: v.value,
          ddl_ledger_group_label: v.label,
        });
        console.log(v.value, "sen19/idl")
        
        break;
      default:
        break;
      case "ddl_drcr":
        setAddLedgerAccount({
          ...addLedgerAccount,
          ddl_drcr: v.label,
          ddl_drcr_label: v.label,
        });
        break;
        case "ddl_Status":
          setAddLedgerAccount({
            ...addLedgerAccount,
            ddl_Status: v.value,
            ddl_Status_label: v.label,
          });
          break;
          case "ddl_geter":
            setAddLedgerAccount({
              ...addLedgerAccount,
              ddl_geter: v.label,
              ddl_geter_label: v.label,
            });
            break;

    }
  };

  React.useEffect(() => {
    // setLoading(true);
///ledger acc all
    getListLedgerAccount(
      (r) => {
        console.log(r, "r for led acc")
        setAllLedgerAccountDropDown(r);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
    );

    getAllLedgerGroup(
      (r) => {
        setAllLedgerGroup(r);
        setLoading(false);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    getAllLedgerGroupUsingFilter(
      (r) => {
        setAllLedgerGroupFilter(r);
        setLoading(false);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  }, [!refresh]);

  const onSetActive = (e) => {
    setAddLedgerAccount((prv) => ({
      ...prv,
      [e.target.name]: e.target.checked,
    }));
  };

  const headerData = [
    {
      id: "id",
      label: "#",
    },

    {
      id: "ledgerAccount",
      label: "Ledger Account",
    },

    {
      id: "vendor_customer",
      label: "Vendor/Customer",
      align: "left",
    },

    {
      id: "group",
      label: "Group",
      align: "left",
    },

    {
      id: "ledgerGroupName",
      label: "Ledger Group",
      align: "left",
    },

    {
      id: "openingBalanceView",
      label: "Opening Balance",
      align: "right",
    },
    {
      id: "closingBalanceView",
      label: "Closing Balance",
      align: "right",
    },
    // {
    //   id: "as_on_date",
    //   label: "Date",
    //   align: "left",
    // },
    // {
    //   id: "creditLimit",
    //   label: "Credit Limit",
    //   align: "right",
    // },
    // {
    //   id: "status",
    //   label: "Status",
    //   align: "right",
    //   statusBtn: (v) => (v === "Y" ? true : false),
    // },

    // {
    //   id: "action",
    //   label: "Action",
    //   align: "right",
    // },
  ];
  // onSubmit called
  const onSubmitModel = (e) => {
    
    e.preventDefault();
    if (!addLedgerAccount.txt_ledger_account) {
      setError({
        txt_ledger_account: addLedgerAccount.txt_ledger_account ? false : true,
      });
    } else {
      if (addLedgerAccount.edit) {
        updateLedgerAccount(
          addLedgerAccount,

          (r) => {
            onCloseModel();
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Ledger Account Updated Successfully",
                msgType: "success",
              },
            });
            // setRefresh(!refresh);
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      } else {
        postLedgerAccount(
          addLedgerAccount,
          (r) => {
            // setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Ledger Account added Successfully",
                msgType: "success",
              },
            });
            onCloseModel();
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
    }
  };
  // on Delete called
  const onDeleteLedgerAccount = (row, next) => {
    deleteLedgerAccount(
      row.ledger_account_id,
      (r) => {
        next();
        setRefresh(!refresh);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };

  // on Edit called
  const onEditLedgerAccount = (row) => {
    console.log(row, "sank0006")
    setClassicModal(true);
    setAddLedgerAccount({
      ...addLedgerAccount,
      edit: true,
      switch_active_status: row.status === "Y" ? true : false,
      ledger_account_id: row.ledger_account_id,
      txt_ledger_account: row.ledgerAccount,
      txt_alias: row.alias,
      txt_credit_limit: row.creditLimit,
      ddl_ledger_group: row.ledgerGroup,
      ddl_ledger_group_label: row.ledgerGroupName,
      txt_opening_balance: row.openingBalance,
      ddl_drcr: row.dr_cr_status,
      ddl_drcr_label: row.dr_cr_status,
      dtp_date: dateFormateField(row.as_on_date),
    });
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    setAddLedgerAccount({ ...addLedgerAccount, [name]: value });
  };

  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({});
    setAddLedgerAccount({
      edit: false,
      ledger_account_id: null,
      switch_active_status: false,
      txt_ledger_account: "",
      txt_alias: "",
      txt_credit_limit: 0,
      ddl_ledger_group: 0,
      ddl_ledger_group_label: "Select Ledger Group",
      txt_opening_balance: 0,
      dtp_date: currentDate(),
      ddl_drcr: "",
      ddl_drcr_label: "Dr/Cr",
    });
  };

  const onSearchLedgerAccountPage = (e) => {
    e.preventDefault();
    setLoading(true);
    getsearchAllLedgerAccount
      (
        (enquery) => {
          if (enquery.length) {
            setAllLedgerAccount(enquery);
            setViewRes("visible");
            setLoading(false);
          } else {
            setViewRes("visible");
            setLoading(false);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: "Done", msgType: "success" },
            });
          }
        },
        (err) => {
          setAllLedgerAccount([]);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });

        },
        addSearch
      );

  };

  const onReset = () => {
     setAddSearch({
      ddl_ledger_account: "",
      ddl_ledger_group: "",
      ddl_Status:"",
     

     })
     setViewRes("hidden")
    //  setAllLedgerGroup([])
    //  setAllLedgerAccount([])
  }

  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Ledger Account Closing List']);
    const periodRow = worksheet.addRow(['']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:I${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:I${periodRow.number}`);
  
    const headers = [
      'Sl No',
      'Ledger Account', 
      'Vendor/Customer',       
      'Group Name',        
      'Ledger Group Name',
      'Opening Balance',
      'Opening Status',
      'Closing Balance',
      'Closing Status'
    
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const ledgerAccountTable = ledgerAccount.map((ledgerAccount) => {
      return {
        SL_NO: ledgerAccount.id,
      Ledger_Account: ledgerAccount.ledgerAccount,
      Vendor_Customer: ledgerAccount.vendor_customer,
      Group:ledgerAccount.group,
      Ledger_GroupName: ledgerAccount.ledgerGroupName,
      Opening_Balance: ledgerAccount.openingBalance,
      Opening_Status:ledgerAccount.openCrDrStatus,
      Closing_Balance: ledgerAccount.closingBalance,
      Closing_Status:ledgerAccount.closing_dr_cr_status
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    ledgerAccountTable.forEach((data) => {
      worksheet.addRow(Object.values(data));
    });
  
    headerRow.font = { bold: true };
    headerRow.eachCell((cell, colNumber) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'cce6ff' } };
    });
  
    worksheet.eachRow({ startingRow: dataStartRow + 1 }, (row, rowNumber) => {});
  
    worksheet.autoFilter = {
      from: {
        row: dataStartRow,
        column: 1,
      },
      to: {
        row: dataStartRow,
        column: headers.length,
      },
    };
    const ledger_account = addSearch?.ddl_ledger_account?.label ;
    const ledger_group = addSearch?.ddl_ledger_group?.label ;


    // periodCell.value = `Ledger Account: ${ledger_account}       Ledger Group:  ${ledger_group}   `;
    if( addSearch?.ddl_ledger_account && addSearch?.ddl_ledger_group){
      periodCell.value = `Ledger Group: ${ledger_group}   Ledger Account: ${ledger_account} `;
    
    } else  if (ledger_account!== "-") {
          periodCell.value = `Ledger Account: ${ledger_account} `;
      } else if (addSearch?.ddl_ledger_group) {
          periodCell.value = `Ledger Group: ${ledger_group}`;
      }  else {
          periodCell.value = "";
      }
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'ledger Account Closing .xlsx');
  }; 




const onClickCollaps = () => {
  collapsible ?
    setCollapsible(false)
    :
    setCollapsible(true)
}



  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Account > Ledger Accounts"
        btnToolTip="Add Ledger Account"
        onClickAddBtn={() => setClassicModal(true)}
      />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Ledger List" 
          

            btnToolTip={collapsible?"Collaps":"Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
          filterIcon>
            {
              collapsible ?
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="flex-start" alignItems="center">
                <GridItem xs="6">
                  <InputLabel id="label">Group</InputLabel>
                  <ReactSelect
                    options={ledgerGroup}

                    name="ddl_ledger_group"
                    // getOptionLabel={(option) => option.label}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    className={classes.customSelect}
                    styles={reactSelectStyles}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_ledger_group}
                  />
                </GridItem>

                <GridItem xs="6">
                  <InputLabel id="label">Ledger Account</InputLabel>
                  <ReactSelect
                    options={ledgerAccount.filter(
                      (account) =>
                        account.ledger_group_id ===
                        addSearch.ddl_ledger_group.value
                    )}
                    // options={ledgerAccount}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    className={classes.customSelect}
                    styles={reactSelectStyles}
                    name="ddl_ledger_account"
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_ledger_account}
                  // value={ledgerAccount.filter(
                  //   (account) =>
                  //     account.ledger_group_id ===
                  //       addSearch.ddl_ledger_group.value
                  // )}
                  />
                </GridItem>

                {/* <GridItem xs="2">
                  <InputLabel id="label">Geter</InputLabel>
                  <ReactSelect
                   
                    options={OptionG}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    className={classes.customSelect}
                    styles={reactSelectStyles}
                    name="ddl_geter"
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_geter}
                  // value={ledgerAccount.filter(
                  //   (account) =>
                  //     account.ledger_group_id ===
                  //       addSearch.ddl_ledger_group.value
                  // )}
                  />
                </GridItem> */}
                <GridItem xs="2">
                  <InputLabel id="label">Status</InputLabel>
                  <ReactSelect
                   
                    options={Options}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    className={classes.customSelect}
                    styles={reactSelectStyles}
                    name="ddl_Status"
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_Status}
                  // value={ledgerAccount.filter(
                  //   (account) =>
                  //     account.ledger_group_id ===
                  //       addSearch.ddl_ledger_group.value
                  // )}
                  />
                </GridItem>





                {console.log("opening balance", openingBalance)}

                <GridItem xs="12">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <CustomButton
                      style={{ marginRight: "10px" }}
                      onClick={onSearchLedgerAccountPage}
                    >
                      <SearchIcon />
                    </CustomButton>
                    <CustomButton>
                      <RotateLeftIcon 
                      onClick={onReset} 
                      />
                    </CustomButton>
                  </div>
                </GridItem>
              </GridContainer>
            </Paper>
            :''}
          </CustomCard>
        </GridItem>
      </GridContainer>


      <GridContainer className={classes.root} style={{ "visibility": viewRes }}>
        <GridItem xs="12">
          <GridContainer justify="space-between" alignItems="center">
            <GridItem>
              <MasterModel
                classicModal={classicModal}
                onCloseModel={onCloseModel}
                width={480}
                height="auto"
                modelName="Ledger Account"
                okBtnText="Submit"
                model Name={
                  addLedgerAccount.edit
                    ? "Edit Ledger Account"
                    : "Add Ledger Account"
                }
                onClickOk={onSubmitModel}
                disabled={buttonDisabled}

              >
                <div style={{ padding: "20px 10px", width: "100%" }}>
                  <GridContainer>
                    {formData.fields.map((item, key) => {
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
                                <Select
                                  options={item.options}
                                  formatGroupLabel={(d) => d.label}
                                  // menuPortalTarget={document.body}
                                  className={classes.customSelect}
                                  onChange={(v) => onSelect(item.name, v)}
                                  value={{
                                    value: addLedgerAccount[item.name],
                                    label:
                                      addLedgerAccount[`${item.name}_label`],
                                  }}
                                />
                              </>
                            )}
                            {item.html_element === "TextField" && (
                              <>
                                <InputLabel required={item.required} id="label">
                                  {item.label}
                                </InputLabel>
                                <TextField
                                  size="small"
                                  required={item.required}
                                  placeholder={item.label}
                                  name={item.name}
                                  onChange={onChange}
                                  type={item.data_type}
                                  inputProps={{
                                    style: { textAlign: item.align },
                                  }}
                                  id="outlined-basic"
                                  error={error[item.name]}
                                  FormHelperTextProps={{
                                    className: classes.helperText,
                                  }}
                                  helperText={
                                    error[item.name]
                                      ? item.label + " is required"
                                      : ""
                                  }
                                  fullWidth={true}
                                  value={addLedgerAccount[item.name]}
                                  variant="outlined"
                                />
                              </>
                            )}
                            {item.html_element === "drcr" && (
                              <>
                                <InputLabel required={item.required} id="label">
                                  {item.label}
                                </InputLabel>
                                <Select
                                  options={item.options}
                                  formatGroupLabel={(d) => d.label}
                                  // menuPortalTarget={document.body}
                                  className={classes.customSelect}
                                  onChange={(v) => onSelect(item.name, v)}
                                  value={{
                                    value: addLedgerAccount[item.name],
                                    label:
                                      addLedgerAccount[`${item.name}_label`],
                                  }}
                                />
                              </>
                            )}
                            {item.html_element === "date" && (
                              <>
                                <InputLabel id="Date">{item.label}</InputLabel>
                                <TextField
                                  size="small"
                                  id="date"
                                  variant="outlined"
                                  type="date"
                                  name={item.name}
                                  defaultValue={item.defaultValue}
                                  FormHelperTextProps={{
                                    className: classes.helperText,
                                  }}
                                  helperText={
                                    error[item.name]
                                      ? item.label + " is required"
                                      : ""
                                  }
                                  fullWidth={true}
                                  value={addLedgerAccount[item.name]}
                                  onChange={onChange}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
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
                                  FormHelperTextProps={{
                                    className: classes.helperText,
                                  }}
                                  helperText={
                                    error[item.name]
                                      ? item.label + " is required"
                                      : ""
                                  }
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={addLedgerAccount[item.name]}
                                  variant="outlined"
                                />
                              </>
                            )}
                            {item.html_element === "switch" && (
                              <>
                                <span className={classes.activeText}>
                                  {item.label}
                                </span>
                                <Switch
                                  onClick={onSetActive}
                                  checked={addLedgerAccount[item.name]}
                                  name={item.name}
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
                </div>
              </MasterModel>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <Card className={classes1.headerCard}>
            <CardHeader className={classes1.TbheaderCdhd} style={{ height: 60 }}>
                <GridContainer justifyContent="space-between" alignItems="center">
                  <GridItem>
                    <h4 className={classes1.headerCdTitle}>ledgerAccount</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? ( 
                  <GridItem style={{ cursor: "pointer" ,display: "none"}}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(ledgerAccount)} >
                      <Tooltip title="Export to Excel">
                        <img src={require("../../../assets/img/excel.png").default} />
                      </Tooltip>
                    </IconButton>
                  </GridItem>
                  ):(
                    <GridItem style={{ cursor: "pointer" }}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(ledgerAccount)} >
                      <Tooltip title="Export to Excel">
                        <img src={require("../../../assets/img/excel.png").default} />
                      </Tooltip>
                    </IconButton>
                  </GridItem>
                  )}
                </GridContainer>
              </CardHeader>
              <CardBody
                style={{ height: "auto", maxHeight: 480, padding: 10 }}
                className={clxs(classes.customScroolBar)}
              >
            
              <MuiTable
                onClickDelete={onDeleteLedgerAccount}
                onClickEdit={onEditLedgerAccount}
                columns={headerData}
                rows={ledgerAccount}
              />
               <Box pt={1} >
                  {!refresh ?
                    <GridContainer>

                      <Grid item xs={1}>
                        <Box className={classes.tableLabel} textAlign="right">
                          <b> Total</b>
                        </Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Box className={classes.tableLabel} textAlign="right">

                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box className={classes.tableLabel} textAlign="left">

                        </Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Box className={classes.tableLabel} textAlign="left">

                        </Box>
                      </Grid>




                      <Grid item xs={2}>
                        <Box className={classes.tableLabel} ml={4} textAlign="left">
                          {/* {console.log("sen0902",allInvoices.map(
                                 (prev, curr) =>prev.inv_gross_amount_ForTotal === NaN?"true":''
                                
                              ))} */}
                          {/* {ledgerAccount.length
                            ?
                            ledgerAccount.reduce(
                              (prev, curr) => { return prev + Number(curr.closingBalanceView) },
                              0
                            )

                            : ""} */}

                           
                        </Box>
                      </Grid>

                      <Grid item xs={1}>
                        <Box className={classes.tableLabel} ml={-4} textAlign="left">
                       
                        </Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Box className={classes.tableLabel} ml={-2} textAlign="left">
                          {/* {allInvoices.length
                            ? (
                              allInvoices.reduce(
                                (sum, li) => Number(sum) + Number(li.inv_OtherCharges),
                                0
                              )
                            ).toFixed(2)
                            : ""} */}
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Box className={classes.tableLabel1} ml={8} textAlign="center">
                          {/* {allInvoices.length
                            ? (
                              allInvoices.reduce(
                                (sum, li) => Number(sum) + Number(li.inv_NetAmount_ForTotal),
                                0
                              )
                            ).toFixed(2)
                            : ""} */}
                           {ledgerAccount.length
                            ?
                            currencyFormate(Math.abs(ledgerAccount.reduce(
                              (prev, curr) => { return prev + Number(curr.closing_dr_cr_status === "Dr" ? curr.closingBalance :0) },
                              0
                            ).toFixed(2)
                             -
                             ledgerAccount.reduce(
                              (prev, curr) => { return prev + Number(curr.closing_dr_cr_status === "Cr" ? curr.closingBalance :0) },
                              0
                            ).toFixed(2)))

                            : ""}
                           
                        </Box>
                      </Grid>
                    </GridContainer>
                    : ""}

                </Box>

              </CardBody>
            </Card>
          )}
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default LedgerAccountClosingPage;
