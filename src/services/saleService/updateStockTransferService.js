import webApi from "../webApi/webApi";
import { timestamp } from "../Utils/utils";
import {
  dateFormateField,
  dateFormate,
  currentDate,
} from "../../views/Pages/HelperComponent/utils";

export const getAllStockTransfer = async (onSuccess, onFailure, stock_transfer_id,
  query, from_showroom_warehouse_id, to_showroom_warehouse_id, transfer_date_from, transfer_date_to
) => {
  try {
    // console.log(query);
    const res = await webApi.post("/master/stock_transfer/list", {
      stock_transfer_id: stock_transfer_id,
      query: query,

      from_showroom_warehouse_id: from_showroom_warehouse_id,
      to_showroom_warehouse_id: to_showroom_warehouse_id,

      stock_from_date: transfer_date_from,
      stock_to_date: transfer_date_to,

    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
        allItems.push({
          serial_id: i + 1,
          stk_stock_transfer_id: r.stock_transfer_id,
          stk_transfer_no: r.stock_transfer_no,
          stk_transfer_date: dateFormate(r.stock_transfer_date),
          to_showroom_warehouse_id: r.to_showroom_warehouse_id,
          stk_transfer_from: r.stock_transfer_from_name,
          stk_transfer_to: r.stock_transfer_to_name,
          stk_note: r.note,
          stock_transfer_details: r.stock_transfer_details,
          action_items: r.action_items,
          stk_action: "view-action",
          menu: [
            {
              label: "View",
              link: "/admin/sales/stock-transfer-view",
            },
            {
              label: "Edit",
              link: "/admin/sales/stock-transfer-edit",
              itemEdit: true,
            },
          ],
        });
      });
      return onSuccess(allItems);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

//for searching for stock

export const getSearchStockTransfer = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/master/stock_transfer/list", {

      from_showroom_warehouse_id: q.ddl_showroom_warehouse_id_from?.value,
      to_showroom_warehouse_id: q.ddl_showroom_warehouse_id_to?.value,
      stock_transfer_from_date: timestamp(q.txt_transfer_date_from),
      stock_transfer_to_date: timestamp(q.txt_transfer_date_to),

    });


    if (res.status === 200) {

      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
        allItems.push({
          serial_id: i + 1,
          stk_stock_transfer_id: r.stock_transfer_id,
          stk_transfer_no: r.stock_transfer_no,
          stk_transfer_date: dateFormate(r.stock_transfer_date),
          to_showroom_warehouse_id: r.to_showroom_warehouse_id,
          stk_transfer_from: r.stock_transfer_from_name,
          stk_transfer_to: r.stock_transfer_to_name,
          stk_note: r.note,
          stock_transfer_details: r.stock_transfer_details,
          stk_quantity: r.stock_transfer_details[0]?.quantity,
          action_items: r.action_items,
          stk_action: "view-action",
          menu: [
            {
              label: "View",
              // link: "/admin/procurement/stock-transfer-view",
              clickBtn:true,
            },
            // {
            //   label: "Edit",
            //   link: "/admin/procurement/stock-transfer-edit",
            //   itemEdit: true,
            // },
          ],





          // id: i + 1,
          // item_id: r.item_id,
          // brand: r.brand_name,
          // item_name: r.item,
          // brand_id: r.brand_id,
          // category: r.category_name,
          // category_id: r.category_id,
          // item_own_code: r.item_own_code,
          // mrp: r.mrp,
          // selling_price: r.selling_price,
          // uom: r.uom_name,
          // uom_id: r.uom_id,
          // current_over_stock: r.current_over_stock,
          // stock_by_location: r.stock_by_location,
        });
      });
      // console.log(allItems.length, "hiii")
      if (allItems.length) {
        return onSuccess(allItems);
      } else {
        return onFailure("Stock Transfer not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};



export const postStockTransfer = async (
  info,
  allItems,
  stock_update,
  onSuccess,
  onFailure
) => {
  try {
    // stockupdate across the locations
    stock_update.map(async (a, b) => {
      // console.log(a, "sen0208")

      const res2 = await webApi.post("/master/item/stockupdate",
        {
          item_id: a.item_id,
          stock_by_location: a.stock_by_location
        }
      );
    })
    const res = await webApi.post("/master/stock_transfer/insert", {
      module: "STOCK_TRANSFER",
      from_showroom_warehouse_id: Number(localStorage.getItem("user_location")),
      to_showroom_warehouse_id: info.to_ddl_showroom?.value,
      note: info.txt_note,
      stock_transfer_date: timestamp(info.transfer_date),
      stock_transfer_details: allItems,
    });
    if (res.status === 200) {
      const r = res.data;
      onSuccess(r);
      // r.stock_transfer_details.map((item) => {
      //   const movRes = webApi.post("/master/stock_movement/insert", {
      //     transaction_type: "STF",
      //     transaction_id: r.stock_transfer_id,
      //     transaction_date: timestamp(currentDate()),
      //     showroom_warehouse_id: r.to_showroom_warehouse_id,
      //     item_id: item.item_id,
      //     plus_qty: item.quantity,
      //     minus_qty: 0,
      //     unit_id: item.uom_id,
      //   });
      // });
      // r.stock_transfer_details.map((item) => {
      //   const movRes = webApi.post("/master/stock_movement/insert", {
      //     transaction_type: "STF",
      //     transaction_id: r.stock_transfer_id,
      //     transaction_date: timestamp(currentDate()),
      //     showroom_warehouse_id: r.from_showroom_warehouse_id,
      //     item_id: item.item_id,
      //     minus_qty: item.quantity,
      //     plus_qty: 0,
      //     unit_id: item.uom_id,
      //   });
      // });
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const updatetStockTransfer = async (
  info,
  allItems,
  stock_update,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/stock_transfer/update", {
      stock_transfer_id: info.stock_transfer_id,
      from_showroom_warehouse_id: Number(localStorage.getItem("user_location")),
      to_showroom_warehouse_id: info.to_ddl_showroom?.value,
      note: info.txt_note,
      stock_transfer_date: timestamp(info.transfer_date),
      stock_transfer_details: allItems,
    });
   
    if (res.status === 200) {
      const r = res.data;
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};






// export const postStockMovement = async (
//   info,
//   allItems,
//   onSuccess,
//   onFailure
// ) => {
//   try {
//     const res = await webApi.post("/master/stock_movement/insert", {
//       stock_transfer_id: info.stock_transfer_id,
//       from_showroom_warehouse_id: Number(localStorage.getItem("user_location")),
//       to_showroom_warehouse_id: info.to_ddl_showroom?.value,
//       note: info.txt_note,
//       stock_transfer_date: timestamp(info.transfer_date),
//       stock_transfer_details: allItems,
//     });
//     if (res.status === 200) {
//       const r = res.data;
//       onSuccess(r);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };
