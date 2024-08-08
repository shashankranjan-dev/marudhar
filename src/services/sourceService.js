import webApi from "./webApi/webApi";
export const getAllSource = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/source/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allSources = [];
      r.map((r, i) => {
        allSources.push({
          sou_id: i + 1,
          source_id: r.source_id,
          sou_source: r.source,
          sou_details: r.details,
          action_items: r.action_items,
          sou_status: r.active_status,
          sou_action: "action",
        });
      });
      return onSuccess(allSources);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postSource = async (source,inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/source/insert", {
      source: source.txt_source,
      details: source.txt_details,
      active_status: source.switch_active_btn ? "Y" : "N",
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

export const updateSource = async (source, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/source/update", {
      source_id: source.source_id,
      source: source.txt_source,
      details: source.txt_details,
      active_status: source.switch_active_btn ? "Y" : "N",
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
export const deleteSource = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/source/delete", {
      source_id: id,
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


export const getListSources = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/source/list", {
   
    });
    if (res.status === 200) {
      const r = res.data;
      
      let arr = [];
      r.map((r, i) => {
        arr.push({
          value: r.source_id,
          label: r.source,
        });
      });
      return onSuccess(arr);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }

  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};
