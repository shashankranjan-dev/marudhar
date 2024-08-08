import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import MasterModelForView from "../../Components/MasterModelForView";

import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";

import {
  deleteJournal,
  getAllJournal,
  getSearchJournal,
} from "../../../services/journalService";
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
import CircularProgress from "@material-ui/core/CircularProgress";

import ReactSelect from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import theme from "../../../theme/theme";
//import { getAllLedgerGroup } from "../../../services/LedgerAccountService";
import { getListLedgerAccount } from "../../../services/LedgerAccountService";

import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

import { currencyFormate, currentDate1 } from "../HelperComponent/utils";
// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
  whiteColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";
import { appFontWeight } from "assets/jss/material-dashboard-pro-react";
import { PageHeader } from "../HelperComponent/PageTitle";
import { currentDate } from "../HelperComponent/utils";
import { sortWord } from "../HelperComponent/utils";

//Tables
import { appFontWeightThin } from "assets/jss/material-dashboard-pro-react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import JournalView from "./JournalView";
const ExcelJS = require('exceljs');

import {
  directPurchaseFormRowData,
  addedItemServiceRowData,
  dummyRowData,
  getJournalByJournalId,
} from "../../../services/journalService";

const useStyles1 = makeStyles(styles);
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: appSecondColor,
    padding: "6px 5px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "0px 5px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
  customSelect: {
    marginBottom: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 40,
    "&:hover": {
      backgroundColor: "rgba(43,43, 43, 0.03)",
    },
    "&:nth-of-type(odd)": {},
  },
}))(TableRow);
// const [value, setValue] = React.useState([null, null]);

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
}));

