import webApi from "./webApi/webApi";

export const getAllBank = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/bank/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allBanks = [];
      r.map((r, i) => {
        allBanks.push({
          b_id: i + 1,
          bank_id: r.bank_id,
          b_bank_name: r.bank_name,
          b_details: r.details,
          action_items: r.action_items,
          b_status: r.active_status,
          b_action: "action",
        });
      });
      return onSuccess(allBanks);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postBank = async (info, inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/bank/insert", {
      bank_name: info.txt_bank_name,
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

export const updateBank = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/bank/update", {
      bank_id: info.bank_id,
      bank_name: info.txt_bank_name,
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
export const deleteBank = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/bank/delete", {
      bank_id: id,
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

export const getListBank = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/bank/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allBanks = [];
      r.map((r, i) => {
        allBanks.push({
          value: r.bank_id,
          label: r.bank_name,
        });
      });
      return onSuccess(allBanks);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};
