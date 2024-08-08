import get from "lodash.get";

export const directPurchaseFormRowData = [
  {
    id: "1",
    item_details: {
      brand: "Marudhar",
      category: "Amazon white",
      item_own_code: "[MM12952]",
      itemName: "Glassy Marble",
      stock: "343",
      mrp: "15,000",
    },
    item_Img: "",
    quantity_field: "100",
    rate_field: "rate_field",
    discPer_field: "0",
    discVal_field: "0",
    disc_field: "",
    cgst_field: "",
    // sgst_field:"",
    // igst_field:"",
    net_value_field: "0",
    action: "add_purchase_item",
  },
  {
    id: "2",
    item_details: {
      brand: "Marudhar",
      category: "Amazon white",
      item_own_code: "[MM12952]",
      itemName: "Glassy Marble",
      stock: "343",
      mrp: "15,000",
    },
    item_Img: "",
    quantity_field: "200",
    rate_field: "rate_field",
    discPer_field: "0",
    discVal_field: "0",
    disc_field: "",
    cgst_field: "",
    // sgst_field:"",
    // igst_field:"",
    net_value_field: "0",
    value_field: "value_field",
    action: "add_purchase_item",
  },
  {
    id: "3",
    item_details: {
      brand: "-",
      category: "Amazon white",
      item_own_code: "[MM12952]",
      itemName: "Glassy Marble",
      stock: "343",
      mrp: "15,000",
    },
    item_Img: "",
    quantity_field: "300",
    rate_field: "rate_field",
    discPer_field: "0",
    discVal_field: "0",
    disc_field: "",
    cgst_field: "",
    // sgst_field:"",
    // igst_field:"",
    net_value_field: "0",
    value_field: "value_field",
    action: "add_purchase_item",
  },
];
export const dummyRowData = [
  {
    id: "1",
    item_details: {
      brand: "-",
      category: "Amazon white",
      item_own_code: "[MM12952]",
      itemName: "Glassy Marble",
      stock: "343",
      mrp: "15,000",
    },
    item_Img: "",
    rate: "110",
    disc_field: "",
    cgst_field: "",
    sgst_field: "",
    igst_field: "",
    net_value_field: "0",
    value: "",
    quantity: "",
    action: "add_purchase_item",
  },
  {
    id: "2",
    item_details: {
      brand: "-",
      category: "Amazon white",
      item_own_code: "[MM12952]",
      itemName: "Glassy Marble",
      stock: "343",
      mrp: "15,000",
    },
    item_Img: "",
    quantity: "",
    rate: "120",
    disc_field: "",
    cgst_field: "",
    sgst_field: "",
    igst_field: "",
    net_value_field: "0",
    value: "",
    action: "add_purchase_item",
  },
  {
    id: "3",
    item_details: {
      brand: "-",
      category: "Marble",
      item: "[MM12952]",
      stock: "343",
      mrp: "15,000",
    },
    item_Img: "",
    quantity: "",
    rate: "180",
    disc_field: "",
    cgst_field: "",
    sgst_field: "",
    igst_field: "",
    net_value_field: "0",
    value: "",
    action: "add_purchase_item",
  },
];

export const addedItemServiceRowData = [
  {
    id: "1",
    item_details: {
      brand: "Marudhar",
      category: "Amazon white",
      item_own_code: "[MM12952]",
      itemName: "Glassy Marble",
    },
    item_Img: "",
    quantity: "100 boxes",
    rate: "120",
    quantity_field: "100",
    disc_field: "5",
    cgst_field: "0",
    sgst_field: "0",
    igst_field: "0",
    disc_value: "50",
    net_value_field: "0",
    disc_per: "5",
    net_value: "15,000",
    value: "10.000",
    action: "action",
  },
  {
    id: "2",
    item_details: {
      brand: "Marudhar",
      category: "Amazon white",
      item_own_code: "[MM12952]",
      itemName: "Glassy Marble",
    },
    item_Img: "",
    quantity: "200 Pieces",
    rate: "140",
    disc_field: "0",
    cgst_field: "0",
    sgst_field: "0",
    igst_field: "0",
    net_value_field: "0",
    disc_value: "50",
    disc_per: "5",
    net_value: "15,000",
    value: "10,000",
    action: "action",
  },
  {
    id: "3",
    item_details: {
      brand: "-",
      category: "Amazon white",
      item_own_code: "[MM12952]",
      itemName: "Glassy Marble",
    },
    item_Img: "",
    quantity: "300 boxes",
    rate: "220",
    disc_field: "0",
    cgst_field: "0",
    sgst_field: "0",
    igst_field: "0",
    disc_value: "50",
    disc_per: "5",
    net_value: "15,000",
    net_value_field: "0",
    value: "10,000",
    action: "action",
  },
];
import {
  dateFormate,
  currentDate,
  currencyFormate,
} from "views/Pages/HelperComponent/utils";
import { timestamp } from "./Utils/utils";
import webApi from "./webApi/webApi";

