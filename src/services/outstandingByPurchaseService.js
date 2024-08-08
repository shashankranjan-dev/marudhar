import {
  dateFormate,
  currentDate,
  currencyFormate,
} from "views/Pages/HelperComponent/utils";
import { timestamp } from "./Utils/utils";
import webApi from "./webApi/webApi";

function toTitleCase(str) {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return "";
  }
}

export const getListVendor = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/vendor/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allvendor = [];
      r.map((r, i) => {
        if (r.company_name && r.vendor_id > 0 && r.company_name) {
          allvendor.push({
            value: r.vendor_id,
            label: toTitleCase(r.company_name),
          });
        }
      });
      return onSuccess(allvendor);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getVendorByVendorName = async (
  vendor_name,
  onSuccess,
  onFailure
) => {
  //console.log(vendor_name, "999d2");
  try {
    const res = await webApi.post("/master/ledger_account/list", {
      ledger_account: vendor_name,
    });

    if (res.status === 200) {
      const r = res.data;
      let allLedg = [];
      //console.log(r, "0001");
      r.map((c, i) => {
        allLedg.push({
          // id: i + 1,
          vendor_id: c.ledger_account_id,
        });
      });
      if (allLedg.length) {
        //console.log(allLedg, "999d3");
        return onSuccess(allLedg);
      } else {
        onFailure("Vendor not Found ");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllPurchaseOutstandingData = async (
  onSuccess,
  onFailure,
  addSearch
) => {
 
  //console.log(addSearch.ddl_vendor.label, "04002202");
  try {
    const res = await webApi.post("/reports/purchase/list", {
        vendor_id: addSearch.ddl_vendor.value,
      //   txt_to_date: timestamp(addSearch.txt_to_date) + 86399,
      //   txt_from_date: timestamp(addSearch.txt_from_date),
    //   txt_to_date: timestamp(addSearch.txt_to_date) + 86399,
    //   txt_from_date:
    //     addSearch.txt_from_date - (addSearch.txt_from_date % 86399),
     
    });

    if (res.status === 200) {
      const r = res.data;      
      let closing_balance = 0;      
      let allItems = [];  
      let pdf = [];

      r.map((r, i) => {
      //console.log(r, "sank07051");

        allItems.push({
          id: i + 1,
          vendor_id:r._id,          
          vendor_name:r.company_name,
          ledger_account_id:r.ledger_account_id,
          receipt_payments_dr:r.receiptPaymentsDebitBalance,
          receipt_payments_cr:r.receiptPaymentsCreditBalance,
          journals_dr:r.journalsDebitBalance,
          journals_cr:r.journalsCreditBalance,
          opening_balance:r.opening_balance,
          closing_balanceUseForTotal:Math.abs(r.closing_balance),
          purchase_valueUseForTotal: r.sumPurchase_value ? r.sumPurchase_value : 0 ,
          dr_cr_status:r.current_dr_cr,
          closing_balance:currencyFormate(Math.abs(r.closing_balance)),
          purchase_value: r.sumPurchase_value ? currencyFormate(r.sumPurchase_value) : 0 ,


          
        });
        
        pdf.push([
          i + 1,
          r.company_name,
          r.sumPurchase_value ? (r.sumPurchase_value).toFixed(2) : 0,
          Math.abs(r.closing_balance).toFixed(2),
          r.current_dr_cr
        ])
      });
      
      if (allItems.length) {
      //console.log(allItems.reduce((s,i)=>Number(s)+ Number(i.closing_balance),0), "sankallItems");

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
