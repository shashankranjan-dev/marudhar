import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import {
  dateFormate,
  currencyFormate,
} from "../views/Pages/HelperComponent/utils";


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





export const getAllLedgerAccount = async (onSuccess, onFailure ,v) => {
  try {
  
    //console.log("value")

    const res = await webApi.post("/master/ledger_account/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAcc = [];
      r.map((r, i) => {
        allLedgerAcc.push({
          id: i + 1,
          ledger_account_id: r.ledger_account_id,
          ledgerAccount: r.ledger_account,
          alias: r.alias,
          ledgerGroup: r.ledger_group_id,
          ledgerGroupName: r.ledger_group_name,
          openingBalance: r.opening_balance,
          openingBalanceView: r.opening_balance + " " + r.dr_cr_status,
          dr_cr_status: r.dr_cr_status,
          creditLimit: r.credit_limit,
          action_items: r.action_items,
          status: r.active_status,
          as_on_date: dateFormate(r.as_on_date),
          action: "action",
        });
      });
      return onSuccess(allLedgerAcc);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postLedgerAccount = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/ledger_account/insert", {
      ledger_group_id: info.ddl_ledger_group,
      ledger_account: info.txt_ledger_account,
      alias: info.txt_alias,
      opening_balance: info.txt_opening_balance,
      dr_cr_status: info.ddl_drcr,
      credit_limit: info.txt_credit_limit,
      as_on_date: timestamp(info.dtp_date),
      active_status: info.switch_active_status ? "Y" : "N",
    });
    if (res.status === 200) {
      const r = res.data;

      ///ledgerStorage
      const resStorage = await webApi.post("/master/storage/insert", {
        ledgerId: r.ledger_account_id,
        ledgerGroupId: info.ddl_ledger_group,
        typeId:  0,
        type: "DL",
        ledgerName: info.txt_ledger_account,
        openingBalance: Number(info.txt_opening_balance),
        closingBalance: Number(info.txt_opening_balance),
        openCrDrStatus: info.ddl_drcr,
        closeCrDrStatus: info.ddl_drcr,
      })

      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const updateLedgerAccount = async (info, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/ledger_account/update", {
      ledger_account_id: info.ledger_account_id,
      ledger_account: info.txt_ledger_account,
      ledger_group_id: info.ddl_ledger_group,
      alias: info.txt_alias,
      opening_balance: info.txt_opening_balance,
      dr_cr_status: info.ddl_drcr,
      credit_limit: info.txt_credit_limit,
      as_on_date: timestamp(info.dtp_date),
      active_status: info.switch_active_status ? "Y" : "N",
    });
    const openingBalance = await webApi.post("/master/ledger_storage1/update", {
      openingBalance: Number(info.txt_opening_balance),
      ledgerId: Number(info.ledger_account_id),
      openCrDrStatus: info.ddl_drcr,
    });



    
    if (res.status === 200) {
      const r = res.data;
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later 5 " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later 54" + error);
  }
};
export const deleteLedgerAccount = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/ledger_account/delete", {
      ledger_account_id: id,
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

export const getAllLedgerGroupUsingFilter = async (onSuccess, onFailure) => {
  try {
    // //console.log(short_data,"sd")
    const res = await webApi.post("/master/ledger_group/list", {
      short_data: true,
    });
    if (res.status === 200) {
      let r = res.data;
      let allledgerGroup = [];

      //sundry cre & deb not showing using filter
      r = r.filter((a) => a.ledger_group_id!=54 && a.ledger_group_id!=56);

      r.map((r, i) => {
        allledgerGroup.push({
          value: r.ledger_group_id,
          label: r.ledger_group,
        });
      });
      return onSuccess(allledgerGroup);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};


export const getAllLedgerGroup = async (onSuccess, onFailure) => {
  try {
    // //console.log(short_data,"sd")
    const res = await webApi.post("/master/ledger_group/list", {
      short_data: true,
    });
    if (res.status === 200) {
      let r = res.data;
      let allledgerGroup = [];

      //sundry cre & deb not showing using filter
      // r = r.filter((a) => a.ledger_group_id!=54 && a.ledger_group_id!=56);

      r.map((r, i) => {
        allledgerGroup.push({
          value: r.ledger_group_id,
          label: r.ledger_group,
        });
      });
      return onSuccess(allledgerGroup);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getListLedgerAccount = async (onSuccess, onFailure,ledger_group_id,) => {

  //console.log(ledger_group_id,"sen2004222")
  try {
    const res = await webApi.post("/master/ledger_account/list", {
      short_data: true,
      ledger_group_id:ledger_group_id,
      
    });
    //console.log("sen20042allLedAcc", res);
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          value: r.ledger_account_id,
          label: toTitleCase(r.ledger_account),
          ledger_group_id: r.ledger_group_id,
          opening_balance: r.opening_balance,
        });
      });
      //console.log("sen20042allLedAcc", allLedgerAccount);
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getsearchAllLedgerAccount = async (onSuccess, onFailure ,v) => {
  try {
  
    //console.log("value")

    const res = await webApi.post("/master/ledger_account_search/list", {
      ledger_account_id:v.ddl_ledger_account?.value,
      ledger_group_id: v.ddl_ledger_group?.value,
    });
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAcc = [];
      r.map((r, i) => {
        //console.log("sen1310",r)
        allLedgerAcc.push({
          id: i + 1,
          ledger_account_id: r.ledger_account_id,
          ledgerAccount: r.ledger_account,
          alias: r.alias,
          ledgerGroup: r.ledger_group_id,
          ledgerGroupName: r.ledger_group_name,
          openingBalance: r.opening_balance,
          openingBalanceView: r.opening_balance + " " + r.dr_cr_status,
          dr_cr_status: r.dr_cr_status,
          creditLimit: r.credit_limit,
          action_items: r.action_items,
          status: r.active_status,
          as_on_date: dateFormate(r.as_on_date),
          action: "action",
        });
      });
      return onSuccess(allLedgerAcc);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const getListLedgerAccountByGroupId = async (onSuccess, onFailure,ledger_group_id) => {
  try {
    const res = await webApi.post("/master/ledger_account/list", {
      short_data: true,
      ledger_group_id:ledger_group_id,
      
    });
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          value: r.ledger_account_id,
          label: toTitleCase(r.ledger_account),
          ledger_group_id: r.ledger_group_id,
          opening_balance: r.opening_balance,
         
        });
      });
      //console.log("allLedAcc", allLedgerAccount);
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

