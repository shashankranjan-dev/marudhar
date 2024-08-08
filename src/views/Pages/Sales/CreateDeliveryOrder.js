import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable, { ActiveIcon, DeActiveIcon } from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../Components/CustomButton";

import {
  postDeliveryOrder,
  getSalesOrderBySalesId,
  getDeliveryOrderBySalesIdDON,
} from "../../../services/createDeliveryOrderService";
import { ThemeProvider } from "@material-ui/core";
import { getListStatus } from "../../../services/addStatusService";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Grid, Box } from "@material-ui/core";
import theme from "../../../theme/theme";
import Collapse from "@material-ui/core/Collapse";

import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
// import { ColoseButton } from "../Components/CustomButton";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
} from "assets/jss/material-dashboard-pro-react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import CollapsibleTable from "../HelperComponent/TableInsideTable";
import PageTitle from "../HelperComponent/PageTitle";
import DeliveryOrderTable from "../HelperComponent/DeliveryOrderTable";
import StepProceedModel from "../HelperComponent/StepProceedModel";
import FormComponent from "../HelperComponent/FormComponent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import {
  calculatePerValue,
  calculatePer,
  currencyFormate,
  dateFormate,
  dateFormateField,
  currentDate,
} from "../HelperComponent/utils";

import { Typography } from "@material-ui/core";

import { StyledTableCell, StyledTableRow } from "./AddEnquiryPage";

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  tableLabel: {
    fontWeight: 500,
    color: appSecondColor,
  },
  itemImgPaper: {
    width: "80px",
    height: "80px",
    overflow: "hidden",
  },
  addBtn: {
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
  input: {
    height: 40,
    lineLight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
  actionbtns: {
    marginTop: 20,
    float: "right",
  },

  id: {
    width: "5%",
  },

  action: {
    width: "5%",
  },
  rate: {
    width: "10%",
  },

  itemDetails: {
    width: "35%",
  },
  quantity: {
    width: "10%",
  },
  net_value_field: {
    width: "10%",
  },
  collapsIcon: {
    width: "5%",
  },

  // INNER TABLE WIDTH
  dateBwtField: {
    width: "30%",
  },

  warehouseName: {
    width: "15%",
  },

  warehouseNote: {
    width: "30%",
  },
}));

