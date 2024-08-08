import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModelForPrint from "../../Components/MasterModelForPrint";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
// Services
import { getAllInvoiceslist } from "../../../services/invoiceLIstService";
import { getInvoiceBySalesId } from "../../../services/invoiceLIstService";
import { getItemDetailById } from "../../../services/saleService/addEnqueryService";
import {
  getAllCustomers,
  getListCustomers,
  getCustomerById,
} from "../../../services/customerListService";
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
//status service
import { getListStatus } from "../../../services/addStatusService";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
import InvoicePreview from "./InvoiceView/InvoicePreview";
import ReactSelect from "react-select";
import theme from "../../../theme/theme";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";


import {
  
  
 
  dateFormateField,
} from "../HelperComponent/utils";
import MasterModelForView from "../../Components/MasterModelForView";
import ViewAll from "./ViewAll";

import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";

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
import { currentDate, currentDate1 } from "../HelperComponent/utils";
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

const InvoiceListPage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const classes = useStyles();
  const [salesId, setSalesId] = React.useState("");
  const [globalState, dispatch] = useStateValue();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allStatus, setAllStatus] = React.useState([]);
  const [allInvoices, setAllInvoices] = React.useState([]);
  const [allCustomer, setAllCustomer] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [invoiceDetails, setInvoiceDetails] = React.useState({});
  const [invItemDetails, setInvItemDetails] = React.useState([]);
  const [customerDetail, setCustomerDetails] = React.useState({});
  const [invOtherChargesDetails, setOtherChargesDetails] = React.useState([]);
  const [viewRes, setViewRes] = React.useState("hidden");

  const[refresh, setRefresh]= React.useState(false);
  const [searchDetail, setSearchDetail] = React.useState({
    txt_invoice_date_from: currentDate1(),
    txt_invoice_date_to: currentDate(),
    txt_invoice_no: "",
    txt_keyword_phrase: "",
    ddl_status: "",
    txt_bill_no:"",
    txt_sales_order_no:"",
    ddl_customer:"",
  });
  const [classicModalView, setClassicModalView] = React.useState(false);
  const [otherCharges, setOtherCharges] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  const [itemDetails, setItemDetails] = React.useState([]);
  const [allItems, setAllItems] = React.useState({});
  const [inWarehouse, setInvWarehouse] = React.useState("");
  const [invoiceDetail, setInvoiceDetail] = React.useState({
    sales_id: "",
    edit: false,
    txt_invoice_no: "AUTO GENERATED",
    txt_invoice_date: currentDate(),
    txt_sales_order_date_from: currentDate(),
    txt_sales_order_date_to: currentDate(),
    txt_invoice_note: "",
  });
  const [collapsible, setCollapsible] = React.useState(true)
  const fetchData = () => {
    // setLoading(true);
    getListStatus(
      "Sales",
      (r) => {
        setAllStatus(r);
        // console.log(r,"abc")
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    // getAllInvoices(
    //   (r) => {
    //     setAllInvoices(r);
    //     console.log(r,"chek2")
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
    // setLoading(true);

    // getAllInvoices((r)=>{
    //   console.log(r,"invoice list full")
    // },
    // (err) => {
    //   dispatch({
    //     type: actionTypes.SET_OPEN_MSG,
    //     payload: { msg: err, msgType: "error" },
    //   });
    // }
    // )

    getListCustomers(
      (r) => {
        setAllCustomer(r);
        // console.log(r,"chek3")
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    )    
  

    // getAllInvoices(
    //   (r) => {
    //     setLoading(false);
    //     setAllInvoices(r);
    //     console.log(r,"chek2")
    //   },
    //   (err) => {
    //     setLoading(false);
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );

    setLoading(false);
  }, [globalState.refresh]);

  const headerData = [
    {
      id: "inv_serial_no",
      label: "#",
      align: "left",
    },
    {
      id: "inv_invoice_date",
      label: "Invoice Date",
      align: "left",
    
     
    },
    {
      id: "inv_invoice_no",
      label: "Invoice No",
      align: "center",
     
      
    },
    {
      id: "inv_sales_order_no",
      label: "Sales Order No",
      align: "center",
     
      
    },
    {
      id: "inv_customer",
      label: "Customer",
      align: "center",
 
    
    },
    // {
    //   id: "inv_gross_amount",
    //   label: "Gross Amount",
    //   align: "right",
    // },
    // {
    //   id: "inv_disc",
    //   label: "Disc",
    //   align: "right",
    // },
    // {
    //   id: "inv_gst",
    //   label: "Taxes",
    //   align: "right",
    // },
    // {
    //   id: "inv_other_charges",
    //   label: "Other Charges",
    //   align: "right",
    // },

    // {
    //   id: "inv_OtherCharges",
    //   label: "Other Charges",
    //   align: "right",
    // },
    {
      id: "inv_NetAmount",
      label: "Net Amount",
      align: "right",
     
      
    },
    {
      id: "inv_Action",
      label: "Action",
      align: "right",
    },
  ];
  const viewData = [
    {
      id: "invoice_date",
      label: "Invoice Date",
      align: "left",
    },
    {
      id: "invoice_no",
      label: "Invoice No",
      align: "left",
    },
 
    {
      id: "dispatch_order_no",
      label: "Dispatch No",
      align: "left",
    },

    {
      id: "sales_order_no",
      label: "Delivery Order No",
      align: "left",
    },

    {
      id: "so_no",
      label: "Sales Order No",
      align: "left",
    },

  
  
  ];
  const viewData2 = [
    {
      id: "enqCustomer",
      label: "Showroom / Warehouse",
      align: "left",
    },
    {
      id: "enqCustomer",
      label: "Customer",
      align: "left",
    },
  
  ];

  const onSelectDetails = (name, v) => {
    setSearchDetail({ ...searchDetail, [name]: v });
  };
  const onChangeSearchForm = (e) => {
    const { name, value } = e.target;
    setSearchDetail({ ...searchDetail, [name]: value });
  };

  const onClickPrint = (row) => {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: {},
    });
    getInvoiceBySalesId(
      row.sales_id,
      row.inv_invoice_no,
      (details) => {
        setInvoiceDetails(details);
        setInvItemDetails(details.invoice_item_details);
        setOtherChargesDetails(details.invoice_other_charges);
        
        getCustomerById(
          (cdet) => {
            // console.log("cusd", cdet);
            setCustomerDetails(cdet);
          }
          ,
          (err) => {
            console.log("No details available")
          },
          details.customer_id
        )

        dispatch({
          type: actionTypes.SET_LOADING,
          payload: {},
        });
        setClassicModal(true);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: {},
        });
      }
    );
  };

  // console.log(invoiceDetails,"invoiceDetails22")
  // let total = 0, other_charges = 0;
  // const calOther = () => {
  //   console.log(invOtherChargesDetails, "invOtherChargesDetails")
  //   invOtherChargesDetails.reduce((sum, li) => li.charge_type === "+" ?
  //     Number(sum) + Number(li.charge_amount)
  //     : Number(sum) - Number(li.charge_amount), 0
  //   ).toFixed(2)
  // }
  // calOther();
  // console.log(other_charges, "other_charges list page")


  const searchFormData = [
    {
      name: "txt_bill_no",
      label: "Bill No",
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
      name: "txt_invoice_date_from",
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
      name: "txt_invoice_date_to",
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
      label: "Sales order no",
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
    //   name: "txt_keyword_phrase",
    //   label: "Keyword / Pharse",
    //   hidden: false,
    //   required: false,
    //   align: "left",
    //   data_type: "string",
    //   html_element: "TextField",
    //   marginBottom: -15,
    //   defaultValue: "",
    //   error: false,
    //   xs: 12,
    //   md: 4,
    //   lg: 6,
    // },
    // {
    //   name: "ddl_status",
    //   label: "Status",
    //   hidden: false,
    //   required: false,
    //   data_type: "string",
    //   html_element: "select_two",
    //   xs: 12,
    //   md: 6,
    //   lg: 3,
    //   options: allStatus,
    // },
  ];

  const onSearch = (e) => {
    setRefresh(false);
    e.preventDefault();
    setLoading(true);

    if(searchDetail.txt_sales_order_no || searchDetail.txt_bill_no || searchDetail.ddl_customer
       || searchDetail.txt_invoice_date_from || searchDetail.txt_invoice_date_to)
       getAllInvoiceslist(
      (r) => {
        if (r.length > 0) {
          setAllInvoices(r);
          // console.log(r,"allInvoice");
          setViewRes("visible");
          setLoading(false);
        } else {
          setViewRes("visible");
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Invoice Order not found": "info" },
          });
        }
      },
      (err) => {
        setAllInvoices([]);
        setViewRes("visible");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      searchDetail
    );
  };

  const onClickView = (e) => {
    // console.log(e, "sank1806")
    setClassicModalView(true)
    getInvoiceBySalesId(
      e.sales_id,
      e.inv_invoice_no,
      (items) => {
        setLoading(false);
        setAllItems(items);
        setOtherCharges(items.invoice_other_charges);
        setInvoiceDetail((prv) => ({
          ...prv,
          edit: true,
          sales_id: location.state?.row.sales_id,
          txt_invoice_no: items.invoice_no,
          txt_invoice_date: dateFormateField(items.invoice_date),
          txt_invoice_note: items.invoice_note,
        }));

        setAddedItems(items.invoice_item_details);

        getListShowroomWarehouse(
          (l) => {
            setInvWarehouse(l.filter(i => i.value === items.invoice_item_details[0].showroom_warehouse_id)[0].label);
          },

         
        );
        
        // console.log(allItems,"riched edit")
        
        // getAllCustomers(
        //   (r) => {
        //     // console.log(r,"cust")
        //     setCustomerDetails(r[0]);
        //   },
        //   (err) => {
        //     setLoading(false);
        //     dispatch({
        //       type: actionTypes.SET_OPEN_MSG,
        //       payload: { msg: err, msgType: "error" },
        //     });
        //   },
        //   items.customer_id
        // );
      },
      (err) => {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  
  }

  const onClearState = () => {
    setRefresh(!refresh);
    setSearchDetail({
      txt_invoice_date_from: currentDate1(),
      txt_invoice_date_to: currentDate(),
      txt_invoice_no: "",
      ddl_customer: "",
      txt_keyword_pharse: "",
      ddl_status: "",
      txt_bill_no:"",
      txt_sales_order_no:"",
    });
  };


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Invoice List Report']);
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
      'Invoice Date',
      'Invoice No',
      'Sales Order No',     
      'Customer',
      'NetAmount',      
      
      
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const InvoiceTable = allInvoices.map((invoice) => {
      return {
        serial_no: invoice.inv_serial_no,
        Invoice_date: invoice.inv_invoice_date,
        Invoice_no:invoice.inv_invoice_no,
        sales_order_no: invoice.inv_sales_order_no[0],
        Customer:invoice.inv_customer,
        NetAmount: (invoice.NetAmount),
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    InvoiceTable.forEach((data) => {
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
    
  
    const fromDate = searchDetail?.txt_invoice_date_from;
    const toDate = searchDetail?.txt_invoice_date_to;
    
    
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    
    const chosenPeriod = ` ${formattedFromDate}  To  ${formattedToDate}`;
    
    const customer = searchDetail?.ddl_customer?.label ? searchDetail?.ddl_customer?.label : "-" ;

    
    const invoice_no = searchDetail?.txt_invoice_no ? searchDetail?.txt_invoice_no :"-" ;

    

    // periodCell.value = `Invoice No : ${invoice_no}    Period :  ${chosenPeriod}  customer : ${customer}    `;

    if (invoice_no !=="-" ) {
      periodCell.value = `Invoice No : ${invoice_no}    Period :  ${chosenPeriod}  `;
  } else if (customer !=="-"){
    periodCell.value = `Period :  ${chosenPeriod}   customer : ${customer}   `
  }
    else {
      periodCell.value = `Period :  ${chosenPeriod}  `;
  }
    
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Invoice List.xlsx');
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
        title="Sales > Invoices "
        btnToolTip="Add Invoice"
        addBtnLink="/admin/sales/direct-invoice"
      />

      <GridContainer>
        <GridItem xs="12">

          <CustomCard cdTitle="Search Invoices" 
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
              <GridItem xs="8">
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
      {invoiceDetails?.invoice_no && (
        <MasterModelForPrint
          classicModal={classicModal}
          onCloseModel={(e) => {
            e.preventDefault();
            setClassicModal(false);
          }}
          height="auto"
          okBtnText="Print"
          modelName="Invoice"
          onClickOk={(e) => {
            e.preventDefault()
            window.print()
            }}
        >
          <InvoicePreview
            invoiceDetails={invoiceDetails}
            invItemDetails={invItemDetails}
            customerDetail={customerDetail}
            invOtherChargesDetails={invOtherChargesDetails}
            totalOtherCharges={invoiceDetails.totalOtherCharges}
          />
        </MasterModelForPrint>
      )}
          
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
                      <h4 className={classes1.headerCdTitle}>Invoice Details</h4>
                    </GridItem>
                    {globalState.user.user_role !== "Admin" ? ( 
                    <GridItem style={{ cursor: "pointer",display: "none" }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(allInvoices)} >
                        <Tooltip title="Export to Excel">
                          <img src={require("../../../assets/img/excel.png").default} />
                        </Tooltip>
                      </IconButton>
                    </GridItem>
                    ):(
                      <GridItem style={{ cursor: "pointer" }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(allInvoices)} >
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
              {!refresh?<MuiTable
                columns={headerData}
                rows={allInvoices}
                onClickPrint={onClickPrint}
                onClickViewOne={onClickView}
              />:""}
             </CardBody>
            </Card>
         
        </GridItem>
      </GridContainer>

)}
      <MasterModelForView
        classicModal={classicModalView}
        viewHeader="Invoice View"
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModalView(false);
        }}
      >
        <ViewAll
          title="Invoice"
          viewData={viewData}
          viewData2={viewData2}
          addedItems={allItems}
          inWarehouse={inWarehouse}
          itemDetails={addedItems}
          allStatus={allStatus}
          otherCharges={otherCharges}
        />
      </MasterModelForView>

    </ThemeProvider>
  );
};

export default InvoiceListPage;
