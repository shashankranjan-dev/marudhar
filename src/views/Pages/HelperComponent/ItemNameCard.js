import React from "react";
import { Box, Grid } from "@material-ui/core";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { getItemDetailById } from "../../../services/saleService/addEnqueryService";
import { currencyFormate } from "./utils";
const ItemNameCard = ({ item_id }) => {
  const [globalState, dispatch] = useStateValue();

  const [item, setItem] = React.useState({});

  React.useEffect(() => {

    getItemDetailById(
      item_id,
      (r) => {
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
        setItem(null);
      }
    );
  }, [item_id]);
  
  if (item === null) {
    return <div>Item Not Found</div>;
  } else {
    return (
      <Box>
        <Grid container spacing={1}>
          {/* {item.brand ? (
            <Grid item>
              <Box fontWeight={500}>{item.brand}</Box>
            </Grid>
          ) : (
            "--"
          )} */}
{/* 
          <Grid item>
            <Box fontWeight={500}>-</Box>
          </Grid> */}
          {/* {item.category ? (
            <Grid item>
              <Box fontWeight={500}>{item.category}</Box>
            </Grid>
          ) : (
            "--"
          )} */}
        </Grid>
        <Grid container spacing={1}>
          {/* {item.item_own_code ? (
            <Grid item>
              <Box fontWeight={400}>{`[${item.item_own_code}]`}</Box>
            </Grid>
          ) : (
            "--"
          )}

          <Grid item>
            <Box fontWeight={400}>-</Box>
          </Grid> */}
          {item.itemName ? (
            <Grid item>
              <Box fontWeight={400}>{item.itemName}</Box>
            </Grid>
          ) : (
            "--"
          )}
        </Grid>
        {/* {console.log(item,"from item view card")} */}
        {/* <Grid container spacing={1}>
          <Grid item>
            <Box>Size : {item.size ? item.size : "--"}</Box>
          </Grid>
        </Grid> */}

        <Grid container spacing={1}>
          <Grid item>
            <Box>
              {/* Stock : {item.stock ? item.stock + " " + item.uom_name : "--"} */}
            </Box>
          </Grid>

          <Grid item>
            <Box fontWeight={400}></Box>
          </Grid>
          <Grid item>
            <Box>MRP : {item.mrp ? `${currencyFormate(item.mrp)} ` : "--"}</Box>
          </Grid>
         
       
          {/* <Grid item>
          {
              item.stock_by_location && 
              item.stock_by_location.map(order => (
                <Box>STOCK : {order.quantity}</Box>
                ))
            }
            
          </Grid> */}
        </Grid>
      </Box>
    );
  }
};

export default ItemNameCard;
