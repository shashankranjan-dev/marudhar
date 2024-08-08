// import GridContainer from "components/Grid/GridContainer";
// import GridItem from "components/Grid/GridItem";
// import Select from "@material-ui/core/Select";
// import MuiTable from "../../Components/MuITable";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "components/CustomButtons/Button.js";
// import MasterModel from "../../Components/MasterModel";
// import { CustomCard } from "../../Components/CustomCard";
// import CustomButton, {
//   CircleAddBtn,
//   ColoseButton,
// } from "../../Components/CustomButton";
// import {
//   directPurchaseFormRowData,
//   addedItemServiceRowData,
//   dummyRowData,
// } from "../../../services/directPurchaseFormService";
// import { getListCustomers } from "../../../services/customerListService";

// import { getAllSalesOrderByInvoice } from "../../../services/salesOrderByInvoiceService";
// import Switch from "@material-ui/core/Switch";
// import CheckIcon from "@mui/icons-material/Check";
// import ClearIcon from "@mui/icons-material/Clear";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
// import TextField from "@material-ui/core/TextField";
// import SweetAlert from "react-bootstrap-sweetalert";
// import { Input, Paper } from "@material-ui/core";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TimelineIcon from "@mui/icons-material/Timeline";
// import { ThemeProvider, Box } from "@material-ui/core";

// import CircularProgress from "@material-ui/core/CircularProgress";

// import SearchIcon from "@mui/icons-material/Search";
// import RotateLeftIcon from "@mui/icons-material/RotateLeft";
// import { IconButton, OutlinedInput } from "@material-ui/core";
// import ViewListIcon from "@mui/icons-material/ViewList";

// import theme from "../../../theme/theme";
// import ReactSelect from "react-select";
// import React from "react";
// import { useHistory } from "react-router-dom";
// import CardLinkButton from "views/Components/CardLinkButton";
// import {
//   activeText,
//   appScrollBar,
// } from "assets/jss/material-dashboard-pro-react";
// import { Autocomplete } from "@material-ui/lab";
// import { AllInbox } from "@mui/icons-material";
// // import { ColoseButton } from "../Components/CustomButton";

// import {
//   appFontWeightThin,
//   appDefaultColor,
//   appSecondColor,
//   appDefaultFamily,
//   appFontWeight,
//   reactSelectStyles,
// } from "assets/jss/material-dashboard-pro-react";
// import { withStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { Grid } from "@material-ui/core";
// import ItemViewCard from "../HelperComponent/ItemViewCard";
// import PageTitle, { PageHeader } from "../HelperComponent/PageTitle";
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
// import StepProceedModel from "../HelperComponent/StepProceedModel";
// import { useStateValue } from "../../../context/context";
// import { actionTypes } from "../../../context/reducer";

// import { Typography } from "@material-ui/core";
// import { whiteColor } from "assets/jss/material-dashboard-pro-react";
// import {
//   currentDate,
//   currentDate1,
//   currentDate1Pdf,
//   currentDatePdf,
// } from "../HelperComponent/utils";
// import { getListUsers } from "../../../services/associateService";
// import {
//   getAllGroup,
//   getAllReference,
//   getAllOutstandingData,
//   getSearchLedgerVouchers,
//   getLedgerClosingBalance,
//   getLedgerByCustomerName,
// } from "../../../services/ledgerBySalesOrderService";

// import OutstandingLedgerSalesView from "views/Pages/MisReportPage/OutstandingLedgerSalesView";
// import MasterModelForStock from "../../Components/MasterModelForOutstanding";
// import { currencyFormate } from "views/Pages/HelperComponent/utils";
// import MasterModelForLedgerInvoiceView from "../../Components/MasterModelForLedgerInvoiceView";
// import SalesOrderViewPageForLedger from "./SalesOrderViewPageForLedger";
// import { getListStatus } from "../../../services/addStatusService";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardBody from "components/Card/CardBody.js";
// import Tooltip from "@material-ui/core/Tooltip";
// import clxs from "classnames";
// import FileSaver from "file-saver";
// import XLSX from "xlsx";
// const useStyles1 = makeStyles(styles);
// //PDF
// import pdfIcon from "../../../assets/img/pdf-icon.png";
// import { jsPDF } from "jspdf";

// import MasterModelForPrint from "../../Components/MasterModelForPrint";
// import SalesOrderInvoicePage from "../Sales/SalesOrderInvoicePage";
// import { getSalesOrderBySalesId } from "../../../services/salesOrderListService";
// import { getAllSalesOrder } from "../../../services/salesOrderListService";

// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: "#fff",
//     color: appSecondColor,
//     padding: "5px 5px",
//     fontWeight: appFontWeight,
//     fontFamily: appDefaultFamily,
//     fontSize: "14px",
//   },
//   body: {
//     color: appSecondColor,
//     padding: "10px 5px",
//     fontWeight: appFontWeightThin,
//     fontFamily: appDefaultFamily,
//     fontSize: "12.6px",
//     borderBottom: "1px solid rgba(224, 224, 224, 1)",
//   },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     "&:nth-of-type(odd)": {},
//   },
// }))(TableRow);

// const useStyles = makeStyles((theme) => ({
//   root: {
//     switchBtn: {
//       width: 180,
//       height: "100%",
//     },
//   },
//   date: {
//     width: 110,
//   },
//   itemImgPaper: {
//     marginRight: "15px",
//     width: "80px",
//     height: "80px",
//     overflow: "hidden",
//   },
//   addBtn: {
//     width: 30,
//     height: 38,
//   },

//   searchBar: {
//     marginTop: 10,
//     marginBottom: 15,
//     padding: "15px 20px",
//   },
//   activeText: {
//     ...activeText,
//   },
//   input: {
//     height: 40,
//     lineLight: 40,
//     padding: "0 10px",
//     marginBottom: "20px",
//   },
//   actionbtns: {
//     marginTop: 20,
//     float: "right",
//   },

//   id: {
//     width: "5%",
//   },
//   doubleFiled: {
//     width: "20%",
//   },

//   action: {
//     width: "5%",
//   },
//   rate: {
//     width: "8%",
//   },
//   value: {
//     width: "15%",
//   },
//   itemImg: {
//     width: "8%",
//   },
//   itemDetails: {
//     width: "35%",
//   },
//   itemDetailsView: {
//     width: "50%",
//   },
//   quantity: {
//     width: "20%",
//   },
//   viewQuantity: {
//     width: "20%",
//   },
//   net_value_field: {
//     width: "10%",
//   },
//   Disc: {
//     width: "5%",
//   },
//   deleteAction: {
//     width: "25%",
//   },
//   Salesman: {
//     width: "15%",
//   },
//   customSelect: {
//     marginBottom: 15,
//   },
//   container: {
//     ...appScrollBar,
//     maxHeight: 360,
//   },
//   dateField: {
//     [theme.breakpoints.up("md")]: {
//       marginTop: "22px",
//     },
//   },
// }));

// const OutstandingBySalesOrder = () => {
//   const classes1 = useStyles1();

//   const history = useHistory();
//   const [classicModal, setClassicModal] = React.useState(false);
//   const [addedItems, setAddedItems] = React.useState([]);
//   const [loading, setLoading] = React.useState([]);
//   const [globalState, dispatch] = useStateValue();
//   const [refresh, setRefresh] = React.useState(false);
//   // const [outstanding, setOutstanding] = React.useState([]);
//   const [outstanding, setOutstanding] = React.useState([]);
//   const [allBrands, setAllBrands] = React.useState([]);
//   const [allUnits, setAllUnits] = React.useState([]);
//   const [billDetail, setBillDetail] = React.useState({});
//   const [allCustomer, setAllCustomer] = React.useState([]);
//   const [allGroup, setAllGroup] = React.useState([]);
//   const [allReference, setAllReference] = React.useState([]);
//   const [addSearch, setAddSearch] = React.useState({
//     ddl_customer: "",
//     ddl_group: "",
//     ddl_reference: "",
//     txt_from_date: currentDate1(),
//     txt_to_date: currentDate(),
//   });
//   const [viewRes, setViewRes] = React.useState("hidden");
//   const [ledgerGroup, setAllLedgerGroup] = React.useState([]);
//   const [ledgerList, setAllledgerList] = React.useState([]);
//   const [openingBalance, setOpeningBalance] = React.useState({});
//   const [billNo, setBillNo] = React.useState("");
//   const [transaction_type, set_transaction_type] = React.useState();
//   const [collapsible, setCollapsible] = React.useState(true);
//   const [allStatus, setAllStatus] = React.useState([]);

//   const [addItem, setAddItem] = React.useState({
//     // txtQuantity: "",
//     // txtRate: "",
//     // txtValue: "",
//     // item: "",
//     // brand: "",
//     category: "",
//     sales_id: "",
//     item_id: "",
//     category_id: "",

//     // itemImg: "",
//   });
//   const [salesOrderDetails, setSalesOrderDetails] = React.useState({});
//   const [showroom, setShowroom] = React.useState({});

//   const headerData = [
//     {
//       id: "id",
//       label: "#",
//     },
//     {
//       id: "company_name",
//       label: "Client Name",
//       align: "left",
//     },
//     {
//       id: "net_value",
//       label: "Sales Order Net Value",
//       align: "right",
//     },
//     {
//       id: "closing_balance",
//       label: "Total Out Standing",
//       align: "right",
//     },
//     {
//       id: "action",
//       label: "Action",
//       align: "right",
//     },
//   ];
  
//   const onChangeBillDate = (e) => {
//     const { name, value } = e.target;
//     setBillDetail({ ...billDetail, [name]: value });
//   };

//   const fetchData = () => {
//     getAllGroup(
//       (r) => {
//         setAllGroup(r);
//       },
//       (err) => {
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       }
//     );

//     getAllReference(
//       (r) => {
//         setAllReference(r);
//         // setAllReference([
//         //   { value: "addNewReference", label: "Add New Reference" },
//         //   ...r,
//         // ]);
//       },
//       (err) => {
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       }
//     );
//     getListCustomers(
//       (r) => {
//         setAllCustomer(r);
//       },
//       (err) => {
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       }
//     );
//     getListStatus(
//       "Sales-Order",
//       (r) => {
//         setAllStatus(r);
//       },
//       (err) => {
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       }
//     );
//   };

//   React.useEffect(() => {
//     fetchData();
//     setAllUnits(directPurchaseFormRowData);
//   }, []);

//   const onAddSearch = (e) => {
//     const { name, value } = e.target;

//     setAddSearch((prv) => ({ ...prv, [name]: value }));
//   };
//   ///1
//   const onSelect = (info, v) => {
//     getLedgerByCustomerName(
//       v.value,
//       (r) => {
//         setAddSearch({
//           ...addSearch,
//           [info.name]: v,
//           ledger_account_id: r[0].ledger_id,
//         });
//         // setLedgerDetails(r[0]);

//         // ledger_account_id.push(r);
//         //ledger_account_id = r[0]?.ledger_id;
//       },
//       (err) => {
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       }
//     );
//     setAddSearch({ ...addSearch, [info.name]: v });
//   };
//   ///2
//   const onSearchReport = (e) => {
//     setRefresh(false);
//     e.preventDefault();
//     setLoading(true);
//     if (!addSearch.ddl_customer) {
//       dispatch({
//         type: actionTypes.SET_OPEN_MSG,
//         payload: { msg: "Please! Select Customer", msgType: "error" },
//       });
//     } else {
//       ///////////////ledger//////////////
//       getSearchLedgerVouchers(
//         (enquery) => {
//           // console.log(enquery, "sankh1807");
//           if (enquery.length) {
//             setAllledgerList(enquery);
//             // setViewRes("visible");
//             setLoading(false);
//           } else {
//             // setViewRes("visible");
//             setAllledgerList([]);
//             setLoading(false);
//             dispatch({
//               type: actionTypes.SET_OPEN_MSG,
//               payload: { msg: err, "Journal not found": "info" },
//             });
//           }
//         },
//         (err) => {
//           setAllledgerList([]);
//           // setViewRes("visible");
//           dispatch({
//             type: actionTypes.SET_OPEN_MSG,
//             payload: { msg: err, msgType: "error" },
//           });
//           setLoading(false);
//         },
//         addSearch.ledger_account_id,
//         addSearch.ddl_customer.value,
//         addSearch.txt_from_date,
//         addSearch.txt_to_date
//       );
//       ////////////////closing////////////////////
//       getLedgerClosingBalance(
//         (clsBalance) => {
//           // console.log(clsBalance, "test");
//           if (clsBalance.length > 0) {
//             setOpeningBalance({
//               opening: clsBalance[0].closing_balance,
//               dr_cr_status: clsBalance[0].dr_cr_status,
//             });
//           } else {
//             dispatch({
//               type: actionTypes.SET_OPEN_MSG,
//               payload: { msg: err, "Journal not found": "info" },
//             });
//           }
//         },
//         (err) => {
//           // setAllledgerList([]);
//           dispatch({
//             type: actionTypes.SET_OPEN_MSG,
//             payload: { msg: err, msgType: "error" },
//           });
//           setLoading(false);
//         },
//         // addSearch
//         {
//           ...addSearch,
//           txt_from_date: "2021-04-01",
//           txt_to_date: addSearch.txt_from_date,
//         }
//       );
//       getAllOutstandingData(
//         (r) => {
//           // console.log(r, "sen2505/r");
//           if (r.length) {
//             setOutstanding(r);
//             setViewRes("visible");
//             // setClassicModal(true);
//           } else {
//             setViewRes("hidden");
//             setLoading(false);
//             dispatch({
//               type: actionTypes.SET_OPEN_MSG,
//               payload: { msg: err, msgType: "info" },
//             });
//           }
//         },
//         (err) => {
//           setOutstanding([]);
//           // setViewRes("hidden");
//           setViewRes("visible");
//           // setAllledgerList([])
//           dispatch({
//             type: actionTypes.SET_OPEN_MSG,
//             payload: { msg: err, msgType: "error" },
//           });
//         },
//         addSearch
//       );
//     }
//   };
//   //Old
//   // const onSelect = (info, v) => {
//   //   setAddSearch({ ...addSearch, [info.name]: v });
//   // };

