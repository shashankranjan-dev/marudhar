import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
// import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import MasterModelForView from "../../Components/MasterModelForView";

import {
  getAllEnquiry,
  getAllSource,
  getSearchEnquiry,
} from "services/saleService/addEnqueryService";



import { getListStatus } from "../../../services/addStatusService";

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
import { ThemeProvider, Box, Grid } from "@material-ui/core";
import { currentDate, currentDate1 } from "../HelperComponent/utils";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
import Select from "react-select";

import theme from "../../../theme/theme";

// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
  whiteColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";
import { appFontWeight } from "assets/jss/material-dashboard-pro-react";
import { PageHeader } from "../HelperComponent/PageTitle";
import { sortWord } from "../HelperComponent/utils";

import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from 'file-saver';
import XLSX from 'xlsx'
import ViewAll from "./ViewAll";
import { getEnquiryBySalesId } from "../../../services/saleService/addEnqueryService";
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
  salesExcutive: {
    width: "20px",
  },

  searchBar: {
    padding: "10px",
  },
  searchbtnRight: {
    float: "right",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
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
  floatAddBtn: {
    position: "fixed",
    top: 90,
    right: 40,
    zIndex: 1000,
  },
  pageTitleBox: {
    color: appDefaultColor,
    // color: appSecondColor,
    fontSize: "14px",
    fontWeight: appFontWeight,
    paddingLeft: "20px",
  },
  topHeaderTitle: {
    backgroundColor: whiteColor,
    height: "auto",
    padding: "5px 20px",
    margin: "-20px -30px 10px -30px",
    boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
  },
  customSelect: {
    marginBottom: 15,
  },
  ddlError: {
    textAlign: "right",
    color: "#f44336",
    fontSize: "12.6px",
    marginRight: 15,
    marginTop: -15,
    fontWeight: 400,
  },

}));

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    position: "absolute",
    zIndex: 1000,
  }),
};
const EnqueryListPage = () => {
  const classes1 = useStyles1()

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [allUnits, setAllUnits] = React.useState([]);
  const [allStatus, setAllStatus] = React.useState([]);
  const [allsources, setAllSources] = React.useState([]);
  const [enqueryList, setAllEnqueryList] = React.useState([]);
  const [viewRes, setViewRes] = React.useState("hidden");
  const [addedItems, setAddedItems] = React.useState([]);
  const [itemDetails, setItemDetails] = React.useState([]);

  const [addSearch, setAddSearch] = React.useState({
    ddl_source: "",
    ddl_status: { value: "", label: "All" },
    ddl_status_name: "",
    txt_keyword_pharse: "",
    txt_enquiry_no: "",
    txt_from_date: currentDate1(),
    txt_to_date: currentDate(),
  });

  const [collapsible, setCollapsible] = React.useState(true)

  const fetchData = () => {
    // setLoading(true);
    getListStatus(
      "Sales-Enquiry",
      (r) => {
        setAllStatus(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    getAllEnquiry(
      (r) => {
        setLoading(false);
        setAllEnqueryList(r);
      },
      (err) => {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },"New"
    );
    getAllSource(
      (r) => {
        setAllSources(r);
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

  const headerData = [
    {
      id: "enquire_serial",
      label: "#",
      align: "left",
    },
    {
      id: "enqDate",
      label: "Enquiry Date",
      align: "left",
    },
    {
      id: "enqNo",
      label: "Enquiry No",
      align: "left",
    },
    {
      id: "enqCustomer",
      label: "Customer",
      align: "left",
    },

    {
      id: "enqSalesExecutive",
      label: "Sales Executive",
      align: "left",
    },
    {
      id: "enqShowroom",
      label: "Showroom / warehouse",
      align: "left",
    },
    // {
    //   id: "enqSource",
    //   label: "Source",
    //   align: "left",

    // },

    {
      id: "enqStatus",
      label: "Status",
      align: "left",
      salesStatus: (v) => v,
    },
    {
      id: "enqAction",
      label: "Action",
      align: "right",
    },
  ];

  const viewData = [
    {
      id: "enqDate",
      label: "Enquiry Date",
      align: "left",
    },
    {
      id: "enqNo",
      label: "Enquiry No",
      align: "left",
    },
    {
      id: "enqCustomer",
      label: "Customer",
      align: "left",
    },

    {
      id: "enqSalesExecutive",
      label: "Sales Executive",
      align: "left",
    },
    {
      id: "enqShowroom",
      label: "Showroom / warehouse",
      align: "left",
    },
    {
      id: "enqStatus",
      label: "Status",
      align: "left",
    },
  ];

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onSelect = (info, v) => {

    //console.log(info, v, "310306")

    setAddSearch({ ...addSearch, [info.name]: v });


  };

  // on Delete called
  // const onDeleteEnquiry = (row, next) => {
  //   deleteEnquiry(
  //     row.item_id,
  //     (r) => {
  //       next();
  //       setRefresh(!refresh);
  //     },
  //     (err) => {
  //       dispatch({
  //         type: actionTypes.SET_OPEN_MSG,
  //         payload: { msg: err, msgType: "error" },
  //       });
  //     }
  //   );
  // };
  // on Search Item
  const onSearchEnquiry = (e) => {
    setRefresh(false);
    // if (addSearch.ddl_status)
    // {
    e.preventDefault();
    setLoading(true);
    getSearchEnquiry(
      (enqueryList) => {
        if (enqueryList.length) {
          setAllEnqueryList(enqueryList);
          setViewRes("visible");
          setLoading(false);

        } else {
          setViewRes("visible");
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Enquiry not found": "info" },
          });
        }
      },
      (err) => {
        // change by sankha
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

  const onClickRefresh = () => {
    setRefresh(!refresh);
    setAddSearch({
      ddl_source: "",
      ddl_source_label: "Select",
      ddl_status: { value: "", label: "All" },
      ddl_status_label: "Select",
      txt_keyword_pharse: "",
      txt_enquiry_no: "",
      txt_from_date: currentDate1(),
      txt_to_date: currentDate(),
    });
    setAllEnqueryList([]);
  };

  //////////////view module////////////
  const onClickView = (e) => {
    //console.log(e.sales_id, "sen/view")
    setClassicModal(true)
    // getListStatus(
    //   "Sales",
    //   (r) => {
    //     setAllStatus(r);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );

    getEnquiryBySalesId(
      e.sales_id,
      (r) => {
        setAddedItems(r);
        setItemDetails(r.item_details)

      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  }

  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Enquiry List Report']);
    const periodRow = worksheet.addRow(['Period:']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:G${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:G${periodRow.number}`);
  
    const headers = [
      'Sl No',
      'Enquiry Date',
      'Enquiry No',
      'Customer',
      'Sales Executive',
      'Showroom',
      'Status',
      
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const EnqueryListTable = enqueryList.map((enquery) => {
      return {
        id: enquery.enquire_serial,
        Enquiry_Date: enquery.enqDate,
        Enquiry_No: enquery.enqNo,
        Customer: enquery.enqCustomer,
        Sales_Executive: enquery.enqSalesExecutive,
        Showroom: enquery.enqShowroom,
        status: Number(enquery.enqStatus) === 20 ? "New"
          : Number(enquery.enqStatus) === 21 ? "Quoted"
            : Number(enquery.enqStatus) === 31 ? "Close"
              : '0',
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    EnqueryListTable.forEach((data) => {
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
    const Status = addSearch?.ddl_status?.label ;
    const enquiry = addSearch?.txt_enquiry_no ? addSearch?.txt_enquiry_no :"-" ;

    

    // periodCell.value = `Enquiry : ${enquiry}    Period :  ${chosenPeriod}    Status: ${Status} `;

    if (enquiry !=="-" ) {
      periodCell.value = `Enquiry : ${enquiry}    Period :  ${chosenPeriod}    Status: ${Status}`;
  }  else {
      periodCell.value = `Period :  ${chosenPeriod}    Status: ${Status}`;
  }
    
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Enquiry List.xlsx');
  };



  const searchFormData = [{}];
  const onClickCollaps = () => {
    //console.log("Reached23")
    collapsible ?
      setCollapsible(false)
      :
      setCollapsible(true)
  }
  return (
    <ThemeProvider theme={theme}>
      <PageHeader
        title="Sales > Enquiry"
        addBtnLink="/admin/sales/add-enquiry"
        btnToolTip="Add Enquiry"
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Enquiry"
            btnToolTip={collapsible?"Collaps":"Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon>
            {
              collapsible ?
                <Paper elevation="0" className={classes.searchBar}>
                  <GridContainer justifyContent="flex-start" alignItems="flex-end">
                    <GridItem xs="3">
                      <InputLabel id="label">Enquiry No</InputLabel>
                      <TextField
                       
                        size="small"
                        placeholder="Enquiry No"
                        name="txt_enquiry_no"
                        onChange={onAddSearch}
                        type="search"
                        id="outlined-basic"
                        fullWidth={true}
                        value={addSearch.txt_enquiry_no}
                        variant="outlined"
                      />
                    </GridItem>
                    <GridItem xs="2">
                      <InputLabel id="label">Date Between</InputLabel>
                      <TextField
                        size="small"
                        name="txt_from_date"
                        id="date"
                        variant="outlined"
                        type="date"
                        fullWidth={true}
                        value={addSearch.txt_from_date}
                        onChange={onAddSearch}
                        inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                      />
                    </GridItem>
                    <GridItem xs="2">
                      <TextField
                        name="txt_to_date"
                        size="small"
                        id="date"
                        variant="outlined"
                        type="date"
                        fullWidth={true}
                        value={addSearch.txt_to_date}
                        onChange={onAddSearch}
                        className={classes.dateField}
                        inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                      />
                    </GridItem>
                    <GridItem xs="5">
                      <InputLabel id="label">Keyword / Phrase</InputLabel>
                      <TextField
                        size="small"
                        placeholder="Keyword / Phrase"
                        name="txt_keyword_pharse"
                        type="search"
                        // style={{ marginBottom: -15 }}
                        onChange={onAddSearch}
                        id="outlined-basic"
                        fullWidth={true}
                        value={addSearch.txt_keyword_pharse}
                        variant="outlined"
                      />
                    </GridItem>
                    <GridItem xs="3">
                      <InputLabel id="label">Status</InputLabel>
                      {/* {//console.log(addSearch.ddl_status, "000")} */}
                      <Select
                        name="ddl_status"
                        menuPortalTarget={document.body}
                        options={allStatus.sort(sortWord("label"))}
                        // defaultValue={allStatus[0]?.label}
                        formatGroupLabel={(d) => d.label}
                        styles={reactSelectStyles}
                        onChange={(v, info) => onSelect(info, v)}
                        value={addSearch.ddl_status}
                      />
                    </GridItem>

                    <GridItem xs="9">
                      <div className={classes.searchbtnRight}>
                        <CustomButton
                          type="submit"
                          onClick={onSearchEnquiry}
                          name="btn_refresh"
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
                </Paper>
                :
                ''
            }
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
                    <h4 className={classes1.headerCdTitle}>EnquiryList</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? ( 
                  <GridItem style={{ cursor: "pointer",display: "none" }}>
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
                {!refresh ?
                  <MuiTable
                    columns={headerData}
                    rows={enqueryList}
                    status_type="Sales"
                    onClickViewOne={onClickView}

                  /> : ""}
              </CardBody>
            </Card>
         
        </GridItem>
      </GridContainer>
      )}
      <MasterModelForView
        classicModal={classicModal}
        viewHeader="Enquiry View"
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModal(false);

        }}
      >
        <ViewAll
          title="Enquiry"
          viewData={viewData}
          addedItems={addedItems}
          itemDetails={itemDetails}
          allStatus={allStatus}
        />
      </MasterModelForView>
    </ThemeProvider>
  );
};

export default EnqueryListPage;
