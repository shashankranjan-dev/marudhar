import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MasterModel from "../../../Components/MasterModel";
import MuiTable from "../../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import { CustomCard } from "../../../Components/CustomCard";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../../Components/CustomButton";

import { ThemeProvider } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { useStateValue } from "../../../../context/context";
import { actionTypes } from "../../../../context/reducer";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import theme from "../../../../theme/theme";
//SERVICE
import { getListShowroomWarehouse } from "../../../../services/showroomWarehouseService";
import {
  getSearchItem,
  getAllCategory,
  getAllBrands,
  getAllItem,
} from "../../../../services/updateItemStockService";
import { getListUom } from "../../../../services/uomService";
import {
  getAllStockTransfer,
  postStockTransfer,
  updatetStockTransfer,
} from "../../../../services/saleService/updateStockTransferService";

import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox, Delete } from "@mui/icons-material";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  appScrollBar,
  tblBodyHoverColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Box, Paper, IconButton } from "@material-ui/core";
import ItemViewCard from "../../HelperComponent/ItemViewCard";
import PageTitle from "../../HelperComponent/PageTitle";
import ReactSelect from "react-select";
import StepProceedModel from "../../HelperComponent/StepProceedModel";
import {
  currentDate,
  calculatePer,
  calculatePerValue,
  dateFormateField,
} from "../../HelperComponent/utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import ItemImg from "../../HelperComponent/ItemImg";
import { QuantityView } from "../AddEnquiryPage";
import FormComponent from "../../HelperComponent/FormComponent";

import { Typography } from "@material-ui/core";
import moment from "moment";
import { showroomWiseSalesData } from "services/showroomWiseSalesService";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: appSecondColor,
    padding: "6px 5px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "6px 5px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
    "&:hover": {
      backgroundColor: tblBodyHoverColor,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  container: {
    ...appScrollBar,
    maxHeight: 360,
  },
  itemImgPaper: {
    width: "80px",
    height: "80px",
    overflow: "hidden",
  },
  addBtn: {
    fontSize: 12,
    width: 30,
    height: 38,
  },
  ddlError: {
    color: "#f44336",
    fontSize: "12px",
    marginRight: 15,
    marginTop: -15,
    fontWeight: 400,
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 15,
    padding: "15px 20px",
  },
  activeText: {
    ...activeText,
  },

  actionbtns: {
    marginTop: 20,
    float: "right",
  },

  id: { width: "0%" },
  itemImg: { width: "8%" },
  itemDetails: { width: "40%" },

  warehouse_stock: { width: "8%" },
  transfer_qty_field: { width: "10%" },
  dd_uom: { width: "20%" },
  addAction: { width: "10%" },
  deleteAction: { width: "10%" },

  customSelect: {
    marginBottom: 15,
  },
}));

