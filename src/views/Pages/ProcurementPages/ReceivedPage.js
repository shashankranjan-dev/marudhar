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
import { getListVendor } from "../../../services/vendorService";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { ReceivedRowData } from "../../../services/receivedService";
import { getAllItemReceivedList,getSearchAllItemReceivedList } from "../../../services/ItemReceivedService";
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
import moment from "moment";

import { Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";


import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";

import theme from "../../../theme/theme";
import ReactSelect from "react-select";
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
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import  FileSaver from 'file-saver';
import XLSX from 'xlsx'

import { getItemReceivedById } from "../../../services/ItemReceivedService";
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

const ReceivedPage = () => {
  const classes1 = useStyles1()
  const history = useHistory();
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [receivedList, setAllReceivedList] = React.useState([]);
  const [viewRes, setViewRes] = React.useState("hidden");

  // const [receivedGRN, setReceivedGRN] = React.useState([]);
  const [allvendor, setAllVendors] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [addSearch, setAddSearch] = React.useState({
    grn_date_from: currentDate1(),
    grn_date_to: currentDate(),
    po_date_from: currentDate1(),
    po_date_to: currentDate(),
    ddl_vendor:"",
    ddl_showroom_warehouse: "",
    txt_po_no:"",
    txt_grn_no:"",
  });
  const [allStatus, setAllStatus] = React.useState([]);
  const [classicModalView, setClassicModalView] = React.useState(false);
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  const [itemDetails, setItemDetails] = React.useState([]);
  const [collapsible, setCollapsible] = React.useState(true)
  const fetchData = () => {
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
    // getAllItemReceivedList(
    //   (r) => {
    //     setReceivedGRN(r);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );
  };
  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  const headerData = [
    {
      id: "grnID",
      label: "#",
      align: "left",
    },
    {
      id: "grnNo",
      label: "GRN No",
      align: "left",
    },
    {
      id: "grnDate",
      label: "GRN Date",
      align: "left",
    },
    {
      id: "poNo",
      label: "PO No",
      align: "left",
    },
    {
      id: "grnVendor",
      label: "Vendor",
      align: "left",
    },
    {
      id: "grnPoValue",
      label: "PO Value (Rs)",
      align: "center",
    },
    {
      id: "grnStatus",
      label: "Status",
      align: "left",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    {
      id: "grnAction",
      label: "Action",
      align: "right",
    },
  ];

  const viewData = [
    {
      id: "grn_no",
      label: "GRN No",
      align: "left",
    },
    {
      id: "grn_date",
      label: "GRN Date",
      align: "left",
    },
    {
      id: "po_date",
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
      label: "PO Value (Rs)",
      align: "left",
    },
    {
      id: "dplVendor",
      label: "Vendor",
      align: "left",
    },
 
  ];

  const onSearchItemReceived = (e) => {
    e.preventDefault();
    setLoading(true);
    getSearchAllItemReceivedList(
      (receivedList) => {
        if (receivedList.length) {    
        

          setAllReceivedList(receivedList);
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
  
      setClassicModalView(true)
   
      getItemReceivedById(
        e.grnNo,
        (r) => {
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

  const onClickRefresh = () => {
   
  
    
    setRefresh(!refresh);
    setAddSearch({
      
      grn_date_from: "",
      grn_date_to: "",
      po_date_from: "",
      po_date_to: "",
      ddl_vendor:"",
      ddl_showroom_warehouse: "",
      txt_po_no:"",
      txt_grn_no:"",
   
    });
  };


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Item Received Report']);
    const periodRow = worksheet.addRow(['Period:']);
    const periodRow1 = worksheet.addRow(['']);

    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    const periodCell1 = periodRow1.getCell(1);

    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell1.alignment = { vertical: 'middle', horizontal: 'center', bold: true };

  
    worksheet.mergeCells(`A${titleRow.number}:G${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:G${periodRow.number}`);
    worksheet.mergeCells(`A${periodRow1.number}:G${periodRow1.number}`);

  
    const headers = [
      'Sl No',
      'GRN No',
      'GRN Date',
      'Purchase Order No',
      'Vendor',
      'Purchase Order Value',
      'Status'

      
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const ItemReceivedTable = receivedList.map((recive) => {
      return {
        ID: recive.grnID,
        Grn_No: recive.grnNo,
        Grn_Date: recive.grnDate,
        
        Po_No: recive.poNo,
        Vendor: recive.grnVendor,
        PO_value: recive.grnPoValue,
        
        Status:recive.grnStatus,
      };
    });
  
    const dataStartRow = 5;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    ItemReceivedTable.forEach((data) => {
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
    
  
    const fromDate = addSearch?.grn_date_from;
    const toDate = addSearch?.grn_date_to;
    
    
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
    saveAs(data, 'Item Received List.xlsx');
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
        title="Procurement > Item Received"
        btnToolTip="Add GRN"
        addBtnLink="/admin/procurement/add-grn"
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Item Received"
           btnToolTip={collapsible?"Collaps":"Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
           filterIcon>
           {
              collapsible ?
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="flex-start" alignItems="center">
                <GridItem xs="3">
                  <InputLabel id="label">GRN No</InputLabel>
                  <TextField
                    size="small"
                    placeholder="GRN No"
                    name="txt_grn_no"
                    id="outlined-basic"
                    fullWidth={true}
                    onChange={onAddSearch}
                    value={addSearch.txt_grn_no}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs="2">
                  <InputLabel id="label">Date Between</InputLabel>
                  <TextField
                    size="small"
                    id="date"
                    variant="outlined"
                    type="date"
                    // defaultValue={currentDate1()}
                    onChange={onAddSearch}
                    name="grn_date_from"
                    value={addSearch.grn_date_from}
                    fullWidth={true}
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
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    // defaultValue={currentDate()}
                    onChange={onAddSearch}
                    name="grn_date_to"
                    value={addSearch.grn_date_to}
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
                    name="ddl_vendor"
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_vendor}

                  />
                </GridItem>

                <GridItem xs="3">
                  <InputLabel id="label">PO No</InputLabel>
                  <TextField
                    size="small"
                    placeholder="PO No"
                    name="txt_po_no"
                    onChange={onAddSearch}
                    value={addSearch.txt_po_no}
                    id="outlined-basic"
                    fullWidth={true}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs="2">
                  <InputLabel id="label">Date Between</InputLabel>
                  <TextField
                    placeholder="Start Date"
                    size="small"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    // defaultValue={currentDate1()}
                    onChange={onAddSearch}
                    name="po_date_from"
                    value={addSearch.po_date_from} 
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
                    placeholder="End Date"
                    variant="outlined"
                    type="date"
                    id="date"
                    fullWidth={true}
                    onChange={onAddSearch}
                    // defaultValue={currentDate()}
                    name="po_date_to"
                    value={addSearch.po_date_to}
                    className={classes.dateField}
                    inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                  />
                </GridItem>

                <GridItem xs="5">
                  <InputLabel id="label">Showroom / Warehouse</InputLabel>
                  <ReactSelect
                    options={allShowroomWarehouse.sort(sortWord("label"))}
                    name="ddl_showroom_warehouse"
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_showroom_warehouse}
             
                  />
                </GridItem>
                
                {/* <GridItem xs="5">
                  <InputLabel id="label">Keyword / Pharse</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Keyword / Pharse"
                    name="txt_keyword_Phrase"
                    onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    variant="outlined"
                  />
                </GridItem> */}
                <GridItem xs="12">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <CustomButton style={{ marginRight: "10px" }} 
                    onClick={onSearchItemReceived}>
                      <SearchIcon />
                    </CustomButton>
                    <CustomButton  onClick={onClickRefresh}>
                      <RotateLeftIcon />
                    </CustomButton>
                  </div>
                </GridItem>
              </GridContainer>
            </Paper>
            :''}
          </CustomCard>
        </GridItem>
      </GridContainer>
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
                      <h4 className={classes1.headerCdTitle}>Item Received</h4>
                    </GridItem>
                    {globalState.user.user_role !== "Admin" ? ( 
                    <GridItem style={{ cursor: "pointer",display: "none" }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(receivedList)} >
                        <Tooltip title="Export to Excel">
                          <img src={require("../../../assets/img/excel.png").default} />
                        </Tooltip>
                      </IconButton>
                    </GridItem>
                    ):(
                      <GridItem style={{ cursor: "pointer" }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(receivedList)} >
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
            rows={receivedList}
            onClickViewOne={onClickView}
            />
            </CardBody>
            </Card>
        </GridItem>
      </GridContainer>

)}
      <MasterModelForView
        classicModal={classicModalView}
        viewHeader="Received View"
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModalView(false);
        }}
      >
        <ProcurementView
          title="Received"
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

export default ReceivedPage;
