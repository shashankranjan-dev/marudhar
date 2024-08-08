import webApi from "./webApi/webApi";
export const getAllReference = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/reference/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allReferences = [];
      r.map((r, i) => {
        allReferences.push({
          ref_id: i + 1,
          reference_id: r.reference_id,
          ref_name: r.name,
          ref_mobile: r.mobile,
          ref_whatsapp: r.mobile,
          ref_email: r.email,
          action_items: r.action_items,
          ref_status: r.active_status,
          ref_action: "action",
        });
      });
      return onSuccess(allReferences);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postReferences = async (info, inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/reference/insert", {
      
      reference_type: "email",
      name: info.txt_name,
      mobile: info.txt_mobile,
      whatsapp: info.txt_whatsapp,
      email: info.txt_email,
      note: info.txt_note,
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

export const updateReferences = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/reference/update", {
      reference_id: info.reference_id,
      reference_type: "email",
      name: info.txt_name,
      mobile: info.txt_mobile,
      whatsapp: info.txt_whatsapp,
      email: info.txt_email,
      note: info.txt_details,
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
export const deleteReferences = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/reference/delete", {
      reference_id: id,
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

export const getListReference = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/reference/list", {
   
    });
    if (res.status === 200) {
      const r = res.data;
      
      let arr = [];
      r.map((r, i) => {
        arr.push({
          value: r.reference_id,
          label: r.name,
        });
      });
      return onSuccess(arr);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }

  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};