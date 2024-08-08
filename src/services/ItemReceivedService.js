import { dateFormate, currentDate } from "views/Pages/HelperComponent/utils";
import { timestamp } from "./Utils/utils";
import webApi from "./webApi/webApi";

// export const getAllPurchaseList = async (onSuccess, onFailure, addGRN) => {
//   try {
//     const res = await webApi.post("/master/purchase/list", {});
//     if (res.status === 200) {
//       const r = res.data;
//       let allItems = [];
//       let inc = 0;
//       r.map((r, i) => {
//         if (r.module === "PURCHASE_ORDER" || r.module === "ITEMRECEIVED") {
//           inc++;
//           allItems.push({
//             grnID: i + 1,
//             grnDate: dateFormate(r.grn_date),
//             grnNo: r.grnNo,
//             poNo: "MM/PO/21-22/0005",
//             grnVendor: "Microland India Tiles",
//             grnPoValue: "22",
//             grnStatus: "active",
//             grnAction: "view-action",

//             menu: [
//               {
//                 label: "View",
//                 link: "#",
//               },
//               {
//                 label: "Edit",
//                 link: "#",
//               },
//             ],

//             polID: inc,
//             purchase_id: r.purchase_id,
//             polDate: dateFormate(r?.po_date),
//             polNo: r.po_number,
//             polValue: currencyFormate(r.po_value),
//             polVendor: r.vendor_name,
//             item_details: r.item_details,
//             // poStatus: r.purchase_order_status,
//             polAction: "view-action",
//             menu: customMenu,
//           });
//         }
//       });
//       return onSuccess(allItems);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

