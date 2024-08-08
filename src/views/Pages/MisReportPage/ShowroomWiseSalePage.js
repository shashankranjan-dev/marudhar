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
  getAllCategory,
  getAllBrands,
  getAllItem,
  // postUpdateStock,
} from "../../../services/updateItemStockService";
//SERVICE
import {
  showroomWiseSalesData,
  getItemByName,
} from "../../../services/showroomWiseSalesService";

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
import ShowroomWarehousePage from "../SettingsPages/ShowroomWarehousePage";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import { IconButton, OutlinedInput } from "@material-ui/core";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from "file-saver";
import XLSX from "xlsx";
// import ShowroomViewCard from "../HelperComponent/ShowroomViewCard";
import { quantity } from "chartist";

//PDF
import pdfIcon from "../../../assets/img/pdf-icon.png";
import { jsPDF } from "jspdf";

const useStyles1 = makeStyles(styles);

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
    width: "25%",
  },

  warehouse: {
    width: "5%",
  },

  showroom: {
    width: "8%",
  },
  customSelect: {
    marginBottom: 15,
  },
}));

const ShowroomWiseSalePage = () => {
  const classes1 = useStyles1();
  let breakCondition = false;
  let dbTotal = 0;
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

  const [wherehouseCal, setWherehouseCal] = React.useState([]);

  const [refresh, setRefresh] = React.useState(false);
  const [addItem, setAddItem] = React.useState({});

  const [showroomwiseData, setshowroomWiseSalesData] = React.useState([]);
  const total = [
    {
      id: 0,
      qty: 0,
    },
  ];
  const [collapsible, setCollapsible] = React.useState(true);
  // let closing = [];
  // search State
  const [addSearch, setAddSearch] = React.useState({
    txt_item: "",
    ddl_brand: "",
    ddl_category: "",
    ddl_showroom_warehouse: { label: "All", value: "All" },
  });

  let strItem_name = "";
  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onSelect = (name, v) => {
    setAddSearch({ ...addSearch, [name]: v });
  };

  // console.log(addSearch, "sen210799")

  const onSearchShowroomwiseSales = (e) => {
    setShowShorooms([]);
    setshowroomWiseSalesData([]);
    e.preventDefault();
    setRefresh(false);
    setLoading(true);
    breakCondition = false;
    // if (addSearch?.ddl_showroom_warehouse?.value)
    // {

    if (
      !addSearch.ddl_brand &&
      !addSearch.ddl_category &&
      !addSearch.txt_item
    ) {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: {
          msg: "Please!! Select Brand Or Category or Item",
          msgType: "error",
        },
      });
    } else {
      if (addSearch?.ddl_showroom_warehouse?.value === "All") {
        setShowShorooms(allShowroomWarehouse);
        const filterList = allShowroomWarehouse.filter(
          (s, i) => s.value != addSearch?.ddl_showroom_warehouse?.value
        );

        getItemByName(
          addSearch,
          (r) => {
            setAddedItems(r);
            r.map((h, j) => {
              filterList.map((k, l) => {
                showroomWiseSalesData(
                  (showroomwiseD) => {
                    //calculations(showroomwiseData);
                    setAddItem({});
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
              payload: { msg: "Data Not Found", msgType: "error" },
            });
          }
        );
      } else {
        const filterList = allShowroomWarehouse.filter(
          (s, i) => s.value === addSearch?.ddl_showroom_warehouse?.value
        );
        setShowShorooms(filterList);
        getItemByName(addSearch, (r) => {
          setAddedItems(r);
          // console.log(r, "sen210799");
          r.map((h, j) => {
            filterList.map((k, l) => {
              showroomWiseSalesData(
                (showroomwiseD) => {
                  //calculations(showroomwiseData);
                  setAddItem({});

                  setshowroomWiseSalesData((prev) => [
                    ...prev,
                    {
                      showroom_warehouse_id:
                        showroomwiseD[0].showroom_warehouse_id,
                      quantity: showroomwiseD[0].quantity,
                      item_id: showroomwiseD[0].item_id,
                    },
                  ]);
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
        });
        setLoading(false);
      }
    }

    //   }
    //  else{

    //   dispatch({
    //     type: actionTypes.SET_OPEN_MSG,
    //     payload: { msg: "Please!! Select Warehouse", msgType: "error" },
    //   });

    //  }
  };
  // console.log(showroomwiseData, "eerrrrr")

  const onClickRefresh = () => {
    setRefresh(!refresh);
    setAddSearch({
      txt_item: "",
      ddl_brand: "",
      ddl_category: "",
      ddl_showroom_warehouse: { label: "All", value: "All" },
    });
  };

  const fetchData = () => {
    getListShowroomWarehouse(
      (r) => {
        setAllShowroomWarehouse([{ value: "All", label: "All" }, ...r]);
        if (addSearch?.ddl_showroom_warehouse?.value) {
          if (addSearch?.ddl_showroom_warehouse?.value === "All") {
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
  };

  //pdf
  const onClickPdf = (e) => {
    e.preventDefault();

    let doc = new jsPDF("landscape", "pt", "A4");
    doc.html(document.getElementById("pdf-view"), {
      callback: () => {
        doc.save(`CustomerWiseSalesReport${currentDate()}.pdf`);
      },
    });
    // setClassicModal(true);
  };

  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  // export to excel

  // const onhandleExportToExcel = () => {
  //   const ShowroomWiseSalesTable = showroomwiseData.map(item => {
  //     return {
  //       ID: item.stoID,
  //       item_Details: item.item,
  //       Unit: item.alt_uom_name,
  //       Head_office: item.stock_by_location?.quantity,
  //       Warehouse1: item.stock_by_location?.quantity,
  //       Factory_Ii: item.stock_by_location?.quantity,
  //       Factory_I: item.stock_by_location?.quantity,
  //       Kolkatta_east:item.stock_by_location?.quantity,
  //       NewAlipurI: item.stock_by_location?.quantity,
  //       Devop: item.stock_by_location?.quantity,
  //       Burdwan: item.stock_by_location?.quantity,
  //       // stock_by_location:item.stock_by_location,
  //       // Gross_amount:item.inv_gross_amount,
  //       // Gst_value:item.inv_gst,
  //       // OtherCharges: item.inv_OtherCharges,
  //       // NetAmount:item.inv_NetAmount,

  //     }
  //   })

  //   const fileName = 'Showroom Wise Closing'
  //   const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //   const fileExtension = '.xlsx';
  //   const ws = XLSX.utils.json_to_sheet(ShowroomWiseSalesTable);
  //   const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  //   const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // }

  const onClickCollaps = () => {
    collapsible ? setCollapsible(false) : setCollapsible(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="MIS Report > Showroom Wise Closing" />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle="Search Showroom Wise Closing "
            btnToolTip={collapsible ? "Collaps" : "Expand"}
            onClickCollapsible={onClickCollaps}
            buttonAction={collapsible}
            filterIcon
            onClickFilter={() => {}}
          >
            {collapsible ? (
              <form>
                <GridContainer
                  style={{ padding: "10px" }}
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
                      type="search"
                      placeholder="Item"
                      name="txt_item"
                      onChange={onAddSearch}
                      // style={{ marginBottom: -15 }}

                      id="outlined-basic"
                      fullWidth={true}
                      //   style={{ marginBottom: -1 }}
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
                        onClick={onSearchShowroomwiseSales}
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
            ) : (
              ""
            )}
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
                    <h4 className={classes1.headerCdTitle}>
                      Showroom Wise closing List
                    </h4>
                  </GridItem>
                  {globalState.user.user_role !== "Admin" ? (
                  <GridItem style={{ cursor: "pointer",display: "none" }}>
                    <IconButton onClick={onClickPdf}>
                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />
                      </Tooltip>
                    </IconButton>
                  </GridItem>
                  ):(
                    <GridItem style={{ cursor: "pointer" }}>
                    <IconButton onClick={onClickPdf}>
                      <Tooltip title="Export to PDF">
                        <img src={pdfIcon} style={{ width: 20 }} />
                      </Tooltip>
                    </IconButton>
                  </GridItem>
                  )}
                  {/* <GridItem style={{ cursor: "pointer" }}>
                    <IconButton variant="text" onClick={() => onhandleExportToExcel(showroomwiseData)} >
                      <Tooltip title="Export to Excel">
                        <img src={require("../../../assets/img/excel.png").default} />
                      </Tooltip>
                    </IconButton>
                  </GridItem> */}
                </GridContainer>
              </CardHeader>
              <CardBody
                style={{ height: "auto", maxHeight: 480, padding: 10 }}
                className={clxs(classes.customScroolBar)}
              >
                <TableContainer className={classes.container}>
                  <Table
                    className={classes.table}
                    stickyHeader
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left" className={classes.id}>
                          #
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.itemDetails}
                          xs="7"
                        >
                          Item Details
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.itemDetails}
                          xs="7"
                        >
                          Unit
                        </StyledTableCell>

                        {/* ///showroom header */}
                        {/* {console.log(showShoroms, "showShoroms")} */}
                        {showShoroms
                          .sort((a, b) => a.value - b.value)
                          .map((s, i) => {
                            if (s.value && s.value !== "All") {
                              return (
                                <StyledTableCell
                                  align="center"
                                  // style={{ width: "25%" }}
                                  key={i}
                                  className={classes.showroom}
                                >
                                  {s.label}
                                </StyledTableCell>
                              );
                            }
                          })}
                        <StyledTableCell
                          align="center"
                          className={classes.itemDetails}
                          xs="7"
                        >
                          Total
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    {!refresh ? (
                      <TableBody>
                        {addedItems?.map((r, k) => {
                          return (
                            <TableRow>
                              <StyledTableCell>{k + 1}</StyledTableCell>

                              <StyledTableCell
                                align="left"
                                className={classes.itemDetails}
                                xs="7"
                              >
                                {r.item}
                              </StyledTableCell>

                              <StyledTableCell
                                align="center"
                                className={classes.itemDetails}
                                xs="7"
                              >
                                {r.uom_name}
                              </StyledTableCell>
                              {/* {console.log(
                                showroomwiseData.sort(
                                  (a, b) =>
                                    a.showroom_warehouse_id -
                                    b.showroom_warehouse_id
                                ),
                                "sen2507"
                              )} */}

                              {showroomwiseData
                                .sort(
                                  (a, b) =>
                                    a.showroom_warehouse_id -
                                    b.showroom_warehouse_id
                                )
                                .filter((o) => o.item_id === r.item_id)
                                .map((k, l) => {
                                  return (
                                    <StyledTableCell
                                      align="center"
                                      className={classes.warehouse}
                                    >
                                      {k.quantity}
                                    </StyledTableCell>
                                  );
                                })}
                              <StyledTableCell
                                align="center"
                                className={classes.warehouse}
                              >
                                {showroomwiseData
                                  .sort(
                                    (a, b) =>
                                      a.showroom_warehouse_id -
                                      b.showroom_warehouse_id
                                  )
                                  .filter((o) => o.item_id === r.item_id)
                                  .reduce((sum, li) => sum + li.quantity, 0)}
                              </StyledTableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    ) : (
                      ""
                    )}
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          )}
        </GridItem>
      </GridContainer>

      {/* PDF */}

      <MasterModel
        // classicModal={classicModal}
        // onCloseModel={(e) => {
        //   e.preventDefault();
        //   setClassicModal(false);
        // }}
        height="auto"
        okBtnText="Pdf"
        modelName="Showroom Wise Sales"
        onClickOk={(e) => {
          e.preventDefault();
          window.print();
        }}
      >
        <div
          id="pdf-view"
          style={{
            marginTop: 15,
            display: "flex",
            flexFlow: "row wrap",
            // justifyContent: "center",
            breakBefore: "avoid-page",

            marginLeft: 15,
          }}
        >
          <div
            style={{
              textAlign: "center",
              borderBottom: "1px solid",
              width: "100%",
            }}
          >
            <h4>Showroom Wise Sales Report</h4>
          </div>
          {/* {
            addSearch ?
              <GridContainer style={{margin: 2,textAlign:"center",borderBottom:"1px solid",width: "100%" }}>
                <GridItem>
                  {addSearch?.ddl_salesman_id ? `Salesman: ${addSearch?.ddl_salesman_id?.label}` : ''}
                </GridItem>

                <GridItem>
                  {addSearch?.ddl_type ? `Type: ${addSearch?.ddl_type?.label}` : ''}
                </GridItem>

                <GridItem>
                  {addSearch?.txt_discount_from? `Discount From: ${addSearch?.txt_discount_from}` : ''}
                </GridItem>


                <GridItem>
                  {addSearch?.txt_discount_to? `Discount To : ${addSearch?.txt_discount_to}` : ''}
                </GridItem>

                <GridItem >
                  {addSearch?.txt_from_date ? `From Date: ${addSearch?.txt_from_date}` : ''}
                </GridItem>

                <GridItem >
                  {addSearch?.txt_to_date ? `To Date: ${addSearch?.txt_to_date}` : ''}
                </GridItem>
              </GridContainer>
              : ''
          } */}

          <TableContainer>
            <Table
              className={classes.table}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left" className={classes.id}>
                    #
                  </StyledTableCell>
                  <StyledTableCell align="left" className={classes.itemDetails}>
                    ItemDetails
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className={classes.itemDetails}
                  >
                    Unit
                  </StyledTableCell>
                  {showShoroms
                    .sort((a, b) => a.value - b.value)
                    .map((s, i) => {
                      if (s.value && s.value !== "all") {
                        return (
                          <StyledTableCell
                            align="center"
                            key={i}
                            className={classes.showroom}
                          >
                            {s.label}
                          </StyledTableCell>
                        );
                      }
                    })}
                </TableRow>
              </TableHead>

              <TableBody>
                {addedItems?.map((r, k) => {
                  return (
                    <TableRow>
                      <StyledTableCell>{k + 1}</StyledTableCell>

                      <StyledTableCell
                        align="left"
                        className={classes.itemDetails}
                      >
                        {r.item}
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        className={classes.itemDetails}
                      >
                        {r.uom_name}
                      </StyledTableCell>
                      {console.log(
                        showroomwiseData.sort(
                          (a, b) =>
                            a.showroom_warehouse_id - b.showroom_warehouse_id
                        ),
                        "sen2507"
                      )}

                      {showroomwiseData
                        .sort(
                          (a, b) =>
                            a.showroom_warehouse_id - b.showroom_warehouse_id
                        )
                        .filter((o) => o.item_id === r.item_id)
                        .map((k, l) => {
                          return (
                            <StyledTableCell
                              align="center"
                              className={classes.warehouse}
                            >
                              {k.quantity}
                            </StyledTableCell>
                          );
                        })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </MasterModel>
    </ThemeProvider>
  );
};

export default ShowroomWiseSalePage;
