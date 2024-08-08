import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import clxs from "classnames";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

// @mui/icons-material
// import ContentCopy from "@mui/icons-material/ContentCopy";
import Store from "@mui/icons-material/Store";
// import InfoOutline from "@mui/icons-material/InfoOutline";
import Warning from "@mui/icons-material/Warning";
import DateRange from "@mui/icons-material/DateRange";
import LocalOffer from "@mui/icons-material/LocalOffer";
import Update from "@mui/icons-material/Update";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import AccessTime from "@mui/icons-material/AccessTime";
import Refresh from "@mui/icons-material/Refresh";
import Edit from "@mui/icons-material/Edit";
import Place from "@mui/icons-material/Place";
import ArtTrack from "@mui/icons-material/ArtTrack";
import Language from "@mui/icons-material/Language";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import TimelineIcon from "@mui/icons-material/Timeline";
import Avatar from "@material-ui/core/Avatar";
var Chartist = require("chartist");
// import Chartist from "chartist";

// icons
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RupeeIcon from "../../assets/Icons/rupeeIcon.svg";

// core components
import Badge from "../../components/Badge/Badge.js";
import MutedText from "../../components/Typography/Muted";
import { ThemeProvider, Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
  multipleBarsChart,
  pieChart,
} from "variables/charts";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import MuiTable from "../Components/MuITable";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import priceImage1 from "assets/img/card-2.jpeg";
import priceImage2 from "assets/img/card-3.jpeg";
import priceImage3 from "assets/img/card-1.jpeg";
import { Switch, TextField, Typography } from "@material-ui/core";
import { cardTitle } from "assets/jss/material-dashboard-pro-react";

import {
  CustomCard,
  AppointmentCard,
  DailyFeedCard,
  StatsCard,
} from "../Components/CustomCard";
import { DriveEtaRounded } from "@mui/icons-material";

import { dailyFeedService } from "../../services/dailyFeedService";
import { getAllTaskTodo, getAllUsers, postTodoTask } from "../../services/appointmentService";
import { getSalesStats,getTotalStats } from "../../services/totalStats";
import theme from "theme/theme.js";
import CustomButton from "views/Components/CustomButton.js";
import { useStateValue } from "../../context/context";

import CustomCalander from "../Calendar/Calendar";
import {
  currencyFormate,
  currencyFormateNew,
} from "../Pages/HelperComponent/utils";

//coustomer Details
import {
  getAllCustomers,
  deleteCustomer,
  getAllGroup,
} from "../../services/customerListService";
import PageTitle from "views/Pages/HelperComponent/PageTitle";
import MasterModel from "../Components/MasterModel";
import FormComponent from "views/Pages/HelperComponent/FormComponent";
import { currentDate, currentTime, dateFormateField } from "../Pages/HelperComponent/utils";
import { actionTypes } from "../../context/reducer";

// Apex Chart
import DonutCharts from "views/Charts/NewCharts";
import { getAllBrandReport } from "services/brandWiseReport";
import { useState } from "react";
import { red } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import moment from "moment";
import { salesmanChartReport } from "services/SalesmanItemwiseSalesReportService";

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;
const headerSalesChart = {
  /*data: {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    series: [[38, 12, 17, 7, 17, 23, 18]],
  },*/
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 10,
    }),
    axisX: {
      showLabel: false,
      showGrid: false,
    },
    axisY: {
      showLabel: false,
      showGrid: false,
    },
    showPoint: false,
    low: 0,
    high: 99999999, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  // for animation
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// const headerData = [
//   { id: "id", label: "#", minWidth: 170 },
//   { id: "category", label: "Category", minWidth: 100 },
//   {
//     id: "parent",
//     label: "Parent",
//     minWidth: 170,
//     align: "left",
//   },
//   {
//     id: "description",
//     label: "Description",
//     minWidth: 170,
//     align: "left",
//   },
//   {
//     id: "status",
//     label: "Status",
//     minWidth: 170,
//     align: "left",
//   },
//   {
//     id: "action",
//     label: "Action",
//     minWidth: 170,
//     align: "left",
//   },
// ];

