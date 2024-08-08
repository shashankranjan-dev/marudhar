import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import { CustomCard } from "../../Components/CustomCard";
import {
  getAllUsers,
  getAllTaskTodo,
  postSalesStatus,
  postSalesTask,
  getTaskBySalesId,
  postTodoTask,
  updateTodoTask,
  getTaskByPurchaseId,
  postDireactPurchaseTask,
  postPurchaseStatus,
} from "../../../services/updateTodoTaskService";

import { getListStatus } from "../../../services/addStatusService";
import { Input, Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../../theme/theme";
import React from "react";
import { appScrollBar } from "assets/jss/material-dashboard-pro-react";
import { useHistory, useLocation } from "react-router-dom";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import FormComponent from "../HelperComponent/FormComponent";
import { currentDateAddOne, currentTime, dateFormate, dateFormateField } from "./utils";
import MuiTable from "../../Components/MuITable";

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },

  container: {
    ...appScrollBar,
    maxHeight: 360,
  },

  actionbtns: {
    marginLeft: 15,
    marginTop: 20,
    float: "right",
  },
}));

const UpdateTaskAndStatus = ({
  customer_name = "",
  id = "",
  status_id = "",
  setRefresh = () => { },
  refresh = false,
  procedeTo = "",
  onProcedeToNext = () => { },
  location,
  statusBtn = true,
  module = "",
  statusFor = "",
}) => {
  const classes = useStyles();
  const history = useHistory();
  const defaultLocation = useHistory();
  const [globalState, dispatch] = useStateValue();
  const [allStatus, setAllStatus] = React.useState([]);
  const [allTaskTodo, setAllTaskTodo] = React.useState([]);
  const [appointment, setAppointment] = React.useState([]);
  const user_id = globalState?.user?.serial_id;
  const [loading, setLoading] = React.useState(false);

  //alluser state
  const [users, setUsers] = React.useState([]);

  const [error, setError] = React.useState({
    txt_subject: false,
    ddl_status: false,
  });

  const [updateTask, setUpdateTask] = React.useState({
    edit: false,
    task_todo_id: "",
    sales_id: "",
    purchase_id: "",
    isView: true,
    isUpdateTask: false,
    module: module,
    txt_subject: location?.state.customer_name ? location?.state.customer_name : location?.state?.subject,
    txt_details: "",
    ddl_status: "",
    ddl_status_label: "Select",
    enquiry_no: id,
    ddl_users:users.filter((o) => o.value === globalState.user?.serial_id),
    ddl_users_label: "Select",
    txt_status_note: "",
    isUpdateStatus: false,
    txt_update_task_date: currentDateAddOne(),
    txt_update_task_time: currentTime(),
  });

  const [previousTodo, setPreviousTodo] = React.useState([
    {
      task_todo_id: location?.state.task_todo_id,
      module: location?.state.title,
      subject: location?.state.subject,
      details: location?.state.details,
      users: users.filter((o) => o.value === globalState.user?.serial_id),
      time: location?.state.time,
      date: dateFormate(location?.state.date),
      isUpdateTask: location?.state.isUpdateTask === true ? true : false,
    }
  ]);


  // Form Data
  const formData = [
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
      lg: 2,
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
      value: currentTime(),
      xs: 12,
      md: 4,
      lg: 2,
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
      lg: 4,
    },
  ];
  // Form Data
  const formDataStatus = [
    {
      name: "ddl_status",
      label: "Status",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "select_two",
      xs: 12,
      md: 6,
      lg: 4,
      options: allStatus.filter((a)=>a.label === "Closed"),
      // options: allStatus
    },
    {
      name: "txt_status_note",
      label: "Note",
      hidden: false,
      required: false,
      align: "left",
      data_type: "string",
      html_element: "TextField",
      error: false,
      xs: 12,
      md: 12,
      lg: 8,
    },
  ];


  // console.log("sen28=>",users.filter((o) => o.value === globalState.user?.serial_id))

  React.useEffect(() => {
    getAllTaskTodo(
      user_id,
      (appointment) => {

        setAppointment(appointment);
        setLoading(false);
      },
      (err) => {
        setLoading(false);

        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    getAllUsers((r) => {
      // console.log(r, "777")

      setUsers(r)
      // r.map((u,i)=>(

      //   setUsers((prev)=>({
      //     ...prev,

      //     value: u.user_id,
      //     label:u.name
      //   }))
      // ))

    })

    if (location.state?.row) {
      if (location.state?.updateTask) {
        setUpdateTask((prv) => ({
          ...prv,
          sales_id: location.state?.row?.sales_id,
          isUpdateTask: location.state.updateTask,
          isView: false,
        }));
      }
      if (location.state?.updateStatus) {
        setUpdateTask((prv) => ({
          ...prv,
          sales_id: location.state?.row?.sales_id,
          isUpdateStatus: location.state.updateStatus,
          isView: false,
        }));
      }
    }
    getListStatus(
      statusFor,
      (r) => {
        // console.log(r, statusFor, "status check")
        setAllStatus(r);
        r.forEach((s, i) => {
          if (Number(s.value) === Number(status_id)) {
            setUpdateTask((prv) => ({
              ...prv,
              ddl_status: { value: s.value, label: s.label },
            }));
          }
        });
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    if (module === "PURCHASE" || module === "PURCHASE_ORDER") {
      getTaskByPurchaseId(
        updateTask.purchase_id,
        location.state.title,
        (r) => {

          // console.log(r,"99989")
          if (r && r.subject) {
            setUpdateTask((prv) => ({
              ...prv,
              txt_subject: r.subject ? customer_name : location.state?.customer_name,
              txt_details: r.details ? r.details : "",
              txt_update_task_date: dateFormateField(r.date),
              time: r.time ? r.time : currentTime(),
              txt_status_note: r.status_note,
              isUpdateTask: true,
              isView: false,
            }));
          }
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
    } else {
      getTaskBySalesId(
        updateTask.sales_id,
        module,
        (r) => {

          // console.log(location, "989")

          if (r && r.subject) {

            setUpdateTask((prv) => ({
              ...prv,
              txt_subject: location.state.customer_name ?
                location.state.customer_name
                :
                location.state?.row?.enqCustomer ? location.state?.row?.enqCustomer
                  : location.state?.subject,

              txt_details: location.state?.desc ? location.state?.desc : r.details,
              txt_update_task_date: dateFormateField(r.date),
              time: r.time ? r.time : currentTime(),
              txt_status_note: r.status_note,
              isUpdateTask: true,
              isView: false,
            }));
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
  }, []);

  const onSelectStatus = (name, v) => {
    setUpdateTask({ ...updateTask, [name]: v });


  };

  const onChangeUpdateTask = (e) => {
    const { name, value } = e.target;
    setUpdateTask({ ...updateTask, [name]: value });
  
  };

  const onSelectUsers = (name, value) => {
    // console.log(name, value, "0909")
    setUpdateTask({
      ...updateTask,
      [name]: value,
      ddl_users_label: value.label
    })

  }

  // onSubmitUpdateTask called
  const onSubmitUpdateTask = (e) => {
    e.preventDefault();
    if (!updateTask.txt_subject) {
      setError({
        txt_subject: !updateTask.txt_subject,
      });
    }
    else {
      if (module === "PURCHASE" || module === "PURCHASE_ORDER") {
        postTodoTask(
          updateTask,
          globalState.user?.serial_id,
          appointment,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Task added Successfully",
                msgType: "success",
              },
            });
            setError({});
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      }
      else //working in case of sales module
      {
        //posting or inserting data in TO DO table
        postTodoTask(
          updateTask,
          globalState.user?.serial_id,
          users.filter((o) => o.value === globalState.user?.serial_id),
          previousTodo,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Task added Successfully",
                msgType: "success",
              },
            });
            setError({});
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      } // end of elseif

      // if (module === "PURCHASE" || module === "PURCHASE_ORDER") {
      //   postDireactPurchaseTask(
      //     updateTask,
      //     (r) => {
      //       dispatch({
      //         type: actionTypes.SET_OPEN_MSG,
      //         payload: {
      //           msg: "Task Updated Successfully",
      //           msgType: "success",
      //         },
      //       });
      //     },
      //     (err) => { }
      //   );
      // }
      // else {
      //   // updating sales table
      //   postSalesTask(
      //     updateTask,
      //     (r) => {
      //       dispatch({
      //         type: actionTypes.SET_OPEN_MSG,
      //         payload: {
      //           msg: "Task Updated Successfully",
      //           msgType: "success",
      //         },
      //       });
      //     },
      //     (err) => { }
      //   );
      // }
    }
  };
  // console.log(location.state.row.enqNo, "sen2505/update0")

  const onSubmitCloseToDo = (e) => {
    // console.log(location.state.task_todo_id, "sen2505/update")
    updateTodoTask(
      location.state.task_todo_id,
      (r) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: "Task Closed Successfully",
            msgType: "success",
          },
        });
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    )
  }

  // onSubmitStatus called
  const onSubmitStatus = (e) => {
    e.preventDefault();
    if (!updateTask.ddl_status) {
      setError({
        ddl_status: !updateTask.ddl_status,
      });
    } else {
      if (module === "PURCHASE" || module === "PURCHASE_ORDER") {
        postPurchaseStatus(
          updateTask,
          module,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Status Updated Successfully",
                msgType: "success",
              },
            });
            setUpdateTask({
              ...updateTask,
              ddl_status: "",
              txt_status_note: "",
            });
            setError({});
            setRefresh(!refresh);
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      } else {
        postSalesStatus(
          updateTask,
          module,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Status Updated Successfully",
                msgType: "success",
              },
            });
            if (statusFor === "Sales-Quotation") {
              history.push({
                pathname: "/admin/sale/quatation",
                state: {
                  row: { sales_id: location.state?.row.sales_id },
                },
              });
            } else if (statusFor === "Sales-Enquiry") {
              history.push({
                pathname: "/admin/sales/enquiry",
                state: {
                  row: { sales_id: location.state?.row.sales_id },
                },
              });
            } else {
              history.push({
                pathname: "/admin/sale/sale-order",
                state: {
                  row: { sales_id: location.state?.row.sales_id },
                },
              });
            }

            setUpdateTask({
              ...updateTask,
              ddl_status: "",
              txt_status_note: "",
            });
            setError({});
            setRefresh(!refresh);
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      }
    }
  };




  // console.log(updateTask, "7776")
  const rowData = [
    {
      txt_subject: updateTask.txt_subject,
      txt_details: updateTask.txt_details
    }
  ]
  const headerData = [
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
      id: "subject",
      label: "Subject",
      align: "left",
    },
    {
      id: "details",
      label: "Details",
      align: "center",
    },


  ]

  return (
    <>
      {updateTask.isUpdateTask && (
        <GridItem xs="12">
          <CustomCard cdTitle="Update To Do" maxHeight={380}>
            <GridContainer style={{ padding: "5px 20px" }}>
              {/* {console.log("sen=>", previousTodo)} */}
              {
                previousTodo[0]?.isUpdateTask ?
                    <h4 align="center" style={{ fontWeight: "bold", color: "#2152b5" }}>
                      Previous To Do
                    </h4>
                  : ""
              }
              {
                previousTodo[0]?.isUpdateTask ?
                    <MuiTable
                      columns={headerData}
                      rows={previousTodo}
                      pagination={false}
                    />
                  : ""
              }

            </GridContainer>

            <GridContainer style={{ padding: "20px 20px" }}>
              {formData.map((item, key) => {
                return (
                  <>

                    <FormComponent
                      item={item}
                      key={key}
                      onSelect={onSelectUsers}
                      state={updateTask}
                      onChange={onChangeUpdateTask}
                      error={error}
                    />
                  </>

                );
              })}
            </GridContainer>
          </CustomCard>
        </GridItem>
      )}

      {updateTask.isUpdateStatus && (
        <GridItem xs="12">
          <CustomCard cdTitle="Update Status" maxHeight={380}>
            <GridContainer style={{ padding: "5px 20px" }}>
              {formDataStatus.map((item, key) => {
                return (
                  <FormComponent
                    item={item}
                    key={key}
                    onSelect={onSelectStatus}
                    state={updateTask}
                    onChange={onChangeUpdateTask}
                    error={error}
                  />
                );
              })}
            </GridContainer>
          </CustomCard>
        </GridItem>
      )}
      <GridItem xs={12}>
        {updateTask.isUpdateTask && (
          <Button
            onClick={onSubmitUpdateTask}
            className={classes.actionbtns}
            variant="outlined"
            color="primary"
          >
            Update To Do
          </Button>
        )}
        <Button
          onClick={onSubmitCloseToDo}
          className={classes.actionbtns}
          variant="outlined"
          color="danger"
        >
          Close To Do
        </Button>

        {updateTask.isView && (
          <>
            {/* {procedeTo && (
              <Button
                onClick={onProcedeToNext}
                className={classes.actionbtns}
                variant="outlined"
                color="primary"
              >
                Proceede To {procedeTo}
              </Button>
            )} */}
            {statusBtn && (
              <Button
                onClick={() =>
                  setUpdateTask({
                    ...updateTask,
                    isUpdateStatus: true,
                    isUpdateTask: false,
                    isView: false,
                  })
                }
                className={classes.actionbtns}
                variant="outlined"
                color="primary"
              >
                Update Status
              </Button>
            )}

            <Button
              onClick={() =>
                setUpdateTask({
                  ...updateTask,
                  isUpdateTask: true,
                  isUpdateStatus: false,
                  isView: false,
                })
              }
              className={classes.actionbtns}
              variant="outlined"
              color="primary"
            >
              Update To Do
            </Button>
          </>
        )}

        {updateTask.isUpdateStatus && (
          <Button
            onClick={onSubmitStatus}
            className={classes.actionbtns}
            variant="outlined"
            color="primary"
          >
            Update
          </Button>
        )}
      </GridItem>
    </>
  );
};






