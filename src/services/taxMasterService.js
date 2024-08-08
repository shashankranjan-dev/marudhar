import webApi from "./webApi/webApi";
export const getAllTaxMaster = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/tax_master/list", {});
    if (res.status === 200) {
      const data = res.data;
      let alltaxMaster = [];
      data.map((r, i) => {
        alltaxMaster.push({
          id: i + 1,
          tax_master_id: r.tax_master_id,
          taxMaster: r.tax_master,
          percentage: r.tax_percentage,
          details: r.details,
          ledgerAccount: r.ledger_account_id,
          ledgerAccountName: r.ledger_account_name,
          action_items: r.action_items,
          status: r.active_status,
          action: "action",
        });
      });
      return onSuccess(alltaxMaster);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const getAllLedgerAccount = async (onSuccess,onFailure,q ) => {
  try {


    const res = await webApi.post("/master/ledger_account/list", {
      ledger_account_id: q?.ddl_ledger_account_id,
    });
    //console.log( "Sibam", (q));

    if (res.status === 200) {
      const r = res.data;
      let allLedgerAcc = [];
      let allLedgerAccOpt = [];
      r.map((r, i) => {
        // console.log( r.ledger_account_id)
        // console.log( "r.ledger_account_i")

        allLedgerAcc.push({
          id: i + 1,
          ledger_account_id: r.ledger_account_id,
          ledger_account: r.ledger_account,
          ledger_group_id: r.ledger_group_id,
          alias: r.alias,
          active_status: r.active_status,
          dr_cr_status: r.dr_cr_status,
          credit_limit: r.credit_limit,
          opening_balance: r.opening_balance,
          closing_balance: 0,
        });

        allLedgerAccOpt.push({
          value: r.ledger_account_id,
          label: r.ledger_account,
        });
      });
      return onSuccess(allLedgerAcc, allLedgerAccOpt);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postTaxMaster = async (info,inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/tax_master/insert", {
      tax_master: info.txt_tax_master,
      tax_percentage: info.txt_percentage,
      ledger_account_id: info.ddl_ledger_account,
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

export const updateTaxMaster = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/tax_master/update", {
      tax_master_id: info.tax_master_id,
      tax_master: info.txt_tax_master,
      tax_percentage: info.txt_percentage,
      ledger_account_id: info.ddl_ledger_account,
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
export const deleteTaxMaster = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/tax_master/delete", {
      tax_master_id: id,
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
