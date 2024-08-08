import webApi from "./webApi/webApi";

export const getAllMenu = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/menu/list", {

    });
   
    if (res.status === 200) {
      const r = res.data;
      let allMenu = [];
      

      r.map((r, i) => {
        //console.log(r, "77b")
        allMenu.push({
          menu_serial_id: i + 1,
          menu_id: r.menu_id,
          parent_menu: r.parent_id,
          menu_link: r.link,
          sub_menu: r.subMenu_name,
          // menu_for: r.menu_for,
          action_items: r.action_items,
          menu_status: r.active_status,
          menu_action: "action",
        });
        //console.log(allMenu, "77b")
      });
  

      if (allMenu.length) {
        return onSuccess(allMenu);
      }
      else {
        onFailure("Menu  not found");
      }
    }

    else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const getListMenu = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/master/menu/list", {
      parent_id: q?.parent_id,
    });
   
    if (res.status === 200) {
      const r = res.data;
      let allMenu = [];
      

      r.map((r, i) => {
        //console.log(r, "77C")
        allMenu.push({
          value: r.menu_id,
          parent_id: r.parent_id,
          label: r.subMenu_name,
        });
        //console.log(allMenu, "77B")
      });
  

      if (allMenu.length) {
        return onSuccess(allMenu);
      }
      else {
        onFailure("Menu not found");
      }
    }

    else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postmenu = async (info, inserted_by_id, onSuccess, onFailure,) => {
  try {
    //console.log(info, "menufor")
    const res = await webApi.post("/master/menu/insert", {
      menu_id: info.menu_id,      
      subMenu_name: info.txt_sub_menu,
      parent_id: info.parent_id,
      link: info.txt_link,
      active_status: info.switch_active_status ? "Y" : "N",
      inserted_by_id: inserted_by_id,

    });
    if (res.status === 200) {
      //console.log(res,"qqq1")
      const r = res.data;
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const updateMenu = async (info, onSuccess, onFailure) => {
 
  try {
    // //console.log(info,"info")
    const res = await webApi.post("/master/menu/update", {
      menu_id: info.menu_id,
      subMenu_name: info.txt_sub_menu,
      // menu_for: info.ddl_menu_for?.value,
      link: info.txt_link,
      active_status: info.switch_active_status ? "Y" : "N",
    });
    if (res.status === 200) {
      // //console.log(res,"info1")
      const r = res.data;
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
export const deleteMenu = async (id, onSuccess, onFailure) => {
  try {
    //console.log(id,"id  ")
    const res = await webApi.post("/master/menu/delete", {
      menu_id: id,
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


