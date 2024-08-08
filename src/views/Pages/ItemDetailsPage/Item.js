import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/Button';
import clxs from "classnames";
import {
  getAllItem,
  getAllCategory,
  getAllBrands,
  deleteItem,
  getSearchItem,
  updateItemPrice,
} from "../../../services/itemsService";
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";

import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

import InputLabel from "@material-ui/core/InputLabel";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Box, Input, Paper, Grid } from "@material-ui/core";

import { ThemeProvider } from "@material-ui/core";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
// import { IconButton, OutlinedInput } from "@material-ui/core";
import PageTitle from "../HelperComponent/PageTitle";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import theme from "../../../theme/theme";

import React from "react";
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
import { currencyFormate, sortWord } from "../HelperComponent/utils";
import FormComponent from "../HelperComponent/FormComponent"
import XLSX from 'xlsx'
import FileSaver from 'file-saver';
//mui
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
const ExcelJS = require('exceljs');

const useStyles1 = makeStyles(styles);

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  searchbtnRight: {
    float: "right",
    display: "flex",
    alignItems: "center",
    marginBottom: 15,
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
    padding: "10px 10px",
  },
  itemGrid: {
    marginBottom: 4,
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
  const history = useHistory();
  const classes = useStyles();
  const classes1 = useStyles1()
  const [classicModal, setClassicModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [ajustmentModal, setAdjustmentModal] = React.useState(false);
  const [mrpModal, setMrpModal] = React.useState(false);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);

  const [setSellingPrice, setSellingPriceModal] = React.useState(false);
  const [qrCodeData, setQrCodeData] = React.useState({
    isQRModelOpen: false,
  });
  const [collapsible, setCollapsible] = React.useState(true)
  const [selItem, setSelItem] = React.useState({
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
  const [addAjustment, setAddAjustment] = React.useState({
    txt_adjustment_stock: "",
    txt_date: currentDate(),
    txt_remarks: "",
  });
  const [allItems, setAllItems] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [allCategory, setAllCategory] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [flName, setFlName] = React.useState("");
  const [items, setItems] = React.useState([]);

  const [error, setError] = React.useState({
    ddl_showroom_warehouse: false,
    txt_item: false,
  })
  const [searchDetail, setSearchDetail] = React.useState({
    txt_item: "",
    txt_transfer_date_from: currentDate(),
    txt_transfer_date_to: currentDate(),
    ddl_showroom_warehouse: "",
    ddl_brand: "",
    ddl_category: ""
  });

  const [show, setShow] = React.useState(false);

  const fetchData = () => {
    // setLoading(true);
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

    // getAllItem(
    //   (items) => {
    //     setAllItems(items);
    //     setLoading(false);
    //   },
    //   (err) => {
    //     setLoading(false);

    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );

  };

  const onChangeAdjustment = (e) => {
    const { name, value } = e.target;
    setAddAjustment({ ...addAjustment, [name]: value });
  };

  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  const onSetActive = (e) => {
    setAddUnit((prv) => ({ ...prv, switch_active_status: e.target.checked }));
  };

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
      id: "mrp",
      label: "MRP",
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
    {
      id: "action",
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
  const onClickAdjustment = (row) => {
    setAdjustmentModal(true);
    setSelItem({
      ...selItem,
      brand: row.brand,
      category: row.category,
      item: row.item,
    });
  };
  const closeAdjustmentModel = () => {
    setAdjustmentModal(false);
    clearModelState();
  };
  const onClickSetMrp = (row) => {
    setMrpModal(true);
    setSelItem({
      ...selItem,
      brand: row.brand,
      category: row.category,
      item: row.item,
      mrp: row.mrp,
    });
  };
  const closeMrpModel = () => {
    setMrpModal(false);
    clearModelState();
  };
  const onClickSetSellingPrice = (row) => {
    setSellingPriceModal(true);
    setSelItem({
      ...selItem,
      brand: row.brand,
      category: row.category,
      item: row.item,
      selling_price: row.selling_price,
    });
  };
  const closeSellingPriceModel = () => {
    setSellingPriceModal(false);
    clearModelState();
  };

  // onSubmit Model
  const onUpdateAjustment = (e) => {
    e.preventDefault();
  };
  const onSetSellingPrice = (e) => {
    e.preventDefault();
  };
  const onUpdateSetMrp = (e) => {
    e.preventDefault();
  };

  const onSelect = (name, v) => {
    switch (name) {
      case "ddl_category":
        setAddSearch({
          ...addSearch,
          ddl_category_id: v.value,
          ddl_category_label: v.label,
        });
        break;
      case "ddl_brand_id":
        setAddSearch({
          ...addSearch,
          ddl_brand_id: v.value,
          ddl_brand_label: v.label,
        });
        break;

      default:
        break;
    }
  };

  // on Search Item

  const onSearch = (e) => {
    e.preventDefault();
    setShow(true)

    getSearchItem(
      (items) => {
        setAllItems(items);
        setLoading(false)
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      },
      searchDetail
    );
  };

  // on Delete called
  const onDeleteItem = (row, next) => {
    deleteItem(
      row.item_id,
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

  const onChangeModelForm = (e) => {
    const { value, name } = e.target;
    setSelItem({ ...selItem, [name]: value });
  };

  const onClickRefresh = () => {
    setSearchDetail({
      ddl_category: "",
      ddl_brand: "",
      txt_item: "",
    });
    // setRefresh(!refresh);
    setAllItems([]);
  };

  const clearModelState = () => {
    setSelItem({
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

  // QR Code funtions
  const onClickQRCodeGenerate = (itemData) => {
    setQrCodeData((prv) => ({ ...prv, isQRModelOpen: true, ...itemData }));
  };

  const closeQRCodeModel = () => {
    setQrCodeData((prv) => ({ ...prv, isQRModelOpen: false }));
  };
  const onClickPrintQrCode = (e) => {
    e.preventDefault();
    window.print();
  };

  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Item List ']);
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
      'Category',
      'Brand',
      'Item',
      'Uom Name',      
      'Hsn Code',
      'Gst'
    
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const ItemTable = allItems.map((item) => {
      return {
        id: item.id,
        category: item.category,
        brand: item.brand,
        item: item.item,
        uom_name: item.uom_name,
        hsn_code: item.hsn_code,
        gst: item.gst,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    ItemTable.forEach((data) => {
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


  
     const brand = searchDetail?.ddl_brand?.label ? searchDetail?.ddl_brand?.label : " - " ;
    const vendor = searchDetail?.ddl_category?.label ? searchDetail?.ddl_category?.label : " - " ;
    const item = searchDetail?.txt_item ? searchDetail?.txt_item : " - " ;

    // periodCell.value = `Brand: ${brand}       Vendor:  ${vendor} 
    // Item : ${item} `;
    if (searchDetail?.ddl_brand  && searchDetail?.ddl_category &&  searchDetail?.txt_item ) {
      periodCell.value =`Brand: ${brand}       Category:  ${vendor} 
      Item : ${item} `;
  } else if (searchDetail?.ddl_brand !=="-") {
      periodCell.value = `Brand: ${brand}`;
  } else if (searchDetail?.ddl_category !== "-") {
      periodCell.value = `Category: ${vendor}`;
  } else if (searchDetail?.txt_item !=="-"){
    periodCell.value = `Item: ${item}`;

  }
   else {
      periodCell.value = "";
  }
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Item List.xlsx');
  };



  //export to excel id
  const onhandleExportToExcelId = () => {
    const ItemTable = allItems.map(item => {
      return {
        item_id: item.item_id,
        item: item.item,
        mrp: item.mrp,

      }
    })

    //console.log("item table", allItems)

    const fileName = 'Items'
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(ItemTable);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  const formData = [
    {
      name: "ddl_brand",
      label: "Brand",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "select_two",
      xs: 12,
      md: 6,
      lg: 4,
      options: allBrands,
    },
    {
      name: "ddl_category",
      label: "Category",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "select_two",
      xs: 12,
      md: 6,
      lg: 4,
      options: allCategory.sort(sortWord("label")),
    },
    {
      name: "txt_item",
      label: "Item ",
      hidden: false,
      required: false,
      data_type: "search",
      html_element: "TextField",
      xs: 12,
      md: 6,
      lg: 4,
    },

  ];


  const onClickCollaps = () => {
    collapsible ?
      setCollapsible(false)
      :
      setCollapsible(true)
  }

  const updatePrice = (event) => {

    const file = event.target.files[0]

    let fileName = ''


    var filevalue = document.getElementById("updatePrice").value;
    fileName = filevalue.split("\\");


    //console.log("data===>", file)

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve([fileName, data]);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });


    promise.then((data) => {
      const [fileName, d] = data;

      //console.log("excel data=>",JSON.stringify(d))
      updateItemPrice(
       d,
        (res) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: {
              msg: "Data Migrated ",
              msgType: "success",
            },
          });
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: {
              msg: "Failed" + err,
              msgType: "error",
            },
          });
        }
      )

      // //console.log("fln", d);
      // console.table(d.slice(0, 10));
      // setFlName(fileName[fileName.length - 1].split(".")[0]);

      // //post file
      // fetch(
      //   "http://localhost:3000/master/itemPriceUpdate/update", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(d),
      // }).then((res) => {
      //   //console.log(d, "itemsss");

      //   //console.log(res);
      // });

      // dispatch({
      //   type: actionTypes.SET_OPEN_MSG,
      //   payload: {
      //     msg: "Data Migrated ",
      //     msgType: "success",
      //   },
      // });

    });

  }


  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Item Details > Item"
        btnToolTip="Add New Item"
        addBtnLink="/admin/master/add-items"
        updateBtnLink="/admin/master/add-item_update_stock"
        updateBtnToolTip="Update Stock"
      />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Items"


            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
          >
            {
              collapsible ?
                <form>
                  <GridContainer
                    style={{ padding: "5px 20px" }}
                    alignItems="flex-end"
                  >
                    {formData.map((item, key) => {
                      return (
                        <>
                          <FormComponent
                            item={item}
                            key={key}
                            onSelect={onSelectDetails}
                            state={searchDetail}
                            onChange={onChangeSearchForm}
                            error={error}
                          />
                        </>
                      );
                    })}
                    <GridItem xs="12">
                      <div className={classes.searchbtnRight}>
                        <CustomButton style={{ marginRight: "10px" }} onClick={onSearch}>
                          <SearchIcon />
                        </CustomButton>
                        <CustomButton onClick={onClickRefresh}>
                          <RotateLeftIcon />
                        </CustomButton>
                      </div>
                    </GridItem>
                  </GridContainer>
                </form>
                : ''}
          </CustomCard>
        </GridItem>
      </GridContainer>

      {show ?
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
                    <GridItem style={{ cursor: "pointer" ,display: "none"}}>
                      <IconButton variant="text" onClick={() => onhandleExportToExcel(allItems)} >
                        <Tooltip title="Export to Excel">
                          <img src={require("../../../assets/img/excel.png").default} />
                        </Tooltip>
                      </IconButton>
                      <IconButton variant="text" onClick={() => onhandleExportToExcelId(allItems)} >
                        <Tooltip title="Update Price Sample">
                          {/* <img src={require("../../../assets/img/excel.png").default} style={{ background: "green" }} /> */}
                          <label  >
                           <SaveAltOutlinedIcon style={{ color: "#3ca8e2"}} />
                           </label>
                        </Tooltip>
                      </IconButton>
                      <input
                        id="updatePrice"
                        hidden="hidden"
                        type="file"
                        accept=".csv, .xlsx"
                        onChange={updatePrice}
                      />
                      <IconButton>
                        <Tooltip title="Update Price">
                          <label htmlFor="updatePrice" >
                            <FileUploadOutlinedIcon style={{ color: "#3ca8e2"}} />
                          </label>
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
                      <IconButton variant="text" onClick={() => onhandleExportToExcelId(allItems)} >
                        <Tooltip title="Update Price Sample">
                          {/* <img src={require("../../../assets/img/excel.png").default} style={{ background: "green" }} /> */}
                          <label  >
                           <SaveAltOutlinedIcon style={{ color: "#3ca8e2"}} />
                           </label>
                        </Tooltip>
                      </IconButton>
                      <input
                        id="updatePrice"
                        hidden="hidden"
                        type="file"
                        accept=".csv, .xlsx"
                        onChange={updatePrice}
                      />
                      <IconButton>
                        <Tooltip title="Update Price">
                          <label htmlFor="updatePrice" >
                            <FileUploadOutlinedIcon style={{ color: "#3ca8e2"}} />
                          </label>
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
                    onClickEdit={() => { }}
                    onClickDelete={onDeleteItem}
                    onClickAdjustment={onClickAdjustment}
                    onClickSetMrp={onClickSetMrp}
                    onClickSetSellingPrice={onClickSetSellingPrice}
                    onClickQRCode={onClickQRCodeGenerate}
                    columns={headerData}
                    rows={allItems}
                  />
                </CardBody>
              </Card>
            )}
          </GridItem>
        </GridContainer>
        : ''


      }

      {/* Stock Adjustment Model */}
      <MasterModel
        classicModal={ajustmentModal}
        onCloseModel={closeAdjustmentModel}
        width={450}
        height="auto"
        okBtnText="Update"
        modelName="Stock Adjustment"
        onClickOk={onUpdateAjustment}
      >
        <div className={classes.modelForm}>
          <Grid container>
            <ItemLabel label="Brand" value={selItem.brand} />
            <ItemLabel label="Category" value={selItem.category} />
            <ItemLabel label="Item" value={selItem.item} />

            <Grid item xs={12}>
              <Box mb={1} className={classes.activeText}>
                Stock Adjustment
              </Box>
              <Grid container spacing={3} justify="space-between">
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    placeholder="Stock"
                    type="number"
                    name="txt_adjustment_stock"
                    onChange={onChangeModelForm}
                    inputProps={{
                      style: { textAlign: "right" },
                    }}
                    id="outlined-basic"
                    fullWidth={true}
                    value={selItem.txt_adjustment_stock}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    defaultValue={currentDate()}
                    name="txt_date"
                    type="date"
                    onChange={onChangeModelForm}
                    id="outlined-basic"
                    fullWidth={true}
                    value={selItem.txt_date}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="label">Remarks</InputLabel>
              <TextField
                size="small"
                placeholder="Remarks"
                style={{ marginBottom: -10 }}
                name="txt_remarks"
                onChange={onChangeModelForm}
                id="outlined-basic"
                fullWidth={true}
                value={addAjustment.txt_remarks}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </div>
      </MasterModel>

      {/* Set Selling Price Model */}
      <MasterModel
        classicModal={setSellingPrice}
        onCloseModel={closeSellingPriceModel}
        width={450}
        height="auto"
        okBtnText="Update"
        modelName="Set Selling Price"
        onClickOk={onSetSellingPrice}
      >
        <div className={classes.modelForm}>
          <Grid container>
            <ItemLabel label="Brand" value={selItem.brand} />
            <ItemLabel label="Category" value={selItem.category} />
            <ItemLabel label="Item" value={selItem.item} />
            <ItemLabel
              label="Existing Selling Price"
              value={selItem.selling_price}
            />
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Box mb={1} className={classes.activeText}>
                  New Selling Price
                </Box>
                <Grid container spacing={3} justify="space-between">
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      placeholder="Price"
                      type="number"
                      name="txt_selling_price"
                      onChange={onChangeModelForm}
                      inputProps={{
                        style: { textAlign: "right" },
                      }}
                      id="outlined-basic"
                      fullWidth={true}
                      value={selItem.txt_selling_price}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size="small"
                      defaultValue={currentDate()}
                      name="txt_selling_price_date"
                      type="date"
                      onChange={onChangeModelForm}
                      id="outlined-basic"
                      fullWidth={true}
                      value={selItem.txt_selling_price_date}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="label">Remarks</InputLabel>
                <TextField
                  size="small"
                  placeholder="Remarks"
                  style={{ marginBottom: -10 }}
                  name="txt_remarks"
                  onChange={onChangeModelForm}
                  id="outlined-basic"
                  fullWidth={true}
                  value={selItem.txt_remarks}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </MasterModel>

      {/* Set MRP  Model */}
      <MasterModel
        classicModal={mrpModal}
        onCloseModel={closeMrpModel}
        width={450}
        height="auto"
        okBtnText="Update"
        modelName="Set MRP"
        onClickOk={onUpdateSetMrp}
      >
        <div className={classes.modelForm}>
          <Grid container>
            <ItemLabel label="Brand" value={selItem.brand} />
            <ItemLabel label="Category" value={selItem.category} />
            <ItemLabel label="Item" value={selItem.item} />
            <ItemLabel label="Existing MRP" value={selItem.mrp} />
            <Grid item xs={12}>
              <Box mb={1} className={classes.activeText}>
                New MRP
              </Box>
              <Grid container spacing={3} justify="space-between">
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    placeholder="MRP"
                    type="number"
                    name="txt_mew_mrp"
                    onChange={onChangeModelForm}
                    inputProps={{
                      style: { textAlign: "right" },
                    }}
                    id="outlined-basic"
                    fullWidth={true}
                    value={selItem.txt_mew_mrp}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    defaultValue={currentDate()}
                    name="txt_mrp_date"
                    type="date"
                    onChange={onChangeModelForm}
                    id="outlined-basic"
                    fullWidth={true}
                    value={addAjustment.txt_mrp_date}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="label">Remarks</InputLabel>
              <TextField
                size="small"
                placeholder="Remarks"
                style={{ marginBottom: -10 }}
                name="txt_remarks"
                onChange={onChangeModelForm}
                id="outlined-basic"
                fullWidth={true}
                value={addAjustment.txt_remarks}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </div>
      </MasterModel>

      {/* QR Code Model */}

      <MasterModel
        classicModal={qrCodeData.isQRModelOpen}
        onCloseModel={closeQRCodeModel}
        width={450}
        height="auto"
        okBtnText="Print"
        closeBtn={false}
        modelName="Item QR Code"
        onClickOk={onClickPrintQrCode}
      >
        <div className={classes.modelForm}>
          {qrCodeData.brand && (
            <div className={classes.qrCodeCenterStyle}>
              <QRCode
                size={200}
                value={`
              ${qrCodeData.brand ? qrCodeData.brand : "--"} - ${qrCodeData.category ? qrCodeData.category : "--"
                  }
              [${qrCodeData.item_own_code ? qrCodeData.item_own_code : "--"
                  }] - ${qrCodeData.item ? qrCodeData.item : "--"}
              Size :  ${qrCodeData.size ? qrCodeData.size : "--"}
              Stock - ${qrCodeData.stock ? qrCodeData.stock : "--"}
              MRP - ${currencyFormate(qrCodeData.mrp)}
              `}
              />
              <Box
                fontFamily={appDefaultFamily}
                fontWeight={500}
                fontSize="1rem"
                pt={2}
              >{`[${qrCodeData.item_own_code}]`}</Box>
              <Box
                color={appDefaultColor}
                fontFamily={appDefaultFamily}
                fontWeight={500}
                fontSize="1.5rem"
                mt={1}
              >
                Marudhar Marble
              </Box>
            </div>
          )}
        </div>
      </MasterModel>
    </ThemeProvider>
  );
};

export default ItemPage;
