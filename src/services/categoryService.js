import webApi from "./webApi/webApi";

export const getAllCategory = async (onSuccess, onFailure) => {
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
          category_id: r.category_id,
          category: r.category,
          parentCategoryId: r.parent_category_id,
          parentCategoryName: r.parent_category_name,
          details: r.details,
          hsn: r.hsn,
          gst: r.gst,
          status: r.active_status,
          action_items: r.action_items,
          action: "action",
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

export const getAllParentCategory = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/category/list", {
      parent_category_id: 0,
      short_data: true,
    });
    if (res.status === 200) {
      const r = res.data;
      let allPaCats = [{ value: 0, label: "Select Parent Category" }];
      r.map((r) => {
        allPaCats.push({ value: r.category_id, label: r.category });
      });
      onSuccess(allPaCats);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const postCategory = async (cats,inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/category/insert", {
      parent_category_id: cats.ddl_parent_category_id
        ? cats.ddl_parent_category_id
        : 0,
      category: cats.txt_Category,
      inserted_by_id:inserted_by_id,
      hsn: cats.txt_hsn,
      gst: cats.txt_gst,
      details: cats.txt_details,
      active_status: cats.switch_active_btn ? "Y" : "N",
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

export const updateCategory = async (cats, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/category/update", {
      parent_category_id: cats.ddl_parent_category_id
        ? cats.ddl_parent_category_id
        : 0,
      category_id: cats.category_id,
      category: cats.txt_Category,
      hsn: cats.txt_hsn,
      gst: cats.txt_gst,
      details: cats.txt_details,
      active_status: cats.switch_active_btn ? "Y" : "N",
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
export const deleteCategory = async (categoryId, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/category/delete", {
      category_id: categoryId,
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
