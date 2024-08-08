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
import { currentDate, currentDate1,dateFormateField } from "../HelperComponent/utils";
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
import FileSaver from 'file-saver';
import XLSX from 'xlsx'

//PDF
import pdfIcon from "../../../assets/img/pdf-icon.png"
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";


const useStyles1 = makeStyles(styles);

import {
  appFontWeight,
  appFontWeightThin,
  tblBodyHoverColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { getOpeningStock } from "../../../services/ItemOpeningClosingValuService";
import { getOpeningClosingStockValuation } from "services/ItemOpeningClosingValuService";
import { getClosingStock } from "../../../services/ItemOpeningClosingValuService";
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

let options = [
  { value: "Opening", label: "Opening" },
  { value: "Closing", label: "Closing" },

];

const ItemOpeningClosingValuePage = () => {
  const classes1 = useStyles1()

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
  const [stockOpening, setStockOpening] = React.useState([]);
  const [stockClosing, setStockClosing] = React.useState([]);
  const [rowInfo, setRowInfo] = React.useState([]);
  const [itemInfo, setItemInfo] = React.useState([]);
  const [itemDetails, setItemDetails] = useState([])
  const [openingStock, setOpeningStock] = React.useState(0);
  const [collapsible, setCollapsible] = React.useState(true)
  
  const [stockPdf, setAllStockPdf] = React.useState([]);
  const [searchPdf, setAllSearchListPdf] = React.useState([])

  // const [error, setError] = React.useState({
  //   ddl_showroom_warehouse: false,
  // });

  const [addSearch, setAddSearch] = React.useState({
    ddl_showroom_warehouse: "",
    ddl_stock:'',
    ddl_brand:"",


  });
  const [check, setCheck] = React.useState("");
  const [check2, setCheck2] = React.useState(false);
  console.log(addSearch.ddl_showroom_warehouse, "sen1234")
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

  };

  //onSearch
  const onSearchStock = (e) => {
   
    if (addSearch.ddl_stock.value === "Opening") {
      setCheck2(true);
      setRefresh(false);
      e.preventDefault();
      setLoading(true);
    getOpeningStock(
        (stock) => {
          console.log(stock, "sen22/04/check")
          setStockOpening(stock);         

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
      else if (addSearch.ddl_stock.value === "Closing"){

        setCheck2(true);
        setRefresh(false);
        e.preventDefault();
        setLoading(true);
      getClosingStock(
          (stock) => {
            console.log(stock, "sen22/04/check")
            setStockClosing(stock);         
  
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
      else {
        setCheck2(false);
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Select Stock Type", msgType: "info" },
        });
      }
  };

  const onClickRefresh = () => {
    setRefresh(!refresh);
    setAddSearch({
      ddl_showroom_warehouse: "",
      ddl_stock:'',
      ddl_brand:"",
    });
  };


  

  React.useEffect(() => {

    fetchData();
    // setAllUnits(stockRegisterRowData);



  }, []);

  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };

  const headerDataOpening = [
    {
      id: "itID",
      label: "#",
      align: "left",
    },
    {
      id: "itItem",
      label: "Item Name",
      align: "left",
    },
    {
      id: "itBrand",
      label: "Brand",
      align: "left",
    },
    {
      id: "itShowroom",
      label: "Showroom",
      align: "left",
    },
    {
      id: "itOpeningQty",
      label: "Opening Qty",
      align: "right",
    },
    {
      id: "itOpeningRate",
      label: "Rate",
      align: "right",
    },
    {
      id: "itOpeningValue",
      label: "Opening Value",
      align: "right",
    },
 
   
    // {
    //   id: "stoAction",
    //   label: "Action",
    //   align: "right",
    // },

  ];
  const headerDataClosing = [
    {
      id: "itID",
      label: "#",
      align: "left",
    },
    {
      id: "itItem",
      label: "Item Name",
      align: "left",
    },
    {
      id: "itBrand",
      label: "Brand",
      align: "left",
    },

    {
      id: "itShowroom",
      label: "Showroom",
      align: "left",
    },
   
    {
      id: "itClosingQty",
      label: "Closing Qty",
      align: "right",
    },
    {
      id: "itClosingRate",
      label: "Rate",
      align: "right",
    },
    {
      id: "itClosingValue",
      label: "Closing Value",
      align: "right",
    },
   
    // {
    //   id: "stoAction",
    //   label: "Action",
    //   align: "right",
    // },

  ];
//   const stpData = [
//     {
//       id: "stpID",
//       label: "ID",
//       align: "left",
//     },
//     {
//       id: "stpDate",
//       label: "Date",
//       align: "left",
//     },
//     {
//       id: "stpOpening",
//       label: "Opening",
//       align: "right",
//     },
//     {
//       id: "stpPurchase",
//       label: "Purchase",
//       align: "right",
//     },
//     {
//       id: "stpPurchaseReturn",
//       label: "Purchase Return",
//       align: "right",
//     },
//     {
//       id: "stpSales",
//       label: "Sales",
//       align: "right",
//     },
//     {
//       id: "stpSalesReturn",
//       label: "Sales Return",
//       align: "right",
//     },
//     {
//       id: "stpSalesAdj",
//       label: "Stock Adj.",
//       align: "right",
//     },

//     {
//       id: "stpClosing",
//       label: "Closing",
//       align: "right",
//     },

//   ];


//   const headerDataPdf = [["Sr. No.", "Item Details", "UOM", "Opening","Purchase","Purchase Return","Sales Return","Stock Return","Stock Transfer","Stock Received","Closing"]];
//   const searchData = [[addSearch?.ddl_brand ? `Brand: ${addSearch?.ddl_brand?.label}`: '',
//   addSearch?.ddl_category?.label ? `Category: ${addSearch?.ddl_category?.label}`: '',
//   addSearch?.ddl_showroom_warehouse?.label ? `Warehouse : ${addSearch?.ddl_showroom_warehouse?.label}`: '',
//   addSearch?.txt_from_date ? `From Date: ${addSearch?.txt_from_date}` : '',                      
//                       addSearch?.txt_to_date ? `To Date: ${addSearch?.txt_to_date}` : ''
                    
//                     ]]; 

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };
  const onSelect = (info, v) => {
    setCheck(v.label);
    setAddSearch({ ...addSearch, [info.name]: v });
    setCheck2(false);
  };


  const classes = useStyles();

//   const onClickView = (row) => {
//     // setClassicModal(true);
//     console.log(row, "sen1405")
//     setClassicModal(true);
//     setRowInfo(row);
//     getItemByName(
//       row.item_id,
//       (r) => {
//         console.log(r[0].id, "sen28/id1")

//         getOpeningStock(
//           r[0].id,
//           addSearch.txt_from_date,
//           addSearch.ddl_showroom_warehouse.value,
//           (a) => {
//             setOpeningStock(a)
//           }
//         )

//         PurchaseListOfItem(
//           r[0].id,
//           addSearch,
//           (r) => {
//             console.log(r, "sen28/idr")
//             setItemDetails(r)
//           },
//           (err) => {

//             setItemDetails([])
//             dispatch({

//               type: actionTypes.SET_OPEN_MSG,
//               payload: { msg: err, msgType: "error" },
//             });

//           }
//         )
//         setItemInfo(r)
//         setCheck(true)
//       },
//       (err) => {
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       }
//     );
//   };

  const onCloseModel = () => {
    setClassicModal(false);
    setItemInfo([]);
    setRowInfo([]);
    setItemDetails([]);

    // window.location.reload(false)
  };

  // export to excel

  const onhandleExportToExcelOpening = () => {
    const StockRegisterTable = stockOpening.map(item => {
      console.log(item,"sankhaitem")
      return {
        Sl_No: item.itID,
        Item_Name: item.itItem,
        Brand: item.itBrand,
        Showroom: item.itShowroom,
        Opening_Qty: item.itOpeningQty,
        Rate: Number(item.itOpeningRate),
        Opening_Value: Number(item.itOpeningValue),
     

      }
    })



    const fileName = 'Stock Register'
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(StockRegisterTable);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }


  const onhandleExportToExcelClosing = () => {
    const StockRegisterTable = stockClosing.map(item => {
      console.log(item,"sankhaitem")
      return {
        Sl_No: item.itID,
        Item_Name: item.itItem,
        Brand: item.itBrand[0],
        Showroom: item.itShowroom,
        Closing_Qty: item.itClosingQty,
        Rate: Number(item.itClosingRate),
        Closing_Value: Number(item.itClosingValue),
     

      }
    })



    const fileName = 'Stock Register'
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(StockRegisterTable);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }
  

  const onClickCollaps = () => {
    collapsible ?
      setCollapsible(false)
      :
      setCollapsible(true)
  }

   //pdf
//    const onClickPdf = (e) => {
//     e.preventDefault();

//     let doc = new jsPDF("landscape", 'pt', 'A4');
//     autoTable(doc, {
//       head: searchData,
//       body: searchPdf,
//       didDrawCell: (ledgerPdf) => {
//         console.log(ledgerPdf.column.index)
//       },
//     })
//     autoTable(doc, {
//       head: headerDataPdf,
//       body: stockPdf,
//       columnStyles: {
//         3: {
//             halign: 'right'
//         },
//         4: {
//           halign: 'right'
//          },
//         5: {
//             halign: 'right'
//         },
//         6: {
//             halign: 'right'
//         },
//         7: {
//             halign: 'right'
//         },
//         8: {
//             halign: 'right'
//         },
//         9: {
//             halign: 'right'
//         },
//         10: {
//             halign: 'right'
//         }
//     },
//       didDrawCell: (cell,stockPdf) => {
//         // console.log(stockPdf.column.index)
        
//       },
//     })
//     doc.save(`StockRegisterPage${currentDate()}.pdf`);
//     // doc.html(document.getElementById('pdf-view'), {
//     //   callback: () => {
//     //     doc.save(`StockRegisterPage${currentDate()}.pdf`);
//     //   }
//     // });
//     // setClassicModal(true);
//   };

  return (

    <ThemeProvider theme={theme}>
      <PageTitle title="MIS Report > Item Opening Closing Stock Valuation " />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Item Opening Closing Stock Valuation"
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon>
            {
              collapsible ?
                <Paper elevation="0" className={classes.searchBar}>
                  <GridContainer justifyContent="flex-start" alignItems="center">
                
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
                    <GridItem xs="3">
                      <InputLabel id="label">Brand</InputLabel>
                      <ReactSelect
                        options={allBrands}
                        getOptionLabel={(option) => option.label}

                        placeholder="Select"
                        name="ddl_brand"
                        onChange={(v, info) => onSelect(info, v)}
                        value={addSearch.ddl_brand}
                       
                        formatGroupLabel={(d) => d.label}
                        menuPortalTarget={document.body}
                        styles={reactSelectStyles}
                        className={classes.customSelect}


                      />
                    </GridItem>
                    <GridItem xs="3">
                      <InputLabel id="label">Stock</InputLabel>
                      <ReactSelect
                        options={options}
                        getOptionLabel={(option) => option.label}

                        placeholder="Select"
                        name="ddl_stock"
                        onChange={(v, info) => onSelect(info, v)}
                        value={addSearch.ddl_stock}
                       
                        formatGroupLabel={(d) => d.label}
                        menuPortalTarget={document.body}
                        styles={reactSelectStyles}
                        className={classes.customSelect}


                      />
                    </GridItem>

                 

                    <GridItem xs="3">
                      <div
                        style={{
                          float: "right",
                          display: "flex",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <CustomButton
                          onClick={onSearchStock}
                          style={{ marginRight: "10px" }}>
                          <SearchIcon />
                        </CustomButton>
                        <CustomButton
                         onClick={onClickRefresh}
                         >
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
                : ''}
          </CustomCard>
        </GridItem>
      </GridContainer>
{check2 ? (addSearch?.ddl_stock.value === "Opening" ?(
      <GridContainer className={classes.root}>
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
                  <h4 className={classes1.headerCdTitle}> Stock List</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? (
                <GridItem style={{ cursor: "pointer",display: "none" }}>
                  {/* ////////////////////////////PDF/////////////////// */}
                  {/* <IconButton onClick={onClickPdf}>

                    <Tooltip title="Export to PDF">
                      <img src={pdfIcon} style={{ width: 20 }} />

                    </Tooltip>
                  </IconButton> */}
                  <IconButton variant="text" onClick={() => onhandleExportToExcelOpening(stockOpening)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  {/* ////////////////////////////PDF/////////////////// */}
                  {/* <IconButton onClick={onClickPdf}>

                    <Tooltip title="Export to PDF">
                      <img src={pdfIcon} style={{ width: 20 }} />

                    </Tooltip>
                  </IconButton> */}
                  <IconButton variant="text" onClick={() => onhandleExportToExcelOpening(stockOpening)} >
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
                columns={headerDataOpening}
                rows={stockOpening}
                // onClickViewOne={onClickView}
              />
            
            <Box pt={1} >           
                <GridContainer>
                {stockOpening.length
                        ?
                  <Grid item xs={3}>
                    <Box className={classes.tableLabel} ml={21} textAlign="right">
                     <b> Total</b>
                    </Box>
                  </Grid>      
                  : ""}
   <Grid item xs={1}>
                     <Box className={classes.tableLabel} ml={18} textAlign="right">
                    
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                     <Box className={classes.tableLabel} ml={30} textAlign="right">
                     {stockOpening.length
                        ? 
                        stockOpening.reduce(
                              (sum, li) => Number(sum) + Number(li.itOpeningQty),
                              0
                            ).toFixed(2)
                     
                        : ""}
                      </Box>
                    </Grid>

                   

                    <Grid item xs={2}>
                     <Box className={classes.tableLabel} ml={19} textAlign="left">
                      
                      </Box>
                    </Grid> 
                   
                    <Grid item xs={2}>
                     <Box className={classes.tableLabel} ml={8} textAlign="left">
                     {stockOpening.length
                          ? 
                          stockOpening.reduce(
                                (sum, li) =>
                                 ( Number(sum) +
                                  Number(
                                    li.itOpeningValue
                                  )),
                                0
                              ).toFixed(2)
                            
                          : ""}
                      </Box>
                    </Grid>    
                </GridContainer>

            
              </Box>

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

):(
  <GridContainer className={classes.root}>
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
                  <h4 className={classes1.headerCdTitle}>Stock Register List</h4>
                </GridItem>
                <GridItem style={{ cursor: "pointer" }}>
                  {/* ////////////////////////////PDF/////////////////// */}
                  {/* <IconButton onClick={onClickPdf}>

                    <Tooltip title="Export to PDF">
                      <img src={pdfIcon} style={{ width: 20 }} />

                    </Tooltip>
                  </IconButton> */}
                  <IconButton variant="text" onClick={() => onhandleExportToExcelClosing(stockClosing)} >
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
                columns={headerDataClosing}
                rows={stockClosing}
                // onClickViewOne={onClickView}
              />
             
              <Box pt={1} >           
                <GridContainer>
                {stockClosing.length
                        ?
                  <Grid item xs={3}>
                    <Box className={classes.tableLabel}  textAlign="right">
                     <b> Total</b>
                    </Box>
                  </Grid>      
                  : ""}

                    <Grid item xs={1}>
                     <Box className={classes.tableLabel}  textAlign="right">
                      
                      </Box>
                    </Grid>

                    <Grid item xs={2}>
                     <Box className={classes.tableLabel} textAlign="right">
                    
                      </Box>
                    </Grid> 

                    <Grid item xs={2}>
                     <Box className={classes.tableLabel} ml={5} textAlign="right">
                      {stockClosing.length
                        ? 
                        stockClosing.reduce(
                              (sum, li) => (Number(sum) + Number(li.itClosingQty)).toFixed(2),
                              0
                            )
                     
                        : ""}
                      </Box>
                    </Grid> 
                    <Grid item xs={1}>
                    
                    </Grid> 
                    
                    <Grid item xs={3}>
                     <Box className={classes.tableLabel} ml={18}  textAlign="center">
                     {stockClosing.length
                          ? 
                          stockClosing.reduce(
                                (sum, li) =>
                                 ( Number(sum) +
                                  Number(
                                    li.itClosingValue
                                  )).toFixed(2),
                                0
                              )
                            
                          : ""}
                      </Box>
                    </Grid>    
                </GridContainer>

            
              </Box>

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
)
):(
  ''
)
      } 

     
    </ThemeProvider>
  );
};

export default ItemOpeningClosingValuePage;