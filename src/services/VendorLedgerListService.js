import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import { currentDate } from "views/Pages/HelperComponent/utils";

function toTitleCase(str) {
  if(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  else {
    return "";
  }
  
}

export const getVendorById = async (onSuccess, onFailure, id) => {

  
  try {
    const res = await webApi.post("/master/customer/list", {
      
      // source_id: q?.ddl_source.value,
      customer_id: id,
      // keyword_pharse: q.txt_keyword_pharse,
    });
    if (res.status === 200) {
      const r = res.data;
      let allCusts = [];
      r.map((c, i) => {
        allCusts.push({
          id: i + 1,
          customer_id: c.customer_id,
          company: c.company_name,
          group_name: c.group_name,
          group_id: c.group_id,
          reference_id: c.reference_id,
          reference_name: c.reference_name,
          website: c.website,
          gst: c.gst_no,
          dr_cr:c.dr_cr,
          opening_balance:c.opening_balance,

          name: c.contact_person[0]?.txt_name,
          email: c.contact_person[0]?.txt_email,
          mobile: c.contact_person[0]?.txt_mobile,
          whatsapp: c.contact_person[0]?.txt_whatsapp,

          allAddress: c.address,
          allContacts: c.contact_person,
          action_items: c.action_items,
          // status: "Y", //this is default status for testing
          status: c.active_status,
          action: "action",
        });
      });
      if(allCusts.length){
      return onSuccess(allCusts);
    } 
    else {
      onFailure("Customer not Found " );
    }
  }
    
    else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllVendors = async (onSuccess, onFailure, q) => {

  try {
    const res = await webApi.post("/reports/vendorLedgerList/list", {
      
      // source_id: q?.ddl_source.value,
      group_id: q?.ddl_group_id?.value,
      keyword_pharse: q?.txt_keyword_pharse,
    });
    if (res.status === 200) {
      const r = res.data;
      
      let allCusts = [];
      r.map((c, i) => {
        allCusts.push({
          id: i + 1,
          customer_id: c.customer_id,
          LedCompany: c.company_name,
          LedGroup_name: c.group_name,
          LedLedger_account_name:c.ledger_account_name,
          group_id: c.group_id,
          reference_id: c.reference_id,
          reference_name: c.reference_name,
          website: c.website,
          gst: c.gst_no,
          dr_cr:c.dr_cr,
          opening_balance:c.opening_balance,
          name: c.contact_person?.txt_name,
          email: c.contact_person?.txt_email,
          mobile: c.contact_person?.txt_mobile,
          whatsapp: c.contact_person?.txt_whatsapp,

          allAddress: c.address,
          allContacts: c.contact_person,
          action_items: c.action_items,
          // status: "Y", //this is default status for testing
          status: c.active_status,
          action: "action",
        });
      });
      if(allCusts.length){
      return onSuccess(allCusts);
    } 
    else {
      onFailure("Customer not Found " );
    }
  }
    
    else {
      onFailure("Something Wrong! Please Try again laterwww " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again latersss " + error);
  }
};

export const getAllCustomersChecking = async (q,onSuccess, onFailure) => {

  try {
    const res = await webApi.post("/master/customer/list", {
      
      // source_id: q?.ddl_source.value,
      // group_id: q?.ddl_group_id,
      keyword_pharse: q,
    });
    if (res.status === 200) {
      const r = res.data;
      let allCusts = [];
      r.map((c, i) => {
        allCusts.push({
          id: i + 1,
          customer_id: c.customer_id,
          company: c.company_name,
          group_name: c.group_name,
          group_id: c.group_id,
          reference_id: c.reference_id,
          reference_name: c.reference_name,
          website: c.website,
          gst: c.gst_no,
          dr_cr:c.dr_cr,
          opening_balance:c.opening_balance,
          name: c.contact_person[0]?.txt_name,
          email: c.contact_person[0]?.txt_email,
          mobile: c.contact_person[0]?.txt_mobile,
          whatsapp: c.contact_person[0]?.txt_whatsapp,

          allAddress: c.address,
          allContacts: c.contact_person,
          action_items: c.action_items,
          // status: "Y", //this is default status for testing
          status: c.active_status,
          action: "action",
        });
      });
      if(allCusts.length){
      return onSuccess(allCusts);
    } 
    else {
      onFailure("Customer not Found " );
    }
  }
    
    else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
//for ledger
export const postLedgerAccountFromCustomer = async (customerForm,inserted_by_id, onSuccess, onFailure) => {
  // console.log(customerForm,"from service")
  try {
    const res = await webApi.post("/master/ledger_account/insert", {
      ledger_group_id: 56,

      type: "C",
      type_id:customerForm.customer_id,
      
      ledger_account: customerForm.txt_company_name,
      inserted_by_id:inserted_by_id,
      // alias: customerForm.txt_company_name,
      opening_balance: customerForm.txt_openingBalance,
      dr_cr_status:customerForm.ddl_dr_cr,
      // credit_limit: 0,
      as_on_date: timestamp(currentDate()),
      // active_status: customerForm.switch_active_status ? "Y" : "N",
    });
    if (res.status === 200) {
      const r = res.data;

      // console.log(r,"service return check")
      
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};




// for Dropdwon list
export const getAllGroup = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/master_group/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allGroup = [];
      r.map((r, i) => {
        if (r.vendor_status === "Y") {
          allGroup.push({
            value: r.master_group_id,
            label:toTitleCase( r.group),
          });
        }
      });

      return onSuccess(allGroup);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