export default UpdateTaskAndStatus;



// import GridContainer from "components/Grid/GridContainer";
// import GridItem from "components/Grid/GridItem";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "components/CustomButtons/Button.js";
// import { CustomCard } from "../../Components/CustomCard";
// import {
//   getAllUsers,
//   getAllTaskTodo,
//   postSalesStatus,
//   postSalesTask,
//   getTaskBySalesId,
//   postTodoTask,
//   updateTodoTask,
//   getTaskByPurchaseId,
//   postDireactPurchaseTask,
//   postPurchaseStatus,
// } from "../../../services/updateTodoTaskService";

// import { getListStatus } from "../../../services/addStatusService";
// import { Input, Paper } from "@material-ui/core";
// import { ThemeProvider } from "@material-ui/core";
// import theme from "../../../theme/theme";
// import React from "react";
// import { appScrollBar } from "assets/jss/material-dashboard-pro-react";
// import { useHistory, useLocation } from "react-router-dom";
// import { useStateValue } from "../../../context/context";
// import { actionTypes } from "../../../context/reducer";
// import FormComponent from "../HelperComponent/FormComponent";
// import { currentDateAddOne, currentTime, dateFormateField } from "./utils";
// import MuiTable from "../../Components/MuITable";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     switchBtn: {
//       width: 180,
//       height: "100%",
//     },
//   },

