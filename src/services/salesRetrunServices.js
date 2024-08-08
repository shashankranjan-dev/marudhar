import webApi from "./webApi/webApi";
import {
  dateFormate,
  currencyFormate,
  currentDate,
} from "../views/Pages/HelperComponent/utils";
import { timestamp } from "./Utils/utils";

export const updateSalesRetrun = async (
  sales_return_id,
  updateItems,
  module,
  billDetail,
  chargesItems,
  
  invoiceDetail,
  journal_details,
  gt,
  sales_return_no,
  
  inserted_by_id,
  onSuccess,
  onFailure
) => {
  try {
    let res = await webApi.post("/master/sales_return/update", {
      sales_return_id: sales_return_id,
      module: module,

      sales_return_item_details: {
        return_qty: updateItems[0]?.actualRetrun,
        item_id: updateItems[0]?.item_id,
        uom_id: updateItems[0]?.uom_id,
        rate: updateItems[0]?.rate,
        gst_percentage: updateItems[0]?.gst_percentage,
        gst_value: updateItems[0]?.gst_value,
        disc_value: updateItems[0]?.disc_value,
        disc_percentage: updateItems[0]?.disc_percentage,
        net_value: updateItems[0]?.net_value,

        uom_name: updateItems[0]?.uom_name,
      },
      dispatch_return_item_details: updateItems,
      dispatch_order_return_other_charges:chargesItems,
      dispatch_return_bill_value: updateItems.reduce(
        (sum, li) => Number(sum) + li.actualRetrun * li.net_value,
        0
      ),
      edited_by_id: inserted_by_id,
    });
    updateItems.map((item) => {
      //console.log(item, "29032");
      const movRes = webApi.post("/master/stock_movement/insert", {
        transaction_type: "RD",
        transaction_id: billDetail.sales_return_id,
        transaction_date: timestamp(currentDate()),
        showroom_warehouse_id: billDetail.ddl_showroom_warehouse?.value,
        item_id: item.item_id,
        plus_qty: Number(item.actualRetrun),
        minus_qty: 0,
        unit_id: item.uom_id,
      });
    });
    if (res.status === 200) {
      const r = res.data;
       //console.log(r, "29031");
       const res2 = await webApi.post("/master/journal/insert", {
        journal_type: "J",
        transaction_id: sales_return_no,
        transaction_type: "Sales Return",
        narration: `Being goods sold to M/S ${journal_details[0].ddl_ledger
          } as per Dated ${dateFormate(
            timestamp(invoiceDetail?.txt_sales_return_date)
          )}`,
        voucher_amount: gt,
        voucher_date: timestamp(invoiceDetail?.txt_sales_return_date),
        module: "Sales",
        journal_details:journal_details,
        // active_status: journal.switch_active_btn ? "Y" : "N",
      });
      // console.log(otherChargesJournal_details,'RAJA52')
  
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
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllSalesReturnForEdit = async (sales_return_id, onSuccess, onFailure, q) => {
  try {
    // //console.log("qqqqqq", q);
    const res = await webApi.post("/master/sales_return/list", {
      sales_return_id: sales_return_id,
      // invoice_no: q?.invoice_no,
      // sales_return_no: q?.salesRetNo,
      // sales_return_from_date: q?.sales_return_date_from ? timestamp(q?.sales_return_date_from) : '',
      // sales_return_to_date: q?.salesRetDate ? timestamp(q?.salesRetDate) : '',
      // customer_id: q?.ddl_customer?.value,
      // showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
    });
    //console.log("restats", res);

    if (res.status === 200) {
      const rs = res.data;
      let allSalesReturn = [];
      //console.log("rew", rs);

      rs.map((r, i) => {
        //console.log("r", i, " ", r);

        allSalesReturn.push({
          salesRetID: i + 1,
          salesRetNo: r.sales_return_no,
          salesRetDate: dateFormate(r.sales_return_date),
          sales_return_id: r.sales_return_id,
          salesRetCustomer: r.customer_name,
          module: r.module,
          sales_return_bill_value: currencyFormate(
            r.dispatch_return_item_details.length
              ? r.dispatch_return_item_details.reduce(
                (sum, li) => sum + li.net_value,
                0
              )
              : r.sales_return_item_details.reduce(
                (sum, li) => sum + li.net_value,
                0
              )
          ),
          invoice_no: r.invoice_no,
          sales_return_item_details: r.sales_return_item_details,
          // salesRetStatus: r.active_status,
          sales_return_other_charges: r.sales_return_other_charges,
          salesRetStatus: r.module === "Dispatch" ? "Y" : "N",
          salesRetAction: "view-action",
          menu: [
            {
              label: "Return Dispatch Invoice",
              itemEdit: true,
              link: "/admin/sales/return-dispatch-invoice",
            },

            {
              label: "Print ",
              clickBtn: true,
              modelName: "printInvoice",
            },
            {
              label: "Share",
              link: "",
            },
          ],
        });
      });
      //console.log(allSalesReturn, "9090");
      if (allSalesReturn.length) {
        return onSuccess(allSalesReturn);
      } else {
        return onFailure("Sales Return Not Found");
      }
    }
    //  else {
    //   onFailure("Something Wrong! Please Try again later " + res.data);
    // }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllSalesReturnForDispatch = async (onSuccess, onFailure, q) => {
  try {
    // //console.log("qqqqqq", q);
    const res = await webApi.post("/master/sales_return/list", {
      // sales_return_id:sales_return_id,
      invoice_no: q?.invoice_no,
      // sales_return_no: q?.salesRetNo,
      // sales_return_from_date: q?.sales_return_date_from ? timestamp(q?.sales_return_date_from) : '',
      // sales_return_to_date: q?.salesRetDate ? timestamp(q?.salesRetDate) : '',
      // customer_id: q?.ddl_customer?.value,
      // showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
    });
    //console.log("restats", res);

    if (res.status === 200) {
      const rs = res.data;
      let allSalesReturn = [];
      //console.log("rew", rs);

      rs.map((r, i) => {
        //console.log("r", i, " ", r);

        allSalesReturn.push({
          salesRetID: i + 1,
          salesRetNo: r.sales_return_no,
          salesRetDate: dateFormate(r.sales_return_date),
          sales_return_id: r.sales_return_id,
          salesRetCustomer: r.customer_name,
          module: r.module,
          sales_return_bill_value: currencyFormate(
            r.dispatch_return_item_details.length
            ? 
            Number(r.dispatch_return_item_details.reduce((sum, li) => sum + li.net_value,0) + r.dispatch_order_return_other_charges.reduce( (sum, li)=> li.charge_type === "+" ? sum + Number(li.charge_amount): sum - Number(li.charge_amount),0 )).toFixed(2)
            : 
            Number(r.sales_return_item_details.reduce((sum, li) => sum + li.net_value,0) + r.sales_return_other_charges.reduce( (sum, li)=> li.charge_type === "+" ? sum + Number(li.charge_amount): sum - Number(li.charge_amount),0 )).toFixed(2)

          ),
          invoice_no: r.invoice_no,
          sales_return_item_details: r.sales_return_item_details,
          // salesRetStatus: r.active_status,
          salesRetStatus: r.module === "Dispatch" ? "Y" : "N",
          salesRetAction: "view-action",
          menu: [
            {
              label: "Return Dispatch Invoice",
              itemEdit: true,
              link: "/admin/sales/return-dispatch-invoice",
            },

            // {
            //   label: "Print ",
            //   clickBtn: true,
            //   modelName: "printInvoice",
            // },
            // {
            //   label: "Share",
            //   link: "",
            // },
          ],
        });
      });
      //console.log(allSalesReturn, "9090");
      if (allSalesReturn.length) {
        return onSuccess(allSalesReturn);
      } else {
        return onFailure("Sales Return Not Found");
      }
    }
    //  else {
    //   onFailure("Something Wrong! Please Try again later " + res.data);
    // }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllSalesReturnForEditDil = async (onSuccess, onFailure, q) => {
  try {
    //console.log("qqqqqq", q);
    const res = await webApi.post("/master/sales_return/list", {
      invoice_no: q?.invoice_no,
      sales_return_no: q?.salesRetNo,
      sales_return_from_date: q?.sales_return_date_from ? timestamp(q?.sales_return_date_from) : '',
      sales_return_to_date: q?.salesRetDate ? timestamp(q?.salesRetDate) : '',
      customer_id: q?.ddl_customer?.value,
      showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
    });


    if (res.status === 200) {
      const rs = res.data;
      let allSalesReturn = [];
      //console.log("rew", rs);

      rs.map((r, i) => {
        //console.log("sen2507", r);

        allSalesReturn.push({
          salesRetID: i + 1,
          salesRetNo: r.sales_return_no,
          salesRetDate: dateFormate(r.sales_return_date),
          // sales_return_id: r.salesRetID,
          sales_return_id: r.sales_return_id,
          salesRetCustomer: r.customer_name,
          sales_return_bill_value: Number(r.sales_return_item_details.reduce( (sum, li) => Number(sum) + Number(li.net_value),0) + r.sales_return_other_charges.reduce( (sum, li)=> li.charge_type === "+" ? sum + Number(li.charge_amount): sum - Number(li.charge_amount),0 )).toFixed(2),
          invoice_no: r.invoice_no,
          invoice_date: r.invoice_date,
          invoice_qty: r.invoice_qty,
          invoice_value: r.invoice_value,
          sales_return_item_details: r.sales_return_item_details,
          showroom_warehouse_id: r.showroom_warehouse_id,
          // salesRetStatus: r.active_status,
          salesRetStatus: r.module === "Dispatch" ? "Y" : "N",
          salesRetAction: "view-action",
          sales_id: r.sales_id,

          menu: [
            {
              label: "View",
              // link: "/admin/sales/delivery-return-list-view",
              clickBtn: true,
            },

            // {
            //   label: "Print ",
            //   clickBtn: true,
            //   modelName: "printInvoice",
            // },
            // {
            //   label: "Share",
            //   link: "",
            // },
          ],
        });
      });
      //console.log(allSalesReturn, "9090");
      if (allSalesReturn.length) {
        return onSuccess(allSalesReturn);
      } else {
        return onFailure("Sales Return Not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getInvoiceBySalesIdEdit = async (
  invoice_no,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/delivery_return/list", {
      bill_no: invoice_no,
    });

    if (res.status === 200) {
      const r = res.data;


      let allItems = [];
      r.map((r, i) => {
        //console.log(r, "sen2507");

        allItems.push({
          sales_id: r.sales_id,
          invoice_date: dateFormate(r.invoice_date),
          invoice_note: r.invoice_note,
          invoice_no: r.invoice_no,
          invoice_details: r.invoice_details,
          invoice_item_details: r.invoice_item_details,
          status: r.dispatch_status,
          enqNo: r.enquiry_no[0],
          qutNo: r.quotation_no[0],
          enqCustomer: r.customer_name,
          customer_id: r.customer_id,
          sales_order_no: r.sales_order_no[0],
          delivery_order_no: r.dispatch_order_details.delivery_order_no,
          dispatch_order_date: dateFormate(
            r.dispatch_order_details.dispatch_order_date
          ),
          dispatch_order_no: r.dispatch_order_details.dispatch_order_no,
          purchase_order_no: r.purchase_order_no,
          status: r.dispatch_order_details.status,
          sales_order_other_charges: r.sales_order_other_charges,
          invoice_other_charges: r.invoice_other_charges,
          totalOtherCharges: r.invoice_other_charges.reduce(
            (sum, li) =>
              li.charge_type === "+"
                ? Number(sum) + Number(li.charge_amount)
                : Number(sum) - Number(li.charge_amount),
            0
          ),
        });
      });
      //console.log("allItems55", allItems);
      return onSuccess(allItems[0]);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

//For Posting in Journal

export const postJournalFromDispatchReturn = async (
  invoiceDetail,
  journal_details,

  gt,
  sales_return_no,
  onSuccess,
  onFailure
) => {
  //console.log(journal_details, "4046");

  try {
    const res = await webApi.post("/master/journal/insert", {
      journal_type: "J",
      transaction_id: sales_return_no,
      transaction_type: "Sales Return",
      narration: `Being goods sold to M/S ${journal_details[0].ddl_ledger
        } as per Dated ${dateFormate(
          timestamp(invoiceDetail?.txt_sales_return_date)
        )}`,
      voucher_amount: gt,
      voucher_date: timestamp(invoiceDetail?.txt_sales_return_date),
      module: "Sales",
      journal_details:journal_details,
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
    //console.log(res.data, "4047");
    if (res.status === 200) {
      const r = res.data;
      //console.log(r, "4048");
      onSuccess(r);
    } else {
      //console.log("Something Wrong!");
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getLedgerByCustomerName = async (
  customer_name,
  onSuccess,
  onFailure
) => {
  //console.log(customer_name, "999d2");
  try {
    const res = await webApi.post("/master/ledger_account/list", {
      // source_id: q?.ddl_source.value,
      ledger_account: customer_name,
      // keyword_pharse: q.txt_keyword_pharse,
    });

    if (res.status === 200) {
      const r = res.data;
      let allLedg = [];

      r.map((c, i) => {
        //console.log(c, "0001");
        allLedg.push({
          // id: i + 1,
          ledger_id: c.ledger_account_id,
          ledger_name: c.ledger_account,
        });
      });
      if (allLedg.length) {
        //console.log(allLedg, "999d3");
        return onSuccess(allLedg);
      } else {
        onFailure("Ledger not Found ");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};



export const getReturnListView = async (
  return_delivery_id,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/return_delivery_view/list", {
      return_delivery_id: return_delivery_id,
      // ddl_status: ddl_status
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
        var result = r.sales_return_item_details.map(function (el) {
          var o = Object.assign({}, el);
          o.id = o.return_delivery_id;
          return o;
        });

        r.sales_return_item_details = result;

        //console.log(r, "sank301");

        // console.table(r)
        allItems.push({
          //dplID: i + 1,
          id: i + 1,
          return_delivery_id: r.sales_return_item_details.item_id,

          showroom_warehouse_id: r.showroom_warehouse_id,
          sales_return_date: r.sales_return_date,
          sales_return_no: r.sales_return_no,
          invoice_no: r.invoice_no,
          dispatch_qty: r.dispatch_qty,
          net_value: r.sales_return_item_details[0]?.net_value,
          gst_percentage: r.sales_return_item_details[0]?.gst_percentage,
          rate: r.sales_return_item_details[0]?.rate,

          return_qty: r.sales_return_item_details[0]?.return_qty,
          dispatch_name: r.dispatch_name,
          dispatch_date: r.dispatch_date,
          dispatch_value: r.dispatch_invoice_value,
        });
      });
      allItems.sort((a, b) => a.label > b.label ? 1 : -1);

      //console.log(allItems, "sen2323");
      if (allItems.length) {
        return onSuccess(allItems[0]);
      } else {
        return onFailure("Sales Return List Not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};




// export const getInvoiceBySalesIdview = async (
//   sales_id,
//   onSuccess,
//   onFailure
// ) => {
//   try {
//     const res = await webApi.post("/master/delivery_return/list", {
//       // bill_no: invoice_no,
//       sales_id:sales_id
//     });

//     if (res.status === 200) {
//       const r = res.data;

//       //console.log(r, "res data");

//       let allItems = [];
//       r.map((r, i) => {
//         allItems.push({
//           sales_id: r.sales_id,
//           invoice_date: dateFormate(r.invoice_date),
//           invoice_note: r.invoice_note,
//           invoice_no: r.invoice_no,
//           invoice_details: r.invoice_details,
//           invoice_item_details: r.invoice_item_details,
//           status: r.dispatch_status,
//           enqNo: r.enquiry_no[0],
//           qutNo: r.quotation_no[0],
//           enqCustomer: r.customer_name,
//           customer_id: r.customer_id,
//           sales_order_no: r.sales_order_no[0],
//           delivery_order_no: r.dispatch_order_details.delivery_order_no,
//           dispatch_order_date: dateFormate(
//             r.dispatch_order_details.dispatch_order_date
//           ),
//           dispatch_order_no: r.dispatch_order_details.dispatch_order_no,
//           purchase_order_no: r.purchase_order_no,
//           status: r.dispatch_order_details.status,
//           sales_order_other_charges: r.sales_order_other_charges,
//           invoice_other_charges: r.invoice_other_charges,
//           totalOtherCharges: r.invoice_other_charges.reduce(
//             (sum, li) =>
//               li.charge_type === "+"
//                 ? Number(sum) + Number(li.charge_amount)
//                 : Number(sum) - Number(li.charge_amount),
//             0
//           ),
//         });
//       });
//       //console.log("allItems55", allItems);
//       return onSuccess(allItems[0]);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };


export const getInvoiceBySalesIdview = async (

  invoice_no,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/invoice/list", {

      bill_no: invoice_no,
    });

    if (res.status === 200) {
      const r = res.data;

      let allItems = [];
      r.map((r, i) => {
        //console.log(r, "res data1");
        allItems.push({
          sales_id: r.sales_id,
          invoice_date: dateFormate(r.invoice_date),
          invoice_note: r.invoice_note,
          invoice_no: r.invoice_no,
          gst_no: r.gst_no,
          invoice_details: r.invoice_details,
          invoice_item_details: r.invoice_item_details,
          status: r.dispatch_status,
          enqNo: r.enquiry_no[0],
          qutNo: r.quotation_no[0],
          enqCustomer: r.customer_name,
          customer_id: r.customer_id,
          sales_order_no: r.sales_order_no[0],
          // delivery_order_no: r.dispatch_order_details[0].delivery_order_no,
          // dispatch_order_date: dateFormate(
          //   r.dispatch_order_details[0].dispatch_order_date
          // ),
          delivery_order_no: r.dispatch_order_details.length ? r.dispatch_order_details[0].delivery_order_no : "",
          dispatch_order_no: r.invoice_details.dispatch_order_no,
          purchase_order_no: r.purchase_order_no,
          status: r.dispatch_order_details.status,
          sales_order_other_charges: r.sales_order_other_charges,
          invoice_other_charges: r.invoice_other_charges,
          totalOtherCharges: r.invoice_other_charges.reduce(
            (sum, li) =>
              li.charge_type === "+"
                ? Number(sum) + Number(li.charge_amount)
                : Number(sum) - Number(li.charge_amount),
            0
          ),
        });
      });
      // //console.log("allItems55", allItems);
      return onSuccess(allItems[0]);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};


export const getAllSalesReturnForId = async (id, sales_return_id, onSuccess, onFailure, q) => {
  try {

    const res = await webApi.post("/master/sales_return/list", {
      sales_id: id,
      sales_return_id: sales_return_id,
    });
    //console.log("restats", res);

    if (res.status === 200) {
      const rs = res.data;
      let allSalesReturn = [];
      //console.log("sen2507", rs);

      rs.map((r, i) => {
        //console.log("r", i, " ", r);

        allSalesReturn.push({
          salesRetID: i + 1,
          salesRetNo: r.sales_return_no,
          salesRetDate: dateFormate(r.sales_return_date),
          sales_return_id: r.sales_return_id,
          salesRetCustomer: r.customer_name,
          sales: r.sales,
          sales_return_bill_value: currencyFormate(
            r.sales_return_item_details.reduce(
              (sum, li) => sum + li.net_value,
              0
            )
          ),
          invoice_no: r.invoice_no,
          invoice_date: r.invoice_date,
          invoice_qty: r.invoice_qty,
          invoice_value: r.invoice_value,
          sales_return_item_details: r.sales_return_item_details,
          showroom_warehouse_id: r.showroom_warehouse_id,
          sales_return_other_charges: r.sales_return_other_charges,
          // salesRetStatus: r.active_status,
          salesRetStatus: r.module === "Dispatch" ? "Y" : "N",
          salesRetAction: "view-action",


        });
      });
      //console.log(allSalesReturn, "9090");
      if (allSalesReturn.length) {
        return onSuccess(allSalesReturn[0]);
      } else {
        return onFailure("Sales Return Not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};