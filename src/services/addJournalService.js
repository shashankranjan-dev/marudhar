import webApi from "./webApi/webApi";
import { timestamp } from "../views/Pages/HelperComponent/utils";

export const postJournal = async (journal, narration, journal_date, voucher_amount,inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/journal/insert", {
      journal_type: "J",
      narration: narration,
      voucher_amount: voucher_amount,
      voucher_date: timestamp(journal_date),
      journal_details: journal,
      active_status: journal.switch_active_btn ? "Y" : "N",
      inserted_by_id:inserted_by_id,
    
      
    });

    journal.map(async (r) => {
      const data = await webApi.post("/master/ledger_storage/update",
        {
          amount: r.amount,
          ledgerId: r.ddl_ledger_id,
          dr_cr: r.dr_cr,
        })
    })
    
    if (res.status === 200) {
      //console.log("clicked");
      const r = res.data;
      onSuccess(r);
    } else {
      // console.log("Something Wrong!");
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
