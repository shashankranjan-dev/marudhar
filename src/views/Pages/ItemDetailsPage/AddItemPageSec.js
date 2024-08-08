import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../Components/CustomButton";

import { ThemeProvider } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import theme from "../../../theme/theme";
//SERVICE
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";
import {
  getSearchItem,
  getAllCategory,
  getAllBrands,
  getAllItem,
  postUpdateStock,
} from "../../../services/updateItemStockService";
import React from "react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";
// import { ColoseButton } from "../Components/CustomButton";

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
import { Grid, Box } from "@material-ui/core";
import ItemViewCard from "../HelperComponent/ItemViewCard";
import PageTitle from "../HelperComponent/PageTitle";
import ReactSelect from "react-select";
import StepProceedModel from "../HelperComponent/StepProceedModel";
import {
  currentDate,
  calculatePer,
  calculatePerValue,
} from "../HelperComponent/utils";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Typography } from "@material-ui/core";

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
    maxHeight: 380,
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

  searchBar: {
    marginTop: 10,
    marginBottom: 15,
    padding: "15px 20px",
  },
  activeText: {
    ...activeText,
  },

  as_on_date: {
    width: "8%",
  },

  actionbtns: {
    marginTop: 20,
    float: "right",
  },

  id: {
    width: "5%",
  },
  doubleFiled: {
    width: "20%",
  },

  action: {
    width: "10%",
  },
  rate: {
    width: "8%",
  },
  value: {
    width: "15%",
  },
  itemDetails: {
    width: "30%",
  },

  showroom: {
    width: "8%",
  },
  customSelect: {
    marginBottom: 15,
  },
}));

