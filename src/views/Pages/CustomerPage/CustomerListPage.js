import React from "react";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
// Impoet Services
import {
  getAllCustomers,
  deleteCustomer,
  getAllGroup,
} from "../../../services/customerListService";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Box, Input, Paper, Grid } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";

import {
  appDefaultColor,
  reactSelectStyles,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
// import IconButton from '@material-ui/core/Button';
// import Tooltip from "@material-ui/core/Tooltip";

import { ThemeProvider } from "@material-ui/core";
import PageTitle from "../HelperComponent/PageTitle";
import theme from "../../../theme/theme";
import { useHistory } from "react-router-dom";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { currentDate } from "../HelperComponent/utils";
import ReactSelect from "react-select";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import IconButton from '@material-ui/core/Button';
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

  searchBar: {
    padding: "10px",
  },

  catCards: {
    marginLeft: 5,
  },
  activeText: {
    ...activeText,
  },
}));

const headerData = [
  {
    id: "id",
    label: "#",
  },
  {
    id: "group_name",
    label: "Group",
    align: "left",
  },
  {
    id: "company",
    label: "Company",
    align: "left",
  },
  {
    id: "name",
    label: "Name",
    align: "left",
  },

  {
    id: "mobile",
    label: "Mobile",
    align: "left",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    align: "left",
  },
  {
    id: "email",
    label: "Email",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    statusBtn: (v) => (v === "Y" ? true : false),
  },

  {
    id: "action",
    label: "Action",
    align: "right",
  },
];

const CustomerListPage = () => {
  const classes1 = useStyles1()
  const history = useHistory();
  const classes = useStyles();
  const [globalState, dispatch] = useStateValue();
  const [viewRes, setViewRes] = React.useState("hidden");
  const [refresh, setRefresh] = React.useState(false);
  const [customers, setAllCustomers] = React.useState([]);
  const [allGroup, setAllGroup] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [addSearch, setAddSearch] = React.useState({
    txt_keyword_pharse: "",
    ddl_group_id: "",
    ddl_group_id_label: "Select",
    // txt_item: "",
  });
  const [collapsible, setCollapsible] = React.useState(true)
  const onSelect = (info, v) => {
    setAddSearch({ ...addSearch, [info.name]: v });
  };

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };
/////////////////////////////////////////////////////////
  // get All list onload of the page
