import webApi from "./webApi/webApi";
import {
  dateFormate,
  currencyFormate,
  currentDate,
} from "../views/Pages/HelperComponent/utils";
import { timestamp } from "./Utils/utils";

function toTitleCase(str) {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return "";
  }
}

export const getAllInvoices = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/master/invoice/list", {
      bill_no: q?.txt_bill_no,
      customer_id: q?.ddl_customer?.value,
      sales_id: q?.sales_id,
      // active_status:q?.ddl_status,
      invoice_date_from: timestamp(q?.txt_invoice_date_from),
      invoice_date_to: timestamp(q?.txt_invoice_date_to),
    });
    if (res.status === 200) {
      const rw = res.data;
      // console.log(rw,"28032");
      let allItems = [];
      let total = 0;
      let inc = 0;
      rw.map(
        (r, i) => {
          let other_charges = 0;
          inc++;

          let menu = [];

          if (q?.for_sales_return) {
            menu = [
              {
                label: "Return Delivery Order",
                link: "/admin/sales/new-sales-return",
              },
            ];
          } else {
            menu = [
              {
                label: "View",
                link: "/admin/sales/invoice-view",
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
            ];
          }

          total = r.invoice_item_details.reduce(
            (sum, li) => Number(sum) + Number(li.net_value),
            0
          );

          allItems.push({
            inv_serial_no: inc,
            sales_id: r.sales_id,
            inv_invoice_date: dateFormate(r.invoice_date),
            inv_invoice_no: r.invoice_no,
            inv_customer: r.customer_name,

            inv_gst: r.invoice_item_details
              .reduce((sum, li) => Number(sum) + Number(li.gst_value), 0)
            ,
            inv_disc: r.invoice_item_details
              .reduce((sum, li) => Number(sum) + Number(li.disc_value), 0)
            ,

            inv_gross_amount: r.invoice_item_details
              .reduce(
                (sum, li) =>
                  Number(sum) + Number(li.now_dispatch_qty * li.rate),
                0
              )
            ,

            inv_other_charges: r.invoice_other_charges
              .reduce(
                (sum, li) =>
                  li.charge_type === "+"
                    ? (other_charges = Number(sum) + Number(li.charge_amount))
                    : (other_charges = Number(sum) - Number(li.charge_amount)),
                0
              )
            ,

            inv_NetAmount: (total + other_charges),

            inv_Action: "view-action",
            menu: menu,
          });
        }

        // }
      );
      allItems.sort((a, b) => a.label > b.label ? 1 : -1);

      // console.log(allItems.length, "chek5")
      if (allItems.length) {
        return onSuccess(allItems);
      } else {
        return onFailure("Sales Register not found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
export const getAllInvoiceslist = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/master/invoice/list", {
      bill_no: q?.txt_bill_no,
      sales_order_no: q?.txt_sales_order_no,
      customer_id: q?.ddl_customer?.value,
      sales_id: q?.sales_id,
      item: q?.txt_item,
      invoice_date_from: timestamp(q?.txt_invoice_date_from),
      invoice_date_to: timestamp(q?.txt_invoice_date_to),
    });
    if (res.status === 200) {

      // const rw1 = res.data.sort((c, d) => c.invoice_no.localeCompare(d.invoice_no));
      // const rw1 = res.data.sort((c, d) => c.invoice_no.localeCompare(d.invoice_no));
      // const rw = rw1.sort((a, b) => b.invoice_date - a.invoice_date);
      const r = res.data;
      // console.log(rw1, "day1");

      // console.log(rw,"28032");
      let allItems = [];
      let total = 0;
      let inc = 0;
      r.map(
        (r, i) => {
          let other_charges = 0;
          inc++;

          let menu = [];

          if (q?.for_sales_return) {
            menu = [
              {
                label: "Return Delivery Order",
                link: "/admin/sales/new-sales-return",
              },
            ];
          } else {
            menu = [
              {
                label: "View",
                // link: "/admin/sales/invoice-view",
                clickBtn: true,
              },
              // {
              //   label: "Edit",
              //   itemEdit: true,
              //   // link:"src/views/Pages/Sales/EditQuatationForm"
              //   link: "/admin/sales/invoice-edit",
              // },
              {
                label: "Print ",
                clickBtn: true,
                modelName: "printInvoice",
              },
              // {
              //   label: "Share",
              //   clickBtn: true,


              // },
            ];
          }

          total = r.invoice_item_details.reduce(
            (sum, li) => Number(sum) + Number(li.net_value),
            0
          );

          allItems.push({
            inv_serial_no: inc,
            sales_id: r.sales_id,
            // inv_invoice_date: dateFormate(timestamp(r.invoice_date)),

            inv_invoice_date: dateFormate(r.invoice_date),
            inv_invoice_no: r.invoice_no,
            inv_sales_order_no: r.sales_order_no,
            // inv_customer: r.company_name,
            inv_customer: r.customer_name[0],
            inv_item_details: r.invoice_item_details && r.invoice_item_details.map((item_data)=>item_data.item+" , "),

            inv_gst: r.invoice_item_details
              .reduce((sum, li) => Number(sum) + Number(li.gst_value), 0)
            ,
            inv_disc: r.invoice_item_details
              .reduce((sum, li) => Number(sum) + Number(li.disc_value), 0)
            ,

            inv_gross_amount: r.invoice_item_details
              .reduce(
                (sum, li) =>
                  Number(sum) + Number(li.now_dispatch_qty * li.rate),
                0
              )
            ,

            inv_other_charges: r.invoice_other_charges
              .reduce(
                (sum, li) =>
                  li.charge_type === "+"
                    ? (other_charges = Number(sum) + Number(li.charge_amount))
                    : (other_charges = Number(sum) - Number(li.charge_amount)),
                0
              )
            ,

            inv_NetAmount: currencyFormate((total + other_charges)),
            NetAmount: (total + other_charges),
            dispatch_order_no: r.dispatch_order_details?.dispatch_order_no,

            inv_Action: "view-action",
            menu: menu,
          });
        }

        // }
      );
      // console.log(allItems.length, "chek5")
      if (allItems.length) {
        return onSuccess(allItems);
      } else {
        return onFailure("Sales Register not found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

//USED IN SALES REGISTER PAGE
export const getAllSalesRegister = async (onSuccess, onFailure, q) => {
  try {
    // console.log( q?.ddl_customer.value,".........vvv.............")
    // console.log(q?.ddl_showroom_warehouse?.value, "SS");
    const res = await webApi.post("/master/sales_agg/list", {
      showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
      bill_no: q?.txt_bill_no,
      customer_id: q?.ddl_customer.value,
      invoice_date_from: timestamp(q?.txt_invoice_date_from),
      invoice_date_to: timestamp(q?.txt_invoice_date_to) + 86399,
    });

    if (res.status === 200) {
    //  console.log(res, "r check");

      const r = res.data;
      let allItems = [];
      let pdf = [];
      let inc = 0;
      let total = 0;
      let gst = 0;
      let other_charges = 0;
      let gross_amount = 0;
      // console.log(r, "day2");

      r.map((r, i) => {
        other_charges = 0;
        total = r.invoice_item_details.reduce(
          (sum, li) => Number(sum) + Number(li.net_value),
          0
        );
        gst = r.invoice_item_details.reduce(
          (sum, li) => Number(sum) + (Number(li.now_dispatch_qty) * (li.rate - ((li.rate * li.disc_percentage) / 100)) * Number(li.gst_percentage)) / 100,
          0
        )
        other_charges = r.invoice_other_charges
          .reduce(
            (sum, li) =>
              li.charge_type === "+"
                ? (other_charges = Number(sum) + Number(li.charge_amount))
                : (other_charges = Number(sum) - Number(li.charge_amount)),
            0
          )
        if (r.invoice_item_details.length) {
          // if (
          //   r.invoice_item_details.find(
          //     (invoice) =>
          //       invoice.showroom_warehouse_id ==
          //       q?.ddl_showroom_warehouse?.value
          //   )
          // )
          //   //{+

          // console.log("sen1402023===>>>", r.invoice_item_details.reduce(
          //   (sum, li) => Number(sum) + Number(li.gst_type === 1 ?

          //     (Number(li.now_dispatch_qty) * (li.rate - ((li.rate * li.disc_percentage) / 100)) * Number(li.gst_percentage)) / 100

          //     : 0),
          //   0
          // ))

          inc++;
          allItems.push({
            invoice_id: r.invoice_id,
            inv_serial_no: i + 1,
            sales_id: r.sales_id,
            inv_invoice_date: dateFormate(r.invoice_date),
            inv_invoice_no: r.invoice_no,
            inv_customer: r.customer_name,

            inv_taxes: r.gst_percentage,


///Export to Excel//
            inv_OtherCharges: r.invoice_other_charges
              .reduce(
                (sum, li) =>
                  li.charge_type === "+"
                    ? (other_charges = Number(sum) + Number(li.charge_amount))
                    : (other_charges = Number(sum) - Number(li.charge_amount)),
                0
              )
            ,

//listing//

        
///Export to Excel//
            inv_gst:
              Number(r.invoice_item_details.reduce(
                (sum, li) => Number(sum) + Number(li.gst_value),
                0
              ).toFixed(2)),

           
           

            inv_gst_forTotal: r.invoice_item_details.reduce(
              (sum, li) => Number(sum) + Number(li.gst_value),
              0
            ),
         
            // inv_gross_amount: currencyFormate(r.invoice_item_details.reduce(
            //   (sum, li) =>
            //     Number(sum) +
            //     Number(li.now_dispatch_qty) * (li.rate - ((li.rate * li.disc_percentage) / 100)),
            //   0
            // )),

          


            // inv_gross_amount_ForTotal: Number(r.invoice_item_details.reduce(
            //   (sum, li) =>
            //     Number(sum) +
            //     Number(li.now_dispatch_qty) * (li.rate - ((li.rate * li.disc_percentage) / 100)),
            //   0
            // ).toFixed(2)),

            inv_gross_amount_ForTotal: Number(r.invoice_item_details.reduce(
              (sum, li) =>
              Number(sum) +
               (Number(li.net_value) - Number(li.gst_value)),
            0
          )),
            
            inv_NetAmount1:
              r.invoice_item_details.reduce(
                (sum, li) => Number(sum) + Number(li.net_value),
                0
              )
            ,

            inv_NetAmount_ForTotal: r.invoice_item_details.reduce(
              (sum, li) => Number(sum) + Number(li.net_value) + Number(other_charges) + Number(gst),
              0
            ),

  //listing// //////

            inv_gross_amount: currencyFormate(r.invoice_item_details.reduce(
              (sum, li) =>
                Number(sum) +
                 (Number(li.net_value) - Number(li.gst_value)),
              0
            )),

            inv_NetAmount: Number(Number(
              r.invoice_other_charges
                .reduce(
                  (sum, li) =>
                    li.charge_type === "+"
                      ? (other_charges = Number(sum) + Number(li.charge_amount))
                      : (other_charges = Number(sum) - Number(li.charge_amount)),
                  0
                ) + r.invoice_item_details.reduce(
                  (sum, li) =>
                    Number(sum) +
                    Number((li.rate - ((li.rate * li.disc_percentage) / 100)) * Number(li.now_dispatch_qty) + (li.gst_value ? Number(li.gst_value) : 0)),
                  0
                )

            ).toFixed(2)),

            inv_OtherCharges1: currencyFormate(r.invoice_other_charges
              .reduce(
                (sum, li) =>
                  li.charge_type === "+"
                    ? (other_charges = Number(sum) + Number(li.charge_amount))
                    : (other_charges = Number(sum) - Number(li.charge_amount)),
                0
              ))
            ,

            inv_gst1:
            currencyFormate(r.invoice_item_details.reduce(
               (sum, li) => Number(sum) + Number(li.gst_value),
               0
             ))
          ,
            // inv_NetAmount2: currencyFormate(Number(
            //   r.invoice_other_charges
            //     .reduce(
            //       (sum, li) =>
            //         li.charge_type === "+"
            //           ? (other_charges = Number(sum) + Number(li.charge_amount))
            //           : (other_charges = Number(sum) - Number(li.charge_amount)),
            //       0
            //     ) + r.invoice_item_details.reduce(
            //       (sum, li) =>
            //         Number(sum) +
            //         Number((li.rate - ((li.rate * li.disc_percentage) / 100)) * Number(li.now_dispatch_qty) + (li.gst_value ? Number(li.gst_value) : 0)),
            //       0
            //     )

            // )),
            inv_NetAmount2: (total + other_charges),

            inv_Action: "view-action",

          });
          pdf.push([
            i + 1,
            dateFormate(r.invoice_details.invoice_date),
            r.invoice_details.invoice_no,
            r.customer_name,
            r.invoice_item_details.reduce(
              (sum, li) =>
                Number(sum) +
                Number((li.rate - li.disc_value) * li.now_dispatch_qty),
              0
            ).toFixed(2),

            r.invoice_item_details.reduce(
              (sum, li) => Number(sum) + Number(li.gst_value),
              0
            ).toFixed(2)
            ,

            r.invoice_other_charges
              .reduce(
                (sum, li) =>
                  li.charge_type === "+"
                    ? (other_charges = Number(sum) + Number(li.charge_amount))
                    : (other_charges = Number(sum) - Number(li.charge_amount)),
                0
              ).toFixed(2)
            ,
            (gross_amount + gst + other_charges).toFixed(2)

          ])
        }
      });
      //  console.log(allItems, "cheking data")

      if (allItems.length) {
        return onSuccess(allItems, pdf);
      } else {
        return onFailure("Sales Register not found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// //USED IN SALES REGISTER PAGE
// export const getAllSalesRegister = async (onSuccess, onFailure, q) => {
//   try {
//     // console.log( q?.ddl_customer.value,".........vvv.............")
//     console.log(q?.ddl_showroom_warehouse?.value, "SS");
//     const res = await webApi.post("/master/sales_agg/list", {
//       showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
//       bill_no: q?.txt_bill_no,
//       customer_id: q?.ddl_customer.value,
//       invoice_date_from: timestamp(q?.txt_invoice_date_from),
//       invoice_date_to: timestamp(q?.txt_invoice_date_to)+86399,
//     });

//     if (res.status === 200) {
//       // console.log(res, "r check");

//       const r = res.data;
//       let allItems = [];
//       let pdf = [];
//       let inc = 0;
//       let total = 0;
//       let gst = 0;
//       let other_charges = 0;
//       let gross_amount = 0;
//       console.log(r, "day2");

//       r.map((r, i) => {
//         other_charges = 0;
//         total = r.invoice_item_details.reduce(
//           (sum, li) => Number(sum) + Number(li.net_value),
//           0
//         );
//         // gross_amount = r.invoice_item_details.reduce(
//         //   (sum, li) =>
//         //     Number(sum) +
//         //     Number(li.now_dispatch_qty * li.rate - li.disc_value),
//         //   0
//         // )
//         gst = r.invoice_item_details.reduce(
//           (sum, li) => Number(sum) + Number(li.gst_value),
//           0
//         )
//         other_charges = r.invoice_other_charges
//           .reduce(
//             (sum, li) =>
//               li.charge_type === "+"
//                 ? (other_charges = Number(sum) + Number(li.charge_amount))
//                 : (other_charges = Number(sum) - Number(li.charge_amount)),
//             0
//           )
//         if (r.invoice_item_details.length) {
//           // if (
//           //   r.invoice_item_details.find(
//           //     (invoice) =>
//           //       invoice.showroom_warehouse_id ==
//           //       q?.ddl_showroom_warehouse?.value
//           //   )
//           // )
//           //   //{+

//           console.log("sen1402023===>>>", r.invoice_item_details.reduce(
//             (sum, li) =>
//               Number(sum) +
//               Number(li.now_dispatch_qty * li.rate - li.disc_value),
//             0
//           ))

//             inc++;
//             allItems.push({
//             invoice_id: r.invoice_id,
//             inv_serial_no: i + 1,
//             sales_id: r.sales_id,
//             inv_invoice_date: dateFormate(r.invoice_date),
//             inv_invoice_no: r.invoice_no,
//             inv_customer: r.customer_name,

//             inv_taxes: r.gst_percentage,

//             inv_OtherCharges: r.invoice_other_charges
//               .reduce(
//                 (sum, li) =>
//                   li.charge_type === "+"
//                     ? (other_charges = Number(sum) + Number(li.charge_amount))
//                     : (other_charges = Number(sum) - Number(li.charge_amount)),
//                 0
//               )
//             ,
//             inv_gst:
//               Number(r.invoice_item_details.reduce(
//                 (sum, li) => Number(sum) + Number(li.gst_value),
//                 0
//               ).toFixed(2))
//             ,
//             inv_gst_forTotal: r.invoice_item_details.reduce(
//               (sum, li) => Number(sum) + Number(li.gst_value),
//               0
//             ),
//             inv_gross_amount:
//               r.invoice_item_details.reduce(
//                 (sum, li) =>
//                   Number(sum) +
//                   Number(li.now_dispatch_qty * li.rate - li.disc_value),
//                 0
//               )
//             ,
//             inv_gross_amount_ForTotal: Number(r.invoice_item_details.reduce(
//               (sum, li) =>
//                 Number(sum) +
//                 Number((li.rate - li.disc_value) * li.now_dispatch_qty),
//               0
//             ).toFixed(2)),
//             inv_NetAmount1:
//               r.invoice_item_details.reduce(
//                 (sum, li) => Number(sum) + Number(li.net_value),
//                 0
//               )
//             ,

//             inv_NetAmount_ForTotal: r.invoice_item_details.reduce(
//               (sum, li) => Number(sum) + Number(li.net_value) + Number(other_charges) + Number(gst),
//               0
//             ),
//             inv_NetAmount: Number(
//               r.invoice_item_details.reduce(
//                 (sum, li) => Number(sum) + Number(li.gst_value),
//                 0
//               ) + r.invoice_other_charges
//                 .reduce(
//                   (sum, li) =>
//                     li.charge_type === "+"
//                       ? (other_charges = Number(sum) + Number(li.charge_amount))
//                       : (other_charges = Number(sum) - Number(li.charge_amount)),
//                   0
//                 ) + r.invoice_item_details.reduce(
//                   (sum, li) =>
//                     Number(sum) +
//                     Number((Number(li.rate ? li.rate : 0) - Number(li.disc_value ? li.disc_value : 0)) * Number(li.now_dispatch_qty)),
//                   0
//                 )

//             ),
//             inv_Action: "view-action",

//           });
//           pdf.push([
//             i + 1,
//             dateFormate(r.invoice_details.invoice_date),
//             r.invoice_details.invoice_no,
//             r.customer_name,
//             r.invoice_item_details.reduce(
//               (sum, li) =>
//                 Number(sum) +
//                 Number((li.rate - li.disc_value) * li.now_dispatch_qty),
//               0
//             ).toFixed(2),

//             r.invoice_item_details.reduce(
//               (sum, li) => Number(sum) + Number(li.gst_value),
//               0
//             ).toFixed(2)
//             ,

//             r.invoice_other_charges
//               .reduce(
//                 (sum, li) =>
//                   li.charge_type === "+"
//                     ? (other_charges = Number(sum) + Number(li.charge_amount))
//                     : (other_charges = Number(sum) - Number(li.charge_amount)),
//                 0
//               ).toFixed(2)
//             ,
//             (gross_amount + gst + other_charges).toFixed(2)

//           ])
//         }
//       });
//       // console.log(allItems, "cheking data")

//       if (allItems.length) {
//         return onSuccess(allItems, pdf);
//       } else {
//         return onFailure("Sales Register not found");
//       }
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

export const postInvoice = async (
  info,
  addedItems,
  customerDetail,
  updateOtherCharges,
  allItems,
  journal_details,
  other_charges_ledger,
  grandTotal,

  onSuccess,
  onFailure
) => {
  try {
    let res;
    if (info.edit) {
      res = await webApi.post("/master/sales/update", {
        sales_id: info.sales_id,
        invoice_date: timestamp(info.txt_invoice_date),
        invoice_note: info.txt_invoice_note,
        invoice_item_details: addedItems,
        invoice_details: customerDetail,
      });
    } else {
      let invoiceDetails = {
        ...customerDetail,
        invoice_date: timestamp(info.txt_invoice_date),
        invoice_note: info.txt_invoice_note,
        dispatch_order_no: info.dispatch_order_no,
      };

      res = await webApi.post("/master/sales/update", {
        sales_id: info.sales_id,
        module: "INVOICE",
        invoice_item_details: addedItems,
        invoice_details: invoiceDetails,
        invoice_other_charges: updateOtherCharges,
      });
      // console.log(res,"sen112")
      allItems.dispatch_order_item_details.map((item) => {
        const movRes = webApi.post("/master/stock_movement/insert", {
          transaction_type: "D",
          transaction_id: info.sales_id,
          transaction_date: timestamp(currentDate()),
          showroom_warehouse_id: Number(item.showroom_warehouse_id),
          item_id: item.item_id,
          plus_qty: 0,
          minus_qty: Number(item.dispatched_qty),
          unit_id: item.uom_id,
        });
      });
    }

    if (res.status === 200) {
      const r = res.data;
      // console.log(journal_details, "sen26/chkr");
      const res1 = await webApi.post("/master/journal/insert", {
        journal_type: "J",
        transaction_id: r?.invoice_no[r.invoice_no.length - 1],
        transaction_type: "Sales",
        narration: `Being goods sold to M/S ${journal_details[0].ddl_ledger
          } as per Dated ${dateFormate(timestamp(info?.txt_invoice_date))}`,
        voucher_amount: grandTotal,
        voucher_date: timestamp(info?.txt_invoice_date),
        module: "Sales",
        journal_details: journal_details,
        // active_status: journal.switch_active_btn ? "Y" : "N",
      });
      ///api for brand report
      r.invoice_item_details.filter((l)=>l.invoice_no===r?.invoice_no[r.invoice_no.length - 1]).map(async (a) => {
        // console.log(a, "27122022/1")
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
          invoice_date: timestamp(info?.txt_invoice_date),
          invoice_no: r?.invoice_no[r.invoice_no.length - 1]
        })
      })
      //sales master report used in outstanding report
      // console.log(customerDetail, "customerreport");
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
          netValue: grandTotal,
          invoice_date: timestamp(info.txt_invoice_date),
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
          invoice_date: timestamp(info.txt_invoice_date),
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
    }
    else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }

  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getInvoiceBySalesId = async (
  id,
  invoice_no,
  onSuccess,
  onFailure
  ) => {
  try {
    const res = await webApi.post("/master/invoice/list", {
      sales_id: id,
      bill_no: invoice_no,
    });

    if (res.status === 200) {
      const r = res.data;

      let allItems = [];
      r.map((r, i) => {
        console.log(r, "res data1");
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
          enqCustomer: r.customer_name[0],
          address:r.address,
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
      // console.log("allItems55", allItems);
      return onSuccess(allItems[0]);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getListShowroomWarehouse = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/showrooms-warehouse/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allShowroomWarehouse = [];
      r.map((r) => {
        allShowroomWarehouse.push({
          value: r.showrooms_warehouse_id,
          label: toTitleCase(r.showrooms_warehouse),
          address: r.address,
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

export const getAllSalesReturn = async (onSuccess, onFailure, q) => {
  try {
    // console.log("qqqqqq", q);
    const res = await webApi.post("/master/sales_return/list", {
      invoice_no: q?.txt_invoice_no,
      sales_return_no: q?.txt_sales_ret_no,
      sales_return_from_date: q?.sales_return_date_from
        ? timestamp(q?.sales_return_date_from)
        : "",
      sales_return_to_date: q?.sales_return_date_to
        ? timestamp(q?.sales_return_date_to)
        : "",
      customer_id: q?.ddl_customer?.value,
      showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
    });
    // console.log("restats", res.status);

    if (res.status === 200) {
      const rs = res.data;
      let allSalesReturn = [];
      // console.log("rew", rs);

      rs.map((r, i) => {
        // console.log("r",i, " ", r);

        allSalesReturn.push({
          salesRetID: i + 1,
          salesRetNo: r.sales_return_no,
          salesRetDate: dateFormate(r.sales_return_date),
          sales_return_id: r.sales_return_id,
          salesRetCustomer: r.customer_name,
          sales_return_bill_value: currencyFormate(r.sales_return_bill_value),
          invoice_no: r.invoice_no,
          sales_return_item_details: r.sales_return_item_details,
          salesRetStatus: r.active_status,
          module: r.module,
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

export const postSalesReturn = async (
  info,
  updatedItems,
  chargesItem,
  userId,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/sales_return/insert", {
      module: info.module,
      invoice_no: info.invoice_no,
      sales_id: info.sales_id,
      customer_id: info.customer_id,
      sales_return_item_details: updatedItems,
      sales_return_bill_value: info.net_value,
      // sales_return_bill_value: updatedItems.reduce(
      //   (sum, li) => Number(sum) + li.return_qty * li.net_value,
      //   0
      // ),
      showroom_warehouse_id: info.ddl_showroom_warehouse?.value,
      sales_return_date: timestamp(info.txt_sales_return_date),
      note: info.txt_note,
      sales_return_other_charges:chargesItem,
      inserted_by_id:userId
    });
    // updatedItems.map((item) => {
    //   const movRes = webApi.post("/master/stock_movement/insert", {
    //     transaction_type: "RD",
    //     transaction_id: info.sales_id,
    //     transaction_date: timestamp(currentDate()),
    //     showroom_warehouse_id: info.ddl_showroom_warehouse?.value,
    //     item_id: item.item_id,
    //     plus_qty: Number(item.return_qty),
    //     minus_qty: 0,
    //     unit_id: item.uom_id,
    //   });
    // });
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

//For Posting in Journal

export const postJournalFromInvoice = async (
  invoiceDetail,
  journal_details,
  other_charges_ledger,
  gt,
  onSuccess,
  onFailure
) => {
  try {
    // console.log(other_charges_ledger,"4046")
    const res = await webApi.post("/master/journal/insert", {
      journal_type: "J",
      transaction_id: invoiceDetail?.sales_id,
      transaction_type: "Sales",
      narration: `Being goods sold to M/S ${journal_details[0].ddl_ledger
        } as per Dated ${dateFormate(
          timestamp(invoiceDetail?.txt_invoice_date)
        )}`,
      voucher_amount: gt,
      voucher_date: timestamp(invoiceDetail?.txt_invoice_date),
      module: "Sales",
      journal_details: [...journal_details, ...other_charges_ledger],
      // active_status: journal.switch_active_btn ? "Y" : "N",
    });

    // console.log(res.data,"4047")
    if (res.status === 200) {
      const r = res.data;
      // console.log(r, "4048");
      onSuccess(r);
    } else {
      // console.log("Something Wrong!");
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
  // console.log(customer_name, "999d2")
  try {
    const res = await webApi.post("/master/ledger_account/list", {
      // source_id: q?.ddl_source.value,
      ledger_account: customer_name,
      type: 'C',
      // keyword_pharse: q.txt_keyword_pharse,
    });

    if (res.status === 200) {
      const r = res.data;
      let allLedg = [];
      // console.log(r, "0001")
      r.map((c, i) => {
        allLedg.push({
          // id: i + 1,
          ledger_id: c.ledger_account_id,
          ledger_account: c.ledger_account,

        });
      });
      if (allLedg.length) {
        // console.log(allLedg, "999d3")
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

export const getAllSalesReturnForDispatch = async (onSuccess, onFailure, q) => {
  try {
    // console.log("qqqqqq", q);
    const res = await webApi.post("/master/sales_return/list", {
      invoice_no: q?.txt_invoice_no,
      sales_return_no: q?.txt_sales_ret_no,
      sales_return_from_date: q?.sales_return_date_from
        ? timestamp(q?.sales_return_date_from)
        : "",
      sales_return_to_date: q?.sales_return_date_to
        ? timestamp(q?.sales_return_date_to)
        : "",
      customer_id: q?.ddl_customer?.value,
      showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
    });
    // console.log("restats", res.status);

    if (res.status === 200) {
      const rs = res.data;
      let allSalesReturn = [];
      // console.log("rew", rs);

      rs.map((r, i) => {
        // console.log("r555",i, " ", r.dispatch_return_item_details.length);
        if (r.dispatch_return_item_details.length > 0) {
          allSalesReturn.push({
            salesRetID: i + 1,
            salesRetNo: r.sales_return_no,
            salesRetDate: dateFormate(r.sales_return_date),
            sales_return_id: r.sales_return_id,
            salesRetCustomer: r.customer_name,
            
            sales_return_bill_value: Number(r.dispatch_return_item_details.reduce( (sum, li) => Number(sum) + Number(li.net_value),0) + r.dispatch_order_return_other_charges.reduce( (sum, li)=> li.charge_type === "+" ? sum + Number(li.charge_amount): sum - Number(li.charge_amount),0 )).toFixed(2),
            invoice_no: r.invoice_no,
            sales_return_item_details: r.sales_return_item_details,
            dispatch_return_item_details: r.dispatch_return_item_details,
            dispatch_order_return_other_charges: r.dispatch_order_return_other_charges,
            salesRetStatus: r.active_status,
            salesRetAction: "view-action",
            menu: [
              // {
              //   label: "Print ",
              //   clickBtn: true,
              //   modelName: "printInvoice",
              // },
              // {
              //   label: "Share",
              //   link: "",
              // },
              {
                label: "View",
                clickBtn: true,
              },
            ],
          });
        }
      });

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

export const getAllOtherCharges = async (q, onSuccess, onFailure) => {
  // console.log(q,"56562e")
  try {
    const res = await webApi.post("/master/charges/list", {
      charges: q,
    });
    if (res.status === 200) {
      const r = res.data;
      let allTerms = [];
      // console.log(r,"5653")
      r.map((r, i) => {
        allTerms.push({
          // id: i + 1,
          // other_charges_id: r.charges_id,
          ledgerAccount: r.ledger_account_id,
          ledgerAccountName: r.ledger_account_name,
          // charges: r.charges,
          // sacCode: r.sac_code,
          // details: r.details,
          // action_items: r.action_items,
          // status: r.active_status,
          // action: "action",
        });
      });
      // console.log(allTerms,"56562a")
      return onSuccess(allTerms);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
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

        // console.log(r, "sank301");

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

      // console.log(allItems, "sen2323");
      return onSuccess(allItems[0]);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

///Edit invoice
export const editpostInvoice = async (
  info,
  addedItems,
  customerDetail,
  updateOtherCharges,
  allItems,
  journal_details,
  other_charges_ledger,
  grandTotal,
  journalId,
  onSuccess,
  onFailure
) => {
  // console.log(journalId, "sen0807/23")
  try {
    let res;

    let invoiceDetails = {
      ...customerDetail,
      invoice_date: timestamp(info.txt_invoice_date),
      invoice_note: info.txt_invoice_note,
      dispatch_order_no: info.dispatch_order_no,
    };

    res = await webApi.post("/master/sales/update", {
      sales_id: info.sales_id,
      invoice_item_details: addedItems,
      invoice_other_charges: updateOtherCharges,
    });

    if (res.status === 200) {
      const r = res.data;
      // console.log(r, "sen26/chkr");
      const res1 = await webApi.post("/master/journal/update", {
        journal_id: journalId[0]?.journal_id,
        voucher_amount: grandTotal,
        journal_details: journal_details,
      });
      // console.log(res1.data, "sen5656")
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};


export const getAllSalesReturnDispatchId = async (id, sales_return_id, onSuccess, onFailure, q) => {
  try {
    // console.log("qqqqqq", q);
    const res = await webApi.post("/master/sales_return/list", {
      sales_id: id,
      sales_return_id: sales_return_id,
    });
    // console.log("restats", res.status);

    if (res.status === 200) {
      const rs = res.data;
      let allSalesReturn = [];
      // console.log("rew", rs);

      rs.map((r, i) => {
        // console.log("r555",i, " ", r.dispatch_return_item_details.length);
        if (r.dispatch_return_item_details.length > 0) {
          allSalesReturn.push({
            salesRetID: i + 1,
            salesRetNo: r.sales_return_no,
            salesRetDate: dateFormate(r.sales_return_date),
            sales_return_id: r.sales_return_id,
            salesRetCustomer: r.customer_name,
            sales_return_bill_value: currencyFormate(
              r.dispatch_return_item_details.reduce(
                (sum, li) => sum + li.net_value,
                0
              )
            ),
            invoice_no: r.invoice_no,
            sales_return_item_details: r.sales_return_item_details,
            dispatch_return_item_details: r.dispatch_return_item_details,
            dispatch_order_return_other_charges: r.dispatch_order_return_other_charges,
            salesRetStatus: r.active_status,
            salesRetAction: "view-action",

          });
        }
      });

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