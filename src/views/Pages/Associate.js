import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
// import Select from "@material-ui/core/Select";
import MuiTable from "../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../Components/MasterModel";

import { CustomCard } from "../Components/CustomCard";
import CustomButton, { CircleAddBtnAnim } from "../Components/CustomButton";
import {
  updateUserMenuAccess,
  getAllRole,
  getAllUsers,
  postUser,
  updateUser,
  deleteUser,
} from "../../services/associateService";
import { getListShowroomWarehouse } from "../../services/showroomWarehouseService";

// for list

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import { withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Box } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider, FormControlLabel } from "@material-ui/core";
import { InputAdornment, IconButton, OutlinedInput } from "@material-ui/core";
import Visibility from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PageTitle from "./HelperComponent/PageTitle";

import theme from "../../theme/theme";

import React from "react";
import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
  appScrollBar,
} from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import Select from "react-select";
import { useStateValue } from "../../context/context";
import { actionTypes } from " ../../context/reducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Check from "@mui/icons-material/Check";
import CustomCheckboxStyle from "../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch";
//////////For Accordion//////////////s//e//n/
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tooltip from "@material-ui/core/Tooltip";
import clxs from "classnames";
import FileSaver from "file-saver";
import XLSX from "xlsx";
const ExcelJS = require('exceljs');

import { currentDate, IstTime, timeToUnix } from "./HelperComponent/utils";

const useStyles1 = makeStyles(styles);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: appSecondColor,
    padding: "5px 10px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "10px 10px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
    "&:hover": {
      backgroundColor: tblBodyHoverColor,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  ...CustomCheckboxStyle,
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },

  catCards: {
    marginLeft: 5,
  },
  activeText: {
    ...activeText,
  },
  customSelect: {
    marginBottom: 15,
  },
  ddlError: {
    textAlign: "right",
    color: "#f44336",
    fontSize: "12.6px",
    marginRight: 15,
    marginTop: -15,
    fontWeight: 400,
  },
}));

