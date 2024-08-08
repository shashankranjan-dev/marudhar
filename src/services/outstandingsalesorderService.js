import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import { currentDate } from "views/Pages/HelperComponent/utils";
import { currencyFormate } from "../views/Pages/HelperComponent/utils";
import { dateFormate } from "views/Pages/HelperComponent/utils";
import moment from "moment";


function toTitleCase(str) {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return "";
  }
}
// export const getAllOutstandingData = async (
//   onSuccess,
//   onFailure,
//   addSearch
// ) => {
//   //console.log(addSearch.ddl_reference.value, "sen0705");
//   try {
//     const res = await webApi.post("/reports/outStandingReportSalesOrder/list", {
//       customer_id: addSearch?.ddl_customer.value,
//       txt_to_date: timestamp(addSearch.txt_to_date),
//       txt_from_date: timestamp(addSearch.txt_from_date),
//       reference_id: addSearch?.ddl_reference.value,
//       group_id: addSearch?.ddl_group.value,
//     });

//     if (res.status === 200) {
//       const r = res.data;
//       let combineCharges =[];

//       let allItems = [];
//       r.map((r, i) => {

//         combineCharges = r.sumSalesOrderCharges.reduce((s,l) => s.concat(l))

//         //console.log(r, "sen07051");
//         // r.sumSalesOrderCharges? r.sumSalesOrderCharges.reduce((s,l)=> //console.log(l,"sen11051") ,0) : 0,
//         allItems.push({
//           id: i + 1,
//           company_name: r.company_name,
//           closing_balance: currencyFormate(
//             Math.abs(
              
//               r.closing_balance + combineCharges.length > 0
//             ? Number(r.sumSalesOrderNetValue) +
//             combineCharges.reduce(
//               (s, l) =>
//                 l.charge_type === "+"
//                   ? s + Number(l.charge_amount)
//                   : s - Number(l.charge_amount),
//               0
//             )
//             : Number(r.sumSalesOrderNetValue) )), //(r.closing_balance >= 0 ? r.closing_balance : r.closing_balance),
//           // invoice_count: r.invoice_count,
//           customer_id:r._id,
//           net_value: currencyFormate(
//             combineCharges.length > 0
//               ? Number(r.sumSalesOrderNetValue) +
//               combineCharges.reduce(
//                 (s, l) =>
//                   l.charge_type === "+"
//                     ? s + Number(l.charge_amount)
//                     : s - Number(l.charge_amount),
//                 0
//               )
//               : Number(r.sumSalesOrderNetValue)
//           ),
//               action_items: r.action_items,
//               ledger_account_id: r.ledger_account_id,
//               action: "action",
//           // net_value:Number(r.sumSalesOrderValue)
//           // +
//           //  ( r.sumSalesOrderCharges ?
//           //   r.sumSalesOrderCharges.reduce((s,l)=> l.charge_type === "+" ? Number(l.charge_amount) : Number(l.charge_amount),0) : 0)