//   // const onSearchReport = (e) => {
//   //   console.log(!addSearch.ddl_customer, "sen2505/search")
//   //   setRefresh(false);
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   if (!addSearch.ddl_customer) {
//   //     dispatch({
//   //       type: actionTypes.SET_OPEN_MSG,
//   //       payload: { msg: "Please! Select Customer", msgType: "error" },
//   //     });
//   //   } else {
//   //     getAllOutstandingData(
//   //       (r) => {
//   //         console.log(r, "sen2505/r")
//   //         if (r.length) {
//   //           setOutstanding(r)
//   //           setViewRes("visible");
//   //           // setClassicModal(true);
//   //           ///////////////ledger//////////////
//   //           getSearchLedgerVouchers(
//   //             (enquery) => {
//   //               if (enquery.length) {
//   //                 setAllledgerList(enquery);
//   //                 // setViewRes("visible");
//   //                 setLoading(false);
//   //               } else {
//   //                 // setViewRes("visible");
//   //                 setLoading(false);
//   //                 dispatch({
//   //                   type: actionTypes.SET_OPEN_MSG,
//   //                   payload: { msg: err, "Journal not found": "info" },
//   //                 });
//   //               }
//   //             },
//   //             (err) => {
//   //               setAllledgerList([]);
//   //               // setViewRes("visible");
//   //               dispatch({
//   //                 type: actionTypes.SET_OPEN_MSG,
//   //                 payload: { msg: err, msgType: "error" },
//   //               });
//   //               setLoading(false);
//   //             },
//   //             r[0].ledger_account_id,
//   //             r[0].customer_id,
//   //             addSearch.txt_from_date,
//   //             addSearch.txt_to_date
//   //           );
//   //           ////////////////closing////////////////////
//   //           getLedgerClosingBalance(
//   //             (clsBalance) => {
//   //               console.log(clsBalance[0].closing_balance, "test");
//   //               if (clsBalance.length > 0) {
//   //                 setOpeningBalance({
//   //                   opening: clsBalance[0].closing_balance,
//   //                   dr_cr_status: clsBalance[0].dr_cr_status,
//   //                 });

//   //               } else {
//   //                 dispatch({
//   //                   type: actionTypes.SET_OPEN_MSG,
//   //                   payload: { msg: err, "Journal not found": "info" },
//   //                 });
//   //               }
//   //             },
//   //             (err) => {
//   //               setAllledgerList([]);
//   //               dispatch({
//   //                 type: actionTypes.SET_OPEN_MSG,
//   //                 payload: { msg: err, msgType: "error" },
//   //               });
//   //               setLoading(false);
//   //             },

//   //             {
//   //               ...addSearch, txt_from_date: "2021-04-01", ledger_account_id: r[0].ledger_account_id,
//   //               txt_to_date: addSearch.txt_from_date,
//   //             }
//   //           );

//   //         } else {
//   //           setViewRes("visible");
//   //           setLoading(false);
//   //           dispatch({
//   //             type: actionTypes.SET_OPEN_MSG,
//   //             payload: { msg: err, "Sales Report not found": "info" },
//   //           });
//   //         }
//   //       },
//   //       (err) => {
//   //         setOutstanding([])
//   //         setViewRes("hidden");

//   //         dispatch({
//   //           type: actionTypes.SET_OPEN_MSG,
//   //           payload: { msg: err, msgType: "error" },
//   //         });
//   //       },
//   //       addSearch
//   //     );
//   //   }
//   // };

//   const onClickRefresh = () => {
//     setRefresh(!refresh);
//     setAddSearch({
//       txtValue: "",
//       ddl_customer: "",
//       ddl_reference: "",
//       ddl_group: "",

//       txt_item: "",
//       ddl_brand: "",
//       ddl_category: "",
//       txt_sales_no: "",
//       txt_from_date: currentDate1(),
//       txt_to_date: currentDate(),
//     });
//   };

//   const onAddItem = (v) => {
//     // setAddItem({
//     //   ...addItem,
//     //   itemImg: v.itemImg,
//     //   brand: v.brand,
//     //   item: v.item,
//     // });
//     // setAddedItems([...addedItems, addItem]);
//     // console.log(addItem);
//     // setAddItem({
//     //   txtQuantity: "",
//     //   txtRate: "",
//     //   txtValue: "",
//     //   item: "",
//     //   brand: "",
//     //   category: "",
//     //   itemImg: "",
//     // });
//   };

//   const onClickView = (r) => {
//     // console.log("sen1805", r);
//     setClassicModal(true);

//     //fetching data

//     getSearchLedgerVouchers(
//       (enquery) => {
//         if (enquery.length) {
//           setAllledgerList(enquery);
//           // setViewRes("visible");
//           // setLoading(false);
//         } else {
//           // setViewRes("visible");
//           // setLoading(false);
//           dispatch({
//             type: actionTypes.SET_OPEN_MSG,
//             payload: { msg: err, "Journal not found": "info" },
//           });
//         }
//       },
//       (err) => {
//         setAllledgerList([]);
//         // setViewRes("visible");
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//         setLoading(false);
//       },
//       r.ledger_account_id,
//       r.customer_id,
//       addSearch.txt_from_date,
//       addSearch.txt_to_date
//     );

//     getLedgerClosingBalance(
//       (clsBalance) => {
//         // console.log(clsBalance[0].closing_balance, "test");
//         if (clsBalance.length > 0) {
//           setOpeningBalance({
//             opening: clsBalance[0].closing_balance,
//             dr_cr_status: clsBalance[0].dr_cr_status,
//           });
//         } else {
//           dispatch({
//             type: actionTypes.SET_OPEN_MSG,
//             payload: { msg: err, "Journal not found": "info" },
//           });
//         }
//       },
//       (err) => {
//         setAllledgerList([]);
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//         setLoading(false);
//       },

//       {
//         ...addSearch,
//         txt_from_date: "2021-04-01",
//         ledger_account_id: r.ledger_account_id,
//         txt_to_date: addSearch.txt_from_date,
//       }
//     );
//   };
//   const onCloseModel = () => {
//     setClassicModal(false);
//   };

//   const onClickPrint = (row) => {
//     dispatch({
//       type: actionTypes.SET_LOADING,
//       payload: {},
//     });
//     // console.log("prDet", row);

//     getAllSalesOrder(
//       (row) => {
//         // setVendorDetail(row[0]);
//         // setVendorAddres(row[0].allAddress[0]);
//         setSalesOrderDetails(row);
//       },
//       (err) => {
//         setLoading(false);
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       },
//       //row.customer_id
//       searchDetail,
//       row.sales_id
//     );

//     // getAllShowroomWarehouse(
//     //     (row) => {
//     //       setShowroom(row);
//     //     },
//     //     row.showrooms_warehouse_id

//     //   );
//     // console.log(row,"111")

//     //setDeliveryDetails(row);
//     dispatch({
//       type: actionTypes.SET_LOADING,
//       payload: {},
//     });
//     setClassicModal(true);
//   };

//   // export to excel
//   //  const onhandleExportToExcel = () => {
//   //   const ledgerListTable = ledgerList.map((ledger) => {
//   //     return {
//   //       Sl_No:  ledger.length != 0 ? ledger + 1 : "",
//   //       Date: ledger.ledDate,
//   //       Voucher_No: ledger.ledVoucherNo,
//   //       Voucher_Type: ledger.ledVoucherType,
//   //       Particular: ledger.particular ? ledger.particular : ledger.ledger_account_for_party,
//   // // Status:ledger.sales_status,
//   //       Status:  Number(ledger.sales_status)===29?"Dis.Order Gen.Fully"
//   //               :Number(ledger.sales_status)===25?"Dis.Order Gen.partly"
//   //               :Number(ledger.sales_status)===24?"New"
//   //               :Number(ledger.sales_status)===28?"All"
//   //               :'',
//   //       Debit:  getAmount(ledger, [1, 'P', 'BR']),
//   //       Credit: getAmount(ledger, [2, 'R', 'BP']),

//   //     };
//   //   });

//   //   const fileName = "ledger List";
//   //   const fileType =
//   //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   //   const fileExtension = ".xlsx";
//   //   const ws = XLSX.utils.json_to_sheet(ledgerListTable);
//   //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//   //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//   //   const data = new Blob([excelBuffer], { type: fileType });
//   //   FileSaver.saveAs(data, fileName + fileExtension);
//   // };

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setAddItem((prv) => ({ ...prv, [name]: value }));
//   };
//   const classes = useStyles();
//   // console.log(currentDate(1), "data increse");
//   let closingBalance = 0;
//   let closing_balance_dr_cr = "";
//   let total = 0;
//   let totalDr = 0;
//   let totalCr = 0;

//   const balanceSheet = () => {
//     ledgerList.map((row, i) => {
//       // console.log("sen0208", row?.sales_status === "46");

//       total =
//         row.sales_order_other_charges &&
//         row.sales_order_other_charges.reduce(
//           (s, l) =>
//             l.charge_type === "+"
//               ? s + Number(l.charge_amount)
//               : s - Number(l.charge_amount),
//           0
//         );
//       // totalDr = !total ? parseFloat(row.amount) + parseFloat(totalDr) : parseFloat(row.amount) + parseFloat(totalDr) + total;
//       if (row.dr_cr === 1) {
//         // totalDr = !total
//         //   ? (row?.sales_status === "46" ? 0 : parseFloat(row.amount)) +
//         //     parseFloat(totalDr)
//         //   : parseFloat(row.amount) + parseFloat(totalDr) + total;


//         totalDr = !total
//           ?
//           (parseFloat(row.amount) ? parseFloat(row.amount) :0)  + parseFloat(totalDr)
//           : parseFloat(row.amount) + parseFloat(totalDr) + total;

        
//       } else {
//         totalCr = !total
//           ? parseFloat(row.amount) + parseFloat(totalCr)
//           : parseFloat(row.amount) + parseFloat(totalCr) + total;
//       }
//     });

//     if (openingBalance.dr_cr_status === "Dr") {
//       totalDr = openingBalance.opening + Number(totalDr);
//       console.log(totalDr, "xxx");
//     } else {
//       totalCr = openingBalance.opening + totalCr;
//     }
//     console.log(totalDr, "dr total");
//     console.log(totalCr, "cr total");
//   };

//   // const fetchData = () => {
//   //   // getAllJournal(
//   //   //   (r) => {
//   //   //     setAllledgerList(r);
//   //   //   },
//   //   //   (err) => {
//   //   //     dispatch({
//   //   //       type: actionTypes.SET_OPEN_MSG,
//   //   //       payload: { msg: err, msgType: "error" },
//   //   //     });
//   //   //   }
//   //   // )
//   //   // getAllLedgerGroup(
//   //   //   (r) => {
//   //   //     setAllLedgerGroup(r);
//   //   //   },
//   //   //   (err) => {
//   //   //     dispatch({
//   //   //       type: actionTypes.SET_OPEN_MSG,
//   //   //       payload: { msg: err, msgType: "error" },
//   //   //     });
//   //   //   }
//   //   // );

//   //   // getListLedgerAccount(
//   //   //   (r) => {
//   //   //     console.log("sen123", r);
//   //   //     setAllLedgerAccount(r);
//   //   //   },
//   //   //   (err) => {
//   //   //     dispatch({
//   //   //       type: actionTypes.SET_OPEN_MSG,
//   //   //       payload: { msg: err, msgType: "error" },
//   //   //     });
//   //   //   }
//   //   // );