//   container: {
//     ...appScrollBar,
//     maxHeight: 360,
//   },

//   actionbtns: {
//     marginLeft: 15,
//     marginTop: 20,
//     float: "right",
//   },
// }));

// const UpdateTaskAndStatus = ({
//   customer_name = "",
//   id = "",
//   status_id = "",
//   setRefresh = () => { },
//   refresh = false,
//   procedeTo = "",
//   onProcedeToNext = () => { },
//   location,
//   statusBtn = true,
//   module = "",
//   statusFor = "",
// }) => {
//   const classes = useStyles();
//   const history = useHistory();
//   const defaultLocation = useHistory();
//   const [globalState, dispatch] = useStateValue();
//   const [allStatus, setAllStatus] = React.useState([]);
//   const [allTaskTodo, setAllTaskTodo] = React.useState([]);
//   const [appointment, setAppointment] = React.useState([]);
//   const user_id = globalState?.user?.serial_id;
//   const [loading, setLoading] = React.useState(false);

//   //alluser state
//   const [users, setUsers] = React.useState([]);

//   const [error, setError] = React.useState({
//     txt_subject: false,
//     ddl_status: false,
//   });


//   // let subject_name = location?.state?.subject;
//   // console.log(customer_name,"customer_name");

//   const [updateTask, setUpdateTask] = React.useState({
//     edit: false,
//     task_todo_id: "",
//     sales_id: location.state?.sales_id,
//     purchase_id: location.state?.purchase_id,
//     isView: true,
//     isUpdateTask: false,
//     module: module,
//     txt_subject: location?.state.customer_name ? location?.state.customer_name : location?.state?.subject,
//     txt_details: "",
//     ddl_status: "",
//     ddl_status_label: "Select", 
//     enquiry_no:id,
//     ddl_users: [globalState.user?.serial_id],
//     ddl_users_label: "Select",
//     txt_status_note: "",
//     isUpdateStatus: false,
//     txt_update_task_date: currentDateAddOne(),
//     txt_update_task_time: currentTime(),
//   });
  
