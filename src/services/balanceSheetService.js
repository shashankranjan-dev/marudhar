import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import {
  dateFormate,
  currencyFormate,
} from "../views/Pages/HelperComponent/utils";

function toTitleCase(str) {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return "";
  }
}

export const getAllLedgerByPurchaseGroupId = async (
  onSuccess,
  onFailure,

) => {
 
  try {
    const res = await webApi.post("/master/trialbalance/list", {
     
      ledgerGroupId: 66,
    });
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          ledger_account_id: r.ledgerId,
          ledger_account: toTitleCase(r.ledgerName),
          ledger_group_id: r.ledgerGroupId,
          opening_balance: r.openingBalance,
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.openCrDrStatus,
          closeCrDrStatus: r.closeCrDrStatus,
        });
      });     
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllLedgerLoansTotal = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/master/trialbalance/list", {
      short_data: true,
      ledgerGroupIdArray: [52,53],
    });
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          ledger_account_id: r.ledgerId,
          ledger_account: toTitleCase(r.ledgerName),
          ledger_group_id: r.ledgerGroupId,
          opening_balance: r.openingBalance,
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.openCrDrStatus,
          closeCrDrStatus: r.closeCrDrStatus,
        });
      });
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllLedgerByBankOd = async (onSuccess, onFailure, q) => {
  // console.log(q, "");
  try {
    const res = await webApi.post("/master/trialbalance/list", {
     
      ledgerGroupId: 52,
    });
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          ledger_account_id: r.ledgerId,
          ledger_account: toTitleCase(r.ledgerName),
          ledger_group_id: r.ledgerGroupId,
          opening_balance: r.openingBalance,
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.openCrDrStatus,
          closeCrDrStatus: r.closeCrDrStatus,
        });
      });
      // console.log("allLedAcc", allLedgerAccount);
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllLedgerByUnsecure = async (onSuccess, onFailure, q) => {
  // console.log(q,"")
  try {
    const res = await webApi.post("/master/trialbalance/list", {
      
      ledgerGroupId: 53,
    });
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          ledger_account_id: r.ledgerId,
          ledger_account: toTitleCase(r.ledgerName),
          ledger_group_id: r.ledgerGroupId,
          opening_balance: r.openingBalance,
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.openCrDrStatus,
          closeCrDrStatus: r.closeCrDrStatus,
        });
      });
      // console.log("allLedAcc", allLedgerAccount);
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllLedgerByCurrent = async (onSuccess, onFailure, q) => {
  // console.log("sen reched")

  try {
    const res = await webApi.post("/master/trialbalance/list", {
      
      ledgerGroupId: 54,
    });
    if (res.status === 200) {
      const r = res.data;
      
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          ledger_account_id: r.ledgerId,
          ledger_account: toTitleCase(r.ledgerName),
          ledger_group_id: r.ledgerGroupId,
          opening_balance: r.openingBalance,
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.closeCrDrStatus,
          closeCrDrStatus: r.closeCrDrStatus,
        });
      });
      // console.log("allLedAcc", allLedgerAccount);
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllLedgerByLoan = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/master/trialbalance/list", {
      short_data: true,
      ledgerGroupId: 55,
    });
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          ledger_account_id: r.ledgerId,
          ledger_account: toTitleCase(r.ledgerName),
          ledger_group_id: r.ledgerGroupId,
          opening_balance: r.openingBalance,
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.closeCrDrStatus,
          closeCrDrStatus: r.closeCrDrStatus,
        });
      });
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllLedgerBySunday = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/master/trialbalance/list", {
      short_data: true,
      ledgerGroupId: 56,
    });
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          ledger_account_id: r.ledgerId,
          ledger_account: toTitleCase(r.ledgerName),
          ledger_group_id: r.ledgerGroupId,
          opening_balance: r.openingBalance,
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.closeCrDrStatus,
          closeCrDrStatus: r.closeCrDrStatus,
        });
      });

      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllLedgerByCash = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/master/trialbalance/list", {
      short_data: true,
      ledgerGroupId: 57,
    });
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          ledger_account_id: r.ledgerId,
          ledger_account: toTitleCase(r.ledgerName),
          ledger_group_id: r.ledgerGroupId,
          opening_balance: r.openingBalance,
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.openCrDrStatus,
          closeCrDrStatus: r.closeCrDrStatus,
        });
      });
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllLedgerByBank = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/master/trialbalance/list", {
      short_data: true,
      ledgerGroupId: 58,
    });
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          ledger_account_id: r.ledgerId,
          ledger_account: toTitleCase(r.ledgerName),
          ledger_group_id: r.ledgerGroupId,
          opening_balance: r.openingBalance,
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.closeCrDrStatus,
          closeCrDrStatus: r.closeCrDrStatus,
        });
      });

      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// export const getAllClosingBalance = async (onSuccess, onFailure,addSearch, ledger_account_id) => {
//     // console.log(txt_to_date,"abc")

//     try {
//       const res = await webApi.post("/master/ledger_account/balance", {
//         from_date: timestamp(addSearch.txt_from_date),
//         to_date: timestamp(addSearch.txt_to_date),
//         ledger_account_id: ledger_account_id,
//       });

