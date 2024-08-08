import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
// import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";

import {
  getAllCategory,
  getAllParentCategory,
  updateCategory,
  deleteCategory,
  postCategory,
} from "services/categoryService";
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
import theme from "../../../theme/theme";

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
import { Autocomplete } from "@material-ui/lab";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import PageTitle from "../HelperComponent/PageTitle";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
// for date picker import
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// date picker end
import { currentDate } from "../HelperComponent/utils";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import SnakebarMsg from "../HelperComponent/SnakebarMsg";
import { useJwt } from "react-jwt";
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
  helperText: { textAlign: "right" },
  activeText: {
    ...activeText,
  },
  customSelect: {
    marginBottom: 15,
  },
  formContainer: { padding: "20px 10px", width: "100%" },
}));

const headerData = [
  {
    id: "id",
    label: "#",
  },
  {
    id: "parentCategoryName",
    label: "Parent Category",
    align: "left",
  },
  {
    id: "category",
    label: "Category",
  },

  {
    id: "details",
    label: "Details",
    align: "left",
  },
  {
    id: "hsn",
    label: "HSN",
    align: "left",
  },
  {
    id: "gst",
    label: "GST%",
    align: "right",
  },

  {
    id: "status",
    label: "Status",
    align: "right",
    statusBtn: (v) => (v === "Y" ? true : false),
  },

  {
    id: "action",
    label: "Action",
    align: "right",
  },
];

