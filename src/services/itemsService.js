import webApi, { fileUploadApi } from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import { dateFormate } from "../views/Pages/HelperComponent/utils";





function toTitleCase(str) {
  if (str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  else {
    return "";
  }

}

export const itemRowData = [];

export const getAllItem = async (onSuccess, onFailure, menu = true) => {
  try {
    const res = await webApi.post("/master/item/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
        allItems.push({
          id: i + 1,
          item_id: r.item_id,
          mrp: r.mrp,
          category: r.category_name,
          category_id: r.category_id,
          brand: r.brand_name,
          brand_id: r.brand_id,
          item: r.item,
          item_own_code: r.item_own_code,
          item_company_code: r.item_company_code,
          details: r.details,
          uom_id: r.uom_id,
          alt_uom_id: r.alt_uom_id,
          qty: r.qty,
          uom_name: r.uom_name,
          alt_uom_name: r.alt_uom_name,
          hsn_code: r.hsn_code,

          gst: r.cgst_percentage,
          sgst: r.sgst_percentage,
          igst: r.igst_percentage,

          reorder_level: r.reorder_level,
          reorder_level_uom_id: r.reorder_level_uom_id,
          reorder_level_uom_name: r.reorder_level_uom_name,

          reorder_quantity: r.reorder_quantity,
          reorder_quantity_uom_id: r.reorder_quantity_uom_id,
          reorder_quantity_uom_name: r.reorder_quantity_uom_name,
          stock: r.current_over_stock,
          opening_stock: r.opening_stock,
          opening_stock_uom_id: r.opening_stock_uom_id,
          opening_stock_uom_name: r.opening_stock_uom_name,
          original_file_name: r.original_file_name,
          opening_stock_date: dateFormate(r.opening_stock_date),
          selling_price: r.selling_price,
          selling_date: dateFormate(r.selling_date),
          mrp: r.mrp,
          size: r.size,
          mrp_date: dateFormate(r.mrp_date),
          ledger_account_id: r.ledger_account_id,
          ledger_account_name: r.ledger_account_name,
          picture_path: r.picture_path,
          checkbox: "checkbox",
          status: r.active_status,
          action: "view-action",

          menu: [
            {
              label: "View",
              link: "/admin/master/item-view",
            },
            {
              label: "Edit",
              link: "/admin/master/add-items",
            },
            {
              label: "QR Code",
              clickBtn: true,
              modelName: "qrCodeModel",
            },
            {
              label: "Stock Adj.",
              clickBtn: true,
              modelName: "stockAdjustment",
            },
            {
              label: "Set MRP",
              clickBtn: true,
              modelName: "setMrp",
            },
            {
              label: "Set Selling Price",
              clickBtn: true,
              modelName: "setSellingPrice",
            },
            {
              label: "Delete",
              clickBtn: true,
              fnName: "delete",
            },
          ],
        });
      });
      return onSuccess(allItems);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
//qr code service
export const getSearchItem = async (onSuccess, onFailure, q) => {
  try {
    //console.log("CAtegory", q.txt_item)
    const res = await webApi.post("/master/item/list", {
      query: q.txt_item,
      category_id: q.ddl_category?.value,
      brand_id: q.ddl_brand?.value,
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
        allItems.push({
          id: i + 1,
          item_id: r.item_id,
          category: r.category_name,
          category_id: r.category_id,
          brand: r.brand_name,
          brand_id: r.brand_id,
          item: r.item,
          item_own_code: r.item_own_code,
          item_company_code: r.item_company_code,
          details: r.details,
          uom_id: r.uom_id,
          alt_uom_id: r.alt_uom_id,
          qty: r.qty,
          uom_name: r.uom_name,
          alt_uom_name: r.alt_uom_name,
          hsn_code: r.hsn_code,
          gst: r.cgst_percentage,
          igst: r.igst_percentage,

          reorder_level: r.reorder_level,
          reorder_level_uom_id: r.reorder_level_uom_id,
          reorder_level_uom_name: r.reorder_level_uom_name,

          reorder_quantity: r.reorder_quantity,
          reorder_quantity_uom_id: r.reorder_quantity_uom_id,
          reorder_quantity_uom_name: r.reorder_quantity_uom_name,

          opening_stock: r.opening_stock,
          opening_stock_uom_id: r.opening_stock_uom_id,
          opening_stock_uom_name: r.opening_stock_uom_name,

          opening_stock_date: dateFormate(r.opening_stock_date),
          selling_price: r.selling_price,
          selling_date: dateFormate(r.selling_date),
          mrp: r.mrp,
          size: r.size,

          mrp_date: dateFormate(r.mrp_date),
          ledger_account_id: r.ledger_account_id,
          ledger_account_name: r.ledger_account_name,
          picture_path: r.picture_path,
          status: r.active_status,
          action: "view-action",
          checkbox: "checkbox",

          menu: [
            {
              label: "View",
              link: "/admin/master/item-view",
            },
            {
              label: "Edit",
              link: "/admin/master/add-items",
            },
            {
              label: "QR Code",
              clickBtn: true,
              modelName: "qrCodeModel",
            },
            {
              label: "Stock Adj.",
              clickBtn: true,
              modelName: "stockAdjustment",
            },
            // {
            //   label: "Set MRP",
            //   clickBtn: true,
            //   modelName: "setMrp",
            // },
            {
              label: "Set Selling Price",
              clickBtn: true,
              modelName: "setSellingPrice",
            },
            // {
            //   label: "Delete",
            //   clickBtn: true,
            //   fnName: "delete",
            // },
          ],
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

export const postItem = async (info, inserted_by_id, onSuccess, onFailure) => {


  try {
    const res = await webApi.post("/master/item/insert", {
      brand_id: info.ddl_brand_id,
      category_id: info.ddl_category_id,
      item_own_code: info.txt_item_own_code,
      item_company_code: info.txt_company_code,
      item: info.txt_item_name,
      size: info.txt_size,
      details: info.txt_details,
      uom_id: info.ddl_uom_id,
      alt_uom_id: info.ddl_alt_uom_id,
      alt_uom: info.ddl_alt_uom_label,
      lower_unit_value: info.lower_unit_value,
      higher_unit_value: info.higher_unit_value,

      qty: info.txt_qty,
      hsn_code: info.txt_hsn_code,
      inserted_by_id: inserted_by_id,

      sgst_percentage: info.txt_gst,
      igst_percentage: info.txt_gst * 2,
      cgst_percentage: info.txt_gst,

      reorder_level: info.txt_reorder_level,
      reorder_level_uom_id: info.ddl_reoder_level_uom_id,
      reorder_level_uom_name: info.ddl_reoder_level_uom_label,
      reorder_quantity: info.txt_reorder_qty,
      reorder_quantity_uom_id: info.ddl_reoder_qty_uom_id,
      reorder_quantity_uom_name: info.ddl_reoder_qty_uom_label,


      opening_stock: info.txt_opening_stock,
      opening_stock_uom_id: info.ddl_opening_stock_uom_id,

      opening_stock_date: timestamp(info.opening_stock_date),

      selling_price: info.txt_selling_price,
      selling_date: timestamp(info.selling_date),

      mrp: info.txt_MRP,
      mrp_date: timestamp(info.mrp_date),

      picture_path: info.imgPath,
      original_file_name: info.original_file_name,
      ledger_account_id: info.ddl_ledger_account_id,
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

export const deleteItem = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/item/delete", {
      item_id: id,
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

// For dropdown list

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

export const updateItem = async (info, onSuccess, onFailure) => {
  //console.log(info, "info/1")
  try {
    const res = await webApi.post("/master/item/update", {
      item_id: info.item_id,
      brand_id: info.ddl_brand_id,
      category_id: info.ddl_category_id,
      item_own_code: info.txt_item_own_code,
      item_company_code: info.txt_company_code,
      item: info.txt_item_name,
      details: info.txt_details,
      uom_id: info.ddl_uom_id,
      alt_uom_id: info.ddl_alt_uom_id,
      alt_uom: info.ddl_alt_uom_label,
      lower_unit_value: info.lower_unit_value,
      higher_unit_value: info.higher_unit_value,

      qty: info.txt_qty,
      size: info.txt_size,

      hsn_code: info.txt_hsn_code,

      sgst_percentage: info.txt_gst,
      igst_percentage: info.txt_gst * 2,
      cgst_percentage: info.txt_gst,

      reorder_level: info.txt_reorder_level,
      reorder_level_uom_id: info.ddl_reoder_level_uom_id,

      reorder_level_uom_name: info.ddl_reoder_level_uom_label,

      reorder_quantity: info.txt_reorder_qty,
      reorder_quantity_uom_id: info.ddl_reoder_qty_uom_id,

      reorder_quantity_uom_name: info.ddl_reoder_qty_uom_label,

      opening_stock: info.txt_opening_stock,
      opening_stock_uom_id: info.ddl_opening_stock_uom_id,
      opening_stock_date: timestamp(info.opening_stock_date),

      selling_price: info.txt_selling_price,
      selling_date: timestamp(info.selling_date),
      size: info.txt_size,
      mrp: info.txt_MRP,
      mrp_date: timestamp(info.mrp_date),

      picture_path: info.imgPath,
      ledger_account_id: info.ddl_ledger_account_id,
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

export const getAllLedgerAccount = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/ledger_account/list", {
      short_data: true,
    });
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAcc = [];
      r.map((r, i) => {
        allLedgerAcc.push({
          value: r.ledger_account_id,
          label: r.ledger_account,
        });
      });
      return onSuccess(allLedgerAcc);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllCategory = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/category/list", {

    });
    if (res.status === 200) {

      const r = res.data;
      let allCats = [];
      let hsnarr = [];
      r.map((r) => {
        allCats.push({
          value: r.category_id,
          label: toTitleCase(r.category),
          hsn: r.hsn,
          gst: r.gst,
        });
      });
      onSuccess(allCats);

    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
//get hsn code Lists
export const getAllHSN = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/category/list", {
      short_data: true,
    });
    if (res.status === 200) {
      const r = res.data;
      let arr = [];

      r.map((r) => {
        arr.push({
          value: r.category_id,
          label: r.hsn,
        });
      });
      onSuccess(arr);

    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
export const postFileUpload = async (file, onSuccess, onFailure) => {
  let formData = new FormData();
  formData.set("file", file);
  try {
    const res = await webApi.post(
      "https://api.marudhar.app/files/upload?uploadpath=item",
      formData
    );
    if (res.status === 200) {
      const r = res.data;
      if (r.success) {
        onSuccess(r);
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};


//item price update

export const updateItemPrice = async (items, onSuccess, onFailure) => {
  //console.log("excel data 1=>",Array.isArray(items))

  try {
    const res = await webApi.post('/master/itemPriceUpdate/update', {
      items: items
    })

    //console.log("excel data res=>",res)
    if (res.status === 200){
      onSuccess(res.data)
    }
    else{
      onFailure("Failed")
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error)

  }
}