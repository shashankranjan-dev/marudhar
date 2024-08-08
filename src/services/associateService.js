import { ArrowUpwardTwoTone } from "@mui/icons-material";
import webApi from "./webApi/webApi";
import axios from "axios";

export const getAllUsers = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/users/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allUser = [];
      r.map((r, i) => {
        allUser.push({
          id: i + 1,
          user_id: r.user_id,
          name: r.name,
          email: r.email,
          role_id: r.role_id,
          role_name: r.role_name,
          mobile: r.mobile,
          showroom_warehouse_id: r.showroom_warehouse_id,
          accessible_menus: r.accessible_menus,
          password: r.password,
          weekDays:r.weekDays,
          status: r.active_status,
          action_items: r.item_action,
          action: "view-action",
          menu: [
            {
              label: "Edit",
              clickBtn: true,
            },
            // {
            //   label: "Delete",
            //   clickBtn: true,
            // },
            {
              label: "Grant Permission",
              modelName: "grantPermission",
              clickBtn: true,
            },
          ],
        });
      });
      return onSuccess(allUser);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllRole = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/role/list", {
      short_data: true,
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
export const postUser = async (
  showroomWarehouseId,
  info,
  inserted_by_id,
  accessTime,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/users/insert", {
      name: info.txt_name,
      email: info.txt_email,
      password: info.txt_password,
      showroom_warehouse_id: showroomWarehouseId,
      mobile: info.txt_mobile,
      role_id: info.ddl_role_id,
      role:info.ddl_role_label,
      inserted_by_id:inserted_by_id,
      weekDays:accessTime,
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

export const updateUser = async (
  showroomWarehouseId,
  info,
  accessTime,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/users/update", {
      user_id: info.user_id,
      name: info.txt_name,
      mobile: info.txt_mobile,
      password: info.txt_password,
      email: info.txt_email,
      weekDays:accessTime,
      showroom_warehouse_id: showroomWarehouseId,
      role_id: info.ddl_role_id,
      active_status: info.switch_active_status ===true ? "Y" : "N",
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


export const updateConfirmUser = async (
  
  txt_confirm_password,user_id,
  onSuccess,
  onFailure
) => {
  try {
    
    // console.log(txt_confirm_password,"info.txt_confirm_password")
    // console.log(user_id,"info")
    const res = await webApi.post("/master/users/update", {
      user_id: user_id,
      // new_password: info.txt_new_password,
      // old_password: info.txt_old_password,
      password: txt_confirm_password,

    
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

export const updateUserMenuAccess = async (
  accessMenu,
  info,
  onSuccess,
  onFailure
) => {
  try {
    // console.log("datata", accessMenu);
    const res = await webApi.post("/master/users/update", {
      user_id: info.user_id,
      name: info.txt_name,
      mobile: info.txt_mobile,
      email: info.txt_email,
      //showroom_warehouse_id: showroomWarehouseId,
      role_id: info.ddl_role_id,
      accessible_menus: accessMenu,
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

export const updateUserAccess = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/users/update", {
      user_id: info.user_id,
      showroom_warehouse_id: info.showroomWarehouseId,
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



export const deleteUser = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/users/delete", {
      user_id: id,
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

export const getListUsers = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/users/list", { short_data: true });
    if (res.status === 200) {
      const r = res.data;
      let allUser = [];
      r.map((r, i) => {
        allUser.push({
          value: r.user_id,
          label: r.name,
        });
      });
      return onSuccess(allUser);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
