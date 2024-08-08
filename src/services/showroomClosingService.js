import { timestamp } from "views/Pages/HelperComponent/utils";
import { sortWord } from "views/Pages/HelperComponent/utils";
import webApi from "./webApi/webApi";
// import { timestamp } from "../Utils/utils";
// import {
//   dateFormateField,
//   dateFormate,
// } from "../../views/Pages/HelperComponent/utils";



// export const showroomWiseSalesData = async (onSuccess, onFailure, q, showShoroms) => {
//   try {
//     //console.log(q.ddl_showroom_warehouse.value, "sen0405/q");

//     const res = await webApi.post("/reports/stockRegister/list", {
//       showroom_warehouse_id: (q?.ddl_showroom_warehouse.value === 'all') ? ''
//       : q?.ddl_showroom_warehouse.value,
//       item: q.txt_item,
//       category_id: q.ddl_category?.value,
//       brand_id: q.ddl_brand?.value
//       // showroom_warehouse_id : sho_warehouse_id.toString(),
//     });
//     //console.log(res, "dataRes5")
//     if (res.status === 200) {
//       const rw = res.data;
//       //console.log(rw, "dataRes")
//       let allItems = [];
//       rw.map((r, i) => {
//         //console.log("sen0305/r", r);

//         // if (stock_details) {
//           // //console.log("777 with stock",stock_details)
//           allItems.push({
//             stoID: i + 1,
//             uom_name: r.uom_name,
//             item_name: r.item,
//             stock_by_location: r.stock_by_location,
//             stock_details: [r.stock_details],  //.sort((a,b) => { return a._id - b._id }),
//           });
//         // }
//         // else {
//         //   //console.log("777 with stock stock")
//         //   allItems.push({
//         //     stoID: i + 1,
//         //     item_name: r.item,
//         //     stock_details:stock_details,
//         //     stock_by_location: r.stock_by_location,
//         //     stoClosing: (r.stock_by_location.length > 0 ? Number(r.stock_by_location[0]?.quantity) : 0),
//         //     stoAction: "view-action",
//         //     menu: [
//         //       {
//         //         clickBtn: true,
//         //         label: "View",
//         //         link: "",
//         //       }
//         //     ],
//         //   });
//         // }
//       });

//       //console.log(allItems, "sen0306");
//       onSuccess(allItems);

//     } else {
//       onFailure("Something Wrong! Please Try again latr " + res.data);
//     }
//   } catch (error) {
//     // onFailure("Something Wrong! Please Try again later " + error);
//   }
// };



