import webApi from "./webApi/webApi";
import { timestamp  } from "./Utils/utils";

import {currentDate,dateFormate} from "../views/Pages/HelperComponent/utils"
export const getAllItem = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/item/list", {});
    if (res.status === 200) {
      const r = res.data;
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
      //console.log(allItems,"0000");
      return onSuccess(allItems);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getSearchItem = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/master/item/list", {
      query: q.txt_item,
      category_id: q?.ddl_category?.value,
      brand_id: q?.ddl_brand?.value,
      showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
    });
    if (res.status === 200) {
      const r = res.data;
      //console.log(res.data)
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




export const postUpdateStock = async (info, onSuccess, onFailure) => {
  //console.log(info,"28034")
  try {
    const res = await webApi.post("/master/item/stockupdate", 
      info
    );
    //console.log(res.status,"0909")
    if (res.status === 200) {
      const r = res.data;
      
      onSuccess(r);
      // r.stock_by_location.map((item) => {
      //   // if(item.quantity){
      //   //   const movRes = webApi.post("/master/stock_movement/insert", {
      //   //     transaction_type: "SA",
      //   //     transaction_id: r.item_id,
      //   //     transaction_date: timestamp(currentDate()),
      //   //     showroom_warehouse_id: item.showroom_warehouse_id,
      //   //     item_id: r.item_id,
      //   //     plus_qty: Number(item.quantity),
      //   //     minus_qty: 0,
      //   //     unit_id: r.uom_id,
      //   //   });
      //   // }
      // });
    } else {
      onFailure("Something Wrong! Please Try again later6 " + res.data);
    }
    
  } catch (error) {
   
    onFailure("Something Wrong! Please Try again later7 " + error);
  }
};

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
          label: r.category,
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
          label: r.brand,
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
