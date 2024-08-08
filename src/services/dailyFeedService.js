

import webApi from "./webApi/webApi";
import { currentDate } from "../../src/views/Pages/HelperComponent/utils";
import {
  dateFormateField,
  dateFormate,
} from "../../src/views/Pages/HelperComponent/utils";
import {timestamp} from '../services/Utils/utils';

export const dailyFeedService= async (onSuccess, onFailure) => {
  let num =1
  // console.log('currentDate()', "chk5");
  try {
    const res = await webApi.post("/reports/viewRecentActivities/list", {
      inserted_by_date: currentDate(),
    });

    if (res.status === 200) {
      const r = res.data;
      let allCats = [];

      r.map((r, i) => {
        // {console.log("sen8989/r",r)}

        allCats.push({
          customer_name: r?.contact_person.length > 0? r?.contact_person[0]?.txt_name :r.company_name,
          company_name : r?.company_name,
          flag: r.flag,
          inserted_by:r.inserted_by,
        });
      });

      return onSuccess(allCats);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    // onFailure("Something Wrong! Please Try again later " + error);
  }
};