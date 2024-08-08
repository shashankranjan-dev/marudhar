import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import {
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
} from "assets/jss/material-dashboard-pro-react";
import { getListStatus } from "../../services/addStatusService";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { defaultBoxShadow } from "assets/jss/material-dashboard-pro-react";
import { appScrollBar } from "assets/jss/material-dashboard-pro-react";
import { appFontWeight } from "assets/jss/material-dashboard-pro-react";
import { appFontWeightThin } from "assets/jss/material-dashboard-pro-react";
import { appFontWeightBold } from "assets/jss/material-dashboard-pro-react";
import alertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import SweetAlert from "react-bootstrap-sweetalert";
import cls from "classnames";
import theme from "../../theme/theme";
import { TextField, ListItemIcon, Checkbox, Tab } from "@material-ui/core";
import { CircleAddBtn } from "./CustomButton";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

// import SendIcon from "@mui/icons-material/Send";
import Skeleton from "@material-ui/lab/Skeleton";

import ViewListIcon from "@mui/icons-material/ViewList";

import { Typography, Box } from "@material-ui/core";
import ShareIcon from "@mui/icons-material/Share";

const useAlertCls = makeStyles(alertStyle);

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  itemDetailCol: {
    width: "100%",
    display: "flex",
    alignItems: "start",
  },
  actionIitem: {
    // boxShadow: "none",
    fontFamily: appDefaultFamily,
    color: appSecondColor,
    textTransform: "none",
    fontSize: "14px",
    width: "100%",
  },
  itemImgPaper: {
    width: "80px",
    height: "80px",
    overflow: "hidden",
  },

  // for table body border
  isTableBodyBorder: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
  },
  isTableHeaderBorder: {
    borderTop: "1px solid rgba(224, 224, 224, 1)",
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
  },
  rootSkeleton: {
    width: "100%",
  },
  itemProDetail: {
    paddingLeft: 0,
  },
  actionMenu: {
    boxShadow: "none",
  },
  container: {
    ...appScrollBar,
    maxHeight: 360,
  },
  tableHeader: {
    color: appSecondColor,
  },
  TableBodyRow: {
    minHeight: "35px",
    height: "40px",
    "&:hover": {
      backgroundColor: "rgba(43, 43, 43, 0.03)",
    },
  },
  tlbHeadCel: {
    padding: "6px 5px",
    backgroundColor: "#fff",
    color: appSecondColor,
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  tablBodyCell: {
    color: appSecondColor,
    padding: "0px 5px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    cursor: "pointer",
  },
  id: {
    width: "0%",
  },

  boldText: {
    fontWeight: "500",
    color: appSecondColor,
  },

  action: {
    width: "5%",
  },
  status: {
    width: "5%",
  },
  brand: {
    width: "25%",
  },
  category: {
    width: "15%",
  },
  item: {
    width: "30%",
  },
  unit: {
    width: "5%",
  },
  hsn: {
    width: "15%",
  },
  cgst: {
    width: "5%",
  },
  sgst: {
    width: "5%",
  },
  igst: {
    width: "5%",
  },
  mrp: {
    width: "5%",
  },
  details: {
    width: "50%",
  },
  itemDetails: {
    width: "30%",
  },
  stock: {
    width: "5%",
  },
  parentCategory: {
    width: "15%",
  },
  quantity: {
    width: "15%",
  },
  parentCategory: {
    width: "15%",
  },
  parentCategory: {
    width: "15%",
  },
  terms: {
    with: "",
  },
  caption: {
    width: "25%",
  },
  conditions: {
    width: "50%",
  },
  higherValue: {
    width: "15%",
  },
  lowerValue: {
    width: "15%",
  },
  lowerCaption: {
    width: "15%",
  },
  higherUnit: {
    width: "10%",
  },
  taxMaster: {
    width: "20%",
  },
  percentage: {
    width: "5%",
  },
  lowerUnit: {
    width: "15%",
  },
  ledgerAccountName: {
    width: "20%",
  },
  termsName: {
    width: "15%",
  },
  statutoryType: {
    width: "15%",
  },
  terms: {
    width: "20%",
  },
  sacCode: {
    width: "15%",
  },
  charges: {
    width: "15%",
  },
  otherCharges: {
    width: "5%",
  },
  salesTaxes: {
    width: "5%",
  },

  vendor: {
    width: "5%",
  },
  customer: {
    width: "5%",
  },
  groupName: {
    width: "20%",
  },
  company: {
    width: "20%",
  },
  user: {
    width: "5%",
  },
  name: {
    width: "20%",
  },
  role: {
    width: "20%",
  },
  mobile: {
    width: "15%",
  },
  email: {
    width: "30%",
  },
  gstno: {
    width: "15%",
  },
  item_details: {
    width: "60%",
  },
  rate_field: {
    width: "5%",
  },
  value_field: {
    width: "10%",
  },
  quantity_field: {
    width: "5%",
  },
  disc_field: {
    width: "5%",
  },
  cgst_field: {
    width: "5%",
  },
  sgst_field: {
    width: "5%",
  },
  igst_field: {
    width: "5%",
  },
  net_value_field: {
    width: "5%",
  },
  user_status: {
    width: "5%",
  },
  vendor_status: {
    width: "5%",
  },
  customer_status: {
    width: "5%",
  },

  salesBillDate: {
    width: "5%",
  },
  enquiryDate: {
    width: "15%",
  },
  enquiryEmail: {
    width: "25%",
  },
  salesBillNo: {
    width: "5%",
  },
  salesCustomer: {
    width: "10%",
  },
  grossAmount: {
    width: "5%",
  },
//Vehicle
vehicle_type: {
  width: "15%",
},
vehicle_no: {
  width: "15%",
},

contact_person: {
  width: "15%",
},
contact_no: {
  width: "15%",
},
details: {
  width: "20%",
},




  //Role -role

  role_id: {
    width: "5%",
  },
  role_role: {
    width: "25%",
  },
  role_details: {
    width: "60%",
  },
  role_status: {
    width: "5%",
  },
  role_action: {
    width: "5%",
  },

  //Status - status

  status_serial_id: { width: "5%" },
  status_for: { width: "10%" },
  status_name: { width: "15%" },
  status_color: { width: "10%" },
  status_details: { width: "35%" },
  status_status: { width: "15%" },
  status_action: { width: "5%" },

  //Source -sou

  sou_id: {
    width: "5%",
  },
  sou_source: {
    width: "25%",
  },
  sou_details: {
    width: "60%",
  },
  sou_status: {
    width: "5%",
  },
  sou_action: {
    width: "5%",
  },

  // salesCharges:{
  //   width: "25%",
  // }

  //  PURCHASE ORDER LIST -pol
  polID: { width: "5%" },
  polDate: { width: "12%" },
  polNo: { width: "12%" },
  polValue: { width: "15%" },
  polVendor: { width: "18%" },
  polGross:{width: "10%" },
  polDiscount: { width: "5"},
  polAction: { width: "10%" },
  polGst: { width: "5%"},
  polValue: { width: "5%"},

  //ADDGRN ORDER LIST -Grn
  GrnID: { width: "5%" },
  GrnDate: { width: "10%" },
  GrnNo: { width: "20%" },
  GrnValue: { width: "20%" },
  GrnVendor: { width: "25%" },
  GrnAction: { width: "10%" },
  GrnValue: { width: "10%"},

//customer ledger list
  cusLedGroup_name :{width: "30%"},
  cusLedCompany :{width: "40%"},
  cusLedLedger_account_name :{width: "30%"},





  //  STOCK TRANSFER LIST - stk
  serial_id: { width: "2%" },
  stk_transfer_no: { width: "20%" },
  stk_transfer_date: { width: "10%" },
  stk_transfer_from: { width: "20%" },
  stk_transfer_to: { width: "20%" },
  stk_note: { width: "20%" },
  stk_action: { width: "8%" },

  //PRIMARY GROUP -pri
  primary_group_serial: { width: "5%" },
  primary_group_name: { width: "30%" },
  primary_group_nature: { width: "20%" },
  primary_group_details: { width: "35%" },
  primary_group_status: { width: "5%" },
  primary_group_action: { width: "5%" },

  // SHOWROOM/WAREHOUSE LIST -sw
  sw_id: { width: "5%" },
  sw_type: { width: "15%" },
  sw_name: { width: "20%" },
  sw_gst: { width: "10%" },
  sw_address: { width: "40%" },
  sw_status: { width: "5%" },
  sw_action: { width: "5%" },

  // BRAND LIST -brd
  brdid: { width: "5%" },
  brdbrand: { width: "15%" },
  brddetails: { width: "70%" },
  brdaction: { width: "5%" },
  brdstaus: { width: "5%" },

  // STATUTORYTYPE LIST -stu
  stu_id: { width: "5%" },
  stu_statutoryType: { width: "15%" },
  stu_details: { width: "70%" },
  stu_action: { width: "5%" },
  stu_staus: { width: "5%" },

  // MOdule LIST -mod
  mod_id: { width: "5%" },
  mod_modules: { width: "15%" },
  mod_details: { width: "70%" },
  mod_action: { width: "5%" },
  mod_staus: { width: "5%" },

  // REFERENCES LIST -ref
  ref_id: { width: "5%" },
  ref_name: { width: "25%" },
  ref_mobile: { width: "15%" },
  ref_whatsapp: { width: "15%" },
  ref_email: { width: "30%" },
  ref_status: { width: "5%" },
  ref_action: { width: "5%" },

  // DIRECT PURCHASE LIST -dpl
  dplID: { width: "2%" },
  dplBillDate: { width: "10%" },
  dplBillNo: { width: "15%" },
  dplVendor: { width: "20%" },
  dplNote: { width: "30%" },

  
  dplBillValue: { width: "10%" },
  dplGrnNo: { width: "20%" },

  dplTaxes: { width: "10%" },
  dplgrn_no: { width: "15%" },
  dplgrn_date: { width: "10%" },
  dplAction: { width: "8%" },

  // DIRECT SALE LIST -dsl
  dslID: { width: "2%" },
  dslBillDate: { width: "10%" },
  dslBillNo: { width: "15%" },
  dslCustomer: { width: "20%" },
  dslGrossAmount: { width: "10%" },
  dslTaxes: { width: "10%" },
  dslOtherCharges: { width: "10%" },
  dslNetAmount: { width: "10%" },
  dslAction: { width: "8%" },

  // DISPATCH ORDER LIST -dis
  disID: { width: "2%" },
  disdispatchDate: { width: "15%" },
  disDispatchNo: { width: "15%" },
  disDeliveryOrderhNo: { width: "15%" },
  disSalesOrderNo: { width: "15%" },
  disCustomer: { width: "20%" },
  disStatus: { width: "5%" },
  disAction: { width: "5%" },

  // Invoice  LIST -inv
  inv_serial_no: { width: "2%" },
  inv_invoice_date: { width: "10%" },
  inv_invoice_no: { width: "18%" },
  inv_sales_order_no: { width: "18%" },

  inv_customer: { width: "25%" },
  
  inv_NetAmount: { width: "22%" },
 
  dslAction: { width: "8%" },

  salesExcutive: {
    width: "25%",
  },

  // GRN LIST - grn
  grnID: { width: "2%" },
  grnNo: { width: "20%" },
  grnDate: { width: "10%" },
  poNo: { width: "15%" },
  grnVendor: { width: "25%" },
  grnStatus: { width: "5%" },
  grnPoValue: { width: "10%" },
  grnAction: { width: "8%" },

  //RECEIPT LIST -received

  recID: { width: "5%" },
  recDate: { width: "10%" },
  recVoucherNo: { width: "15%" },
  recLedger: { width: "10%" },
  // recMode: { width: "10%" },
  // recReference: { width: "10%" },
  recNarration: { width: "30%" },
  recAmount: { width: "10%" },
  recAction: { width: "5%" },

  //PAYMENT LIST -pay

  payID: { width: "5%" },
  payDate: { width: "10%" },
  payVoucherNo: { width: "15%" },
  payLedger: { width: "15%" },
  payMode: { width: "10%" },
  payReference: { width: "10%" },
  payNarration: { width: "5%" },
  payAmount: { width: "10%" },
  payAction: { width: "5%" },

  //JOURNAL LIST -jor

  jorID: { width: "5%" },
  jorDate: { width: "10%" },
  jorNo: { width: "15%" },
  jorLedger: { width: "15%" },
  jorMode: { width: "10%" },
  jorReference: { width: "10%" },
  jorNarration: { width: "5%" },
  jorAmount: { width: "10%" },
  jorAction: { width: "5%" },

  //LEDGER LIST  -led

  ledID: { width: "5%" },
  ledDate: { width: "10%" },
  ledVoucherNo: { width: "15%" },
  ledVoucherType: { width: "15%" },
  ledParticular: { width: "10%" },
  ledDebit: { width: "10%" },
  ledCredit: { width: "10%" },
  ledAction: { width: "5%" },

  // ENQUIRY DETALS LIST - enq

  enquire_serial: { width: "5%" },
  enqDate: { width: "5%" },
  enqNo: { width: "20%" },
  enqCustomer: { width: "20%" },
  enqMobile: { width: "10%" },
  enqSalesExecutive: { width: "20%" },
  enqShowroom: { width: "20%" },
  enqSource: { width: "5%" },
  enqStatus: { width: "5%" },
  enqAction: { width: "5%" },

  // Delivery Order DETALS LIST - Del

  DelID: { width: "2%" },
  DelDate: { width: "10%" },
  DelNo: { width: "12%" },
  DelSalesOrderNo: { width: "12%" },
  DelQuotationNo: { width: "12%" },
  DelCustomer: { width: "15%" },
  DelMobile: { width: "10%" },
  DelSalesExecutive: { width: "20%" },
  DelStatus: { width: "5%" },
  DelAction: { width: "5%" },

  // QUATATION DETALS LIST - qut

  qutID: { width: "2%" },
  qutDate: { width: "15%" },
  qutNo: { width: "20%" },
  qutCustomer: { width: "20%" },
  qutMobile: { width: "10%" },
  qutSalesExecutive: { width: "25%" },
  qutSalesSource: { width: "10%" },
  qutEnquiryNo: { width: "20%" },
  qutStatus: { width: "10%" },
  qutAction: { width: "8%" },

  //Sales Order -sales
  sales_serial: { width: "2%" },
  sales_order_date: { width: "14%" },
  sales_order_no: { width: "18%" },
  sales_quotation_no: { width: "18%" },
  sales_enquiry_no: { width: "18%" },
  sales_customer: { width: "20%" },
  sales_status: { width: "5%" },
  sales_action: { width: "5%" },

  //TRADING ACCOUNT -tra
  traParticular1: { width: "40%" },
  traAmount1: { width: "10%" },
  traParticular2: { width: "40%" },
  traAmount2: { width: "10%" },

  //TRIAL BALANCE  -tri
  triid: { width: "5%" },
  triParticular: { width: "55%" },
  triDebit: { width: "15%" },
  triCredit: { width: "15%" },

  //STOCK lIST   -sto

  stoID: { width: "5%" },
  stoItemDetails: { width: "55%" },
  stoUom: { width: "5%" },
  stoOpening: { width: "5%" },
  stoPurchase: { width: "5%" },
  stoPurchaseReturn: { width: "5%" },
  stoSales: { width: "5%" },
  stoSalesReturn: { width: "5%" },
  stoClosing: { width: "5%" },
  stoAction: { width: "5%" },


  //sales_return_delivery -sales
  salesRetID: { width: "5%" },
  salesRetNo: { width: "15%" },
  salesRetDate: { width: "5%" },
  invoice_no: { width: "15%" },
  salesRetCustomer: { width: "15%" },
  sales_return_bill_value: { width: "15%" },
  salesRetStatus: { width: "5%" },
  salesRetAction: { width: "0%" },
 

  //STOCK VIEW LIST -stp

  stpID: { width: "5%" },
  stpDate: { width: "5%" },
  stpOpening: { width: "5%" },
  stpPurchase: { width: "5%" },
  stpPurchaseReturn: { width: "5%" },
  stpSales: { width: "5%" },
  stpSalesReturn: { width: "5%" },
  stpSalesAdj: { width: "5%" },
  stpClosing: { width: "5%" },
  // stpRemarks: { width: "55%" },

  //Bank
  b_id: { width: "5%" },
  b_bank: { width: "30%" },
  b_details: { width: "40%" },
  b_status: { width: "5%" },
  b_action: { width: "5%" },

  //LEDGER BALANCE LIST    -ledb

  ledger_id: { width: "1%" },
  ledger_account: { width: "37%"},
  dr_cr_status: {width: "10%"},
  opening_balance: {width: "22%"},
  closing_balance: {width: "22%"},

  //Sales_register
  invs_serial_no:{width: "2%"},
  invs_invoice_date:{width: "8%"},
  invs_invoice_no:{width: "10%"},
  invs_customer:{width: "12%"},
  invs_gross_amount:{width: "16%"},
  invs_gst:{width: "10%"},
  invs_OtherCharges:{width: "10%"},
  invs_NetAmount:{width: "15%"},




  //ITEM
  // itm_id: { width: "5%" },
  // itm_category: { width: "5%" },
  // itm_brand: { width: "5%" },
  // itm_item: { width: "5%" },
  // itm_unit: { width: "5%" },
  // itm_hsn: { width: "5%" },
  // itm_gst: { width: "5%" },
  // itm_status: { width: "5%" },
  // itm_action: { width: "5%" },
  // subGroupStatus: {
  //   width: "10%",
  // },

  //SAles Register
  inv_gross_amount:{ width:"5%"},

  statusbtn: {
    "&  svg": {
      fontSize: "20px",
      marginTop: -2,
    },
    display: "inline-block",
    width: "50px",
    height: "20px",
    borderRadius: "25px",
    lineHeight: "20px",
    color: "#fff",
    padding: "2px",
    textAlign: "center",
    textTransform: "none",
    fontSize: "10px",
  },
});