const JournalPage = () => {
  const classes1 = useStyles1();

  //const [ledgerGroup, setAllLedgerGroup] = React.useState([]);
  const [ledgerAccounts, setAllLedgerAccount] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allUnits, setAllUnits] = React.useState([]);
  const [viewRes, setViewRes] = React.useState("hidden");
  const [journalSum, setJournalSum] = React.useState(0);
  const [accountList, setAccountList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [journal, setJournal] = React.useState({
    txt_voucher_no: "",
    txt_voucher_date: currentDate(),
    // ddl_ledger: "",
    // ddl_mode: "",
    // txt_reference: "",
    txt_narration: "",
    txt_amount: "",
  });
  const [addSearch, setAddSearch] = React.useState({
    ddl_ledger: "",
    txt_voucher_no: "",
    transaction_id:"",
    brand: "",
    item: "",
    txt_from_date: currentDate1(),
    txt_to_date: currentDate(),
  });
  const [rowInfo, setRowInfo] = React.useState([])
  const [collapsible, setCollapsible] = React.useState(true);
  const [journalDetails, setJournalDetails] = React.useState([]);
  const [DrTotal, setDrTotal] = React.useState([]);
  const [CrTotal, setCrTotal] = React.useState([]);
  const user_id = globalState?.user?.serial_id;

  let crTotal = 0;
  let drTotal = 0;
  let dr = 0;
  let cr = 0;
 
  React.useEffect(() => {
    getListLedgerAccount(
      (r) => {
        setAllLedgerAccount(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    
  }, [refresh]);

  const onSelect = (info, v) => {
    setAddSearch({ ...addSearch, [info.name]: v });
    //console.log(v, "check1");
  };

  const onSearchJournal = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !addSearch.ddl_ledger &&
      !addSearch.txt_voucher_no &&
      !addSearch.transaction_id
   
    ) {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: {
          msg: "Please!! Select ledger or Voucher No or Trancation No ",
          msgType: "error",
        },
      });
      setLoading(false)

    } else {
    //console.log(addSearch, "sss");
    getSearchJournal(
      (list, sum) => {
        if (list.length) {
          setAccountList(list);
          setViewRes("visible");
          setJournalSum(sum);
          setLoading(false);
        } else {
          setJournalSum(0);
          setViewRes("visible");
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Journal not found": "info" },
          });
        }
      },
      (err) => {
        setAccountList([]);
        setViewRes("visible");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      addSearch
    );

    getAllJournal(
      (r, amt) => {
        setJournal(r);
        setLoading(false);
        setJournalSum(amt);
      },
      (err) => {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      addSearch
    );
    }
  };
  //console.log(accountList, "searched list");
  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };

  const headerData = [
    {
      id: "ledID",
      label: "#",
      align: "left",
    },
    {
      id: "ledDate",
      label: "Date",
      align: "left",
    },
    {
      id: "ledVoucherNo",
      label: "Voucher No",
      align: "left",
    },
    {
      id: "transaction_id",
      label: "Invoice/GRN No",
      align: "center",
    },

    {
      id: "ledJournal",
      label: "Ledger",
      align: "right",
    },
    {
      id: "ledAmount",
      label: "Amount (Rs) ",
      align: "right",
    },

    {
      id: "ledAction",
      label: "Action",
      align: "right",
    },
  ];

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onClickRefresh = () => {
    setRefresh(!refresh);
    setAddSearch({
      transaction_id: "",

      txt_voucher_no: "",
      ddl_ledger: "",
      txt_to_date: currentDate(),
      txt_from_date: currentDate1(),
    });
  };

  const classes = useStyles();


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Journal List Report']);
    const periodRow = worksheet.addRow(['Period:']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:F${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:F${periodRow.number}`);
  
    const headers = [
      'Sl No',
      'Date',
      'Voucher No',
      'GRN No',
      'Ledger',      
      'Amount',
      
      

    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const JournalTable = accountList.map((Payment) => {
      return {
        ID: Payment.ledID,
        Date: Payment.ledDate,
        VoucherNo: Payment.ledVoucherNo,
        Grn_no: Payment.transaction_id,
        Ledger: Payment.ledJournal,
        Amount: Payment.ledAmount,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    JournalTable.forEach((data) => {
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

    const ledger = addSearch?.ddl_ledger?.label ? addSearch?.ddl_ledger?.label : " - " ;

    // periodCell.value = `       Period:  ${chosenPeriod} 
    // ledger : ${ledger} `;

    if (addSearch?.ddl_ledger) {
      periodCell.value = `Ledger: ${ledger}       Period: ${chosenPeriod}`;
  } else {
      periodCell.value = ` Period: ${chosenPeriod}`;
  }
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Journal List.xlsx');
  };



  const onClickCollaps = () => {
    collapsible ? setCollapsible(false) : setCollapsible(true);
  };

  const onClickView = (e) => {
    //console.log(e)
    setClassicModal(true)
    setRowInfo(e)
    setJournalDetails(e.journal_details)
    //console.log(e.journal_details, "check2")

    e.journal_details.map((res, i) => {
      dr = res.dr_cr === 1 ? res.amount : 0;
      drTotal = drTotal + Number(dr);
      setDrTotal(drTotal);

      cr = res.dr_cr === 2 ? res.amount : 0;
      crTotal = crTotal + Number(cr);
      setCrTotal(crTotal);
    })
  }

  const onClickDelete = (e,next) => {
    //console.log(e, "jd:")

    deleteJournal(
      e,
      user_id,
      (r) => {
        next()
        setAccountList([]);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Deleted 🚮", msgType: "success" },
        });
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    )
  }
  //console.log(DrTotal, CrTotal, "check2")
  return (
    <ThemeProvider theme={theme}>
      <PageHeader
        title="Sales > Journal"
        addBtnLink="/admin/account/add-journal"
        btnToolTip="Add Journal"
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle="Search Journal List"
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon
          >
            {collapsible ? (
              <Paper elevation="0" className={classes.searchBar}>
                <GridContainer justifyContent="flex-start" alignItems="center">
                  <GridItem xs="3">
                    <InputLabel id="label">Voucher No</InputLabel>
                    <TextField
                      size="small"
                      type="search"
                      placeholder="Voucher No"
                      name="txt_voucher_no"
                      onChange={onAddSearch}
                      id="outlined-basic"
                      fullWidth={true}
                      value={addSearch.txt_voucher_no}
                      variant="outlined"
                    />
                  </GridItem>

                  <GridItem xs="3">
                    <InputLabel id="label">Invoice/GRN No</InputLabel>
                    <TextField
                      size="small"
                      type="search"
                      placeholder="Invoice/GRN No"
                      name="transaction_id"
                      onChange={onAddSearch}
                      id="outlined-basic"
                      fullWidth={true}
                      value={addSearch.transaction_id}
                      variant="outlined"
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
                      defaultValue={currentDate1()}
                      value={addSearch.txt_from_date}
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
                    <TextField
                      name="txt_to_date"
                      size="small"
                      id="date"
                      variant="outlined"
                      type="date"
                      fullWidth={true}
                      defaultValue={currentDate()}
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
                    <InputLabel id="label">Ledger</InputLabel>
                    <ReactSelect
                      name="ddl_ledger"
                      options={ledgerAccounts.sort(sortWord("label"))}
                      menuPortalTarget={document.body}
                      formatGroupLabel={(d) => d.label}
                      className={classes.customSelect}
                      styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                      onChange={(v, info) => onSelect(info, v)}
                      value={addSearch.ddl_ledger}
                    />
                  </GridItem>

                  <GridItem xs="12">
                    <div className={classes.searchbtnRight}>
                      <CustomButton
                        style={{ marginRight: "10px" }}
                        onClick={onSearchJournal}
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
            ) : (
              ""
            )}
          </CustomCard>
        </GridItem>
      </GridContainer>
      {loading ? (
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
                <GridContainer justifyContent="space-between" alignItems="center">
                  <GridItem>
                    <h4 className={classes1.headerCdTitle}>Journal Details</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? ( 
                  <GridItem style={{ cursor: "pointer" ,display: "none" }}>
                    <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel(accountList)}
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
                      onClick={() => onhandleExportToExcel(accountList)}
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
                <MuiTable
                  columns={headerData}
                  rows={accountList}
                  footer={currencyFormate(journalSum)}
                  footerColIndex={1}
                  onClickViewOne={onClickView}
                  onClickDelete={onClickDelete}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )}

      <MasterModelForView
        classicModal={classicModal}
        viewHeader="Journal View"
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModal(false);
        }}
      >
        <JournalView
          row={rowInfo}
          journalDetails={journalDetails}
          DrTotal={DrTotal}
          CrTotal={CrTotal}
        />
      </MasterModelForView>
    </ThemeProvider>
  );
};

