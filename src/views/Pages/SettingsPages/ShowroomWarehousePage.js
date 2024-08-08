import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "react-select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import {
  getAllShowroomWarehouse,
  postShowroomsWarehouse,
  updateShowroomsWarehouse,
  deleteShowroomsWarehouse,
} from "../../../services/showroomWarehouseService";
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
import { Autocomplete } from "@material-ui/lab";
import PageTitle from "../HelperComponent/PageTitle";
import theme from "../../../theme/theme";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import React from "react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import clx from "classnames";
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
    marginBottom: 20,
  },
  activeText: {
    ...activeText,
  },
  helperText: {
    textAlign: "right",
  },
  customSelect: {
    marginBottom: 15,
  },
}));

const ShowroomWarehousePage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const classes = useStyles();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [classicModal, setClassicModal] = React.useState(false);
  const [showroomWarehouses, setAllShowroomWarehouses] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    txt_showrooms_warehouse: false,
    ddl_showrooms_warehouse_type: false,
  });
  const [addShowroomWarehouse, setAddShowroomWarehouse] = React.useState({
    edit: false,
    showrooms_warehouse_id: "",
    ddl_showrooms_warehouse_type: "",
    ddl_showrooms_warehouse_type_label: "Select",
    txt_showrooms_warehouse: "",
    txt_gst: "",
    txt_address: "",
    switch_active_status: false,
  });

  const formData = {
    formName: "Add a Showrooms / Warehouse",
    fields: [
      {
        name: "ddl_showrooms_warehouse_type",
        label: "Type",
        hidden: false,
        required: true,
        data_type: "string",
        placeholder: "Select",
        html_element: "select",
        options: [
          {
            label: "Warehouse",
            value: "Warehouse",
          },
          {
            label: "Showroom",
            value: "Showroom",
          },
        ],
        xs: 12,
        md: 12,
        lg: 12,
      },
      {
        name: "txt_showrooms_warehouse",
        label: "Name",
        hidden: false,
        required: true,
        data_type: "string",
        align: "right",
        html_element: "TextField",
        helperText: "Name is Required",
        error: false,
        xs: 12,
        md: 4,
        lg: 5,
      },
      {
        name: "txt_gst",
        label: "GST",
        hidden: false,
        required: true,
        data_type: "number",
        helperText: "Gst is Required",
        align: "right",
        html_element: "TextField",
        error: false,
        xs: 12,
        md: 4,
        lg: 5,
      },

      {
        name: "txt_address",
        label: "Address",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "TextArea",
        helperText: "Address is Required",
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

  React.useEffect(() => {
    setLoading(true);
    getAllShowroomWarehouse(
      (r) => {
        setAllShowroomWarehouses(r);
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
    setAddShowroomWarehouse((prv) => ({
      ...prv,
      [e.target.name]: e.target.checked,
    }));
  };

  const onSelect = (name, v) => {
    switch (name) {
      case "ddl_showrooms_warehouse_type":
        setAddShowroomWarehouse({
          ...addShowroomWarehouse,
          ddl_showrooms_warehouse_type: v.value,
          ddl_showrooms_warehouse_type_label: v.label,
        });
        break;
      default:
        break;
    }
  };

  const headerData = [
    {
      id: "sw_id",
      label: "#",
    },
    {
      id: "sw_type",
      label: "Type",
    },
    {
      id: "sw_name",
      label: "Name",
    },
    {
      id: "sw_gst",
      label: "GST",
      align: "left",
    },
    {
      id: "sw_address",
      label: "Address",
    },
    {
      id: "sw_status",
      label: "Status",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    {
      id: "sw_action",
      label: "Action",
      align: "right",
    },
  ];

  const onChange = (e) => {
    const { value, name } = e.target;
    setAddShowroomWarehouse({ ...addShowroomWarehouse, [name]: value });
  };

  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (
      !addShowroomWarehouse.txt_showrooms_warehouse ||
      !addShowroomWarehouse.ddl_showrooms_warehouse_type
    ) {
      setError({
        ...error,
        txt_showrooms_warehouse: !addShowroomWarehouse.txt_Category,
        ddl_showrooms_warehouse_type: !addShowroomWarehouse.ddl_showrooms_warehouse_type,
      });
    } else {
      if (addShowroomWarehouse.edit) {
        updateShowroomsWarehouse(
          addShowroomWarehouse,
          (r) => {
            onCloseModel();
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Showrooms / Warehouse Updated Successfully",
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
        postShowroomsWarehouse(
          addShowroomWarehouse,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Showrooms / Warehouse added Successfully",
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
  const onDeleteShowroomsWarehouse = (row, next) => {
    deleteShowroomsWarehouse(
      row.showrooms_warehouse_id,
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
  const onEditShowroomsWarehouse = (row) => {
    setClassicModal(true);
    setAddShowroomWarehouse({
      ...addShowroomWarehouse,
      edit: true,
      showrooms_warehouse_id: row.showrooms_warehouse_id,
      switch_active_status: row.sw_status === "Y" ? true : false,
      ddl_showrooms_warehouse_type: row.sw_type,
      ddl_showrooms_warehouse_type_label: row.sw_type,
      txt_showrooms_warehouse: row.sw_name,
      txt_gst: row.sw_gst,
      txt_address: row.sw_address,
      txt_details: row.details,
    });
  };

  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({
      txt_gst: false,
      txt_showrooms_warehouse: false,
      ddl_showrooms_warehouse_type: false,
    });
    setAddShowroomWarehouse({
      edit: false,
      showrooms_warehouse_id: "",
      ddl_showrooms_warehouse_type: "",
      ddl_showrooms_warehouse_type_label: "Select",
      txt_showrooms_warehouse: "",
      txt_gst: "",
      txt_address: "",
      switch_active_status: false,
    });
  };

  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Showroom Warehouses List ']);
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
      'Type',
      'Name',
      'Gst',
      'Address',            
      'Status',
      
    
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const showroomWarehousesTable = showroomWarehouses.map((acc) => {
      return {
        ID: acc.sw_id,
        Type: acc.sw_type,
        Name: acc.sw_name,
        Gst:acc.sw_gst,
        Address:acc.sw_address,
        Status: acc.sw_status,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    showroomWarehousesTable.forEach((data) => {
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
    saveAs(data, 'Showroom Warehouses List.xlsx');
  };



  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Setting > Showroom / Warehouse"
        btnToolTip="Add New Showroom / Warehouse"
        onClickAddBtn={() => setClassicModal(true)}
      />
      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <GridContainer alignItems="center" justifyContent="space-between">
            <GridItem></GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs="12">
          <GridContainer justify="space-between" alignItems="center">
            <GridItem>
              <MasterModel
                classicModal={classicModal}
                onCloseModel={onCloseModel}
                width={450}
                height="auto"
                okBtnText="Submit"
                modelName={
                  addShowroomWarehouse.edit
                    ? "Edit a Showrooms / Warehouse"
                    : "Add a Showrooms / Warehouse"
                }
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
                                <Select
                                  options={item.options}
                                  formatGroupLabel={(d) => d.label}
                                  // menuPortalTarget={document.body}
                                  placeholder="Select"
                                  className={clx(
                                    classes.customSelect,
                                    classes.dateField
                                  )}
                                  onChange={(v) => onSelect(item.name, v)}
                                  value={{
                                    value: addShowroomWarehouse[item.name],
                                    label:
                                      addShowroomWarehouse[
                                        `${item.name}_label`
                                      ],
                                  }}
                                />
                              </>
                            )}
                            {item.html_element === "TextField" && (
                              <>
                                <InputLabel id="label">{item.label}</InputLabel>
                                <TextField
                                  size="small"
                                  placeholder={item.label}
                                  name={item.name}
                                  onChange={onChange}
                                  error={error[item.name]}
                                  FormHelperTextProps={{
                                    className: classes.helperText,
                                  }}
                                  helperText={
                                    error[item.name] ? item.helperText : ""
                                  }
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={addShowroomWarehouse[item.name]}
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
                                  value={addShowroomWarehouse[item.name]}
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
                                  checked={addShowroomWarehouse[item.name]}
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
                  <h4 className={classes1.headerCdTitle}>Showroom / Warehouse</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer",display: "none"  }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(showroomWarehouses)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(showroomWarehouses)} >
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
              onClickEdit={onEditShowroomsWarehouse}
              onClickDelete={onDeleteShowroomsWarehouse}
              columns={headerData}
              rows={showroomWarehouses}
            />
              </CardBody>
          </Card>
          )}
         </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default ShowroomWarehousePage;