// console.log(id,"sen1606")

//   // Form Data
//   const formData = [
//     {
//       name: "txt_subject",
//       label: "Subject",
//       hidden: false,
//       required: true,
//       align: "left",
//       data_type: "string",
//       html_element: "TextField",
//       error: false,
//       xs: 12,
//       md: 12,
//       lg: 12,
//     },
//     {
//       name: "txt_details",
//       label: "Details",
//       hidden: false,
//       required: true,
//       align: "left",
//       data_type: "string",
//       html_element: "TextArea",
//       error: false,
//       xs: 12,
//       md: 12,
//       lg: 12,
//     },
//     {
//       name: "txt_update_task_date",
//       label: "Select Date",
//       hidden: false,
//       required: false,
//       align: "left",
//       data_type: "date",
//       html_element: "TextField",
//       error: false,
//       xs: 12,
//       md: 4,
//       lg: 2,
//     },
//     {
//       name: "txt_update_task_time",
//       label: "Select Time",
//       hidden: false,
//       required: false,
//       align: "left",
//       data_type: "time",
//       html_element: "TextField",
//       error: false,
//       xs: 12,
//       md: 4,
//       lg: 2,
//     },
//     {
//       name: "ddl_users",
//       label: "Select Collaborators",
//       hidden: false,
//       required: false,
//       align: "left",
//       data_type: "string",
//       html_element: "select_multi",
//       error: false,
//       options: users,
//       default_val: users.filter(o => o.value === globalState.user?.serial_id),
//       xs: 12,
//       md: 4,
//       lg: 4,
//     },
//   ];
//   // Form Data
//   const formDataStatus = [
//     {
//       name: "ddl_status",
//       label: "Status",
//       hidden: false,
//       required: true,
//       data_type: "string",
//       html_element: "select_two",
//       xs: 12,
//       md: 6,
//       lg: 4,
//       options: allStatus,
//     },
//     {
//       name: "txt_status_note",
//       label: "Note",
//       hidden: false,
//       required: false,
//       align: "left",
//       data_type: "string",
//       html_element: "TextField",
//       error: false,
//       xs: 12,
//       md: 12,
//       lg: 8,
//     },
//   ];


