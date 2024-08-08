import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import cx from "classnames";
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";
// material-ui icons
import Menu from "@mui/icons-material/Menu";

// core components
import AdminNavbarLinks from "./AdminNavbarLinks";
import Button from "components/CustomButtons/Button.js";
import MuiButton from "@material-ui/core/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useStateValue } from "../../context/context";
import { actionTypes } from "../../context/reducer";
import { decodeToken, useJwt, isExpired } from "react-jwt";
import { ListItemIcon, Grid, InputLabel } from "@material-ui/core";
import CheckIcon from "@mui/icons-material/Check";
import {
  appDefaultColor,
  appSecondColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";

// Services
import { getListShowroomWarehouse } from "../../services/showroomWarehouseService";
import stylesdropDown from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";

import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.js";

const useStyles = makeStyles(styles);
const useStylesDropdown = makeStyles(stylesdropDown);

export default function AdminNavbar(props) {
  const classes = useStyles();
  const classedropDown = useStylesDropdown();

  const [globalState, dispatch] = useStateValue();
  const [accessName, setAccesName] = React.useState("");
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [openNotification, setOpenNotification] = React.useState(null);

  const { color, rtlActive, brandText } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color,
  });
  const sidebarMinimize =
    classes.sidebarMinimize +
    " " +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive,
    });

  React.useEffect(() => {
    if (localStorage.getItem("user_location")) {
      const myDecodeToken = decodeToken(localStorage.getItem("user_token"));
      getListShowroomWarehouse(
        (r) => {
          let arr = [];
          r.map((s, i) => {
            if (
              myDecodeToken?.showroom_warehouse_id.find(
                (r, i) => Number(r) === Number(s.value)
              )
            ) {
              arr.push({
                value: s.value,
                label: s.label,
              });
            }
          });
          setAllShowroomWarehouse(arr);
          if (localStorage.getItem("user_location")) {
            setAccesName(
              r.find(
                (s, i) =>
                  Number(s.value) ===
                  Number(localStorage.getItem("user_location"))
              ).label
            );
          }
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
    }
  }, [globalState.refresh]);

  const dropdownItem = classNames(
    classedropDown.dropdownItem,
    classedropDown.primaryHover,
    {
      [classedropDown.dropdownItemRTL]: rtlActive,
    }
  );

  const handleClickNotification = (event) => {
    event.preventDefault();
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      const myDecodeToken = decodeToken(localStorage.getItem("user_token"));
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const onSelectShowroom = (showroom_id) => {
    localStorage.setItem("user_location", JSON.stringify(showroom_id));
    dispatch({
      type: actionTypes.SET_USER_LOCATION,
      payload: { showroom_warehouse_id: showroom_id, stock: "" },
    });
    dispatch({
      type: actionTypes.SET_REFRESH,
      payload: {},
    });
    setOpenNotification(null);
  };

  return (
    <AppBar position="fixed" className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <div className={sidebarMinimize} style={{ marginRight: 20 }}>
            {props.miniActive ? (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <MoreVertIcon className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <MenuOpenIcon className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Tooltip title="Enquiry">
            <MuiButton href="/admin/sales/enquiry" className={classes.navBarRtBtn}>
              Enquiry
            </MuiButton>
          </Tooltip>
          <Tooltip title="Invoices">
            <MuiButton href="/admin/sales/invoices" className={classes.navBarRtBtn}>
              Invoices
            </MuiButton>
          </Tooltip>
          <Tooltip title="Ledger">
            <MuiButton href="/admin/mis-reports/ledger" className={classes.navBarRtBtn}  >
              Ledger
            </MuiButton>
          </Tooltip>


          <InputLabel
            className={classes.navBarRtBtn}
            style=
            {{
              float: "right",
              color:"#004225",
              marginTop: "11px",

            }}
          >
            Financial Year : {localStorage.financial}
          </InputLabel>

          <MuiButton
            onClick={handleClickNotification}
            style={{ float: "right" }}
            href="#"
            className={classes.navBarRtBtn}

          >
            {accessName ? accessName : ""}
          </MuiButton>
        </div>

        <Popper
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classedropDown.popperClose]: !openNotification,
            [classedropDown.popperResponsive]: true,
            [classedropDown.popperNav]: true,
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classedropDown.dropdown}>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    {allShowroomWarehouse.map((showroom, i) => {
                      return (
                        <MenuItem
                          onClick={() => onSelectShowroom(showroom.value)}
                          className={dropdownItem}
                        >
                          <Grid container justifyContent="space-between">
                            <Grid item>{showroom.label}</Grid>
                            <Grid item>
                              {accessName === showroom.label && (
                                <ListItemIcon>
                                  <CheckIcon
                                    fontSize="small"
                                    style={{
                                      color: appDefaultColor,
                                      marginLeft: 40,
                                    }}
                                  />
                                </ListItemIcon>
                              )}
                            </Grid>
                          </Grid>
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        <Hidden smDown implementation="css">
          <AdminNavbarLinks rtlActive={rtlActive} />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

AdminNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  brandText: PropTypes.string,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func,
};
