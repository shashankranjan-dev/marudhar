import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import cls from "classnames";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { NavLink, useLocation } from "react-router-dom";
import StarBorder from "@mui/icons-material/StarBorder";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../../theme/theme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import sidebarStyle from "assets/jss/material-dashboard-pro-react/components/sidebarStyle.js";
import { Box, Grid } from "@material-ui/core";
import {
  appDefaultColor,
  whiteColor,
  miniDotColor,
} from "assets/jss/material-dashboard-pro-react";

const useStylesTwo = makeStyles(sidebarStyle);

const useStyles = makeStyles((theme) => ({
  customMenuList: {
    borderRadius: "4px",
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: "13px",
    width: "100%",
  },
  activeMenu: {
    backgroundColor: "rgba(200, 200, 200, 0.2)",
  },
  customMenu: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: "43px",
    borderRadius: "4px",
    fontSize: "12px",
    "&:hover": {
      backgroundColor: "rgba(200, 200, 200, 0.2)",
    },
  },
  ".MuiTypography-body1": {
    fontSize: ".9rem",
    fontFamily: appDefaultFamily,
  },
  ".MuiListItemText-root": {
    fontSize: 12,
  },
  collapseItemMini: {
    color: miniDotColor,
    marginRight: 10,
  },
  collapseItemMiniMain: {
    color: miniDotColor,
  },
  navLinkItem: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  nested: {
    paddingLeft: theme.spacing(8),
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 4,
    marginTop: 5,
    fontSize: "12px",
    color: whiteColor,
    // backgroundColor: appDefaultColor,
    "&:hover": {
      backgroundColor: appDefaultColor,
    },
  },
}));

