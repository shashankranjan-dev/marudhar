import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
// import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import { getListCustomers } from "../../../services/customerListService";
import { getAllSalesOrder, deleteSalesOrder, getAllSalesOrderPrint } from "../../../services/salesOrderListService";
//import { getAllSalesOrderonLoad } from "../../../services/salesOrderListService";
import MasterModelForPrint from "../../Components/MasterModelForPrint";
import SalesOrderInvoicePage from "./SalesOrderInvoicePage";
import {
  getSalesOrderBySalesId
} from "../../../services/salesOrderListService";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import { currencyFormate } from "../HelperComponent/utils";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput, Box } from "@material-ui/core";

import theme from "../../../theme/theme";
import ReactSelect from "react-select";
// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import Select from "react-select";
import { currentDate, currentDate1 } from "../HelperComponent/utils";
//Status Service
import { getListStatus } from "../../../services/addStatusService";
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
  customSelect: {
    marginBottom: 12,
  },
}));

const SalesOrderPage = () => {
  const classes1 = useStyles1()

  const classes = useStyles();

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allSalesOrder, setAllSalesOrder] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState(false);
  const [allCustomer, setAllCustomer] = React.useState([]);
  const [viewRes, setViewRes] = React.useState("hidden");
  const [salesOrderDetails, setSalesOrderDetails] = React.useState({});
  const [showroom, setShowroom] = React.useState({});
  const [totalValue, setTotalValue] = React.useState(0);
  const [allStatus, setAllStatus] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [searchDetail, setSearchDetail] = React.useState({
    txt_sales_order_date_from: currentDate1(),
    txt_sales_order_date_to: currentDate(),
    txt_sales_order_no: "",
    ddl_customer: "",
    txt_keyword_pharse: "",
    ddl_status: { value: 28, label: "All" },
    ddl_status_name: "",
  });
  const [classicModalView, setClassicModalView] = React.useState(false);
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  const [itemDetails, setItemDetails] = React.useState([]);
  const [collapsible, setCollapsible] = React.useState(true)
  const headerData = [
    {
      id: "sales_serial",
      label: "#",
      align: "left",
    },
    {
      id: "sales_order_date",
      label: "Sales Order Date",
      align: "left",
    },
    {
      id: "sales_order_no",
      label: "Sales Order No",
      align: "left",
    },
    {
      id: "sales_quotation_no",
      label: "Quotation No",
      align: "left",
    },
    {
      id: "sales_enquiry_no",
      label: "Enquiry No",
      align: "left",
    },
    {
      id: "sales_customer",
      label: "Customer",
      align: "left",
    },
    {
      id: "sales_value",
      label: "Sales Value (Rs)",
      align: "center",
    },

    {
      id: "sales_status",
      label: "Status",
      align: "left",
      salesStatus: (v) => v,
    },
    {
      id: "sales_action",
      label: "Action",
      align: "right",
    },
  ];
  const viewData = [
    {
      id: "enqDate",
      label: "Sales Order Date",
      align: "left",
    },
    {
      id: "enqNo",
      label: "Sales Order No",
      align: "left",
    },
    {
      id: "enqCustomer",
      label: "Quotation No",
      align: "left",
    },

    {
      id: "enqSalesExecutive",
      label: "Enquiry No",
      align: "left",
    },
    {
      id: "enqShowroom",
      label: "Customer",
      align: "left",
    },
    {
      id: "enqStatus",
      label: "Status",
      align: "left",
    },
  ];
  const searchFormData = [
    {
      name: "txt_sales_order_no",
      label: "Sales Order No",
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
      name: "txt_sales_order_date_from",
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
      name: "txt_sales_order_date_to",
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
      label: "Keyword / Phrase",
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
  const fetchData = () => {

    // setLoading(false);
    getListCustomers(
      (r) => {
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
      "Sales-Order",
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
    // getAllSalesOrderonLoad(
    //   (r) => {
    //     setLoading(false);
    //     setAllSalesOrder(r);
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

  const onSearch = (e) => {
    // if (searchDetail.ddl_status)
    // {
    e.preventDefault();
    setRefresh(false);
    setLoading(true);

    if (searchDetail.txt_sales_order_no || searchDetail.ddl_customer
      || searchDetail.ddl_status || searchDetail.txt_sales_order_date_from
      || searchDetail.txt_sales_order_date_to || searchDetail.txt_keyword_pharse) {
      getAllSalesOrder(
        (r, amt) => {
          console.log(r,"sen22043")
          if (r.length) {

            setAllSalesOrder(r);

            setTotalValue(amt);
            setViewRes("visible");
            setLoading(false);
          } else {
            setViewRes("visible");
            setLoading(false);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, "Sales Order not found": "info" },
            });
          }
        },
        (err) => {
          setAllSalesOrder([]);
          setViewRes("visible");
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

  //Searching
  const onSelectDetails = (name, v) => {
    if (name === "ddl_customer") {
      setSearchDetail({ ...searchDetail, [name]: v, });

    } else {
      setSearchDetail({ ...searchDetail, [name]: v ,});
    };
  };

  const onChangeSearchForm = (e) => {
    const { name, value } = e.target;
    setSearchDetail({ ...searchDetail, [name]: value });
  };

  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  const onClearSearchState = () => {
    setRefresh(!refresh);
    setSearchDetail({
      txt_sales_order_date_from: currentDate1(),
      txt_sales_order_date_to: currentDate(),
      txt_sales_order_no: "",
      ddl_customer: "",
      txt_keyword_pharse: "",
      ddl_status: { value: 28, label: "All" },

    });
    setAllSalesOrder([]);
   
  };

  const onClickPrint = (row) => {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: {},
    });
    console.log("prDet", row);


    getAllSalesOrderPrint(
      (row) => {
        // setVendorDetail(row[0]);
        // setVendorAddres(row[0].allAddress[0]);
        setSalesOrderDetails(row);
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
    // console.log(row,"111")




    //setDeliveryDetails(row);
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: {},
    });
    setClassicModal(true);
  };


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Sales Order List Report']);
    const periodRow = worksheet.addRow(['Period:']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:H${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:H${periodRow.number}`);
  
    const headers = [
      'Sl No',
      'Sales Order Date',
      'Sales Order No',
      'Quotation No',
      'Enquiry No',
      'Customer',
      'Sales Value',      
      'Status',
      
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const SalesOrderTable = allSalesOrder.map((salesOrder) => {
      return {
        slID: salesOrder.slID,
        sales_order_date: salesOrder.sales_order_date,
        sales_order_no: salesOrder.sales_order_no,
        Quotation_no: salesOrder.sales_quotation_no,
        Enquiry_no: salesOrder.sales_enquiry_no,
        customer: salesOrder.sales_customer,
        sales_value: salesOrder.sales_value,
        Status: Number(salesOrder.sales_status) === 29 ? "D.O. Gen. fully"
          : Number(salesOrder.sales_status) === 25 ? "D.O. Gen. partly"
            : Number(salesOrder.sales_status) === 24 ? "New"
            : Number(salesOrder.sales_status) === 37 ? "Closed"
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
  
    SalesOrderTable.forEach((data) => {
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
    
  
    const fromDate = searchDetail?.txt_sales_order_date_from;
    const toDate = searchDetail?.txt_sales_order_date_to;
    
    
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    
    const chosenPeriod = ` ${formattedFromDate}  To  ${formattedToDate}`;
    const Status = searchDetail?.ddl_status?.label ;
    const customer = searchDetail?.ddl_customer?.label ? searchDetail?.ddl_customer?.label : "-" ;

    
    const sales_order_no = searchDetail?.txt_sales_order_no ? searchDetail?.txt_sales_order_no :"-" ;

    

    // periodCell.value = `Sales Order No : ${sales_order_no}    Period :  ${chosenPeriod}  customer : ${customer}    Status: ${Status} `;

    if (sales_order_no !=="-" ) {
      periodCell.value = `Sales Order No : ${sales_order_no}    Period :  ${chosenPeriod}    Status: ${Status}`;
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
    saveAs(data, 'Sales Order List.xlsx');
  };



  // const onClickDelete =(e,next)=>{
  //   console.log(e,"sen15/del")
  //   deleteSalesOrder(
  //     e,
  //     (r)=>{
  //       next()
  //   console.log(r,"sen15/del/1")

  //     },
  //     (err)=>{
  //       dispatch({
  //         type: actionTypes.SET_OPEN_MSG,
  //         payload: { msg: "Error", msgType: "error" },
  //       })
  //     }
  //   )

  // }

  //////////////view module////////////
  const onClickView = (e) => {
    // console.log(e, "sen/view")
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

    getSalesOrderBySalesId(
      e.sales_id,
      e.sales_order_no,
      (r) => {
        // console.log(r,"sen12345")
        setAddedItems(r);
        setItemDetails(r.sales_order_item_details)
        setOtherCharges(r.sales_order_other_charges);
        setLoading(false);
      },
      // (err) => {
      //   dispatch({
      //     type: actionTypes.SET_OPEN_MSG,
      //     payload: { msg: err, msgType: "error" },
      //   });
      //   setLoading(false);
      // }
    );

  }

  const onClickCollaps = () => {
    collapsible ?
      setCollapsible(false)
      :
      setCollapsible(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Sales > Sales Order  "
        btnToolTip="Add Sales Order"
        addBtnLink="/admin/sales/sales-order-add"
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Sales Order" 
           btnToolTip={collapsible?"Collaps":"Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
          filterIcon>
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
                  <CustomButton onClick={onClearSearchState}>
                    <RotateLeftIcon />
                  </CustomButton>
                </div>
              </GridItem>
            </GridContainer>
            :''}
          </CustomCard>
        </GridItem>
      </GridContainer>
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
        {salesOrderDetails && (
          <SalesOrderInvoicePage
            salesOrderDetails={salesOrderDetails}
            showroom={showroom}
            totalOtherCharges={salesOrderDetails[0]?.totalOtherCharges ? salesOrderDetails[0]?.totalOtherCharges : 0}

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
                    <h4 className={classes1.headerCdTitle}>Sales Order Details</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? ( 
                  <GridItem style={{ cursor: "pointer",display: "none" }}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(allSalesOrder)} >
                      <Tooltip title="Export to Excel">
                        <img src={require("../../../assets/img/excel.png").default} />
                      </Tooltip>
                    </IconButton>
                  </GridItem>
                  ):(
                    <GridItem style={{ cursor: "pointer" }}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(allSalesOrder)} >
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
                    rows={allSalesOrder}
                    onClickPrint={onClickPrint}
                    status_type="Sales"
                    footer={currencyFormate(totalValue)}
                    footerColIndex={5}
                    onClickViewOne={onClickView}
                  // onClickDelete={onClickDelete}
                  /> : ""}
              </CardBody>
            </Card>
         
        </GridItem>
      </GridContainer>
 )}
      <MasterModelForView
        classicModal={classicModalView}
        viewHeader="Sales View"
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModalView(false);
        }}
      >
        <ViewAll
          title="Sales Order"
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

export default SalesOrderPage;
