import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Check from "@mui/icons-material/Check";
import ReactSelect from "react-select";
import MasterModel from "../../Components/MasterModel";
import { Box } from "@material-ui/core";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import theme from "../../../theme/theme";
import Paper from "@material-ui/core/Paper";
import { CustomCard } from "views/Components/CustomCard";
import { appDefaultColor } from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import CustomButton from "views/Components/CustomButton";
import { whiteColor } from "assets/jss/material-dashboard-pro-react";
import CardLinkButton from "views/Components/CardLinkButton";
import { Divider, OutlinedInput } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { CircleAddBtn } from "views/Components/CustomButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { appFontWeight } from "assets/jss/material-dashboard-pro-react";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@mui/icons-material/Add";
import cls from "classnames";
import { Autocomplete } from "@material-ui/lab";
import { Grid } from "@material-ui/core";
import ReferencesPage from "views/Pages/ReferencesPage";
import {
  postReferences,
  updateReferences,
  deleteReferences,
} from "../../../services/referencesService";
// IMPORT Service Function
import {
  getAllGroup,
  getAllReference,
  postCustomerForm,
  postLedgerAccountFromCustomer,
  updateCustomer,
  getAllCustomersChecking,
  getAllCustomerArea,
  getLedgerByCustomerName
} from "../../../services/customerListService";

//postLedgerAccountFromCustomer
// import {postLedgerAccountFromCustomer} from "../../../services/LedgerAccountService";

