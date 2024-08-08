import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import { CustomCard } from "../../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../../Components/CustomButton";
import { getAllDispatchOrder, getAllDispatchOrderOnLoad } from "../../../../services/dispatchOrderListService";
import { getListCustomers } from "../../../../services/customerListService";
import { ThemeProvider } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import theme from "../../../../theme/theme";
import { getListStatus } from "../../../../services/addStatusService";

import { useStateValue } from "../../../../context/context";
import { actionTypes } from "../../../../context/reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import {   Box } from "@material-ui/core";

import MasterModelForView from "../../../Components/MasterModelForView";
import ViewAll from "../ViewAll";
import { getDeliveryOrderBySalesIdDpON,getContractorById } from "../../../../services/dispatchOrderListService";


// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../../HelperComponent/PageTitle";
import { PageHeader } from "../../HelperComponent/PageTitle";
import { currentDate, currentDate1} from "views/Pages/HelperComponent/utils";
import FormComponent from "views/Pages/HelperComponent/FormComponent";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import { IconButton, OutlinedInput } from "@material-ui/core";
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
    marginBottom: 12,
  },

  searchBar: {
    padding: "10px",
  },
  activeText: {
    fontSize: "15px",
    color: appSecondColor,
    fontWeight: 400,
  },
}));

const DispatchOrdersPage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const [allDispatch, setAllDispatch] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState(false);
  const [viewRes, setViewRes] = React.useState("hidden");

  const classes = useStyles();
  const[refresh, setRefresh]= React.useState(false);
  const [allStatus, setAllStatus] = React.useState([]);

  const [allCustomer, setAllCustomer] = React.useState([]);
  const [searchDetail, setSearchDetail] = React.useState({
    txt_dispatch_date_from: currentDate1(),
    txt_dispatch_date_to: currentDate(), 
    txt_delivery_order_no: "",
    txt_dispatch_order_no: "",
    ddl_status: { value: 47, label: "All" },
    ddl_customer: "",
    txt_sales_order_no: "",
  });
  const [classicModalView, setClassicModalView] = React.useState(false);
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  const [itemDetails, setItemDetails] = React.useState([]);
  const [allItems, setAllItems] = React.useState({});
  const [collapsible, setCollapsible] = React.useState(true)
  const onSelectDetails = (name, v) => {
    if (name === "ddl_customer"){
      setSearchDetail({ ...searchDetail, [name]: v,ddl_status: "All" });

    }else{
      setSearchDetail({ ...searchDetail, [name]: v });
    };
  };

  const headerData = [
    {
      id: "disID",
      label: "#",
      align: "left",
    },
    {
      id: "disdispatchDate",
      label: "Dispatch Date",
      align: "left",
    },
    {
      id: "disDispatchNo",
      label: "Dispatch No",
      align: "left",
    },
    {
      id: "disDeliveryOrderNo",
      label: "Delivery Order No",
      align: "left",
    },
    {
      id: "disSalesOrderNo",
      label: "Sales Order No",
      align: "left",
    },
    {
      id: "disCustomer",
      label: "Customer",
      align: "left",
    },

    {
      id: "disStatus",
      label: "Status",
      align: "left",
      salesStatus: (v) => v,
    },
    {
      id: "disAction",
      label: "Action",
      align: "right",
    },
  ];
  const viewData = [
    {
      id: "dispatch_order_date",
      label: "Dispatch Date",
      align: "left",
    },
    {
      id: "dispatch_order_no",
      label: "Dispatch No",
      align: "left",
    },
    {
      id: "delivery_order_no",
      label: "	Delivery Order No",
      align: "left",
    },

    {
      id: "sales_order_no",
      label: "Sales Order No",
      align: "left",
    },
    {
      id: "enqCustomer",
      label: "Customer",
      align: "left",
    },
    {
      id: "vehicle_no",
      label: "Vehicle No",
      align: "left",
    },
    {
      id:"contractor_id",
      label:"Contractor",
      align:"left",
    },
    {
      id: "status",
      label: "Status",
      align: "left",
    },
  ];

  const onChangeSearchForm = (e) => {
    const { name, value } = e.target;
    setSearchDetail({ ...searchDetail, [name]: value });
  };

  // console.log(allStatus,"sank1207")

  // fetching Date
  const fetchDate = () => {
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
   
    
    // getAllDispatchOrder(
    //   (r) => {
    //     setAllDispatch(r);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );
  };

  const onSearchDispatchOrder = (e) => {
   
    setRefresh(false)
    e.preventDefault();
    setLoading(true);
    if(searchDetail.txt_dispatch_order_no || searchDetail.txt_delivery_order_no 
      || searchDetail.txt_sales_order_no || searchDetail.ddl_customer || 
      searchDetail.txt_dispatch_date_from || searchDetail.txt_dispatch_date_to
      || searchDetail.ddl_status
      
      )
    {
    getAllDispatchOrder(
      (r) => {
        setAllDispatch(r);
        setViewRes("visible");
        setLoading(false);
      },
      (err) => {
        setAllDispatch([])
        setViewRes("visible");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      searchDetail, false);
    }
  
    
  };


  const onClickView = (e) => {
    // console.log(e, "sank1806")
    setClassicModalView(true)
    getDeliveryOrderBySalesIdDpON(
      e.sales_id,
      e.disDispatchNo,
      (r) => {
        setAddedItems(r);
        setItemDetails(r.dispatch_order_item_details);
        // console.log(r);
        // getContractorById(
        //   r.contractor_id,
        //   (v)=>{
        //   setContractorName(v)
        // })
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  
  }

  React.useEffect(() => {
    fetchDate();
    // getAllDispatchOrderOnLoad(
    //   (r) => {
    //     setAllDispatch(r);
    //     setLoading(false);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //     setLoading(false);
    //   },
    //   {}
    // );
    getListStatus(
      "Dispatch",
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
  }, [globalState.refresh]);

  const formData = [
    {
      fields: [
        {
          name: "txt_dispatch_order_no",
          label: "Dispatch Order No",
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
          name: "txt_dispatch_date_from",
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
          name: "txt_dispatch_date_to",
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
        // {
        //   name: "txt_delivery_date_from",
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
        //   name: "txt_delivery_date_to",
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
      ], 
    }, 
  ];

  const onClearState = () => {
    setRefresh(!refresh);
    setSearchDetail({
      txt_dispatch_date_from: currentDate1(),
      txt_dispatch_date_to: currentDate(),
      txt_delivery_order_no: "",
      txt_dispatch_order_no: "",
      ddl_customer: "",
      txt_sales_order_no: "",
      txt_keyword_phrase: "",
    ddl_status: { value: 47, label: "All" },

    });
    setAllDispatch([])
  };


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Dispatch Order Details Report']);
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
      'Dispatch Date',
      'Dispatch No',
      'Delivery Order No',
      'Sales Order No',
      'Customer',           
      'Status',
      
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const DispatchTable = allDispatch.map((dispatch) => {
      return {
        disID: dispatch.disID,
        Dispatch_Date: dispatch.disdispatchDate,
        Dispatch_No:dispatch.disDispatchNo,
        DeliveryOrderNo:dispatch.disDeliveryOrderNo,
        SalesOrderNo: dispatch.disSalesOrderNo,
        Customer: dispatch.disCustomer,
        
       
        Status:  
                      Number(dispatch.disStatus)===44?"Billed"
                      :Number(dispatch.disStatus)===45?"Unbilled"
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
  
    DispatchTable.forEach((data) => {
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
    
  
    const fromDate = searchDetail?.txt_dispatch_date_from;
    const toDate = searchDetail?.txt_dispatch_date_to;
    
    
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    
    const chosenPeriod = ` ${formattedFromDate}  To  ${formattedToDate}`;
    const Status = searchDetail?.ddl_status?.label ;
    const customer = searchDetail?.ddl_customer?.label ? searchDetail?.ddl_customer?.label : "-" ;

    
    const dispatch_order_no = searchDetail?.txt_dispatch_order_no ? searchDetail?.txt_dispatch_order_no :"-" ;

    

    // periodCell.value = `Dispatch_ Order No : ${dispatch_order_no}    Period :  ${chosenPeriod}  customer : ${customer}    Status: ${Status} `;

    if (dispatch_order_no !=="-" ) {
      periodCell.value = `Dispatch Order No : ${dispatch_order_no}    Period :  ${chosenPeriod}    Status: ${Status}`;
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
    saveAs(data, 'Dispatch Order Details.xlsx');
  };



const onClickCollaps = () => {
  collapsible ?
    setCollapsible(false)
    :
    setCollapsible(true)
}



  return (
    <ThemeProvider theme={theme}>
      <PageHeader
        title="Sales > Dispatch Order"
        addBtnLink="/admin/sale/delivery-order"
        btnToolTip="Add Dispatch Order"
        
      />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Dispatch Orders"
           btnToolTip={collapsible?"Collaps":"Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
           filterIcon>
           
            {collapsible?
            formData.map((form, fkey) => {
              return (
                <GridContainer
                  key={fkey}
                  style={{ padding: "5px 20px" }}
                  alignItems="flex-end"
                >
                  {form.fields.map((item, key) => {
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
                  <GridItem xs="12">
                    <div className={classes.searchbtnRight}>
                      <CustomButton
                        style={{ marginRight: "10px" }}
                        onClick={onSearchDispatchOrder}
                      >
                        <SearchIcon />
                      </CustomButton>
                      <CustomButton onClick={onClearState}>
                        <RotateLeftIcon />
                      </CustomButton>
                    </div>
                  </GridItem>
                </GridContainer>
              );
            })
            :''
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
                      <h4 className={classes1.headerCdTitle}>Dispatch Order Details</h4>
                    </GridItem>
                    {globalState.user.user_role !== "Admin" ? ( 
                    <GridItem style={{ cursor: "pointer",display: "none"  }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(allDispatch)} >
                        <Tooltip title="Export to Excel">
                          <img src={require("../../../../assets/img/excel.png").default} />
                        </Tooltip>
                      </IconButton>
                    </GridItem>
                    ):(
                      <GridItem style={{ cursor: "pointer" }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(allDispatch)} >
                        <Tooltip title="Export to Excel">
                          <img src={require("../../../../assets/img/excel.png").default} />
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
           {!refresh? <MuiTable
            columns={headerData} 
            rows={allDispatch} 
            status_type="Dispatch"
            onClickViewOne={onClickView}
            />:""}
           </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
          )}
      <MasterModelForView
        classicModal={classicModalView}
        viewHeader="Dispatch Order View"
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModalView(false);
        }}
      >
        <ViewAll
          title="Dispatch Order"
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

export default DispatchOrdersPage;
