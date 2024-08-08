import webApi from "./webApi/webApi";
export const getAllStatus = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/status/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allStatus = [];
      r.map((r, i) => {
        allStatus.push({
          status_serial_id: i + 1,
          status_id: r.status_id,
          status_name: r.status_name,
          status_details: r.details,
          status_for: r.status_for,
          status_color: r.status_color,
          action_items: r.action_items,
          status_status: r.active_status,
          status_action: "action",
        });
      });
      return onSuccess(allStatus);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postStatus = async (info, inserted_by_id,onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/status/insert", {
      status_name: info.txt_status_name,
      status_color: info.txt_status_color,
      status_for: info.ddl_status_for?.value,
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

export const updateStatus = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/status/update", {
      status_id: info.status_id,
      status_name: info.txt_status_name,
      status_color: info.txt_status_color,
      status_for: info.ddl_status_for?.value,
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
export const deleteStatus = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/status/delete", {
      status_id: id,
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

export const getListStatus = async (statusFor, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/status/list", {});
    if (res.status === 200) {
      const r = res.data;
      let arr = [];
      // console.log("lau", r);
      r.map((r, i) => {
        if (statusFor === "" ||  r.status_for.indexOf(statusFor)> -1){
          arr.push({
            value: r.status_id,
            label: r.status_name,
            status_color: r.status_color,
            status_for: r.status_for,
          });
        }
      });
      return onSuccess(arr);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};
