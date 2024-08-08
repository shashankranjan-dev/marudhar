import React from "react";
import { Box, Grid } from "@material-ui/core";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import {getShowroomDetailByIdForStock,
  getShowroomDetailByIdForStock2,
  getItemDetailById,
  getShowroomDetailById,
} from "../../../services/saleService/addEnqueryService";
import { currencyFormate } from "./utils";
import { StyledTableCell, StyledTableRow } from "../Sales/AddEnquiryPage";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

const StockViewCard = ({ item_id, showroom_warehouse_id }) => {
  const [globalState, dispatch] = useStateValue();

  const [item, setItem] = React.useState({});
  const [itemRemain, setItemRemain] = React.useState({});
  React.useEffect(() => {
    // getItemDetailById(
    //   item_id,
    //   (r) => {
    //     if (r.length) {
    //       setItem(r[0]);
    //     } else {
    //       setItem(null);
    //     }
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //     setItem(null);
    //   }
    // );

    /////////////////////////OLD////////////////////////

    // getShowroomDetailByIdForStock(
    //   // getItemDetailById(
    //   item_id,
    //   showroom_warehouse_id,
    //   (r) => {
    //     console.log(r," R check from card")
    //     console.log(
    //       "in StockViewCard, dispatching event, r[0] is:\n" +
    //         JSON.stringify(r, null, 2)
    //     );
    //     dispatch({
    //       type: actionTypes.UPDATE_ITEM_ID_WISE_STOCK,
    //       payload: {
    //         item_id,
    //         showroom_warehouse_id,
    //         stock: r[0].quantity,
    //       },
    //     });
    //     if (r.length) {
    //       setItem(r[0]);
    //     } else {
    //       setItem(null);
    //     }
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //     setItemRemain(null);
    //   }
    // );
    
    ///////////////NEW///////////////////////
    getShowroomDetailByIdForStock2(
      // getItemDetailById(
      item_id,
      showroom_warehouse_id,
      (r) => {
        // console.log(r," R check from card")
        // console.log(
        //   "in StockViewCard, dispatching event, r[0] is:\n" +
        //     JSON.stringify(r, null, 2)
        // );
        dispatch({
          type: actionTypes.UPDATE_ITEM_ID_WISE_STOCK,
          payload: {
            item_id,
            showroom_warehouse_id,
            stock: r[0].quantity,
          },
        });
        if (r.length) {
          setItem(r[0]);
        } else {
          setItem(null);
        }
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
        setItemRemain(null);
      }
    );

  }, [item_id,showroom_warehouse_id]);
  if (item === null) {
    return <StyledTableCell align="center">0</StyledTableCell>;
  } else {
    return (
      <>
      {/* {console.log(itemRemain.stoClosing,"itemRemain")} */}
      {/* &nbsp;
      {console.log(item,"item from stock ")}
        {item.stock_by_location &&
          item.stock_by_location.map((order) => (
            console.log(order,"from stockview"),
            <StyledTableCell align="right"> {order.quantity} </StyledTableCell>
          ))} */}
          
       <StyledTableCell align="center"> 
       <input type="hidden" name={`qty_${showroom_warehouse_id}_${item_id}`} value={item.quantity} />
          {item.quantity ? item.quantity : 0 }
       </StyledTableCell>
      </>
    );
  }
};

export default StockViewCard;
