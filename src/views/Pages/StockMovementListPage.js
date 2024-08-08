import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import { CustomCard } from "../Components/CustomCard";
import {
  getAllCategory,
  getAllBrands,
} from "../../services/itemsService";
import CustomButton, { CircleAddBtn } from "../Components/CustomButton";
import { getAllStockTransfer } from "../../services/saleService/updateStockTransferService";
import { getAllStockMovement } from "../../services/StockMovementService";
import { getListShowroomWarehouse } from "../../services/showroomWarehouseService";

import { ThemeProvider, Box } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import theme from "../../theme/theme";

import { useStateValue } from "../../context/context";
import { actionTypes } from "../../context/reducer";

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
import PageTitle from "./HelperComponent/PageTitle";
import { PageHeader } from "./HelperComponent/PageTitle";
import { currentDate ,sortWord} from "views/Pages/HelperComponent/utils";
import FormComponent from "views/Pages/HelperComponent/FormComponent";
import { currentDate1 } from "./HelperComponent/utils";

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

const DispatchOrdersPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [allStockTransfer, setAllStockTransfer] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [allCategory, setAllCategory] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);

  const [allStockMovement, setAllStockMovement] = React.useState([]);
  const [error,setError] = React.useState({
    ddl_showroom_warehouse:false,
    txt_item: false,
  })
  const [searchDetail, setSearchDetail] = React.useState({
    txt_item: "",
    txt_transfer_date_from: currentDate1(),
    txt_transfer_date_to: currentDate(),
    ddl_showroom_warehouse:"",
    ddl_brand:"",
    ddl_category:""
  });

  const onSelectDetails = (name, v) => {
    setSearchDetail({ ...searchDetail, [name]: v });
  };

  const headerData = [
    {
      id: "serial_id",
      label: "#",
      align: "left",
    },
    {
      id: "stk_movement_date",
      label: "Date",
      align: "left",
    },

    {
      id: "opning_stk",
      label: "Opning Stock",
      align: "right",
    },
    {
      id: "stk_in",
      label: "Stock In",
      align: "right",
    },
    {
      id: "stk_out",
      label: "Stock Out",
      align: "right",
    },
    {
      id: "closing_stk",
      label: "Closing Stock",
      align: "right",
    },
    {
      id: "stk_action",
      label: "Action",
      align: "right",
    },
  ];

  const onChangeSearchForm = (e) => {
    const { name, value } = e.target;
    setSearchDetail({ ...searchDetail, [name]: value });
  };

  // fetching Date
  const fetchDate = () => {
    getListShowroomWarehouse(
      (r) => {
        setAllShowroomWarehouse(r)
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
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

    setLoading(true);
    getAllStockTransfer(
      (r) => {
        setAllStockTransfer(r);
        setLoading(false);
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
    fetchDate();
  }, []);

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
      data_type: "string",
      html_element: "TextField",
      xs: 12,
      md: 6,
      lg: 4,
    },
    {
      name: "ddl_showroom_warehouse",
      label: "Showroom / Warehouse",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "select_two",
      xs: 12,
      md: 6,
      lg: 4,
      options: allShowroomWarehouse.sort(sortWord("label")),
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

  const onSearch = (e)=>{

    e.preventDefault();
    if(searchDetail.txt_item || searchDetail.ddl_showroom_warehouse?.value){
      setError({ddl_showroom_warehouse:false,txt_error:false});
      getAllStockMovement(
        (r) => {
          setAllStockMovement(r);
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        },
        searchDetail
      );
    }else{
      setError({ddl_showroom_warehouse:!searchDetail.ddl_showroom_warehouse,txt_item:!searchDetail.txt_ite})
    }


  }

  return (
    <ThemeProvider theme={theme}>
      <PageHeader title="Stock Movement" />
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
                      error={error}
                    />
                  </>
                );
              })}
              <GridItem xs="4">
                <div className={classes.searchbtnRight}>
                  <CustomButton style={{ marginRight: "10px" }} onClick={onSearch}>
                    <SearchIcon />
                  </CustomButton>
                  <CustomButton>
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
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard cdTitle="Stock Movement" maxHeight="auto">
              <MuiTable columns={headerData} rows={allStockMovement} />
            </CustomCard>
          )}
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default DispatchOrdersPage;
