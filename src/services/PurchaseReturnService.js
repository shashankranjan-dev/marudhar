export const PurchaseOrderRowData = [];

import { get } from "lodash";
import {
  dateFormate,
  currencyFormate,
  currentDate,
} from "views/Pages/HelperComponent/utils";
import { timestamp } from "./Utils/utils";
import { getAllVendors } from "./vendorService";
import webApi from "./webApi/webApi";

export const getAllPurchaseList = async (onSuccess, onFailure, q, addGRN) => {
  let customMenu;
  if (addGRN) {
    customMenu = [
      {
        label: "View",
        link: "/admin/procurement/purchase-view",
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
        link: "/admin/procurement/purchase-view",
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
      purchase_from_date: timestamp(q.txt_date_from),
      purchase_to_date: timestamp(q.txt_date_to),
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
            polValue: r.item_details.reduce(
              (sum, li) => Number(sum) + Number(li.net_value),
              0
            ),
            polVendor: r.vendor_name,
            polOtherCharges: 0,
            item_details: r.item_details,
            // poStatus: r.purchase_order_status,
            polAction: "view-action",
            menu: customMenu,
          });
        }
      });
      if (allItems.length) {
        return onSuccess(allItems);
      } else {
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
export const getSearchAllPurchaseList = async (
  onSuccess,
  onFailure,
  q,
  addGRN
) => {
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
      {
        label: "View",
        link: "/admin/procurement/purchase-view",
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
      purchase_from_date: timestamp(q.txt_purchase_from_date),
      purchase_to_date: timestamp(q.txt_purchase_to_date),
      po_no: q.txt_po_no,
      // purchase_keyword: q.txt_keyword_phrase,
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
            polDate: dateFormate(r?.grn_details[0].bill_date),
            vendor_id: r.vendor_id,
            purchase_id: r.purchase_id,
            polDate: dateFormate(r?.po_date),
            polNo: r.po_number,
            refNo: r.reference_no,
            refDate: dateFormate(r?.reference_date),
            polValue: r.item_details.reduce(
              (sum, li) => Number(sum) + Number(li.net_value),
              0
            ),
            polVendor: r.vendor_name,

            item_details: r.item_details,
            // poStatus: r.purchase_order_status,
            polAction: "view-action",
            menu: customMenu,
          });
        }
      });
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