export const getAllDirectPurchaseList = async (onSuccess, onFailure) => {

  let customMenu;

    customMenu=[
      
      {
        label:"View",
        link: "/admin/procurement/direct-purchase-view"
      }
    ]
  

  try {
    const res = await webApi.post("/master/purchase/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      let inc = 0;
      r.map((r, i) => {
        if (r.module === "DIRECT PURCHASE") {
          inc++;
          allItems.push({
            dplID: inc,
            purchase_id: r.purchase_id,
            dplBillDate:
              dateFormate(get(r, "grn_details.0.bill_date")) ||
              dateFormate(get(r, "grn_details.1.bill_date")),
            dplBillNo:
              get(r, "grn_details.0.bill_no") ||
              get(r, "grn_details.1.bill_no"),
            dplVendor: r.vendor_name,
            vendor_id: r.vendor_id,
            dplBillValue:
              get(r, "grn_details.0.bill_value") ||
              get(r, "grn_details.1.bill_value"),
            dplgrn_no: r.grn_no,
            dplgrn_date: dateFormate(
              get(r, "grn_details.0.grn_date") ||
                get(r, "grn_details.1.grn_date")
            ),
            dplStatus: r.direct_purchase_status,
            dplAction: "view-action",
            action_items: r.action_items,
            dpl_status: r.approve_id === 0 ? "Not Approved" : "Approved",
            approve_id: r.approve_id ? r.approve_id : 0,
            menu: customMenu
            // [
            //   {
            //     label: "View",
            //     link: "/admin/procurement/direct-purchase-view",
            //   },
            //   {
            //     label: "Edit",
            //     link: "/admin/procurement/add-direct-purchase",
            //     itemEdit: true,
            //   },
            //   {
            //     label: "Update To Do",
            //     link: "/admin/procurement/direct-purchase-view",
            //     updateTask: true,
            //   },
            //   // {
            //   //   label: "Update Status",
            //   //   link: "/admin/sale/quatation-view",
            //   //   updateStatus: true,
            //   // },
            // ],
          });
        }
      });
      return onSuccess(allItems);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

//For search purchase
export const getSearchDirectPurchase = async (onSuccess, onFailure, q) => {
  // //console.log(q.ddl_status.value, "04002202");
  let customMenu;
  if(q.ddl_status.label === "Any"){
    customMenu=[
      {
        label:"View",
        // link: "/admin/procurement/direct-purchase-view"
        clickBtn:true
      },
      {
        label:"Print",        
        clickBtn:true,
        
      },
     
    ]
  }else if(q.ddl_status.label === "Not Approved"){
    customMenu = [
    {
      label: "View",
      // link: "/admin/procurement/direct-purchase-view",
      clickBtn:true
    },
    {
      label: "Approve",
      link: "/admin/procurement/approve-direct-purchase-form",
      itemEdit: true,
    },
    {
      label:"Print",     
      clickBtn:true,
     

    },
    // {
    //   label:"Edit",
    //   link: "/admin/procurement/direct-purchase-edit"
    // },
    {
      label: "Delete",
      link: "/admin/procurement/delete-direct-purchase",
    }
  ]
  }else{
    customMenu=[
      {
        label:"View",
        // link: "/admin/procurement/direct-purchase-view"
        clickBtn:true
      },
      {
        label:"Print",       
        clickBtn:true,
       

      },
    ]
  }
  try {
    const res = await webApi.post("/master/purchase/list", {
      vendor_id: q.ddl_vendor?.value,
      showroom_warehouse_id: q.ddl_showroom_warehouse?.value,
      grn_no: q.grn_no,
      direct_purchase_from_date: timestamp(q.txt_direct_purchase_from_date),
      direct_purchase_to_date: timestamp(q.txt_direct_purchase_to_date),
      direct_purchase_keyword: q.txt_keyword_phrase,
      ddl_status: Number(q.ddl_status.value),

    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      let inc = 0;

      // //console.log(r[0].grn_details[0]?.note,"9090")
      r.map((r, i) => {

        console.log(r,"sankhalbel")
        if (r.module === "DIRECT PURCHASE") {
          inc++;
          allItems.push({
            dplID: inc,
            purchase_id: r.purchase_id,
            dplBillDate: dateFormate(
              get(r, "grn_details.0.bill_date") ||
                get(r, "grn_details.1.bill_date")
            ),
            dplBillNo:
              get(r, "grn_details.0.bill_no") ||
              get(r, "grn_details.1.bill_no"),
            dplVendor: r.vendor_name,
            vendor_id: r.vendor_id,
            dplBillValue:currencyFormate(
              get(r, "grn_details.0.bill_value") ||
              get(r, "grn_details.1.bill_value")),
              dplGrnNo: r.grn_no,
            ddl_status:q.ddl_status.value,
            dplgrn_date: dateFormate(
              get(r, "grn_details.0.grn_date") ||
                get(r, "grn_details.1.grn_date")
            ),

            dplshowroom:r.showrooms_warehouse,

            dplNote: r.grn_details[0]?.note,


            dplStatus: r.direct_purchase_status,
            dpl_status: r.approve_id === 0 ? "Not Approved" : "Approved",
            dplAction: "view-action",
            approve_id: r.approve_id? r.approve_id : 0,
            action_items: r.action_items,
              menu: customMenu,
            // menu: [
            //   {
            //     label: "View",
            //     link: "/admin/procurement/direct-purchase-view",
            //   },
            //   {
            //     label: "Approve",
            //     link: "/admin/procurement/approve-direct-purchase-form",
            //     itemEdit: true,
            //   },
            //   {
            //     label: "Edit",
            //     link: "/admin/procurement/Edit-direct-purchase",
            //     itemEdit: true,
            //   },
            //   {
            //     label: "Update To Do",
            //     link: "/admin/procurement/direct-purchase-view",
            //     updateTask: true,
            //   },
             
            // ],
          });
        }
      });

      if (allItems.length) {
        return onSuccess(allItems);
      } else {
        // //console.log("direct");
        return onFailure("Direct Purchase Not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getPurchaseById = async (
  purchase_id,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/purchase/list", {
      purchase_id: purchase_id,
      // ddl_status: ddl_status
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
        var result = r.item_details.map(function (el) {
          var o = Object.assign({}, el);
          o.id = o.item_id;
          return o;
        });

        r.item_details = result;

      

        // console.table(r)
        allItems.push({
          //dplID: i + 1,
          id: i + 1,
          purchase_id: r.purchase_id,
          dplBillDate: dateFormate(
            get(r, "grn_details.0.bill_date") ||
              get(r, "grn_details.1.bill_date")
          ),
          dplBillNo:
            get(r, "grn_details.0.bill_no") || get(r, "grn_details.1.bill_no"),
          dplVendor: r.vendor_name,
          vendor_id: r.vendor_id,
          ddl_vendor_group: {
            value: r.vendor_id,
            label: r.vendor_name,
          },
          dplGrossAmount: "150200",
          dplTaxes: "27036",
          dplOtherCharges: "500",
          dplNetAmount: "177736",
          item_details: r.item_details,
          bill_no:
            get(r, "grn_details.0.bill_no") || get(r, "grn_details.1.bill_no"),
          bill_date: dateFormate(
            get(r, "grn_details.0.bill_date") ||
              get(r, "grn_details.1.bill_date")
          ),
          bill_value:
            get(r, "grn_details.0.bill_value") ||
            get(r, "grn_details.1.bill_value"),
          challan_no:
            get(r, "grn_details.0.challan_no") ||
            get(r, "grn_details.1.challan_no"),
          challan_date: dateFormate(
            get(r, "grn_details.0.challan_date") ||
              get(r, "grn_details.1.challan_date")
          ),
          vehicle_no:
            get(r, "grn_details.0.vehicle_no") ||
            get(r, "grn_details.1.vehicle_no"),
          waybill_no:
            get(r, "grn_details.0.waybill_no") ||
            get(r, "grn_details.1.waybill_no"),
          grn_no:
            get(r, "grn_details.0.grn_no") || get(r, "grn_details.1.grn_no"),
          grn_date: dateFormate(
            get(r, "grn_details.0.grn_date") || get(r, "grn_details.1.grn_date")
          ),
          note: get(r, "grn_details.0.note") || get(r, "grn_details.1.note"),
          direact_purchase_status: r.direact_purchase_status,
          purchase_order_status: r.purchase_order_status,
          showroom_warehouse_id: r.showroom_warehouse_id,
          po_number: r.po_number,
          po_date: dateFormate(r.po_date),
          po_note: r.po_note,
          po_value: currencyFormate(r?.item_details[0].net_value),
          received_item_details: r?.received_item_details,
        });
      });
      // //console.log(allItems,"sen2323")
      return onSuccess(allItems[0]);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getDirectPurchaseById = async (
  purchase_id,
  grnNo,

  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/purchase/list", {
      purchase_id: purchase_id,
      grn_no: grnNo

      // ddl_status: ddl_status
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
        var result = r.item_details.map(function (el) {
          var o = Object.assign({}, el);
          o.id = o.item_id;
          return o;
        });

        r.item_details = result;

        // //console.log(
        //   "in directPurchaseFormService, r is:\n" + JSON.stringify(r, null, 2)
        // );

        // console.table(r)
        allItems.push({
          //dplID: i + 1,
          id: i + 1,
          purchase_id: r.purchase_id,
          dplBillDate: dateFormate(
            get(r, "grn_details.0.bill_date") ||
              get(r, "grn_details.1.bill_date")
          ),
          dplGrnNo:r.grn_no,
          dplNote:r.po_note,
          dplBillNo:get(r, "grn_details.0.bill_no") || get(r, "grn_details.1.bill_no"),
          dplVendor: r.vendor_name,
          vendor_id: r.vendor_id,
          ddl_vendor_group: {
            value: r.vendor_id,
            label: r.vendor_name,
          },
          dplGrossAmount: "150200",
          dplTaxes: "27036",
          dplOtherCharges: "500",
          dplNetAmount: "177736",
          item_details: r.item_details,
          dplshowroom:r.showrooms_warehouse,
          bill_no:
            get(r, "grn_details.0.bill_no") || get(r, "grn_details.1.bill_no"),
          bill_date: dateFormate(
            get(r, "grn_details.0.bill_date") ||
              get(r, "grn_details.1.bill_date")
          ),
          bill_value:
            get(r, "grn_details.0.bill_value") ||
            get(r, "grn_details.1.bill_value"),
          challan_no:
            get(r, "grn_details.0.challan_no") ||
            get(r, "grn_details.1.challan_no"),
          challan_date: dateFormate(
            get(r, "grn_details.0.challan_date") ||
              get(r, "grn_details.1.challan_date")
          ),
          vehicle_no:
            get(r, "grn_details.0.vehicle_no") ||
            get(r, "grn_details.1.vehicle_no"),
          waybill_no:
            get(r, "grn_details.0.waybill_no") ||
            get(r, "grn_details.1.waybill_no"),
          grn_no:
            get(r, "grn_details.0.grn_no") || get(r, "grn_details.1.grn_no"),
          grn_date: dateFormate(
            get(r, "grn_details.0.grn_date") || get(r, "grn_details.1.grn_date")
          ),
          note: get(r, "grn_details.0.note") || get(r, "grn_details.1.note"),
          direact_purchase_status: r.direact_purchase_status,
          purchase_order_status: r.purchase_order_status,
          showroom_warehouse_id: r.showroom_warehouse_id,
          po_number: r.po_number,
          po_date: dateFormate(r.po_date),
          po_note: r.po_note,
          po_value: currencyFormate(r?.item_details[0].net_value),
          received_item_details: r?.received_item_details,
        });
      });
      // //console.log(allItems,"sen2323")
      return onSuccess(allItems[0]);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getDirectPurchaseByIdedit = async (
  purchase_id,onSuccess,onFailure
) => {
  try {
    const res = await webApi.post("/master/purchase/list", {
      purchase_id: purchase_id,
     

      // ddl_status: ddl_status
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
        var result = r.item_details.map(function (el) {
          var o = Object.assign({}, el);
          o.id = o.item_id;
          return o;
        });

        r.item_details = result;

        // //console.log(
        //   "in directPurchaseFormService, r is:\n" + JSON.stringify(r, null, 2)
        // );

        // console.table(r)
        allItems.push({
          //dplID: i + 1,
          id: i + 1,
          purchase_id: r.purchase_id,
          dplBillDate: dateFormate(
            get(r, "grn_details.0.bill_date") ||
              get(r, "grn_details.1.bill_date")
          ),
          dplGrnNo:r.grn_no,
          dplNote:r.grn_details[0].note,
          dplBillNo:get(r, "grn_details.0.bill_no") || get(r, "grn_details.1.bill_no"),
          dplVendor: r.vendor_name,
          vendor_id: r.vendor_id,
          ddl_vendor_group: {
            value: r.vendor_id,
            label: r.vendor_name,
          },
          dplGrossAmount: "150200",
          dplTaxes: "27036",
          dplOtherCharges: "500",
          dplNetAmount: "177736",
          item_details: r.item_details,
          bill_no:
            get(r, "grn_details.0.bill_no") || get(r, "grn_details.1.bill_no"),
          bill_date: dateFormate(
            get(r, "grn_details.0.bill_date") ||
              get(r, "grn_details.1.bill_date")
          ),
          bill_value:
            get(r, "grn_details.0.bill_value") ||
            get(r, "grn_details.1.bill_value"),
          challan_no:
            get(r, "grn_details.0.challan_no") ||
            get(r, "grn_details.1.challan_no"),
          challan_date: dateFormate(
            get(r, "grn_details.0.challan_date") ||
              get(r, "grn_details.1.challan_date")
          ),
          vehicle_no:
            get(r, "grn_details.0.vehicle_no") ||
            get(r, "grn_details.1.vehicle_no"),
          waybill_no:
            get(r, "grn_details.0.waybill_no") ||
            get(r, "grn_details.1.waybill_no"),
          grn_no:
            get(r, "grn_details.0.grn_no") || get(r, "grn_details.1.grn_no"),
          grn_date: dateFormate(
            get(r, "grn_details.0.grn_date") || get(r, "grn_details.1.grn_date")
          ),
          note: get(r, "grn_details.0.note") || get(r, "grn_details.1.note"),
          direact_purchase_status: r.direact_purchase_status,
          purchase_order_status: r.purchase_order_status,
          showroom_warehouse_id: r.showroom_warehouse_id,
          po_number: r.po_number,
          po_date: dateFormate(r.po_date),
          po_note: r.po_note,
          po_value: currencyFormate(r?.item_details[0].net_value),
          received_item_details: r?.received_item_details,
        });
      });
      //console.log(allItems,"sen2323")
      return onSuccess(allItems[0]);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getDirectPurchaseByIdForItemR = async (
  purchase_id,
  onSuccess,
  onFailure
) => {
  //console.log(purchase_id,"sen1232")
  try {
    const res = await webApi.post("/master/purchase/list", {
      purchase_id: purchase_id,
      // ddl_status: ddl_status
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      //console.log(r,"sen1233")
      r.map((r, i) => {
        var result = r.item_details.map(function (el) {
          var o = Object.assign({}, el);
          o.id = o.item_id;
          return o;
        });

        r.item_details = result;
 
        allItems.push({
          //dplID: i + 1,
          id: i + 1,
          purchase_id: r?.purchase_id,
          dplBillDate: dateFormate(
            get(r, "grn_details.0.bill_date") ||
              get(r, "grn_details.1.bill_date")
          ),
          dplBillNo:
            get(r, "grn_details.0.bill_no") || get(r, "grn_details.1.bill_no"),
          dplVendor: r?.vendor_name,
          vendor_id: r?.vendor_id,
          ddl_vendor_group: {
            value: r?.vendor_id,
            label: r?.vendor_name,
          },
          dplGrossAmount: "150200",
          dplTaxes: "27036",
          dplOtherCharges: "500",
          dplNetAmount: "177736",
          item_details: r?.item_details,
          bill_no:
            get(r, "grn_details.0.bill_no") || get(r, "grn_details.1.bill_no"),
          bill_date: dateFormate(
            get(r, "grn_details.0.bill_date") ||
              get(r, "grn_details.1.bill_date")
          ),
          bill_value:
            get(r, "grn_details.0.bill_value") ||
            get(r, "grn_details.1.bill_value"),
          challan_no:
            get(r, "grn_details.0.challan_no") ||
            get(r, "grn_details.1.challan_no"),
          challan_date: dateFormate(
            get(r, "grn_details.0.challan_date") ||
              get(r, "grn_details.1.challan_date")
          ),
          vehicle_no:
            get(r, "grn_details.0.vehicle_no") ||
            get(r, "grn_details.1.vehicle_no"),
          waybill_no:
            get(r, "grn_details.0.waybill_no") ||
            get(r, "grn_details.1.waybill_no"),
          grn_no:
            get(r, "grn_details.0.grn_no") || get(r, "grn_details.1.grn_no"),
          grn_date: dateFormate(
            get(r, "grn_details.0.grn_date") || get(r, "grn_details.1.grn_date")
          ),
          note: get(r, "grn_details.0.note") || get(r, "grn_details.1.note"),
          direact_purchase_status: r?.direact_purchase_status,
          purchase_order_status: r?.purchase_order_status,
          showroom_warehouse_id: r?.showroom_warehouse_id,
          po_number: r.po_number,
          po_date: dateFormate(r?.po_date),
          po_note: r?.po_note,
          po_value: currencyFormate(r?.item_details[0].net_value),
          received_item_details: r?.received_item_details,
        });
      });
      
      //console.log(allItems[0],"sen8989")
      return onSuccess(allItems[0]);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllSource = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/source/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allSource = [];
      r.map((r) => {
        allSource.push({
          value: r.source_id,
          label: r.source,
        });
      });
      onSuccess(allSource);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllShowroomWarehouse = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/showrooms-warehouse/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allShowroomWarehouse = [];
      r.map((r) => {
        allShowroomWarehouse.push({
          value: r.showrooms_warehouse_type,
          label: r.showrooms_warehouse,
        });
      });
      onSuccess(allShowroomWarehouse);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const postDirectPurchase = async (
  info,
  item_details,
  inserted_by_id,
  mode,
  onSuccess,
  onFailure
) => {
  //console.log(inserted_by_id,"560656")
  try {
    const res = await webApi.post("/master/purchase/insert", {
      module: info.module,
      vendor_id: info.ddl_vendor_group?.value,
      approve_id:0,
      // grn_no: r.grn_no,
      // grn_date: dateFormate(r.grn_details[0].grn_date),
      po_number: info.txt_po_no,
      po_date: timestamp(info.txt_po_date),
      reference_no: info.txt_reference_no,
      reference_date: timestamp(info.txt_reference_date),
      item_details: item_details,
      po_note: info.txt_note,
      showroom_warehouse_id: Number(info.ddl_showroom_warehouse?.value),
      po_value: Number(info.txt_po_value),

      grn_details:
        mode === "DIRECT PURCHASE"
          ? [
              {
                bill_no: info.txt_bill_no,
                bill_date: timestamp(info.txt_bill_date),
                bill_value: info.txt_bill_value,

                challan_no: info.txt_challan_no,
                challan_date: timestamp(info.txt_challan_date),
                // grn_no: info.txt_grn_no,
                vehicle_no: info.txt_vehicle_no,
                waybill_no: info.txt_waybill_no,
                grn_date: timestamp(info.txt_grn_date),
                note: info.txt_note,
              },
            ]
          : [
              {
                bill_no: info.txt_bill_no,
                bill_date: timestamp(info.txt_bill_date),
                bill_value: info.txt_bill_value,

                challan_no: info.txt_challan_no,
                challan_date: timestamp(info.txt_challan_date),

                vehicle_no: info.txt_vehicle_no,
                waybill_no: info.txt_waybill_no,
                grn_date: timestamp(info.txt_grn_date),
                note: info.txt_note,
              },
            ],

      active_status: info.switch_active_status ? "Y" : "N",
      inserted_by_id:inserted_by_id,
    });
    if (res.status === 200) {
      const r = res.data;
      onSuccess(r);
      // if (info.stock_update) {
      //   r.item_details.map((item) => {
      //     const movRes = webApi.post("/master/stock_movement/insert", {
      //       transaction_type: "DR",
      //       transaction_id: r.purchase_id,
      //       transaction_date: timestamp(currentDate()),
      //       showroom_warehouse_id: r.showroom_warehouse_id,
      //       item_id: item.item_id,
      //       plus_qty: Number(item.quantity),
      //       minus_qty: 0,
      //       unit_id: item.uom_id,
      //     });
      //   });
      // }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const updateDirectPurchase = async (
  info,
  item_details,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/purchase/update", {
      purchase_id: info.direct_purchase_id
        ? info.direct_purchase_id
        : info.purchase_order_id,
      vendor_id: info.ddl_vendor_group?.value,
      po_number: info.txt_po_no,
      // grn_no: r.grn_no,
      // grn_date: dateFormate(r.grn_details[0].grn_date),
      po_date: timestamp(info.txt_po_date),
      item_details: item_details,
      po_value: Number(info.txt_po_value),
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
    // item_details.map((item) => {
    //   const movRes = webApi.post("/master/stock_movement/insert", {
    //     transaction_type: "DR",
    //     transaction_id: r.purchase_id,
    //     transaction_date: timestamp(currentDate()),
    //     showroom_warehouse_id: r.showroom_warehouse_id,
    //     item_id: item.item_id,
    //     plus_qty: Number(item.quantity),
    //     minus_qty: 0,
    //     unit_id: item.uom_id,
    //   });
    // });
    if (res.status === 200) {
      const r = res.data;
      //console.log(res,"000")
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// export const postJournalFromDirectPurchase = async (invoiceDetail,journal_details,sales_details,gt) => {
//   //console.log(invoiceDetail,"invoiceDetail5")
  
//   // try {
//     const res = await webApi.post("/master/journal/insert", {
//       journal_type: "J",
//       narration: `Being goods sold to M/S ${invoiceDetail.ddl_vendor_group.label} as per Dated ${dateFormate(timestamp(invoiceDetail?.txt_bill_date))}`,
//       voucher_amount:gt,
//       voucher_date: timestamp(invoiceDetail?.txt_invoice_date),
      
//       journal_details: [journal_details[0],sales_details[0]]
//       // active_status: journal.switch_active_btn ? "Y" : "N",

//     });
//     // if (res.status === 200) {

//     //   const r = res.data;
//     //   //console.log(r, "res");
//     //   onSuccess(r);
//     // } else {
//     //   //console.log("Something Wrong!");
//     //   onFailure("Something Wrong! Please Try again later " + res.data);
//     // }
//   // } catch (error) {
//   //   onFailure("Something Wrong! Please Try again later " + error);
//   // }
// };

export const getVendorByVendorName = async (vendor_name,onSuccess, onFailure) => {

  //console.log(vendor_name,"999d2")
  try {
    const res = await webApi.post("/master/ledger_account/list", {
      
      // source_id: q?.ddl_source.value,
      ledger_account: vendor_name,
      type: "V",
      // keyword_pharse: q.txt_keyword_pharse,
    });
    
    if (res.status === 200) {
      const r = res.data;
      let allLedg = [];
      //console.log(r,"0001")
      r.map((c, i) => {
        allLedg.push({
          // id: i + 1,
          vendor_id:c.ledger_account_id ,
        
        });
      });
      if(allLedg.length){
        //console.log(allLedg,"999d3")
      return onSuccess(allLedg);
    } 
    else {
      onFailure("Vendor Ledger not Found");
    }
  }
    
    else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
