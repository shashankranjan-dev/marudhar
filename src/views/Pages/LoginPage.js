import React from "react";
import Select from "react-select";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @mui/icons-material
// import LockOutline from "@mui/icons-material/LockOutline";
import Check from "@mui/icons-material/Check";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
import CustomButton from "../Components/CustomButton";
import { useHistory } from "react-router-dom";
import cls from "classnames";
import { IconButton } from "@material-ui/core";
import LoginBGImage from "../../assets/jss/material-dashboard-pro-react/views/marudhar.jpg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginSideBg from "../../assets/applogo/loginSideBg.jpg";

// //////////////////////
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Paper, ThemeProvider, InputLabel } from "@material-ui/core";
// /////////////////

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import { Checkbox } from "@material-ui/core";

import {
  AuthLogin,
  authenticate,
  isAuthenticated,
  TOKEN,
  FinancialDb,
} from "../../services/AuthService";
import { useStateValue } from "../../context/context";
import { actionTypes } from "../../context/reducer";
import MarudharImg from "../../assets/applogo/marudhar-name.png";
import theme from "theme/theme";
import { appDefaultColor } from "assets/jss/material-dashboard-pro-react";
import { whiteColor } from "assets/jss/material-dashboard-pro-react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { decodeToken, useJwt, isExpired } from "react-jwt";
import SnakebarMsg from "views/Pages/HelperComponent/SnakebarMsg";
import moment from "moment"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

