import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable, { ActiveIcon, DeActiveIcon } from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import { getListStatus } from "../../../services/addStatusService";
import { getEnquiryBySalesId } from "../../../services/saleService/addEnqueryService";

import { Input, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";

import theme from "../../../theme/theme";

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
import { StyledTableCell, StyledTableRow } from "./AddEnquiryPage";

import { Typography, Grid, Box } from "@material-ui/core";
import { currentDate } from "../HelperComponent/utils";

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
    width: "30%",
  },
}));

const EnquiryListView = () => {
  const classes = useStyles();
  const history = useHistory();
  const [globalState, dispatch] = useStateValue();
  const location = useLocation();
  const [allStatus, setAllStatus] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  
  React.useEffect(() => {
    getListStatus(
      "Sales",
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

      // console.log(location.state?.row.enqCustomer,"abc")

      getEnquiryBySalesId(
        location.state?.row.sales_id,
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
    else{
    //  history.push('/admin/enquiry-list-view')

      getEnquiryBySalesId(
        location.state?.sales_id,
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

  const onClickProcedeQuotation = () => {
    history.push({
      pathname: "/admin/sales/add-new-quatation",
      state: {
        row: { sales_id: location.state?.row.sales_id },
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {location.state?.updateTask ? (
        <PageTitle title="Sales > Enquiry > Update To Do" />
      ) : (
        <PageTitle title="Sales > Enquiry > View" />
      )}

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Enquiry">
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Enquiry Date</StyledTableCell>
                    <StyledTableCell align="left">Enquiry No</StyledTableCell>
                    <StyledTableCell align="left">Customer</StyledTableCell>
                    <StyledTableCell align="left">Sales Executive</StyledTableCell>
                    <StyledTableCell align="left">Showroom / warehouse</StyledTableCell>
                    {/* <StyledTableCell align="left">Source</StyledTableCell> */}
                    <StyledTableCell align="center">Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="left" className={classes.endate}>
                      {addedItems.enqDate}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.engNo}>
                      {addedItems?.enqNo}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.enCustomerName}
                    >
                      {addedItems.enqCustomer}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.enqCustomer}
                    >
                      {addedItems.enqSalesExecutive}
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.enqEmail}>
                      {addedItems.enqShowroom}
                    </StyledTableCell>
                    {/* <StyledTableCell align="left" className={classes.enqEmail}>
                      {addedItems.enqSource}
                    </StyledTableCell> */}
                    <StyledTableCell
                      align="center"
                      className={classes.enqStatus}
                    >
                      <div
                        style={{
                          color: allStatus.find(
                            (s, i) => s.value === Number(addedItems.status)
                          )?.status_color,
                        }}
                      >
                        {
                          allStatus.find(
                            (s, i) => s.value === Number(addedItems.status)
                          )?.label
                        }
                      </div>
                    </StyledTableCell>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addedItems?.item_details &&
                    addedItems.item_details.map((row, i) => (
                      <StyledTableRow key={i}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="left"
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
                          className={classes.itemDetails}
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
                          align="right"
                          className={classes.quantity}
                        >
                          {row.uom_name}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        </GridItem>


        <UpdateTaskAndStatus
          statusFor="Sales-Enquiry"
          customer_name= {location.state?.row?.enqCustomer}
          setRefresh={setRefresh}
          refresh={refresh}
          id={addedItems.enqNo}
          // status_id={addedItems.status}
          module="Enquiry"
          location={location}
          procedeTo="Quotation"
          onProcedeToNext={onClickProcedeQuotation}
        />
      </GridContainer>
    </ThemeProvider>
  );
};

export default EnquiryListView;
