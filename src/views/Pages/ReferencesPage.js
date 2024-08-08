import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../Components/MasterModel";
import { CustomCard } from "../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../Components/CustomButton";
//SERVICE 
import {
  getAllReference,
  postReferences,
  updateReferences,
  deleteReferences,
} from "../../services/referencesService";
//SERVICE 
import {getListGroup} from "../../services/settingGroupService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input , Box} from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import { InputAdornment, IconButton, OutlinedInput } from "@material-ui/core";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useStateValue } from "../../context/context";
import { actionTypes } from "../../context/reducer";
import theme from "../../theme/theme";
import ReactSelect from "react-select";
import React from "react";
import {
  appLabelFont,
  appFontWeight,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  reactSelectStyles
} from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import PageTitle from "./HelperComponent/PageTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import  FileSaver from 'file-saver';
import XLSX from 'xlsx'
const ExcelJS = require('exceljs');


const useStyles1 = makeStyles(styles)

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
  helperText: {
    textAlign: "right",
  },
  customSelect: {
    marginBottom:15,
  }
}));



const AddBrandPage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [allGroup, setAllGroup] = React.useState([]);
  const classes = useStyles();
  const [references, setAllReference] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [addReference, setAddReference] = React.useState({
    edit: false,
    reference_id: "",
    switch_active_status: true,
    txt_name: "",
    txt_mobile: "",
    txt_whatsapp: "",
    txt_email: "",
    txt_note: "",
  });

  // for Error handler state
  const [error, setError] = React.useState({
    txt_name: false,
    txt_mobile: false,
  });
  const fetchData = () => {
    setLoading(true);
    getListGroup(
      (r) => {
        setAllGroup(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    getAllReference(
      (references) => {
        setAllReference(references);
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
  };
  React.useEffect(() => {
    fetchData()
  }, [refresh]);

  const onSetActive = (e) => {
    setAddReference((prv) => ({
      ...prv,
      switch_active_status: e.target.checked,
    }));
  };

  const headerData = [
    {
      id: "ref_id",
      label: "#",
      align: "left",
    },
    {
      id: "ref_name",
      label: "Name",
      align: "left",
    },
    {
      id: "ref_mobile",
      label: "Mobile",
      align: "left",
    },
    {
      id: "ref_whatsapp",
      label: "WhatsApp ",
      align: "left",
    },

    {
      id: "ref_email",
      label: "Email",
      align: "left",
    },
    {
      id: "ref_status",
      label: "Status",
      align: "center",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    {
      id: "ref_action",
      label: "Action",
      align: "right",
    },
  ];
  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (!addReference.txt_name || !addReference.txt_mobile) {
      setError({
        ...error,
        txt_name: !addReference.txt_name,
        txt_mobile: !addReference.txt_mobile,
      });
    } else {
      if (addReference.edit) {
        updateReferences(
          addReference,
          (r) => {
            onCloseModel();
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "References Updated Successfully",
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
        postReferences(
          addReference,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "References added Successfully",
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
  const onDeleteReference = (row, next) => {
    deleteReferences(
      row.reference_id,
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
  const onEditReferecnce = (row) => {
    setClassicModal(true);
    setAddReference({
      ...addReference,
      edit: true,
      reference_id: row.reference_id,
      switch_active_status: row.status === "Y" ? true : false,
      txt_name: row.ref_name,
      txt_mobile: row.ref_mobile,
      txt_whatsapp: row.ref_whatsapp,
      txt_email: row.ref_email,
      txt_note: row.ref_note,
    });
  };

  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({ txt_name: false, txt_mobile: false });
    setAddReference({
      ...addReference,
      edit: false,
      switch_active_status: false,
      txt_name: "",
      txt_mobile: "",
      txt_whatsapp: "",
      txt_email: "",
      txt_note: "",
    });
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    setAddReference({ ...addReference, [name]: value });
  };

  const formData = {
    formName: "Add a References",
    fields: [
      {
        name: "ddl_group",
        label: "Group",
        placeholder: "Select Group",
        hidden: false,
        required: false,
        data_type: "string",
        html_element: "select",
        error: false,
        options: allGroup,
      },
      {
        name: "txt_name",
        label: "Name",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "TextField",
        error: false,
      },
  
      {
        name: "txt_mobile",
        label: "Mobile",
        hidden: false,
        required: true,
        type: "mobile",
        data_type: "number",
        html_element: "TextField",
        error: false,
      },
      {
        name: "txt_whatsapp",
        label: "Whatsapp",
        hidden: false,
        required: false,
        type: "mobile",
        data_type: "number",
        html_element: "TextField",
        error: false,
      },
      {
        name: "txt_email",
        label: "Email",
        hidden: false,
        required: false,
        type: "email",
        data_type: "email",
        html_element: "TextField",
        error: false,
      },
      {
        name: "txt_note",
        label: "Note",
        hidden: false,
        required: false,
        type: "mobile",
        data_type: "string",
        html_element: "TextField",
        error: false,
      },
  
      {
        name: "switch_active_status",
        label: "Active Status",
        defaultValue: false,
        required: true,
        data_type: "string",
        html_element: "switch",
        error: false,
      },
    ],
  };


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : References List ']);
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
      'Name',
      'Mobile',
      'Whatsapp',
      'Email',            
      'Status',
      
    
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const ReferencesTable = references.map((acc) => {
      return {
        ID: acc.ref_id,
        Name: acc.ref_name,
        Mobile: acc.ref_mobile,
        Whatsapp:acc.ref_whatsapp,
        Email:acc.ref_email,         
        Status: acc.ref_status,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    ReferencesTable.forEach((data) => {
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
    saveAs(data, 'References List.xlsx');
  };




  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > References"
        btnToolTip="Add New References"
        onClickAddBtn={() => setClassicModal(true)}
      />
      <>
        <GridContainer className={classes.root}>
          <MasterModel
            classicModal={classicModal}
            onCloseModel={onCloseModel}
            width={450}
            height="auto"
            // modelName="Add an References"
            okBtnText="Submit"
            modelName={addReference.edit ? "Edit Reference" : "Add Reference"}
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
                            <ReactSelect
                                  options={allGroup}
                                  placeholder="Select"
                                  formatGroupLabel={(d) => d.label}
                                  // menuPortalTarget={document.body}
                                  styles={reactSelectStyles}
                                  className={classes.customSelect}
                                  // onChange={(v) => onSelect("ddl_brand_id", v)}
                                  // value={{
                                  //   label: addSearch.ddl_brand_label,
                                  //   value: addSearch.ddl_brand_id,
                                  // }}
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
                              type={item.data_type}
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
                              value={addReference[item.name]}
                              variant="outlined"
                            />
                          </>
                        )}
                        {/* {item.html_element === "password" && (
                          <>
                            <InputLabel id="label">{item.label}</InputLabel>
                            <TextField
                              size="small"
                              placeholder={item.label}
                              name={item.name}
                              type={showPassword ? "text" : "password"}
                              onChange={onChange}
                              InputProps={{
                                // <-- This is where the toggle button is added.
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              id="outlined-basic"
                              fullWidth={true}
                              value={addBrand[item.name]}
                              variant="outlined"
                            />
                          </>
                        )} */}
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
                              value={addReference[item.name]}
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
                              checked={addReference[item.name]}
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
                  <h4 className={classes1.headerCdTitle}>References</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer",display: "none"  }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(references)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(<GridItem style={{ cursor: "pointer" }}>
                <IconButton variant="text" onClick={() => onhandleExportToExcel(references)} >
                  <Tooltip title="Export to Excel">
                    <img src={require("../../assets/img/excel.png").default} />
                  </Tooltip>
                </IconButton>
              </GridItem>)}
              </GridContainer>
            </CardHeader>
            <CardBody
              style={{ height: "auto", maxHeight: 480, padding: 10 }}
              className={clxs(classes.customScroolBar)}
            >
              <MuiTable
                onClickEdit={onEditReferecnce}
                onClickDelete={onDeleteReference}
                columns={headerData}
                rows={references}
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

export default AddBrandPage;