export default function NestedList({ prop }) {
  const location = useLocation();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const activeLink = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  const activeMenu = (menuName) => {
    // console.log(
    //   menuName,
    //   location.pathname
    //     .split("/")
    //     .find((m, i) => m.toLocaleLowerCase() === menuName.toLocaleLowerCase())
    // );

    return location.pathname
      .split("/")
      .find((m, i) => m.toLowerCase() === menuName.toLowerCase())
      ? "activeMenu"
      : "";
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box px={2} mt={1}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.customMenuList}
        >
          <ListItem
            button
            onClick={handleClick}
            className={cls(classes.customMenu, activeMenu(prop.menuName))}
          >
            <span className={classes.collapseItemMiniMain}>
              {prop.mini ? prop.mini : <div></div>}
            </span>
            <ListItemText
              component="div"
              style={{ marginLeft: 10 }}
              primary={prop.menuName}
            />
            {open ? (
              <ArrowDropUpIcon fontSize="small" />
            ) : (
              <ArrowDropDownIcon fontSize="small" />
            )}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {prop.views.map((p, i) => (
                <ListItem button key={i} className={classes.nested}>
                  <NavLink
                    to={p.layout + p.path}
                    className={classes.navLinkItem}
                  >
                    <span className={classes.collapseItemMini}>
                      {prop.mini ? prop.mini : <div></div>}
                    </span>

                    <ListItemText
                      component="div"
                      className={classes.menuListItemTxt}
                      style={{ marginLeft: 0, fontSize: "12px" }}
                      primary={p.name}
                    />
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </Box>
    </ThemeProvider>
  );
}

// const createCustomLinkNew = ({ routes }) => {
//   const { color, rtlActive } = props;
//   const [miniActive, setMiniActive] = React.useState(true);
//   return routes.map((prop, key) => {
//     if (prop.redirect) {
//       return null;
//     }

//     if (prop.views.length) {
//       var st = {};
//       st[prop["state"]] = !state[prop.state];
//       // const navLinkClasses =
//       //   classes.itemLink +
//       //   " " +
//       //   cx({
//       //     [" " + classes.collapseActive]: getCollapseInitialState(prop.views),
//       //   });
//       const itemText =
//         classes.itemText +
//         " " +
//         cx({
//           [classes.itemTextMini]: props.miniActive && miniActive,
//           [classes.itemTextMiniRTL]:
//             rtlActive && props.miniActive && miniActive,
//           [classes.itemTextRTL]: rtlActive,
//         });
//       const collapseItemText =
//         classes.collapseItemText +
//         " " +
//         cx({
//           [classes.collapseItemTextMini]: props.miniActive && miniActive,
//           [classes.collapseItemTextMiniRTL]:
//             rtlActive && props.miniActive && miniActive,
//           [classes.collapseItemTextRTL]: rtlActive,
//         });
//       const itemIcon =
//         classes.itemIcon +
//         " " +
//         cx({
//           [classes.itemIconRTL]: rtlActive,
//         });
//       const caret =
//         classes.caret +
//         " " +
//         cx({
//           [classes.caretRTL]: rtlActive,
//         });
//       const collapseItemMini =
//         classes.collapseItemMini +
//         " " +
//         cx({
//           [classes.collapseItemMiniRTL]: rtlActive,
//         });
//       return (
//         <ListItem
//           key={key}
//           className={cx(
//             { [classes.item]: prop.icon !== undefined },
//             { [classes.collapseItem]: prop.icon === undefined }
//           )}
//         >
//           <NavLink
//             to={"#"}
//             // className={navLinkClasses}
//             onClick={(e) => {
//               e.preventDefault();
//               setState(st);
//             }}
//           >
//             {prop.icon !== undefined ? (
//               typeof prop.icon === "string" ? (
//                 <Icon className={itemIcon}>{prop.icon}</Icon>
//               ) : (
//                 <prop.icon className={itemIcon} />
//               )
//             ) : (
//               <span className={collapseItemMini}>
//                 {rtlActive ? prop.rtlMini : prop.mini}
//               </span>
//             )}
//             <ListItemText
//               primary={rtlActive ? prop.rtlName : prop.name}
//               secondary={
//                 <b
//                   className={
//                     caret + " " + (state[prop.state] ? classes.caretActive : "")
//                   }
//                 />
//               }
//               disableTypography={true}
//               className={cx(
//                 { [itemText]: prop.icon !== undefined },
//                 { [collapseItemText]: prop.icon === undefined }
//               )}
//             />
//           </NavLink>
//           <Collapse in={state[prop.state]} unmountOnExit>
//             <List className={classes.list + " " + classes.collapseList}>
//               {createLinks(prop.views)}
//             </List>
//           </Collapse>
//         </ListItem>
//       );
//     }
//     const innerNavLinkClasses =
//       classes.collapseItemLink +
//       " " +
//       cx({
//         [" " + classes[color]]: activeRoute(prop.layout + prop.path),
//       });
//     const collapseItemMini =
//       classes.collapseItemMini +
//       " " +
//       cx({
//         [classes.collapseItemMiniRTL]: rtlActive,
//       });
//     const navLinkClasses =
//       classes.itemLink +
//       " " +
//       cx({
//         [" " + classes[color]]: activeRoute(prop.layout + prop.path),
//       });
//     const itemText =
//       classes.itemText +
//       " " +
//       cx({
//         [classes.itemTextMini]: props.miniActive && miniActive,
//         [classes.itemTextMiniRTL]: rtlActive && props.miniActive && miniActive,
//         [classes.itemTextRTL]: rtlActive,
//       });
//     const collapseItemText =
//       classes.collapseItemText +
//       " " +
//       cx({
//         [classes.collapseItemTextMini]: props.miniActive && miniActive,
//         [classes.collapseItemTextMiniRTL]:
//           rtlActive && props.miniActive && miniActive,
//         [classes.collapseItemTextRTL]: rtlActive,
//       });
//     const itemIcon =
//       classes.itemIcon +
//       " " +
//       cx({
//         [classes.itemIconRTL]: rtlActive,
//       });

//     return (
//       <ListItem
//         key={key}
//         className={cx(
//           { [classes.item]: prop.icon !== undefined },
//           { [classes.collapseItem]: prop.icon === undefined }
//         )}
//       >
//         {prop.views?.length && <CustomNavMenuList prop={prop} />}

//         {prop.name && (
//           <NavLink
//             to={prop.layout + prop.path}
//             className={cx(
//               { [navLinkClasses]: prop.icon !== undefined },
//               { [innerNavLinkClasses]: prop.icon === undefined }
//             )}
//           >
//             {prop.icon !== undefined ? (
//               typeof prop.icon === "string" ? (
//                 <Icon className={itemIcon}>{prop.icon}</Icon>
//               ) : (
//                 <prop.icon className={itemIcon} />
//               )
//             ) : (
//               <span className={collapseItemMini}>
//                 {rtlActive ? prop.rtlMini : prop.mini}
//               </span>
//             )}

//             <ListItemText
//               primary={rtlActive ? prop.rtlName : prop.name}
//               disableTypography={true}
//               className={cx(
//                 { [itemText]: prop.icon !== undefined },
//                 { [collapseItemText]: prop.icon === undefined }
//               )}
//             />
//           </NavLink>
//         )}
//       </ListItem>
//     );
//   });
// };
