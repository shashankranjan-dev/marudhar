
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

export const getAllLedgerByPurchaseGroupTrial = async (onSuccess, onFailure,q) => {

    //console.log(q,"")
  try {
    const res = await webApi.post("/master/trialbalance/list", {
      short_data: true,
      ledgerGroupId:59,
      // ledger_account_id:43
      
    });
    if (res.status === 200) {

        
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {

        //console.log(r,"sank23")
        allLedgerAccount.push({
          ledger_account_id: r.ledgerId,
          ledger_account: toTitleCase(r.ledgerName),
          ledger_group_id: r.ledgerGroupId,        
          opening_balance: Math.abs(r.openingBalance),
          closingBalance:Math.abs(r.closingBalance),
          dr_cr_status:r.closeCrDrStatus,
        openCrDrStatus:r.openCrDrStatus

         

        });
      });
      //console.log("sank21", allLedgerAccount);
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};



// export const getAllClosingBalance = async (onSuccess, onFailure,addSearch, ledger_account_id) => {
  
  
//   try {

//     const res = await webApi.post("/master/ledger_account/balance", {
//       from_date: timestamp(addSearch.txt_from_date),
//       to_date: timestamp(addSearch.txt_to_date) + 86399 ,
//       ledger_account_id: ledger_account_id,
//       // ledger_account_id: q.ddl_ledger_account?.value,
//     });

//     if (res.status === 200) {
//       let r = res.data;
//       let allItems = [];
//       let inc = 0;
      
//       if (r) {
//         //console.log("AII2", r);
//         let res = [{
//           ...r[0], closing_balance: (r[0]?.closing_balance >= 0 ? r[0]?.closing_balance : -r[0]?.closing_balance),
//           initial_dr_cr: r[0]?.dr_cr_status,
//           // dr_cr_status: r[0]?.closing_balance > 0 ? "Dr" : "Cr" ,
//           dr_cr_status:r[0]?.currrent_dr_cr,

//           // dr_cr_status:r[0]?.dr_cr_status,
//         //  dr_cr_status: (r[0].closing_balance >= 0 ? r[0].dr_cr_status : (r[0].dr_cr_status === "Dr" ? "Cr" : "Dr")),

//         }];

//         return onSuccess(res);
//         } else {
//           return onFailure("Journal Not Found");
//         }
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later" + error);
//   }
// };




  export const getAllLedgerByPurchase = async (onSuccess, onFailure,q) => {

    //console.log(q,"")
  try {
    const res = await webApi.post("/master/trialbalance/list", {
      short_data: true,
      ledgerGroupId:60,
      // ledger_account_id:43
      
    });
    if (res.status === 200) {

        
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {

        //console.log(r,"sank23")
        allLedgerAccount.push({
          ledger_account_id: r.ledgerId,
        ledger_account: toTitleCase(r.ledgerName),
        ledger_group_id: r.ledgerGroupId,        
        opening_balance: Math.abs(r.openingBalance),
        closingBalance:Math.abs(r.closingBalance),
        dr_cr_status:r.closeCrDrStatus,
        openCrDrStatus:r.openCrDrStatus

       
        });
      });
      //console.log("sank21", allLedgerAccount);
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};


export const getAllLedgerByCapital = async (onSuccess, onFailure,q) => {

  //console.log(q,"")
try {
  const res = await webApi.post("/master/trialbalance/list", {
    short_data: true,
    ledgerGroupId:66,
    
    
  });
  if (res.status === 200) {

      
    const r = res.data;
    let allLedgerAccount = [];
    r.map((r, i) => {

      //console.log(r,"sank23")
      allLedgerAccount.push({
        ledger_account_id: r.ledgerId,
        ledger_account: toTitleCase(r.ledgerName),
        ledger_group_id: r.ledgerGroupId,        
        opening_balance: Math.abs(r.openingBalance),
        closingBalance:Math.abs(r.closingBalance),
        // dr_cr_status:r.closeCrDrStatus,
        dr_cr_status:r.closeCrDrStatus,
        openCrDrStatus:r.openCrDrStatus

      });
    });
    //console.log("sank21", allLedgerAccount);
    return onSuccess(allLedgerAccount);
  } else {
    onFailure("Something Wrong! Please Try again later " + res.data);
  }
} catch (error) {
  onFailure("Something Wrong! Please Try again later " + error);
}
};


export const getAllLedgerByAssets = async (onSuccess, onFailure,q) => {

  //console.log(q,"")
try {
  const res = await webApi.post("/master/trialbalance/list", {
    short_data: true,
    ledgerGroupIdArray: [55,56,57,58],
    
    
  });
  if (res.status === 200) {

      
    const r = res.data;
    let allLedgerAccount = [];
    r.map((r, i) => {

      //console.log(r,"sank23")
      allLedgerAccount.push({
        ledger_account_id: r.ledgerId,
        ledger_account: toTitleCase(r.ledgerName),
        ledger_group_id: r.ledgerGroupId,        
        opening_balance: Math.abs(r.openingBalance),
        closingBalance:Math.abs(r.closingBalance),
        dr_cr_status:r.closeCrDrStatus,
        openCrDrStatus:r.openCrDrStatus

        

      });
    });
    //console.log("sank21", allLedgerAccount);
    return onSuccess(allLedgerAccount);
  } else {
    onFailure("Something Wrong! Please Try again later " + res.data);
  }
} catch (error) {
  onFailure("Something Wrong! Please Try again later " + error);
}
};

export const getAllLedgerByLoan = async (onSuccess, onFailure,q) => {

  //console.log(q,"")
try {
  const res = await webApi.post("/master/trialbalance/list", {
    short_data: true,
    ledgerGroupIdArray:[52,53],
    // ledger_account_id:43
    
  });
  if (res.status === 200) {

      
    const r = res.data;
    let allLedgerAccount = [];
    r.map((r, i) => {

      //console.log(r,"sank23")
      allLedgerAccount.push({
        ledger_account_id: r.ledgerId,
        ledger_account: toTitleCase(r.ledgerName),
        ledger_group_id: r.ledgerGroupId,        
        opening_balance: Math.abs(r.openingBalance),
        closingBalance:Math.abs(r.closingBalance),
        dr_cr_status:r.closeCrDrStatus,
        openCrDrStatus:r.openCrDrStatus,
       

      });
    });
    //console.log("sank21", allLedgerAccount);
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
          opening_balance: Math.abs(r.openingBalance),
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.closeCrDrStatus,
          openCrDrStatus:r.openCrDrStatus,
         
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




// export const getAllLedgerBySunday = async (onSuccess, onFailure, q) => {
//   try {
//     const res = await webApi.post("/master/trialbalanceSundayCredit/list", {
//       short_data: true,      
//       ledger_group_id: 54,
//     });
//     if (res.status === 200) {
//       const r = res.data;
//       let allLedgerAccount = [];
//       r.map((r, i) => {


//         allLedgerAccount.push({
//           ledger_account_id: r.ledger_account_id,
//           ledger_account: r.company_name[0],
//           ledger_group_id: r.ledger_group_id,
//           opening_balance: r.openingBalance,
//           closingBalance: Math.abs(r.closing_balance),
//           dr_cr_status: r.current_dr_cr,
         
//         });


//       });

//       return onSuccess(allLedgerAccount);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

export const getAllLedgerByLoanAdv = async (onSuccess, onFailure, q) => {
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
          opening_balance: Math.abs(r.openingBalance),
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.closeCrDrStatus,
          openCrDrStatus:r.openCrDrStatus,
          
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

export const getAllLedgerBySundayDebtors = async (onSuccess, onFailure, q) => {
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
          opening_balance: Math.abs(r.openingBalance),
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.closeCrDrStatus,
          openCrDrStatus:r.openCrDrStatus,

          
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
          opening_balance: Math.abs(r.openingBalance),
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.closeCrDrStatus,
          openCrDrStatus:r.openCrDrStatus,

          
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
          opening_balance: Math.abs(r.openingBalance),
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.closeCrDrStatus,
          openCrDrStatus:r.openCrDrStatus,

        
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


//opning and closing balance

// export const getAllClosingBalanceTs = async (onSuccess, onFailure,txt_from_date,txt_to_date,ledger_account_id ) => {
 
  
//   try {

//     // //console.log(q.ddl_ledger_account.value,"dina ti")

//     const res_opening = await webApi.post("/master/ledger_account/balance", {
//               from_date: timestamp(txt_from_date),
//               to_date: timestamp(txt_to_date),
//               ledger_account_id: ledger_account_id,
//     });

//     const res_closing = await webApi.post("/master/ledger_account/balance", {
//               from_date: timestamp(txt_from_date),
//               to_date: timestamp(txt_to_date),
//               ledger_account_id: ledger_account_id,
//     });

//     if (res_opening.status === 200 && res_closing.status === 200) {
//       let r1 = res_opening.data;
//       let r2 = res_closing.data;
//       let allItems = [];
//       let inc = 0;
      
//       if (r1 && r2) {
//         ////console.log("AII", r);
//         let res = [{
          
          
//           opening_balance: (r1[0].closing_balance >= 0 ? r1[0].closing_balance : -r1[0].closing_balance),
//           initial_dr_cr: (r1[0].closing_balance >= 0 ? r1[0].dr_cr_status : (r1[0].dr_cr_status === "Dr" ? "Cr" : "Dr")),
//           closing_balance: (r2[0].closing_balance >= 0 ? r2[0].closing_balance : -r2[0].closing_balance),
//           dr_cr_status: (r2[0].closing_balance >= 0 ? r2[0].dr_cr_status : (r2[0].dr_cr_status === "Dr" ? "Cr" : "Dr")),
//         }];

//         return onSuccess(res);
//         } else {
//           return onFailure("Journal Not Found");
//         }
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };



export const getAllLedgerByBankOd = async (onSuccess, onFailure, q) => {
  //console.log(q, "");
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
          opening_balance: Math.abs(r.openingBalance),
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.closeCrDrStatus,
          openCrDrStatus:r.openCrDrStatus
          
        });
      });
      // //console.log("allLedAcc", allLedgerAccount);
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllLedgerByUnsecure = async (onSuccess, onFailure, q) => {
  // //console.log(q,"")
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
          opening_balance: Math.abs(r.openingBalance),
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.closeCrDrStatus,
          openCrDrStatus:r.openCrDrStatus
          
        });
      });
      // //console.log("allLedAcc", allLedgerAccount);
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllLedgerByDirect = async (onSuccess, onFailure, q) => {
  // //console.log(q,"")
  try {
    const res = await webApi.post("/master/trialbalance/list", {
      
      ledgerGroupId: 64,
    });
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          ledger_account_id: r.ledgerId,
          ledger_account: toTitleCase(r.ledgerName),
          ledger_group_id: r.ledgerGroupId,
          opening_balance:Math.abs( r.openingBalance),
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.closeCrDrStatus,
          openCrDrStatus:r.openCrDrStatus

         
        });
      });
      // //console.log("allLedAcc", allLedgerAccount);
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllLedgerByInDirect = async (onSuccess, onFailure, q) => {
  // //console.log(q,"")
  try {
    const res = await webApi.post("/master/trialbalance/list", {
      
      ledgerGroupId: 65,
    });
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          ledger_account_id: r.ledgerId,
          ledger_account: toTitleCase(r.ledgerName),
          ledger_group_id: r.ledgerGroupId,
          opening_balance: Math.abs(r.openingBalance),
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.closeCrDrStatus,
          openCrDrStatus:r.openCrDrStatus

          
        });
      });
      // //console.log("allLedAcc", allLedgerAccount);
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllLedgerByInDirectExpenses = async (onSuccess, onFailure, q) => {
  // //console.log(q,"")
  try {
    const res = await webApi.post("/master/trialbalance/list", {
      
      ledgerGroupId: 63,
    });
    if (res.status === 200) {
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {
        allLedgerAccount.push({
          ledger_account_id: r.ledgerId,
          ledger_account: toTitleCase(r.ledgerName),
          ledger_group_id: r.ledgerGroupId,
          opening_balance: Math.abs(r.openingBalance),
          closingBalance: Math.abs(r.closingBalance),
          dr_cr_status: r.closeCrDrStatus,
          openCrDrStatus:r.openCrDrStatus

          
        });
      });
      // //console.log("allLedAcc", allLedgerAccount);
      return onSuccess(allLedgerAccount);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};




export const getAllLedgerTotal = async (onSuccess, onFailure,q) => {

  //console.log(q,"")
try {
  const res = await webApi.post("/master/trialbalance/list", {
    short_data: true,
    ledgerGroupIdArray: [52,53,54,55,56,57,58,59,60,63,64,65,66],
    
    
  });
  if (res.status === 200) {

      
    const r = res.data;
    let allLedgerAccount = [];
    r.map((r, i) => {

      //console.log(r,"sank23")
      allLedgerAccount.push({
        ledger_account_id: r.ledgerId,
        ledger_account: toTitleCase(r.ledgerName),
        ledger_group_id: r.ledgerGroupId,        
        opening_balance: r.openingBalance,
        closingBalance: Math.abs(r.closingBalance),
        dr_cr_status:r.closeCrDrStatus,
       

      });
    });
    //console.log("sank21", allLedgerAccount);
    return onSuccess(allLedgerAccount);
  } else {
    onFailure("Something Wrong! Please Try again later " + res.data);
  }
} catch (error) {
  onFailure("Something Wrong! Please Try again later " + error);
}
};


 //closing stock

 export const getClosingBalance = async (onSuccess, onFailure) => {
  //console.log("reched here");
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

      //console.log("sank1008/resClosing", resClosing);
      //console.log("sank1008/resAvg", resAvg);
      //console.log("sank1008/respurchase", respurchase);
      //console.log("sank1008/ressales", ressales);

      allStock.push({
        sumClosingStock: resClosing[0]?.sumClosingStock,
        Avg_Cost: resAvg[0]?.SumRate / resAvg[0]?.SumQuantity,
        purchaseClosing: respurchase.reduce(
          (sum, li) => Number(sum) + Number(li.closingBalance),
          0
        ),
        salesClosing: ressales[0]?.closingBalance,
      });

      //console.log("sank1009", allStock);
      return onSuccess(allStock);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};



export const getOpeninngStock= async (onSuccess, onFailure,) => {
  
    
  try {
    const res = await webApi.post("/reports/stockOpening/list", {
      short_data: true, 
    });
    if (res.status === 200) {        
      const r = res.data;
      let allStock = [];
      r.map((r, i) => {
        //console.log("sank1008=>/",r)      
        allStock.push({
          Value:r.Value

         
        });
      });
      //console.log("sank1009",allStock)
      return onSuccess(allStock);
      
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
  };





// closing stock calculation//

export const getClosingStockQty= async (onSuccess, onFailure,) => {


  try {
    const res = await webApi.post("/reports/stockClosingQty/list", {
      short_data: true, 
    });
    if (res.status === 200) {        
      const r = res.data;
      let allStock = [];
      r.map((r, i) => {
        //console.log("sank1008",r)          
        allStock.push({
          sumClosingStockQty: r.sumClosingStockQty ? r.sumClosingStockQty :0 ,
         
        });
      });
      //console.log("sank1009",allStock)
      return onSuccess(allStock);
      
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
  };


  export const getAvgCost = async (onSuccess, onFailure) => {
    try {
      const res = await webApi.post("/reports/avg_Cost/list", { 
      });
      if (res.status === 200) {
        const r = res.data;
        //console.log("sank1006",r)

        let allStock = [];
        r.map((r, i) => {
          allStock.push({
            SumQuantity: r.SumQuantity,
            SumNetValue: r.SumNetValue,
            Avg_Cost: r.SumNetValue/r.SumQuantity,
          });
        });
       //console.log(allStock,"sank1004")
        return onSuccess(allStock);
        
      } else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    } catch (error) {
      onFailure("Something Wrong! Please Try again later " + error);
    }
    };


    /// similar itemopening stock value.

    export const getOpeningStockValue = async (onSuccess, onFailure, q) => {
      try {
        const res = await webApi.post("/reports/openingItem/list", {
          showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
        });
        if (res.status === 200) {
          const r = res.data;
          let allStock = [];
          r.map((r, i) => {
            console.log("sankopenoimdhh", r);
            allStock.push({
              itID: i + 1,
              item_id: r.item_id,
              itItem: r.item,
              itBrand:r.brand_name,
              itShowroom:r.showroom,
              itOpeningQty: r.Quantity ? r.Quantity :0,
              itOpeningRate: r.Rate ? r.Rate:0,
              OpeningValue: Number(r.Value) ? Number(r.Value).toFixed(2): 0,
              showroom_warehouse_id: r.showroom_warehouse_id,
            });
          });
          console.log("sank1009", allStock);
          return onSuccess(allStock);
        } else {
          onFailure("Something Wrong! Please Try again later " + res.data);
        }
      } catch (error) {
        onFailure("Something Wrong! Please Try again later " + error);
      }
    };



    // export const getClosingStock = async (onSuccess, onFailure, q) => {
    //   try {
    //     const res = await webApi.post("/reports/itemClosingStock/list", {
    //       showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
    //     });
    
    //     const resAvgValue = await webApi.post("/reports/ItemAvgValue/list", {});
    
    //     console.log(resAvgValue.data, "sankh/");
    
    //     if (res.status === 200 && resAvgValue.status === 200) {
    //       const r = res.data;
    //       const r1 = resAvgValue.data;
    //       console.log(r1, "sankh");
    //       let allStock = [];
    //       r.map((r, i) => {
    //         console.log(
    //           r1[0]?.SumQuantity,
    //           "sankvalu220042023",
    //           r1[0]?.SumNetValue
    //         );
    //         allStock.push({
    //           itID: i + 1,
    //           item_id: r.item_id,
    //           itBrand: r?.brand,
    //           itItem: r.item,
    //           itClosingQty: r.closingStock,
    //           // itClosingQty:r.itClosingQty,
    //           showroom_warehouse_id: r.showroom_warehouse_id,
    //           itShowroom: r?.showroom,
    //           qty: r1[0]?.SumQuantity,
    //           netvalue: r1[0]?.SumNetValue,
    //           itClosingRate: (
    //             r1[0]?.SumNetValue / r1[0]?.SumQuantity
    //           ).toFixed(2),
    //           itClosingValue: (
    //             (r1[0]?.SumNetValue / r1[0]?.SumQuantity) * r.closingStock
    //           ).toFixed(2),
    //           ClosingValue: 
    //             (r1[0]?.SumNetValue / r1[0]?.SumQuantity) * r.closingStock
    //           ,
    //         });
    //       });
    
    //       console.log("sank1009", allStock);
    //       return onSuccess(allStock);
    //     } else {
    //       onFailure("Something Wrong! Please Try again later ");
    //     }
    //   } catch (error) {
    //     onFailure("Something Wrong! Please Try again later " + error);
    //   }
    // };




    // export const getClosingStock = async (onSuccess, onFailure, q) => {
    //   try {
    //     const res = await webApi.post("/reports/stockClosingvalue/list", {
    //       showroom_warehouse_id: q?.ddl_showroom_warehouse?.value,
    //     });
    
    //     if (res.status === 200 ) {
    //       const r = res.data;
         
         
    //       let allStock = [];
    //       r.map((r, i) => {
          
    //         allStock.push({
             
             
    //           closingStock:r.closingStock,
    //           sumPurchaseQty:r.sumPurchaseQty,
    //           sumPurchase_Net_Value:r.sumPurchase_Net_Value
             
            
           
    //         });
    //       });
    
    //       console.log("sank1009", allStock);
    //       return onSuccess(allStock);
    //     } else {
    //       onFailure("Something Wrong! Please Try again later ");
    //     }
    //   } catch (error) {
    //     onFailure("Something Wrong! Please Try again later " + error);
    //   }
    // };

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