export const getAllItemReceivedList = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/purchase/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      let inc = 0;

      r.map((r, i) => {
        if (r.module === "ITEMRECEIVED") {
          r.grn_details.map((grn, i) => {
            if (grn.grn_no) {
              inc++;
              allItems.push({
                grnID: inc,
                purchase_id: r.purchase_id,
                grnDate: dateFormate(grn.bill_date),
                grnNo: grn.grn_no,
                poNo: r.po_number,
                grnVendor: r.vendor_name,
                grnPoValue: grn.bill_value,
                grnAction: "view-action",
                grnStatus: "active",
                menu: [
                  {
                    label: "View",
                    link: "",
                  },
                  {
                    label: "Edit",
                    link: "",
                  },
                ],
              });
            }
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

//FOR SEARCHING PURPOSE
export const getSearchAllItemReceivedList = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/master/purchase/list", {
      po_no: q.txt_po_no,
      grn_no: q.txt_grn_no,
      grn_date_from_date: timestamp(q.grn_date_from),
      grn_date_to_date: timestamp(q.grn_date_to),
      po_date_from_date: timestamp(q.po_date_from),
      po_date_to_date: timestamp(q.po_date_to),
      vendor_id: q.ddl_vendor?.value,
      showroom_warehouse_id: q.ddl_showroom_warehouse?.value,
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      let inc = 0;

      r.map((r, i) => {
        if (r.module === "ITEMRECEIVED") {
          r.grn_details.map((grn, i) => {
            if (grn.grn_no) {
              inc++;
              allItems.push({
                grnID: inc,
                purchase_id: r.purchase_id,
                grnDate: dateFormate(grn.bill_date),
                grnNo: grn.grn_no,
                poNo: r.po_number,
                grnVendor: r.vendor_name,
                grnPoValue: grn.bill_value,
                grnAction: "view-action",
                grnStatus: "active",
                menu: [
                  {
                    label: "View",
                    // link: "/admin/procurement/received-view",
                    clickBtn:true
                  },
                  {
                    label: "Edit",
                    link: "/admin/procurement/received-edit",
                  },
                ],
              });
            }
          });
        }
      });
      if (allItems.length) {
        return onSuccess(allItems);
      } else {
        onFailure("Item Received not found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const upadateItemReceived = async (
  info,
  updatedItems,
  journal_details,
  // sales_details,
  gt,
  purchase_id,
  user,
  onSuccess,
  onFailure
) => {
  // console.log(user,"sen12345")
  try {
    const res = await webApi.post("/master/purchase/update", {
      module: info.module,
      purchase_id: info.purchase_id,
      received_item_details: updatedItems,
      showroom_warehouse_id: info.ddl_showroom_warehouse?.value,
      approve_id: user,
      grn_details: {
        bill_no: info.txt_bill_no,
        bill_date: timestamp(info.txt_bill_date),
        bill_value: info.txt_bill_value,
        vendor_id: info.ddl_vendor_group?.value,
        challan_no: info.txt_challan_no,
        challan_date: timestamp(info.txt_challan_date),

        vehicle_no: info.txt_vehicle_no,
        waybill_no: info.txt_waybill_no,
        grn_date: timestamp(info.txt_grn_date),
        note: info.txt_note,
        updatingItemReceived: info.updatingItemReceived,
        
      },
    });
    updatedItems.map((item) => {
      const movRes = webApi.post("/master/stock_movement/insert", {
        transaction_type: "PR",
        transaction_id: info.purchase_id,
        transaction_date: timestamp(currentDate()),
        showroom_warehouse_id: info.ddl_showroom_warehouse?.value,
        item_id: item.item_id,
        plus_qty: Number(item.receivedQty),
        minus_qty: 0,
        unit_id: item.uom_id,
      });
    });
    if (res.status === 200) {
      const r = res.data;
      const res1 = await webApi.post("/master/journal/insert", {
        journal_type: "J",
        transaction_id: r.received_grn_no,
        transaction_type: "Purchase",
        narration: `Being goods purchase from M/S ${
          info.ddl_vendor_group.label
        } as per Dated ${dateFormate(timestamp(info?.txt_bill_date))}`,
        voucher_amount: gt,
        voucher_date: timestamp(info?.txt_invoice_date),
        // module:"Purchase",
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
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getItemReceivedById = async (grnNo, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/purchase/list", {
      grn_no: grnNo,
      module: "ITEMRECEIVED",
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
       
       
        allItems.push({
          // dplID: i + 1,
          // purchase_id: r.purchase_id,
          // dplBillDate: dateFormate(r?.grn_details[0].bill_date),
          // dplBillNo: r?.grn_details[0].bill_no,
          dplVendor: r.vendor_name,
          // vendor_id: r.vendor_id,
          // ddl_vendor_group: {
          //   value: r.vendor_id,
          //   label: r.vendor_name,
          // },
          // dplGrossAmount: "150200",
          // dplTaxes: "27036",
          // dplOtherCharges: "500",
          // dplNetAmount: "177736",
          receivedQty: r.received_item_details[0]?.receivedQty,
          item_details: r.item_details,
          bill_no: r.grn_details[0].bill_no
            ? r.grn_details[0].bill_no
            : r.grn_details[1].bill_no,
          bill_date: dateFormate(r.grn_details[0].bill_date),
          bill_value: r.grn_details[0].bill_value
            ? r.grn_details[0].bill_value
            : r.grn_details[1].bill_value,
          challan_no: r.grn_details[0].challan_no
            ? r.grn_details[0].challan_no
            : r.grn_details[1].challan_no,
          note: r.grn_details[0].note,
          challan_date: dateFormate(r.grn_details[0].challan_date),
          vehicle_no: r.grn_details[0].vehicle_no
            ? r.grn_details[0].vehicle_no
            : r.grn_details[1].vehicle_no,
          waybill_no: r.grn_details[0].waybill_no
            ? r.grn_details[0].waybill_no
            : r.grn_details[1].waybill_no,
          grn_no: grnNo,
          //grn_no: r.received_item_details[0].grn_no,
          grn_date: dateFormate(r.grn_details[0].grn_date),
          note: r.grn_details[0].note,
          direact_purchase_status: r.direact_purchase_status,
          purchase_order_status: r.purchase_order_status,
          showroom_warehouse_id: r.showroom_warehouse_id,
          po_number: r.po_number,
          po_date: dateFormate(r.po_date),
          po_note: r.po_note ? r.po_note : "",
          po_value: r.received_item_details[0]?.net_value,
          received_item_details: r.received_item_details,
          grn_details: r.grn_details,
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

// export const postJournalFromDirectPurchase = async (billDetail,journal_details,sales_details,gt,purchase_id) => {
//   console.log(journal_details,"999bb3")

//   try {
//     const res = await webApi.post("/master/journal/insert", {
//       journal_type: "J",
//       transaction_id:purchase_id,
//       transaction_type:"Purchase",
//       narration: `Being goods purchase from M/S ${billDetail.ddl_vendor_group.label} as per Dated ${dateFormate(timestamp(billDetail?.txt_bill_date))}`,
//       voucher_amount:gt,
//       voucher_date: timestamp(billDetail?.txt_invoice_date),
//       // module:"Purchase",
//       journal_details: [journal_details[0],sales_details[0]]
//       // active_status: journal.switch_active_btn ? "Y" : "N",

//     });
//     // if (res.status === 200) {

//     //   const r = res.data;
//     //   console.log(r, "res");
//     //   onSuccess(r);
//     // } else {
//     //   console.log("Something Wrong!");
//     //   onFailure("Something Wrong! Please Try again later " + res.data);
//     // }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

export const getVendorByVendorName = async (
  vendor_name,
  onSuccess,
  onFailure
) => {
  // console.log(vendor_name, "999d2");
  try {
    const res = await webApi.post("/master/ledger_account/list", {
      // source_id: q?.ddl_source.value,
      ledger_account: vendor_name,
      // keyword_pharse: q.txt_keyword_pharse,
    });

    if (res.status === 200) {
      const r = res.data;
      let allLedg = [];
      // console.log(r, "0001");
      r.map((c, i) => {
        allLedg.push({
          // id: i + 1,
          vendor_id: c.ledger_account_id,
        });
      });
      if (allLedg.length) {
        // console.log(allLedg, "999d3");
        return onSuccess(allLedg);
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