const AddItemPageSec = () => {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [classicModal, setClassicModal] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  // ddl List
  const [allCategory, setAllCategory] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);

  const [showShoroms, setShowShorooms] = React.useState([]);

  const [allItem, setAllItems] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [addItem, setAddItem] = React.useState({});

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

  const onChange = (e, row, showroom_warehouse_id) => {
    const { name, value } = e.target;
    setAddItem((prv) => ({
      ...prv,
      [name]: value ? Number(value) : 0,
    }));
  };

  //console.log(addItem,"222")

  const onSearchItem = (e) => {
    e.preventDefault();
    if (addSearch?.ddl_showroom_warehouse?.value) {
      if (addSearch?.ddl_showroom_warehouse?.value === "all") {
        setShowShorooms(allShowroomWarehouse);
      } else {
        const filterList = allShowroomWarehouse.filter(
          (s, i) => s.value === addSearch?.ddl_showroom_warehouse?.value
        );
        setShowShorooms(filterList);
      }
    }
    if (addSearch.txt_item || addSearch.ddl_brand || addSearch.ddl_category) {
      getSearchItem(
        (items) => {
          setAddItem({});
          setAllItems(items);
          items.map((r, i) => {
            setAddItem((prv) => ({
              ...prv,
              [`txt_rate_${r.item_id}_${r.id}`]: r.selling_price,
              [`txt_value_${r.item_id}_${r.id}`]: 0,
            }));
            if (r.stock_by_location.length) {
              r.stock_by_location.map((s, i) =>
                setAddItem((prv) => ({
                  ...prv,
                  [`txt_value_${r.item_id}_${r.id}`]: r.current_over_stock,
                  [`stock_${s.showroom_warehouse_id}_${r.item_id}_${r.id}`]: s.quantity ? s.quantity : 0,
                  [`purchase_rate_${s.showroom_warehouse_id}_${r.item_id}_${r.id}`]: s.rate,

                  [`as_on_date_${r.item_id}_${r.id}`]: s.date,
                }))
              );
            }
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

  // //console.log(addItem);

  const onClickUpdateStock = (row) => {
    let arr = [];
    if (showShoroms.length) {
      // //console.log("123456789",showShoroms.length)
      showShoroms.map((s, i) => {
        //console.log(s.value,"PRIYANKA MAM123456")
        
        arr.push({
          showroom_warehouse_id: s.value,
          quantity:
            addItem[
              `stock_${s.value}_${row.item_id}_${row.id}`
            ] ? addItem[
              `stock_${s.value}_${row.item_id}_${row.id}`
            ] : 0,
          rate: addItem[`txt_rate_${row.item_id}_${row.id}`],
          value:
            Number(
              addItem[
                `stock_${s.value}_${row.item_id}_${row.id}`
              ] ? addItem[
                `stock_${s.value}_${row.item_id}_${row.id}`
              ] : 0
            ) * Number(addItem[`txt_rate_${row.item_id}_${row.id}`]),
          date: addItem[`as_on_date_${row.item_id}_${row.id}`],
          purchase_rate:addItem[`purchase_rate_${s.value}_${row.item_id}_${row.id}`
          ],
        });
      });
    } else {
      showShoroms.map((s, i) => {

        //console.log(s.value,"PRIYANKA MAM")
        arr.push({
          showroom_warehouse_id: s.value,
          
          quantity: addItem[`stock_${s.value}_${row.item_id}_${row.id}`],
          rate: addItem[`txt_rate_${row.item_id}_${row.id}`],
          value:
            Number(addItem[`stock_${s.value}_${row.item_id}_${row.id}`]) *
            Number(addItem[`txt_rate_${row.item_id}_${row.id}`]),
          date: addItem[`as_on_date_${row.item_id}_${row.id}`],
        });
      });
    }

    postUpdateStock(
      {
        item_id: row.item_id,
        current_over_stock: arr.reduce(
          (sum, li) => Number(sum) + Number(li.quantity ? li.quantity : 0),
          0
        ),
        stock_by_location: arr,
      },
      (r) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: "Stock Update Successfully",
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
        setAllShowroomWarehouse([
          { value: "", label: "None" },
          { value: "all", label: "All" },
          ...r,
        ]);
        if (addSearch?.ddl_showroom_warehouse?.value) {
          if (addSearch?.ddl_showroom_warehouse?.value === "all") {
            setShowShorooms(r);
          } else {
            const filterList = allShowroomWarehouse.filter(
              (s, i) => s.value === addSearch?.ddl_showroom_warehouse?.value
            );
            setShowShorooms(filterList);
          }
        } else {
          setShowShorooms(r);
        }
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
    // setLoading(true);

    // getAllItem(
    //   (items) => {
    //     setAllItems(items);
    //     items.map((r, i) => {
    //       setAddItem((prv) => ({
    //         ...prv,
    //         [`txt_rate_${r.item_id}_${r.id}`]: r.selling_price,
    //         [`txt_value_${r.item_id}_${r.id}`]: 0,
    //       }));
    //       if (r.stock_by_location.length) {
    //         r.stock_by_location.map((s, i) =>
    //           setAddItem((prv) => ({
    //             ...prv,
    //             [`txt_value_${r.item_id}_${r.id}`]: r.current_over_stock,
    //             [`stock_${s.showroom_warehouse_id}_${r.item_id}_${r.id}`]: s.quantity,
    //             [`as_on_date_${r.item_id}_${r.id}`]: s.date,
    //           }))
    //         );
    //       }
    //     });
    //     setLoading(false);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //     setLoading(false);
    //   }
    // );
  };
  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="Master > Item Details > Update Stock" />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle="Update Stock "
            filterIcon
            onClickFilter={() => {}}
          >
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
                    style={{ marginBottom: -15 }}
                    type="text"
                    id="outlined-basic"
                    fullWidth={true}
                    // style={{ marginBottom: -1 }}
                    value={addSearch.txt_item}
                    variant="outlined"
                  />
                </GridItem>
                <GridItem xs="3">
                  <InputLabel id="label">Showroom / Warehouse</InputLabel>
                  <ReactSelect
                    options={allShowroomWarehouse}
                    placeholder="Select"
                    name="ddl_showroom_warehouse"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    // className={classes.customSelect}
                    onChange={(v, info) => onSelect(info.name, v)}
                    value={addSearch.ddl_showroom_warehouse}
                  />
                </GridItem>

                <GridItem xs="9">
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
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard cdTitle="Select and Add Update Stocks" maxHeight={400}>
              <TableContainer className={classes.container}>
                <TableHead
                  className={classes.table}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" className={classes.id}>
                        #
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.itemDetails}
                      >
                        Item Details
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.valueField}
                      >
                        UOM
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.as_on_date}
                      >
                        Date
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.showroom}
                      >
                        MRP
                      </StyledTableCell>
                      {showShoroms.map((s, i) => {
                        if (s.value && s.value !== "all") {
                          return (
                            <StyledTableCell
                              align="left"
                              key={i}
                              className={classes.showroom}
                            >
                              {s.label}
                            </StyledTableCell>
                          );
                        }
                      })}

                      {/* <StyledTableCell
                        align="left"
                        className={classes.showroom}
                      >
                        Value
                      </StyledTableCell> */}
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {/* {//console.log(allItem,"from addite pagesec")} */}
                    {allItem.map((row, i) => (
                      <StyledTableRow key={i}>
                        <StyledTableCell align="center" className={classes.id}>
                          {row.id}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.itemDetails}
                        >
                          <ItemViewCard item_id={row.item_id} />
                        </StyledTableCell>

                        <StyledTableCell
                          align="left"
                          className={classes.valueField}
                        >
                          {row.uom}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.as_on_date}
                        >
                          <TextField
                            size="small"
                            name={`as_on_date_${row.item_id}_${row.id}`}
                            style={{ marginBottom: -15, width: 135 }}
                            type="date"
                            onChange={(e) => onChange(e, row)}
                            defaultValue={currentDate()}
                            id="outlined-basic"
                            fullWidth={true}
                            value={
                              addItem === null
                                ? currentDate()
                                : addItem[`as_on_date_${row.item_id}_${row.id}`]
                            }
                            variant="outlined"
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.showroom}
                        >
                          <TextField
                            size="small"
                            placeholder="Rate"
                            name={`txt_rate_${row.item_id}_${row.id}`}
                            style={{ marginBottom: -15 }}
                            type="number"
                            // onChange={(e) => onChange(e, row)}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            value={row.mrp}
                            variant="outlined"
                          />
                        </StyledTableCell>
                        {showShoroms.map((s, i) => {
                          if (s.value && s.value !== "all") {
                            return (
                              <StyledTableCell
                                key={i}
                                align="center"
                                className={classes.showroom}
                              >
                              
                                <TextField
                                  size="small"
                                  placeholder={s.label}
                                  name={`stock_${s.value}_${row.item_id}_${row.id}`}
                                  style={{ marginBottom: -15 }}
                                  type="number"
                                  onChange={(e) => onChange(e, row, s.value)}
                                  inputProps={{ style: { textAlign: "right" } }}
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={
                                    Number(addItem[
                                      `stock_${s.value}_${row.item_id}_${row.id}`
                                    ]).toString()
                                  }
                                  variant="outlined"
                                />

                              <TextField
                                  size="small"
                                  placeholder={s.label}
                                  name={`purchase_rate_${s.value}_${row.item_id}_${row.id}`}
                                  style={{ marginBottom: -15 }}
                                  type="number"
                                  onChange={(e) => onChange(e, row, s.value)}
                                  inputProps={{ style: { textAlign: "right" } }}
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={
                                    addItem[
                                      `purchase_rate_${s.value}_${row.item_id}_${row.id}`
                                    ]
                                  }
                                  variant="outlined"
                                />
                              </StyledTableCell>
                              
                            );
                          }
                        })}

                        {/* <StyledTableCell
                          align="left"
                          className={classes.showroom}
                        >
                          {showShoroms.map((s, i) => {
                          <TextField
                            size="small"
                            placeholder="Value"
                            name={`txt_value_${row.item_id}_${row.id}`}
                            style={{ marginBottom: -15 }}
                            type="number"
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            value={
                              addItem[`txt_value_${row.item_id}_${row.id}`]
                            }
                            variant="outlined"
                          />
                          })}
                        </StyledTableCell> */}

                        <StyledTableCell
                          align="center"
                          className={classes.action}
                        >
                          <div>
                            <Button
                              type="submit"
                              onClick={() => onClickUpdateStock(row)}
                              className={classes.addBtn}
                              size="small"
                              varient="outlined"
                              color="primary"
                            >
                              Update
                            </Button>
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </TableHead>
              </TableContainer>
            </CustomCard>
          )}
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default AddItemPageSec;
