import webApi from "./webApi/webApi";
import {
  currencyFormate,
  currentDate,
  timestamp,
} from "../views/Pages/HelperComponent/utils";
import { dateFormate } from "../views/Pages/HelperComponent/utils";

export const getSearchReceiptList = async (onSuccess, onFailure, addSearch) => {
  //console.log(addSearch, "111");
  try {
    const res = await webApi.post("/master/receipt_payment/list", {
      voucher_no: addSearch.txt_voucher_no,
      ledger_id: addSearch.ddl_ledger?.value,
      from_date: timestamp(addSearch.txt_from_date),
      to_date: timestamp(addSearch.txt_to_date) + 86399,
    });

    if (res.status === 200) {
      const r = res.data;
      let arr = [];
      let inc = 0;
      //console.log(r, "sen0505/resarch");
      r.map((r, i) => {
        if (r.receipt_payment_type === "R" || r.receipt_payment_type === "BR") {
          arr.push({
            recID: i + 1,
            receipt_payment_id: r.receipt_payment_id,
            bank_id: r.bank_id,
            recDate: dateFormate(r.voucher_date),
            recVoucherNo: r.voucher_no,
            recLedger: r.ledger_account_id,
            ledger_account_name: r.ledger_account_name,
            recMode: r.mode,
            recReference: r.reference_number,
            recNarration: r.narration,
            recAmount: r.amount,
            action_items: r.action_items,
            recAction: "action",
          });
        }
      });
      if (arr.length) {
        return onSuccess(arr);
      } else {
        return onFailure("receipt not found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllReceipt = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/receipt_payment/list", {});
    if (res.status === 200) {
      const r = res.data;
      let arr = [];
      let inc = 0;
      let sumRecAmounts = 0;
      r.map((r, i) => {
        if (r.receipt_payment_type === "R") {
          inc++;
          arr.push({
            recID: inc,
            receipt_payment_id: r.receipt_payment_id,
            recDate: dateFormate(r.voucher_date),
            recVoucherNo: r.voucher_no,
            recLedger: r.ledger_account_id,
            ledger_account_name: r.ledger_account_name,
            recMode: r.mode,
            recReference: r.reference_number,
            recNarration: r.narration,
            recAmount: r.amount,
            recAdjAmount: currencyFormate(r.adjustment_amount),
            action_items: r.action_items,
            recAction: "action",
          });
          sumRecAmounts += r.amount;
        }
      });
      return onSuccess(arr, sumRecAmounts);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const postReceipt = async (
  info,
  inserted_by_id,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/receipt_payment/insert", {
      receipt_payment_type: "R",
      voucher_date: timestamp(info.txt_voucher_date),
      ledger_account_id: Number(info.ddl_ledger),
      mode: info.ddl_mode_label,
      bank_id: info.ddl_mode_label === "Bank" ? info.bank_id : 2867,
      reference_number: info.txt_reference,
      narration: info.txt_nar,
      amount: Number(info.txt_amount),
      adjustment_amount: 0,
      active_status: info.switch_status_btn ? "Y" : "N",
      inserted_by_id: inserted_by_id,
    });

    const data1 = await webApi.post("/master/ledger_storage/update", {
      amount: Number(info.txt_amount),
      ledgerId: Number(info.ddl_ledger),
      dr_cr: 2,
    });
    const data2 = await webApi.post("/master/ledger_storage/update", {
      amount: Number(info.txt_amount),
      ledgerId: info.ddl_mode_label === "Bank" ? info.bank_id : 2867,
      dr_cr: 1,
    });

    if (res.status === 200) {
      const r = res.data;
      onSuccess(r);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const postAdjReceipt = async (
  info,
  inserted_by_id,
  onSuccess,
  onFailure
) => {
  //console.log(inserted_by_id, "sen0505");
  try {
    const res = await webApi.post("/master/receipt_payment/insert", {
      receipt_payment_type: "BR",
      voucher_date: timestamp(info.txt_voucher_date),
      ledger_account_id: Number(info.ddl_ledger),
      mode: info.ddl_mode_label,
      bank_id: 2696,
      reference_number: info.txt_reference,
      narration: info.txt_nar,
      amount: Number(info.txt_amount),
      inserted_by_id: inserted_by_id,
      active_status: info.switch_status_btn ? "Y" : "N",
    });

    const data1 = await webApi.post("/master/ledger_storage/update", {
      amount: Number(info.txt_amount),
      ledgerId: Number(info.ddl_ledger),
      dr_cr: 1,
    });
    const data2 = await webApi.post("/master/ledger_storage/update", {
      amount: Number(info.txt_amount),
      ledgerId: info.ddl_mode_label === "Bank" ? info.bank_id : 2867,
      dr_cr: 2,
    });

    if (res.status === 200) {
      
      const r = res.data;
      onSuccess(r);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const updateReceipt = async (
  info,
  edited_by_id,
  onSuccess,
  onFailure
) => {
  //console.log(info, "sen050593");
  try {
    const res = await webApi.post("/master/receipt_payment/update", {
      receipt_payment_id: info.receipt_payment_id,
      voucher_no: info.txt_voucher_no,
      voucher_date: timestamp(info.txt_voucher_date),
      ledger_account_id: Number(info.ddl_ledger),
      bank_id: info.ddl_mode_label === "Bank" ? info.bank_id : 2867,
      mode: info.ddl_mode_label,
      reference_number: info.txt_reference,
      amount: info.txt_amount,
      // adjustment_amount: info.txt_adjamount,
      narration: info.txt_nar,
      edited_by_id: edited_by_id,
      active_status: info.switch_status_btn ? "Y" : "N",
    });

    const data1 = await webApi.post("/master/ledger_storage/update", {
      amount: Number(info.txt_amount),
      ledgerId: Number(info.ddl_ledger),
      dr_cr: 2,
    });

    const data2 = await webApi.post("/master/ledger_storage/update", {
      amount: Number(info.txt_amount),
      ledgerId: info.ddl_mode_label === "Bank" ? info.bank_id : 2867,
      dr_cr: 1,
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

export const updateReceiptAdj = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/receipt_payment/update", {
      receipt_payment_id: info.receipt_payment_id,
      voucher_no: info.txt_voucher_no,
      voucher_date: timestamp(info.txt_voucher_date),
      ledger_account_id: Number(info.ddl_ledger),
      mode: info.ddl_mode,
      reference_number: info.txt_reference,
      amount: info.txt_amount,
      // adjustment_amount: info.txt_adjamount,
      narration: info.txt_nar,
      active_status: info.switch_status_btn ? "Y" : "N",
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

export const deleteReceipt = async (
  receipt_paymentId,
  info,
  user_id,
  onSuccess,
  onFailure
) => {
  try {
    //console.log(info.recLedger, "sencheck")

    const res = await webApi.post("/master/receipt_payment/delete", {
      receipt_payment_id: receipt_paymentId,
      user_id: user_id,
    });

    const data1 = await webApi.post("/master/ledger_storage/update", {
      ledgerId: Number(info.recLedger),
      amount: Number(info.recAmount),
      dr_cr: 1,
    });
    const data2 = await webApi.post("/master/ledger_storage/update", {
      ledgerId: Number(info.bank_id),
      amount: Number(info.recAmount),
      dr_cr: 2,
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

export const getLedgerClosingBalanceReceipt = async (
  onSuccess,
  onFailure,
  q
) => {
  //console.log(q, "abc");

  try {
    //console.log(q.ddl_ledger_account.value, "dina ti");

    const res = await webApi.post("/master/ledger_account/balance", {
      from_date: timestamp(q.txt_from_date),
      to_date: timestamp(q.txt_to_date) + 86399,
      ledger_account_id: q.ddl_ledger_account?.value,
    });

    if (res.status === 200) {
      let r = res.data;
      let allItems = [];
      let inc = 0;

      if (r) {
        //console.log("AII2", r);
        let res = [
          {
            ...r[0],
            closing_balance:
              r[0]?.closing_balance >= 0
                ? r[0]?.closing_balance
                : -r[0]?.closing_balance,
            initial_dr_cr: r[0]?.dr_cr_status,
            //dr_cr_status: r[0]?.closing_balance > 0 ? "Dr" : "Cr" ,
            dr_cr_status: r[0]?.current_dr_cr,

            // dr_cr_status:r[0]?.dr_cr_status,
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

//substract stored data in ledger storage before edit
export const editLedgerStorage = async (query, onSuccess, onFailure) => {

  try {
    const data1 = await webApi.post("/master/ledger_storage/update", {
      amount: Number(query.recAmount),
      ledgerId: Number(query.recLedger),
      dr_cr: 1,
    });

    const data2 = await webApi.post("/master/ledger_storage/update", {
      amount: Number(query.recAmount),
      ledgerId: query.bank_id,
      dr_cr: 2,
    });

    if (data1.status === 200 && data2.status === 200) {
      onSuccess("Ledger storage Data Rectified")
    }
  } catch (error) {
    onFailure(error)
  }

}