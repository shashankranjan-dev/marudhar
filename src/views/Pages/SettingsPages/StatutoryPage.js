import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../../Components/MasterModel";
import { CustomCard } from "../../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../../Components/CustomButton";
import {
  deleteStatutory,
  getAllStatutory,
  postStatutory,
  updateStatutory,
} from "../../../services/statutoryService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input,Box } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import theme from "../../../theme/theme";

import React from "react";
import {
  appDefaultColor,
  appSecondColor,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import PageTitle from "../HelperComponent/PageTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },

  catCards: {
    marginLeft: 5,
    marginBottom: 20,
  },
  activeText: {
    ...activeText,
  },
  helperText: { textAlign: "right" },
}));

const formData = {
  formName: "Add a Statutory",
  fields: [
    {
      name: "txt_statutory",
      label: "Statutory",
      hidden: false,
      required: true,
      data_type: "string",
      html_element: "TextField",
      error: false,
    },
    {
      name: "txt_details",
      label: "Details",
      hidden: false,
      required: false,
      data_type: "string",
      html_element: "TextArea",
      error: false,
    },
    {
      name: "switch_active_status",
      label: "active",
      defaultValue: false,
      required: false,
      data_type: "string",
      html_element: "switch",
      error: false,
    },
  ],
};

const AddStatutoryPage = () => {
  const history = useHistory();
  const classes = useStyles();

  const [classicModal, setClassicModal] = React.useState(false);
  const [allStatutory, setAllStatutorys] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [addStatutory, setAddStatutory] = React.useState({
    edit: false,
    statutory_type_id: "",
    switch_active_status: false,
    txt_statutory: "",
    txt_details: "",
  });
  // for Error handler state
  const [error, setError] = React.useState({
    txt_statutory: false,
  });
  React.useEffect(() => {
    setLoading(true);
    getAllStatutory((statutorys) => {
        setAllStatutorys(statutorys);
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
  }, [refresh]);

  const onSetActive = (e) => {
    setAddStatutory((prv) => ({ ...prv, [e.target.name]: e.target.checked }));
  };

  const headerData = [
    {
      id: "stu_id",
      label: "#",
    },
    {
      id: "stu_statutoryType",
      label: "Statutory Type",
    },
    {
      id: "stu_details",
      label: "Details",
    },
    {
      id: "stu_status",
      label: "Status",
      statusBtn: (v) => (v === "Y" ? true : false),
    },
    {
      id: "stu_action",
      label: "Action",
      align: "right",
    },
  ];
  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (!addStatutory.txt_statutory) {
      setError({
        txt_statutory: !addStatutory.txt_statutory,
      });
    } else {
      if (addStatutory.edit) {
        updateStatutory(
          addStatutory,
          (r) => {
            onCloseModel();
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Statutory Updated Successfully",
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
      } else {
        postStatutory(
          addStatutory,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Statutory added Successfully",
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
          }
        );
      }
    }
  };

  // on Delete called
  const onDeleteStatutory = (row, next) => {

    // console.log(row.statutory_type_id);
  
    deleteStatutory(
      row.statutory_type_id,
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
  // on Edit called
  const onUpdateStatutory = (row) => {
    setClassicModal(true);
    setAddStatutory({
      ...addStatutory,
      edit: true,
      switch_active_status: row.stu_status === "Y" ? true : false,
      statutory_type_id: row.statutory_type_id,
      txt_statutory: row.stu_statutoryType,
      txt_details: row.stu_details,
    });
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    setAddStatutory({ ...addStatutory, [name]: value });
  };
  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({ txt_statutory: false });
    setAddStatutory({
      edit: false,
      statutory_type_id: null,
      switch_active_status: false,
      txt_statutory: "",
      txt_details: "",
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Setting > Statutory"
        btnToolTip="Add New Statutory"
        onClickAddBtn={() => setClassicModal(true)}
      />
      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <GridContainer justify="space-between" alignItems="center">
            <GridItem>
              <MasterModel
                classicModal={classicModal}
                onCloseModel={onCloseModel}
                width={450}
                height="auto"
                // modelName="Add a Statutory"
                okBtnText="Submit"
                modelName={
                  addStatutory.edit ? "Edit Statutory" : "Add Statutory"
                }
                onClickOk={onSubmitModel}
              >
                <div style={{ padding: "20px 10px", width: "100%" }}>
                  <GridContainer>
                    {formData.fields.map((item, key) => {
                      return (
                        <>
                          <GridItem xs={12} key={key}>
                            {item.html_element === "TextField" && (
                              <>
                                <InputLabel required={item.required} id="label">
                                  {item.label}
                                </InputLabel>
                                <TextField
                                  size="small"
                                  placeholder={item.label}
                                  name={item.name}
                                  required={item.required}
                                  onChange={onChange}
                                  error={error[item.name]}
                                  FormHelperTextProps={{
                                    className: classes.helperText,
                                  }}
                                  helperText={
                                    error[item.name]
                                      ? item.label + " is required"
                                      : ""
                                  }
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={addStatutory[item.name]}
                                  variant="outlined"
                                />
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
                                  style={{ marginBottom: -10 }}
                                  id="outlined-basic"
                                  fullWidth={true}
                                  value={addStatutory[item.name]}
                                  variant="outlined"
                                />
                              </>
                            )}
                            {item.html_element === "switch" && (
                              <>
                                <span className={classes.activeText}>
                                  Active Status
                                </span>
                                <Switch
                                  onClick={onSetActive}
                                  checked={addStatutory[item.name]}
                                  name={item.name}
                                  fullWidth={true}
                                  inputProps={{
                                    "aria-label": "primary checkbox",
                                  }}
                                  color="primary"
                                />
                              </>
                            )}
                          </GridItem>
                        </>
                      );
                    })}
                  </GridContainer>
                </div>
              </MasterModel>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs="12">
        {loading ? (
            <Box mt={10} width="100%" textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomCard cdTitle="Statutory" maxHeight="auto">
            <MuiTable
              onClickEdit={onUpdateStatutory}
              onClickDelete={onDeleteStatutory}
              columns={headerData}
              rows={allStatutory}
            />
          </CustomCard>
          )}
        
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default AddStatutoryPage;