export const PurchaseReturnSearchList = async (
  onSuccess,
  onFailure,
  q,
  addGRN,
  grn_no
) => {
  //console.log(q, "09042022");

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
    const res = await webApi.post("/reports/PurchaseRegister/purchaselistforreturn", {
      grn_no: grn_no,
      showroom_warehouse_id: q.ddl_showroom_warehouse?.value,
      vendor_id: q.ddl_vendor?.value,
      bill_from_date: timestamp(q.txt_bill_from_date),
      bill_to_date: timestamp(q.txt_bill_to_date),
      bill_no: q.txt_bill_no,
      item: q.txt_item,
    });
   

    //console.log(res, "5050");
    if (res.status === 200) {
      const returnData = res.data;
      //console.log(r, "service 77a");
      let allItems = [];
      let inc = 0;
      let grn_no = '';
      console.log(returnData,'returnData')

      returnData.map((r, i) => {
        if(grn_no !== r.grn){
          grn_no = r.grn;
          let itemNameData = returnData.filter((o) => (o.grn == grn_no)); 

          console.log(itemNameData,'itemNameData');

          inc++;
          allItems.push({
            polID: inc,
            purchase_id: r.purchase_id,
            polDate: dateFormate(r.bill_date),
            polNo: r.bill_no,
            polVendor: r.vendor_name,
            polDiscount: r.disc_value,
            polItem_name: itemNameData.map((data) =>  data.item_name+' , '),
            module: r.module,
            polGross: r.bill_value[0],
            grn: r.grn,
            polGst: currencyFormate(r.gst_value),
            polAction: "view-action",
            menu: [
              {
                label: "Return",
                // clickBtn: true,
                link: "/admin/procurement/add-purchase",
              },
            ],
          });
          
        }

      });
      //console.log(allItems, "9992at");
      if (allItems.length) {
        return onSuccess(allItems);
      } else {
        return onFailure("Purchase Return Not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const PurchaseReturnByIdForReturn = async (
  grn_no,
  onSuccess,
  onFailure
) => {
  // //console.log(grn_no,"service return");
  try {
    const res = await webApi.post("/master/purchase/list", {
      grn_no: grn_no,
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      let inc = 0;

      r.map((r, i) => {
        inc++;
        allItems.push({
          item_id: r.item_details[0].item_id,
          rate: r.item_details[0].rate,
          gst_percentage: r.item_details[0].gst_percentage,
          gst_value: r.item_details[0].gst_value,
          net_value: r.item_details[0].net_value,
          grn_no: r.received_item_details[0].grn_no,
          return_qty: "",
        });
        // }
      });
      if (allItems.length) {
        return onSuccess(allItems);
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

export const PurchaseReturnById = async (
  grn_no,
  module,
  purchase_id,
  onSuccess,
  onFailure
) => {
  //console.log(grn_no, module, "5abc3");

  try {
    const res = await webApi.post("/master/purchase/list", {
      grn_no: grn_no,
      module: module,
      purchase_id: purchase_id,
    });

    if (res.status === 200) {
      const r = res.data;
      // const r2 = res2.data;
      let allItems = [];
      let inc = 0;

      //console.log(res, "5abc3");

      if (r.length > 0) {
        if (r[0].module === "ITEMRECEIVED") {
          //ItemRecived
          r.map((r, i) => {
            //console.log("reched it");
            let grn_cr = r.grn_details.filter((o) => o.grn_no === grn_no)[0];
            let received_item_details = r.received_item_details.filter(
              (o) => o.grn_no === grn_no
            );
            inc++;
            allItems.push({
              polID: inc,
              grn_no: r.received_item_details?.grn_no,
              purchase_id: r.purchase_id,
              billDate: dateFormate(grn_cr.bill_date),
              billNo: grn_cr.bill_no,
              billVendor: r.vendor_name,
              vendor_id: r.vendor_id,
              polDiscount: r.disc_value,
              billValue: grn_cr.bill_value,
              polGross: currencyFormate(r.quantity * r.rate),
              polGst: currencyFormate(r.gst_value),
              item_details: r.item_details,
              received_item_details: received_item_details,
            });
            //  }
          });
        } else {
          //console.log("reched not it");
          //DirectPurchase

          //console.log(r, "5abc2");
          // let grn = r.filter((o) => o.grn_no === grn_no)[0];

          // //console.log(grn.grn_details[0]?.bill_value, "5abcf")

          inc++;
          allItems.push({
            polID: inc,
            grn_no: r[0]?.grn_no,

            billValue: r[0]?.grn_details[0]?.bill_value,

            billDate: dateFormate(r[0]?.grn_details[0]?.bill_date),
            billNo: r[0]?.grn_details[0]?.bill_no,
            billVendor: r[0]?.vendor_name,
            grn_details: r[0]?.grn_details,
            // item_details: grn.item_details,
            received_item_details: r[0]?.item_details,

            polDiscount: r.item_details?.disc_value,
            // billValue: r[0]?.grn_details.bill_value,
            polGross: currencyFormate(r.item_details?.quantity * r.rate),
            polGst: currencyFormate(r.item_details?.gst_value),
          });

          // })
        }
      }
      //console.log(allItems, "999atr");

      if (allItems.length) {
        return onSuccess(allItems);
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

export const getAllAddGrnList = async (onSuccess, onFailure, q, addGRN) => {
  let customMenu;
  if (addGRN) {
    customMenu = [
      {
        label: "View",
        link: "/admin/procurement/purchase-view",
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
        link: "/admin/procurement/purchase-view",
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
      purchase_from_date: timestamp(q.txt_date_from),
      purchase_to_date: timestamp(q.txt_date_to),
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
            GrnValue: r.item_details.reduce(
              (sum, li) => Number(sum) + Number(li.net_value),
              0
            ),
            GrnVendor: r.vendor_name,
            polOtherCharges: 0,
            item_details: r.item_details,
            // poStatus: r.purchase_order_status,
            GrnAction: "view-action",
            menu: customMenu,
          });
        }
      });
      if (allItems.length) {
        return onSuccess(allItems);
      } else {
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

export const postPurchaseReturn = async (
  billDetail,
  showroom_warehouse_id,
  purchaseRegisterReturn,
  updatedItem,
  journal_details,
  gt,
  vendor,
  onSuccess,
  onFailure
) => {
  // //console.log(vendor_id,"vendor_id");
  //console.log(billDetail, "billDetail55");
  //console.log(showroom_warehouse_id, "29036");

  try {
    const res = await webApi.post("/master/purchase_return/insert", {
      module: "PURCHASE_RETURN_ORDER",
      purchase_return_no: billDetail.txt_purchase_return_no,
      purchase_return_date: timestamp(billDetail.txt_return_date),
      showroom_warehouse_id: showroom_warehouse_id,

      purchase_returned_bill_value: billDetail.txt_returned_bill_value,
      challan_no: billDetail.txt_challan_no,
      challan_date: timestamp(billDetail.txt_challan_date),
      vehicle_no: billDetail.txt_vehicle_no,
      waybill_no: billDetail.txt_waybill_no,
      grn_no: purchaseRegisterReturn[0].grn_no,
      vendor_id: purchaseRegisterReturn[0].vendor_id,
      vendor: purchaseRegisterReturn[0].billVendor,
      return_details: [
        {
          purchase_returned_bill_value: billDetail.txt_returned_bill_value,
          item_details: updatedItem,
        },
      ],

      // vendor_id:billDetail?.ddl_vendor_group,

      note: billDetail.txt_note,
      // details: info.txt_details,
      active_status: billDetail.switch_active_status ? "Y" : "N",
    });
    //console.log(res.data?.purchase_return_id, "resData");

    if (res.status === 200) {
      const r = res.data;
      updatedItem.map((item) => {
        //console.log(item, " 9696 ", r?.purchase_return_id);
        const movRes = webApi.post("/master/stock_movement/insert", {
          transaction_type: "RP",
          transaction_id: r?.purchase_return_id,
          transaction_date: timestamp(currentDate()),
          showroom_warehouse_id: showroom_warehouse_id,
          item_id: item.item_id,
          minus_qty: Number(item.return_qty),
          plus_qty: 0,
          unit_id: item.uom_id,
        });
        const jres = webApi.post("/master/journal/insert", {
          journal_type: "J",
          transaction_id: r?.purchase_return_no,
          transaction_type: "Purchase Return",
          narration: `Being goods purchase from M/S ${vendor} as per Dated ${dateFormate(
            timestamp(billDetail?.txt_return_date)
          )}`,
          voucher_amount: gt,
          voucher_date: timestamp(billDetail?.txt_return_date),
          journal_details: journal_details,
          // active_status: journal.switch_active_btn ? "Y" : "N",
        });

        //update closing balance in ledgerstorage table
        journal_details.map(async (r) => {
          const data = await webApi.post("/master/ledger_storage/update",
            {
              amount: r.amount,
              ledgerId: r.ddl_ledger_id,
              dr_cr: r.dr_cr,
            })
        })

        onSuccess(r);
        //console.log(movRes, "96961");
      });
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getSearchPurchaseReturnList = async (onSuccess, onFailure, q) => {
  let customMenu;

  try {
    const res = await webApi.post("/master/purchase_return/list", {
      vendor_id: q.ddl_vendor?.value,
      purchase_return_date: timestamp(q.txt_return_bill_from_date),
      purchase_return_to_date: timestamp(q.txt_return_bill_to_date),
      purchase_return_no: q.txt_purchase_return_no,

    });

    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      let inc = 0;

      r.map((r, i) => {
        //console.log(r, "sen20045");
        inc++;
        allItems.push({
          polID: inc,
          purchase_id: r.purchase_id,
          polDate: dateFormate(r.purchase_return_date),
          polNo: r.purchase_return_no,
          // polVendor: r.vendor_id,

          polVendor: r.vendor,
          vendor_id: r.vendor_id,
          grn_no: r.grn_no,
          polDiscount: r.disc_value,
          polChallanNo: r.challan_no,
          polGross: currencyFormate(r.quantity * r.rate),
          polGst: currencyFormate(r.gst_value),
          polNote: r.note,
          // polGross:(
          //   r.item_details.reduce(
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
        // }
      });
      //console.log(allItems, "alll");
      if (allItems.length) {
        return onSuccess(allItems);
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

export const getVendorByVendorName = async (
  vendor_name,
  onSuccess,
  onFailure
) => {
  //console.log(vendor_name, "999d2");
  try {
    const res = await webApi.post("/master/ledger_account/list", {
      // source_id: q?.ddl_source.value,
      ledger_account: vendor_name,
      // keyword_pharse: q.txt_keyword_pharse,
    });

    if (res.status === 200) {
      const r = res.data;
      let allLedg = [];
      //console.log(r, "0001");
      r.map((c, i) => {
        allLedg.push({
          // id: i + 1,
          vendor_id: c.ledger_account_id,
        });
      });
      if (allLedg.length) {
        //console.log(allLedg, "999d3");
        return onSuccess(allLedg);
      } else {
        onFailure("Vendor not Found ");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// export const postJournalFromPurchaseReturn = async (
//   invoiceDetail,
//   journal_details,
//   gt,
//   vendor
// ) => {
//   //console.log(vendor, "invoiceDetail5");

//   // try {
//   const res = await webApi.post("/master/journal/insert", {
//     journal_type: "J",

//     transaction_type: "Purchase Return",
//     narration: `Being goods purchase from M/S ${vendor} as per Dated ${dateFormate(
//       timestamp(invoiceDetail?.txt_return_date)
//     )}`,
//     voucher_amount: gt,
//     voucher_date: timestamp(invoiceDetail?.txt_return_date),
//     journal_details: journal_details,
//     // active_status: journal.switch_active_btn ? "Y" : "N",
//   });
//   // if (res.status === 200) {

//   //   const r = res.data;
//   //   //console.log(r, "res");
//   //   onSuccess(r);
//   // } else {
//   //   //console.log("Something Wrong!");
//   //   onFailure("Something Wrong! Please Try again later " + res.data);
//   // }
//   // } catch (error) {
//   //   onFailure("Something Wrong! Please Try again later " + error);
//   // }
// };
