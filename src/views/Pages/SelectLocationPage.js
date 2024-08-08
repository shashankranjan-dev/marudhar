import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { getListShowroomWarehouse } from "../../services/showroomWarehouseService";

// for lis
import { Input, Box, Grid, Typography } from "@material-ui/core";

import { ThemeProvider, FormControlLabel } from "@material-ui/core";

import theme from "../../theme/theme";
import { appDefaultColor } from "assets/jss/material-dashboard-pro-react";
import Select from "react-select";
import { useStateValue } from "../../context/context";
import { actionTypes } from " ../../context/reducer";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
import CustomButton from "../Components/CustomButton";
import { useHistory } from "react-router-dom";
import cls from "classnames";
import LoginSideBg from "../../assets/applogo/loginSideBg.jpg";

// //////////////////////
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";

import { Paper, InputLabel } from "@material-ui/core";
// /////////////////

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import MarudharImg from "../../assets/applogo/marudhar-name.png";

import { Checkbox } from "@material-ui/core";

import { decodeToken, useJwt, isExpired } from "react-jwt";
import SnakebarMsg from "views/Pages/HelperComponent/SnakebarMsg";
import { UserLogOut } from "../../services/AuthService";
// import Snackbar from "../../components/Snackbar";

const useStyles = makeStyles(styles);

const formStyle = makeStyles((theme) => ({
  paper: {
    maxWidth: "500px",
    borderRadius: 0,
  },
  centerLogin: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft:100,
  },
  forgotPaper: {
    borderRadius: 0,
  },
  btnCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mutedText: {
    marginTop: 10,
    marginBottom: 30,
    color: "#777",
    fontSize: 17,
  },
  loginLabel: {
    marginBottom: -3,
    fontSize: "16px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: appDefaultColor,
  },
  form: {},
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const option = [
  {
    value: "a",
    label: "2021-2022"
  },
  {
    value: "b",
    label: "2022-2023"
  },
  {
    value: "c",
    label: "2023-2024"
  }

]

export default function LoginPage() {
  const [globalState, dispatch] = useStateValue();
  const history = useHistory();
  // const [decodeToken, setMyDecodeToken] = React.useState();
  const classes = useStyles();
  const formClasses = formStyle();

  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState({});

  const [selectedFinancialYear, setSelectedFinancialYear] = React.useState({});

  const [showroomObject, setShowroomObject] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  // React.useEffect(() => {
  //   let id = setTimeout(function () {
  //     setCardAnimation("");
  //   }, 700);
  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     window.clearTimeout(id);
  //   };
  // });

  // select Add Items
  const onSelect = (info, v) => {

    // console.log(info.name, "sen16012023", v)

    // if (info.name === "ddl_select_year") {
    //   setSelectedFinancialYear({ [info.name]: v })
    // }
    // else {
      setSelectedLocation({ [info.name]: v });
    // }
  };

  React.useEffect(() => {
    if (localStorage.getItem("user_token")) {
      const myDecodeToken = decodeToken(localStorage.getItem("user_token"));
      if (myDecodeToken?.showroom_warehouse_id) {
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
  }, []);

  const onClickSubmit = (e) => {
    e.preventDefault();


    if (!selectedLocation["ddl_select_location"]) {
      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: { msg: "Please Select any Location", msgType: "warning" },
      });
    } else {
      dispatch(
        {
        type: actionTypes.SET_USER_LOCATION,
        payload: {
          showroom_warehouse_id: selectedLocation["ddl_select_location"].value,
          stock: "",
        },
      },
      );
      // dispatch({
      //   type: actionTypes.SET_FINANCIAL,
      //   payload: {
      //     year: selectedFinancialYear["ddl_select_year"].label,
      //   },
      // })
      // localStorage.setItem(
      //   "financial",
      //   selectedFinancialYear["ddl_select_year"].label
      // );
      localStorage.setItem(
        "user_location",
        JSON.stringify(selectedLocation["ddl_select_location"].value)
      );
      sessionStorage.setItem(
        "user_location",
        JSON.stringify(selectedLocation["ddl_select_location"].value)
      );
      // window.location.reload();
    }
  };

  const onClickLogout = () => {
    UserLogOut(() => {
      history.push("/");
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <SnakebarMsg
          open={globalState.isOpenMsg.open}
          msg={globalState.isOpenMsg.msg}
          msgType={globalState.isOpenMsg.msgType}
        />
        <GridContainer className={classes.loginPage}>
          <Box
            mt={2}
            textAlign="right"
            style={{ position: "absolute", right: 40, top: 10 }}
          >
            <CustomButton
              type="submit"
              onClick={onClickLogout}
              height={40}
              width={100}
              fullWidth
              variant="contained"
              color="primary"
              className={formClasses.submit}
            >
              Logout
            </CustomButton>
          </Box>
          <GridItem
            xs={12}
            sm={12}
            md={12}
            lg={4}
            className={classes.loginLeftPanel}
          >
            <div className={classes.appLoginImgDiv}>
              <img src={LoginSideBg} alt="" className={classes.loginBgImg} />
            </div>
          </GridItem>

          <GridItem
            xs={8}
            sm={5}
            md={6}
            lg={4}
            className={formClasses.centerLogin}

          // style={{border:"1px solid"}}
          >
            <div>


              <Box width={450}>
                <Box mt={9} mb={2} fontWeight={400} fontSize="18px">
                  <Typography component="h1" variant="h5">
                    Choose your Location
                  </Typography>
                </Box>
                <Select
                  name="ddl_select_location"
                  styles={{ width: 200 }}
                  options={allShowroomWarehouse}
                  placeholder="Choose Location"
                  formatGroupLabel={(d) => d.label}
                  onChange={(v, info) => onSelect(info, v)}
                  value={selectedLocation[`ddl_select_location`]}
                />

                {/* {error.ddl_role_id && (
            <div className={classes.ddlError}>{item.label} is Required</div>
          )} */}
              </Box>
              <Box mt={2} textAlign="right">
                <CustomButton
                  type="submit"
                  onClick={onClickSubmit}
                  height={40}
                  width={100}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={formClasses.submit}
                >
                  Proceed
                </CustomButton>
              </Box>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </ThemeProvider>
  );
}
