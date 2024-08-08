import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../../Components/MasterModel";
import { CustomCard } from "../../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../../Components/CustomButton";
// Services
import { getAllInvoices ,getAllInvoiceslist} from "../../../../services/invoiceLIstService";
import { getInvoiceBySalesId } from "../../../../services/invoiceLIstService";
import { getItemDetailById } from "../../../../services/saleService/addEnqueryService";
import {
  getAllCustomers,
  getListCustomers,
} from "../../../../services/customerListService";
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
import { getListStatus } from "../../../../services/addStatusService";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
//import InvoicePreview from "./InvoiceView/InvoicePreview";
import ReactSelect from "react-select";
import theme from "../../../../theme/theme";
import { useStateValue } from "../../../../context/context";
import { actionTypes } from "../../../../context/reducer";

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
import PageTitle from "../../HelperComponent/PageTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { currentDate, currentDate1 } from "../../HelperComponent/utils";
import FormComponent from "../../HelperComponent/FormComponent";

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

const InvoiceListForSalesReturn = () => {
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

  const[refresh, setRefresh]= React.useState(false);
  const [searchDetail, setSearchDetail] = React.useState({
    txt_invoice_date_from: currentDate1(),
    txt_invoice_date_to: currentDate(),
    txt_item: "",
    txt_keyword_phrase: "",
    ddl_status: "",
    txt_bill_no:"",
    ddl_customer:"",
    for_sales_return: true,
  });

  const fetchData = () => {
    setLoading(true);
    getListStatus(
      "Sales",
      (r) => {
        setAllStatus(r);
        //console.log(r,"abc")
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
    setLoading(true);

    getListCustomers(
      (r) => {
        setAllCustomer(r);
        //console.log(r,"chek3")
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    )    
  
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
      align: "left",
    },
    {
      id: "inv_customer",
      label: "Customer",
      align: "left",
    },
    {
      id: "inv_item_details",
      label: "Items",
      align: "left",
    },
    
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
      (details) => {
        setInvoiceDetails(details);
        setInvItemDetails(details.invoice_item_details);
        setOtherChargesDetails(details.invoice_other_charges);
        setCustomerDetails(details.invoice_details[0].allAddress[0]);
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

  
  const searchFormData = [
    {
      name: "txt_bill_no",
      label: "Bill No",
      hidden: false,
      required: false,
      align: "left",
      data_type: "string",
      html_element: "TextField",
      error: false,
      xs: 12,
      md: 4,
      lg: 3,
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
      lg: 5,
      options: allCustomer,
    },
    {
      name: "txt_item",
      label: "Item",
      hidden: false,
      required: false,
      align: "left",
      data_type: "string",
      html_element: "TextField",
      error: false,
      xs: 12,
      md: 4,
      lg: 3,
    },
    
  ];

  const onSearch = (e) => {
    setRefresh(false);
    //console.log(allInvoices,"invoice")
    e.preventDefault();
    setLoading(true);

    if(searchDetail.txt_bill_no || searchDetail.ddl_customer
       || searchDetail.txt_invoice_date_from || searchDetail.txt_invoice_date_to || searchDetail.txt_item)
       getAllInvoiceslist(
      
      (r) => {
        if (r.length) {
          setAllInvoices(r);
          setLoading(false);
        } else {
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Invoice Order not found": "info" },
          });
        }
      },
      (err) => {
        setAllInvoices([]);

        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      searchDetail
    );
  };

  const onClearState = () => {
    setRefresh(!refresh);
    setSearchDetail({
      txt_invoice_date_from: currentDate1(),
      txt_invoice_date_to: currentDate(),
      txt_item: "",
      ddl_customer: "",
      txt_keyword_pharse: "",
      ddl_status: "",
      txt_bill_no:"",
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Sales > Invoices for sales return"
      />

      <GridContainer>
        <GridItem xs="12">

          <CustomCard cdTitle="Search Invoices" filterIcon>
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
              <GridItem xs="12">
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
          </CustomCard>
        </GridItem>
      </GridContainer>
      {invoiceDetails?.invoice_no && (
        <MasterModel
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
        </MasterModel>
      )}
            {/* {//console.log(allInvoices,"check1")} */}

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard cdTitle="Invoice Details" minHeight="auto">
              {!refresh?<MuiTable
                columns={headerData}
                rows={allInvoices}
                onClickPrint={onClickPrint}
              />:""}
            </CustomCard>
          )}
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default InvoiceListForSalesReturn;
