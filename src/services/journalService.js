import webApi from "./webApi/webApi";
import { dateFormate } from "views/Pages/HelperComponent/utils";
import { timestamp } from "./Utils/utils";
import { currencyFormate } from "views/Pages/HelperComponent/utils";

export const getAllJournal = async (onSuccess, onFailure, q) => {
  try {
    // //console.log(q?.ddl_ledger.label, "s1s")
    const res = await webApi.post("/master/journal/list", {
      ledger_name: q?.ddl_ledger.label,
      voucher_no: q.txt_voucher_no,

      from_date: timestamp(q.txt_from_date),
      to_date: timestamp(q.txt_to_date),
    });
    if (res.status === 200) {
      const r = res.data;
      let allJournal = [];
      let sumJournalAmt = 0;
      r.map((r, i) => {
        allJournal.push({
          jorID: i + 1,
          journal_id: r.journal_id,
          jorDate: dateFormate(r.voucher_date),
          jorNo: r.voucher_no,

          // jorMode: r.mode,
          // jorReference: r.reference_number,
          jorNarration: r.narration,

          jorAmount: r.voucher_amount,
          jorAction: "view-action",
          menu: [
            {
              label: "View",
              link: "#",
            },
            {
              label: "Edit",
              itemEdit: true,
              link: "/admin/account/edit-journal",
            },
          ]
        });
        sumJournalAmt += r.voucher_amount;
      });
      return onSuccess(allJournal, sumJournalAmt);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const updateJournal = async (
  journal,
  journalDetails,
  tempDetails,
  narration,
  DrTotal,
  edited_by_id,
  onSuccess,
  onFailure) => {
  try {
    // //console.log(,"sen1234fff")
    // //console.log(journal,"sen1234fff")

    const res = await webApi.post("/master/journal/update", {
      journal_id: journal.journal_id,
      narration: narration,
      journal_details: journalDetails,
      voucher_amount: journalDetails[0]?.amount,
      edited_by_id: edited_by_id,
      active_status: narration.switch_status_btn ? "Y" : "N",
    });

    // //console.log(tempDetails, "ceheck", journalDetails)

    tempDetails.map(async (t) => {
      const data = await webApi.post("/master/ledger_storage/update",
        {
          amount: t.amount,
          ledgerId: t.ddl_ledger_id,
          dr_cr: t.dr_cr === 1 ? 2 : 1,
        })
      // .then(()=>{
      // })
    })
    journalDetails.map(async (r) => {
      const data = await webApi.post("/master/ledger_storage/update",
        {
          amount: r.amount,
          ledgerId: r.ddl_ledger_id,
          dr_cr: r.dr_cr,
        })
    })

    if (res.status === 200) {
      const r = res.data;
      onSuccess(r);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const postJournal = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/journal/insert", {
      receipt_payment_type: "J",
      voucher_date: info.txt_voucher_date,
      voucher_no: info.txt_voucher_no,
      ledger_account_id: info.ddl_ledger,
      mode: info.ddl_mode,
      reference_number: info.txt_reference,
      narration: info.txt_narration,
      amount: info.txt_amount,
      active_status: info.switch_status_btn ? "Y" : "N",
    });
    if (res.status === 200) {
      const r = res.data;
      onSuccess(r);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

//For getting journal
export const getJournalByJournalId = async (id, edited_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/journal/list", {
      journal_id: id,
    });
    //console.log("Journal", id);
    if (res.status === 200) {
      const r = res.data;
      let IdJournal = [];
      r.map((r, i) =>
        IdJournal.push({
          journal_id: r.journal_id,
          voucher_no: r.voucher_no,
          narration: r.narration,
          journal_details: r.journal_details,
          edited_by_id: edited_by_id,

        })
      )
      return onSuccess(IdJournal[0]);
    }
    else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// For Search Journal

export const getSearchJournal = async (onSuccess, onFailure, q) => {

  // let customMenu;
  // customMenu = [

  //   {
  //     label: "View",
  //     clickBtn: true
  //   },
  //   {
  //     label: "Edit",
  //     link: "/admin/account/edit-journal",
  //     itemEdit: true,

  //   },
  //   {
  //     label: "Delete",
  //     clickBtn: true
  //   },

  // ]
  try {
    //console.log(q.ddl_ledger?.label, "ss")

    const res = await webApi.post("/master/journal/list", {
      voucher_no: q.txt_voucher_no,
      from_date: timestamp(q.txt_from_date),
      to_date: timestamp(q.txt_to_date),
      ledger_name: q.ddl_ledger?.label,
      transaction_id: q.transaction_id,

      // voucher_type:,
      // group_id:q.group_id,

    });
    if (res.status === 200) {
      const r = res.data
      let allItems = [];
      let inc = 0;
      let sumJournalAmt = 0;

      r.map((r, i) => {
        const transactionType = r.transaction_type;
  const isEditable = !["Sales", "Purchase", "Direct Purchase", "Sales Return", "Purchase Return"].includes(transactionType);

  const editMenuItem = isEditable ? {
    label: "Edit",
    link: "/admin/account/edit-journal",
    itemEdit: true,
  } : null;
  const deleteMenuItem = isEditable ? {
    label: "Delete",
    clickBtn: true
    
  } : null;

        allItems.push({
          ledID: i + 1,
          // voucher_type: r.ddl_ledger,
          journal_id: r.journal_id,
          ledVoucherNo: r.voucher_no,
          ledDate: dateFormate(r.voucher_date),
          ledVoucherType: "JOURNAL",
          ledJournal: r.journal_details[0].ddl_ledger,
          ledNarration: r.narration,
          ledAmount: (r.voucher_amount),
          ledAction: "view-action",
          transaction_id: r.transaction_id,
          menu: [
            {
              label: "View",
              clickBtn: true
            },
            editMenuItem,
            deleteMenuItem
          ].filter(Boolean),
          journal_details: r.journal_details,
        });

        sumJournalAmt += r.voucher_amount;
      });

      if (allItems.length) {

        return onSuccess(allItems, sumJournalAmt);
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

export const deleteJournal = async (info, user_id, onSuccess, onFailure) => {
  try {

    const res = await webApi.post("/master/journal/delete", {
      journal_id: info.journal_id,
      user_id: user_id
    });

    info.journal_details.map(async (r) => {
      const data = await webApi.post("/master/ledger_storage/update",
        {
          amount: r.amount,
          ledgerId: r.ddl_ledger_id,
          dr_cr: r.dr_cr === 1 ? 2 : 1,
        })
    })
    if (res.status === 200) {
      //console.log("========>>>", res.data)
      onSuccess("Done")
    }
    else {
      onFailure("Errors")

    }
  } catch (error) {
    onFailure("Errors")

  }
}