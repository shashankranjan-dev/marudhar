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

import Typography from "@material-ui/core/Typography";
import { appScrollBar } from "assets/jss/material-dashboard-pro-react";
import { ColoseButton } from "../../Components/CustomButton";
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

export const AddInfoCard = ({ onClickShow, title }) => {
  const classes = useStyles();
  return (
    <GridItem xs={12} md={6} lg={4} style={{ marginBottom: 20 }}>
      <Paper
        elevation={2}
        className={classes.addAddressCard}
        onClick={onClickShow}
      >
        <AddIcon className={classes.addIcon} />
        <div className={classes.addText}>{title}</div>
      </Paper>
    </GridItem>
  );
};

export const AddressCard = ({
  a,
  id,
  key,
  onClickEdit,
  onRemove,
  edit = true,
  remove = true,
  state = {},
  onSetAddres = () => {},
}) => {
  const classes = useStyles();

  return (
    <GridItem xs={12} md={6} key={key} lg={4} style={{ marginBottom: 20 }}>
      <Paper elevation={2} className={classes.addressCard}>
        {a.txt_name && (
          <Typography variant="h6" component="div">
            {a.txt_name}
          </Typography>
        )}

       {/* {a.txt_street && a.txt_villege_premeses && ( */}
       <Typography variant="subtitle1" component="div">
            {a.txt_street + ","}
            {/* {a.txt_villege_premeses + ","} */}
            {" "}{a.ddl_area_label + ","}

          </Typography>
      {/* )} */}

        <Typography variant="subtitle1" component="div">
          {+"," + a.txt_city && a.txt_city + ","}{" "}
          {+"," + a.ddl_state && a.ddl_state}
        </Typography>
        {a.txt_police_station && (
          <Typography variant="body2" component="div">
            Police Station : {a.txt_police_station}
          </Typography>
        )}

        {a.txt_email && (
          <Typography
            className={classes.mobileText}
            variant="body2"
            component="div"
          >
            Email : {a.txt_email}
          </Typography>
        )}
        {a.txt_mobile && (
          <Typography
            className={classes.mobileText}
            variant="body2"
            component="div"
          >
            Phone No : {a.txt_mobile}
          </Typography>
        )}
        {/* <Grid container spacing={2} style={{ marginTop: -10, marginBottom: 5 }}>
          <Grid item>
            <div className={classes.checkboxAndRadio}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={a.isBillAddress}
                    checked={a["isBillAddress"]}
                    onClick={(e) => onSetAddres(e, id, "isBillAddress")}
                    color="primary"
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked,
                      root: classes.checkRoot,
                    }}
                  />
                }
                classes={{
                  label: classes.label,
                  root: classes.labelRoot,
                }}
                label="Billing"
              />
            </div>
          </Grid>
          <Grid item>
            <div className={classes.checkboxAndRadio}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={`isShipppingAddress`}
                    checked={a["isShipppingAddress"]}
                    onClick={(e) => onSetAddres(e, id, "isShipppingAddress")}
                    color="primary"
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked,
                      root: classes.checkRoot,
                    }}
                  />
                }
                classes={{
                  label: classes.label,
                  root: classes.labelRoot,
                }}
                label="Shipping"
              />
            </div>
          </Grid>


          <Grid item>
            <div className={classes.checkboxAndRadio}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={`isCommunicationAddress`}
                    checked={a["isCommunicationAddress"]}
                    onClick={(e) => onSetAddres(e, id, "isCommunicationAddress")}
                    color="primary"
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked,
                      root: classes.checkRoot,
                    }}
                  />
                }
                classes={{
                  label: classes.label,
                  root: classes.labelRoot,
                }}
                label="Communication"
              />
            </div>
          </Grid>
        </Grid> */}

        <Grid>
        <div className={classes.addressCardfooter}>
          {edit && (
            <span
              onClick={() => onClickEdit(id)}
              className={cls(classes.editText, classes.borderRight)}
            >
              Edit
            </span>
          )}

          {remove && (
            <span
              style={{ marginLeft: 10 }}
              onClick={() => onRemove(id)}
              className={cls(classes.editText)}
            >
              Remove
            </span>
          )}
        </div>
        </Grid>
      </Paper>
    </GridItem>
  );
};

export const ViewBankCard = ({
  a,
  id,
  onClickEdit,
  onRemove,
  edit = true,
  remove = true,
}) => {
  const classes = useStyles();

  return (
    <GridItem xs={12} md={6} lg={4} style={{ marginBottom: 20 }}>
      <Paper elevation={2} className={classes.addressCard}>
        {a.txt_bank && (
          <Typography variant="h6" component="div">
            {a.txt_bank}
          </Typography>
        )}

        {a.txt_branch && (
          <Typography
            className={classes.mobileText}
            variant="body2"
            component="div"
          >
            Branch : {a.txt_branch}
          </Typography>
        )}
        {a.txt_account_no && (
          <Typography
            className={classes.mobileText}
            variant="body2"
            component="div"
          >
            Account No : {a.txt_account_no}
          </Typography>
        )}
        {a.txt_Ifsc_code && (
          <Typography
            className={classes.mobileText}
            variant="body2"
            component="div"
          >
            IFSC No : {a.txt_Ifsc_code}
          </Typography>
        )}
        <div className={classes.addressCardfooter}>
          {edit && (
            <span
              onClick={() => onClickEdit(id)}
              className={cls(classes.editText, classes.borderRight)}
            >
              Edit
            </span>
          )}

          {remove && (
            <span
              style={{ marginLeft: 10 }}
              onClick={() => onRemove(id)}
              className={cls(classes.editText)}
            >
              Remove
            </span>
          )}
        </div>
      </Paper>
    </GridItem>
  );
};

const viewCard = ({
  a,
  onClickEdit,
  onRemove,
  key,
  id,
  edit = true,
  remove = true,
}) => {
  const classes = useStyles();

  return (
    <div>
      <GridItem xs={12} md={6} lg={4} key={key} style={{ marginBottom: 20 }}>
        <Paper elevation={2} className={classes.addressCard}>
          {a.txt_name && (
            <Typography variant="h6" component="div">
              {a.txt_name}
            </Typography>
          )}
          {a.txt_designation && (
            <Typography variant="subtitle1" component="div">
              {a.txt_designation}
            </Typography>
          )}

          {a.txt_email && (
            <Typography
              className={classes.mobileText}
              variant="body2"
              component="div"
            >
              Email : {a.txt_email}
            </Typography>
          )}
          {a.txt_mobile && (
            <Typography
              className={classes.mobileText}
              variant="body2"
              component="div"
            >
              Phone No : {a.txt_mobile}
            </Typography>
          )}
          {a.txt_whatsapp && (
            <Typography
              className={classes.mobileText}
              variant="body2"
              component="div"
            >
              WhatsApp : {a.txt_whatsapp}
            </Typography>
          )}
          <div className={classes.addressCardfooter}>
            {edit && (
              <span
                onClick={() => onClickEdit(id)}
                className={cls(classes.editText, classes.borderRight)}
              >
                Edit
              </span>
            )}

            {remove && (
              <span
                style={{ marginLeft: 10 }}
                onClick={() => onRemove(id)}
                className={cls(classes.editText)}
              >
                Remove
              </span>
            )}
          </div>
        </Paper>
      </GridItem>
    </div>
  );
};

export default viewCard;
