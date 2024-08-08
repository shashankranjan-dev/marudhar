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
import { getAllWaste } from "services/wasteManagerService";

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

const WasteManager = () => {
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
  const [enqueryList, setAllEnqueryList] = React.useState([]);

  const [error, setError] = React.useState({
    ddl_showroom_warehouse: false,
    txt_item: false,
  })
  const [searchDetail, setSearchDetail] = React.useState({
    txt_item: "",
    txt_transfer_date_from: currentDate(),
    txt_transfer_date_to: currentDate(),
 
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
    // {
    //   id: "wcategory",
    //   label: "Category",
    //   align: "left",
    // },
    // {
    //   id: "wbrand",
    //   label: "Brand",
    //   align: "left",
    // },
    {
      id: "witem",
      label: "Item",
      align: "left",
    },
    {
      id: "uom_name",
      label: "Unit",
      align: "left",
    },
    {
      id: "waste_qty",
      label: "Waste Qty",
      align: "center",
    },
    {
      id: "waste_type",
      label: "Waste Type",
      align: "center",
    },

    {
      id: "convert_qty",
      label: "Convert Qty",
     align: "center",
    },
    {
      id: "convert_to",
      label: "Convert To",
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

    // getSearchItem(
    //   (items) => {
    //     setAllItems(items);
    //     setLoading(false)
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   },
    //   searchDetail
    // );
    getAllWaste(
      (waste) => {
        setAllItems(waste);
      },
      (err)=> {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        })
      },
      searchDetail
    )
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






  //export to excel

  const onhandleExportToExcel = () => {
    const ItemTable = allItems.map(item => {
      return {
        id: item.id,
        category: item.category,
        brand: item.brand,
        item: item.item,
        uom_name: item.uom_name,
        hsn_code: item.hsn_code,
        gst: item.gst,
        status: "",
        action: ""
      }
    })

    // console.log("item table", allItems)

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
    // {
    //   name: "ddl_brand",
    //   label: "Brand",
    //   hidden: false,
    //   required: false,
    //   data_type: "string",
    //   html_element: "select_two",
    //   xs: 12,
    //   md: 6,
    //   lg: 4,
    //   options: allBrands,
    // },
    // {
    //   name: "ddl_category",
    //   label: "Category",
    //   hidden: false,
    //   required: false,
    //   data_type: "string",
    //   html_element: "select_two",
    //   xs: 12,
    //   md: 6,
    //   lg: 4,
    //   options: allCategory.sort(sortWord("label")),
    // },
    {
      name: "txt_item",
      label: "Item",
      hidden: false,
      required: false,
      data_type: "search",
      html_element: "TextField",
      xs: 6,
      
    },

  ];


  const onClickCollaps = () => {
    collapsible ?
      setCollapsible(false)
      :
      setCollapsible(true)
  }




  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Stock Journal > Waste Manager"
        btnToolTip="Waste Item Info"
        addBtnLink="/admin/stock/wasteManagerForm"
        // updateBtnLink="/admin/master/add-item_update_stock"
        // updateBtnToolTip="Update Stock"
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
                    <GridItem xs="6">
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
      {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
      <GridContainer className={classes.root} >
        <GridItem xs="12">
         
            <Card className={classes1.headerCard}>
              <CardHeader className={classes1.TbheaderCdhd} style={{ height: 60 }}>
                <GridContainer justifyContent="space-between" alignItems="center">
                  <GridItem>
                    <h4 className={classes1.headerCdTitle}>Waste Deatails List</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? (
                  <GridItem style={{ cursor: "pointer",display: "none" }}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(enqueryList)} >
                      <Tooltip title="Export to Excel">
                        <img src={require("../../../assets/img/excel.png").default} />
                      </Tooltip>
                    </IconButton>
                  </GridItem>
                  ):(
                    <GridItem style={{ cursor: "pointer" }}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(enqueryList)} >
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
                    rows={allItems}
                  
                   

                  /> : ""}
              </CardBody>
            </Card>
         
        </GridItem>
      </GridContainer>
      )}
    </ThemeProvider>
  );
};

export default WasteManager;
