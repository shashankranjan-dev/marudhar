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
  getAllVendors,
  vendorRowData,
  deleteVendor,
  getAllGroup,
} from "../../../services/vendorService";
import { Box, Input, Paper, Grid } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import TextField from "@material-ui/core/TextField";

import { ThemeProvider } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PageTitle from "../HelperComponent/PageTitle";
import ReactSelect from "react-select";

import theme from "../../../theme/theme";

import React from "react";
import {
  appLabelFont,
  appFontWeight,
  appDefaultColor,
  reactSelectStyles,
  appSecondColor,
  appDefaultFamily,
} from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import IconButton from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from "file-saver";
import XLSX from "xlsx";
const ExcelJS = require("exceljs");

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
  searchBar: {
    padding: "10px",
  },
}));

const headerData = [
  {
    id: "id",
    label: "#",
    align: "left",
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
    id: "gst",
    label: "GST",
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
const AddBrandPage = () => {
  const classes1 = useStyles1();

  const history = useHistory();
  const [globalState, dispatch] = useStateValue();
  const [viewRes, setViewRes] = React.useState("hidden");
  const [refresh, setRefresh] = React.useState(false);
  const [vendors, setAllVendors] = React.useState([]);
  const [allGroup, setAllGroup] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [addSearch, setAddSearch] = React.useState({
    txt_keyword_pharse: "",
    ddl_group_id: "",
    ddl_group_id_label: "Select",
    txt_item: "",
  });
  const [collapsible, setCollapsible] = React.useState(true);
  const onSelect = (name, v) => {
    switch (name) {
      case "ddl_group_id":
        setAddSearch({
          ...addSearch,
          ddl_group_id: v.value,
          ddl_group_label: v.label,
        });
        break;
      default:
        break;
    }
  };

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  // get All Vendors Lists
  React.useEffect(() => {
    if (refresh) {
      // setLoading(true);
      getAllVendors(
        (r) => {
          setAllVendors(r);
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
    setRefresh(false);
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

  const classes = useStyles();

  // on Edit called
  const onEditVendor = (row) => {
    history.push({
      pathname: "/admin/master/add-vendor",
      // search: '?query=abc',
      state: { edit: true, row: row },
    });
  };

  // on Delete called
  const onDeleteVendor = (row, next) => {
    deleteVendor(
      row.vendor_id,
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

  const onViewVendor = (row) => {
    history.push({
      pathname: "/admin/master/vendor/view",
      // search: '?query=abc',
      state: { row: row },
    });
  };

  const onSearch = (e) => {
    setRefresh(false);
    e.preventDefault();
    setLoading(true);

    getAllVendors(
      (r) => {
        if (r.length) {
          setAllVendors(r);
          setViewRes("visible");
          setLoading(false);
        } else {
          setViewRes("visible");
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, "Quotation not found": "info" },
          });
        }
      },
      (err) => {
        setAllVendors([]);
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
    setRefresh(refresh);
    setAddSearch({
      txt_keyword_pharse: "",
      ddl_group_id: "",
      ddl_group_id_label: "Select",
    });
    // setAddSearch([])
  };

  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("data");

    const titleRow = worksheet.addRow(["Report Name : Vendor List"]);
    const periodRow = worksheet.addRow([""]);
    worksheet.addRow([]);

    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = {
      vertical: "middle",
      horizontal: "center",
      bold: true,
    };
    periodCell.alignment = {
      vertical: "middle",
      horizontal: "center",
      bold: true,
    };

    worksheet.mergeCells(`A${titleRow.number}:H${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:H${periodRow.number}`);

    const headers = [
      "Sl No",
      "Group Name",
      "Company",
      "Name",
      "Mobile",
      "Whatsapp",
      "Email",
      "Status",
    ];

    // Add headers as a row
    worksheet.addRow(headers);

    const VendorTable = vendors.map((vendor) => {
      return {
        id: vendor.id,
        group_name: vendor.group_name,
        company: vendor.company,
        name: vendor.name,
        mobile: vendor.mobile,
        whatsapp: vendor.whatsapp,
        email: vendor.email,
        status: vendor.status,
      };
    });

    const dataStartRow = 4;

    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;

    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });

    VendorTable.forEach((data) => {
      worksheet.addRow(Object.values(data));
    });

    headerRow.font = { bold: true };
    headerRow.eachCell((cell, colNumber) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "cce6ff" },
      };
    });

    worksheet.eachRow(
      { startingRow: dataStartRow + 1 },
      (row, rowNumber) => {}
    );

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

    // const group = addSearch?.ddl_group_label ;
    // const keyword_pharse = addSearch?.txt_keyword_pharse?.label ? addSearch?.txt_keyword_pharse?.label : "-" ;

    // periodCell.value = `Keyword Pharse: ${keyword_pharse}       Group:  ${group}`;

    const group = addSearch?.ddl_group_id;
    const keyword_pharse = addSearch?.txt_keyword_pharse ? addSearch?.txt_keyword_pharse : "-";
    
    if (group && keyword_pharse !== "-") {
        periodCell.value = `Group: ${addSearch?.ddl_group_label}        Keyword Phrase: ${addSearch?.txt_keyword_pharse}`;
    } else if (group) {
        periodCell.value = `Group: ${addSearch?.ddl_group_label}`;
    } else if (keyword_pharse !== "-") {
        periodCell.value = `Keyword Phrase: ${addSearch?.txt_keyword_pharse}`;
    } else {
        periodCell.value = "";
    }
    

    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, "Vendor List .xlsx");
  };

  const onClickCollaps = () => {
    collapsible ? setCollapsible(false) : setCollapsible(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Vendor"
        btnToolTip="Add New Vendor"
        addBtnLink={"/admin/master/add-vendor"}
      />

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard
            cdTitle="Search Vendor"
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
          >
            {collapsible ? (
              <Paper elevation="0" className={classes.searchBar}>
                <GridContainer
                  justifyContent="flex-start"
                  alignItems="flex-end"
                >
                  <GridItem xs="3">
                    <InputLabel id="label">Group</InputLabel>
                    <ReactSelect
                      options={allGroup}
                      name="ddl_group_id"
                      placeholder="Select"
                      formatGroupLabel={(d) => d.label}
                      menuPortalTarget={document.body}
                      styles={reactSelectStyles}
                      className={classes.customSelect}
                      onChange={(v) => onSelect("ddl_group_id", v)}
                      value={{
                        label: addSearch.ddl_group_label,
                        value: addSearch.ddl_group_id,
                      }}
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
                        name="btn_refres"
                        style={{ marginRight: "10px" }}
                        onClick={onSearch}
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
                <GridContainer
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <GridItem>
                    <h4 className={classes1.headerCdTitle}>Vendors</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? ( 
                  <GridItem style={{ cursor: "pointer",display: "none"  }}>
                    <IconButton
                      variant="text"
                      onClick={() => onhandleExportToExcel(vendors)}
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
                      onClick={() => onhandleExportToExcel(vendors)}
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
                  onClickViewOne={onViewVendor}
                  onClickEdit={onEditVendor}
                  onClickDelete={onDeleteVendor}
                  columns={headerData}
                  rows={vendors}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )}
    </ThemeProvider>
  );
};

export default AddBrandPage;
