import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
// import MuiTable from "../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";

import { getShoormLocationByItemId } from "../../../services/createDeliveryOrderService";
import { getListShowroomWarehouse } from "../../../services/showroomWarehouseService";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Grid, Box } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";

import React from "react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";
import ItemViewCard from "../HelperComponent/ItemViewCard";
import StockViewCard from "../HelperComponent/StockViewCard";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { ColoseButton } from "../Components/CustomButton";

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
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { Typography } from "@material-ui/core";
import { currencyFormate } from "./utils";
import { QuantityView } from "../Sales/AddEnquiryPage";
import { StyledTableCell, StyledTableRow } from "../Sales/AddEnquiryPage";

const InnerTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: appSecondColor,
    fontWeight: appFontWeight,
    padding: "5px 5px",
    fontFamily: appDefaultFamily,
    fontSize: "13px",
  },
  body: {
    root: {},
    "&:not(:last-child)": {
      borderBottom: "1px solid rgba(224, 224, 224, 1)",
    },
    color: appSecondColor,
    padding: "5px 5px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
  },
}))(TableCell);

const InnerTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
  },
}))(TableRow);

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
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

  activeText: {
    ...activeText,
  },
  actionbtns: {
    marginTop: 20,
    float: "right",
  },

  id: { width: "0%" },
  itemDetails: { width: "18%" },
  quantity: { width: "8%", textAlign: "center" },
  quantity_unit: { width: "3%" },
  dis_quantity: { width: "5%" },

  showroom_field: { width: "8%" }, // 4*10=40
  net_value_field: { width: "8%" },

  collapseIcon: { width: "2%" },
  net_value: { width: "8%" },
});

function Row(props) {
  const { row, id, allShooroom, allShowroomStock, onChange, state, delivery_order_item_details, dispatch_order_item_details } = props;
  const [globalState, dispatch] = useStateValue();
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const ind_do_details =  delivery_order_item_details.filter((o) => o.item_id == row.item_id );
  const ind_disp_details =  dispatch_order_item_details?.filter((o) => o.item_id == row.item_id );
  //console.log("ind_do", ind_do_details);
  const total_do = ind_do_details.length > 0? ind_do_details.reduce((prV, nxtV) => prV + nxtV.delivered_qty, 0) : 0;
  const total_disp = ind_disp_details?.length > 0? ind_disp_details.reduce((prV, nxtV) => prV + Number(nxtV.now_dispatch_qty), 0) : 0;
  
  return (
    <React.Fragment>
      <>
        <StyledTableRow key={row.item_id}>
          <StyledTableCell component="th" scope="row" className={classes.id}>
            {id}
          </StyledTableCell>
          <StyledTableCell className={classes.collapseIcon}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </StyledTableCell>


          <StyledTableCell align="left" className={classes.itemDetails}>
            <ItemViewCard item_id={row.item_id} />
          </StyledTableCell>

          <StyledTableCell align="left" className={classes.quantity_unit}>
            {row.uom_name}
          </StyledTableCell>

          <StyledTableCell align="right" className={classes.quantity}>
            {row.quantity}
          </StyledTableCell>

          {/* <StyledTableCell align="right" className={classes.quantity}>
            total_do
          </StyledTableCell> */}

          <StyledTableCell align="left" className={classes.quantity}>
            
            {/* {ind_do_details.length > 0? ind_do_details[0].delivered_qty : 0} */}
            {/* {delivery_order_item_details.reduce((prV, nxtV) => prV + nxtV.delivered_qty, 0)} */}
            { total_disp }
          </StyledTableCell>

          {allShooroom.map((s, i) => {
              //console.log("sh_id", allShowroomStock);
              return (
                <StyledTableCell
                  key={i}
                  align="center"
                  className={classes.showroom_field}
                >
                  <TextField
                    size="small"
                    name={`${s.value}_${row.item_id}`}
                    style={{ marginBottom: -15 }}
                    placeholder="Qty"
                    type="number"
                    onChange={(e) => onChange(e, row, total_disp)}
                    inputProps={{ style: { textAlign: "right" } }}
                    id="outlined-basic"
                    fullWidth={true}
                    //value={Number(state.length > 0 ? state[0][`${s.showroom_warehouse_id}_${row.item_id}`] : 0 ).toString()}
                    value={Number(state[`${s.value}_${row.item_id}`])}
                    variant="outlined"
                  />
                  {/* <div>{`${s.quantity}`}</div> */}
                  {/* <StockViewCard item_id={row.item_id}/> */}

                  <StockViewCard item_id={row.item_id} showroom_warehouse_id={s.value} />
                </StyledTableCell>
              );
            })}
          {/* <StyledTableCell align="right" className={classes.net_value}>
            {currencyFormate(row.net_value)}
          </StyledTableCell> */}
        </StyledTableRow>


        
      </>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ rows, onChange, state , delivery_order_item_details, dispatch_order_item_details }) {
  const [allShooroom, setAllShoowroom] = React.useState([]);
  const [allShowroomStock, setAllShowroomStock] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const classes = useRowStyles();

  React.useEffect(() => {
    getListShowroomWarehouse(
      (r) => {
        //console.log("Alll showrooms", r);
        setAllShoowroom(r);
      },
      (err) => {
        dispatch({

          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    let allItemShowroomLoc = [];

    rows.map((rw) => {
      getShoormLocationByItemId(
        rw.item_id,
        (r) => {
          //console.log("All shrl", r);
          setAllShowroomStock((prv) => [ ...prv, {
            current_over_stock: r[0].current_over_stock,
            stock_by_location: r[0].stock_by_location,
          }]);
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );

    });

    //console.log("AS3", rows[0].item_id);
    // setAllShowroomStock(allItemShowroomLoc);

    // getShoormLocationByItemId(
    //   rows[0].item_id,
    //   (r) => {
    //     //console.log("All shrl", r);
    //     setAllShowroomStock(r[0]);
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );
  }, []);
  ////console.log(do_qty)
  //console.log("do_qty");
  //console.log("LD", allShowroomStock);

  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell /> */}
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
            <StyledTableCell align="left" className={classes.itemDetails}>
              Item Details
            </StyledTableCell>
            <StyledTableCell align="left" className={classes.quantity_unit}>
              Unit
            </StyledTableCell>
            <StyledTableCell align="right" className={classes.quantity}>
              SO Qty
            </StyledTableCell>
            {/* <StyledTableCell align="right" className={classes.quantity}>
              Del. Order Qty
            </StyledTableCell> */}
            <StyledTableCell align="left" className={classes.dis_quantity}>
              DO Qty
            </StyledTableCell>
            

            {allShooroom.map((s, i) => {

                return (
                  <StyledTableCell
                    align="center"
                    key={i}
                    className={classes.showroom_field}
                  >
                  <Grid container justifyContent="center">
                    <Grid item xs={12}>
                      {s.label}
                    </Grid>

                    <Grid item xs={12}></Grid>
                  </Grid>
                  </StyledTableCell>
                );
              })}

            {/* <StyledTableCell align="right" className={classes.net_value}>
              Net Value
            </StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <Row
              key={i}
              id={i + 1}
              row={row}
              allShooroom={allShooroom}
              allShowroomStock={allShowroomStock}
              onChange={onChange}
              state={state}
              delivery_order_item_details={delivery_order_item_details}
              dispatch_order_item_details={dispatch_order_item_details}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
