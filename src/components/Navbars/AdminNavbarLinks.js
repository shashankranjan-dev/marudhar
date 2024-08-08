import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import Popover from "@material-ui/core/Popover";

// @mui/icons-material
import Person from "@mui/icons-material/Person";
import Notifications from "@mui/icons-material/Notifications";
import Dashboard from "@mui/icons-material/Dashboard";
import Search from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import IconButton from "@material-ui/core/IconButton";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@material-ui/core/InputBase";
import { useHistory } from "react-router-dom";
import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";
import ChangePasswordPage from "../../views/Pages/ChangePasswordPage";
import { UserLogOut } from "../../services/AuthService";
import { useStateValue } from "../../context/context";
import { actionTypes } from "../../context/reducer";
import { decodeToken, useJwt, isExpired } from "react-jwt";

import { useCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const [globalState, dispatch] = useStateValue();
  const [cookies, setCookie, removeCookie] = useCookies(["localhost"]);
  // console.log(cookies,"cookies");
  const history = useHistory();
  const [openNotification, setOpenNotification] = React.useState(null);

  const [classicModal, setClassicModal] = React.useState(false);
  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const [openProfile, setOpenProfile] = React.useState(null);
  
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  
  


  const onLogOut = (props) => {
    UserLogOut(() => {
      // console.log("logged cookies",removeCookie)
      sessionStorage.removeItem("user_token")
      history.push("/");
      removeCookie("localhost");
      // const { cookies } = props;
      // cookies.remove('Token');
      // window.location.href = '/';
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    });
    setOpenProfile(null);
  };
  const changePassword = () => {
    history.push("/");
    setOpenProfile(null);
  };

  const classes = useStyles();
  const { rtlActive } = props;
  const searchButton =
    classes.top +
    " " +
    classes.searchButton +
    " " +
    classNames({
      [classes.searchRTL]: rtlActive,
    });
  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover, {
    [classes.dropdownItemRTL]: rtlActive,
  });
  const wrapper = classNames({
    [classes.wrapperRTL]: rtlActive,
  });
  const managerClasses = classNames({
    [classes.managerClasses]: true,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickChangePassword = () => {
    setClassicModal(true);
    setOpenProfile(null);
  };
  const onCloseModel = () => {
    setClassicModal(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  React.useEffect(() => {
    if (localStorage.getItem("user_token")) {
      const myDecodeToken = decodeToken(localStorage.getItem("user_token"));
      dispatch({ type: actionTypes.SET_USER, payload: myDecodeToken });
    }
    if(!localStorage.getItem("user_location")){
      onLogOut()
    }  // if not use remove it
  }, []);

  return (
    <div className={wrapper}>
      <Button
        color="transparent"
        simple
        aria-label="Dashboard"
        justIcon
        className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
        muiClasses={{
          label: rtlActive ? classes.labelRTL : "",
        }}
      >
        <MessageIcon
          className={
            classes.headerLinksSvg +
            " " +
            (rtlActive ? classes.links + " " + classes.linksRTL : classes.links)
          }
        />
        <Hidden mdUp implementation="css">
          <span className={classes.linkText}>
            {rtlActive ? "لوحة القيادة" : "Message"}
          </span>
        </Hidden>
      </Button>
      <div className={managerClasses}>
        <Button
          color="transparent"
          justIcon
          aria-label="Notifications"
          aria-owns={openNotification ? "notification-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : "",
          }}
        >
          <NotificationsOffIcon
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <span className={classes.notifications}>5</span>
          <Hidden mdUp implementation="css">
            <span
              onClick={handleClickNotification}
              className={classes.linkText}
            >
              {rtlActive ? "إعلام" : "Notification"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openNotification,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true,
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={dropdownItem}
                    >
                      {rtlActive
                        ? "إجلاء أوزار الأسيوي حين بل, كما"
                        : "Option 1"}
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={dropdownItem}
                    >
                      {rtlActive ? "شعار إعلان الأرضية قد ذلك" : "Option 2"}
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={dropdownItem}
                    >
                      {rtlActive ? "ثمّة الخاصّة و على. مع جيما" : "Option 3"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      {/* Search Bar */}
      {/* <Button
        color="transparent"
        simple
        aria-label="Dashboard"
        justIcon
        className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
        muiClasses={{
          label: rtlActive ? classes.labelRTL : "",
        }}
        className={searchButton}
        onClick={handleClick}
      >
        <SearchIcon
          className={classes.headerLinksSvg + " " + classes.searchIcon}
        />
        <Hidden mdUp implementation="css">
          <span className={classes.linkText}>
            {rtlActive ? "لوحة القيادة" : "Search"}
          </span>
        </Hidden>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>

        <InputBase
          className={classes.input}
          placeholder="Search "
          inputProps={{ "aria-label": "search google maps" }}
        />
      </Popover> */}

      <span className={classes.userName} onClick={handleClickProfile}>
        {globalState?.user?.user_name}
      </span>

      <div className={managerClasses}>
        <Button
          color="transparent"
          aria-label="Person"
          justIcon
          aria-owns={openProfile ? "profile-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : "",
          }}
        >
          <Avatar variant="rounded" src="#" className={classes.userAvatar} />
          <Hidden mdUp implementation="css">
            <span style={{ marginLeft: "16px" }}>
              <span onClick={handleClickProfile} className={classes.linkText}>
                {rtlActive ? "الملف الشخصي" : " Hi,John"}
              </span>
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openProfile,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true,
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الملف الشخصي" : "Profile"}
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الإعدادات" : "Settings"}
                    </MenuItem>
                    <MenuItem
                      onClick={onClickChangePassword}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الإعدادات" : "Change Password"}
                    </MenuItem>
                    <Divider light />
                    <MenuItem onClick={onLogOut} className={dropdownItem}>
                      {rtlActive ? "الخروج" : "Log out"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <ChangePasswordPage
        openModel={classicModal}
        onCloseModel={onCloseModel}
      />
    </div>
  );
}

HeaderLinks.propTypes = {
  rtlActive: PropTypes.bool,
};
