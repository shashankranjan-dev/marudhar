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
  getAllReferenceItemWiseSalesReport,


} from "../../../services/referenceItemWiseSalesService";
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
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";
// import { ColoseButton } from "../Components/CustomButton";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appScrollBar,
  appDefaultFamily,
  appFontWeight,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
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
import { getListReference } from "../../../services/referencesService";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from 'file-saver';
import XLSX from 'xlsx'

//PDF
import pdfIcon from "../../../assets/img/pdf-icon.png"
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
const ExcelJS = require('exceljs');


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
    padding: "10px 5px",
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
  container: {
    ...appScrollBar,
    maxHeight: 380,
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
    width: "35%",
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
    width: "15%",
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



const referenceItemWiseSalesPage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [allReferenceMan, setAllReferenceMan] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [billDetail, setBillDetail] = React.useState({});
  const [allReference, setAllReference] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
    ddl_reference_id: "",
    txt_discount_from: "",
    txt_discount_to: "",
    txt_from_date: currentDate1(),
    txt_to_date: currentDate(),
  });
  const [viewRes, setViewRes] = React.useState("hidden");
  const [collapsible, setCollapsible] = React.useState(true)
  const [addItem, setAddItem] = React.useState({

    category: "",
    sales_id: "",
    item_id: "",
    category_id: "",

    // itemImg: "",
  });
  const [CustomerWiseSalesPdf, setAllCustomerWiseSalesPdf] = React.useState([]);
  const [searchPdf, setAllSearchListPdf] = React.useState([])

  const onChangeBillDate = (e) => {
    const { name, value } = e.target;
    setBillDetail({ ...billDetail, [name]: value });
  };


  const headerDataPdf = [["Sr. No.","Parent Category", "Qty", "UOM","Amount",]];
  const searchData = [[
                      
                      addSearch?.ddl_reference_id ? `Salesman: ${addSearch?.ddl_reference_id?.label}` : '',
                      addSearch?.txt_discount_from? `Discount From: ${addSearch?.txt_discount_from}` : '',
                      addSearch?.txt_discount_to? `Discount To : ${addSearch?.txt_discount_to}` : '',
                      addSearch?.txt_from_date ? `From Date: ${addSearch?.txt_from_date}` : '',
                      addSearch?.txt_to_date ? `To Date: ${addSearch?.txt_to_date}` : ''
                    ]];




  const fetchData = () => {


    getListReference(
      (r) => {
        setAllReference(r);

      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };

  React.useEffect(() => {
    fetchData();
    setAllUnits(directPurchaseFormRowData);
  }, []);

  const onAddSearch = (e) => {

    const { name, value } = e.target;
    // console.log(e.target, "22")
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };
  const onSelect = (info, v) => {
    setAddSearch({ ...addSearch, [info.name]: v });
    // console.log(info, v, "dd")
  };

  const onSearchReport = (e) => {
    setRefresh(false);
    e.preventDefault();
    setLoading(true);
    getAllReferenceItemWiseSalesReport(
      (r,pdf) => {
        if (r.length) {
          setAllReferenceMan(r)
          setAllCustomerWiseSalesPdf(pdf)

          setViewRes("visible");
          setLoading(false);

        } else {
          setViewRes("visible");
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Sales Report not found": "info" },
          });
        }
      },
      (err) => {
        setAllReferenceMan([])
        setViewRes("visible");

        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);

      },
      addSearch
    );
  };
  // console.log(addSearch, "ra");

  const onClickRefresh = () => {
    setRefresh(!refresh);
    setAddSearch({
      txtValue: "",
      ddl_reference_id: "",
      txt_item: "",
      ddl_brand: "",
      ddl_category: "",
      txt_discount_to: "",
      txt_discount_from: "",
      txt_from_date: currentDate1(),
      txt_to_date: currentDate(),
    });
  };

  const onAddItem = (v) => {
    // setAddItem({
    //   ...addItem,
    //   itemImg: v.itemImg,
    //   brand: v.brand,
    //   item: v.item,
    // });
    // setAddedItems([...addedItems, addItem]);
    // console.log(addItem);
    // setAddItem({
    //   txtQuantity: "",
    //   txtRate: "",
    //   txtValue: "",
    //   item: "",
    //   brand: "",
    //   category: "",
    //   itemImg: "",
    // });
  };



  const onChange = (e) => {
    const { name, value } = e.target;
    setAddItem((prv) => ({ ...prv, [name]: value }));
  };
  const classes = useStyles();


  // export to excel

  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Reference Item Report']);
    const periodRow = worksheet.addRow(['Period:']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:E${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:E${periodRow.number}`);
  
    const headers = [
      'Sl No',
      'Parent Catagory',
      'Qty',
      'uom',
      'Amount',
     
      

    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const ReferenceItemTable = allReferenceMan.map((item) => {
      return {
           Sl_No: item.id,
        parent_catagory: item.category,
        Qty: item.quantity,
        uom: item.uom_name[0],
        Amount: item.net_amount,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    ReferenceItemTable.forEach((data) => {
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

    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
      const year = date.getFullYear();
    
      return `${day}-${month}-${year}`;
    }
  
    const fromDate = addSearch?.txt_from_date;
    const toDate = addSearch?.txt_to_date;
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);

     const chosenPeriod = ` ${formattedFromDate}  To  ${formattedToDate}`;
    const Reference = addSearch?.ddl_reference_id?.label ;
    // const showroom_warehouse = addSearch?.ddl_showroom_warehouse?.label ;

    periodCell.value = `Reference: ${Reference}       Period:  ${chosenPeriod}  `;
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'ReferenceItemTable.xlsx');
  };



  const onClickCollaps = () => {
    collapsible ?
      setCollapsible(false)
      :
      setCollapsible(true)
  }

  //pdf
  const onClickPdf = (e) => {
    e.preventDefault();

    let doc = new jsPDF("landscape", 'pt', 'A4');
    autoTable(doc, {
      head: searchData,
      body: searchPdf,
      didDrawCell: (ledgerPdf) => {
        // console.log(ledgerPdf.column.index)
      },
    })
    autoTable(doc, {
      head: headerDataPdf,
      body: CustomerWiseSalesPdf,
      didDrawCell: (purchasePdf) => {
        // console.log(purchasePdf.column.index)
      },
    })
    doc.save(`ReferenceItemWiseSalesReport${currentDate()}.pdf`);
    // doc.html(document.getElementById('pdf-view'), {
    //   callback: () => {
    //     doc.save(`ReferenceItemWiseSalesReport${currentDate()}.pdf`);
    //   }
    // });
    // setClassicModal(true);
  };


  return (
    <ThemeProvider theme={theme}>
      <PageHeader title="MIS Report > Reference ItemWise Sales Report " />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle=" Reference ItemWise Sales Report"

            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon
            onClickFilter={() => { }}
          >

            {
              collapsible ?
                <GridContainer
                  style={{ padding: "10px" }}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <GridItem xs="4">
                    <InputLabel id="label">Reference</InputLabel>
                    <ReactSelect
                      options={allReference}
                      name="ddl_reference_id"
                      getOptionLabel={(option) => option.label}
                      placeholder="Select"
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      styles={reactSelectStyles}
                      className={classes.customSelect}
                      onChange={(v, info) => onSelect(info, v)}
                      value={addSearch.ddl_reference_id}
                    // onChange={(v) => onSelect("ddl_brand_id", v)}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
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
                      value={addSearch.txt_from_date}
                      defaultValue={currentDate1()}
                      onChange={onAddSearch}

                      // className={classes.dateField}
                      inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
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
                      value={addSearch.txt_to_date}
                      defaultValue={currentDate()}
                      onChange={onAddSearch}
                      className={classes.dateField}

                      inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                    />
                  </GridItem>
                  <GridItem xs="1">
                    <InputLabel id="label">Discount </InputLabel>
                    <TextField
                      size="small"
                      name="txt_discount_from"
                      id="discount"
                      placeholder="%"
                      variant="outlined"
                      type="discount"
                      // className={classes.dateField}
                      fullWidth={true}
                      // value={}
                      // onChange={}
                      // className={}
                      onChange={onAddSearch}

                      value={addSearch.txt_discount_from}

                      InputLabelProps={{
                        shrink: true,


                      }}
                    />
                  </GridItem>
                  <InputLabel id="label"> to </InputLabel>
                  <GridItem xs="1">

                    <TextField
                      size="small"
                      name="txt_discount_to"
                      id="discount"
                      placeholder="%"
                      variant="outlined"
                      type="discount"
                      className={classes.dateField}
                      fullWidth={true}
                      // value={}
                      // onChange={}
                      // className={}
                      onChange={onAddSearch}

                      value={addSearch.txt_discount_to}

                      InputLabelProps={{
                        shrink: true,


                      }}
                    />
                  </GridItem>

                  <GridItem xs="12">
                    <div
                      style={{
                        float: "right",
                        display: "flex",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <CustomButton style={{ marginRight: "10px" }} onClick={onSearchReport}>
                        <SearchIcon />
                      </CustomButton>
                      <CustomButton name="btn_refres" onClick={onClickRefresh}>
                        <RotateLeftIcon />
                      </CustomButton>
                    </div>
                  </GridItem>

                </GridContainer>
                : ''}
          </CustomCard>
        </GridItem>
      </GridContainer>

      {/* Select and Add Items */}

      <GridContainer className={classes.root} style={{ "visibility": viewRes }}>
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
                  <h4 className={classes1.headerCdTitle}>Reference Item Wise Search Result</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer",display: "none"  }}>
                  {/* pdf */}
                  <IconButton onClick={onClickPdf}>

                    <Tooltip title="Export to PDF">
                      <img src={pdfIcon} style={{ width: 20 }} />

                    </Tooltip>
                  </IconButton>

                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allReferenceMan)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  {/* pdf */}
                  <IconButton onClick={onClickPdf}>

                    <Tooltip title="Export to PDF">
                      <img src={pdfIcon} style={{ width: 20 }} />

                    </Tooltip>
                  </IconButton>

                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allReferenceMan)} >
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
              {/* <CustomCard cdTitle="Reference Item Wise Search Result" height={350}> */}
              <TableContainer className={classes.container}>
                <Table className={classes.table}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">#</StyledTableCell>

                      <StyledTableCell align="left">Parent Catagory</StyledTableCell>

                      <StyledTableCell align="right">Qty</StyledTableCell>

                      <StyledTableCell align="right">UOM</StyledTableCell>

                      <StyledTableCell align="right">Amount</StyledTableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {console.log(allReference, "ABD")} */}
                    {allReferenceMan.map((row, i) => (

                      <StyledTableRow >
                        <StyledTableCell align="center" className={classes.id}>
                          {i + 1}
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
                          className={classes.Salesman}
                        >
                          {row.uom_name}

                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.Salesman}
                        >
                          {row.net_value}

                        </StyledTableCell>

                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
          )}
          {/* </CustomCard> */}
        </GridItem>
      </GridContainer>

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
          }}>
          <div style={
            { textAlign: "center", 
            borderBottom: "1px solid", width: "100%" }} >
              <h4>Reference Item Wise Sales Report</h4></div>

          {
            addSearch ?
              <GridContainer style={
                { margin:2,textAlign: "center", 
                borderBottom: "1px solid", width: "100%" }}>
                <GridItem>
                  {addSearch?.ddl_reference_id ? `Salesman: ${addSearch?.ddl_reference_id?.label}` : ''}
                </GridItem>

                <GridItem>
                  {addSearch?.txt_discount_from ? `Discount From: ${addSearch?.txt_discount_from}` : ''}
                </GridItem>


                <GridItem>
                  {addSearch?.txt_discount_to ? `Discount To : ${addSearch?.txt_discount_to}` : ''}
                </GridItem>

                <GridItem >
                  {addSearch?.txt_from_date ? `From Date: ${addSearch?.txt_from_date}` : ''}
                </GridItem>

                <GridItem >
                  {addSearch?.txt_to_date ? `To Date: ${addSearch?.txt_to_date}` : ''}
                </GridItem>
              </GridContainer>
              : ''
          }
          <TableContainer>
            <Table className={classes.table}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">#</StyledTableCell>

                  <StyledTableCell align="left">Parent Catagory</StyledTableCell>

                  <StyledTableCell align="right">Qty</StyledTableCell>

                  <StyledTableCell align="right">UOM</StyledTableCell>

                  <StyledTableCell align="right">Amount</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {/* {console.log(allReference, "ABD")} */}
                {allReferenceMan.map((row, i) => (

                  <StyledTableRow >
                    <StyledTableCell align="center" className={classes.id}>
                      {i + 1}
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
                      className={classes.Salesman}
                    >
                      {row.uom_name}

                    </StyledTableCell>

                    <StyledTableCell
                      align="right"
                      className={classes.Salesman}
                    >
                      {row.net_value}

                    </StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>



        </div>
      </MasterModel>
    </ThemeProvider>
  );
};

export default referenceItemWiseSalesPage;
