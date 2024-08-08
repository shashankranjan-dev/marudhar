import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import { CustomCard } from "../../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../../Components/CustomButton";
import { getAllStockTransferBYId,getSearchStockTransfer } from "../../../../services/saleService/updateStockTransferService";
import { getListShowroomWarehouse } from "../../../../services/showroomWarehouseService";

import { ThemeProvider, Box,IconButton } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import theme from "../../../../theme/theme";

import { useStateValue } from "../../../../context/context";
import { actionTypes } from "../../../../context/reducer";

// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState } from "react";
import PageTitle from "../../HelperComponent/PageTitle";
import { PageHeader } from "../../HelperComponent/PageTitle";
import { currentDate } from "views/Pages/HelperComponent/utils";
import FormComponent from "views/Pages/HelperComponent/FormComponent";
import { currentDate1 } from "views/Pages/HelperComponent/utils";
// import MasterModelForView from "../../../../Components/MasterModelForView";
import TransferView from "./TransferView";
import {  useLocation } from "react-router-dom";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from 'file-saver';
import XLSX from 'xlsx'
import MasterModelForView from "../../../Components/MasterModelForView";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles1 = makeStyles(styles);





// import {
//   getSearchStockTransfer
// } from "../../../../services/updateItemStockService";
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
    fontSize: "15px",
    color: appSecondColor,
    fontWeight: 400,
  },
}));

//for excel list
// const { ExportCSVButton }=CSVExport;
// const MyExportCSV =(props) => {
//   const handleClick=() => {
//     props.onExport();
//   }; 
// }


