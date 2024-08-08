import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton from "../../Components/CustomButton";
import {
  getAllUom,
  postUOM,
  updateUOM,
  deleteUOM,
} from "../../../services/uomService";
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
const ExcelJS = require('exceljs');


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
  modelForm: {
    padding: "15px 10px",
  },
  input: {
    height: 40,
    lineLight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
}));

const UnitMesurementPage = () => {
  const classes1 = useStyles1()

  const classes = useStyles();
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allUoms, setAllUoms] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [addUnit, setAddUnit] = React.useState({
    edit: false,
    switch_active_btn: false,
    uom_id: "",
    txt_higher_caption: "",
    txt_lower_caption:"",
    txt_higher_unit: "",
    txt_higher_value: "",
    txt_lower_unit: "",
    txt_lower_value: "",
  });

  // for Error handler state
  const [error, setError] = React.useState({
    txt_higher_caption: false,
    txt_lower_caption:false,
    txt_higher_unit: false,
    txt_higher_value: false,
    txt_lower_unit: false,
    txt_lower_value: false,
  });

  React.useEffect(() => {
    setLoading(true);
    getAllUom(
      (r) => {
        setAllUoms(r);
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
    setAddUnit((prv) => ({ ...prv, switch_active_btn: e.target.checked }));
  };

  const headerData = [
    {
      id: "id",
      label: "#",
      align: "left",
    },

    {
      id: "higherUnit",
      label: "Higher Unit",
      align: "left",
    },

    {
      id: "higherValue",
      label: "Higher Value",
      align: "right",
    },
    {
      id: "caption",
      label: "Higher Caption",
      align: "left",
    },
    {
      id: "lowerUnit",
      label: "Lower Unit",
      align: "left",
    },
    {
      id: "lowerValue",
      label: "Lower Value",
      align: "right",
    },
 
    {
      id: "lowerCaption",
      label: "Lower Caption",
      align: "left",
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
  //console.log(addUnit,"3030");

  const onSubmitModel = (e) => {
    e.preventDefault();
    if (
      !addUnit.txt_higher_unit ||
      !addUnit.txt_higher_value ||
      !addUnit.txt_lower_unit ||
      !addUnit.txt_lower_value ||
      !addUnit.txt_higher_caption ||
      !addUnit.txt_lower_caption
    ) {
      setError({
        ...error,
        txt_higher_caption: !addUnit.txt_higher_caption,
        txt_lower_caption:!addUnit.txt_lower_caption,
        txt_higher_unit: !addUnit.txt_higher_unit,
        txt_higher_value: !addUnit.txt_higher_value,
        txt_lower_unit: !addUnit.txt_lower_unit,
        txt_lower_value: !addUnit.txt_lower_value,
      });
    } else {
      if (addUnit.edit) {
        updateUOM(
          addUnit,
          (r) => {
            onCloseModel();
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "UOM Updated Successfully",
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
        postUOM(
          addUnit,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "UOM added Successfully",
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
  const onDeleteUOM = (row, next) => {
    deleteUOM(
      row.uom_id,
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
  const onUpdateUOM = (row) => {
    //console.log(row,"30303")
    setClassicModal(true);
    setAddUnit({
      ...addUnit,
      edit: true,
      switch_active_btn: row.status === "Y" ? true : false,
      uom_id: row.uom_id,
      txt_higher_caption: row.caption,
      txt_lower_caption:row.lowerCaption,
      txt_higher_unit: row.higherUnit,
      txt_higher_value: row.higherValue,
      txt_lower_unit: row.lowerUnit,
      txt_lower_value: row.lowerValue,
    });
  };

  // on Change Field
  const onChange = (e) => {
    const { value, name } = e.target;
    setAddUnit({ ...addUnit, [name]: value });
  };

  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({});
    setAddUnit({
      edit: false,
      switch_active_btn: false,
      uom_id: "",
      txt_higher_caption: "",
      txt_lower_caption:"",
      txt_higher_unit: "",
      txt_higher_value: "",
      txt_lower_unit: "",
      txt_lower_value: "",
    });
  };


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Uom List']);
    const periodRow = worksheet.addRow(['']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:H${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:H${periodRow.number}`);
  
    const headers = [
      'Sl No',
      'Higher Unit',        
      'Higher Value',        
      'Higher Caption',
      'Lower Unit',
      'Lower Value',
      'Lower Caption',
      'Status',

    
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const UOMTable = allUoms.map((cat) => {
      return {
        ID: cat.id,
        higherUnit: cat.higherUnit,
        higherValue: cat.higherValue,
        highercaption:cat.caption,
        lowerUnit:cat.lowerUnit,
        lowerValue:cat.lowerValue,
        lowerCaption: cat.lowerCaption,
        status:cat.status,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    UOMTable.forEach((data) => {
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
    saveAs(data, 'Uom List.xlsx');
  };  






  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Item Details > UOM"
        btnToolTip="Add New Unit Measurement"
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
                // modelName="Add Unit Measurement"
                okBtnText="Submit"
                modelName={addUnit.edit ? "Edit UOM" : "Add UOM"}
                onClickOk={onSubmitModel}
                disabled={buttonDisabled}

              >
                <GridContainer className={classes.modelForm}>
                  <GridItem xs={8}>
                    <InputLabel required id="label">
                      Higher Unit
                    </InputLabel>
                    <TextField
                      required
                      autoComplete={false}
                      size="small"
                      placeholder="Higher Unit"
                      name="txt_higher_unit"
                      onChange={onChange}
                      id="outlined-basic"
                      error={error.txt_higher_unit}
                      FormHelperTextProps={{
                        style: { textAlign: "right" },
                      }}
                      helperText={
                        error.txt_higher_unit ? "High Unit is required" : ""
                      }
                      fullWidth={true}
                      value={addUnit.txt_higher_unit}
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={4}>
                    <InputLabel required id="label">
                      Value
                    </InputLabel>
                    <TextField
                      required
                      size="small"
                      autoComplete={false}
                      placeholder="value"
                      type="number"
                      FormHelperTextProps={{
                        style: { textAlign: "right" },
                      }}
                      inputProps={{
                        style: { textAlign: "right" },
                      }}
                      error={error.txt_higher_value}
                      helperText={
                        error.txt_higher_value ? "Value is required" : ""
                      }
                      name="txt_higher_value"
                      onChange={onChange}
                      id="outlined-basic"
                      fullWidth={true}
                      value={addUnit.txt_higher_value}
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={8}>
                    <InputLabel required id="label">
                      Lower Unit
                    </InputLabel>
                    <TextField
                      required
                      size="small"
                      placeholder="Lower Unit"
                      name="txt_lower_unit"
                      FormHelperTextProps={{
                        style: { textAlign: "right" },
                      }}
                      inputProps={{
                        autoComplete: false,
                        style: { textAlign: "left" },
                      }}
                      error={error.txt_lower_unit}
                      helperText={
                        error.txt_lower_unit ? "Lower Unit is required" : ""
                      }
                      onChange={onChange}
                      id="outlined-basic"
                      fullWidth={true}
                      value={addUnit.txt_lower_unit}
                      variant="outlined"
                    />
                  </GridItem>

                  <GridItem xs={4}>
                    <InputLabel required id="label">
                      Value
                    </InputLabel>
                    <TextField
                      required
                      size="small"
                      placeholder="value"
                      type="number"
                      FormHelperTextProps={{
                        style: { textAlign: "right" },
                      }}
                      inputProps={{
                        autoComplete: false,
                        style: { textAlign: "right" },
                      }}
                      error={error.txt_lower_value}
                      helperText={
                        error.txt_lower_value ? " Value is required" : ""
                      }
                      name="txt_lower_value"
                      onChange={onChange}
                      id="outlined-basic"
                      fullWidth={true}
                      value={addUnit.txt_lower_value}
                      variant="outlined"
                    />
                  </GridItem>

                  <GridItem xs={12}>
                    <InputLabel required id="label">
                    Higher  Caption
                    </InputLabel>
                    <TextField
                      required
                      size="small"
                      autoComplete={false}
                      placeholder="Higher Caption"
                      name="txt_higher_caption"
                      FormHelperTextProps={{
                        style: { textAlign: "right" },
                      }}
                      onChange={onChange}
                      error={error.txt_higher_caption}
                      helperText={
                        error.txt_higher_caption ? "Higher Caption is required" : ""
                      }
                      id="outlined-basic"
                      fullWidth={true}
                      value={addUnit.txt_higher_caption}
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12}>
                    <InputLabel required id="label">
                    Lower Caption
                    </InputLabel>
                    <TextField
                      required
                      size="small"
                      autoComplete={false}
                      placeholder="Lower Caption"
                      name="txt_lower_caption"
                      style={{ marginBottom: -15 }}
                      FormHelperTextProps={{
                        style: { textAlign: "right" },
                      }}
                      onChange={onChange}
                      error={error.txt_lower_caption}
                      helperText={
                        error.txt_lower_caption ? "Lower Caption is required" : ""
                      }
                      id="outlined-basic"
                      fullWidth={true}
                      value={addUnit.txt_lower_caption}
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem>
                    <span className={classes.activeText}>Active Status</span>
                    <Switch
                      onClick={onSetActive}
                      checked={addUnit.switch_active_btn}
                      name="switch_active_btn"
                      fullWidth={true}
                      inputProps={{
                        "aria-label": "primary checkbox",
                      }}
                      color="primary"
                    />
                  </GridItem>
                </GridContainer>
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
                  <h4 className={classes1.headerCdTitle}>Unit Measurement</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer",display: "none" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allUoms)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allUoms)} >
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
            {/* <CustomCard cdTitle="Unit Measurement" height={480}> */}
              <MuiTable
                onClickEdit={onUpdateUOM}
                onClickDelete={onDeleteUOM}
                columns={headerData}
                rows={allUoms}
              />
              </CardBody>
              </Card>
            // {/* </CustomCard> */}
          )}
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default UnitMesurementPage;
