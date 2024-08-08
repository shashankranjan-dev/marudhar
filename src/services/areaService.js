import webApi from "./webApi/webApi";

 export const postArea = async (info,inserted_by_id, onSuccess, onFailure) => {
    try {
     
      const res = await webApi.post("/master/area/insert", {
        area: info.txt_area,

        active_status: info.switch_active_status ? "Y" : "N",
        inserted_by_id:inserted_by_id,
      });
  
      if (res.status === 200) {
        const r = res.data;
        // console.log(r,"r form service")
        onSuccess(r);
      } else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    } catch (error) {
      // onFailure("Something Wrong! Please Try again later " + error);
    }
  };

export const getAllArea = async (onSuccess, onFailure) => {
    try {
  
      const res = await webApi.post("/master/area/list", {
  
      });
      if 
      (res.status === 200)
       {
        const r = res.data;
        //  console.log(r,"list")
  
        let all_areas = [];
        r.map((r, i) => {
          all_areas.push({
            id: i + 1,
            area_id:r.area_id,
            area: r.area,
            area_no: r.area_no,
            contact_person: r.contact_person,
            contact_no: r.contact_no,
            details: r.details,
            status: r.active_status,
            action_items: r.action_items,
            action: "action",
          });
        });
        return onSuccess(all_areas);
      } else {
        onFailure("Something Wrong! Please Try again later" + res.data);
      }
    } catch (error) {
      onFailure("Something Wrong! Please Try again later" + error);
    }
  };



  //dispatch area by id
  export const getareaById = async (onSuccess, onFailure) => {
    try {
      const res = await webApi.post("/master/area/list", {
        group_id: 26
      });
      if (res.status === 200) {
        const r = res.data;
        let allarea = [];
        r.map((r, i) => {
          allarea.push({
  
            value: r.area_id,
            label: r.area_no,
          });
        });
        
        return onSuccess(allarea);
      } else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    } catch (error) {
      onFailure("Something Wrong! Please Try again later " + error);
    }
  };



  export const deleteArea = async (id, onSuccess, onFailure) => {
    try {
      const res = await webApi.post("/master/area/delete", {
        area_id: id,
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



  export const updateArea = async (info, onSuccess, onFailure) => {
    // console.log(info,"from v service")
    try {
      const res = await webApi.post("/master/area/update", {
        area_id: info.area_id,
        area: info.txt_area,
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