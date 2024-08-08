import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import { dateFormate } from "../views/Pages/HelperComponent/utils";

//being called from dashboard 
export const getAllTaskTodo = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/task_todo/list", {

    });
    if (res.status === 200) {
      const r = res.data;
      let allStatus = [];
      r.map((r, i) => {
        allStatus.push({
          status_serial_id: i + 1,
          task_todo_id: r.task_todo_id,
          sales_id: r.sales_id,
          module: r.module,
          details: r.details,
          date: dateFormate(r.date),
          time: r.time,
          status_action: "action",
        });
      });
      return onSuccess(allStatus);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};


export const postTodoTask = async (info, inserted_by_id,users,previousTodo, onSuccess, onFailure) => {
 
  //console.log(info,"5454",users)
    try {
      let res;
      
      if (module === "PURCHASE") {
        res = await webApi.post("/master/task_todo/insert", {
          purchase_id: info.purchase_id,
          module: info.module,
          for_users:info.ddl_users,
          subject: info.txt_subject,
          details: info.txt_details,
          date: timestamp(info.txt_update_task_date),
          time: timestamp(info.txt_update_task_time),
          inserted_by_id:inserted_by_id,
          module_no: info.enquiry_no,
        });
      } else {//FOR SALES
        
  
        res = await webApi.post("/master/task_todo/insert", {
          
          sales_id: info.sales_id,
          module: info.module,
          inserted_by_id:inserted_by_id,
          for_users:info?.ddl_users.length > 0 ? info.ddl_users : users,
          subject: info.txt_subject,
          details: info.txt_details,
          date: timestamp(info.txt_update_task_date),
          time:info.txt_update_task_time,
          module_no: info.enquiry_no,
          parent_todo_id:previousTodo[0]?.task_todo_id
        });
      }
  
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
  
  export const updateTodoTask = async (task_todo_id, onSuccess, onFailure) => {
    try {
      const res = await webApi.post("/master/task_todo/update", {
        task_todo_id: task_todo_id,
        
        active_status:"N",
        // task_todo_id: info.task_todo_id,
        // sales_id: info.sales_id,
        // module: info.txt_module_name,
        // subject: info.txt_subject,
        // details: info.txt_details,
        // date: timestamp(info.txt_update_task_date),
        // time: info.txt_update_task_time,
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
  
//////OLD 28052022////
// export const postTodoTask = async (info, inserted_by_id, onSuccess, onFailure) => {
 
// //console.log(info,"5454")
//   try {
//     let res;
    
//     if (module === "PURCHASE") {
//       res = await webApi.post("/master/task_todo/insert", {
//         purchase_id: info.purchase_id,
//         module: info.module,
//         for_users:info.ddl_users,
//         subject: info.txt_subject,
//         details: info.txt_details,
//         date: timestamp(info.txt_update_task_date),
//         time: timestamp(info.txt_update_task_time),
//         inserted_by_id:inserted_by_id,
//         module_no: info.enquiry_no,
//       });
//     } else {//FOR SALES
      

//       res = await webApi.post("/master/task_todo/insert", {
        
//         sales_id: info.sales_id,
//         module: info.module,
//         inserted_by_id:inserted_by_id,
//         for_users:info.ddl_users,
//         subject: info.txt_subject,
//         details: info.txt_details,
//         date: timestamp(info.txt_update_task_date),
//         time:info.txt_update_task_time,
//         module_no: info.enquiry_no,

//       });
//     }

//     if (res.status === 200) {
//       const r = res.data;
//       onSuccess(r);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

// export const updateTodoTask = async (task_todo_id, onSuccess, onFailure) => {
//   try {
//     const res = await webApi.post("/master/task_todo/update", {
//       task_todo_id: task_todo_id,
      
//       active_status:"N",
//       // task_todo_id: info.task_todo_id,
//       // sales_id: info.sales_id,
//       // module: info.txt_module_name,
//       // subject: info.txt_subject,
//       // details: info.txt_details,
//       // date: timestamp(info.txt_update_task_date),
//       // time: info.txt_update_task_time,
//     });
//     if (res.status === 200) {
//       const r = res.data;
//       onSuccess(r);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

export const postSalesStatus = async (info, module, onSuccess, onFailure) => {
  try {
    let res;
    switch (module) {
      case "Enquiry":
        res = await webApi.post("/master/sales/update", {
          sales_id: info.sales_id,
          enquiry_status: (info.ddl_status?.value).toString(),
          enquiry_status_note: info.txt_status_note,
        });
        break;
      case "Quotation":
        res = await webApi.post("/master/sales/update", {
          sales_id: info.sales_id,
          quotation_status: (info.ddl_status?.value).toString(),
          quotation_status_note: info.txt_status_note,
        });
        break;
      case "sales_order":
        res = await webApi.post("/master/sales/update", {
          sales_id: info.sales_id,
          sales_status: (info.ddl_status?.value).toString(),
          sales_status_note: info.txt_status_note,
        });
        break;
      case "Delivery_order":
        res = await webApi.post("/master/sales/update", {
          sales_id: info.sales_id,
          delivery_status: info.ddl_status?.value,
          delivery_status_note: info.txt_status_note,
        });
      case "Dispatch":
        res = await webApi.post("/master/sales/update", {
          sales_id: info.sales_id,
          dispatch_status: info.ddl_status?.value,
          dispatach_status_note: info.txt_status_note,
        });
        break;
      default:
        break;
    }

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

export const postSalesTask = async (info, onSuccess, onFailure) => {
  try {
    let res;
    switch (info.module) {
      case "enquiry":
        res = await webApi.post("/master/sales/update", {
          sales_id: info.sales_id,
          enquiry_task: [
            {
              subject: info.txt_subject,
              details: info.txt_details,
              date: timestamp(info.txt_update_task_date),
              time: timestamp(info.txt_update_task_time),
            },
          ],
        });
        break;
      case "quotation":
        res = await webApi.post("/master/sales/update", {
          sales_id: info.sales_id,
          quotation_task: [
            {
              subject: info.txt_subject,
              details: info.txt_details,
              date: timestamp(info.txt_update_task_date),
              time: info.txt_update_task_time,
            },
          ],
        });
        break;
      case "sales_order":
        res = await webApi.post("/master/sales/update", {
          sales_id: info.sales_id,
          sales_task: [
            {
              subject: info.txt_subject,
              details: info.txt_details,
              date: timestamp(info.txt_update_task_date),
              time: info.txt_update_task_time,
            },
          ],
        });
        break;
      case "delivery_order":
        res = await webApi.post("/master/sales/update", {
          sales_id: info.sales_id,
          delivery_task: [
            {
              subject: info.txt_subject,
              details: info.txt_details,
              date: timestamp(info.txt_update_task_date),
              time: info.txt_update_task_time,
            },
          ],
        });
        break;
      case "dispatch":
        res = await webApi.post("/master/sales/update", {
          sales_id: info.sales_id,
          dispatch_task: [
            {
              subject: info.txt_subject,
              details: info.txt_details,
              date: timestamp(info.txt_update_task_date),
              time: info.txt_update_task_time,
            },
          ],
        });
        break;
      default:
        break;
    }
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

export const getTaskBySalesId = async (
  sales_id,
  module,
  onSuccess,
  onFailure
) => {

  try {
    const res = await webApi.post("/master/task_todo/list", {
      sales_id: sales_id,
    });

    

    if (res.status === 200) {
      let allItems = [];
      const r = res.data;
      //console.log(r,"555601")
      
      switch (module) {
        case "enquiry":
          r.map((r, i) => {

          //console.log(r.details,module,"55560")

            allItems.push({
              status_serial_id: i + 1,
              task_todo_id: r?.task_todo_id,
              sales_id: r?.sales_id,
              name: r?.module,
              subject: r?.subject,
              details: r.details,
              date: dateFormate(r?.date),
              time: r?.time,
              status_action: "action",
            });
          });
          break;
        case "quotation":
          r.map((r, i) => {
            allItems.push({
              sales_id: r.sales_id,
              // subject: r?.quotation_task[0]?.subject,
              // details: r?.quotation_task[0]?.details,
              // date: dateFormate(r?.quotation_task[0]?.date),
              // time: r?.quotation_task[0]?.time,
              status_note: r.quotation_status_note,
            });
          });
          break;
        case "sales_order":
          r.map((r, i) => {
            allItems.push({
              status_serial_id: i + 1,
              task_todo_id: r?.task_todo_id,
              sales_id: r?.sales_id,
              name: r?.module,
              // subject: r?.subject,
              // details: r.details,
              // date: dateFormate(r?.date),
              // time: r?.time,
              status_action: "action",
            });
          });
          break;
        case "delivery_order":
          r.map((r, i) => {
            allItems.push({
              sales_id: r?.sales_id,
              subject: r?.delivery_task[0]?.subject,
              details: r?.delivery_task[0]?.details,
              date: dateFormate(r.delivery_task[0]?.date),
              time: r?.delivery_task[0]?.time,
              status_note: r.delivery_status_note,
            });
          });
          break;
        case "dispatch":
          r.map((r, i) => {
            allItems.push({
              sales_id: r?.sales_id,
              subject: r?.dispatch_task[0]?.subject,
              details: r?.dispatch_task[0]?.details,
              date: dateFormate(r.dispatch_task[0]?.date),
              time: r?.dispatch_task[0]?.time,
              status_note: r.dispatach_status_note,
            });
          });
          break;
        default:
          break;
      }

      if (r) {
        //console.log(allItems, "its");
        return onSuccess(allItems[0]);
      } else {
        return onSuccess({});
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// for direact purchase

export const postDireactPurchaseTask = async (info, onSuccess, onFailure) => {
  try {
    let res;
    switch (info.module) {
      case "PURCHASE":
        res = await webApi.post("/master/purchase/update", {
          purchase_id: info.purchase_id,
          direct_purchase_task: [
            {
              subject: info.txt_subject,
              details: info.txt_details,
              date: timestamp(info.txt_update_task_date),
              time: info.txt_update_task_time,
            },
          ],
        });
        break;
      case "PURCHASE_ORDER":
        res = await webApi.post("/master/purchase/update", {
          purchase_id: info.purchase_id,
          purchase_order_task: [
            {
              subject: info.txt_subject,
              details: info.txt_details,
              date: timestamp(info.txt_update_task_date),
              time: info.txt_update_task_time,
            },
          ],
        });
        break;
      default:
        break;
    }
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

export const postPurchaseStatus = async (
  info,
  module,
  onSuccess,
  onFailure
) => {
  try {
    let res;
    switch (module) {
      case "PURCHASE":
        res = await webApi.post("/master/purchase/update", {
          purchase_id: info.purchase_id,
          direact_purchase_status: info.ddl_status?.value,
          direact_purchase_status_note: info.txt_status_note,
        });
        break;
      case "PURCHASE_ORDER":
        res = await webApi.post("/master/purchase/update", {
          purchase_id: info.purchase_id,
          purchase_order_status: info.ddl_status?.value,
          purchase_order_status_note: info.txt_status_note,
        });

        break;
      default:
        break;
    }

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

export const getTaskByPurchaseId = async (
  purchase_id,
  module,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/purchase/list", {
      purchase_id: purchase_id,
    });
    if (res.status === 200) {
      let allItems = [];
      const r = res.data;
      switch (module) {
        case "PURCHASE":
          r.map((r, i) => {
            allItems.push({
              purchase_id: r.purchase_id,
              status_note: r.direct_purchase_status_note,
              subject: r?.direct_purchase_task[0]?.subject,
              details: r?.direct_purchase_task[0]?.details,
              date: dateFormate(r?.direct_purchase_task[0]?.date),
              time: r?.direct_purchase_task[0]?.time,
            });
          });
          break;
        case "PURCHASE_ORDER":
          r.map((r, i) => {
            allItems.push({
              purchase_id: r.purchase_id,
              status_note: r.purchase_order_status_note,
              subject: r?.purchase_order_task[0]?.subject,
              details: r?.purchase_order_task[0]?.details,
              date: dateFormate(r?.purchase_order_task[0]?.date),
              time: r?.purchase_order_task[0]?.time,
            });
          });

          break;

        default:
          break;
      }

      if (r) {
        return onSuccess(allItems[0]);
      } else {
        return onSuccess({});
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

//all user
export const getAllUsers = async (onSuccess, onFailure) => {
  //console.log("reached service 777")
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
    
      //console.log(allUser,"999")
      return onSuccess(allUser);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// export const postPurchaseStatus = async (
//   info,
//   module,
//   onSuccess,
//   onFailure
// ) => {
//   try {
//     let res;
//     switch (module) {
//       case "PURCHASE":
//         res = await webApi.post("/master/purchase/update", {
//           purchase_id: info.purchase_id,
//           direct_purchase_status: info.ddl_status?.value,
//           direct_purchase_status_note: info.txt_status_note,
//         });
//         break;
//       case "PURCHASE_ORDER":
//         res = await webApi.post("/master/purchase/update", {
//           purchase_id: info.purchase_id,
//           purchase_order_status: info.ddl_status?.value,
//           purchase_order_status_note: info.txt_status_note,
//         });
//         break;
//       default:
//         break;
//     }

//     if (res.status === 200) {
//       const r = res.data;
//       onSuccess(r);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };
