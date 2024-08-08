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
  getAllSource,
  postSource,
  deleteSource,
  updateSource,
} from "../../../services/sourceService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input ,Box} from "@material-ui/core";
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
  formName: "Add a Source",
  fields: [
    {
      name: "txt_source",
      label: "Source",
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

const SourcePage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [sources, setAllSources] = React.useState([]);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [addSource, setAddSource] = React.useState({
    edit: false,
    source_id: "",
    switch_active_btn: false,
    txt_source: "",
    txt_details: "",
  });

  const [error, setError] = React.useState({
    txt_source: false,
  });

  React.useEffect(() => {
    setLoading(true);
    getAllSource(
      (sources) => {
        setAllSources(sources);
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
    setAddSource((prv) => ({ ...prv, [e.target.name]: e.target.checked }));
  };

  const headerData = [
    {
      id: "sou_id",
      label: "#",
    },
    {
      id: "sou_source",
      label: "Source",
    },
    {
      id: "sou_details",
      label: "Details",
    },
    {
      id: "sou_status",
      label: "Status",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    {
      id: "sou_action",
      label: "Action",
      align: "right",
    },
  ];
  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (!addSource.txt_source) {
      setError({
        txt_source: !addSource.txt_source,
      });
    } else {
      if (addSource.edit) {
        updateSource(
          addSource,
          (r) => {
            onCloseModel();
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Source Updated Successfully",
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
        postSource(
          addSource,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Source added Successfully",
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
  const onDeleteSource = (row, next) => {
    deleteSource(
      row.source_id,
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
    setAddSource({ ...addSource, [name]: value });
  };

  // on Edit called
  const onUpdateSource = (row) => {
    setClassicModal(true);
    setAddSource({
      ...addSource,
      edit: true,
      switch_active_btn: row.sou_status === "Y" ? true : false,
      source_id: row.source_id,
      txt_source: row.sou_source,
      txt_details: row.sou_details,
    });
  };

  const classes = useStyles();
  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({ txt_source: false });
    setAddSource({
      edit: false,
      switch_active_btn: false,
      txt_source: "",
      txt_details: "",
    });
  };

         // export to excel

const onhandleExportToExcel = () => {
  const SourcesTable = sources.map(acc => {
    return {
      ID: acc.sou_id,
      Source: acc.sou_source,
     
      Details:acc.sou_details,
      
      Status: acc.sou_status,
      Action:"",
      
    }
  })
  
 
  
  const fileName= 'Sources'
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const ws = XLSX.utils.json_to_sheet(SourcesTable);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + fileExtension);
}


  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Setting > Source"
        btnToolTip="Add New Source"
        onClickAddBtn={() => setClassicModal(true)}
      />

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <GridContainer
            alignItems="center"
            justifyContent="space-between"
          ></GridContainer>
        </GridItem>
        <GridItem xs="12">
          <GridContainer justify="space-between" alignItems="center">
            <GridItem>
              <MasterModel
                classicModal={classicModal}
                onCloseModel={onCloseModel}
                width={450}
                // btnDisabled={!addBrand.brand}
                height="auto"
                modelName="Add a Source"
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
                                  error={error.txt_source}
                                  FormHelperTextProps={{
                                    style: { textAlign: "right" },
                                  }}
                                  helperText={
                                    error.txt_source ? "Source is required" : ""
                                  }
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={addSource[item.name]}
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
                                  value={addSource[item.name]}
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
                                  checked={addSource[item.name]}
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
                  <h4 className={classes1.headerCdTitle}>Sources</h4>
                </GridItem>
                <GridItem style={{ cursor: "pointer" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(sources)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody
              style={{ height: "auto", maxHeight: 480, padding: 10 }}
              className={clxs(classes.customScroolBar)}
            >
            <MuiTable
              onClickEdit={onUpdateSource}
              onClickDelete={onDeleteSource}
              columns={headerData}
              rows={sources}
            />
          </CardBody>
              </Card>
          )}
          
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default SourcePage;
