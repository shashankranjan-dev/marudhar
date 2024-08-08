import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton from "../../Components/CustomButton";
import { ledgerRowData } from "../../../services/masterLedgerGroupService";
import {
  getAllLedgerGroup,
  postLedgerGroup,
  deleteLedgerGroup,
  getAllPrimaryGroup,
  updateLedgerGroup,
} from "services/masterAccount/ledgerGroupService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, OutlinedInput ,Box} from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

import theme from "../../../theme/theme";

import React from "react";
import {
  appDefaultColor,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "../../Components/CardLinkButton";
import { CircleAddBtn } from "../../Components/CustomButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import PageTitle from "../HelperComponent/PageTitle";
import { DriveEtaSharp } from "@mui/icons-material";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import Select from "react-select";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import  FileSaver from 'file-saver';
import XLSX from 'xlsx'
import IconButton from '@material-ui/core/Button';

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

const allaccountNatures = [
  {
    label: "Assets",
    value: "1",
  },
  {
    value: "2",
    label: "Expenses",
  },
  {
    value: "3",
    label: "Income",
  },
  {
    value: "4",
    label: "Liabilities",
  },
  {
    value: "5",
    label: "Provision",
  },
];

const LedgerGroupPage = () => {
  const classes1 = useStyles1()

  const [globalState, dispatch] = useStateValue();
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [allLedgerGroup, setAllLedgerGroup] = React.useState([]);
  const [allPrimaryGroup, setAllPrimaryGroup] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [addLedgerGroup, setLedgerGroup] = React.useState({
    edit: false,
    ledger_group_id: "",
    switch_active_status: false,
    switch_sub_group_status: false,
    txt_ledger_group: "",
    txt_alias: "",
    ddl_sequence_id: "",
    ddl_sequence_label: "Select",
    ddl_account_nature_id: "",
    ddl_account_nature_label: "Select",
    ddl_primary_group_id: "",
    ddl_primary_group_label: "Select",
  });

  // Error handler state
  const [error, setError] = React.useState({
    txt_ledger_group: false,
    ddl_sequence_id: false,
  });

  React.useEffect(() => {
    setLoading(true);
    getAllLedgerGroup(
      (r) => {
        setAllLedgerGroup(r);
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
    getAllPrimaryGroup(
      (r) => {
        setAllPrimaryGroup(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  }, [refresh]);

  const onSetActive = (e) => {
    setLedgerGroup((prv) => ({ ...prv, [e.target.name]: e.target.checked }));
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setLedgerGroup({ ...addLedgerGroup, [name]: value });
  };

  const headerData = [
    {
      id: "id",
      label: "#",
    },
    {
      id: "ledgerGroup",
      label: "Ledger Group",
      align: "left",
    },

    {
      id: "alias",
      label: "Alias",
      align: "left",
    },

    {
      id: "primaryGroupName",
      label: "Primary Group",
    },

    {
      id: "accountNatureName",
      label: "Account Nature",
      align: "left",
    },

    {
      id: "sequence",
      label: "Sequence",
      align: "right",
    },
    {
      id: "subGroupStatus",
      label: "Sub Group Status",
      align: "center",
      statusBtn: (v) => (v === "Y" ? true : false),
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

  const onSelectParentGroup = (v) => {
    setLedgerGroup({
      ...addLedgerGroup,
      ddl_primary_group_id: v.value,
      ddl_primary_group_label: v.label,
    });
  };
  const onSelectAccountNature = (v) => {
    setLedgerGroup({
      ...addLedgerGroup,
      ddl_account_nature_id: v.value,
      ddl_account_nature_label: v.label,
    });
  };
  const onSelectSequence = (v) => {
    setLedgerGroup({
      ...addLedgerGroup,
      ddl_sequence_id: v.value,
      ddl_sequence_label: v.label,
    });
  };
  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (!addLedgerGroup.txt_ledger_group) {
      setError({
        ...error,
        txt_ledger_group: !addLedgerGroup.txt_ledger_group,
      });
    } else {
      if (addLedgerGroup.edit) {
        updateLedgerGroup(
          addLedgerGroup,
          (r) => {
            onCloseModel();
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Ledger Group Updated Successfully",
                msgType: "success",
              },
            });
            setRefresh(!refresh);
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      } else {
        postLedgerGroup(
          addLedgerGroup,
          globalState?.user?.serial_id,
          (r) => {
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Ledger Group added Successfully",
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
  const onDeleteLedgerGroup = (row, next) => {
    deleteLedgerGroup(
      row.ledger_group_id,
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
    setClassicModal(true);
    setLedgerGroup({
      ...addLedgerGroup,
      edit: true,
      ledger_group_id: row.ledger_group_id,
      switch_active_status: row.status === "Y" ? true : false,
      switch_sub_group_status: row.subGroupStatus === "Y" ? true : false,
      txt_ledger_group: row.ledgerGroup,
      txt_alias: row.alias,
      ddl_sequence_label: row.sequence,
      ddl_sequence_id: row.sequence,
      ddl_account_nature_id: row.accountNature,
      ddl_account_nature_label: row.accountNatureName,
      ddl_primary_group_id: row.primaryGroup,
      ddl_primary_group_label: row.primaryGroupName,
    });
  };

  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({
      txt_ledger_group: false,
      txt_sequence: false,
    });
    setLedgerGroup({
      ...addLedgerGroup,
      edit: false,
      ledger_group_id: "",
      switch_active_status: false,
      switch_sub_group_status: false,
      txt_ledger_group: "",
      txt_alias: "",
      ddl_sequence_id: "",
      ddl_sequence_label: "Select Sequence",
      ddl_account_nature_id: "",
      ddl_account_nature_label: "Select Account Nature",
      ddl_primary_group_id: "",
      ddl_primary_group_label: "Select Primary Group",
    });
  };

  const classes = useStyles();


       // export to excel

const onhandleExportToExcel = () => {
  const LedgerGroupTable = allLedgerGroup.map(acc => {
    return {
      ID: acc.id,
      ledgerGroup: acc.ledgerGroup,
      Alias: acc.alias,
      PrimaryGroup:acc.primaryGroupName,
      AccountNature:acc.accountNatureName,
      Sequence:acc.sequence,
      SubGroupStatus:acc.subGroupStatus,
      Status: acc.status,
      Action:"",
      
    }
  })
  
 
  
  const fileName= 'Ledger Group '
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const ws = XLSX.utils.json_to_sheet(LedgerGroupTable);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + fileExtension);
}

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Account > Ledger Group"
        btnToolTip="Add New Ledger Group"
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
                modelName="Ledger Group"
                okBtnText="Submit"
                model Name={
                  addLedgerGroup.edit ? "Edit Ledger Group" : "Add Ledger Group"
                }
                onClickOk={onSubmitModel}
                disabled={buttonDisabled}

              >
                <div style={{ padding: "20px 10px", width: "100%" }}>
                  <GridContainer alignItems="center">
                    <GridItem xs={12}>
                      <InputLabel required id="label">
                        Ledger Group
                      </InputLabel>
                      <TextField
                        size="small"
                        required
                        placeholder="Ledger Group"
                        name="txt_ledger_group"
                        onChange={onChange}
                        id="outlined-basic"
                        error={error.txt_ledger_group}
                        FormHelperTextProps={{
                          style: { textAlign: "right" },
                        }}
                        helperText={
                          error.txt_ledger_group
                            ? "Ledger Group is required"
                            : ""
                        }
                        fullWidth={true}
                        value={addLedgerGroup.txt_ledger_group}
                        variant="outlined"
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <InputLabel id="label">Alias</InputLabel>
                      <TextField
                        size="small"
                        placeholder="Alias"
                        name="txt_alias"
                        onChange={onChange}
                        id="outlined-basic"
                        fullWidth={true}
                        value={addLedgerGroup.txt_alias}
                        variant="outlined"
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <InputLabel id="label">Primary Group</InputLabel>
                      <Select
                        options={allPrimaryGroup}
                        placeholder="Select Primary Group"
                        formatGroupLabel={(d) => d.label}
                        className={classes.customSelect}
                        onChange={onSelectParentGroup}
                        value={{
                          value: addLedgerGroup.ddl_primary_group_id,
                          label: addLedgerGroup.ddl_primary_group_label,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <InputLabel id="label">Account Nature</InputLabel>
                      <Select
                        options={allaccountNatures}
                        placeholder="Select Parent Group"
                        // menuPortalTarget={document.body}
                        formatGroupLabel={(d) => d.label}
                        className={classes.customSelect}
                        onChange={onSelectAccountNature}
                        value={{
                          value: addLedgerGroup.ddl_account_nature_id,
                          label: addLedgerGroup.ddl_account_nature_label,
                        }}
                      />
                    </GridItem>

                    <GridItem xs={5}>
                      <InputLabel required id="label">
                        Sequence
                      </InputLabel>
                      <Select
                        options={[
                          { value: "1", label: "1" },
                          { value: "2", label: "2" },
                          { value: "3", label: "3" },
                        ]}
                        formatGroupLabel={(d) => d.label}
                        // menuPortalTarget={document.body}
                        className={classes.customSelect}
                        onChange={onSelectSequence}
                        value={{
                          value: addLedgerGroup.ddl_sequence_id,
                          label: addLedgerGroup.ddl_sequence_label,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={7}></GridItem>

                    <GridItem xs={6}>
                      <span className={classes.activeText}>
                        Sub Group Status
                      </span>
                      <Switch
                        onClick={onSetActive}
                        checked={addLedgerGroup.switch_sub_group_status}
                        name="switch_sub_group_status"
                        fullWidth={true}
                        inputProps={{
                          "aria-label": "primary checkbox",
                        }}
                        color="primary"
                      />
                    </GridItem>
                    <GridItem xs={6}>
                      <span className={classes.activeText}>Active Status</span>
                      <Switch
                        onClick={onSetActive}
                        checked={addLedgerGroup.switch_active_status}
                        name="switch_active_status"
                        fullWidth={true}
                        inputProps={{
                          "aria-label": "primary checkbox",
                        }}
                        color="primary"
                      />
                    </GridItem>
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
                  <h4 className={classes1.headerCdTitle}>Ledger Group</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer" ,display: "none"}}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allLedgerGroup)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allLedgerGroup)} >
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
              onClickDelete={onDeleteLedgerGroup}
              onClickEdit={onEditLedgerAccount}
              columns={headerData}
              rows={allLedgerGroup}
            />
           </CardBody>
              </Card>
          )}
        
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default LedgerGroupPage;
