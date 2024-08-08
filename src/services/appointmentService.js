export const appointmentService = [

];
import webApi from "./webApi/webApi";
// import { timestamp } from "../services/Utils/utils";
import { dateFormate, } from "../views/Pages/HelperComponent/utils";
import { timestamp } from "./Utils/utils";

export const getAllTaskTodo = async (user_id,onSuccess, onFailure) => {
  // console.log(user_id,"sen/1105")
  try {
    const res = await webApi.post("/master/task_todo/list", {
      user_id:user_id,
    });
    if (res.status === 200) {
      const r = res.data;
      let allStatus = [];

      // console.log(r, "sen1606/data");
      r.map((r, i) => {
     
     
        allStatus.push({
          status_serial_id: i + 1,
          task_todo_id: r.task_todo_id,
          sales_id: r.sales_id,
          name: r.module,
          desc: r.details,
          subject: r.subject,
          date: r.date,
          time: r.time,
          for_users:r.for_users,
          edit_log: r.edit_log,
          status_action: "action",
          enquiry_no:r.enquiry_no,
          todo_list:r.todo_list,
        });
      });
      return onSuccess(allStatus);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    // onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const getAllUsers = async (onSuccess, onFailure) => {
  // console.log("reached service 777")
  try {
    const res = await webApi.post("/master/users/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allUser = [];
      r.map((r, i) => {
        allUser.push({
      
          value: r?.user_id,
          label: r?.name,
          // email: r.email,
          // role_id: r.role_id,
          // role_name: r.role_name,
          // mobile: r.mobile,
          // showroom_warehouse_id: r.showroom_warehouse_id,
        });
      });
    
      // console.log(allUser,"999")
      return onSuccess(allUser);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const postTodoTask = async (info,inserted_by_id, onSuccess, onFailure) => {
  // console.log(timestamp(info.txt_update_task_time),"1205/info")
  try {
    let res;
    // if (module === "PURCHASE") {
      res = await webApi.post("/master/task_todo/insert", {
        // purchase_id: info.purchase_id,
        module: info.module,
        for_users:info.ddl_users,
        subject: info.txt_subject,
        details: info.txt_details,
        date: timestamp(info.txt_update_task_date),
        time: info.txt_update_task_time,
        inserted_by_id:inserted_by_id,
        parent_todo_id: info.task_todo_id,
        // todo_list:info,
      });
    // } else {//FOR SALES
    //   res = await webApi.post("/master/task_todo/insert", {
    //     sales_id: info.sales_id,
    //     for_users:info.ddl_users,
    //     module: info.module,
    //     subject: info.txt_subject,
    //     details: info.txt_details,
    //     date: timestamp(info.txt_update_task_date),
    //     time:info.txt_update_task_time,
    //   });
    // }

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

export const updateToDo = async (info,task_todo_id, onSuccess, onFailure) => {

  try {
    const res = await webApi.post("/master/task_todo/insert", {
      // task_todo_id: info.task_todo_id,
      sales_id: info.sales_id,
      for_users: info.ddl_users,
      module: info.module,
      subject: info.txt_subject,
      details: info.txt_details,
      date: timestamp(info.txt_update_task_date),
      time: info.txt_update_task_time,
      // todo_list: info,
      parent_todo_id: task_todo_id
    });
   
    if (res.status === 200) {
      const r = res.data;
      // console.log(r,"reached/return")
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
////old 28062022
// export const updateToDo = async (info, onSuccess, onFailure) => {

//   try {
//     const res = await webApi.post("/master/task_todo/update", {
//       task_todo_id: info.task_todo_id,
//       sales_id: info.sales_id,
//       for_users: info.ddl_users,
//       module: info.module,
//       subject: info.txt_subject,
//       details: info.txt_details,
//       date: timestamp(info.txt_update_task_date),
//       time: info.txt_update_task_time,
//       // todo_list: info,
//       parent_todo_id: info.task_todo_id
//     });
   
//     if (res.status === 200) {
//       const r = res.data;
//       console.log(r,"reached/return")
//       onSuccess(r);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

export const getAllTaskTodoByTodoId = async (task_todo_id, onSuccess, onFailure) => {
  // console.log(task_todo_id, "sen/1105")
  try {
    const res = await webApi.post("/master/task_todo/list", {
      task_todo_id: task_todo_id,
    });
    if (res.status === 200) {
      const r = res.data;
      let allStatus = [];

    
      r.map((r, i) => {

        // console.log(r.todo_list, "data3005");
        allStatus.push({
          status_serial_id: i + 1,
          task_todo_id: r.task_todo_id,
          sales_id: r.sales_id,
          name: r.module,
          desc: r.details,
          subject: r.subject,
          date: r.date,
          time: r.time,
          for_users: r.for_users,
          edit_log: r.edit_log,
          todo_list: r.todo_list,
          status_action: "action",
        });
      });
      return onSuccess(allStatus);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    // onFailure("Something Wrong! Please Try again later" + error);
  }
};