const useStyles = makeStyles(styles);

export const ActiveIcon = () => {
  const classes = useStyles();
  return (
    <div style={{ background: "#4caf50" }} className={classes.statusbtn}>
      <CheckIcon />
    </div>
  );
};
export const StatusColorIcon = ({ color }) => {
  const classes = useStyles();
  return (
    <div style={{ background: color }} className={classes.statusbtn}></div>
  );
};
export const DeActiveIcon = () => {
  const classes = useStyles();
  return (
    <div style={{ background: "#f44336" }} className={classes.statusbtn}>
      <ClearIcon />
    </div>
  );
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function EnhancedTableHead(props) {
  const {
    classes,
    numSelected,
    selectedItemTable,
    order,
    orderBy,
    onRequestSort,
    onSelectAllClick,
    rowCount,
    isTableHeaderBorder,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={classes.tableHeader}>
        {selectedItemTable && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          </TableCell>
        )}

        {props.headCells.map((headCell, i) => (
          <TableCell
            className={cls(classes.tlbHeadCel, classes[headCell.id], {
              [classes.isTableHeaderBorder]: isTableHeaderBorder,
            })}
            key={i}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function TableFooter(props) {
  const {
    classes,
    text,
    footerColIndex,
  } = props;
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };

  return (
    <tfoot>
      <TableRow>
      <TableCell >
        
        </TableCell>
        <TableCell colSpan={footerColIndex}>
          Total
        </TableCell>

        <TableCell style={{ textAlign: 'right' }}>
          {text}
        </TableCell>
      </TableRow>
    </tfoot>
    );
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function MuiTableWP({
  status_type,
  columns,
  rows,
  footer,
  footerColIndex,
  onClickPrint,
  onClickEdit = () => {},
  onClickDelete = () => {},
  onClickViewOne = () => {},
  onClickUserAccess = () => {},
  onClickQRCode = () => {},
  onSelectedItem = () => {},
  onClickAdjustment,
  onClickSetMrp,
  onClickSetSellingPrice,
  onClickView,
  loading,
  isTableBodyBorder,
  isTableHeaderBorder,
  pagination = true,
  selectableItemTable = false,
}) {
  const history = useHistory();
  const classes = useStyles();
  const alertcls = useAlertCls();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [alert, setAlert] = React.useState(null);
  const [active, setActive] = React.useState(false);
  const [allStatus, setAllStatus] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selected, setSelected] = React.useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuOne, setMenuOne] = React.useState(null);

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };
  const menuClickOne = (event, row) => {
    setMenuOne(event.currentTarget);
    setSelectedRow(row);
  };

  const menuClose = () => {
    setAnchorEl(null);
  };
  const menuCloseOne = (id) => {
    setMenuOne(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const onClickAction = (row) => {
    onClickDelete(row, () => {
      successDelete();
      menuCloseOne(null);
    });
  };

  const onClickInSideMenu = (m) => {
    if (m.modelName === "printInvoice") {
      onClickPrint(selectedRow);
    }
    if (m.modelName === "stockTransaction") {
      onClickView(selectedRow);
    }
    if (m.modelName === "stockAdjustment") {
      onClickAdjustment(selectedRow);
    }
    if (m.modelName === "setSellingPrice") {
      onClickSetSellingPrice(selectedRow);
    }
    if (m.modelName === "setMrp") {
      onClickSetMrp(selectedRow);
    }
    if (m.label === "Delete") {
      warningWithConfirmAndCancelMessage(selectedRow);
    }
    if (m.label === "Edit") {
      onClickEdit(selectedRow);
    }
    if (m.label === "View") {
      onClickViewOne(selectedRow);
    }
    if (m.modelName === "grantPermission") {
      onClickUserAccess(selectedRow);
    }
    if (m.modelName === "qrCodeModel") {
      onClickQRCode(selectedRow);
    }
    setAnchorEl(null);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const successDelete = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Deleted!"
        onConfirm={() => setAlert(null)}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={alertcls.button + " " + alertcls.success}
      >
        Deleted Successfully.
      </SweetAlert>
    );
  };

  const warningWithConfirmAndCancelMessage = (row) => {
    menuCloseOne();
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => onClickAction(row)}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={alertcls.button + " " + alertcls.success}
        cancelBtnCssClass={alertcls.button + " " + alertcls.danger}
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        showCancel
      >
        You will not be able to recover this Item!
      </SweetAlert>
    );
  };

  const renderTableCell = (
    row,
    value,
    anchorEl,
    menuClose,
    handleClick,
    column
  ) => {
    if (value === "active") {
      return <ActiveIcon />;
    } else if (value === "inactive") {
      return <DeActiveIcon />;
    } else if (column.statusBtn && column.statusBtn(value)) {
      return <ActiveIcon />;
    } else if (column.statusBtn && !column.statusBtn(value)) {
      return <DeActiveIcon />;
    } else if (column.salesStatus) {
      return (
        <div
          style={{
            color: allStatus.find(
              (s, i) => s.value === Number(column.salesStatus(value))
            )?.status_color,
          }}
        >
          {
            allStatus.find(
              (s, i) => s.value === Number(column.salesStatus(value))
            )?.label
          }
        </div>
      );
    } else if (column.statusColorIcon) {
      return <StatusColorIcon color={column.statusColorIcon(value)} />;
    }
    if (value === true) {
      return <ActiveIcon />;
    } else if (value === false) {
      return <DeActiveIcon />;
    } else if (value === "action") {
      // Menu One
      return (
        <>
          <IconButton
            size="small"
            aria-controls="simple-menu-one"
            aria-haspopup="true"
            onClick={(e) => menuClickOne(e, row)}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={menuOne}
            keepMounted
            className={classes.actionMenu}
            open={Boolean(menuOne)}
            onClose={menuCloseOne}
          >
            {selectedRow?.action_items?.can_view && (
              <MenuItem
                onClick={() => {
                  onClickViewOne(selectedRow);
                  menuCloseOne();
                }}
                className={classes.actionIitem}
              >
                View
              </MenuItem>
            )}
            {selectedRow?.action_items?.can_edit && (
              <MenuItem
                onClick={() => {
                  onClickEdit(selectedRow);
                  menuCloseOne();
                }}
                className={classes.actionIitem}
              >
                Edit
              </MenuItem>
            )}

            {selectedRow?.action_items?.can_delete && (
              <MenuItem
                onClick={() => warningWithConfirmAndCancelMessage(selectedRow)}
                className={classes.actionIitem}
              >
                Delete
              </MenuItem>
            )}

            {/* <MenuItem
              onClick={() => warningWithConfirmAndCancelMessage(selectedRow)}
              className={classes.actionIitem}
            >
              Delete
            </MenuItem> */}

            {/* <MenuItem onClick={() => {}} className={classes.actionIitem}>
              Activate
            </MenuItem>

            <MenuItem onClick={() => {}} className={classes.actionIitem}>
              Deactivate
            </MenuItem> */}
          </Menu>
        </>
      );
    } else if (value === "view-action") {
      // Menu Two
      return (
        <>
          <IconButton
            size="small"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e) => handleClick(e, row)}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            className={classes.actionMenu}
            open={Boolean(anchorEl)}
            onClose={menuClose}
          >
          
            {row.menu.map((m, i) => {
              if (m.isFile) {
                return;
              } else {
                return (
                  <MenuItem
                    onClick={() =>
                      m.clickBtn
                        ? onClickInSideMenu(m)
                        : history.push({
                            pathname: m.link,
                            state: {
                              row: selectedRow,
                              itemEdit: true,
                              edit: m.itemEdit ? m.itemEdit : false,
                              updateTask: m.updateTask ? m.updateTask : false,
                              updateStatus: m.updateStatus ? m.updateStatus: false,
                            },
                          })
                    }
                    className={classes.actionIitem}
                  >
                    {m.label}
                    {m.label === "Share" && (
                      <ListItemIcon style={{ marginLeft: 20 }}>
                        <ShareIcon
                          fontSize="small"
                          style={{
                            color: appDefaultColor,
                          }}
                        />
                      </ListItemIcon>
                    )}
                  </MenuItem>
                );
              }
            })}
          </Menu>
        </>
      );
    } else {
      return value;
    }
  };

  React.useEffect(() => {
    getListStatus(
      status_type,
      (r) => {
        setAllStatus(r);
      },
      (err) => {
        // dispatch({
        //   type: actionTypes.SET_OPEN_MSG,
        //   payload: { msg: err, msgType: "error" },
        // });
      }
    );
  }, []);

  // for generating QR Code

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.item_id);
      setSelected(newSelecteds);
      onSelectedItem(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const onSelectItem = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    onSelectedItem(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  if (selectableItemTable) {
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              size="small"
              className={classes.customScroolBar}
              aria-label="sticky table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                numSelected={selected.length}
                selectedItemTable={selectableItemTable}
                onSelectAllClick={handleSelectAllClick}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={columns}
                isTableHeaderBorder={isTableHeaderBorder}
              />
                    {/* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}

              {rows.length > 0 && (
                <TableBody className={cls(classes.customScroolBar)}>
                  {stableSort(rows, getComparator(order, orderBy))
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.item_id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          key={row.id}
                          className={classes.TableBodyRow}
                          onClick={(event) => onSelectItem(event, row.item_id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          selected={isItemSelected}
                        >
                          <TableCell
                            key={row.id}
                            align={"left"}
                            id={row.id}
                            className={cls(
                              classes.tablBodyCell,
                              classes[row.boldText],
                              {
                                [classes.isTableBodyBorder]: isTableBodyBorder,
                              }
                            )}
                          >
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                id={column.id}
                                className={cls(
                                  classes.tablBodyCell,
                                  classes[column.id],
                                  classes[row.boldText],
                                  {
                                    [classes.isTableBodyBorder]: isTableBodyBorder,
                                  }
                                )}
                              >
                                {renderTableCell(
                                  row,
                                  value,
                                  anchorEl,
                                  menuClose,
                                  handleClick,
                                  column
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                )}
              { footer && 
              <TableFooter 
                text={footer}
              /> }
            </Table>
          </TableContainer>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Box ml={2}>
                {selected.length > 0 ? (
                  <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                  >
                    {selected.length} Selected
                  </Typography>
                ) : (
                  <div></div>
                )}
              </Box>
            </Grid>
            {/* <Grid item>
              {pagination && (
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </Grid> */}
          </Grid>

          {alert}
        </div>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              size="small"
              className={classes.customScroolBar}
              aria-label="sticky table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={columns}
                isTableHeaderBorder={isTableHeaderBorder}
              />
{/* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
              {rows.length > 0 && (
                <TableBody className={cls(classes.customScroolBar)}>
                  {stableSort(rows, getComparator(order, orderBy))
                    
                    .map((row) => {
                      return (
                        <TableRow
                          tabIndex={-1}
                          key={row.id}
                          className={classes.TableBodyRow}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                id={column.id}
                                className={cls(
                                  classes.tablBodyCell,
                                  classes[column.id],
                                  classes[row.boldText],
                                  {
                                    [classes.isTableBodyBorder]: isTableBodyBorder,
                                  }
                                )}
                              >
                                {renderTableCell(
                                  row,
                                  value,
                                  anchorEl,
                                  menuClose,
                                  handleClick,
                                  column
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                   
                </TableBody>
              )}
              { footer && 
                <TableFooter 
                  text={footer} 
                  footerColIndex={footerColIndex}
                />
              }
            </Table>
          </TableContainer>
          {/* {pagination && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )} */}

          {/* {alert} */}
        </div>
      </ThemeProvider>
    );
  }
}
