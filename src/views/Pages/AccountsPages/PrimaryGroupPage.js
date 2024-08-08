import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import ReactSelect from "react-select";
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
import {
  getAllPrimaryGroup,
  deletePrimaryGroup,
  postPrimaryGroup,
  updatePrimaryGroup,
} from "../../../services/masterAccount/primaryGroupService";
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
import { currentDate } from "../HelperComponent/utils";
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

  helperText: {
    textAlign: "right",
  },
  customSelect: {
    marginBottom: 15,
  },
}));

const PrimaryGroupPage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const classes = useStyles();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [globalState, dispatch] = useStateValue();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allPrimaryGroup, setAllPrimaryGroup] = React.useState([]);
  const [value, setValue] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const [addPrimaryGroup, setAddPrimaryGroup] = React.useState({
    edit: false,
    primary_group_id: null,
    switch_active_status: false,
    txt_primary_group: "",
    ddl_nature: "",
    txt_details: "",
  });
  // Error handler state
  const [error, setError] = React.useState({
    txt_primary_group: false,
  });

  React.useEffect(() => {
    setLoading(true);
    getAllPrimaryGroup(
      (r) => {
        setAllPrimaryGroup(r);
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

  const onSetActive = (e) => {
    setAddPrimaryGroup((prv) => ({
      ...prv,
      [e.target.name]: e.target.checked,
    }));
  };

  const headerData = [
    {
      id: "primary_group_serial",
      label: "#",
    },
    {
      id: "primary_group_name",
      label: "Primary Group",
      align: "left",
    },
    {
      id: "primary_group_nature",
      label: "Nature",
      align: "left",
    },
    {
      id: "primary_group_details",
      label: "Details",
      align: "left",
    },
    {
      id: "primary_group_status",
      label: "Status",
      align: "left",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    {
      id: "primary_group_action",
      label: "Action",
      align: "right",
    },
  ];
  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (!addPrimaryGroup.txt_primary_group) {
      setError({
        ...error,
        txt_primary_group: !addPrimaryGroup.txt_primary_group,
      });
    } else {
      if (addPrimaryGroup.edit) {
        updatePrimaryGroup(
          addPrimaryGroup,
          (r) => {
            onCloseModel();
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Primary Group Updated Successfully",
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
        postPrimaryGroup(
          addPrimaryGroup,
          globalState?.user?.serial_id,
          (r) => {
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Primary Group added Successfully",
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
  const onDeletePrimaryGroup = (row, next) => {
    deletePrimaryGroup(
      row.primary_group_id,
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
  const onEditPrimaryGroup = (row) => {
    setClassicModal(true);
    setAddPrimaryGroup({
      ...addPrimaryGroup,
      edit: true,
      switch_active_status: row.primary_group_status === "Y" ? true : false,
      primary_group_id: row.primary_group_id,
      txt_primary_group: row.primary_group_name,
      ddl_nature: {
        value: natures.filter((n, i) => n.label === row.primary_group_nature)
          .value,
        label: row.primary_group_nature,
      },
      txt_details: row.primary_group_details,
    });
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    setAddPrimaryGroup({ ...addPrimaryGroup, [name]: value });
  };

  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({
      txt_primary_group: false,
    });
    setAddPrimaryGroup({
      edit: false,
      primary_group_id: null,
      switch_active_status: false,
      txt_primary_group: "",
      ddl_nature: "",
      txt_details: "",
    });
  };

  const natures = [
    {
      label: "Current Assets",
      value: "CA",
    },
    {
      label: "Loans (Liability)",
      value: "L",
    },
    {
      label: "Current Liabilities",
      value: "CL",
    },
    {
      label: "Capital Account",
      value: "CA",
    },
  
  ];

  const formData = {
    formName: "Primary Group",
    fields: [
      {
        name: "txt_primary_group",
        label: "Primary Group",
        hidden: false,
        required: true,
        data_type: "string",
        align: "left",
        html_element: "TextField",
        error: false,
        xs: 12,
        md: 12,
        lg: 12,
      },

      {
        name: "ddl_nature",
        label: "Nature",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "select",
        options: natures,
        xs: 12,
        md: 12,
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
        md: 12,
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
        md: 12,
        lg: 12,
      },
    ],
  };



     // export to excel

const onhandleExportToExcel = () => {
  const PrimaryGroupTable = allPrimaryGroup.map(acc => {
    return {
      ID: acc.primary_group_serial,
      primary_group: acc.primary_group_name,
      nature: acc.primary_group_nature,
      details:acc.primary_group_details,
      
      
      status: acc.primary_group_status,
      Action:"",
      
    }
  })
  
 
  
  const fileName= 'Primary Group '
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const ws = XLSX.utils.json_to_sheet(PrimaryGroupTable);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + fileExtension);
}

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Account > Primary Group"
        btnToolTip="Add Primary Group"
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
                modelName="Primary Group"
                okBtnText="Submit"
                model Name={
                  addPrimaryGroup.edit
                    ? "Edit Primary Group"
                    : "Add Primary Group"
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
                                <ReactSelect
                                  options={item.options}
                                  name={item.name}
                                  formatGroupLabel={(d) => d.label}
                                  // menuPortalTarget={document.body}
                                  className={classes.customSelect}
                                  onChange={(v) =>
                                    setAddPrimaryGroup({
                                      ...addPrimaryGroup,
                                      [item.name]: v,
                                    })
                                  }
                                  value={addPrimaryGroup[item.name]}
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
                                  value={addPrimaryGroup[item.name]}
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
                                  value={addPrimaryGroup[item.name]}
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
                                  checked={addPrimaryGroup[item.name]}
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
                  <h4 className={classes1.headerCdTitle}>Primary Group</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer" ,display: "none"}}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allPrimaryGroup)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allPrimaryGroup)} >
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
              onClickDelete={onDeletePrimaryGroup}
              onClickEdit={onEditPrimaryGroup}
              columns={headerData}
              rows={allPrimaryGroup}
            />
          </CardBody>
              </Card>
          )}
        
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default PrimaryGroupPage;
