import webApi from "./webApi/webApi";

export const salesmanWiseData = [
  {
    id: "1",
    item_details: {
      brand: "Marudhar",
      category: "Amazon white",
      item_own_code: "[MM12952]",
      itemName: "Glassy Marble",
      stock: "343",
      mrp: "15,000",
    },
    Salesman1: "100",
    Salesman2: "100",
    Salesman3: "100",
    Salesman4: "100",
  },
  {
    id: "2",
    item_details: {
      brand: "Marudhar",
      category: "Amazon white",
      item_own_code: "[MM12952]",
      itemName: "Glassy Marble",
      stock: "343",
      mrp: "15,000",
    },
    Salesman1: "100",
    Salesman2: "750",
    Salesman3: "100",
    Salesman4: "500",
  },
  {
    id: "3",
    item_details: {
      brand: "Marudhar",
      category: "Amazon white",
      item_own_code: "[MM12952]",
      itemName: "Glassy Marble",
      stock: "343",
      mrp: "15,000",
    },
    Salesman1: "900",
    Salesman2: "550",
    Salesman3: "100",
    Salesman4: "1000",
  },
];

export const getAllCategory = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/category/list", {
      short_data: true,
    });
    if (res.status === 200) {
      const r = res.data;

      let allPaCats = [];
      r.map((r) => {
        allPaCats.push({
          value: r.category_id,
          label: r.category,
        });
      });
      onSuccess(allPaCats);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllBrands = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/brand/list", {
      short_data: true,
    });
    if (res.status === 200) {
      const r = res.data;

      let allPaCats = [];
      r.map((r) => {
        allPaCats.push({
          value: r.brand_id,
          label: r.brand,
        });
      });
      onSuccess(allPaCats);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
