//Role
import webApi from "./webApi/webApi";
export const getAllRole = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/role/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allRoles = [];
      r.map((r, i) => {
        allRoles.push({
        
          rolee_id: i + 1,
          role_id:r.role_id,
          role_role: r.role,
          role_details: r.details,
          action_items: r.action_items,
          role_status: r.active_status,
          role_action: "action",
        });
      });
      return onSuccess(allRoles);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postRole = async (role,inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/role/insert", {
      role: role.txt_role,
      details: role.txt_details,
      active_status: role.switch_active_btn ? "Y" : "N",
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

export const updateRole = async (role, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/role/update", {
      role_id: role.role_id,
      role: role.txt_role,
      details: role.txt_details,
      active_status: role.switch_active_btn ? "Y" : "N",
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
export const deleteRole = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/role/delete", {
        role_id: id,
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


export const getListRole = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/role/list", {
   
    });
    if (res.status === 200) {
      const r = res.data;
      
      let arr = [];
      r.map((r, i) => {
        arr.push({
          value: r.role_id,
          label: r.role,
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