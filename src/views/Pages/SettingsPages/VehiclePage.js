import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
// import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import {
  updateVehicle,
  postVehicles,
  getAllVehicle,
  deleteVehicle
} from "../../../services/vehicleService";
import { getAllModule } from "../../../services/modulesService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input,Box,Paper } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import theme from "../../../theme/theme";
import { Autocomplete } from "@material-ui/lab";
import Select from "react-select";

import React from "react";
import PageTitle from "../HelperComponent/PageTitle";
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
const ExcelJS = require('exceljs');


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
  customSelect: {
    marginBottom: 15,
  },
  
}));

const VehiclePage = () => {
  const classes1 = useStyles1()
  const history = useHistory();
  const [modules, setAllModules] = React.useState([]);
  const [classicModal, setClassicModal] = React.useState(false);
  const [vehicle, setAllVehicle] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [addVehicle, setAddVehicle] = React.useState({
    edit: false,
    vehicle_id:"",
    txt_keyword_pharse:"",
    txt_vehicle: "",
    txt_details: "",
    txt_contact_person: "",
    txt_contact_no: "",
    ddl_vehicle_type: "",
    ddl_vehicle_type_label: "Select Vehicle",
    switch_active_status: true,

  });
  const [error, setError] = React.useState({
    txt_vehicle: false,
    txt_contact_person: false,
    txt_contact_no: false,
  });
  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddVehicle((prv) => ({ ...prv, [name]: value }));
  };
  const formData = {
    formName: "Add a Vehicle",
    fields: [
      // {
      //   name: "ddl_vehicle_type",
      //   label: "Vehicle type",
      //   placeholder: "Select Vehicle",
      //   hidden: false,
      //   required: false,
      //   data_type: "string",
      //   html_element: "select",
      //   error: false,
      //   options: modules,
      // },
      {
        name: "ddl_vehicle_type",
        label: "Vehicle type",
        placeholder: "Select Vehicle",
        hidden: false,
        required: false,
        data_type: "string",
        html_element: "TextField",
        error: false,
        options: modules,
      },
      {
        name: "txt_vehicle",
        label: "Vehicle No",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "TextField",
        error: false,
      },
      {
        name: "txt_contact_person",
        label: "Contact Person",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "TextField",
        error: false,
      },
      {
        name: "txt_contact_no",
        label: "Contact No",
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
        name: "switch_active_status",
        label: "Active Status",
        defaultValue: false,
        required: false,
        data_type: "string",
        html_element: "switch",
        error: false,
      },
    ],
  };

  React.useEffect(() => {
    setLoading(true);
    // get All Module
    getAllModule(
      (r) => {
        let arr = [{ value: 0, label:"Select"}];
        r.map((m, i) => {
          arr.push({ value: m.module_id, label: m.mod_modules });
        });
        setAllModules(arr);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    // get All terms
    getAllVehicle(
      (vehicle) => {
        setAllVehicle(vehicle);
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
    setAddVehicle((prv) => ({ ...prv, [e.target.name]: e.target.checked }));
  };

  const headerData = [
    {
      id: "id",
      label: "#",
    },
    {
      id: "vehicle_type",
      label: "Vehicle Type",

    },
    {
      id: "vehicle_no",
      label: "Vehicle No",
    },
    {
        id: "contact_person",
        label: "Contact Person",
      },
      {
        id: "contact_no",
        label: "Contact No",
      },
     
    {
      id: "details",
      label: "Details",
    },
    {
      id: "status",
      label: "Status",
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
    if (!addVehicle.txt_vehicle) {
      setError({
        txt_vehicle: !addVehicle.txt_vehicle,
        txt_contact_no: !addVehicle.txt_contact_no,
        txt_contact_person: !addVehicle.txt_contact_person

      });
    } else {
      if (addVehicle.edit) {
        updateVehicle(
          addVehicle,
          (r) => {
            onCloseModel();
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Vehicle Updated Successfully",
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
        postVehicles(
          addVehicle,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Vehicle added Successfully",
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
  const onDeleteVehicle = (row, next) => {
    deleteVehicle(
      row.vehicle_id,
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
  const onUpdateVehicle = (row) => {
    setClassicModal(true);
    setAddVehicle({
      ...addVehicle,
      edit: true,
      switch_active_status: row.status === "Y" ? true : false,
      vehicle_id: row.vehicle_id,
      txt_contact_person: row.contact_person,
      txt_vehicle: row.vehicle_no,
      txt_details: row.details,
      txt_contact_no:row.contact_no,
      ddl_vehicle_type:row.vehicle_type,
    });
  };

  const onSelectModule = (v) => {
    if (v !== null) {
      setAddVehicle({
        ...addVehicle,
        ddl_modules_id: v.value,
        ddl_modules_label: v.label,
      });
    }
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    setAddVehicle({ ...addVehicle, [name]: value });
  };
  const classes = useStyles();
  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({ txt_vehicle: false });
    setAddVehicle({
      ...addVehicle,
      edit: false,
      vehicle_id: "",
      switch_active_status: false,
      txt_vehicle: "",
      ddl_vehicle_type: "",
      txt_contact_person: "",
      txt_contact_no: "",
      txt_details: "",
      // ddl_modules_id: 0,
      // ddl_modules_label: "Select Module",
    });
  };
  const onSearchVehicle = (e) => {
    e.preventDefault();
    setLoading(true);
    if(addVehicle.txt_keyword_pharse)
      {
    getAllVehicle(
      (vehicle) => {
        if (vehicle.length) {     
          setAllVehicle(vehicle);
          setLoading(false);
        } else {
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Customer not found": "info" },
          });
        }
      },
      (err) => {
        // change by sankha
        setAllVehicle([])
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      addVehicle
    );
      }
  };

  const onClickRefresh = () => {
    setRefresh(!refresh);
    setAddVehicle({
      txt_keyword_pharse: "",
      ddl_group_id: "",
    });
  };

  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Vehicle List ']);
    const periodRow = worksheet.addRow(['']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:G${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:G${periodRow.number}`);
  
    const headers = [
      'Sl No',
      'Vehicle Type',
      'Vehicle No',
      'Contact Person',
      'Contact No',
      'Details',      
      'Status',
      
    
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const VehicleTable = vehicle.map((acc) => {
      return {
        ID: acc.id,
        Vehicle_type: acc.vehicle_type,
        Vehicle_no: acc.vehicle_no,
        Contact_person:acc.contact_person,
        Contact_no:acc.contact_no,
        Details:acc.details,        
        Status: acc.status,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    VehicleTable.forEach((data) => {
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
    saveAs(data, 'Vehicle List.xlsx');
  };

  

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Setting > Vehicle"
        btnToolTip="Add New Vehicle"
        onClickAddBtn={() => setClassicModal(true)}
      />
      <>
        <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Vehicle">
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="flex-start" alignItems="flex-end">
             
                <GridItem xs="6">
                  <InputLabel id="label">Keyword / Phrase</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Keyword / Phrase"
                    style={{ marginBottom: -15 }}
                    type="search"
                    name="txt_keyword_pharse"
                    onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    value={addVehicle.txt_keyword_pharse}
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs="6">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CustomButton
                      name="btn_refres"
                      style={{ marginRight: "10px" }}
             
                      onClick={onSearchVehicle}  

                    >
                      <SearchIcon />
                    </CustomButton>
                    <CustomButton name="btn_refres"
                    onClick={onClickRefresh} >
                      <RotateLeftIcon />
                    </CustomButton>
                  </div>
                </GridItem>
              </GridContainer>
            </Paper>
          </CustomCard>
        </GridItem>
        
          <MasterModel
            classicModal={classicModal}
            onCloseModel={onCloseModel}
            width={450}
            height="auto"
            okBtnText="Submit"
            modelName={addVehicle.edit ? "Edit Vehicle" : "Add Vehicle"}
            onClickOk={onSubmitModel}
            disabled={buttonDisabled}
          >
            <GridContainer>
              <div style={{ padding: "20px 10px", width: "100%" }}>
                {formData.fields.map((item, key) => {
                  return (
                    <>
                      <GridItem xs={12} key={key}>
                        {item.html_element === "select" && (
                          <>
                            <InputLabel id="label">{item.label}</InputLabel>
                            <Select
                              options={item.options}
                              placeholder="Select Module"
                              formatGroupLabel={(d) => d.label}
                              // menuPortalTarget={document.body}
                              className={classes.customSelect}
                              onChange={onSelectModule}
                              value={{
                                value: addVehicle.ddl_modules_id,
                                label: addVehicle.ddl_modules_label,
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
                              id="outlined-basic"
                              error={error[item.name]}
                              FormHelperTextProps={{
                                style: { textAlign: "right" },
                              }}
                              helperText={
                                error[item.name]
                                  ? item.label + "  is required"
                                  : ""
                              }
                              fullWidth={true}
                              value={addVehicle[item.name]}
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
                              style={{ marginBottom: -10 }}
                              rows={5}
                              id="outlined-basic"
                              fullWidth={true}
                              value={addVehicle[item.name]}
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
                              checked={addVehicle[item.name]}
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
              </div>
            </GridContainer>
          </MasterModel>

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
                  <h4 className={classes1.headerCdTitle}>Vehicles</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer",display: "none"  }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(vehicle)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(vehicle)} >
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
                onClickEdit={onUpdateVehicle}
                onClickDelete={onDeleteVehicle}
                columns={headerData}
                rows={vehicle}
              />
           </CardBody>
              </Card>
          )}
           
          </GridItem>
        </GridContainer>
      </>
    </ThemeProvider>
  );
};

export default VehiclePage;
