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
  getAllRole,
  postRole,
  deleteRole,
  updateRole,
} from "../../../services/roleService";
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
import { Autocomplete } from "@material-ui/lab";
import PageTitle from "../HelperComponent/PageTitle";
import theme from "../../../theme/theme";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import React from "react";
import {
  appLabelFont,
  appFontWeight,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
} from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
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

  catCards: {
    marginLeft: 5,
    marginBottom: 20,
  },
  activeText: {
    ...activeText,
  },
  input: {
    height: 40,
    lineLight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
}));

const formData = {
  formName: "Add a Role",
  fields: [
    {
      name: "txt_role",
      label: "Role",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextField",
      error: false,
    },
    {
      name: "txt_details",
      label: "Details",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "TextArea",
      error: false,
    },
    {
      name: "switch_active_btn",
      label: "active",
      defaultValue: false,
      required: false,
      data_type: "string",
      html_element: "switch",
      error: false,
    },
  ],
};

const RolePage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [roles, setAllRoles] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [addRole, setAddRole] = React.useState({
    edit: false,
    role_id: "",
    switch_active_btn: false,
    txt_role: "",
    txt_details: "",
  });

  const [error, setError] = React.useState({
    txt_role: false,
  });

  React.useEffect(() => {
    setLoading(true);
    getAllRole(
      (roles) => {
        setAllRoles(roles);
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
    setAddRole((prv) => ({ ...prv, [e.target.name]: e.target.checked }));
  };
//ROLE
  const headerData = [
    {
      id: "rolee_id",
      label: "#",
    },
    {
      id: "role_role",
      label: "Role",
    },
    {
      id: "role_details",
      label: "Details",
    },
    {
      id: "role_status",
      label: "Status",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    {
      id: "role_action",
      label: "Action",
      align: "right",
    },
  ];
  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (!addRole.txt_role) {
      setError({
        txt_role: !addRole.txt_role,
      });
    } else {
      if (addRole.edit) {
        updateRole(
          addRole,
          (r) => {
            onCloseModel();
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Role Updated Successfully",
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
        postRole(
          addRole,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Role added Successfully",
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
  const onDeleteRole = (row, next) => {
    deleteRole(
      row.role_id,
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
  const onChange = (e) => {
    const { value, name } = e.target;
    setAddRole({ ...addRole, [name]: value });
  };

  // on Edit called
  const onUpdateRole = (row) => {
    setClassicModal(true);
    setAddRole({
      ...addRole,
      edit: true,
      switch_active_btn: row.role_status === "Y" ? true : false,
      role_id: row.role_id,
      txt_role: row.role_role,
      txt_details: row.role_details,
    });
  };

  const classes = useStyles();
  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({ txt_role: false });
    setAddRole({
      edit: false,
      switch_active_btn: false,
      txt_role: "",
      txt_details: "",
    });
  };


         // export to excel

const onhandleExportToExcel = () => {
  const RolesTable = roles.map(acc => {
    return {
      ID: acc.rolee_id,
      Role: acc.role_role,
     
      Details:acc.role_details,
      
      Status: acc.role_status,
      Action:"",
      
    }
  })
  
 
  
  const fileName= 'Roles '
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const ws = XLSX.utils.json_to_sheet(RolesTable);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + fileExtension);
}

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Setting > Role"
        btnToolTip="Add New Role"
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
                // btnDisabled={!addBrand.brand}
                height="auto"
                modelName="Add a Role"
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
                                <Autocomplete
                                  id="combo-box-demo"
                                  options={item.options}
                                  getOptionLabel={(option) => option.label}
                                  renderInput={(params) => (
                                    <TextField
                                      onChange={onChange}
                                      // value={addCategory.parentCategory}
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
                                  error={error.txt_role}
                                  FormHelperTextProps={{
                                    style: { textAlign: "right" },
                                  }}
                                  helperText={
                                    error.txt_role ? "Role is required" : ""
                                  }
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={addRole[item.name]}
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
                                  style={{ marginBottom: -10 }}
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={addRole[item.name]}
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
                                  checked={addRole[item.name]}
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
                  <h4 className={classes1.headerCdTitle}>Role</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer",display: "none" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(roles)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(roles)} >
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
                onClickEdit={onUpdateRole}
                onClickDelete={onDeleteRole}
                columns={headerData}
                rows={roles}
              />
             </CardBody>
              </Card>
          )}
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default RolePage;