export default JournalPage;


// import GridContainer from "components/Grid/GridContainer";
// import GridItem from "components/Grid/GridItem";
// import Select from "@material-ui/core/Select";
// import MuiTable from "../../Components/MuITable";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "components/CustomButtons/Button.js";
// import MasterModel from "../../Components/MasterModel";
// import { CustomCard } from "../../Components/CustomCard";
// import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";

// import {
//   getAllJournal,
//   getSearchJournal,
// } from "../../../services/journalService";
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
// import { ThemeProvider, Box, Grid } from "@material-ui/core";
// import CircularProgress from "@material-ui/core/CircularProgress";

// import ReactSelect from "react-select";
// import SearchIcon from "@mui/icons-material/Search";
// import RotateLeftIcon from "@mui/icons-material/RotateLeft";
// import { Autocomplete } from "@material-ui/lab";
// import { IconButton, OutlinedInput } from "@material-ui/core";
// import Menu from "@material-ui/core/Menu";
// import theme from "../../../theme/theme";
// //import { getAllLedgerGroup } from "../../../services/LedgerAccountService";
// import { getListLedgerAccount } from "../../../services/LedgerAccountService";

// import { useStateValue } from "../../../context/context";
// import { actionTypes } from "../../../context/reducer";

// import { currencyFormate, currentDate1 } from "../HelperComponent/utils";
// // import React from "react";
// import {
//   appDefaultColor,
//   appSecondColor,
//   whiteColor,
// } from "assets/jss/material-dashboard-pro-react";
// import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
// import { useHistory } from "react-router-dom";
// import CardLinkButton from "views/Components/CardLinkButton";
// import React, { useState } from "react";
// import PageTitle from "../HelperComponent/PageTitle";
// import { appFontWeight } from "assets/jss/material-dashboard-pro-react";
// import { PageHeader } from "../HelperComponent/PageTitle";
// import { currentDate } from "../HelperComponent/utils";
// import { sortWord } from "../HelperComponent/utils";

