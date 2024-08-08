import webApi from "../webApi/webApi";

export const getAllPrimaryGroup = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/primary_group/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allPrimaryGroup = [];
      r.map((r, i) => {
        allPrimaryGroup.push({
          primary_group_serial: i + 1,
          primary_group_id: r.primary_group_id,
          primary_group_name: r.primary_group,
          primary_group_nature: r.nature_name,
          primary_group_details: r.details,
          primary_group_status: r.active_status,
          action_items: r.action_items,
          primary_group_action: "action",
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

export const postPrimaryGroup = async (info,inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/primary_group/insert", {
      primary_group: info.txt_primary_group,
      nature: info.ddl_nature?.value,
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

export const updatePrimaryGroup = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/primary_group/update", {
      primary_group_id: info.primary_group_id,
      primary_group: info.txt_primary_group,
      nature: info.ddl_nature?.value,
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
export const deletePrimaryGroup = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/primary_group/delete", {
      primary_group_id: id,
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
