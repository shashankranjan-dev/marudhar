import React from "react";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import PrivateRoute from "../PrivateRoutes";
import SnakebarMsg from "views/Pages/HelperComponent/SnakebarMsg";
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/context";

import SelectLocationPage from "views/Pages/SelectLocationPage";

// Loader
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { decodeToken, useJwt, isExpired } from "react-jwt";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";
import { getAllMenu } from "../services/menuService";

var ps;

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const [globalState, dispatch] = useStateValue();
  const { ...rest } = props;
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniActive, setMiniActive] = React.useState(false);
  const [image, setImage] = React.useState(
    require("assets/img/sidebar-2.jpg").default
  );
  const [color, setColor] = React.useState("blue");
  const [bgColor, setBgColor] = React.useState("black");
  // const [hasImage, setHasImage] = React.useState(true);
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [logo, setLogo] = React.useState(
    require("assets/img/logo-white.svg").default
  );
  // styles
  const classes = useStyles();
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1,
    });
  // ref for main panel div
  const mainPanel = React.createRef();

  const [allMenu, setAllMenu] = React.useState([]);

  const getAccessibleMenus = (menus) => {
    const allRoutes = routes;
    if(!menus) {
      return [];
    }

    let requiredRoutes = [];
    // console.log("all-menu", routes);
    
    menus.map((m,i) => {
      let ind_levels = m.split("-");
      // console.log("ment", allRoutes, "i : ", i);

      let rqm = allRoutes.filter(o => o.taskOn === ind_levels[0]);
      // console.log("rqm", rqm, "i : ", i);
    if(rqm.length) {
      if(!rqm[0].views) {
        requiredRoutes.push(rqm[0]);
      }

      else {
        let already_present = requiredRoutes.filter(o => o.taskOn === ind_levels[0]);
        // console.log("already present", already_present);
        let entry = {...rqm[0]};
        // console.log("entry :: ", i, " : ", entry);
        // console.log("ind_level_1", ind_levels[1]);
        let rqm1 = [];
        let rqm2 = [];

        if(typeof ind_levels[1] === "undefined")
          rqm1 = [];

        else {
          rqm1 = entry.views.filter(o => o.taskOn === ind_levels[1]);
          rqm2 = entry.views.filter(o => o.requiredFor?.indexOf(ind_levels[1]) > -1);
          // console.log("pentog", rqm1);
        }
            
        if(rqm1.length > 0) {
          entry.views = rqm1;
          // console.log("kcvb", entry);

          if(already_present.length === 0) {
            if(rqm2.length > 0) {
              entry.views.append(rqm2)
            }

            requiredRoutes.push(entry);
          }
            
          else {
            already_present[0].views.push(...rqm1);

            if(rqm2.length > 0 && !already_present[0].views.includes(rqm2[0])) {
              already_present[0].views.push(...rqm2);
            }
          }
            
        }
      }
    }
    });

    return requiredRoutes;
  };

  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  });

  // functions for changeing the states from components
  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleBgColorClick = (bgColor) => {
    switch (bgColor) {
      case "white":
        setLogo(require("assets/img/logo.svg").default);
        break;
      default:
        setLogo(require("assets/img/logo-white.svg").default);
        break;
    }
    setBgColor(bgColor);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <PrivateRoute
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  if (!localStorage.getItem("user_location")) {
    return (
      <div className={classes.wrapper} ref={mainPanel}>
        <SelectLocationPage />
      </div>
    );
  } else {
    return (
      <div className={classes.wrapper}>
        <Backdrop className={classes.backdrop} open={globalState.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {/* { console.log("lst", globalState) } */}
        <Sidebar
          routes={getAccessibleMenus(globalState?.user?.accessible_menus)}
            // routes={routes}
          logoText={"Maruadhar"}
          logo={logo}
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
          bgColor={bgColor}
          miniActive={miniActive}
          {...rest}
        />
        <div className={mainPanelClasses} ref={mainPanel}>
          <SnakebarMsg
            open={globalState.isOpenMsg.open}
            msg={globalState.isOpenMsg.msg}
            msgType={globalState.isOpenMsg.msgType}
          />
          <AdminNavbar
            sidebarMinimize={sidebarMinimize.bind(this)}
            miniActive={miniActive}
            brandText={getActiveRoute(routes)}
            handleDrawerToggle={handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}

          {getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>
                <Switch>
                  {getRoutes(getAccessibleMenus(globalState?.user?.accessible_menus))}.
                  {/* {console.log(globalState?.user?.accessible_menus,"888888")} */}
                   {/* {getRoutes(routes)} */}
                  {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
                </Switch>
              </div>
            </div>
          ) : (
            <div className={classes.map}>
              <Switch>
                {getRoutes(getAccessibleMenus(globalState?.user?.accessible_menus))}
                {/* {getRoutes(routes)} */}
                {/* <Redirect from="/admin" to="/admin/dashboard" />  */}
              </Switch>
            </div>
          )}
          {/* {getRoute() ? <Footer fluid /> : null} */}
          {/* <FixedPlugin
            handleImageClick={handleImageClick}
            handleColorClick={handleColorClick}
            handleBgColorClick={handleBgColorClick}
            color={color}
            bgColor={bgColor}
            bgImage={image}
            handleFixedClick={handleFixedClick}
            fixedClasses={fixedClasses}
            sidebarMinimize={sidebarMinimize.bind(this)}
            miniActive={miniActive}
          /> */}
        </div>
      </div>
    );
  }
}
