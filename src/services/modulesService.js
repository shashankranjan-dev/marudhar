import webApi from "./webApi/webApi";
export const getAllModule = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/module/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allModules = [];
      r.map((r, i) => {
        //console.log(r,"sank22081")
        allModules.push({
          mod_id: i + 1,
          module_id: r.module_id,
          mod_modules: r.module,
          mod_details: r.details,
          action_items: r.action_items,
          mod_status: r.active_status,
          mod_action: "action",
        });
      });
      return onSuccess(allModules);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postModule = async (module, inserted_by_id ,onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/module/insert", {
      module: module.txt_module,
      details: module.txt_details,
      active_status: module.switch_active_btn ? "Y" : "N",
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

export const updateModule = async (module, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/module/update", {
      module_id: module.module_id,
      module: module.txt_module,
      details: module.txt_details,
      active_status: module.switch_active_btn ? "Y" : "N",
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
export const deleteModule = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/module/delete", {
      module_id: id,
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
