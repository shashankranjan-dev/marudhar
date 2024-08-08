import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import { addDeliveryServiceData } from "../../../services/addDeliveryService";
import { getAllDeliveryOrder,getAllDeliveryOrderOnLoad } from "../../../services/createDeliveryOrderService";
import { getListCustomers } from "../../../services/customerListService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Paper, Box } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import ReactSelect from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
import DeliveryOrderInvoice from "./DeliveryOrderInvoice";
//Status Services
import { getListStatus } from "../../../services/addStatusService";

import theme from "../../../theme/theme";
import MasterModelForPrint from "../../Components/MasterModelForPrint";


import MasterModelForView from "../../Components/MasterModelForView";
import ViewAll from "./ViewAll";
import { getDeliveryOrderBySalesIdDON } from "../../../services/createDeliveryOrderService";

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
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { currentDate, currentDate1} from "../HelperComponent/utils";
import FormComponent from "../HelperComponent/FormComponent";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import  FileSaver from 'file-saver';
import XLSX from 'xlsx'
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
    marginBottom: 15,
  },
}));

const DeliveryOrdersPage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const classes = useStyles();
  const [allDeliveryOrder, setAllDeliveryOrder] = React.useState([]);
  const [allStatus, setAllStatus] = React.useState([]);

  const [vendorDetail, setVendorDetail] = React.useState({});
  const [vendorAddrss, setVendorAddres] = React.useState({});
  const [deliveryDetails, setDeliveryDetails] = React.useState({});
  const [showroom,setShowroom] = React.useState({});
  const [viewRes, setViewRes] = React.useState("hidden");
  const [globalState, dispatch] = useStateValue();
  const [allCustomer, setAllCustomer] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [searchDetail, setSearchDetail] = React.useState({
    txt_delivery_date_from: currentDate1(),
    txt_delivery_date_to: currentDate(),
    ddl_status: { value: 30, label: "All" },
    ddl_status_name: "",
    ddl_customer: "",
    txt_quotation_no: "",
    txt_keyword_pharse: "",
    txt_delivery_no: "",
    txt_sales_order_no:"",
  });
  const [classicModalView, setClassicModalView] = React.useState(false);
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  const [itemDetails, setItemDetails] = React.useState([]);
  const [allItems, setAllItems] = React.useState({});
  const [collapsible, setCollapsible] = React.useState(true)
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
      "Delivery-Order",
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
    setLoading(false);
    // getAllDeliveryOrderOnLoad(
    //   (r) => {
    //     setLoading(false);
    //     setAllDeliveryOrder(r);
    //     //console.log(r,"yyy")
    //   },
    //   (err) => {
    //     setLoading(false);
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }, "New"
    // );
  };

  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  const onSearch = (e) => {

    setRefresh(false);
    e.preventDefault();
    setLoading(true);
    // if (searchDetail.ddl_status)
    // {
    if(searchDetail.txt_delivery_no || searchDetail.txt_sales_order_no || searchDetail.txt_quotation_no
      || searchDetail.ddl_customer || searchDetail.ddl_status ||
      searchDetail.txt_delivery_date_from || searchDetail.txt_delivery_date_to 
        || searchDetail.txt_keyword_pharse) {
    getAllDeliveryOrder(
      (r) => {
        if (r) {
          //console.log("ApuDipu", r);
          setAllDeliveryOrder(r);
          setViewRes("visible");
          setLoading(false);
        } else {
          setViewRes("visible");
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Delivery Order not found": "info" },
          });
        }
      },
      (err) => {
        setAllDeliveryOrder([]);
        setViewRes("visible");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      searchDetail, false);
    }
    else {

      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Select Status", msgType: "info" },
      });
    }
  // }
  // else {
  //   dispatch({
  //     type: actionTypes.SET_OPEN_MSG,
  //     payload: { msg: "Select Status", msgType: "info" },
  //   });
  // }
};


  const headerData = [
    {
      id: "DelID",
      label: "#",
      align: "left",
    },
    {
      id: "DelDate",
      label: "Delivery order Date",
      align: "left",
    },
    {
      id: "DelNo",
      label: "Delivery Order No",
      align: "left",
    },
    {
      id: "DelSalesOrderNo",
      label: "Sales Order No",
      align: "left",
    },
    {
      id: "DelQuotationNo",
      label: "Quotation No",
      align: "left",
    },
    {
      id: "DelCustomer",
      label: "Customer",
      align: "left",
    },

    {
      id: "DelStatus",
      label: "Status",
      align: "left",
      salesStatus: (v) => v,
    },
    {
      id: "DelAction",
      label: "Action",
      align: "right",
    },
  ];
  const onChangeSearchForm = (e) => {
    const { name, value } = e.target;
    setSearchDetail({ ...searchDetail, [name]: value });
  };

  const onSelectDetails = (name, v) => {
    if (name === "ddl_customer"){
      setSearchDetail({ ...searchDetail, [name]: v, });

    }else{
      setSearchDetail({ ...searchDetail, [name]: v });
    };
  };

  const formData = [
    {
      name: "txt_delivery_order_no",
      label: "Delivery Order No",
      hidden: false,
      required: false,
      align: "left",
      data_type: "search",
      html_element: "TextField",
      error: false,
      xs: 12,
      md: 4,
      lg: 4,
    },
    {
      name: "txt_delivery_date_from",
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
      name: "txt_delivery_date_to",
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
      lg: 4,
      options: allCustomer,
    },
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
      lg: 4,
    },
    // {
    //   name: "txt_sales_order_date_from",
    //   label: "Date Between",
    //   hidden: false,
    //   required: false,

    //   align: "left",
    //   data_type: "date",
    //   html_element: "TextField",
    //   error: false,
    //   xs: 12,
    //   md: 4,
    //   lg: 2,
    // },
    // {
    //   name: "txt_sales_order_date_to",
    //   hidden: false,
    //   required: false,
    //   align: "left",
    //   data_type: "date",
    //   html_element: "TextField",
    //   error: false,
    //   xs: 12,
    //   md: 4,
    //   lg: 2,
    // },
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
      lg: 4,
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
      lg: 5,
    },
  ];
  const viewData = [
    {
      id: "DelDate",
      label: "Delivery Order Date",
      align: "left",
    },
    {
      id: "DelNo",
      label: "Delivery Order No",
      align: "left",
    },
    {
      id: "sales_order_no",
      label: "	Sales Order No",
      align: "left",
    },

    {
      id: "qutNo",
      label: "Quotation No",
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
      id: "DelStatus",
      label: "Status",
      align: "left",
    },
  ];

  const onClearState = () => {
    setRefresh(!refresh);
    setSearchDetail({
      txt_delivery_date_from: currentDate1(),
      txt_delivery_date_to: currentDate(),
      ddl_status: { value: 30, label: "All" },
      ddl_customer: "",
      txt_quotation_no: "",
      txt_keyword_pharse: "",
      txt_delivery_order_no: "",
      txt_sales_order_no:"",
    });
    setAllDeliveryOrder([]);

  };

  const onClickPrint = (row) => {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: {},
    });
    //console.log("prDet", row);


    getAllDeliveryOrder(
      (row) => {
        // setVendorDetail(row[0]);
        // setVendorAddres(row[0].allAddress[0]);
        setDeliveryDetails(row);
        
      },
      (err) => {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      //row.customer_id
      { txt_delivery_order_no: row.DelNo }
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
  //console.log(e, "sank1706")
  setClassicModalView(true)
  getDeliveryOrderBySalesIdDON(
    e.sales_id,
   e.DelNo,
    (items) => {
      //console.log(items,"8988")   
      setLoading(false);
      setAllItems(items);
      setItemDetails(items.delivery_order_item_details)
    },
    (err) => {
      setLoading(false);
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: err, msgType: "error" },
      });
    }
  );
  
  // getAllDeliveryOrder(
  //   (row) => {
  //     // setVendorDetail(row[0]);
  //     // setVendorAddres(row[0].allAddress[0]);
  //     setDeliveryDetails(row);
      
  //   },
  //   (err) => {
  //     setLoading(false);
  //     dispatch({
  //       type: actionTypes.SET_OPEN_MSG,
  //       payload: { msg: err, msgType: "error" },
  //     });
  //   },
  //   //row.customer_id
  //   { txt_delivery_order_no: location.state?.row.DelNo }
  // );

}


const onhandleExportToExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('data');

  const titleRow = worksheet.addRow(['Report Name : Delivery Order List Report']);
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
    'Delivery Date',
    'Delivery No',
    'Sales Order No',
    'Quotation No',    
    'Customer',        
    'Status',
    
  ];

  // Add headers as a row
  worksheet.addRow(headers);

  const DeliveryOrderTable = allDeliveryOrder.map((deliveryOrder) => {
    return {
      DelID: deliveryOrder.DelID,
      Delivery_Date: deliveryOrder.DelDate,
      Delivery_No:deliveryOrder.DelNo,
      SalesOrderNo:deliveryOrder.DelSalesOrderNo,
      QuotationNo: deliveryOrder.DelQuotationNo,
      Customer: deliveryOrder.DelCustomer,       
       
       Status:  Number(deliveryOrder.DelStatus)===16?"Dis.Order Gen.Fully"
                      :Number(deliveryOrder.DelStatus)===27?"Dis.Order Gen.partly"
                      :Number(deliveryOrder.DelStatus)===26?"New"
                      :'',
    };
  });

  const dataStartRow = 4;

  const headerRow = worksheet.getRow(dataStartRow);
  headerRow.height = 20;

  headers.forEach((header, index) => {
    const column = worksheet.getColumn(index + 1);
    column.width = header.length + 5;
  });

  DeliveryOrderTable.forEach((data) => {
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
  

  const fromDate = searchDetail?.txt_delivery_date_from;
  const toDate = searchDetail?.txt_delivery_date_to;
  
  
  const formattedFromDate = formatDate(fromDate);
  const formattedToDate = formatDate(toDate);
  
  const chosenPeriod = ` ${formattedFromDate}  To  ${formattedToDate}`;
  const Status = searchDetail?.ddl_status?.label ;
  const customer = searchDetail?.ddl_customer?.label ? searchDetail?.ddl_customer?.label : "-" ;

  
  const delivery_no = searchDetail?.txt_delivery_no ? searchDetail?.txt_delivery_no :"-" ;

  

  // periodCell.value = `Delivery No : ${delivery_no}    Period :  ${chosenPeriod}  customer : ${customer}    Status: ${Status} `;

  if (delivery_no !=="-" ) {
    periodCell.value = `Delivery No : ${delivery_no}    Period :  ${chosenPeriod}    Status: ${Status}`;
} else if (customer !=="-"){
  periodCell.value = `Period :  ${chosenPeriod}   Customer : ${customer}    Status: ${Status}`
}
  else {
    periodCell.value = `Period :  ${chosenPeriod}    Status: ${Status}`;
}
  

  const buffer = await workbook.xlsx.writeBuffer();
  const data = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });
  saveAs(data, 'Delivery Order List.xlsx');
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
        title="Sales > Delivery Order "
        btnToolTip="Add Delivery Order"
        addBtnLink="/admin/sale/sale-order"
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Delivery Orders" 
           btnToolTip={collapsible?"Collaps":"Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
          filterIcon>
           {
              collapsible ?
            <GridContainer style={{ padding: "5px 20px" }} alignItems="center">
              {formData.map((item, key) => {
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
              <GridItem xs={7}>
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
        {deliveryDetails && (
          <DeliveryOrderInvoice
            deliveryDetails={deliveryDetails}
            showroom={showroom}

            // vendorDetail={vendorDetail}
            // address={vendorAddrss}
            searchDetail={searchDetail}

            globalState={globalState}

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
                      <h4 className={classes1.headerCdTitle}>Delivery Order Details</h4>
                    </GridItem>
                    {globalState.user.user_role !== "Admin" ? ( 
                    <GridItem style={{ cursor: "pointer",display: "none" }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(allDeliveryOrder)} >
                        <Tooltip title="Export to Excel">
                          <img src={require("../../../assets/img/excel.png").default} />
                        </Tooltip>
                      </IconButton>
                    </GridItem>
                    ):(
                      <GridItem style={{ cursor: "pointer" }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(allDeliveryOrder)} >
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
              {/* { //console.log(allDeliveryOrder, "inu la") } */}
              <MuiTable 
              columns={headerData}
               rows={allDeliveryOrder}
                onClickPrint={onClickPrint}
                 status_type="Delivery"
                 onClickViewOne={onClickView}
                 />
              </CardBody>
            </Card>
         
        </GridItem>
      </GridContainer>

)}
      <MasterModelForView
        classicModal={classicModalView}
        viewHeader="Delivery View"
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModalView(false);
        }}
        
      >
        <ViewAll
          title="Delivery Order"
          viewData={viewData}
          addedItems={allItems}
          deliveryDetails={deliveryDetails}

          itemDetails={itemDetails}
          allStatus={allStatus}
          otherCharges={otherCharges}
        />
      </MasterModelForView>
    </ThemeProvider>
  );
};

export default DeliveryOrdersPage;
