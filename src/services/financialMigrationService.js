import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
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

//main exports

export const migrateMasterGroup = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/masterGroup', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}

export const migrateSerialNo = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/serialNo', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}


export const migrateUsers = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/users', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}

export const migrateShowroom = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/showrooms', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}

export const migrateCatagory = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/catagory', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}

export const migrateBrand = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/brand', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}

export const migrateUom = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/uom', {
            fy: fy
        })
        //console.log(response,"errrrrrrrrrr")
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}

export const migrateBank = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/bank', {
            fy: fy
        })
        //console.log(response,"errrrrrrrrrr1")

        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}

export const migrateArea = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/area', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}

export const migrateRole = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/role', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}

export const migrateStatus = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/status', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}


//Account exports

export const migratePrimaryGroup = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/primaryGroup', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}

export const migrateLedgerGroup = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/ledgerGroup', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}

export const migrateLedgerAccount = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/ledgerAccount', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}

export const migrateCharges = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/charges', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}


//community export

export const migrateCustomer = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/customer', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}
export const migrateVendor = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/vendor', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}
export const migrateRefrence = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/refrence', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}
export const migrateVehicle = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/vehicle', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}


//...................End........................//////////
export const migrateItem = async (fy, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/item', {
            fy: fy
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}

export const getAllBrand = async (onSuccess, onFailure) => {
    try {
        const res = await webApi.post("/master/brand/list", {});
        if (res.status === 200) {
            const r = res.data;
            let allBrands = [];
            r.map((r, i) => {
                allBrands.push({

                    value: r.brand_id,
                    label: r.brand,
                });
            });
            return onSuccess(allBrands);
        } else {
            onFailure("Something Wrong! Please Try again later " + res.data);
        }
    } catch (error) {
        onFailure("Something Wrong! Please Try again later " + error);
    }
};

export const getListShowroomWarehouse = async (onSuccess, onFailure) => {
    try {
        const res = await webApi.post("/master/showrooms-warehouse/list", {});
        if (res.status === 200) {
            const r = res.data;
            let allShowroomWarehouse = [];
            r.map((r) => {
                allShowroomWarehouse.push({
                    value: r.showrooms_warehouse_id,
                    label: toTitleCase(r.showrooms_warehouse),
                    address: r.address,
                });
            });
            onSuccess(allShowroomWarehouse);
        } else {
            onFailure("Something Wrong! Please Try again later " + res.data);
        }
    } catch (error) {
        onFailure("Something Wrong! Please Try again later " + error);
    }
};