// console.log(appointment,"DE")
//   React.useEffect(() => {
//     getAllTaskTodo(
//   user_id,
//   (appointment) => {

//     setAppointment(appointment);
//     setLoading(false);
//   },
//   (err) => {
//     setLoading(false);

//     dispatch({
//       type: actionTypes.SET_OPEN_MSG,
//       payload: { msg: err, msgType: "error" },
//     });
//   }
// );

// getAllUsers((r) => {
//   console.log(r, "777")

//   setUsers(r)
//   // r.map((u,i)=>(

//   //   setUsers((prev)=>({
//   //     ...prev,

//   //     value: u.user_id,
//   //     label:u.name
//   //   }))
//   // ))

// })

// if (location.state?.row) {
//   if (location.state?.updateTask) {
//     setUpdateTask((prv) => ({
//       ...prv,
//       sales_id: location.state?.row?.sales_id,
//       isUpdateTask: location.state.updateTask,
//       isView: false,
//     }));
//   }
//   if (location.state?.updateStatus) {
//     setUpdateTask((prv) => ({
//       ...prv,
//       sales_id: location.state?.row?.sales_id,
//       isUpdateStatus: location.state.updateStatus,
//       isView: false,
//     }));
//   }
// }
// getListStatus(
//   statusFor,
//   (r) => {
//     console.log(r, statusFor, "status check")
//     setAllStatus(r);
//     r.forEach((s, i) => {
//       if (Number(s.value) === Number(status_id)) {
//         setUpdateTask((prv) => ({
//           ...prv,
//           ddl_status: { value: s.value, label: s.label },
//         }));
//       }
//     });
//   },
//   (err) => {
//     dispatch({
//       type: actionTypes.SET_OPEN_MSG,
//       payload: { msg: err, msgType: "error" },
//     });
//   }
// );
// if (module === "PURCHASE" || module === "PURCHASE_ORDER") {
//   getTaskByPurchaseId(
//     updateTask.purchase_id,
//     location.state.title,
//     (r) => {

