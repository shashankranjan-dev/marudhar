import webApi from "./webApi/webApi";

export const getAllBrand = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/brand/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allBrands = [];
      r.map((r, i) => {
        allBrands.push({
          brdid: i + 1,
          brand_id: r.brand_id,
          brdbrand: r.brand,
          brddetails: r.details,
          brdstatus: r.active_status,
          action_items: r.action_items,
          brdaction: "action",
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

export const postBrand = async (brand,inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/brand/insert", {
      brand: brand.txt_brand,
      details: brand.txt_details,
      inserted_by_id:inserted_by_id,
      active_status: brand.switch_status_btn ? "Y" : "N",
    });
    if (res.status === 200) {
      const r = res.data;
      onSuccess(r);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const updateBrand = async (brand, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/brand/update", {
      brand_id: brand.brand_id,
      brand: brand.txt_brand,
      details: brand.txt_details,
      active_status: brand.switch_status_btn ? "Y" : "N",
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

export const deleteBrand = async (brandId, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/brand/delete", {
      brand_id: brandId,
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