export const getSearchShowroomWiseSales = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/master/sales/list", {
      query: q.txt_item,
      category_id: q?.ddl_category?.value,
      brand_id: q?.ddl_brand?.value,
      showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
    });
    if (res.status === 200) {
      const r = res.data;
      // //console.log(res.data)
      let allItems = [];
      r.map((r, i) => {
        allItems.push({
          id: i + 1,
          item_id: r.item_id,
          brand: r.brand_name,
          item_name: r.item,
          brand_id: r.brand_id,
          category: r.category_name,
          category_id: r.category_id,
          item_own_code: r.item_own_code,
          mrp: r.mrp,
          selling_price: r.selling_price,
          uom: r.uom_name,
          uom_id: r.uom_id,
          current_over_stock: r.current_over_stock,
          stock_by_location: r.stock_by_location,
        });
      });
      if (allItems.length) {
        return onSuccess(allItems);
      } else {
        return onFailure("Item not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const showroomWiseSalesData = async (onSuccess, onFailure, q, showShoroms) => {
  try {


    const res = await webApi.post("/reports/showroom_warehouse_stock2/list2", {
      brand_id: q,
      showroom_warehouse_id: showShoroms,


      // item_id: q,
      txt_from_date: timestamp(new Date()) * 1000
      // category_id: addSearch.ddl_category?.value,
      // brand_id: addSearch.ddl_brand?.value,
      // to_date: timestamp(currentDate()),
      // txt_from_date: timestamp(new Date())

    });
    if (res.status === 200) {
      const rq = res.data;
      // //console.log(timestamp(new Date()) * 1000, "sen2107/data")

      // let allItems = [];

      // rq.map((r, i) => {

      //   
      //   //   //console.log(showroomId, "allItemsallItems1")
      //   allItems.push({
      //     item_id: r.item_id,
      //     stock_by_location: r.stock_by_location,
      //     showroom_warehouse_id: r.showroom_warehouse_id,
      //     // quantity: Number(r?.stock_by_location[0]?.quantity > 0 ? Number(r.stock_by_location[0]?.quantity) + Number(r.sumOpeningPlus) : r.sumOpeningPlus) 
      //     quantity:
      //       Number(r?.stock_by_location[0]?.quantity > 0 ?
      //         Number(r.stock_by_location[0]?.quantity) + Number(r.sumOpeningPlus) + r.sumReceived - r.sumTransfer

      //         :
      //         r.sumOpeningPlus + r.sumReceived - r.sumTransfer

      //       )
      //   })
      // });
      //console.log(rq, "sen10/90");
      onSuccess(rq);

    } else {
      onFailure("Something Wrong! Please Try again latr " + res.data);
    }
  } catch (error) {
    // onFailure("Something Wrong! Please Try again later " + error);
  }
};
export const getItemByName = async (q, onSuccess, onFailure) => {
  //console.log(q, "sen23074")
  try {
    const res = await webApi.post("/master/item/list", {
      item: q.txt_item,
      category_id: q.ddl_category?.value,
      brand_id: q.ddl_brand?.value,
    });
    if (res.status === 200) {
      const r = res.data;
      //console.log(r, "rarara")


      let allItems = [];
      r.map((r, i) => {
        allItems.push({
          // id: i + 1,
          id: r.item_id,
          item_id: r.item_id,
          item: r.item,
          category_name: r.category_name,
          brand_name: r.brand_name,
          stock: r.current_over_stock,
          mrp: r.mrp,
          selling_price: r.selling_price,
          cgst_percentage: r.cgst_percentage,
          igst_percentage: r.igst_percentage,
          sgst_percentage: r.sgst_percentage,
          details: r.details,
          hsn_code: r.hsn_code,
          uom_name: r.uom_name,
          uom_id: r.uom_id,
          alt_uom_id: r.alt_uom_id,
          alt_uom: r.alt_uom,
          lower_unit_value: r.lower_unit_value,
          higher_unit_value: r.higher_unit_value,
          lower_caption: r.alt_uom_name,
          opening_rate: r.opening_rate
        });
      });

      if (allItems.length) {
        return onSuccess(allItems);
      } else {
        return onFailure("Item not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getItemByBrand = async (q, onSuccess, onFailure) => {
  //console.log(q, "sen23074")
  try {
    const res = await webApi.post("/master/item/list", {
      brand_id: q,
    });
    if (res.status === 200) {
      const r = res.data;
      //console.log(r, "rarara")


      let allItems = [];
      r.map((r, i) => {
        allItems.push({
          id: i + 1,
          // id: r.item_id,
          item_id: r.item_id,
          item: r.item,
          // category_name: r.category_name,
          // brand_name: r.brand_name,
          // stock: r.current_over_stock,
          // mrp: r.mrp,
          // selling_price: r.selling_price,
          // cgst_percentage: r.cgst_percentage,
          // igst_percentage: r.igst_percentage,
          // sgst_percentage: r.sgst_percentage,
          // details: r.details,
          // hsn_code: r.hsn_code,
          uom_name: r.uom_name,
          // uom_id: r.uom_id,
          // alt_uom_id: r.alt_uom_id,
          // alt_uom: r.alt_uom,
          // lower_unit_value: r.lower_unit_value,
          // higher_unit_value: r.higher_unit_value,
          // lower_caption: r.alt_uom_name,
          // opening_rate: r.opening_rate
        });
      });

      if (allItems.length) {
        return onSuccess(allItems);
      } else {
        return onFailure("Item not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// export const showroomWiseSalesData = [
//   {
//     id: "1",
//     item_details: {
//       brand: "Marudhar",
//       category: "Amazon white",
//       item_own_code: "[MM12952]",
//       itemName: "Glassy Marble",
//       stock: "343",
//       mrp: "15,000",
//     },
//     Showroom1: "100",
//     Showroom2: "100",
//     Showroom3: "100",
//     Showroom4: "100",
//   },
//   {
//     id: "2",
//     item_details: {
//       brand: "Marudhar",
//       category: "Amazon white",
//       item_own_code: "[MM12952]",
//       itemName: "Glassy Marble",
//       stock: "343",
//       mrp: "15,000",
//     },
//     Showroom1: "100",
//     Showroom2: "750",
//     Showroom3: "100",
//     Showroom4: "500",
//   },
//   {
//     id: "3",
//     item_details: {
//       brand: "Marudhar",
//       category: "Amazon white",
//       item_own_code: "[MM12952]",
//       itemName: "Glassy Marble",
//       stock: "343",
//       mrp: "15,000",
//     },
//     Showroom1: "900",
//     Showroom2: "550",
//     Showroom3: "100",
//     Showroom4: "1000",
//   },
// ];

// export const getAllCategory = async (onSuccess, onFailure) => {
//   try {
//     const res = await webApi.post("/master/category/list", {
//       short_data: true,
//     });
//     if (res.status === 200) {
//       const r = res.data;
//       let allPaCats = [];
//       r.map((r) => {
//         allPaCats.push({
//           value: r.category_id,
//           label: r.category,
//         });
//       });
//       onSuccess(allPaCats);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

// export const getAllBrands = async (onSuccess, onFailure) => {
//   try {
//     const res = await webApi.post("/master/brand/list", {
//       short_data: true,
//     });
//     if (res.status === 200) {
//       const r = res.data;

//       let allPaCats = [];
//       r.map((r) => {
//         allPaCats.push({
//           value: r.brand_id,
//           label: r.brand,
//         });
//       });
//       onSuccess(allPaCats);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

// export const getAllShowroomWarehouse = async (onSuccess, onFailure) => {
//   try {
//     const res = await webApi.post("/master/showrooms-warehouse/list", {
//       short_data: true,
//     });
//     if (res.status === 200) {
//       const r = res.data;
//       let allShowroomWarehouses = [];
//       r.map((r, i) => {
//         allShowroomWarehouses.push({
//           value: r.showrooms_warehouse_id,
//           sw_type: r.showrooms_warehouse_type,
//           label: r.showrooms_warehouse,
//         });
//       });
//       return onSuccess(allShowroomWarehouses);
//     } else {
//       onFailure("Something Wrong! Please Try again later" + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later" + error);
//   }
// };