const AddAssociatePage = () => {
  const classes1 = useStyles1();
  const history = useHistory();
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);
  const [userAccessModel, setUserAccessModel] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);
  const [allRoles, setAllRoles] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [showroomObject, setShowroomObject] = React.useState([]);
  const [showroomWarehouseId, setSelectShowroomWarehouse] = React.useState([]);
  const [selectedShowRoom, setSelectShowroom] = React.useState({});
  const [isChangePassword, setIsChangePasword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [loading, setLoading] = React.useState(false);
  const [accessMenu, setAccessMenu] = React.useState([]);
  const [menuObject, setMenuObject] = React.useState([]);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const accessOption = [
    {
      label: "Web",
      value: 1,
    },
    {
      label: "Mobile",
      value: 2,
    },
    {
      label: "Both",
      value: 3,
    },
  ];
  const weekDays = [
    {
      label: "Monday",
      value: 1,
    },
    {
      label: "Tuesday",
      value: 2,
    },
    {
      label: "Wednesday",
      value: 3,
    },
    {
      label: "Thursday",
      value: 4,
    },
    {
      label: "Friday",
      value: 5,
    },
    {
      label: "Saturday",
      value: 6,
    },
    {
      label: "Sunday",
      value: 7,
    },
  ];
  // const weekDays = [
  //   {
  //     id: 1,
  //     name: "Monday",
  //     label: "Monday",
  //     hidden: false,
  //     required: true,
  //     data_type: "string",
  //     html_element: "TextField",
  //     error: false,
  //     xs: 12,
  //   },
  //   {
  //     id: 2,
  //     name: "Tuesday",
  //     label: "Tuesday",
  //     hidden: false,
  //     required: true,
  //     data_type: "string",
  //     html_element: "TextField",
  //     error: false,
  //     xs: 12,
  //   },
  //   {
  //     id: 3,
  //     name: "Wednesday",
  //     label: "Wednesday",
  //     hidden: false,
  //     required: true,
  //     data_type: "string",
  //     html_element: "TextField",
  //     error: false,
  //     xs: 12,
  //   },
  //   {
  //     id: 4,
  //     name: "Thursday",
  //     label: "Thursday",
  //     hidden: false,
  //     required: true,
  //     data_type: "string",
  //     html_element: "TextField",
  //     error: false,
  //     xs: 12,
  //   },
  //   {
  //     id: 5,
  //     name: "Friday",
  //     label: "Friday",
  //     hidden: false,
  //     required: true,
  //     data_type: "string",
  //     html_element: "TextField",
  //     error: false,
  //     xs: 12,
  //   },
  //   {
  //     id: 6,
  //     name: "Saturday",
  //     label: "Saturday",
  //     hidden: false,
  //     required: true,
  //     data_type: "string",
  //     html_element: "TextField",
  //     error: false,
  //     xs: 12,
  //   },
  //   {
  //     id: 7,
  //     name: "Sunday",
  //     label: "Sunday",
  //     hidden: false,
  //     required: true,
  //     data_type: "string",
  //     html_element: "TextField",
  //     error: false,
  //     xs: 12
  //   },
  // ]

  let allPermissions = [
    "1.Dashboard",
    "2.Sales",
    "2.Sales-2.1.Enquiry",
    "2.Sales-2.2.Quotation",
    "2.Sales-2.3.Sales Order",
    "2.Sales-2.4.Delivery Order",
    "2.Sales-2.5.Dispatch Order",
    "2.Sales-2.6.Invoices",
    // "2.Sales-2.8.Sales Return",
    "2.Sales-2.8.Return Delivery Order",
    "2.Sales-2.9.Return Dispatch Order",
    "3.Procurement",
    "3.Procurement-3.1.Direct Purchase",
    "3.Procurement-3.2.Purchase Order",
    "3.Procurement-3.3.Item Received",
    "3.Procurement-3.4.Purchase Return",
    "3.Procurement-3.5.Stock Transfer",
    "4.Account",
    "4.Account-4.1.Receipt",
    "4.Account-4.2.Payment",
    "4.Account-4.3.Journal",
    "4.Account-4.4.Ledger",
    "4.Account-4.5.Ledger By Sales Order",

    "5.MIS Reports",
    "5.MIS Reports-5.01.Item QR Code Generator",
    "5.MIS Reports-5.02.Purchase Register",
    "5.MIS Reports-5.02a.Pending Order",
    "5.MIS Reports-5.03.Journal By Grn",
    "5.MIS Reports-5.04.Sales Register",
    "5.MIS Reports-5.05.Stock Register",
    "5.MIS Reports-5.06.Showroom wise Closing St.",
    "5.MIS Reports-5.06a.ShowroomClosing St.",

    "5.MIS Reports-5.07.Salesman Item Wise Sales Report",
    "5.MIS Reports-5.07a.brand wise report",
    "5.MIS Reports-5.08.Customer wise sales report",
    "5.MIS Reports-5.09.Reference item wise Sales",
    "5.MIS Reports-5.10.Reference wise sales report sales",
    "5.MIS Reports-5.11.Sales order by invoice",
    "5.MIS Reports-5.12.Outstanding By Invoice",
    "5.MIS Reports-5.13.Outstanding By Sales Order",
    "5.MIS Reports-5.13a.Outstanding By Purchase",
    "5.MIS Reports-5.13b.Opening Closing Stock Valuation",


    // "5.MIS Reports-5.13a.Outstanding By Invoice From Storage",
    "5.MIS Reports-5.14.Ledger Balance",
    "5.MIS Reports-5.15.Trial Balance",
    "5.MIS Reports-5.16.Trial Balance Opening Closing", 
    "5.MIS Reports-5.16.Profit & Loss",
    "5.MIS Reports-5.17.Balance Sheet",

    "6.Master",
    "6.Master-6.1.Item Details",
    "6.Master-6.2.Account",
    "6.Master-6.3.Customer",
    "6.Master-6.4.Customer Ledger",
    "6.Master-6.5.Vendor",
    "6.Master-6.5.1.vendor Ledger",
    "6.Master-6.6.References",
    "6.Master-6.7.Showroom / Warehouse",
    "6.Master-6.8.Users",
    "6.Master-6.9.Vehicle",
    "6.Master-6.10.Setting",
    "7.Tools",
    "7.Tools-7.1.Stock Movement",
    "7.Tools-7.2.Data Migration",
    "7.Tools-7.3.Ledger Storage",
    "7.Waste Managment",
    "7.Waste Managment-7.3.Waste Manager"
  ];
  let topLevelMenus = [
    "1.Dashboard",
    "2.Sales",
    "3.Procurement",
    "4.Account",
    "5.MIS Reports",
    "6.Master",
    "7.Tools",
    "7.Waste Managment",
  ];
  // const [selectedUser, setSelectedUser] = React.useState({
  //   name: "",
  //   role: "",
  //   role_id: "",
  //   email: "",
  //   mobile: "",
  // });
  const [error, setError] = React.useState({
    txt_name: false,
    txt_password: false,
    txt_email: false,
    txt_mobile: false,
    ddl_role_id: false,
    txt_Start_time: false,
    txt_End_time: false,
    ddl_role_label: false,
    ddl_weekDays: false,
  });

  const [addUser, setAddUser] = React.useState({
    edit: false,
    user_id: "",
    txt_name: "",
    txt_mobile: "",
    showroom_warehouse_id: "",
    txt_email: "",
    txt_password: "",
    ddl_role_id: "",
    txt_Start_time: "",
    txt_End_time: "",
    ddl_role_label: "Select Role",
    ddl_weekDays_id: "",
    ddl_weekDays_label: "Select Access",
    web_status: false,
    app_status: false,
    switch_active_status: false,
  });
  const [state, setState] = React.useState({
    edit: false,
    showAccess: false,
  });
  // const [accessTime, setAccessTime] = React.useState([]);
  const [accessTime, setAccessTime] = React.useState([]);

  //animation
  const [anim, setAnim] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    setState({ ...state });
    // get All Role
    getAllRole(
      (r) => {
        setAllRoles(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    getListShowroomWarehouse(
      (r) => {
        let arr = [];
        setAllShowroomWarehouse(r);
        r.map((s, i) => {
          arr.push({
            id: s.value,
            name: s.label,
            label: s.label,
            hidden: false,
            required: true,
            data_type: "string",
            html_element: "checkBox",
            error: false,
            xs: 4,
          });
        });
        setShowroomObject(arr);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );

    // get All Users
    getAllUsers(
      (r) => {
        setAllUsers(r);
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

    let arr2 = [];
    allPermissions.map((s, i) => {
      arr2.push({
        id: s,
        name: s,
        label: s,
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 6,
      });

      setMenuObject(arr2);
    });
  }, [refresh]);

  const onSetActive = (e) => {
    setAddUser((prv) => ({ ...prv, [e.target.name]: e.target.checked }));
  };

  const onSelectShowroom = (e, id) => {
    const currentIndex = showroomWarehouseId.indexOf(id);
    const newshowroomWarehouseId = [...showroomWarehouseId];

    if (currentIndex === -1) {
      newshowroomWarehouseId.push(id);
    } else {
      newshowroomWarehouseId.splice(currentIndex, 1);
    }
    setSelectShowroomWarehouse(newshowroomWarehouseId);
    // setSelectShowroom((prv) => ({ ...prv, [e.target.name]: e.target.checked }));
  };

  const onSelectRole = (v) => {
    if (v !== null) {
      setAddUser({
        ...addUser,
        ddl_role_id: v.value,
        ddl_role_label: v.label,
      });
    }
  };
  const onSelectAccess = (v) => {
    if (v !== null) {
      setAnim(false);
      setAddUser({
        ...addUser,
        ddl_weekDays_id: v.value,
        ddl_weekDays_label: v.label,
      });
    }
  };
  const headerData = [
    {
      id: "id",
      label: "#",
    },
    {
      id: "name",
      label: "Name",
    },
    {
      id: "role_name",
      label: "Role",
    },
    {
      id: "mobile",
      label: "Mobile",
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "status",
      label: "Status",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    {
      id: "action",
      label: "Action",
      align: "right",
      viewMenu: (v) => v,
    },
  ];

  const onChange = (e) => {
    const { value, name } = e.target;
    setAddUser({ ...addUser, [name]: value });
  };

  //console.log(accessTime, "sen=>0311")
  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (
      !addUser.txt_name ||
      !addUser.txt_email ||
      !addUser.txt_mobile ||
      !addUser.ddl_role_id ||
      // !addUser.txt_password||
      !accessTime
    ) {
      setError({
        txt_name: !addUser.txt_name,
        txt_email: !addUser.txt_email,
        txt_mobile: !addUser.txt_mobile,
        ddl_role_id: !addUser.ddl_role_id,
        ddl_weekDays: !addUser.ddl_weekDays_id,
        // txt_password: !addUser.txt_password ,
        // ddl_weekDays_label:!addUser.ddl_weekDays_label,
        txt_End_time: !addUser.txt_End_time,
        txt_Start_time: !addUser.txt_Start_time,
        app_status: !addUser.app_status,
        web_status: !addUser.web_status,
      });
      if (showroomWarehouseId.length === 0) {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: "Please Select Any Location",
            msgType: "Warning",
          },
        });
      }
    } else {
      if (addUser.edit) {
        if (!addUser.txt_password) {
          setError({ txt_password: !addUser.txt_password });
        } else {
        updateUser(
          showroomWarehouseId,
          addUser,
          accessTime,
          (r) => {
            onCloseModel();
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "User Updated Successfully",
                msgType: "success",
              },
            });
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
      } else {
        if (!addUser.txt_password) {
          setError({ txt_password: !addUser.txt_password });
        } else {
          postUser(
            showroomWarehouseId,
            addUser,
            globalState?.user?.serial_id,
            accessTime,
            (r) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: {
                  msg: "User added Successfully",
                  msgType: "success",
                },
              });
              onCloseModel();
              setRefresh(!refresh);
            },
            (err) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: { msg: err, msgType: "error" },
              });
              setButtonDisabled(true);
            }
          );
        }
      }
    }
  };

  // on User Update
  const onUserEdit = (row) => {
    //console.log(row, "sank2706edit");
    setClassicModal(true);
    setIsChangePasword(false);
    setSelectShowroomWarehouse(row.showroom_warehouse_id);
    setAccessTime(row?.weekDays);
    setAddUser({
      ...addUser,
      edit: true,
      user_id: row.user_id,
      txt_name: row.name,
      txt_mobile: row.mobile,
      txt_email: row.email,
      txt_password: '',
      ddl_role_id: row.role_id,
      ddl_role_label: row.role_name,
      txt_Start_time: row?.weekDays?.txt_Start_time,
      txt_End_time: row?.weekDays?.txt_End_time,
      ddl_weekDays_label: row?.weekDays?.ddl_weekDays_label,
      app_status: row?.weekDays?.app_status,
      web_status: row?.weekDays?.web_status,
      switch_active_status: row.status === "Y" ? true : false,
    });
  };

  // on Close Model
  const onCloseModel = () => {
    setShowPassword(false);
    setClassicModal(false);
    setSelectShowroomWarehouse([]);
    setSelectShowroom({});
    setAccessTime([]);
    setError({});
    setAddUser({
      ...addUser,
      edit: false,
      user_id: "",
      txt_name: "",
      txt_mobile: "",
      txt_email: "",
      txt_password: "",
      dd_role_id: 0,
      ddl_role_label: "Select Role",
      switch_active_status: false,
    });
  };

  const onDeleteUser = (row, next) => {
    deleteUser(
      row.user_id,
      (r) => {
        next();
        setRefresh(!refresh);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };

  const onClickUserAccess = (row) => {
    setUserAccessModel(true);
    setAddUser({
      ...addUser,
      edit: true,
      user_id: row.user_id,
      txt_name: row.name,
      txt_mobile: row.mobile,
      txt_email: row.email,
      // txt_password: row.password,
      ddl_role_id: row.role_id,
      ddl_role_label: row.role_name,
    });
    setAccessMenu(row.accessible_menus);
  };

  const onCloseUserAccessModel = () => {
    setUserAccessModel(false);
  };

  const onCheckingMenuItem = (item, e) => {
    //console.log("itema", item);
    let newAccessMenu = [...accessMenu];
    //console.log("new access menu", newAccessMenu);

    // checking for top level menu

    if (topLevelMenus.includes(item)) {
      if (!newAccessMenu.includes(item)) {
        let fl = allPermissions.filter((o) => o.indexOf(item) === 0);

        fl.map((f) => {
          if (newAccessMenu.includes(f))
            newAccessMenu = newAccessMenu.filter((o) => o !== f);
          newAccessMenu.push(f);
        });
      } else {
        newAccessMenu = newAccessMenu.filter((o) => o.indexOf(item) !== 0);
      }
    }

    // checking for submenu
    else if (item.indexOf("-") > -1) {
      let ind_levels = item.split("-");

      if (newAccessMenu.includes(ind_levels[0])) {
        const currentIndex = newAccessMenu.indexOf(ind_levels[0]);
        newAccessMenu.splice(currentIndex, 1);
      }

      if (newAccessMenu.includes(item)) {
        const currentIndex = newAccessMenu.indexOf(item);
        newAccessMenu.splice(currentIndex, 1);
      } else {
        newAccessMenu.push(item);
        let allSubMenus = allPermissions.filter(
          (o) => o.indexOf(ind_levels[0]) === 0 && o.indexOf("-") > -1
        );
        if (allSubMenus.every((val) => newAccessMenu.includes(val))) {
          newAccessMenu.push(ind_levels[0]);
        }
      }
    } else {
      const currentIndex = newAccessMenu.indexOf(item);

      if (currentIndex === -1) {
        newAccessMenu.push(item);
      } else {
        newAccessMenu.splice(currentIndex, 1);
      }
    }

    setAccessMenu(newAccessMenu);
  };

  const showAccessMenu = (e) => {
    e.preventDefault();
    //console.log("Access menu", accessMenu);

    updateUserMenuAccess(
      accessMenu.sort(),
      addUser,
      (r) => {
        onCloseModel();
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: {
            msg: "User Updated Successfully",
            msgType: "success",
          },
        });
        setRefresh(!refresh);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    setUserAccessModel(false);
  };

  const onAddAccess = () => {
    setState((prv) => ({ ...prv, showAccess: true }));
  };

  const onClickAdd = (e) => {
    setAnim(true);

    // //console.log(Number((addUser.txt_Start_time).split(':').join('')), "sen0411")
    if (
      !addUser.txt_Start_time ||
      !addUser.txt_End_time ||
      !addUser.ddl_weekDays_id ||
      (!addUser.app_status && !addUser.web_status)
    ) {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Select All ", msgType: "error" },
      });
      setError({
        ddl_weekDays: !addUser.ddl_weekDays_id,
        txt_End_time: !addUser.txt_End_time,
        txt_Start_time: !addUser.txt_Start_time,
        app_status: !addUser.app_status,
        web_status: !addUser.web_status,
      });
    } else {
      // setAccessTime([
      //   ...accessTime,
      //   {
      //     ddl_weekDays_id: addUser.ddl_weekDays_id,
      //     ddl_weekDays_label: addUser.ddl_weekDays_label,
      //     txt_End_time: timeToUnix(addUser.txt_End_time),
      //     txt_Start_time: timeToUnix(addUser.txt_Start_time),
      //     app_status: addUser.app_status,
      //     web_status: addUser.web_status,
      //   },
      // ]);

      setAccessTime([
        ...accessTime,
        {
          ddl_weekDays_id: addUser.ddl_weekDays_id,
          ddl_weekDays_label: addUser.ddl_weekDays_label,
          txt_End_time: Number((addUser.txt_End_time).split(':').join('')),
          txt_Start_time: Number((addUser.txt_Start_time).split(':').join('')),
          app_status: addUser.app_status,
          web_status: addUser.web_status,
        },
      ]);
      setError({
        ddl_weekDays: false,
        txt_End_time: false,
        txt_Start_time: false,
        app_status: false,
        web_status: false,
      });
    }
  };

  const onDelete = (row, id) => {
    //console.log(row, "sank2706");
    //console.log(id, "sank2706");

    let deleteref = accessTime;
    deleteref.splice(id, 1);

    dispatch({
      type: actionTypes.SET_OPEN_MSG,
      payload: { msg: "Deleted!!!!", msgType: "error" },
    });
  };

  // const onEdit = (row) => {

  //   setAccessTime({
  //     ...accessTime,
  //     edit: true,
  //     ddl_weekDays_id:addUser.ddl_weekDays_id,
  //     ddl_weekDays_label:addUser.ddl_weekDays_label,
  //     txt_End_time:addUser.txt_End_time,
  //     txt_Start_time:addUser.txt_Start_time,
  //     app_status:addUser.app_status,
  //     web_status:addUser.web_status,
  //   });
  // };

  const formData = {
    formName: "Add a User",
    fields: [
      {
        name: "txt_name",
        label: "Name",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "TextField",
        error: false,
        xs: 6,
      },
      {
        name: "ddl_role",
        label: "Role",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "select",
        error: false,
        options: allRoles,
        xs: 6,
      },
      {
        name: "txt_mobile",
        label: "Mobile",
        hidden: false,
        required: true,
        maxLength: 10,
        data_type: "tel",
        html_element: "TextField",
        error: false,
        xs: 6,
      },
      {
        name: "txt_email",
        label: "Email",
        hidden: false,
        required: true,
        type: "email",
        data_type: "email",
        html_element: "TextField",
        error: false,
        xs: 6,
      },
      {
        name: "",
        label: "Select Location",
        hidden: false,
        required: true,
        type: "",
        data_type: "",
        html_element: "Label",
        error: false,
        xs: 12,
      },
      ...showroomObject,
      {
        name: "txt_password",
        label: "Password",
        hidden: false,
        required: true,
        data_type: "password",
        html_element: "password",
        error: false,
        xs: 12,
      },
      // {
      //   name: "ddl_access",
      //   label: "Access",
      //   hidden: false,
      //   required: true,
      //   data_type: "string",
      //   html_element: "select_two",
      //   error: false,
      //   options: accessOption,
      //   xs: 12,
      // },
      {
        name: "ddl_weekDays",
        label: " WeekDays",
        hidden: false,
        required: true,
        type: "",
        data_type: "string",
        html_element: "select_two",
        error: false,
        options: weekDays,
        xs: 3,
      },
      // ...weekDays,

      {
        name: "txt_Start_time",
        label: " start Time",
        hidden: false,
        required: false,
        align: "left",
        data_type: "time",
        html_element: "TextField",
        error: false,
        xs: 1.5,
      },
      {
        name: "txt_End_time",
        label: " End Time",
        hidden: false,
        required: false,
        data_type: "time",
        html_element: "TextField",
        error: false,
        xs: 1.5,
      },
      {
        name: "web_status",
        label: " Web",
        hidden: false,
        required: true,
        type: "",

        data_type: "string",
        html_element: "switch_for_access",
        error: false,
        xs: 1.5,
      },
      {
        name: "app_status",
        label: " App",
        hidden: false,
        required: true,
        align: "right",
        type: "",
        data_type: "string",
        html_element: "switch_for_access",
        error: false,

        xs: 1.5,
      },
      {
        name: "",
        label: " Button",
        hidden: false,
        required: true,

        type: "",
        data_type: "button",
        html_element: "button",
        error: false,
      },

      // {
      //   name: "txt_time",
      //   label: "Time",
      //   hidden: false,
      //   required: true,
      //   type: "time",
      //   data_type: "time",
      //   html_element: "TextField",
      //   error: false,
      //   xs: 5,
      //   align:"left"
      // },
      {
        name: "switch_active_status",
        label: "Active Status",
        defaultValue: false,
        required: false,
        data_type: "string",
        html_element: "switch",
        error: false,
      },
    ],
  };

  const formData2 = {
    formName: "Grant Permissions",
    fields: [
      {
        id: "1.Dashboard",
        name: "Dashboard",
        label: "Dashboard",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        fontWeight: "bold",
        xs: 12,
      },
      {
        id: "2.Sales",
        name: "Sales",
        label: "Sales",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 12,
      },

      {
        id: "2.Sales-2.1.Enquiry",
        name: "Sales-Enquiry",
        label: "Enquiry",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "2.Sales-2.2.Quotation",
        name: "Sales-Quotation",
        label: "Quotation",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "2.Sales-2.3.Sales Order",
        name: "Sales-Sales Order",
        label: "Sales Order",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "2.Sales-2.4.Delivery Order",
        name: "Sales-Delivery Order",
        label: "Delivery Order",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "2.Sales-2.5.Dispatch Order",
        name: "Sales-Dispatch Order",
        label: "Dispatch Order",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "2.Sales-2.6.Invoices",
        name: "Sales-Invoices",
        label: "Invoices",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },

      {
        id: "2.Sales-2.8.Return Delivery Order",
        name: "Sales-Return Delivery Order",
        label: " Return Delivery Order",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "2.Sales-2.9.Return Dispatch Order",
        name: "Sales-Return Dispatch Order",
        label: "Return Dispatch Order",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },

      {
        id: "3.Procurement",
        name: "Procurement",
        label: " Procurement",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 12,
      },
      {
        id: "3.Procurement-3.1.Direct Purchase",
        name: "Procurement-Direct Purchase",
        label: " Direct Purchase",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "3.Procurement-3.2.Purchase Order",
        name: "Procurement-Purchase Order",
        label: " Purchase Order",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "3.Procurement-3.3.Item Received",
        name: "Procurement-Item Received",
        label: " Item Received",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "3.Procurement-3.4.Purchase Return",
        name: "Procurement-Purchase Return",
        label: " Purchase Return",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },

      {
        id: "3.Procurement-3.5.Stock Transfer",
        name: "Procurement-Stock Transfer",
        label: " Stock Transfer",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },

      {
        id: "4.Account",
        name: "Account",
        label: " Account",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 12,
      },
      {
        id: "4.Account-4.1.Receipt",
        name: "Account-Receipt",
        label: " Receipt",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "4.Account-4.2.Payment",
        name: "Account-Payment",
        label: " Payment",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "4.Account-4.3.Journal",
        name: "Account-Journal",
        label: " Journal",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "4.Account-4.4.Ledger",
        name: "Account-Ledger",
        label: " Ledger",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "4.Account-4.5.Ledger By Sales Order",
        name: "Account-Ledger",
        label: "Ledger By Sales Order",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports",
        name: "MIS Reports",
        label: "MIS Reports",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 12,
      },
      {
        id: "5.MIS Reports-5.01.Item QR Code Generator",
        name: "MIS Reports-Item QR Code Generator",
        label: "Item QR Code Generator",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.02.Purchase Register",
        name: "MIS Reports-Purchase Register",
        label: "Purchase Register",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
       {
        id: "5.MIS Reports-5.02a.Pending Order",
        name: "MIS Reports-Pending Order",
        label: "Pending Order",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
     
      {
        id: "5.MIS Reports-5.03.Journal By Grn",
        name: "MIS Reports-Journal By Grn",
        label: "Journal By Grn",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.04.Sales Register",
        name: "MIS Reports-Sales Register",
        label: "Sales Register",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.05.Stock Register",
        name: "MIS Reports-Stock Register",
        label: "Stock Register",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      // {
      //   id: "MIS Reports-Showroom Wise Sales",
      //   name: "MIS Reports-Showroom Wise Sales",
      //   label: "Showroom Wise Sales",
      //   hidden: false,
      //   required: true,
      //   data_type: "string",
      //   html_element: "checkBox",
      //   error: false,
      //   xs: 3,
      // },
      {
        id: "5.MIS Reports-5.06.Showroom wise Closing St.",
        name: "MIS Reports-Showroom wise Closing St.",
        label: "Showroom wise Closing St.",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.06a.ShowroomClosing St.",
        name: "MIS Reports-ShowroomClosing St.",
        label: "ShowroomClosing St.",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.07.Salesman Item Wise Sales Report",
        name: "MIS Reports-Salesman item wise Sales Report",
        label: "Salesman item wise Sales",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.07a.brand wise report",
        name: "MIS Reports-Brand Wise Report",
        label: "Brand Wise Report",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.08.Customer wise sales report",
        name: "MIS Reports-Customer wise sales report",
        label: "Customer wise sales report",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.09.Reference item wise Sales",
        name: "MIS Reports-Reference item wise Sales",
        label: "Reference item wise Sales",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.10.Reference wise sales report sales",
        name: "MIS Reports-Reference wise sales report sales",
        label: "Reference wise sales report",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },

      {
        id: "5.MIS Reports-5.11.Sales order by invoice",
        name: "MIS Reports-Sales order by invoice",
        label: "Sales order by invoice",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.12.Outstanding By Invoice",
        name: "MIS Reports-Outstanding By Invoice",
        label: "Outstanding By Invoice",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.13.Outstanding By Sales Order",
        name: "MIS Reports-Outstanding By Sales Order",
        label: "Outstanding By Sales Order",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.13a.Outstanding By Purchase",
        name: "MIS Reports-Outstanding By Purchase",
        label: "Outstanding By Purchase",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id:  "5.MIS Reports-5.13b.Opening Closing Stock Valuation",
        name: "MIS Reports-Opening Closing Stock Valuation",
        label: "Opening Closing Stock Valuation",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      // {
      //   id: "5.MIS Reports-5.13a.Outstanding By Invoice From Storage",
      //   name: "MIS Reports-Outstanding By Invoice From Storage",
      //   label: "Outstanding By Invoice From Storage",
      //   hidden: false,
      //   required: true,
      //   data_type: "string",
      //   html_element: "checkBox",
      //   error: false,
      //   xs: 3,
      // },
      
      {
        id: "5.MIS Reports-5.14.Ledger Balance",
        name: "MIS Reports-Ledger Balance",
        label: "Ledger Balance",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.15.Trial Balance",
        name: "MIS Reports-Trial Balance",
        label: "Trial Balance",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.16.Trial Balance Opening Closing",
        name: "MIS Reports-Trial Balance Opening Closing",
        label: "Trial Balance Opening Closing",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.16.Profit & Loss",
        name: "MIS Reports-Profit & Loss",
        label: "Profit & Loss",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "5.MIS Reports-5.17.Balance Sheet",
        name: "MIS Reports-Balance Sheet",
        label: "Balance Sheet",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "6.Master",
        name: "Master",
        label: "Master",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 12,
      },
      {
        id: "6.Master-6.1.Item Details",
        name: "Master-Item Details",
        label: "Item Details",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "6.Master-6.2.Account",
        name: "Master-Account",
        label: "Account ",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "6.Master-6.3.Customer",
        name: "Master-Customer",
        label: "Customer ",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "6.Master-6.4.Customer Ledger",
        name: "Master-Customer Ledger",
        label: "Customer Ledger ",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },

      {
        id: "6.Master-6.5.Vendor",
        name: "Master-Vendor",
        label: "Vendor ",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "6.Master-6.5.1.vendor Ledger",
        name: "Master-Vendor Ledger",
        label: "Vendor Ledger",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "6.Master-6.6.References",
        name: "Master-References",
        label: "Item ",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "6.Master-6.7.Showroom / Warehouse",
        name: "Master-Showroom / Warehouse",
        label: "Showroom / Warehouse ",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "6.Master-6.8.Users",
        name: "Master-Users",
        label: "Users ",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "6.Master-6.9.Vehicle",
        name: "Master-Vehicle",
        label: "Vehicle ",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "6.Master-6.10.Setting",
        name: "Master-Setting",
        label: "Setting ",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "7.Tools",
        name: "Tools",
        label: "Tools ",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 12,
      },

      {
        id: "7.Tools-7.1.Stock Movement",
        name: "Tools-Stock Movement",
        label: "Stock Movement ",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "7.Tools-7.2.Data Migration",
        name: "Tools-Data Migration",
        label: "Data Migration ",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
      {
        id: "7.Tools-7.3.Ledger Storage",
        name: "Tools-Ledger Storage",
        label: "Ledger Storage",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },    

      {
        id:"7.Waste Managment",
        name: "Stock Journal",
        label: "Stock Journal",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 12,
      },
      {
        id: "7.Waste Managment-7.3.Waste Manager",
        name: "Waste Managment-Waste Manager",
        label: "Waste Manager",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "checkBox",
        error: false,
        xs: 3,
      },
    ],
  };


  const onhandleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
  
    const titleRow = worksheet.addRow(['Report Name : Users List ']);
    const periodRow = worksheet.addRow(['']);
    worksheet.addRow([]);
  
    const titleCell = titleRow.getCell(1);
    const periodCell = periodRow.getCell(1);
    titleCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
    periodCell.alignment = { vertical: 'middle', horizontal: 'center', bold: true };
  
    worksheet.mergeCells(`A${titleRow.number}:F${titleRow.number}`);
    worksheet.mergeCells(`A${periodRow.number}:F${periodRow.number}`);
  
    const headers = [
      'Sl No',
      'Name',
      'Role',
      'Mobile',
      'Email',      
      'Status',
      
    
    ];
  
    // Add headers as a row
    worksheet.addRow(headers);
  
    const UsersTable = allUsers.map((acc) => {
      return {
        ID: acc.id,
        Name: acc.name,
        Role: acc.role_name,
        Mobile: acc.mobile,
        Email: acc.email,
        Status: acc.status,
      };
    });
  
    const dataStartRow = 4;
  
    const headerRow = worksheet.getRow(dataStartRow);
    headerRow.height = 20;
  
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = header.length + 5;
    });
  
    UsersTable.forEach((data) => {
      worksheet.addRow(Object.values(data));
    });
  
    headerRow.font = { bold: true };
    headerRow.eachCell((cell, colNumber) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'cce6ff' } };
    });
  
    worksheet.eachRow({ startingRow: dataStartRow + 1 }, (row, rowNumber) => {});
  
    worksheet.autoFilter = {
      from: {
        row: dataStartRow,
        column: 1,
      },
      to: {
        row: dataStartRow,
        column: headers.length,
      },
    };


  

  
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, 'Users List.xlsx');
  };



  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Users"
        btnToolTip="Add New User"
        onClickAddBtn={() => {
          setClassicModal(true);
          setIsChangePasword(true);
        }}
      />
      <>
        <GridContainer className={classes.root}>
          <MasterModel
            classicModal={classicModal}
            onCloseModel={onCloseModel}
            width={750}
            height="auto"
            okBtnText="Submit"
            modelName={addUser.edit ? "Edit User" : "Add a User"}
            onClickOk={onSubmitModel}
            disabled={buttonDisabled}
          >
            <div style={{ padding: "20px 10px", width: "100%" }}>
              <GridContainer>
                {formData.fields.map((item, key) => {
                  return (
                    <>
                      <GridItem
                        xs={item.xs}
                        md={item.md}
                        lg={item.lg}
                        key={key}
                      >
                        {item.html_element === "select" && (
                          <>
                            <InputLabel id="label">{item.label}</InputLabel>
                            <Select
                              options={item.options}
                              placeholder="Select Module"
                              formatGroupLabel={(d) => d.label}
                              className={classes.customSelect}
                              onChange={onSelectRole}
                              menuPortalTarget={document.body}
                              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                              value={{
                                value: addUser.ddl_role_id,
                                label: addUser.ddl_role_label,
                              }}
                            />
                            {error.ddl_role_id && (
                              <div className={classes.ddlError}>
                                {item.label} is Required
                              </div>
                            )}
                          </>
                        )}
                        {item.html_element === "select_two" && (
                          <>
                            <InputLabel id="label">{item.label}</InputLabel>
                            <Select
                              options={item.options}
                              placeholder="Select Module"
                              formatGroupLabel={(d) => d.label}
                              className={classes.customSelect}
                              onChange={onSelectAccess}
                              error={error[item.name]}
                              menuPortalTarget={document.body}
                              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                              value={{
                                value: addUser.ddl_weekDays_id,
                                label: addUser.ddl_weekDays_label,
                              }}
                            />
                            {error.ddl_weekDays && (
                              <div className={classes.ddlError}>
                                {item.label} is Required
                              </div>
                            )}
                          </>
                        )}
                        {item.html_element === "TextField" && (
                          <>
                            <InputLabel required={item.required} id="label">
                              {item.label}
                            </InputLabel>
                            <TextField
                              required={item.required}
                              size="small"
                              placeholder={item.label}
                              name={item.name}
                              type={item.data_type}
                              inputProps={{
                                maxLength: item.maxLength,
                                max: item.maxLength,
                              }}
                              onChange={onChange}
                              error={error[item.name]}
                              FormHelperTextProps={{
                                style: { textAlign: "right" },
                              }}
                              helperText={
                                error[item.name]
                                  ? item.label + " is required"
                                  : ""
                              }
                              id="outlined-basic"
                              fullWidth={true}
                              value={addUser[item.name]}
                              variant="outlined"
                            />
                          </>
                        )}

                        {/* {item.html_element === "password" &&
                          addUser.edit === true &&
                          (isChangePassword ? (
                            <>
                              <InputLabel
                                style={{ marginTop: 15 }}
                                required={!addUser.edit && item.required}
                                id="label"
                              >
                                {item.label}
                              </InputLabel>
                              <TextField
                                required={!addUser.edit && item.required}
                                size="small"
                                placeholder={item.label}
                                name={item.name}
                                error={error[item.name]}
                                FormHelperTextProps={{
                                  style: { textAlign: "right" },
                                }}
                                helperText={
                                  error[item.name]
                                    ? item.label + " is required"
                                    : ""
                                }
                                type={showPassword ? "text" : "password"}
                                onChange={onChange}
                                InputProps={{
                                  // <-- This is where the toggle button is added.
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                      >
                                        {showPassword ? (
                                          <Visibility />
                                        ) : (
                                          <VisibilityOff />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                id="outlined-basic"
                                fullWidth={true}
                                value={addUser[item.name]}
                                variant="outlined"
                              />
                            </>
                          ) : (
                            <>
                              <InputLabel style={{ marginTop: 15 }} id="label">
                                Change {item.label}
                              </InputLabel>
                              <TextField
                                size="small"
                                placeholder={item.label}
                                type={"password"}
                                InputProps={{
                                  // <-- This is where the toggle button is added.
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Box
                                        onClick={() => setIsChangePasword(true)}
                                        color={appDefaultColor}
                                        style={{ cursor: "pointer" }}
                                      >
                                        Change Password
                                      </Box>
                                    </InputAdornment>
                                  ),
                                }}
                                id="outlined-basic"
                                fullWidth={true}
                                value={"password"}
                                variant="outlined"
                              />
                            </>
                          ))} */}


{item.html_element === "password" &&
                          (isChangePassword ? (
                            <>
                              <InputLabel
                                style={{ marginTop: 15 }}
                                required={!addUser.edit && item.required}
                                id="label"
                              >
                                {item.label}
                              </InputLabel>
                              <TextField
                                required={!addUser.edit && item.required}
                                size="small"
                                placeholder={item.label}
                                name={item.name}
                                error={error[item.name]}
                                FormHelperTextProps={{
                                  style: { textAlign: "right" },
                                }}
                                helperText={
                                  error[item.name]
                                    ? item.label + " is required"
                                    : ""
                                }
                                type={showPassword ? "text" : "password"}
                                onChange={onChange}
                                InputProps={{
                                  // <-- This is where the toggle button is added.
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                      >
                                        {showPassword ? (
                                          <Visibility />
                                        ) : (
                                          <VisibilityOff />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                id="outlined-basic"
                                fullWidth={true}
                                value={addUser[item.name]}
                                variant="outlined"
                              />
                            </>
                          ) : (
                            <>
                              <InputLabel style={{ marginTop: 15 }} id="label">
                                Change {item.label}
                              </InputLabel>
                              <TextField
                                size="small"
                                placeholder={item.label}
                                type={"password"}
                                InputProps={{
                                  // <-- This is where the toggle button is added.
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Box
                                        onClick={() => setIsChangePasword(true)}
                                        color={appDefaultColor}
                                        style={{ cursor: "pointer" }}
                                      >
                                        Change Password
                                      </Box>
                                    </InputAdornment>
                                  ),
                                }}
                                id="outlined-basic"
                                fullWidth={true}
                                value={"password"}
                                variant="outlined"
                              />
                            </>
                          ))}

                        {item.html_element === "Label" && (
                          <>
                            <InputLabel
                              // style={{ marginTop: 15 }}
                              required={item.required}
                              id="label"
                            >
                              {item.label}
                            </InputLabel>
                          </>
                        )}

                        {item.html_element === "checkBox" && (
                          <>
                            <div className={classes.checkboxAndRadio}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    className={classes.checkbox}
                                    onClick={(e) =>
                                      onSelectShowroom(e, item.id)
                                    }
                                    checked={
                                      showroomWarehouseId.indexOf(item.id) !==
                                      -1
                                    }
                                    // checked={
                                    //   selectedShowRoom[
                                    //     `${item.name}_${item.id}`
                                    //   ]
                                    // }
                                    // name={`${item.name}_${item.id}`}
                                    // value={
                                    //   selectedShowRoom[
                                    //     `${item.name}_${item.id}`
                                    //   ]
                                    //     ? selectedShowRoom[
                                    //         `${item.name}_${item.id}`
                                    //       ]
                                    //     : false
                                    // }
                                    color="primary"
                                    checkedIcon={
                                      <Check className={classes.checkedIcon} />
                                    }
                                    icon={
                                      <Check
                                        className={classes.uncheckedIcon}
                                      />
                                    }
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
                                label={item.label}
                              />
                            </div>
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
                              fullWidth={true}
                              value={addUser[item.name]}
                              variant="outlined"
                            />
                          </>
                        )}
                        {item.html_element === "switch" && (
                          <>
                            <span className={classes.activeText}>
                              {item.label}
                            </span>
                            <Switch
                              onClick={onSetActive}
                              checked={addUser[item.name]}
                              name={item.name}
                              fullWidth={true}
                              inputProps={{
                                "aria-label": "primary checkbox",
                              }}
                              color="primary"
                            />
                          </>
                        )}
                        {item.html_element === "switch_for_access" && (
                          <>
                            <div
                              style={{
                                // border:"solid",borderColor:"black" ,
                                marginTop: "20px",
                              }}
                            >
                              <span className={classes.activeText}>
                                {item.label}
                              </span>
                              <Switch
                                onClick={onSetActive}
                                checked={addUser[item.name]}
                                name={item.name}
                                fullWidth={true}
                                inputProps={{
                                  "aria-label": "primary checkbox",
                                }}
                                color="primary"
                              />
                            </div>
                            {error.web_status && error.app_status && (
                              <div className={classes.ddlError}>
                                {item.label} Atlest One Access Is Required
                              </div>
                            )}
                          </>
                        )}
                        {item.html_element === "button" && (
                          <>
                            {/* <span className={classes.activeText}>
                             
                            </span> */}
                            <CircleAddBtnAnim
                              title="Add"
                              // style={{
                              //   border:"solid",borderColor:"black" ,
                              //   marginTop:"20px",
                              //   width:"30px",
                              //   height:"30px",
                              //   float:"right"
                              // }}
                              // title={btnToolTip}
                              onClick={onClickAdd}
                              anim={anim}
                            />
                          </>
                        )}
                      </GridItem>
                    </>
                  );
                })}
              </GridContainer>
            </div>
            <CustomCard>
              <TableContainer>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">#</StyledTableCell>
                      <StyledTableCell align="left">WeekDay</StyledTableCell>
                      <StyledTableCell align="right">
                        Start Time
                      </StyledTableCell>
                      <StyledTableCell align="right">End Time</StyledTableCell>
                      <StyledTableCell align="right">Web</StyledTableCell>
                      <StyledTableCell align="right">App</StyledTableCell>
                      <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accessTime &&
                      accessTime.map((row, i) => (


                        <StyledTableRow key={i}>
                          <StyledTableCell
                            align="center"
                            className={classes.id}
                          >
                            {row.length != 0 ? i + 1 : ""}
                          </StyledTableCell>

                          <StyledTableCell
                            align="left"
                            className={classes.ledger}
                          >
                            {row.ddl_weekDays_label}
                          </StyledTableCell>

                          <StyledTableCell
                            align="right"
                            className={classes.debit}
                          >
                            {
                              row.txt_Start_time === 0 ?
                                "00:00"
                                :
                                row.txt_Start_time % 100 === 0 ?
                                  (row.txt_Start_time / 100).toString().replace(".", ":") + ":00"
                                  :
                                  row.txt_Start_time % 10 === 0 ?
                                    (row.txt_Start_time / 100).toString().replace(".", ":") + "0"
                                    :
                                    (row.txt_Start_time / 100).toString().replace(".", ":")
                            }
                          </StyledTableCell>
                          {/* {//console.log("sen0511", row.txt_End_time % 100)} */}
                          <StyledTableCell
                            align="right"
                            className={classes.credit}
                          >
                            {

                              row.txt_End_time === 0 ?
                                "00:00"
                                :
                                row.txt_End_time % 100 === 0 ?
                                  (row.txt_End_time / 100).toString().replace(".", ":") + ":00"
                                  :
                                  row.txt_End_time % 10 === 0 ?
                                    (row.txt_End_time / 100).toString().replace(".", ":") + "0"
                                    :
                                    (row.txt_End_time / 100).toString().replace(".", ":")
                            }
                          </StyledTableCell>

                          <StyledTableCell
                            align="right"
                            className={classes.credit}
                          >
                            {row.web_status === true ? (
                              <DoneIcon style={{ color: "green" }} />
                            ) : (
                              <CloseIcon style={{ color: "red" }} />
                            )}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className={classes.credit}
                          >
                            {row.app_status === true ? (
                              <DoneIcon style={{ color: "green" }} />
                            ) : (
                              <CloseIcon style={{ color: "red" }} />
                            )}
                          </StyledTableCell>

                          <StyledTableCell
                            align="right"
                            className={classes.credit}
                          >
                            <IconButton
                              onClick={(e) => onDelete(row, i)}
                              aria-label="delete"
                              className={classes.credit}
                            >
                              <DeleteIcon
                                fontSize="small"
                                style={{ color: "#f44336" }}
                              />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CustomCard>
          </MasterModel>

          <MasterModel
            classicModal={userAccessModel}
            onCloseModel={onCloseUserAccessModel}
            width={800}
            height="auto"
            okBtnText="Grant"
            modelName="Grant User Access"
            onClickOk={(e) => showAccessMenu(e)}
          >
            <div style={{ padding: "20px 10px", width: "100%" }}>
              <GridContainer>
                {formData2.fields.map((item, key) => {
                  return (
                    <>
                      {/* <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                          </Typography>
                        </AccordionDetails>
                      </Accordion> */}
                      <GridItem
                        xs={item.xs}
                        md={item.md}
                        lg={item.lg}
                        // fontWeight={item.fontWeight}
                        key={key}
                      >
                        {item.html_element === "checkBox" && (
                          <>
                            <CustomCard style={{ float: 'left', display: 'flex', }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    className={classes.checkbox}
                                    onClick={(e) =>
                                      onCheckingMenuItem(item.id, e)
                                    }
                                    checked={accessMenu.indexOf(item.id) !== -1}
                                    color="primary"
                                    checkedIcon={
                                      <Check className={classes.checkedIcon} />
                                    }
                                    icon={
                                      <Check
                                        className={classes.uncheckedIcon}
                                      />
                                    }
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
                                label={item.label}

                              />
                              {/* <>
                              <b>{item.label}</b>
                              </> */}
                            </CustomCard>
                          </>
                        )}
                      </GridItem>
                    </>
                  );
                })}
              </GridContainer>
            </div>
          </MasterModel>

          <GridItem xs="12">
            {loading ? (
              <Box mt={10} width="100%" textAlign="center">
                <CircularProgress />
              </Box>
            ) : (
              <Card className={classes1.headerCard}>
                <CardHeader
                  className={classes1.TbheaderCdhd}
                  style={{ height: 60 }}
                >
                  <GridContainer
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <GridItem>
                      <h4 className={classes1.headerCdTitle}>Users</h4>
                    </GridItem>
                    {globalState.user.user_role !== "Admin" ? ( 
                    <GridItem style={{ cursor: "pointer",display: "none"  }}>
                      <IconButton
                        variant="text"
                        onClick={() => onhandleExportToExcel(allUsers)}
                      >
                        <Tooltip title="Export to Excel">
                          <img
                            src={require("../../assets/img/excel.png").default}
                          />
                        </Tooltip>
                      </IconButton>
                    </GridItem>
                    ):(
                      <GridItem style={{ cursor: "pointer" }}>
                      <IconButton
                        variant="text"
                        onClick={() => onhandleExportToExcel(allUsers)}
                      >
                        <Tooltip title="Export to Excel">
                          <img
                            src={require("../../assets/img/excel.png").default}
                          />
                        </Tooltip>
                      </IconButton>
                    </GridItem>
                    )}
                  </GridContainer>
                </CardHeader>
                <CardBody
                  style={{ height: "auto", maxHeight: 480, padding: 10 }}
                  className={clxs(classes.customScroolBar)}
                >
                  <MuiTable
                    onClickEdit={onUserEdit}
                    onClickDelete={onDeleteUser}
                    onClickUserAccess={onClickUserAccess}
                    columns={headerData}
                    rows={allUsers}
                  />
                </CardBody>
              </Card>
            )}
          </GridItem>

          {/* Currently not in use and the calling function are commented in bottom  */}
        </GridContainer>
      </>
    </ThemeProvider>
  );
};

export default AddAssociatePage;
