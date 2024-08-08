import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import { currencyFormate 
} from "../views/Pages/HelperComponent/utils";

export const getJournalByGrn = async (onSuccess, onFailure,addSearch ) => {
    try {
     
      const res = await webApi.post("/reports/PurchaseJournalReport/list", {
        vendor_id:addSearch.ddl_vendor.value,
        txt_to_date:timestamp(addSearch.txt_to_date),
        txt_from_date:timestamp(addSearch.txt_from_date),
        grn:addSearch?.txt_grn_no,
        });
      if (res.status === 200) {

        const r = res.data;
        // console.log(r,"rrr")
        let pdf = [];

        if (r.length) {
          r.map((r,i) => {
            pdf.push([
              i +1 ,
              r.transaction_id,
              r.voucher_no,
              r.vendor_name,
              Number(r.purchase_value),
              r.journal_count,
              Number(r.voucher_amount).toFixed(2),
            ])
          })
          return onSuccess(r,pdf);
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
