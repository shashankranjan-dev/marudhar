import webApi from "./webApi/webApi";
import {
  dateFormate,
  currencyFormate,
  currentDate,
} from "../views/Pages/HelperComponent/utils";
import { timestamp } from "../views/Pages/HelperComponent/utils";

export const getSearchPayment = async (onSuccess, onFailure, addSearch) => {
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
      let sumPayAmounts = 0;
      //console.log("sen=>>", r);
      r.map((r, i) => {
        if (r.receipt_payment_type === "P" || r.receipt_payment_type === "BP") {
          inc++;
          arr.push({
            payID: inc,
            bank_id: r.bank_id,
            receipt_payment_id: r.receipt_payment_id,
            payDate: dateFormate(r.voucher_date),
            payVoucherNo: r.voucher_no,
            payLedger: r.ledger_account_id,
            ledger_account_name: r.ledger_account_name,
            payMode: r.mode,
            payReference: r.reference_number,
            payNarration: r.narration,
            payAmount: r.amount,
            action_items: r.action_items,
            payAction: "action",
          });
          sumPayAmounts += r.amount;
        }
      });
      return onSuccess(arr, sumPayAmounts);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllPayment = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/receipt_payment/list", {});
    if (res.status === 200) {
      const r = res.data;
      let arr = [];
      let inc = 0;
      let sumPayAmounts = 0;
      r.map((r, i) => {
        if (r.receipt_payment_type === "P") {
          inc++;
          arr.push({
            payID: inc,
            receipt_payment_id: r.receipt_payment_id,
            payDate: dateFormate(r.voucher_date),
            payVoucherNo: r.voucher_no,
            payLedger: r.ledger_account_id,
            ledger_account_name: r.ledger_account_name,
            payMode: r.mode,
            payReference: r.reference_number,
            payNarration: r.narration,
            payAmount: currencyFormate(r.amount),
            action_items: r.action_items,
            payAction: "action",
          });
          sumPayAmounts += r.amount;
        }
      });
      return onSuccess(arr, sumPayAmounts);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const postPayment = async (
  info,
  inserted_by_id,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/receipt_payment/insert", {
      receipt_payment_type: "P",
      voucher_date: timestamp(info.txt_voucher_date),
      ledger_account_id: Number(info.ddl_ledger),
      mode: info.ddl_mode_label,
      bank_id: info.ddl_mode_label === "Bank" ? info.bank_id : 2867,
      reference_number: info.txt_reference,
      narration: info.txt_nar,
      amount: info.txt_amount,
      adjustment_amount: 0,
      inserted_by_id: inserted_by_id,
      active_status: info.switch_status_btn ? "Y" : "N",
    });


    if (res.status === 200) {
      const r = res.data;

    //update closing balance in ledgerstorage table

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

      onSuccess(r);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const postPaymentAdj = async (
  info,
  inserted_by_id,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/receipt_payment/insert", {
      receipt_payment_type: "BP",
      voucher_date: timestamp(info.txt_voucher_date),
      ledger_account_id: Number(info.ddl_ledger),
      mode: info.ddl_mode.label,
      bank_id: 2696,
      reference_number: info.txt_reference,
      narration: info.txt_nar,
      amount: info.txt_adjamount,
      inserted_by_id: inserted_by_id,
      // adjustment_amount: info.txt_adjamount,
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
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const updatePayment = async (
  info,
  edited_by_id,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/receipt_payment/update", {
      receipt_payment_id: info.receipt_payment_id,
      voucher_date: timestamp(info.txt_voucher_date),
      voucher_no: info.txt_voucher_no,
      ledger_account_id: Number(info.ddl_ledger),
      mode: info.ddl_mode,
      reference_number: info.txt_reference,
      amount: info.txt_amount,
      // adjustment_amount: info.txt_adjamount,
      narration: info.txt_nar,
      edited_by_id: edited_by_id,
      bank_id: info.ddl_mode_label === "Bank" ? info.bank_id : 2867,
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
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const deletePayment = async (
  receipt_paymentId,
  info,
  user_id,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/receipt_payment/delete", {
      receipt_payment_id: receipt_paymentId,
      user_id:user_id,
    });

    const data1 = await webApi.post("/master/ledger_storage/update", {
      ledgerId: Number(info.payLedger),
      amount: Number(info.payAmount),
      dr_cr: 2,
    });
    const data2 = await webApi.post("/master/ledger_storage/update", {
      ledgerId: Number(info.bank_id),
      amount: Number(info.payAmount),
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

export const getLedgerClosingBalance = async (onSuccess, onFailure, q) => {
  //console.log(q, "abc");

  try {
    //console.log(q.ddl_ledger_account.value, "dina ti");

    const res = await webApi.post("/master/ledger_account/balance", {
      from_date: timestamp(q.txt_from_date),
      to_date: timestamp(currentDate(1)),
      ledger_account_id: q.ddl_ledger_account?.value,
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
              r[0]?.closing_balance >= 0
                ? r[0]?.closing_balance
                : -r[0]?.closing_balance,
            initial_dr_cr: r[0]?.dr_cr_status,
            // dr_cr_status: r[0]?.closing_balance > 0 ? "Dr" : "Cr" ,
            dr_cr_status: r[0]?.current_dr_cr,
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
      amount: Number(query.payAmount),
      ledgerId: Number(query.payLedger),
      dr_cr: 2,
    });

    const data2 = await webApi.post("/master/ledger_storage/update", {
      amount: Number(query.payAmount),
      ledgerId: query.bank_id,
      dr_cr: 1,
    });

    if (data1.status === 200 && data2.status === 200) {
      onSuccess("Ledger storage Data Rectified")
    }
  } catch (error) {
    onFailure(error)
  }

}