//   //   // getListGroup(
//   //   //   (r) => {
//   //   //     setAllGroup(r);
//   //   //   },
//   //   //   (err) => {
//   //   //     dispatch({
//   //   //       type: actionTypes.SET_OPEN_MSG,
//   //   //       payload: { msg: err, msgType: "error" },
//   //   //     });
//   //   //   }
//   //   // );
//   // };
//   // const tableData = [];
//   // const headerData = [
//   //   {
//   //     id: "ledDate",
//   //     label: "Date",
//   //     align: "left",
//   //   },
//   //   {
//   //     id: "ledVoucherNo",
//   //     label: "Voucher No",
//   //     align: "left",
//   //   },
//   //   {
//   //     id: "ledVoucherType",
//   //     label: "Voucher Type",
//   //     align: "left",
//   //   },
//   //   {
//   //     id: "ledParticular",
//   //     label: "Particular",
//   //     align: "left",
//   //   },
//   //   {
//   //     id: "ledDebit",
//   //     label: "Debit",
//   //     align: "right",
//   //   },
//   //   {
//   //     id: "ledCredit",
//   //     label: "Credit",
//   //     align: "right",
//   //   },
//   // ];

//   balanceSheet();

//   // const classes = useStyles();

//   const getVType = (voucherType) => {
//     if (voucherType === "R") {
//       return "Receipt";
//     } else if (voucherType === "P") {
//       return "Payment";
//     } else return voucherType;
//   };

//   const getAmount = (row, r_dr_cr) => {
//     // console.log(row.sales_order_other_charges,"sen2705/row")
//     // console.log(row.amount,"sen2705/row1")

//     // console.log(row, "sen2405/row");

//     if (
//       (row.particular &&
//         r_dr_cr.includes(row.dr_cr) &&
//         row.bank_id === outstanding.ledger_account_id &&
//         !r_dr_cr.includes(row.ledVoucherType)) ||
//       (row.bank_id !== outstanding.ledger_account_id &&
//         r_dr_cr.includes(row.ledVoucherType))
//     ) {
//       if (row.sales_status === "37") {
//         return row.invoice_item_details?.length > 0 ? Number(row.amount) : 0;
//       } else if (row.sales_status === "46") {
//         return "0";
//       } else {
//         return row.amount;
//       }
//       // (

//       // <>
//       // {
//       //   r_dr_cr[1] ==='P'?
//       //   row.amount +
//       //   row.sales_order_other_charges.reduce((s,l)=>
//       //   l.charge_type === "+"?
//       //   + Number(l.charge_amount) : - Number(l.charge_amount)
//       //   )

//       // :
//       // //else 1
//       // row.amount

//       // }
//       // </>

//       // );
//     }
//     return "";
//   };

//   const onClickCell = (e, row) => {
//     // console.log(row, "sen30052022");
//     set_transaction_type(row.ledVoucherType);
//     setBillNo(e.target.innerHTML);

//     if (row.ledVoucherType === "Sales Order") {
//       // history.push({
//       //   pathname: "/admin/mis-reports/Sales-order-view",
//       // state: { row: row },

//       // })
//       setClassicModal(true);
//     }
//   };

//   const onClickCollaps = () => {
//     collapsible ? setCollapsible(false) : setCollapsible(true);
//   };

//   //pdf
//   const onClickPdf = (e) => {
//     e.preventDefault();

//     let doc = new jsPDF("landscape", "pt", "A4");
//     doc.html(document.getElementById("pdf-view"), {
//       callback: () => {
//         doc.save(`ledgerBySalesOrder ${currentDate()}.pdf`);
//       },
//     });

//     // setClassicModal(true);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <PageHeader title="MIS Report > Ledger By Sales Order " />
//       <GridContainer>
//         <GridItem xs="12">
//           <CustomCard
//             cdTitle=" Ledger By Sales Order"
//             btnToolTip={collapsible ? "Collaps" : "Expand"}
//             onClickCollapsible={onClickCollaps}
//             buttonAction={collapsible}
//             filterIcon
//             onClickFilter={() => {}}
//           >
//             {collapsible ? (
//               <GridContainer
//                 style={{ padding: "10px" }}
//                 justifyContent="flex-start"
//                 alignItems="center"
//               >
//                 {/* <GridItem xs="4">
//              <InputLabel id="label">Group</InputLabel>
//                 <ReactSelect
//                   options={allGroup}
//                   name="ddl_group"
//                   getOptionLabel={(option) => option.label}
//                   placeholder="Select"
//                   formatGroupLabel={(d) => d.label}
//                   menuPortalTarget={document.body}
//                   styles={reactSelectStyles}
//                   className={classes.customSelect}
//                   onChange={(v, info) => onSelect(info, v)}
//                   value={addSearch.ddl_group}
//                 />
//               </GridItem>
//               <GridItem xs="4">
//              <InputLabel id="label">Reference</InputLabel>
//                 <ReactSelect
//                   options={allReference}
//                   name="ddl_reference"
//                   getOptionLabel={(option) => option.label}
//                   placeholder="Select"
//                   formatGroupLabel={(d) => d.label}
//                   menuPortalTarget={document.body}
//                   styles={reactSelectStyles}
//                   className={classes.customSelect}
//                   onChange={(v, info) => onSelect(info, v)}
//                   value={addSearch.ddl_reference}
//                 />
//               </GridItem> */}
//                 <GridItem xs="4">
//                   <InputLabel id="label">Customer</InputLabel>
//                   <ReactSelect
//                     options={allCustomer}
//                     name="ddl_customer"
//                     getOptionLabel={(option) => option.label}
//                     placeholder="Select"
//                     formatGroupLabel={(d) => d.label}
//                     menuPortalTarget={document.body}
//                     styles={reactSelectStyles}
//                     className={classes.customSelect}
//                     onChange={(v, info) => onSelect(info, v)}
//                     value={addSearch.ddl_customer}
//                   />
//                 </GridItem>

//                 <GridItem xs="2">
//                   <InputLabel id="label">Date Between</InputLabel>
//                   <TextField
//                     name="txt_from_date"
//                     size="small"
//                     id="date"
//                     variant="outlined"
//                     type="date"
//                     fullWidth={true}
//                     value={addSearch.txt_from_date}
//                     defaultValue={currentDate1()}
//                     onChange={onAddSearch}
//                     // className={classes.dateField}
//                     inputProps={{
//                           shrink: true,
//                           min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
//                           max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
//                         }}
//                   />
//                 </GridItem>
//                 <GridItem xs="2">
//                   {/* <InputLabel id="label">Date</InputLabel> */}
//                   <TextField
//                     size="small"
//                     name="txt_to_date"
//                     id="date"
//                     variant="outlined"
//                     type="date"
//                     fullWidth={true}
//                     value={addSearch.txt_to_date}
//                     defaultValue={currentDate()}
//                     onChange={onAddSearch}
//                     className={classes.dateField}
//                     inputProps={{
//                           shrink: true,
//                           min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
//                           max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
//                         }}
//                   />
//                 </GridItem>

//                 <GridItem xs="12">
//                   <div
//                     style={{
//                       float: "right",
//                       display: "flex",
//                       alignItems: "center",
//                       marginTop: 10,
//                     }}
//                   >
//                     <CustomButton
//                       style={{ marginRight: "10px" }}
//                       onClick={onSearchReport}
//                     >
//                       <SearchIcon />
//                     </CustomButton>
//                     <CustomButton name="btn_refres" onClick={onClickRefresh}>
//                       <RotateLeftIcon />
//                     </CustomButton>
//                   </div>
//                 </GridItem>
//               </GridContainer>
//             ) : (
//               ""
//             )}
//           </CustomCard>
//         </GridItem>
//       </GridContainer>

//       {/* Select and Add Items */}

//       {/* <GridContainer className={classes.root} style={{ "visibility": viewRes }}>
//         <GridItem xs="12">
//           <CustomCard cdTitle="Outstanding Search Result" height={450}>
//           <MuiTable
//               onClickViewOne={onClickView}
//               columns={headerData}
//               rows={outstanding}
//             />
//           </CustomCard>
//         </GridItem>
//       </GridContainer> */}

//       {loading === true ? (
//         <Box mt={10} width="100%" textAlign="center">
//           <CircularProgress />
//         </Box>
//       ) : (
//         <GridContainer className={classes.root} style={{ visibility: viewRes }}>
//           <GridItem xs="12">
//             <Card className={classes1.headerCard}>
//               <CardHeader
//                 className={classes1.TbheaderCdhd}
//                 style={{ height: 60 }}
//               >
//                 <GridContainer
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <GridItem>
//                     <h4 className={classes1.headerCdTitle}>
//                       Ledger By Sales Order
//                     </h4>
//                   </GridItem>
//                   <GridItem style={{ cursor: "pointer" }}>
//                     <IconButton onClick={onClickPdf}>
//                       <Tooltip title="Export to PDF">
//                         <img src={pdfIcon} style={{ width: 20 }} />
//                       </Tooltip>
//                     </IconButton>
//                   </GridItem>
//                 </GridContainer>
//               </CardHeader>
//               <CardBody
//                 style={{ height: "auto", maxHeight: 480, padding: 10 }}
//                 className={clxs(classes.customScroolBar)}
//               >
//                 {/* <MuiTable
//               columns={headerData}
//               rows={ledgerList}
//               isTableBodyBorder
//               isTableHeaderBorder
//             /> */}
//                 <TableContainer>
//                   <Table
//                     className={classes.table}
//                     aria-label="customized table"
//                   >
//                     <TableHead>
//                       <TableRow>
//                         <StyledTableCell align="left">#</StyledTableCell>
//                         <StyledTableCell align="left">Date</StyledTableCell>
//                         <StyledTableCell align="left">
//                           Voucher No
//                         </StyledTableCell>
//                         <StyledTableCell align="left">
//                           Voucher Type
//                         </StyledTableCell>
//                         <StyledTableCell align="left">
//                           Particular
//                         </StyledTableCell>
//                         <StyledTableCell align="center">Transaction No</StyledTableCell>
//                         <StyledTableCell align="center">Narration</StyledTableCell>
//                         <StyledTableCell align="center">Status</StyledTableCell>


//                         <StyledTableCell align="right">Debit</StyledTableCell>
//                         <StyledTableCell align="right">Credit</StyledTableCell>
//                         {/* <StyledTableCell align="right">Action</StyledTableCell> */}
//                       </TableRow>
//                     </TableHead>
//                     {/* table Body start */}
//                     <TableBody>
//                       <StyledTableRow className={classes.openingBalances}>
//                         <StyledTableCell></StyledTableCell>
//                         <StyledTableCell></StyledTableCell>

//                         <StyledTableCell
//                           className={classes.credit}
//                         ></StyledTableCell>
//                           <StyledTableCell
//                           className={classes.credit}
//                         ></StyledTableCell>
//                         <StyledTableCell className={classes.credit}>
//                           <b>Opening Balance</b>
//                         </StyledTableCell>
//                         <StyledTableCell
//                           className={classes.credit}
//                         ></StyledTableCell>
//                         <StyledTableCell
//                           className={classes.credit}
//                         ></StyledTableCell>
//                         <StyledTableCell></StyledTableCell>
//                         <StyledTableCell align="right">
//                           <b>
//                             {openingBalance.dr_cr_status === "Dr"
//                               ? currencyFormate(openingBalance.opening)
//                               : ""}
//                           </b>
//                         </StyledTableCell>
//                         <StyledTableCell align="right">
//                           {/* <b>{openingBalance ===0?'':openingBalance}</b> */}
//                           <b>
//                             {openingBalance.dr_cr_status === "Cr"
//                               ? currencyFormate(openingBalance.opening)
//                               : ""}
//                           </b>
//                         </StyledTableCell>
//                       </StyledTableRow>

//                       {ledgerList.map((row, i) => (
//                         <StyledTableRow key={i}>
//                           <StyledTableCell align="left" className={classes.id}>
//                             {row.length != 0 ? i + 1 : ""}
//                           </StyledTableCell>

//                           <StyledTableCell
//                             align="left"
//                             className={classes.ledger}
//                           >
//                             {row.ledDate}
//                           </StyledTableCell>

//                           <StyledTableCell
//                             align="left"
//                             className={classes.ledger}
//                             style={
//                               row.ledVoucherType === "Sales Order"
//                                 ? { cursor: "pointer", background: "lightBlue" }
//                                 : { cursor: "no-drop" }
//                             }
//                             onClick={(e) => {
//                               onClickCell(e, row);
//                             }}
//                           >
//                             {row.ledVoucherNo}
//                           </StyledTableCell>

//                           <StyledTableCell
//                             align="left"
//                             className={classes.ledger}
//                           >
//                             {getVType(row.ledVoucherType) === "BR" ||
//                             getVType(row.ledVoucherType) === "BP"
//                               ? "Bad Debt"
//                               : getVType(row.ledVoucherType)}
//                           </StyledTableCell>

//                           <StyledTableCell
//                             align="left"
//                             className={classes.ledger}
//                           >
//                             {
//                               /*`${
//                           row.ledJournal[0].ddl_ledger ===
//                           addSearch.ddl_ledger_account.label
//                             ? row.ledJournal[1].ddl_ledger
//                             : row.ledJournal[0].ddl_ledger
//                         }` */
//                               // row.mode ? row.mode : row.particular
//                               row.particular
//                                 ? row.particular
//                                 : row.ledger_account_for_party
//                             }
//                           </StyledTableCell>
//                           <StyledTableCell  align="center" className={classes.ledger}
//                       style={{ fontSize: 13 }}>
//                             {/* {
//                               allStatus.find(
//                                 (s, i) => s.value === Number(row.sales_status)
//                               )?.label
//                             } */}
//                             {row.ledVoucherType === "Journal" ? row.ledTransectionId : row.mode}
//                           </StyledTableCell>
//                           <StyledTableCell align="center" className={classes.ledger} style={{ fontSize: 13, webkitlineclamp: 3 }}>
//                           {row.narraction}
//                           </StyledTableCell>
//                           <StyledTableCell align="center" className={classes.ledger} style={{ fontSize: 13, webkitlineclamp: 3 }}>
//                           {
//                               allStatus.find(
//                                 (s, i) => s.value === Number(row.sales_status)
//                               )?.label
//                             }
//                           </StyledTableCell>

