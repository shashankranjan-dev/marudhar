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
  getAllBrand,
  updateBrand,
  deleteBrand,
  postBrand,
} from "../../../services/brandService";
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
import AddIcon from "@mui/icons-material/Add";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

import CardLinkButton from "views/Components/CardLinkButton";

import theme from "../../../theme/theme";

import React from "react";
import {
  appDefaultColor,
  appSecondColor,
  appFontWeight,
  appDefaultFamily,
} from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import { appLabelFont } from "assets/jss/material-dashboard-pro-react";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import PageTitle from "../HelperComponent/PageTitle";
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
  root: {},
  catCards: {
    marginLeft: 5,
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
  helperText: {
    textAlign: "right",
  },
}));

const AddBrandPage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [brands, setAllBrands] = React.useState([]);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [addBrand, setAddBrand] = React.useState({
    edit: false,
    switch_status_btn: false,
    txt_brand: "",
    brand_id: "",
    txt_details: "",
  });

  // for Error handler state
  const [error, setError] = React.useState({
    txt_brand: false,
  });

  React.useEffect(() => {
    setLoading(true);
    getAllBrand(
      (brands) => {
        setAllBrands(brands);
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
    setAddBrand((prv) => ({ ...prv, switch_status_btn: e.target.checked }));
  };

  const headerData = [
    {
      id: "brdid",
      label: "#",
      align: "left",
    },
    {
      id: "brdbrand",
      label: "Brand",
      align: "left",
    },
    {
      id: "brddetails",
      label: "Details",
      align: "left",
    },
    {
      id: "brdstatus",
      label: "Status",
      align: "left",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    {
      id: "brdaction",
      label: "Action",
      align: "right",
    },
  ];

  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (!addBrand.txt_brand) {
      setError({
        txt_brand: !addBrand.txt_brand,
      });
    } else {
      if (addBrand.edit) {
        updateBrand(
          addBrand,
          (r) => {
            onCloseModel();
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Brand Updated Successfully",
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
        postBrand(
          addBrand,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Brand added Successfully",
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
  const onDeleteBrand = (row, next) => {
    deleteBrand(
      row.brand_id,
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
  const onUpdateBrand = (row) => {
    setClassicModal(true);
    setAddBrand({
      ...addBrand,
      edit: true,
      switch_status_btn: row.brdstatus === "Y" ? true : false,
      brand_id: row.brand_id,
      txt_brand: row.brdbrand,
      txt_details: row.brddetails,
    });
  };

  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({ txt_brand: false });
    setAddBrand({
      edit: false,
      switch_status_btn: false,
      txt_brand: "",
      txt_details: "",
    });
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setAddBrand({ ...addBrand, [name]: value });
  };
  const classes = useStyles();


     // export to excel

     const onhandleExportToExcel = async () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('data');
    
      const titleRow = worksheet.addRow(['Report Name : Brand List']);
      const periodRow = worksheet.addRow(['']);
      worksheet.addRow([]);
    
      const titleCell = titleRow.getCell(1);
      const periodCell = periodRow.getCell(1);
      titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
      periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    
      worksheet.mergeCells(`A${titleRow.number}:D${titleRow.number}`);
      worksheet.mergeCells(`A${periodRow.number}:D${periodRow.number}`);
    
      const headers = [
        'Sl No',
        'Brand',        
        'Details',        
        'Status'
      
      ];
    
      // Add headers as a row
      worksheet.addRow(headers);
    
      const BrandTable = brands.map((bnd) => {
        return {
          ID: bnd.brdid,
      brand: bnd.brdbrand,
      details: bnd.brddetails,
      // details:bnd.details,
      
      
      status: bnd.brdstatus,
        };
      });
    
      const dataStartRow = 4;
    
      const headerRow = worksheet.getRow(dataStartRow);
      headerRow.height = 20;
    
      headers.forEach((header, index) => {
        const column = worksheet.getColumn(index + 1);
        column.width = header.length + 5;
      });
    
      BrandTable.forEach((data) => {
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
      saveAs(data, 'Brand.xlsx');
    };



  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Item Details >Brand"
        btnToolTip="Add New Brand"
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
                modelName={addBrand.edit ? "Edit Brand" : "Add New Brand"}
                onClickOk={onSubmitModel}
                disabled={buttonDisabled}

              >
                <GridContainer className={classes.modelForm}>
                  <GridItem xs={12}>
                    <InputLabel required id="label">
                      Brand
                    </InputLabel>
                    <TextField
                      required
                      size="small"
                      placeholder="Brand"
                      name="txt_brand"
                      onChange={onChange}
                      FormHelperTextProps={{
                        className: classes.helperText,
                      }}
                      error={error.txt_brand}
                      helperText={
                        error.txt_brand ? "Brand Name is required" : ""
                      }
                      id="outlined-basic"
                      fullWidth={true}
                      value={addBrand.txt_brand}
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12}>
                    <InputLabel id="label">Details</InputLabel>

                    <TextField
                      placeholder="Details"
                      name="txt_details"
                      onChange={onChange}
                      multiline
                      rows={5}
                      style={{ marginBottom: -10 }}
                      id="outlined-basic"
                      fullWidth={true}
                      value={addBrand.txt_details}
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12}>
                    <span className={classes.activeText}>Active Status</span>
                    <Switch
                      onClick={onSetActive}
                      checked={addBrand.switch_status_btn}
                      name="switch_status_btn"
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
                  <h4 className={classes1.headerCdTitle}>Brand</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer",display: "none"  }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(brands)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(brands)} >
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
            {/* <CustomCard cdTitle="Brands" height={480}> */}
              <MuiTable
                onClickEdit={onUpdateBrand}
                onClickDelete={onDeleteBrand}
                columns={headerData}
                rows={brands}
              />
              </CardBody>
              </Card>
            // </CustomCard>
          )}
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default AddBrandPage;
