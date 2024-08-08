import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
// import MuiTable from "../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Checkbox, IconButton, OutlinedInput } from "@material-ui/core";
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

import { Typography, Paper } from "@material-ui/core";
import { currencyFormate } from "./utils";
import { QuantityView } from "../Sales/AddEnquiryPage";
import ItemImg from "./ItemImg";
import { StyledTableCell, StyledTableRow } from "../Sales/AddEnquiryPage";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },

  activeText: {
    ...activeText,
  },
  itemImgPaper: {
    width: "80px",
    height: "80px",
    overflow: "hidden",
  },

  id: { width: "0%" },
  itemImg: { width: "8%" },
  itemDetails: { width: "45%" },
  quantity: { width: "10%" },
  disPatchquantity: { width: "15%" },
  NowdisPatch: { width: "10%" },
});

function Row(props) {
  const { row, key, id, onChange, state, checked, onClick } = props;
  const classes = useRowStyles();
  // console.log(checked, "sen2006")

  return (
    <React.Fragment>
      <>
        <StyledTableRow key={id} >
          <StyledTableCell component="th" scope="row" className={classes.id}>
            <StyledTableCell>{id} </StyledTableCell>
            <StyledTableCell>
              <Checkbox
                // defaultChecked
                checked={!checked[`chk_box${row.item_id}`]}
                // checked={checked[row.item_id]}
                name={`chk_box${row.item_id}`}
                onClick={(e) => onClick(e, row)}
                inputProps={{ 'aria-label': 'controlled' }}
                classes
              />
            </StyledTableCell>


          </StyledTableCell>

          <StyledTableCell align="left" className={classes.itemImg}>
            <Paper className={classes.itemImgPaper}>
              <ItemImg item_id={row.item_id} />
            </Paper>
          </StyledTableCell>
          <StyledTableCell align="left" className={classes.itemDetails}>
            <ItemViewCard item_id={row.item_id} />
          </StyledTableCell>

          <StyledTableCell align="right" className={classes.quantity}>
            {row[`${localStorage.getItem("user_location")}_${row.item_id}`]}
          </StyledTableCell>
          <StyledTableCell align="left" className={classes.quantity}>
            {row.uom_name}
          </StyledTableCell>
          <StyledTableCell align="right" className={classes.disPatchquantity}>
            <TextField
              size="small"
              placeholder="Qty Dispatch"
              name={`txt_dispatch_qty_${row.item_id}`}
              style={{ marginBottom: -15, width: "120px" }}
              type="number"
              inputProps={{
                style: { textAlign: "right" },
              }}
              // onChange={onChange}
              id="outlined-basic"
              fullWidth={true}
              value={state[`txt_dispatch_qty_${row.item_id}`]}
              variant="outlined"
              disabled={checked[`chk_box${row.item_id}`] ? true : false}
            />
            {/* {console.log(checked[`chk_box${row.item_id}`], "sen2006/chkbx")} */}


          </StyledTableCell>
          <StyledTableCell align="right" className={classes.NowdisPatch}>
            <TextField
              size="small"
              placeholder="Now Dispatch"
              name={`txt_now_dispatch_qty_${row.item_id}`}
              style={{ marginBottom: -15 }}
              type="number"
              inputProps={{
                style: { textAlign: "right" },
              }}
              onChange={(e) => onChange(e, row[`${localStorage.getItem("user_location")}_${row.item_id}`])}
              id="outlined-basic"
              fullWidth={true}
              value={state[`txt_now_dispatch_qty_${row.item_id}`]}
              variant="outlined"
              disabled={checked[`chk_box${row.item_id}`]}

            />
          </StyledTableCell>
        </StyledTableRow>
      </>
    </React.Fragment>
  );
}

