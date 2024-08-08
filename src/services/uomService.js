import webApi from "./webApi/webApi";

export const getAllUom = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/uom/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allUoms = [];
      r.map((r, i) => {
        allUoms.push({
          id: i + 1,
          uom_id: r.uom_id,
          higherUnit: r.higher_unit,
          higherValue: r.higher_unit_value,
          lowerUnit: r.lower_unit,
          lowerValue: r.lower_unit_value,
          caption: r.caption,
          lowerCaption:r.lower_caption,
          action_items: r.action_items,
          status: r.active_status,
          action: "action",
        });
      });
      return onSuccess(allUoms);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later" + error);
  }
};

export const postUOM = async (uom,inserted_by_id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/uom/insert", {
      higher_unit: uom.txt_higher_unit,
      higher_unit_value: Number(uom.txt_higher_value),
      lower_unit: uom.txt_lower_unit,
      lower_unit_value: Number(uom.txt_lower_value),
      caption: uom.txt_higher_caption,
      lower_caption:uom.txt_lower_caption,
      active_status: uom.switch_active_btn ? "Y" : "N",
      inserted_by_id:inserted_by_id,
    });
    if (res.status === 200) {
      const r = res.data;
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const updateUOM = async (uom, onSuccess, onFailure) => {
  //console.log(uom,"303012")
  try {
    const res = await webApi.post("/master/uom/update", {
      uom_id: uom.uom_id,
      higher_unit: uom.txt_higher_unit,
      higher_unit_value: Number(uom.txt_higher_value),
      lower_unit: uom.txt_lower_unit,
      lower_unit_value: uom.txt_lower_value,
      caption: uom.txt_higher_caption,
      lower_caption:uom.txt_lower_caption,
      active_status: uom.switch_active_btn ? "Y" : "N",
    });
    if (res.status === 200) {
      const r = res.data;
      //console.log(r,"303013")
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
export const deleteUOM = async (uomId, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/uom/delete", {
      uom_id: uomId,
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

export const getListUom = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/uom/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allUom = [];
      
      let allAltUom = [];
      r.map((r) => {
        allUom.push({
          value: r.uom_id,
          label: r.higher_unit,
          label_lu: r.lower_unit,
          higher_unit_value:r.higher_unit_value,
          lower_unit_value:r.lower_unit_value

        });
      });
      onSuccess(allUom,allAltUom);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
