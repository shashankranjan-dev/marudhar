import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
// import Select from "@material-ui/core/Select";
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
import { Input, Box } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../../theme/theme";
import { ledgerAccountRowData } from "../../../services/LedgerAccountService";
import {
  deleteTaxMaster,
  getAllTaxMaster,
  postTaxMaster,
  getAllLedgerAccount,
  updateTaxMaster,
} from "../../../services/taxMasterService";

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
  helperText: {
    textAlign: "right",
  },
  customSelect: {
    marginBottom: 15,
  },
  ddlError: {
    textAlign: "right",
    color: "#f44336",
    fontSize: "12.6px",
    marginRight: 15,
    marginTop: -15,
    fontWeight: 400,
  },
}));

const TaxMasterPage = () => {
  const history = useHistory();
  const [ledgerAccount, setAllLedgerAccount] = React.useState([]);
  const [classicModal, setClassicModal] = React.useState(false);
  const [allTaxMaster, setAllTaxMaster] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [addtaxMaster, setAddTaxMaster] = React.useState({
    edit: false,
    tax_master_id: "",
    switch_active_status: false,
    txt_tax_master: "",
    txt_percentage: null,
    txt_details: "",
    ddl_ledger_account: 0,
    ddl_ledger_account_label: "Select",
  });

  // for Error handler state
  const [error, setError] = React.useState({
    txt_tax_master: false,
    txt_percentage: false,
  });

  const formData = {
    formName: "Tax Master",
    fields: [
      {
        name: "txt_tax_master",
        label: "Tax Master",
        hidden: false,
        required: true,
        data_type: "string",
        align: "left",
        html_element: "TextField",
        error: false,
        xs: 12,
        md: 6,
        lg: 12,
      },
      {
        name: "txt_percentage",
        label: "Percentage%",
        hidden: false,
        required: true,
        data_type: "number",
        align: "right",
        html_element: "TextField",
        error: false,
        xs: 12,
        md: 6,
        lg: 4,
      },
      {
        name: "ddl_ledger_account",
        label: "Ledger Account",
        hidden: false,
        required: false,
        data_type: "string",
        placeholder: "Ledger Account",
        html_element: "select",
        options: ledgerAccount,
        xs: 12,
        md: 6,
        lg: 12,
      },
      {
        name: "txt_details",
        label: "Details",
        hidden: false,
        required: true,
        data_type: "string",
        align: "left",
        html_element: "TextArea",
        error: false,
        xs: 12,
        md: 6,
        lg: 12,
      },

      {
        name: "switch_active_status",
        label: "Active Status",
        defaultValue: false,
        required: true,
        data_type: "string",
        html_element: "switch",
        error: false,
        xs: 12,
        md: 6,
        lg: 12,
      },
    ],
  };

  React.useEffect(() => {
    setLoading(true);
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
    getAllTaxMaster(
      (r) => {
        setAllTaxMaster(r);
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
    if (!addtaxMaster.txt_tax_master || !addtaxMaster.txt_percentage) {
      setError({
        txt_tax_master: !addtaxMaster.txt_tax_master,
        txt_percentage: !addtaxMaster.txt_percentage,
      });
    } else {
      if (addtaxMaster.edit) {
        updateTaxMaster(
          addtaxMaster,
          (r) => {
            onCloseModel();
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Tax Master Updated Successfully",
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
        postTaxMaster(
          addtaxMaster,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Tax Master added Successfully",
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
  const onDeleteTaxMaster = (row, next) => {
    deleteTaxMaster(
      row.tax_master_id,
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
  const onUpdateTaxMaster = (row) => {
    setClassicModal(true);
    setAddTaxMaster({
      ...addtaxMaster,
      edit: true,
      tax_master_id: row.tax_master_id,
      switch_active_status: row.status === "Y" ? true : false,
      txt_tax_master: row.taxMaster,
      txt_percentage: row.percentage,
      txt_details: row.details,
      ddl_ledger_account: row.ledgerAccount,
      ddl_ledger_account_label: row.ledgerAccountName,
    });
  };

  const onSetActive = (e) => {
    setAddTaxMaster((prv) => ({ ...prv, [e.target.name]: e.target.checked }));
  };

  const headerData = [
    {
      id: "id",
      label: "#",
    },

    {
      id: "taxMaster",
      label: "Tax Master",
    },

    {
      id: "percentage",
      label: "Percentage%",
      align: "right",
    },

    {
      id: "ledgerAccountName",
      label: "Ledger Account",
      align: "left",
    },
    {
      id: "details",
      label: "Details",
      align: "left",
    },
    {
      id: "status",
      label: "Status",
      align: "right",
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
    setAddTaxMaster({ ...addtaxMaster, [name]: value });
  };

  const onSelectLedgerAccount = (v) => {
    if (v !== null) {
      setAddTaxMaster({
        ...addtaxMaster,
        ddl_ledger_account: v.value,
        ddl_ledger_account_label: v.label,
      });
    }
  };
  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({ txt_tax_master: false });
    setAddTaxMaster({
      ...addtaxMaster,
      edit: false,
      tax_master_id: "",
      switch_active_status: false,
      txt_tax_master: "",
      txt_percentage: null,
      txt_details: "",
      ddl_ledger_account: "",
      ddl_ledger_account_label: "Select",
    });
  };
  const classes = useStyles();


  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Account > Tax Master"
        btnToolTip="Add Tax Master"
        onClickAddBtn={() => setClassicModal(true)}
      />
      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <GridContainer justify="space-between" alignItems="center">
            <GridItem></GridItem>
            <GridItem>
              <MasterModel
                classicModal={classicModal}
                onCloseModel={onCloseModel}
                width={450}
                height="auto"
                modelName="Tax Master"
                okBtnText="Submit"
                model Name={
                  addtaxMaster.edit ? "Edit Tax Master" : "Add Tax Mastert"
                }
                onClickOk={onSubmitModel}
                disabled={buttonDisabled}

              >
                <div style={{ padding: "20px 10px", width: "100%" }}>
                  <GridContainer>
                    {formData.fields.map((item, key) => {
                      return (
                        <>
                          <GridItem xs={item.xs} md={item.md} lg={item.lg}  key={key}>
                            {item.html_element === "select" && (
                              <>
                                <InputLabel id="label">{item.label}</InputLabel>
                                <Select
                                  options={item.options}
                                  placeholder="Select Module"
                                  formatGroupLabel={(d) => d.label}
                                  className={classes.customSelect}
                                  // menuPortalTarget={document.body}
                                  onChange={onSelectLedgerAccount}
                                  value={{
                                    value: addtaxMaster.ddl_ledger_account,
                                    label:
                                      addtaxMaster.ddl_ledger_account_label,
                                  }}
                                />
                                {error[item.name] && (
                                  <div className={classes.ddlError}>
                                    {item.label} is Required
                                  </div>
                                )}
                              </>
                            )}
                            {item.html_element === "TextField" && (
                              <>
                                <InputLabel required={item.required} id="label">
                                  {item.label}
                                </InputLabel>
                                <TextField
                                  size="small"
                                  placeholder={item.label}
                                  name={item.name}
                                  required={item.required}
                                  onChange={onChange}
                                  type={item.data_type}
                                  inputProps={{
                                    style: { textAlign: item.align },
                                  }}
                                  error={error[item.name]}
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
                                  value={addtaxMaster[item.name]}
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
                                  value={addtaxMaster[item.name]}
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
                                  checked={addtaxMaster[item.name]}
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
            <CustomCard cdTitle="Tax Master" maxHeight="auto">
            <MuiTable
              onClickEdit={onUpdateTaxMaster}
              onClickDelete={onDeleteTaxMaster}
              columns={headerData}
              rows={allTaxMaster}
            />
          </CustomCard>

          )}
          
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default TaxMasterPage;
