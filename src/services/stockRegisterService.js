import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";

function toTitleCase(str) {
  if(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  else {
    return "";
  }
  
}





export const getAllCategory = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/category/list", {
      short_data: true,
    });
    if (res.status === 200) {
      const r = res.data;

      let allPaCats = [];
      r.map((r) => {
        allPaCats.push({
          value: r.category_id,
          label: toTitleCase(r.category),
        });
      });
      onSuccess(allPaCats);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllBrands = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/brand/list", {
      short_data: true,
    });
    if (res.status === 200) {
      const r = res.data;
      let allPaCats = [];
      r.map((r) => {
        allPaCats.push({
          value: r.brand_id,
          label: toTitleCase(r.brand),
        });
      });
      onSuccess(allPaCats);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};


export const stockRegisterRowDataSearch = async (onSuccess, onFailure,q) => {
  //console.log(q,"service88");
  //console.log("userloc", localStorage.getItem("user_location"));
  try {
    const res = await webApi.post("/reports/stockRegister/list", {
      brand_id: q.ddl_brand?.value,
      showroom_warehouse_id: q.ddl_showroom_warehouse?.value, // : localStorage.getItem("user_location")),
      from_date: timestamp( q.txt_from_date),
      to_date: timestamp( q.txt_to_date),
      item : q.txt_item,
      category_id: q.ddl_category?.value,
    //  short_data: true,
  });
    //console.log( q.ddl_category,"444")
    // //console.log( q.txt_to_date,"333")

    if (res.status === 200) {
      const rs = res.data;
      let allItems = [];
      let inc = 0;
      //console.log(rs, "resttt");
      rs.map((r,i) => {
        inc++;
        let stock_details = r.stock_details;
        //console.log(stock_details, "es");
        if(stock_details) {
          //console.log("rish", stock_details.sumOpeningPlus - stock_details.sumOpeningMinus);
          allItems.push({
            stoID : inc,
            stoItemDetails : r.item,
            stoUom : r.uom_name,
            stoOpening : Number(r.stock_by_location && r.stock_by_location.length > 0 ? r.stock_by_location[0].quantity : 0) + stock_details.sumOpeningPlus - stock_details.sumOpeningMinus,
            stoPurchaseReturn: stock_details.sumPurchaseReturn,
            stoSalesReturn: stock_details.sumSalesReturn,
            stoSales: stock_details.sumSales,
            stoPurchase: stock_details.sumPurchase,
            stoClosing: Number(r.stock_by_location && r.stock_by_location.length > 0 ? r.stock_by_location[0].quantity : 0) + (stock_details.sumOpeningPlus - stock_details.sumOpeningMinus) + (stock_details.sumPurchase + stock_details.sumSalesReturn) - (stock_details.sumSales + stock_details.sumPurchaseReturn),
            stoAction:"view-action",
            menu:[
              {
              clickBtn: true,
              label: "View",
              link: "",
            }
          ],
          });
        }
        
        else {
          //console.log("contaida", r);
          allItems.push({
            stoID : inc,
            stoItemDetails : r.item,
            stoUom : r.uom_name,
            stoOpening : (r.stock_by_location && r.stock_by_location.length > 0 ? Number(r.stock_by_location[0].quantity) : 0),
            stoSales: 0,
            stoPurchaseReturn: 0,
            stoSalesReturn: 0,
            stoPurchase: 0,
            stoClosing: (r.stock_by_location && r.stock_by_location.length > 0 ? Number(r.stock_by_location[0].quantity) : 0),
            stoAction:"view-action",
            menu:[
              {
              clickBtn: true,
              label: "View",
              link: "",
            }
          ],
          });
        }
      });
        if (allItems.length) {
          //console.log("Aida", allItems);
          return onSuccess(allItems);
          } else {
            return onFailure(" Not Found");
          }
        } else {
          onFailure("Something Wrong! Please Try again later " + res.data);
        }
      } catch (error) {
        onFailure("Something Wrong! Please Try again later " + error);
      }
};

