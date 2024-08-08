import React, { useEffect } from "react";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import Badge from "../../components/Badge/Badge.js";
import MutedText from "../../components/Typography/Muted";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import TimelineIcon from "@mui/icons-material/Timeline";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FilterListIcon from "@mui/icons-material/FilterList";
import clxs from "classnames";
import CloseIcon from "@mui/icons-material/Close";
import { appSecondColor } from "assets/jss/material-dashboard-pro-react.js";
// import appLogoIcon from "../../assets/applogo/marudhar-logo.png";
import { useMediaQuery } from "@material-ui/core";
import {
  currentDate,
  currentDateAddOne,
  currentTime,
  dateFormate,
  dateFormateField,
  dateFormateOnlyDM,
} from "../Pages/HelperComponent/utils";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { CircleAddBtn,Collapsible } from "../Components/CustomButton";
import { timestamp } from "services/Utils/utils.js";
import { useStateValue } from "../../context/context";
// import { currentDate, currentTime, dateFormateField } from "../Pages/HelperComponent/utils";
import {
  getAllTaskTodo,
  getAllUsers,
  postTodoTask,
  updateToDo,
  getAllTaskTodoByTodoId,
} from "../../services/appointmentService";
import MasterModel from "../Components/MasterModel";
import FormComponent from "views/Pages/HelperComponent/FormComponent";
import { actionTypes } from "../../context/reducer";
import MuiTable from "../Components/MuITable";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//Chart
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import RefreshIcon from '@mui/icons-material/Refresh';

import {
  appFontWeightThin,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
} from "assets/jss/material-dashboard-pro-react";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: appSecondColor,
    padding: "5px 5px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "10px 5px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
    "&:hover": {
      backgroundColor: tblBodyHoverColor,
    },
  },
}))(TableRow);

const useStyles = makeStyles(styles);

export const DailyFeedCard = ({
  id,
  avatarName,
  avatar,
  avatarUrl,
  date,
  whenText,
  statusLabel,
}) => {
  const classes = useStyles();
  return (
    <div key={id} className={classes.dailyFeedCard} style={{display: 'block'}}>
      <div className={classes.feedCardItem} style={{ height: "50px"}}>
        <div>
          <h5
            className={classes.feedTitle}
            style={{
              whiteSpace: "noWrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            
            }}
          >
            <span className={classes.feedUserName}>{avatarName}</span>
          </h5>

          <h5 className={classes.feedTitle}>{avatar}</h5>
        </div>
        <div>
          <MutedText style={{ fontSize: 12 }}>{date}</MutedText>
        </div>
      </div>
    </div>
  );
};

// Daily Feed with Avatar

// export const DailyFeedCard = ({
//   id,
//   avatarName,
//   avatarUrl,
//   date,
//   whenText,
//   statusLabel,
// }) => {
//   const classes = useStyles();
//   return (
//     <div key={id} className={classes.dailyFeedCard}>
//       <div className={classes.feedCardItem}>
//         <Avatar
//           alt={avatarName}
//           src={avatarUrl}
//           className={classes.dailyFeedAvatar}
//         />
//       </div>
//       <div className={classes.feedCardItem} style={{ padding: "0 10px" }}>
//         <div>
//           <h5 className={classes.feedTitle}>
//             <span className={classes.feedUserName}>{avatarName}</span>
//             {statusLabel}
//           </h5>
//         </div>
//         <div>
//           <MutedText>{date}</MutedText>
//         </div>
//       </div>
//       <div className={clxs(classes.feedCardItem, classes.feedCardItem3)}>
//         <MutedText>{whenText}</MutedText>
//       </div>
//     </div>
//   );
// };

export const StatsCard = ({ value, label, icon }) => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.statCard} style={{ height: "120px" }}>
        <CardHeader>
          <GridContainer justify="center" alignItems="center">
            <GridItem lg="3">
              <div>{icon}</div>
            </GridItem>
            <GridItem lg="9">
              <h3 className={classes.statValue} style={{ fontSize: "15px" }}>{value}</h3>
              <p className={classes.statLabel} style={{ fontSize: "12px" }}>
                {label}
              </p>
            </GridItem>
          </GridContainer>
        </CardHeader>
      </Card>
    </div>
  );
};

