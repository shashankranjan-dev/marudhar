import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { Button, CircularProgress, StepContent } from "@mui/material";
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { AccountBalance, AccountTree, BadgeOutlined, BrandingWatermark, Category, Diversity1, Diversity2, EMobiledata, Group, InterestsRounded, LocationOn, NaturePeople, PendingActions, PermContactCalendar, Scale, Store, SupervisedUserCircle, SupervisedUserCircleOutlined, SwitchAccount, TransferWithinAStation, Warehouse } from "@mui/icons-material";
import { Input, Paper, makeStyle, withStyle } from "@material-ui/core";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import ReactSelect from "react-select";
import { migrateUsers } from "services/financialMigrationService";
import { migrateShowroom } from "services/financialMigrationService";
import moment from "moment";
import { financialYears, timeToUnix } from "../HelperComponent/utils";
import { migrateCatagory } from "services/financialMigrationService";
import { migrateBrand } from "services/financialMigrationService";
import { CustomCard } from "views/Components/CustomCard";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { migrateBank } from "services/financialMigrationService";
import { migrateUom } from "services/financialMigrationService";
import { migrateArea } from "services/financialMigrationService";
import { migrateRole } from "services/financialMigrationService";
import { migrateStatus } from "services/financialMigrationService";
import { AttachFile, CheckCircleOutline, DirectionsCar } from "@mui/icons-material";
import { migratePrimaryGroup } from "services/financialMigrationService";
import { migrateLedgerGroup } from "services/financialMigrationService";
import { migrateLedgerAccount } from "services/financialMigrationService";
import { migrateCharges } from "services/financialMigrationService";
import { migrateCustomer } from "services/financialMigrationService";
import { migrateVendor } from "services/financialMigrationService";
import { migrateRefrence } from "services/financialMigrationService";
import { migrateVehicle } from "services/financialMigrationService";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { migrateItem } from "services/financialMigrationService";
// import MasterModelFinancial from "views/Components/MasterModelFinancial";
import {
  appDefaultColor,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import InputLabel from "@material-ui/core/InputLabel";
import {
  appFontWeight,
  appFontWeightThin,
  tblBodyHoverColor,
} from "assets/jss/material-dashboard-pro-react";
import TextField from "@material-ui/core/TextField";
import { currentDate, currentDate1, dateFormateField } from "../HelperComponent/utils";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { reactSelectStyles } from "assets/jss/material-dashboard-pro-react";
import { getAllBrand } from "services/financialMigrationService";
import { getListShowroomWarehouse } from "services/financialMigrationService";
import { itemStockSearch } from "services/financialMigrationService";
import MuiTable from "views/Components/MuITable";
import { migrateItemStock } from "services/financialMigrationService";
import { migrateLedgerStorage } from "services/financialMigrationService";
import { migrateLedgerAccountUpdate, migrateMasterGroup } from "services/financialMigrationService";
import { migrateSerialNo } from "services/financialMigrationService";


const mainSteps = ["Users", "Showrooom", "Catagory", "Brand", "UOM", "Bank", "Area", "Role", "Status"];
const accountSteps = ["Primary Group", "Ledger Group", "Ledger Accounts", "Other Charges"];
const communitySteps = ["Customer", "Vendor", "References", "Vehicle"];
const endSteps = ["Item", "Item Stock"]


const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "22px",
    },
  },

  searchBar: {
    padding: "10px",
  },
  activeText: {
    fontSize: "15px",
    color: appSecondColor,
    fontWeight: 400,
  },
  input: {
    height: 40,
    lineLight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
  customSelect: {
    marginBottom: 15,
  },
  brandName: {
    background: `-webkit-linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }
}));


const FinancialMigration = () => {
  const [globalState, dispatch] = useStateValue();
  const classes = useStyles();
  const [fy, setFy] = useState(financialYears());
  const [activeStep, setActiveStep] = useState('');
  const [accountActiveStep, setAccountActiveStep] = useState('');
  const [communityActiveStep, setCommunityActiveStep] = useState('');
  const [endActiveStep, setEndActiveStep] = useState('');
  const [classicModal, setClassicModal] = useState(false)
  const [allBrands, setAllBrands] = React.useState([]);
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);

  const [brandCount, setBrandCount] = useState(0)
  const [showCount, setShowCount] = useState(0)

  const [itemStock, setItemStock] = useState([])
  const [itemStockButton, setItemStockButton] = useState(false)
  const [migrateButton, setMigrateButton] = useState(false)
  const [activeStepVertical, setActiveStepVertical] = useState('');
  const [collapsible, setCollapsible] = React.useState(true)
  const [collapsibleModel, setCollapsibleModel] = React.useState(true)
  const [loading, setLoading] = useState(false)
  const [loadingMain, setLoadingMain] = useState(false)
  const [loadingStock, setLoadingStock] = useState(false)

  const headerData = [
    {
      id: "stoID",
      label: "#",
      align: "left",
    },
    {
      id: "stoItemDetails",
      label: "Item Details",
      align: "left",
    },
    {
      id: "stoClosing",
      label: "Closing",
      align: "right",
    },


  ];

  useEffect(() => {
    //dropdowns
    getAllBrand(
      (r) => {
        setAllBrands(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    )

    getListShowroomWarehouse(
      (r) => {
        setAllShowroomWarehouse(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    )
  }, [])

  //style
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <SupervisedUserCircle />,
      2: <Store />,
      3: <Category />,
      4: <BrandingWatermark />,
      5: <Scale />,
      6: <AccountBalance />,
      7: <LocationOn />,
      8: <BadgeOutlined />,
      9: <PendingActions />

    };

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  function ColorlibStepIconVertical(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <AccountTree />,
      2: <AccountTree />,
      3: <AccountTree />,
      4: <AccountTree />,


    };

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  function AccountColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <Diversity2 />,
      2: <Diversity1 />,
      3: <PermContactCalendar />,
      4: <EMobiledata />,


    };

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  function CommunityColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <NaturePeople />,
      2: <SwitchAccount />,
      3: <InterestsRounded />,
      4: <DirectionsCar />,


    };

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  function EndColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <AttachFile />,
      2: <Warehouse />,
      3: <InterestsRounded />,
      4: <DirectionsCar />,


    };

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  const onClickMigration = () => {
    setMigrateButton(true)
    // // 1:Migration Users
    setActiveStepVertical(0)
    setLoadingMain(true)
    migrateUsers(
      fy,
      (user) => {
        setLoadingMain(false)

        if (user.Status === "Completed") {
          setActiveStep(1);
          // 2:Migration Showroom
          setLoadingMain(true)

          migrateShowroom(
            fy,
            (showroom) => {
              setLoadingMain(false)

              if (showroom.Status === "Completed") {
                setActiveStep(1);
                setLoadingMain(true)

                // 3:Catagory
                migrateCatagory(
                  fy,
                  (cat) => {
                    setLoadingMain(false)

                    if (cat.Status === "Completed") {
                      setActiveStep(2);
                      // 4:Brand
                      setLoadingMain(true)

                      migrateBrand(
                        fy,
                        (brand) => {
                          setLoadingMain(false)

                          if (brand.Status === "Completed") {
                            setActiveStep(3);
                            //5:Uom
                            setLoadingMain(true)

                            migrateUom(
                              fy,
                              (data) => {
                                setLoadingMain(false)

                                if (data.Status === "Completed") {
                                  setActiveStep(4);
                                  //6:Bank
                                  setLoadingMain(true)

                                  migrateBank(
                                    fy,
                                    (data) => {
                                      setLoadingMain(false)

                                      if (data.Status === "Completed") {
                                        setActiveStep(5);
                                        setLoadingMain(true)

                                        migrateArea(
                                          fy,
                                          (data) => {
                                            setLoadingMain(false)

                                            if (data.Status === "Completed") {
                                              setActiveStep(6);
                                              setLoadingMain(true)

                                              migrateRole(
                                                fy,
                                                (data) => {
                                                  setLoadingMain(false)

                                                  if (data.Status === "Completed") {
                                                    setActiveStep(7);
                                                    setLoadingMain(true)

                                                    migrateStatus(
                                                      fy,
                                                      (data) => {
                                                        setLoadingMain(false)
                                                        if (data.Status === "Completed") {
                                                          setActiveStep(8);
                                                          setActiveStepVertical(1)
                                                          accountMigration()
                                                        }
                                                      },
                                                      (err) => {
                                                        console.log(err);
                                                      }
                                                    )
                                                  }
                                                },
                                                (err) => {
                                                  console.log(err);
                                                }
                                              )
                                            }
                                          },
                                          (err) => {
                                            console.log(err);
                                          }
                                        )
                                      }
                                    },
                                    (err) => {
                                      console.log(err);
                                    }
                                  )
                                }
                              },
                              (err) => {
                                console.log(err);

                              }
                            )

                          }
                        },
                        (err) => {
                          console.log(err);
                        }
                      )
                    }
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              }
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );



  };

  const accountMigration = () => {
    setLoading(true)
    setMigrateButton(true)
    migratePrimaryGroup(
      fy,
      (data) => {
        setLoading(false)
        if (data.Status === "Completed") {
          setAccountActiveStep(1);
          setLoading(true)
          migrateLedgerGroup(
            fy,
            (data) => {
              setLoading(false)
              if (data.Status === "Completed") {
                setAccountActiveStep(2);
                setLoading(true)
                migrateLedgerAccount(
                  fy,
                  (data) => {
                    if (data.Status === "Completed") {

                      migrateLedgerAccountUpdate(fy,
                        (data) => {
                          migrateLedgerStorage(
                            fy,
                            (data) => {
                              setLoading(false)
                              if (data.Status === "Completed") {
                                setAccountActiveStep(3);
                                setLoading(true)
                                migrateCharges(
                                  fy,
                                  (data) => {
                                    setLoading(false)
                                    if (data.Status === "Completed") {
                                      setLoading(true)
                                      migrateMasterGroup(
                                        fy,
                                        (data) => {
                                          migrateSerialNo(
                                            fy,
                                            (data) => {
                                              setLoading(false)
                                              setAccountActiveStep(4);
                                              setActiveStepVertical(2)
                                              communityMigration()
                                            },
                                            (err) => {
                                              console.log(err);
                                            }
                                          )
                                        },
                                        (err) => {
                                          console.log(err);
                                        }
                                      )
                                    }
                                  },
                                  (err) => {

                                  }
                                )
                              }
                            },
                            (err) => {
                              console.log(err);
                            }
                          )

                        },
                        (err) => {
                          console.log(err)
                        })

                    }
                  },
                  (err) => {
                    console.log(err);

                  }
                )
              }
            },
            (err) => {
              console.log(err);
            }
          )
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }

  const communityMigration = () => {
    setLoading(true)
    migrateCustomer(
      fy,
      (data) => {
        setLoading(false)
        if (data.Status === "Completed") {
          setCommunityActiveStep(1);
          setLoading(true)
          migrateVendor(
            fy,
            (data) => {
              setLoading(false)
              if (data.Status === "Completed") {
                setCommunityActiveStep(2);
                setLoading(true)
                migrateRefrence(
                  fy,
                  (data) => {
                    setLoading(false)
                    if (data.Status === "Completed") {
                      setCommunityActiveStep(3);
                      setLoading(true)
                      migrateVehicle(
                        fy,
                        (data) => {
                          setLoading(false)
                          if (data.Status === "Completed") {
                            setCommunityActiveStep(4);
                            setActiveStepVertical(3)
                            endMigration()
                            // dispatch({
                            //   type: actionTypes.SET_OPEN_MSG,
                            //   payload: { msg: "Financial Migration Done!", msgType: "success" },
                            // });
                          }
                        },
                        (err) => {
                          console.log(err)
                        }
                      )
                    }
                  },
                  (err) => {
                    console.log(err)
                  }
                )
              }
            },
            (err) => {
              console.log(err)
            }
          )
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }

  const endMigration = () => {
    setLoading(true)
    migrateItem(
      fy,
      (data) => {
        setLoading(false)
        setMigrateButton(false)
        if (data.Status === "Completed") {
          setEndActiveStep(2)
          // setLoading(true)
          setClassicModal(true)

        }
      },
      (err) => {
        console.log(err)
      }
    )
  }

  const onClickCollaps = () => {
    collapsible ?
      setCollapsible(false)
      :
      setCollapsible(true)
  }

  const onClickCollapsModel = () => {
    collapsibleModel ?
      setCollapsibleModel(false)
      :
      setCollapsibleModel(true)
  }

  const onClickItemStockMigration = () => {
    // console.log(brandCount, "brand=>>", allBrands[brandCount]?.value)
    // console.log(showCount, "show=>>", allShowroomWarehouse[showCount]?.value)
    // setLoadingStock(true)
    // setEndActiveStep(2)
    // setActiveStepVertical(4)
    setItemStockButton(true)
    setLoading(true)
    itemStockSearch(
      allBrands[brandCount]?.value,
      allShowroomWarehouse[showCount]?.value,
      (r) => {
        setItemStock(r)
        if (showCount === allShowroomWarehouse.length - 1) {
          setShowCount(0)
          setBrandCount(brandCount + 1)
          setLoading(false)
          console.log("result=>>11", r)
        }
        else {
          setShowCount(showCount + 1)
          setLoading(false)
          console.log("result=>>22", r)
        }

        migrateItemStock(
          fy,
          r,
          (res) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: `${allBrands[brandCount]?.label}'s ${allShowroomWarehouse[showCount]?.label} Warehouse Updated!!`, msgType: "success" },
            });
            setItemStockButton(false)

          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        )
      },
      (err) => {
        console.log("result=>>", err)
      }
    )
  }

  return (

    <CustomCard
      cdTitle="Financial Migration"
      btnToolTip={collapsible ? "Collaps" : "Expand"}
      onClickCollapsible={onClickCollaps}
      buttonAction={collapsible}
      filterIcon
    >
      {collapsible ?

        <Box sx={{ width: "100%" }}>
          <GridContainer>
            <GridItem xs="12"
              style={{ margin: 25 }}>
              <Stepper activeStep={activeStepVertical} orientation="vertical"
                sx={{
                  "& .MuiStepConnector-line": {
                    borderTopWidth: "4px",
                  },
                  "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
                    borderColor: "red",
                  },
                  "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
                    borderColor: "red",
                  },
                }}>
                <Step key={1}>
                  <StepLabel StepIconComponent={ColorlibStepIconVertical} >Main</StepLabel>
                  <StepLabel>
                    <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                      {mainSteps.map((label, index) => {
                        return (
                          <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            <StepContent>{loadingMain ? (
                              <Box mt={10} width="100%" textAlign="center">
                                <CircularProgress />

                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label} is Migrating</StepLabel>

                              </Box>
                            ) : ''}</StepContent>
                          </Step>
                        );
                      })}
                      {/* <StepContent>{mainStage ? <CheckCircleOutline style={{color:'green'}}/>:''}</StepContent> */}
                    </Stepper>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel StepIconComponent={ColorlibStepIconVertical}>Account</StepLabel>
                  <StepLabel>
                    <Stepper alternativeLabel activeStep={accountActiveStep} connector={<ColorlibConnector />}>
                      {accountSteps.map((label, index) => {
                        return (
                          <Step key={label}>
                            <StepLabel StepIconComponent={AccountColorlibStepIcon}>{label}</StepLabel>
                            <StepContent>{loading ? (
                              <Box mt={10} width="100%" textAlign="center">
                                <CircularProgress />
                                <StepLabel StepIconComponent={AccountColorlibStepIcon}>{label} is Migrating</StepLabel>
                              </Box>
                            ) : ''}</StepContent>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel StepIconComponent={ColorlibStepIconVertical} >Community</StepLabel>
                  <StepLabel>
                    <Stepper alternativeLabel activeStep={communityActiveStep} connector={<ColorlibConnector />}>
                      {communitySteps.map((label, index) => {
                        return (
                          <Step key={label}>
                            <StepLabel StepIconComponent={CommunityColorlibStepIcon}>{label}</StepLabel>
                            <StepContent>{loading ? (
                              <Box mt={10} width="100%" textAlign="center">
                                <CircularProgress />
                                <StepLabel StepIconComponent={CommunityColorlibStepIcon}>{label} is Migrating</StepLabel>
                              </Box>
                            ) : ''}</StepContent>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel StepIconComponent={ColorlibStepIconVertical} >End</StepLabel>
                  <StepLabel>
                    <Stepper alternativeLabel activeStep={endActiveStep} connector={<ColorlibConnector />}>
                      {endSteps.map((label, index) => {
                        return (
                          <Step key={label}>
                            <StepLabel StepIconComponent={EndColorlibStepIcon}>{label}</StepLabel>
                            <StepContent>{loading ? (
                              <Box mt={10} width="100%" textAlign="center">
                                <CircularProgress />

                                <StepLabel StepIconComponent={EndColorlibStepIcon}>{label} is Migrating</StepLabel>

                              </Box>
                            ) : ''}</StepContent>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </StepLabel>
                </Step>
              </Stepper>
            </GridItem>

            <GridItem
              xs="12"
              style={{ margin: 20 }}>
              <div>
                <Button
                  variant="contained"
                  style={{
                    margin: "auto",
                    display: "flex",
                  }}
                  onClick={onClickMigration}
                  disabled={migrateButton}
                >
                  Migrate
                </Button>
              </div>
            </GridItem>

          </GridContainer>

        </Box>
        : ''}

      {/* {
        classicModal ? */}
          <GridContainer>
            <GridItem xs="12">
              <CustomCard
                cdTitle="Item Stock Migration"
                btnToolTip={collapsibleModel ? "Collaps" : "Expand"}
                onClickCollapsible={onClickCollapsModel}
                buttonAction={collapsibleModel}
                filterIcon
                width={"100%"}
              >
                {
                  collapsibleModel ?
                    <Paper elevation="0" className={classes.searchBar}>
                      <GridContainer justifyContent="flex-start" alignItems="center">
                        <GridItem xs="3">
                          <InputLabel id="label">Brand</InputLabel>

                          <InputLabel id="label" className={classes.brandName} style={{ margin: 5, padding: 5 }}>{allBrands && allBrands[brandCount]?.label}</InputLabel>

                        </GridItem>
                        <GridItem xs="3">
                          <InputLabel id="label">Showroom / Warehouse</InputLabel>
                          <InputLabel id="label" className={classes.brandName} style={{ margin: 5, padding: 5 }}>{allShowroomWarehouse && allShowroomWarehouse[showCount]?.label}</InputLabel>
                        </GridItem>

                        <GridItem xs="2">
                          <div
                            style={{
                              float: "right",
                              display: "flex",
                              alignItems: "center",
                              marginTop: 10,
                            }}
                          >
                            <CustomButton
                              onClick={onClickItemStockMigration}
                              style={{ marginRight: "10px" }}
                              disabled={itemStockButton}
                            >
                              <TransferWithinAStation />
                            </CustomButton>
                          </div>
                        </GridItem>
                      </GridContainer>
                      <GridContainer
                        justifyContent="flex-start"
                        alignItems="center"
                      ></GridContainer>
                    </Paper>
                    : ''}
              </CustomCard>
            </GridItem>
            {
              loadingStock === true ?

                loading === true ?
                  <Box mt={10} width="100%" textAlign="center">
                    <CircularProgress />
                  </Box>
                  :
                  <GridItem xs="12">
                    <GridItem xs="3">
                      <InputLabel id="label">Showroom / Warehouse</InputLabel>
                      <InputLabel id="label" className={classes.brandName} style={{ margin: 5, padding: 5 }}>{allShowroomWarehouse && allShowroomWarehouse[showCount === 0 ? 5 : showCount - 1]?.label}</InputLabel>
                    </GridItem>
                    <MuiTable
                      columns={headerData}
                      rows={itemStock}
                    />
                  </GridItem>
                : ''

            }
          </GridContainer>
          {/* // : ''} */}

    </CustomCard>

  );
};

export default FinancialMigration;
