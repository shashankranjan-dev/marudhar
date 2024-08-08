import webApi from "./webApi/webApi";
export const getAllTerm = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/terms/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allTerms = [];
      r.map((r, i) => {
        // console.log(r,"sank22082")
        allTerms.push({
          id: i + 1,
          terms_id: r.terms_id,
          modules_id: r.module_id,
          modules_name: r.module_name,
          terms: r.terms,
          details: r.condition,
          status: r.active_status,
          action_items: r.action_items,
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

export const postTerms = async (info,inserted_by_id,onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/terms/insert", {
      terms: info.txt_terms,
      module_id: info.ddl_modules_id,
      condition: info.txt_details,
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

export const updateTerms = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/terms/update", {
      terms_id: info.terms_id,
      terms: info.txt_terms,
      module_id: info.ddl_modules_id ,
      condition: info.txt_details,
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













export const deleteTerms = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/terms/delete", {
      terms_id: id,
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
