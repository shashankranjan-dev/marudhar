import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import {
  getAllGroup,
  postGroup,
  updateGroup,
  deleteGroup,
} from "../../../services/settingGroupService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input,Box } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import CardLinkButton from "views/Components/CardLinkButton";
import { FormControlLabel, Checkbox, Grid } from "@material-ui/core";
import Check from "@mui/icons-material/Check";

import theme from "../../../theme/theme";

import React from "react";
import {
  appDefaultColor,
  appSecondColor,
  appFontWeight,
  appDefaultFamily,
  appLabelFont,
} from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import CustomCheckboxStyle from "../../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch";
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
const useStyles1 = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
  ...CustomCheckboxStyle,
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  helperText: { textAlign: "right" },

  activeText: {
    ...activeText,
  },
}));

const formData = {
  formName: "Group ",
  fields: [
    {
      name: "txt_group_name",
      label: "Group",
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
      name: "txt_details",
      label: "Details",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "TextArea",
      error: false,
      xs: 12,
      md: 12,
      lg: 12,
    },
    {
      name: "check_vendor",
      label: "Vendor",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "checkBox",
      error: false,
      xs: 6,
      md: 6,
      lg: 4,
    },
    {
      name: "check_customer",
      label: "Customer",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "checkBox",
      error: false,
      xs: 6,
      md: 6,
      lg: 4,
    },
    {
      name: "check_reference",
      label: "Reference",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "checkBox",
      error: false,
      xs: 12,
      md: 6,
      lg: 4,
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

const VendorType = () => {
  const classes1 = useStyles1()
  const history = useHistory();
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allGroups, setAllGroups] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState(false);
  const [addGroup, setAddGroup] = React.useState({
    edit: false,
    group_id: "",
    switch_active_status: false,
    check_vendor: false,
    check_reference: false,
    check_customer: false,
    txt_group_name: "",
    txt_details: "",
    switch_active_status:true,

  });

  // for Error handler state
  const [error, setError] = React.useState({
    txt_group_name: false,
  });

  React.useEffect(() => {
    setLoading(true);
    getAllGroup(
      (groups) => {
        setAllGroups(groups);
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
    const { name, checked } = e.target;
    setAddGroup((prv) => ({ ...prv, [name]: checked }));
  };
  const headerData = [
    {
      id: "id",
      label: "#",
      align: "left",
    },

    {
      id: "groupName",
      label: "Group",
      align: "left",
    },

    {
      id: "details",
      label: "Details",
      align: "left",
    },
    {
      id: "vendor_status",
      label: "Vendor",
      align: "left",
      statusBtn: (v) => (v === "Y" ? true : false),
    },

    {
      id: "customer_status",
      label: "Customer",
      align: "left",
      statusBtn: (v) => (v === "Y" ? true : false),
    },

    {
      id: "reference_status",
      label: "Reference",
      align: "left",
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

  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (false) {
      setError({
        txt_group_name: !addGroup.txt_group_name,
      });
    } else {
      if (addGroup.edit) {
        updateGroup(
          addGroup,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Group Updated Successfully",
                msgType: "success",
              },
            });
            setRefresh(!refresh);

            onCloseModel();

          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      } else {
        postGroup(
          addGroup,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Group added Successfully",
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
            setButtonDisabled(true)
          }
        );
      }
    }
  };

  // on Delete called
  const onDeleteGroup = (row, next) => {
    deleteGroup(
      row.group_id,
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
  const onEditGroup = (row) => {
    setClassicModal(true);
    setAddGroup({
      ...addGroup,
      edit: true,
      group_id: row.group_id,
      check_vendor: row.vendor_status === "Y" ? true : false,
      check_reference: row.reference_status === "Y" ? true : false,
      check_customer: row.customer_status === "Y" ? true : false,
      txt_group_name: row.groupName,
      txt_details: row.details,
      switch_active_status: row.status === "Y" ? true : false,
    });
  };

  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({ txt_group_name: false });
    setAddGroup({
      edit: false,
      group_id: null,
      switch_active_status: false,
      check_vendor: false,
      check_reference: false,
      check_customer: false,
      txt_group_name: "",
      txt_details: "",
    });
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setAddGroup({ ...addGroup, [name]: value });
  };

        // export to excel

const onhandleExportToExcel = () => {
  const GroupTable = allGroups.map(acc => {
    return {
      ID: acc.id,
      Group: acc.groupName,
      Details: acc.details,
      Vendor_status:acc.vendor_status,
      Cstomer_status:acc.customer_status,
      Reference:acc.reference_status,
      
      Status: acc.status,
      Action:"",
      
    }
  })
  
 
  
  const fileName= 'Group'
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const ws = XLSX.utils.json_to_sheet(GroupTable);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + fileExtension);
}

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Settings > Group"
        btnToolTip="Add New Group"
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
                // modelName="Group"
                okBtnText="Submit"
                modelName={addGroup.edit ? "Edit Group" : "Add Group"}
                onClickOk={onSubmitModel}
                disabled={buttonDisabled}
              >
                <div style={{ padding: "10px 10px", width: "100%" }}>
                  <Grid container>
                    {formData.fields.map((item, key) => {
                      return (
                        <>
                          <Grid
                            item
                            xs={item.xs}
                            md={item.md}
                            lg={item.lg}
                            key={key}
                          >
                            {item.html_element === "select" && (
                              <>
                                <InputLabel id="label">{item.label}</InputLabel>
                                <Autocomplete
                                  id="combo-box-demo"
                                  options={item.options}
                                  inputValue={addGroup[item.name]}
                                  value={addGroup[item.name]}
                                  getOptionLabel={(option) => option.label}
                                  // onChange={(event, value) => {
                                  //   onSelectState(value.value);
                                  // }}
                                  renderInput={(params) => (
                                    <TextField
                                      onChange={onChange}
                                      value={addGroup[item.name]}
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
                                <InputLabel required={item.required} id="label">
                                  {item.label}
                                </InputLabel>
                                <TextField
                                  size="small"
                                  required={item.required}
                                  placeholder={item.label}
                                  name={item.name}
                                  onChange={onChange}
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
                                  value={addGroup[item.name]}
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
                                  style={{ marginBottom: -10 }}
                                  multiline
                                  rows={5}
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={addGroup[item.name]}
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
                                  checked={addGroup[item.name]}
                                  name={item.name}
                                  fullWidth={true}
                                  inputProps={{
                                    "aria-label": "primary checkbox",
                                  }}
                                  color="primary"
                                />
                              </>
                            )}
                            {item.html_element === "checkBox" && (
                              <>
                                <div className={classes.checkboxAndRadio}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        className={classes.checkbox}
                                        onClick={onSetActive}
                                        checked={addGroup[item.name]}
                                        name={item.name}
                                        value={item.name}
                                        color="primary"
                                        checkedIcon={
                                          <Check
                                            className={classes.checkedIcon}
                                          />
                                        }
                                        icon={
                                          <Check
                                            className={classes.uncheckedIcon}
                                          />
                                        }
                                        classes={{
                                          checked: classes.checked,
                                          root: classes.checkRoot,
                                        }}
                                      />
                                    }
                                    classes={{
                                      label: classes.label,
                                      root: classes.labelRoot,
                                    }}
                                    label={item.label}
                                  />
                                </div>
                              </>
                            )}
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
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
                  <h4 className={classes1.headerCdTitle}>Group</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer",display: "none" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allGroups)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allGroups)} >
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
              onClickEdit={onEditGroup}
              onClickDelete={onDeleteGroup}
              columns={headerData}
              rows={allGroups}
            />
            </CardBody>
              </Card>
          )}
         
         
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default VendorType;
