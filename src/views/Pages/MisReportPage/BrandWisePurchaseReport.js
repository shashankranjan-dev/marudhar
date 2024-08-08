import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../Components/CustomButton";
import {
  directPurchaseFormRowData,
  addedItemServiceRowData,
  dummyRowData,
} from "../../../services/directPurchaseFormService";
import {
  salesmanWiseData,
  getAllCategory,
  getAllBrands,
} from "../../../services/salesmanWiseSalesService";

import {
  getAllCustomerCondensed,
  getAllCustomerDetail,
} from "../../../services/CustomerWiseReportService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Paper } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider, Box } from "@material-ui/core";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import ViewListIcon from "@mui/icons-material/ViewList";

import theme from "../../../theme/theme";
import ReactSelect from "react-select";
import React from "react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import {
  activeText,
  appScrollBar,
} from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";
// import { ColoseButton } from "../Components/CustomButton";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@material-ui/core";
import ItemViewCard from "../HelperComponent/ItemViewCard";
import PageTitle, { PageHeader } from "../HelperComponent/PageTitle";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepProceedModel from "../HelperComponent/StepProceedModel";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

import { Typography } from "@material-ui/core";
import { whiteColor } from "assets/jss/material-dashboard-pro-react";
import { currentDate, currentDate1 } from "../HelperComponent/utils";
import { getListUsers } from "../../../services/associateService";
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

import { getAllBrand } from "services/brandWiseReport";
import {
  getReportCondensed,
  getReportDetailed,
} from "services/brandWiseReport";
import { getAllBrandReport } from "services/brandWiseReport";
import { getAllCategoryById } from "services/BrandWiseReportPurchaseService";
import { getReportPurchaseDetailed } from "services/BrandWiseReportPurchaseService";
import { getReportPurchaseCondensed } from "services/BrandWiseReportPurchaseService";
const useStyles1 = makeStyles(styles);

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
    // padding: "10px 5px",
    padding: "7px 3px",

    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  itemImgPaper: {
    marginRight: "15px",
    width: "80px",
    height: "80px",
    overflow: "hidden",
  },
  addBtn: {
    width: 30,
    height: 38,
  },
  container: {
    ...appScrollBar,
    maxHeight: 360,
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 15,
    padding: "15px 20px",
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
  actionbtns: {
    marginTop: 20,
    float: "right",
  },

  id: {
    width: "5%",
  },
  doubleFiled: {
    width: "20%",
  },

  action: {
    width: "5%",
  },
  rate: {
    width: "8%",
  },
  value: {
    width: "15%",
  },
  itemImg: {
    width: "8%",
  },
  itemDetails: {
    width: "25%",
  },
  itemDetailsView: {
    width: "50%",
  },
  quantity: {
    width: "20%",
  },
  viewQuantity: {
    width: "20%",
  },
  net_value_field: {
    width: "10%",
  },
  Disc: {
    width: "5%",
  },
  deleteAction: {
    width: "25%",
  },
  Salesman: {
    width: "10%",
  },
  uom: {
    width: "10%",
  },
  net: {
    width: "18%",
  },
  customSelect: {
    marginBottom: 15,
  },
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "22px",
    },
  },
}));

