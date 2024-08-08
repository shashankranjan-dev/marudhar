import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import { currencyFormate, dateFormate } from "../views/Pages/HelperComponent/utils";

export const getSalesOrderReport = async (addSearch,onSuccess, onFailure, ) => {
  //console.log(addSearch, "sanAmountadd");
  try {
    const res = await webApi.post("/master/pendingOrder/list", {
      txt_to_date: timestamp(addSearch.txt_to_date),
      txt_from_date: timestamp(addSearch.txt_from_date),
      sales_order_no: addSearch?.txt_sales_order_no,
      item_id: addSearch?.ddl_item.value,
    });
    if (res.status === 200) {
      const r = res.data;
      //console.log(r, "sanAmount");
      let sales_order = [];
      let pdf = [];

      r.map((r, i) => {
        //console.log(r.rate.reduce((sum, k) => sum = Number(sum) + Number(k),0), "sanAmount1");
        let amountTotal = (r.rate.reduce((sum, k) => sum = Number(sum) + Number(k),0)) * ( r.quantity.reduce((sum, k) => sum = Number(sum) + Number(k),0))
        sales_order.push({
          id: i + 1,
          sales_order_no: r.sales_order_no,
          sales_order_date: dateFormate(r.sales_order_date),
          item_id: r.item_id,
          item_name: r.item_name,
          rate: (r.rate.reduce((sum, k) => sum = Number(sum) + Number(k),0)).toFixed(2),
          quantity: r.quantity.reduce((sum, k) => sum = Number(sum) + Number(k),0),
          amount: (amountTotal).toFixed(2),
          status_name: r.status_name
        });
        pdf.push([
          i + 1,
          r.sales_order_date,
          r.sales_order_no,
          r.status_name,
          r.item_name,
          r.quantity,
          r.rate,
          (r.rate * r.quantity).toFixed(2),
        ])
      });
      return onSuccess(sales_order, pdf);

    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};




export const getAllItemById = async (onSuccess, onFailure, menu = true) => {
  try {
    const res = await webApi.post("/master/item/dropDown/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
        allItems.push({
          value: r.item_id,
          label: r.item,

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