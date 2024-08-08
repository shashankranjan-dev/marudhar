import webApi from "../webApi/webApi";
import { timestamp } from "../Utils/utils";
import { dateFormate,currentDate } from "views/Pages/HelperComponent/utils";

//for invoice details


export const getAllOtherCharges = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/charges/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allTerms = [];
      r.map((r, i) => {
        allTerms.push({
          id: i + 1,
          other_charges_id: r.charges_id,
          ledgerAccount: r.ledger_account_id,
          ledgerAccountName: r.ledger_account_name,
          charges: r.charges,
          sacCode: r.sac_code,
          details: r.details,
          action_items: r.action_items,
          status: r.active_status,
          action: "action",
        });
      });
      return onSuccess(allTerms);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const getAllOtherChargesChecking = async (q,onSuccess, onFailure) => {
  // console.log(q,"sen0606")
  try {
    const res = await webApi.post("/master/charges/list", {
      charges: q,
    });
    if (res.status === 200) {
      const r = res.data;
      let allTerms = [];
      r.map((r, i) => {
        allTerms.push({
          // id: i + 1,
          // other_charges_id: r.charges_id,
          ledgerAccount: r.ledger_account_id,
          // ledgerAccountName: r.ledger_account_name,
          // charges: r.charges,
          // sacCode: r.sac_code,
          // details: r.details,
          // action_items: r.action_items,
          // status: r.active_status,
          // action: "action",
        });
      });
      // console.log("sen0606=>",allTerms)
      return onSuccess(allTerms[0]);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postDirectInvoiceOrder = async (
  billDetail,
  addedItems,
  enquiryDetails,
  quotationDetails,
  chargesItems,
  customerDetail,
  inserted_by_id,
  journal_details,
  // sales_details,
  gt,
  onSuccess,
  onFailure
) => {
  try {
    // console.log("hhhhhhhhhhhhhhhhhh",billDetail);
    // if (info.edit) {
    //   res = await webApi.post("/master/sales/insert", {
    //     sales_id: info.sales_id,
    //     invoice_date: timestamp(info.txt_invoice_date),
    //     invoice_note: info.txt_invoice_note,
    //     invoice_item_details: addedItems,
    //     invoice_details: customerDetail,
    //     invoice_other_charges: chargesItem,

    //   });
    //   console.log("if")
    // } else {
    const res = await webApi.post("/master/sales/insert", {
      // sales_id: info.sales_id,
      module: "DIRECT_INVOICE",
      customer_id:billDetail.ddl_customer?.value,
      inserted_by_id:inserted_by_id,
      invoice_date: timestamp(billDetail.txt_invoice_order_date),
      invoice_note: billDetail.txt_invoice_note,
      invoice_item_details: addedItems,
      invoice_details: {
        ...customerDetail[0],
        invoice_date: timestamp(billDetail.txt_invoice_order_date),
        invoice_note: billDetail.txt_invoice_note,
      },
      invoice_other_charges: chargesItems,
      enquiry_item_details: enquiryDetails,
      quotation_item_details: quotationDetails,
      enquiry_details: {
        source_id: billDetail.ddl_sales_source,
        enquiry_date: timestamp(billDetail.txt_invoice_order_date),
        sales_executive_id: billDetail.ddl_sales_executive?.value,
        showroom_warehouse_id: billDetail.ddl_sales_showroom?.value,
        delivery_from_date: timestamp(billDetail.txt_sales_delivery_date),
        delivery_to_date: timestamp(billDetail.txt_sales_delivery_end),
        note: billDetail.txt_sales_note,
      },
    });
    // }
    // addedItems.map((item) => {
    //   const movRes = webApi.post("/master/stock_movement/insert", {
    //     transaction_type: "D",
    //     transaction_id: res.data?.sales_id,
    //     transaction_date: timestamp(currentDate()),
    //     showroom_warehouse_id: Number(item.showroom_warehouse_id),
    //     item_id: item.item_id,
    //     plus_qty: 0,
    //     minus_qty: Number(item.quantity),
    //     unit_id: item.uom_id,
    //   });
    // });
    if (res.status === 200) {
      const r = res.data;
      addedItems.map((item) => {
        const movRes = webApi.post("/master/stock_movement/insert", {
          transaction_type: "D",
          transaction_id:r?.sales_id,
          transaction_no:r?.invoice_no[0],
          transaction_date: timestamp(currentDate()),
          showroom_warehouse_id: Number(item.showroom_warehouse_id),
          item_id: item.item_id,
          plus_qty: 0,
          minus_qty: Number(item.quantity),
          unit_id: item.uom_id,
        });
      });
      // console.log(r, "ressen");
      const res2 = await webApi.post("/master/journal/insert", {
        journal_type: "J",
        transaction_id:r?.invoice_no[0],
        // transaction_no:,
        transaction_type: "Sales",
        narration: `Being goods sold to M/S ${billDetail.ddl_customer.label} as per Dated ${dateFormate(timestamp(billDetail?.txt_invoice_order_date))}`,
        voucher_amount:gt,
        voucher_date: timestamp(billDetail?.txt_invoice_order_date),
        module:"Sales",
        // module_id:1,
        journal_details: journal_details
        // active_status: journal.switch_active_btn ? "Y" : "N",
  
      });

      //brand report 
      addedItems.map(async (a,i) => {
        const resBrand = await webApi.post("/reports/brandReport/insert", {
          item_id: a.item_id,
          item: a.item,
          brand_id: a.brand_id,
          uom: a.uom_name,
          uom_id: a.uom_id,
          invoice_no: a.invoice_no,
          sales_id: r.sales_id,
          net_value: a.net_value,
          grossAmount: (Number(a.rate) - Number(a.disc_value)) * a.now_dispatch_qty,
          now_dispatch_qty: a.now_dispatch_qty,
          rate: a.rate,
          disc_percentage: a.disc_percentage,
          disc_value: a.disc_value,
          gst_value: a.gst_value,
          gst_type: a.gst_type,
          gst_percentage: a.gst_percentage,
          invoice_date:  timestamp(billDetail?.txt_invoice_order_date),
          invoice_no: r?.invoice_no[r.invoice_no.length - 1]
        })
      })

      const resCusReport = await webApi.post("/master/customer_invoice_report/insert",
      {
        customer_id: customerDetail.customer_id,
        customer_name: customerDetail.company_name,

        group_id: customerDetail.group_id,
        group_name: customerDetail.group_name,
        reference_id: customerDetail.reference_id,
        reference_name: customerDetail.reference_name,
        sales_id: r.sales_id,
        invoice_no: r?.invoice_no[r.invoice_no.length - 1],
        netValue: gt,
        invoice_date:timestamp(billDetail?.txt_invoice_order_date),
        showroom_warehouse_id:
          r.invoice_item_details[0]?.showroom_warehouse_id,
      }
    );

       //data store for all item sale
      //  console.log(addedItems, "salesReport");
      addedItems.map(async (s) => {
        const resCusItem = await webApi.post("/master/sales_report_item/insert", {
          sales_id: r.sales_id,
          invoice_no: r?.invoice_no[r.invoice_no.length - 1],
          invoice_date:timestamp(billDetail?.txt_invoice_order_date),
          item_id: s.item_id,
          item_name: s.item,
          brand_id: s.brand_id,
          quantity: s.now_dispatch_qty,
          uom_name: s.uom_name,
          uom_id: s.uom_id,
          rate: s.rate,
          gst: s.gst_value,
          discount: s.disc_value,

        })
      })
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
    } else {
      onFailure("Someth111ing Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Somethi222ng Wrong! Please Try again later " + error);
  }
};

//For Posting in Journal

// export const postJournalFromInvoice = async (billDetail,journal_details,sales_details,gt,onSuccess,onFailure) => {

//   console.log(billDetail,"666")
//   try {
//     const res = await webApi.post("/master/journal/insert", {
//       journal_type: "J",
//       narration: `Being goods sold to M/S ${billDetail.ddl_customer.label} as per Dated ${dateFormate(timestamp(billDetail?.txt_invoice_order_date))}`,
//       voucher_amount:gt,
//       voucher_date: timestamp(billDetail?.txt_invoice_order_date),
//       module:"Sales",
//       // module_id:1,
//       journal_details: [journal_details[0],sales_details[0]]
//       // active_status: journal.switch_active_btn ? "Y" : "N",

//     });
//     // console.log("reched 88")
//     // console.log(res,"999ee")
//     if (res.status === 200) {

//       const r = res.data;
//       console.log(r, "res77");
//       onSuccess(r);
//     } else {
//       console.log("Something Wrong!");
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

export const getLedgerByCustomerName = async (customer_name,onSuccess, onFailure) => {

  console.log(customer_name,"999d2")
  try {
    const res = await webApi.post("/master/ledger_account/list", {
      
      // source_id: q?.ddl_source.value,
      ledger_account: customer_name,
      // keyword_pharse: q.txt_keyword_pharse,
    });
    
    if (res.status === 200) {
      const r = res.data;
      let allLedg = [];
      console.log(r,"0001")
      r.map((c, i) => {
        allLedg.push({
          // id: i + 1,
          ledger_id:c.ledger_account_id ,
        
        });
      });
      if(allLedg.length){
        console.log(allLedg,"999d3")
      return onSuccess(allLedg);
    } 
    else {
      onFailure("Ledger not Found " );
    }
  }
    
    else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};