export default function LoginPage() {
  const [globalState, dispatch] = useStateValue();
  const [decodeToken, setMyDecodeToken] = React.useState();
  const classes = useStyles();
  const formClasses = formStyle();

  const history = useHistory();
  const [forgotPs, setForgotPs] = React.useState({
    view: true,
    email: "",
  });
  const [emailErr, setEmailErr] = React.useState({
    isError: false,
    errorTxt: "",
  });
  const [ftemailErr, setftEmailErr] = React.useState({
    isError: false,
    errorTxt: "",
  });
  const [psErr, setPsErr] = React.useState({
    isError: false,
    errorTxt: "",
  });

  const [remember, setRemember] = React.useState(false);
  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [open, setOpen] = React.useState(false);

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [selectedFinancialYear, setSelectedFinancialYear] = React.useState([]);

  const option = [
    //beta
    // {
    //   value: "a",
    //   label: "2022-2023"
    // },
    //live
    {
      value: "b",
      label: "2023-2024"
    }
    
  ]

  React.useEffect(() => {
    let id = setTimeout(function () {
      setCardAnimation("");
    }, 700);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.clearTimeout(id);
    };
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };
  const onChangeFt = (e) => {
    const { name, value } = e.target;
    setForgotPs({ ...forgotPs, [name]: value });
  };
  const onSetRemember = (e) => {
    setRemember(e.target.checked);
  };

  const onSelect = (info, v) => {

    // console.log("sen1602==>>", info.name, v)
    FinancialDb(
      v.label,
      (res) => {
        // if(res){
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: `${v.label} Financial Database Connected`, msgType: "success" },
        });
        // }

      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    )
    setSelectedFinancialYear({ [info.name]: v })

  };

  const onFtSubmit = (e) => {
    e.preventDefault();
    if (!forgotPs.email) {
      setftEmailErr({
        isError: true,
        errorTxt: "Please enter your email",
      });
    }
    return;
  };

  ////for beta
  // const onSubmit = (e) => {
  //   e.preventDefault()
  //   // console.log("sen2103",selectedFinancialYear)
  //   if (selectedFinancialYear.length === 0)
  //    { 
  //     FinancialDb(
  //       '2022-2023',
  //       (res) => {
  //         // if(res){
  //         dispatch({
  //           type: actionTypes.SET_OPEN_MSG,
  //           payload: { msg: `2022-2023 Financial Database Connected`, msgType: "success" },
  //         });
  //         // }
  //         dispatch({
  //           type: actionTypes.SET_FINANCIAL,
  //           payload: {
  //             year:'2022-2023',
  //           },
  //         })
  //         localStorage.setItem(
  //           "financial",
  //           '2022-2023'
  //         );
  //       },
  //       (err) => {
  //         dispatch({
  //           type: actionTypes.SET_OPEN_MSG,
  //           payload: { msg: err, msgType: "error" },
  //         });
  //       }
  //     ).then(()=>{
  //       if (!loginInfo.email || !loginInfo.password) {
  //         if (!loginInfo.email) {
  //           setEmailErr({
  //             isError: true,
  //             errorTxt: "Please enter your email",
  //           });
  //         }
  //         if (!loginInfo.password) {
  //           setPsErr({
  //             isError: true,
  //             errorTxt: "Please enter your password",
  //           });
  //         }
  //       } else {
  //         AuthLogin(
  //           {
  //             email: loginInfo.email,
  //             password: loginInfo.password,
  //             // remember: loginInfo.remember,
  //           },
  //           (r) => {
  //             dispatch({
  //               type: actionTypes.SET_FINANCIAL,
  //               payload: {
  //                 year:'2022-2023',
  //               },
  //             })
  //             localStorage.setItem(
  //               "financial",
  //               '2022-2023'
  //             );
  //             authenticate(r.userToken, () => {
  //               history.push("/admin/dashboard");
  //               setLoginInfo({
  //                 ...loginInfo,
  //                 email: "",
  //                 password: "",
  //                 remember: false,
  //               });
  //             });
  //           },
  //           (err) => {
  //             dispatch({
  //               type: actionTypes.SET_OPEN_MSG,
  //               payload: { open: true, msg: err.message, msgType: "error" },
  //             });
  //           }
  //         );
  //       }
  //     })}
  //   else

  //   {  if (!loginInfo.email || !loginInfo.password) {
  //       if (!loginInfo.email) {
  //         setEmailErr({
  //           isError: true,
  //           errorTxt: "Please enter your email",
  //         });
  //       }
  //       if (!loginInfo.password) {
  //         setPsErr({
  //           isError: true,
  //           errorTxt: "Please enter your password",
  //         });
  //       }
  //     } else {
  //       AuthLogin(
  //         {
  //           email: loginInfo.email,
  //           password: loginInfo.password,
  //           // remember: loginInfo.remember,
  //         },
  //         (r) => {
  //           dispatch({
  //             type: actionTypes.SET_FINANCIAL,
  //             payload: {
  //               year: selectedFinancialYear["ddl_select_year"].label,
  //             },
  //           })
  //           localStorage.setItem(
  //             "financial",
  //             selectedFinancialYear["ddl_select_year"].label
  //           );
  //           authenticate(r.userToken, () => {
  //             history.push("/admin/dashboard");
  //             setLoginInfo({
  //               ...loginInfo,
  //               email: "",
  //               password: "",
  //               remember: false,
  //             });
  //           });
  //         },
  //         (err) => {
  //           dispatch({
  //             type: actionTypes.SET_OPEN_MSG,
  //             payload: { open: true, msg: err.message, msgType: "error" },
  //           });
  //         }
  //       );
  //     }}
  // }

  //for live
  const onSubmit = (e) => {
    e.preventDefault()
    console.log("sen2103",selectedFinancialYear)
    if (selectedFinancialYear.length === 0)
     { FinancialDb(
        '2023-2024',
        (res) => {
          // if(res){
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: `2023-2024 Financial Database Connected`, msgType: "success" },
          });
          // }

        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      ).then(()=>{
        if (!loginInfo.email || !loginInfo.password) {
          if (!loginInfo.email) {
            setEmailErr({
              isError: true,
              errorTxt: "Please enter your email",
            });
          }
          if (!loginInfo.password) {
            setPsErr({
              isError: true,
              errorTxt: "Please enter your password",
            });
          }
        } else {
          AuthLogin(
            {
              email: loginInfo.email,
              password: loginInfo.password,
              // remember: loginInfo.remember,
            },
            (r) => {
              dispatch({
                type: actionTypes.SET_FINANCIAL,
                payload: {
                  year:'2023-2024',
                },
              })
              localStorage.setItem(
                "financial",
                '2023-2024'
              );
              authenticate(r.userToken, () => {
                history.push("/admin/dashboard");
                setLoginInfo({
                  ...loginInfo,
                  email: "",
                  password: "",
                  remember: false,
                });
              });
            },
            (err) => {
              dispatch({
                type: actionTypes.SET_OPEN_MSG,
                payload: { open: true, msg: err.message, msgType: "error" },
              });
            }
          );
        }
      })}
    else

    {  if (!loginInfo.email || !loginInfo.password) {
        if (!loginInfo.email) {
          setEmailErr({
            isError: true,
            errorTxt: "Please enter your email",
          });
        }
        if (!loginInfo.password) {
          setPsErr({
            isError: true,
            errorTxt: "Please enter your password",
          });
        }
      } else {
        AuthLogin(
          {
            email: loginInfo.email,
            password: loginInfo.password,
            // remember: loginInfo.remember,
          },
          (r) => {
            dispatch({
              type: actionTypes.SET_FINANCIAL,
              payload: {
                year: selectedFinancialYear["ddl_select_year"].label,
              },
            })
            localStorage.setItem(
              "financial",
              selectedFinancialYear["ddl_select_year"].label
            );
            authenticate(r.userToken, () => {
              history.push("/admin/dashboard");
              setLoginInfo({
                ...loginInfo,
                email: "",
                password: "",
                remember: false,
              });
            });
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { open: true, msg: err.message, msgType: "error" },
            });
          }
        );
      }}
  }

  React.useEffect(() => {
    if (isAuthenticated()) {
      // console.log("isAuthenticated", isAuthenticated)
      history.push("/admin/dashboard");
    }
  }, []);

  const onClickForgotPs = () => {
    setForgotPs({ ...forgotPs, view: !forgotPs.view });
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
            xs={12}
            sm={12}
            md={12}
            lg={8}
            className={formClasses.centerLogin}
          >
            <div>

              {/* {console.log(moment(new Date(), "HH:MM").unix(), "sen2609")} */}
              {forgotPs.view ? (
                <Paper elevation={0} className={formClasses.paper}>
                  {/* <div className={cls(classes.appLogo, classes[cardAnimaton])}>
                    <img
                      src={MarudharImg}
                      alt="Marudhar"
                      className={classes.appLogoImg}
                    />
                  </div> */}

                  <Typography component="h1" variant="h4">
                    Sign in to System Process
                  </Typography>
                  <GridItem
                    style={{ width: "100%", marginLeft: -15 }}
                  >
                    <div style={{ align: "left" }}>
                      <Box width={150}>
                        <Box mt={2} mb={2} fontWeight={400} fontSize="18px">
                          <Typography variant="h6"
                            component="div"
                            style={{
                              marginTop: 10,
                              marginBottom: 30,
                              color: "#777",
                              fontSize: 17,
                            }}
                          >
                            Financial Year
                          </Typography>
                        </Box>
                        <Select
                          name="ddl_select_year"
                          styles={{ border: "solid" }}
                          options={option}
                          placeholder="Choose year"
                          formatGroupLabel={(d) => d.label}
                          onChange={(v, info) => onSelect(info, v)}
                          value={selectedFinancialYear[`ddl_select_year`]}
                          defaultValue={option[0] ? option[0] : option[1]}
                        />
                        {/* {console.log("sen1402023===>>>", selectedFinancialYear)} */}
                      </Box>
                    </div>
                  </GridItem>
                  <Typography
                    variant="h6"
                    component="div"
                    className={formClasses.mutedText}
                  >
                    Enter your details to login
                  </Typography>
                  <form className={formClasses.form} noValidate>
                    <InputLabel id="label" className={formClasses.loginLabel}>
                      Email
                    </InputLabel>
                    <TextField
                      size="small"
                      variant="outlined"
                      placeholder="Email"
                      margin="normal"
                      required
                      value={loginInfo.email}
                      fullWidth
                      onChange={onChange}
                      id="label"
                      name="email"
                      autoFocus
                      error={emailErr.isError}
                      helperText={emailErr.errorTxt}
                    />
                    <InputLabel id="label" className={formClasses.loginLabel}>
                      Password
                    </InputLabel>
                    <TextField
                      size="small"
                      variant="outlined"
                      margin="normal"
                      placeholder="Password"
                      required
                      fullWidth
                      value={loginInfo.password}
                      onChange={onChange}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      id="label"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility fontSize="small" />
                              ) : (
                                <VisibilityOff fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      autoComplete={false}
                      error={psErr.isError}
                      helperText={psErr.errorTxt}
                    />

                    <div>
                      <GridContainer
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <GridItem>
                          {/* <div className={classes.checkboxAndRadio}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  value="remember"
                                  checked={remember}
                                  onClick={onSetRemember}
                                  color="primary"
                                  checkedIcon={
                                    <Check className={classes.checkedIcon} />
                                  }
                                  icon={
                                    <Check className={classes.uncheckedIcon} />
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
                              label="Remember me"
                            />
                          </div> */}
                        </GridItem>
                        <GridItem>
                          <div className={formClasses.btnCenter}>
                            {/* <Link
                              href="#"
                              variant="body2"
                              onClick={onClickForgotPs}
                            >
                              Forgot password?
                            </Link> */}

                            <CustomButton
                              type="submit"
                              height={40}
                              width={100}
                              onClick={onSubmit}
                              fullWidth
                              style={{ marginLeft: 20 }}
                              variant="contained"
                              color="primary"
                              className={formClasses.submit}
                            >
                              Sign In
                            </CustomButton>
                          </div>
                        </GridItem>
                      </GridContainer>
                    </div>
                  </form>
                </Paper>
              ) : (
                <Paper elevation={0} className={formClasses.forgotPaper}>
                  <div className={cls(classes.appLogo, classes[cardAnimaton])}>
                    <img
                      src={MarudharImg}
                      alt="Marudhar"
                      className={classes.appLogoImg}
                    />
                  </div>
                  <Typography component="h1" variant="h4">
                    Forgot you password?
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    className={formClasses.mutedText}
                  >
                    Enter your email below and we'll get you back on your
                    account.
                  </Typography>
                  <form className={formClasses.form} noValidate>
                    <InputLabel id="label" className={formClasses.loginLabel}>
                      Email
                    </InputLabel>
                    <TextField
                      size="small"
                      variant="outlined"
                      placeholder="Email"
                      margin="normal"
                      required
                      value={forgotPs.email}
                      fullWidth
                      onChange={onChangeFt}
                      id="label"
                      name="email"
                      autoComplete={false}
                      autoFocus
                      error={ftemailErr.isError}
                      helperText={ftemailErr.errorTxt}
                    />

                    <div>
                      <GridContainer
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <GridItem></GridItem>
                        <GridItem>
                          <div className={formClasses.btnCenter}>
                            <div>
                              Already have an account?
                              <Link
                                href="#"
                                variant="body2"
                                style={{ marginLeft: 5 }}
                                onClick={onClickForgotPs}
                              >
                                Sign In
                              </Link>
                            </div>

                            <CustomButton
                              type="submit"
                              height={40}
                              width={100}
                              onClick={onFtSubmit}
                              fullWidth
                              style={{ marginLeft: 20 }}
                              variant="contained"
                              color="primary"
                              className={formClasses.submit}
                            >
                              Reset
                            </CustomButton>
                          </div>
                        </GridItem>
                      </GridContainer>
                    </div>
                  </form>
                </Paper>
              )}
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </ThemeProvider>
  );
}
