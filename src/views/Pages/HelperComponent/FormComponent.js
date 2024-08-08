import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Check from "@mui/icons-material/Check";
import ReactSelect from "react-select";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import theme from "../../../theme/theme";
import Paper from "@material-ui/core/Paper";
import { CustomCard } from "views/Components/CustomCard";
import { appDefaultColor } from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import CustomButton from "views/Components/CustomButton";
import { whiteColor } from "assets/jss/material-dashboard-pro-react";
import CardLinkButton from "views/Components/CardLinkButton";
import { Divider, OutlinedInput } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { CircleAddBtn } from "views/Components/CustomButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { appFontWeight } from "assets/jss/material-dashboard-pro-react";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@mui/icons-material/Add";
import cls from "classnames";
import { Autocomplete } from "@material-ui/lab";
import { Grid } from "@material-ui/core";
import {
  appFontWeightBold,
  appSecondColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { appLabelFont } from "assets/jss/material-dashboard-pro-react";
import { appFontWeightThin } from "assets/jss/material-dashboard-pro-react";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import PageTitle from "./PageTitle";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { useHistory, useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  ...customCheckboxRadioSwitch,
  root: {
    overflow: "hidden",
  },
  addFormbtn: {
    width: 170,
  },
  customSelect: {
    marginBottom: 15,
  },
  addressCard: {
    overflow: "hidden",
    minHeight: 230,
    maxHeight: 230,
    width: 265,
    minWidth: 265,
    maxWidth: 265,
    position: "relative",
    padding: "15px",
  },
  ddlError: {
    textAlign: "right",
    color: "#f44336",
    fontSize: "12px",
    marginRight: 15,
    marginTop: -15,
    fontWeight: 400,
  },
  addAddressCard: {
    textAlign: "center",
    position: "relative",
    cursor: "pointer",
    width: "100%",
    minHeight: 230,
    maxHeight: 230,
    width: 265,
    minWidth: 265,
    maxWidth: 265,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: whiteColor[4],
  },
  container: {
    marginTop: 10,
  },
  addText: {
    fontWeight: appFontWeightThin,
    fontSize: "1.2rem",
    color: appSecondColor,
    marginBottom: 20,
    // position: "relative",
  },
  mobileText: {
    marginTop: 5,
  },
  borderRight: {
    "&:after": {
      content: "''",
      position: "absolute",
      left: 34,
      top: 3,
      height: "14px",
      width: 1.5,
      background: "#333",
      marginLeft: 2,
    },
  },
  actionbtns: {
    marginTop: 20,
    float: "right",
  },
  addIcon: {
    color: "#e3e3e3",
    height: 100,
    width: 100,
  },
  actionFooter: {
    paddingBottom: 10,
    // background: whiteColor,
    // position: "absolute",
    bottom: 0,
    marginBottom: -15,
    zIndex: 100,
  },

  actionbtn: {
    height: 40,
    width: "100px",
    color: whiteColor,
    borderColor: appDefaultColor,
    fontFamily: appDefaultFamily,
  },
  selectLabel: {
    fontSize: "12.6px",
    color: whiteColor[4],
  },
  checkbox: {
    fontSize: 20,
    fontWeight: appFontWeight,
  },
  addressCardfooter: {
    position: "absolute",
    bottom: 15,
    left: 15,
    display: "flex",
  },
  editText: {
    marginRight: 12,
    fontSize: 13,
    cursor: "pointer",
    color: appDefaultColor,
    fontWeight: appFontWeight,
    "&:hover": {
      textDecoration: "underline",
      color: "#C7511F",
    },
  },
}));

