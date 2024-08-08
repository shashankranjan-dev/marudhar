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
  stockRegisterRowDataSearch,
  stockRegisterRowDataSearch2,
  getAllCategory,
  getAllBrands,
  getItemByName,
  getOpeningStock,
} from "../../../services/stockRegisterService";
import { stockRegister2RowData } from "../../../services/stockList2Service";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Paper, makeStyle, withStyle } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import { stockViewRowData } from "../../../services/stockViewService";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
import ReactSelect from "react-select";
import MasterModelForStock from "../../Components/MasterModelForStock";
import StockVoucher from "../Sales/StockView/StockVoucher";
//SERVICE
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";
// import InvoicePreview from "./InvoicePreview";

import theme from "../../../theme/theme";
import {
  currentDate,
  currentDate1,
  dateFormateField,
} from "../HelperComponent/utils";
import CircularProgress from "@material-ui/core/CircularProgress";

// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory, useLocation } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import { PurchaseListOfItem } from "../../../services/stockVoucherService";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from "file-saver";
import XLSX from "xlsx";

//PDF
import pdfIcon from "../../../assets/img/pdf-icon.png";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
const ExcelJS = require("exceljs");

const useStyles1 = makeStyles(styles);

import {
  appFontWeight,
  appFontWeightThin,
  tblBodyHoverColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: appSecondColor,
    padding: "5px 5px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "10px 10px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
    "&:hover": {
      backgroundColor: tblBodyHoverColor,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "22px",
    },
  },

  searchBar: {
    padding: "10px",
  },
  activeText: {
    fontSize: "15px",
    color: appSecondColor,
    fontWeight: 400,
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

const StockRegisterPage = () => {
  const classes1 = useStyles1();

  const history = useHistory();
  const location = useLocation();
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [allCategory, setAllCategory] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // const [allUnits, setAllUnits] = React.useState([]);
  const [stockRegisterRowDataList, setStockRegisterRowData] = React.useState(
    []
  );
  const [check, setCheck] = React.useState(false);
  const [rowInfo, setRowInfo] = React.useState([]);
  const [itemInfo, setItemInfo] = React.useState([]);
  const [itemDetails, setItemDetails] = useState([]);
  const [openingStock, setOpeningStock] = React.useState(0);
  const [collapsible, setCollapsible] = React.useState(true);

  const [stockPdf, setAllStockPdf] = React.useState([]);
  const [searchPdf, setAllSearchListPdf] = React.useState([]);

  // const [error, setError] = React.useState({
  //   ddl_showroom_warehouse: false,
  // });

  const [addSearch, setAddSearch] = React.useState({
    txt_item: "",
    ddl_category: "",

    ddl_showroom_warehouse: "",
    txt_from_date: dateFormateField("01-04-2022"),
    txt_to_date: currentDate(),
  });
  // console.log(addSearch.ddl_showroom_warehouse, "sen1234")
  const [addUnit, setAddUnit] = React.useState({
    active: false,
    higher: {
      unit: "",
      value: "",
    },
    lower: {
      unit: "",
      value: "",
    },
    caption: "",
  });
  const fetchData = () => {
    getAllCategory(
      (r) => {
        setAllCategory(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    getAllBrands(
      (r) => {
        setAllBrands(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    getListShowroomWarehouse(
      (r) => {
        setAllShowroomWarehouse(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };

  //onSearch
  const onSearchStockRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    if (addSearch.ddl_showroom_warehouse) {
      if (
        !addSearch.ddl_brand &&
        !addSearch.ddl_category &&
        !addSearch.txt_item
      ) {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: "Please!! Select Brand Or Category or Item",
            msgType: "error",
          },
        });
      } else {
        stockRegisterRowDataSearch2(
          (stockRegisterRowDataList, pdf) => {
            // console.log(stockRegisterRowDataList, "sen27/check")
            setStockRegisterRowData(stockRegisterRowDataList);
            setAllStockPdf(pdf);

            setLoading(false);
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
            setLoading(false);
          },
          addSearch
        );
      }
    } else {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: {
          msg: "!!Please Select Showroom / Warehouse",
          msgType: "error",
        },
      });
    }
  };

  const onClickRefresh = () => {
    setRefresh(!refresh);
    setAddSearch({
      txt_item: "",
      ddl_category: "",
      ddl_brand: "",
      ddl_showroom_warehouse: "",
      txt_from_date: dateFormateField("01-04-2022"),
      txt_to_date: currentDate(),
    });
  };

  React.useEffect(() => {
    fetchData();
    // setAllUnits(stockRegisterRowData);
  }, []);

  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };

  const headerData = [
    {
      id: "stoID",
      label: "#",
      align: "left",
    },
    {
      id: "stoItemDetails",
      label: "Item Details",
      align: "left",
    },
    {
      id: "stoUom",
      label: "UOM",
      align: "left",
    },
    {
      id: "stoOpening",
      label: "Opening",
      align: "right",
    },
    {
      id: "stoPurchase",
      label: "Purchase",
      align: "right",
    },
    {
      id: "stoPurchaseReturn",
      label: "Purchase Return",
      align: "right",
    },
    {
      id: "stoSales",
      label: "Sales",
      align: "right",
    },
    {
      id: "stoSalesReturn",
      label: "Sales Return",
      align: "right",
    },
    {
      id: "stoTransfer",
      label: "Stock Transfer",
      align: "right",
    },
    {
      id: "stoReceived",
      label: "Stock Received",
      align: "right",
    },
    {
      id: "stoWaste",
      label: "Waste",
      align: "right",
    },
    {
      id: "stoWasteQty",
      label: "Wasted Converted",
      align: "right",
    },
    {
      id: "stoClosing",
      label: "Closing",
      align: "right",
    },
    {
      id: "stoAction",
      label: "Action",
      align: "right",
    },
  ];
  const stpData = [
    {
      id: "stpID",
      label: "ID",
      align: "left",
    },
    {
      id: "stpDate",
      label: "Date",
      align: "left",
    },
    {
      id: "stpOpening",
      label: "Opening",
      align: "right",
    },
    {
      id: "stpPurchase",
      label: "Purchase",
      align: "right",
    },
    {
      id: "stpPurchaseReturn",
      label: "Purchase Return",
      align: "right",
    },
    {
      id: "stpSales",
      label: "Sales",
      align: "right",
    },
    {
      id: "stpSalesReturn",
      label: "Sales Return",
      align: "right",
    },
    {
      id: "stpSalesAdj",
      label: "Stock Adj.",
      align: "right",
    },

    {
      id: "stpClosing",
      label: "Closing",
      align: "right",
    },
  ];

  const headerDataPdf = [
    [
      "Sr. No.",
      "Item Details",
      "UOM",
      "Opening",
      "Purchase",
      "Purchase Return",
      "Sales Return",
      "Stock Return",
      "Stock Transfer",
      "Stock Received",
      "Closing",
    ],
  ];
  const searchData = [
    [
      addSearch?.ddl_brand ? `Brand: ${addSearch?.ddl_brand?.label}` : "",
      addSearch?.ddl_category?.label
        ? `Category: ${addSearch?.ddl_category?.label}`
        : "",
      addSearch?.ddl_showroom_warehouse?.label
        ? `Warehouse : ${addSearch?.ddl_showroom_warehouse?.label}`
        : "",
      addSearch?.txt_from_date ? `From Date: ${addSearch?.txt_from_date}` : "",
      addSearch?.txt_to_date ? `To Date: ${addSearch?.txt_to_date}` : "",
    ],
  ];

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };
  const onSelect = (info, v) => {
    setAddSearch({ ...addSearch, [info.name]: v });
  };

  const classes = useStyles();

  const onClickView = (row) => {
    // setClassicModal(true);
    // console.log(row, "sen1405")
    setClassicModal(true);
    setRowInfo(row);
    getItemByName(
      row.item_id,
      (r) => {
        // console.log(r[0].id, "sen28/id1")

        getOpeningStock(
          r[0].id,
          addSearch.txt_from_date,
          addSearch.ddl_showroom_warehouse.value,
          (a) => {
            setOpeningStock(a);
          }
        );

        PurchaseListOfItem(
          r[0].id,
          addSearch,
          (r) => {
            // console.log(r, "sen28/idr")
            setItemDetails(r);
          },
          (err) => {
            setItemDetails([]);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
        setItemInfo(r);
        setCheck(true);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };

  const onCloseModel = () => {
    setClassicModal(false);
    setItemInfo([]);
    setRowInfo([]);
    setItemDetails([]);

    // window.location.reload(false)
  };

  // export to excel

  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("data");

    const titleRow = worksheet.addRow(["Report Name : Stock Register Report"]);
    const periodRow = worksheet.addRow(["Period:"]);
    worksheet.addRow([]);

    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = {
      vertical: "middle",
      horizontal: "center",
      bold: true,
    };
    periodCell.alignment = {
      vertical: "middle",
      horizontal: "center",
      bold: true,
    };

    worksheet.mergeCells(`A${titleRow.number}:K${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:K${periodRow.number}`);

    const headers = [
      "Sl No",
      "Item Details",
      "Uom",
      "Opening",
      "Purchase",
      "Purchase Return",
      "Sales",
      "Sales Return",
      "Stock Transfer",
      "Stock Receive",
      "Closing",
    ];

    // Add headers as a row
    worksheet.addRow(headers);

    const StockRegisterTable = stockRegisterRowDataList.map((item) => {
      return {
        Sl_No: item.stoID,
        ItemDetails: item.stoItemDetails,
        Uom: item.stoUom,
        Opening: item.stoOpening,
        Purchase: item.stoPurchase,
        PurchaseReturn: item.stoPurchaseReturn,
        Sales: item.stoSales,
        SalesReturn: item.stoSalesReturn,
        stock_transfer: item.stoTransfer,
        stock_receive: item.stoReceived,
        Closing: item.stoClosing,
      };
    });

    const dataStartRow = 4;

    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;

    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });

    StockRegisterTable.forEach((data) => {
      worksheet.addRow(Object.values(data));
    });

    headerRow.font = { bold: true };
    headerRow.eachCell((cell, colNumber) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "cce6ff" },
      };
    });

    worksheet.eachRow(
      { startingRow: dataStartRow + 1 },
      (row, rowNumber) => {}
    );

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

    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    }

    const fromDate = addSearch?.txt_from_date;
    const toDate = addSearch?.txt_to_date;
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);

    const chosenPeriod = ` ${formattedFromDate}  To  ${formattedToDate}`;
    const category = addSearch?.ddl_category?.label;
    const showroom_warehouse = addSearch?.ddl_showroom_warehouse?.label;

    periodCell.value = `Category: ${category}       Period:  ${chosenPeriod} 
        Showroom WareHouse: ${showroom_warehouse} `;

    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, "StockRegisterTable.xlsx");
  };

  const onClickCollaps = () => {
    collapsible ? setCollapsible(false) : setCollapsible(true);
  };

  //pdf
  const onClickPdf = (e) => {
    e.preventDefault();

    let doc = new jsPDF("landscape", "pt", "A4");
    autoTable(doc, {
      head: searchData,
      body: searchPdf,
      didDrawCell: (ledgerPdf) => {
        // console.log(ledgerPdf.column.index)
      },
    });
    autoTable(doc, {
      head: headerDataPdf,
      body: stockPdf,
      columnStyles: {
        3: {
          halign: "right",
        },
        4: {
          halign: "right",
        },
        5: {
          halign: "right",
        },
        6: {
          halign: "right",
        },
        7: {
          halign: "right",
        },
        8: {
          halign: "right",
        },
        9: {
          halign: "right",
        },
        10: {
          halign: "right",
        },
      },
      didDrawCell: (cell, stockPdf) => {
        // console.log(stockPdf.column.index)
      },
    });
    doc.save(`StockRegisterPage${currentDate()}.pdf`);
    // doc.html(document.getElementById('pdf-view'), {
    //   callback: () => {
    //     doc.save(`StockRegisterPage${currentDate()}.pdf`);
    //   }
    // });
    // setClassicModal(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="MIS Report > Stock Register " />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle="Search Stock Register"
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon
          >
            {collapsible ? (
              <Paper elevation="0" className={classes.searchBar}>
                <GridContainer justifyContent="flex-start" alignItems="center">
                  <GridItem xs="3">
                    <InputLabel id="label">Brand</InputLabel>
                    <ReactSelect
                      options={allBrands}
                      name="ddl_brand"
                      placeholder="Select"
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      styles={reactSelectStyles}
                      className={classes.customSelect}
                      onChange={(v, info) => onSelect(info, v)}
                      value={addSearch.ddl_brand}
                      // onChange={(v) => onSelect("ddl_brand_id", v)}
                      // value={{
                      //   label: addSearch.ddl_brand_label,
                      //   value: addSearch.ddl_brand_id,
                      // }}
                    />
                  </GridItem>
                  <GridItem xs="3">
                    <InputLabel id="label">Category</InputLabel>
                    <ReactSelect
                      options={allCategory}
                      placeholder="Select"
                      name="ddl_category"
                      onChange={(v, info) => onSelect(info, v)}
                      value={addSearch.ddl_category}
                      // onChange={(v, info) => onSelect(info, v)}
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      styles={reactSelectStyles}
                      className={classes.customSelect}
                    />
                  </GridItem>
                  <GridItem xs="6">
                    <InputLabel id="label">Item</InputLabel>
                    <TextField
                      size="small"
                      placeholder="Item"
                      name="txt_item"
                      type="search"
                      onChange={onAddSearch}
                      // style={{ marginBottom: -10 }}
                      id="outlined-basic"
                      fullWidth={true}
                      value={addSearch.txt_item}
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs="3">
                    <InputLabel id="label">Showroom / Warehouse</InputLabel>
                    <ReactSelect
                      options={allShowroomWarehouse}
                      placeholder="Select"
                      name="ddl_showroom_warehouse"
                      onChange={(v, info) => onSelect(info, v)}
                      value={addSearch.ddl_showroom_warehouse}
                      // onChange={(v, info) => onSelect(info, v)}
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      styles={reactSelectStyles}
                      className={classes.customSelect}
                    />
                  </GridItem>

                  <GridItem xs="2">
                    <InputLabel id="label">Date Between</InputLabel>
                    <TextField
                      name="txt_from_date"
                      size="small"
                      id="date"
                      variant="outlined"
                      type="date"
                      fullWidth={true}
                      defaultValue={currentDate1()}
                      onChange={onAddSearch}
                      value={addSearch.txt_from_date}
                      // className={classes.dateField}
                      inputProps={{
                        shrink: true,
                        min: `${localStorage.financial?.split("-")[0]}-04-01`,
                        max: `${localStorage.financial?.split("-")[1]}-03-31`,
                      }}
                    />
                  </GridItem>
                  <GridItem xs="2">
                    {/* <InputLabel id="label">Date</InputLabel> */}
                    <TextField
                      size="small"
                      name="txt_to_date"
                      id="date"
                      variant="outlined"
                      type="date"
                      fullWidth={true}
                      defaultValue={currentDate()}
                      onChange={onAddSearch}
                      value={addSearch.txt_to_date}
                      className={classes.dateField}
                      inputProps={{
                        shrink: true,
                        min: `${localStorage.financial?.split("-")[0]}-04-01`,
                        max: `${localStorage.financial?.split("-")[1]}-03-31`,
                      }}
                    />
                  </GridItem>

                  <GridItem xs="5">
                    <div
                      style={{
                        float: "right",
                        display: "flex",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <CustomButton
                        onClick={onSearchStockRegister}
                        style={{ marginRight: "10px" }}
                      >
                        <SearchIcon />
                      </CustomButton>
                      <CustomButton onClick={onClickRefresh}>
                        <RotateLeftIcon />
                      </CustomButton>
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer
                  justifyContent="flex-start"
                  alignItems="center"
                ></GridContainer>
              </Paper>
            ) : (
              ""
            )}
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <Card className={classes1.headerCard}>
              <CardHeader
                className={classes1.TbheaderCdhd}
                style={{ height: 60 }}
              >
                <GridContainer
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <GridItem>
                    <h4 className={classes1.headerCdTitle}>
                      Stock Register List
                    </h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? (
                    <GridItem style={{ cursor: "pointer",display: "none" }}>
                      {/* ////////////////////////////PDF/////////////////// */}
                      <IconButton onClick={onClickPdf}>
                        <Tooltip title="Export to PDF">
                          <img src={pdfIcon} style={{ width: 20 }} />
                        </Tooltip>
                      </IconButton>
                      <IconButton
                        variant="text"
                        onClick={() =>
                          onhandleExportToExcel(stockRegisterRowDataList)
                        }
                      >
                        <Tooltip title="Export to Excel">
                          <img
                            src={
                              require("../../../assets/img/excel.png").default
                            }
                          />
                        </Tooltip>
                      </IconButton>
                    </GridItem>
                  ) : (
                    <GridItem style={{ cursor: "pointer" }}>
                      {/* ////////////////////////////PDF/////////////////// */}
                      <IconButton onClick={onClickPdf}>
                        <Tooltip title="Export to PDF">
                          <img src={pdfIcon} style={{ width: 20 }} />
                        </Tooltip>
                      </IconButton>
                      <IconButton
                        variant="text"
                        onClick={() =>
                          onhandleExportToExcel(stockRegisterRowDataList)
                        }
                      >
                        <Tooltip title="Export to Excel">
                          <img
                            src={
                              require("../../../assets/img/excel.png").default
                            }
                          />
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
                  columns={headerData}
                  rows={stockRegisterRowDataList}
                  onClickViewOne={onClickView}
                />
                <Box pt={1}>
                  {/* <GridContainer>
                {stockRegisterRowDataList.length
                  ?
                  <Grid item xs={3}>
                    <Box className={classes.tableLabel} textAlign="right">
                      <b> Total</b>
                    </Box>
                  </Grid>
                  : ""}
                <Grid item xs={2}>
                </Grid>

                <Grid item xs={1}>
                  <Box className={classes.tableLabel} textAlign="right">
                    {stockRegisterRowDataList.length
                      ?
                      stockRegisterRowDataList.reduce(
                        (sum, li) => Number(sum) + Number(li.stoOpening),
                        0
                      )
                      : ""}
                  </Box>
                </Grid>

                <Grid item xs={1}>
                  <Box className={classes.tableLabel} textAlign="right">
                    {stockRegisterRowDataList.length
                      ?
                      stockRegisterRowDataList.reduce(
                        (sum, li) =>
                          Number(sum) + parseFloat(li.stoPurchase),
                        0
                      )

                      : ""}
                  </Box>
                </Grid>

                <Grid item xs={1}>
                  <Box className={classes.tableLabel} textAlign="right">
                    {stockRegisterRowDataList.length
                      ?
                      stockRegisterRowDataList.reduce(
                        (sum, li) =>
                          Number(sum) + parseFloat(li.stoPurchaseReturn),
                        0
                      )

                      : ""}
                  </Box>
                </Grid>

                <Grid item xs={1}>
                  <Box className={classes.tableLabel} textAlign="right">
                    {stockRegisterRowDataList.length
                      ?
                      stockRegisterRowDataList.reduce(
                        (sum, li) => Number(sum) + Number(li.stoSales),
                        0
                      )

                      : ""}
                  </Box>
                </Grid>

                <Grid item xs={1}>
                  <Box className={classes.tableLabel} textAlign="right">
                    {stockRegisterRowDataList.length
                      ?
                      stockRegisterRowDataList.reduce(
                        (sum, li) =>
                          Number(sum) + parseFloat(li.stoSalesReturn),
                        0
                      )

                      : ""}
                  </Box>
                </Grid>

                <Grid item xs={1}>
                  <Box className={classes.tableLabel} textAlign="right">
                    {stockRegisterRowDataList.length
                      ?
                      stockRegisterRowDataList.reduce(
                        (sum, li) =>
                          Number(sum) +
                          Number(
                            li.stoClosing
                          ),
                        0
                      )

                      : ""}
                  </Box>
                </Grid>

              </GridContainer> */}
                </Box>
                {/* <Box pt={1} >           
                <GridContainer>
                {stockRegisterRowDataList.length
                        ?
                  <Grid item xs={3}>
                    <Box className={classes.tableLabel} ml={21} textAlign="right">
                     <b> Total</b>
                    </Box>
                  </Grid>      
                  : ""}

                    <Grid item xs={4}>
                     <Box className={classes.tableLabel} ml={30} textAlign="right">
                      {stockRegisterRowDataList.length
                        ? 
                          stockRegisterRowDataList.reduce(
                              (sum, li) =>( Number(sum) + Number(li.stoOpening)).toFixed(2),
                              0
                            )
                    
                        : ""}
                      </Box>
                    </Grid>

                    <Grid item xs={1}>
                     <Box className={classes.tableLabel} ml={18} textAlign="right">
                     {stockRegisterRowDataList.length
                          ? 
                              stockRegisterRowDataList.reduce(
                                (sum, li) =>
                                  (Number(sum) + parseFloat(li.stoPurchase)).toFixed(2),
                                0
                              )
                         
                          : ""}
                      </Box>
                    </Grid> 

                    <Grid item xs={2}>
                     <Box className={classes.tableLabel} ml={19} textAlign="left">
                      {stockRegisterRowDataList.length
                        ? 
                          stockRegisterRowDataList.reduce(
                              (sum, li) => (Number(sum) + Number(li.stoSales)).toFixed(2),
                              0
                            )
                     
                        : ""}
                      </Box>
                    </Grid> 
                    <Grid item xs={1}>
                    
                    </Grid> 
                    <Grid item xs={1}>
                     <Box className={classes.tableLabel} ml={3} textAlign="left">
                     {stockRegisterRowDataList.length
                          ? 
                              stockRegisterRowDataList.reduce(
                                (sum, li) =>
                                 ( Number(sum) +
                                  Number(
                                    li.stoClosing
                                  )).toFixed(2),
                                0
                              )
                            
                          : ""}
                      </Box>
                    </Grid>    
                </GridContainer>

            
              </Box> */}
              </CardBody>
            </Card>
          )}
        </GridItem>
        {/* <GridItem xs="12">
          <CustomCard cdTitle="Stock Register List" minHeight={300}>
            <MuiTable
              columns={stockData}
              rows={stockRegister2RowData}
              onClickView={onClickView}
            />
          </CustomCard>
        </GridItem> */}
      </GridContainer>

      {check ? (
        <MasterModelForStock
          classicModal={classicModal}
          onCloseModel={onCloseModel}
          height="auto"
          modelName="Stock"
        >
          <StockVoucher
            itemInfo={itemInfo}
            searchedInfo={addSearch}
            rowInfo={rowInfo}
            itemDetails={itemDetails}
            openingStock={openingStock}
          />
        </MasterModelForStock>
      ) : (
        ""
      )}

      {/* pdf */}
      <MasterModel
        classicModal={classicModal}
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModal(false);
        }}
        height="auto"
        okBtnText="Pdf"
        modelName="Purchase Register"
        onClickOk={(e) => {
          e.preventDefault();
          window.print();
        }}
      >
        <div
          id="pdf-view"
          style={{
            marginTop: 15,
            display: "flex",
            flexFlow: "row wrap",
            // justifyContent: "center",
            breakBefore: "avoid-page",
          }}
        >
          <div
            style={{
              textAlign: "center",
              borderBottom: "1px solid",
              width: "72%",
            }}
          >
            <h4>Stock Register</h4>
          </div>

          {addSearch ? (
            <GridContainer
              style={{
                margin: 2,
                textAlign: "center",
                borderBottom: "1px solid",
              }}
            >
              <GridItem>
                {addSearch?.ddl_brand
                  ? `Brand: ${addSearch?.ddl_brand?.label}`
                  : ""}
              </GridItem>

              <GridItem>
                {addSearch?.ddl_category?.label
                  ? `Category: ${addSearch?.ddl_category?.label}`
                  : ""}
              </GridItem>

              <GridItem>
                {addSearch?.ddl_showroom_warehouse?.label
                  ? `Warehouse : ${addSearch?.ddl_showroom_warehouse?.label}`
                  : ""}
              </GridItem>

              <GridItem>
                {addSearch?.txt_from_date
                  ? `From Date: ${addSearch?.txt_from_date}`
                  : ""}
              </GridItem>

              <GridItem>
                {addSearch?.txt_to_date
                  ? `To Date: ${addSearch?.txt_to_date}`
                  : ""}
              </GridItem>
            </GridContainer>
          ) : (
            ""
          )}

          <TableContainer>
            <GridContainer
              style={{ height: "auto", padding: 12, width: 830, margin: 2 }}
            >
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">#</StyledTableCell>
                    <StyledTableCell align="left">Item Details</StyledTableCell>
                    <StyledTableCell align="left">UOM</StyledTableCell>
                    <StyledTableCell align="left">Vendor</StyledTableCell>
                    <StyledTableCell align="left"> Opening</StyledTableCell>
                    <StyledTableCell align="center">Purchase</StyledTableCell>
                    <StyledTableCell align="center">
                      Purchase Return
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Sales Return
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Stock Transfer
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Stock Received
                    </StyledTableCell>
                    <StyledTableCell align="center">Closing</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {console.log(purchaseRegisterList, "sankha51")} */}

                  {stockRegisterRowDataList.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="left" className={classes.id}>
                        {row.stoID}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.bill_date}
                      >
                        {row.stoItemDetails}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.txt_bill_no}
                      >
                        {row.stoUom}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.ddl_vendor}
                      >
                        {row.stoOpening.toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.grossamount}
                      >
                        {row.stoPurchase.toFixed(2)}
                      </StyledTableCell>

                      <StyledTableCell align="right" className={classes.amount}>
                        {row.stoPurchaseReturn.toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.amount}>
                        {row.stoSales.toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.amount}>
                        {row.stoSalesReturn.toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.amount}>
                        {row.stoTransfer.toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.amount}>
                        {row.stoReceived.toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.amount}>
                        {row.stoClosing.toFixed(2)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </GridContainer>
          </TableContainer>
        </div>
      </MasterModel>
    </ThemeProvider>
  );
};

export default StockRegisterPage;
