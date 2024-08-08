export const ledgerRowData = [
  {
    ledDate: "01/08/2021",
    ledVoucherNo: "",
    ledVoucherType: "",
    ledParticular: "Opening Balance",
    ledDebit: "",
    ledCredit: "400000",
  },
  {
    ledDate: "02/08/2021",
    ledVoucherNo: "MM/DR/21-22/0001",
    ledVoucherType: "Purchase",
    ledParticular: "Marbles",
    ledDebit: "",
    ledCredit: "300000",
  },
  {
    ledDate: "03/08/2021",
    ledVoucherNo: "MM/DR/21-22/0002",
    ledVoucherType: "",
    ledParticular: "GST",
    ledDebit: "",
    ledCredit: "18000",
  },
  {
    ledDate: "",
    ledVoucherNo: "",
    ledVoucherType: "",
    boldText: "boldText",
    ledParticular: "Closing Balance",
    ledDebit: "718000",
    ledCredit: "",
  },
  {
    ledDate: "",
    ledVoucherNo: "",
    ledVoucherType: "",
    ledParticular: "Total",
    boldText: "boldText",
    ledDebit: "718000",
    ledCredit: "718000",
  },
];

import { timestamp } from "./Utils/utils";
import { dateFormate, currentDate } from "views/Pages/HelperComponent/utils";
import webApi from "./webApi/webApi";
import { currencyFormate } from "views/Pages/HelperComponent/utils";
export const getAllLedgerAccount = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/category/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allTerms = [];
      r.map((r) => {
        allTerms.push({
          id: r.category_id,
          modules: "",
          terms: "",
          details: "",
          status: r.active_status,
          action_items: r.action_items,
          action: "action",
        });
      });
      return onSuccess(allTerms);
    } else {
      onFailure("Something Wrong! Please Try again Later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again Later " + error);
  }
};

