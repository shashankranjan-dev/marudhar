import { appScrollBar } from "assets/jss/material-dashboard-pro-react";
import { appSecondColor } from "assets/jss/material-dashboard-pro-react";
import { appDefaultColor } from "assets/jss/material-dashboard-pro-react";
import { blackColor } from "assets/jss/material-dashboard-pro-react";
import {
  successColor,
  tooltip,
  cardTitle,
  grayColor,
  whiteColor,
} from "assets/jss/material-dashboard-pro-react.js";

const customBlue = "#3699ff";

import hoverCardStyle from "assets/jss/material-dashboard-pro-react/hoverCardStyle.js";

const dashboardStyle = (theme) => ({
  ...hoverCardStyle,
  tooltip,
  cardTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px",
  },
  headerCard: {
    // "@media print": {
    //   display: "block",
    // },
    // "@page": {
    //   size: "auto",
    // },
    marginTop: 10,
    marginBottom: 15,
    borderRadius: "4px",
    overflowX: "hidden",
  },
  headerCdhd: {
    position: "relative",
    margin: 0,
    height: "45px",
    backgroundColor: "rgba(43, 43, 43, 0.03)",
    borderBottom: "1px solid rgba(43, 43, 43, 0.125)",
  },
  cardAppLogo: {
    width: 35,
    height: 35,
    position: "absolute",
    left: 10,
    top: 5,
  },
  TbheaderCdhd: {
    margin: 0,
    height: "45px",
    backgroundColor: "rgba(43, 43, 43, 0.03)",
    borderBottom: "1px solid rgba(43, 43, 43, 0.125)",
  },
  dsHeaderCdhd: {
    margin: 0,
    height: "45px",
    backgroundColor: "rgba(43, 43, 43, 0.03)",
    borderBottom: "1px solid rgba(43, 43, 43, 0.125)",
  },
  headerCdTitle: {
    marginTop: 0,
    marginBottom: 0,
    fontWeight: 500,
    color: "#3f4254",
  },
  cardMenuIcon: {
    cursor: "pointer",
  },
  headerCard1: {
    height: "425px",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      height: "450px",
    },
  },
  headerCard1hd: {
    marginTop: "-20x",
    backgroundColor: "#3699ff",

  },
  headerCdTitle1: {
    color: "#fff",
    marginTop: 0,
    marginBottom: 0,
    fontWeight: 500,
  },
  feedBadge: {
    backgroundColor: "#3699ff",
    borderRadius: "20px",
  },
  headerCardBody: {
    ...appScrollBar,
    padding: "10px 10px",
    margin: "0",
    overflowY: "auto",
    overflowX: "hidden",
  },
  TbheaderCardBody: {
    ...appScrollBar,
    margin: "0",
    padding: 0,
    overflowY: "auto",
    overflowX: "hidden",
  },
  borderNone: {
    border: "none",
    fontFamily: "Poppins, Helvetica, sans-serif",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadMorebtn: {
    margin: "8px 20px 0 20px",
    width: "100%",
    backgroundColor: "#3699ff",
    fontSize: "12px",
    height: "35px",
    fontWeight: 600,
    color: grayColor[8],
    "&:hover": {
      backgroundColor: "#3699ff",
      color: whiteColor,
    },
    "&:active": {
      backgroundColor: "#3699ff",
    },
    "&:focus": {
      backgroundColor: "#3699ff",
    },
    "&:visited": {
      backgroundColor: "#3699ff",
    },
  },
  dailyFeedCard: {
    display: "flex",
    padding: "10px 0",
    marginBottom: "10px",
    borderBottom: "1px solid #dee2e6",
  },

  dailyFeedAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  feedCardItem3: {
    width: "100px",
  },
  hdCd1Body: {
    marginTop: "-60px",
  },
  bgWhite: {
    marginBottom: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  feedTitle: {
    lineHeight: "22px",
    marginTop: 0,
    fontSize: "14px",
    marginBottom: "10px",
    color: appSecondColor,
    "&:hover": {
      color: appDefaultColor,
    },
  },
  appointmentTitle: {
    lineHeight: "22px",
    marginTop: 0,
    fontSize: "14px",
    marginBottom: "4px",
  },

  hdcd1statCd: {
    padding: "10px 15px 5px",
    color: "#ffa800",
    backgroundColor: "rgba(255, 168, 0, 0.2)",
    fontWeight: "700",
  },

  cardStat: {
    [theme.breakpoints.down("sm")]: {
      fontWeight: "600",
      fontSize: "12px",
      width: 100,
      marginTop: 0,
    },
    fontWeight: "500",
    fontSize: "13px",
  },
  cardStatValue: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
    fontWeight: "700",
    fontSize: "13px",
  },

  hdcd2statCd: {
    padding: "10px 15px",
    color: "#8950fc",
    backgroundColor: "rgba(137, 80, 252, 0.2)",
  },
  hdcd3statCd: {
    padding: "5px 15px",
    color: "#f64e60",
    backgroundColor: "rgba(246, 78, 96, 0.2)",
  },
  hdcd4statCd: {
    padding: "5px 15px",
    color: "#1bc5bd",
    backgroundColor: "rgba(27, 197, 189, 0.2)",
  },

  hdCd1Icon: {
    color: "#ffa800",
  },
  hdCd2Icon: {
    color: "#8950fc",
  },
  hdCd3Icon: {
    color: "#f64e60",
  },
  hdCd4Icon: {
    color: "#1bc5bd",
  },
  feedCardItem: {
    padding: 0,
  },
  todoDesc: {
    fontSize: 14,
  },
  feedUserName: {
    marginRight: "5px",
    fontWeight: 500,
    fontSize: "14px",
  },
  statCards: {
    marginBottom: 35,
    marginTop: 10,
    display: "grid",
    gridTemplateColumns: "repeat(5 , 1fr)",
    gridGap: "0 20px",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(3 , 1fr)",
      marginBottom: 15,
    },

    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1 , 1fr)",
      marginBottom: 15,
    },
  },
  statCard: {
    [theme.breakpoints.down("md")]: {
      marginBottom: 20,
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 20,
    },
    marginBottom: 0,
    marginTop: 0,
    borderRadius: "4px",
    padding: "5px 0",
  },
  rupeeIcon: {
    marginRight: 15,
    [theme.breakpoints.down("sm")]: {
      marginRight: -15,
    },
  },
  statusLabel: {
    fontWeight: 400,
  },
  statValue: {
    fontFamily: "Poppins, Helvetica, sans-serif",
    marginTop: "8px",
    marginBottom: "5px",
    textAlign: "left",
    color: "#3f4254",
    fontWeight: "600",
    fontSize: "1.09375rem",
  },
  statLabel: {
    fontSize: "14px",
    color: "#3f4254",
    fontWeight: "500",
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
  cardProductTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px",
    textAlign: "center",
  },
  cardCategory: {
    color: grayColor[0],
    fontSize: "14px",
    paddingTop: "10px",
    marginBottom: "0",
    marginTop: "0",
    margin: "0",
  },
  cardProductDesciprion: {
    textAlign: "center",
    color: grayColor[0],
  },
  appointmentCard: {
    position: "relative",
    padding: "10px 5px",
    "&:before": {
      content: '""',
      position: "absolute",
      top: "10px",
      left: "8px",
      width: "1px",
      height: "100%",
      backgroundColor: grayColor[8],
    },
    "&:after": {
      content: '""',
      position: "absolute",
      left: "-2px",
      top: " 10px",
      border: "3px solid " + customBlue,
      borderRadius: "50%",
      width: "15px",
      height: "15px",
      backgroundColor: "#fff",
    },
  },
});

export default dashboardStyle;