export const AppointmentCard = ({
  title,
  subject,
  desc,
  time,
  date,
  sales_id,
  task_todo_id,
  todo_list,
  edit_log,
  enquiry_no,
}) => {
  const history = useHistory();
  const user_id = globalState?.user?.serial_id;
  //for updating todo
  const [classicModal, setClassicModal] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [users, setUsers] = React.useState([]);
  const [hide, setHide] = React.useState(false);
  const [disable,setDisable]= React.useState(false)
  const [updateTask, setUpdateTask] = React.useState({
    edit: false,
    task_todo_id: "",
    // sales_id: location.state?.sales_id,
    // purchase_id: location.state?.purchase_id,
    isView: true,
    isUpdateTask: false,
    module: "Direct Task",
    txt_subject: subject ? subject : "",
    txt_details: "",
    ddl_status: "",
    ddl_users: [globalState.user?.serial_id],
    ddl_users_label: "Select",
    txt_status_note: "",
    isUpdateStatus: false,
    txt_update_task_date: currentDate(),
    txt_update_task_time: currentTime(),
  });
  const [previousTodo, setPreviousTodo] = React.useState([]);
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
        disable:disable

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
        // default_val: users.filter(o => o.value === globalState.user?.serial_id),
        default_val: users.filter(
          (o) => o.value === globalState.user?.serial_id
        ),
        xs: 12,
        md: 4,
        lg: 12,
      },
    ],
  };

  const headerData = [
    {
      id: "ID",
      label: "#",
      align: "left",
    },
    {
      id: "date",
      label: "Date",
      align: "left",
    },
    {
      id: "time",
      label: "Time",
      align: "left",
    },
    {
      id: "module",
      label: "Task",
      align: "left",
    },
    {
      id: "subject",
      label: "Subject",
      align: "left",
    },
    {
      id: "details",
      label: "Details",
      align: "left",
    },
  ];

  React.useEffect(() => {
    edit_log.length > 0 ? setHide(true) : setHide(false);
    // setLoading(true);
    getAllUsers((r) => {
      setUsers(r);
    });
  }, [globalState?.user]);
  const onSelectDetails = (name, value) => {
    // console.log(name, value, "sen1205");
    setUpdateTask({ ...updateTask, [name]: value });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (disable === true){
      if(name !="txt_subject"){
        setUpdateTask({ ...updateTask, [name]: value });
      }
    }else{
      setUpdateTask({ ...updateTask, [name]: value });

    }
    // console.log(name, value, "sen12051");
  };

  const onCloseModel = () => {
    setClassicModal(false);
  };
  // console.log(updateTask, "sen1205/update56");

  ////////this post toDo
  const onSubmitModel = (event) => {
    // console.log("reached", updateTask);

    event.preventDefault();
    updateToDo(
      updateTask,
      task_todo_id,
      (r) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: "Task updated Successfully",
            msgType: "success",
          },
        });
        setClassicModal(false);
        setUpdateTask([]);
        // setError({});
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    // postTodoTask(
    //   updateTask, user_id,
    //   (r) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: {
    //         msg: "Task Submitted Successfully",
    //         msgType: "success",
    //       },
    //     });
    //     setClassicModal(false);
    //     setUpdateTask([])
    //     // setError({});
    //   },
    //   (err) => {
    //     dispatch({
    //       type: actionTypes.SET_OPEN_MSG,
    //       payload: { msg: err, msgType: "error" },
    //     });
    //   }
    // );
  };

  //////this update Todo
  const onView = (
    e,
    sales_id,
    title,
    subject,
    desc,
    task_todo_id,
    edit_log,
    todo_list,
    time,
    date,
  ) => {
    // console.log(title, "sen2505/title45");
    e.preventDefault();

    ///Direct Task 
    if (title === "Direct Task") {
      // console.log(sales_id, title, subject, desc, task_todo_id, edit_log, "sen2505/title");
      setClassicModal(true);
      setDisable(true);
      setPreviousTodo(
        {
          task_todo_id: task_todo_id,
          module: title,
          subject: subject,
          details: desc,
          users: users.filter((o) => o.value === globalState.user?.serial_id),
          time:time,
          date:date,
        }
      );

    } 
    ////Enquiry
    else if (title === "Enquiry") {
      // console.log(sales_id, title, subject, desc, task_todo_id, edit_log, "sen2505/title");

      history.push({
        pathname: "/admin/enquiry-list-view/",
        // search: '?query=abc',
        state: {
          task_todo_id: task_todo_id,
          module: title,
          subject: subject,
          details: desc,
          users: users.filter((o) => o.value === globalState.user?.serial_id),
          time:time,
          date:date,
          sales_id:sales_id,
          isUpdateTask:true
          // enquiry_no: enquiry_no,
       
        },
      });
     
    }
  };

  const classes = useStyles();
  var today = new Date();
  // const currentTime = today.getHours() + ":" + today.getMinutes();

  // console.log(time, currentTime, "sen2505/date");

  return (
    <div
      style={{
        margin: "12px",
      }}
    >
      <div
        onClick={(e) =>
          onView(e, sales_id, title, subject, desc, task_todo_id, edit_log, todo_list, time, date)
        }
        className={classes.feedCardItem}
        style={
          dateFormate(timestamp(currentDate())) <= dateFormate(date)
            ? {
              padding: "10px 10px",
              marginLeft: "10px",
              borderBottom: "2px solid lightGray",
              color: "#007dff",
              cursor: "pointer",
            }
            : {
              padding: "10px 10px",
              marginLeft: "10px",
              borderBottom: "2px solid lightGray",
              color: "red",
              cursor: "pointer",
            }
        }
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h5
            className={classes.appointmentTitle}
            style={{ lineHeight: "18px", color: "red" }}
          >
            <span
              className={classes.feedUserName}
              style={{ color: appSecondColor }}
            >
              <a
                style={
                  dateFormate(timestamp(currentDate())) <= dateFormate(date)
                    ? { color: "#258af3" }
                    : { color: "red" }
                }
              >
                {title}{" "}
              </a>
            </span>
          </h5>
          {/* {console.log(dateFormateOnlyDM(date), "sen0406/date")} */}
          <div>
            <MutedText>
              {dateFormateOnlyDM(date)}, {moment(time, "HH:mm").format("LT")}
            </MutedText>
          </div>
        </div>
        <div
          style={{
            whiteSpace: "noWrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span className={classes.todoDesc}>{subject + " : " + desc}</span>
        </div>
      </div>
      <MasterModel
        classicModal={classicModal}
        onCloseModel={onCloseModel}
        width={450}
        okBtnText="Update"
        height="auto"
        modelName="Update To Do"
        onClickOk={onSubmitModel}
      >
        {previousTodo ? (
          <h4 align="center" style={{ fontWeight: "bold", color: "#2152b5" }}>
            Previous To Do
          </h4>
        ) : (
          ""
        )}
        {/* //previous todo */}
        <TableContainer>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="sticky table"
          >
            {previousTodo ? (
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">#</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                  <StyledTableCell align="center">Time</StyledTableCell>
                  <StyledTableCell align="center">Task</StyledTableCell>
                  <StyledTableCell align="center">Subject</StyledTableCell>
                  <StyledTableCell align="center">Details</StyledTableCell>
                </TableRow>
              </TableHead>
            ) : (
              ""
            )
            }
            {previousTodo ? (
              <TableBody>

                <StyledTableRow >
                  <StyledTableCell align="center">1</StyledTableCell>
                  <StyledTableCell align="center">
                    {dateFormate(previousTodo.date)}
                  </StyledTableCell>
                  <StyledTableCell align="center">{previousTodo.time}</StyledTableCell>
                  <StyledTableCell align="center">{previousTodo.module}</StyledTableCell>
                  <StyledTableCell align="center">
                    {previousTodo.subject}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {previousTodo.details}
                  </StyledTableCell>
                </StyledTableRow>

              </TableBody>
            ) : ""}
          </Table>
        </TableContainer>

        {/* ///new post */}
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
    </div>
  );
};
// export const AppointmentCard = ({
//   title,
//   subject,
//   desc,
//   time,
//   date,
//   sales_id,
//   task_todo_id,
//   todo_list,
//   edit_log,
//   enquiry_no,
// }) => {
//   const history = useHistory();
// const user_id = globalState?.user?.serial_id;
//   //for updating todo
//   const [classicModal, setClassicModal] = React.useState(false);
//   const [globalState, dispatch] = useStateValue();
//   const [users, setUsers] = React.useState([]);
//   const [hide, setHide] = React.useState(false);

//   const [updateTask, setUpdateTask] = React.useState({
//     edit: false,
//     task_todo_id: "",
//     // sales_id: location.state?.sales_id,
//     // purchase_id: location.state?.purchase_id,
//     isView: true,
//     isUpdateTask: false,
//     module: "Direct Task",
//     txt_subject: "",
//     txt_details: "",
//     ddl_status: "",
//     ddl_users: [globalState.user?.serial_id],
//     ddl_users_label: "Select",
//     txt_status_note: "",
//     isUpdateStatus: false,
//     txt_update_task_date: currentDateAddOne(),
//     // txt_update_task_time: currentTime(),
//   });
//   const [oldTodo, setOldTodo] = React.useState([]);
//   const formData = {
//     formName: "Add To Do",
//     fields: [
//       {
//         name: "txt_subject",
//         label: "Subject",
//         hidden: false,
//         required: true,
//         align: "left",
//         data_type: "string",
//         html_element: "TextField",
//         error: false,
//         xs: 12,
//         md: 12,
//         lg: 12,
//       },
//       {
//         name: "txt_details",
//         label: "Details",
//         hidden: false,
//         required: true,
//         align: "left",
//         data_type: "string",
//         html_element: "TextArea",
//         error: false,
//         xs: 12,
//         md: 12,
//         lg: 12,
//       },
//       {
//         name: "txt_update_task_date",
//         label: "Select Date",
//         hidden: false,
//         required: false,
//         align: "left",
//         data_type: "date",
//         html_element: "TextField",
//         error: false,
//         xs: 12,
//         md: 4,
//         lg: 6,
//       },
//       {
//         name: "txt_update_task_time",
//         label: "Select Time",
//         hidden: false,
//         required: false,
//         align: "left",
//         data_type: "time",
//         html_element: "TextField",
//         error: false,
//         xs: 12,
//         md: 4,
//         lg: 6,
//       },
//       {
//         name: "ddl_users",
//         label: "Select Collaborators",
//         hidden: false,
//         required: false,
//         align: "left",
//         data_type: "string",
//         html_element: "select_multi",
//         error: false,
//         options: users,
//         // default_val: users.filter(o => o.value === globalState.user?.serial_id),
//         default_val: users.filter(
//           (o) => o.value === globalState.user?.serial_id
//         ),
//         xs: 12,
//         md: 4,
//         lg: 12,
//       },
//     ],
//   };

//   const headerData = [
//     {
//       id: "ID",
//       label: "#",
//       align: "left",
//     },
//     {
//       id: "date",
//       label: "Date",
//       align: "left",
//     },
//     {
//       id: "time",
//       label: "Time",
//       align: "left",
//     },
//     {
//       id: "module",
//       label: "Task",
//       align: "left",
//     },
//     {
//       id: "subject",
//       label: "Subject",
//       align: "left",
//     },
//     {
//       id: "details",
//       label: "Details",
//       align: "left",
//     },
//   ];

//   React.useEffect(() => {
//     edit_log.length > 0 ? setHide(true) : setHide(false);
//     // setLoading(true);
//     getAllUsers((r) => {
//       setUsers(r);
//     });
//   }, [globalState?.user]);
//   const onSelectDetails = (name, value) => {
//     console.log(name, value, "sen1205");
//     setUpdateTask({ ...updateTask, [name]: value });
//   };

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setUpdateTask({ ...updateTask, [name]: value });
//     console.log(name, value, "sen12051");
//   };

//   const onCloseModel = () => {
//     setClassicModal(false);
//   };
//   // console.log(updateTask, "sen1205/update56");

//   ////////this post toDo
//   const onSubmitModel = (event) => {
//   console.log("reached",updateTask);

//     event.preventDefault();
//     updateToDo(
//       updateTask,
//       (r) => {
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: {
//             msg: "Task updated Successfully",
//             msgType: "success",
//           },
//         });
//         setClassicModal(false);
//         setUpdateTask([]);
//         // setError({});
//       },
//       (err) => {
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       }
//     );
//     // postTodoTask(
//     //   updateTask, user_id,
//     //   (r) => {
//     //     dispatch({
//     //       type: actionTypes.SET_OPEN_MSG,
//     //       payload: {
//     //         msg: "Task Submitted Successfully",
//     //         msgType: "success",
//     //       },
//     //     });
//     //     setClassicModal(false);
//     //     setUpdateTask([])
//     //     // setError({});
//     //   },
//     //   (err) => {
//     //     dispatch({
//     //       type: actionTypes.SET_OPEN_MSG,
//     //       payload: { msg: err, msgType: "error" },
//     //     });
//     //   }
//     // );
//   };

//   //////this update Todo
//   const onView = (
//     e,
//     sales_id,
//     title,
//     subject,
//     desc,
//     task_todo_id,
//     edit_log,
//     todo_list
//   ) => {
//     console.log(todo_list,"sen2505/title45");
//     e.preventDefault();
//     if (title === "Direct Task") {
//       console.log(sales_id,title,subject,desc,task_todo_id,edit_log,"sen2505/title");
//       setClassicModal(true);
//       setUpdateTask(
//         {task_todo_id: task_todo_id,
//         // isView: true,
//         // isUpdateTask: false,
//         module: "Direct Task",
//         txt_subject: subject,
//         txt_details: desc,
//         ddl_status: "",
//         ddl_users: users.filter((o) => o.value === globalState.user?.serial_id),
//         ddl_users_label: "Select",
//         txt_status_note: "",
//         isUpdateStatus: false,
//         // txt_update_task_date: currentDate(),
//         // txt_update_task_time: currentTime(),
//       }
//       );

//       getAllTaskTodoByTodoId(
//         task_todo_id,
//         (r) => {
//           console.log(
//             r[0].todo_list.reduce(
//               (k, l) =>
//                 setUpdateTask({
//                   ...updateTask,
//                   task_todo_id: l.task_todo_id,
//                   // isView: true,
//                   // isUpdateTask: false,
//                   module: "Direct Task",
//                   txt_subject: l.txt_subject,
//                   txt_details: l.txt_details,
//                   ddl_status: "",
//                   ddl_users: users.filter(
//                     (o) => o.value === globalState.user?.serial_id
//                   ),
//                   ddl_users_label: "Select",
//                   txt_status_note: "",
//                   isUpdateStatus: false,
//                   // txt_update_task_date: currentDate(),
//                   // txt_update_task_time: currentTime(),
//                 }),
//               0
//             ),
//             "sen3005/old1"
//           );
//         },
//         (err) => {
//           dispatch({
//             type: actionTypes.SET_OPEN_MSG,
//             payload: { msg: err, msgType: "error" },
//           });
//         }
//       );
//     } else if (title === "Enquiry") {
//       // console.log(
//       //   sales_id,
//       //   title,
//       //   subject,
//       //   desc,
//       //   task_todo_id,
//       //   "sen2505/title67"
//       // );
//       history.push({
//         pathname: "/admin/enquiry-list-view/",
//         // search: '?query=abc',
//         state: {
//           sales_id: sales_id,
//           subject: subject,
//           title: title,
//           desc: desc,
//           task_todo_id: task_todo_id,
//           enquiry_no: enquiry_no,
//         },
//       });
//       // if (e.type === "contextmenu"){
//       //   // e.preventDefault()
//       //   history.push({
//       //   pathname: '/admin/enquiry-list-view/',
//       //   // search: '?query=abc',
//       //   state: { sales_id: sales_id, subject: subject, title: title, desc: desc, task_todo_id: task_todo_id },
//       // });
//       // }else{

//       ////\\/\//\/\/\/Model/\\/\/\\/\/\\/\
//       // setClassicModal(true);
//       // setUpdateTask({
//       //   task_todo_id: task_todo_id,
//       //   // isView: true,
//       //   // isUpdateTask: false,
//       //   module: "Direct Task",
//       //   txt_subject: subject,
//       //   txt_details: desc,
//       //   ddl_status: "",
//       //   ddl_users: [globalState.user?.serial_id],
//       //   ddl_users_label: "Select",
//       //   txt_status_note: "",
//       //   isUpdateStatus: false,
//       //   // txt_update_task_date: currentDate(),
//       // txt_update_task_time: currentTime(),
//       // })
//       // }
//     }
//   };

//   const classes = useStyles();
//   var today = new Date();
//   var currentTime = today.getHours() + ":" + today.getMinutes();

//   // console.log(time, currentTime, "sen2505/date");

//   return (
//     <div
//       style={{
//         margin: "12px",
//       }}
//     >
//       <div
//         onClick={(e) =>
//           onView(e, sales_id, title, subject, desc, task_todo_id, edit_log,todo_list)
//         }
//         className={classes.feedCardItem}
//         style={
//           dateFormate(timestamp(currentDate())) <= dateFormate(date)
//             ? {
//                 padding: "10px 10px",
//                 marginLeft: "10px",
//                 borderBottom: "2px solid lightGray",
//                 color: "#007dff",
//                 cursor: "pointer",
//               }
//             : {
//                 padding: "10px 10px",
//                 marginLeft: "10px",
//                 borderBottom: "2px solid lightGray",
//                 color: "red",
//                 cursor: "pointer",
//               }
//         }
//       >
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <h5
//             className={classes.appointmentTitle}
//             style={{ lineHeight: "18px", color: "red" }}
//           >
//             <span
//               className={classes.feedUserName}
//               style={{ color: appSecondColor }}
//             >
//               <a
//                 style={
//                   dateFormate(timestamp(currentDate())) <= dateFormate(date)
//                     ? { color: "#258af3" }
//                     : { color: "red" }
//                 }
//               >
//                 {title}{" "}
//               </a>
//             </span>
//           </h5>
//           {console.log(dateFormateOnlyDM(date), "sen0406/date")}
//           <div>
//             <MutedText>
//               📅{dateFormateOnlyDM(date)} ⌛{moment(time, "HH:mm").format("LT")}
//             </MutedText>
//           </div>
//         </div>
//         <div
//           style={{
//             whiteSpace: "noWrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           <span className={classes.todoDesc}>{subject + " : " + desc}</span>
//         </div>
//       </div>
//       <MasterModel
//         classicModal={classicModal}
//         onCloseModel={onCloseModel}
//         width={450}
//         okBtnText="Update"
//         height="auto"
//         modelName="Update To Do"
//         onClickOk={onSubmitModel}
//       >
//         {edit_log.length ? (
//           <h4 align="center" style={{ fontWeight: "bold", color: "#2152b5" }}>
//             Previous To Do
//           </h4>
//         ) : (
//           ""
//         )}
//         <TableContainer>
//           <Table
//             className={classes.table}
//             stickyHeader
//             aria-label="sticky table"
//           >
//             {edit_log.length ? (
//               <TableHead>
//                 <TableRow>
//                   <StyledTableCell align="center">#</StyledTableCell>
//                   <StyledTableCell align="center">Date</StyledTableCell>
//                   <StyledTableCell align="center">Time</StyledTableCell>
//                   <StyledTableCell align="center">Task</StyledTableCell>
//                   <StyledTableCell align="center">Subject</StyledTableCell>
//                   <StyledTableCell align="center">Details</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//             ) : (
//               ""
//             )}
//             {console.log("checkkeedd", updateTask)}
//             <TableBody>
              
//                 <StyledTableRow >
//                   <StyledTableCell align="center">1</StyledTableCell>
//                   <StyledTableCell align="center">
//                     {dateFormate(updateTask.txt_update_task_date)}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">{updateTask.txt_time}</StyledTableCell>
//                   <StyledTableCell align="center">{updateTask.module}</StyledTableCell>
//                   <StyledTableCell align="center">
//                     {updateTask.txt_subject}
//                   </StyledTableCell>
//                   <StyledTableCell align="center">
//                     {updateTask.txt_details}
//                   </StyledTableCell>
//                 </StyledTableRow>
       
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <form style={{ padding: "20px 10px", width: "100%" }}>
//           <GridContainer>
//             {formData.fields.map((item, key) => {
//               return (
//                 <>
//                   <FormComponent
//                     menuPortal={false}
//                     item={item}
//                     key={key}
//                     onSelect={onSelectDetails}
//                     state={updateTask}
//                     onChange={onChange}
//                     // error={error}
//                   />
//                 </>
//               );
//             })}
//           </GridContainer>
//         </form>
//       </MasterModel>
//     </div>
//   );
// };

export const CustomCardAccordion = ({
  cdTitle,
  todayLabel,
  menuIcon,
  btnToolTip,
  onClickAddBtn,
  children,
  height,
  width,
  style,
  onClose,
  close,
  appLogo,
  filterIcon,
  onClickFilter,
  minHeight,
  maxHeight,
}) => {
  const classes = useStyles();
  const matchesPrint = useMediaQuery("print");
  if (matchesPrint) {
    return children;
  } else {
    return (


      <Accordion style={{height: "50px" , marginTop:"5px"}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
      
      <GridContainer justifyContent="space-between" alignItems="center">
            <GridItem>
              {appLogo && (
                <>
                  <Avatar
                    className={classes.cardAppLogo}
                    size="small"
                    alt="Marudhar"
                    // src={appLogoIcon}
                  />
                </>
              )}

              {appLogo ? (
                <h4
                  style={{ marginLeft: "40px" }}
                  className={classes.headerCdTitle}
                >
                  {cdTitle}
                </h4>
              ) : (
                <h4 className={classes.headerCdTitle}>{cdTitle}</h4>
              )}
            </GridItem>
           
          </GridContainer>
      </AccordionSummary>
      <Card  style={{height: "100px" , marginTop:"1px"}}>
        {/* <CardHeader className={classes.headerCdhd}>
          <GridContainer justifyContent="space-between" alignItems="center">
         
           
          </GridContainer>
        </CardHeader> */}
        <CardBody
          style={{
            height: 100,
            width: width,
            minHeight: minHeight,
            maxHeight: maxHeight,
          }}
          className={clxs(classes.headerCardBody, classes.customScroolBar)}
        >
          {children}
        </CardBody>
      </Card>
      </Accordion>

    );
  }
};

export const CustomCard = ({
  cdTitle,
  todayLabel,
  menuIcon,
  btnToolTip,
  onClickAddBtn,
  onClickCollapsible,
  onClickRefreshBtn,
  buttonAction,
  children,
  height,
  width,
  style,
  onClose,
  close,
  appLogo,
  filterIcon,
  onClickFilter,
  minHeight,
  maxHeight,
  onClickChartTime
}) => {


  const [menuOne, setMenuOne] = React.useState(null);

  const classes = useStyles();
  const matchesPrint = useMediaQuery("print");

  //chart menu
  const handleClick = (event) => {
    setMenuOne(event.currentTarget);
    // setSelectedRow(row);
  };
  const menuCloseOne = (id) => {
    setMenuOne(null);
  };
  if (matchesPrint) {
    return children;
  } else {
    return (
      <Card className={classes.headerCard} style={style}>
        <CardHeader className={classes.headerCdhd} onClick={onClickCollapsible} style={{ cursor: "pointer" }}>
          <GridContainer justifyContent="space-between" alignItems="center">
            <GridItem>
              {appLogo && (
                <>
                  <Avatar
                    className={classes.cardAppLogo}
                    size="small"
                    alt="Marudhar"
                  // src={appLogoIcon}
                  />
                </>
              )}

              {appLogo ? (
                <h4
                  style={{ marginLeft: "40px" }}
                  className={classes.headerCdTitle}
                >
                  {cdTitle}
                </h4>
              ) : (
                <h4 className={classes.headerCdTitle}>{cdTitle}</h4>
              )}
            </GridItem>
            <GridItem>
              {
                onClickRefreshBtn && (
                  <div>
                  <RefreshIcon onClick={onClickRefreshBtn} />
                  </div>
                )
              }
            </GridItem>
            <GridItem>
              {close && (
                <div className={classes.cardMenuIcon} onClick={onClose}>
                  <CloseIcon style={{ color: appSecondColor }} />
                </div>
              )}
              {todayLabel && (
                <div className={classes.feedBadge}>
                  {/* <Badge>Today</Badge> */}
                </div>
              )}

              {menuIcon && (
                <div className={classes.cardMenuIcon}>
                  <IconButton
                    size="small"
                    aria-controls="simple-menu-one"
                    aria-haspopup="true"
                    // onClick={(e) => handleClick(e, row)}
                    onClick={handleClick}

                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={menuOne}
                    keepMounted
                    // className={classes.actionMenu}
                    open={Boolean(menuOne)}
                    onClose={menuCloseOne}
                    style={{
                      boxShadow: "none",
                    }}
                  >
                    <MenuItem
                      // className={classes.actionIitem}
                      style={{
                        fontFamily: appDefaultFamily,
                        color: appSecondColor,
                        textTransform: "none",
                        fontSize: "14px",
                        width: "100%",
                      }}
                      onClick={onClickChartTime}
                    >
                      Daily
                    </MenuItem>
                    <MenuItem
                      // className={classes.actionIitem}
                      style={{
                        fontFamily: appDefaultFamily,
                        color: appSecondColor,
                        textTransform: "none",
                        fontSize: "14px",
                        width: "100%",
                      }}
                      onClick={onClickChartTime}
                    >
                      Weekly
                    </MenuItem>
                    <MenuItem
                      // className={classes.actionIitem}
                      style={{
                        fontFamily: appDefaultFamily,
                        color: appSecondColor,
                        textTransform: "none",
                        fontSize: "14px",
                        width: "100%",
                      }}
                      onClick={onClickChartTime}
                    >
                      Yearly
                    </MenuItem>
                  </Menu>
                </div>

              )}
              {onClickAddBtn && (
                <CircleAddBtn
                  size="small"
                  title={btnToolTip}
                  onClick={onClickAddBtn}
                />
              )}
              {onClickCollapsible && (
                <Collapsible
                  size="small"
                  // title={btnToolTip}
                  onClick={onClickCollapsible}
                  buttonAction={buttonAction}
                  style={{
                    width: "35px",
                    height: "35px"
                  }}
                />
              )}
            </GridItem>
          </GridContainer>
        </CardHeader>
        <CardBody
          style={{
            height: height,
            width: width,
            minHeight: minHeight,
            maxHeight: maxHeight,
          }}
          className={clxs(classes.headerCardBody, classes.customScroolBar)}
        >
          {children}
        </CardBody>
      </Card>
    );
  }
};

export const DashboardCard = ({
  cdTitle,
  todayLabel,
  menuIcon,
  children,
  height,
  width,
  style,
  onClose,
  close,
  filterIcon,
  onClickFilter,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.headerCard} style={style}>
      <CardHeader className={classes.headerCdhd}>
        <GridContainer justifyContent="space-between" alignItems="center">
          <GridItem>
            <h4 className={classes.headerCdTitle}>{cdTitle}</h4>
          </GridItem>
          <GridItem>
            {close && (
              <div className={classes.cardMenuIcon} onClick={onClose}>
                <CloseIcon style={{ color: appSecondColor }} />
              </div>
            )}
            {todayLabel && (
              <div className={classes.feedBadge}>
                <Badge>Today</Badge>
              </div>
            )}

            {menuIcon && (
              <div className={classes.cardMenuIcon}>
                <MoreHorizIcon />
              </div>
            )}
            {filterIcon && (
              <div className={classes.cardMenuIcon} onClick={onClickFilter}>
                <FilterListIcon />
              </div>
            )}
          </GridItem>
        </GridContainer>
      </CardHeader>
      <CardBody
        style={{ height: height, width: width }}
        className={clxs(classes.TbheaderCardBody, classes.customScroolBar)}
      >
        {children}
      </CardBody>
    </Card>
  );
};
export const TbCustomCard = ({
  cdTitle,
  todayLabel,
  menuIcon,
  children,
  height,
  width,
  style,
  onClose,
  close,
  filterIcon,
  onClickFilter,
  minHeight,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.headerCard} style={style}>
      <CardHeader className={classes.TbheaderCdhd}>
        <GridContainer justifyContent="space-between" alignItems="center">
          <GridItem>
            <h4 className={classes.headerCdTitle}>{cdTitle}</h4>
          </GridItem>
          <GridItem>
            {close && (
              <div className={classes.cardMenuIcon} onClick={onClose}>
                <CloseIcon style={{ color: appSecondColor }} />
              </div>
            )}
            {todayLabel && (
              <div className={classes.feedBadge}>
                <Badge>Today</Badge>
              </div>
            )}

            {menuIcon && (
              <div className={classes.cardMenuIcon}>
                <MoreHorizIcon />
              </div>
            )}
          </GridItem>
        </GridContainer>
      </CardHeader>
      <CardBody
        style={{ height: height, width: width }}
        className={clxs(classes.TbheaderCardBody, classes.customScroolBar)}
      >
        {children}
      </CardBody>
    </Card>
  );
};
