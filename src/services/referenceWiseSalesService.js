
import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import { currencyFormate 
} from "../views/Pages/HelperComponent/utils";
export const getAllReferenceCondensed = async (onSuccess, onFailure,addSearch ) => {
    try {
      //console.log(addSearch.ddl_reference_id.value,"ddl_reference_id")
      const res = await webApi.post("/reports/ReferenceCondensed/list", {
        ddl_reference_id:addSearch.ddl_reference_id.value,
        txt_to_date:timestamp(addSearch.txt_to_date),
        txt_from_date:timestamp(addSearch.txt_from_date),

        txt_discount_from:parseFloat(addSearch.txt_discount_from),
        txt_discount_to:parseFloat(addSearch.txt_discount_to)

      });
     // //console.log(addSearch,"HK")
      if (res.status === 200) {

       
        const r = res.data;
       // //console.log(r,"rrr")
        let allItems = [];
        let pdf = [];
        r.map((r, i) => {
      //    //console.log(r,"sank23")
      
          allItems.push({
            id: i + 1,
          
            // category: r.category_name,
            customer_name: r._id,
            category:r._id.category_name,
            quantity:r.sumDispatchQty,
            child_category:r.child_category,
            uom_name: r.uom_name,
            net:r.net_value,
            otherCharges:r.otherCharges,
            net_value:currencyFormate(r.sumNetValue + (r.OtherCharges? 
              r.OtherCharges.reduce((p1, v1) => 

              v1.length ?
                v1[0].charge_type === "+" ? 
                p1 + Number(v1[0].charge_amount) : p1 - Number(v1[0].charge_amount) : 0,0) 
            : 0)),
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
            r._id,
            r.net_value,

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


  export const getAllReferenceDetail = async (onSuccess, onFailure,addSearch ) => {
    try {
      //console.log(addSearch.txt_discount_to,addSearch.txt_discount_from,"addSearch.txt_discount_to")
      const res = await webApi.post("/reports/ReferenceDetail/list", {
        ddl_reference_id:addSearch.ddl_reference_id.value,
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
          //console.log(r,"sank23")
      
          allItems.push({
            id: i + 1,
          
            // category: r.category_name,
            customer_name: r._id.customer,
            category:r._id.category_name,
            quantity:r.sumDispatchQty,
            child_category:r.child_category,
            uom_name: r.uom_name,
            
            net_value:(r.sumNetValue + (r.OtherCharges? 
              r.OtherCharges.reduce((p1, v1) => 

              v1.length ?
                v1[0].charge_type === "+" ? 
                p1 + Number(v1[0].charge_amount) : p1 - Number(v1[0].charge_amount) : 0,0) 
            : 0)),
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
            r._id.customer,
            r._id.category_name,
            r.sumDispatchQty,
            r.uom_name,
            r.sumNetValue + (r.OtherCharges? 
              r.OtherCharges.reduce((p1, v1) => 

              v1.length ?
                v1[0].charge_type === "+" ? 
                p1 + Number(v1[0].charge_amount) : p1 - Number(v1[0].charge_amount) : 0,0) 
            : 0),
              
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


