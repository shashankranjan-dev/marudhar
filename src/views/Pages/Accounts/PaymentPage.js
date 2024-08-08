import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import {
  getSearchPayment,
  getAllPayment,
  postPayment,
  postPaymentAdj,
  updatePayment,
  deletePayment,
  getLedgerClosingBalance,
  editLedgerStorage,
} from "../../../services/paymentService";
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


import ReactSelect from "react-select";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import theme from "../../../theme/theme";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import StepProceedModel from "../HelperComponent/StepProceedModel";
import { currencyFormate } from "../HelperComponent/utils";

// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import {
  getListLedgerAccount,
  getListLedgerAccountByGroupId,
} from "../../../services/LedgerAccountService";
import {
  getAllGroup,
  getAllReference,
  postCustomerForm,
  updateCustomer,
} from "../../../services/customerListService";
import FormComponent from "views/Pages/HelperComponent/FormComponent";

import {
  appDefaultFamily,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../HelperComponent/PageTitle";
import {
  currentDate,
  dateFormateField,
  dateFormate,
  currentDate1,
} from "../HelperComponent/utils";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from 'file-saver';
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

const PaymentPage = () => {
  const classes1 = useStyles1()
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allUnits, setAllUnits] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [ledgerAccount, setAllLedgerAccount] = React.useState([]);
  const [allReference, setAllReference] = React.useState([]);
  const [allPayment, setAllPayment] = React.useState([]);
  const [totalPaymentAmount, setTotalPaymentAmount] = React.useState(0);
  const [successModal, setSuccessModal] = React.useState(false);
  const [viewRes, setViewRes] = React.useState("hidden");
  const [bankLedgerEnabled, setBankLedgerEnabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [collapsible, setCollapsible] = React.useState(true)
  const [ledgerAccAmount, setLedgerAccAmount] = React.useState({});
  const [bankAccount, setAllBankAccount] = React.useState([]);
  const user_id = globalState?.user?.serial_id;
  const [payment, setPayment] = React.useState({
    edit: false,
    receipt_payment_id: "",
    txt_voucher_no: "AUTO GENERATED",
    txt_voucher_date: currentDate(),
    ddl_ledger: "",
    ddl_ledger_label: "Select",

    ddl_mode: "",
    ddl_mode_label: "Select",

    txt_reference: "",
    txt_nar: "",
    txt_amount: "",
  });
  const [paymentAdj, setPaymentAdj] = React.useState({
    edit: false,
    receipt_payment_id: "",
    txt_voucher_no: "AUTO GENERATED",
    txt_voucher_date: currentDate(),
    ddl_ledger: "",
    ddl_ledger_label: "Select",

    ddl_mode: "",
    ddl_mode_label: "Select",

    txt_reference: "",
    txt_nar: "",
    txt_amount: "",
    txt_adjamount: "",
  });
  const [addSearch, setAddSearch] = React.useState({
    txt_voucher_no: "",
    ddl_ledger: "",
    category: "",
    brand: "",
    item: "",
    txt_from_date: currentDate1(),
    txt_to_date: currentDate(),
  });

  const [previousData, setPreviousData] = React.useState([])

  // for Error handler state
  const [error, setError] = React.useState({
    ddl_mode: false,
    ddl_ledger: false,
  });

  const onSelectDetails = (name, v) => {
    //console.log(name, v, "sen2504");
    switch (name) {
      case "ddl_ledger":
        setPayment({
          ...payment,
          ddl_ledger: v.value,
          ddl_ledger_label: v.label,
        });
        setPaymentAdj({
          ...paymentAdj,
          ddl_ledger: v.value,
          ddl_ledger_label: v.label,
        });
        getLedgerClosingBalance(
          (clsBalance) => {
            if (clsBalance.length > 0) {
              // setOpeningBalance({
              //   opening: clsBalance[0].closing_balance,
              //   dr_cr_status: clsBalance[0].dr_cr_status,
              // });
              setLedgerAccAmount({
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
            ddl_ledger_account: v,
            txt_from_date: "2021-04-01",
            txt_to_date: currentDate1(-1),
          }
        );

        break;
      case "ddl_mode":
        setPayment({
          ...payment,
          ddl_mode: v.value,
          ddl_mode_label: v.label,
        });
        if (v.label === "Bank") setBankLedgerEnabled(true);
        else setBankLedgerEnabled(false);
        break;

      case "ddl_bank":
        setPayment({
          ...payment,
          ddl_bank: v.value,
          ddl_bank_label: v.label,
          bank_id: v.value,
        });

        break;
      default:
        break;
    }
  };
  //console.log(payment, "sen2504paymentadj");

  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    setButtonDisabled(true);

    if (!payment.ddl_mode || !payment.ddl_ledger || !payment.txt_amount) {
      setError({
        ddl_mode: !payment.ddl_mode,
        ddl_ledger: !payment.ddl_ledger,
        txt_amount: !payment.txt_amount,
      });
    } else {
      if (payment.edit) {
        editLedgerStorage(
          previousData,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: r, msgType: "success" },
            });
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        ).then(() => {
          updatePayment(
            payment,
            user_id,
            (r) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: {
                  msg: "Payment Updated Successfully",
                  msgType: "success",
                },
              });
              // setRefresh(!refresh);
              onCloseModel();
              setPayment((prv) => ({ ...prv, txt_voucher_no: r.voucher_no, edit: true }));
              setSuccessModal(true);

              // history.push("/admin/account/payment");
            },
            (err) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: { msg: err, msgType: "error" },
              });
            }
          );
        })

      } else {
        postPayment(
          payment,
          user_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Payment added Successfully",
                msgType: "success",
              },
            });

            onCloseModel();
            setPayment((prv) => ({ ...prv, txt_voucher_no: r.voucher_no }));
            setSuccessModal(true);
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
            setButtonDisabled(true);

          }
        );
        if (Number(payment.txt_adjamount) > 0) {
          postPaymentAdj(
            payment,
            user_id,
            (r) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: {
                  msg: "Payment added Successfully",
                  msgType: "success",
                },
              });

              onCloseModel();
              setPayment((prv) => ({ ...prv, txt_voucher_no: r.voucher_no }));
              setSuccessModal(true);
            },
            (err) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: { msg: err, msgType: "error" },
              });
            }
          );
        }
      }
    }
  };

  // on Delete called
  const onDeletePayment = (row, next) => {
    //console.log(row,"sencheck")
    deletePayment(
      row.receipt_payment_id,
      row,
      user_id,
      (r) => {
        next();
        setRefresh(!refresh);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };

  // on Edit called
  const onUpdatePayment = (row) => {
    // console.log(row, "sen0505/row")

    setPreviousData(row)
    if (row.payMode === 'Bank')
      setBankLedgerEnabled(true);
    else {
      setBankLedgerEnabled(false);
    }
    setClassicModal(true);

    setPayment({
      ...payment,
      edit: true,
      receipt_payment_id: row.receipt_payment_id,
      txt_voucher_no: row.payVoucherNo,
      txt_voucher_date: dateFormateField(row.payDate),
      ddl_ledger: row.payLedger,
      ddl_ledger_label: row.ledger_account_name,
      ddl_mode: row.payMode,
      ddl_mode_label: row.payMode,
      ddl_bank: bankAccount.filter(o => o.value === row.bank_id)[0]?.value,
      ddl_bank_label: bankAccount.filter(o => o.value === row.bank_id)[0]?.label,
      txt_amount: row.payAmount,
      txt_reference: row.payReference,
      txt_nar: row.payNarration,
    });
    
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    //console.log(name, value, "sen204/change")
    setPayment({ ...payment, [name]: value });
    if (name === "txt_adjamount") {
      setPaymentAdj({ ...paymentAdj, txt_amount: Number(value) })
    }
    if (name === "txt_voucher_date") {
      setPaymentAdj({ ...paymentAdj, txt_voucher_date: value })
    }
  };

  const onCloseModel = () => {
    setButtonDisabled(false);
    setClassicModal(false);
    setRefresh(!refresh);
    setError({ ddl_mode: false, ddl_ledger: false });
    setPayment({
      edit: false,
      receipt_id: "",
      txt_voucher_date: currentDate(),
      ddl_ledger: "",
      ddl_ledger_label: "Select",
      ddl_mode: "",
      ddl_mode_label: "Select",
      txt_amount: "",
      txt_adjamount: "",
      txt_reference: "",
      txt_nar: "",
    });
  };
  const fetchData = () => {
    

    getListLedgerAccountByGroupId(
      (r) => {
        //console.log(r, "sen2504");
        //setAllLedgerAccount(r);
        setAllBankAccount(r);
      },

      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      // bank group id
      58
    );
    // setLoading(true);
    getAllPayment(
      (r, amt) => {
        // setAllPayment(r);
        setTotalPaymentAmount(amt);
        setLoading(false);
      },
      (err) => {
        // setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    getAllReference(
      (r) => {
        setAllReference(r);
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
    getListLedgerAccount(
      (r) => {
        setAllLedgerAccount(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      // [54, 56]
    );
    
    fetchData();
  }, [refresh]);

  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, active: e.target.checked }));
  };

  //payment Search
  const onSearchPaymentPage = (e) => {
    setRefresh(false);
    // e.preventDefault();
    setLoading(true);

    getSearchPayment(
      (payment) => {
        if (payment.length) {
          setAllPayment(payment);
          setViewRes("visible");
          setLoading(false);
        } else {
          setViewRes("visible");
          setLoading(false);
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, "Payment  not found": "info" },
            });
          };
        }
      },
      (err) => {
        setAllPayment([]);
        setViewRes("visible");
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setLoading(false);
      },
      addSearch
    );
  };

  const onClickRefresh = () => {
    setRefresh(!refresh);
    setAddSearch({
      txt_voucher_no: "",
      ddl_ledger: "",
      category: "",
      brand: "",
      item: "",
      txt_to_date: currentDate(),
      txt_from_date: currentDate1(),
    });
  };

  const headerData = [
    {
      id: "payID",
      label: "#",
      align: "left",
    },
    {
      id: "payDate",
      label: "Date",
      align: "left",
    },
    {
      id: "payVoucherNo",
      label: "Voucher No",
      align: "left",
    },
    {
      id: "ledger_account_name",
      label: "Party",
      align: "left",
    },
    {
      id: "payMode",
      label: "Tracsaction Type",
      align: "left",
    },
    // {
    //   id: "payReference",
    //   label: "Reference",
    //   align: "left",
    // },

    {
      id: "payNarration",
      label: "Narration",
      align: "center",
    },
    {
      id: "payAmount",
      label: "Amount",
      align: "right",
    },

    {
      id: "payAction",
      label: "Action",
      align: "right",
    },
  ];

  const onSelect = (info, v) => {
    setAddSearch({ ...addSearch, [info.name]: v });
  };

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };
  const classes = useStyles();
  const formData = {
    formName: "Add Payment",
    fields: [
      {
        disabled: true,
        name: "txt_voucher_no",
        label: "Voucher No & Date",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "TextField",
        error: false,
        xs: 6,
        md: 6,
        lg: 7,
      },
      {
        name: "txt_voucher_date",

        hidden: false,
        required: false,
        data_type: "date",
        html_element: "TextField",
        xs: 6,
        md: 6,
        lg: 5,
      },

      {
        name: "ddl_ledger",
        label: "Party",
        otherLabel: ledgerAccAmount?.opening >= 0
          ? `Amount : ${currencyFormate(ledgerAccAmount.opening)} ${ledgerAccAmount.dr_cr_status
          }`
          : "",
        hidden: false,
        required: true,
        data_type: "number",
        html_element: "select",
        options: ledgerAccount,
        xs: 6,
        md: 6,
        lg: 12,
      },

      {
        name: "ddl_mode",
        label: "Mode ",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "select",

        options: [
          {
            label: "Bank",
            value: "Bank",
          },
          {
            label: "Cash",
            value: "Cash",
          },
        ],
        xs: 6,
        md: 6,
        lg: 6,
      },
      {
        name: "ddl_bank",
        label: "Bank",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "select",
        allign: "right",
        disabled: !bankLedgerEnabled,
        options: bankAccount,
        error: false,
        xs: 6,
        md: 6,
        lg: 6,
      },
      {
        name: "txt_amount",
        label: "Amount",
        hidden: false,
        required: true,
        data_type: "number",
        html_element: "TextField",
        align: "right",
        error: false,
        xs: 6,
        md: 6,
        lg: 6,
      },
      {
        name: "txt_adjamount",
        label: "Adj Amount",
        hidden: false,
        required: true,
        data_type: "number",
        html_element: "TextField",
        align: "right",
        error: false,
        xs: 6,
        md: 6,
        lg: 6,
      },
      {
        name: "txt_nar",
        label: "Narration",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "TextArea",
        error: false,
        xs: 6,
        md: 6,
        lg: 12,
      },
    ],
  };

  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Payment List Report']);
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
      'Date',
      'Voucher No',
      'party',
      'Transaction Type',
      'Narration',
      'Amount',
      
      

    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const PaymentTable = allPayment.map((Payment) => {
      return {
        ID: Payment.payID,
        Date: Payment.payDate,
        VoucherNo: Payment.payVoucherNo,
        party: Payment.ledger_account_name,
        Transaction_Type:Payment.payMode,       
        Narration: Payment.payNarration,
        Amount: Payment.payAmount,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    PaymentTable.forEach((data) => {
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
    const voucher_no = addSearch?.txt_voucher_no ? addSearch?.txt_voucher_no: " - " ;
    const ledger = addSearch?.ddl_ledger?.label ? addSearch?.ddl_ledger?.label : " - " ;

    // periodCell.value = `Voucher No: ${voucher_no}       Period:  ${chosenPeriod} 
    // ledger : ${ledger} `;


    if (addSearch?.ddl_ledger) {
      periodCell.value = `Ledger : ${ledger}  Period :  ${chosenPeriod}`;
  } else if (addSearch?.txt_voucher_no) {
      periodCell.value = `Voucher No : ${voucher_no}     Period :  ${chosenPeriod}`;
  } else {
      periodCell.value = `Period :  ${chosenPeriod}`;
  }
  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Payment List.xlsx');
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
        title="Account > Payment"
        btnToolTip="Add New Payment"
        onClickAddBtn={() => { setClassicModal(true), setButtonDisabled(false) }}
      />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Payment"
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon>
            {
              collapsible ?
                <Paper elevation="0" className={classes.searchBar}>
                  <GridContainer justifyContent="flex-start" alignItems="flex-end">
                    <GridItem xs="3">
                      <InputLabel id="label">Voucher No</InputLabel>
                      <TextField
                        size="small"
                        placeholder="Voucher No"
                        type="search"
                        name="txt_voucher_no"
                        onChange={onAddSearch}
                        id="outlined-basic"
                        fullWidth={true}
                        value={addSearch.txt_voucher_no}
                        variant="outlined"
                      />
                    </GridItem>

                    <GridItem xs="2">
                      <InputLabel id="label">Date Between</InputLabel>
                      <TextField
                        size="small"
                        name="txt_from_date"
                        variant="outlined"
                        type="date"
                        fullWidth={true}
                        defaultValue={currentDate1()}
                        onChange={onAddSearch}
                        value={addSearch.txt_from_date}
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
                        variant="outlined"
                        type="date"
                        fullWidth={true}
                        defaultValue={currentDate()}
                        onChange={onAddSearch}
                        value={addSearch.txt_to_date}
                        // className={classes.dateField}
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
                        options={ledgerAccount}
                        getOptionLabel={(option) => option.label}
                        name="ddl_ledger"
                        placeholder="Select"
                        formatGroupLabel={(d) => d.label}
                        menuPortalTarget={document.body}
                        className={classes.customSelect}
                        styles={reactSelectStyles}
                        onChange={(v, info) => onSelect(info, v)}
                        value={addSearch.ddl_ledger}

                      // onChange={(v) => onSelect("ddl_brand_id", v)}
                      // value={{
                      //   label: addSearch.ddl_brand_label,
                      //   value: addSearch.ddl_brand_id,
                      // }}
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
                          onClick={onSearchPaymentPage}
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
                : ''}
          </CustomCard>
        </GridItem>
      </GridContainer>
      <MasterModel
        classicModal={classicModal}
        onCloseModel={onCloseModel}
        width={450}
        okBtnText="Submit"
        height="auto"
        modelName={payment.edit ? "Edit Payment" : "Add New Payment"}
        onClickOk={onSubmitModel}
        // btnDisabled={buttonDisabled}

      >
        <form style={{ padding: "20px 10px", width: "100%" }}>
          <GridContainer>
            {formData.fields.map((item, key) => {
              return (
                <>
                  <FormComponent
                    menuPortal={false}
                    item={item}
                    key={key}
                    onSelect={onSelectDetails}
                    state={payment}
                    onChange={onChange}
                    error={error}
                  />
                </>
              );
            })}
          </GridContainer>
        </form>
      </MasterModel>

      <MasterModel
        classicModal={successModal}
        onCloseModel={
          () =>
            setSuccessModal(false)}
        width={600}
        closeIcon={false}
        height="auto"
        closeBtn={false}
        okbtnWith={200}
        appLogo
        modelName="Marudhar"
        okBtnText="OK"
        onClickOk={(e) => {
          e.preventDefault();
          setSuccessModal(false);
          {
            payment.edit === true ?
            onSearchPaymentPage()
            : ""
          }
          // setPayment((prv) => ({ ...prv, txt_voucher_no: "AUTO GENERATED" }));
        }}
      >
        <StepProceedModel
          step={1}
          isStep={false}
          title="Success!"
          desc="Voucher No"
          generateNo={payment.txt_voucher_no}
        />
      </MasterModel>
      {loading ? (
        <Box mt={10} width="100%" textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <GridContainer className={classes.root} style={{ visibility: viewRes }}>
          <GridItem xs="12">
            <Card className={classes1.headerCard}>
              <CardHeader className={classes1.TbheaderCdhd} style={{ height: 60 }}>
                <GridContainer justifyContent="space-between" alignItems="center">
                  <GridItem>
                    <h4 className={classes1.headerCdTitle}>Payment List</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? (
                  <GridItem style={{ cursor: "pointer",display: "none"  }}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(allPayment)} >
                      <Tooltip title="Export to Excel">
                        <img src={require("../../../assets/img/excel.png").default} />
                      </Tooltip>
                    </IconButton>
                  </GridItem>
                   ):(
                    <GridItem style={{ cursor: "pointer" }}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(allPayment)} >
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
                    rows={allPayment}
                    onClickDelete={onDeletePayment}
                    onClickEdit={onUpdatePayment}
                  // footer={currencyFormate(totalPaymentAmount)}
                  // footerColIndex={5}
                  />
                  : ""}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )}
    </ThemeProvider>
  );
};

export default PaymentPage;