//                           <StyledTableCell
//                             align="right"
//                             className={classes.ledger}
//                           >
//                             {/* {console.log(row, "sen3105")} */}

//                             {!getAmount(row, [1, "P", "BR"])
//                               ? row.sales_status === "37"
//                                 ? currencyFormate(
//                                     getAmount(row, [1, "P", "BR"])
//                                   )
//                                 : (

//                                   getAmount(row, [1, "P", "BR"]) +
//                                     (row.sales_order_other_charges &&
//                                       row.sales_order_other_charges.reduce(
//                                         (s, l) =>
//                                           l.charge_type === "+"
//                                             ? s + Number(l.charge_amount)
//                                             : s - Number(l.charge_amount),
//                                         0
//                                       )) === '0' ? '' 
//                                       : currencyFormate(row.sales_order_other_charges &&
//                                         row.sales_order_other_charges.reduce(
//                                           (s, l) =>
//                                             l.charge_type === "+"
//                                               ? s + Number(l.charge_amount)
//                                               : s - Number(l.charge_amount),
//                                           0
//                                         ))

//                                 )
//                               : currencyFormate(
//                                   !row.sales_order_other_charges
//                                     ? getAmount(row, [1, "P", "BR"])
//                                     : getAmount(row, [1, "P", "BR"]) +
//                                         (row.sales_order_other_charges &&
//                                           row.sales_order_other_charges.reduce(
//                                             (s, l) =>
//                                               l.charge_type === "+"
//                                                 ? s + Number(l.charge_amount)
//                                                 : s - Number(l.charge_amount),
//                                             0
//                                           ))
//                                 )}
//                           </StyledTableCell>

//                           <StyledTableCell
//                             align="right"
//                             className={classes.ledger}
//                           >
//                             {
//                               /* {`${
//                           row.ledJournal?.ddl_ledger ===
//                           addSearch.ddl_ledger_account.label
//                             ? row.ledJournal.dr_cr === 2
//                               ? row.ledJournal.amount
//                               : ""
//                             : ""
//                         }`} */
//                               getAmount(row, [2, "R", "BP"])
//                                 ? getAmount(row, [2, "R", "BP"])
//                                 : getAmount(row, [2, "R", "BP"])
//                             }
//                           </StyledTableCell>
//                         </StyledTableRow>
//                       ))}
//                       <StyledTableRow>
//                         <StyledTableCell></StyledTableCell>
//                         <StyledTableCell></StyledTableCell>
//                         <StyledTableCell></StyledTableCell>
//                         <StyledTableCell></StyledTableCell>

//                         <StyledTableCell align="left">
//                           <b> Closing Balance</b>
//                         </StyledTableCell>
//                         <StyledTableCell></StyledTableCell>
//                         <StyledTableCell></StyledTableCell>

//                         <StyledTableCell></StyledTableCell>
//                         {/* {console.log("cllh", closingBalance)} */}
//                         {/* <StyledTableCell align="right"> <b> { closingBalance !== 0 && (closing_balance_dr_cr === "Cr" ? currencyFormate(closingBalance) : "") } </b> </StyledTableCell>
//                     <StyledTableCell align="right"> <b> { closingBalance !== 0 && (closing_balance_dr_cr === "Dr" ? currencyFormate(closingBalance) : "") } </b> </StyledTableCell> */}
//                         <StyledTableCell align="right">
//                           <b>
//                             {" "}
//                             {totalCr > totalDr
//                               ? currencyFormate(totalCr - totalDr)
//                               : ""}
//                           </b>
//                         </StyledTableCell>
//                         <StyledTableCell align="right">
//                           <b>
//                             {" "}
//                             {totalDr > totalCr
//                               ? currencyFormate(totalDr - totalCr)
//                               : ""}
//                           </b>
//                         </StyledTableCell>
//                       </StyledTableRow>
//                       <StyledTableRow>
//                         <StyledTableCell></StyledTableCell>
//                         <StyledTableCell></StyledTableCell>
//                         <StyledTableCell></StyledTableCell>

//                         <StyledTableCell></StyledTableCell>
//                         <StyledTableCell align="left">
//                           <b>Total</b>
//                         </StyledTableCell>
//                         <StyledTableCell></StyledTableCell>
//                         <StyledTableCell></StyledTableCell>
//                         <StyledTableCell></StyledTableCell>

//                         <StyledTableCell align="right">
//                           <b>
//                             {totalCr > totalDr
//                               ? currencyFormate(totalCr)
//                               : currencyFormate(totalDr)}
//                           </b>
//                         </StyledTableCell>
//                         <StyledTableCell align="right">
//                           <b>
//                             {totalCr > totalDr
//                               ? currencyFormate(totalCr)
//                               : currencyFormate(totalDr)}
//                           </b>
//                         </StyledTableCell>

//                         {/* <StyledTableCell align="right"><b> { currencyFormate(( openingBalance.dr_cr_status === "Dr" ? openingBalance.opening : 0 ) + totalDr + ( closing_balance_dr_cr === "Cr" ? closingBalance : 0 )) } </b></StyledTableCell>
//                     <StyledTableCell align="right"><b> { currencyFormate(( openingBalance.dr_cr_status === "Cr" ? openingBalance.opening : 0 ) + totalCr + ( closing_balance_dr_cr === "Dr" ? closingBalance : 0 )) } </b></StyledTableCell> */}
//                       </StyledTableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </CardBody>
//             </Card>
//           </GridItem>
//         </GridContainer>
//       )}

//       {/* <MasterModelForStock
//         classicModal={classicModal}
//         onCloseModel={onCloseModel}
//         height="auto"
//         modelName="Ledger View">
//         <OutstandingLedgerSalesView openingBalance={openingBalance} ledgerList={ledgerList} outstanding={outstanding} />
//       </MasterModelForStock> */}
//       <MasterModelForLedgerInvoiceView
//         classicModal={classicModal}
//         onCloseModel={onCloseModel}
//         width={450}
//         // okBtnText="Print"
//         // onClickOk={(e) => {
//         //   e.preventDefault();

//         //   window.print();
//         // }}
//         height="auto"
//         modelName="Sales View"
//         // onClickOk={onSubmitModel}
//       >
//         {transaction_type === "Sales Order" ? (
//           <SalesOrderViewPageForLedger sales_order_no={billNo} />
//         ) : (
//           ""
//         )}
//       </MasterModelForLedgerInvoiceView>

//       <MasterModel
//         // classicModal={classicModal}
//         // onCloseModel={(e) => {
//         //   e.preventDefault();
//         //   setClassicModal(false);
//         // }}
//         height="auto"
//         okBtnText="Pdf"
//         modelName="Ledger By Sales Order "
//         onClickOk={(e) => {
//           e.preventDefault();
//           window.print();
//         }}
//       >
//         <div
//           id="pdf-view"
//           style={{
//             marginTop: 15,
//             display: "flex",
//             flexFlow: "row wrap",
//             // justifyContent: "center",
//             breakBefore: "avoid-page",
//             width: "75%",
//             marginLeft: 90,
//           }}
//         >
//           <div
//             style={{
//               textAlign: "center",
//               borderBottom: "1px solid",
//               width: "100%",
//             }}
//           >
//             <h4>Ledger List</h4>
//           </div>

//           <GridContainer
//             style={{
//               margin: 2,
//               textAlign: "center",
//               borderBottom: "1px solid",
//               width: "100%",
//             }}
//           >
//             <GridItem>
//               {addSearch?.ddl_customer
//                 ? `Ledger Account: ${addSearch?.ddl_customer?.label}`
//                 : ""}
//             </GridItem>

//             <GridItem>
//               {addSearch?.txt_from_date
//                 ? `From Date: ${currentDate1Pdf(addSearch?.txt_from_date)}`
//                 : ""}
//             </GridItem>

//             <GridItem>
//               {addSearch?.txt_to_date
//                 ? `To Date: ${currentDatePdf(addSearch?.txt_to_date)}`
//                 : ""}
//             </GridItem>
//           </GridContainer>

//           <TableContainer>
//             <Table className={classes.table} aria-label="customized table">
//               <TableHead>
//                 <TableRow>
//                   <StyledTableCell align="left" style={{ fontSize: 12 }}>
//                     #
//                   </StyledTableCell>
//                   <StyledTableCell align="left" style={{ fontSize: 12 }}>
//                     Date
//                   </StyledTableCell>
//                   <StyledTableCell align="left" style={{ fontSize: 12 }}>
//                     Voucher No
//                   </StyledTableCell>
//                   <StyledTableCell align="left" style={{ fontSize: 12 }}>
//                     Voucher Type
//                   </StyledTableCell>
//                   <StyledTableCell align="left" style={{ fontSize: 12 }}>
//                     Particular
//                   </StyledTableCell>
//                   <StyledTableCell align="right" style={{ fontSize: 12 }}>
//                     Status
//                   </StyledTableCell>

//                   <StyledTableCell align="right" style={{ fontSize: 12 }}>
//                     Debit
//                   </StyledTableCell>
//                   <StyledTableCell align="right" style={{ fontSize: 12 }}>
//                     Credit
//                   </StyledTableCell>
//                   {/* <StyledTableCell align="right">Action</StyledTableCell> */}
//                 </TableRow>
//               </TableHead>
//               {/* table Body start */}
//               <TableBody>
//                 <StyledTableRow
//                   className={classes.openingBalances}
//                   style={{ fontSize: 10 }}
//                 >
//                   <StyledTableCell></StyledTableCell>
//                   <StyledTableCell className={classes.credit}></StyledTableCell>
//                   <StyledTableCell
//                     className={classes.credit}
//                     style={{ fontSize: 10 }}
//                   >
//                     <b>Opening Balance</b>
//                   </StyledTableCell>
//                   <StyledTableCell className={classes.credit}></StyledTableCell>
//                   <StyledTableCell className={classes.credit}></StyledTableCell>
//                   <StyledTableCell></StyledTableCell>
//                   <StyledTableCell align="right" style={{ fontSize: 10 }}>
//                     <b>
//                       {openingBalance.dr_cr_status === "Dr"
//                         ? openingBalance.opening.toFixed(2)
//                         : ""}
//                     </b>
//                   </StyledTableCell>
//                   <StyledTableCell align="right" style={{ fontSize: 10 }}>
//                     {/* <b>{openingBalance ===0?'':openingBalance}</b> */}
//                     <b>
//                       {openingBalance.dr_cr_status === "Cr"
//                         ? openingBalance.opening.toFixed(2)
//                         : ""}
//                     </b>
//                   </StyledTableCell>
//                 </StyledTableRow>

//                 {ledgerList.map((row, i) => (
//                   <StyledTableRow key={i}>
//                     <StyledTableCell
//                       align="left"
//                       className={classes.id}
//                       style={{ fontSize: 10 }}
//                     >
//                       {row.length != 0 ? i + 1 : ""}
//                     </StyledTableCell>

//                     <StyledTableCell
//                       align="left"
//                       className={classes.date}
//                       style={{ fontSize: 10 }}
//                     >
//                       {row.ledDate}
//                     </StyledTableCell>

//                     <StyledTableCell
//                       align="left"
//                       className={classes.ledger}
//                       style={{ fontSize: 10 }}
//                     >
//                       {row.ledVoucherNo}
//                     </StyledTableCell>

//                     <StyledTableCell
//                       align="left"
//                       className={classes.ledger}
//                       style={{ fontSize: 10 }}
//                     >
//                       {getVType(row.ledVoucherType) === "BR" ||
//                       getVType(row.ledVoucherType) === "BP"
//                         ? "Bad Debt"
//                         : getVType(row.ledVoucherType)}
//                     </StyledTableCell>

//                     <StyledTableCell
//                       align="left"
//                       className={classes.ledger}
//                       style={{ fontSize: 10 }}
//                     >
//                       {
//                         /*`${
//                           row.ledJournal[0].ddl_ledger ===
//                           addSearch.ddl_ledger_account.label
//                             ? row.ledJournal[1].ddl_ledger
//                             : row.ledJournal[0].ddl_ledger
//                         }` */
//                         // row.mode ? row.mode : row.particular
//                         row.particular
//                           ? row.particular
//                           : row.ledger_account_for_party
//                       }
//                     </StyledTableCell>
//                     <StyledTableCell align="right" style={{ fontSize: 10 }}>
//                       {
//                         allStatus.find(
//                           (s, i) => s.value === Number(row.sales_status)
//                         )?.label
//                       }
//                     </StyledTableCell>

