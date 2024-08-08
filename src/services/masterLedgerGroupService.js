
export const ledgerRowData = [
  {
    ledDate: "01/08/2021",
    ledVoucherNo: "",
    ledVoucherType: "",
    ledParticular: "Opening Balance",
    ledDebit: "",
    ledCredit: "400000",
  },
  {
    ledDate: "02/08/2021",
    ledVoucherNo: "MM/DR/21-22/0001",
    ledVoucherType: "Purchase",
    ledParticular: "Marbles",
    ledDebit: "",
    ledCredit: "300000",
  },
  {
    ledDate: "03/08/2021",
    ledVoucherNo: "MM/DR/21-22/0002",
    ledVoucherType: "",
    ledParticular: "GST",
    ledDebit: "",
    ledCredit: "18000",
  },
  {
    ledDate: "",
    ledVoucherNo: "",
    ledVoucherType: "",
    boldText: "boldText",
    ledParticular: "Closing Balance",
    ledDebit: "718000",
    ledCredit: "",
  },
  {
    ledDate: "",
    ledVoucherNo: "",
    ledVoucherType: "",
    ledParticular: "Total",
    boldText: "boldText",
    ledDebit: "718000",
    ledCredit: "718000",
  },
];

import webApi from "./webApi/webApi";
export const getAllTerm = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/category/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allTerms = [];
      r.map((r) => {
        allTerms.push({
          id: r.category_id,
          modules: "",
          terms: "",
          details: "",
          status: r.active_status,
          action_items: r.action_items,
          action: "action",
        });
      });
      return onSuccess(allTerms);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postCategory = async (cats, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/category/insert", {
      parent_category_id: cats.ddl_parent_category_id,
      category: cats.txt_Category,
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
      category_id: cats.category_id,
      category: cats.txt_Category,
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
