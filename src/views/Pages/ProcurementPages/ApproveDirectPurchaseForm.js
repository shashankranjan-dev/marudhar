import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable, { ActiveIcon, DeActiveIcon } from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import { getListStatus } from "../../../services/addStatusService";
// import { getDirectPurchaseById } from "../../../services/directPurchaseFormService";
import { postJournalFromDirectPurchase, getDirectPurchaseById, getVendorByVendorName, updateDirectPurchase,getSearchItem } from "../../../services/approveDirectPurchaseService";
import DeleteIcon from "@mui/icons-material/Delete";

import { Input, Paper, IconButton } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import theme from "../../../theme/theme";
import Button from "components/CustomButtons/Button.js";
import React from "react";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
  appScrollBar,
} from "assets/jss/material-dashboard-pro-react";
import { useHistory, useLocation } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";
import alertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ItemViewCard from "../HelperComponent/ItemViewCard";
import PageTitle from "../HelperComponent/PageTitle";
import ItemImg from "../HelperComponent/ItemImg";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import FormComponent from "../HelperComponent/FormComponent";
import UpdateTaskAndStatus from "../HelperComponent/UpdateTaskAndStatus";
import StepProceedModel from "../HelperComponent/StepProceedModel";
import { Typography, Grid, Box } from "@material-ui/core";
import { currentDate, currencyFormate } from "../HelperComponent/utils";
import { StyledTableCell, StyledTableRow } from "../Sales/AddEnquiryPage";

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

  actionbtns: {
    marginLeft: 15,
    marginTop: 20,
    float: "right",
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
  searchBar: {
    marginTop: 10,
    marginBottom: 15,
    padding: "15px 20px",
  },
  activeText: {
    ...activeText,
  },

  id: {
    width: "0%",
  },

  action: {
    width: "5%",
  },
  rate: {
    width: "8%",
  },
  value: {
    width: "15%",
  },
  itemImg: {
    width: "8%",
  },
  itemDetails: {
    width: "65%",
  },
  quantity: {
    width: "5%",
  },
  net_value_field: {
    width: "10%",
  },
}));

