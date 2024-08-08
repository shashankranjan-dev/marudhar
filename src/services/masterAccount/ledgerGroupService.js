import webApi from "../webApi/webApi";

export const getAllLedgerGroup = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/ledger_group/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allledgerGroup = [];
      r.map((r, i) => {
        allledgerGroup.push({
          id: i + 1,
          ledger_group_id: r.ledger_group_id,
          primaryGroup: r.primary_group_id,
          primaryGroupName: r.primary_group_name,
          ledgerGroup: r.ledger_group,
          accountNature: r.account_nature_id,
          accountNatureName: r.account_nature_name,
          alias: r.alias,
          sequence: r.sequence,
          status: r.active_status,
          subGroupStatus: r.sub_group_status,
          action_items: r.action_items,
          action: "action",
        });
      });
      return onSuccess(allledgerGroup);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllPrimaryGroup = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/primary_group/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allPrimaryGroup = [];
      r.map((r, i) => {
        allPrimaryGroup.push({
          value: r.primary_group_id,
          label: r.primary_group,
        });
      });
      return onSuccess(allPrimaryGroup);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const postLedgerGroup = async (info,inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/ledger_group/insert", {
      primary_group_id: info.ddl_primary_group_id
        ? info.ddl_primary_group_id
        : 0,
      account_nature_id: info.ddl_account_nature_id
        ? info.ddl_account_nature_id
        : 0,
      account_nature_name: info.ddl_account_nature_label,
      ledger_group: info.txt_ledger_group,
      alias: info.txt_alias,
      sub_group_status: info.switch_sub_group_status ? "Y" : "N",
      sequence: info.ddl_sequence_id,
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

export const updateLedgerGroup = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/ledger_group/update", {
      ledger_group_id: info.ledger_group_id,
      primary_group_id: info.ddl_primary_group_id
        ? info.ddl_primary_group_id
        : 0,
      account_nature_id: info.ddl_account_nature_id
        ? info.ddl_account_nature_id
        : 0,
      account_nature_name: info.ddl_account_nature_label,
      ledger_group: info.txt_ledger_group,
      alias: info.txt_alias,
      sub_group_status: info.switch_sub_group_status ? "Y" : "N",
      sequence: info.ddl_sequence_id,
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

export const deleteLedgerGroup = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/ledger_group/delete", {
      ledger_group_id: id,
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
