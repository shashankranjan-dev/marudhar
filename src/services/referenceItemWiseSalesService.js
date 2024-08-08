
import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import { currencyFormate 
} from "../views/Pages/HelperComponent/utils";
export const getAllReferenceItemWiseSalesReport = async (onSuccess, onFailure,addSearch ) => {
    try {
      const res = await webApi.post("/reports/referenceItemWiseSales/list", {

        ddl_reference_id:addSearch.ddl_reference_id.value,
        txt_to_date:timestamp(addSearch.txt_to_date),
        txt_from_date:timestamp(addSearch.txt_from_date),
        txt_discount_from:parseFloat(addSearch.txt_discount_from),
        txt_discount_to:parseFloat(addSearch.txt_discount_to)

      });
      //console.log(parseFloat(addSearch.txt_discount_to),"HK")
      //console.log(res,"rrr1")

      if (res.status === 200) {


        const row = res.data;

        //console.log(row,"rrr")

        let allItems = [];
        let pdf = [];
        row.map((r, i) => {
          //console.log(row,"rrr1")
      
          allItems.push
          ({
            id: i + 1,            
            category: r._id,
            child_category:r.child_category,
            quantity:r.sumDispatchQty,
            uom_name:r.uom_name,
            net_value:currencyFormate(r.net_value + (r.OtherCharges? 
              r.OtherCharges.reduce((p1, v1) => 

              v1.length > 0 ?
                v1[0].charge_type === "+" ? 
                p1 + Number(v1[0].charge_amount) : p1 - Number(v1[0].charge_amount) : 0,0) 
            : 0)),
            net_amount:(r.net_value + (r.OtherCharges? 
              r.OtherCharges.reduce((p1, v1) => 

              v1.length > 0 ?
                v1[0].charge_type === "+" ? 
                p1 + Number(v1[0].charge_amount) : p1 - Number(v1[0].charge_amount) : 0,0) 
            : 0))
          });
          pdf.push([
            i + 1,
            r._id ? r._id : r.child_category,
            Number(r.sumDispatchQty).toFixed(2),
            r.uom_name,
            (r.net_value + (r.OtherCharges? 
              r.OtherCharges.reduce((p1, v1) => 

              v1.length > 0 ?
                v1[0].charge_type === "+" ? 
                p1 + Number(v1[0].charge_amount) : p1 - Number(v1[0].charge_amount) : 0,0) 
            : 0)),

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

