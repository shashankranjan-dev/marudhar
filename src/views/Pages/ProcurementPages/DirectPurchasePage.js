import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
// import Select from "@material-ui/core/Select";
import Select from "react-select";

import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
//SERVICE
import { getListVendor } from "../../../services/vendorService";

import { getAllDirectPurchaseList ,getSearchDirectPurchase} from "../../../services/directPurchaseFormService";
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
import { ThemeProvider, Box } from "@material-ui/core";
import ReactSelect from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";
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
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import  FileSaver from 'file-saver';
import XLSX from 'xlsx'

import { getDirectPurchaseById } from "../../../services/directPurchaseFormService";
import MasterModelForView from "../../Components/MasterModelForView";
const ExcelJS = require('exceljs');


import ProcurementView from "./ProcurementView";
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
  searchbtnRight: {
    float: "right",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
}));



const DirectPurchasePage = () => {
  const history = useHistory();
  const classes1 = useStyles1()

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [viewRes, setViewRes] = React.useState("hidden");
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [allvendor, setAllVendors] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);

  const [directPurchaseList, setDirectPurchaseList] = React.useState([]);

  const [addSearch, setAddSearch] = React.useState({
  txt_direct_purchase_from_date: currentDate1(),
  txt_direct_purchase_to_date: currentDate(),
  ddl_vendor: "",
  txt_keyword_phrase: "",
  ddl_showroom_warehouse: "",
  grn_no:"",
  ddl_status:{value: "1", label: "Any"},
  });
  const [directlist, setAllDirectList] = React.useState([]);
  // const [directPurchaselist, setDirectPurchaseList] = React.useState([]);

  const [allStatus, setAllStatus] = React.useState([]);
  const [classicModalView, setClassicModalView] = React.useState(false);
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  const [itemDetails, setItemDetails] = React.useState([]);
  const [collapsible, setCollapsible] = React.useState(true)
  

//for searching Purpose

React.useEffect(() => {
  fetchData();
``}, [refresh]);

const headerData = [
  {
    id: "dplID",
    label: "#",
    align: "left",
  },
  {
    id: "dplgrn_date",
    label: "GRN Date",
    align: "center",
  },
  {
    id: "dplBillDate",
    label: "Bill Date",
    align: "left",
  },

  {
    id: "dplGrnNo",
    label: "GRN No",
    align: "left",
  },
  {
    id: "dplBillNo",
    label: "Bill No",
    align: "center",
  },
  {
    id: "dplshowroom",
    label: "Showroom",
    align: "center",
  },
  {
    id: "dplVendor",
    label: "Vendor",
    align: "left",
  },
  {
    id: "dplBillValue",
    label: "Bill Value",
    align: "right",
  },
  {
    id: "dplNote",
    label: "Note",
    align: "center",
  },
  // {
  //   id: "dplgrn_no",
  //   label: "GRN No",
  //   align: "left",
  // },

  // {
  //   id: "dplgrn_date",
  //   label: "GRN Date",
  //   align: "left",
  // },
  {
    id: "dpl_status",
    label: "Status",
    align: "left",
  
  },
  {
    id: "dplAction",
    label: "Action",
    align: "right",
  },
];
const viewData = [
  {
    id: "dplBillDate",
    label: "Bill Date",
    align: "left",
  },
  {
    id: "dplGrnNo",
    label: "GRN No",
    align: "left",
  },
  {
    id: "dplBillNo",
    label: "Bill No",
    align: "left",
  },
  {
    id: "dplshowroom",
    label: "Showroom",
    align: "center",
  },

  {
    id: "dplVendor",
    label: "Vendor",
    align: "left",
  },
  {
    id: "bill_value",
    label: "Bill Value",
    align: "left",
  },
  {
    id: "dplNote",
    label: "Narration",
    align: "left",
  },
];
  
