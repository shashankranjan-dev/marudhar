import webApi from "./webApi/webApi";
import{ timestamp } from "../services/Utils/utils"
import{ currentDate } from "../views/Pages/HelperComponent/utils";


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

export const getAllVendors = async (onSuccess, onFailure, q) => {
  try {
    //console.log(q,"qqq")
    const res = await webApi.post("/master/vendor/list", {
      
      
      group_id:q?.ddl_group_id,
      keyword_pharse:q?.txt_keyword_pharse,

    });
   
    if (res.status === 200) {
      const r = res.data;
      let allVendors = [];
      r.map((v, i) => {
        //console.log(r,"sen0909/search")
        allVendors.push({
          id: i + 1,
          vendor_id: v.vendor_id,
          company: v.company_name,
          group_name: v.group_name,
          group_id: v.group_id,
          website: v.website,
          reference_id: v.reference_id,
          reference_name: v.reference_name,
          dr_cr:v.dr_cr,
          opening_balance:v.opening_balance,
          gst: v.gst_no,
          name: v.contact_person[0]?.txt_name,
          email: v.contact_person[0]?.txt_email,
          mobile: v.contact_person[0]?.txt_mobile,
          whatsapp: v.contact_person[0]?.txt_whatsapp,
          allAddress: v.address,
          allContacts: v.contact_person,
          allBanks: v.bank_details,
          action_items: v.action_items,
          status: v.active_status,
          action: "action",
        });
      });

      if(allVendors.length){
      return onSuccess(allVendors);
    } 
    else {
      onFailure("vendor not found " );
    }
  } 
     else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllVendorsChecking = async (q,onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/vendor/list", {
      
      
      // group_id: q?.ddl_group_id,
      keyword_pharse: q,

    });
   
    if (res.status === 200) {
      const r = res.data;
      let allVendors = [];
      r.map((v, i) => {
        allVendors.push({
          id: i + 1,
          vendor_id: v.vendor_id,
          company: v.company_name,
          group_name: v.group_name,
          group_id: v.group_id,
          website: v.website,
          reference_id: v.reference_id,
          reference_name: v.reference_name,
          dr_cr:v.dr_cr,
          opening_balance:v.opening_balance,
          gst: v.gst_no,
          name: v.contact_person[0]?.txt_name,
          email: v.contact_person[0]?.txt_email,
          mobile: v.contact_person[0]?.txt_mobile,
          whatsapp: v.contact_person[0]?.txt_whatsapp,
          allAddress: v.address,
          allContacts: v.contact_person,
          allBanks: v.bank_details,
          action_items: v.action_items,
          status: v.active_status,
          action: "action",
        });
      });

      if(allVendors.length){
      return onSuccess(allVendors);
    } 
    else {
      onFailure("vendor not found " );
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
export const postLedgerAccountFromVendor = async (vendorForm,inserted_by_id, onSuccess, onFailure) => {
  //console.log(vendorForm,"from service")
  try {
    const res = await webApi.post("/master/ledger_account/insert", {
      ledger_group_id: 54,
      ledger_account: vendorForm.txt_company_name,
      inserted_by_id:inserted_by_id,
      // alias: customerForm.txt_company_name,
      opening_balance: vendorForm.txt_openingBalance,
      dr_cr_status: vendorForm.ddl_dr_cr,
      // credit_limit: 0,
      as_on_date: timestamp(currentDate()),
      // active_status: customerForm.switch_active_status ? "Y" : "N",
    });
    if (res.status === 200) {
      const r = res.data;
      //console.log(r,"sen0909")
      // const res2 = await webApi.post("/master/ledger_account/insert", {
      //   ledger_group_id: 54,
      //   ledger_account: vendorForm.txt_company_name,
      //   inserted_by_id:inserted_by_id,
      //   // alias: customerForm.txt_company_name,
      //   opening_balance: vendorForm.txt_openingBalance,
      //   dr_cr_status: vendorForm.ddl_dr_cr,
      //   // credit_limit: 0,
      //   as_on_date: timestamp(currentDate()),
      //   // active_status: customerForm.switch_active_status ? "Y" : "N",
      //   type:"V",
      //   type_id:r.vendor_id
      // });
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const postVendorForm = async (
  info,
  allContacts,
  allAddress,
  allBanks,
  inserted_by_id,
  onSuccess,
  onFailure,
) => {
  try {
    const res = await webApi.post("/master/vendor/insert", {
      group_id: info.ddl_vendor_group,
      reference_id: info.ddl_references,
      opening_balance:info.txt_openingBalance ?info.txt_openingBalance:0,
      dr_cr:info.ddl_dr_cr ? info.ddl_dr_cr : 0,
      company_name: info.txt_company_name,
      gst_no: info.txt_gst_no,
      website: info.txt_website,
      address: allAddress,
      contact_person: allContacts,
      bank_details: allBanks,
      active_status: info.switch_active_status ? "Y" : "N",
      inserted_by_id:inserted_by_id,
    });
    if (res.status === 200) {
      const r = res.data;
      const res2 = await webApi.post("/master/ledger_account/insert", {
        ledger_group_id: 54,
        ledger_account: info.txt_company_name,
        inserted_by_id:inserted_by_id,
        // alias: customerForm.txt_company_name,
        opening_balance: info.txt_openingBalance ?info.txt_openingBalance:0,
        dr_cr_status: info.ddl_dr_cr,
        // credit_limit: 0,
        as_on_date: timestamp(currentDate()),
        // active_status: customerForm.switch_active_status ? "Y" : "N",
        type:"V",
        type_id:r.vendor_id
      })

      //ledgerStorage new insert
      if(res2.status===200){

        //console.log(res2.data,"05012022")
        const resStorage = await webApi.post("/master/storage/insert", {
          ledgerId: res2.data.ledger_account_id,
          ledgerGroupId: 54,
          typeId:  r.vendor_id,
          type: "V",
          ledgerName: info.txt_company_name,
          openingBalance: Number(info.txt_openingBalance),
          openCrDrStatus: info.ddl_dr_cr,
          closeCrDrStatus: info.ddl_dr_cr ? info.ddl_dr_cr : "Dr",
        })
      }
      
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const updateVendor = async (
  info,
  LedgerAccountId,
  allContacts,
  allAddress,
  allBanks,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/vendor/update", {
      vendor_id: info.vendor_id,
      group_id: info.ddl_group,
      reference_id: info.ddl_references,
      company_name: info.txt_company_name,
      opening_balance:info.txt_openingBalance,
      dr_cr:info.ddl_dr_cr,
      gst_no: info.txt_gst_no,
      website: info.txt_website,
      address: allAddress,
      contact_person: allContacts,
      bank_details: allBanks,
      active_status: info.switch_active_status ? "Y" : "N",
    });
    const res2 = await webApi.post("/master/ledger_account/update", {
      ledger_account_id: LedgerAccountId,
      ledger_account: info.txt_company_name,
      type: "V",
      type_id: info.vendor_id,
      // ledger_group_id: info.ddl_ledger_group,
      // alias: info.txt_alias,
      opening_balance: info.txt_openingBalance,
      dr_cr_status: info.ddl_dr_cr,
      // credit_limit: info.txt_credit_limit,
      // as_on_date: timestamp(info.dtp_date),
      // active_status: info.switch_active_status ? "Y" : "N",
    })
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
export const deleteVendor = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/vendor/delete", {
      vendor_id: id,
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
            label: toTitleCase(r.group),
          });
        }
      });
      return onSuccess(allGroup);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const getAllReference = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/reference/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allreferenceAcc = [];
      r.map((r, i) => {
        allreferenceAcc.push({
          value: r.reference_id,
          label: r.name,
        });
      });
      return onSuccess(allreferenceAcc);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const getListVendor = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/vendor/list", {
    


    });
    if (res.status === 200) {
      const r = res.data;
      let allvendor = [];
      r.map((r, i) => {
        if(r.company_name && r.vendor_id>0 && r.company_name){
        allvendor.push({
          value: r.vendor_id,
          label: (r.company_name),
          // label: toTitleCase(r.company_name),
        });
      }
      });
      return onSuccess(allvendor);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

//FOR Contractor
export const getListContractor = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/vendor/list", {
      group_id: 1986
    });
    if (res.status === 200) {
      //console.log("reached555",res)
      const r = res.data;
      let allvendor = [];
      r.map((r, i) => {
        allvendor.push({

          value: r.vendor_id,
          label: r.company_name,
        });
      });
      
      return onSuccess(allvendor);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

//ledger id of vendor
export const getLedgerByVendorName = async (
  vendor_name,
  onSuccess,
  onFailure
) => {
  // //console.log(customer_name,"999d2")
  try {
    const res = await webApi.post("/master/ledger_account/list", {
      // source_id: q?.ddl_source.value,
      ledger_account: vendor_name,
      // keyword_pharse: q.txt_keyword_pharse,
    });

    if (res.status === 200) {
      const r = res.data;
      let allLedg = [];
      // //console.log(r,"0001")
      r.map((c, i) => {
        allLedg.push({
          // id: i + 1,
          ledger_id: c.ledger_account_id,
        });
      });
      if (allLedg.length) {
        // //console.log(allLedg,"999d3")
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