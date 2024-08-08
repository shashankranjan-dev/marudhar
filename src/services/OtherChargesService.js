import InfoArea from "components/InfoArea/InfoArea";
import webApi from "./webApi/webApi";
export const getAllOtherCharges = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/charges/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allTerms = [];
      r.map((r, i) => {
        allTerms.push({
          id: i + 1,
          other_charges_id: r.charges_id,
          ledgerAccount: r.ledger_account_id,
          ledgerAccountName: r.ledger_account_name,
          charges: r.charges,
          sacCode: r.sac_code,
          details: r.details,
          action_items: r.action_items,
          status: r.active_status,
          action: "action",
        });
      });
      return onSuccess(allTerms);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postOtherCharges = async (info,inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/charges/insert", {
      ledger_account_id: info.ddl_ledger_account_id
        ? info.ddl_ledger_account_id
        : 0,
      charges: info.txt_charges,
      sac_code: info.txt_sac_code,
      details: info.txt_details,
      active_status: info.switch_active_status ? "Y" : "N",
      inserted_by_id:inserted_by_id,
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

export const updateOtherCharges = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/charges/update", {
      charges_id: info.other_charges_id,
      ledger_account_id: info.ddl_ledger_account_id
        ? info.ddl_ledger_account_id
        : 0,
      charges: info.txt_charges,
      sac_code: info.txt_sac_code,
      details: info.txt_details,
      active_status: info.switch_active_status ? "Y" : "N",
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
export const deleteOtherCharges = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/charges/delete", {
      charges_id: id,
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