//       // console.log(r,"99989")
//       if (r && r.subject) {
//         setUpdateTask((prv) => ({
//           ...prv,
//           txt_subject: r.subject ? customer_name : location.state?.customer_name,
//           txt_details: r.details ? r.details : "",
//           txt_update_task_date: dateFormateField(r.date),
//           time: r.time ? r.time : currentTime(),
//           txt_status_note: r.status_note,
//           isUpdateTask: true,
//           isView: false,
//         }));
//       }
//     },
//     (err) => {
//       dispatch({
//         type: actionTypes.SET_OPEN_MSG,
//         payload: { msg: err, msgType: "error" },
//       });
//     }
//   );
// } else {
//   getTaskBySalesId(
//     updateTask.sales_id,
//     module,
//     (r) => {

//       console.log(location, "989")

//       if (r && r.subject) {

//         setUpdateTask((prv) => ({
//           ...prv,
//           txt_subject: location.state.customer_name ?
//             location.state.customer_name
//             :
//             location.state?.row?.enqCustomer ? location.state?.row?.enqCustomer
//               : location.state?.subject,

//           txt_details: location.state?.desc ? location.state?.desc : r.details,
//           txt_update_task_date: dateFormateField(r.date),
//           time: r.time ? r.time : currentTime(),
//           txt_status_note: r.status_note,
//           isUpdateTask: true,
//           isView: false,
//         }));
//       }
//     },
//     (err) => {
//       dispatch({
//         type: actionTypes.SET_OPEN_MSG,
//         payload: { msg: err, msgType: "error" },
//       });
//     }
//   );
// }
// }, []);

//   const onSelectStatus = (name, v) => {
//     setUpdateTask({ ...updateTask, [name]: v });


//   };

//   const onChangeUpdateTask = (e) => {
//     const { name, value } = e.target;
//     setUpdateTask({ ...updateTask, [name]: value });
//   };

//   const onSelectUsers = (name, value) => {
//     console.log(name, value, "0909")
//     setUpdateTask({
//       ...updateTask,
//       [name]: value,
//       ddl_users_label: value.label
//     })

//   }
//   console.log(updateTask,"SDSD")

//   // onSubmitUpdateTask called
//   const onSubmitUpdateTask = (e) => {
//     e.preventDefault();
//     if (!updateTask.txt_subject) {
//       setError({
//         txt_subject: !updateTask.txt_subject,
//       });
//     }
//     else {
//       if (module === "PURCHASE" || module === "PURCHASE_ORDER") {
//         postTodoTask(
//           updateTask,         
//           globalState.user?.serial_id,
//           appointment,
//           (r) => {
//             dispatch({
//               type: actionTypes.SET_OPEN_MSG,
//               payload: {
//                 msg: "Task added Successfully",
//                 msgType: "success",
//               },
//             });
//             setError({});
//           },
//           (err) => {
//             dispatch({
//               type: actionTypes.SET_OPEN_MSG,
//               payload: { msg: err, msgType: "error" },
//             });
//           }
//         );
//       }
//       else //working in case of sales module
//       {
//         //posting or inserting data in TO DO table
//         postTodoTask(
//           updateTask,
//           globalState.user?.serial_id,
       