const useStyles = makeStyles(styles);

const feedPerPage = 3;
let arrayForHoldingFeeds = [];
export default function Dashboard() {
  const [loadingChart, setLoadingChart] = React.useState(false);
  const [chartMsg, setChartMsg] = React.useState('');

  const [dailyFeed, setDailyFeed] = React.useState([]);
  const [appointment, setAppointment] = React.useState([]);
  const [totalStat, setTotalStat] = React.useState(null);
  // const [value, onChange] = React.useState(new Date());
  const [globalState, dispatch] = useStateValue();
  const [feedToShow, setFeedsToShow] = React.useState([]);
  const [next, setNext] = React.useState(3);
  const user_id = globalState?.user?.serial_id;
  const messagesEndRef = React.useRef(null);
  const [classicModal, setClassicModal] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [donutChartValues, setDonutChartValues] = useState([])
  const [donutChartNames, setDonutChartNames] = useState([])
  const [selectedValue, setSelectedValue] = useState('BrandSales')
  const [selectedAmount, setSelectedAmount] = useState([])
  const [chartTime, setChartTime] = useState('Yearly')
  const [salesStats,setSalesStats] = useState([])
  const [updateTask, setUpdateTask] = React.useState({
    edit: false,
    task_todo_id: "",
    // sales_id: location.state?.sales_id,
    // purchase_id: location.state?.purchase_id,
    isView: true,
    isUpdateTask: false,
    module: "Direct Task",
    txt_subject: '',
    txt_details: "",
    ddl_status: "",
    ddl_users: [globalState.user?.serial_id],
    ddl_users_label: "Select",
    txt_status_note: "",
    isUpdateStatus: false,
    txt_update_task_date: currentDate(),
    txt_update_task_time: currentTime(),
  });
  const formData = {
    formName: "Add To Do",
    fields: [
      {
        name: "txt_subject",
        label: "Subject",
        hidden: false,
        required: true,
        align: "left",
        data_type: "string",
        html_element: "TextField",
        error: false,
        xs: 12,
        md: 12,
        lg: 12,
      },
      {
        name: "txt_details",
        label: "Details",
        hidden: false,
        required: true,
        align: "left",
        data_type: "string",
        html_element: "TextArea",
        error: false,
        xs: 12,
        md: 12,
        lg: 12,
      },
      {
        name: "txt_update_task_date",
        label: "Select Date",
        hidden: false,
        required: false,
        align: "left",
        data_type: "date",
        html_element: "TextField",
        error: false,
        xs: 12,
        md: 4,
        lg: 6,
      },
      {
        name: "txt_update_task_time",
        label: "Select Time",
        hidden: false,
        required: false,
        align: "left",
        data_type: "time",
        html_element: "TextField",
        error: false,
        xs: 12,
        md: 4,
        lg: 6,
      },
      {
        name: "ddl_users",
        label: "Select Collaborators",
        hidden: false,
        required: false,
        align: "left",
        data_type: "string",
        html_element: "select_multi",
        error: false,
        options: users,
        default_val: users.filter(o => o.value === globalState.user?.serial_id),
        xs: 12,
        md: 4,
        lg: 12,
      },
    ],
  };
  // const [user_id,setUserId]= React.useState([]);


  // let user_id = globalState?.user;
  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };
  const loopWithSlice = (start, end) => {
    // const slicedFeeds = dailyFeedService.slice(start, end);
    // arrayForHoldingFeeds = [...arrayForHoldingFeeds, ...slicedFeeds];

    dailyFeedService((r) => {
      // //console.log(r, "sen8989")
      setFeedsToShow(r);

    });


    // getAllCustomers(
    //   (customers) => {
    //     //console.log(customers,"check")})
    // getAllCustomers((r)=>{
    //   //console.log(r,"a");
    // //   setFeedsToShow(r)
    // })
  };

  const handleShowMoreFeeds = () => {
    loopWithSlice(next, next + feedPerPage);
    setNext(next + feedPerPage);
    //scrollToBottom();
  };

  const fetchData = async () => {
    // setAppointment(getAllTaskTodo);
    // //console.log("in fetchData");
    getTotalStats(setTotalStat);
    loopWithSlice(0, feedPerPage);
  };

  const onClickChartTime = (e) => {
    // //console.log(e.target.innerText, "sen21012023")
    setChartTime(e.target.innerText)
  }

  const onClickRefresh = () => {
    let financialYears = (localStorage.financial).split("-")
    let fromDate = 0;
    let toDate = 0;
    setLoadingChart(true)




    if (chartTime === "Yearly") {
      //console.log(moment().year(financialYears[0]).format("YYYY-04-01"), "sen21012023/year")
      //console.log(moment().year(financialYears[1]).format("YYYY-MM-DD"), "sen21012023/year")

      fromDate = moment().year(financialYears[0]).format("YYYY-04-01")
      toDate = moment().year(financialYears[1]).format("YYYY-MM-DD")
    }
    if (chartTime === "Daily") {
      //console.log(moment().startOf("Day").format("YYYY-MM-DD"), "sen21012023/Day")
      //console.log(moment().endOf("Day").format("YYYY-MM-DD"), "sen21012023/Day")

      fromDate = moment().startOf("Day").format("YYYY-MM-DD")
      toDate = moment().endOf("Day").format("YYYY-MM-DD")
    }
    if (chartTime === "Weekly") {
      //console.log(moment().startOf("week").format("YYYY-MM-DD"), "sen21012023/Day")
      //console.log(moment().endOf("week").format("YYYY-MM-DD"), "sen21012023/Day")

      fromDate = moment().startOf("Week").format("YYYY-MM-DD")
      toDate = moment().endOf("Week").format("YYYY-MM-DD")
    }

    selectedValue === "BrandSales"?
    getAllBrandReport(
      {
        "txt_from_date": fromDate,
        "txt_to_date": toDate
      },
      (names, netAmount) => {
        setLoadingChart(false)
        // if (netAmount.length>0 && names.length>0) {
          //console.log(netAmount, "sen21012023/al", names)

          // setDonutChartValues(values)
          setDonutChartNames(names)
          setSelectedAmount(netAmount)
          // setLoadingChart(false)
          // setChartMsg('')
        // } else {
        //   //console.log(err, "addSearch20 reched here err")
        //   setChartMsg('⏳ Data Not Found!!!')
        // }
      },
      (err) => {
        //console.log(err, "addSearch20 reched here err")
        setLoadingChart(false)
        setChartMsg('Data Not Found!!!')

      }
    )
    
    :
    salesmanChartReport(
      {
        "txt_from_date": fromDate,
        "txt_to_date": toDate
      },
      (names,netAmount)=>{
        if (names.length>0 && netAmount.length>0) {
          setDonutChartNames(names)
          setSelectedAmount(netAmount)
          setLoadingChart(false)
          setChartMsg('')
        } else {
          //console.log(err, "addSearch20 reched here err")
          setChartMsg('⏳ Data Not Found!!!')
        }
     
      },
      (err)=>{
        setLoadingChart(false)
        setChartMsg('Data Not Found!!!')

      }
    )
  }


  const handleRadioChange = (event) => {
    //console.log(event.target, "sen21012023")
    setSelectedValue(event.target.value);

  }

  React.useEffect(() => {
    //scrollToBottom();
  }, [feedToShow]);

  React.useEffect(() => {

    // setLoading(true);
    // getAllCustomers((r)=>{
    //console.log(user_id, "sen/11");
    //console.log(globalState, "sen/12");
    // })
    getAllTaskTodo(
      user_id,
      (r) => {
        //console.log("all task", r);
        setAppointment(r);
        // setLoading(false);
      },
      (err) => {
        // setLoading(false);

        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    getAllUsers((r) => {
      setUsers(r)
    })
    fetchData();
    //console.log(feedToShow, "abc");

    getSalesStats(
      (r)=>{
        setSalesStats(r)},
      (err)=>console.log("Stat Error =>>" + err))

  }, [globalState?.user]);

  React.useEffect(() => {
    onClickRefresh();
  }, [chartTime,selectedValue])

  const onCloseModel = () => {
    setClassicModal(false);
  };

  const onSelectDetails = (name, value) => {
    //console.log(name, value, "sen1205")
    setUpdateTask({ ...updateTask, [name]: value })
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setUpdateTask({ ...updateTask, [name]: value });
    //console.log(name, value, "sen12051")
  }
  const onSubmitModel = (event) => {
    event.preventDefault();
    //console.log(updateTask, "sen1205/update")

    postTodoTask(
      updateTask, user_id,
      (r) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: "Task Submitted Successfully",
            msgType: "success",
          },
        });
        setClassicModal(false);
        setUpdateTask([])
        // setError({});
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  }


  const classes = useStyles();
  let graphData = (totalStat?.weeklyDayByDayResults || []).map(
    (weekdayResult) => weekdayResult.data
  );
  return (
    <ThemeProvider theme={theme}>
      <div>
        {totalStat !== null && (
          <div className={classes.statCards} >
            <StatsCard
              visible={totalStat?.saleToday?.visible}
              icon={
                <ShoppingCartRoundedIcon
                  fontSize="large"
                  style={{ color: "#3699ff" }}
                />
              }
              value={currencyFormate(totalStat?.saleToday?.data || 0)}
              label="Sales Today"
            />
            <StatsCard
              icon={
                <ShowChartRoundedIcon
                  style={{ color: "#ffa800" }}
                  fontSize="large"
                />
              }
              value={(totalStat?.visitorsToday?.data || 0)}
              label="Visitors Today"
            />

            <StatsCard
              icon={
                <AddShoppingCartRoundedIcon
                  style={{ color: "#8950fc" }}
                  fontSize="large"
                />
              }
              value={(totalStat?.pendingOrders?.data || 0)}
              label="Pending Orders"
            />
            <StatsCard
              icon={
                <img
                  src={RupeeIcon}
                  className={classes.rupeeIcon}
                  alt="Rupee Icon"
                />
              }
              value={currencyFormate(totalStat?.totalCollectionCash?.data || 0)}
              label="Total Collection Cash"
            />
            {/* {console.log(totalStat, "totalStat==>")} */}
            <StatsCard
              icon={
                <img
                  src={RupeeIcon}
                  className={classes.rupeeIcon}
                  alt="Rupee Icon"
                />
              }
              value={currencyFormate(totalStat?.totalCollectionBank?.data || 0)}
              label="Total Collection Bank"
            />
          </div>
        )}



        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={4}>
            <CustomCard cdTitle="Today's Activities" todayLabel height="380px">
              {/* {//console.log("ddd", feedToShow)} */}
              {feedToShow.map((d, i) => (

                <DailyFeedCard
                  key={i}
                  id={i}
                  style={{ width: '50%' }}

                  //avatarUrl={d.company_name}
                  avatarName={` ${d.flag === 1 ? 'Customer' : 'Vendor'} added :  ${d.customer_name}`}

                  avatar={` ${d.flag === 1 ? '' : ''} by :  ${d.inserted_by}`}


                  ///date={`Today ${d.date}`}
                  whenText={`${d.time} to ago`}
                //  statusLabel={d.status}
                />

              ))}
              {/* <div className={classes.center}>
                <CustomButton
                  height={40}
                  style={{ margin: "5px 10px" }}
                  // onClick={handleShowMoreFeeds}
                  className={classes.loadMorebtn}
                >
                  Load More
                </CustomButton>
              </div> */}
              <div ref={messagesEndRef} />
            </CustomCard>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={4}>
            <Card className={clxs(classes.headerCard1, classes.headerCard)}>
              <CardHeader className={classes.headerCard1hd} style={{ height: "200px" }}>
                <GridContainer justify="space-between" alignItems="center">
                  <GridItem>
                    <h5 className={classes.headerCdTitle1}>Sales Stat</h5>
                  </GridItem>
                  <GridItem>
                    <div>
                      {/* <IconButton>
                        <MoreHorizIcon style={{ color: "#fff" }} />
                      </IconButton> */}
                    </div>
                  </GridItem>
                </GridContainer>
                <div className="">
                  {/* <ChartistGraph
                    className="ct-chart-white-colors"
                    data={{
                      labels: ["S", "M", "T", "W", "T", "F", "S"],
                      series: [graphData],
                    }}
                    type="Line"
                    options={headerSalesChart.options}
                    listener={headerSalesChart.animation}
                  /> */}
                </div>
              </CardHeader>
              <CardBody style={{ zIndex: 10 }}>
                <div className={classes.hdCd1Body}>
                  <GridContainer justify="center" alignItems="center">
                    <GridItem xs="6">
                      <div className={classes.bgWhite}>
                        <div className={classes.hdcd1statCd}>
                          <GridContainer justifyContent="space-between">
                            <GridItem xs={12} md={3} lg={3}>
                              <TimelineIcon
                                className={classes.hdCd1Icon}
                                fontSize="large"
                              />
                            </GridItem>
                            <GridItem xs={12} md={12} lg={12}>
                              <h2 className={classes.cardStatValue}>
                                {currencyFormate(
                                  // totalStat?.saleWeekly?.data || 0
                                  salesStats?.totalWeekly || 0
                                )}
                              </h2>
                            </GridItem>
                            <GridItem xs={12} md={12} lg={12}>
                              <h4 className={classes.cardStat}>Weekly Sales</h4>
                            </GridItem>
                          </GridContainer>
                        </div>
                      </div>
                    </GridItem>
                    <GridItem xs="6">
                      <div className={classes.bgWhite}>
                        <div className={classes.hdcd2statCd}>
                          <GridContainer justifyContent="space-between">
                            <GridItem xs={12} md={3} lg={3}>
                              <TimelineIcon
                                className={classes.hdCd2Icon}
                                fontSize="large"
                              />
                            </GridItem>
                            <GridItem xs={12} md={12} lg={12}>
                              <h4 className={classes.cardStatValue}>
                                {currencyFormate(
                                  // totalStat?.saleMonthly?.data || 0
                                  salesStats?.totalMonthly || 0
                                )}
                              </h4>
                            </GridItem>
                            <GridItem xs={12} md={12} lg={12}>
                              <h4 className={classes.cardStat}>
                                Monthly Sales
                              </h4>
                            </GridItem>
                          </GridContainer>
                        </div>
                      </div>
                    </GridItem>
                    <GridItem xs="6">
                      <div className={classes.bgWhite}>
                        <div className={classes.hdcd3statCd}>
                          <GridContainer justifyContent="space-between">
                            <GridItem xs={12} md={3} lg={3}>
                              <TimelineIcon
                                className={classes.hdCd3Icon}
                                fontSize="large"
                              />
                            </GridItem>
                            <GridItem xs={12} md={12} lg={12}>
                              <h4 className={classes.cardStatValue}>
                                {currencyFormate(
                                  // totalStat?.saleQuarterly?.data || 0
                                  salesStats?.totalQuarter || 0
                                )}
                              </h4>
                            </GridItem>
                            <GridItem xs={12} md={12} lg={12}>
                              <h4 className={classes.cardStat}>
                                Quarterly Sales
                              </h4>
                            </GridItem>
                          </GridContainer>
                        </div>
                      </div>
                    </GridItem>
                    <GridItem xs="6">
                      <div className={classes.bgWhite}>
                        <div className={classes.hdcd4statCd}>
                          <GridContainer justifyContent="space-between">
                            <GridItem xs={12} md={3} lg={3}>
                              <TimelineIcon
                                className={classes.hdCd4Icon}
                                fontSize="large"
                              />
                            </GridItem>
                            <GridItem xs={12} md={12} lg={12}>
                              <h4 className={classes.cardStatValue}>
                                {currencyFormate(
                                  // totalStat?.saleYearly?.data || 0
                                  salesStats?.totalYear || 0
                                )}
                              </h4>
                            </GridItem>
                            <GridItem xs={12} md={12} lg={12}>
                              <h4 className={classes.cardStat}>Yearly Sales</h4>
                            </GridItem>
                          </GridContainer>
                        </div>
                      </div>
                    </GridItem>
                  </GridContainer>
                </div>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={6} lg={4}>

            <CustomCard
              cdTitle="ToDo"
              btnToolTip="Add ToDo"
              onClickAddBtn={() => setClassicModal(true)}
              height="380px">
              {/* {//console.log(user_id,"all task 2")} */}
              {appointment.length > 0 ?
                appointment.map((a, i) => (
                  // a.for_users.value
                  // //console.log(appointment,"sen1606/app"),
                  <AppointmentCard
                    time={a.time}
                    date={a.date}
                    title={a.name}
                    subject={a.subject}
                    desc={a.desc}
                    sales_id={a.sales_id}
                    task_todo_id={a.task_todo_id}
                    edit_log={a.edit_log}
                    enquiry_no={a.enquiry_no}
                    todo_list={a.todo_list}
                  />
                ))
                :
                <h4 align="center" style={{ fontWeight: "bold", color: "#2152b5" }}>
                  ToDo Not Available
                </h4>
              }
            </CustomCard>
            {/* <CustomCard
              cdTitle="ToDo"
              btnToolTip="Add ToDo"
              onClickAddBtn={() => setClassicModal(true)}
              height="380px">
   
              {appointment.length &&
                appointment.map((a, i) => (
           
                  //console.log(appointment,"sen1606/app"),
                  <AppointmentCard
                    time={a.time}
                    date={a.date}
                    title={a.name}
                    subject={a.subject}
                    desc={a.desc}
                    sales_id={a.sales_id}
                    task_todo_id={a.task_todo_id}
                    edit_log={a.edit_log}
                    enquiry_no={a.enquiry_no}
                    todo_list={a.todo_list}
                  />
                ))}
            </CustomCard> */}
          </GridItem>
        </GridContainer>

        {/* <CustomCalander /> */}
        <MasterModel
          classicModal={classicModal}
          onCloseModel={onCloseModel}
          width={450}
          okBtnText="Submit"
          height="auto"
          modelName="To Do"
          onClickOk={onSubmitModel}
        >
          <form style={{ padding: "20px 10px", width: "100%" }}>
            <GridContainer>
              {formData.fields.map((item, key) => {
                return (
                  <>
                    <FormComponent
                      menuPortal={false}
                      item={item}
                      key={key}
                      onSelect={onSelectDetails}
                      state={updateTask}
                      onChange={onChange}
                    // error={error}
                    />
                  </>
                );
              })}
            </GridContainer>
          </form>
        </MasterModel>
        <CustomCard
          width={1020}
          height={600}
          onClickRefreshBtn={onClickRefresh}
          onClickChartTime={onClickChartTime}
          cdTitle={selectedValue === 'BrandSales'? 'Brand Wise Sales ' + chartTime : 'Salesman Wise Sales ' + chartTime}
          menuIcon
        >
          <GridContainer>

            {/* //mongo chart */}
            {/* <GridContainer>
                <GridItem xs="12" style={{ overflowY: "hidden", overflowX: "hidden" }}>
                  <iframe
                    style=
                    {{
                      background: "#F1F5F4",
                      border: "none",
                      borderRadius: "2px",
                      boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                      // width: "75vw",
                      width: "100%",
                      height: "900px",
                      overflow: "scroll"
                    }}
                    // src="https://charts.mongodb.com/charts-project-0-zrpus/embed/dashboards?id=63c257a2-7fb8-49cd-8410-329c6c554f9f&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"
                    src="https://charts.mongodb.com/charts-project-0-zrpus/embed/dashboards?id=63c257a2-7fb8-49cd-8410-329c6c554f9f&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=scale&scalingHeight=scale"
                  ></iframe>
                </GridItem>
              </GridContainer> */}

            {/* apexChart */}

            <GridItem xs="12">
              <FormControl>
                {/* <FormLabel id="demo-row-radio-buttons-group-label">Select</FormLabel> */}
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="BrandSales"
                // checked={selectedValue}
                >
                  <FormControlLabel
                    value="BrandSales"
                    control={
                      <Radio
                        onChange={handleRadioChange}
                        sx={{
                          color: red[800],
                          '&.Mui-checked': {
                            color: red[600],
                          },
                        }}
                      />}
                    label="Brand Wise Sales"
                    sx={{
                      color: red[800],
                      '&.Mui-checked': {
                        color: red[600],
                      },
                    }}
                  />
                  <FormControlLabel
                    value="SalesmanSales"
                    control={
                      <Radio
                        onChange={handleRadioChange}
                        sx={{
                          color: red[800],
                          '&.Mui-checked': {
                            color: red[600],
                          },
                        }} />}
                    label="Salesman Wise Sales"
                    sx={{
                      color: red[800],
                      '&.Mui-checked': {
                        color: red[600],
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </GridItem>
            <GridItem xs="12">
              {
                loadingChart ? (
                  <Box mt={10} width="100%" textAlign="center">
                    <CircularProgress />
                  </Box>
                ) :
                  (chartMsg ? <h4>{chartMsg}</h4> :
                    <DonutCharts brandName={donutChartNames} amount={selectedAmount}/>)}

            </GridItem>
          </GridContainer>

        </CustomCard>
        {/* <GridContainer style={{ marginTop: "-20px" }}>
          <GridItem xs={12} sm={12} md={4} lg={4}>
            <CustomCard height={400} cdTitle="Sales Comparison" menuIcon>
              <div style={{ padding: "20px 0" }}>
                <ChartistGraph
                  data={multipleBarsChart.data}
                  type="Bar"
                  options={multipleBarsChart.options}
                  listener={multipleBarsChart.animation}
                />
              </div>
            </CustomCard>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} lg={4}>
            <CustomCard height={400} cdTitle="Calendar" menuIcon>
              <div className={classes.center}>
                <Calendar
                  className={classes.borderNone}
                  onChange={onChange}
                  value={value}
                />
              </div>
            </CustomCard>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} lg={4}>
            <CustomCard height={400} cdTitle="Weekly sales" menuIcon>
              <GridContainer>
                <GridItem xs="12">
                  <ChartistGraph
                    data={pieChart.data}
                    type="Pie"
                    options={pieChart.options}
                  />
                </GridItem>
                <GridItem xs="12"></GridItem>
              </GridContainer>
            </CustomCard>
          </GridItem>
        </GridContainer> */}
        {/* <GridContainer>
        <GridItem xs="12">
          <CustomCard height={400} cdTitle="Latest Project" menuIcon>
            <MuiTable rows={tableService} columns={headerData} />
          </CustomCard>
        </GridItem>
      </GridContainer> */}
      </div>
    </ThemeProvider>
  );
}