const DeliveryOrderView = () => {
  const history = useHistory();
  const classes = useStyles();

  const location = useLocation();
  const [globalState, dispatch] = useStateValue();
  const [deliveryOrderNo, setDeliveryOrderNo] = React.useState(
    "AUTO GENERATED"
  );

  const [allStatus, setAllStatus] = React.useState([]);
  const [locationDetails, setLocationDetail] = React.useState({});

  const [classicModal, setClassicModal] = React.useState(false);
  const [allItems, setAllItems] = React.useState({});

  const [billDetail, setBillDetail] = React.useState({
    edit: false,
    sales_id: "",
    txt_delivery_order_no: deliveryOrderNo,
    txt_delivery_order_date: currentDate(),
    delivery_status: "",
    txt_delivery_order_note: "",
    ddl_showroom_warehouse: "",
    txt_delivery_period_from: currentDate(),
    txt_delivery_period_to: currentDate(),
  });
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const onChangeBillDetail = (e) => {
    const { name, value } = e.target;
    setBillDetail({ ...billDetail, [name]: value });
  };

  const onSelectDetails = (name, v) => {
    setBillDetail({ ...billDetail, [name]: v });
  };

  const onChange = (e, row, disp_total_till_now) => {
    const { name, value } = e.target;
    //console.log(name,value);
    let nameSplits = name.split("_");
    let showroomId = nameSplits[0];
    let itemId = Number(nameSplits[1]);
    const total_qty = row.quantity;
    let all_ips = document.getElementsByTagName("input");
    let total_till_now = 0;

    for (let x = 0 ; x < all_ips.length ; x++){
      let myname = all_ips[x].getAttribute("name");
      if(myname.indexOf(`qty`) === -1 && myname.indexOf(`_${itemId}`) > 0){
        //all_qty_related.push(myname);
        total_till_now += (Number(all_ips[x].value)) ? Number(all_ips[x].value) : 0;
         }
      }
    //console.log("Aqty", (total_qty - disp_total_till_now));
    //console.log("tqty", total_till_now);
    
   
    //let globalStockByItemID = globalState.item_id_wise_stock;
    let globalStockByItemID = document.querySelector(`input[name="qty_${showroomId}_${itemId}"]`);
    //console.log("gs", globalStockByItemID.value);
   
    //let stockList = globalStockByItemID.stock;
  
    // let showroom = stockList.find(
    //   (showroom) =>
    //     String(showroom.showroom_warehouse_id) === String(showroomId)
    // );

    // //console.log(
    //   "in CreateDeliveryOrder, showroom is: \n" +
    //     JSON.stringify(showroom, null, 2)
    // );
    let quantityAvailable =  Number(globalStockByItemID.value);//stockList; //Number((showroom || {}).quantity);
  
  
    if (quantityAvailable < Number(value)) {
     
      // dispatch({
      //   type: actionTypes.SET_OPEN_MSG,
      //   payload: {
      //     msg: "Quantity not available at this location",
      //     msgType: "error",
      //   },
      // });
    }

    else if ((total_qty - disp_total_till_now) < total_till_now) {

      //console.log("Delivery order amount cannot exceed total quantity available.");

      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: {
          msg: "Delivery order amount cannot exceed total quantity available.",
          msgType: "error",
        },
      });
    } 
    
    else {
      //console.log("in CreateDeliveryOrder, quantity is available in showroom");
    }
    //console.log("coy", quantityAvailable, " :: ", total_qty - disp_total_till_now);
    setLocationDetail((prv) => ({
      ...prv,
      //[name]: (quantityAvailable >= Number(value)) && ((total_qty - disp_total_till_now) >= total_till_now) ? Number(value) : 0,
      [name]: ((total_qty - disp_total_till_now) >= total_till_now) ? Number(value) : 0,
    }));
  };


  const getItemQtyByLocation = (locationDetails, item_id) => {
    let obj = {};
    let deliveredQty = 0;

    for (var key in locationDetails) {
      const splitItemID = key.split("_");
      if (splitItemID[1] == item_id) {
        obj = { ...obj, [key]: locationDetails[key] };
        deliveredQty = deliveredQty + locationDetails[key];
      }
    }

    obj = { ...obj, ["delivered_qty"]: deliveredQty };
    obj = { ...obj, ["delivery_no"]: `${billDetail.txt_delivery_order_no}` };

    return obj;
  };

  const onClickSubmitDeliveryOrder = (e) => {
    e.preventDefault();
    //console.log("ai.det", allItems);
    let updateItems = [];
    if (allItems.sales_order_item_details.length) {
      allItems.sales_order_item_details.map((item) => {
        // item_id
        // WharehouseID_item_id  26_17
        let item_by_location = getItemQtyByLocation(
          locationDetails,
          item.item_id
        );
        // //console.log("hello"+item_by_location)
        updateItems.push({ ...item, ...item_by_location,insert_mode:"Web" });
      });
    }

    const do_total_till_now = allItems.dispatch_order_item_details.length > 0 ? 
                              allItems.dispatch_order_item_details.reduce((prV, nxtV) => 
                              prV + Number(nxtV.now_dispatch_qty), 0) : 0;

    postDeliveryOrder(
      billDetail,
      updateItems,
      do_total_till_now,
      (r) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: billDetail.edit
              ? "Delivery Order Updated Successfully"
              : "Delivery Order Submited Successfully",
            msgType: "success",
          },
        });
        if (!billDetail.edit) {
          //console.log("billDetails", billDetail);
          setBillDetail((prv) => ({
            ...prv,
            sales_id: r.sales_id,
            txt_delivery_order_no: r.delivery_order_no[r.delivery_order_no.length - 1],
          }));
        }
        setClassicModal(true);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    setButtonDisabled(true);

  };

  const onClickClose = (e) => {
    //console.log("close")
    history.push({
      pathname: "/admin/sale/delivery-order",
    });
  }


  const onClickProcedeCreateDispatch = () => {
    //console.log("delno dolna", billDetail.txt_delivery_order_no);
    setClassicModal(false);
    history.push({
      pathname: "/admin/sales/dispatch-order",
      state: {
        row: { sales_id: billDetail.sales_id, 
        DelNo: billDetail.txt_delivery_order_no },
      },
    });
  };

  const onClickAddTask = () => {
    history.push({
      pathname: "/admin/sales/selected-delivery-order-view",
      state: {
        row: { sales_id: billDetail.sales_id },
        updateTask: true,
      },
    });
  };

  React.useEffect(() => {
    setLoading(true);
    //console.log("ahir2", location.state);
     
    setBillDetail((prv) => ({
      ...prv,
      sales_id: location.state?.row.sales_id,
    }));

    getSalesOrderBySalesId(
      location.state?.row.sales_id,

      (items) => {
        setLoading(false);
        setAllItems(items);
      },
      (err) => {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    
    getListStatus(
      "",
      (r) => {
        setAllStatus(r);
        r.forEach((s, i) => {
          if (s.label === "New" && s.status_for.indexOf("Delivery") > -1) {
            setBillDetail((prv) => ({ ...prv, sales_status: 25, delivery_status: s.value }));
          }
        });
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  }, []);

  const formData = [
    {
      formName: "DeliveryOrderDetails",
      fields: [
        {
          disabled: true,
          name: "txt_delivery_order_no",
          label: "Delivery Order No",
          hidden: false,
          required: true,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 3,
        },
        {
          name: "txt_delivery_order_date",
          label: "Delivery Order Date",
          hidden: false,
          required: true,
          align: "left",
          data_type: "date",
          html_element: "TextField",
          defaultValue: "2021-08-14",
          error: false,
          xs: 12,
          md: 4,
          lg: 2,
        },

        {
          name: "txt_delivery_period_from",
          label: "Delivery Between",
          hidden: false,
          required: true,
          align: "left",
          data_type: "date",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 4,
          lg: 2,
        },
        {
          name: "txt_delivery_period_to",
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
          name: "txt_delivery_order_note",
          label: "Note",
          hidden: false,
          required: false,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          defaultValue: "",
          error: false,
          xs: 12,
          md: 4,
          lg: 12,
        },
      ],
    },
  ];

  // //console.log("...................................")
  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title={
          billDetail.edit
            ? "Sales > Delivery Order > Edit"
            : "Sales > Delivery Order > Add "
        }
      />
      {/* Select and Add Items */}
      <GridContainer>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard cdTitle="Sales Order Details ">
              <TableContainer>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">
                        Sales Order Date
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Sales Order No
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Quotation No
                      </StyledTableCell>
                      <StyledTableCell align="left">Enquiry No</StyledTableCell>
                      <StyledTableCell align="left">Customer</StyledTableCell>
                      <StyledTableCell align="center">Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell align="left" className={classes.endate}>
                        {allItems.sales_order_date}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.engNo}>
                        {allItems.sales_order_no}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.endate}>
                        {allItems.qutNo}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.engNo}>
                        {allItems.enqNo}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.enCustomerName}
                      >
                        {allItems.enqCustomer}
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        className={classes.enqStatus}
                      >
                        <div
                          style={{
                            color:
                              allStatus &&
                              allStatus.find(
                                (s, i) => s.value === Number(allItems.status)
                              )?.status_color,
                          }}
                        >
                          {allStatus &&
                            allStatus.find(
                              (s, i) => s.value === Number(allItems.status)
                            )?.label}
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CustomCard>
          )}
        </GridItem>
      </GridContainer>

      {/* // allItems.delivery_order_item_details &&
      // allItems.delivery_order_item_details.map((s, i) => {
      //   return s.delivered_qty;
      // }) */}

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            allItems.sales_order_item_details && (
              <CustomCard cdTitle="Review Added Items" maxHeight={400}>
                <DeliveryOrderTable
                  rows={allItems.sales_order_item_details}
                  onChange={onChange}
                  state={locationDetails}
                  delivery_order_item_details={ allItems.delivery_order_item_details}
                  dispatch_order_item_details={ allItems.dispatch_order_item_details}
                />
                
                {/* <Box pt={2}>
                  <Grid container>
                    <Grid item xs={7}>
                      <Box
                        className={classes.tableLabel}
                        ml={9}
                        textAlign="left"
                      >
                    totals
                    </Box>
                    </Grid>

                    <Grid item xs={5}>
                      <Box
                        className={classes.tableLabel}
                        mr={2}
                        textAlign="right"
                      >
                        {allItems.sales_order_item_details
                          ? currencyFormate(
                              allItems.sales_order_item_details.reduce(

                                (sum, li) => Number(sum) + Number(li.net_value),
                                0
                              )
                            )
                          : "00"}
                      </Box>
                    </Grid>
                  </Grid>
                </Box> */}
              </CustomCard>
            )
          )}
        </GridItem>
        

        <GridItem xs="12">
          <CustomCard
            cdTitle={
              billDetail.edit
                ? "Edit Delivery Order Details"
                : "Delivery Order Details"
            }
            width="100%"
            height="100%"
            style={{ marginTop: 0 }}
          >
            {formData.map((form, fkey) => {
              return (
                <GridContainer key={fkey} style={{ padding: "5px 20px" }}>
                  {form.formName === "DeliveryOrderDetails" &&
                    form.fields.map((item, key) => {
                      return (
                        <>
                          <FormComponent
                            item={item}
                            key={key}
                            onSelect={onSelectDetails}
                            state={billDetail}
                            onChange={onChangeBillDetail}
                            error={{}}
                          />
                        </>
                      );
                    })}
                </GridContainer>
              );
            })}
          </CustomCard>
        </GridItem>
        <MasterModel
          classicModal={classicModal}
          onCloseModel={onClickClose}
          onClickAddTask={onClickAddTask}
          closeIcon={false}
          width={600}
          height="auto"
          addTodobtn
          okbtnWith={200}
          appLogo
          modelName="Marudhar"
          okBtnText="Proceed to Dispatch"
          onClickOk={onClickProcedeCreateDispatch}
        >
          <StepProceedModel
            step={4}
            title="Success!"
            desc="Delivery Order No"
            generateNo={`${billDetail.txt_delivery_order_no}`}
          />
        </MasterModel>
        <GridItem xs={12}>
          <div className={classes.actionbtns}>
            <Button
              onClick={onClickSubmitDeliveryOrder}
              className={classes.actionbtn}
              variant="outlined"
              color="primary"
              disabled={buttonDisabled}
            >
              Submit Delivery Order
            </Button>
          </div>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default DeliveryOrderView;