//                     <StyledTableCell
//                       align="right"
//                       className={classes.ledger}
//                       style={{ fontSize: 10 }}
//                     >
//                       {/* {console.log(row, "sen3105")} */}

//                       {!getAmount(row, [1, "P", "BR"])
//                         ? row.sales_status === "37"
//                           ? getAmount(row, [1, "P", "BR"]).toFixed(2)
//                           : (

//                             getAmount(row, [1, "P", "BR"]) +
//                               (row.sales_order_other_charges &&
//                                 row.sales_order_other_charges.reduce(
//                                   (s, l) =>
//                                     l.charge_type === "+"
//                                       ? s + Number(l.charge_amount)
//                                       : s - Number(l.charge_amount),
//                                   0
//                                 )) === '0' ? '' 
//                                 : currencyFormate(row.sales_order_other_charges &&
//                                   row.sales_order_other_charges.reduce(
//                                     (s, l) =>
//                                       l.charge_type === "+"
//                                         ? s + Number(l.charge_amount)
//                                         : s - Number(l.charge_amount),
//                                     0
//                                   ))

//                           )
//                         : (!row.sales_order_other_charges
//                             ? getAmount(row, [1, "P", "BR"])
//                             : getAmount(row, [1, "P", "BR"]) +
//                               (row.sales_order_other_charges &&
//                                 row.sales_order_other_charges.reduce(
//                                   (s, l) =>
//                                     l.charge_type === "+"
//                                       ? s + Number(l.charge_amount)
//                                       : s - Number(l.charge_amount),
//                                   0
//                                 ))
//                           ).toFixed(2)}
//                     </StyledTableCell>

//                     <StyledTableCell
//                       align="right"
//                       className={classes.ledger}
//                       style={{ fontSize: 10 }}
//                     >
//                       {
//                         /* {`${
//                           row.ledJournal?.ddl_ledger ===
//                           addSearch.ddl_ledger_account.label
//                             ? row.ledJournal.dr_cr === 2
//                               ? row.ledJournal.amount
//                               : ""
//                             : ""
//                         }`} */
//                         getAmount(row, [2, "R", "BP"])
//                           ? getAmount(row, [2, "R", "BP"])
//                           : getAmount(row, [2, "R", "BP"])
//                       }
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 ))}
//                 <StyledTableRow>
//                   <StyledTableCell></StyledTableCell>
//                   <StyledTableCell></StyledTableCell>
//                   <StyledTableCell align="left" style={{ fontSize: 10 }}>
//                     <b> Closing Balance</b>
//                   </StyledTableCell>
//                   <StyledTableCell></StyledTableCell>
//                   <StyledTableCell></StyledTableCell>

//                   <StyledTableCell></StyledTableCell>
//                   {/* {console.log("cllh", closingBalance)} */}
//                   {/* <StyledTableCell align="right"> <b> { closingBalance !== 0 && (closing_balance_dr_cr === "Cr" ? currencyFormate(closingBalance) : "") } </b> </StyledTableCell>
//                     <StyledTableCell align="right"> <b> { closingBalance !== 0 && (closing_balance_dr_cr === "Dr" ? currencyFormate(closingBalance) : "") } </b> </StyledTableCell> */}
//                   <StyledTableCell align="right" style={{ fontSize: 10 }}>
//                     <b>
//                       {" "}
//                       {totalCr > totalDr ? (totalCr - totalDr).toFixed(2) : ""}
//                     </b>
//                   </StyledTableCell>
//                   <StyledTableCell align="right" style={{ fontSize: 10 }}>
//                     <b>
//                       {" "}
//                       {totalDr > totalCr ? (totalDr - totalCr).toFixed(2) : ""}
//                     </b>
//                   </StyledTableCell>
//                 </StyledTableRow>
//                 <StyledTableRow>
//                   <StyledTableCell></StyledTableCell>
//                   <StyledTableCell></StyledTableCell>
//                   <StyledTableCell align="left">
//                     <b>Total</b>
//                   </StyledTableCell>
//                   <StyledTableCell></StyledTableCell>
//                   <StyledTableCell></StyledTableCell>
//                   <StyledTableCell></StyledTableCell>

//                   <StyledTableCell align="right">
//                     <b>
//                       {totalCr > totalDr
//                         ? totalCr.toFixed(2)
//                         : totalDr.toFixed(2)}
//                     </b>
//                   </StyledTableCell>
//                   <StyledTableCell align="right">
//                     <b>
//                       {totalCr > totalDr
//                         ? totalCr.toFixed(2)
//                         : totalDr.toFixed(2)}
//                     </b>
//                   </StyledTableCell>

//                   {/* <StyledTableCell align="right"><b> { currencyFormate(( openingBalance.dr_cr_status === "Dr" ? openingBalance.opening : 0 ) + totalDr + ( closing_balance_dr_cr === "Cr" ? closingBalance : 0 )) } </b></StyledTableCell>
//                     <StyledTableCell align="right"><b> { currencyFormate(( openingBalance.dr_cr_status === "Cr" ? openingBalance.opening : 0 ) + totalCr + ( closing_balance_dr_cr === "Dr" ? closingBalance : 0 )) } </b></StyledTableCell> */}
//                 </StyledTableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       </MasterModel>
//     </ThemeProvider>
//   );
// };

// export default OutstandingBySalesOrder;


// 04-10-2023  Darsita ( CHANGE CODE)


import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../Components/CustomButton";
import {
  directPurchaseFormRowData,
  addedItemServiceRowData,
  dummyRowData,
} from "../../../services/directPurchaseFormService";
import { getListCustomers } from "../../../services/customerListService";

import { getAllSalesOrderByInvoice } from "../../../services/salesOrderByInvoiceService";
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

import CircularProgress from "@material-ui/core/CircularProgress";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import ViewListIcon from "@mui/icons-material/ViewList";

import theme from "../../../theme/theme";
import ReactSelect from "react-select";
import React from "react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import {
  activeText,
  appScrollBar,
} from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";
// import { ColoseButton } from "../Components/CustomButton";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@material-ui/core";
import ItemViewCard from "../HelperComponent/ItemViewCard";
import PageTitle, { PageHeader } from "../HelperComponent/PageTitle";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepProceedModel from "../HelperComponent/StepProceedModel";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

import { Typography } from "@material-ui/core";
import { whiteColor } from "assets/jss/material-dashboard-pro-react";
import {
  currentDate,
  currentDate1,
  currentDate1Pdf,
  currentDatePdf,
} from "../HelperComponent/utils";
import { getListUsers } from "../../../services/associateService";
import {
  getAllGroup,
  getAllReference,
  getAllOutstandingData,
  getSearchLedgerVouchers,
  getLedgerClosingBalance,
  getLedgerByCustomerName,
} from "../../../services/ledgerBySalesOrderService";

import OutstandingLedgerSalesView from "views/Pages/MisReportPage/OutstandingLedgerSalesView";
import MasterModelForStock from "../../Components/MasterModelForOutstanding";
import { currencyFormate } from "views/Pages/HelperComponent/utils";
import MasterModelForLedgerInvoiceView from "../../Components/MasterModelForLedgerInvoiceView";
import SalesOrderViewPageForLedger from "./SalesOrderViewPageForLedger";
import { getListStatus } from "../../../services/addStatusService";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from "file-saver";
import XLSX from "xlsx";
const useStyles1 = makeStyles(styles);
//PDF
import pdfIcon from "../../../assets/img/pdf-icon.png";
import { jsPDF } from "jspdf";

import MasterModelForPrint from "../../Components/MasterModelForPrint";
import SalesOrderInvoicePage from "../Sales/SalesOrderInvoicePage";
import { getSalesOrderBySalesId } from "../../../services/salesOrderListService";
import { getAllSalesOrder } from "../../../services/salesOrderListService";
const ExcelJS = require('exceljs');


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: appSecondColor,
    padding: "5px 5px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "10px 5px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  date: {
    width: 110,
  },
  itemImgPaper: {
    marginRight: "15px",
    width: "80px",
    height: "80px",
    overflow: "hidden",
  },
  addBtn: {
    width: 30,
    height: 38,
  },

  searchBar: {
    marginTop: 10,
    marginBottom: 15,
    padding: "15px 20px",
  },
  activeText: {
    ...activeText,
  },
  input: {
    height: 40,
    lineLight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
  actionbtns: {
    marginTop: 20,
    float: "right",
  },

  id: {
    width: "5%",
  },
  doubleFiled: {
    width: "20%",
  },

  action: {
    width: "5%",
  },
  rate: {
    width: "8%",
  },
  value: {
    width: "15%",
  },
  itemImg: {
    width: "8%",
  },
  itemDetails: {
    width: "35%",
  },
  itemDetailsView: {
    width: "50%",
  },
  quantity: {
    width: "20%",
  },
  viewQuantity: {
    width: "20%",
  },
  net_value_field: {
    width: "10%",
  },
  Disc: {
    width: "5%",
  },
  deleteAction: {
    width: "25%",
  },
  Salesman: {
    width: "15%",
  },
  customSelect: {
    marginBottom: 15,
  },
  container: {
    ...appScrollBar,
    maxHeight: 360,
  },
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "22px",
    },
  },
}));

