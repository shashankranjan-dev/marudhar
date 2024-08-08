import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import { LedgerBalanceRowData } from "../../../services/ledgerBalanceService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Paper, Box,Grid } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import ReactSelect from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
// import InvoicePreview from "./InvoicePreview";
import { getAllLedgerAccount  } from "../../../services/taxMasterService";
import { getLedgerOpeningAndClosingBalance } from "../../../services/accountLedgerService"
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import {
  currencyFormate, 
} from "../HelperComponent/utils";
import { currentDate, currentDate1 } from "../HelperComponent/utils";

import theme from "../../../theme/theme";

// import React from "react";
import {
  appFontWeight,
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";

import { withStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CircularProgress from "@material-ui/core/CircularProgress";

import pdfIcon from "../../../assets/img/pdf-icon.png"
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
const ExcelJS = require('exceljs');


const useStyles1 = makeStyles(styles);
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
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "25px",
    },
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
    lineHeight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
  customSelect: {
    marginBottom: 15,
  },
  customSelect1: {
    marginBottom: -20,
  },
}));

const LedgerBalancePage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allUnits, setAllUnits] = React.useState([]);
  const [globalState, dispatch] = useStateValue(); 
  const [refresh, setRefresh] = React.useState(false);

  const [addSearch, setAddSearch] = React.useState({
    ddl_ledger_account: "",
    txt_from_date:currentDate1(),
    txt_to_date: currentDate(),
  });
  const [loading, setLoading] = React.useState(false);

  const [ledgerAccount, setAllLedgerAccount] = React.useState([]);
  const [ledgerAccountOpt, setAllLedgerAccountOpt] = React.useState([]);
  const [allLedgerBalanceData, setAllLedgerBalanceData] = React.useState([]);
  const [collapsible, setCollapsible] = React.useState(true)
  const [addUnit, setAddUnit] = React.useState({
    active: false,
    higher: {
      unit: "",
      value: "",
    },
    lower: {
      unit: "",
      value: "",
    },
    caption: "",
  });

  const [ledgerPdf, setAllledgerPdf] = React.useState([]);
  const [searchPdf, setAllSearchListPdf] = React.useState([])

  React.useEffect(() => {
    fetchData();

    setAllUnits(LedgerBalanceRowData);
  }, []);

  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };
  const fetchData = () => {
    getAllLedgerAccount(
      (allLedgerAcc, allLedgerAccOpt) => {
        //setAllLedgerAccount(allLedgerAcc);
        setAllLedgerAccountOpt(allLedgerAccOpt);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
    );

    
  };
  const headerData = [
    {
      id: "ledger_account",
      label: "Ledger",
      align: "left",
    },
    {
      id: "opening_balance",
      label: "Opening Balance",
      align: "right",
    },
    {
      id: "initial_dr_cr",
      label: "Dr / Cr",
      align: "center",
    },
    {
      id: "closing_balance",
      label: "Closing Balance",
      align: "right",
    },
    {
      id: "dr_cr_status",
      label: "Dr / Cr",
      align: "center",
    },
  ];


  const headerDataPdf = [[ "Ledger", "Opening Balance","dr/Cr", "Closing Balance", "Dr/Cr"]];
  const searchData = [[
   
    addSearch?.ddl_ledger_account ? `Ledger Account: ${addSearch?.ddl_ledger_account?.label}`: '',
    addSearch?.txt_from_date ? `From Date: ${(addSearch?.txt_from_date)}` : '',
    addSearch?.txt_to_date ? `To Date: ${(addSearch?.txt_to_date)}` : '',
 

  ]]

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onHigherValueChange = (e) => {
    // const { value, name } = e.target;
    // setAddUnit({ ...addUnit, higher: { [name]: value } });
  };
  const onLowerValueChange = (e) => {
    // const { value, name } = e.target;
    // setAddUnit({ ...addUnit, lower: { ...lower, [name]: value } });
  };

  const onCaptionChange = (e) => {
    const { value, name } = e.target;
    setAddUnit({ ...addUnit, caption: value });
  };

  const classes = useStyles();

  const onClickPrint = () => {
    setClassicModal(true);
  };

  const onSearchItem = (e) => {
    e.preventDefault();
    if (!addSearch.ddl_ledger_account ) {
      
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Please select  Ledger Account before searching", msgType: "error" },
      });
      return; 
    }
    setLoading(true);

   // console.log("adsear", addSearch);

    getLedgerOpeningAndClosingBalance(
      (items, pdf) => {
        setAllLedgerAccount(items);
        setAllledgerPdf(pdf)

    setLoading(false);

      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
    setLoading(false);

      },
      addSearch
    );
  };

  const onSelect = (info, v) => {
    setAddSearch({ ...addSearch, 
      [info.name]: v });
  };

  const onClickRefresh = () => {
    setRefresh(!refresh);
    setAddSearch({
   
      ddl_ledger_account: "",
      ddl_ledger_account_id: "",
      txt_from_date:currentDate1(),
      txt_to_date: currentDate(),

    });
  };

  const onClickCollaps = () => {
    collapsible ?
      setCollapsible(false)
      :
      setCollapsible(true)
  }

 //pdf
 const onClickPdf = (e) => {
  e.preventDefault();
  // console.log(ledgerPdf,"sank1911")
  // console.log(bodydata,"body");
  let doc = new jsPDF("landscape", 'pt', 'A4');
  autoTable(doc, {
    head: searchData,
    body: searchPdf,
    didDrawCell: (ledgerPdf) => {
      // console.log(ledgerPdf.column.index)
    },
  })
  autoTable(doc, {
  
    head: headerDataPdf,
    body: ledgerPdf,
    didDrawCell: (ledgerPdf) => {
      // console.log(ledgerPdf.column.index,"diddrawcell")
    },
  })
  doc.save(`LedgerBalance${currentDate()}.pdf`);
  // doc.html(document.getElementById('pdf-view'), {
  //   callback: () => {
  //     doc.save(`LedgerBalance${currentDate()}.pdf`);
  //   }
  // });
  // setClassicModal(true);
};


const onhandleExportToExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('data');

  const titleRow = worksheet.addRow(['Report Name : ledger Balance Report']);
  const periodRow = worksheet.addRow(['Period:']);
  worksheet.addRow([]);

  const titleCell = titleRow.getCell(1);
  const periodCell = periodRow.getCell(1);
  titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };

  worksheet.mergeCells(`A${titleRow.number}:E${titleRow.number}`);
  worksheet.mergeCells(`A${periodRow.number}:E${periodRow.number}`);

  const headers = [
  
    'Ledger',
    'Opening Balance',
    'Dr Cr',
    'Closing Balance',
    'Closing Dr Cr',
    
    
    

  ];

  // Add headers as a row
  worksheet.addRow(headers);

  const ledgerAccountTable = ledgerAccount.map((item) => {
    return {
      Ledger : item.ledger_account,
      opening_balance : item.opening_balance,
      Dr_Cr : item.dr_cr_status,
      Closing_Balance : item.closing_balance,
      Closing_Dr_Cr : item.initial_dr_cr
    };
  });

  const dataStartRow = 4;

  const headerRow = worksheet.getRow(dataStartRow);
  headerRow.height = 20;

  headers.forEach((header, index) => {
    const column = worksheet.getColumn(index + 1);
    column.width = header.length + 5;
  });

  ledgerAccountTable.forEach((data) => {
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
 
  const ledger = addSearch?.ddl_ledger_account?.label ? addSearch?.ddl_ledger_account?.label : " - " ;

  periodCell.value = `Customer: ${ledger}       Period:  ${chosenPeriod}   `;

  const buffer = await workbook.xlsx.writeBuffer();
  const data = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });
  saveAs(data, 'ledger Balance .xlsx');
};

 // export to excel
//  const onhandleExportToExcel = () => {
//   const ledgerAccountTable = ledgerAccount.map((item) => {
//     return {
//       Ledger : item.ledger_account,
//       opening_balance : item.opening_balance,
//       Dr_Cr : item.dr_cr_status,
//       Closing_Balance : item.closing_balance,
//       Closing_Dr_Cr : item.initial_dr_cr
//     };
//   });

