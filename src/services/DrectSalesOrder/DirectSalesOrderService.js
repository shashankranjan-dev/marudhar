import webApi from "../webApi/webApi";
import { timestamp } from "../Utils/utils";
//  comment

export const postDirectSalesOrder = async (
  info,
  allItems,
  enquiryDetails,
  quotationDetails,
  chargesItem,
  onSuccess,
  onFailure
) => {
  try {
  // console.log(info.sales_status,"sales_status")

    const res = await webApi.post("/master/sales/insert", {
      module: "DIRECT_SALES_ORDER",
      customer_id: info.ddl_customer?.value,
      quotation_date: timestamp(info.txt_sales_order_date),
      sales_order_date: timestamp(info.txt_sales_order_date),
      sales_order_note: info.txt_sales_note,
      enquiry_status: info.enquiry_status,
      quotation_status: info.quotation_status,
      sales_status: info.sales_status,
      enquiry_details: {
        enquiry_date: timestamp(info.txt_sales_order_date),
        source_id: info.ddl_sales_source?.value,
        sales_executive_id: info.ddl_sales_executive?.value,
        showroom_warehouse_id: info.ddl_sales_showroom?.value,
        delivery_from_date: timestamp(info.txt_sales_delivery_date),
        delivery_to_date: timestamp(info.txt_sales_delivery_end),
        note: info.txt_sales_note,
      },
      enquiry_item_details: enquiryDetails,
      quotation_item_details: quotationDetails,
      sales_order_item_details: allItems,
      sales_order_other_charges:chargesItem,
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

export const getCustomerById = async ( onSuccess, onFailure,id) => {
  try {
    const res = await webApi.post("/master/customer/list", {
      customer_id: id
    });
    if (res.status === 200) {
      const r = res.data;
      // console.log(r[0].address, "customer info s")
      let customerDetails = [];
      r.map((cust, i) => {
        
        customerDetails.push(
          {
            id: i + 1,
            customer_id: cust.customer_id,
            company: cust.company_name,
            group_id: cust.group_id,
            group_name: cust.group_name,
            reference_id: cust.reference_id,
            reference_name: cust.reference_name,
            website: cust.website,
            gst: cust.gst_no,
            name: cust.contact_person[0]?.txt_name,
            email: cust.contact_person[0]?.txt_email,
            mobile: cust.contact_person[0]?.txt_mobile,
            whatsapp: cust.contact_person[0]?.txt_whatsapp,
            ddl_state_label: cust.address.length,
            allAddress: cust.address,
            allContacts: cust.contact_person,
            action_items: cust.action_items,
            opening_balance:cust.opening_balance,
            dr_cr: cust.dr_cr,
            status: "Y", //this is default status for testing
            // status: cust.active_status,
            action: "action",
            // menu: [
            //         {
            //           label: "View",
            //           link: "/admin/master/customer-view",
            //         },
            //         {
            //           label: "Edit",
            //           itemEdit: true,
            //           link: "/admin/master/customer-add",
            //         },
            //       ],
          });
      });
      if (customerDetails.length) {
        // console.log(customerDetails,"return from service")
        return onSuccess(customerDetails);
      }
      else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  };
};

export const ledger_check_by_customer_name = async (id,name,type,onSuccess, onFailure)=>{
  try {
    const res = await webApi.post("/master/ledgerAccount/ledger_check_by_customer_name", {
      type_id: id,
      ledger_account_name: name,
      type: type,
    });
    if (res.status === 200) {
      const r = res.data;
      
      if (r) {
        return onSuccess(r);
      }
      else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    }

  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  };
}