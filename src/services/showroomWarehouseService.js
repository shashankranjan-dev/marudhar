import webApi from "./webApi/webApi";

function toTitleCase(str) {
  if(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  else {
    return "";
  }
  
}





export const getAllShowroomWarehouse = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/showrooms-warehouse/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allShowroomWarehouses = [];
      r.map((r, i) => {
        allShowroomWarehouses.push({
          sw_id: i + 1,
          showrooms_warehouse_id: r.showrooms_warehouse_id,
          sw_type: r.showrooms_warehouse_type,
          sw_name: r.showrooms_warehouse,
          sw_gst: r.gst,
          sw_address: r.address,
          action_items: r.action_items,
          sw_status: r.active_status,
          sw_action: "action",
        });
      });
      return onSuccess(allShowroomWarehouses);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postShowroomsWarehouse = async (info, inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/showrooms-warehouse/insert", {
      showrooms_warehouse_type: info.ddl_showrooms_warehouse_type,
      showrooms_warehouse: info.txt_showrooms_warehouse,
      gst: info.txt_gst,
      address: info.txt_address,
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

export const updateShowroomsWarehouse = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/showrooms-warehouse/update", {
      showrooms_warehouse_id: info.showrooms_warehouse_id,
      showrooms_warehouse_type: info.ddl_showrooms_warehouse_type,
      showrooms_warehouse: info.txt_showrooms_warehouse,
      gst: info.txt_gst,
      address: info.txt_address,
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
export const deleteShowroomsWarehouse = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/showrooms-warehouse/delete", {
      showrooms_warehouse_id: id,
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

export const getListShowroomWarehouse = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/showrooms-warehouse/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allShowroomWarehouse = [];
      r.map((r) => {
        allShowroomWarehouse.push({
          value: r.showrooms_warehouse_id,
          label: toTitleCase (r.showrooms_warehouse),
          address: r.address,
        });
      });
      onSuccess(allShowroomWarehouse);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
