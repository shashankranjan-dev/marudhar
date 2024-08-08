import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
//IMPORT SERVICE OF QUATATION
import {
  quatationRowData,
  getAllQuotation,
  getSearchAllQuotation
} from "../../../services/quatationService";
import { getListCustomers } from "../../../services/customerListService";
import MasterModelForPrint from "../../Components/MasterModelForPrint";

import ReactSelect from "react-select";
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
import QuotationInvoicePage from "./QuotationInvoicePage";
// import { getAllDeliveryOrder,getAllDeliveryOrderOnLoad } from "../../../services/createDeliveryOrderService";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput, Box } from "@material-ui/core";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
//getlist service
import { getListStatus } from "../../../services/addStatusService";

import theme from "../../../theme/theme";
import { currentDate, currentDate1 } from "../HelperComponent/utils";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import FormComponent from "../HelperComponent/FormComponent";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from 'file-saver';
import XLSX from 'xlsx'
import MasterModelForView from "../../Components/MasterModelForView";
import ViewAll from "./ViewAll";
import { getQuotationBySalesId } from "../../../services/quatationService";

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
  input: {
    height: 40,
    lineLight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
  customSelect: {
    marginBottom: 12,
  },
}));

const QuatationPage = () => {
  const classes1 = useStyles1()

  const classes = useStyles();

  const history = useHistory();
  const [allQuatation, setAllQuatations] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState(false);
  const [allStatus, setAllStatus] = React.useState([]);
  const [allCustomer, setAllCustomer] = React.useState([]);
  const [viewRes, setViewRes] = React.useState("hidden");
  const [classicModal, setClassicModal] = React.useState(false);
  const [classicModalView, setClassicModalView] = React.useState(false);


  const [refresh, setRefresh] = React.useState(false);
  const [quotationDetails, setQuotationDetails] = React.useState({});
  const [showroom, setShowroom] = React.useState({});

  const [searchDetail, setSearchDetail] = React.useState({
    txt_quotation_date_from: currentDate1(),
    txt_quotation_date_to: currentDate(),
    txt_quotation_no: "",
    ddl_customer: "",
    txt_keyword_pharse: "",
    ddl_status: { value: 19, label: "All" },
  });
  const [addedItems, setAddedItems] = React.useState([]);
  const [itemDetails, setItemDetails] = React.useState([]);
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [collapsible, setCollapsible] = React.useState(true)

  const headerData = [
    {
      id: "qutID",
      label: "#",
      align: "left",
    },
    {
      id: "qutDate",
      label: "Quotation Date",
      align: "left",
    },
    {
      id: "qutNo",
      label: "Quotation No",
      align: "left",
    },
    {
      id: "qutEnquiryNo",
      label: "Enquiry No",
      align: "left",
    },
    {
      id: "qutCustomer",
      label: "Customer",
      align: "left",
    },

    {
      id: "qutSalesExecutive",
      label: "Sales Executive",
      align: "left",
    },

    {
      id: "qutStatus",
      label: "Status",
      align: "left",
      salesStatus: (v) => v,
    },
    {
      id: "qutAction",
      label: "Action",
      align: "right",
    },
  ];

  const fetchData = () => {
    // setLoading(true);
    getListCustomers(
      (r) => {
        //  //console.log("data_qout==>",r)
        setAllCustomer(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    getListStatus(
      "Sales-Quotation",
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
    // setLoading(true);
    // getAllQuotation(
    //   (r) => {
    //     setLoading(false);
    //     setAllQuatations(r);
    //   },
    //   (err) => {
    //     setLoading(false);
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   },"New"
    // );
  };
  const onSelectDetails = (name, v) => {
    //console.log("data_onSelectDetails=>", name, v)
    if (name === "ddl_customer") {
      setSearchDetail({ ...searchDetail, [name]: v });

    } else {
      setSearchDetail({ ...searchDetail, [name]: v });
    };
  }

  const onChangeSearchForm = (e) => {
    //console.log("data_onSelectDetails=>", e)
    const { name, value } = e.target;
    setSearchDetail({ ...searchDetail, [name]: value });
  };

  const onSearch = (e) => {
    setRefresh(false);
    //   if (searchDetail.ddl_status)
    // {
    e.preventDefault();
    setLoading(true);

    if (searchDetail.ddl_customer?.value || searchDetail.txt_quotation_no ||
      searchDetail.txt_quotation_date_from || searchDetail.txt_quotation_date_to
      || searchDetail.ddl_status?.value || searchDetail.txt_keyword_pharse) {

      getSearchAllQuotation
        (
          (r) => {
            if (r.length) {
              setAllQuatations(r);
              setViewRes("visible");

              setLoading(false);

            } else {
              setViewRes("visible");

              setLoading(false);
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: { msg: err, "Quotation not found": "info" },
              });
            }

            // setAllQuatations(r);
            // setLoading(false);

          },
          (err) => {
            setViewRes("hidden");
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
            setLoading(false);

          },
          searchDetail
        );

    }
    // }
    // else {

    //   dispatch({
    //     type: actionTypes.SET_OPEN_MSG,
    //     payload: { msg: "Select Status", msgType: "info" },
    //   });


    // }

  };

  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  const searchFormData = [
    {
      name: "txt_quotation_no",
      label: "Quotation No",
      hidden: false,
      required: false,
      align: "left",
      data_type: "search",
      html_element: "TextField",
      error: false,
      xs: 12,
      md: 4,
      lg: 3,
    },
    {
      name: "txt_quotation_date_from",
      label: "Date Between",
      hidden: false,
      required: false,
      align: "left",
      data_type: "date",
      html_element: "TextField",
      error: false,
      xs: 12,
      md: 4,
      lg: 2,
    },
    {
      name: "txt_quotation_date_to",
      hidden: false,
      required: false,
      align: "left",
      data_type: "date",
      html_element: "TextField",
      error: false,
      xs: 12,
      md: 4,
      lg: 2,
    },
    {
      name: "ddl_customer",
      label: "Customer",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "select_two",
      xs: 12,
      md: 6,
      lg: 5,
      options: allCustomer,
    },
    {
      name: "txt_keyword_pharse",
      label: "Keyword / Pharse",
      hidden: false,
      required: false,
      align: "left",
      data_type: "search",
      html_element: "TextField",
      marginBottom: -15,
      defaultValue: "",
      error: false,
      xs: 12,
      md: 4,
      lg: 3,
    },
    {
      name: "ddl_status",
      label: "Status",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "select_two",
      xs: 12,
      md: 6,
      lg: 4,

      options: allStatus,
    },
  ];

  const onClearState = () => {
    setRefresh(!refresh);
    setSearchDetail({
      txt_quotation_date_from: currentDate1(),
      txt_quotation_date_to: currentDate(),
      txt_quotation_no: "",
      ddl_customer: "",
      txt_keyword_pharse: "",
      ddl_status: { value: 19, label: "All" },

    });
    setAllQuatations([]);
  };


  const onClickPrint = (row) => {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: {},
    });
    //console.log("prDet", row);


    getAllQuotation(
      (row) => {
        // setVendorDetail(row[0]);
        // setVendorAddres(row[0].allAddress[0]);
        setQuotationDetails(row);

      },
      (err) => {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      //row.customer_id
      searchDetail,
      row.sales_id
    );

    // getAllShowroomWarehouse(
    //     (row) => {
    //       setShowroom(row);
    //     },
    //     row.showrooms_warehouse_id

    //   );
    // //console.log(row,"111")




    //setDeliveryDetails(row);
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: {},
    });
    setClassicModal(true);
  };

  //////////////view module////////////
  const onClickView = (e) => {
    //console.log(e, "sen/view")
    setClassicModalView(true)
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

    getQuotationBySalesId(
      e.sales_id,
      (r) => {
        //console.log(r, "sen1605/view2")
        setAddedItems(r);
        setItemDetails(r.quotation_item_details)
        setOtherCharges(r.quotation_other_charges);
        // setLoading(false);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        // setLoading(false);
      }
    );
  }

  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Quotation Details Report']);
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
      'Quatation Date',
      'Quatation No',
      'EnquiryNo',
      'Customer',
      'Sales Executive',      
      'Status',
      
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const QuotationDetailsTable = allQuatation.map((quatation) => {
      return {
        qutID: quatation.qutID,
        Quatation_Date: quatation.qutDate,
        Quatation_No: quatation.qutNo,
        EnquiryNo: quatation.qutEnquiryNo,
        Customer: quatation.qutCustomer,
        SalesExecutive: quatation.qutSalesExecutive,
        Status: Number(quatation.qutStatus) === 22 ? "New"
          : Number(quatation.qutStatus) === 23 ? "Sales Order Gen."
            : Number(quatation.qutStatus) === 37 ? "Close"
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
  
    QuotationDetailsTable.forEach((data) => {
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
    
  
    const fromDate = searchDetail?.txt_quotation_date_from;
    const toDate = searchDetail?.txt_quotation_date_to;
    
    
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    
    const chosenPeriod = ` ${formattedFromDate}  To  ${formattedToDate}`;
    const Status = searchDetail?.ddl_status?.label ;
    const customer = searchDetail?.ddl_customer?.label ? searchDetail?.ddl_customer?.label : "-" ;
    const quotation = searchDetail?.txt_quotation_no ? searchDetail?.txt_quotation_no :"-" ;

    

    // periodCell.value = `Quotation : ${quotation}    Period :  ${chosenPeriod}   customer : ${customer}    Status: ${Status} `;

    if (quotation !=="-" ) {
      periodCell.value = `Quotation : ${quotation}    Period :  ${chosenPeriod}    Status: ${Status}`;
  } else if (customer !=="-"){
    periodCell.value = `Period :  ${chosenPeriod}   customer : ${customer}    Status: ${Status}`
  }
    else {
      periodCell.value = `Period :  ${chosenPeriod}    Status: ${Status}`;
  }
    
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Quotation Details.xlsx');
  };



  const viewData = [
    {
      id: "enqDate",
      label: "Quotation Date",
      align: "left",
    },
    {
      id: "enqNo",
      label: "Quotation No",
      align: "left",
    },
    {
      id: "enqCustomer",
      label: "Enquiry No",
      align: "left",
    },

    {
      id: "enqSalesExecutive",
      label: "Customer",
      align: "left",
    },
    {
      id: "enqShowroom",
      label: "Sales Executive",
      align: "left",
    },
    {
      id: "enqStatus",
      label: "Status",
      align: "left",
    },
  ];

  const onClickCollaps = () => {
    //console.log("Reached23")
    collapsible ?
      setCollapsible(false)
      :
      setCollapsible(true)
  }
  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Sales > Quotation "
        btnToolTip="Add Quotation"
        addBtnLink="/admin/sales/quotation-add"
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard 
          cdTitle="Search Quotation" 
          filterIcon
          // btnToolTip={collapsible?"Collaps":"Expand"}
          onClickCollapsible={onClickCollaps}
          buttonAction={collapsible}
          >

            {
              collapsible ?
                <GridContainer style={{ padding: "5px 20px" }} alignItems="center">
                  {searchFormData.map((item, key) => {
                    return (
                      <>
                        <FormComponent
                          item={item}
                          key={key}
                          onSelect={onSelectDetails}
                          state={searchDetail}
                          onChange={onChangeSearchForm}
                          error={{}}
                        />
                      </>
                    );
                  })}
                  <GridItem xs="5">
                    <div className={classes.searchbtnRight}>
                      <CustomButton
                        style={{ marginRight: "10px" }}
                        onClick={onSearch}
                      >
                        <SearchIcon />
                      </CustomButton>
                      <CustomButton onClick={onClearState}>
                        <RotateLeftIcon />
                      </CustomButton>
                    </div>
                  </GridItem>
                </GridContainer>
                : ''
            }


          </CustomCard>
        </GridItem>
      </GridContainer>
      {/* {//console.log(quotationDetails[0]?.totalOtherCharges, "5252")} */}
      <MasterModelForPrint
        classicModal={classicModal}
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModal(false);
        }}
        height="auto"
        okBtnText="Print"
        modelName="Delivery Order"
        onClickOk={(e) => {
          e.preventDefault();
          window.print()
        }}
      >
        {quotationDetails && (
          <QuotationInvoicePage
            quotationDetails={quotationDetails}
            showroom={showroom}
            totalOtherCharges={quotationDetails[0]?.totalOtherCharges ? quotationDetails[0]?.totalOtherCharges : 0}

          // vendorDetail={vendorDetail}
          // address={vendorAddrss}
          />
        )}
      </MasterModelForPrint>
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
                    <h4 className={classes1.headerCdTitle}>Quotation Details</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? ( 
                  <GridItem style={{ cursor: "pointer",display: "none" }}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(allQuatation)} >
                      <Tooltip title="Export to Excel">
                        <img src={require("../../../assets/img/excel.png").default} />
                      </Tooltip>
                    </IconButton>
                  </GridItem>
                  ):(
                    <GridItem style={{ cursor: "pointer" }}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(allQuatation)} >
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

                {!refresh ? <MuiTable columns={headerData} rows={allQuatation}
                  onClickViewOne={onClickView}
                  onClickPrint={onClickPrint} status_type="Sales" /> : ""}
              </CardBody>
            </Card>
          
        </GridItem>
      </GridContainer>
)}
      <MasterModelForView
        classicModal={classicModalView}
        viewHeader="Quotation View"
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModalView(false);
        }}
      >
        <ViewAll
          title="Quatation"
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

export default QuatationPage;
