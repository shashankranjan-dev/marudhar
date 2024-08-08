import { get } from "lodash";
import { dateFormate, currencyFormate, currentDate} from "views/Pages/HelperComponent/utils";
import { timestamp } from "./Utils/utils";
import { getAllVendors } from "./vendorService";
import webApi from "./webApi/webApi";

export const PurchaseListOfItem = async (item_id, addSearch, onSuccess, onFailure) => {

  // console.log(timestamp(addSearch.txt_from_date), "sen2304id2",timestamp(addSearch.txt_to_date))
  try {
    const res = await webApi.post("/reports/stockVoucher/list", {
      item_id: item_id,
      showroom_warehouse_id: addSearch.ddl_showroom_warehouse.value,
      // date_from: timestamp(addSearch.txt_from_date),
      // date_to: timestamp(addSearch.txt_to_date),
      date_from: timestamp(addSearch.txt_from_date),
      date_to: timestamp(addSearch.txt_to_date)+86399,
    });

    // console.log(res, "sen23045050")

    if (res.status === 200) {
      const r = res.data;
      const r1=r.sort((a,b)=>a.voucher_date[0]-b.voucher_date[0])
    //  r.sort((a,b)=>console.log(a.voucher_date[0]-b.voucher_date[0],"sen1207"))

      // let allItems = [];
      // let inc = 0;
      // r.map((r, i) => {
      //   console.log(r,"sen23045050")
      //   inc++;
      //   allItems.push({
      //     company_name:r.company_name,
      //     invoice_date:r.invoice_date,
      //     invoice_item_details:r.invoice_item_details,
      //     module:r.module,
      //     sales_id:r.sales_id,
      //   });

      // });
      if (r1.length) {
        return onSuccess(r1);
      }
      // else {
      //   return onFailure("Stock Voucher Not Found");
      // }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
// export const PurchaseListOfItem = async (item_id, addSearch, onSuccess, onFailure) => {

//   console.log(addSearch.ddl_showroom_warehouse.value, "sen2304id2")
//   try {
//     const res = await webApi.post("/reports/stockVoucher/list", {
//       item_id: item_id,
//       showroom_warehouse_id: addSearch.ddl_showroom_warehouse.value,
//       date_from: timestamp(addSearch.txt_from_date),
//       date_to: timestamp(addSearch.txt_to_date),
//     });

//     console.log(res, "sen23045050")

//     if (res.status === 200) {
//       const r = res.data;
//       const r1=r.sort((a,b)=>a.voucher_date[0]-b.voucher_date[0])
//      r.sort((a,b)=>console.log(a.voucher_date[0]-b.voucher_date[0],"sen1207"))

//       // let allItems = [];
//       // let inc = 0;
//       // r.map((r, i) => {
//       //   console.log(r,"sen23045050")
//       //   inc++;
//       //   allItems.push({
//       //     company_name:r.company_name,
//       //     invoice_date:r.invoice_date,
//       //     invoice_item_details:r.invoice_item_details,
//       //     module:r.module,
//       //     sales_id:r.sales_id,
//       //   });

//       // });
//       if (r1.length) {
//         return onSuccess(r1);
//       }
//       // else {
//       //   return onFailure("Stock Voucher Not Found");
//       // }
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

////////////////////////OLD////////////////////////
// import { get } from "lodash";
// import { dateFormate, currencyFormate, currentDate} from "views/Pages/HelperComponent/utils";
// import { timestamp } from "./Utils/utils";
// import { getAllVendors } from "./vendorService";
// import webApi from "./webApi/webApi";

// export const PurchaseListOfItem = async (item_id, addSearch, onSuccess, onFailure) => {

//   console.log(timestamp(addSearch.txt_from_date), "sen2304id2",timestamp(addSearch.txt_to_date))
//   try {
//     const res = await webApi.post("/reports/stockVoucher/list", {
//       item_id: item_id,
//       showroom_warehouse_id: addSearch.ddl_showroom_warehouse.value,
//       // date_from: timestamp(addSearch.txt_from_date),
//       // date_to: timestamp(addSearch.txt_to_date),
//       date_from: Number(timestamp(addSearch.txt_from_date )) - (Number(timestamp(addSearch.txt_from_date)) % 86400 ),
//       date_to: timestamp(addSearch.txt_to_date)+86400,
//     });

//     console.log(res, "sen23045050")

//     if (res.status === 200) {
//       const r = res.data;
//       const r1=r.sort((a,b)=>a.voucher_date[0]-b.voucher_date[0])
//      r.sort((a,b)=>console.log(a.voucher_date[0]-b.voucher_date[0],"sen1207"))

//       // let allItems = [];
//       // let inc = 0;
//       // r.map((r, i) => {
//       //   console.log(r,"sen23045050")
//       //   inc++;
//       //   allItems.push({
//       //     company_name:r.company_name,
//       //     invoice_date:r.invoice_date,
//       //     invoice_item_details:r.invoice_item_details,
//       //     module:r.module,
//       //     sales_id:r.sales_id,
//       //   });

//       // });
//       if (r1.length) {
//         return onSuccess(r1);
//       }
//       // else {
//       //   return onFailure("Stock Voucher Not Found");
//       // }
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };
// // export const PurchaseListOfItem = async (item_id, addSearch, onSuccess, onFailure) => {

// //   console.log(addSearch.ddl_showroom_warehouse.value, "sen2304id2")
// //   try {
// //     const res = await webApi.post("/reports/stockVoucher/list", {
// //       item_id: item_id,
// //       showroom_warehouse_id: addSearch.ddl_showroom_warehouse.value,
// //       date_from: timestamp(addSearch.txt_from_date),
// //       date_to: timestamp(addSearch.txt_to_date),
// //     });

// //     console.log(res, "sen23045050")

// //     if (res.status === 200) {
// //       const r = res.data;
// //       const r1=r.sort((a,b)=>a.voucher_date[0]-b.voucher_date[0])
// //      r.sort((a,b)=>console.log(a.voucher_date[0]-b.voucher_date[0],"sen1207"))

// //       // let allItems = [];
// //       // let inc = 0;
// //       // r.map((r, i) => {
// //       //   console.log(r,"sen23045050")
// //       //   inc++;
// //       //   allItems.push({
// //       //     company_name:r.company_name,
// //       //     invoice_date:r.invoice_date,
// //       //     invoice_item_details:r.invoice_item_details,
// //       //     module:r.module,
// //       //     sales_id:r.sales_id,
// //       //   });

// //       // });
// //       if (r1.length) {
// //         return onSuccess(r1);
// //       }
// //       // else {
// //       //   return onFailure("Stock Voucher Not Found");
// //       // }
// //     } else {
// //       onFailure("Something Wrong! Please Try again later " + res.data);
// //     }
// //   } catch (error) {
// //     onFailure("Something Wrong! Please Try again later " + error);
// //   }
// // };