//   const fileName = "Ledger Balance Page";
//   const fileType =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   const fileExtension = ".xlsx";
//   const ws = XLSX.utils.json_to_sheet(ledgerAccountTable);
//   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//   const data = new Blob([excelBuffer], { type: fileType });
//   FileSaver.saveAs(data, fileName + fileExtension);
// };

  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="MIS Report > Ledger Balance " />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Ledger Balance" 
           btnToolTip={collapsible?"Collaps":"Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
          filterIcon>
          
          {
              collapsible ?
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="flex-start" alignItems="center">
                <GridItem xs="4">
                  <InputLabel id="label">Ledger Account</InputLabel>
                  <ReactSelect
                    options={ledgerAccountOpt}
                    placeholder="Select"
                    name="ddl_ledger_account"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    className={classes.customSelect}
                    styles={reactSelectStyles}

                    onChange={(v, info) => onSelect(info, v)}
                  value={addSearch.ddl_ledger_account}
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
                    defaultValue={currentDate1()}
                    onChange={onAddSearch}
                    inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                  />
                </GridItem>
                <GridItem xs="2" >
                  <TextField
                    name="txt_to_date"
                    size="small"
                    id="date"
                    variant="outlined"
                    type="date"
                    fullWidth={true}
                    className={classes.customSelect1}

                    value={addSearch.txt_to_date}
                    defaultValue={currentDate()}
                    onChange={onAddSearch}
                    inputProps={{
                          shrink: true,
                          min: `${(localStorage.financial)?.split("-")[0]}-04-01`,
                          max: `${(localStorage.financial)?.split("-")[1]}-03-31`,
                        }}
                  />
                </GridItem>

                <GridItem xs="2">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 2,
                    }}
                  >
                    <CustomButton
                      type="submit"
                      onClick={onSearchItem}
                      name="btn_search"
                      style={{ marginRight: "10px" }}
                    >
                      <SearchIcon />
                    </CustomButton>
                    <CustomButton name="btn_refres"onClick={onClickRefresh}>
                      <RotateLeftIcon />
                    </CustomButton>
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer
                justifyContent="flex-start"
                alignItems="center"
              ></GridContainer>
            </Paper>
            :''}
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root}>
        <GridItem xs="12">
        {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
        <Card className={classes1.headerCard}>

        <CardHeader className={classes1.TbheaderCdhd} style={{ height: 60 }}>
              <GridContainer justifyContent="space-between" alignItems="center">
                <GridItem>
                  <h4 className={classes1.headerCdTitle}>Ledger Balance List</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer" ,display: "none"  }}>
                  {/* ////////////////////////////PDF/////////////////// */}
                   <IconButton onClick={onClickPdf}>

                     <Tooltip title="Export to PDF">
                      <img src={pdfIcon} style={{ width: 20 }} />

                     </Tooltip>
                   </IconButton>
                  
            
                     <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel(ledgerAccount)}
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
                  {/* ////////////////////////////PDF/////////////////// */}
                   <IconButton onClick={onClickPdf}>

                     <Tooltip title="Export to PDF">
                      <img src={pdfIcon} style={{ width: 20 }} />

                     </Tooltip>
                   </IconButton>
                  
            
                     <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel(ledgerAccount)}
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
          {/* <CustomCard cdTitle="Ledger Balance List" height="auto"> */}
            <MuiTable
              columns={headerData}
              rows={ledgerAccount}
              onClickPrint={onClickPrint}
            
            />

            <Box pt={1} >           
                <GridContainer>

                  <Grid item xs={2}>
                    <Box className={classes.tableLabel} textAlign="right">
                     <b> Total</b>
                    </Box>
                  </Grid> 
                  <Grid item xs={3}>
                     <Box className={classes.tableLabel} textAlign="right">
                     
                      </Box>
                    </Grid>  
                    <Grid item xs={1}>
                        <Box
                          className={classes.tableLabel}
                          textAlign="left"                        
                        >
                          
                        </Box>
                      </Grid>   


                    <Grid item xs={2}>
                     <Box className={classes.tableLabel} mr={10}  textAlign="right">
                     {ledgerAccount.length
                        ? currencyFormate(
                          ledgerAccount.reduce(
                              (sum, li) => Number(sum) + Number(li.opening_balance),
                              0
                            )
                          )
                        : ""}
                      </Box>
                    </Grid>

                    <Grid item xs={1}>
                        <Box
                          className={classes.tableLabel}
                          textAlign="left" 
                                                
                        >
                          
                        </Box>
                      </Grid>

                    <Grid item xs={2}>
                     <Box className={classes.tableLabel} mr={10} textAlign="right">
                      {ledgerAccount.length
                        ? currencyFormate(
                          ledgerAccount.reduce(
                              (sum, li) => Number(sum) + Number(li.closing_balance),
                              0
                            )
                          )
                        : ""}
                      </Box>
                    </Grid>     
                </GridContainer>

            
              </Box>
              </CardBody>
              </Card>
          )}
          {/* </CustomCard> */}
        </GridItem>
      </GridContainer>

      <MasterModel
        // classicModal={classicModal}
        // onCloseModel={(e) => {
        //   e.preventDefault();
        //   setClassicModal(false);
        // }}
        height="auto"
        okBtnText="Pdf"
        modelName="Ledger Balance"
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
          }}>
          <div style={{textAlign:"center",borderBottom:"1px solid",width:"72%"}} ><h4>Ledger Balance</h4></div>

          {
            addSearch ?
              <GridContainer style={{ margin: 2 }}>
                <GridItem>
                  {addSearch?.ddl_ledger_account ? `Ledger Account: ${addSearch?.ddl_ledger_account?.label}`: ''}
                </GridItem>
                <GridItem >
                  {addSearch?.txt_from_date ? `From Date: ${addSearch?.txt_from_date}` : ''}
                </GridItem>
                <GridItem >
                  {addSearch?.txt_to_date ? `To Date: ${addSearch?.txt_to_date}` : ''}
                </GridItem>
              </GridContainer>
              : ''
          }

          <TableContainer>
            <GridContainer style={{ height: "auto", padding: 12, width: 830, margin: 2 }}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead >
                  <TableRow>
                    <StyledTableCell align="left">Ledger</StyledTableCell>
                    <StyledTableCell align="left">Opening Balance</StyledTableCell>
                    <StyledTableCell align="left">Dr / Cr</StyledTableCell>
                    <StyledTableCell align="left">Closing Balance</StyledTableCell>
                    <StyledTableCell align="left"> Dr / Cr</StyledTableCell>
                  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {console.log(purchaseRegisterList, "sankha51")} */}

                  {ledgerAccount.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="left" className={classes.id}>
                        {row.ledger_account}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.bill_date}>
                        {row.opening_balance}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.txt_bill_no}>




                        {row.initial_dr_cr}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.ddl_vendor}>
                        {row.closing_balanc}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.grossamount}
                      >
                        {row.dr_cr_status}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </GridContainer>
          </TableContainer>

        </div>
      </MasterModel>
    </ThemeProvider>
  );
};

export default LedgerBalancePage;