export const getItemByName = async (q,onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/item/list", {
      item_id: q,
    });
    if (res.status === 200) {
      const r = res.data;
      //console.log(r,"rarara")


      let allItems = [];
      r.map((r, i) => {
        allItems.push({
         // id: i + 1,
          id: r.item_id,
          item_id: r.item_id,
          item:r.item,
          category_name:r.category_name,
          brand_name:r.brand_name,
          stock: r.current_over_stock,
          mrp: r.mrp,
          selling_price: r.selling_price,
          cgst_percentage: r.cgst_percentage,
          igst_percentage: r.igst_percentage,
          sgst_percentage: r.sgst_percentage,
          details: r.details,
          hsn_code: r.hsn_code,
          uom_name:r.uom_name,
          uom_id:r.uom_id,
          alt_uom_id:r.alt_uom_id,
          alt_uom:r.alt_uom,
          lower_unit_value:r.lower_unit_value,
          higher_unit_value:r.higher_unit_value,
          lower_caption:r.alt_uom_name,
          opening_rate:r.opening_rate,
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

export const getOpeningStock = async (item_id, txt_from_date, showroom_warehouse_id, onSuccess, onFailure) => {
  //console.log(timestamp(txt_from_date), "sen10")
  try {
    const res = await webApi.post("/reports/stockRegisterOpening/list", {
      item_id: item_id,
      showroom_warehouse_id: showroom_warehouse_id,
      txt_from_date: timestamp(txt_from_date),
    });
    if (res.status === 200) {
      const r = res.data;
      let openingStock = [];
      let sum = 0;
      r.map((a, b) => {
        //console.log(a, "sen09067"),
          openingStock.push(
            {
              stock: a.stock_by_location.quantity + a.sumOpeningPlus,
              // avg_cost:  a.sumPurchaseNetValue + a.stock_by_location[0]?.value,
              avg_cost: (a.sumPurchaseNetValue + a.stock_by_location[0]?.value)/(a.stock_by_location[0]?.quantity+a.sumPurchase),
              rate_before_purchase:a.sumPurchaseNetValue?0:a.stock_by_location[0]?.rate,
              opPurchase_Qty:a.stock_by_location[0]?.quantity+a.sumPurchase,
              opPurchase_Value:a.stock_by_location[0]?.value+a.sumPurchaseNetValue,
              //rate : (a.sumPurchaseNetValue + a.stock_by_location[0]?.value)/(a.stock_by_location.quantity+a.sumPurchase)
            }
          )
      }
      )

      if (openingStock.length) {
        return onSuccess(openingStock);
      } else {
        return onFailure("Image not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }

}

export const stockRegisterRowDataSearch2 = async (onSuccess, onFailure, q) => {

  //console.log(timestamp(q.txt_to_date)+86399, "service88",timestamp(q.txt_from_date));

  try {
    const res = await webApi.post("/reports/stockRegisterTransaction/list", {
      brand_id: q.ddl_brand?.value,
      showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
      date_from: timestamp(q.txt_from_date),
      date_to: timestamp(q.txt_to_date)+86399,
      item: q.txt_item,
      category_id: q.ddl_category?.value,
      //  short_data: true,
    });

    const resOpening = await webApi.post("/reports/stockRegisterOpening/list", {
      item: q.txt_item,
      brand_id: q.ddl_brand?.value,
      category_id: q.ddl_category?.value,
      txt_from_date: timestamp(q.txt_from_date),
      showroom_warehouse_id: q?.ddl_showroom_warehouse?.value
      //  short_data: true,
    });

    const res2 = resOpening.data
    let openingStock = [];
    let sum = 0;
    res2.map((a, b) => {
    //console.log(a, "sen2707")

      openingStock.push(
        {
          stock:a?.stock_by_location[0]?.quantity? a?.stock_by_location[0]?.quantity + a?.sumOpeningPlus  - (a.sumTransfer?a.sumTransfer:0)+(a.sumReceived?a.sumReceived:0):a?.sumOpeningPlus  - (a.sumTransfer?a.sumTransfer:0)+(a.sumReceived?a.sumReceived:0)

          // old
          // stock:a?.stock_by_location[0]?.quantity + a?.sumOpeningPlus
        }
      )
    }
    )

    if (res.status === 200) {
      const rs = res.data;
      let allItems = [];
      let pdf = [];
      let inc = 0;
      let closing = 0;
      let Opening = 0;
      //console.log(openingStock.filter((a, b) => a.item_id === rs.item_id), "sen2807")

      rs.map((r, i) => {

        Opening = openingStock.filter((a, b) => a.item_id === rs.item_id)[i].stock;
        closing = Opening + ((r.sumPurchase ? r.sumPurchase : 0) + (r.sumSalesReturn ? r.sumSalesReturn : 0))
          -(r.sumTransfer?r.sumTransfer:0)+(r.sumReceived?r.sumReceived:0) - ((r.sumSales ? r.sumSales : 0) + (r.sumPurchaseReturn ? r.sumPurchaseReturn : 0)) - (r.sumWaste ? r.sumWaste : 0) + (r.sumWasteConvertQty ? r.sumWasteConvertQty : 0)

        inc++;
        allItems.push({
          item_id: r.item_id,
          stoID: inc,
          stoItemDetails: r.item,
          stoUom: r.uom_name,
          stoWaste:r.sumWaste ? r.sumWaste : 0,
          stoWasteQty: r.sumWasteConvertQty ? r.sumWasteConvertQty : 0,
          // stoOpening: r.sumOpeningPlus ? r.sumOpeningPlus :openingStock[0].stock,
          // stoOpening:openingStock[0].stock,
          stoOpening: Opening,
          stoPurchaseReturn: r.sumPurchaseReturn ? r.sumPurchaseReturn : 0,
          stoSalesReturn: r.sumSalesReturn ? r.sumSalesReturn : 0,
          stoSales: r.sumSales ? r.sumSales : 0,
          stoPurchase: r.sumPurchase ? r.sumPurchase : 0,
          // stoClosing: r.sumCloseingPlus ? r.sumCloseingPlus : 0,
          stoClosing: closing,
          stoTransfer:r.sumTransfer?r.sumTransfer:0,
          stoReceived:r.sumReceived?r.sumReceived:0,
          stoAction: "view-action",
          menu: [
            {
              clickBtn: true,
              label: "View",
              link: "",
            }
          ],
        });
        pdf.push([
          inc,
          r.item,
          r.uom_name,
          Opening,
          r.sumPurchase ? r.sumPurchase : 0,
          r.sumPurchaseReturn ? r.sumPurchaseReturn : 0,
          r.sumSales ? r.sumSales : 0,
          r.sumSalesReturn ? r.sumSalesReturn : 0,
          r.sumTransfer?r.sumTransfer:0,
          r.sumReceived?r.sumReceived:0,
         
           Opening + ((r.sumPurchase ? r.sumPurchase : 0) + (r.sumSalesReturn ? r.sumSalesReturn : 0))
          -(r.sumTransfer?r.sumTransfer:0)+(r.sumReceived?r.sumReceived:0) - ((r.sumSales ? r.sumSales : 0) + (r.sumPurchaseReturn ? r.sumPurchaseReturn : 0))
      
      
        ])

      });
      if (allItems.length) {
        //console.log("Aida", allItems);
        return onSuccess(allItems.sort((a,b)=>a.stoItemDetails > b.stoItemDetails ? 1 : -1),pdf);
      } else {
        return onFailure(" Not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};



////OLD///////////////
// import webApi from "./webApi/webApi";
// import { timestamp } from "./Utils/utils";

// function toTitleCase(str) {
//   if(str) {
//     return str.replace(
//       /\w\S*/g,
//       function(txt) {
//         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//       }
//     );
//   }

//   else {
//     return "";
//   }
  
// }





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
//           label: toTitleCase(r.category),
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
//           label: toTitleCase(r.brand),
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


// export const stockRegisterRowDataSearch = async (onSuccess, onFailure,q) => {
//   //console.log(q,"service88");
//   //console.log("userloc", localStorage.getItem("user_location"));
//   try {
//     const res = await webApi.post("/reports/stockRegister/list", {
//       brand_id: q.ddl_brand?.value,
//       showroom_warehouse_id: q.ddl_showroom_warehouse?.value, // : localStorage.getItem("user_location")),
//       from_date: timestamp( q.txt_from_date),
//       to_date: timestamp( q.txt_to_date),
//       item : q.txt_item,
//       category_id: q.ddl_category?.value,
//     //  short_data: true,
//   });
//     //console.log( q.ddl_category,"444")
//     // //console.log( q.txt_to_date,"333")

//     if (res.status === 200) {
//       const rs = res.data;
//       let allItems = [];
//       let inc = 0;
//       //console.log(rs, "resttt");
//       rs.map((r,i) => {
//         inc++;
//         let stock_details = r.stock_details;
//         //console.log(stock_details, "es");
//         if(stock_details) {
//           //console.log("rish", stock_details.sumOpeningPlus - stock_details.sumOpeningMinus);
//           allItems.push({
//             stoID : inc,
//             stoItemDetails : r.item,
//             stoUom : r.uom_name,
//             stoOpening : Number(r.stock_by_location && r.stock_by_location.length > 0 ? r.stock_by_location[0].quantity : 0) + stock_details.sumOpeningPlus - stock_details.sumOpeningMinus,
//             stoPurchaseReturn: stock_details.sumPurchaseReturn,
//             stoSalesReturn: stock_details.sumSalesReturn,
//             stoSales: stock_details.sumSales,
//             stoPurchase: stock_details.sumPurchase,
//             stoClosing: Number(r.stock_by_location && r.stock_by_location.length > 0 ? r.stock_by_location[0].quantity : 0) + (stock_details.sumOpeningPlus - stock_details.sumOpeningMinus) + (stock_details.sumPurchase + stock_details.sumSalesReturn) - (stock_details.sumSales + stock_details.sumPurchaseReturn),
//             stoAction:"view-action",
//             menu:[
//               {
//               clickBtn: true,
//               label: "View",
//               link: "",
//             }
//           ],
//           });
//         }
        
//         else {
//           //console.log("contaida", r);
//           allItems.push({
//             stoID : inc,
//             stoItemDetails : r.item,
//             stoUom : r.uom_name,
//             stoOpening : (r.stock_by_location && r.stock_by_location.length > 0 ? Number(r.stock_by_location[0].quantity) : 0),
//             stoSales: 0,
//             stoPurchaseReturn: 0,
//             stoSalesReturn: 0,
//             stoPurchase: 0,
//             stoClosing: (r.stock_by_location && r.stock_by_location.length > 0 ? Number(r.stock_by_location[0].quantity) : 0),
//             stoAction:"view-action",
//             menu:[
//               {
//               clickBtn: true,
//               label: "View",
//               link: "",
//             }
//           ],
//           });
//         }
//       });
//         if (allItems.length) {
//           //console.log("Aida", allItems);
//           return onSuccess(allItems);
//           } else {
//             return onFailure(" Not Found");
//           }
//         } else {
//           onFailure("Something Wrong! Please Try again later " + res.data);
//         }
//       } catch (error) {
//         onFailure("Something Wrong! Please Try again later " + error);
//       }
// };

// export const getItemByName = async (q,onSuccess, onFailure) => {
//   try {
//     const res = await webApi.post("/master/item/list", {
//       item_id: q,
//     });
//     if (res.status === 200) {
//       const r = res.data;
//       //console.log(r,"rarara")


//       let allItems = [];
//       r.map((r, i) => {
//         allItems.push({
//          // id: i + 1,
//           id: r.item_id,
//           item_id: r.item_id,
//           item:r.item,
//           category_name:r.category_name,
//           brand_name:r.brand_name,
//           stock: r.current_over_stock,
//           mrp: r.mrp,
//           selling_price: r.selling_price,
//           cgst_percentage: r.cgst_percentage,
//           igst_percentage: r.igst_percentage,
//           sgst_percentage: r.sgst_percentage,
//           details: r.details,
//           hsn_code: r.hsn_code,
//           uom_name:r.uom_name,
//           uom_id:r.uom_id,
//           alt_uom_id:r.alt_uom_id,
//           alt_uom:r.alt_uom,
//           lower_unit_value:r.lower_unit_value,
//           higher_unit_value:r.higher_unit_value,
//           lower_caption:r.alt_uom_name,
//           opening_rate:r.opening_rate,
//         });
//       });

//       if (allItems.length) {
//         return onSuccess(allItems);
//       } else {
//         return onFailure("Item not Found");
//       }
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

// export const getOpeningStock = async (item_id, txt_from_date, showroom_warehouse_id, onSuccess, onFailure) => {
//   //console.log(timestamp(txt_from_date), "sen10")
//   try {
//     const res = await webApi.post("/reports/stockRegisterOpening/list", {
//       item_id: item_id,
//       showroom_warehouse_id: showroom_warehouse_id,
//       txt_from_date: timestamp(txt_from_date),
//     });
//     if (res.status === 200) {
//       const r = res.data;
//       let openingStock = [];
//       let sum = 0;
//       r.map((a, b) => {
//         //console.log(a, "sen09067"),
//           openingStock.push(
//             {
//               stock: a.stock_by_location.quantity + a.sumOpeningPlus,
//               avg_cost:  a.sumPurchaseNetValue + a.stock_by_location[0]?.value,
//             }
//           )
//       }
//       )

//       if (openingStock.length) {
//         return onSuccess(openingStock);
//       } else {
//         return onFailure("Image not Found");
//       }
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }

// }

// export const stockRegisterRowDataSearch2 = async (onSuccess, onFailure, q) => {

//   //console.log(timestamp(q.txt_to_date)+86399, "service88",timestamp(q.txt_from_date));

//   try {
//     const res = await webApi.post("/reports/stockRegisterTransaction/list", {
//       brand_id: q.ddl_brand?.value,
//       showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
//       date_from: timestamp(q.txt_from_date),
//       date_to: timestamp(q.txt_to_date)+86399,
//       item: q.txt_item,
//       category_id: q.ddl_category?.value,
//       //  short_data: true,
//     });

//     const resOpening = await webApi.post("/reports/stockRegisterOpening/list", {
//       item: q.txt_item,
//       brand_id: q.ddl_brand?.value,
//       category_id: q.ddl_category?.value,
//       txt_from_date: timestamp(q.txt_from_date),
//       showroom_warehouse_id: q?.ddl_showroom_warehouse?.value
//       //  short_data: true,
//     });

//     const res2 = resOpening.data
//     let openingStock = [];
//     let sum = 0;
//     res2.map((a, b) => {
//     //console.log(a?.stock_by_location, "sen2707")

//       openingStock.push(
//         {
//           stock:a?.stock_by_location[0]?.quantity? a?.stock_by_location[0]?.quantity + a?.sumOpeningPlus  - (a.sumTransfer?a.sumTransfer:0)+(a.sumReceived?a.sumReceived:0):a?.sumOpeningPlus  - (a.sumTransfer?a.sumTransfer:0)+(a.sumReceived?a.sumReceived:0)

//           // old
//           // stock:a?.stock_by_location[0]?.quantity + a?.sumOpeningPlus
//         }
//       )
//     }
//     )

//     if (res.status === 200) {
//       const rs = res.data;
//       let allItems = [];
//       let inc = 0;
//       let closing = 0;
//       let Opening = 0;
//       //console.log(openingStock.filter((a, b) => a.item_id === rs.item_id), "sen2807")

//       rs.map((r, i) => {

//         Opening = openingStock.filter((a, b) => a.item_id === rs.item_id)[i].stock;
//         closing = Opening + ((r.sumPurchase ? r.sumPurchase : 0) + (r.sumSalesReturn ? r.sumSalesReturn : 0))
//           -(r.sumTransfer?r.sumTransfer:0)+(r.sumReceived?r.sumReceived:0) - ((r.sumSales ? r.sumSales : 0) + (r.sumPurchaseReturn ? r.sumPurchaseReturn : 0))

//         inc++;
//         allItems.push({
//           item_id: r.item_id,
//           stoID: inc,
//           stoItemDetails: r.item,
//           stoUom: r.uom_name,
//           // stoOpening: r.sumOpeningPlus ? r.sumOpeningPlus :openingStock[0].stock,
//           // stoOpening:openingStock[0].stock,
//           stoOpening: Opening,
//           stoPurchaseReturn: r.sumPurchaseReturn ? r.sumPurchaseReturn : 0,
//           stoSalesReturn: r.sumSalesReturn ? r.sumSalesReturn : 0,
//           stoSales: r.sumSales ? r.sumSales : 0,
//           stoPurchase: r.sumPurchase ? r.sumPurchase : 0,
//           // stoClosing: r.sumCloseingPlus ? r.sumCloseingPlus : 0,
//           stoClosing: closing,
//           stoTransfer:r.sumTransfer?r.sumTransfer:0,
//           stoReceived:r.sumReceived?r.sumReceived:0,
//           stoAction: "view-action",
//           menu: [
//             {
//               clickBtn: true,
//               label: "View",
//               link: "",
//             }
//           ],
//         });

//       });
//       if (allItems.length) {
//         //console.log("Aida", allItems);
//         return onSuccess(allItems);
//       } else {
//         return onFailure(" Not Found");
//       }
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };