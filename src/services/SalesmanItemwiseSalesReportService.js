
import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import {
  currencyFormate
} from "../views/Pages/HelperComponent/utils";
export const getAllItemwiseSalesReport = async (onSuccess, onFailure, addSearch) => {
  try {
    //console.log(addSearch.txt_discount_to, addSearch.txt_discount_from, "addSearch.txt_discount_to")
    const res = await webApi.post("/reports/salesman/list", {
      user_id: addSearch.ddl_salesman_id.value,
      txt_to_date: timestamp(addSearch.txt_to_date),
      txt_from_date: timestamp(addSearch.txt_from_date),

      txt_discount_from: addSearch.txt_discount_from,
      txt_discount_to: addSearch.txt_discount_to

    });
    //console.log(addSearch, "HK")
    if (res.status === 200) {


      const r = res.data;
      //console.log(r, "rrr")
      let allItems = [];
      let pdf = [];
      let combineCharges = [];
      r.map((r, i) => {
        //console.log(r, "sank23")

        combineCharges = r.OtherCharges.reduce((s, l) => s.concat(l))
        //console.log(combineCharges, "sen11")

        allItems.push({
          id: i + 1,

          // category: r.category_name,
          category: r._id,
          child_category: r.child_category,
          quantity: r.sumDispatchQty,
          uom_name: r.uom_name,
          net_value: r.sumNetValue,
          //   net_value:
          //   currencyFormate(
          //     combineCharges? 
          //     r.sumNetValue +
          //         combineCharges.reduce((p1, v1) =>
          //             v1.charge_type === "+" ? 
          //               p1 + Number(v1.charge_amount) 
          //                 : 
          //               p1 - Number(v1.charge_amount) 

          //             ,0)
          //             :
          //             r.sumNetValue
          //  ),
          // other_charges:r.sumOtherCharges,
          // sales_value: r.sales_order_item_details.reduce(
          //   (sum, li) => 
          //   Number(sum) + Number(li.net_value),0) + r.sales_order_other_charges.reduce(
          //     (sum, li)=> li.charge_type === "+" ? sum + Number(li.charge_amount): sum - Number(li.charge_amount),0
          //   ),
          // invoice_other_charges:r.invoice_other_charges

        });
        pdf.push([
          i + 1,
          r._id ? r._id : r.child_category,
          Number(r.sumDispatchQty).toFixed(2),
          r.uom_name,
          r.sumNetValue,

        ])
      });
      if (allItems.length) {

        return onSuccess(allItems, pdf);
      } else {
        return onFailure("Data not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const salesmanChartReport = async (addSearch, onSuccess, onFailure) => {
  try {
    const res = await webApi.post('/reports/viewSalesmanChart/list', {
      txt_to_date: timestamp(addSearch.txt_to_date),
      txt_from_date: timestamp(addSearch.txt_from_date) + 86399,
    })

    if (res.status === 200) {
      const r = res.data

      let value = []
      let names = []
      r.map((r) => {
        value.push(r.sumNetValue),
          names.push(r.name)
      })
      //console.log(names,value,"sen25012023")
      onSuccess(names, value)

    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);

  }
}