/////////////////////////////////////////////////////////
  React.useEffect(() => {
    if(refresh)
    {
      // setLoading(true);
    getAllCustomers(
      (r) => {
        setAllCustomers(r);
    // setLoading(false);
      },
      (err) => {
    // setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  }

  setRefresh(false)
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
  }, [refresh]);

  const onEditCustomer = (row) => {
    history.push({
      pathname: "/admin/master/customer-add",
      // search: '?query=abc',
      state: { edit: true, row: row },
    });
  };

  const onViewCustomer = (row) => {
    history.push({
      pathname: "/admin/master/customer-view",
      // search: '?query=abc',
      state: { row: row },
    });
  };

  // on Delete called
  const onDeleteCustomer = (row, next) => {
    deleteCustomer(
      row.customer_id,
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

  //export to excel
  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Customer List']);
    const periodRow = worksheet.addRow(['']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:H${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:H${periodRow.number}`);
  
    const headers = [
      'Sl No',            
      'Group Name',        
      'Company',
      'Name',
      'Mobile',
      'Whatsapp',
      'Email',
      'Status'
    
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const CustomerTable = customers.map((customer) => {
      return {
        id: customer.id,
        group_name: customer.group_name,
        company: customer.company,
        name: customer.name,
        mobile: customer.mobile,
        whatsapp: customer.whatsapp,
        email: customer.email,
        status: customer.status,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    CustomerTable.forEach((data) => {
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
    const group = addSearch?.ddl_group_id?.label ;
    const keyword_pharse = addSearch?.txt_keyword_pharse ? addSearch?.txt_keyword_pharse : "-" ;


    // periodCell.value = `Keyword Pharse: ${keyword_pharse}       Group:  ${group}`;
    if (group && keyword_pharse !== "-") {
      periodCell.value = `Group: ${addSearch?.ddl_group_id?.label}        Keyword Phrase: ${addSearch?.txt_keyword_pharse}`;
  } else if (group) {
      periodCell.value = `Group: ${addSearch?.ddl_group_id?.label}`;
  } else if (keyword_pharse !== "-") {
      periodCell.value = `Keyword Phrase: ${addSearch?.txt_keyword_pharse}`;
  } else {
      periodCell.value = "";
  }

    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Customer List .xlsx');
  };



const onSearchCustomer = (e) => {
  setRefresh(false);
  e.preventDefault();
  setLoading(true);

  getAllCustomers(
    (customers) => {
      if (customers.length) {     
        setAllCustomers(customers);
        setViewRes("visible");
        setLoading(false);
      } else {
        setViewRes("visible");
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, "Customer not found": "info" },
        });
      }
    },
    (err) => {
      // change by sankha
      setAllCustomers([])
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
    txt_keyword_pharse: "",
    ddl_group_id: "",
    ddl_group_id_label:"Select"
  });
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
        title="Master > Customer"
        addBtnLink="/admin/master/customer-add"
        btnToolTip="Add Customers"
      />
      <>
        <GridContainer className={classes.root}>
          <GridItem xs="12">
            <CustomCard cdTitle="Search Customer"
            

 btnToolTip={collapsible?"Collaps":"Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            >
              {
              collapsible ?
              <Paper elevation="0" className={classes.searchBar}>
                <GridContainer
                  justifyContent="flex-start"
                  alignItems="flex-end"
                >
                  <GridItem xs="3">
                    <InputLabel id="label">Group</InputLabel>
                    <ReactSelect
                      name="ddl_group_id"
                      options={allGroup}
                      placeholder="Select"
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      styles={reactSelectStyles}
                      className={classes.customSelect}
                      onChange={(v, info) => onSelect(info, v)}
                      value={
                        addSearch.ddl_group_id
                      }
                    />
                  </GridItem>
                  <GridItem xs="3">
                    <InputLabel id="label">Keyword / Pharse</InputLabel>
                    <TextField
                      size="small"
                      placeholder="Keyword / Pharse"
                      style={{ marginBottom: -15 }}
                      type="search"
                      name="txt_keyword_pharse"
                      onChange={onAddSearch}
                      id="outlined-basic"
                      fullWidth={true}
                      value={addSearch.txt_keyword_pharse}
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs="6">
                    <div
                      style={{
                        float: "right",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CustomButton

                          type="submit"
                          style={{ marginRight: "10px" }}
                          onClick={onSearchCustomer}  
                      >


                    <SearchIcon />
                      </CustomButton>
                      <CustomButton name="btn_refres" onClick={onClickRefresh}>
                        <RotateLeftIcon />
                      </CustomButton>
                    </div>
                  </GridItem>
                </GridContainer>
              </Paper>
              :''}
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
                      <h4 className={classes1.headerCdTitle}>customers</h4>
                    </GridItem>
                    {globalState.user.user_role !== "Admin" ? ( 
                    <GridItem style={{ cursor: "pointer",display: "none" }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(customers)} >
                        <Tooltip title="Export to Excel">
                          <img src={require("../../../assets/img/excel.png").default} />
                        </Tooltip>
                      </IconButton>
                    </GridItem>
                    ):(
                      <GridItem style={{ cursor: "pointer" }}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(customers)} >
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
            
            {!refresh? <MuiTable
                onClickEdit={onEditCustomer}
                onClickViewOne={onViewCustomer}
                onClickDelete={onDeleteCustomer}
                columns={headerData}
                rows={customers}
              />:""}
              
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
         )}
      </>
    </ThemeProvider>
  );
};

export default CustomerListPage;