// //Tables
// import { appFontWeightThin } from "assets/jss/material-dashboard-pro-react";
// import { withStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardBody from "components/Card/CardBody.js";
// import Tooltip from "@material-ui/core/Tooltip";
// import clxs from "classnames";
// import FileSaver from "file-saver";
// import XLSX from "xlsx";
// const useStyles1 = makeStyles(styles);
// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: "#fff",
//     color: appSecondColor,
//     padding: "6px 5px",
//     fontWeight: appFontWeight,
//     fontFamily: appDefaultFamily,
//     fontSize: "14px",
//   },
//   body: {
//     color: appSecondColor,
//     padding: "0px 5px",
//     fontWeight: appFontWeightThin,
//     fontFamily: appDefaultFamily,
//     fontSize: "12.6px",
//     borderBottom: "1px solid rgba(224, 224, 224, 1)",
//   },
//   customSelect: {
//     marginBottom: 15,
//   },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     height: 40,
//     "&:hover": {
//       backgroundColor: "rgba(43,43, 43, 0.03)",
//     },
//     "&:nth-of-type(odd)": {},
//   },
// }))(TableRow);
// // const [value, setValue] = React.useState([null, null]);

// const useStyles = makeStyles((theme) => ({
//   root: {
//     switchBtn: {
//       width: 180,
//       height: "100%",
//     },
//   },
//   dateField: {
//     [theme.breakpoints.up("md")]: {
//       marginTop: "25px",
//     },
//   },
//   salesExcutive: {
//     width: "20px",
//   },

//   searchBar: {
//     padding: "10px",
//   },
//   searchbtnRight: {
//     float: "right",
//     display: "flex",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   activeText: {
//     fontSize: "15px",
//     color: appSecondColor,
//     fontWeight: 400,
//   },
//   input: {
//     height: 40,
//     lineLight: 40,
//     padding: "0 10px",
//     marginBottom: "20px",
//   },
//   floatAddBtn: {
//     position: "fixed",
//     top: 90,
//     right: 40,
//     zIndex: 1000,
//   },
//   pageTitleBox: {
//     color: appDefaultColor,
//     // color: appSecondColor,
//     fontSize: "14px",
//     fontWeight: appFontWeight,
//     paddingLeft: "20px",
//   },
//   topHeaderTitle: {
//     backgroundColor: whiteColor,
//     height: "auto",
//     padding: "5px 20px",
//     margin: "-20px -30px 10px -30px",
//     boxShadow: "0 1px 4px 0 rgb(0 0 0 / 14%)",
//   },
//   customSelect: {
//     marginBottom: 15,
//   },
// }));

// const JournalPage = () => {
//   const classes1 = useStyles1();

//   //const [ledgerGroup, setAllLedgerGroup] = React.useState([]);
//   const [ledgerAccounts, setAllLedgerAccount] = React.useState([]);
//   const [globalState, dispatch] = useStateValue();
//   const [refresh, setRefresh] = React.useState(false);
//   const history = useHistory();
//   const [classicModal, setClassicModal] = React.useState(false);
//   const [allUnits, setAllUnits] = React.useState([]);
//   const [viewRes, setViewRes] = React.useState("hidden");
//   const [journalSum, setJournalSum] = React.useState(0);
//   const [accountList, setAccountList] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);
//   const [journal, setJournal] = React.useState({
//     txt_voucher_no: "",
//     txt_voucher_date: currentDate(),
//     // ddl_ledger: "",
//     // ddl_mode: "",
//     // txt_reference: "",
//     txt_narration: "",
//     txt_amount: "",
//   });
//   const [addSearch, setAddSearch] = React.useState({
//     ddl_ledger: "",
//     category: "",
//     brand: "",
//     item: "",
//     txt_from_date: currentDate1(),
//     txt_to_date: currentDate(),
//   });
//   const [collapsible, setCollapsible] = React.useState(true);
//   const fetchData = () => {
//     getListLedgerAccount(
//       (r) => {
//         setAllLedgerAccount(r);
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
//     // setLoading(true);
//   }, []);

