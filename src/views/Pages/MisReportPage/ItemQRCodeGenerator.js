import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import MasterModelQr from "../../Components/MasterModelQr";
MasterModelQr
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import { useMediaQuery } from "@material-ui/core";
import {
  getAllItem,
  getAllCategory,
  getAllBrands,
  deleteItem,
  getSearchItem,
} from "../../../services/itemsService";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

import InputLabel from "@material-ui/core/InputLabel";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Box, Input, Paper, Grid } from "@material-ui/core";

import { ThemeProvider, Checkbox } from "@material-ui/core";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import PageTitle from "../HelperComponent/PageTitle";

import theme from "../../../theme/theme";

import React, { useRef } from "react";
import {
  appDefaultColor,
  reactSelectStyles,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { TramRounded } from "@mui/icons-material";
import { currentDate } from "../HelperComponent/utils";
import ReactSelect from "react-select";
import CircularProgress from "@material-ui/core/CircularProgress";
import QRCode from "qrcode.react";
import { currencyFormate } from "../HelperComponent/utils";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from 'file-saver';
import XLSX from 'xlsx'
import MasterModelForPrint from "../../Components/MasterModelForPrint";
import { components } from "react-select/dist/react-select.cjs.prod";

//print
import QrView from "./qrView";
import { useReactToPrint } from 'react-to-print';

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
  activeText: {
    ...activeText,
  },
  itemLabel: {
    width: 70,
    fontWeight: 500,
    color: appSecondColor,
  },
  modelForm: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 10px",
  },
  itemGrid: {
    marginBottom: 4,
  },
  actionbtn: {
    float: "right",
  },
  qrCodeCenterStyle: {
    padding: "10px 0",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const ItemLabel = ({ label, value }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <InputLabel id="label">{label}</InputLabel>
      <TextField
        size="small"
        // disabled
        id="outlined-basic"
        fullWidth={true}
        value={value}
        variant="outlined"
      />
    </Grid>
  );
};

