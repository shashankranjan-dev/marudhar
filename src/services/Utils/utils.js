import moment from "moment";

export const timestamp = (date) => {
  return moment(date).unix();
};