import Typography from "@material-ui/core/Typography";
import { appScrollBar } from "assets/jss/material-dashboard-pro-react";
import { ColoseButton } from "../../Components/CustomButton";
import {
  appFontWeightBold,
  appSecondColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { appLabelFont } from "assets/jss/material-dashboard-pro-react";
import { appFontWeightThin } from "assets/jss/material-dashboard-pro-react";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import PageTitle from "../HelperComponent/PageTitle";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import { useHistory, useLocation } from "react-router-dom";
import FormComponent from "../HelperComponent/FormComponent";
import { allStates } from "../HelperComponent/utils";

import ViewCard, {
  AddInfoCard,
  AddressCard,
} from "../HelperComponent/ViewCard";

const useStyles = makeStyles((theme) => ({
  ...customCheckboxRadioSwitch,
  root: {
    overflow: "hidden",
  },
  addFormbtn: {
    width: 170,
  },
  customSelect: {
    marginBottom: 15,
  },
  addressCard: {
    overflow: "hidden",
    minHeight: 230,
    maxHeight: 230,
    width: 265,
    minWidth: 265,
    maxWidth: 265,
    position: "relative",
    padding: "15px",
  },
  addAddressCard: {
    textAlign: "center",
    position: "relative",
    cursor: "pointer",
    width: "100%",
    minHeight: 230,
    maxHeight: 230,
    width: 265,
    minWidth: 265,
    maxWidth: 265,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: whiteColor[4],
  },
  container: {
    marginTop: 10,
  },
  addText: {
    fontWeight: appFontWeightThin,
    fontSize: "1.2rem",
    color: appSecondColor,
    marginBottom: 20,
    // position: "relative",
  },
  mobileText: {
    marginTop: 5,
  },
  borderRight: {
    "&:after": {
      content: "''",
      position: "absolute",
      left: 34,
      top: 3,
      height: "14px",
      width: 1.5,
      background: "#333",
      marginLeft: 2,
    },
  },
  actionbtns: {
    marginTop: 20,
    float: "right",
  },
  addIcon: {
    color: "#e3e3e3",
    height: 100,
    width: 100,
  },
  actionFooter: {
    paddingBottom: 10,
    // background: whiteColor,
    // position: "absolute",
    bottom: 0,
    marginBottom: -15,
    zIndex: 100,
  },

  actionbtn: {
    height: 40,
    width: "100px",
    color: whiteColor,
    borderColor: appDefaultColor,
    fontFamily: appDefaultFamily,
  },
  selectLabel: {
    fontSize: "12.6px",
    color: whiteColor[4],
  },
  checkbox: {
    fontSize: 20,
    fontWeight: appFontWeight,
  },
  addressCardfooter: {
    position: "absolute",
    bottom: 15,
    left: 15,
    display: "flex",
  },
  editText: {
    marginRight: 12,
    fontSize: 13,
    cursor: "pointer",
    color: appDefaultColor,
    fontWeight: appFontWeight,
    "&:hover": {
      textDecoration: "underline",
      color: "#C7511F",
    },
  },
  customerForm: {
    ...appScrollBar,
    overflowY: "auto",
    height: "550px",
  },
  checkboxText: {
    ...activeText,
  },
}));

const AddCustomerPage = ({ menuPortal = true }) => {
  const history = useHistory();
  const location = useLocation();
  const [selectedContact, setSelectedContact] = React.useState({});
  const [selectedAddress, setSelectedAddrsss] = React.useState({});
  const classes = useStyles();
  const [ledgerDetail, setLedgerDetails] = React.useState([])

  const [refresh, setRefresh] = React.useState(false);
  const [globalState, dispatch] = useStateValue();
  const [allGroup, setAllGroup] = React.useState([]);
  const [allArea, setAllArea] = React.useState([]);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [allReference, setAllReference] = React.useState([]);
  const [classicModal, setClassicModal] = React.useState(false);

  const [addReference, setAddReference] = React.useState({
    edit: false,
    reference_id: "",
    switch_active_status: true,
    txt_name: "",
    txt_mobile: "",
    txt_whatsapp: "",
    txt_email: "",
    txt_note: "",
  });
  const [openModes, setOpenModel] = React.useState({
    addNewReference: false,
    newSource: false,
  });
  // for Error handler state
  const [error, setError] = React.useState({
    txt_name: false,
    txt_mobile: false,
  });
  const [whichAddress, setWhichAddress] = React.useState({});
  const [hasBeenSubmitted, setHasBeenSubmitted] = React.useState(false);

  // Error handler
  const [cusError, setCusError] = React.useState({
    ddl_group: false,
    txt_name: false,
    ddl_references: false,
    txt_mobile: false,
    txt_company_name: false,
    ddl_dr_cr: false,
    txt_openingBalance:false,

  });
  // Error handler
  const [addError, setAddError] = React.useState({
    txt_name: false,
    txt_mobile: false,
    txt_street: false,
    txt_police_station: false,
  });
  // Error handler
  const [contError, setContError] = React.useState({
    txt_name: false,
    txt_mobile: false,
  });

  const [customerInfo, setCustomerInfo] = React.useState({
    edit: false,
    showAddressForm: false,
    showContactForm: false,
  });
  const onClickShowAddressForm = () => {
    setCustomerInfo((prv) => ({ ...prv, showAddressForm: true }));
  };
  const onClickShowContactForm = () => {
    setCustomerInfo((prv) => ({ ...prv, showContactForm: true }));
  };

  // Contact Form Section
  const [allContacts, setAllContacts] = React.useState([]);

  const [customerForm, setCustomerForm] = React.useState({
    edit: false,
    customer_id: "",
    txt_company_name: "",
    ddl_group: "",
    ddl_group_label: "Select",
    txt_website: "",
    txt_gst_no: "",
    ddl_references: "",
    ddl_references_label: "Select",
    txt_mobile: "",
    txt_whatsapp: "",
    txt_email: "",
    txt_name: "",
    ddl_dr_cr: "",
    ddl_dr_cr_label: "Select",
    txt_openingBalance:"",
    switch_active_status: true,
  });

  const option = [
    { value: 1, label: "Dr" },
    { value: 2, label: "Cr" },
  ];
  
  const toTitleCase = (str) => {
    if(str) {
      return str.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    }
  
    else {
      return "";
    }
    
  }



  
  const onChangeCustomerForm = (e) => {
    const { name, value } = e.target;
    ////console.log(name, "namela");

    if (name === "txt_company_name") {

      getAllCustomersChecking(
        value,
        (r) => {
          //console.log(value,"checking11")
          if(r[0]?.company === value){
            //console.log("25253")
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: "Customer Already Present", msgType: "error" },
            });
           
          }

        },
        (err) => {
 
        }
      );


      setCustomerForm((prv) => ({
        ...prv,
        ["txt_company_name"]: toTitleCase(value),
        ["txt_name"]: toTitleCase(value),
      }));
        
  
    } else if (name === "txt_mobile") {
      setCustomerForm((prv) => ({
        ...prv,
        ["txt_mobile"]: value,
        ["txt_whatsapp"]: value,
      }));
        
   
    } else {
      //console.log(name, "namela");
      setCustomerForm({ ...customerForm, [name]: value });
      
    }
    // setCustomerForm({

    //   ...customerForm,
    //   [name]: value,
    // });
  };

  // Add Contact Form state
  const [contactPerson, setContactPerson] = React.useState({
    edit: false,
    txt_name: "",
    txt_designation: "",
    txt_mobile: "",
    txt_whatsapp: "",
    txt_email: "",
  });

  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({ txt_name: false, txt_mobile: false });
    setAddReference({
      ...addReference,
      edit: false,
      switch_active_status: false,
      txt_name: "",
      txt_mobile: "",
      txt_whatsapp: "",
      txt_email: "",
      txt_note: "",
    });
  };
  // onSubmit called
  const onSubmitModel = (e) => {
    // e.preventDefault();
    if (!addReference.txt_name || !addReference.txt_mobile) {
      setError({
        ...error,
        txt_name: !addReference.txt_name,
        txt_mobile: !addReference.txt_mobile,
      });
    } else {
      if (addReference.edit) {
        updateReferences(
          addReference,
          (r) => {
            onCloseModel();
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "References Updated Successfully",
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
        );
      } else {
        postReferences(
          addReference,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "References added Successfully",
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
  // onChange Contact From
  const onChangeContact = (e) => 
  {
    const { name, value } = e.target;
    if (name === "txt_mobile") {

    setContactPerson((prv) => ({
      ...prv,
      ["txt_mobile"]: value,
      ["txt_whatsapp"]: value,
      }));
    } 

    else if (name === "txt_name") {

      setContactPerson((prv) => ({
        ...prv,
        ["txt_name"]: toTitleCase(value),
      }));
    }
    
    else {
      setContactPerson({ ...contactPerson, [name]: value });
    

    }
    // setContactPerson({ ...contactPerson, [name]: value });
  };

  // Address Section
  // all Address State
  const [allAddress, setAllAddAddress] = React.useState([]);
  // Add Address State
  const [addressForm, setAddressForm] = React.useState({
    isBillAddress: false,
    isShipppingAddress: false,
    isCommunicationAddress: false,
    edit: false,
    txt_name: "",
    txt_city: "Kolkata",
    ddl_state: "WB",
    ddl_state_label: "West Bengal",
    txt_pin: "",
    txt_street: "",
    txt_police_station: "",
    ddl_area: "",
    ddl_area_label: "Select",
    txt_mobile: "",
    txt_email: "",
  });

  // Edit Address
  const onClickEditAddress = (id) => {
    const selectAdd = allAddress.find((a, i) => i === id);
    setSelectedAddrsss(selectAdd);
    setAddressForm({ ...selectAdd, edit: true });
    const newAddress = allAddress.filter((a, i) => i !== id);
    setAllAddAddress(newAddress);
    onClickShowAddressForm();
  };
  // Remove Address
  const onRemoveAddress = (id) => {
    const newAddress = allAddress.filter((a, i) => id !== i);
    setAllAddAddress(newAddress);
  };
  // onChange Address
  const onChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddressForm({ ...addressForm, [name]: value });
  };

  // onClick Add Address
  const onClickAddAddress = () => {
    if (
      !addressForm.txt_name ||
      !addressForm.txt_mobile 
      // !addressForm.txt_pin 
      // !addressForm.txt_police_station
    ) {
      setAddError({
        txt_name: !addressForm.txt_name,
        txt_mobile: !addressForm.txt_mobile,
        // txt_pin: !addressForm.txt_pin,
        // txt_police_station: !addressForm.txt_police_station,
      });
    } else {
      setAllAddAddress((prv) => [
        ...prv,
        {
          ...addressForm,
        },
      ]);
      setAddressForm({ edit: false });
      setCustomerInfo((prv) => ({ ...prv, showAddressForm: false }));
    }
  };

  // onClick Add Contact From
  const onClickAddContact = () => {
    if (!contactPerson.txt_name || !contactPerson.txt_mobile) {
      setContError({
        txt_mobile: !contactPerson.txt_name,
        txt_name: !contactPerson.txt_mobile,
      });
    } else {
      setAllContacts([...allContacts, contactPerson]);
      setContactPerson({ edit: false });
      setCustomerInfo((prv) => ({ ...prv, showContactForm: false }));
    }
  };

  // onEdit Contact
  const onClickEditContact = (id) => {
    const selectCont = allContacts.find((a, i) => i === id);
    setSelectedContact(selectCont);
    setContactPerson({ ...selectCont, edit: true });
    const newContact = allContacts.filter((a, i) => i !== id);
    setAllContacts(newContact);
    onClickShowContactForm();
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    setAddReference({ ...addReference, [name]: value });
  };
  // ON Remove Contact
  const onRemoveContact = (id) => {
    const newContact = allContacts.filter((a, i) => id !== i);
    setAllContacts(newContact);
  };

  const onSelect = (name, v) => {
    //console.log(name,v.value,"7")
    switch (name) {
      case "ddl_group":
        //console.log("ting", v.label);
        setCustomerForm({
          ...customerForm,
          ddl_group: v.value,
          ddl_group_label: v.label,
        });
        break;
        case "ddl_dr_cr":
          setCustomerForm({
            ...customerForm,
            ddl_dr_cr: v.label,
            ddl_dr_cr_label: v.label,
          });
          break;

      case "ddl_references":
        if(v.value === "addNewReference"){
          setOpenModel({ ...openModes, addNewReference: true });
        }
        setCustomerForm({
          ...customerForm,
          ddl_references: v.value,
          ddl_references_label: v.label,
        });
        break;

      case "ddl_state":
        setAddressForm({
          ...addressForm,
          ddl_state: v.value,
          ddl_state_label: v.label,
        });
        break;

      case "ddl_area":
        setAddressForm({
          ...addressForm,
          ddl_area: v.value,
          ddl_area_label: v.label,
        });
        break;

      default:
        break;
    }
    // if (v.value === "addNewReference") {
    //   setOpenModel({ ...openModes, addNewReference: true });
    //   setCustomerForm({ ...customerForm, [name]: "" });
    // } else if (v.value === "openModel") {
    //   setCustomerForm({ ...customerForm, [name]: "" });
    // } else {
    //   setCustomerForm({ ...customerForm, [name]: v });
    // }
    // //console.log(customerForm.ddl_group_label, "chk form");
  };

  
  // Fetching all Data
  const fetchData = () => {
    getAllGroup(
      (r) => {
        setAllGroup(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    getAllCustomerArea(
      
      (r) => {
        setAllArea(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
    getAllReference(
      (r) => {
        setAllReference([
          { value: "addNewReference", label: "Add New Reference" },
          ...r,
        ]);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };


  const onSetActive = (e) => {
    //console.log(e.target.checked,"sen1311")
    setCustomerForm((prv) => ({ ...prv,
   switch_active_status : e.target.checked }));
  };
  // FORM DATA

  const formData2 = {
    formName: "Add a References",
    fields: [
      {
        name: "ddl_group",
        label: "Group",
        placeholder: "Select Group",
        hidden: false,
        required: false,
        data_type: "string",
        html_element: "select",
        error: false,
        options: allGroup,
      },
      {
        name: "txt_name",
        label: "Name",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "TextField",
        error: false,
      },

      {
        name: "txt_mobile",
        label: "Mobile",
        hidden: false,
        required: true,
        type: "mobile",
        data_type: "number",
        html_element: "TextField",
        error: false,
      },
      {
        name: "txt_whatsapp",
        label: "Whatsapp",
        hidden: false,
        required: false,
        type: "mobile",
        data_type: "number",
        html_element: "TextField",
        error: false,
      },
      {
        name: "txt_email",
        label: "Email",
        hidden: false,
        required: false,
        type: "email",
        data_type: "email",
        html_element: "TextField",
        error: false,
      },
      {
        name: "txt_note",
        label: "Note",
        hidden: false,
        required: false,
        type: "mobile",
        data_type: "string",
        html_element: "TextField",
        error: false,
      },

      {
        name: "switch_active_status",
        label: "Active Status",
        defaultValue: true,
        required: true,
        data_type: "string",
        html_element: "switch",
        error: false,
      },
    ],
  };
  const formData = [
    {
      formName: "fistForm",
      fields: [
        {
          name: "ddl_group",
          label: "Group",
          hidden: false,
          required: true,
          data_type: "string",
          html_element: "select",
          xs: 12,
          md: 6,
          lg: 4,
          options: allGroup,
        },
        {
          name: "txt_company_name",
          label: "Company Name",
          hidden: false,
          required: true,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 8,
        },
        {
          name: "txt_gst_no",
          label: "GST No",
          hidden: false,
          required: false,
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 4,
        },
        {
          name: "txt_website",
          label: "Website",
          hidden: false,
          required: false,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 8,
        },
        {
          name: "txt_name",
          label: "Name",
          hidden: false,
          required: true,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 4,
        },
        {
          name: "txt_email",
          label: "Email",
          hidden: false,
          required: false,
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 4,
        },

        {
          name: "txt_mobile",
          label: "Mobile",
          hidden: false,
          align: "left",
          required: true,
          data_type: "number",
          maxLength: 10,
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 2,
        },
        {
          name: "txt_whatsapp",
          label: "WhatsApp",
          hidden: false,
          required: false,
          align: "left",
          data_type: "number",
          maxLength: 10,
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 2,
        },
        {
          name: "ddl_references",
          label: "References",
          hidden: false,
          required: true,
          data_type: "string",
          html_element: "select",
          xs: 12,
          md: 6,
          lg: 4,
          options: allReference,
        },
        customerInfo.edit===true?'':
        {
          name: "txt_openingBalance",
          label: "Opening Balance",
          hidden: false,
          required: true,
          data_type: "number",
          html_element: "TextField",
          xs: 12,
          md: 6,
          lg: 4,
          // onClick: (e) => e.target.select()
          
        },
        customerInfo.edit===true?'':
        {
          name: "ddl_dr_cr",
          label: "Debit/Credit",
          hidden: false,
          required: true,
          data_type: "string",
          html_element: "select",
          xs: 12,
          md: 6,
          lg: 4,
          options: option,

        },

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
    },

    {
      formName: "addressForm",
      fields: [
        {
          name: "txt_name",
          label: "Name",
          hidden: false,
          required: true,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 4,
        },
        {
          name: "txt_mobile",
          label: "Mobile",
          hidden: false,
          required: true,
          align: "left",
          data_type: "tel",
          maxLength: 10,
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 2,
        },
        {
          name: "txt_email",
          label: "Email",
          hidden: false,
          required: false,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 6,
        },
        // {
        //   name: "txt_village_premises",
        //   label: "Area",
        //   hidden: false,
        //   required: false,
        //   align: "left",
        //   data_type: "string",
        //   html_element: "TextField",
        //   error: false,
        //   xs: 12,
        //   md: 6,
        //   lg: 5,
        // },
        {
          name: "ddl_area",
          label: "Area",
          hidden: false,
          required: true,
          data_type: "string",
          html_element: "select",
          xs: 12,
          md: 6,
          lg: 4,
          options: allArea,
        },

        {
          name: "txt_street",
          label: "Street",
          hidden: false,
          required: true,
          data_type: "string",
          align: "left",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 7,
        },
        {
          name: "txt_police_station",
          label: "Police Station",
          hidden: false,
          required: false,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 3,
        },
        {
          name: "txt_pin",
          label: "Pin Code",
          hidden: false,
          required: false,
          align: "left",
          data_type: "number",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 2,
        },
        {
          name: "txt_city",
          label: "City",
          hidden: false,
          required: true,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 3,
        },
        {
          name: "ddl_state",
          label: "State",
          hidden: false,
          required: true,
          data_type: "string",
          html_element: "select",
          xs: 12,
          md: 6,
          lg: 4,
          options: allStates,
        },
        {
          name: "switchStatusBtn",
          label: "Add",
          html_element: "addBtn",
          xs: 12,
          md: 6,
          lg: 12,
        },
      ],
    },

    {
      formName: "contactForm",
      fields: [
        {
          name: "txt_name",
          label: "Name",
          hidden: false,
          required: true,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 4,
        },
        {
          name: "txt_designation",
          label: "Designation",
          hidden: false,
          required: false,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 8,
        },
        {
          name: "txt_mobile",
          label: "Mobile",
          hidden: false,
          required: true,
          align: "left",
          data_type: "tel",
          maxLength: 10,
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 4,
        },
        {
          name: "txt_whatsapp",
          label: "WhatsApp",
          hidden: false,
          required: false,
          align: "left",
          data_type: "tel",
          maxLength: 10,
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 4,
        },
        {
          name: "txt_email",
          label: "Email",
          hidden: false,
          required: false,
          align: "left",
          data_type: "email",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 4,
        },
        {
          name: "btnAdd",
          label: "Add",
          html_element: "addBtn",
          xs: 12,
          md: 6,
          lg: 12,
        },
      ],
    },
  ];

  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  //console.log(ledgerDetail.ledger_id,"cus")
  // ON click Submit from
  const onClickSubmitForm = () => {
    
    if (
      !addressForm.txt_city ||
      !addressForm.ddl_state
    )
      setAddressForm({ 
        txt_city:"Kolkata",
        ddl_state:"West Bengal"
      })


    
    if (
      !customerForm.ddl_group ||
      
      !customerForm.txt_name ||
      !customerForm.txt_mobile ||
      !customerForm.txt_company_name
    ) {
      setCusError({
        ...cusError,
        ddl_group: !customerForm.ddl_group,
        txt_mobile: !customerForm.txt_mobile,
        txt_name: !customerForm.txt_name,
        ddl_references: !customerForm.ddl_references,
        ddl_dr_cr: !customerForm.ddl_dr_cr,
        txt_openingBalance:!customerForm.txt_openingBalance,
        txt_company_name: !customerForm.txt_company_name,
      });
    } else {
      let defaultContact = {
        defaultContact: true,
        txt_name: customerForm.txt_name,
        txt_designation: "",
        txt_mobile: customerForm.txt_mobile,
        txt_whatsapp: customerForm.txt_whatsapp,
        txt_email: customerForm.txt_email,
      };

      const contacts = [defaultContact, ...allContacts];

      if (customerInfo.edit) {
        updateCustomer(
          customerForm,
          contacts,
          allAddress,
          ledgerDetail?.ledger_id,
          (r) => {
            onCloseModel();
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Customer Updated Successfully",
                msgType: "success",
              },
            });
            onClickSaveClearState();
            // history.push("/admin/master/customer");
            history.goBack()
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      } else {
        postCustomerForm(
          customerForm,
          contacts,
          allAddress,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Customer added Successfully",
                msgType: "success",
              },
            });
            onClickSaveClearState();
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
        // postLedgerAccountFromCustomer(
        //   customerForm,
        //   info,
        //   globalState?.user?.serial_id,
        //   (r) => {
        //     onClickSaveClearState();
        //     setRefresh(!refresh);
        //   },
        //   setHasBeenSubmitted(true),
        //   (err) => {
        //     dispatch({
        //       type: actionTypes.SET_OPEN_MSG,
        //       payload: { msg: err, msgType: "error" },
        //     });
        //   }
        // );
      }
    }
   
  };

  React.useEffect(() => {
    if (location?.state?.edit) {
    //console.log(location?.state,"1420223")
    if(location.state?.row?.company){
      getLedgerByCustomerName(
        location.state?.row?.company,
        (r)=>{
          //console.log(r[0],"999d13")
    
          setLedgerDetails(r[0]);
    
          // ledger_account_id.push(r);
          //ledger_account_id = r[0]?.ledger_id;
        },
        (err) => {
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: err, msgType: "error" },
          });
        }
      );
    }
      setCustomerInfo({ ...customerInfo, edit: location.state?.edit });
      setCustomerForm({

        customer_id: location.state?.row?.customer_id,
        txt_company_name: location.state?.row?.company,
        ddl_group: location.state?.row?.group_id,
        ddl_group_label: location?.state?.row?.group_name,
         ddl_references: location.state?.row?.reference_id,
        ddl_references_label: location.state?.row?.reference_name,
        txt_website: location.state?.row?.website,
        txt_gst_no: location.state?.row?.gst,
        ddl_dr_cr: location.state?.row?.dr_cr,
        // ddl_dr_cr_label: location.state?.row?.dr_cr,
        // txt_openingBalance:location.state?.row?.opening_balance,
        txt_mobile: location?.state?.row?.allContacts[0]?.txt_mobile,
        txt_whatsapp: location.state?.row?.allContacts[0]?.txt_whatsapp,
        txt_email: location.state?.row?.allContacts[0]?.txt_email,
        txt_name: location.state?.row?.allContacts[0]?.txt_name,
        // switch_active_status:location.state?.row?.status === "Y" ? true : false,
        switch_active_status:true
      });

      setAddressForm({
        txt_name: location.state?.row?.allContacts[0]?.txt_name,
        txt_mobile:location?.state?.row?.allContacts[0]?.txt_mobile,
        txt_city: (location.state?.row?.allAddress.length > 0 ? location.state?.row?.allAddress[0]?.txt_city : "Kolkata") ,
        ddl_state: (location.state?.row?.allAddress.length > 0 ? location.state?.row?.allAddress[0]?.ddl_state : "WB"),
        ddl_state_label: (location.state?.row?.allAddress.length > 0 ? location.state?.row?.allAddress[0]?.ddl_state_label : "West Bengal"),
      });
      //console.log("alladd", allAddress);
      const c = location.state?.row?.allContacts;
      c.shift();
      setAllContacts(c);
      if(allAddress.length > 0) {
        setAllAddAddress(location.state?.row?.allAddress);
      }
      
    }else{
      setCustomerForm({
        // customer_id: location.state?.row?.customer_id,
        // txt_company_name: location.state?.row?.company,
        // ddl_group: location.state?.row?.group_id,
        // ddl_group_label: location?.state?.row?.group_name,
     
        // txt_website: location.state?.row?.website,
        // txt_gst_no: location.state?.row?.gst,
   
        ddl_dr_cr_label: "Dr",
        txt_openingBalance:0,
        ddl_references_label:"Walkin",
        // txt_mobile: location?.state?.row?.allContacts[0]?.txt_mobile,
        // txt_whatsapp: location.state?.row?.allContacts[0]?.txt_whatsapp,
        // txt_email: location.state?.row?.allContacts[0]?.txt_email,
        // txt_name: location.state?.row?.allContacts[0]?.txt_name,
       
        switch_active_status:true,
      });
    }
  }, []);

  const onCloseAddAddress = () => {
    if (addressForm.edit) {
      setAllAddAddress((prv) => [
        ...prv,
        {
          ...selectedAddress,
        },
      ]);
    }
    setAddressForm({ edit: false });
    setAddError({});
    setCustomerInfo((prv) => ({ ...prv, showAddressForm: false }));
  };
  const onCloseAddContact = () => {
    if (contactPerson.edit) {
      setAllContacts([...allContacts, selectedContact]);
    }
    setContError({});
    setContactPerson({ edit: false });
    setCustomerInfo((prv) => ({ ...prv, showContactForm: false }));
  };

  const onClickSaveClearState = () => {
    setCusError({});
    setCustomerInfo({
      showAddressForm: false,
      showContactForm: false,
      edit: false,
    });
    setCustomerForm({
      customer_id: "",
      txt_company_name: "",
      ddl_group: "",
      ddl_group_label: "Select",
      txt_website: "",
      txt_gst_no: "",
      ddl_references: "",
      ddl_references_label: "Select",
      txt_mobile: "",
      txt_whatsapp: "",
      txt_email: "",
      txt_name: "",
      ddl_dr_cr:"",
      ddl_dr_cr_label:"Select",
      txt_openingBalance:"",
    });
    setAllAddAddress([]);
    setAllContacts([]);
  };

  const onMenuOpen = () => {
    // list All Custoner
    getAllReference(
      (r) => {
        setAllReference([
          { value: "addNewReference", label: "Add New Reference" },
          ...r,
        ]);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };
  const onBackToCustomerList = () => {
    // history.push("/admin/master/customer");
    history.goBack()
  };

  const onSetAddres = (e, id, name) => {
    let updatedAddress = allAddress;
    updatedAddress[id][name] = e.target.checked;
    setAllAddAddress([...updatedAddress]);
  };

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title={customerInfo.edit ? "Customer > Edit" : "Customer > Add"}
      />
      <div className={classes.root}>
        <GridContainer flexWarp="reverse">
          <GridItem xs={12} md={12} lg={9} className={classes.customerForm}>
            <GridContainer>
              <GridItem xs="12">
                <CustomCard
                  width="100%"
                  height="100%"
                  cdTitle={
                    customerInfo.edit ? "Edit a Customer" : "Add New Customer"
                  }
                >
                  <from>
                    <GridContainer style={{ padding: 20 }}>
                      <GridItem xs={12}>
                        {formData.map((form, fkey) => {
                          {/* //console.log("cf koro", customerForm); */}
                          return (
                            <GridContainer alignItems="flex-end" key={fkey}>
                              {form.formName === "fistForm" &&
                                form.fields.map((item, key) => {
                                  return (
                                    <FormComponent
                                      item={item}
                                      key={key}
                                      menuPortal={menuPortal}
                                      onSelect={onSelect}
                                      onSetActive={onSetActive}
                                      state={customerForm}
                                      onChange={onChangeCustomerForm}
                                      error={cusError}

                                    />
                                  );
                                })}
                            </GridContainer>
                          );
                        })}
                      </GridItem>
                    </GridContainer>
                  </from>
                </CustomCard>
              </GridItem>

              {customerInfo.showAddressForm && (
                <GridItem xs={12}>
                  <CustomCard
                    cdTitle={addressForm.edit ? "Edit Address" : "Add Address"}
                    width="100%"
                    height="100%"
                    close
                    onClose={onCloseAddAddress}
                    style={{ marginTop: 0 }}
                  >
                    {formData.map((form, fkey) => {
                      return (
                        <GridContainer
                          key={fkey}
                          alignItems="center"
                          style={{ padding: "5px 20px" }}
                        >
                          {form.formName === "addressForm" &&
                            form.fields.map((item, key) => {
                              return (
                                <FormComponent
                                  item={item}
                                  key={key}
                                  onClickAdd={onClickAddAddress}
                                  onSelect={onSelect}
                                  state={addressForm}
                                  menuPortal={menuPortal}
                                  onChange={onChangeAddress}
                                  error={addError}
                                />
                              );
                            })}
                        </GridContainer>
                      );
                    })}
                  </CustomCard>
                </GridItem>
              )}

              {allAddress.length > 0 && (
                <GridItem xs="12">
                  <CustomCard cdTitle="Addresses">
                    <GridItem xs="15" style={{ margin: "20px 0px" }}>
                      <GridContainer>
                        <AddInfoCard
                          title="Add a New Address"
                          onClickShow={onClickShowAddressForm}
                        />
                        {allAddress.map((a, id) => (
                          <AddressCard
                            a={a}
                            id={id}
                            key={id}
                            onClickEdit={onClickEditAddress}
                            onRemove={onRemoveAddress}
                            onSetAddres={onSetAddres}
                            state={addressForm}
                          />
                        ))}
                      </GridContainer>
                    </GridItem>
                  </CustomCard>
                </GridItem>
              )}

              {customerInfo.showContactForm && (
                <GridItem xs={12}>
                  <CustomCard
                    cdTitle={
                      contactPerson.edit ? "Edit Contact" : "Add Contact"
                    }
                    width="100%"
                    height="100%"
                    close
                    onClose={onCloseAddContact}
                    style={{ marginTop: 0 }}
                  >
                    {formData.map((form, fkey) => {
                      return (
                        <GridContainer
                          key={fkey}
                          style={{ padding: "5px 20px" }}
                        >
                          {form.formName === "contactForm" &&
                            form.fields.map((item, key) => {
                              return (
                                <FormComponent
                                  item={item}
                                  key={key}
                                  onClickAdd={onClickAddContact}
                                  onSelect={onSelect}
                                  state={contactPerson}
                                  menuPortal={menuPortal}
                                  onChange={onChangeContact}
                                  onMenuOpen={onMenuOpen}
                                  error={contError}
                                />
                              );
                            })}
                        </GridContainer>
                      );
                    })}
                  </CustomCard>
                </GridItem>
              )}

              {allContacts.length > 0 && (
                <GridItem xs="12">
                  <CustomCard cdTitle="Contacts">
                    <GridItem xs={12} style={{ margin: "20px 0px" }}>
                      <GridContainer>
                        <AddInfoCard
                          title="Add a New Contact"
                          onClickShow={onClickShowContactForm}
                        />
                        {allContacts.map((a, id) => (
                          <ViewCard
                            id={id}
                            key={id}
                            a={a}
                            onClickEdit={onClickEditContact}
                            onRemove={onRemoveContact}
                          />
                        ))}
                      </GridContainer>
                    </GridItem>
                  </CustomCard>
                </GridItem>
              )}
            </GridContainer>
          </GridItem>

          <GridItem xs={12} md={12} lg={3}>
            <CustomCard cdTitle="Advance Setting">
              <Grid container alignItems="center" justify="center">
                <Grid item xs="8">
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    className={classes.addFormbtn}
                    variant="outlined"
                    onClick={onClickShowAddressForm}
                    name="address_btn"
                    color="primary"
                  >
                    Add Address
                  </Button>
                </Grid>
                <Grid item xs={8}>
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={onClickShowContactForm}
                    className={classes.addFormbtn}
                    variant="outlined"
                    color="primary"
                    name="contact_btn"
                  >
                    Add Contact
                  </Button>
                </Grid>
              </Grid>
            </CustomCard>
          </GridItem>
        </GridContainer>
        <GridContainer className={classes.actionFooter}>
          <GridItem xs={9}>
            <div className={classes.actionbtns}>
              <ColoseButton height={39} onClick={onBackToCustomerList}>
                Back
              </ColoseButton>
              <Button
                onClick={onClickSubmitForm}
                className={classes.actionbtn}
                variant="outlined"
                color="primary"
                disabled={hasBeenSubmitted}
              >
                Submit
              </Button>
            </div>
          </GridItem>

          <MasterModel
            classicModal={openModes.addNewReference}
            onCloseModel={() =>
              setOpenModel({ ...openModes, addNewReference: false })
            }
            width={450}
            height="auto"
            // modelName="Add an References"
            okBtnText="Submit"
            modelName={addReference.edit ? "Edit Reference" : "Add Reference"}
            onClickOk={onSubmitModel}
            disabled={buttonDisabled}

          >
            <div style={{ padding: "20px 10px", width: "100%" }}>
              <GridContainer>
                {formData2.fields.map((item, key) => {
                  return (
                    <>
                      <GridItem xs={12} key={key}>
                        {item.html_element === "select" && (
                          <>
                            <InputLabel id="label">{item.label}</InputLabel>
                            <ReactSelect
                              options={allGroup}
                              placeholder="Select"
                              formatGroupLabel={(d) => d.label}
                              // menuPortalTarget={document.body}
                              styles={reactSelectStyles}
                              className={classes.customSelect}
                              // onChange={(v) => onSelect("ddl_brand_id", v)}
                              // value={{
                              //   label: addSearch.ddl_brand_label,
                              //   value: addSearch.ddl_brand_id,
                              // }}
                            />
                          </>
                        )}

                        {item.html_element === "TextField" && (
                          <>
                            <InputLabel required={item.required} id="label">
                              {item.label}
                            </InputLabel>
                            <TextField
                              size="small"
                              required={item.required}
                              placeholder={item.label}
                              name={item.name}
                              type={item.data_type}
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
                              value={addReference[item.name]}
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
                              id="outlined-basic"
                              fullWidth={true}
                              value={addReference[item.name]}
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
                              checked={addReference[item.name]}
                              name={item.name}
                              fullWidth={true}
                              inputProps={{
                                "aria-label": "primary checkbox",
                              }}
                              color="primary"
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
                              checked={customerForm[item.name]}
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
        </GridContainer>
      </div>
    </ThemeProvider>
  );
};

export default AddCustomerPage;