const ItemPage = () => {
  const componentRef = useRef()
  const classes1 = useStyles1()
  const history = useHistory();
  const classes = useStyles();
  const matchesPrint = useMediaQuery("print");
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [loading, setLoading] = React.useState(false);
  const [qrCodeModel, setQrCodeModel] = React.useState(false);
  const [selectedQRItem, setSelectedQRItems] = React.useState([]);
  const [qrCodeItemId, setQrCodeitemId] = React.useState([]);
  const [setItem, setSetItem] = React.useState({
    brand: "",
    category: "",
    item: "",
    selling_price: "",
    txt_selling_price: "",
    txt_mew_mrp: "",
    mrp: "",
    txt_adjustment_stock: "",
    txt_remarks: "",
  });
  const [allItems, setAllItems] = React.useState([]);
  const [allItem, setAllItem] = React.useState([]);

  const [allCategory, setAllCategory] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  const [addSearch, setAddSearch] = React.useState({
    ddl_category_id: "",
    ddl_category_label: "Select",
    ddl_brand_id: "",
    ddl_brand_label: "Select",
    txt_item: "",
  });
  const [collapsible, setCollapsible] = React.useState(true)
  const fetchData = () => {
    setLoading(true);
    getAllCategory(
      (r) => {
        setAllCategory([{ value: "", label: "None" }, ...r]);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    getAllBrands(
      (r) => {
        setAllBrands([{ value: "", label: "None" }, ...r]);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    getAllItem(
      (items) => {
        setAllItem(items);
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
  };

  const handlePrint = ()=>{
    // useReactToPrint({
    //   content: () => componentRef.current,
    // })
    // window.print()
    // window.print( <QrView selectedQRItem={selectedQRItem}   />,)
    history.push({
      pathname: "/admin/mis-reports/qrView",
      state: {
        row: { selectedQRItem: selectedQRItem },
      },
    });

  }



  React.useEffect(() => {
    fetchData();
    setLoading(false);
  }, [refresh]);

  const headerData = [
    {
      id: "id",
      label: "#",
      align: "left",
    },

    {
      id: "category",
      label: "Category",
      align: "left",
    },
    {
      id: "brand",
      label: "Brand",
      align: "left",
    },
    {
      id: "item",
      label: "Item",
      align: "left",
    },
    {
      id: "uom_name",
      label: "Unit",
      align: "left",
    },
    {
      id: "hsn_code",
      label: "HSN ",
      align: "left",
    },
    {
      id: "gst",
      label: "GST%",
      align: "center",
    },

    {
      id: "status",
      label: "Status",
      align: "left",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    // {
    //   id: "action",
    //   label: "Action",
    //   align: "right",
    // },
  ];

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };
  const onSelect = (info, v) => {
    setAddSearch({ ...addSearch, [info.name]: v });
  }


  // on Search Item
  const onSearchItem = (e) => {
    e.preventDefault();
    getSearchItem(
      (items) => {
        setAllItems(items);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      addSearch
    );
  };

  const onChangeModelForm = (e) => {
    const { value, name } = e.target;
    setSetItem({ ...setItem, [name]: value });
  };

  const onClickRefresh = () => {
    setAddSearch({
      ddl_category_id: "",
      ddl_category_label: "Select",
      ddl_brand_id: "",
      ddl_brand_label: "Select",
      txt_item: "",
    });
    setRefresh(!refresh);
  };

  const clearModelState = () => {
    setSetItem({
      brand: "",
      category: "",
      item: "",
      selling_price: "",
      txt_selling_price: "",
      txt_mew_mrp: "",
      mrp: "",
      txt_adjustment_stock: "",
      txt_remarks: "",
    });
  };
  const closeQRCodeModel = () => {
    setQrCodeModel(false);
  };
  const onClickPrintQrCode = (e) => {
    // console.log(window,"565656")
    e.preventDefault();
    // window.print();
    history.push({
      pathname: "/admin/enquiry-list-view/",
      // search: '?query=abc',
      state: {
        task_todo_id: task_todo_id,
        module: title,
        subject: subject,
        details: desc,
        users: users.filter((o) => o.value === globalState.user?.serial_id),
        time: time,
        date: date,
        sales_id: sales_id,
        isUpdateTask: true
        // enquiry_no: enquiry_no,

      },
    });
  };

  const onSelectedItem = (itemsIds) => {
    setQrCodeitemId(itemsIds);
  };

  const onClickToOpenQRcodeModel = () => {

    if (qrCodeItemId.length > 0) {
      setQrCodeModel(true);
      let itemsForQrCode = allItems.filter((item, i) => {
        if (qrCodeItemId.find((id, i) => item.item_id == id)) {
          return {
            brand: item.brand,
            category: item.category,
            item_own_code: item.item_own_code,
            item: item.item,
            size: item.size,
            stock: item.stock,
            mrp: item.mrp,
          };
        }
      });
      // <QrView selectedQRItem={itemsForQrCode}   />

      setSelectedQRItems(itemsForQrCode);
      // history.push({
      //   pathname: "/admin/mis-reports/qrView",
      //   state: {
      //     row: { selectedQRItem: itemsForQrCode },
      //   },
      // });
    }
    // window.print()
  };

  // export to excel

  const onhandleExportToExcel = () => {
    const ItemQRTable = allItems.map(item => {
      return {
        Sl_No: item.id,
        category: item.category,
        brand: item.brand,
        item: item.item,
        Unit: item.uom_name,
        Hsn: item.hsn_code,
        gst: item.gst,
        Action: "",

      }
    })



    const fileName = 'Items'
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(ItemQRTable);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }


  const onClickCollaps = () => {
    collapsible ?
      setCollapsible(false)
      :
      setCollapsible(true)
  }



  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="MIS Report > Item QR Code Generator" />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Items"
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
          >
            {
              collapsible ?
                <Paper elevation="0" className={classes.searchBar}>
                  <form>
                    <GridContainer
                      justifyContent="flex-start"
                      alignItems="flex-end"
                    >
                      <GridItem xs="3">
                        <InputLabel id="label">Brand</InputLabel>
                        <ReactSelect
                          options={allBrands}
                          name="ddl_brand"
                          placeholder="Select"
                          formatGroupLabel={(d) => d.label}
                          menuPortalTarget={document.body}
                          styles={reactSelectStyles}
                          className={classes.customSelect}
                          onChange={(v, info) => onSelect(info, v)}
                          value={addSearch.ddl_brand}
                        // onChange={(v) => onSelect("ddl_brand_id", v)}
                        // value={{
                        //   label: addSearch.ddl_brand_label,
                        //   value: addSearch.ddl_brand_id,
                        // }}
                        />
                      </GridItem>
                      <GridItem xs="3">
                        <InputLabel id="label">Category</InputLabel>
                        <ReactSelect
                          options={allCategory}
                          placeholder="Select"
                          name="ddl_category"
                          formatGroupLabel={(d) => d.label}
                          menuPortalTarget={document.body}
                          styles={reactSelectStyles}
                          className={classes.customSelect}
                          onChange={(v, info) => onSelect(info, v)}
                          value={addSearch.ddl_category}
                        // onChange={(v) => onSelect("ddl_category_id", v)}
                        // value={{
                        //   label: addSearch.ddl_category_label,
                        //   value: addSearch.ddl_category_id,
                        // }}
                        />
                      </GridItem>

                      <GridItem xs="3">
                        <InputLabel id="label">Item</InputLabel>
                        <TextField
                          size="small"
                          placeholder="Item"
                          type="search"
                          style={{ marginBottom: -15 }}
                          name="txt_item"
                          onChange={onAddSearch}
                          id="outlined-basic"
                          fullWidth={true}
                          value={addSearch.txt_item}
                          variant="outlined"
                        />
                      </GridItem>
                      <GridItem xs="3">
                        <div
                          style={{
                            float: "right",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <CustomButton
                            type="submit"
                            onClick={onSearchItem}
                            name="btn_refresh"
                            style={{ marginRight: "10px" }}
                          >
                            <SearchIcon />
                          </CustomButton>
                          <CustomButton name="btn_refresh" onClick={onClickRefresh}>
                            <RotateLeftIcon />
                          </CustomButton>
                        </div>
                      </GridItem>
                    </GridContainer>
                  </form>
                </Paper>
                : ''}
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
                    <h4 className={classes1.headerCdTitle}>Items</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? (
                  <GridItem style={{ cursor: "pointer" , display: "none"  }}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(allItems)}  style={{ display: "none" }} >
                      <Tooltip title="Export to Excel">
                        <img src={require("../../../assets/img/excel.png").default} />
                      </Tooltip>
                    </IconButton>
                  </GridItem>
                  ):(
                    <GridItem style={{ cursor: "pointer" }}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(allItems)} >
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
                  selectableItemTable={true}
                  onClickEdit={() => { }}
                  onClickQRCode={() => { }}
                  onSelectedItem={onSelectedItem}
                  columns={headerData}
                  rows={allItems}
                />
              </CardBody>
            </Card>
          )}
        </GridItem>
        {qrCodeItemId.length > 0 && (
          <GridItem xs={12}>
            <div className={classes.actionbtns}>
              <Button
                onClick={onClickToOpenQRcodeModel}
                className={classes.actionbtn}
                variant="outlined"
                color="primary"
              >
                Print QR Codes
              </Button>
            </div>
          </GridItem>
        )}
      </GridContainer>

      {/* QR Code Model */}
      <MasterModelQr
        classicModal={qrCodeModel}
        onCloseModel={closeQRCodeModel}
        width={800}
        height={1000}
        // okBtnText={false}
        closeBtn={false}
        // onClickOk={handlePrint}
        ref={componentRef}
      >
        <QrView selectedQRItem={selectedQRItem}   />
      </MasterModelQr>
    </ThemeProvider>
  );
};

export default ItemPage;
