import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import {
  dateFormate,
  currencyFormate,
} from "../views/Pages/HelperComponent/utils";

function toTitleCase(str) {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return "";
  }
}

export const getOpeningStock = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/reports/openingItem/list", {
      showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
      brand_id: q.ddl_brand?.value,

    });
    if (res.status === 200) {
      const r = res.data;
      let allStock = [];
      r.map((r, i) => {
        console.log("sankopenoimdhh", r);
        allStock.push({
          itID: i + 1,
          item_id: r.item_id,
          itItem: r.item,
          itBrand:r.brand_name,
          itShowroom:r.showroom,
          itOpeningQty: r.Quantity ? r.Quantity :0,
          itOpeningRate: r.Rate ? r.Rate:0,
          itOpeningValue: Number(r.Value) ? Number(r.Value).toFixed(2): 0,
          showroom_warehouse_id: r.showroom_warehouse_id,
        });
      });
      console.log("sank1009", allStock);
      return onSuccess(allStock);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// export const getClosingStock = async (onSuccess, onFailure, q) => {
//   try {
//     const res = await webApi.post("/reports/itemClosingStock/list", {
//       showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
//       brand_id: q.ddl_brand?.value,

//     });

//     const resAvgValue = await webApi.post("/reports/ItemAvgValue/list", {});

//     console.log(resAvgValue.data, "sankh/");

//     if (res.status === 200 && resAvgValue.status === 200) {
//       const r = res.data;
//       const r1 = resAvgValue.data;
//       console.log(r1, "sankh");
//       let allStock = [];
//       r.map((r, i) => {
//         console.log(
//           r1[0]?.SumQuantity,
//           "sankvalu220042023",
//           r1[0]?.SumNetValue
//         );
//         allStock.push({
//           itID: i + 1,
//           item_id: r.item_id,
//           itBrand: r?.brand,
//           itItem: r.item,
//           itClosingQty: r.closingStock,
//           // itClosingQty:r.itClosingQty,
//           showroom_warehouse_id: r.showroom_warehouse_id,
//           itShowroom: r?.showroom,
//           qty: r1[0]?.SumQuantity,
//           netvalue: r1[0]?.SumNetValue,
//           itClosingRate: (
//             r1[0]?.SumNetValue / r1[0]?.SumQuantity
//           ).toFixed(2),
//           itClosingValue: (
//             (r1[0]?.SumNetValue / r1[0]?.SumQuantity) * r.closingStock
//           ).toFixed(2),
//         });
//       });

//       console.log("sank1009", allStock);
//       return onSuccess(allStock);
//     } else {
//       onFailure("Something Wrong! Please Try again later ");
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };





export const getClosingStock = async (onSuccess, onFailure, q) => {
  console.log(q,"sankha1250")
  try {
    const res = await webApi.post("/reports/closing_Value/list", {
      showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
      brand_id: q.ddl_brand?.value,
      // item_id:q.txt_item?.value,

    });

    // const resAvgValue = await webApi.post("/reports/SingleItem_Avg_Value/list", {
    
    //   item_id:q.txt_item?.value,
    // });

    // console.log(resAvgValue.data, "sankh/");

    if (res.status === 200
      //  && resAvgValue.status === 200
       ) {
      const r = res.data;
      // const r1 = resAvgValue.data;
      // console.log(r1, "sankh");
      let allStock = [];
      r.map((r, i) => {
        console.log(
          r,
          "sankvalu220042023",
          
        );
        allStock.push({
          itID: i + 1,
          item_id: r.item_id,
          itBrand: r?.brand,
          itItem: r.item,
          itClosingQty: r.closingStock,
          // itClosingQty:r.itClosingQty,
          showroom_warehouse_id: r.showroom_warehouse_id,
          // showroom_warehouse_id: r1.showroom_warehouse_id,

          sumPurchaseQty:r.sumPurchaseQty,
          sumPurchase_Net_Value:r.sumPurchase_Net_Value,

          itShowroom: r?.showroom,

          itClosingRate: r.sumPurchase_Net_Value/ r.sumPurchaseQty ? Number(r.sumPurchase_Net_Value/ r.sumPurchaseQty).toFixed(2):0,
          itClosingValue:(r.closingStock * (r.sumPurchase_Net_Value/ r.sumPurchaseQty ? Number(r.sumPurchase_Net_Value/ r.sumPurchaseQty):0)).toFixed(2)
          // qty: r1[0]?.SumQuantity,
          // netvalue: r1[0]?.SumNetValue,
          // itClosingRate: r1[0]?.rate,
          // itClosingRate: (
          //   r?.helPurchase[0]?.sumValue / r?.helPurchase[0]?.sumQty ? r?.helPurchase[0]?.sumValue / r?.helPurchase[0]?.sumQty :0
          // ).toFixed(2),
          // itClosingValue: (
          //    r.closingStock * ( r?.helPurchase[0]?.sumValue / r?.helPurchase[0]?.sumQty ? r?.helPurchase[0]?.sumValue / r?.helPurchase[0]?.sumQty :0)
          // ).toFixed(2),
        });
      });

      // const filteredStock = allStock.filter(stock => stock.showroom_warehouse_id === r1.showroom_warehouse_id);


      console.log("sank1009", allStock);
      return onSuccess(allStock);
    } else {
      onFailure("Something Wrong! Please Try again later ");
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
export const getStockAvgValue = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/reports/ItemAvgValue/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allStock = [];
      r.map((r, i) => {
        console.log("sank1008", r);
        allStock.push({
          qty: r.SumNetValue,
          netvalue: r.SumNetValue,
          rate: r.SumNetValue / r.SumNetValue,
        });
      });
      console.log("sank1009", allStock);
      return onSuccess(allStock);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// export const getOpeningClosingStockValuation= async (onSuccess, onFailure,q) => {

//   try {
//     const res = await webApi.post("/reports/itemOpeningClosingStockValuation/list", {

//     showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,

//     });
//     if (res.status === 200) {
//       const r = res.data;
//       let allStock = [];
//       r.map((r, i) => {
//         console.log("sank22042023",r)
//         allStock.push({
//           itID:i + 1,
//           itOpeningQty:r.openingStock.Quantity,
//           itOpeningRate:r.openingStock.Rate,
//           itOpeningValue :r.openingStock.Value,
//           itItem:r.openingStock.item_id,
//           // itBrand:r.closing_stock_data.brand_id,
//           itItem:r.openingStock.item,
//           itClosingQty:r.closing_stock_data.closingStock,
//           showroom_warehouse_id:r.openingStock.showroom_warehouse_id,
//         netValue:r.Item_Avg_Rate.SumNetValue,
//        qty:r.Item_Avg_Rate.SumQuantity,
//        itClosingRate:r.Item_Avg_Rate.SumNetValue/r.Item_Avg_Rate.SumQuantity,

//         });
//       });
//       console.log("sank1009",allStock)
//       return onSuccess(allStock);

//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
//   };
