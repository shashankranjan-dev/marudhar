import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import {
  currentDate,
  currentMonth,
  currentYear,
} from "views/Pages/HelperComponent/utils";
let asOnDate = 0;
// console.log(currentMonth(-1),currentYear(-1),"sen0907")

if (currentMonth() <= 3) {
  asOnDate = currentYear(-1) + "-04-01";
} else {
  asOnDate = currentYear() + "-04-01";
}
// console.log(timestamp(asOnDate), timestamp(currentDate(  )), "sen0907");
function toTitleCase(str) {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return "";
  }
}

export const getCustomerById = async (onSuccess, onFailure, id) => {
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
          dr_cr: c.dr_cr,
          opening_balance: c.opening_balance,

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
      if (allCusts.length) {
        return onSuccess(allCusts);
      } else {
        onFailure("Customer not Found ");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllCustomers = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/master/customer/list", {
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
          company: c.company_name,
          group_name: c.group_name,
          group_id: c.group_id,
          reference_id: c.reference_id,
          reference_name: c.reference_name,
          website: c.website,
          gst: c.gst_no,
          dr_cr: c.dr_cr,
          opening_balance: c.opening_balance,
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
      if (allCusts.length) {
        return onSuccess(allCusts);
      } else {
        onFailure("Customer not Found ");
      }
    } else {
      onFailure("Something Wrong! Please Try again laterwww " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again latersss " + error);
  }
};

export const getAllCustomersChecking = async (q, onSuccess, onFailure) => {
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
          dr_cr: c.dr_cr,
          opening_balance: c.opening_balance,
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
      if (allCusts.length) {
        return onSuccess(allCusts);
      } else {
        onFailure("Customer not Found ");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
//for ledger
export const postLedgerAccountFromCustomer = async (
  customerForm,
  inserted_by_id,
  onSuccess,
  onFailure
) => {
  // console.log(customerForm, "from service");
  try {
    const res = await webApi.post("/master/ledger_account/insert", {
      ledger_group_id: 56,

      type: "C",
      type_id: customerForm.customer_id,

      ledger_account: customerForm.txt_company_name,
      inserted_by_id: inserted_by_id,
      // alias: customerForm.txt_company_name,
      opening_balance: customerForm.txt_openingBalance,
      dr_cr_status: customerForm.ddl_dr_cr,
      // credit_limit: 0,
      as_on_date: timestamp(asOnDate),
      // active_status: customerForm.switch_active_status ? "Y" : "N",
    });
    if (res.status === 200) {
      const r = res.data;

      // console.log(r, "service return check");

      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const postCustomerForm = async (
  info,
  allContacts,
  allAddress,
  inserted_by_id,
  onSuccess,
  onFailure
) => {
  // console.log(info, "info");
  try {
    const res = await webApi.post("/master/customer/insert", {
      group_id: info.ddl_group,
      reference_id: info.ddl_references ? info.ddl_references : 161,
      company_name: info.txt_company_name,
      gst_no: info.txt_gst_no,
      website: info.txt_website,
      dr_cr: info.ddl_dr_cr ? info.ddl_dr_cr : "Dr",
      opening_balance: info.txt_openingBalance ? info.txt_openingBalance : 0,
      address: allAddress,
      contact_person: allContacts,
      active_status: info.switch_active_status ? "Y" : "N",
      inserted_by_id: inserted_by_id,
    });
    if (res.status === 200) {
      const r = res.data;
      // console.log(r.customer_id, "customer_idFORLIVE");

      const res5 = await webApi.post("/master/ledger_account/insert", {
        ledger_group_id: 56,

        type: "C",
        type_id: r.customer_id,

        ledger_account: info.txt_company_name,
        inserted_by_id: inserted_by_id,
        // alias: info.txt_company_name,
        opening_balance: info.txt_openingBalance,
        dr_cr_status: info.ddl_dr_cr,
        // credit_limit: 0,
        as_on_date: timestamp(asOnDate),
        // active_status: info.switch_active_status ? "Y" : "N",
      });

      //ledgerStorage new insert
      if (res5.status === 200) {
        // console.log(res5.data, "05012022");
        const resStorage = await webApi.post("/master/storage/insert", {
          ledgerId: res5.data.ledger_account_id,
          ledgerGroupId: 56,
          typeId: r.customer_id,
          type: "C",
          ledgerName: info.txt_company_name,
          openingBalance: Number(info.txt_openingBalance),
          openCrDrStatus: info.ddl_dr_cr ? info.ddl_dr_cr : "Dr",
          closeCrDrStatus: info.ddl_dr_cr ? info.ddl_dr_cr : "Dr",
        });
      }
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const updateCustomer = async (
  info,
  allContacts,
  allAddress,
  ledger_id,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/customer/update", {
      customer_id: info.customer_id,
      group_id: info.ddl_group,
      reference_id: info.ddl_references,
      company_name: info.txt_company_name,
      dr_cr: info.ddl_dr_cr,
      opening_balance: info.txt_openingBalance,
      gst_no: info.txt_gst_no,
      website: info.txt_website,
      address: allAddress,
      contact_person: allContacts,
      active_status: info.switch_active_status ? "Y" : "N",
    });

    const res2 = await webApi.post("/master/ledger_account/update", {
      ledger_account_id: ledger_id,
      ledger_account: info.txt_company_name,
      type: "C",
      type_id: info.customer_id,
      // ledger_group_id: info.ddl_ledger_group,
      // alias: info.txt_alias,
      opening_balance: info.txt_openingBalance,
      dr_cr_status: info.ddl_dr_cr,
      // credit_limit: info.txt_credit_limit,
      // as_on_date: timestamp(info.dtp_date),
      // active_status: info.switch_active_status ? "Y" : "N",
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
export const deleteCustomer = async (customerId, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/customer/delete", {
      customer_id: customerId,
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
        if (r.customer_status === "Y") {
          allGroup.push({
            value: r.master_group_id,
            label: toTitleCase(r.group),
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

export const getAllReference = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/reference/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allreferenceAcc = [];
      r.map((r, i) => {
        allreferenceAcc.push({
          value: r.reference_id,
          label: toTitleCase(r.name),
        });
      });
      return onSuccess(allreferenceAcc);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// Not use in customer
export const getAllSource = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/source/list", {
      short_data: true,
    });
    if (res.status === 200) {
      const r = res.data;
      let allGroup = [];
      r.map((r, i) => {
        allGroup.push({
          value: r.source_id,
          label: r.source,
        });
      });
      return onSuccess(allGroup);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getListCustomers = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/customerNameOnly/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allCusts = [];
      r.map((c, i) => {
        // console.log(c, "sen0507");
        // if (c.contact_person[0]) {
        allCusts.push({
          value: c.customer_id,
          // label: toTitleCase(c.contact_person[0].txt_name),
          label: c.company_name,
        });
        // }
      });
      // allCusts.sort((a, b) => a.label > b.label ? 1 : -1);
      return onSuccess(allCusts);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllCustomerArea = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/area/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allCusts = [];
      r.map((c, i) => {
        allCusts.push({
          value: c.area_id,
          label: toTitleCase(c.area),
        });
      });
      allCusts.sort((a, b) => (a.label > b.label ? 1 : -1));
      return onSuccess(allCusts);
    } else {
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
  // console.log(customer_name,"999d2")
  try {
    const res = await webApi.post("/master/ledger_account/list", {
      // source_id: q?.ddl_source.value,
      ledger_account: customer_name,
      // keyword_pharse: q.txt_keyword_pharse,
    });

    if (res.status === 200) {
      const r = res.data;
      let allLedg = [];
      // console.log(r,"0001")
      r.map((c, i) => {
        allLedg.push({
          // id: i + 1,
          ledger_id: c.ledger_account_id,
        });
      });
      if (allLedg.length) {
        // console.log(allLedg,"999d3")
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
