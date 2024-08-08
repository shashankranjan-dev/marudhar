import webApi from "./webApi/webApi";

 export const postVehicles = async (info,inserted_by_id, onSuccess, onFailure) => {
    try {
        //console.log(info.txt_vehicle,"info")
      const res = await webApi.post("/master/vehicle/insert", {
        vehicle_no: info.txt_vehicle,
        vehicle_type: info.ddl_vehicle_type,
        contact_person: info.txt_contact_person,
        contact_no: info.txt_contact_no,
        details: info.txt_details,
        active_status: info.switch_active_status ? "Y" : "N",
        inserted_by_id:inserted_by_id,
      });
  
      if (res.status === 200) {
        const r = res.data;
        //console.log(r,"r form service")
        onSuccess(r);
      } else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    } catch (error) {
      // onFailure("Something Wrong! Please Try again later " + error);
    }
  };




export const getAllVehicle = async (onSuccess, onFailure,q) => {
    try {
  //console.log(q?.txt_keyword_pharse,"WB42AB1001")
      const res = await webApi.post("/master/vehicle/list", {
        keyword_pharse: q?.txt_keyword_pharse,
  
      });
      if 
      (res.status === 200)
       {
        const r = res.data;
         //console.log(r,"list")
  
        let all_vehicles = [];
        r.map((r, i) => {
          all_vehicles.push({
            id: i + 1,
            vehicle_id:r.vehicle_id,
            vehicle_type: r.vehicle_type,
            vehicle_no: r.vehicle_no,
            contact_person: r.contact_person,
            contact_no: r.contact_no,
            details: r.details,
            status: r.active_status,
            action_items: r.action_items,
            action: "action",
          });
        });
        return onSuccess(all_vehicles);
      } else {
        onFailure("Something Wrong! Please Try again later" + res.data);
      }
    } catch (error) {
      onFailure("Something Wrong! Please Try again later" + error);
    }
  };



  //dispatch Vehicle by id
  export const getVehicleById = async (onSuccess, onFailure) => {
    try {
      const res = await webApi.post("/master/vehicle/list", {
        group_id: 26
      });
      if (res.status === 200) {
        const r = res.data;
        let allVehicle = [];
        r.map((r, i) => {
          allVehicle.push({
  
            value: r.vehicle_id,
            label: r.vehicle_no,
          });
        });
        
        return onSuccess(allVehicle);
      } else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    } catch (error) {
      onFailure("Something Wrong! Please Try again later " + error);
    }
  };



  export const deleteVehicle = async (id, onSuccess, onFailure) => {
    try {
      const res = await webApi.post("/master/vehicle/delete", {
        vehicle_id: id,
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



  export const updateVehicle = async (info, onSuccess, onFailure) => {
    //console.log(info,"from v service")
    try {
      const res = await webApi.post("/master/vehicle/update", {
        vehicle_id: info.vehicle_id,
        vehicle_no: info.txt_vehicle,
        vehicle_type:info.ddl_vehicle_type,
        contact_person:info.txt_contact_person,
        contact_no: info.txt_contact_no,
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