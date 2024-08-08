import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../Components/MasterModel";
import { CustomCard } from "../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../Components/CustomButton";
import { brandRowData } from "../../services/brandService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { InputAdornment, OutlinedInput, IconButton } from "@material-ui/core";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {  updateConfirmUser } from "../../services/associateService";
import CardLinkButton from "views/Components/CardLinkButton";
import { useStateValue } from "../../context/context";
import { actionTypes } from " ../../context/reducer";

import theme from "../../theme/theme";

import React from "react";
import {
  appDefaultColor,
  appSecondColor,
  appFontWeight,
  appDefaultFamily,
} from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import { appLabelFont } from "assets/jss/material-dashboard-pro-react";
import { activeText } from "assets/jss/material-dashboard-pro-react";

const useStyles = makeStyles((theme) => ({
  root: {},
  input: {
    height: 40,
    lineLight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
}));

const ChangePasswordPage = ({ openModel, onCloseModel }) => {
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [associates, setAllAssociate] = React.useState([]);
  const [showroomWarehouseId, setSelectShowroomWarehouse] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  // Old Password
  const [showPasswordOld, setShowPasswordOld] = React.useState(false);
  const handleClickShowPasswordOld = () => setShowPasswordOld(!showPasswordOld);
  const handleMouseDownPasswordOld = () => setShowPasswordOld(!showPasswordOld);
  const [globalState, dispatch] = useStateValue();

  // New Password
  const [showPasswordNew, setShowPasswordNew] = React.useState(false);
  const handleClickShowPasswordNew = () => setShowPasswordNew(!showPasswordNew);
  const handleMouseDownPasswordNew = () => setShowPasswordNew(!showPasswordNew);

  // Confirm Password
  const [showPasswordCNF, setShowPasswordCNF] = React.useState(false);
  const handleClickShowPasswordCNF = () => setShowPasswordCNF(!showPasswordCNF);
  const handleMouseDownPasswordCNF = () => setShowPasswordCNF(!showPasswordCNF);
  const [error, setError] = React.useState({
    txt_confirm_password:false,
    txt_old_password:false,
    txt_new_password: false,
   
  });
  const [addPassword, setAllPassword] = React.useState({});
  const [addUser, setAddUser] = React.useState({
    edit: false,
    user_id: "",
   txt_confirm_password:"",
   txt_old_password:"",
   txt_new_password: "",

  });
  const onChange = (e) => {
    const { value, name } = e.target;
    setAddUser({ ...addUser, [name]: value });
  };

  const onUserEdit = (row) => {
    setClassicModal(true);
    setIsChangePasword(false);
    setSelectShowroomWarehouse(row.showroom_warehouse_id);
    setAddUser({
      ...addUser,
      edit: true,
      user_id: row.user_id,    
      txt_new_password: row.new_password,
      txt_old_password: row.old_password,
      txt_confirm_password: row.confirm_password,     
    });
  };

  const onSetActive = (e) => {
    setAddUser((prv) => ({ ...prv, [e.target.name]: e.target.checked }));
  };

  const onSubmitModel = (e) => {

    //console.log("1111", globalState?.user?.serial_id)
    //console.log("addUser", addUser)

    e.preventDefault();
    if (
      !addUser.txt_old_password ||
      !addUser.txt_new_password ||
      !addUser.txt_confirm_password 
      
    ) {
      setError({
        txt_old_password: !addUser.txt_old_password,
        txt_new_password: !addUser.txt_new_password,
        txt_confirm_password: !addUser.txt_confirm_password,
       
      });
     
    } 
  
      if (addUser.txt_confirm_password) {
        updateConfirmUser(
          addUser.txt_confirm_password,
          globalState?.user?.serial_id,
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
      } else {
        if (!addUser.txt_confirm_password) {
          setError({ txt_confirm_password: !addUser.txt_confirm_password });
        }
      }
    
  };



  React.useEffect(() => {
    setAllPassword({});
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MasterModel
        classicModal={openModel}
        onCloseModel={onCloseModel}
        // btnDisabled={!addBrand.brand}
        width={450}
        okBtnText="Submit"
        height="auto"
        modelName="Change Password"
        onClickOk={onSubmitModel}
      >
        <form style={{ padding: "20px 10px", width: "100%" }}>
          <GridContainer>
            <GridItem xs={12}>
              <>
                <InputLabel id="label">Old Password</InputLabel>
                <TextField
                  size="small"
                  placeholder="Old Password"
                  name="txt_old_password"
                  type={showPasswordOld ? "text" : "password"}
                  onChange={onChange}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordOld}
                          onMouseDown={handleMouseDownPasswordOld}
                        >
                          {showPasswordOld ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  id="outlined-basic"
                  fullWidth={true}
                  value={addPassword[`txtOldPassword`]}
                  variant="outlined"
                />
              </>
            </GridItem>
            <GridItem xs={12}>
              <>
                <InputLabel id="label">New Password</InputLabel>
                <TextField
                  size="small"
                  placeholder="New Password"
                  name="txt_new_password"
                  type={showPasswordNew ? "text" : "password"}
                  onChange={onChange}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordNew}
                          onMouseDown={handleMouseDownPasswordNew}
                        >
                          {showPasswordNew ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  id="outlined-basic"
                  fullWidth={true}
                  value={addPassword[`txtNewPassword`]}
                  variant="outlined"
                />
              </>
            </GridItem>
            <GridItem xs={12}>
              <>
                <InputLabel id="label">Confirm Password</InputLabel>
                <TextField
                  size="small"
                  placeholder="Confirm Password"
                  name="txt_confirm_password"
                  type={showPasswordCNF ? "text" : "password"}
                  onChange={onChange}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordCNF}
                          onMouseDown={handleMouseDownPasswordCNF}
                        >
                          {showPasswordCNF ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  id="outlined-basic"
                  fullWidth={true}
                  value={addPassword[`txtCNFPassword`]}
                  variant="outlined"
                />
              </>
            </GridItem>
          </GridContainer>
        </form>
      </MasterModel>
    </ThemeProvider>
  );
};

export default ChangePasswordPage;