//           ///////////////////////////////////old/////////////////////////////
//           // r.sumSalesOrderNetValue +
//           // (r.salesOrderOtherCharges?
//           //   r.salesOrderOtherCharges.reduce(
//           //       (p1, v1) =>
//           //         v1.length
//           //           ? v1.charge_type === "+"
//           //             ? p1 + Number(v1.charge_amount)
//           //             : p1 - Number(v1.charge_amount)
//           //           : 0,
//           //       0
//           //     )
//           //   : 0),
//         });
//       });
//       if (allItems.length) {
//         return onSuccess(allItems);
//       } else {
//         return onFailure("Data not Found");
//       }
//     } else {
//       onFailure("Something Wrong! Please Try again later5 " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later5 " + error);
//   }
// };
export const getAllOutstandingData = async (
  onSuccess,
  onFailure,
  addSearch
) => {

  // start of day calculations
  //console.log(addSearch.txt_from_date - (addSearch.txt_from_date % 86400 ) ,"sen0705");
  try {
    const res = await webApi.post("/reports/outStandingReportSalesOrder/list", {
      customer_id: addSearch?.ddl_customer.value,
      txt_to_date: timestamp(addSearch.txt_to_date) + 86399,
      txt_from_date: addSearch.txt_from_date - (addSearch.txt_from_date % 86399 ),
      reference_id: addSearch?.ddl_reference.value,
      group_id: addSearch?.ddl_group.value,
      txt_min_amount:addSearch?.txt_min_amount?addSearch?.txt_min_amount:0,
      txt_max_amount:addSearch?.txt_max_amount?addSearch?.txt_max_amount:0
    });

    if (res.status === 200) {
      const r = res.data;
      let combineCharges = [];
      let closing_balance=0;
      let r1=[];
      let allItems = [];
      let pdf = [];

       //console.log(r, "sen07051");
      
     
      r.map((r, i) => {
  
        if (addSearch?.txt_min_amount.length > 0 || addSearch?.txt_max_amount.length > 0) {
          if (r.closing_balanceAfterMinMax>0)
            {
              allItems.push({
                id: i + 1,
                company_name: r.company_name,
                closing_balance: Math.abs(r.closing_balanceAfterMinMax).toFixed(2), 
                sales_order_total:  Number(r.closing_balanceAfterMinMax).toFixed(2),  
                dr_cr_status:r.current_dr_cr,
                customer_id: r._id,
                net_value:currencyFormate(r.sumSalesOrderNetValue),
                total:r.sumSalesOrderNetValue,
                action_items: r.action_items,
                ledger_account_id: r.ledger_account_id,
                action: "action",
                
              });
              pdf.push([
                i + 1,
                r.company_name,
                Math.abs(r.closing_balanceAfterMinMax),                
                r.current_dr_cr,

              ])
            }
          }
           else
           {

            allItems.push({
              id: i + 1,
              company_name: r.company_name,
              closing_balance: Math.abs(r.closing_balance).toFixed(2), 
              sales_order_total: Number( r.closing_balanceAfterMinMax).toFixed(2),      
              dr_cr_status:r.current_dr_cr,
              customer_id: r._id,
              net_value:currencyFormate(r.sumSalesOrderNetValue),
              total:r.sumSalesOrderNetValue,
              action_items: r.action_items,
              ledger_account_id: r.ledger_account_id,
              action: "action",
              
            });
            pdf.push([
              i + 1,
              r.company_name,              
              Math.abs(r.closing_balanceAfterMinMax),              
              r.current_dr_cr,

            ])

           }



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
export const getAllGroup = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/master_group/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allGroup = [];
      r.map((r, i) => {
        if (r.customer_status === "Y") {
          allGroup.push({
            value: r.master_group_id,
            label: toTitleCase(r.group),
          });
        }
      });

      return onSuccess(allGroup);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllReference = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/reference/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allreferenceAcc = [];
      r.map((r, i) => {
        allreferenceAcc.push({
          value: r.reference_id,
          label: toTitleCase(r.name),
        });
      });
      return onSuccess(allreferenceAcc);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getSearchLedgerVouchers = async (onSuccess, onFailure, id,cust_id,from_date,to_date) => {
  //console.log(id,"abc34")
  
  try {

    // //console.log(q.ddl_ledger_account.label,"d")

    const res = await webApi.post("/reports/AccountVoucherForSalesOrder/list", {

      voucher_from_date: timestamp("2022-04-01"),
      voucher_to_date: timestamp(currentDate()),
      // ledger_name: q.ddl_ledger_account?.label,
      ledger_account_id: id,
      customer_id:cust_id
      // voucher_type:,
      // group_id:q.group_id,

    });
    if (res.status === 200) {
      let r = res.data.sort()
      let allItems = [];
      let inc = 0;
      // //console.log("sen1805/accv", r);
      //r.map((o) => { ...o, particular: });

      // r = r.filter((o) => ( !o.journal_details || o.journal_details?.ddl_ledger_id !== id));
      

      r.map((r, i) => {
      // //console.log(r.sales_order_other_charges.reduce((k, l) =>
      // l.charge_type === "+" ?
      //   + Number(l.charge_amount) : - Number(l.charge_amount)
      // , 0),"26052022")
      //console.log(r,"sen1309")
          allItems.push({
          
            ledID: i + 1,
            ledVoucherType: (r.voucher_type ? r.voucher_type : r.receipt_payment_type),
            amount:
            (
              r.amount ? r.amount 
              : 
                r.sales_status === "37"?
                    r.invoice_item_details.reduce((s,l)=>s + Number(l.net_value),0)
                :
                r.sales_order_item_details?.reduce((s,l)=>s + Number(l.net_value),0)

              ),
            bank_id: r.bank_id,
            ledVoucherNo:r.voucher_no ? r.voucher_no :r.sales_order_no[0],
            ledDate: dateFormate(r.voucher_date? parseInt(r.voucher_date): r.sales_order_date),
            // ledVoucherType:"JOURNAL",
            particular: r.company_name?  r.company_name : r.particular,
            dr_cr: r.sales_order_other_charges ? (r.sales_order_other_charges?.charge_type === "+" ? 2 : 1) : r.dr_cr,
            mode: r.mode,
            ledger_account_for_party:r.ledger_account_for_party,
            sales_status: r.sales_status,
            invoice_item_details:r.invoice_item_details,
            sales_order_other_charges: r.sales_status === "37" ?
            r.invoice_other_charges?.length > 0 ? r.invoice_other_charges : 0

            : r.sales_order_other_charges?.length > 0 ? r.sales_order_other_charges : 0,
            // sales_order_other_charges:r.sales_order_other_charges?.length >0 ? r.sales_order_other_charges :0,
            // ledDr_Cr:r.journal_details.dr_cr,
            // ledDebit:r.journal_details[0].dr_cr,
            // ledCredit:r.journal_details[0].dr_cr,
            // jorAmount:r.journal_details.amount,
            // jorAction: "view-action",
            // menu: customMenu,

          });
      });
      let r1=allItems.sort((a,b)=>moment(a.ledDate,"DD/MM/YYYY")-moment(b.ledDate,"DD/MM/YYYY"))
      if (r1.length) {
        // //console.log("sen1805/return", allItems);
        return onSuccess(r1);
        } else {
          return onFailure("Journal Not Found");
        }
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const getLedgerClosingBalance = async (onSuccess, onFailure,q) => {
  //console.log(q,"abc")
  
  try {

    // //console.log(q.ddl_ledger_account.value,"dina ti")

    const res = await webApi.post("/master/ledger_account/balance", {
      from_date: timestamp(q.txt_from_date),
      to_date: timestamp(q.txt_to_date),
      ledger_account_id: q.ledger_account_id,
    });

    if (res.status === 200) {
      let r = res.data;
      let allItems = [];
      let inc = 0;
      
      if (r) {
        //console.log("AII", r);
        let res = [{
          ...r[0], closing_balance: (r[0].closing_balance >= 0 ? r[0].closing_balance : -r[0].closing_balance),
          initial_dr_cr: r[0].dr_cr_status,
          dr_cr_status:r[0].dr_cr_status,
        //  dr_cr_status: (r[0].closing_balance >= 0 ? r[0].dr_cr_status : (r[0].dr_cr_status === "Dr" ? "Cr" : "Dr")),

        }];

        return onSuccess(res);
        } else {
          return onFailure("Journal Not Found");
        }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};