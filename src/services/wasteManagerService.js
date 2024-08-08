import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import { dateFormate } from "../views/Pages/HelperComponent/utils";




export const postWaste = async (addedItems,inserted_by_id,inserted_by_date, onSuccess, onFailure) => {
    //console.log(addedItems,"sank1326")
  try {

      const res = await webApi.post("/master/waste/insert", {
       
        waste_id:addedItems.waste_id,
        waste_item_id:addedItems.item_id,
        waste_item_name:addedItems.item_name,
        waste_date:addedItems.waste_date,
        showroom_warehouse_id:addedItems.showroom_warehouse_id,
        convertedQty:addedItems.convertedQty,
        convertedTo:addedItems.convertedTo,
        convertedToId:addedItems.convertedToId,
        quantity:addedItems.quantity,
        uom_id:addedItems.uom_id,
        uom_name:addedItems.uom_name,
        wasteType:addedItems.wasteType,
        active_status: addedItems.switch_active_btn ? "Y" : "N",        
        inserted_by_id:inserted_by_id,
      });
      if (res.status === 200) {
        const r = res.data;
        onSuccess(r);
      } else {
        onFailure("Something Wrong! Please Try again later" + res.data);
      }
    } catch (error) {
      onFailure("Something Wrong! Please Try again later " + error);
    }
  };
  


// export const wasteTransfer = async (data, loactionId, onSuccess, onFailure) => {
//     try {
//         const res =  await data.map((r, i) => {
//              webApi.post("/master/waste/wasteTransfer", {
//                 loactionId: Number(loactionId),
//                 data: r,
//             })
//             .then(
//                 (onfulfilled)=>{
//                     onSuccess(onfulfilled)
//                 },
//                 (onrejected)=>{
//                     onFailure("Something Wrong! Please Try again later" + onrejected)
//                 }
//             );
//         })
//         // //console.log(res,"rrrrrrrr")
//         // if (res.status) {
//         //     const r = res.data
//         //     onSuccess(r)
//         // }
//     } catch (error) {
//         onFailure("Something Wrong! Please Try again later" + error);

//     }
// }




export const getAllWaste = async (onSuccess, onFailure,q) => {
  try {
    //console.log("sank1339", q.txt_item)
    const res = await webApi.post("/master/waste/list", {
      waste_item_name: q.txt_item,

    });
    if 
    (res.status === 200)
     {
      const r = res.data;
       //console.log(r,"list")

      let all_waste = [];
      r.map((r, i) => {
        all_waste.push({
          id: i + 1,
          witem:r.waste_item_name,
          uom_name:r.uom_name,
          waste_qty: r.quantity,
          waste_type: r.wasteType,
          convert_qty: r.convertedQty,
          convert_to: r.convertedTo,
        
          action: "action",
        });
      });
      return onSuccess(all_waste);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};