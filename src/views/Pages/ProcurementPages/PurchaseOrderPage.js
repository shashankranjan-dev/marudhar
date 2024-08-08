import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
//SERVICE
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";
import { getListVendor, getAllVendors } from "../../../services/vendorService";
import { getAllPurchaseList ,getSearchAllPurchaseList} from "../../../services/purchaseOrderService";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
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
import { ThemeProvider } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import ReactSelect from "react-select";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";

import { Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import theme from "../../../theme/theme";

// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";
import { currentDate,currentDate1,sortWord } from "../HelperComponent/utils";
import PurchaseOrderInvoice from "./PurchaseOrderInvoice";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import  FileSaver from 'file-saver';
import XLSX from 'xlsx'

import { getPurchaseById } from "../../../services/directPurchaseFormService";
import MasterModelForView from "../../Components/MasterModelForView";
import ProcurementView from "./ProcurementView";
const ExcelJS = require('exceljs');

const useStyles1 = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "25px",
    },
  },
  searchbtnRight: {
    float: "right",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },

  searchBar: {
    padding: "10px",
  },
  activeText: {
    fontSize: "15px",
    color: appSecondColor,
    fontWeight: 400,
  },
  customSelect: {
    marginBottom: 15,
  },
}));


const PurchaseOrderPage = () => {
  const classes1 = useStyles1()
  const classes = useStyles();
  const history = useHistory();
  const [enqueryList, setAllEnqueryList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [invoiceDetail, setInvoiceDetail] = React.useState({});
  const [allvendor, setAllVendors] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [vendorDetail, setVendorDetail] = React.useState({});
  const [vendorAddrss, setVendorAddres] = React.useState({});
  const [allPurchase, setAllPurchase] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [viewRes, setViewRes] = React.useState("hidden");
  const [addSearch, setAddSearch] = React.useState({
    txt_po_no: "",  
    ddl_vendor: "",
    txt_keyword_phrase: "",
    ddl_showroom_warehouse:"",
    txt_purchase_from_date: currentDate1(),
    txt_purchase_to_date: currentDate(),
    });
    const [allStatus, setAllStatus] = React.useState([]);
    const [classicModalView, setClassicModalView] = React.useState(false);
    const [otherCharges, setOtherCharges] = React.useState([]);
    const [addedItems, setAddedItems] = React.useState([]);
    const [itemDetails, setItemDetails] = React.useState([]);
    const [collapsible, setCollapsible] = React.useState(true)
  const fetchData = () => {
    getListShowroomWarehouse(
      (r) => {
        setAllShowroomWarehouse(r)
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    getListVendor(
      (r) => {
        setAllVendors(r);
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
  }, [refresh]);

  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };

  const headerData = [
    {
      id: "polID",
      label: "#",
      align: "left",
    },
    {
      id: "polDate",
      label: "PO Date",
      align: "left",
    },
    {
      id: "polNo",
      label: "PO No",
      align: "left",
    },
 
    {
      id: "polValue",
      label: "PO Value (Rs) ",
      align: "right",
    },
    {
      id: "polVendor",
      label: "Vendor",
      align: "left",
    },
    // {
    //   id: "poStatus",
    //   label: "Status",
    //   align: "left",
    //   salesStatus: (v) => v,
    // },

    {
      id: "polAction",
      label: "Action",
      align: "right",
    },
  ];

  const viewData = [
    {
      id: "dplBillDate",
      label: "PO Date",
      align: "left",
    },
    {
      id: "po_number",
      label: "PO No",
      align: "left",
    },
    {
      id: "po_value",
      label: "PO Value(Rs)",
      align: "left",
    },
  
    {
      id: "dplVendor",
      label: "Vendor",
      align: "left",
    },
 
  ];
  const onSearchEnquiry = (e) => {
    e.preventDefault();

    

    setLoading(true);
    getSearchAllPurchaseList(
      (enqueryList) => {

        //console.log(enqueryList,"sen123")
        
        if (enqueryList.length) {    
        

          setAllEnqueryList(enqueryList);
          setViewRes("visible");
          setLoading(false);
        } else {
          setViewRes("visible");
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Direct Purchase  not found": "info"},
          });
        }
      },
      (err) => {
        setAllEnqueryList([])
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


    //////////////view module////////////
    const onClickView = (e) => {
      //console.log(e, "sen/view")
     
      setClassicModalView(true)
   
      getPurchaseById(
        
        e.purchase_id,
        (r) => {
          //console.log(r,"sank2106")
          setAddedItems(r);
          setItemDetails(r.item_details);
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
  
    }
 

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onSelect = (info, v) => {
    setAddSearch({ ...addSearch, [info.name]: v });
  };

  const onClickPrint = (row) => {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: {},
    })
    getAllVendors(
      (r) => {
        setVendorDetail(r[0]);
        setVendorAddres(r[0].allAddress[0]);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      row.vendor_id
    );
    setInvoiceDetail(row);
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: {},
    });
    setClassicModal(true);
  };

  const onClickRefresh = () => {
   //console.log("123")
  
    
    setRefresh(!refresh);
    setAddSearch({

      txt_po_no: "",  
      ddl_vendor: "",
      ddl_vendor_label: "",
      txt_keyword_phrase: "",
      ddl_showroom_warehouse:"",
      ddl_showroom_warehouse_label: "",
      txt_purchase_from_date: "",
      txt_purchase_to_date: "",
      
   
    });
  };


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Purchase Order Report']);
    const periodRow = worksheet.addRow(['Period:']);
    const periodRow1 = worksheet.addRow(['']);

    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    const periodCell1 = periodRow1.getCell(1);

    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell1.alignment = { vertical: 'middle', horizontal: 'center', bold: true };

  
    worksheet.mergeCells(`A${titleRow.number}:F${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:F${periodRow.number}`);
    worksheet.mergeCells(`A${periodRow1.number}:F${periodRow1.number}`);

  
    const headers = [
      'Sl No',
      'Purchase Order Date',
      'Purchase Order No',
      'Purchase Order Value',
      'Vendor',
      
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const PurchaseOrderTable = enqueryList.map((purchase) => {
      return {
        ID: purchase.polID,
        Po_Date: purchase.polDate,
         Po_No: purchase.polNo,         
         Po_Value: purchase.polValue,
         Vendor: purchase.polVendor,
      };
    });
  
    const dataStartRow = 5;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    PurchaseOrderTable.forEach((data) => {
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
    
  
    const fromDate = addSearch?.txt_purchase_from_date;
    const toDate = addSearch?.txt_purchase_to_date;
    
    
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    
    const chosenPeriod = ` ${formattedFromDate}  To  ${formattedToDate}`;
    const po_no = addSearch?.txt_po_no ? addSearch?.txt_po_no :"-" ;
    const keyword_phrase = addSearch?.txt_keyword_phrase ? addSearch?.txt_keyword_phrase :"-" ;
    const vendor = addSearch?.ddl_vendor?.label ? addSearch?.ddl_vendor?.label :"-" ;
    const showroom_warehouse = addSearch?.ddl_showroom_warehouse?.label ? addSearch?.ddl_showroom_warehouse?.label :"-" ;

    

    // periodCell.value = `Po NO : ${po_no}    Period :  ${chosenPeriod}    vendor: ${vendor} `;
    // periodCell1.value = `keyword Phrase : ${keyword_phrase}    Showroom Warehouse :  ${showroom_warehouse}     `;
    
    if (po_no !== "-") {
      periodCell.value = `Po NO  : ${po_no}    Period :  ${chosenPeriod}    `;
  } else if (vendor !== "-") {
      periodCell.value = ` Vendor : ${vendor}   Period :  ${chosenPeriod}     `;
  } else if ( showroom_warehouse !== "-") {
      periodCell.value = ` Showroom Warehouse :  ${showroom_warehouse}   Period :  ${chosenPeriod}      `;
  } else if (keyword_phrase !=="-"){
   ` keyword Phrase : ${keyword_phrase}    Period :  ${chosenPeriod} `
  }
   else {
      periodCell.value = `Period :  ${chosenPeriod}    Status: ${Status}`;
  }
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Purchase Order List.xlsx');
  };



const onClickCollaps = () => {
  collapsible ?
    setCollapsible(false)
    :
    setCollapsible(true)
}



  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Procurement > Purchase Order"
        btnToolTip="Add Purchase Order"
        addBtnLink="/admin/procurement/purchase-order-form"
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Purchase Order"
           btnToolTip={collapsible?"Collaps":"Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
           filterIcon>
           {
              collapsible ?
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="flex-start" alignItems="center">
                <GridItem xs="3">
                  <InputLabel id="label">PO No</InputLabel>
                  <TextField
                    size="small"
                    placeholder="PO No"
                    type="search"
                    name="txt_po_no"
                    onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    value={addSearch.txt_po_no}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs="2">
                  <InputLabel id="label">Date Between</InputLabel>
                  <TextField
                    size="small"
                    name="txt_purchase_from_date"
                    id="date"
                    variant="outlined"
                    type="date"
                    defaultValue={currentDate1()}
                    fullWidth={true}
                    onChange={onAddSearch}
                    value={addSearch.txt_purchase_from_date}
                    // onChange={(v) => //console.log(v.target.value)}
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
                    name="txt_purchase_to_date"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    defaultValue={currentDate()}
                    onChange={onAddSearch}
                    value={addSearch.txt_purchase_to_date}
                    // onChange={(v) => //console.log(v.target.value)}
                    className={classes.dateField}
                    inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                  />
                </GridItem>
                <GridItem xs="5">
                  <InputLabel id="label">Vendor</InputLabel>
                  <ReactSelect
                    options={allvendor.sort(sortWord("label"))}
                    placeholder="Select"
                    name="ddl_vendor"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_vendor}
                  
                  />
                </GridItem>
                <GridItem xs="4">
                  <InputLabel id="label">Showroom / Warehouse</InputLabel>
                  <ReactSelect
                    options={allShowroomWarehouse.sort(sortWord("label"))}
                    placeholder="Select"
                    name="ddl_showroom_warehouse"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_showroom_warehouse}

                    // onChange={(v) => onSelect("ddl_brand_id", v)}
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                  />
                </GridItem>
                <GridItem xs="5">
                  <InputLabel id="label">Keyword / Phrase</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Keyword / Phrase"

                    name="txt_keyword_phrase"
                    type="search"
                    onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    value={addSearch.txt_keyword_phrase}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs="3">
                  <div
                   className={classes.searchbtnRight}
                  >
                    <CustomButton style={{ marginRight: "10px" }}
                     onClick={onSearchEnquiry}>
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
            :""}
          </CustomCard>
        </GridItem>
      </GridContainer>

      <MasterModel
        classicModal={classicModal}
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModal(false);
        }}
        height="auto"
        okBtnText="Print"
        modelName="Purchase Order"
        onClickOk={(e) => {
          e.preventDefault();
          window.print()
        }}
      >
        {vendorDetail && (
          <PurchaseOrderInvoice
            invoiceDetail={invoiceDetail}
            vendorDetail={vendorDetail}
            address={vendorAddrss}
          />
        )}
      </MasterModel>
      {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
      <GridContainer className={classes.root} style={{ "visibility": viewRes }}>
        <GridItem xs="12">
        <Card className={classes1.headerCard}>
            <CardHeader className={classes1.TbheaderCdhd} style={{ height: 60 }}>
                  <GridContainer justifyContent="space-between" alignItems="center">
                    <GridItem>
                      <h4 className={classes1.headerCdTitle}>Purchase Order</h4>
                    </GridItem>
                    {globalState.user.user_role !== "Admin" ? ( 
                    <GridItem style={{ cursor: "pointer",display: "none"  }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(enqueryList)} >
                        <Tooltip title="Export to Excel">
                          <img src={require("../../../assets/img/excel.png").default} />
                        </Tooltip>
                      </IconButton>
                    </GridItem>
                    ):(
                      <GridItem style={{ cursor: "pointer" }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(enqueryList)} >
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
              columns={headerData}
              onClickPrint={onClickPrint}
              rows={enqueryList}
              onClickViewOne={onClickView}
            />
          </CardBody>
            </Card>
        </GridItem>
      </GridContainer>
          )}

      <MasterModelForView
        classicModal={classicModalView}
        viewHeader="Purchase Order View"
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModalView(false);
        }}
      >
        <ProcurementView
          title="Purchase Order"
          viewData={viewData}
          addedItems={addedItems}
          itemDetails={itemDetails}
          allStatus={allStatus}
          otherCharges={otherCharges}
        />
      </MasterModelForView>
    </ThemeProvider>
  );
};

export default PurchaseOrderPage;