const options = [
{value: "1", label: "Any"},
{value: "2", label: "Approved"},
{value: "0", label: "Not Approved"},
]


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
    getAllDirectPurchaseList(
      (r) => {
        // setAllDirectList(r);
        setDirectPurchaseList(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  }, []);

  const onSearchDirectPurchase = (e) => {
    
    e.preventDefault();
    setLoading(true);
  
     getSearchDirectPurchase(
      (directlist) => {
  
        // console.log(directlist, "poooo123ooo");

        if (directlist.length) {    
          setAllDirectList(directlist);
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
      
       
        setAllDirectList([])
        setViewRes("visible");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      addSearch
    );
  // }
  


 //end
}


  //////////////view module////////////
  const onClickView = (e) => {
    // console.log(e, "sen/view")
    setClassicModalView(true)
 
    getDirectPurchaseById(
        
     e.purchase_id,
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

  const onClickPrint = (e) => {
    // console.log(e, "sen/view")
    setClassicModal(true)
 
    getDirectPurchaseById(
        
     e.purchase_id,
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
      ddl_vendor: "",
      ddl_vendor_label: "Select",
      txt_keyword_phrase: "",
      ddl_showroom_warehouse: "",
      ddl_showroom_warehouse_label: "Select",
      txt_direct_purchase_from_date: "",
      txt_direct_purchase_to_date: "",
      txt_bill_no:"",
      grn_no:"",
   
    });
  };


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Direct Purchase Report']);
    const periodRow = worksheet.addRow(['Period:']);
    const periodRow1 = worksheet.addRow(['']);

    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    const periodCell1 = periodRow1.getCell(1);

    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell1.alignment = { vertical: 'middle', horizontal: 'center', bold: true };

  
    worksheet.mergeCells(`A${titleRow.number}:H${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:H${periodRow.number}`);
    worksheet.mergeCells(`A${periodRow1.number}:H${periodRow1.number}`);

  
    const headers = [
      'Sl No',
      'Bill Date',
      'GRN No',
      'Bill No',
      'Vendor',
      'Bill Value',
      'Narration',
      'Status',
      
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const DirectPurchaseTable = directlist.map((direct) => {
      return {
        ID: direct.dplID,
        BillDate: direct.dplBillDate,
        grn_no: direct.dplGrnNo,
  
        BillNo: direct.dplBillNo,
        Vendor: direct.dplVendor,
        BillValue: (direct.dplBillValue).replace('₹ ',''),
        Narration: direct.dplNote,
        // grn_date:direct.dplgrn_date,
        // Status:  Number(direct.dpl_status)===1?"Any"
        // :Number(direct.dpl_status)===2?"Approved"
        // :Number(direct.dpl_status)===0?"Not Approved"
        // :'',
        Status:direct.dpl_status,
      };
    });
  
    const dataStartRow = 5;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    DirectPurchaseTable.forEach((data) => {
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
    
  
    const fromDate = addSearch?.txt_direct_purchase_from_date;
    const toDate = addSearch?.txt_direct_purchase_to_date;
    
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    
    const chosenPeriod = ` ${formattedFromDate}  To  ${formattedToDate}`;
    const Status = addSearch?.ddl_status?.label ;
    const grn_no = addSearch?.grn_no ? addSearch?.grn_no :"-" ;
    const vendor = addSearch?.ddl_vendor?.label ? addSearch?.ddl_vendor?.label :"-" ;
    const showroom_warehouse = addSearch?.ddl_showroom_warehouse?.label ? addSearch?.ddl_showroom_warehouse?.label :"-" ;

    
    console.log(formattedFromDate,"sankhaaddse")

    // periodCell.value = `GRN NO : ${grn_no}    Period :  ${chosenPeriod}    Status: ${Status} `;
    // periodCell1.value = `Vendor : ${vendor}    Showroom Warehouse :  ${showroom_warehouse}     `;
    
    if (grn_no !== "-") {
      periodCell.value = `GRN No : ${grn_no}    Period :  ${chosenPeriod}    Status: ${Status}`;
  } else if (vendor !== "-") {
      periodCell.value = ` Vendor : ${vendor}   Period :  ${chosenPeriod}      Status: ${Status}`;
  } else if ( showroom_warehouse !== "-") {
      periodCell.value = ` Showroom Warehouse :  ${showroom_warehouse}   Period :  ${chosenPeriod}      Status: ${Status}    `;
  } else {
      periodCell.value = `Period :  ${chosenPeriod}    Status: ${Status}`;
  }
  
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Direct Purchase List.xlsx');
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
        title="Procurement > Direct Purchase"
        btnToolTip="Add Direct Purchase"
        addBtnLink="/admin/procurement/add-direct-purchase"
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Direct Purchase"
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
                    type="search"
                    name="grn_no"
                    onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    value={addSearch.grn_no}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs="2">
                  <InputLabel id="label">Date Between</InputLabel>
                  <TextField
                    size="small"
                    name="txt_direct_purchase_from_date"
                    variant="outlined"
                    defaultValue={currentDate1()}
                    type="date"
                    fullWidth={true}
                    onChange={onAddSearch}
                    value={addSearch.txt_direct_purchase_from_date}
                    // onChange={(v) => console.log(v.target.value)}
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
                    name="txt_direct_purchase_to_date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    defaultValue={currentDate()}
                    onChange={onAddSearch}
                    value={addSearch.txt_direct_purchase_to_date}
                    // onChange={(v) => console.log(v.target.value)}
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
                    name="ddl_vendor"
                    options={allvendor.sort(sortWord("label"))}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_vendor}
                  
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                  />
                </GridItem>
                <GridItem xs="4">
                  <InputLabel id="label">Showroom / Warehouse</InputLabel>
                  <ReactSelect
                    name="ddl_showroom_warehouse"
                    options={allShowroomWarehouse.sort(sortWord("label"))}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_showroom_warehouse}
                  />
                </GridItem>

                <GridItem xs="3">
                  <InputLabel id="label">Keyword / Phrase</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Keyword / Pharse"
                    type="search"
                    // style={{ marginBottom: -20 }}
                    name="txt_keyword_phrase"
                    onChange={onAddSearch}
                    id="outlined-basic"
                    fullWidth={true}
                    value={addSearch.txt_keyword_phrase}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs="2">
                  <InputLabel id="label">Status</InputLabel>
                  <Select
                    name="ddl_status"
                    options={options.sort(sortWord("label"))}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    // value={options[0].v}
                    value={addSearch.ddl_status}
                    defaultValue={options[0]? options[0].label : options[1]}
                  
                    // value={{
                    //   label: addSearch.ddl_brand_label,
                    //   value: addSearch.ddl_brand_id,
                    // }}
                  />
                </GridItem>

                <GridItem xs="3">
                  <div className={classes.searchbtnRight} >
                    <CustomButton style={{ marginRight: "10px" }}
                    onClick={onSearchDirectPurchase}
                    >
                      <SearchIcon />
                    </CustomButton>
                    <CustomButton onClick={onClickRefresh}>
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
                      <h4 className={classes1.headerCdTitle}>Direct Purchase</h4>
                    </GridItem>
                    {globalState.user.user_role !== "Admin" ? ( 
                    <GridItem style={{ cursor: "pointer",display: "none" }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(directlist)} >
                        <Tooltip title="Export to Excel">
                          <img src={require("../../../assets/img/excel.png").default} />
                        </Tooltip>
                      </IconButton>
                    </GridItem>
                    ):(
                      <GridItem style={{ cursor: "pointer" }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(directlist)} >
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
            rows={directlist}
            onClickViewOne={onClickView}
            onClickPrint={onClickPrint}

            />
            </CardBody>
            </Card>
        </GridItem>
      </GridContainer>
          )}
      <MasterModelForView
        classicModal={classicModalView}
        viewHeader="Direct Purchase View"
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModalView(false);
        }}
      >
        <ProcurementView
          title="Direct Purchase"
          viewData={viewData}
          addedItems={addedItems}
          itemDetails={itemDetails}
          allStatus={allStatus}
          otherCharges={otherCharges}
        />
      </MasterModelForView>

      <MasterModelForView
        classicModal={classicModal}
        viewHeader="Direct Purchase"
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModal(false);
        }}
        height="auto"
        okBtnText="Print"
        onClickOk={(e) => {
          e.preventDefault();
          window.print()
        }}
      >
        <ProcurementView
          title="Direct Purchase"
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

export default DirectPurchasePage;
