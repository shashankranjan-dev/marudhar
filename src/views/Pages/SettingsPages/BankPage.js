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
  deleteBank,
  getAllBank,
  postBank,
  updateBank,
} from "../../../services/bankService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Box } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import theme from "../../../theme/theme";

import React from "react";
import {
  appDefaultColor,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import PageTitle from "../HelperComponent/PageTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import  FileSaver from 'file-saver';
import XLSX from 'xlsx'
import IconButton from '@material-ui/core/Button';
const useStyles1 = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },

  catCards: {
    marginLeft: 5,
    marginBottom: 20,
  },
  activeText: {
    ...activeText,
  },
  helperText: { textAlign: "right" },
}));

const formData = {
  formName: "Add a Bank",
  fields: [
    {
      name: "txt_bank_name",
      label: "Bank",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextField",
      error: false,
    },
    {
      name: "txt_details",
      label: "Details",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "TextArea",
      error: false,
    },
    {
      name: "switch_active_status",
      label: " Active Status",
      hidden: false,
      required: false,
      align: "left",
      data_type: "tel",
      maxLength: 10,
      html_element: "switch",
      error: false,
      xs: 12,
      md: 6,
      lg: 4,
    }, 
  ],
};

const BankPage = () => {
  const classes1 = useStyles1()
  const history = useHistory();
  const classes = useStyles();

  const [classicModal, setClassicModal] = React.useState(false);
  const [allBank, setAllBanks] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [addBank, setAddBank] = React.useState({
    edit: false,
    bank_id: "",
    switch_active_status: false,
    txt_bank_name: "",
    txt_details: "",
    switch_active_status:true,

  });
  // for Error handler state
  const [error, setError] = React.useState({
    txt_bank_name: false,
  });
  React.useEffect(() => {
    setLoading(true);
    getAllBank(
      (banks) => {
        setAllBanks(banks);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  }, [refresh]);

  const onSetActive = (e) => {
    setAddBank((prv) => ({ ...prv, [e.target.name]: e.target.checked }));
  };

  const headerData = [
    {
      id: "b_id",
      label: "#",
    },
    {
      id: "b_bank_name",
      label: "Bank Name",
    },
    {
      id: "b_details",
      label: "Details",
    },
    {
      id: "b_status",
      label: "Status",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    {
      id: "b_action",
      label: "Action",
      align: "right",
      viewMenu: (v) => v,
    },
  ];
  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (!addBank.txt_bank_name) {
      setError({
        txt_bank_name: !addBank.txt_bank_name,
      });
    } else {
      if (addBank.edit) {
        updateBank(
          addBank,
          (r) => {
            onCloseModel();
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Bank Updated Successfully",
                msgType: "success",
              },
            });
            setRefresh(!refresh);
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      } else {
        postBank(
          addBank,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Bank added Successfully",
                msgType: "success",
              },
            });
            onCloseModel();
            setRefresh(!refresh);
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
            setButtonDisabled(true)
          }
        );
      }
    }
  };

  // on Delete called
  const onDeleteBank = (row, next) => {
    deleteBank(
      row.bank_id,
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
  const onUpdateBank = (row) => {
    setClassicModal(true);
    setAddBank({
      ...addBank,
      edit: true,
      switch_active_status: row.b_status === "Y" ? true : false,
      bank_id: row.bank_id,
      txt_bank_name: row.b_bank_name,
      txt_details: row.b_details,
    });
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    setAddBank({ ...addBank, [name]: value });
  };
  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({ txt_bank: false });
    setAddBank({
      ...addBank,
      edit: false,
      bank_id: null,
      switch_active_status: false,
      txt_bank_name: "",
      txt_details: "",
    });
  };


// export to excel

const onhandleExportToExcel = () => {
  const BankTable = allBank.map(acc => {
    return {
      ID: acc.b_id,
      Bank_name: acc.b_bank_name,
      Details:acc.b_details,
      Status: acc.b_status,
      Action:"",
      
    }
  })
  
 
  
  const fileName= 'Bank'
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const ws = XLSX.utils.json_to_sheet(BankTable);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + fileExtension);
}

  //   console.log(addStatutory);

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Setting > Bank"
        btnToolTip="Add New Bank"
        onClickAddBtn={() => setClassicModal(true)}
      />
      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <GridContainer justify="space-between" alignItems="center">
            <GridItem>
              <MasterModel
                classicModal={classicModal}
                onCloseModel={onCloseModel}
                width={450}
                height="auto"
                // modelName="Add a Bank"
                okBtnText="Submit"
                modelName={addBank.edit ? "Edit Bank" : "Add Bank"}
                onClickOk={onSubmitModel}
                disabled={buttonDisabled}
              >
                <div style={{ padding: "20px 10px", width: "100%" }}>
                  <GridContainer>
                    {formData.fields.map((item, key) => {
                      return (
                        <>
                          <GridItem xs={12} key={key}>
                            {item.html_element === "TextField" && (
                              <>
                                <InputLabel required={item.required} id="label">
                                  {item.label}
                                </InputLabel>
                                <TextField
                                  size="small"
                                  placeholder={item.label}
                                  name={item.name}
                                  required={item.required}
                                  onChange={onChange}
                                  error={error[item.name]}
                                  FormHelperTextProps={{
                                    className: classes.helperText,
                                  }}
                                  helperText={
                                    error[item.name]
                                      ? item.label + " is required"
                                      : ""
                                  }
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={addBank[item.name]}
                                  variant="outlined"
                                />
                              </>
                            )}
                            {item.html_element === "TextArea" && (
                              <>
                                <InputLabel id="label">{item.label}</InputLabel>

                                <TextField
                                  placeholder={item.label}
                                  name={item.name}
                                  onChange={onChange}
                                  multiline
                                  rows={5}
                                  style={{ marginBottom: -10 }}
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={addBank[item.name]}
                                  variant="outlined"
                                />
                              </>
                            )}
                            {item.html_element === "switch" && (
                              <>
                                <span className={classes.activeText}>
                                  Active Status
                                </span>
                                <Switch
                                  onClick={onSetActive}
                                  checked={addBank[item.name]}
                                  name={item.name}
                                  fullWidth={true}
                                  inputProps={{
                                    "aria-label": "primary checkbox",
                                  }}
                                  color="primary"
                                />
                              </>
                            )}
                          </GridItem>
                        </>
                      );
                    })}
                  </GridContainer>
                </div>
              </MasterModel>
            </GridItem>
          </GridContainer>
        </GridItem>
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
                  <h4 className={classes1.headerCdTitle}>Bank</h4>
                </GridItem>
                {globalState.user.user_role !== "Admin" ? ( 
                <GridItem style={{ cursor: "pointer" ,display: "none" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allBank)} >
                    <Tooltip title="Export to Excel">
                      <img src={require("../../../assets/img/excel.png").default} />
                    </Tooltip>
                  </IconButton>
                </GridItem>
                ):(
                  <GridItem style={{ cursor: "pointer" }}>
                  <IconButton variant="text" onClick={() => onhandleExportToExcel(allBank)} >
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
            <MuiTable
              onClickEdit={onUpdateBank}
              onClickDelete={onDeleteBank}
              columns={headerData}
              rows={allBank}
            />
           </CardBody>
              </Card>
          )}
         
          
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default BankPage;