const StockTransferPage = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [classicModal, setClassicModal] = React.useState(false);
  const [editedItem, setEditedItem] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  // ddl List
  const [allCategory, setAllCategory] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [allUoms, setAllUoms] = React.useState([]);
  const [addItem, setAddItem] = React.useState({});

  const [showroomwiseData, setshowroomWiseSalesData] = React.useState([]);
  const [allItem, setAllItems] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [stockDetail, setStockDetail] = React.useState({
    edit: false,
    stock_transfer_id: "",
    txt_stock_transfer_no: "AUTO GENERATED",
    transfer_date: currentDate(),
    to_ddl_showroom: "",
    from_showroom_warehouse_id: "",
    txt_note: "",
  });
  let stock_array = []
  const [uomError, setUomError] = React.useState({});
  const [error, setError] = React.useState({
    to_ddl_showroom: false,
  });
  // search State

  const [addSearch, setAddSearch] = React.useState({
    txt_item: "",
  });

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onSelect = (name, v) => {
    setAddSearch({ ...addSearch, [name]: v });
  };

  // const onChange = (e, row) => {
  //   const { name, value } = e.target;
  //   if (name === `txt_quantity${row.item_id}`) {
  //     let stock = row.stock_by_location.find(
  //       (s) => s.showroom_warehouse_id == localStorage.getItem("user_location")
  //     );
  //     if (Number(value) <= Number(stock?.quantity)) {
  //       setStockDetail((prv) => ({
  //         ...prv,
  //         [name]: value,
  //       }));
  //     } else {
  //       dispatch({
  //         type: actionTypes.SET_OPEN_MSG,
  //         payload: {
  //           msg: `Stock Not Available`,
  //           msgType: "warning",
  //         },
  //       });
  //     }
  //   } else {
  //     setStockDetail((prv) => ({
  //       ...prv,
  //       [name]: value,
  //     }));
  //   }
  // };

  const onChange = (e, row) => {
    const { name, value } = e.target;
    if (name === `txt_quantity${row.item_id}`) {
      let stock = showroomwiseData
        .sort((a, b) => a.showroom_warehouse_id - b.showroom_warehouse_id)
        .find(
          (o) =>
            o.item_id === row.item_id &&
            o.showroom_warehouse_id ==
              localStorage.getItem("user_location")
        );
  
      if (stock && Number(value) <= Number(stock.quantity)) {
        setStockDetail((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: `Stock Not Available`,
            msgType: "warning",
          },
        });
      }
    } else {
      setStockDetail((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // on Click add Item
  const onClickAddItem = (r) => {
    if (addedItems.find((v, i) => v.item_id === r.item_id)) {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Item already added", msgType: "info" },
      });
      if (!stockDetail.edit) {
        setStockDetail({
          ...stockDetail,
          [`txt_quantity${r.item_id}`]: "",
          // [`ddl_uom${r.item_id}`]: "",
        });
      }
    } else {
      // if (!stockDetail[`ddl_uom${r.item_id}`]?.value) {
      //   setUomError({
      //     [`ddl_uom${r.item_id}`]: !stockDetail[`ddl_uom${r.item_id}`],
      //   });
      // } else {
        // setUomError({});
        setAddedItems([
          ...addedItems,
          {
            item_id: r.item_id,
            stock_uom: r.uom || r.stock_uom,
            stock_by_location: r.stock_by_location,
            // uom_name: stockDetail[`ddl_uom${r.item_id}`].label,
            uom_name:r.uom || r.stock_uom,
            // uom_id: stockDetail[`ddl_uom${r.item_id}`].value,
            uom_id:r.uom_id || r.stock_uom  ,

            quantity: Number(stockDetail[`txt_quantity${r.item_id}`]),
          },
        ]);
        if (!stockDetail.edit) {
          setStockDetail({
            ...stockDetail,
            [`txt_quantity${r.item_id}`]: "",
            // [`ddl_uom${r.item_id}`]: "",
          });
        }
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: `Item added`,
            msgType: "success",
          },
        });
      // }
    }

  };

  // Delete Added Item
  const onDeleteItem = (e, id) => {
    const restItem = addedItems.filter((a, i) => id !== i);
    setAddedItems(restItem);
    dispatch({
      type: actionTypes.SET_OPEN_MSG,
      payload: {
        msg: `Item Deleted`,
        msgType: "success",
      },
    });
  };

  // onChange BillDetails
  const onChangestockDetails = (e) => {
    const { name, value } = e.target;
    setStockDetail({ ...stockDetail, [name]: value });
  };

  // const onSearchItem = (e) => {
  //   e.preventDefault();

  //   if (addSearch.txt_item || addSearch.ddl_brand || addSearch.ddl_category) {
  //     getSearchItem(
  //       (items) => {
  //         // if (stockDetail.edit) {
  //         //   let newArr = items.filter((item, i) => !editedItem.includes(item));
  //         //   setAllItems(newArr);
  //         // } else {
  //         // }
  //         setAllItems(items);
  //       },
  //       (err) => {
  //         dispatch({
  //           type: actionTypes.SET_OPEN_MSG,
  //           payload: { msg: err, msgType: "error" },
  //         });
  //       },
  //       addSearch
  //     );
  //   }
  // };

  const onSearchItem = (e) => {
    setshowroomWiseSalesData([]);
    e.preventDefault();

    if (addSearch.txt_item || addSearch.ddl_brand || addSearch.ddl_category) {
      const filterList = allShowroomWarehouse.filter(
        (s, i) => s.value != addSearch?.ddl_showroom_warehouse?.value
      );
      getSearchItem(
        (items) => {
          // if (stockDetail.edit) {
          //   let newArr = items.filter((item, i) => !editedItem.includes(item));
          //   setAllItems(newArr);
          // } else {
          // }
          setAllItems(items);
          items.map((h, j) => {
            filterList.map((k, l) => {
              showroomWiseSalesData(
                (showroomwiseD) => {
                  //calculations(showroomwiseData);
                  // setAddItem({});
                  setshowroomWiseSalesData((prev) => [
                    ...prev,
                    {
                      showroom_warehouse_id:
                        showroomwiseD[0].showroom_warehouse_id,
                      quantity: showroomwiseD[0].quantity,
                      item_id: showroomwiseD[0].item_id,
                    },
                  ]);
                  setLoading(false);
                },
                (err) => {
                  dispatch({
                    type: actionTypes.SET_OPEN_MSG,
                    payload: { msg: err, msgType: "error" },
                  });
                },
                h.item_id,
                k.value
              );
            });
          });
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        },
        addSearch
      );
    }
  };

  const onSelectDetails = (name, v) => {
    // console.log(v.value,"sen30",Number(localStorage.getItem("user_location")))
    // console.log(v.value,"sen30")

    if (Number(localStorage.getItem("user_location"))=== v.value ) {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "!!Please Select Different Showroom / Warehouse", msgType: "error" },
      });
    }
    else
    
    {
    setStockDetail({ ...stockDetail, [name]: v });
    }
  };

  // on Click Submit stock
  const onClickUpdateStockTransfer = (e) => {
    let updates_location = []
    let stock_update=[]
   

   
    e.preventDefault();
    // console.log(stockDetail, "sen30")

    // console.log(addedItems, "sen30")
    // console.log(allShowroomWarehouse, "sen30")

    addedItems.map((r, i) => {
      allShowroomWarehouse.map((s, i) => {

        let stock_by_location = r.stock_by_location.filter(o => o.showroom_warehouse_id === s.value)
        // console.log(stock_by_location,"sen30/stock_by_location")
        if (s.value === Number(localStorage.getItem("user_location"))) {
          return updates_location.push({
            showroom_warehouse_id: s.value,
            quantity: stock_by_location[0]?.quantity ? stock_by_location[0]?.quantity - r.quantity : r.quantity,
            date: moment().format("DD/MM/YYYY"),
          });
        } else if (s.value === stockDetail.to_ddl_showroom.value) {
          return updates_location.push({
            showroom_warehouse_id: s.value,
            quantity: stock_by_location[0]?.quantity ? stock_by_location[0]?.quantity + r.quantity : r.quantity,
            date: moment().format("DD/MM/YYYY"),
          });
        }
        else {
          return updates_location.push({
            showroom_warehouse_id: s.value,
            quantity: stock_by_location[0]?.quantity ? Number(stock_by_location[0]?.quantity) : 0,
            date: moment().format("DD/MM/YYYY"),
          });
        }
      });
     stock_update.push({
        item_id:r.item_id,
        stock_by_location:updates_location,
      })
      updates_location = []
    })
    // console.log(stock_update, "sen0108")


    if (!stockDetail.to_ddl_showroom) {
      setError({ to_ddl_showroom: !stockDetail.to_ddl_showroom });
    } else {
      if (addedItems.length > 0) {
        if (stockDetail.edit) {
          updatetStockTransfer(
            stockDetail,
            addedItems,
            stock_update,
            (r) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: {
                  msg: "Stock Transfer Updated Successfully",
                  msgType: "success",
                },
              });
              onClearState();
              setStockDetail((prv) => ({
                ...prv,
                txt_stock_transfer_no: r.stock_transfer_no,
              }));
            },
            (err) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: { msg: err, msgType: "error" },
              });
            }
          );
        } else {
          postStockTransfer(
            stockDetail,
            addedItems,
            stock_update,
            (r) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: {
                  msg: "Stock Transfer Submited Successfully",
                  msgType: "success",
                },
              });
              onClearState();
              setStockDetail((prv) => ({
                ...prv,
                txt_stock_transfer_no: r.stock_transfer_no,
              }));
            },
            (err) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: { msg: err, msgType: "error" },
              });
            }
          );
        }
      } else {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: "Please Add an Item",
            msgType: "warning",
          },
        });
      }
    }
  
  };

  const onClickRefresh = () => {
    setAddSearch({
      txt_item: "",
      ddl_brand: "",
      ddl_category: "",
      ddl_showroom_warehouse: "",
    });
    setRefresh(!refresh);
  };

  const fetchData = () => {
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
    getListUom(
      (r) => {
        setAllUoms(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    // setLoading(true);
    // if (!location.state?.edit) {
    //   getAllItem(
    //     (items) => {
    //       setAllItems(items);
    //       setLoading(false);
    //     },
    //     (err) => {
    //       dispatch({
    //         type: actionTypes.SET_OPEN_MSG,
    //         payload: { msg: err, msgType: "error" },
    //       });
    //       setLoading(false);
    //     }
    //   );
    // }
  };
  React.useEffect(() => {
    fetchData();
    if (location.state?.row) {
      getAllStockTransfer(
        (r) => {
          r.map((item) => {
            setAllItems(item.stock_transfer_details);
            item.stock_transfer_details.map((s) => {
              setStockDetail((prv) => ({
                ...prv,
                edit: location.state?.edit,
                stock_transfer_id: item.stk_stock_transfer_id,
                txt_stock_transfer_no: item.stk_transfer_no,
                transfer_date: dateFormateField(item.stk_transfer_date),
                to_ddl_showroom: {
                  value: item.to_showroom_warehouse_id,
                  label: item.stk_transfer_to,
                },
                txt_note: item.stk_note,
                [`txt_quantity${s.item_id}`]: s.quantity,
                [`ddl_uom${s.item_id}`]: {
                  value: s.uom_id,
                  label: s.uom_name,
                },
              }));
            });
          });
          setLoading(false);
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
          setLoading(false);
        },
        location.state?.row.stk_stock_transfer_id
      );
    }
  }, [refresh]);

  // Form Data
  const formData = [
    {
      formName: "stockDetails",
      fields: [
        {
          disabled: true,
          name: "txt_stock_transfer_no",
          label: "Stock Transfer No",
          hidden: false,
          required: false,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 3,
        },
        {
          name: "transfer_date",
          label: "Date",
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
          name: "to_ddl_showroom",
          label: "Transfer To",
          hidden: false,
          required: true,
          data_type: "string",
          html_element: "select_two",
          xs: 12,
          md: 6,
          lg: 3,
          options: allShowroomWarehouse,
        },
        {
          name: "txt_note",
          label: "Note ",
          hidden: false,
          required: false,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 4,
        },
      ],
    },
  ];

  const onClearState = () => {
    setClassicModal(true);
    setError({});
    setUomError({});
    setAddedItems([]);
    setStockDetail({
      edit: false,
      stock_transfer_id: "",
      transfer_date: currentDate(),
      to_ddl_showroom: "",
      from_showroom_warehouse_id: Number(localStorage.getItem("user_location")),
      txt_note: "",
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title={
          stockDetail.edit
            ? "Sales > Stock Transfer > Edit"
            : "Sales > Stock Transfer"
        }
      />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search Items">
            <form>
              <GridContainer style={{ padding: "10px" }} alignItems="flex-end">
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
                    onChange={(v, info) => onSelect(info.name, v)}
                    value={addSearch.ddl_brand}
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
                    onChange={(v, info) => onSelect(info.name, v)}
                    value={addSearch.ddl_category}
                  />
                </GridItem>
                <GridItem xs="6">
                  <InputLabel id="label">Item</InputLabel>
                  <TextField
                    size="small"
                    placeholder="Item"
                    name="txt_item"
                    onChange={onAddSearch}
                    // style={{ marginBottom: -5 }}
                    type="text"
                    id="outlined-basic"
                    fullWidth={true}

                    value={addSearch.txt_item}
                    variant="outlined"
                  />
                </GridItem>

                <GridItem xs={12}>
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
            </form>
          </CustomCard>
        </GridItem>
      </GridContainer>

      {/* Select and Add Items */}

      <GridContainer className={classes.root}>
        <GridItem xs={12}>
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard
              cdTitle="Select and Add Item"
              width="100%"
              maxHeight={380}
            >
              <TableContainer className={classes.container}>
                <Table
                  className={classes.table}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" className={classes.id}>
                        #
                      </StyledTableCell>
                      <StyledTableCell align="left">Image</StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.itemDetails}
                      >
                        Item Details
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.warehouse_stock}
                      >
                        Stock
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.warehouse_stock}
                      >
                        Unit
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.transfer_qty_field}
                      >
                        Transfer Qty
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.ddl_uom}>
                        Unit
                      </StyledTableCell>

                      <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {console.log("sank04081",allItem)} */}
                    {allItem.map((row, i) => (
                      <StyledTableRow key={i}>
                        <StyledTableCell align="center" className={classes.id}>
                          {i + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.itemImg}
                        >
                          <Paper className={classes.itemImgPaper}>
                            <ItemImg item_id={row.item_id} />
                          </Paper>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.stockDetails}
                        >
                          <ItemViewCard item_id={row.item_id} />
                        </StyledTableCell>

                        {showroomwiseData
                          .sort(
                            (a, b) =>
                              a.showroom_warehouse_id - b.showroom_warehouse_id
                          )
                          .filter(
                            (o) =>
                              o.item_id === row.item_id &&
                              o.showroom_warehouse_id ==
                                localStorage.getItem("user_location")
                          )
                          .map((k, l) => {
                            return (
                              <StyledTableCell
                                align="center"
                                className={classes.warehouse}
                              >
                                {Number(k.quantity).toFixed(2)}
                              </StyledTableCell>
                            );
                          })}

                        {/* <StyledTableCell
                          align="right"
                          className={classes.warehouse_stock}
                        >
                          {row.stock_by_location
                            ? row.stock_by_location.find(
                              (s) =>
                                s.showroom_warehouse_id ==
                                localStorage.getItem("user_location")
                            )
                              ? row.stock_by_location.find(
                                (s) =>
                                  s.showroom_warehouse_id ==
                                  localStorage.getItem("user_location")
                              ).quantity
                              : "00"
                            : "00"}
                            {/* {row.stock_by_location
                            ? row.stock_by_location.find(
                              (s) =>
                              s.showroom_warehouse_id ==
                              localStorage.getItem("user_location")
                          ).quantity
                          :"00"
                            } */}
                        {/* </StyledTableCell> */}
                        <StyledTableCell
                          align="left"
                          className={classes.warehouse_stock}
                        >
                          {row.uom ? row.uom : row.stock_uom}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.transfer_qty_field}
                        >
                          <TextField
                            size="small"
                            placeholder="Qty"
                            name={`txt_quantity${row.item_id}`}
                            style={{ marginBottom: -15 }}
                            type="number"
                            inputProps={{ style: { textAlign: "right" } }}
                            onChange={(e) => onChange(e, row)}
                            id="outlined-basic"
                            fullWidth={true}
                            value={stockDetail[`txt_quantity${row.item_id}`]}
                            variant="outlined"
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.warehouse_stock}
                        >
                          {row.uom ? row.uom : row.stock_uom}

                          {/* <ReactSelect
                            name={`ddl_uom${row.item_id}`}
                            options={allUoms}
                            formatGroupLabel={(d) => d.label}
                            menuPortalTarget={document.body}
                            styles={reactSelectStyles}
                            onChange={(v, info) =>
                              onSelectDetails(info.name, v)
                            }
                            value={stockDetail[`ddl_uom${row.item_id}`]}
                          /> */}
                          {/* {uomError[`ddl_uom${row.item_id}`] && (
                            <div className={classes.ddlError}>
                              UOM is Required
                            </div>
                          )} */}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.addAction}
                        >
                          <Button
                            onClick={() => onClickAddItem(row)}
                            className={classes.addBtn}
                            size="small"
                            varient="outlined"
                            color="primary"
                          >
                            Add
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CustomCard>
          )}
        </GridItem>

        {addedItems.length > 0 && (
          <GridItem xs="12">
            <CustomCard cdTitle={"Review Added Items"} maxHeight={400}>
              <TableContainer className={classes.container}>
                <Table
                  className={classes.table}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" className={classes.id}>
                        #
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.itemImg}>
                        Image
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.itemDetails}
                      >
                        Item Details
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.warehouse_stock}
                      >
                        Stock
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.warehouse_stock}
                      >
                        Unit
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.transfer_qty_field}
                      >
                        Transfer Qty
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.viewUOM}>
                        Unit
                      </StyledTableCell>

                      <StyledTableCell
                        align="right"
                        className={classes.deleteAction}
                      >
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {addedItems.map((row, i) => (
                      <StyledTableRow key={i}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                          className={classes.id}
                        >
                          {1 + i}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.itemImg}
                        >
                          <Paper className={classes.itemImgPaper}>
                            <ItemImg item_id={row.item_id} />
                          </Paper>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.ViewstockDetails}
                        >
                          <ItemViewCard item_id={row.item_id} />
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.warehouse_stock}
                        >
                          {row.stock_by_location
                            ? row.stock_by_location.find(
                              (s) =>
                                s.showroom_warehouse_id ==
                                localStorage.getItem("user_location")
                            ).quantity
                            : "00"}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.warehouse_stock}
                        >
                          {row.stock_uom}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.transfer_qty_field}
                        >
                          {row.quantity}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.ddl_uom}
                        >
                          {row.uom_name}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.deleteAction}
                        >
                          <IconButton
                            onClick={(e) => onDeleteItem(e, i)}
                            aria-label="delete"
                          >
                            <DeleteIcon
                              fontSize="small"
                              style={{ color: "#f44336" }}
                            />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CustomCard>
          </GridItem>
        )}

        {(addedItems.length > 0 || stockDetail.edit) && (
          <GridItem xs="12">
            <CustomCard
              cdTitle={
                stockDetail.edit
                  ? " Edit Stock Transfer Details"
                  : "Stock Transfer Details"
              }
              width="100%"
              height="100%"
              style={{ marginTop: 0 }}
            >
              {formData.map((form, fkey) => {
                return (
                  <GridContainer key={fkey} style={{ padding: "5px 20px" }}>
                    {form.formName === "stockDetails" &&
                      form.fields.map((item, key) => {
                        return (
                          <FormComponent
                            item={item}
                            key={key}
                            onSelect={onSelectDetails}
                            state={stockDetail}
                            onChange={onChangestockDetails}
                            error={error}
                          />
                        );
                      })}
                  </GridContainer>
                );
              })}
            </CustomCard>
          </GridItem>
        )}

        {(addedItems.length > 0 || stockDetail.edit) && (
          <GridItem xs={12}>
            <div className={classes.actionbtns}>
              <Button
                onClick={onClickUpdateStockTransfer}
                className={classes.actionbtn}
                variant="outlined"
                color="primary"
              >
                Submit Stock Transfer
              </Button>
            </div>
          </GridItem>
        )}

        <MasterModel
          classicModal={classicModal}
          onCloseModel={() => setClassicModal(false)}
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
            setClassicModal(false);
            history.push("/admin/procurement/stock-transfer");
          }}
        >
          <StepProceedModel
            step={1}
            isStep={false}
            title="Success !"
            desc="Stock Transfer No"
            generateNo={stockDetail.txt_stock_transfer_no}
          />
        </MasterModel>
      </GridContainer>
    </ThemeProvider>
  );
};

export default StockTransferPage;