export const itemStockSearch = async (brandId, ShowroomId, onSuccess, onFailure) => {



    try {
        const res = await webApi.post("/reports/stockRegisterTransaction/list", {
            brand_id: brandId,
            showroom_warehouse_id: ShowroomId,
            date_from: timestamp(`${(localStorage.financial)?.split("-")[0]}-04-01`),
            date_to: timestamp(`${(localStorage.financial)?.split("-")[1]}-03-31`)
        });

        const resOpening = await webApi.post("/reports/stockRegisterOpening/list", {
            brand_id: brandId,
            txt_from_date: timestamp(`${(localStorage.financial)?.split("-")[0]}-04-01`),
            showroom_warehouse_id: ShowroomId

        });

        const res2 = resOpening.data
        let openingStock = [];
        let sum = 0;
        res2.map((a, b) => {
            //console.log(a, "sen2707")

            openingStock.push(
                {
                    stock: a?.stock_by_location[0]?.quantity ? a?.stock_by_location[0]?.quantity + a?.sumOpeningPlus - (a.sumTransfer ? a.sumTransfer : 0) + (a.sumReceived ? a.sumReceived : 0) : a?.sumOpeningPlus - (a.sumTransfer ? a.sumTransfer : 0) + (a.sumReceived ? a.sumReceived : 0)

                    // old
                    // stock:a?.stock_by_location[0]?.quantity + a?.sumOpeningPlus
                }
            )
        }
        )

        if (res.status === 200) {
            const rs = res.data;
            let allItems = [];
            let pdf = [];
            let inc = 0;
            let closing = 0;
            let Opening = 0;
            //console.log(openingStock.filter((a, b) => a.item_id === rs.item_id), "sen2807")

            rs.map((r, i) => {

                Opening = openingStock.filter((a, b) => a.item_id === rs.item_id)[i].stock;
                closing = Opening + ((r.sumPurchase ? r.sumPurchase : 0) + (r.sumSalesReturn ? r.sumSalesReturn : 0))
                    - (r.sumTransfer ? r.sumTransfer : 0) + (r.sumReceived ? r.sumReceived : 0) - ((r.sumSales ? r.sumSales : 0) + (r.sumPurchaseReturn ? r.sumPurchaseReturn : 0)) - (r.sumWaste ? r.sumWaste : 0) + (r.sumWasteConvertQty ? r.sumWasteConvertQty : 0)

                inc++;
                allItems.push({
                    item_id: r.item_id,
                    ShowroomId:ShowroomId,
                    stoID: inc,
                    stoItemDetails: r.item,
                    // stoUom: r.uom_name,
                    // stoWaste: r.sumWaste ? r.sumWaste : 0,
                    // stoWasteQty: r.sumWasteConvertQty ? r.sumWasteConvertQty : 0,
                    // stoOpening: r.sumOpeningPlus ? r.sumOpeningPlus :openingStock[0].stock,
                    // stoOpening:openingStock[0].stock,
                    // stoOpening: Opening,
                    // stoPurchaseReturn: r.sumPurchaseReturn ? r.sumPurchaseReturn : 0,
                    // stoSalesReturn: r.sumSalesReturn ? r.sumSalesReturn : 0,
                    // stoSales: r.sumSales ? r.sumSales : 0,
                    // stoPurchase: r.sumPurchase ? r.sumPurchase : 0,
                    // stoClosing: r.sumCloseingPlus ? r.sumCloseingPlus : 0,
                    stoClosing: closing,
                    // stoTransfer: r.sumTransfer ? r.sumTransfer : 0,
                    // stoReceived: r.sumReceived ? r.sumReceived : 0,
                    // stoAction: "view-action",/
                    // menu: [
                    //     {
                    //         clickBtn: true,
                    //         label: "View",
                    //         link: "",
                    //     }
                    // ],
                });
                pdf.push([
                    inc,
                    r.item,
                    r.uom_name,
                    Opening,
                    r.sumPurchase ? r.sumPurchase : 0,
                    r.sumPurchaseReturn ? r.sumPurchaseReturn : 0,
                    r.sumSales ? r.sumSales : 0,
                    r.sumSalesReturn ? r.sumSalesReturn : 0,
                    r.sumTransfer ? r.sumTransfer : 0,
                    r.sumReceived ? r.sumReceived : 0,

                    Opening + ((r.sumPurchase ? r.sumPurchase : 0) + (r.sumSalesReturn ? r.sumSalesReturn : 0))
                    - (r.sumTransfer ? r.sumTransfer : 0) + (r.sumReceived ? r.sumReceived : 0) - ((r.sumSales ? r.sumSales : 0) + (r.sumPurchaseReturn ? r.sumPurchaseReturn : 0))


                ])

            });
            if (allItems.length) {
                //console.log("Aida", allItems);
                return onSuccess(allItems.sort((a, b) => a.stoItemDetails > b.stoItemDetails ? 1 : -1), pdf);
            } else {
                return onFailure(" Not Found");
            }
        } else {
            onFailure("Something Wrong! Please Try again later " + res.data);
        }
    } catch (error) {
        onFailure("Something Wrong! Please Try again later " + error);
    }
};

export const migrateItemStock = async(fy, itemsStock, onSuccess, onFailure)=>{
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/itemStock', {
            fy: fy,
            itemsStock:itemsStock,
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}


export const migrateLedgerStorage = async(fy,onSuccess, onFailure) =>{
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/ledgerStorage', {
            fy: fy,
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}


export const migrateLedgerAccountUpdate = async(fy,onSuccess, onFailure) =>{
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/ledgerAccountUpdate', {
            fy: fy,
        })
        onSuccess(response.data)
    } catch (error) {
        onFailure(error)
    }
}

export const ledgerStorageInsert = async (onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/master/ledger_storage/insert', {
            // ledger_account_id: query
        })
        if (response.status === 200) {
            onSuccess(response.data)
        }
    } catch (error) {
        onFailure(error)
    }
}

export const ledgerStorageDrop= async (query, onSuccess, onFailure) => {
    try {
        const response = await webApi.post('/fyMigrate/financialYearDataMigration/ledgerStorage/drop', {
            fy:query
        })

        if (response.status === 200) {
            onSuccess(response.data)
        }
    } catch (error) {
        onFailure(error)
    }
}