//       if (res.status === 200) {
//         let r = res.data;
//         let allItems = [];
//         let inc = 0;

//         if (r) {
//           // console.log("AII", r);
//           let res = [{
//             ...r[0], closing_balance: (r[0].closing_balance >= 0 ? r[0].closing_balance : -r[0].closing_balance),
//             dr_cr_status: (r[0].closing_balance >= 0 ? r[0].dr_cr_status : (r[0].dr_cr_status === "Dr" ? "Cr" : "Dr")),
//           }];

//           return onSuccess(res);
//           } else {
//             return onFailure("Journal Not Found");
//           }
//       } else {
//         onFailure("Something Wrong! Please Try again later " + res.data);
//       }
//     } catch (error) {
//       onFailure("Something Wrong! Please Try again later" + error);
//     }
//   };



//closing stock

export const getClosingBalance = async (onSuccess, onFailure) => {
  // console.log("reched here");
  try {
    const res = await webApi.post("/reports/stockRegisterClosing/list", {
      short_data: true,
    });

    const avg = await webApi.post("/reports/closing_stock/list", {});

    const purchase = await webApi.post("/master/trialbalance/list", {
      ledgerGroupId: 60,
    });

    const sales = await webApi.post("/master/trialbalance/list", {
      ledgerGroupId: 59,
      ledgerId: 2530,
    });

    if (
      res.status === 200 &&
      avg.status === 200 &&
      purchase.status === 200 &&
      sales.status === 200
    ) {
      let allStock = [];

      const resClosing = res.data;
      const resAvg = avg.data;
      const respurchase = purchase.data;
      const ressales = sales.data;

      // console.log("sank1008/resClosing", resClosing);
      // console.log("sank1008/resAvg", resAvg);
      // console.log("sank1008/respurchase", respurchase);
      // console.log("sank1008/ressales", ressales);

      allStock.push({
        sumClosingStock: resClosing[0]?.sumClosingStock,
        Avg_Cost: resAvg[0]?.SumRate / resAvg[0]?.SumQuantity,
        purchaseClosing: respurchase.reduce(
          (sum, li) => Number(sum) + Number(li.closingBalance),
          0
        ),
        salesClosing: ressales[0]?.closingBalance,
      });

      // console.log("sank1009", allStock);
      return onSuccess(allStock);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};



export const getClosingStock = async (onSuccess, onFailure, q) => {
  console.log(q,"sankha1250")
  try {
    const res = await webApi.post("/reports/closing_Value/list", {
      showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
      brand_id: q.ddl_brand?.value,
      // item_id:q.txt_item?.value,

    });

    // const resAvgValue = await webApi.post("/reports/SingleItem_Avg_Value/list", {
    
    //   item_id:q.txt_item?.value,
    // });

    // console.log(resAvgValue.data, "sankh/");

    if (res.status === 200
      //  && resAvgValue.status === 200
       ) {
      const r = res.data;
      // const r1 = resAvgValue.data;
      // console.log(r1, "sankh");
      let allStock = [];
      r.map((r, i) => {
        console.log(
          r,
          "sankvalu220042023",
          
        );
        allStock.push({
          itID: i + 1,
          item_id: r.item_id,
          itBrand: r?.brand,
          itItem: r.item,
          itClosingQty: r.closingStock,
          // itClosingQty:r.itClosingQty,
          showroom_warehouse_id: r.showroom_warehouse_id,
          // showroom_warehouse_id: r1.showroom_warehouse_id,

          sumPurchaseQty:r.sumPurchaseQty,
          sumPurchase_Net_Value:r.sumPurchase_Net_Value,

          itShowroom: r?.showroom,

          itClosingRate: r.sumPurchase_Net_Value/ r.sumPurchaseQty ? (r.sumPurchase_Net_Value/ r.sumPurchaseQty).toFixed(2):0,
          itClosingValue:(r.closingStock * (r.sumPurchase_Net_Value/ r.sumPurchaseQty ? (r.sumPurchase_Net_Value/ r.sumPurchaseQty):0)).toFixed(2)
          // qty: r1[0]?.SumQuantity,
          // netvalue: r1[0]?.SumNetValue,
          // itClosingRate: r1[0]?.rate,
          // itClosingRate: (
          //   r?.helPurchase[0]?.sumValue / r?.helPurchase[0]?.sumQty ? r?.helPurchase[0]?.sumValue / r?.helPurchase[0]?.sumQty :0
          // ).toFixed(2),
          // itClosingValue: (
          //    r.closingStock * ( r?.helPurchase[0]?.sumValue / r?.helPurchase[0]?.sumQty ? r?.helPurchase[0]?.sumValue / r?.helPurchase[0]?.sumQty :0)
          // ).toFixed(2),
        });
      });

      // const filteredStock = allStock.filter(stock => stock.showroom_warehouse_id === r1.showroom_warehouse_id);


      console.log("sank1009", allStock);
      return onSuccess(allStock);
    } else {
      onFailure("Something Wrong! Please Try again later ");
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};