const Category = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const classes = useStyles();
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // const { register, errors, handleSubmit, control } = useForm();
  const [classicModal, setClassicModal] = React.useState(false);
  const [parentCats, setAllParentCats] = React.useState([]);
  const [allCategories, setAllCategories] = React.useState([]);
  // for Error handler state
  const [error, setError] = React.useState({
    txt_Category: false,
    ddl_parent_category_id: false,
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  // for add Category State
  const [addCategory, setAddCategory] = React.useState({
    switch_active_btn: false,
    category_id: "",
    ddl_parent_category_id: 0,
    ddl_parent_category_label: "Select Parent Category",
    txt_Category: "",
    txt_details: "",
    txt_hsn:"",
    txt_gst:""
  });

  // get All list
  React.useEffect(() => {
    setLoading(true);
    getAllCategory(
      (r) => {
        setAllCategories(r);
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
    getAllParentCategory(
      (r) => {
        setAllParentCats(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  }, [refresh]);

  // on Change field called
  const onSetActive = (e) => {
    setAddCategory((prv) => ({ ...prv, switch_active_btn: e.target.checked }));
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setAddCategory({ ...addCategory, [name]: value });
  };

  const onSelectParentCat = (v) => {
    if (v !== null) {
      setAddCategory({
        ...addCategory,
        ddl_parent_category_id: v.value,
        ddl_parent_category_label: v.label,
      });
    }
  };

  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (!addCategory.txt_Category) {
      setError({
        txt_Category: !addCategory.txt_Category,
      });
    } else {
      if (addCategory.edit) {
        updateCategory(
          addCategory,
          (r) => {
            onCloseModel();
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Category Updated Successfully",
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
        postCategory(
          addCategory,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Category added Successfully",
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
  const onDeleteCategory = (row, next) => {
    deleteCategory(
      row.category_id,
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
  const onEditCategory = (row) => {
    setClassicModal(true);
    setAddCategory({
      ...addCategory,
      edit: true,
      switch_active_btn: row.status === "Y" ? true : false,
      ddl_parent_category_id: row.parentCategoryId,
      category_id: row.category_id,
      ddl_parent_category_label: row.parentCategoryName,
      txt_Category: row.category,
      txt_details: row.details,
      txt_hsn: row.hsn,
      txt_gst: row.gst,
    });
  };

  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({ txt_Category: false, ddl_parent_category_id: false });
    setAddCategory({
      edit: false,
      switch_active_btn: false,
      txt_hsn:"",
      txt_gst:"",
      txt_Category: "",
      txt_details: "",
      ddl_parent_category_id: 0,
      ddl_parent_category_label: "Select Parent Category",
    });
  };


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Category List']);
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
      'Parent Category',
      'Category',
      'Details',
      'HSN',      
      'Gst',
      'Status'
    
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const CategoryTable = allCategories.map((cat) => {
      return {
        ID: cat.id,
        parentCategory: cat.parentCategoryName,
        category: cat.category,
        details:cat.details,
        hsn:cat.hsn,
        gst:cat.gst,
        status: cat.status,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    CategoryTable.forEach((data) => {
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
    saveAs(data, 'Category.xlsx');
  };




  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Item Details > Category"
        btnToolTip="Add New Category"
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
                modelName={addCategory.edit ? "Edit Category" : "Add Category"}
                onClickOk={onSubmitModel}
                disabled={buttonDisabled}

              >
                <div className={classes.formContainer}>
                  <GridContainer>
                    <GridItem xs={12}>
                      <InputLabel id="label">Parent Category</InputLabel>
                      <Select
                        options={parentCats}
                        placeholder="Select Parent Category"
                        formatGroupLabel={(d) => d.label}
                        // menuPortalTarget={document.body}
                        className={classes.customSelect}
                        onChange={onSelectParentCat}
                        value={{
                          label: addCategory.ddl_parent_category_label,
                          value: addCategory.ddl_parent_category_id,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <InputLabel required id="label">
                        Category
                      </InputLabel>
                      <TextField
                        autoComplete={false}
                        size="small"
                        placeholder="Category"
                        name="txt_Category"
                        onChange={onChange}
                        required
                        id="outlined-basic"
                        fullWidth={true}
                        error={error.txt_Category}
                        helperText={
                          error.txt_Category ? "Category is required" : ""
                        }
                        FormHelperTextProps={{
                          className: classes.helperText,
                        }}
                        value={addCategory.txt_Category}
                        variant="outlined"
                        auto Complete="none"
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <InputLabel id="label">Details</InputLabel>
                      <TextField
                        placeholder="Details"
                        name="txt_details"
                        onChange={onChange}
                        multiline
                        style={{ marginBottom: -10 }}
                        rows={5}
                        id="outlined-basic"
                        fullWidth={true}
                        value={addCategory.txt_details}
                        variant="outlined"
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <InputLabel required id="label">
                        HSN
                      </InputLabel>
                      <TextField
                        autoComplete={false}
                        size="small"
                        placeholder="HSN"
                        name="txt_hsn"
                        onChange={onChange}
                        required
                        id="outlined-basic"
                        fullWidth={true}
                        error={error.txt_Category}
                        helperText={
                          error.txt_Category ? "HSN is required" : ""
                        }
                        FormHelperTextProps={{
                          className: classes.helperText,
                        }}
                        value={addCategory.txt_hsn}
                        variant="outlined"
                        auto Complete="none"
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      <InputLabel required id="label">
                        GST%
                      </InputLabel>
                      <TextField
                        auto Complete={false}
                        size="small"
                        placeholder="GST%"
                        name="txt_gst"
                        onChange={onChange}
                        required
                        id="outlined-basic"
                        fullWidth={true}
                        error={error.txt_Category}
                        helperText={
                          error.txt_Category ? "GST% is required" : ""
                        }
                        FormHelperTextProps={{
                          className: classes.helperText,
                        }}
                        value={addCategory.txt_gst}
                        variant="outlined"
                        autoComplete="none"
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <span className={classes.activeText}>Active Status</span>
                      <Switch
                        onClick={onSetActive}
                        checked={addCategory.switch_active_btn}
                        name="switch_active_btn"
                        fullWidth={true}
                        inputProps={{
                          "aria-label": "primary checkbox",
                        }}
                        color="primary"
                      />
                    </GridItem>
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
                  <h4 className={classes1.headerCdTitle}>Category</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer" ,display: "none" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allCategories)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allCategories)} >
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
            {/* <CustomCard cdTitle="Category" height={480}> */}
            <MuiTable
              loading={loading}
              onClickEdit={onEditCategory}
              onClickDelete={onDeleteCategory}
              columns={headerData}
              rows={allCategories}
            />
          {/* </CustomCard> */}
          </CardBody>
              </Card>
          )}
         
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default Category;
