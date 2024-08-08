import { createTheme } from "@material-ui/core/styles";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { whiteColor } from "assets/jss/material-dashboard-pro-react";
import {
  appLabelFont,
  appDefaultColor,
} from "assets/jss/material-dashboard-pro-react";
import {
  appDefaultFamily,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import {
  appFontWeight,
  appFontWeightThin,
} from "assets/jss/material-dashboard-pro-react";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Helvetica", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#3699FF",
    },
    secondary: {
      main: "#3f4254",
    },
  },
});

theme.overrides = {
  MuiCssBaseline: {
    "@global": {
      "&$selected": {
        // this is to refer to the prop provided by M-UI
        backgroundColor: "transparent", // updated backgroundColor
      },
    },
  },

  MuiDialog: {
    paperWidthSm: {
      maxWidth: 1200,
    },
  },

  MuiTypography: {
    root: {
      fontFamily: appDefaultFamily,
    },
    body1: {
      fontSize: "13px",
      color: whiteColor,
      fontWeight: 300,
      fontFamily: appDefaultFamily,
    },
    body2: {
      fontSize: "12.6px",
      color: appSecondColor,
      fontWeight: appFontWeightThin,
      fontFamily: appDefaultFamily,
    },
    subtitle1: {
      fontSize: 13,
      fontWeight: 400,
      fontFamily: appDefaultFamily,
      lineHeight: "23px",
    },
    h4: {
      color: appSecondColor,
    },

    h6: {
      fontSize: "1.2rem",
      fontWeight: 400,
      fontFamily: appDefaultFamily,
    },
  },

  MuiAutocomplete: {
    option: {
      fontSize: "13px",
      fontWeight: 400,
    },
  },

  MuiOutlinedInput: {
    root: {
      backgroundColor: "#fff",
      fontWeight: 300,
      fontSize: "14px",
      marginBottom: 15,
    },
  },
  MuiInputBase: {
    root: {
      fontWeight: 300,
      fontSize: "14px",
      fontFamily: appDefaultFamily,
      backgroundColor: "#fff",
      "& input::placeholder": {
        fontSize: "12.6px",
      },
      "& input[type=number]": {
        "-moz-appearance": "textfield",
      },
      "& input[type=number]::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      "& input[type=number]::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
    },
  },
  MuiInput: {
    root: {
      fontSize: "14px",
      backgroundColor: "#fff",
      marginBottom: "15px",
    },
  },
  MuiFormHelperText: {
    root: {},
    marginDense: {
      marginTop: -15,
      fontSize: "12px",
    },
    contained: {
      marginLeft: 0,
    },
  },
  MuiFormLabel: {
    root: {
      fontFamily: appDefaultFamily,
      fontWeight: appFontWeight,
      fontSize: appLabelFont,
    },
  },
  MuiInputLabel: {
    root: {
      marginBottom: "10px",
      fontSize: appLabelFont,
      color: theme.palette.secondary.main,
      fontFamily: appDefaultFamily,
      fontWeight: appFontWeightThin,
    },
  },
  MuiSelect: {
    root: {
      fontSize: "14px",
      fontFamily: appDefaultFamily,
    },
  },
  MuiButton: {
    root: {
      textTransform: "none",
      borderRadius: "4px",
      fontSize: "14px",
      letterSpacing: "1.2",
      fontFamily: appDefaultFamily,
      "&$hover": {
        backgroundColor: "2290FF",
      },
    },
  },
};

theme.props = {};

export default theme;
