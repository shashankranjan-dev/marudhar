import webApi from "./webApi/webApi";
import moment from "moment";

export const getTotalStats = async (
  onSuccess = () => null,
  onFailure = () => null
) => {
  try {
    const res = await webApi.post("/reports/dashboardStatsReport");
    if (res.status === 200) {
      // console.log(res,"res==>")
      let data = res.data.data;
      // console.log(data,"data==>")

      onSuccess && onSuccess(data);
      return data;
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (e) {
    onFailure("Something Wrong! Please Try again later " + e);
  }
};
export const getSalesStats = async(onSuccess,onFailure)=>{
  const weekFromDate = moment(moment(moment().startOf("week").format("YYYY-MM-DD")).format("x"), "x").unix()
  const weekToDate = moment(moment(moment().endOf("week").format("YYYY-MM-DD")).format("x"), "x").unix()

  const monthFromDate = moment(moment(moment().startOf("month").format("YYYY-MM-DD")).format("x"), "x").unix()
  const monthToDate = moment(moment(moment().endOf("month").format("YYYY-MM-DD")).format("x"), "x").unix()

  const quarterFromDate = moment(moment(moment().startOf("quarter").format("YYYY-MM-DD")).format("x"), "x").unix()
  const quarterToDate = moment(moment(moment().endOf("quarter").format("YYYY-MM-DD")).format("x"), "x").unix()

  const dayFromDate = moment(moment(moment().startOf("day").format("YYYY-MM-DD")).format("x"), "x").unix()
  const dayToDate = moment(moment(moment().endOf("day").format("YYYY-MM-DD")).format("x"), "x").unix()

  const yearFromDate = moment(moment(moment().quarter(-3).startOf("day").format("YYYY-MM-DD")).format("x"), "x").unix()
  const yearToDate = moment(moment(moment().endOf("day").format("YYYY-MM-DD")).format("x"), "x").unix()

  try {
    const res = await webApi.post("/reports/salesStat/list",{
      weekFromDate:weekFromDate,
      weekToDate:weekToDate,
      monthFromDate:monthFromDate,
      monthToDate:monthToDate,
      quarterFromDate:quarterFromDate,
      quarterToDate:quarterToDate,
      dayFromDate:dayFromDate,
      dayToDate:dayToDate,
      yearFromDate:yearFromDate,
      yearToDate:yearToDate
    })

    if(res.status===200){
      const r = res.data


      let data = []
      data.push({
        totalYear:r[0]?.totalYear?r[0]?.totalGrossYear:0,
        totalQuarter:r[1]?.totalQuarter?r[1]?.totalGrossQuarter:0,
        totalMonthly:r[2]?.totalMonthly?r[2]?.totalGrossMonthly:0,
        totalWeekly:r[3]?.totalWeekly?r[3]?.totalGrossWeekly:0,
        totalDay:r[4]?.totalDay?r[4]?.totalGrossDay:0,
      })
    // console.log("sen09022022",data)

    onSuccess(data[0])

    }
    
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
}
