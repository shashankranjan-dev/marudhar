import webApi from "./webApi/webApi";
import { dateFormate, timestamp } from "../views/Pages/HelperComponent/utils";




// export const getSalesOrderBySalesId = async (sales_order_no, onSuccess, onFailure) => {
//     try {
//       const res = await webApi.post("/master/sales/list", {
//         sales_order_no:sales_order_no,
//       });
//       if (res.status === 200) {
//         const r = res.data;
//         // console.log(r,"r5")
//         let allItems = [];
//         r.map((r, i) => {
//           allItems.push({
//             sales_serial: i + 1,
//             sales_id: r.sales_id,
//             sales_order_date: dateFormate(r.sales_order_date),
//             sales_order_no: r.sales_order_no[0],
//             qutNo: r.quotation_no[0],
//             sales_order_note: r.sales_order_note,
//             enqNo: r.enquiry_no[0],
//             enqDate: dateFormate(r.enquiry_details[0].enquiry_date),
//             purchase_order_no: r.purchase_order_no,
//             purchase_order_date: dateFormate(r.purchase_order_date),
//             qutDate: r.quotation_date,
//             enqCustomer: r.customer_name,
//             enqCustomer_id:r.customer_id,
//             status: r.sales_status,
//             email: r.email,
//             mobile: r.mobile,
//             quotation_item_details: r.quotation_item_details,
//             sales_order_item_details: r.sales_order_item_details,
//             sales_order_other_charges:r.sales_order_other_charges,
//           });
//         });
//         return onSuccess(allItems[0]);
//       } else {
//         onFailure("Something Wrong! Please Try again later " + res.data);
//       }
//     } catch (error) {
//       onFailure("Something Wrong! Please Try again later " + error);
//     }
//   };



export const getAllSalesOrderPrint = async (sales_order_no, onSuccess, onFailure) => {
  // console.log("sankcheck",sales_order_no)
  
  try {
      const res = await webApi.post("/master/view_print/list", {
        sales_order_no:sales_order_no,
      });
      if (res.status === 200) {
        const r = res.data;
        console.log(r.sales_order_item_details,"r55253")
        let allItems = [];
        r.map((r, i) => {
          allItems.push({
            // slID: j,
            sales_serial: i + 1,
            sales_id: r.sales_id,
            sales_order_date: dateFormate(r.sales_order_date),
            sales_order_no: r.sales_order_no[0],
            sales_order_note: r.sales_order_note,
            purchase_order_no: r.purchase_order_no,
            purchase_order_date: dateFormate(r.purchase_order_date),
            sales_quotation_no: r.quotation_no[0],
            sales_enquiry_no: r.enquiry_no[0],
            sales_customer: r.customer_name,
            sales_city: r.customer_details[0]?.address[0]?.txt_city,
            sales_state:r.customer_details[0]?.address[0]?.ddl_state_label,
            sales_street:r.customer_details[0]?.address[0]?.txt_street,
            sales_area:r.customer_details[0]?.address[0]?.area,
            sales_pin:r.pin,
            sales_police:r.police,
            gst_no:r.customer_details[0]?.gst_no,
            sales_executive_name: r.sales_executive_name,
            sales_phone:r.sales_phone,
            lower_unit_value:  r.uom_details[0]?.lower_unit_value,
            
            lower_caption:r.uom_details[0]?.lower_caption,
            sales_value: Number(r.sales_order_item_details.reduce(
              (sum, li) => 
              Number(sum) + Number(li.net_value),0) + r.sales_order_other_charges.reduce(
                (sum, li)=> li.charge_type === "+" ? sum + Number(li.charge_amount): sum - Number(li.charge_amount),0
              )).toFixed(2),
            sales_status: r.sales_status,
            sales_action: "view-action",
            sales_order_item_details:r.sales_order_item_details,
            sales_order_other_charges:r.sales_order_other_charges,
            totalOtherChargesTotal: r.sales_order_other_charges.reduce(
              (sum, li) =>
                li.charge_type === "+"
                  ? Number(sum) + Number(li.charge_amount)
                  : Number(sum) - Number(li.charge_amount),
              0
            ),
          });
            // menu: customMenu,
          
        });
        return onSuccess(allItems[0]);
      } else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    } catch (error) {
      onFailure("Something Wrong! Please Try again later " + error);
    }
    };



  export const getLedgerSalesOrderBySalesId = async (sales_order_no, onSuccess, onFailure) => {
    try {
      const res = await webApi.post("/master/ledger_by_salesorder/list", {
        sales_order_no:sales_order_no,
      });
      if (res.status === 200) {
        const r = res.data;
        console.log(r,"r5")
        let allItems = [];
        r.map((r, i) => {
          allItems.push({
            sales_serial: i + 1,
            sales_id: r.sales_id,
            sales_order_date: dateFormate(r.sales_order_date),
            sales_order_no: r.sales_order_no[0],
            qutNo: r.quotation_no[0],
            sales_order_note: r.sales_order_note,
            enqNo: r.enquiry_no[0],
            // enqDate: dateFormate(r.enquiry_details[0].enquiry_date),
            // purchase_order_no: r.purchase_order_no,
            // purchase_order_date: dateFormate(r.purchase_order_date),
            // qutDate: r.quotation_date,
            enqCustomer: r.customer_name,
            // enqCustomer_id:r.customer_id,
            status: r.sales_status,
            // email: r.email,
            // mobile: r.mobile,
            // quotation_item_details: r.quotation_item_details,
            sales_order_item_details: r.sales_order_item_details,
            sales_order_other_charges:r.sales_order_other_charges,
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