//   const onSelect = (info, v) => {
//     setAddSearch({ ...addSearch, [info.name]: v });
//     //console.log(v, "check1");
//   };

//   const onSearchJournal = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     //console.log(addSearch, "sss");
//     getSearchJournal(
//       (list, sum) => {
//         if (list.length) {
//           setAccountList(list);
//           setViewRes("visible");
//           setJournalSum(sum);
//           setLoading(false);
//         } else {
//           setJournalSum(0);
//           setViewRes("visible");
//           setLoading(false);
//           dispatch({
//             type: actionTypes.SET_OPEN_MSG,
//             payload: { msg: err, "Journal not found": "info" },
//           });
//         }
//       },
//       (err) => {
//         setAccountList([]);
//         setViewRes("visible");
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//         setLoading(false);
//       },
//       addSearch
//     );

//     getAllJournal(
//       (r, amt) => {
//         setJournal(r);
//         setLoading(false);
//         setJournalSum(amt);
//       },
//       (err) => {
//         setLoading(false);
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       },
//       addSearch
//     );
//   };
//   //console.log(accountList, "searched list");
//   const onSetActive = (e) => {
//     setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
//   };

//   const headerData = [
//     {
//       id: "ledID",
//       label: "#",
//       align: "left",
//     },
//     {
//       id: "ledDate",
//       label: "Date",
//       align: "left",
//     },
//     {
//       id: "ledVoucherNo",
//       label: "Voucher No",
//       align: "left",
//     },
//     {
//       id: "transaction_id",
//       label: "Invoice/GRN No",
//       align: "center",
//     },

//     {
//       id: "ledJournal",
//       label: "Ledger",
//       align: "right",
//     },
//     {
//       id: "ledAmount",
//       label: "Amount (Rs) ",
//       align: "right",
//     },

//     {
//       id: "ledAction",
//       label: "Action",
//       align: "right",
//     },
//   ];

//   const onAddSearch = (e) => {
//     const { name, value } = e.target;
//     setAddSearch((prv) => ({ ...prv, [name]: value }));
//   };

//   const onClickRefresh = () => {
//     setRefresh(!refresh);
//     setAddSearch({
//       transaction_id: "",

//       txt_voucher_no: "",
//       ddl_ledger: "",
//       txt_to_date: currentDate(),
//       txt_from_date: currentDate1(),
//     });
//   };

//   const classes = useStyles();

//   // export to excel

//   const onhandleExportToExcel = () => {
//     const JournalTable = accountList.map((Payment) => {
//       return {
//         ID: Payment.ledID,
//         Date: Payment.ledDate,
//         VoucherNo: Payment.ledVoucherNo,
//         Ledger: Payment.ledJournal,

//         Amount: Payment.ledAmount,

//         Action: "",
//       };
//     });

//     const fileName = "Journal List";
//     const fileType =
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//     const fileExtension = ".xlsx";
//     const ws = XLSX.utils.json_to_sheet(JournalTable);
//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);
//   };

//   const onClickCollaps = () => {
//     collapsible ? setCollapsible(false) : setCollapsible(true);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <PageHeader
//         title="Sales > Journal"
//         addBtnLink="/admin/account/add-journal"
//         btnToolTip="Add Journal"
//       />

//       <GridContainer>
//         <GridItem xs="12">
//           <CustomCard
//             cdTitle="Search Journal List"
//             btnToolTip={collapsible ? "Collaps" : "Expand"}
//             onClickCollapsible={onClickCollaps}
//             buttonAction={collapsible}
//             filterIcon
//           >
//             {collapsible ? (
//               <Paper elevation="0" className={classes.searchBar}>
//                 <GridContainer justifyContent="flex-start" alignItems="center">
//                   <GridItem xs="3">
//                     <InputLabel id="label">Voucher No</InputLabel>
//                     <TextField
//                       size="small"
//                       type="search"
//                       placeholder="Voucher No"
//                       name="txt_voucher_no"
//                       onChange={onAddSearch}
//                       id="outlined-basic"
//                       fullWidth={true}
//                       value={addSearch.txt_voucher_no}
//                       variant="outlined"
//                     />
//                   </GridItem>