const BrandWisePurchaseReport = () => {
  const classes1 = useStyles1();
  let clientName = "";
  let cAmt = 0;
  let iFlag = 0;
  let dbTotal = 0;
  let iNum = 0;
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [allCustomer, setAllCustomer] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [category, setAllCategory] = React.useState([]);

  
  const [allUnits, setAllUnits] = React.useState([]);
  const [billDetail, setBillDetail] = React.useState({});
  const [condensed, setCondensed] = React.useState([]);
  const [detailed, setDetailed] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
    ddl_brand: "",
    ddl_Category:"",
    txt_discount_from: "",
    txt_discount_to: "",
    ddl_type: "",
    txt_from_date: currentDate1(),
    txt_to_date: currentDate(),
  });
  const [viewRes, setViewRes] = React.useState("hidden");
  const [collapsible, setCollapsible] = React.useState(true);
  const [check, setCheck] = React.useState("");
  const [check2, setCheck2] = React.useState(false);

  const options = [
    { value: "Condensed", label: "Condensed" },
    { value: "Detailed", label: "Detailed" },
  ];
  const [searchPdf, setAllSearchListPdf] = React.useState([]);
  const [BrandWiseReportPdf, setAllBrandWiseReportPdf] = React.useState([]);
  const [addItem, setAddItem] = React.useState({
    // txtQuantity: "",
    // txtRate: "",
    // txtValue: "",
    // item: "",
    // brand: "",
    category: "",
    sales_id: "",
    item_id: "",
    category_id: "",

    // itemImg: "",
  });

  const condensedDataPdf = [
    ["Sr. No.", "Brand", "Uom", "Quantity", "Net Amount"],
  ];
  const detailedDataPdf = [
    ["Sr. No.", "Brand", "Item", "Uom", "Quantity", "Net Amount"],
  ];
  const searchData = [
    [
      addSearch?.ddl_brand ? `Brand: ${addSearch?.ddl_brand?.label}` : "",
      addSearch?.ddl_type ? `Type: ${addSearch?.ddl_type?.label}` : "",

      addSearch?.txt_from_date ? `From Date: ${addSearch?.txt_from_date}` : "",
      addSearch?.txt_to_date ? `To Date: ${addSearch?.txt_to_date}` : "",
    ],
  ];

  const fetchData = () => {
    getAllBrand((res) => {
      //console.log(res, "brand");
      setAllBrands(res);
    });

    getAllCategoryById((res)=>{
      setAllCategory(res);
    })
  };

  React.useEffect(() => {
    fetchData();
    setAllUnits(directPurchaseFormRowData);
  }, []);

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };
  const onSelect = (info, v) => {
    setCheck(v.label);
    setAddSearch({ ...addSearch, [info.name]: v });
    setCheck2(false);
  };

  const onSearchReport = (e) => {

    if (addSearch.ddl_type.value === "Detailed") 
    {
      setCheck2(true);
      setRefresh(false);
      e.preventDefault();
      if (!addSearch.ddl_brand && !addSearch.ddl_Category) {
      
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Please select  Brand or Category before searching", msgType: "error" },
        });
        return; 
      }
      setLoading(true);
      getReportPurchaseDetailed(
        addSearch,
        (res, pdf) => {
          console.log(res, "addSearch");
          setDetailed(res);
          setAllBrandWiseReportPdf(pdf);
          setViewRes("visible");
          setLoading(false);
        },
        (err) => {
          setDetailed([]);
          setLoading(false)
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
      //   setRefresh(false);
      //   e.preventDefault();
      //   setLoading(true);
      //   getAllCustomerDetail(
      //     (r) => {
      //       setAllCustomer(r);
      //       setViewRes("visible");
      //       setLoading(false);
      //     },
      //     (err) => {
      //       setLoading(false);
      //       setAllCustomer([]);
      //       setViewRes("visible");

      //       dispatch({

      //         type: actionTypes.SET_OPEN_MSG,
      //         payload: { msg: err, msgType: "error" },
      //       });
      //     },
      //     addSearch
      //   );
    } else if (addSearch.ddl_type.value === "Condensed") {
      setCheck2(true);
      setRefresh(false);
      e.preventDefault();
      if (!addSearch.ddl_brand && !addSearch.ddl_Category) {
      
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Please select  Brand  before searching", msgType: "error" },
        });
        return; 
      }
      setLoading(true);
      getReportPurchaseCondensed(
        addSearch,
        (res, pdf) => {
          //console.log(res, "addSearch/con");
          setCondensed(res);
          setAllBrandWiseReportPdf(pdf);
          setViewRes("visible");
          setLoading(false);
        },
        (err) => {
          setCondensed([]);
          setLoading(false)
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
    }
    // else if (addSearch.ddl_type.value === "Condensed") {
    //     setCheck2(true);
    //     setRefresh(false);
    //     e.preventDefault();
    //     setLoading(true);
    //     //console.log("addSearch")
    //     let a = []
    //     // allBrands.map((r, i) => {
    //     getAllBrandReport(
    //         // r.value,
    //         addSearch,
    //         (res) => {
    //             //console.log(res,"addSearch")
    //             setCondensed(res)
    //             a.push({ res })
    //             setViewRes("visible");
    //             setLoading(false);
    //         },
    //         (err) => {
    //             dispatch({

    //                 type: actionTypes.SET_OPEN_MSG,
    //                 payload: { msg: err, msgType: "error" },
    //             });
    //         }
    //     )
    //     // })

    //     // //console.log(a,"aaaaaaaaaa")
    // }
    else {
      setCheck2(false);
      setLoading(false);
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Select Type", msgType: "info" },
      });
    }
  };

  const onClickRefresh = () => {
    setCheck(false);
    setRefresh(!refresh);
    setAddSearch({
      ddl_brand: "",
      ddl_Category:"",
      ddl_type: "",
      txt_from_date: currentDate1(),
      txt_to_date: currentDate(),
    });
  };

  const classes = useStyles();

  const headerData = [
    {
      id: "ids",
      label: "#",
      align: "left",
    },
    {
      id: "brand",
      label: "Brand",
      align: "left",
    },
    // {
    //   id: "category",
    //   label: "Category",
    //   align: "left",
    // },
    {
      id: "item",
      label: "Item",
      align: "left",
    },
    {
      id: "caption",
      label: "UOM",
      align: "left",
    },
    {
      id: "qty",
      label: "Quantity",
      align: "left",
    },
    {
      id: "totalNetValue1",
      label: "Net Amount",
      align: "right",
    },
  ];
  // export to excel
  const headerDataCond = [
    {
      id: "ids",
      label: "Id",
      align: "left",
    },
    {
      id: "brand",
      label: "Brand",
      align: "left",
    },
    {
      id: "uom",
      label: "UOM",
      align: "left",
    },
    {
      id: "qty",
      label: "Quantity",
      align: "right",
    },
    {
      id: "totalNetValue1",
      label: "Net Amount",
      align: "right",
    },
  ];
  const onhandleExportToExcelCondensed = () => {
    const BrandWisePurchaseReportTable = condensed.map((acc) => {
      return {
        Sl_No: acc.ids,
        Brand: acc.brand,
        Uom: acc.uom,
        Quantity: acc.qty,
        Amount: acc.totalNetValue,
      };
    });
    const fileName = " Brand Wise Purchase Report";
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(BrandWisePurchaseReportTable);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  const onhandleExportToExcel = () => {
    const BrandWisePurchaseReportTable = detailed.map((acc) => {
      return {
        Sl_No: acc.ids,
        Brand: acc.brand,
        Item: acc.item,
        Uom: acc.caption,
        Qty: acc.qty,
        Amount: acc.totalNetValue,
      };
    });
    const fileName = " Brand Wise Purchase Report";
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(BrandWisePurchaseReportTable);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const onClickCollaps = () => {
    collapsible ? setCollapsible(false) : setCollapsible(true);
  };

  //pdf
  const onClickPdfDetailed = (e) => {
    e.preventDefault();

    let doc = new jsPDF("landscape", "pt", "A4");
    autoTable(doc, {
      head: searchData,
      body: searchPdf,
      didDrawCell: (BrandWisePurchaseReportPdf) => {
        //console.log(BrandWiseReportPdf.column.index);
      },
    });
    autoTable(doc, {
      head: detailedDataPdf,
      body: BrandWisePurchaseReportPdf,
      didDrawCell: (BrandWisePurchaseReportPdf) => {
        //console.log(BrandWiseReportPdf.column.index);
      },
    });
    doc.save(`BrandWisePurchaseReportReport${currentDate()}.pdf`);
    // doc.html(document.getElementById('pdf-view'), {
    //   callback: () => {
    //     doc.save(`CustomerWiseSalesReport${currentDate()}.pdf`);
    //   }
    // });
    // setClassicModal(true);
  };
  const onClickPdfCondensed = (e) => {
    e.preventDefault();

    let doc = new jsPDF("landscape", "pt", "A4");
    autoTable(doc, {
      head: searchData,
      body: searchPdf,
      didDrawCell: (BrandWisePurchaseReportPdf) => {
        //console.log(BrandWiseReportPdf.column.index);
      },
    });
    autoTable(doc, {
      head: condensedDataPdf,
      body: BrandWisePurchaseReportPdf,
      didDrawCell: (BrandWisePurchaseReportPdf) => {
        //console.log(BrandWiseReportPdf.column.index);
      },
    });
    doc.save(`BrandWisePurchaseReportReport${currentDate()}.pdf`);
    // doc.html(document.getElementById('pdf-view'), {
    //   callback: () => {
    //     doc.save(`CustomerWiseSalesReportCondensed${currentDate()}.pdf`);
    //   }
    // });
    // setClassicModal(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <PageHeader title="MIS Report > Brand Wise Purchase Report" />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle="BrandWisePurchaseReport"
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon
            onClickFilter={() => {}}
          >
            {collapsible ? (
              <GridContainer
                style={{ padding: "10px" }}
                justifyContent="flex-start"
                alignItems="center"
              >
                 {/* <GridItem xs="4">
                  <InputLabel id="label">Category</InputLabel>
                  <ReactSelect
                    options={category}
                    name="ddl_Category"
                    //   getOptionLabel={(option) => option.label}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_Category}
                    // onChange={(v) => onSelect("ddl_brand_id", v)}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                  />
                </GridItem> */}
                <GridItem xs="4">
                  <InputLabel id="label">Brand</InputLabel>
                  <ReactSelect
                    options={allBrands}
                    name="ddl_brand"
                    //   getOptionLabel={(option) => option.label}
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
                <GridItem xs="4">
                  <InputLabel id="label">Type</InputLabel>
                  <ReactSelect
                    options={options}
                    name="ddl_type"
                    getOptionLabel={(option) => option.label}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_type}
                    // onChange={(v) => onSelect("ddl_brand_id", v)}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                  />
                </GridItem>
                {/* <GridItem xs="2">
                  <InputLabel id="label">Date Between</InputLabel>
                  <TextField
                    name="txt_from_date"
                    size="small"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    value={addSearch.txt_from_date}
                    defaultValue={currentDate1()}
                    onChange={onAddSearch}
                    inputProps={{
                      shrink: true,
                      min: `${localStorage.financial?.split("-")[0]}-04-01`,
                      max: `${localStorage.financial?.split("-")[1]}-03-31`,
                    }}
                  />
                </GridItem>
                <GridItem xs="2">
                  <TextField
                    size="small"
                    name="txt_to_date"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    value={addSearch.txt_to_date}
                    defaultValue={currentDate()}
                    onChange={onAddSearch}
                    className={classes.dateField}
                    inputProps={{
                      shrink: true,
                      min: `${localStorage.financial?.split("-")[0]}-04-01`,
                      max: `${localStorage.financial?.split("-")[1]}-03-31`,
                    }}
                  />
                </GridItem> */}

                <GridItem xs="4">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <CustomButton
                      style={{ marginRight: "10px" }}
                      onClick={onSearchReport}
                    >
                      <SearchIcon />
                    </CustomButton>
                    <CustomButton name="btn_refres" onClick={onClickRefresh}>
                      <RotateLeftIcon />
                    </CustomButton>
                  </div>
                </GridItem>
              </GridContainer>
            ) : (
              ""
            )}
          </CustomCard>
        </GridItem>
      </GridContainer>

      {/* Select and Add Items */}

      {check2 ? (
        addSearch?.ddl_type.value === "Condensed" ? (
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
                          Brand Wise Purchase Report Search Result
                        </h4>
                      </GridItem>
                      {globalState.user.user_role !== "Admin" ? ( 
                      <GridItem style={{ cursor: "pointer",display: "none" }}>
                        {/* ////////////////////////////PDF/////////////////// */}

                        <IconButton onClick={onClickPdfCondensed}>
                          <Tooltip title="Export to PDF">
                            <img src={pdfIcon} style={{ width: 20 }} />
                          </Tooltip>
                        </IconButton>

                        <IconButton
                          variant="text"
                          onClick={() =>
                            onhandleExportToExcelCondensed(condensed)
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
                      ):(
                        <GridItem style={{ cursor: "pointer" }}>
                        {/* ////////////////////////////PDF/////////////////// */}

                        <IconButton onClick={onClickPdfCondensed}>
                          <Tooltip title="Export to PDF">
                            <img src={pdfIcon} style={{ width: 20 }} />
                          </Tooltip>
                        </IconButton>

                        <IconButton
                          variant="text"
                          onClick={() =>
                            onhandleExportToExcelCondensed(condensed)
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
                    {/* <CustomCard cdTitle="Customer Wise Search Result" height={400}> */}

                    <MuiTable columns={headerDataCond} rows={condensed} />

                    <Box pt={1}>
                      <GridContainer>
                        <Grid item xs={2}>
                          <Box className={classes.tableLabel} textAlign="right">
                            <b> Total</b>
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            className={classes.tableLabel}
                            textAlign="right"
                          ></Box>
                        </Grid>
                        <Grid item xs={3}>
                          <Box
                            className={classes.tableLabel}
                            textAlign="right"
                          ></Box>
                        </Grid>
                        <Grid item xs={2}>
                          <Box
                            className={classes.tableLabel}
                            textAlign="right"
                          ></Box>
                        </Grid>

                        <Grid item xs={1}>
                          <Box
                            className={classes.tableLabel}
                            mr={2}
                            textAlign="right"
                          >
                            {condensed.length
                              ? condensed
                                  .reduce(
                                    (sum, li) => Number(sum) + Number(li.qty),
                                    0
                                  )
                                  .toFixed(2)
                              : ""}
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            className={classes.tableLabel}
                            textAlign="right"
                          ></Box>
                        </Grid>

                        <Grid item xs={2}>
                          <Box
                            className={classes.tableLabel}
                            ml={10}
                            textAlign="left"
                          >
                            {condensed.length
                              ? condensed
                                  .reduce(
                                    (sum, li) =>
                                      Number(sum) + Number(li.totalNetValue),
                                    0
                                  )
                                  .toFixed(2)
                              : ""}
                          </Box>
                        </Grid>
                      </GridContainer>
                    </Box>
                    {/* </CustomCard> */}
                  </CardBody>
                </Card>
              )}
            </GridItem>
          </GridContainer>
        ) : (
          <GridContainer
            className={classes.root}
            style={{ visibility: viewRes }}
          >
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
                          Brand Wise Purchase Report Search Result
                        </h4>
                      </GridItem>
                      {globalState.user.user_role !== "Admin" ? ( 
                      <GridItem style={{ cursor: "pointer",display: "none" }}>
                        {/* ////////////////////////////PDF/////////////////// */}
                        <IconButton onClick={onClickPdfDetailed}>
                          <Tooltip title="Export to PDF">
                            <img src={pdfIcon} style={{ width: 20 }} />
                          </Tooltip>
                        </IconButton>
                        <IconButton
                          variant="text"
                          onClick={() => onhandleExportToExcel(detailed)}
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
                      ):(
                        <GridItem style={{ cursor: "pointer" }}>
                        {/* ////////////////////////////PDF/////////////////// */}
                        <IconButton onClick={onClickPdfDetailed}>
                          <Tooltip title="Export to PDF">
                            <img src={pdfIcon} style={{ width: 20 }} />
                          </Tooltip>
                        </IconButton>
                        <IconButton
                          variant="text"
                          onClick={() => onhandleExportToExcel(detailed)}
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
                    {/* {//console.log(detailed.length, "detailed")} */}

                    <MuiTable columns={headerData} rows={detailed} />

                    <Box pt={1}>
                      <GridContainer>
                        <Grid item xs={2}>
                          <Box className={classes.tableLabel} textAlign="right">
                            <b> Total</b>
                          </Box>
                        </Grid>

                        <Grid item xs={1}>
                          <Box
                            className={classes.tableLabel}
                            textAlign="right"
                          ></Box>
                        </Grid>
                        <Grid item xs={3}>
                          <Box
                            className={classes.tableLabel}
                            textAlign="right"
                          ></Box>
                        </Grid>

                        <Grid item xs={2}>
                          <Box
                            className={classes.tableLabel}
                            mr={6}
                            textAlign="left"
                          ></Box>
                        </Grid>

                        <Grid item xs={1}>
                          <Box
                            className={classes.tableLabel}
                            textAlign="left"
                          ></Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            className={classes.tableLabel}
                            mr={2}
                            textAlign="right"
                          >
                            {detailed.length
                              ? detailed
                                  .reduce(
                                    (sum, li) => Number(sum) + Number(li.qty),
                                    0
                                  )
                                  .toFixed(2)
                              : ""}
                          </Box>
                        </Grid>
                        <Grid item xs={2}>
                          <Box
                            className={classes.tableLabel}
                            ml={10}
                            textAlign="left"
                          >
                            {detailed.length
                              ? detailed
                                  .reduce(
                                    (sum, li) =>
                                      Number(sum) + Number(li.totalNetValue),
                                    0
                                  )
                                  .toFixed(2)
                              : ""}
                          </Box>
                        </Grid>
                      </GridContainer>
                    </Box>

                    {/* <CustomCard cdTitle="Customer Wise Search Result" height={400}>
                                        <TableContainer className={classes.container}>
                                            <Table
                                                className={classes.table}
                                                stickyHeader
                                                aria-label="sticky table"
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align="left">#</StyledTableCell>
                                                        <StyledTableCell align="left">item</StyledTableCell>
                                                        <StyledTableCell align="left">UOM</StyledTableCell>
                                                        <StyledTableCell align="center">Quantity</StyledTableCell>
                                                        <StyledTableCell align="right">Total NetValue</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {detailed.map((row, i) => {
                                                        return (
                                                            <StyledTableRow>
                                                                <StyledTableCell
                                                                    align="left"
                                                                    className={classes.id}
                                                                >
                                                                    {i + 1}
                                                                </StyledTableCell>

                                                                <StyledTableCell
                                                                    align="left"
                                                                    className={classes.itemDetails}
                                                                >
                                                                    {row.item}
                                                                </StyledTableCell>
                                                                <StyledTableCell
                                                                    align="left"
                                                                    className={classes.itemDetails}
                                                                >
                                                                    {row.caption}
                                                                </StyledTableCell>
                                                                <StyledTableCell
                                                                    align="center"
                                                                    className={classes.itemDetails}
                                                                >
                                                                    {row.qty ? row.qty : 0}
                                                                </StyledTableCell>
                                                                <StyledTableCell
                                                                    align="right"
                                                                    className={classes.Salesman}
                                                                >
                                                                    {row.totalNetValue ? row.totalNetValue : 0}
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer> */}

                    {/* </CustomCard> */}
                  </CardBody>
                </Card>
                // {/* </CustomCard> */}
              )}
            </GridItem>
          </GridContainer>
        )
      ) : (
        ""
      )}
      {/* PDF */}

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
            width: "75%",
            marginLeft: 15,
          }}
        >
          <div
            style={{
              textAlign: "center",
              borderBottom: "1px solid",
              width: "100%",
            }}
          >
            <h4>Customer Wise Sales Report</h4>
          </div>
          {addSearch ? (
            <GridContainer
              style={{
                margin: 2,
                textAlign: "center",
                borderBottom: "1px solid",
                width: "100%",
              }}
            >
              <GridItem>
                {addSearch?.ddl_salesman_id
                  ? `Salesman: ${addSearch?.ddl_salesman_id?.label}`
                  : ""}
              </GridItem>

              <GridItem>
                {addSearch?.ddl_type
                  ? `Type: ${addSearch?.ddl_type?.label}`
                  : ""}
              </GridItem>

              <GridItem>
                {addSearch?.txt_discount_from
                  ? `Discount From: ${addSearch?.txt_discount_from}`
                  : ""}
              </GridItem>

              <GridItem>
                {addSearch?.txt_discount_to
                  ? `Discount To : ${addSearch?.txt_discount_to}`
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
          {check === "Condensed" ? (
            <TableContainer>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">#</StyledTableCell>
                    <StyledTableCell align="left">Client</StyledTableCell>
                    {/* <StyledTableCell align="right">Qty(UOM)</StyledTableCell> */}
                    <StyledTableCell align="right">Amount</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allCustomer.map((row, i) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell align="left" className={classes.id}>
                          {i + 1}
                        </StyledTableCell>

                        <StyledTableCell
                          align="left"
                          className={classes.itemDetails}
                        >
                          {row.customer_name}
                        </StyledTableCell>

                        {/* <StyledTableCell
                        align="right"
                        className={classes.Salesman}
                      >
                        {row.quantity}
                        
                      </StyledTableCell> */}
                        <StyledTableCell
                          align="right"
                          className={classes.Salesman}
                        >
                          {Number(row.net_value).toFixed(2)}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <GridContainer
              className={classes.root}
              style={{ visibility: viewRes }}
            >
              <GridItem xs="12">
                <TableContainer>
                  <Table
                    className={classes.table}
                    stickyHeader
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">#</StyledTableCell>
                        <StyledTableCell align="left">Client</StyledTableCell>
                        <StyledTableCell align="left">
                          Parent Category
                        </StyledTableCell>
                        <StyledTableCell align="right">Qty</StyledTableCell>

                        <StyledTableCell align="right">UOM</StyledTableCell>

                        <StyledTableCell align="right">Amount</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allCustomer.map((row, i) => {
                        //console.log(clientName, iFlag, "1st time");

                        if (
                          clientName.toString() === row.customer_name.toString()
                        ) {
                          iFlag = 1;
                          cAmt = row.net_value;
                        } else {
                          clientName = row.customer_name;
                          iFlag = 0;
                          iNum = iNum + 1;
                          cAmt += row.net_value;
                        }
                        dbTotal = dbTotal + row.net_value;
                        {
                          /* //console.log(row.customer_name, "clientNameahh3"); */
                        }
                        //console.log(clientName, iFlag, "after loop");

                        return (
                          <StyledTableRow>
                            <StyledTableCell
                              align="center"
                              className={classes.id}
                            >
                              {iFlag === 0 ? iNum : ""}
                            </StyledTableCell>

                            <StyledTableCell
                              align="left"
                              className={classes.itemDetails}
                            >
                              {iFlag === 0 ? clientName : ""}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className={classes.itemDetails}
                            >
                              {row.category ? row.category : row.child_category}
                            </StyledTableCell>

                            <StyledTableCell
                              align="right"
                              className={classes.Salesman}
                            >
                              {Number(row.quantity).toFixed(2)}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.uom}
                            >
                              {row.uom_name}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.net}
                            >
                              {Number(row.net_value).toFixed(2)}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </GridItem>
            </GridContainer>
          )}
        </div>
      </MasterModel>
    </ThemeProvider>
  );
};

export default BrandWisePurchaseReport;
