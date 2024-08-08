import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../../Components/MasterModel";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../../../Components/CustomButton";
import { CustomCard } from "../../../Components/CustomCard";
//SERVICE
import { getSalesOrderBySalesId, getAllDeliveryOrder } from "../../../../services/createDeliveryOrderService";
import { getListShowroomWarehouse } from "../../../../services/showroomWarehouseService";
import {
  postDispatchOrder,
  getDispatchBySalesId,
  getAllDispatchOrder
} from "../../../../services/dispatchOrderListService";

import { ThemeProvider } from "@material-ui/core";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Grid, Box } from "@material-ui/core";
import theme from "../../../../theme/theme";
import Collapse from "@material-ui/core/Collapse";

import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
//SERVICE FOR VENDOR
import { getListContractor } from "../../../../services/vendorService";
import { getVehicleById } from "../../../../services/vehicleService";
import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
} from "assets/jss/material-dashboard-pro-react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import CollapsibleTable from "../../HelperComponent/TableInsideTable";
import PageTitle from "../../HelperComponent/PageTitle";
import FormComponent from "../../HelperComponent/FormComponent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStateValue } from "../../../../context/context";
import { actionTypes } from "../../../../context/reducer";
import {
  currencyFormate,
  currentDate,
  sortWord,
} from "../../HelperComponent/utils";
import { getListStatus } from "../../../../services/addStatusService";
import StepProceedModel from "../../HelperComponent/StepProceedModel";
import { Typography } from "@material-ui/core";
import { dateFormateField } from "../../HelperComponent/utils";
import { StyledTableCell, StyledTableRow } from "../AddEnquiryPage";

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  itemImgPaper: {
    width: "80px",
    height: "80px",
    overflow: "hidden",
  },
  tableLabel: {
    fontWeight: 500,
    color: appSecondColor,
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
  actionbtns: {
    marginTop: 20,
    float: "right",
  },

  id: {
    width: "0%",
  },
  enCustomerName: {
    width: "15%",
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
  noDispatchOrder: {
    color: "red",
    textAlign: "center",
  },
}));

const DispatchOrderForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  //vendor
  const [allvendor, setAllVendors] = React.useState([]);
  const [vehicle, setAllVehicle] = React.useState([]);
  const vehicleRef = React.createRef([]);
  const vendorRef = React.createRef([]);
  //vehicleRef.current = vehicle;
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [refresh, setRefresh] = React.useState(false);
  const [addedItem, setAddedItem] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [allItems, setAllItems] = React.useState({});
  const [billDetail, setBillDetail] = React.useState({});
  const [allStatus, setAllStatus] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [selectsToBeDisabled, setSelectsToBeDisabled] = React.useState(false);
  //state
  const [vendor, setVendor] = React.useState({});
  const [dispatchDetail, setDispatchDetail] = React.useState({
    edit: false,
    sales_id: "",
    showroom_warehouse_id: "",
    txt_dispatch_no: "AUTO GENERATED",
    txt_dispatch_date: currentDate(),
    dispatch_status: { value: "", label: "All" },

    txt_dispatch_note: "",
    ddl_sales_showroom: "",
    ddl_vehicle_no: "",
    ddl_contractor: "",
  });
  // Error handler
  const [dispatchError, setDispatchError] = React.useState({
    ddl_vehicle_no: false,
    ddl_contractor: false,

  });
  //checkbox handlers
  const [checkedBox, setCheckedBox] = React.useState(false);
  const [boxChecker, setBoxChecker] = React.useState(false);

  let id = 0;
  const count = 0;
  const onClickChkBox = (e) => {
    const { name, value, checked } = e.target;

    // //console.log(name, checked, "sen20062022")
    setBoxChecker(checked);

    setCheckedBox({ ...checkedBox, [name]: checked ? false : true })

  }

  const onCheckAll = (e) => {
    const { checked } = e.target;
    //console.log("Added its", checked);

    const item_ids = addedItem.map(a => a.item_id);
    let all_checked_or_not = {};

    item_ids.map(i => {
      all_checked_or_not[`chk_box${i}`] = !checked;
    });

    setCheckedBox(all_checked_or_not);
    setBoxChecker(checked);
  }
  
  //console.log(boxChecker, "sen20062022")
 

  const onChangeDispatchDetails = (e, do_qty, addedItem) => {
    const { name, value, checked } = e.target;

    //console.log("isaedas", checked, name, checked ? false : true);
    // if (name === `chk_gst${addedItem.item_id}`) {


    // }


    if (name === "txt_dispatch_date") {
      setDispatchDetail({ ...dispatchDetail, [name]: value });
    }
    else if (name != "ddl_vehicle_no" || name != "ddl_contractor") {
      if (Number(value) != 0) {

        if (Number(value) > Number(do_qty)) {
          //console.log("do_qty_dispatch2", do_qty);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: "Delivery Qty can not be more than DO qty", msgType: "error" },
          });



        } else {
          setDispatchDetail({ ...dispatchDetail, [name]: value });
        }
      }
      else {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: "Now Dispatch can not be 0", msgType: "error" },
        });
      }
    } else {
      setDispatchDetail({ ...dispatchDetail, [name]: value });
    }
    //} 


  };

  const onSelectDetails = (name, v) => {
    //console.log(v.value, v.label, "console");
    setDispatchDetail({ ...dispatchDetail, [name]: v });
  };

  const fetchData = () => {
    setLoading(false);
    getVehicleById(
      (v) => {
        vehicleRef.current = v;
        setAllVehicle(v);
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
      "Sales",
      (r) => {
        setAllStatus(r);
        r.forEach((s, i) => {
          if (s.label === "Dispatch Order Generated") {
            setDispatchDetail((prv) => ({ ...prv, dispatch_status: s.value }));
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
    //console.log(vendorRef, "5565")
    getListContractor(
      (r) => {
        vendorRef.current = r;
        setAllVendors(r);
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
    fetchData();
    setLoading(true);
    if (location.state?.edit) {
      getDispatchBySalesId(
        location.state?.row.sales_id,
        (items) => {
          setLoading(false);
          setAllItems(items);
          setAddedItem(items.do_item_details_with_dispatch);
          items.do_item_details_with_dispatch.map((d, i) => {
            //console.log("fffffff", d.item_id);

            setCheckedBox((prv) => ({
              ...prv,
              [`chk_box${d.item_id}`]: true,
              // [`item_id${d.item_id}`]:d.item_id,
            }))

            setDispatchDetail((prv) => ({
              ...prv,
              edit: location.state?.edit,
              showroom_warehouse_id: d.showroom_warehouse_id,
              sales_id: location.state?.row.sales_id,
              [`txt_dispatch_qty_${d.item_id}`]: d.dispatched_qty,
              [`txt_now_dispatch_qty_${d.item_id}`]:
                d.now_dispatch_qty - d.dispatched_qty,
              txt_dispatch_no: items.dispatch_order_no,
              txt_dispatch_date: dateFormateField(items.dispatch_order_date),
              ddl_vehicle_no: items.vehicle_no,
              ddl_contractor: items.contractor_id,
              txt_dispatch_note: items.dispatch_order_note,
              ddl_sales_showroom: items.ddl_enqShowroom,
              delivery_order_no: items.delivery_order_no,
              delivery_order_item_details: items.delivery_order_item_details_prv,
            }));
          });
        },
        (err) => {
          setLoading(false);
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
    } else {
      //  //console.log(localStorage.getItem("user_location"),"loco")

      setAddedItem([]);
      //console.log("Uma", location.state?.row);
      let total_dispatched_till_now = {};

      getAllDispatchOrder(
        (items) => {
          //console.log("fish1", items);
          //sum = 0
          items.map((o, i) => {
            o.dispatch_order_item_details.map((p, j) => {


              if (p.showroom_warehouse_id === localStorage.getItem("user_location")) {
                total_dispatched_till_now[`${p.item_id}`] = total_dispatched_till_now[`${p.item_id}`] ?
                  (total_dispatched_till_now[`${p.item_id}`] + Number(p.now_dispatch_qty)) : Number(p.now_dispatch_qty);
              }
            });
          });
          //console.log("vhvh1", vendorRef.current);
          //console.log("vhvh2", vehicleRef.current);
          //console.log("fish2", total_dispatched_till_now);
          setDispatchDetail((prv) => ({
            ...prv,
            ddl_vehicle_no: vehicleRef.current?.filter((o) => o.value === items[0].dispatch_order_details.vehicle_id)[0],
            ddl_contractor: vendorRef.current?.filter((o) => o.value === items[0].dispatch_order_details.contractor_id)[0],
          }));
          setSelectsToBeDisabled(true);

        },

        (err) => {
          //console.log("New Do Dp", vehicleRef.current);
          // setDispatchDetail((prv) => ({
          //   ...prv, 
          //   ddl_vehicle_no: vehicleRef.current[0],
          //   ddl_contractor: vendorRef.current[0],
          // }));
        },

        {
          txt_delivery_order_no: location.state?.row?.DelNo,
          txt_dispatch_date_from: "2021-04-01",
          txt_dispatch_date_to: currentDate(),
        }, false);


      getAllDeliveryOrder(
        (items) => {
          setLoading(false);
          //console.log("alia", items);

          setAllItems(items);

          items.delivery_order_item_details.map((d, i) => {
            //console.log("fffffff", d.item_id);

            setCheckedBox((prv) => ({
              ...prv,
              [`chk_box${d.item_id}`]: true,
              // [`item_id${d.item_id}`]:d.item_id,

            }))

            if (d[`${localStorage.getItem("user_location")}_${d.item_id}`]) {
              setAddedItem((prv) => [...prv, d]);
              setDispatchDetail((prv) => ({
                ...prv,
                showroom_warehouse_id: localStorage.getItem("user_location"),
                sales_id: location.state?.row.sales_id,
                [`txt_dispatch_qty_${d.item_id}`]:
                  (Object.keys(total_dispatched_till_now).length > 0 ? total_dispatched_till_now[`${d.item_id}`] : 0),
                [`txt_now_dispatch_qty_${d.item_id}`]: d[
                  `${localStorage.getItem("user_location")}_${d.item_id}`
                ] - (Object.keys(total_dispatched_till_now).length > 0 ? total_dispatched_till_now[`${d.item_id}`] : 0),
                do_num: items.DelNo,
              }));
            }
          });

        },

        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        },

        { txt_delivery_order_no: location.state?.row.DelNo }
      );
    }
    //console.log(dispatchDetail, "check9");
  }, [globalState.refresh]);

  //   on Procede to Invoice
  const onClickProcedeCreateInvoice = (e) => {
    e.preventDefault();
    setClassicModal(false);
    history.push({
      pathname: "/admin/sales/invoice/create",
      state: {
        row: { sales_id: dispatchDetail.sales_id, disDispatchNo: dispatchDetail.txt_dispatch_no },
      },
    });
  };

  //   onClick Add Task
  const onClickAddTask = () => {
    history.push({
      pathname: "/admin/sales/dispatch-order-view",
      state: {
        row: { sales_id: location.state?.row?.sales_id },
        updateTask: true,
      },
    });
  };

  const onClickCloseMod = () => {
    history.push({
      pathname: "/admin/sales/dispatch-order-list"
    });
  };

  const onClickClose = (e) => {
    history.push({
      pathname: "/admin/sale/delivery-order",
    });
  }

  //console.log("sen2206=>", checkedBox)
  // //console.log("sen2206=>",

  // checkedBox.map((a,b)=>{
  //   a.
  // })

  // )
  const onClickSubmitDispatchOrder = (e) => {
    e.preventDefault();
    if(boxChecker){
      if (!dispatchDetail.ddl_vehicle_no || !dispatchDetail.ddl_contractor) {
        setDispatchError(({
          ...dispatchError,
          ddl_contractor: !dispatchDetail.ddl_contractor,
          ddl_vehicle_no: !dispatchDetail.ddl_vehicle_no
        }))
  
      } 
      else {
        //console.log(!dispatchDetail.ddl_vehicle_no, "ddl_vehicle_no");
        setClassicModal(true);
        setDispatchError({});
  
        let updatedItems = [];
        // let count = 0;
        if (allItems.delivery_order_item_details.length) {
          //added item data
          //console.log("hello");
          allItems.delivery_order_item_details.map((item, i) => {
            //console.log("item", vendor);
            if (!checkedBox[`chk_box${item.item_id}`]) {
              if (item[`${localStorage.getItem("user_location")}_${item.item_id}`]) {
                //console.log("item", item);
                updatedItems.push({
                  showroom_warehouse_id: dispatchDetail.showroom_warehouse_id,
                  item_id: item.item_id,
                  quantity: item.quantity,
                  do_qty: item.delivered_qty,
                  delivery_order_no: item.delivery_no,
                  rate: item.rate,
                  mrp: item.mrp,
                  uom_id: item.uom_id,
                  uom_name: item.uom_name,
                  disc_percentage: item.disc_percentage,
                  disc_value: item.disc_value,
                  gst_percentage: item.gst_percentage,
                  // gst_value: Number(item.gst_value).toFixed(2),
                  gst_value: (item.rate - item.disc_value) * Number(dispatchDetail[`txt_now_dispatch_qty_${item.item_id}`]) * (Number(item.gst_percentage) / 100),
                  gst_type: item.gst_type,
                  net_value: item.net_value,
                  vehicle_no: item.vehicle_no,
                  contractor_id: item.contractor_id,
                  dispatched_qty:
                    Number(dispatchDetail[`txt_now_dispatch_qty_${item.item_id}`]),
                  now_dispatch_qty:
                    Number(dispatchDetail[`txt_now_dispatch_qty_${item.item_id}`]),
                    insert_mode:"Web"
                });
  
              }
              // count = 1;
            }
  
          });
        } //End of item data
        //console.log(count,"sen2206/count")
        // count > 0 ?
          postDispatchOrder(
            dispatchDetail,
            updatedItems,
            (r) => {
              //console.log("r print " + r);
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: {
                  msg: billDetail.edit
                    ? "Dispatch Order Updated Successfully"
                    : "Dispatch Order Submited Successfully",
                  msgType: "success",
                },
              });
  
              // //console.log(dispatchDetail)
  
              if (!dispatchDetail.edit) {
                setDispatchDetail((prv) => ({
                  ...prv,
  
                  sales_id: r.sales_id,
                  txt_dispatch_no: r.dispatch_order_no[r.dispatch_order_no.length - 1],
                  ddl_vehicle_no: r.vehicle_id,
                  ddl_contractor: r.contractor_id,
                }));
              }
              setClassicModal(true);
              setButtonDisabled(true);
  
            },
            (err) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: { msg: err, msgType: "error" },
              });
            }
          )
          // :
          // setClassicModal(false);
  
          // dispatch({
          //   type: actionTypes.SET_OPEN_MSG,
          //   payload: { msg: "Select One Checkbox Atleast!!", msgType: "error" },
          // });
        // setButtonDisabled(true);
  
      }
    }
    else{
        setClassicModal(false);
  
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: "Select One Checkbox Atleast!!", msgType: "error" },
          });
    }


  }

  const formData = [
    {
      formName: "DispatchOrderForm",
      fields: [
        {
          disabled: true,
          name: "txt_dispatch_no",
          label: "Dispatch Order No",
          hidden: false,
          required: true,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 15,
          md: 4,
          lg: 3,
        },
        {
          name: "txt_dispatch_date",
          label: "Dispatch Date",
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
          name: "ddl_vehicle_no",
          label: "Vehicle No",
          hidden: false,
          required: true,
          align: "left",
          data_type: "string",
          html_element: "select_two",
          error: false,
          xs: 12,
          md: 4,
          lg: 3,
          options: vehicle.sort(sortWord("label")),
          disable: selectsToBeDisabled,
        },
        {
          name: "ddl_contractor",
          label: "Contractor",
          hidden: false,
          required: true,
          data_type: "string",
          html_element: "select_two",
          xs: 15,
          md: 6,
          lg: 4,
          options: allvendor.sort(sortWord("label")),
          disable: selectsToBeDisabled,
        },
        {
          name: "txt_dispatch_note",
          label: "Note",
          hidden: false,
          required: false,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          marginBottom: -15,
          defaultValue: "",
          error: false,
          xs: 12,
          md: 4,
          lg: 12,
        },
      ],
    },
  ];


  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title={
          dispatchDetail.edit
            ? "Sales > Dispatch > Edit"
            : "Sales > Dispatch > Add"
        }
      />
     { console.log(allItems,"sankhaoo099")}
      {/* Select and Add Items */}
      <GridContainer>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard cdTitle="Delivery Order Details ">
              <TableContainer>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">
                        Delivery Order Date
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Delivery Order No
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Sales Order No
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Quotation No
                      </StyledTableCell>
                      <StyledTableCell align="left">Enquiry No</StyledTableCell>
                      <StyledTableCell align="left">Customer</StyledTableCell>
                      <StyledTableCell align="left">Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell align="left" className={classes.endate}>
                        {allItems.DelDate}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.endate}>
                        {allItems.DelNo}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.engNo}>
                        {allItems.DelSalesOrderNo}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.endate}>
                        {allItems.DelQuotationNo}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.engNo}>
                        {allItems.enqNo}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        className={classes.enCustomerName}
                      >
                        {allItems.DelCustomer}
                      </StyledTableCell>

                      <StyledTableCell
                        align="left"
                        className={classes.enqStatus}
                      >
                        <div
                          style={{
                            color: allStatus.find(
                              (s, i) =>
                                s.value === Number(allItems.DelStatus)
                            )?.status_color,
                          }}
                        >
                          {
                            allStatus.find(
                              (s, i) =>
                                s.value === Number(allItems.DelStatus)
                            )?.label
                          }
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

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard cdTitle="Added Items" maxHeight={400}>
              {addedItem.length ? (
                <CollapsibleTable
                  rows={addedItem}
                  onChange={(e) => { onChangeDispatchDetails(e, addedItem) }}
                  state={dispatchDetail}
                  checked={checkedBox}
                  onCheckAll = {(e) => { onCheckAll(e) }}
                  onClick={onClickChkBox}
                />
              ) :
                (<div className={classes.noDispatchOrder}>
                  No dispatch order for you
                </div>)
              }

            </CustomCard>
          )}
        </GridItem>

        {/* /////////////////////Dispatch Order Details////////////////////////////// */}
        <GridItem xs="12">
          <CustomCard
            cdTitle={
              dispatchDetail.edit
                ? "Edit Dispatch Order Details"
                : "Dispatch Order Details"
            }
            width="100%"
            height="100%"
            style={{ marginTop: 0 }}
          >
            {formData.map((form, fkey) => {
              return (
                <GridContainer key={fkey} style={{ padding: "5px 20px" }}>
                  {form.fields.map((item, key) => {
                    return (
                      <>
                        <FormComponent
                          item={item}
                          key={key}
                          onSelect={onSelectDetails}
                          state={dispatchDetail}
                          onChange={onChangeDispatchDetails}
                          error={dispatchError}
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
          onCloseModel={onClickCloseMod}
          onClickAddTask={onClickAddTask}
          closeIcon={false}
          width={600}
          height="auto"
          // addTodobtn
          closeBtn={false}
          okbtnWith={200}
          appLogo
          modelName="Marudhar"
          okBtnText="Proceed to Invoice"
          onClickOk={onClickProcedeCreateInvoice}
        >
          <StepProceedModel
            step={5}
            title="Success!"
            desc="Dispatch Order No"
            generateNo={`${dispatchDetail.txt_dispatch_no}`}
          />
        </MasterModel>

        <GridItem xs={12}>
          <div className={classes.actionbtns}>
            <Button
              onClick={onClickClose}
              className={classes.actionbtn}
              variant="outlined"
              color="danger"
            >
              Close
            </Button>
            <Button
              onClick={onClickSubmitDispatchOrder}
              style={{ marginRight: "10px" }}
              className={classes.actionbtn}
              variant="outlined"
              color="primary"
              // disabled={!addedItem.length}
              disabled={buttonDisabled}

            >
              Submit Dispatch Order
            </Button>
          </div>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default DispatchOrderForm;



////////////////////////////old/////////////////22062022///////////
// import GridContainer from "components/Grid/GridContainer";
// import GridItem from "components/Grid/GridItem";
// import Select from "@material-ui/core/Select";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "components/CustomButtons/Button.js";
// import MasterModel from "../../../Components/MasterModel";
// import CustomButton, {
//   CircleAddBtn,
//   ColoseButton,
// } from "../../../Components/CustomButton";
// import { CustomCard } from "../../../Components/CustomCard";
// //SERVICE
// import { getSalesOrderBySalesId, getAllDeliveryOrder } from "../../../../services/createDeliveryOrderService";
// import { getListShowroomWarehouse } from "../../../../services/showroomWarehouseService";
// import {
//   postDispatchOrder,
//   getDispatchBySalesId,
//   getAllDispatchOrder
// } from "../../../../services/dispatchOrderListService";

// import { ThemeProvider } from "@material-ui/core";

// import SearchIcon from "@mui/icons-material/Search";
// import RotateLeftIcon from "@mui/icons-material/RotateLeft";
// import { IconButton, OutlinedInput } from "@material-ui/core";
// import ViewListIcon from "@mui/icons-material/ViewList";
// import { Grid, Box } from "@material-ui/core";
// import theme from "../../../../theme/theme";
// import Collapse from "@material-ui/core/Collapse";

// import React, { useCallback } from "react";
// import { useHistory, useLocation } from "react-router-dom";
// //SERVICE FOR VENDOR
// import { getListContractor } from "../../../../services/vendorService";
// import {  getVehicleById} from "../../../../services/vehicleService";
// import {
//   appFontWeightThin,
//   appDefaultColor,
//   appSecondColor,
//   appDefaultFamily,
//   appFontWeight,
//   tblBodyHoverColor,
// } from "assets/jss/material-dashboard-pro-react";
// import { withStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CollapsibleTable from "../../HelperComponent/TableInsideTable";
// import PageTitle from "../../HelperComponent/PageTitle";
// import FormComponent from "../../HelperComponent/FormComponent";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import { useStateValue } from "../../../../context/context";
// import { actionTypes } from "../../../../context/reducer";
// import {
//   currencyFormate,
//   currentDate,
//   sortWord,
// } from "../../HelperComponent/utils";
// import { getListStatus } from "../../../../services/addStatusService";
// import StepProceedModel from "../../HelperComponent/StepProceedModel";
// import { Typography } from "@material-ui/core";
// import { dateFormateField } from "../../HelperComponent/utils";
// import { StyledTableCell, StyledTableRow } from "../AddEnquiryPage";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     switchBtn: {
//       width: 180,
//       height: "100%",
//     },
//   },
//   itemImgPaper: {
//     width: "80px",
//     height: "80px",
//     overflow: "hidden",
//   },
//   tableLabel: {
//     fontWeight: 500,
//     color: appSecondColor,
//   },
//   addBtn: {
//     width: 30,
//     height: 38,
//   },

//   searchBar: {
//     marginTop: 10,
//     marginBottom: 15,
//     padding: "15px 20px",
//   },
//   actionbtns: {
//     marginTop: 20,
//     float: "right",
//   },

//   id: {
//     width: "0%",
//   },
//   enCustomerName: {
//     width: "15%",
//   },

//   action: {
//     width: "5%",
//   },
//   rate: {
//     width: "10%",
//   },

//   itemDetails: {
//     width: "35%",
//   },
//   quantity: {
//     width: "10%",
//   },
//   net_value_field: {
//     width: "10%",
//   },
//   collapsIcon: {
//     width: "5%",
//   },
//   noDispatchOrder: {
//     color: "red", 
//     textAlign: "center",
//   },
// }));

// const DispatchOrderForm = () => {
//   const history = useHistory();
//   const classes = useStyles();
//   const location = useLocation();
//   const [classicModal, setClassicModal] = React.useState(false);
//   const [globalState, dispatch] = useStateValue();
//   //vendor
//   const [allvendor, setAllVendors] = React.useState([]);
//   const [vehicle, setAllVehicle] = React.useState([]);
//   const vehicleRef = React.createRef([]);
//   const vendorRef = React.createRef([]);
//   //vehicleRef.current = vehicle;
//   const [buttonDisabled, setButtonDisabled] = React.useState(false);

//   const [refresh, setRefresh] = React.useState(false);
//   const [addedItem, setAddedItem] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);
//   const [allItems, setAllItems] = React.useState({});
//   const [billDetail, setBillDetail] = React.useState({});
//   const [allStatus, setAllStatus] = React.useState([]);
//   const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
//   const [selectsToBeDisabled, setSelectsToBeDisabled] = React.useState(false);
//   //state
//   const [vendor, setVendor] = React.useState({});
//   const [dispatchDetail, setDispatchDetail] = React.useState({
//     edit: false,
//     sales_id: "",
//     showroom_warehouse_id: "",
//     txt_dispatch_no: "AUTO GENERATED",
//     txt_dispatch_date: currentDate(),
//     dispatch_status:{ value: "", label: "All" },

//     txt_dispatch_note: "",
//     ddl_sales_showroom: "",
//     ddl_vehicle_no: "",
//     ddl_contractor: "",
//   });
//    // Error handler
//    const [dispatchError, setDispatchError] = React.useState({
//     ddl_vehicle_no: false,
//     ddl_contractor: false,
   
//   });
//   let id = 0;
  
//   const onChangeDispatchDetails = (e, do_qty) => {
//     const { name, value } = e.target;

//     //console.log("isaedas", name, value);
//     //console.log(allItems,"alllll")
//     //for (var i=0; i <allItems.delivery_order_item_details.length ; i++) {
//       //let do_qty = allItems.delivery_order_item_details[id][`${localStorage.getItem("user_location")}_${allItems.delivery_order_item_details[id].item_id}`];
//       //console.log("do_qty_dispatch1", do_qty);
// if(name==="txt_dispatch_date"){
//   setDispatchDetail({ ...dispatchDetail, [name]: value });
// }
//        else if(name != "ddl_vehicle_no" || name != "ddl_contractor"){
//         if (Number(value) >0) {

     

//             if (Number(value) > Number( do_qty)) {
//               //console.log("do_qty_dispatch2", do_qty);
//               dispatch({
//                 type: actionTypes.SET_OPEN_MSG,
//                 payload: { msg: "Delivery Qty can not be more than DO qty", msgType: "error" },
//               });
              
            
          
//             }else{
//               setDispatchDetail({ ...dispatchDetail, [name]: value });
//             }
//         }
//         else{ dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: "Now Dispatch can not be 0", msgType: "error" },
//         });}
//        }else{
//         setDispatchDetail({ ...dispatchDetail, [name]: value });
//        }
//   //} 
    
    
//   };

//   const onSelectDetails = (name, v) => {
//     //console.log(v.value, v.label,"console");
//     setDispatchDetail({ ...dispatchDetail, [name]: v });
//   };

//   const fetchData = () => {
//     setLoading(false);
//     getVehicleById(
//       (v) => {
//         vehicleRef.current = v;
//         setAllVehicle(v);
//       },
//       (err) => {
//         setLoading(false);
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       }
//     );

//     getListStatus(
//       "Sales",
//       (r) => {
//         setAllStatus(r);
//         r.forEach((s, i) => {
//           if (s.label === "Dispatch Order Generated") {
//             setDispatchDetail((prv) => ({ ...prv, dispatch_status: s.value }));
//           }
//         });
//       },
//       (err) => {
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       }
//     );
//     getListShowroomWarehouse(
//       (r) => {
//         setAllShowroomWarehouse(r);
//       },
//       (err) => {
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       }
//     );
//     //console.log(vendorRef,"5565")
//     getListContractor(
//       (r) => {
//         vendorRef.current = r;
//         setAllVendors(r);
//       },
//       (err) => {
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       }
//     );
//   };

//   //console.log(addedItem,"addedItems");
  
//   React.useEffect(() => {
//     fetchData();
//     setLoading(true);
//     if (location.state?.edit) {
//       getDispatchBySalesId(
//         location.state?.row.sales_id,
//         (items) => {
//           setLoading(false);
//           setAllItems(items);
//           //console.log("fffffff");
//           setAddedItem(items.do_item_details_with_dispatch);
//           items.do_item_details_with_dispatch.map((d, i) => {
//               setDispatchDetail((prv) => ({
//               ...prv,
//               edit: location.state?.edit,
//               showroom_warehouse_id: d.showroom_warehouse_id,
//               sales_id: location.state?.row.sales_id,
//               [`txt_dispatch_qty_${d.item_id}`]: d.dispatched_qty,
//               [`txt_now_dispatch_qty_${d.item_id}`]:
//                 d.now_dispatch_qty - d.dispatched_qty,
//               txt_dispatch_no: items.dispatch_order_no,
//               txt_dispatch_date: dateFormateField(items.dispatch_order_date),
//               ddl_vehicle_no: items.vehicle_no,
//               ddl_contractor: items.contractor_id,
//               txt_dispatch_note: items.dispatch_order_note,
//               ddl_sales_showroom: items.ddl_enqShowroom,
//               delivery_order_no: items.delivery_order_no,
//               delivery_order_item_details: items.delivery_order_item_details_prv,
//             }));
//           });
//         },
//         (err) => {
//           setLoading(false);
//           dispatch({
//             type: actionTypes.SET_OPEN_MSG,
//             payload: { msg: err, msgType: "error" },
//           });
//         }
//       );
//     } else {
//       //  //console.log(localStorage.getItem("user_location"),"loco")

//       setAddedItem([]);
//       //console.log("Uma", location.state?.row);
//       let total_dispatched_till_now = {};

//       getAllDispatchOrder(
//         (items) => {
//           //console.log("fish1", items);
//           //sum = 0
//           items.map((o, i) => {
//             o.dispatch_order_item_details.map((p,j) => {
//               if(p.showroom_warehouse_id === localStorage.getItem("user_location")) {
//                 total_dispatched_till_now[`${p.item_id}`] = total_dispatched_till_now[`${p.item_id}`] ? 
//                 (total_dispatched_till_now[`${p.item_id}`] + Number(p.now_dispatch_qty)) : Number(p.now_dispatch_qty);
//               }
//             });
//           });
//           //console.log("vhvh1", vendorRef.current);
//           //console.log("vhvh2", vehicleRef.current);
//           //console.log("fish2", total_dispatched_till_now); 
//           setDispatchDetail((prv) => ({
//             ...prv,
//             ddl_vehicle_no: vehicleRef.current?.filter((o)=> o.value === items[0].dispatch_order_details.vehicle_id)[0],
//             ddl_contractor: vendorRef.current?.filter((o)=> o.value === items[0].dispatch_order_details.contractor_id)[0],
//           }));
//           setSelectsToBeDisabled(true);
          
//         },

//         (err) => {
//           //console.log("New Do Dp",vehicleRef.current);
//           // setDispatchDetail((prv) => ({
//           //   ...prv, 
//           //   ddl_vehicle_no: vehicleRef.current[0],
//           //   ddl_contractor: vendorRef.current[0],
//           // }));
//         }, 

//         { 
//           txt_delivery_order_no: location.state?.row?.DelNo, 
//           txt_dispatch_date_from: "2021-04-01",
//           txt_dispatch_date_to: currentDate(),
//         }, false);

      
//       getAllDeliveryOrder(
//         (items) => {
//           setLoading(false);
//           //console.log("alia", items);

//           setAllItems(items);

//           items.delivery_order_item_details.map((d, i) => {
//             if (d[`${localStorage.getItem("user_location")}_${d.item_id}`]) {
//               setAddedItem((prv) => [...prv, d]);
//               setDispatchDetail((prv) => ({
//                 ...prv,
//                 showroom_warehouse_id: localStorage.getItem("user_location"),
//                 sales_id: location.state?.row.sales_id,
//                 [`txt_dispatch_qty_${d.item_id}`]: 
//                 (Object.keys(total_dispatched_till_now).length > 0 ? total_dispatched_till_now[`${d.item_id}`] : 0),
//                 [`txt_now_dispatch_qty_${d.item_id}`]: d[
//                   `${localStorage.getItem("user_location")}_${d.item_id}`
//                 ] - (Object.keys(total_dispatched_till_now).length > 0 ? total_dispatched_till_now[`${d.item_id}`] : 0),
//                 do_num: items.DelNo,
//               }));
//             }
//           });

//         },

//         (err) => {
//           dispatch({
//             type: actionTypes.SET_OPEN_MSG,
//             payload: { msg: err, msgType: "error" },
//           });
//         },

//         { txt_delivery_order_no: location.state?.row.DelNo }
//       );
//     }
//     //console.log(dispatchDetail, "check9");
//   }, [globalState.refresh]);

//   //   on Procede to Invoice
//   const onClickProcedeCreateInvoice = (e) => {
//     e.preventDefault();
//     setClassicModal(false);
//     history.push({
//       pathname: "/admin/sales/invoice/create",
//       state: {
//         row: { sales_id: dispatchDetail.sales_id, disDispatchNo: dispatchDetail.txt_dispatch_no },
//       },
//     });
//   };

//   //   onClick Add Task
//   const onClickAddTask = () => {
//     history.push({
//       pathname: "/admin/sales/dispatch-order-view",
//       state: {
//         row: { sales_id: location.state?.row?.sales_id },
//         updateTask: true,
//       },
//     });
//   };

//   const onClickCloseMod = () => {
//     history.push({
//       pathname: "/admin/sales/dispatch-order-list"
//     });
//   };


//   const onClickClose=(e)=>{
//     history.push({
//       pathname: "/admin/sale/delivery-order",
//     });
//   }


//   const onClickSubmitDispatchOrder = (e) => {
//     e.preventDefault();

//     if(!dispatchDetail.ddl_vehicle_no || !dispatchDetail.ddl_contractor){
//       setDispatchError(({...dispatchError,
//         ddl_contractor:!dispatchDetail.ddl_contractor,
//         ddl_vehicle_no:!dispatchDetail.ddl_vehicle_no
//       }))

//     }else{
//       //console.log(!dispatchDetail.ddl_vehicle_no,"ddl_vehicle_no");
//       setClassicModal(true);
//       setDispatchError({});
      
//     let updatedItems = [];
//     if (allItems.delivery_order_item_details.length) {
//       //added item data
//       //console.log("hello");
//       allItems.delivery_order_item_details.map((item, i) => {
//         //console.log("item", vendor);
//         if (item[`${localStorage.getItem("user_location")}_${item.item_id}`]) {
//           //console.log("item", item);
//           updatedItems.push({
//             showroom_warehouse_id: dispatchDetail.showroom_warehouse_id,
//             item_id: item.item_id,
//             quantity: item.quantity,
//             do_qty: item.delivered_qty,
//             delivery_order_no: item.delivery_no,
//             rate: item.rate,
//             mrp:item.mrp,
//             uom_id: item.uom_id,
//             uom_name: item.uom_name,
//             disc_percentage: item.disc_percentage,
//             disc_value: item.disc_value,
//             gst_percentage: item.gst_percentage,
//             gst_value:  Number(item.gst_value).toFixed(2),
//             gst_type: item.gst_type,
//             net_value:item.net_value,
//             vehicle_no: item.vehicle_no,
//             contractor_id: item.contractor_id,
//             dispatched_qty:
//               Number(dispatchDetail[`txt_now_dispatch_qty_${item.item_id}`]),
//             now_dispatch_qty:
//               Number(dispatchDetail[`txt_now_dispatch_qty_${item.item_id}`]),
//           });
//         }
//       });
//     } //End of item data
//     postDispatchOrder(
//       dispatchDetail,
//       updatedItems,
//       (r) => {
//         //console.log("r print " + r);
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: {
//             msg: billDetail.edit
//               ? "Dispatch Order Updated Successfully"
//               : "Dispatch Order Submited Successfully",
//             msgType: "success",
//           },
//         });

//         // //console.log(dispatchDetail)

//         if (!dispatchDetail.edit) {
//           setDispatchDetail((prv) => ({
//             ...prv,

//             sales_id: r.sales_id,
//             txt_dispatch_no: r.dispatch_order_no[r.dispatch_order_no.length - 1],
//             ddl_vehicle_no: r.vehicle_id,
//             ddl_contractor: r.contractor_id,
//           }));
//         }
//         setClassicModal(true);
//       },
//       (err) => {
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       }
//     );
//     }
//     setButtonDisabled(true);

//   }

//   const formData = [
//     {
//       formName: "DispatchOrderForm",
//       fields: [
//         {
//           disabled: true,
//           name: "txt_dispatch_no",
//           label: "Dispatch Order No",
//           hidden: false,
//           required: true,
//           align: "left",
//           data_type: "string",
//           html_element: "TextField",
//           error: false,
//           xs: 15,
//           md: 4,
//           lg: 3,
//         },
//         {
//           name: "txt_dispatch_date",
//           label: "Dispatch Date",
//           hidden: false,
//           required: true,
//           align: "left",
//           data_type: "date",
//           html_element: "TextField",
//           error: false,
//           xs: 12,
//           md: 4,
//           lg: 2,
//         },
//         {
//           name: "ddl_vehicle_no",
//           label: "Vehicle No",
//           hidden: false,
//           required: true,
//           align: "left",
//           data_type: "string",
//           html_element: "select_two",
//           error: false,
//           xs: 12,
//           md: 4,
//           lg: 3,
//           options: vehicle.sort(sortWord("label")),
//           disable: selectsToBeDisabled,
//         },
//         {
//           name: "ddl_contractor",
//           label: "Contractor",
//           hidden: false,
//           required: true,
//           data_type: "string",
//           html_element: "select_two",
//           xs: 15,
//           md: 6,
//           lg: 4,
//           options: allvendor.sort(sortWord("label")),
//           disable: selectsToBeDisabled,
//         },
//         {
//           name: "txt_dispatch_note",
//           label: "Note",
//           hidden: false,
//           required: false,
//           align: "left",
//           data_type: "string",
//           html_element: "TextField",
//           marginBottom: -15,
//           defaultValue: "",
//           error: false,
//           xs: 12,
//           md: 4,
//           lg: 12,
//         },
//       ],
//     },
//   ];

//   //  x

//   return (
//     <ThemeProvider theme={theme}>
//       <PageTitle
//         title={
//           dispatchDetail.edit
//             ? "Sales > Dispatch > Edit"
//             : "Sales > Dispatch > Add"
//         }
//       />
//       {/* Select and Add Items */}
//       <GridContainer>
//         <GridItem xs="12">
//           {loading ? (
//             <Box mt={10} width="100%" textAlign="center">
//               <CircularProgress />
//             </Box>
//           ) : (
//             <CustomCard cdTitle="Delivery Order Details ">
//               <TableContainer>
//                 <Table className={classes.table} aria-label="customized table">
//                   <TableHead>
//                     <TableRow>
//                       <StyledTableCell align="left">
//                         Delivery Order Date
//                       </StyledTableCell>
//                       <StyledTableCell align="left">
//                         Delivery Order No
//                       </StyledTableCell>
//                       <StyledTableCell align="left">
//                         Sales Order No
//                       </StyledTableCell>
//                       <StyledTableCell align="left">
//                         Quotation No
//                       </StyledTableCell>
//                       <StyledTableCell align="left">Enquiry No</StyledTableCell>
//                       <StyledTableCell align="left">Customer</StyledTableCell>
//                       <StyledTableCell align="left">Status</StyledTableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <StyledTableRow>
//                       <StyledTableCell align="left" className={classes.endate}>
//                         {allItems.DelDate}
//                       </StyledTableCell>
//                       <StyledTableCell align="left" className={classes.endate}>
//                         {allItems.DelNo}
//                       </StyledTableCell>
//                       <StyledTableCell align="left" className={classes.engNo}>
//                         {allItems.DelSalesOrderNo}
//                       </StyledTableCell>
//                       <StyledTableCell align="left" className={classes.endate}>
//                         {allItems.DelQuotationNo}
//                       </StyledTableCell>
//                       <StyledTableCell align="left" className={classes.engNo}>
//                         {allItems.enqNo}
//                       </StyledTableCell>
//                       <StyledTableCell
//                         align="left"
//                         className={classes.enCustomerName}
//                       >
//                         {allItems.DelCustomer}
//                       </StyledTableCell>

//                       <StyledTableCell
//                         align="left"
//                         className={classes.enqStatus}
//                       >
//                         <div
//                           style={{
//                             color: allStatus.find(
//                               (s, i) =>
//                                 s.value === Number(allItems.DelStatus)
//                             )?.status_color,
//                           }}
//                         >
//                           {
//                             allStatus.find(
//                               (s, i) =>
//                                 s.value === Number(allItems.DelStatus)
//                             )?.label
//                           }
//                         </div>
//                       </StyledTableCell>
//                     </StyledTableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CustomCard>
//           )}
//         </GridItem>
//       </GridContainer>

//       <GridContainer className={classes.root}>
//         <GridItem xs="12">
//           {loading ? (
//             <Box mt={10} width="100%" textAlign="center">
//               <CircularProgress />
//             </Box>
//           ) : (
//             <CustomCard cdTitle="Added Items" maxHeight={400}>
//               {addedItem.length ? (
//                 <CollapsibleTable
//                   rows={addedItem}
//                   onChange={onChangeDispatchDetails}
//                   state={dispatchDetail}
//                 />
//               ) :
//               (<div className={ classes.noDispatchOrder }>
//                 No dispatch order for you
//               </div>) 
//                }
//               {/* <Box pt={2}>
//                 <Grid container>
//                   <Grid item xs={7}>
//                     <Box className={classes.tableLabel} ml={9} textAlign="left">
//                       Total
//                     </Box>
//                   </Grid>

//                   <Grid item xs={5}>
//                     <Box
//                       className={classes.tableLabel}
//                       mr={2}
//                       textAlign="right"
//                     >
//                       {allItems.delivery_order_item_details
//                         ? currencyFormate(
//                             allItems.delivery_order_item_details.reduce(
//                               (sum, li) => Number(sum) + Number(li.net_value),
//                               0
//                             )
//                           )
//                         : "00"}
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Box> */}
//             </CustomCard>
//           )}
//         </GridItem>
        
// {//console.log("check check")}

//         <GridItem xs="12">
//           <CustomCard
//             cdTitle={
//               dispatchDetail.edit
//                 ? "Edit Dispatch Order Details"
//                 : "Dispatch Order Details"
//             }
//             width="100%"
//             height="100%"
//             style={{ marginTop: 0 }}
//           >
//             {formData.map((form, fkey) => {
//               return (
//                 <GridContainer key={fkey} style={{ padding: "5px 20px" }}>
//                   {form.fields.map((item, key) => {
//                     return (
//                       <>
//                         <FormComponent
//                           item={item}
//                           key={key}
//                           onSelect={onSelectDetails}
//                           state={dispatchDetail}
//                           onChange={onChangeDispatchDetails}
//                           error={dispatchError}
//                         />
//                       </>
//                     );
//                   })}
//                 </GridContainer>
//               );
//             })}
//           </CustomCard>
//         </GridItem>
//         <MasterModel
//           classicModal={classicModal}
//           onCloseModel={onClickCloseMod}
//           onClickAddTask={onClickAddTask}
//           closeIcon={false}
//           width={600}
//           height="auto"
//           // addTodobtn
//           closeBtn={false}
//           okbtnWith={200}
//           appLogo
//           modelName="Marudhar"
//           okBtnText="Proceed to Invoice"
//           onClickOk={onClickProcedeCreateInvoice}
//         >
//           <StepProceedModel
//             step={5}
//             title="Success!"
//             desc="Dispatch Order No"
//             generateNo={`${dispatchDetail.txt_dispatch_no}`}
//           />
//         </MasterModel>
//         <GridItem xs={12}>
//           <div className={classes.actionbtns}>
//           <Button
//                 onClick={onClickClose}
//                 className={classes.actionbtn}
//                 variant="outlined"
//                 color="danger"
//               >
//                 Close
//               </Button>
//             <Button
//               onClick={onClickSubmitDispatchOrder}
//               style={{ marginRight: "10px" }}
//               className={classes.actionbtn}
//               variant="outlined"
//               color="primary"
//               // disabled={!addedItem.length}
//               disabled={buttonDisabled}

//             >
//               Submit Dispatch Order
//             </Button>
//           </div>
//         </GridItem>
//       </GridContainer>
//     </ThemeProvider>
//   );
// };

// export default DispatchOrderForm;