const DirectPurchaseView = () => {
  const classes = useStyles();
  const history = useHistory();
  const [globalState, dispatch] = useStateValue();
  const location = useLocation();
  const [allStatus, setAllStatus] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [direactPurchaseId, setDirectPurchaseId] = React.useState("");
  const [vendorDetail, setVendorDetail] = React.useState([]);
  const [classicModal, setClassicModal] = React.useState(false);
  const [itemDetail, setItemDetail] = React.useState({});
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  let grandTotal = 0;
  const user_id = globalState.user?.serial_id;
  const purchase_id = location.state?.row.purchase_id;
  const ddl_status = Number(location.state?.row.ddl_status);
  const grn = location.state?.row?.dplGrnNo;

  /////////////////new\\\\\\\\\\\\\state/////
  // const [searchQuery, setSearchQuery] = React.useState("");
  // const [allItems, setAllItems] = React.useState([]);


  React.useEffect(() => {

    //console.log(user_id, "30031w")
    getVendorByVendorName(
      location.state?.row.dplVendor,
      (r) => {
        //console.log(r[0].vendor_id, "999d13")

        setVendorDetail(r[0]);

        // ledger_account_id.push(r);
        //ledger_account_id = r[0]?.ledger_id;
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    getListStatus(
      "Purchase",
      (r) => {
        setAllStatus(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    if (location.state?.row) {

      setDirectPurchaseId(purchase_id);

      getDirectPurchaseById(
        Number(purchase_id),
        Number(ddl_status),
        (r) => {
          //console.log(r, "5656")
          setAddedItems(r);

          r.item_details.map((item, k) => {
            //console.log(item, "8586")
            setItemDetail((prv) => ({
              ...prv,
              [`item_id${item.item_id}`]: item.item_id,
              [`txt_quantity${item.item_id}`]: item.quantity ? item.quantity : 0,
              [`ddl_uom${item.item_id}`]: { value: item.uom_id, label: item.uom_name },
              [`txt_rate${item.item_id}`]: item.rate,
              [`txt_disc_per${item.item_id}`]: item.disc_percentage,
              [`txt_disc_value${item.item_id}`]: item.disc_value,
              [`txt_gst_per${item.item_id}`]: item.gst_percentage,
              [`txt_gst_value${item.item_id}`]: item.gst_value,
              [`txt_net_value${item.item_id}`]: Number(item.net_value)
              //   Number(totalValue) + Number(calculatePerValue(r.gst_percentage, totalValue)),
              // [`txt_net_value${r.item_id}`]: Number(totalValue),
            }));
          })
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
    }
  }, [refresh]);
 


  const onSubmitApprove = () => {
    setButtonDisabled(true);


    let updatedItem = [];

    addedItems.item_details.map((item, k) => {
      updatedItem.push({
        item_id: item.item_id,
        quantity: Number(itemDetail[`txt_quantity${item.item_id}`]),
        rate: itemDetail[`txt_rate${item.item_id}`],
        uom_id: itemDetail[`ddl_uom${item.item_id}`].value,
        uom_name: itemDetail[`ddl_uom${item.item_id}`].label,
        disc_percentage: itemDetail[`txt_disc_per${item.item_id}`],
        disc_value: itemDetail[`txt_disc_value${item.item_id}`],
        gst_percentage: itemDetail[`txt_gst_per${item.item_id}`],
        gst_value: itemDetail[`txt_gst_value${item.item_id}`],
        net_value: itemDetail[`txt_net_value${item.item_id}`],
      })
    })

    //console.log(vendorDetail, "3003vd")
    //console.log(grandTotal, "3003vgt")

    let journal_details = [];
    let sales_details = [];

    updateDirectPurchase(
      addedItems,
      updatedItem,
      location.state?.row.purchase_id,
      user_id,
      grandTotal,
      (r) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: "Direct Purchase Updated And Approved Successfully",
            msgType: "success",
          },
        });
        setClassicModal(true);
        setRefresh(!refresh);
        // onClearState();
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    // addedItems.map((r,i)=>{
    journal_details.push({
      amount: grandTotal,
      dr_cr: 2,
      ddl_ledger: addedItems.dplVendor,
      ddl_ledger_id: vendorDetail.vendor_id,
    }),
    journal_details.push({
        amount: grandTotal,
        dr_cr: 1,
        ddl_ledger: "Purchase",
        ddl_ledger_id: 2737,
      })
    // });
    postJournalFromDirectPurchase(
      addedItems,
      journal_details,
      grandTotal,
      grn,
      // (r) => {
      //   dispatch({
      //     type: actionTypes.SET_OPEN_MSG,
      //     payload: {
      //       msg: "Direct Purchase Approved Successfully",
      //       msgType: "success",
      //     },
      //   });

      //   setClassicModal(true);
      // },
      // (err) => {
      //   dispatch({
      //     type: actionTypes.SET_OPEN_MSG,
      //     payload: { msg: err, msgType: "error" },
      //   });
      // }
    );
    history.push({
      pathname: "/admin/procurement/direct-purchase",
    });
  };

  const onClickClose = () => {
    history.push({
      pathname: "/admin/procurement/direct-purchase",
    });
  }

  const onChange = (e, row) => {
    //console.log(e.target.value, "0604")

    const { name, value } = e.target;

    //console.log(name, value, "06041")

    if (name === `txt_quantity${row.item_id}`) {

      let net_value = Number(itemDetail[`txt_rate${row.id}`]) * value;

      setItemDetail((prv) => ({
        ...prv,
        [name]: value,
        [`txt_rate${row.item_id}`]: net_value ? net_value / value : 0,
        [`txt_net_value${row.item_id}`]: itemDetail[`txt_net_value${row.id}`] ?
          net_value
          : value * 0
      }));
    }
    if (name === `txt_net_value${row.item_id}`) {
      //console.log(name, value, "8855")
      setItemDetail((prv) => ({
        ...prv,
        [name]: value,
        [`txt_rate${row.item_id}`]: value / Number(itemDetail[`txt_quantity${row.id}`])
      }));
    }

  }

  ////////////////New Changes\\\\\\\\\\\\\\\\\\\\\

  // const onAddSearch = (e) => {
  //   const { name, value } = e.target;
  //   setSearchQuery(value);
  // };

  // const onSearchItem = () => {
  //   if (searchQuery) {
  //     getSearchItem(
  //       (items) => {
  //         let newArr = items.filter((item, i) => !editedItem.includes(item));
  //         setAllItems(newArr);
  //         items.map((r, i) => {
  //           setAllTempItems((prv) => ({
  //             ...prv,
  //             // [name]: value,
  //             [`txt_gst_per${r.item_id}`]: r.cgst_percentage,
  //             [`txt_rate${r.item_id}`]: r.mrp,
  //           }));
  //           setItemDetail((prv) => ({
  //             ...prv,
  //             [`txt_quantity${r.id}`]: 0,
  //             [`txt_gst_per${r.id}`]: r.cgst_percentage,
  //             [`txt_gst_value${r.id}`]: 0,
  //             [`txt_disc_per${r.id}`]: '0',
  //             [`txt_disc_value${r.id}`]: '0',
  //             [`txt_rate${r.id}`]: 0,
  //             [`txt_net_value${r.id}`]: 0,
  //             [`ddl_uom${r.id}`]: 0,

  //           }));
  //         });
  //       },
  //       (err) => {
  //         dispatch({
  //           type: actionTypes.SET_OPEN_MSG,
  //           payload: { msg: err, msgType: "error" },
  //         });
  //       },
  //       searchQuery
  //     );
  //   }
  // };
  
  // React.useEffect(() => {
  //   // fetchData();
  //   if (searchQuery.length >= 6) {
  //     onSearchItem();
  //   } else {
  //     setAllItems([]);
  //   }
  // }, [searchQuery]);

  return (
    <ThemeProvider theme={theme}>
      {location.state?.updateTask ? (
        <PageTitle title="Procurement > Direct Purchase > Update To Do" />
      ) : (
        <PageTitle title="Procurement > Approve Direct Purchase > Form" />
      )}
{/* ////////////////////////// New Item Add\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
      {/* <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Search by Item Code/Name" filterIcon>
            <GridContainer
              style={{ padding: "10px" }}
              justifyContent="flex-start"
              alignItems="center"
            >
              <GridItem xs="12">
                <TextField
                  autoFocus={true}
                  size="small"
                  placeholder="Search"
                  name="serarchItem"
                  onChange={onAddSearch}
                  style={{ marginBottom: -15 }}
                  type="search"
                  id="outlined-basic"
                  fullWidth={true}
                  value={searchQuery}
                  variant="outlined"
                />
              </GridItem>
            </GridContainer>
          </CustomCard>
        </GridItem>
      </GridContainer> */}


{/* ////////////////////////Old\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}
      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Direct Purchase">
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Bill Date</StyledTableCell>
                    <StyledTableCell align="left">Bill No</StyledTableCell>
                    <StyledTableCell align="left">Vendor</StyledTableCell>
                    <StyledTableCell align="left">Bill Value</StyledTableCell>

                    <StyledTableCell align="left">GRN No</StyledTableCell>
                    <StyledTableCell align="left">GRN Date</StyledTableCell>
                    <StyledTableCell align="left">Narration</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    {/* {//console.log(addedItems, "5353")} */}
                    <StyledTableCell align="left" className={classes.endate}>
                      {addedItems.dplBillDate}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.engNo}>
                      {addedItems.dplBillNo}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.dplVendor}>
                      {addedItems.dplVendor}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.dplGrossAmount}
                    >
                      {addedItems.bill_value}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.enqEmail}>
                      {addedItems.grn_no}
                    </StyledTableCell>

                    <StyledTableCell align="left" className={classes.enqEmail}>
                      {addedItems.grn_date}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.enqEmail}>
                      {addedItems.note}
                    </StyledTableCell>

                    {/* <StyledTableCell
                      align="center"
                      className={classes.enqStatus}
                    >
                      <div
                        style={{
                          color: allStatus.find(
                            (s, i) =>
                              s.value ===
                              Number(addedItems.direact_purchase_status)
                          )?.status_color,
                        }}
                      >
                        {
                          allStatus.find(
                            (s, i) =>
                              s.value ===
                              Number(addedItems.direact_purchase_status)
                          )?.label
                        }
                      </div>
                    </StyledTableCell> */}
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Item Details" maxHeight={380}>
            <TableContainer className={classes.container}>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">#</StyledTableCell>
                    <StyledTableCell align="left">Image</StyledTableCell>
                    <StyledTableCell align="left">Item Details</StyledTableCell>
                    <StyledTableCell align="right">Qty</StyledTableCell>
                    <StyledTableCell align="left">Unit</StyledTableCell>
                    <StyledTableCell align="right">Rate</StyledTableCell>
                    {/* <StyledTableCell align="right">Disc%</StyledTableCell>
                    <StyledTableCell align="right">Disc Value</StyledTableCell>
                    <StyledTableCell align="right">GST%</StyledTableCell>
                    <StyledTableCell align="right">GST Value</StyledTableCell> */}
                    <StyledTableCell align="right">Net Value</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addedItems?.item_details &&
                    addedItems.item_details.map((row, i) => (
                      <StyledTableRow key={i}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                          className={classes.id}
                        >
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
                          className={classes.itemDetailsView}
                        >
                          <ItemViewCard item_id={row.item_id} />
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.quantity}
                        >
                          <div>
                            <TextField
                              ize="small"
                              placeholder="Value"
                              name={`txt_quantity${row.id}`}
                              style={{ marginBottom: -15 }}
                              type="number"
                              inputProps={{ style: { textAlign: "right" } }}
                              defaultValue={row.net_value_field}
                              onChange={(e) => onChange(e, row)}
                              id="outlined-basic"
                              fullWidth={true}
                              value={itemDetail[`txt_quantity${row.id}`]}
                              variant="outlined"
                              onClick={(e) => { e.target.select() }}
                            />
                          </div>
                          {/* {row.quantity} */}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.quantity}
                        >
                          {row.uom_name}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.viewValue}
                        >
                          {currencyFormate(itemDetail[`txt_rate${row.id}`])}
                        </StyledTableCell>

                        {/* <StyledTableCell
                          align="right"
                          className={classes.viewValue}
                        >
                          {row.disc_percentage}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.viewValue}
                        >
                          {currencyFormate(row.disc_value)}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.viewQuantity}
                        >
                          {row.gst_percentage}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.viewValue}
                        >
                          {currencyFormate(row.gst_value)}
                        </StyledTableCell> */}

                        <StyledTableCell
                          align="right"
                          className={classes.net_value_field}
                        >
                          <div>
                            <TextField
                              size="small"
                              placeholder="Value"
                              name={`txt_net_value${row.id}`}
                              style={{ marginBottom: -15 }}
                              type="number"
                              inputProps={{ style: { textAlign: "right" } }}
                              defaultValue={row.net_value_field}
                              onChange={(e) => onChange(e, row)}
                              id="outlined-basic"
                              fullWidth={true}
                              value={itemDetail[`txt_net_value${row.id}`]}
                              variant="outlined"
                              onClick={(e) => { e.target.select() }}
                            />
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box pt={2}>
              <Grid container>
                <Grid item xs={7}>
                  <Box className={classes.tableLabel} ml={9} textAlign="left">
                    Total
                  </Box>
                </Grid>

                <Grid item xs={5}>
                  <Box className={classes.tableLabel} mr={1} textAlign="right">
                    {addedItems.item_details
                      ? currencyFormate(grandTotal =
                        addedItems.item_details.reduce(
                          (sum, li) => Number(sum) + Number(itemDetail[`txt_net_value${li.item_id}`],),
                          0
                        )
                      )
                      : "00"}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CustomCard>
        </GridItem>

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
              onClick={onSubmitApprove}
              className={classes.actionbtn}
              variant="outlined"
              color="primary"
              disabled={buttonDisabled}

            >
              Approved
            </Button>
          </div>
        </GridItem>
        {/* <UpdateTaskAndStatus
          statusBtn={false}
          setRefresh={setRefresh}
          refresh={refresh}
          id={direactPurchaseId}
          status_id={addedItems.status}
          module="PURCHASE"
          location={location}
          statusFor="Purchase"
        /> */}


        <MasterModel
          classicModal={classicModal}
          onCloseModel={() => setClassicModal(false)}
          width={600}
          closeIcon={false}
          height="auto"
          addTodobtn
          closeBtn={false}
          okbtnWith={200}
          appLogo
          modelName=""
          okBtnText="OK"
          onClickOk={(e) => {
            e.preventDefault();
            setClassicModal(false);
            history.push("/admin/procurement/tobe-approve-direct-purchase");
          }}
        >
          <StepProceedModel
            step={1}
            isStep={false}
            title="Thank you"
            desc=" Your GRN No is Approved "
            generateNo={addedItems.grn_no}
          />
        </MasterModel>
      </GridContainer>
    </ThemeProvider>
  );
};

export default DirectPurchaseView;
