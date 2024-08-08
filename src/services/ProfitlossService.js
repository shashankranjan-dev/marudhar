


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





// getAllLedgerByDirectExpGroup



export const getAllLedgerByPurchaseGroup = async (onSuccess, onFailure,q) => {

    //console.log(q,"")
  try {
    const res = await webApi.post("/master/trialbalance/list", {
      short_data: true,
      ledgerGroupId:60,
      // ledgerId:2737
      
    });
    if (res.status === 200) {

        
      const r = res.data;
      let allLedgerAccount = [];
      r.map((r, i) => {

        //console.log(r,"sank9022")
        allLedgerAccount.push({
        ledger_account_id: r.ledgerId,
        ledger_account: toTitleCase(r.ledgerName),
        ledger_group_id: r.ledgerGroupId,        
        opening_balance: r.openingBalance,
        closingBalance:Math.abs(r.closingBalance),
        dr_cr_status:r.closeCrDrStatus,
        closeCrDrStatus:r.closeCrDrStatus
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



export const getAllLedgerByDirectExpGroup= async (onSuccess, onFailure,q) => {

  //console.log(q,"")
try {
  const res = await webApi.post("/master/trialbalance/list", {
    short_data: true,
    ledgerGroupId:64,
    
    
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
        closingBalance:Math.abs(r.closingBalance),
        dr_cr_status:r.openCrDrStatus,
        closeCrDrStatus:r.closeCrDrStatus
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


export const getAllLedgerByIndirectExpGroup= async (onSuccess, onFailure,q) => {

  //console.log(q,"")
try {
  const res = await webApi.post("/master/trialbalance/list", {
    short_data: true,
     ledgerGroupId:63,
    
    
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
        dr_cr_status:r.openCrDrStatus,
        closeCrDrStatus:r.closeCrDrStatus
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

export const getAllLedgerBySalesGroup= async (onSuccess, onFailure,q) => {

  //console.log(q,"")
try {
  const res = await webApi.post("/master/trialbalance/list", {
    short_data: true,
    ledgerGroupId:59,
    ledgerId : 2530,
    
    
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
        closingBalance:Math.abs(r.closingBalance),
        dr_cr_status:r.openCrDrStatus,
        closeCrDrStatus:r.closeCrDrStatus
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



export const getAllLedgerByIncomeGroup= async (onSuccess, onFailure,q) => {

  //console.log(q,"")
try {
  const res = await webApi.post("/master/trialbalance/list", {
    short_data: true,
    ledgerGroupId:65,
    // ledgerId : 2879,
    
    
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
        closingBalance:Math.abs(r.closingBalance),
        dr_cr_status:r.openCrDrStatus,
        closeCrDrStatus:r.closeCrDrStatus
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





export const getAllClosingBalancePls = async (onSuccess, onFailure,addSearch, ledger_account_id) => {
   
    
    try {
      const res = await webApi.post("/master/ledger_account/balance", {
        from_date: timestamp(addSearch.txt_from_date),
        to_date: timestamp(addSearch.txt_to_date),
        ledger_account_id: ledger_account_id,
      });
  
      if (res.status === 200) {
        let r = res.data;
        let allItems = [];
        let inc = 0;
        //console.log("sank9220", res);
        
        if (r) {
          //console.log("sank922", r);
          let res = [{
            ...r[0], closing_balance: (r[0].closing_balance >= 0 ? r[0].closing_balance : -r[0].closing_balance),
            dr_cr_status: (r[0].closing_balance >= 0 ? r[0].dr_cr_status : (r[0].dr_cr_status === "Dr" ? "Cr" : "Dr")),
          }];
  
          return onSuccess(res);
          
          } 
          
          else {
            return onFailure("Journal Not Found");
          }
          
      }
       else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
      //console.log("sank9223", res);
    } catch (error) {
      onFailure("Something Wrong! Please Try again later" + error);
    }
  };



  ///Avg. Cost Reports Stock
  export const getClosingStockAvg= async (onSuccess, onFailure) => {
    try {
      const res = await webApi.post("/reports/closing_stock/list", { 
      });
      if (res.status === 200) {
        const r = res.data;
        //console.log("sank1006",r)

        let allStock = [];
        r.map((r, i) => {
          allStock.push({
            SumQuantity: r.SumQuantity,
            SumRate: r.SumRate,
            Avg_Cost: r.SumRate/r.SumQuantity,
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
  
  //// closing stock
  
  // export const getClosingStock= async (onSuccess, onFailure,) => {
  
    
  //   try {
  //     const res = await webApi.post("/reports/stockRegisterClosing/list", {
  //       short_data: true, 
  //     });
  //     if (res.status === 200) {        
  //       const r = res.data;
  //       let allStock = [];
  //       r.map((r, i) => {
  //         //console.log("sank1008",r)          
  //         allStock.push({
  //           sumClosingStock: r.sumClosingStock,
           
  //         });
  //       });
  //       //console.log("sank1009",allStock)
  //       return onSuccess(allStock);
        
  //     } else {
  //       onFailure("Something Wrong! Please Try again later " + res.data);
  //     }
  //   } catch (error) {
  //     onFailure("Something Wrong! Please Try again later " + error);
  //   }
  //   };


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


    // export const getClosingStock= async (onSuccess, onFailure,) => {
  
    
    //   try {
    //     const res = await webApi.post("/reports/stockOpening/list", {
    //       short_data: true, 
    //     });
    //     if (res.status === 200) {        
    //       const r = res.data;
    //       let allStock = [];
    //       r.map((r, i) => {
    //         //console.log("sank1008=>/",r)      
    //         allStock.push({
    //           Value:r.Value
  
             
    //         });
    //       });
    //       //console.log("sank1009",allStock)
    //       return onSuccess(allStock);
          
    //     } else {
    //       onFailure("Something Wrong! Please Try again later " + res.data);
    //     }
    //   } catch (error) {
    //     onFailure("Something Wrong! Please Try again later " + error);
    //   }
    //   };


      // export const getClosingStockRate = async (onSuccess, onFailure) => {
      //   try {
      //     const res = await webApi.post("/reports/avg_value/list", { 
      //     });
      //     if (res.status === 200) {
      //       const r = res.data;
      //       //console.log("sank1006",r)
    
      //       let allStock = [];
      //       r.map((r, i) => {
      //         allStock.push({
      //           SumQuantity: r.SumQuantity,
      //           SumNetValue: r.SumNetValue,
      //           Rate: r.SumNetValue/r.SumQuantity,
      //         });
      //       });
      //      //console.log(allStock,"sank1004")
      //       return onSuccess(allStock);
            
      //     } else {
      //       onFailure("Something Wrong! Please Try again later " + res.data);
      //     }
      //   } catch (error) {
      //     onFailure("Something Wrong! Please Try again later " + error);
      //   }
      //   };
 

    // closing stock calculation//


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
              sumClosingStockQty: r.sumClosingStockQty,
             
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

