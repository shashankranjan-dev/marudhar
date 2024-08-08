import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import { currencyFormate } from "views/Pages/HelperComponent/utils";

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

export const getAllCategoryById = async (onSuccess, onFailure) => {
    try {
      const res = await webApi.post("/master/category/list", {});
      if (res.status === 200) {
        const r = res.data;
        // console.log(res.data);
        let allCats = [];
        r.map((r, i) => {
        // console.log(r.parent_category_name,"parent_category_name")
  
          allCats.push({
            id: i + 1,
            value: r.category_id,
            label: r.category,
           
          });
        });
        return onSuccess(allCats);
      } else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    } catch (error) {
      onFailure("Something Wrong! Please Try again later " + error);
    }
  };

export const getReportPurchaseCondensed = async (addSearch, onSuccess, onFailure) => {
    // console.log(addSearch, "addSearch")
    try {
        const res = await webApi.post('/reports/brandWiseCondensedPurchaseReport/list', {
            brand_id: addSearch.ddl_brand.value,
            fromDate: timestamp(addSearch.txt_from_date),
            toDate: timestamp(addSearch.txt_to_date),
        });
        if (res.status === 200) {
            const r = res.data
            let pdf = [];
            let allData = []
            r.map((r, i) => {
                allData.push({
                    ids: i + 1,
                    brand: r.brand,
                    uom: r.caption,
                    qty: Number((r.sumPurchase).toFixed(2)),
                    totalNetValue: Number((r.sumNet_value).toFixed(2)),
                    totalNetValue1: currencyFormate(r.sumNet_value),

                });
                pdf.push(
                    [i + 1,
                    r.brand,
                    r.uom,
                    r.sumPurchase.toFixed(2),
                    r.sumNet_value.toFixed(2),]
                )


            })

            onSuccess(allData,pdf)
        } else {
            onFailure("Something Wrong! Please Try again later " + res.data);
        }
    } catch (error) {
        onFailure("Something Wrong! Please Try again later " + error);

    }
}

export const getReportPurchaseDetailed = async (addSearch, onSuccess, onFailure) => {
    console.log(addSearch, "addSearch")
    try {
        const res = await webApi.post('/reports/brandWiseDetailsPurchaseTestReport/list', {
            brand_id: addSearch.ddl_brand.value,
            category_id:addSearch.ddl_Category.value,
            fromDate: timestamp(addSearch.txt_from_date),
            toDate: timestamp(addSearch.txt_to_date),

        });
        if (res.status === 200) {
            const r = res.data
            let pdf = [];

            let allData = []
            r.map((r, i) => {
            console.log(r,"sankh2520")

                allData.push({
                    ids: i + 1,
                    brand: r.brand,
                    // category:r.category[0],
                    item:r.item,
                    caption: r?.caption,
                    qty: Number((r.sumPurchase).toFixed(2)),
                    totalNetValue: Number((r.sumNet_value).toFixed(2)),
                    totalNetValue1: currencyFormate(r.sumNet_value),

                });
                pdf.push(
                    [i + 1,
                    r.brand,
                    r.uom,
                    r.sumPurchase.toFixed(2),
                    r.sumNet_value.toFixed(2),]
                )

            })
            console.log(allData,"sank147")
            onSuccess(allData,pdf)
        } else {
            onFailure("Something Wrong! Please Try again later " + res.data);
        }
    } catch (error) {
        onFailure("Something Wrong! Please Try again later " + error);

    }
}

export const getAllBrandReport = async (addSearch, onSuccess, onFailure) => {
    // console.log(addSearch, "addSearch20")
    try {
        const res = await webApi.post('/reports/allBrandWiseCondensedReport/list', {
            fromDate: timestamp(addSearch.txt_from_date),
            toDate: timestamp(addSearch.txt_to_date) + 86399,
        });
        // console.log(res, "addSearch20")
        if (res.status === 200) {
            const r = res.data

            let values = []
            let names = []
            let netAmount = []

            r.map((r, i) => {
                // values.push(Number((r.qty).toFixed(2)))
                names.push(r.brand[0] ? r.brand[0] : '-')
                netAmount.push(Number((r.grossAmount).toFixed(2)))
            })

            onSuccess(names, netAmount)
        } else {
            onFailure("Something Wrong! Please Try again later ");
        }
    } catch (error) {
        onFailure("Something Wrong! Please Try again later ");

    }
}

