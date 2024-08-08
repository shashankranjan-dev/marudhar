import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable, { ActiveIcon, DeActiveIcon } from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import { getListStatus } from "../../../services/addStatusService";
import { getDirectPurchaseById } from "../../../services/directPurchaseFormService";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "components/CustomButtons/Button.js";
import { Input, Paper, IconButton } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";

import theme from "../../../theme/theme";
import {DeleteDirectPurchase } from "../../../services/approveDirectPurchaseService";

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

import { Typography, Grid, Box } from "@material-ui/core";
import { currentDate, currencyFormate } from "../HelperComponent/utils";
import { StyledTableCell, StyledTableRow } from "../Sales/AddEnquiryPage";
import StepProceedModel from "../HelperComponent/StepProceedModel";

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
    marginLeft:15,
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
  const user_id = globalState.user?.serial_id; 
  const [classicModal, setClassicModal] = React.useState(false);

  React.useEffect(() => {
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
      setDirectPurchaseId(location.state?.row.purchase_id);
      getDirectPurchaseById(
        location.state?.row.purchase_id,
        Number(location.state?.row.ddl_status),
        (r) => {
          setAddedItems(r);
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

  const onCloseModel = () => {
    setClassicModal(false);
  };

  const onSubmitModel = (event)=>{
    event.preventDefault();
    // console.log("reach delete model ")
    DeleteDirectPurchase(
      location.state?.row.purchase_id,
      user_id,
      (r) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: "Direct Purchase Deleted Successfully",
            msgType: "success",
          },
        });
        // setClassicModal(true);
        // setRefresh(!refresh);
        // onClearState();
        history.push("/admin/procurement/direct-purchase")
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    
  }

  const onClickDelete =()=>{
    setClassicModal(true)
    

   
  }
  const onClickProcedeQuotation = () => {};

  return (
    <ThemeProvider theme={theme}>
      {location.state?.updateTask ? (
        <PageTitle title="Procurement > Direct Purchase > Update To Do" />
      ) : (
        <PageTitle title="Procurement > Direct Purchase > View" />
      )}

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
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
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
                      {addedItems.dplGrnNo}
                    </StyledTableCell>

                    <StyledTableCell align="left" className={classes.enqEmail}>
                      {addedItems.grn_date}
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
                    <StyledTableCell align="right">Disc%</StyledTableCell>
                    <StyledTableCell align="right">Disc Value</StyledTableCell>
                    <StyledTableCell align="right">GST%</StyledTableCell>
                    <StyledTableCell align="right">GST Value</StyledTableCell>
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
                          {row.quantity}
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
                          {currencyFormate(row.rate)}
                        </StyledTableCell>
                        <StyledTableCell
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
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.viewValue}
                        >
                          {currencyFormate(row.net_value)}
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
                      ? currencyFormate(
                          addedItems.item_details.reduce(
                            (sum, li) => Number(sum) + Number(li.net_value),
                            0
                          )
                        )
                      : "00"}
                  </Box>
                </Grid>
              </Grid>
            </Box>
            
          </CustomCard>

          <Grid>          
          <Button 
              onClick={onClickDelete}
              className={classes.actionbtns}
              variant="outlined"
              color="danger"
            >
              Delete
            </Button>
            </Grid>

        </GridItem>
    
      </GridContainer>

      <MasterModel
          classicModal={classicModal}
          onCloseModel={onCloseModel}
          width={450}
          okBtnText="Yes"
          okClosebtn="No"
          height="auto"
          modelName="Are you sure you want to delete ?"
          onClickOk={onSubmitModel}
        >
      
        </MasterModel>
    </ThemeProvider>
  );
};

export default DirectPurchaseView;
