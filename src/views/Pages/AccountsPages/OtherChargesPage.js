//hahaha

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "react-select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import {
  getAllOtherCharges,
  postOtherCharges,
  deleteOtherCharges,
  updateOtherCharges,
  
} from "../../../services/OtherChargesService";
import { getAllLedgerAccount } from "../../../services/taxMasterService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Box } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../../theme/theme";
import clx from "classnames";
import {
  
  getListLedgerAccount,
  
} from "../../../services/LedgerAccountService";

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
import { Autocomplete } from "@material-ui/lab";
import PageTitle from "../HelperComponent/PageTitle";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import  FileSaver from 'file-saver';
import XLSX from 'xlsx'
import IconButton from '@material-ui/core/Button';
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
  customSelect: {
    marginBottom: 15,
  },
}));

const OtherChargesPage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [ledgerAccount, setAllLedgerAccount] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [allOtherCharges, setAllOtherCharges] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [addCharges, setAddCharges] = React.useState({
    edit: false,
    other_charges_id: "",
    switch_active_status: false,
    txt_sac_code: "",
    txt_details: "",
    txt_charges: "",
    ddl_ledger_account_id: "",
    ddl_ledger_account_id_label: "Select",
  });

  // for Error handler state
  const [error, setError] = React.useState({
    txt_charges: false,
    txt_sac_code: false,
  });

  const formData = {
    formName: "Other Charges",
    fields: [
      {
        name: "txt_charges",
        label: "Heading",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "TextField",
        align: "left",
        error: false,
        xs: 12,
        md: 6,
        lg: 3,
      },
      {
        name: "txt_sac_code",
        label: "SAC Code",
        hidden: false,
        required: true,
        data_type: "string",
        align: "left",
        html_element: "TextField",
        error: false,
        xs: 12,
        md: 6,
        lg: 3,
      },
      {
        name: "ddl_ledger_account_id",
        label: "Ledger Account",
        hidden: false,
        required: false,
        data_type: "string",
        html_element: "select",
        options: ledgerAccount,
        xs: 12,
        md: 6,
        lg: 3,
      },
      {
        name: "txt_details",
        label: "Details",
        hidden: false,
        required: false,
        data_type: "string",
        align: "left",
        html_element: "TextArea",
        error: false,
        xs: 12,
        md: 6,
        lg: 3,
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
        md: 6,
        lg: 3,
      },
    ],
  };

  const onSelect = (name, v) => {
    switch (name) {
      case "ddl_ledger_account_id":
        setAddCharges({
          ...addCharges,
          ddl_ledger_account_id: v.value,
          ddl_ledger_account_id_label: v.label,
        });
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    setLoading(true);
    getListLedgerAccount(
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
    getAllOtherCharges(
      
      (r) => {
        setAllOtherCharges(r);
    setLoading(false);

      },
      (err) => {
    setLoading(false);

        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  }, [refresh]);

  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (!addCharges.txt_charges || !addCharges.txt_sac_code) {
      setError({
        ...error,
        txt_charges: !addCharges.txt_charges,
        txt_sac_code: !addCharges.txt_sac_code,
      });
    } else {
      if (addCharges.edit) {
        updateOtherCharges(
          addCharges,
          (r) => {
            onCloseModel();
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Other Charges Updated Successfully",
                msgType: "success",
              },
            });
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      } else {
        postOtherCharges(
          addCharges,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Other Charges added Successfully",
                msgType: "success",
              },
            });
            onCloseModel();
            setRefresh(!refresh);
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
  const onDeleteOtherCharges = (row, next) => {
    deleteOtherCharges(
      row.other_charges_id,
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
  const onUpdateOtherCharges = (row) => {
    setClassicModal(true);
    setAddCharges({
      ...addCharges,
      edit: true,
      other_charges_id: row.other_charges_id,
      switch_active_status: row.status === "Y" ? true : false,
      ddl_ledger_account_id: row.ledgerAccount,
      ddl_ledger_account_id_label: row.ledgerAccountName,
      txt_charges: row.charges,
      txt_sac_code: row.sacCode,
      txt_details: row.details,
    });
  };

  const onSetActive = (e) => {
    setAddCharges((prv) => ({ ...prv, [e.target.name]: e.target.checked }));
  };

  const headerData = [
    {
      id: "id",
      label: "#",
    },
    {
      id: "charges",
      label: "Other Charges ",
      align: "left",
    },
    {
      id: "sacCode",
      label: "SAC Code",
      align: "left",
    },
    {
      id: "ledgerAccountName",
      label: "Ledger account ",
    },

    {
      id: "details",
      label: "Details",
      align: "left",
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
      align: "right",
    },
  ];

  const onChange = (e) => {
    const { value, name } = e.target;
    setAddCharges({ ...addCharges, [name]: value });
  };
  const classes = useStyles();

  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({});
    setAddCharges({
      ...addCharges,
      edit: false,
      other_charges_id: "",
      switch_active_status: false,
      txt_sac_code: "",
      txt_details: "",
      txt_charges: "",
      ddl_ledger_account_id: "",
      ddl_ledger_account_id_label: "Select",
    });
  };


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Other Charges List ']);
    const periodRow = worksheet.addRow(['']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:F${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:F${periodRow.number}`);
  
    const headers = [
      'Sl No',
      'Other Charges',
      'SAC Code',
      'ledger Account',
      'Details',            
      'Status',
      
    
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const OtherChargesTable = allOtherCharges.map((acc) => {
      return {
        ID: acc.id,
      Othercharges: acc.charges,
      SACCode: acc.sacCode,
      ledgerAccount:acc.ledgerAccountName,
      details:acc.details,
      status: acc.status,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    OtherChargesTable.forEach((data) => {
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

    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Other Charges List.xlsx');
  };





  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Account > Other Charges"
        btnToolTip="Add New Other Charges"
        onClickAddBtn={() => setClassicModal(true)}
      />
      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <GridContainer justify="space-between" alignItems="center">
            <GridItem>
              <MasterModel
                classicModal={classicModal}
                onCloseModel={onCloseModel}
                width={450}
                height="auto"
                modelName="Other Charges"
                okBtnText="Submit"
                model Name={addCharges.edit ? "Edit Charges" : "Add Charges"}
                onClickOk={onSubmitModel}
                disabled={buttonDisabled}

              >
                <div style={{ padding: "20px 10px", width: "100%" }}>
                  <GridContainer>
                    {formData.fields.map((item, key) => {
                      return (
                        <>
                          <GridItem xs={12} key={key}>
                            {item.html_element === "select" && (
                              <>
                                <InputLabel id="label">{item.label}</InputLabel>
                                <Select
                                  options={item.options}
                                  formatGroupLabel={(d) => d.label}
                                  // menuPortalTarget={document.body}
                                  className={clx(
                                    classes.customSelect,
                                    classes.dateField
                                  )}
                                  onChange={(v) => onSelect(item.name, v)}
                                  value={{
                                    value: addCharges[item.name],
                                    label: addCharges[`${item.name}_label`],
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
                                  required={item.required}
                                  size="small"
                                  placeholder={item.label}
                                  name={item.name}
                                  type={item.data_type}
                                  onChange={onChange}
                                  inputProps={{
                                    style: { textAlign: item.align },
                                  }}
                                  error={error[item.name]}
                                  FormHelperTextProps={{
                                    style: { textAlign: "right" },
                                  }}
                                  helperText={
                                    error[item.name]
                                      ? item.label + " is required"
                                      : ""
                                  }
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={addCharges[item.name]}
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
                                  value={addCharges[item.name]}
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
                                  checked={addCharges[item.name]}
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
                  <h4 className={classes1.headerCdTitle}>Other Charges</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer" ,display: "none"}}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allOtherCharges)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allOtherCharges)} >
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
              onClickDelete={onDeleteOtherCharges}
              onClickEdit={onUpdateOtherCharges}
              columns={headerData}
              rows={allOtherCharges}
            />
          </CardBody>
              </Card>
          )}
         
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default OtherChargesPage;