export const postCategory = async (cats, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/category/insert", {
      parent_category_id: cats.ddl_parent_category_id,
      category: cats.txt_Category,
      details: cats.txt_details,
      active_status: cats.switch_active_btn ? "Y" : "N",
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

export const updateCategory = async (cats, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/category/update", {
      category_id: cats.category_id,
      category: cats.txt_Category,
      details: cats.txt_details,
      active_status: cats.switch_active_btn ? "Y" : "N",
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
export const deleteCategory = async (categoryId, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/category/delete", {
      category_id: categoryId,
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

//FOR SEARCH
export const getSearchAllJournalList = async (onSuccess, onFailure, q) => {
  let customMenu;
  // console.log(q,"abc")

  try {

    // console.log(q.ddl_ledger_account.label,"d")

    const res = await webApi.post("/master/journal/list", {

      voucher_from_date: timestamp(q.journal_from_date),
      voucher_to_date: timestamp(q.journal_to_date),
      ledger_name: q.ddl_ledger_account?.label,

      // voucher_type:,
      // group_id:q.group_id,

    });
    if (res.status === 200) {
      const r = res.data
      let allItems = [];
      let inc = 0;


      r.map((r, i) => {
        // console.log(r,"tr")
        allItems.push({
          ledID: i + 1,
          // voucher_type: r.ddl_ledger,

          ledVoucherNo: r.voucher_no,
          ledDate: dateFormate(r.voucher_date),
          ledVoucherType: "JOURNAL",
          ledJournal: r.journal_details,
          // ledDr_Cr:r.journal_details,
          // ledDebit:r.journal_details[0].dr_cr,
          // ledCredit:r.journal_details[0].dr_cr,
          // jorAmount:r.journal_details.amount,
          jorAction: "view-action",
          menu: customMenu,
        });
      });

      if (allItems.length) {

        return onSuccess(allItems);
      } else {
        return onFailure("Journal Not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// export const getSearchAllJournalList = async (onSuccess, onFailure, q) => {
//   let customMenu;
//   console.log(q,"abc")

//   try {

//     console.log(q.ddl_ledger_account.label,"d")

//     const res = await webApi.post("/master/journal/list", {

//       voucher_from_date: timestamp(q.journal_from_date),
//       voucher_to_date: timestamp(q.journal_to_date),
//       ledger_name: q.ddl_ledger_account?.label,

//       // voucher_type:,
//       // group_id:q.group_id,

//     });
//     if (res.status === 200) {
//       const r = res.data
//       let allItems = [];
//       let inc = 0;


//       r.map((r, i) => {
//         console.log(r,"tr")
//           allItems.push({
//             ledID: i + 1,
//             // voucher_type: r.ddl_ledger,

//             ledVoucherNo:r.voucher_no,
//             ledDate: dateFormate(r.voucher_date),
//             ledVoucherType:"JOURNAL",
//             ledJournal:r.journal_details,
//             // ledDr_Cr:r.journal_details,
//             // ledDebit:r.journal_details[0].dr_cr,
//             // ledCredit:r.journal_details[0].dr_cr,
//             // jorAmount:r.journal_details.amount,
//             jorAction: "view-action",
//             menu: customMenu,
//           });
//       });

//       if (allItems.length) {

//         return onSuccess(allItems);
//         } else {
//           return onFailure("Journal Not Found");
//         }
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

export const getSearchLedgerVouchers = async (onSuccess, onFailure, q) => {
  // console.log(q,"abc")

  try {

    // console.log(q.txt_from_date,q.txt_to_date,"date123")

    const res = await webApi.post("/reports/AccountVouchers/list", {

      voucher_from_date: timestamp(q.txt_from_date),
      voucher_to_date: timestamp(q.txt_to_date) + 86399,
      ledger_name: q.ddl_ledger_account?.label,
      ledger_account_id: q.ddl_ledger_account?.value,

      // voucher_type:,
      // group_id:q.group_id,

    });
    if (res.status === 200) {
      const getVType = (voucherType) => {
        if (voucherType === 'R') {
          return 'Receipt';
        }
        else if (voucherType === 'P') {
          return 'Payment';
        }
        else return voucherType;
      };
      let r = res.data
      // console.log(r,'LedgerCHECKDATA')
      let allItems = [];
      let pdf = [];

      let j_d = [];
      let total_net_value = 0;


      let ledgerData = r.filter((o) => (!o.journal_details || o.journal_details?.ddl_ledger_id === q.ddl_ledger_account?.value)); // for ledger search on dropdown and matching with journal details ledger id


      r = r.filter((o) => (!o.journal_details || o.journal_details?.ddl_ledger_id !== q.ddl_ledger_account?.value));
      // console.log("11", r)
      // voucher_no_chk = r.journal_details.filter((o) => (!o?.ddl_ledger_id || o?.ddl_ledger_id !== q?.value));

      const charges = r.reduce((catsSoFar, { voucher_no, journal_details }) => {

        if (!catsSoFar[voucher_no])
        catsSoFar[voucher_no] = 0;
        catsSoFar[voucher_no] += (journal_details?.dr_cr === 1 ? -journal_details?.amount : journal_details?.amount);
       
        return catsSoFar;
      }, {});
      console.log("sen=>raja",r);

      let v_no = "0";

      r.map((r, i) => {
        if (v_no !== r.voucher_no) {

          // checking journal details cr dr by search ledger start 
          let ledgerDataCrDr = ledgerData.filter((ledgerdrcr) => (ledgerdrcr.journal_details && ledgerdrcr.voucher_no == r.voucher_no));
          let searchLedgerCrDr;
          if(ledgerDataCrDr.length==1)
          {
            searchLedgerCrDr = ledgerDataCrDr[0].journal_details?.dr_cr;
          }
          else if(ledgerDataCrDr.length>1)
          {
            let drAmount = 0;
            let crAmount = 0;
            ledgerDataCrDr.map((data)=>{
                if(data.journal_details.dr_cr===1){
                  drAmount+=data.journal_details.amount;
                }
                else if(data.journal_details.dr_cr===2){
                  crAmount+=data.journal_details.amount;
                }
            })

            if(drAmount>crAmount){
              searchLedgerCrDr = 1;
            }
            else if(crAmount>drAmount){
              searchLedgerCrDr = 2;
            }
          }

          // checking journal details cr dr by search ledger end

      
          if (r.transaction_type === "Sales") {
            
            allItems.push({
              ledID: i + 1,
              ledVoucherType: (r.voucher_type ? r.voucher_type : r.receipt_payment_type),
              narraction: r.narration,
             
              amount: Math.abs(charges[r.voucher_no]),//(r.amount ? r.amount : r.journal_details.amount),
              bank_id: r.bank_id,
              ledVoucherNo: r.voucher_no,
              ledTransectionId: r.transaction_id,
              ledDate: dateFormate(parseInt(r.voucher_date)),
         
              particular: r.journal_details ? r.journal_details.ddl_ledger : 0,
              //  dr_cr:(r.journal_details?.dr_cr === 1 || charges[r.voucher_no]<0 ? 2 : 1) ,

            //  dr_cr: r.journal_details ? (r.journal_details?.dr_cr === 1 ? 1 : 2) : "",
            dr_cr: 
            r.journal_details ?
              // (r.journal_details?.dr_cr === 1 ? 2 : 1)
              searchLedgerCrDr
              : r.dr_cr,
              mode: r.mode,
              ledger_account_for_party: r.ledger_account_for_party,
              transaction_type: r.transaction_type,
              // ledDr_Cr:r.journal_details.dr_cr,
              // ledDebit:r.journal_details[0].dr_cr,
              // ledCredit:r.journal_details[0].dr_cr,
              // jorAmount:r.journal_details.amount,
              // jorAction: "view-action",
              // menu: customMenu,

            });
            pdf.push([
              i + 1,
              dateFormate(parseInt(r.voucher_date)),
              r.voucher_no,
              getVType(r.voucher_type ? r.voucher_type : r.receipt_payment_type) === "BR"
                || getVType(r.voucher_type ?
                  r.voucher_type
                  : r.receipt_payment_type) === "BP" ?
                "Bad Debt"
                : getVType(r.voucher_type ?
                  r.voucher_type :
                  r.receipt_payment_type),

              (r.journal_details ? r.journal_details.ddl_ledger : 0) ? (r.journal_details ? r.journal_details.ddl_ledger : 0) : r.ledger_account_for_party,

              (r.voucher_type ? r.voucher_type : r.receipt_payment_type) === "Journal" ? r.transaction_id : r.mode,
              r.narration,
              (r.voucher_type === "Journal" && r?.journal_details && r.journal_details.dr_cr === 2 ?
                r.journal_details.amount : '').toLocaleString(2),
              (r.voucher_type === "Journal" && r?.journal_details && r.journal_details.dr_cr === 1 ?
                r.journal_details.amount : '').toLocaleString(2),

              // debit_amount.toFixed(2),
              // credit_amount.toFixed(2)

              // Math.abs(charges[r.voucher_no]).toFixed(2),
              // Math.abs(charges[r.voucher_no]).toFixed(2),

            ])
          }
          else {
            // console.log("sen=>ccc", r.journal_details)
            allItems.push({
              ledID: i + 1,
              ledVoucherType: (r.voucher_type ? r.voucher_type : r.receipt_payment_type),
              narraction: r.narration,
              //voucher_no: r.voucher_no,
              amount: (r.amount ? r.amount : Math.abs(charges[r.voucher_no])),
              bank_id: r.bank_id,
              ledVoucherNo: r.voucher_no,
              ledTransectionId: r.transaction_id,
              ledDate: dateFormate(parseInt(r.voucher_date)),
              // ledVoucherType:"JOURNAL",
              particular: r.journal_details ? r.journal_details.ddl_ledger : 0,
              dr_cr:
                r.journal_details ?
                  // (r.journal_details?.dr_cr === 1 ? 2 : 1)
                  searchLedgerCrDr
                  : r.dr_cr,
              // dr_cr : r.journal_details?.dr_cr,
              mode: r.mode,
              ledger_account_for_party: r.ledger_account_for_party,
              transaction_type: r.transaction_type,
              // ledDr_Cr:r.journal_details.dr_cr,
              // ledDebit:r.journal_details[0].dr_cr,
              // ledCredit:r.journal_details[0].dr_cr,
              // jorAmount:r.journal_details.amount,
              // jorAction: "view-action",
              // menu: customMenu,

            });
            pdf.push([
              i + 1,
              dateFormate(parseInt(r.voucher_date)),
              r.voucher_no,
              getVType(r.voucher_type ? r.voucher_type : r.receipt_payment_type) === "BR"
                || getVType(r.voucher_type ?
                  r.voucher_type
                  : r.receipt_payment_type) === "BP" ?
                "Bad Debt"
                : getVType(r.voucher_type ?
                  r.voucher_type :
                  r.receipt_payment_type),

              (r.journal_details ? r.journal_details.ddl_ledger : 0) ? (r.journal_details ? r.journal_details.ddl_ledger : 0) : r.ledger_account_for_party,

              (r.voucher_type ? r.voucher_type : r.receipt_payment_type) === "Journal" ? r.transaction_id : r.mode,
              r.narration,
              (r.dr_cr === 1 ?
                r.amount : '').toLocaleString(2),
              (r.dr_cr === 2 ?
                r.amount : '').toLocaleString(2),

              // debit_amount.toFixed(2),
              // credit_amount.toFixed(2)
            ])
          }
        }

        v_no = r.voucher_no;


      });

      if (allItems.length) {
        return onSuccess(allItems, pdf);
      } else {
        return onFailure("Journal Not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
    // if (res.status === 200) {
    //   let r = res.data
    //   let allItems = [];
    //   let inc = 0;
    //   console.log("bfl", r);
    //   //r.map((o) => { ...o, particular: });

    //   r = r.filter((o) => ( !o.journal_details || o.journal_details?.ddl_ledger_id !== q.ddl_ledger_account?.value));


    //   r.map((r, i) => {
    //     console.log(r,"sen3004/amt1")
    //       allItems.push({
    //         ledID: i + 1,
    //         ledVoucherType: (r.voucher_type ? r.voucher_type : r.receipt_payment_type),
    //         //voucher_no: r.voucher_no,
    //         amount: (r.amount ? r.amount : r.journal_details.amount),
    //         bank_id: r.bank_id,
    //         ledVoucherNo:r.voucher_no,
    //         ledTransectionId:r.transaction_id,
    //         ledDate: dateFormate(parseInt(r.voucher_date)),
    //         // ledVoucherType:"JOURNAL",
    //         particular: r.journal_details?  r.journal_details.ddl_ledger : 0,
    //         dr_cr: r.journal_details ? (r.journal_details?.dr_cr === 1 ? 2 : 1) : r.dr_cr,
    //         mode: r.mode,
    //         ledger_account_for_party:r.ledger_account_for_party,
    //         transaction_type:r.transaction_type,

    //         // ledDr_Cr:r.journal_details.dr_cr,
    //         // ledDebit:r.journal_details[0].dr_cr,
    //         // ledCredit:r.journal_details[0].dr_cr,
    //         // jorAmount:r.journal_details.amount,
    //         // jorAction: "view-action",
    //         // menu: customMenu,

    //       });
    //   });

    //   if (allItems.length) {
    //     console.log("AII1", allItems);
    //     return onSuccess(allItems);
    //     } else {
    //       return onFailure("Journal Not Found");
    //     }
    // } else {
    //   onFailure("Something Wrong! Please Try again later" + res.data);
    // }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const getLedgerClosingBalance = async (onSuccess, onFailure, q) => {
  // console.log(q,"abc")

  try {

    // console.log(q.ddl_ledger_account.value,"dina ti")

    const res = await webApi.post("/master/ledger_account/balance", {
      from_date: timestamp(q.txt_from_date),
      to_date: timestamp(q.txt_to_date),
      ledger_account_id: q.ddl_ledger_account?.value,
    });

    if (res.status === 200) {
      let r = res.data;
      let allItems = [];
      let inc = 0;

      if (r) {
        // console.log("AII2", r);
        let res = [{
          ...r[0], closing_balance: (r[0]?.closing_balance >= 0 ? r[0]?.closing_balance : -r[0]?.closing_balance),
          initial_dr_cr: r[0]?.dr_cr_status,
          // dr_cr_status: r[0]?.closing_balance > 0 ? "Dr" : "Cr" ,
          dr_cr_status: r[0]?.current_dr_cr,

          // dr_cr_status:r[0]?.dr_cr_status,
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




export const getLedgerOpeningAndClosingBalance = async (onSuccess, onFailure, q) => {
  // console.log(q,"abc")

  try {

    // console.log(q.ddl_ledger_account.value,"dina ti")

    const res_opening = await webApi.post("/master/ledger_account/balance", {
      from_date: 1617215400,
      to_date: timestamp(q.txt_from_date),
      ledger_account_id: q.ddl_ledger_account?.value,
    });

    const res_closing = await webApi.post("/master/ledger_account/balance", {
      from_date: 1617215400,
      to_date: timestamp(q.txt_to_date) + 86400,
      ledger_account_id: q.ddl_ledger_account?.value,
    });

    if (res_opening.status === 200 && res_closing.status === 200) {
      let r1 = res_opening.data;
      let r2 = res_closing.data;
      let allItems = [];
      let inc = 0;

      if (r1 && r2) {
        //console.log("AII", r);
        let res = [{
          ledger_account_id: r1[0].ledger_account_id,
          ledger_account: r1[0].ledger_account,
          opening_balance: currencyFormate(r1[0]?.closing_balance >= 0 ? r1[0]?.closing_balance : -r1[0]?.closing_balance),
          // opening_balance: (r1[0].closing_balance >= 0 ? r1[0].closing_balance : -r1[0].closing_balance),
          initial_dr_cr: r1[0]?.dr_cr_status,
          // initial_dr_cr: (r1[0].closing_balance >= 0 ? r1[0].dr_cr_status : (r1[0].dr_cr_status === "Dr" ? "Cr" : "Dr")),
          closing_balance: currencyFormate(r2[0]?.closing_balance >= 0 ? r2[0]?.closing_balance : -r2[0]?.closing_balance),
          // closing_balance: (r2[0].closing_balance >= 0 ? r2[0].closing_balance : -r2[0].closing_balance),
          // dr_cr_status: (r2[0].closing_balance >= 0 ? r2[0].dr_cr_status : (r2[0].dr_cr_status === "Dr" ? "Cr" : "Dr")),
          dr_cr_status: r2[0]?.current_dr_cr,

        }];
        let pdf = [([
          r1[0]?.ledger_account,
          r1[0]?.closing_balance >= 0 ? r1[0]?.closing_balance : -r1[0]?.closing_balance,
          r1[0]?.dr_cr_status,
          r2[0]?.closing_balance >= 0 ? r2[0]?.closing_balance : -r2[0]?.closing_balance,
          r2[0]?.dr_cr_status,

        ])];

        return onSuccess(res, pdf);
      } else {
        return onFailure("Journal Not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
