import { appDefaultColor } from "../material-dashboard-pro-react";

const buttonGroupStyle = {
  buttonGroup: {
    position: "relative",
    margin: "10px 1px",
    display: "inline-block",
    verticalAlign: "middle",
  },
  firstButton: {
    backgroundColor: "#3699ff",
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
    margin: "0",
    position: "relative",
    float: "left",
    "&:hover": {
      zIndex: "2",
    },
  },
  middleButton: {
    backgroundColor: appDefaultColor,
    borderRadius: "0",
    margin: "0",
    position: "relative",
    float: "left",
    "&:hover": {
      zIndex: "2",
    },
  },
  lastButton: {
    backgroundColor: appDefaultColor,
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    margin: "0",
    "&:hover": {
      zIndex: "2",
    },
  },
};

export default buttonGroupStyle;