const FormCompnent = ({
  item,
  onSelect,
  onClickAdd,
  state,
  onChange,
  onMenuOpen = () => {},
  menuPortal = true,
  onSetActive,
  key,
  error = {},
}) => {
  const classes = useStyles();

  return (
    <GridItem xs={item.xs} md={item.md} lg={item.lg} key={key}>
      {item.html_element === "select" && (
        <>
          {menuPortal ? (
            <>
              <InputLabel required={item.required} id="label">
                {item.label}
              </InputLabel>
              <ReactSelect
              name={item.name}
                options={item.options}
                formatGroupLabel={(d) => d.label}
                menuPortalTarget={document.body}
                styles={reactSelectStyles}
                onMenuOpen={onMenuOpen}
                className={item.marginBottom !== 0 && classes.customSelect}
                onChange={(v) => { console.log(state, "stst"); return onSelect(item.name, v)}}
                value={{
                  value: state[item.name],
                  label: state[`${item.name}_label`],
                }}
              />
              {error[item.name] && (
                <div className={classes.ddlError}>{item.label} is Required</div>
              )}
            </>
          ) : (
            <>
            {item.otherLabel ? (
                          <InputLabel id="label">
                            <Grid container justify="space-between">
                              <Grid item>{item.label}</Grid>
                              <Grid item>{item.otherLabel}</Grid>
                            </Grid>
                          </InputLabel>
                        ) : (
                          <InputLabel required={item.required} id="label">{item.label}</InputLabel>
                        )}
      
              <ReactSelect
                options={item.options}
                formatGroupLabel={(d) => d.label}
                styles={reactSelectStyles}
                onMenuOpen={onMenuOpen}
                className={item.marginBottom !== 0 && classes.customSelect}
                onChange={(v) => onSelect(item.name, v)}
                value={{
                  value: state[item.name],
                  label: state[`${item.name}_label`],
                }}
                isDisabled={Object.keys(item).includes('disabled') ? item.disabled : false}
              />
              {error[item.name] && (
                <div className={classes.ddlError}>{item.label} is Required</div>
              )}
            </>
          )}
        </>
      )}
      {item.html_element === "select_two" && (
        <>
          <InputLabel required={item.required} id="label">
            {item.label} { console.log("st", state) }
          </InputLabel>
          <ReactSelect
            name={item.name}
            options={item.options}
            formatGroupLabel={(d) => d.label}
            menuPortalTarget={menuPortal && document.body}
            onMenuOpen={onMenuOpen}
            styles={reactSelectStyles}
            className={item.marginBottom !== 0 && classes.customSelect}
            onChange={(v, info) => onSelect(info.name, v)}
            value={{
              value: state[item.name],
              label: item.options.filter((o) => o.value === state[item.name]?.value)[0]?.label
            }}
            isDisabled={item.disable ? item.disable : false}
          />
          {error[item.name] && (
            <div className={classes.ddlError}>{item.label} is Required</div>
          )}
        </>
      )}
      {item.html_element === "select_multi" && (
        <>
          <InputLabel required={item.required} id="label">
            {item.label} { console.log("st", state) }
          </InputLabel>
          <ReactSelect
            name={item.name}
            options={item.options}
            formatGroupLabel={(d) => d.label}
            menuPortalTarget={menuPortal && document.body}
            onMenuOpen={onMenuOpen}
            styles={reactSelectStyles}
            className={item.marginBottom !== 0 && classes.customSelect}
            onChange={(v, info) => onSelect(info.name, v)}
            isMulti
            defaultValue={item.default_val}
            isDisabled={item.disable ? item.disable : false}
          />
          {error[item.name] && (
            <div className={classes.ddlError}>{item.label} is Required</div>
          )}
        </>
      )}
      {item.html_element === "TextField" && (
        <>
        <InputLabel required={item.required} id="label">{item.label}</InputLabel>
          <TextField
            size="small"
            disabled={item.disabled}
            required={item.required}
            placeholder={item.label}
            name={item.name}
            onChange={onChange}
            defaultValue={item.defaultValue}
            style={{
              marginTop: !item.label ? "12px" : "",
            }}
            type={item.data_type}
            inputProps={
              item.data_type === "date" ?
                {
                  style: { textAlign: item.align },
                  min: `${(localStorage.financial).split("-")[0]}-04-01`,
                  max: `${(localStorage.financial).split("-")[1]}-03-31`,
                }
                :
                {
                  style: { textAlign: item.align },
                  maxLength: item.maxLength,
                  max: item.maxLength,
                  min: item.minLength,
                }
            }
            error={error[item.name]}
            FormHelperTextProps={{
              style: { textAlign: "right" },
            }}
            helperText={error[item.name] ? item.label + " is Required" : ""}
            id="outlined-basic"
            fullWidth={true}
            value={state[item.name]}
            variant="outlined"
          />
        </>
      )}
      {item.html_element === "TextArea" && (
        <>
          <InputLabel id="label">{item.label}</InputLabel>
          <TextField
            placeholder={item.label}
            name={item.name}
            onChange={onChange}
            multiline
            rows={5}
            id="outlined-basic"
            error={error[item.name]}
            FormHelperTextProps={{
              style: { textAlign: "right" },
            }}
            helperText={error[item.name] ? item.label + " is Required" : ""}
            fullWidth={true}
            value={state[item.name]}
            variant="outlined"
          />
        </>
      )}
      {item.html_element === "addBtn" && (
        <>
          <div style={{ float: "right" }}>
            <CircleAddBtn size="medium" title="Add" onClick={onClickAdd} />
          </div>
        </>
      )}
      {item.html_element === "switch" && (
        <>
          <span className={classes.activeText}>{item.label}</span>
          <Switch
            onClick={onSetActive}
            checked={state[item.name]}
            name={item.name}
            fullWidth={true}
            inputProps={{
              "aria-label": "primary checkbox",
            }}
            color="primary"
          />
        </>
      )}
    </GridItem>
  );
};

export default FormCompnent;
