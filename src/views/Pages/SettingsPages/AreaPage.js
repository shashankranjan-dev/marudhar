import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
// import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
// import {
   
//     postArea,
  
//   } from "../../../services/areaService";

import {
  updateArea,
  postArea,
  getAllArea,
  deleteArea
} from "../../../services/areaService";
import { getAllModule } from "../../../services/modulesService";
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

const AreaPage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const [modules, setAllModules] = React.useState([]);
  const [classicModal, setClassicModal] = React.useState(false);
  const [area, setAllArea] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [addArea, setaddArea] = React.useState({
    edit: false,
    area_id:"",
    txt_area: "",
 
    switch_active_status: true,

  });
  const [error, setError] = React.useState({
    txt_area: false,

  });

  const formData = {
    formName: "Add a Area",
    fields: [
        {
        name: "txt_area",
        label: "Area",
        placeholder: "Area",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "TextField",
        error: false,
        options: modules,
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
    getAllArea(
      (area) => {
        setAllArea(area);
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
    setaddArea((prv) => ({ ...prv, [e.target.name]: e.target.checked }));
  };

  const headerData = [
    {
      id: "id",
      label: "#",
    },
    {
      id: "area",
      label: "Area",

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
    if (!addArea.txt_area) {
      setError({
        txt_area: !addArea.txt_area,
        txt_contact_no: !addArea.txt_contact_no,
        txt_contact_person: !addArea.txt_contact_person

      });
    } else {
      if (addArea.edit) {
        updateArea(
          addArea,
          (r) => {
            onCloseModel();
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "area Updated Successfully",
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
        postArea(
          addArea,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Area added Successfully",
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
  const onDeleteArea = (row, next) => {
    deleteArea(
      row.area_id,
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
  const onUpdateArea = (row) => {
    setClassicModal(true);
    setaddArea({
      ...addArea,
      edit: true,
      switch_active_status: row.status === "Y" ? true : false,
      area_id: row.area_id,
      txt_area:row.area,
    });
  };

  const onSelectModule = (v) => {
    if (v !== null) {
      setaddArea({
        ...addArea,
        ddl_modules_id: v.value,
        ddl_modules_label: v.label,
      });
    }
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    setaddArea({ ...addArea, [name]: value });
  };
  const classes = useStyles();
  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({ txt_area: false });
    setaddArea({
      ...addArea,
      edit: false,
      area_id: "",
      switch_active_status: false,
      txt_area: "",


    });
  };


        // export to excel

const onhandleExportToExcel = () => {
  const AreaTable = area.map(acc => {
    return {
      ID: acc.id,
      Area: acc.area,
    
      
      Status: acc.status,
      Action:"",
      
    }
  })
  
 
  
  const fileName= 'Area '
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const ws = XLSX.utils.json_to_sheet(AreaTable);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + fileExtension);
}

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Setting > Area"
        btnToolTip="Add New Area"
        onClickAddBtn={() => setClassicModal(true)}
      />
      <>
        <GridContainer className={classes.root}>
          <MasterModel
            classicModal={classicModal}
            onCloseModel={onCloseModel}
            width={450}
            height="auto"
            okBtnText="Submit"
            modelName={addArea.edit ? "Edit Area" : "Add Area"}
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
                                value: addArea.ddl_modules_id,
                                label: addArea.ddl_modules_label,
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
                              value={addArea[item.name]}
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
                              value={addArea[item.name]}
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
                              checked={addArea[item.name]}
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
                  <h4 className={classes1.headerCdTitle}>Area</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer",display: "none" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(area)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(area)} >
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
                onClickEdit={onUpdateArea}
                onClickDelete={onDeleteArea}
                columns={headerData}
                rows={area}
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

export default AreaPage;
