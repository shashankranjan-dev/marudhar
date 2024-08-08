import webApi from "./webApi/webApi";

export const getAllGroup = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/master_group/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allGroups = [];
      r.map((r, i) => {
        allGroups.push({
          id: i + 1,
          group_id: r.master_group_id,
          groupName: r.group,
          details: r.details,
          vendor_status: r.vendor_status,
          customer_status: r.customer_status,
          reference_status: r.reference_status,
          action_items: r.action_items,
          status: r.active_status,
          action: "action",
        });
      });
      return onSuccess(allGroups);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) { 
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postGroup = async (info, inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/master_group/insert", {
      group: info.txt_group_name,
      vendor_status: info.check_vendor ? "Y" : "N",
      reference_status: info.check_reference ? "Y" : "N",
      customer_status: info.check_customer ? "Y" : "N",
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

export const updateGroup = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/master_group/update", {
      master_group_id: info.group_id,
      group: info.txt_group_name,
      vendor_status: info.check_vendor ? "Y" : "N",
      reference_status: info.check_reference ? "Y" : "N",
      customer_status: info.check_customer ? "Y" : "N",
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
export const deleteGroup = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/master_group/delete", {
      master_group_id: id,
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

// for Dropdwon list
export const getListGroup = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/master_group/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allGroup = [];
      r.map((r, i) => {
        allGroup.push({
          value: r.group_id,
          label: r.group,
        });
      });
      return onSuccess(allGroup);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};