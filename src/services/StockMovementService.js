import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import {
  dateFormateField,
  dateFormate,
} from "../views/Pages/HelperComponent/utils";

export const getAllStockMovement = async ( onSuccess,onFailure,query) => {
  try {
    const res = await webApi.post("/master/stock_movement/list", {
      showroom_warehouse_id: query?.ddl_showroom_warehouse?.value,
      query: query?.txt_item,
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
        allItems.push({
          serial_id: i + 1,
          stk_movement_date: dateFormate(r.transaction_date),
          showroom_warehouse_from: r.showroom_warehouse,
          showroom_warehouse_to: r.showroom_warehouse,
          item_id: r.item_id,
          stk_in: r.plus_qty || 0,
          opning_stk:"--",
          stk_out: r.minus_qty || 0,
          closing_stk:"--",
          action_items: r.action_items,
          stk_action: "view-action",
          menu: [
            {
              label: "View",
              link: "",
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
