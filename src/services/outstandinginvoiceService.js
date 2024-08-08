import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import { currentDate } from "views/Pages/HelperComponent/utils";
import { dateFormate } from "views/Pages/HelperComponent/utils";
import { currencyFormate } from "views/Pages/HelperComponent/utils";

function toTitleCase(str) {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return "";
  }
}
export const getAllOutstandingData = async (
  onSuccess,
  onFailure,
  addSearch,
  page,
  row
) => {
  //console.log(addSearch, "sen0705");
  try {
    const res = await webApi.post("/reports/outStandingReport/list", {
      customer_id: addSearch?.ddl_customer.value,
      txt_to_date: timestamp(addSearch.txt_to_date) + 86399,
      txt_from_date: addSearch.txt_from_date,
      reference_id: addSearch?.ddl_reference.value,
      group_id: addSearch?.ddl_group.value,
      txt_min_amount: addSearch?.txt_min_amount ? addSearch?.txt_min_amount : 0,
      txt_max_amount: addSearch?.txt_max_amount ? addSearch?.txt_max_amount : 0,
      page: page,
      row: row,
    });

    if (res.status === 200) {
      const r = res.data;
      //console.log(r, "sen07051");
      let allItems = [];
      let pdf = [];
      let combineCharges = [];
      let r1 = [];

      r.map((r, i) => {
        

        if (addSearch?.txt_min_amount.length > 0 || addSearch?.txt_max_amount.length > 0) {
          if (r.closing_balanceAfterMinMax > 0) {
            allItems.push({
              id: i + 1,
              company_name: r.company_name,
              closing_balance:
                currencyFormate(Math.abs(r.closing_balanceAfterMinMax)),
                closing_balanceExcel:
                Math.abs(r.closing_balanceAfterMinMax),
              sales_order_total: r.closing_balanceAfterMinMax,
              dr_cr_status: r.current_dr_cr,
              sumNetValue: r.sumInvoiceNetValue,
              total: r.sumInvoiceNetValue,
  
              action_items: r.action_items,
              ledger_account_id: r.ledger_account_id,
              action: "action",
              randomButton: "randomButton",
  
            });
            pdf.push([
              i + 1,
              r.company_name,
              r.sumInvoiceNetValue,
              Math.abs(r.closing_balanceAfterMinMax),
              r.dr_cr_status,
            ])
          }
        }
        else{
        if (r.closing_balanceAfterMinMax > 0) {
          allItems.push({
            id: i + 1,
            company_name: r.company_name,
            closing_balance:
              currencyFormate(Math.abs(r.closing_balanceAfterMinMax)),
              closing_balanceExcel:
                Math.abs(r.closing_balanceAfterMinMax),
            sales_order_total: r.closing_balanceAfterMinMax,
            dr_cr_status: r.current_dr_cr,
            sumNetValue: r.sumInvoiceNetValue,
            total: r.sumInvoiceNetValue,
  
            action_items: r.action_items,
            ledger_account_id: r.ledger_account_id,
            action: "action",
            randomButton: "randomButton",
  
          });
          pdf.push([
            i + 1,
            r.company_name,
            r.sumInvoiceNetValue,
            Math.abs(r.closing_balanceAfterMinMax),
            r.dr_cr_status,
          ])
        }
  
        // }
        else {
          allItems.push({
  
            id: i + 1,
            company_name: r.company_name,
            closing_balance:
              currencyFormate(Math.abs(r.closingBalance)),
              closing_balanceExcel:
                Math.abs(r.closingBalance),
            sales_order_total: r.closing_balanceAfterMinMax,
            dr_cr_status: r.current_dr_cr,
            sumNetValue: r.sumInvoiceNetValue,
            total: r.sumInvoiceNetValue,
  
            action_items: r.action_items,
            ledger_account_id: r.ledger_account_id,
            action: "action",
            randomButton: "randomButton",
  
          });
          pdf.push([
            i + 1,
            r.company_name,
            r.sumInvoiceNetValue,
            Math.abs(r.closing_balanceAfterMinMax),
            r.dr_cr_status,
  
  
          ])
        }}
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

export const getAllOutstandingData2 = async (
  onSuccess,
  onFailure,
  addSearch,
  page,
  row
) => {
  //console.log(addSearch, "sen0705");
  try {
    const res = await webApi.post("/reports/dataFromLedgerStorage/list", {
      customer_id: addSearch?.ddl_customer.value,
      txt_to_date: timestamp(addSearch.txt_to_date) + 86399,
      txt_from_date: timestamp(addSearch.txt_from_date),
      reference_id: addSearch?.ddl_reference.value,
      group_id: addSearch?.ddl_group.value,
      txt_min_amount: addSearch?.txt_min_amount ? addSearch?.txt_min_amount : 0,
      txt_max_amount: addSearch?.txt_max_amount ? addSearch?.txt_max_amount : 0,
      page: page,
      row: row,
    });

    if (res.status === 200) {
      const r = res.data;
      //console.log(r, "sen07051");
      let allItems = [];
      let combineCharges = [];
      let r1 = [];

      r.map((r, i) => {
        allItems.push({
          id: i + 1,
          company_name: r.company_name,
          closing_balance: Math.abs(r.closingValue),
          dr_cr_status: r.crDrStatus,
          sumNetValue: r.netValue,

          ledger_account_id: r.ledger_account_id,
        });
      });
      if (allItems.length) {
        return onSuccess(allItems);
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

export const getSearchLedgerVouchers = async (
  onSuccess,
  onFailure,
  id,
  from_date,
  to_date
) => {
  // //console.log(q,"abc")

  try {
    // //console.log(q.ddl_ledger_account.label,"d")

    const res = await webApi.post("/reports/AccountVouchers/list", {
      voucher_from_date: timestamp(from_date),
      voucher_to_date: timestamp(to_date),
      // ledger_name: q.ddl_ledger_account?.label,
      ledger_account_id: id,

      // voucher_type:,
      // group_id:q.group_id,
    });
    if (res.status === 200) {
      let r = res.data;
      let allItems = [];
      let inc = 0;
      //console.log("sen1805/accv", r);
      //r.map((o) => { ...o, particular: });

      r = r.filter(
        (o) => !o.journal_details || o.journal_details?.ddl_ledger_id !== id
      );

      const charges = r.reduce((catsSoFar, { voucher_no, journal_details }) => {
        // //console.log("sen=>",catsSoFar)

        if (!catsSoFar[voucher_no]) catsSoFar[voucher_no] = 0;
        catsSoFar[voucher_no] +=
          journal_details?.dr_cr === 1
            ? -journal_details?.amount
            : journal_details?.amount;

        return catsSoFar;
      }, {});

      let v_no = "0";
      r.map((r, i) => {
        //console.log(r, "sen3004/amt1");
        if (v_no !== r.voucher_no) {
          if (r.transaction_type === "Sales") {
            allItems.push({
              ledID: i + 1,
              ledVoucherType: r.voucher_type
                ? r.voucher_type
                : r.receipt_payment_type,
              //voucher_no: r.voucher_no,
              // amount: (r.amount ? r.amount : r.journal_details.amount),
              amount: Math.abs(charges[r.voucher_no]), //(r.amount ? r.amount : r.journal_details.amount),
              bank_id: r.bank_id,
              ledVoucherNo: r.voucher_no,
              ledDate: dateFormate(parseInt(r.voucher_date)),
              // ledVoucherType:"JOURNAL",
              particular: r.journal_details ? r.journal_details.ddl_ledger : 0,
              dr_cr: r.journal_details
                ? r.journal_details?.dr_cr === 1
                  ? 2
                  : 1
                : r.dr_cr,
              mode: r.mode,
              ledger_account_for_party: r.ledger_account_for_party,

              // ledDr_Cr:r.journal_details.dr_cr,
              // ledDebit:r.journal_details[0].dr_cr,
              // ledCredit:r.journal_details[0].dr_cr,
              // jorAmount:r.journal_details.amount,
              // jorAction: "view-action",
              // menu: customMenu,
            });
          } else {
            allItems.push({
              ledID: i + 1,
              ledVoucherType: r.voucher_type
                ? r.voucher_type
                : r.receipt_payment_type,
              //voucher_no: r.voucher_no,
              amount: r.amount ? r.amount : r.journal_details.amount,
              // amount: Math.abs(charges[r.voucher_no]), //(r.amount ? r.amount : r.journal_details.amount),
              bank_id: r.bank_id,
              ledVoucherNo: r.voucher_no,
              ledDate: dateFormate(parseInt(r.voucher_date)),
              // ledVoucherType:"JOURNAL",
              particular: r.journal_details ? r.journal_details.ddl_ledger : 0,
              dr_cr: r.journal_details
                ? r.journal_details?.dr_cr === 1
                  ? 2
                  : 1
                : r.dr_cr,
              mode: r.mode,
              ledger_account_for_party: r.ledger_account_for_party,

              // ledDr_Cr:r.journal_details.dr_cr,
              // ledDebit:r.journal_details[0].dr_cr,
              // ledCredit:r.journal_details[0].dr_cr,
              // jorAmount:r.journal_details.amount,
              // jorAction: "view-action",
              // menu: customMenu,
            });
          }
        }
        //set voucher no
        v_no = r.voucher_no;
      });

      if (allItems.length) {
        //console.log("sen1805/return", allItems);
        return onSuccess(allItems);
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

export const getLedgerClosingBalance = async (onSuccess, onFailure, q) => {
  //console.log(q, "abc");

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
        let res = [
          {
            ...r[0],
            closing_balance:
              r[0].closing_balance >= 0
                ? r[0].closing_balance
                : -r[0].closing_balance,
            initial_dr_cr: r[0].dr_cr_status,
            dr_cr_status: r[0].dr_cr_status,
            //  dr_cr_status: (r[0].closing_balance >= 0 ? r[0].dr_cr_status : (r[0].dr_cr_status === "Dr" ? "Cr" : "Dr")),
          },
        ];

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

// ledgerStorage
export const storage = async (store, customer, onSuccess, onFailure) => {
  //console.log(store[0]?.company_name[0], "sen2810202200");
  try {
    const res = await webApi.post("/master/storage/insert", {
      ledgerId: store[0]?.ledger_account_id,
      customerName: store[0]?.company_name[0],
      customerId: customer,
      crDrStatus: store[0]?.dr_cr_status,
      netValue: store[0]?.sumNetValue,
      closingValue: store[0]?.closing_balance,
    });

    if (res.status === 200) {
      onSuccess(res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};
