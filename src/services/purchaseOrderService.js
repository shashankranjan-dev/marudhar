export const PurchaseOrderRowData = [

];

import { dateFormate,currencyFormate,} from "views/Pages/HelperComponent/utils";
import { timestamp } from "./Utils/utils";
import webApi from "./webApi/webApi";

export const getAllPurchaseList = async (onSuccess, onFailure, q , addGRN) => {
  let customMenu;
  if (addGRN) {
    customMenu = [
      {
        label: "View",
        // link: "/admin/procurement/purchase-view",
        clickBtn:true
      },
      {
        label: "Item Received",
        link: "/admin/procurement/item-received",
        
      },
    ];
  } else {
    customMenu = [
      {
        label: "View",
        // link: "/admin/procurement/purchase-view",
        clickBtn:true
      },
      {
        label: "Edit",
        link: "/admin/procurement/purchase-order-form",
        itemEdit: true,
      },
      {
        label: "Purchase Order",
        clickBtn: true,
        modelName: "printInvoice",
      },

      {
        label: "Update To Do",
        link: "/admin/procurement/purchase-view",
        updateTask: true,
      },
    
    ];
  }

  try {
      const res = await webApi.post("/master/purchase/list", {
      item_vendor_id: q.ddl_vendor_id?.value,
      po_no: q.txt_po_no,
      purchase_from_date: timestamp( q.txt_date_from),
      purchase_to_date: timestamp( q.txt_date_to),
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      let inc = 0;
      r.map((r, i) => {
        if (r.module === "PURCHASE_ORDER" || r.module === "ITEMRECEIVED") {
          inc++;
          allItems.push({
            polID: inc,
            vendor_id: r.vendor_id,
            purchase_id: r.purchase_id,
            polDate: dateFormate(r?.po_date),
            polNo: r.po_number,
            refNo: r.reference_no,
            refDate: dateFormate(r?.reference_date),
            polValue:(
              r.item_details.reduce(
                (sum, li) => Number(sum) + Number(li.net_value),
                0
              )
            ),
            polVendor: r.vendor_name,
            polOtherCharges:0,
            item_details: r.item_details,
            // poStatus: r.purchase_order_status,
            polAction: "view-action",
            menu: customMenu,
          });
        }
      });
      if(allItems.length){
        return onSuccess(allItems);
      }else{
        return onFailure("Item Received Not Found");

      }
     
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};


//FOR SEARCHING PURPOSE ONLY
export const getSearchAllPurchaseList = async (onSuccess, onFailure, q, addGRN) => {
  let customMenu;
  //console.log(q,"sen3434")
  if (addGRN) {
    customMenu = [
      {
        label: "View",
        // link: "/admin/procurement/purchase-view",
        clickBtn:true
      },
      {
        label: "Item Received",
        link: "/admin/procurement/item-received",
      },
    ];
  } else {
    customMenu = [
      {
        label: "View",
        // link: "/admin/procurement/purchase-view",
        clickBtn:true
      },
      {
        label: "Edit",
        link: "/admin/procurement/purchase-order-form",
        itemEdit: true,
      },
      {
        label: "Print",
        clickBtn: true,
        modelName: "printInvoice",
      },

      {
        label: "Update To Do",
        link: "/admin/procurement/purchase-view",
        updateTask: true,
      },
    
    ];
  }

  try {
  

    const res = await webApi.post("/master/purchase/list", {
      showroom_warehouse_id: q.ddl_showroom_warehouse?.value,
      vendor_id: q.ddl_vendor?.value,
      purchase_from_date: timestamp( q.txt_purchase_from_date),
      purchase_to_date: timestamp( q.txt_purchase_to_date),
      po_no: q.txt_po_no,
      // purchase_keyword: q.txt_keyword_phrase,
    });
    if (res.status === 200) {
      const rw = res.data;
      //console.log("po_data", rw);
      let allItems = [];
      let inc = 0;
      rw.map((r, i) => {
       
        if (r.module === "PURCHASE_ORDER" || r.module === "ITEMRECEIVED") {
          inc++;
          allItems.push({
            polID: inc,
            polDate: dateFormate(r?.grn_details[0].bill_date),            
            vendor_id: r.vendor_id,
            purchase_id: r.purchase_id,
            polDate: dateFormate(r?.po_date),
            polNo: r.po_number,
            refNo: r.reference_no,
            refDate: dateFormate(r?.reference_date),
            polValue:(
              r.item_details.reduce(
                (sum, li) => Number(sum) + Number(li.net_value),
                0
              )
            ),
            polVendor: r.vendor_name,
            
            item_details: r.item_details,
            // poStatus: r.purchase_order_status,
            polAction: "view-action",
            menu: customMenu,
          });
        }
      });

      //console.log("po_data1", allItems);
      if (allItems.length) {
        return onSuccess(allItems);
        } else {
          return onFailure("Purchase Not Found");
        }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};


export const getSearchAllRegisterList = async (onSuccess, onFailure, q, addGRN) => {
  let customMenu;
  if (addGRN) {
    customMenu = [
      {
        label: "View",
        link: "/admin/procurement/purchase-view",
      },
      {
        label: "Item Recived",
        link: "/admin/procurement/item-received",
      },
    ];
  } else {
    customMenu = [
      // {
      //   label: "View",
      //   link: "/admin/procurement/purchase-view",
      // },
      {
        label: "Edit",
        link: "/admin/procurement/purchase-order-form",
        itemEdit: true,
      },
      {
        label: "Print",
        clickBtn: true,
        modelName: "printInvoice",
      },

      {
        label: "Update To Do",
        link: "/admin/procurement/purchase-view",
        updateTask: true,
      },
    
    ];
  }

  try {
  

    const res = await webApi.post("/reports/PurchaseRegister/list", {

      showroom_warehouse_id: q.ddl_showroom_warehouse?.value,
      vendor_id: q.ddl_vendor?.value,
     bill_from_date: timestamp( q.txt_bill_from_date),
     bill_to_date: timestamp( q.txt_bill_to_date),
      bill_no: q.txt_bill_no,
      txt_grn_no: q.txt_grn_no,



    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      let inc = 0;
      let pdf = [];
      // let sum=0;
      r.map((r, i) => {
        //console.log(r,"rrrrr")
     //   if (r.module === "DIRECT PURCHASE" || r.module === "ITEMRECEIVED") {
          inc++;
          allItems.push({
            polID: inc,
            purchase_id: r.purchase_id,
            polDate: dateFormate(r.bill_date),                                            
            polNo: r.bill_no,
            polVendor: r.vendor_name,
            polDiscount: r.disc_value? r.disc_value[0]?Number(r.disc_value[0]):Number(r.disc_value):0,
            polDiscountForTotal:r.disc_value? r.disc_value[0]?Number(r.disc_value[0]):Number(r.disc_value):0,
            grn_no:r.grn,
            // polGross: currencyFormate(Number(r.net_value)),
            polGrossForTotal: r.quantity*r.rate,
            polGstForTotal:Number(r.gst_value).toFixed(2),
            // polGst:Number(r.gst_value).toFixed(2),
            polGst: Number(r.gst_value? r.gst_value : 0),
            polAmount:Number(r.bill_value).toFixed(2),
            polAmount1:currencyFormate(r.bill_value),


            // polAmount: currencyFormate((r.quantity*r.rate)-Number(r.disc_value[0])+r.gst_value),
            // polTotalGross:(
            //   r.reduce(
            //     (sum, li) => Number(sum) + Number(li.quantity*li.rate-li.disc_value),
            //     0
            //   )
            // ),
            // polGst:(
            //   r.item_details.reduce(
            //     (sum, li) => Number(sum) + Number(li.gst_value),
            //     0
            //   )
            // ),
            // polOtherCharges:"0",


            //   polValue:(
            //   r.item_details.reduce(
            //     (sum, li) => Number(sum) + Number(li.net_value),
            //     0
            //   )
            // ),
         //   item_details: r.item_details,
          //  grn_details: r.grn_details,

            // poStatus: r.purchase_order_status,
            polAction: "view-action",
            menu: customMenu,
          });
          pdf.push([
            inc,
            r.bill_date,
            r.bill_no,
            r.vendor_name,
            r.grn,
            r.bill_value.toFixed(2),
          ])
       // }
      });
      if (allItems.length) {
        return onSuccess(allItems,pdf);
        } else {
          return onFailure("Purchase Register Not Found");
        }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// for searching purchase ragister

export const getAllAddGrnList = async (onSuccess, onFailure, q , addGRN) => {
  let customMenu;
  if (addGRN) {
    customMenu = [
      {
        label: "View",
        // link: "/admin/procurement/purchase-view",
        clickBtn: true,
      },
      {
        label: "Item Received",
        link: "/admin/procurement/item-received",
      },
    ];
  } else {
    customMenu = [
      {
        label: "View",
        // link: "/admin/procurement/purchase-view",
        clickBtn: true,
      },
      {
        label: "Edit",
        link: "/admin/procurement/purchase-order-form",
        itemEdit: true,
      },
      {
        label: "Purchase Order",
        clickBtn: true,
        modelName: "printInvoice",
      },

      {
        label: "Update To Do",
        link: "/admin/procurement/purchase-view",
        updateTask: true,
      },
    
    ];
  }

  try {
      const res = await webApi.post("/master/purchase/list", {
      item_vendor_id: q.ddl_vendor_id?.value,
      po_no: q.txt_po_no,
      purchase_from_date: timestamp( q.txt_date_from),
      purchase_to_date: timestamp( q.txt_date_to),
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      let inc = 0;
      r.map((r, i) => {
        if (r.module === "PURCHASE_ORDER" || r.module === "ITEMRECEIVED") {
          inc++;
          allItems.push({
            GrnID: inc,
            vendor_id: r.vendor_id,
            purchase_id: r.purchase_id,
            GrnDate: dateFormate(r?.po_date),
            GrnNo: r.po_number,
            refNo: r.reference_no,
            refDate: dateFormate(r?.reference_date),
            GrnValue:(
              r.item_details.reduce(
                (sum, li) => Number(sum) + Number(li.net_value),
                0
              )
            ),
            GrnVendor: r.vendor_name,
            polOtherCharges:0,
            item_details: r.item_details,
            // poStatus: r.purchase_order_status,
            GrnAction: "view-action",
            menu: customMenu,
          });
        }
      });
      if(allItems.length){
        return onSuccess(allItems);
      }else{
        return onFailure("Item Received Not Found");

      }
     
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};




export const updatePurchase = async (
  id,
  info,
  item_details,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/purchase/update", {
      purchase_id: id,
      vendor_id: info.ddl_vendor_group?.value,
      po_number: info.txt_po_no,
      po_date: timestamp(info.txt_po_date),
      item_details: item_details,
      po_note: info.txt_note,
      grn_details: [
        {
          bill_no: info.txt_bill_no,
          bill_date: timestamp(info.txt_bill_date),
          bill_value: info.txt_bill_value,

          challan_no: info.txt_challan_no,
          challan_date: timestamp(info.txt_challan_date),

          vehicle_no: info.txt_vehicle_no,
          waybill_no: info.txt_waybill_no,

          grn_no: info.txt_grn_no,
          grn_date: timestamp(info.txt_grn_date),

          note: info.txt_note,
        },
      ],
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