const StockTransterListPage = () => {
  const classes1 = useStyles1()

  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [allStockTransfer, setAllStockTransfer] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [viewRes, setViewRes] = React.useState("hidden");
  const [classicModal, setClassicModal] = React.useState(false);
  const [classicModalView, setClassicModalView] = React.useState(false);
  const location = useLocation();
  const [addedItems, setAddedItems] = React.useState({});
  const [itemDetails, setItemDetails] = React.useState([]);
   

  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [searchDetail, setSearchDetail] = React.useState({
    txt_transfer_date_from: currentDate1(),
    txt_transfer_date_to: currentDate(),
    ddl_showroom_warehouse_id_from: "",
    ddl_showroom_warehouse_id_to: "",
  });
  const [allItem, setAllItems] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({  
    ddl_showroom_warehouse_id_from:"",
      ddl_showroom_warehouse_id_to:"",
      txt_transfer_date_from: currentDate1(),
    txt_transfer_date_to: currentDate(),
  });
  const onSelectDetails = (name, v) => {
    setSearchDetail({ ...searchDetail, [name]: v });
  };

  const onClickRefresh = () => {
    setRefresh(!refresh);
    setSearchDetail({
 
      ddl_showroom_warehouse_id_from:"",
      ddl_showroom_warehouse_id_to:"",
      txt_transfer_date_from: currentDate1(),
    txt_transfer_date_to: currentDate(),
    });
    
  };


  const onSearchStockTransfer = (e) => {
    // setRefresh(!refresh);
    e.preventDefault();
    // setLoading(true);
   
    if (searchDetail.ddl_showroom_warehouse_id_from?.value || searchDetail.ddl_showroom_warehouse_id_to?.value || 
      searchDetail.txt_transfer_date_from || searchDetail.txt_transfer_date_to )  
      {
    // console.log("printzzzzzzzzz")
    setLoading(true);

      getSearchStockTransfer
      (
        
        (r) => {
          setLoading(false);
          setAllStockTransfer(r);
          setViewRes("visible");

        },
        (err) => {
          setViewRes("visible");
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
          setLoading(false);

        },
        
        searchDetail
      );
   }
  
  };


  const headerData = [
    {
      id: "serial_id",
      label: "#",
      align: "left",
    },
    {
      id: "stk_transfer_date",
      label: "Date",
      align: "left",
    },
    {
      id: "stk_transfer_no",
      label: "Stock Transfer No",
      align: "left",
    },

    {
      id: "stk_transfer_from",
      label: "From",
      align: "left",
    },
    {
      id: "stk_transfer_to",
      label: "To",
      align: "left",
    },
    {
      id: "stk_quantity",
      label: "Qty",
      align: "center",
    },
    {
      id: "stk_note",
      label: "Note",
      align: "left",
    },
    {
      id: "stk_action",
      label: "Action",
      align: "right",
    },
  ];
  const viewData = [
    
    {
      id: "stk_transfer_date",
      label: "Date",
      align: "left",
    },
    {
      id: "stk_transfer_no",
      label: "Stock Transfer No",
      align: "left",
    },

    {
      id: "stk_transfer_from",
      label: "From",
      align: "left",
    },
    {
      id: "stk_transfer_to",
      label: "To",
      align: "left",
    },
    {
      id: "stk_note",
      label: "Note",
      align: "left",
    },
    {
      id: "stk_action",
      label: "Action",
      align: "right",
    },
  ];

  //////////////view module////////////
  const onClickView = (e) => {
  //  console.log("sankh01081",e)
    setClassicModalView(true)
    
   
          setAddedItems(e);
          setItemDetails(e.stock_transfer_details);
    
  }

  const onChangeSearchForm = (e) => {
    const { name, value } = e.target;
    setSearchDetail({ ...searchDetail, [name]: value });
  };

  // fetching Date
  const fetchDate = () => {
    // setLoading(true);
    getListShowroomWarehouse(
      (r) => {
        setAllShowroomWarehouse(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    setLoading(false);
    // getAllStockTransfer(
    //   (r) => {
    //     setAllStockTransfer(r);
    //     setLoading(false);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );
  };

  React.useEffect(() => {
    fetchDate();
  }, [refresh]);

  const formData = [
    {
      name: "ddl_showroom_warehouse_id_from",
      label: "From",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "select_two",
      xs: 12,
      md: 6,
      lg: 3,
      options: allShowroomWarehouse,
    },
    {
      name: "ddl_showroom_warehouse_id_to",
      label: "To",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "select_two",
      xs: 12,
      md: 6,
      lg: 3,
      options: allShowroomWarehouse,
    },

    {
      name: "txt_transfer_date_from",
      label: "Date Between",
      hidden: false,
      required: false,
      align: "left",
      data_type: "date",
      html_element: "TextField",
      error: false,
      xs: 12,
      md: 4,
      lg: 2,
    },
    {
      name: "txt_transfer_date_to",
      hidden: false,
      required: false,
      align: "left",
      data_type: "date",
      html_element: "TextField",
      error: false,
      xs: 12,
      md: 4,
      lg: 2,
    },
  ];

  const onhandleExportToExcel = () => {
    const StockTransferDetailsTable = allStockTransfer.map(StockTransfer => {
      return {
        serial_id: StockTransfer.serial_id,
        Stock_transfer_date: StockTransfer.stk_transfer_date,
        Stock_transfer_no: StockTransfer.stk_transfer_no,
        Transfer_from: StockTransfer.stk_transfer_from,
        Transfer_to: StockTransfer.stk_transfer_to,
        Note: StockTransfer.stk_note,
       
         

      }
    })



    const fileName = 'Stock Transfer Details'
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(StockTransferDetailsTable);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  return (
    <ThemeProvider theme={theme}>
      <PageHeader
        title="Sales > Stock Transfer"
        addBtnLink="/admin/procurement/stock-transfer-add"
        btnToolTip="Add Stock Transfer"
      />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Stock Transfer">
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
                      error={{}}
                    />
                  </>
                );
              })}
              <GridItem xs="2">
                <div className={classes.searchbtnRight}>
                <CustomButton
                      type="submit"
                      onClick={onSearchStockTransfer}
                      name="btn_refres"
                      style={{ marginRight: "10px" }}
                      
                    >
                      <SearchIcon />
                      
                    </CustomButton>
                    <CustomButton name="btn_refres" onClick={onClickRefresh}>
                      <RotateLeftIcon />
                    </CustomButton>
                </div>
              </GridItem>
            </GridContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center" style={{ "visibility": viewRes }}>
              <CircularProgress />
            </Box>
          ) : (
            <GridContainer className={classes.root} style={{ "visibility": viewRes }}>
        <GridItem xs="12">
         
            <Card className={classes1.headerCard}>
              <CardHeader className={classes1.TbheaderCdhd} style={{ height: 60 }}>
                <GridContainer justifyContent="space-between" alignItems="center">
                  <GridItem>
                    <h4 className={classes1.headerCdTitle}>Stock Transfer Details</h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? ( 
                  <GridItem style={{ cursor: "pointer",display: "none" }}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(allStockTransfer)} >
                      <Tooltip title="Export to Excel">
                        <img src={require("../../../../assets/img/excel.png").default} />
                      </Tooltip>
                    </IconButton>
                  </GridItem>
                  ):(
                    <GridItem style={{ cursor: "pointer" }}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(allStockTransfer)} >
                      <Tooltip title="Export to Excel">
                        <img src={require("../../../../assets/img/excel.png").default} />
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
           
              {!refresh?<MuiTable 
              columns={headerData} 
              rows={allStockTransfer} 
              onClickViewOne={onClickView}

              
              />:""}
            
            </CardBody>
            </Card>
          
        </GridItem>
      </GridContainer>
          )}
        </GridItem>
      </GridContainer>
      <MasterModelForView
        classicModal={classicModalView}
        viewHeader="Stock Transfer View"
        onCloseModel={(e) => {
          e.preventDefault();
          setClassicModalView(false);
        }}
      >
        <TransferView
          title="Stock Transfer "
          viewData={viewData}
          addedItems={addedItems}
          itemDetails={itemDetails}
          // allStatus={allStatus}
          // otherCharges={otherCharges}
        />
      </MasterModelForView>
    </ThemeProvider>
  );
};

export default StockTransterListPage;