const OutstandingBySalesOrder = () => {
  const classes1 = useStyles1();

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  // const [outstanding, setOutstanding] = React.useState([]);
  const [outstanding, setOutstanding] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [billDetail, setBillDetail] = React.useState({});
  const [allCustomer, setAllCustomer] = React.useState([]);
  const [allGroup, setAllGroup] = React.useState([]);
  const [allReference, setAllReference] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
    ddl_customer: "",
    ddl_group: "",
    ddl_reference: "",
    txt_from_date: currentDate1(),
    txt_to_date: currentDate(),
  });
  const [viewRes, setViewRes] = React.useState("hidden");
  const [ledgerGroup, setAllLedgerGroup] = React.useState([]);
  const [ledgerList, setAllledgerList] = React.useState([]);
  const [openingBalance, setOpeningBalance] = React.useState({});
  const [billNo, setBillNo] = React.useState("");
  const [transaction_type, set_transaction_type] = React.useState();
  const [collapsible, setCollapsible] = React.useState(true);
  const [allStatus, setAllStatus] = React.useState([]);

  const [addItem, setAddItem] = React.useState({
    // txtQuantity: "",
    // txtRate: "",
    // txtValue: "",
    // item: "",
    // brand: "",
    category: "",
    sales_id: "",
    item_id: "",
    category_id: "",

    // itemImg: "",
  });
  const [salesOrderDetails, setSalesOrderDetails] = React.useState({});
  const [showroom, setShowroom] = React.useState({});

  const headerData = [
    {
      id: "id",
      label: "#",
    },
    {
      id: "company_name",
      label: "Client Name",
      align: "left",
    },
    {
      id: "net_value",
      label: "Sales Order Net Value",
      align: "right",
    },
    {
      id: "closing_balance",
      label: "Total Out Standing",
      align: "right",
    },
    {
      id: "action",
      label: "Action",
      align: "right",
    },
  ];

  const onChangeBillDate = (e) => {
    const { name, value } = e.target;
    setBillDetail({ ...billDetail, [name]: value });
  };

  const fetchData = () => {
    getAllGroup(
      (r) => {
        setAllGroup(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    getAllReference(
      (r) => {
        setAllReference(r);
        // setAllReference([
        //   { value: "addNewReference", label: "Add New Reference" },
        //   ...r,
        // ]);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
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
  };

  React.useEffect(() => {
    fetchData();
    setAllUnits(directPurchaseFormRowData);
  }, []);

  const onAddSearch = (e) => {
    const { name, value } = e.target;

    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };
  ///1
  const onSelect = (info, v) => {
    getLedgerByCustomerName(
      v.value,
      (r) => {
        setAddSearch({
          ...addSearch,
          [info.name]: v,
          ledger_account_id: r[0].ledger_id,
        });
        // setLedgerDetails(r[0]);

        // ledger_account_id.push(r);
        //ledger_account_id = r[0]?.ledger_id;
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    setAddSearch({ ...addSearch, [info.name]: v });
  };
  ///2
  const onSearchReport = (e) => {
    setRefresh(false);
    e.preventDefault();
    setLoading(true);
    if (!addSearch.ddl_customer) {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Please! Select Customer", msgType: "error" },
      });
    } else {
      ///////////////ledger//////////////
      getSearchLedgerVouchers(
        (enquery) => {
          // console.log(enquery, "sankh1807");
          if (enquery.length) {
            setAllledgerList(enquery);
            // setViewRes("visible");
            setLoading(false);
          } else {
            // setViewRes("visible");
            setAllledgerList([]);
            setLoading(false);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, "Journal not found": "info" },
            });
          }
        },
        (err) => {
          setAllledgerList([]);
          // setViewRes("visible");
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
          setLoading(false);
        },
        addSearch.ledger_account_id,
        addSearch.ddl_customer.value,
        addSearch.txt_from_date,
        addSearch.txt_to_date
      );
      ////////////////closing////////////////////
      getLedgerClosingBalance(
        (clsBalance) => {
          // console.log(clsBalance, "test");
          if (clsBalance.length > 0) {
            setOpeningBalance({
              opening: clsBalance[0].closing_balance,
              dr_cr_status: clsBalance[0].dr_cr_status,
            });
          } else {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, "Journal not found": "info" },
            });
          }
        },
        (err) => {
          // setAllledgerList([]);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
          setLoading(false);
        },
        // addSearch
        {
          ...addSearch,
          txt_from_date: "2021-04-01",
          txt_to_date: addSearch.txt_from_date,
        }
      );
      getAllOutstandingData(
        (r) => {
          // console.log(r, "sen2505/r");
          if (r.length) {
            setOutstanding(r);
            setViewRes("visible");
            // setClassicModal(true);
          } else {
            setViewRes("hidden");
            setLoading(false);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "info" },
            });
          }
        },
        (err) => {
          setOutstanding([]);
          // setViewRes("hidden");
          setViewRes("visible");
          // setAllledgerList([])
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        },
        addSearch
      );
    }
  };
  //Old
  // const onSelect = (info, v) => {
  //   setAddSearch({ ...addSearch, [info.name]: v });
  // };

  // const onSearchReport = (e) => {
  //   console.log(!addSearch.ddl_customer, "sen2505/search")
  //   setRefresh(false);
  //   e.preventDefault();
  //   setLoading(true);
  //   if (!addSearch.ddl_customer) {
  //     dispatch({
  //       type: actionTypes.SET_OPEN_MSG,
  //       payload: { msg: "Please! Select Customer", msgType: "error" },
  //     });
  //   } else {
  //     getAllOutstandingData(
  //       (r) => {
  //         console.log(r, "sen2505/r")
  //         if (r.length) {
  //           setOutstanding(r)
  //           setViewRes("visible");
  //           // setClassicModal(true);
  //           ///////////////ledger//////////////
  //           getSearchLedgerVouchers(
  //             (enquery) => {
  //               if (enquery.length) {
  //                 setAllledgerList(enquery);
  //                 // setViewRes("visible");
  //                 setLoading(false);
  //               } else {
  //                 // setViewRes("visible");
  //                 setLoading(false);
  //                 dispatch({
  //                   type: actionTypes.SET_OPEN_MSG,
  //                   payload: { msg: err, "Journal not found": "info" },
  //                 });
  //               }
  //             },
  //             (err) => {
  //               setAllledgerList([]);
  //               // setViewRes("visible");
  //               dispatch({
  //                 type: actionTypes.SET_OPEN_MSG,
  //                 payload: { msg: err, msgType: "error" },
  //               });
  //               setLoading(false);
  //             },
  //             r[0].ledger_account_id,
  //             r[0].customer_id,
  //             addSearch.txt_from_date,
  //             addSearch.txt_to_date
  //           );
  //           ////////////////closing////////////////////
  //           getLedgerClosingBalance(
  //             (clsBalance) => {
  //               console.log(clsBalance[0].closing_balance, "test");
  //               if (clsBalance.length > 0) {
  //                 setOpeningBalance({
  //                   opening: clsBalance[0].closing_balance,
  //                   dr_cr_status: clsBalance[0].dr_cr_status,
  //                 });

  //               } else {
  //                 dispatch({
  //                   type: actionTypes.SET_OPEN_MSG,
  //                   payload: { msg: err, "Journal not found": "info" },
  //                 });
  //               }
  //             },
  //             (err) => {
  //               setAllledgerList([]);
  //               dispatch({
  //                 type: actionTypes.SET_OPEN_MSG,
  //                 payload: { msg: err, msgType: "error" },
  //               });
  //               setLoading(false);
  //             },

  //             {
  //               ...addSearch, txt_from_date: "2021-04-01", ledger_account_id: r[0].ledger_account_id,
  //               txt_to_date: addSearch.txt_from_date,
  //             }
  //           );

  //         } else {
  //           setViewRes("visible");
  //           setLoading(false);
  //           dispatch({
  //             type: actionTypes.SET_OPEN_MSG,
  //             payload: { msg: err, "Sales Report not found": "info" },
  //           });
  //         }
  //       },
  //       (err) => {
  //         setOutstanding([])
  //         setViewRes("hidden");

  //         dispatch({
  //           type: actionTypes.SET_OPEN_MSG,
  //           payload: { msg: err, msgType: "error" },
  //         });
  //       },
  //       addSearch
  //     );
  //   }
  // };

  const onClickRefresh = () => {
    setRefresh(!refresh);
    setAddSearch({
      txtValue: "",
      ddl_customer: "",
      ddl_reference: "",
      ddl_group: "",

      txt_item: "",
      ddl_brand: "",
      ddl_category: "",
      txt_sales_no: "",
      txt_from_date: currentDate1(),
      txt_to_date: currentDate(),
    });
  };

  const onAddItem = (v) => {
    // setAddItem({
    //   ...addItem,
    //   itemImg: v.itemImg,
    //   brand: v.brand,
    //   item: v.item,
    // });
    // setAddedItems([...addedItems, addItem]);
    // console.log(addItem);
    // setAddItem({
    //   txtQuantity: "",
    //   txtRate: "",
    //   txtValue: "",
    //   item: "",
    //   brand: "",
    //   category: "",
    //   itemImg: "",
    // });
  };

  const onClickView = (r) => {
    // console.log("sen1805", r);
    setClassicModal(true);

    //fetching data

    getSearchLedgerVouchers(
      (enquery) => {
        if (enquery.length) {
          setAllledgerList(enquery);
          // setViewRes("visible");
          // setLoading(false);
        } else {
          // setViewRes("visible");
          // setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Journal not found": "info" },
          });
        }
      },
      (err) => {
        setAllledgerList([]);
        // setViewRes("visible");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      r.ledger_account_id,
      r.customer_id,
      addSearch.txt_from_date,
      addSearch.txt_to_date
    );

    getLedgerClosingBalance(
      (clsBalance) => {
        // console.log(clsBalance[0].closing_balance, "test");
        if (clsBalance.length > 0) {
          setOpeningBalance({
            opening: clsBalance[0].closing_balance,
            dr_cr_status: clsBalance[0].dr_cr_status,
          });
        } else {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Journal not found": "info" },
          });
        }
      },
      (err) => {
        setAllledgerList([]);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },

      {
        ...addSearch,
        txt_from_date: "2021-04-01",
        ledger_account_id: r.ledger_account_id,
        txt_to_date: addSearch.txt_from_date,
      }
    );
  };
  const onCloseModel = () => {
    setClassicModal(false);
  };

  const onClickPrint = (row) => {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: {},
    });
    // console.log("prDet", row);

    getAllSalesOrder(
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

  // export to excel
  function onhandleExportToExcel() {
    const table = document.getElementById('excel_ledger_sales_order');
    
    // Clone the table to avoid modifying the original table
    const clonedTable = table.cloneNode(true);
    
    // Remove ₹ sign from cell values
    const cells = clonedTable.querySelectorAll('td');
    cells.forEach(cell => {
      cell.textContent = cell.textContent.replace('₹', '');
    });
    
    const ws = XLSX.utils.table_to_sheet(clonedTable);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Ledger By SalesOrder');
    XLSX.writeFile(wb, 'Ledger By SalesOrder.xlsx');
  }

  const onhandleExportToExcel1 = async () => {
    const table = document.getElementById('excel_ledger_sales_order');
  
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Ledger By SalesOrder');

    const headerRow = worksheet.addRow(Array.from(table.querySelectorAll('thead th')).map(th => th.textContent));

    headerRow.font = { bold: true };
    headerRow.eachCell(cell => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'cce6ff' } };
    });
 
    table.querySelectorAll('tbody tr').forEach(row => {
      const rowData = Array.from(row.querySelectorAll('td')).map(td => {
        if(td.textContent.includes('₹')){
          return parseFloat(td.textContent.replace(/₹/g, '').replace(/,/g,'')); 
        } else {
          return td.textContent;
        }
    })
      worksheet.addRow(rowData);
    });
  
   
    try {
      const buffer = await workbook.xlsx.writeBuffer();
      const data = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      });
      saveAs(data, 'Ledger By SalesOrder.xlsx');
      console.log('Excel file written successfully');
    } catch (error) {
      console.error('Error writing Excel file:', error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setAddItem((prv) => ({ ...prv, [name]: value }));
  };
  const classes = useStyles();
  // console.log(currentDate(1), "data increse");
  let closingBalance = 0;
  let closing_balance_dr_cr = "";
  let total = 0;
  let totalDr = 0;
  let totalCr = 0;

  const balanceSheet = () => {
    ledgerList.map((row, i) => {
      // console.log("sen0208", row?.sales_status === "46");

      total =
        row.sales_order_other_charges &&
        row.sales_order_other_charges.reduce(
          (s, l) =>
            l.charge_type === "+"
              ? s + Number(l.charge_amount)
              : s - Number(l.charge_amount),
          0
        );
      // totalDr = !total ? parseFloat(row.amount) + parseFloat(totalDr) : parseFloat(row.amount) + parseFloat(totalDr) + total;
      if (row.dr_cr === 1) {
        // totalDr = !total
        //   ? (row?.sales_status === "46" ? 0 : parseFloat(row.amount)) +
        //     parseFloat(totalDr)
        //   : parseFloat(row.amount) + parseFloat(totalDr) + total;


        totalDr = !total
          ?
          (parseFloat(row.amount) ? parseFloat(row.amount) : 0) + parseFloat(totalDr)
          : parseFloat(row.amount) + parseFloat(totalDr) + total;


      } else {
        totalCr = !total
          ? parseFloat(row.amount) + parseFloat(totalCr)
          : parseFloat(row.amount) + parseFloat(totalCr) + total;
      }
    });

    if (openingBalance.dr_cr_status === "Dr") {
      totalDr = openingBalance.opening + Number(totalDr);
      console.log(totalDr, "xxx");
    } else {
      totalCr = openingBalance.opening + totalCr;
    }
    console.log(totalDr, "dr total");
    console.log(totalCr, "cr total");
  };

  // const fetchData = () => {
  //   // getAllJournal(
  //   //   (r) => {
  //   //     setAllledgerList(r);
  //   //   },
  //   //   (err) => {
  //   //     dispatch({
  //   //       type: actionTypes.SET_OPEN_MSG,
  //   //       payload: { msg: err, msgType: "error" },
  //   //     });
  //   //   }
  //   // )
  //   // getAllLedgerGroup(
  //   //   (r) => {
  //   //     setAllLedgerGroup(r);
  //   //   },
  //   //   (err) => {
  //   //     dispatch({
  //   //       type: actionTypes.SET_OPEN_MSG,
  //   //       payload: { msg: err, msgType: "error" },
  //   //     });
  //   //   }
  //   // );

  //   // getListLedgerAccount(
  //   //   (r) => {
  //   //     console.log("sen123", r);
  //   //     setAllLedgerAccount(r);
  //   //   },
  //   //   (err) => {
  //   //     dispatch({
  //   //       type: actionTypes.SET_OPEN_MSG,
  //   //       payload: { msg: err, msgType: "error" },
  //   //     });
  //   //   }
  //   // );

  //   // getListGroup(
  //   //   (r) => {
  //   //     setAllGroup(r);
  //   //   },
  //   //   (err) => {
  //   //     dispatch({
  //   //       type: actionTypes.SET_OPEN_MSG,
  //   //       payload: { msg: err, msgType: "error" },
  //   //     });
  //   //   }
  //   // );
  // };
  // const tableData = [];
  // const headerData = [
  //   {
  //     id: "ledDate",
  //     label: "Date",
  //     align: "left",
  //   },
  //   {
  //     id: "ledVoucherNo",
  //     label: "Voucher No",
  //     align: "left",
  //   },
  //   {
  //     id: "ledVoucherType",
  //     label: "Voucher Type",
  //     align: "left",
  //   },
  //   {
  //     id: "ledParticular",
  //     label: "Particular",
  //     align: "left",
  //   },
  //   {
  //     id: "ledDebit",
  //     label: "Debit",
  //     align: "right",
  //   },
  //   {
  //     id: "ledCredit",
  //     label: "Credit",
  //     align: "right",
  //   },
  // ];

  balanceSheet();

  // const classes = useStyles();

  const getVType = (voucherType) => {
    if (voucherType === "R") {
      return "Receipt";
    } else if (voucherType === "P") {
      return "Payment";
    } else return voucherType;
  };

  const getAmount = (row, r_dr_cr) => {
    // console.log(row.sales_order_other_charges,"sen2705/row")
    // console.log(row.amount,"sen2705/row1")

    // console.log(row, "sen2405/row");

    if (
      (row.particular &&
        r_dr_cr.includes(row.dr_cr) &&
        row.bank_id === outstanding.ledger_account_id &&
        !r_dr_cr.includes(row.ledVoucherType)) ||
      (row.bank_id !== outstanding.ledger_account_id &&
        r_dr_cr.includes(row.ledVoucherType))
    ) {
      if (row.sales_status === "37") {
        return row.invoice_item_details?.length > 0 ? Number(row.amount) : 0;
      } else if (row.sales_status === "46") {
        return "0";
      } else {
        return row.amount;
      }
      // (

      // <>
      // {
      //   r_dr_cr[1] ==='P'?
      //   row.amount +
      //   row.sales_order_other_charges.reduce((s,l)=>
      //   l.charge_type === "+"?
      //   + Number(l.charge_amount) : - Number(l.charge_amount)
      //   )

      // :
      // //else 1
      // row.amount

      // }
      // </>

      // );
    }
    return "";
  };

  const onClickCell = (e, row) => {
    // console.log(row, "sen30052022");
    set_transaction_type(row.ledVoucherType);
    setBillNo(e.target.innerHTML);

    if (row.ledVoucherType === "Sales Order") {
      // history.push({
      //   pathname: "/admin/mis-reports/Sales-order-view",
      // state: { row: row },

      // })
      setClassicModal(true);
    }
  };

  const onClickCollaps = () => {
    collapsible ? setCollapsible(false) : setCollapsible(true);
  };

  //pdf
  const onClickPdf = (e) => {
    e.preventDefault();

    let doc = new jsPDF("landscape", "pt", "A4");
    doc.html(document.getElementById("pdf-view"), {
      callback: () => {
        doc.save(`ledgerBySalesOrder ${currentDate()}.pdf`);
      },
    });

    // setClassicModal(true);
  };


  // EXCEL DOWNLOD PART

  // const onhandleExportToExcel = () => {
  //   const ledgerMisReportTable = ledgerList.map((ledger, index) => {
  //     return {

  //       Sl_No: ledger._id,
  //       Date: ledger.ledDate,
  //       Voucher_No: ledger.ledVoucherNo,
  //       Voucher_Type: ledger.ledVoucherType,
  //       Particular: ledger.particular
  //         ? ledger.particular
  //         : ledger.ledger_account_for_party,
  //       Transaction_No:
  //         ledger.ledVoucherType === "Journal"
  //           ? ledger.ledTransectionId
  //           : ledger.mode,
  //       Narraction: ledger.narraction,
  //       Debit: getAmountexcel(ledger, [1, "P", "BR"]),
  //       Credit: getAmountexcel(ledger, [2, "R", "BP"]),

  //       // status: totalCr > totalDr ? "Dr" : "Cr",
  //     };
  //   });

  //   const newData = [{ openingBalance: openingBalance.opening }];
  //   const closeData = [{
  //     closingBalance: totalCr > totalDr
  //       ? currencyFormate(totalCr - totalDr)
  //       : currencyFormate(totalDr - totalCr)
  //   }]
  //   // const status = [{status: totalCr > totalDr ? "Dr" : "Cr"}]

  //   ledgerMisReportTable.unshift(...newData);
  //   ledgerMisReportTable.push(...closeData);
  //   // ledgerMisReportTable.splice(0, 0, ...status);


  //   const fileName = " Ledger Mis Report";
  //   const fileType =
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //   const fileExtension = ".xlsx";
  //   const ws = XLSX.utils.json_to_sheet(ledgerMisReportTable);

  //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //   XLSX.utils.sheet_add_json(wb.Sheets.data, ledgerMisReportTable, {
  //     newData,
  //     // header: ["note"],
  //     // skipHeader: true,
  //     origin: "A1",
  //   });
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // };

  return (
    <ThemeProvider theme={theme}>
      <PageHeader title="MIS Report > Ledger By Sales Order " />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle=" Ledger By Sales Order"
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon
            onClickFilter={() => { }}
          >
            {collapsible ? (
              <GridContainer
                style={{ padding: "10px" }}
                justifyContent="flex-start"
                alignItems="center"
              >
                {/* <GridItem xs="4">
             <InputLabel id="label">Group</InputLabel>
                <ReactSelect
                  options={allGroup}
                  name="ddl_group"
                  getOptionLabel={(option) => option.label}
                  placeholder="Select"
                  formatGroupLabel={(d) => d.label}
                  menuPortalTarget={document.body}
                  styles={reactSelectStyles}
                  className={classes.customSelect}
                  onChange={(v, info) => onSelect(info, v)}
                  value={addSearch.ddl_group}
                />
              </GridItem>
              <GridItem xs="4">
             <InputLabel id="label">Reference</InputLabel>
                <ReactSelect
                  options={allReference}
                  name="ddl_reference"
                  getOptionLabel={(option) => option.label}
                  placeholder="Select"
                  formatGroupLabel={(d) => d.label}
                  menuPortalTarget={document.body}
                  styles={reactSelectStyles}
                  className={classes.customSelect}
                  onChange={(v, info) => onSelect(info, v)}
                  value={addSearch.ddl_reference}
                />
              </GridItem> */}
                <GridItem xs="4">
                  <InputLabel id="label">Customer</InputLabel>
                  <ReactSelect
                    options={allCustomer}
                    name="ddl_customer"
                    getOptionLabel={(option) => option.label}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={(v, info) => onSelect(info, v)}
                    value={addSearch.ddl_customer}
                  />
                </GridItem>

                <GridItem xs="2">
                  <InputLabel id="label">Date Between</InputLabel>
                  <TextField
                    name="txt_from_date"
                    size="small"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    value={addSearch.txt_from_date}
                    defaultValue={currentDate1()}
                    onChange={onAddSearch}
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
                    name="txt_to_date"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    value={addSearch.txt_to_date}
                    defaultValue={currentDate()}
                    onChange={onAddSearch}
                    className={classes.dateField}
                    inputProps={{
                      shrink: true,
                      min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                      max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                    }}
                  />
                </GridItem>

                <GridItem xs="12">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <CustomButton
                      style={{ marginRight: "10px" }}
                      onClick={onSearchReport}
                    >
                      <SearchIcon />
                    </CustomButton>
                    <CustomButton name="btn_refres" onClick={onClickRefresh}>
                      <RotateLeftIcon />
                    </CustomButton>
                  </div>
                </GridItem>
              </GridContainer>
            ) : (
              ""
            )}
          </CustomCard>
        </GridItem>
      </GridContainer>

      {/* Select and Add Items */}

      {/* <GridContainer className={classes.root} style={{ "visibility": viewRes }}>
        <GridItem xs="12">
          <CustomCard cdTitle="Outstanding Search Result" height={450}>
          <MuiTable
              onClickViewOne={onClickView}
              columns={headerData}
              rows={outstanding}
            />
          </CustomCard>
        </GridItem>
      </GridContainer> */}

      {loading === true ? (
        <Box mt={10} width="100%" textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <GridContainer className={classes.root} style={{ visibility: viewRes }}>
          <GridItem xs="12">
            <Card className={classes1.headerCard}>
              <CardHeader
                className={classes1.TbheaderCdhd}
                style={{ height: 60 }}
              >
                <GridContainer
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <GridItem>
                    <h4 className={classes1.headerCdTitle}>
                      Ledger By Sales Order
                    </h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? (
                  <GridItem style={{ cursor: "pointer",display: "none" }}>
                   <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel1(ledgerList)}
                    >
                      <Tooltip title="Export to Excel">
                        <img
                          src={require("../../../assets/img/xlsx.png").default}
                          style={{height:"32px"}}
                        />
                      </Tooltip>
                    </IconButton>
                    <IconButton onClick={onClickPdf}>
                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel(ledgerList)}
                    >
                      <Tooltip title="Export to Excel">
                        <img
                          src={require("../../../assets/img/excel.png").default}
                        />
                      </Tooltip>
                    </IconButton>
                  </GridItem>
                  ):(
                    <GridItem style={{ cursor: "pointer" }}>
                   <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel1(ledgerList)}
                    >
                      <Tooltip title="Export to Excel">
                        <img
                          src={require("../../../assets/img/xlsx.png").default}
                          style={{height:"32px"}}
                        />
                      </Tooltip>
                    </IconButton>
                    <IconButton onClick={onClickPdf}>
                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel(ledgerList)}
                    >
                      <Tooltip title="Export to Excel">
                        <img
                          src={require("../../../assets/img/excel.png").default}
                        />
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
                {/* <MuiTable
              columns={headerData}
              rows={ledgerList}
              isTableBodyBorder
              isTableHeaderBorder
            /> */}
                <TableContainer>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                    id="excel_ledger_sales_order"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">#</StyledTableCell>
                        <StyledTableCell align="left">Date</StyledTableCell>
                        <StyledTableCell align="left">
                          Voucher No
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Voucher Type
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Particular
                        </StyledTableCell>
                        <StyledTableCell align="center">Transaction No</StyledTableCell>
                        <StyledTableCell align="center">Narration</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>


                        <StyledTableCell align="right">Debit</StyledTableCell>
                        <StyledTableCell align="right">Credit</StyledTableCell>
                        {/* <StyledTableCell align="right">Action</StyledTableCell> */}
                      </TableRow>
                    </TableHead>
                    {/* table Body start */}
                    <TableBody>
                      <StyledTableRow className={classes.openingBalances}>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>

                        <StyledTableCell
                          className={classes.credit}
                        ></StyledTableCell>
                        <StyledTableCell
                          className={classes.credit}
                        ></StyledTableCell>
                        <StyledTableCell className={classes.credit}>
                          <b>Opening Balance</b>
                        </StyledTableCell>
                        <StyledTableCell
                          className={classes.credit}
                        ></StyledTableCell>
                        <StyledTableCell
                          className={classes.credit}
                        ></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="right">
                          <b>
                            {openingBalance.dr_cr_status === "Dr"
                              ? currencyFormate(openingBalance.opening)
                              : ""}
                          </b>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {/* <b>{openingBalance ===0?'':openingBalance}</b> */}
                          <b>
                            {openingBalance.dr_cr_status === "Cr"
                              ? currencyFormate(openingBalance.opening)
                              : ""}
                          </b>
                        </StyledTableCell>
                      </StyledTableRow>

                      {ledgerList.map((row, i) => (
                        <StyledTableRow key={i}>
                          <StyledTableCell align="left" className={classes.id}>
                            {row.length != 0 ? i + 1 : ""}
                          </StyledTableCell>

                          <StyledTableCell
                            align="left"
                            className={classes.ledger}
                          >
                            {row.ledDate}
                          </StyledTableCell>

                          <StyledTableCell
                            align="left"
                            className={classes.ledger}
                            style={
                              row.ledVoucherType === "Sales Order"
                                ? { cursor: "pointer", background: "lightBlue" }
                                : { cursor: "no-drop" }
                            }
                            onClick={(e) => {
                              onClickCell(e, row);
                            }}
                          >
                            {row.ledVoucherNo}
                          </StyledTableCell>

                          <StyledTableCell
                            align="left"
                            className={classes.ledger}
                          >
                            {getVType(row.ledVoucherType) === "BR" ||
                              getVType(row.ledVoucherType) === "BP"
                              ? "Bad Debt"
                              : getVType(row.ledVoucherType)}
                          </StyledTableCell>

                          <StyledTableCell
                            align="left"
                            className={classes.ledger}
                          >
                            {
                              /*`${
                          row.ledJournal[0].ddl_ledger ===
                          addSearch.ddl_ledger_account.label
                            ? row.ledJournal[1].ddl_ledger
                            : row.ledJournal[0].ddl_ledger
                        }` */
                              // row.mode ? row.mode : row.particular
                              row.particular
                                ? row.particular
                                : row.ledger_account_for_party
                            }
                          </StyledTableCell>
                          <StyledTableCell align="center" className={classes.ledger}
                            style={{ fontSize: 13 }}>
                            {/* {
                              allStatus.find(
                                (s, i) => s.value === Number(row.sales_status)
                              )?.label
                            } */}
                            {row.ledVoucherType === "Journal" ? row.ledTransectionId : row.mode}
                          </StyledTableCell>
                          <StyledTableCell align="center" className={classes.ledger} style={{ fontSize: 13, webkitlineclamp: 3 }}>
                            {row.narraction}
                          </StyledTableCell>
                          <StyledTableCell align="center" className={classes.ledger} style={{ fontSize: 13, webkitlineclamp: 3 }}>
                            {
                              allStatus.find(
                                (s, i) => s.value === Number(row.sales_status)
                              )?.label
                            }
                          </StyledTableCell>

                          <StyledTableCell
                            align="right"
                            className={classes.ledger}
                          >
                            {/* {console.log(row, "sen3105")} */}

                            {!getAmount(row, [1, "P", "BR"])
                              ? row.sales_status === "37"
                                ? currencyFormate(
                                  getAmount(row, [1, "P", "BR"])
                                )
                                : (

                                  getAmount(row, [1, "P", "BR"]) +
                                    (row.sales_order_other_charges &&
                                      row.sales_order_other_charges.reduce(
                                        (s, l) =>
                                          l.charge_type === "+"
                                            ? s + Number(l.charge_amount)
                                            : s - Number(l.charge_amount),
                                        0
                                      )) === '0' ? ''
                                    : currencyFormate(row.sales_order_other_charges &&
                                      row.sales_order_other_charges.reduce(
                                        (s, l) =>
                                          l.charge_type === "+"
                                            ? s + Number(l.charge_amount)
                                            : s - Number(l.charge_amount),
                                        0
                                      ))

                                )
                              : currencyFormate(
                                !row.sales_order_other_charges
                                  ? getAmount(row, [1, "P", "BR"])
                                  : getAmount(row, [1, "P", "BR"]) +
                                  (row.sales_order_other_charges &&
                                    row.sales_order_other_charges.reduce(
                                      (s, l) =>
                                        l.charge_type === "+"
                                          ? s + Number(l.charge_amount)
                                          : s - Number(l.charge_amount),
                                      0
                                    ))
                              )}
                          </StyledTableCell>

                          <StyledTableCell
                            align="right"
                            className={classes.ledger}
                          >
                            {
                              /* {`${
                          row.ledJournal?.ddl_ledger ===
                          addSearch.ddl_ledger_account.label
                            ? row.ledJournal.dr_cr === 2
                              ? row.ledJournal.amount
                              : ""
                            : ""
                        }`} */
                              getAmount(row, [2, "R", "BP"])
                                ? getAmount(row, [2, "R", "BP"])
                                : getAmount(row, [2, "R", "BP"])
                            }
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                      <StyledTableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>

                        <StyledTableCell align="left">
                          <b> Closing Balance</b>
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>

                        <StyledTableCell></StyledTableCell>
                        {/* {console.log("cllh", closingBalance)} */}
                        {/* <StyledTableCell align="right"> <b> { closingBalance !== 0 && (closing_balance_dr_cr === "Cr" ? currencyFormate(closingBalance) : "") } </b> </StyledTableCell>
                    <StyledTableCell align="right"> <b> { closingBalance !== 0 && (closing_balance_dr_cr === "Dr" ? currencyFormate(closingBalance) : "") } </b> </StyledTableCell> */}
                        <StyledTableCell align="right">
                          <b>
                            {" "}
                            {totalCr > totalDr
                              ? currencyFormate(totalCr - totalDr)
                              : ""}
                          </b>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <b>
                            {" "}
                            {totalDr > totalCr
                              ? currencyFormate(totalDr - totalCr)
                              : ""}
                          </b>
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>

                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="left">
                          <b>Total</b>
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>

                        <StyledTableCell align="right">
                          <b>
                            {totalCr > totalDr
                              ? currencyFormate(totalCr)
                              : currencyFormate(totalDr)}
                          </b>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <b>
                            {totalCr > totalDr
                              ? currencyFormate(totalCr)
                              : currencyFormate(totalDr)}
                          </b>
                        </StyledTableCell>

                        {/* <StyledTableCell align="right"><b> { currencyFormate(( openingBalance.dr_cr_status === "Dr" ? openingBalance.opening : 0 ) + totalDr + ( closing_balance_dr_cr === "Cr" ? closingBalance : 0 )) } </b></StyledTableCell>
                    <StyledTableCell align="right"><b> { currencyFormate(( openingBalance.dr_cr_status === "Cr" ? openingBalance.opening : 0 ) + totalCr + ( closing_balance_dr_cr === "Dr" ? closingBalance : 0 )) } </b></StyledTableCell> */}
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )}

      {/* <MasterModelForStock
        classicModal={classicModal}
        onCloseModel={onCloseModel}
        height="auto"
        modelName="Ledger View">
        <OutstandingLedgerSalesView openingBalance={openingBalance} ledgerList={ledgerList} outstanding={outstanding} />
      </MasterModelForStock> */}
      <MasterModelForLedgerInvoiceView
        classicModal={classicModal}
        onCloseModel={onCloseModel}
        width={450}
        // okBtnText="Print"
        // onClickOk={(e) => {
        //   e.preventDefault();

        //   window.print();
        // }}
        height="auto"
        modelName="Sales View"
      // onClickOk={onSubmitModel}
      >
        {transaction_type === "Sales Order" ? (
          <SalesOrderViewPageForLedger sales_order_no={billNo} />
        ) : (
          ""
        )}
      </MasterModelForLedgerInvoiceView>

      <MasterModel
        // classicModal={classicModal}
        // onCloseModel={(e) => {
        //   e.preventDefault();
        //   setClassicModal(false);
        // }}
        height="auto"
        okBtnText="Pdf"
        modelName="Ledger By Sales Order "
        onClickOk={(e) => {
          e.preventDefault();
          window.print();
        }}
      >
        <div
          id="pdf-view"
          style={{
            marginTop: 15,
            display: "flex",
            flexFlow: "row wrap",
            // justifyContent: "center",
            breakBefore: "avoid-page",
            width: "75%",
            marginLeft: 90,
          }}
        >
          <div
            style={{
              textAlign: "center",
              borderBottom: "1px solid",
              width: "100%",
            }}
          >
            <h4>Ledger List</h4>
          </div>

          <GridContainer
            style={{
              margin: 2,
              textAlign: "center",
              borderBottom: "1px solid",
              width: "100%",
            }}
          >
            <GridItem>
              {addSearch?.ddl_customer
                ? `Ledger Account: ${addSearch?.ddl_customer?.label}`
                : ""}
            </GridItem>

            <GridItem>
              {addSearch?.txt_from_date
                ? `From Date: ${currentDate1Pdf(addSearch?.txt_from_date)}`
                : ""}
            </GridItem>

            <GridItem>
              {addSearch?.txt_to_date
                ? `To Date: ${currentDatePdf(addSearch?.txt_to_date)}`
                : ""}
            </GridItem>
          </GridContainer>

          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left" style={{ fontSize: 12 }}>
                    #
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ fontSize: 12 }}>
                    Date
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ fontSize: 12 }}>
                    Voucher No
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ fontSize: 12 }}>
                    Voucher Type
                  </StyledTableCell>
                  <StyledTableCell align="left" style={{ fontSize: 12 }}>
                    Particular
                  </StyledTableCell>
                  <StyledTableCell align="right" style={{ fontSize: 12 }}>
                    Status
                  </StyledTableCell>

                  <StyledTableCell align="right" style={{ fontSize: 12 }}>
                    Debit
                  </StyledTableCell>
                  <StyledTableCell align="right" style={{ fontSize: 12 }}>
                    Credit
                  </StyledTableCell>
                  {/* <StyledTableCell align="right">Action</StyledTableCell> */}
                </TableRow>
              </TableHead>
              {/* table Body start */}
              <TableBody>
                <StyledTableRow
                  className={classes.openingBalances}
                  style={{ fontSize: 10 }}
                >
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell className={classes.credit}></StyledTableCell>
                  <StyledTableCell
                    className={classes.credit}
                    style={{ fontSize: 10 }}
                  >
                    <b>Opening Balance</b>
                  </StyledTableCell>
                  <StyledTableCell className={classes.credit}></StyledTableCell>
                  <StyledTableCell className={classes.credit}></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align="right" style={{ fontSize: 10 }}>
                    <b>
                      {openingBalance.dr_cr_status === "Dr"
                        ? openingBalance.opening.toFixed(2)
                        : ""}
                    </b>
                  </StyledTableCell>
                  <StyledTableCell align="right" style={{ fontSize: 10 }}>
                    {/* <b>{openingBalance ===0?'':openingBalance}</b> */}
                    <b>
                      {openingBalance.dr_cr_status === "Cr"
                        ? openingBalance.opening.toFixed(2)
                        : ""}
                    </b>
                  </StyledTableCell>
                </StyledTableRow>

                {ledgerList.map((row, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell
                      align="left"
                      className={classes.id}
                      style={{ fontSize: 10 }}
                    >
                      {row.length != 0 ? i + 1 : ""}
                    </StyledTableCell>

                    <StyledTableCell
                      align="left"
                      className={classes.date}
                      style={{ fontSize: 10 }}
                    >
                      {row.ledDate}
                    </StyledTableCell>

                    <StyledTableCell
                      align="left"
                      className={classes.ledger}
                      style={{ fontSize: 10 }}
                    >
                      {row.ledVoucherNo}
                    </StyledTableCell>

                    <StyledTableCell
                      align="left"
                      className={classes.ledger}
                      style={{ fontSize: 10 }}
                    >
                      {getVType(row.ledVoucherType) === "BR" ||
                        getVType(row.ledVoucherType) === "BP"
                        ? "Bad Debt"
                        : getVType(row.ledVoucherType)}
                    </StyledTableCell>

                    <StyledTableCell
                      align="left"
                      className={classes.ledger}
                      style={{ fontSize: 10 }}
                    >
                      {
                        /*`${
                          row.ledJournal[0].ddl_ledger ===
                          addSearch.ddl_ledger_account.label
                            ? row.ledJournal[1].ddl_ledger
                            : row.ledJournal[0].ddl_ledger
                        }` */
                        // row.mode ? row.mode : row.particular
                        row.particular
                          ? row.particular
                          : row.ledger_account_for_party
                      }
                    </StyledTableCell>
                    <StyledTableCell align="right" style={{ fontSize: 10 }}>
                      {
                        allStatus.find(
                          (s, i) => s.value === Number(row.sales_status)
                        )?.label
                      }
                    </StyledTableCell>

                    <StyledTableCell
                      align="right"
                      className={classes.ledger}
                      style={{ fontSize: 10 }}
                    >
                      {/* {console.log(row, "sen3105")} */}

                      {!getAmount(row, [1, "P", "BR"])
                        ? row.sales_status === "37"
                          ? getAmount(row, [1, "P", "BR"]).toFixed(2)
                          : (

                            getAmount(row, [1, "P", "BR"]) +
                              (row.sales_order_other_charges &&
                                row.sales_order_other_charges.reduce(
                                  (s, l) =>
                                    l.charge_type === "+"
                                      ? s + Number(l.charge_amount)
                                      : s - Number(l.charge_amount),
                                  0
                                )) === '0' ? ''
                              : currencyFormate(row.sales_order_other_charges &&
                                row.sales_order_other_charges.reduce(
                                  (s, l) =>
                                    l.charge_type === "+"
                                      ? s + Number(l.charge_amount)
                                      : s - Number(l.charge_amount),
                                  0
                                ))

                          )
                        : (!row.sales_order_other_charges
                          ? getAmount(row, [1, "P", "BR"])
                          : getAmount(row, [1, "P", "BR"]) +
                          (row.sales_order_other_charges &&
                            row.sales_order_other_charges.reduce(
                              (s, l) =>
                                l.charge_type === "+"
                                  ? s + Number(l.charge_amount)
                                  : s - Number(l.charge_amount),
                              0
                            ))
                        ).toFixed(2)}
                    </StyledTableCell>

                    <StyledTableCell
                      align="right"
                      className={classes.ledger}
                      style={{ fontSize: 10 }}
                    >
                      {
                        /* {`${
                          row.ledJournal?.ddl_ledger ===
                          addSearch.ddl_ledger_account.label
                            ? row.ledJournal.dr_cr === 2
                              ? row.ledJournal.amount
                              : ""
                            : ""
                        }`} */
                        getAmount(row, [2, "R", "BP"])
                          ? getAmount(row, [2, "R", "BP"])
                          : getAmount(row, [2, "R", "BP"])
                      }
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <StyledTableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align="left" style={{ fontSize: 10 }}>
                    <b> Closing Balance</b>
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>

                  <StyledTableCell></StyledTableCell>
                  {/* {console.log("cllh", closingBalance)} */}
                  {/* <StyledTableCell align="right"> <b> { closingBalance !== 0 && (closing_balance_dr_cr === "Cr" ? currencyFormate(closingBalance) : "") } </b> </StyledTableCell>
                    <StyledTableCell align="right"> <b> { closingBalance !== 0 && (closing_balance_dr_cr === "Dr" ? currencyFormate(closingBalance) : "") } </b> </StyledTableCell> */}
                  <StyledTableCell align="right" style={{ fontSize: 10 }}>
                    <b>
                      {" "}
                      {totalCr > totalDr ? (totalCr - totalDr).toFixed(2) : ""}
                    </b>
                  </StyledTableCell>
                  <StyledTableCell align="right" style={{ fontSize: 10 }}>
                    <b>
                      {" "}
                      {totalDr > totalCr ? (totalDr - totalCr).toFixed(2) : ""}
                    </b>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell align="left">
                    <b>Total</b>
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>

                  <StyledTableCell align="right">
                    <b>
                      {totalCr > totalDr
                        ? totalCr.toFixed(2)
                        : totalDr.toFixed(2)}
                    </b>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <b>
                      {totalCr > totalDr
                        ? totalCr.toFixed(2)
                        : totalDr.toFixed(2)}
                    </b>
                  </StyledTableCell>

                  {/* <StyledTableCell align="right"><b> { currencyFormate(( openingBalance.dr_cr_status === "Dr" ? openingBalance.opening : 0 ) + totalDr + ( closing_balance_dr_cr === "Cr" ? closingBalance : 0 )) } </b></StyledTableCell>
                    <StyledTableCell align="right"><b> { currencyFormate(( openingBalance.dr_cr_status === "Cr" ? openingBalance.opening : 0 ) + totalCr + ( closing_balance_dr_cr === "Dr" ? closingBalance : 0 )) } </b></StyledTableCell> */}
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </MasterModel>
    </ThemeProvider>
  );
};

export default OutstandingBySalesOrder;
