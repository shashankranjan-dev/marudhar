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
  getAllStatus,
  postStatus,
  deleteStatus,
  updateStatus,
} from "../../../services/addStatusService";
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
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ColorPicker from "material-ui-color-picker";
import ReactSelect from "react-select";
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
  customSelect: {
    marginBottom: 15,
  },
}));

const AddStatusPage = () => {
  const history = useHistory();
  const classes1 = useStyles1()

  const [classicModal, setClassicModal] = React.useState(false);
  const [allStatus, setAllStatus] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [addStatus, setAddStatus] = React.useState({
    edit: false,
    status_id: "",
    txt_status_color: "",
    ddl_status_for: "",
    switch_active_status: false,
    txt_status_name: "",
    txt_details: "",
  });

  const [error, setError] = React.useState({
    txt_status_name: false,
  });

  React.useEffect(() => {
    setLoading(true);
    getAllStatus(
      (r) => {
        setAllStatus(r);
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
    setAddStatus((prv) => ({ ...prv, [e.target.name]: e.target.checked }));
  };

  const onSelect = (name, value) => {
    setAddStatus((prv) => ({ ...prv, [name]: value }));
  };
  const headerData = [
    {
      id: "status_serial_id",
      label: "#",
    },
    {
      id: "status_for",
      label: "Status For",
    },
    {
      id: "status_name",
      label: "Status",
    },
    {
      id: "status_color",
      label: "Color",
      statusColorIcon: (v) => v,
    },
    {
      id: "status_details",
      label: "Details",
    },
    {
      id: "status_status",
      label: "Active Status",
      statusBtn: (v) => (v === "Y" ? true : false),
      align: "center",
    },
    {
      id: "status_action",
      label: "Action",
      align: "right",
    },
  ];
  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (!addStatus.txt_status_name) {
      setError({
        txt_status_name: !addStatus.txt_status_name,
      });
    } else {
      if (addStatus.edit) {
        updateStatus(
          addStatus,
          (r) => {
            onCloseModel();
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Status Updated Successfully",
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
        postStatus(
          addStatus,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Status added Successfully",
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
  const onDeleteStatus = (row, next) => {
    deleteStatus(
      row.status_id,
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
    setAddStatus({ ...addStatus, [name]: value });
  };
  const onPickColor = (color) => {
    setAddStatus({ ...addStatus, txt_status_color: color });
  };

  // on Edit called
  const onUpdateStatus = (row) => {
    setClassicModal(true);
    setAddStatus({
      ...addStatus,
      edit: true,
      status_id: row.status_id,
      ddl_status_for: { value: row.status_for, label: row.status_for },
      txt_status_color: row.status_color,
      switch_active_status: row.status_status === "Y" ? true : false,
      txt_status_name: row.status_name,
      txt_details: row.status_details,
    });
  };

  const classes = useStyles();
  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({ txt_status_name: false });
    setAddStatus({
      edit: false,
      ddl_status_for: "",
      txt_status_color: "",
      ddl_status_for: "",
      switch_active_status: false,
      txt_status_name: "",
      txt_details: "",
    });
  };

  const formData = {
    formName: "Add a Status",
    fields: [
      {
        name: "ddl_status_for",
        label: " Status For",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "select_two",
        
        options: [
          { value: "Sales-Enquiry", label: "Sales-Enquiry" },
          { value: "Sales-Quotation", label: "Sales-Quotation" },
          { value: "Sales-Order", label: "Sales-Order" },
          { value: "Delivery-Order", label: "Delivery-Order" },
          { value: "Dispatch", label: "Dispatch" },
          { value: "Invoice", label: "Invoice" },
        ],
        error: false,
      },
      {
        name: "txt_status_name",
        label: " Status",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "TextField",
        error: false,
      },
      {
        name: "txt_status_color",
        label: "Choose Color",
        hidden: false,
        required: true,
        data_type: "color",
        html_element: "color_picker",
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
        name: "switch_active_status",
        label: "active",
        defaultValue: false,
        required: false,
        data_type: "string",
        html_element: "switch",
        error: false,
      },
    ],
  };


         // export to excel

const onhandleExportToExcel = () => {
  const StatusTable = allStatus.map(acc => {
    return {
      ID: acc.status_serial_id,
      status_for: acc.status_for,
      status_name: acc.status_name,
      status_color:acc.status_color,
     
      Details:acc.status_details,
      
      Status: acc.status_status,
      Action:"",
      
    }
  })
  
 
  
  const fileName= 'Status '
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const ws = XLSX.utils.json_to_sheet(StatusTable);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + fileExtension);
}

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Setting > Status"
        btnToolTip="Add New Status"
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
                okBtnText="Submit"
                modelName="Add a Status"
                onClickOk={onSubmitModel}
                disabled={buttonDisabled}
              >
                <div style={{ padding: "20px 10px", width: "100%" }}>
                  <GridContainer>
                    {formData.fields.map((item, key) => {
                      return (
                        <>
                          <GridItem xs={12} key={key}>
                            {item.html_element === "select_two" && (
                              <>
                                <InputLabel required={item.required} id="label">
                                  {item.label}
                                </InputLabel>
                                <ReactSelect
                                  name={item.name}
                                  options={item.options}
                                  formatGroupLabel={(d) => d.label}
                                  styles={reactSelectStyles}
                                  className={
                                    item.marginBottom !== 0 &&
                                    classes.customSelect
                                  }
                                  onChange={(v, info) => onSelect(info.name, v)}
                                  value={addStatus[item.name]}
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
                                  required={item.required}
                                  placeholder={item.label}
                                  name={item.name}
                                  onChange={onChange}
                                  error={error.txt_status_name}
                                  FormHelperTextProps={{
                                    style: { textAlign: "right" },
                                  }}
                                  helperText={
                                    error.txt_status_name
                                      ? "Status is required"
                                      : ""
                                  }
                                  id="outlined-basic"
                                  fullWidth={true}
                                  variant="outlined"
                                  value={addStatus[item.name]}
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
                                  value={addStatus[item.name]}
                                  variant="outlined"
                                />
                              </>
                            )}
                            {item.html_element === "color_picker" && (
                              <>
                                <InputLabel id="label">{item.label}</InputLabel>
                                <ColorPicker
                                  size="small"
                                  name={item.name}
                                  style={{ overflow: "hidden" }}
                                  inputProps={{
                                    overflow: "hidden",
                                    style: {
                                      borderRadius: "4px",
                                      background: addStatus.txt_status_color,
                                    },
                                  }}
                                  placeholder={item.label}
                                  fullWidth={true}
                                  variant="outlined"
                                  onChange={onPickColor}
                                  value={addStatus.txt_status_color}
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
                                  checked={addStatus[item.name]}
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
                  <h4 className={classes1.headerCdTitle}>Status</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer",display: "none"  }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allStatus)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allStatus)} >
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
                onClickEdit={onUpdateStatus}
                onClickDelete={onDeleteStatus}
                columns={headerData}
                rows={allStatus}
              />
            </CardBody>
              </Card>
          )}
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default AddStatusPage;