export default function CollapsibleTable({
  rows,
  onChange = { onChange },
  onCheckAll = { onCheckAll },
  onClick = { onClick },
  state = { state },
  checked = { checked }
}) {

  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell /> */}
            <StyledTableCell>
              #
              {/* <StyledTableCell># </StyledTableCell> */}
              <Checkbox
                size="small"
                //onChange={onChange}
                onClick={onCheckAll}
                name="check"
              />
            </StyledTableCell>

            <StyledTableCell align="left">Image</StyledTableCell>
            <StyledTableCell align="left">Item Details</StyledTableCell>
            <StyledTableCell align="right">DO Qty</StyledTableCell>
            <StyledTableCell align="left">Unit</StyledTableCell>
            <StyledTableCell align="right">Dispatched Quantity</StyledTableCell>
            <StyledTableCell align="right">Now Dispatch</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <Row
              key={i + 1}
              id={i + 1}
              row={row}
              onChange={onChange}
              state={state}
              checked={checked}
              onClick={onClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
//////////////////old////////////////22062022/////////
// const useRowStyles = makeStyles({
//   root: {
//     "& > *": {
//       borderBottom: "unset",
//     },
//   },

//   activeText: {
//     ...activeText,
//   },
//   itemImgPaper: {
//     width: "80px",
//     height: "80px",
//     overflow: "hidden",
//   },

//   id: { width: "0%" },
//   itemImg: { width: "8%" },
//   itemDetails: { width: "45%" },
//   quantity: { width: "10%" },
//   disPatchquantity: { width: "15%" },
//   NowdisPatch: { width: "10%" },
// });

// function Row(props) {
//   const { row, key, id, onChange, state } = props;
//   const classes = useRowStyles();

//   return (
//     <React.Fragment>
//       <>
//         <StyledTableRow key={id}>
//           <StyledTableCell component="th" scope="row" className={classes.id}>
//             {id}
//           </StyledTableCell>

//           <StyledTableCell align="left" className={classes.itemImg}>
//             <Paper className={classes.itemImgPaper}>
//               <ItemImg item_id={row.item_id} />
//             </Paper>
//           </StyledTableCell>
//           <StyledTableCell align="left" className={classes.itemDetails}>
//             <ItemViewCard item_id={row.item_id} />
//           </StyledTableCell>

//           <StyledTableCell align="right" className={classes.quantity}>
//             { row[`${localStorage.getItem("user_location")}_${row.item_id}`]}
//           </StyledTableCell>
//           <StyledTableCell align="left" className={classes.quantity}>
//             {row.uom_name}
//           </StyledTableCell>
//           <StyledTableCell align="right" className={classes.disPatchquantity}>
//             <TextField
//               size="small"
//               placeholder="Qty Dispatch"
//               name={`txt_dispatch_qty_${row.item_id}`}
//               style={{ marginBottom: -15, width: "120px" }}
//               type="number"
//               inputProps={{
//                 style: { textAlign: "right" },
//               }}
//               // onChange={onChange}
//               id="outlined-basic"
//               fullWidth={true}
//               value={state[`txt_dispatch_qty_${row.item_id}`]}
//               variant="outlined"
//             />
//           </StyledTableCell>
//           <StyledTableCell align="right" className={classes.NowdisPatch}>
//             <TextField
//               size="small"
//               placeholder="Now Dispatch"
//               name={`txt_now_dispatch_qty_${row.item_id}`}
//               style={{ marginBottom: -15 }}
//               type="number"
//               inputProps={{
//                 style: { textAlign: "right" },
//               }}
//               onChange={(e) => onChange(e, row[`${localStorage.getItem("user_location")}_${row.item_id}`])}
//               id="outlined-basic"
//               fullWidth={true}
//               value={state[`txt_now_dispatch_qty_${row.item_id}`]}
//               variant="outlined"
//             />
//           </StyledTableCell>
//         </StyledTableRow>
//       </>
//     </React.Fragment>
//   );
// }

// export default function CollapsibleTable({
//   rows,
//   onChange = { onChange },
//   state = { state },
// }) {
//   return (
//     <TableContainer>
//       <Table aria-label="collapsible table">
//         <TableHead>
//           <TableRow>
//             {/* <TableCell /> */}
//             <StyledTableCell>#</StyledTableCell>
//             <StyledTableCell align="left">Image</StyledTableCell>
//             <StyledTableCell align="left">Item Details</StyledTableCell>
//             <StyledTableCell align="right">DO Qty</StyledTableCell>
//             <StyledTableCell align="left">Unit</StyledTableCell>
//             <StyledTableCell align="right">Dispatched Quantity</StyledTableCell>
//             <StyledTableCell align="right">Now Dispatch</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row, i) => (
//             <Row
//               key={i + 1}
//               id={i + 1}
//               row={row}
//               onChange={onChange}
//               state={state}
//             />
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
