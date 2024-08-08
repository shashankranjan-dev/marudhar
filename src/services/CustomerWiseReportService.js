
import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import { currencyFormate 
} from "../views/Pages/HelperComponent/utils";
export const getAllCustomerCondensed = async (onSuccess, onFailure,addSearch ) => {
    try {
      //console.log(addSearch.txt_discount_to,addSearch.txt_discount_from,"addSearch.txt_discount_to")
      const res = await webApi.post("/reports/CustomerCondensed/list", {
        user_id:addSearch.ddl_salesman_id.value,
        txt_to_date:timestamp(addSearch.txt_to_date),
        txt_from_date:timestamp(addSearch.txt_from_date),

        txt_discount_from:addSearch.txt_discount_from,
        txt_discount_to:addSearch.txt_discount_to

      });
      //console.log(addSearch,"HK")
      if (res.status === 200) {

       
        const r = res.data;
        //console.log(r,"rrr")
        let allItems = [];
        let pdf = [];

        r.map((r, i) => {
          //console.log(r.OtherCharges,"sank23")
      
          allItems.push({
            id: i + 1,
          
            // category: r.category_name,
            customer_name: r._id.customer,
            category:r._id.category_name,
            quantity:r.sumDispatchQty,
            child_category:r.child_category,
            uom_name: r.uom_name,
            net_value:r.sumNetValue,

//UPDate
          // net_value:
          // r.OtherCharges.length > 0
          //   ? Number(r.sumNetValue) +
          //     r.OtherCharges.reduce(
          //       (s, l) =>
          //         l.charge_type === "+"
          //           ? s + Number(l.charge_amount)
          //           : s - Number(l.charge_amount),
          //       0
          //     )
          //   : Number(r.sumNetValue),


                        
             });
             pdf.push ([
              i + 1,
              r._id.customer,
              Number(r.sumNetValue).toFixed(2)
             ])
          });
        if (allItems.length) {
      
          return onSuccess(allItems,pdf);
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


  export const getAllCustomerDetail = async (onSuccess, onFailure,addSearch ) => {
    try {
      //console.log(addSearch.txt_discount_to,addSearch.txt_discount_from,"addSearch.txt_discount_to")
      const res = await webApi.post("/reports/CustomerDetail/list", {
        user_id:addSearch.ddl_salesman_id.value,
        txt_to_date:timestamp(addSearch.txt_to_date),
        txt_from_date:timestamp(addSearch.txt_from_date),

        txt_discount_from:addSearch.txt_discount_from,
        txt_discount_to:addSearch.txt_discount_to

      });
      //console.log(addSearch,"HK")
      if (res.status === 200) {

       
        const r = res.data;
        //console.log(r,"rrr")
        let allItems = [];
        let pdf = [];

        r.map((r, i) => {
          //console.log(r._id.customer[0],"sank231")
      
          allItems.push({
            id: i + 1,
          
            // category: r.category_name,
            customer_name: r._id.customer[0],
            category:r._id.category_name,
            quantity:r.sumDispatchQty,
            child_category:r.child_category,
            uom_name: r.uom_name,
            net_value:r.sumNetValue,
            // net_value:
            // r.OtherCharges.length > 0
            //   ? Number(r.sumNetValue) +
            //     r.OtherCharges.reduce(
            //       (s, l) =>
            //         l.charge_type === "+"
            //           ? s + Number(l.charge_amount)
            //           : s - Number(l.charge_amount),
            //       0
            //     )
            //   : Number(r.sumNetValue),
            
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
            r._id.customer[0],
            r._id.category_name ? r._id.category_name : r.child_category,
            Number(r.sumDispatchQty),
            r.uom_name,
            Number(r.sumNetValue)

          ])
        });
        if (allItems.length) {
      
          return onSuccess(allItems,pdf);
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


