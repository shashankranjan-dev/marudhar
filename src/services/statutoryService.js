import webApi from "./webApi/webApi";

export const getAllStatutory = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/statutory/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allStatutorys = [];
      r.map((r, i) => {
        allStatutorys.push({
          stu_id: i + 1,
          statutory_type_id: r.statutory_type_id,
          stu_statutoryType: r.statutory_type,
          stu_details: r.details,
          action_items: r.action_items,
          stu_status: r.active_status,
          stu_action: "action",
        });
      });
      return onSuccess(allStatutorys);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postStatutory = async (info,inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/statutory_type/insert", {
      statutory_type: info.txt_statutory,
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

export const updateStatutory = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/statutory_type/update", {
      statutory_type_id: info.statutory_type_id,
      statutory_type: info.txt_statutory,
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

export const deleteStatutory = async (id, onSuccess, onFailure) => {
  // console.log(id)
  try {
    const res = await webApi.post("/master/statutory_type/delete", {
      statutory_type_id: id,
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
