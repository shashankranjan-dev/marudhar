
import webApi from "./webApi/webApi";
import { dateFormate } from "../views/Pages/HelperComponent/utils";
import { timestamp } from "./Utils/utils";

export const getAllUom = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/uom/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allUom = [];
      r.map((r) => {
        allUom.push({
          value: r.uom_id,
          label: r.higher_unit,
        });
      });
      onSuccess(allUom);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getQuotationBySalesId = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/view_sales_agg/list", {
      sales_id: id,
    });
    // const res2 = await webApi.post("/master/customer/list", {
    //   customer_id: id
    // });

    if (res.status === 200) {
      const r = res.data;
      // const r2 = res2.data;
      let allItems = [];

      // console.log(r, "chek")

      r.map((r, i) => {
        // r2.map((r2,i)=>{

        console.log(r, "chek r")
        allItems.push({
          sales_id: r.sales_id,
          enqDate: dateFormate(r.enquiry_date),
          enqDateField: dateFormate(r.enquiry_date),
          enqNo: r?.enquiry_no[0],
          qutNo: r?.quotation_no[0],
          qutDate: dateFormate(r.quotation_date),
          sales_order_no: r?.sales_order_no[0],
          sales_order_date: dateFormate(r.sales_order_date),
          purchase_order_no: r.purchase_order_no,
          purchase_order_date: dateFormate(r.purchase_order_date),
          sales_order_note: r.sales_order_note,
          enqCustomer_id:r.customer_id,
          enqCustomer: r.customer_name,
          enqSalesExecutive: r.sales_executive_name,
          enqSource: r.source_name,
          enqShowroom: r.showroom_warehouse_name,

          ddl_enqCustomer: { label: r.customer_name, value: r.customer_id },
          mobile: r.mobile,
          email: r.email,
          ddl_enqSalesExecutive: {
            label: r.sales_executive_name,
            value: r.enquiry_details?.sales_executive_id,
          },
          ddl_enqShowroom: {
            label: r.showroom_warehouse_name,
            value: r.enquiry_details?.showroom_warehouse_id,
          },
          ddl_enqSource: {
            label: r.source_name,
            value: r.enquiry_details?.source_id,
          },

          delivery_from_date: dateFormate(
            r.enquiry_details?.delivery_from_date
          ),
          delivery_to_date: dateFormate(r.enquiry_details?.delivery_to_date),
          note: r.enquiry_details?.note,
          quotation_note: r.quotation_note,
          status: r.enquiry_status,
          item_details: r.enquiry_item_details,
          quotation_item_details: r.quotation_item_details,
          quotation_other_charges: r.quotation_other_charges,
         
        });
      });
      return onSuccess(allItems[0]);
    // })
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

//customer info fetching 
export const getCustomerById = async (id, onSuccess, onFailure) => {
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


export const postQuotation = async (info, updateItem, chargesItem, onSuccess, onFailure) => {
  try {
    let res;
    if (info.edit) {
      //  console.log(chargesItem,"chargeeeeHDHDHeeeZZZ")

      res = await webApi.post("/master/sales/update", {
        sales_id: info.sales_id,
        quotation_date: timestamp(info.txt_quotation_date),
        quotation_note: info.txt_quotation_note,
        quotation_item_details: updateItem,
        quotation_other_charges: chargesItem,

      });
    } else {
        //  console.log(updateItem,"405")

      res = await webApi.post("/master/sales/update", {
        sales_id: info.sales_id,
        module:"QUOTATION",
        quotation_status: info.quotation_status,
        enquiry_status: info.enquiry_status,
        quotation_date: timestamp(info.txt_quotation_date),
        quotation_note: info.txt_quotation_note,
        quotation_item_details: updateItem,
        quotation_other_charges: chargesItem,
      });
    }
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

export const updateQuotation = async (info, updateItem, chargesItem, onSuccess, onFailure) => {
  try {
    let res;
      res = await webApi.post("/master/sales/update", {
        sales_id: info.sales_id,
        quotation_date: timestamp(info.txt_quotation_date),
        quotation_note: info.txt_quotation_note,
        quotation_item_details: updateItem,
        quotation_other_charges: chargesItem,

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