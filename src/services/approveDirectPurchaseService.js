import get from "lodash.get";
import {
    dateFormate,
    currentDate,
    currencyFormate,
  } from "views/Pages/HelperComponent/utils";
  import { timestamp } from "./Utils/utils";
  import webApi from "./webApi/webApi";
import moment from "moment";


  //For search purchase
  export const getDirectPurchaseById = async (
    purchase_id,
    ddl_status,
    onSuccess,
    onFailure
  ) => {

    // console.log(ddl_status,"8585")
    try {
      const res = await webApi.post("/master/purchase/list", {
        purchase_id: purchase_id,
        ddl_status: ddl_status,
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
  
          // console.log(
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
            grn_no: get(r,"grn_no")||
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
            po_note: r.dplNote,
            po_value: currencyFormate(r?.item_details[0].net_value),
            received_item_details: r.received_item_details,
          });
        });
        return onSuccess(allItems[0]);
      } else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    } catch (error) {
      onFailure("Something Wrong! Please Try again later " + error);
    }
  };
export const getSearchDirectPurchase = async (onSuccess, onFailure, q) => {
    // console.log(q.ddl_vendor, "vendor");
    try {
      const res = await webApi.post("/master/purchase/list", {
        vendor_id: q.ddl_vendor?.value,
        showroom_warehouse_id: q.ddl_showroom_warehouse?.value,
        bill_no: q.txt_bill_no,
        direct_purchase_from_date: timestamp(q.txt_direct_purchase_from_date),
        direct_purchase_to_date: timestamp(q.txt_direct_purchase_to_date),
        direct_purchase_keyword: q.txt_keyword_phrase,
      });
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
              dplBillDate: dateFormate(
                get(r, "grn_details.0.bill_date") ||
                  get(r, "grn_details.1.bill_date")
              ),
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
              menu: [
                {
                  label: "View",
                  link: "/admin/procurement/direct-purchase-view",
                },
                {
                  label: "Approve",
                  link: "/admin/procurement/approve-direct-purchase-form",
                  itemEdit: true,
                },
                // {
                //   label: "Update To Do",
                //   link: "/admin/procurement/direct-purchase-view",
                //   updateTask: true,
                // },
                // {
                //   label: "Update Status",
                //   link: "/admin/sale/quatation-view",
                //   updateStatus: true,
                // },
              ],
            });
          }
        });
  
        if (allItems.length) {
          return onSuccess(allItems);
        } else {
          // console.log("direct");
          return onFailure("Direct Purchase Not Found");
        }
      } else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    } catch (error) {
      onFailure("Something Wrong! Please Try again later " + error);
    }
  };

  export const getAllDirectPurchaseList = async (onSuccess, onFailure) => {
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
              menu: [
                {
                  label: "View",
                  link: "/admin/procurement/direct-purchase-view",
                },
                // {
                //   label: "Approve",
                //   link: "/admin/procurement/add-direct-purchase",
                //   itemEdit: true,
                // },
                // {
                //   label: "Update To Do",
                //   link: "/admin/procurement/direct-purchase-view",
                //   updateTask: true,
                // },
                // {
                //   label: "Update Status",
                //   link: "/admin/sale/quatation-view",
                //   updateStatus: true,
                // },
              ],
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


  export const postJournalFromDirectPurchase = async (invoiceDetail,journal_details,gt,grn) => {
  // console.log(invoiceDetail,"invoiceDetail5",invoiceDetail?.grn_date)
  
  // try {
    const res = await webApi.post("/master/journal/insert", {
      journal_type: "J",
      transaction_id:grn,
      transaction_type:"Direct Purchase",
      narration: `Being goods purchase from M/S ${invoiceDetail.ddl_vendor_group.label} as per Dated ${invoiceDetail?.grn_date}`,
      voucher_amount:gt,
      voucher_date: moment(invoiceDetail?.grn_date,"DD-MM-YYYY").unix(),
      
      journal_details: journal_details,
      // active_status: journal.switch_active_btn ? "Y" : "N",

    });

    //update closing balance in ledgerstorage table
    journal_details.map(async(r)=>{
      const data = await webApi.post("/master/ledger_storage/update",
      {
        amount:r.amount,
        ledgerId:r.ddl_ledger_id,
        dr_cr:r.dr_cr,
      })
     })
     
    // if (res.status === 200) {

    //   const r = res.data;
    //   console.log(r, "res");
    //   onSuccess(r);
    // } else {
    //   console.log("Something Wrong!");
    //   onFailure("Something Wrong! Please Try again later " + res.data);
    // }
  // } catch (error) {
  //   onFailure("Something Wrong! Please Try again later " + error);
  // }
};

export const getVendorByVendorName = async (vendor_name,onSuccess, onFailure) => {

  // console.log(vendor_name,"999d2")
  try {
    const res = await webApi.post("/master/ledger_account/list", {
      
      // source_id: q?.ddl_source.value,
      ledger_account: vendor_name,
      // keyword_pharse: q.txt_keyword_pharse,
    });
    
    if (res.status === 200) {
      const r = res.data;
      let allLedg = [];
      // console.log(r,"0001")
      r.map((c, i) => {
        allLedg.push({
          // id: i + 1,
          vendor_id:c.ledger_account_id ,
        
        });
      });
      if(allLedg.length){
        // console.log(allLedg,"999d3")
      return onSuccess(allLedg);
    } 
    else {
      onFailure("Vendor not Found " );
    }
  }
    
    else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const updateDirectPurchase = async (
  addedItems,
  itemDetail,
  purchase_id,
  user_id,
  grandTotal,
  onSuccess,
  onFailure
) => {
  // console.log(addedItems,"30037")
  try {
    const res = await webApi.post("/master/purchase/update", {
      // purchase_id: info.direct_purchase_id
      //   ? info.direct_purchase_id
      //   : info.purchase_order_id,
      purchase_id: purchase_id,
      // vendor_id: info.ddl_vendor_group?.value,
      // po_number: info.txt_po_no,
      grn_no: addedItems.grn_no,
      grn_date: dateFormate(currentDate()),
      // po_date: timestamp(info.txt_po_date),
      item_details: itemDetail,
      // po_value: Number(info.txt_po_value),
      po_note: addedItems.note,
      grn_details: [
        {
          bill_no: addedItems.bill_no,
          bill_date:moment(addedItems?.dplBillDate,"DD-MM-YYYY").unix(),
          bill_value: grandTotal,

          challan_no: addedItems.challan_no,
          challan_date: timestamp(addedItems.challan_date),

          vehicle_no: addedItems.vehicle_no,
          waybill_no: addedItems.waybill_no,

          grn_no: addedItems.grn_no,
          grn_date: moment(addedItems?.grn_date,"DD-MM-YYYY").unix(),
          note: addedItems.note,
        },
      ],
      approve_id: user_id,
      status: "Y",
      approved_by_date:timestamp(currentDate())
      // approved_by_date:timestamp(currentDate())
    });
    // console.log(r,"0002")
 
    if (res.status === 200) {
      const r = res.data;
      onSuccess(r);
        //  if (info.stock_update) {
          addedItems.item_details.map((item) => {
          const movRes = webApi.post("/master/stock_movement/insert", {
            transaction_type: "DR",
            transaction_id:addedItems?.purchase_id,
            transaction_date: timestamp(addedItems?.grn_date),
            showroom_warehouse_id: addedItems?.showroom_warehouse_id,
            item_id: item.item_id,
            plus_qty: Number(item.quantity),
            minus_qty: 0,
            unit_id: item.uom_id,
          });
        });
      // }
    } else {
      onFailure("Something Wrong!1 Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong!2 Please Try again later " + error);
  }
};

export const DeleteDirectPurchase = async (
  purchase_id,
  user_id,
  onSuccess,
  onFailure
) => {
  // console.log(purchase_id,user_id,"30037")
  try {
    const res = await webApi.post("/master/purchase/update", {
      purchase_id: purchase_id,
      // inserted_by_id:user_id,
      // edited_by_id: user_id,
      deleted_by_id:user_id,
      status: "Y",
      deleted_by_date:timestamp(currentDate())
      // approved_by_date:timestamp(currentDate())
    });
 
    if (res.status === 200) {
      const r = res.data;
      // console.log(r,"0002")
      onSuccess(r);
        //  if (info.stock_update) {
        //   addedItems.item_details.map((item) => {
        //   const movRes = webApi.post("/master/stock_movement/insert", {
        //     transaction_type: "DR",
        //     transaction_id:addedItems?.purchase_id,
        //     transaction_date: timestamp(currentDate()),
        //     showroom_warehouse_id: addedItems?.showroom_warehouse_id,
        //     item_id: item.item_id,
        //     plus_qty: Number(item.quantity),
        //     minus_qty: 0,
        //     unit_id: item.uom_id,
        //   });
        // });
      // }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};