//                   <GridItem xs="3">
//                     <InputLabel id="label">Invoice/GRN No</InputLabel>
//                     <TextField
//                       size="small"
//                       type="search"
//                       placeholder="Invoice/GRN No"
//                       name="transaction_id"
//                       onChange={onAddSearch}
//                       id="outlined-basic"
//                       fullWidth={true}
//                       value={addSearch.transaction_id}
//                       variant="outlined"
//                     />
//                   </GridItem>

//                   <GridItem xs="2">
//                     <InputLabel id="label">Date Between</InputLabel>

//                     <TextField
//                       name="txt_from_date"
//                       size="small"
//                       id="date"
//                       variant="outlined"
//                       type="date"
//                       fullWidth={true}
//                       defaultValue={currentDate1()}
//                       value={addSearch.txt_from_date}
//                       onChange={onAddSearch}
//                       // className={classes.dateField}
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                     />
//                   </GridItem>
//                   <GridItem xs="2">
//                     <TextField
//                       name="txt_to_date"
//                       size="small"
//                       id="date"
//                       variant="outlined"
//                       type="date"
//                       fullWidth={true}
//                       defaultValue={currentDate()}
//                       value={addSearch.txt_to_date}
//                       onChange={onAddSearch}
//                       className={classes.dateField}
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                     />
//                   </GridItem>
//                   <GridItem xs="5">
//                     <InputLabel id="label">Ledger</InputLabel>
//                     <ReactSelect
//                       name="ddl_ledger"
//                       options={ledgerAccounts.sort(sortWord("label"))}
//                       menuPortalTarget={document.body}
//                       formatGroupLabel={(d) => d.label}
//                       className={classes.customSelect}
//                       onChange={(v, info) => onSelect(info, v)}
//                       value={addSearch.ddl_ledger}
//                     />
//                   </GridItem>

//                   <GridItem xs="12">
//                     <div className={classes.searchbtnRight}>
//                       <CustomButton
//                         style={{ marginRight: "10px" }}
//                         onClick={onSearchJournal}
//                       >
//                         <SearchIcon />
//                       </CustomButton>
//                       <CustomButton onClick={onClickRefresh}>
//                         <RotateLeftIcon />
//                       </CustomButton>
//                     </div>
//                   </GridItem>
//                 </GridContainer>
//               </Paper>
//             ) : (
//               ""
//             )}
//           </CustomCard>
//         </GridItem>
//       </GridContainer>
//       {loading ? (
//             <Box mt={10} width="100%" textAlign="center">
//               <CircularProgress />
//             </Box>
//           ) : (
//       <GridContainer className={classes.root} style={{ visibility: viewRes }}>
//         <GridItem xs="12">
//           <Card className={classes1.headerCard}>
//             <CardHeader
//               className={classes1.TbheaderCdhd}
//               style={{ height: 60 }}
//             >
//               <GridContainer justifyContent="space-between" alignItems="center">
//                 <GridItem>
//                   <h4 className={classes1.headerCdTitle}>Journal Details</h4>
//                 </GridItem>
//                 <GridItem style={{ cursor: "pointer" }}>
//                   <IconButton
//                     variant="text"
//                     onClick={() => onhandleExportToExcel(accountList)}
//                   >
//                     <Tooltip title="Export to Excel">
//                       <img
//                         src={require("../../../assets/img/excel.png").default}
//                       />
//                     </Tooltip>
//                   </IconButton>
//                 </GridItem>
//               </GridContainer>
//             </CardHeader>
//             <CardBody
//               style={{ height: "auto", maxHeight: 480, padding: 10 }}
//               className={clxs(classes.customScroolBar)}
//             >
//               <MuiTable
//                 columns={headerData}
//                 rows={accountList}
//                 footer={currencyFormate(journalSum)}
//                 footerColIndex={1}
//               />
//             </CardBody>
//           </Card>
//         </GridItem>
//       </GridContainer>
//           )}

//     </ThemeProvider>
//   );
// };

// export default JournalPage;
