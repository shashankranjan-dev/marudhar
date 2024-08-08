import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { defaultFont } from "assets/jss/material-dashboard-pro-react";
import { grayColor } from "assets/jss/material-dashboard-pro-react.js";

import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";

const sweetAlertStyle = {
  cardTitle: {
    fontFamily: appDefaultFamily,
    marginTop: "0",
    marginBottom: "3px",
    color: grayColor[2],
    fontSize: "18px",
  },
  center: {
    fontFamily: appDefaultFamily,
    textAlign: "center",
  },
  right: {
    fontFamily: appDefaultFamily,
    textAlign: "right",
  },
  left: {
    fontFamily: appDefaultFamily,
    textAlign: "left",
  },
  ...buttonStyle,
};

export default sweetAlertStyle;