//           (r) => {
//             dispatch({
//               type: actionTypes.SET_OPEN_MSG,
//               payload: {
//                 msg: "Task added Successfully",
//                 msgType: "success",
//               },
//             });
//             setError({});
//           },
//           (err) => {
//             dispatch({
//               type: actionTypes.SET_OPEN_MSG,
//               payload: { msg: err, msgType: "error" },
//             });
//           }
//         );
//       } // end of elseif

//       if (module === "PURCHASE" || module === "PURCHASE_ORDER") {
//         postDireactPurchaseTask(
//           updateTask,
//           (r) => {
//             dispatch({
//               type: actionTypes.SET_OPEN_MSG,
//               payload: {
//                 msg: "Task Updated Successfully",
//                 msgType: "success",
//               },
//             });
//           },
//           (err) => { }
//         );
//       }
//       else {
//         // updating sales table
//         postSalesTask(
//           updateTask,
//           (r) => {
//             dispatch({
//               type: actionTypes.SET_OPEN_MSG,
//               payload: {
//                 msg: "Task Updated Successfully",
//                 msgType: "success",
//               },
//             });
//           },
//           (err) => { }
//         );
//       }
//     }
//   };
//   // console.log(location.state.row.enqNo, "sen2505/update0")

//   const onSubmitCloseToDo = (e) => {
//     console.log(location.state.task_todo_id, "sen2505/update")
//     updateTodoTask(
//       location.state.task_todo_id,
//       (r) => {
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: {
//             msg: "Task Closed Successfully",
//             msgType: "success",
//           },
//         });
//       },
//       (err) => {
//         dispatch({
//           type: actionTypes.SET_OPEN_MSG,
//           payload: { msg: err, msgType: "error" },
//         });
//       }
//     )
//   }

//   // onSubmitStatus called
//   const onSubmitStatus = (e) => {
//     e.preventDefault();
//     if (!updateTask.ddl_status) {
//       setError({
//         ddl_status: !updateTask.ddl_status,
//       });
//     } else {
//       if (module === "PURCHASE" || module === "PURCHASE_ORDER") {
//         postPurchaseStatus(
//           updateTask,
//           module,
//           (r) => {
//             dispatch({
//               type: actionTypes.SET_OPEN_MSG,
//               payload: {
//                 msg: "Status Updated Successfully",
//                 msgType: "success",
//               },
//             });
//             setUpdateTask({
//               ...updateTask,
//               ddl_status: "",
//               txt_status_note: "",
//             });
//             setError({});
//             setRefresh(!refresh);
//           },
//           (err) => {
//             dispatch({
//               type: actionTypes.SET_OPEN_MSG,
//               payload: { msg: err, msgType: "error" },
//             });
//           }
//         );
//       } else {
//         postSalesStatus(
//           updateTask,
//           module,
//           (r) => {
//             dispatch({
//               type: actionTypes.SET_OPEN_MSG,
//               payload: {
//                 msg: "Status Updated Successfully",
//                 msgType: "success",
//               },
//             });
//             if (statusFor === "Sales-Quotation") {
//               history.push({
//                 pathname: "/admin/sale/quatation",
//                 state: {
//                   row: { sales_id: location.state?.row.sales_id },
//                 },
//               });
//             } else if (statusFor === "Sales-Enquiry") {
//               history.push({
//                 pathname: "/admin/sales/enquiry",
//                 state: {
//                   row: { sales_id: location.state?.row.sales_id },
//                 },
//               });
//             } else {
//               history.push({
//                 pathname: "/admin/sale/sale-order",
//                 state: {
//                   row: { sales_id: location.state?.row.sales_id },
//                 },
//               });
//             }

//             setUpdateTask({
//               ...updateTask,
//               ddl_status: "",
//               txt_status_note: "",
//             });
//             setError({});
//             setRefresh(!refresh);
//           },
//           (err) => {
//             dispatch({
//               type: actionTypes.SET_OPEN_MSG,
//               payload: { msg: err, msgType: "error" },
//             });
//           }
//         );
//       }
//     }
//   };




//   console.log(updateTask, "7776")
//   const rowData = [
//     {
//       txt_subject: updateTask.txt_subject,
//       txt_details: updateTask.txt_details
//     }
//   ]
//   const headerData = [
//     {
//       id: "txt_subject",
//       label: "Subject",
//       align: "left",
//     },
//     {
//       id: "txt_details",
//       label: "Details",
//       align: "left",
//     }
//   ]

//   return (
//     <>
//       {updateTask.isUpdateTask && (
//         <GridItem xs="12">
//           <CustomCard cdTitle="Update To Do" maxHeight={380}>
//             <GridContainer style={{ padding: "5px 20px" }}>
//               <MuiTable
//                 columns={headerData}
//                 rows={rowData}
//                 pagination={false}
//               />
//             </GridContainer>

//             <GridContainer style={{ padding: "20px 20px" }}>
//               {formData.map((item, key) => {
//                 return (
//                   <>

//                     <FormComponent
//                       item={item}
//                       key={key}
//                       onSelect={onSelectUsers}
//                       state={updateTask}
//                       onChange={onChangeUpdateTask}
//                       error={error}
//                     />
//                   </>

//                 );
//               })}
//             </GridContainer>
//           </CustomCard>
//         </GridItem>
//       )}

//       {updateTask.isUpdateStatus && (
//         <GridItem xs="12">
//           <CustomCard cdTitle="Update Status" maxHeight={380}>
//             <GridContainer style={{ padding: "5px 20px" }}>
//               {formDataStatus.map((item, key) => {
//                 return (
//                   <FormComponent
//                     item={item}
//                     key={key}
//                     onSelect={onSelectStatus}
//                     state={updateTask}
//                     onChange={onChangeUpdateTask}
//                     error={error}
//                   />
//                 );
//               })}
//             </GridContainer>
//           </CustomCard>
//         </GridItem>
//       )}
//       <GridItem xs={12}>
//         {updateTask.isUpdateTask && (
//           <Button
//             onClick={onSubmitUpdateTask}
//             className={classes.actionbtns}
//             variant="outlined"
//             color="primary"
//           >
//             Update To Do
//           </Button>
//         )}
//         <Button
//           onClick={onSubmitCloseToDo}
//           className={classes.actionbtns}
//           variant="outlined"
//           color="danger"
//         >
//           Close To Do
//         </Button>

//         {updateTask.isView && (
//           <>
//             {/* {procedeTo && (
//               <Button
//                 onClick={onProcedeToNext}
//                 className={classes.actionbtns}
//                 variant="outlined"
//                 color="primary"
//               >
//                 Proceede To {procedeTo}
//               </Button>
//             )} */}
//             {statusBtn && (
//               <Button
//                 onClick={() =>
//                   setUpdateTask({
//                     ...updateTask,
//                     isUpdateStatus: true,
//                     isUpdateTask: false,
//                     isView: false,
//                   })
//                 }
//                 className={classes.actionbtns}
//                 variant="outlined"
//                 color="primary"
//               >
//                 Update Status
//               </Button>
//             )}

//             <Button
//               onClick={() =>
//                 setUpdateTask({
//                   ...updateTask,
//                   isUpdateTask: true,
//                   isUpdateStatus: false,
//                   isView: false,
//                 })
//               }
//               className={classes.actionbtns}
//               variant="outlined"
//               color="primary"
//             >
//               Update To Do
//             </Button>
//           </>
//         )}

//         {updateTask.isUpdateStatus && (
//           <Button
//             onClick={onSubmitStatus}
//             className={classes.actionbtns}
//             variant="outlined"
//             color="primary"
//           >
//             Update
//           </Button>
//         )}
//       </GridItem>
//     </>
//   );
// };






// export default UpdateTaskAndStatus;
