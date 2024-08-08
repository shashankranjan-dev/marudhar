import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import {
  dateFormate,
  currencyFormate,
} from "../views/Pages/HelperComponent/utils";


function toTitleCase(str) {
  if (str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  else {
    return "";
  }

}




export const getListLedgerAccount = async (onSuccess, onFailure, ledger_group_id,) => {


  try {
    const res = await webApi.post("/master/ledger_account/list", {
      // short_data: true,
      // ledger_group_id:ledger_group_id,

    });
    //console.log("sen20042allLedAcc", res);
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          value: r.ledger_account_id,
          label: toTitleCase(r.ledger_account),

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

export const showroomWiseSalesData = async (addSearch, onSuccess, onFailure) => {

  try {
    const res = await webApi.post("/reports/showroom_warehouse_stock2/list2", {
      showrooms_warehouse_id: addSearch.ddl_showroom.value,
      brand_id: addSearch.ddl_brand.value,
    });
    if (res.status === 200) {
      const rq = res.data;
      //console.log(rq,'ddddd')

      if (rq) {
        const InsertData = await webApi.post("/reports/itemStock/insert", {
          data:rq
        })

        if (InsertData.status === 200) {
          onSuccess(InsertData.data);
        }
      }

    } else {
      onFailure("Something Wrong! Please Try again latr " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};


export const brandReportInsert = async (addSearch, onSuccess, onFailure) => {
  try {
    const res = await webApi.post('/reports/brandReportStorageInsert/insert', {
      brand_id: addSearch.ddl_brand_report.value,
      fromDate: timestamp(addSearch.txt_from_date),
      toDate: timestamp(addSearch.txt_to_date),
    })

    if (res.status === 200) {
      onSuccess(res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
}