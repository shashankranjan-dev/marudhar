import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import theme from "../../../theme/theme";
import Paper from "@material-ui/core/Paper";
import { CustomCard } from "views/Components/CustomCard";
import { appDefaultColor } from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import CustomButton from "views/Components/CustomButton";
import { whiteColor } from "assets/jss/material-dashboard-pro-react";
import CardLinkButton from "views/Components/CardLinkButton";
import { Divider, OutlinedInput, Grid } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { CircleAddBtn } from "views/Components/CustomButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { appFontWeight } from "assets/jss/material-dashboard-pro-react";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@mui/icons-material/Add";
import cls from "classnames";
// Import Services
import {
  getAllVendorsChecking,
  getAllGroup,
  getAllReference,
  postLedgerAccountFromVendor,
  postVendorForm,
  updateVendor,
  getLedgerByVendorName,
} from "../../../services/vendorService";
import { getListBank } from "../../../services/bankService";
import Typography from "@material-ui/core/Typography";
import { appScrollBar } from "assets/jss/material-dashboard-pro-react";
import { ColoseButton } from "../../Components/CustomButton";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import {
  appFontWeightBold,
  appSecondColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { appLabelFont } from "assets/jss/material-dashboard-pro-react";
import { appFontWeightThin } from "assets/jss/material-dashboard-pro-react";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import PageTitle from "../HelperComponent/PageTitle";
import ReactSelect from "react-select";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import { useHistory, useLocation } from "react-router-dom";
import FormComponent from "../HelperComponent/FormComponent";
import { allStates } from "../HelperComponent/utils";
import ViewCard, {
  AddInfoCard,
  AddressCard,
  ViewBankCard,
} from "../HelperComponent/ViewCard";
import { FormatListNumberedRtlTwoTone } from "@mui/icons-material";
const useStyles = makeStyles((theme) => ({
  ...customCheckboxRadioSwitch,
  root: {
    overflow: "hidden",
  },
  addFormbtn: {
    width: 170,
  },
  addressCard: {
    minHeight: 230,
    maxHeight: 230,
    width: 265,
    minWidth: 265,
    maxWidth: 265,
    position: "relative",
    padding: "15px",
  },
  addAddressCard: {
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
    right: 5,
    // zIndex: 100,
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
  customSelect: {
    marginBottom: 15,
  },
  vendorForm: {
    ...appScrollBar,
    overflowY: "auto",
    height: "550px",
  },
  checkboxText: {
    ...activeText,
  },
}));

const VedorTypeForm = ({ menuPortal = true, directPurchase = false }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [listBank, setAllListBank] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [state, setState] = React.useState({
    edit: false,
    showAddressForm: false,
    showContactForm: false,
    showAddBankForm: false,
  });

  // Error handler
  const [cusError, setCusError] = React.useState({
    ddl_vendor_group: "",
    txt_company: "",
    txt_gst_no: "",
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

  // Error handler
  const [bnkError, setBnkError] = React.useState({
    ddl_bank: false,
    txt_branch: false,
    txt_account_no: false,
    txt_ifsc_Code: false,
  });

  // For Editing  Contact , Address , Bank
  const [selectedContact, setSelectedContact] = React.useState({});
  const [selectedAddress, setSelectedAddrsss] = React.useState({});
  const [selectedBank, setSelectedBank] = React.useState({});

  const [allGroup, setAllGroup] = React.useState([]);
  const [allReference, setAllReference] = React.useState([]);
  const [allAddress, setAllAddAddress] = React.useState([]);
  // Add Address State
  const [addressForm, setAddressForm] = React.useState({
    edit: false,
    txt_name: "",
    txt_city: "",
    ddl_state: "",
    ddl_state_label: "Select",
    txt_pin: "",
    txt_street: "",
    txt_police_station: "",
    txt_village_premises: "",
    txt_mobile: "",
    txt_email: "",
  });

  const [LedgerAccountId,setLedgerAccountId]=React.useState(0)
  //Debit Credit options

  const option = [
    { value: 1, label: "Dr" },
    { value: 2, label: "Cr" },
  ];

  const [allBanks, setAllBanks] = React.useState([]);

  const onAddAddressForm = () => {
    setState((prv) => ({ ...prv, showAddressForm: true }));
  };
  const onAddContactForm = () => {
    setState((prv) => ({ ...prv, showContactForm: true }));
  };
  const onAddBankForm = () => {
    setState((prv) => ({ ...prv, showAddBankForm: true }));
  };

  const onSetAddres = (e, id, name) => {
    let updatedAddress = allAddress;
    updatedAddress[id][name] = e.target.checked;
    setAllAddAddress([...updatedAddress]);
  };

  const [bankForm, setBankForm] = React.useState({
    edit: false,
    ddl_bank: "",
    ddl_bank_label: "Select",
    txt_branch: "",
    txt_account_no: "",
    txt_Ifsc_code: "",
  });

  const [vendorForm, setVendorForm] = React.useState({
    vendor_id: "",
    ddl_vendor_group: "",
    ddl_vendor_group_label: "Select",
    txt_gst_no: "",
    txt_company_name: "",
    txt_website: "",
    ddl_references: "",
    ddl_references_label: "Select",
    ddl_dr_cr: "",
    ddl_dr_cr_label: "Select",
    txt_openingBalance:"",
    switch_active_status:true,

  });

  // All Contact Form
  const [allContacts, setAllContacts] = React.useState([]);
  // Add Customer form State
  const [contactPerson, setContactPerson] = React.useState({
    edit: false,
    txt_name: "",
    txt_designation: "",
    txt_mobile: "",
    txt_whatsapp: "",
    txt_email: "",
  });

  // onChange Contact Person
  const onChangeContact = (e) => {
    const { name, value } = e.target;
    if (name === "txt_mobile") {
      setContactPerson((prv) => ({
        ...prv,
        ["txt_mobile"]: value,
        ["txt_whatsapp"]: value,
      }));
    }
    else {
      setContactPerson({ ...contactPerson, [name]: value });
    }
    // setContactPerson({ ...contactPerson, [name]: value });
  };

  const onSetActive = (e)=>{
    setVendorForm((prv) => ({...prv,[e.target.name]:e.target.checked}))
  }

  // onclick Add Contact
  const onClickAddContact = () => {
    if (!contactPerson.txt_name || !contactPerson.txt_mobile) {
      setContError({
        txt_mobile: !contactPerson.txt_name,
        txt_name: !contactPerson.txt_mobile,
      });
    } else {
      setAllContacts((prv) => [
        ...prv,
        {
          ...contactPerson,
        },
      ]);
      setContactPerson({});
      setState((prv) => ({ ...prv, showContactForm: false }));
    }
  };

  // Edit Contact
  const onClickEditContact = (id) => {
    const selectCont = allContacts.find((a, i) => i === id);
    setSelectedContact(selectCont);
    setContactPerson({ ...selectCont, edit: true });
    const restContact = allContacts.filter((a, i) => i !== id);
    setAllContacts(restContact);
    onAddContactForm();
  };
  // on Remove Contact

  const onRemoveAddress = (id) => {
    const newAddress = allAddress.filter((a, i) => id !== i);
    setAllAddAddress(newAddress);
  };
  const onRemoveContact = (id) => {
    const restContact = allContacts.filter((a, i) => id !== i);
    setAllContacts(restContact);
  };

  const onRemoveBank = (id) => {
    const restBanks = allBanks.filter((a, i) => id !== i);
    setAllBanks(restBanks);
  };

  const onClickEditBank = (id) => {
    const selectBank = allBanks.find((a, i) => i === id);
    setSelectedBank(selectBank);
    setBankForm({ ...selectBank, edit: true });
    const banks = allBanks.filter((a, i) => i !== id);
    setAllBanks(banks);
    onAddBankForm();
  };
  const onClickEditAddress = (id) => {
    const selectAdd = allAddress.find((a, i) => i === id);
    setSelectedAddrsss(selectAdd);
    setAddressForm({ ...selectAdd, edit: true });
    const newAddress = allAddress.filter((a, i) => i !== id);
    setAllAddAddress(newAddress);
    onAddAddressForm();
  };
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
    //console.log(value,"77")
    
    setVendorForm({
      ...vendorForm,
      [name]:  toTitleCase(value),
    });

    getAllVendorsChecking(
      value,
      (r) => {
        //console.log(r,"checking11")
        if(r[0]?.company === value){
          //console.log("25253")
          dispatch({
            type: actionTypes.SET_OPEN_MSG,
            payload: { msg: "Vendor Already Present", msgType: "error" },
          });
          // setCusError({
          //   ...cusError,
          //   // ddl_group: !customerForm.ddl_group,
          //   // txt_mobile: !customerForm.txt_mobile,
          //   // txt_name: !customerForm.txt_name,
          //   // ddl_references: !customerForm.ddl_references,
          //   // ddl_dr_cr: !customerForm.ddl_dr_cr,
          //   // txt_openingBalance:!customerForm.txt_openingBalance,
          //   txt_company_name: !customerForm.txt_company_name,
          // });
        }
    // setLoading(false);
      },
      (err) => {
    // setLoading(false);
        // dispatch({
        //   type: actionTypes.SET_OPEN_MSG,
        //   payload: { msg: err, msgType: "error" },
        // });
      }
    );
    
  };

  const onChangeBankForm = (e) => {
    const { name, value } = e.target;
    setBankForm({
      ...bankForm,
      [name]: value,
    });
  };
  const onChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddressForm({ ...addressForm, [name]: value });
  };

  const onClickAddAddress = () => {
    if (
      !addressForm.txt_name ||
      !addressForm.txt_mobile ||
      !addressForm.txt_pin ||
      !addressForm.txt_police_station
    ) {
      setAddError({
        txt_name: !addressForm.txt_name,
        txt_mobile: !addressForm.txt_mobile,
        txt_pin: !addressForm.txt_pin,
        txt_police_station: !addressForm.txt_police_station,
      });
    } else {
      setAllAddAddress((prv) => [
        ...prv,
        {
          ...addressForm,
        },
      ]);
      setAddressForm({});
      setState((prv) => ({ ...prv, showAddressForm: false }));
    }
  };

  const onClickAddBank = () => {
    if (
      !bankForm.ddl_bank ||
      !bankForm.txt_branch ||
      !bankForm.txt_account_no ||
      !bankForm.txt_Ifsc_code
    ) {
      setBnkError({
        ddl_bank: !bankForm.ddl_bank,
        txt_branch: !bankForm.txt_branch,
        txt_account_no: !bankForm.txt_account_no,
        txt_Ifsc_code: !bankForm.txt_Ifsc_code,
      });
    } else {
      setAllBanks((prv) => [...prv, bankForm]);
      setBankForm({});
      setState((prv) => ({ ...prv, showAddBankForm: false }));
    }
  };

  const formData = [
    {
      formName: "fistForm",
      fields: [
        {
          name: "ddl_vendor_group",
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
          required: true,
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
          name: "ddl_references",
          label: "References",
          hidden: false,
          required: false,
          data_type: "string",
          html_element: "select",
          xs: 12,
          md: 6,
          lg: 4,
          options: allReference,
        },
        {
          name: "txt_openingBalance",
          label: "Opening Balance",
          hidden: false,
          required: false,
          data_type: "number",
          html_element: "TextField",
          xs: 12,
          md: 6,
          lg: 4,
          
        },
        {
          name: "ddl_dr_cr",
          label: "Debit/Credit",
          hidden: false,
          required: false,
          data_type: "string",
          html_element: "select",
          xs: 12,
          md: 6,
          lg: 4,
          options: option,
        },
        {
          name: "switch_active_status",
          label: " Active Status",
          hidden: false,
          required: false,
          align: "left",
          html_element: "switch",
          error: false,
          xs: 12,
          md: 6,
          lg: 4,
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
          data_type: "number",
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
        {
          name: "txt_villege_premeses",
          label: "Village/Premises",
          hidden: false,
          required: true,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 5,
        },

        {
          name: "txt_street",
          label: "Street",
          hidden: false,
          required: false,
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
          required: true,
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
          name: "add_btn",
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
          required: FormatListNumberedRtlTwoTone,
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

    {
      formName: "bankDetails",
      fields: [
        {
          name: "ddl_bank",
          label: "Bank",
          hidden: false,
          required: true,
          data_type: "string",
          html_element: "select",
          xs: 12,
          md: 6,
          lg: 8,
          options: listBank,
        },
        {
          name: "txt_branch",
          label: "Branch",
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
          name: "txt_account_no",
          label: "Account No",
          hidden: false,
          required: true,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 6,
        },
        {
          name: "txt_Ifsc_code",
          label: "IFSC Code",
          hidden: false,
          required: true,
          align: "left",
          data_type: "string",
          html_element: "TextField",
          error: false,
          xs: 12,
          md: 6,
          lg: 6,
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

  // FOR *SELECT FIED*
  const onSelect = (name, v) => {
    switch (name) {
      case "ddl_vendor_group":
        setVendorForm({
          ...vendorForm,
          ddl_vendor_group: v.value,
          ddl_vendor_group_label: v.label,
        });
        break;
      case "ddl_references":
        setVendorForm({
          ...vendorForm,
          ddl_references: v.value,
          ddl_references_label: v.label,
        });
        break;
        case "ddl_dr_cr":
          setVendorForm({
            ...vendorForm,
            ddl_dr_cr: v.label,
            ddl_dr_cr_label: v.label,
          });
          break;
      case "ddl_state":
        setAddressForm({
          ...addressForm,
          ddl_state: v.value,
          ddl_state_label: v.label,
        });
      case "ddl_bank":
        setBankForm({
          ...bankForm,
          ddl_bank_label: v.label,
          ddl_bank: v.value,
        });
        break;
      default:
        break;
    }
  };

  // FETCH ALL DATA
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
    getListBank(
      (r) => {
        setAllListBank(r);
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
        setAllReference(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };
  // USE_EFFECT
  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  React.useEffect(() => {
    if (!directPurchase) {
      if (location?.state?.edit) {
        //console.log(location.state?.row,"sen0909")
        setState({ ...state, edit: location.state?.edit });
        setVendorForm({
          vendor_id: location.state?.row?.vendor_id,
          txt_company_name: location.state?.row?.company,
          ddl_vendor_group: location.state?.row?.group_id,
          ddl_vendor_group_label: location?.state?.row?.group_name,
          ddl_references: location.state?.row?.reference_id,
          ddl_references_label: location.state?.row?.reference_name,
          ddl_dr_cr: location.state?.row?.dr_cr,
          ddl_dr_cr_label: location.state?.row?.dr_cr,
          txt_openingBalance:location.state?.row?.opening_balance,
          txt_website: location.state?.row?.website,
          txt_gst_no: location.state?.row?.gst,
          switch_active_status:location.state?.row?.status === "Y" ? true : false,

        });
        getLedgerByVendorName(
          location.state?.row?.company,
          (r)=>{
            //console.log(r[0].ledger_id,"sen0909/id")
            setLedgerAccountId(r[0].ledger_id)
          },
          (error)=>{
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: error, msgType: "error" },
            });
          }
        )
        setAllContacts(location.state?.row?.allContacts);
        setAllAddAddress(location.state?.row?.allAddress);
        setAllBanks(location.state?.row?.allBanks);
      }else{
        setVendorForm({
          // vendor_id: location.state?.row?.vendor_id,
          // txt_company_name: location.state?.row?.company,
          // ddl_vendor_group: location.state?.row?.group_id,
          // ddl_vendor_group_label: location?.state?.row?.group_name,
          // ddl_references: location.state?.row?.reference_id,
          // ddl_dr_cr: location.state?.row?.dr_cr,
          ddl_dr_cr_label: "Cr",
          txt_openingBalance:0,
          // txt_website: location.state?.row?.website,
          // txt_gst_no: location.state?.row?.gst,
          // switch_active_status:location.state?.row?.status === "Y" ? true : false,

        });
      }
    }
  }, []);

  // ON click Submit from
  const onClickSubmitForm = () => {
    if (
      !vendorForm.ddl_vendor_group ||
      !vendorForm.txt_gst_no ||
      !vendorForm.txt_company_name
    ) {
      setCusError({
        ...cusError,
        ddl_vendor_group: !vendorForm.ddl_vendor_group,
        txt_gst_no: !vendorForm.txt_gst_no,
        txt_company_name: !vendorForm.txt_company_name,
      });
    } else {
      if (state.edit) {
        updateVendor(
          vendorForm,
          LedgerAccountId,
          allContacts,
          allAddress,
          allBanks,
          (r) => {
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Vendor Updated Successfully",
                msgType: "success",
              },
            });
            onClickSaveClearState();
            history.push("/admin/master/vendors");
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
      } else {
       
        postVendorForm(
          vendorForm,
          allContacts,
          allAddress,
          allBanks,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Vendor added Successfully",
                msgType: "success",
              },
            });
            onClickSaveClearState();
            setRefresh(!refresh);
            setButtonDisabled(true);
          },
          (err) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: { msg: err, msgType: "error" },
            });
          }
        );
        // postLedgerAccountFromVendor(
        //   vendorForm,
        //   globalState?.user?.serial_id,
        //   (r) =>{
        //     onClickSaveClearState();
        //     setRefresh(!refresh);
        //   },
        //   (err) => {
        //     dispatch({
        //       type: actionTypes.SET_OPEN_MSG,
        //       payload: { msg: err, msgType: "error" },
        //     });
        //   }
        // )
        
      }
    }
    
  };

  // on Close Form
  const onCloseAddAddress = () => {
    if (addressForm.edit) {
      setAllAddAddress((prv) => [
        ...prv,
        {
          ...selectedAddress,
        },
      ]);
    }
    setAddError({});
    setAddressForm({ edit: false });
    setState((prv) => ({ ...prv, showAddressForm: false }));
  };
  const onCloseAddContact = () => {
    if (contactPerson.edit) {
      setAllContacts([...allContacts, selectedContact]);
    }
    setContError({});
    setContactPerson({ edit: false });
    setState((prv) => ({ ...prv, showContactForm: false }));
  };
  const onCloseAddBank = () => {
    if (bankForm.edit) {
      setAllBanks([...allBanks, selectedBank]);
    }
    setBnkError({});
    setBankForm({ edit: false });
    setState((prv) => ({ ...prv, showAddBankForm: false }));
  };

  const onClickSaveClearState = () => {
    setCusError({});
    setVendorForm({
      vendor_id: "",
      ddl_vendor_group: "",
      ddl_vendor_group_label: "Select",
      ddl_dr_cr:"",
      ddl_dr_cr_label:"Select",
      txt_openingBalance:"",
      txt_gst_no: "",
      txt_company_name: "",
      txt_website: "",

      ddl_references: "",
      ddl_references_label: "Select",
    });
    setAllAddAddress([]);
    setAllContacts([]);
    setAllBanks([]);
  };

  const onBackToVendorList = () => {
    history.push("/admin/master/vendors");
  };

  return (
    <ThemeProvider theme={theme}>
      <PageTitle title={state.edit ? "Vendors > Edit" : "Vendor Add"} />
      <div className={classes.root}>
        <GridContainer>
          <GridItem xs="9" className={classes.vendorForm}>
            <GridContainer>
              <GridItem xs="12">
                <CustomCard
                  width="100%"
                  height="100%"
                  cdTitle={state.edit ? "Edit Vendor " : "Add New Vendor"}
                >
                  <from>
                    <GridContainer style={{ padding: 20 }}>
                      <GridItem xs={12}>
                        {formData.map((form, fkey) => {
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
                                      state={vendorForm}
                                      onSetActive={onSetActive}
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

              {state.showAddressForm && (
                <GridItem xs={12}>
                  <CustomCard
                    cdTitle={addressForm.edit ? "Edit Address" : "Add Address"}
                    width="100%"
                    close
                    onClose={onCloseAddAddress}
                    height="100%"
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
                                <>
                                  <FormComponent
                                    item={item}
                                    key={key}
                                    menuPortal={menuPortal}
                                    onClickAdd={onClickAddAddress}
                                    onSelect={onSelect}
                                    state={addressForm}
                                    onChange={onChangeAddress}
                                    error={addError}
                                  />
                                </>
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
                    <GridItem xs={12} style={{ margin: "20px 0px" }}>
                      <GridContainer>
                        <AddInfoCard
                          title="Add a New Address"
                          onClickShow={onAddAddressForm}
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

              {state.showContactForm && (
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
                                <>
                                  <FormComponent
                                    item={item}
                                    key={key}
                                    menuPortal={menuPortal}
                                    onClickAdd={onClickAddContact}
                                    onSelect={onSelect}
                                    state={contactPerson}
                                    onChange={onChangeContact}
                                    error={contError}
                                  />
                                </>
                              );
                            })}
                        </GridContainer>
                      );
                    })}
                  </CustomCard>
                </GridItem>
              )}
              {/* {//console.log(allContacts.length,"allshow")} */}

              {allContacts.length > 0 && (
                <GridItem xs="12">
                  <CustomCard cdTitle="Contacts">
                    <GridItem xs={12} style={{ margin: "20px 0px" }}>
                      <GridContainer>
                        <AddInfoCard
                          title="Add a New Contact"
                          onClickShow={onAddContactForm}
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
              {/* {//console.log(state.showAddBankForm,"bankshow")} */}

              {state.showAddBankForm && (
                <GridItem xs={12}>
                  <CustomCard
                    cdTitle={bankForm.edit ? "Edit Bank" : "Add Bank"}
                    width="100%"
                    height="100%"
                    close
                    onClose={onCloseAddBank}
                    style={{ marginTop: 0 }}
                  >
                    {formData.map((form, fkey) => {
                      return (
                        <GridContainer
                          key={fkey}
                          style={{ padding: "5px 20px" }}
                        >
                          {form.formName === "bankDetails" &&
                            form.fields.map((item, key) => {
                              return (
                                <>
                                  <FormComponent
                                    item={item}
                                    key={key}
                                    menuPortal={menuPortal}
                                    onClickAdd={onClickAddBank}
                                    onSelect={onSelect}
                                    state={bankForm}
                                    onChange={onChangeBankForm}
                                    error={bnkError}
                                  />
                                </>
                              );
                            })}
                        </GridContainer>
                      );
                    })}
                  </CustomCard>
                </GridItem>
              )}
              {allBanks && allBanks.length > 0 && (
                <GridItem xs="12">
                  <CustomCard cdTitle="Banks">
                    <GridItem xs={12} style={{ margin: "20px 0px" }}>
                      <GridContainer>
                        <AddInfoCard
                          title="Add a New Bank"
                          onClickShow={onAddBankForm}
                        />

                        {allBanks.map((a, id) => (
                          <ViewBankCard
                            a={a}
                            id={id}
                            onClickEdit={onClickEditBank}
                            onRemove={onRemoveBank}
                          />
                        ))}
                      </GridContainer>
                    </GridItem>
                  </CustomCard>
                </GridItem>
              )}
            </GridContainer>
          </GridItem>

          <GridItem xs={3}>
            <CustomCard cdTitle="Advance Setting">
              <Grid container alignItems="center" justify="center">
                <Grid item xs="8">
                  <Button
                    size="small"
                    onClick={onAddAddressForm}
                    className={classes.addFormbtn}
                    startIcon={<AddIcon />}
                    variant="outlined"
                    color="primary"
                  >
                    Add Address
                  </Button>
                </Grid>
                <Grid item xs="8">
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={onAddContactForm}
                    className={classes.addFormbtn}
                    variant="outlined"
                    color="primary"
                  >
                    Add Contact
                  </Button>
                </Grid>
                <Grid item xs="8">
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={onAddBankForm}
                    className={classes.addFormbtn}
                    variant="outlined"
                    color="primary"
                  >
                    Add Bank
                  </Button>
                </Grid>
              </Grid>
            </CustomCard>
          </GridItem>
        </GridContainer>
        <GridContainer className={classes.actionFooter}>
          <GridItem xs={9}>
            <div className={classes.actionbtns}>
              <ColoseButton height={39} onClick={onBackToVendorList}>
                Back
              </ColoseButton>
              <Button
                onClick={onClickSubmitForm}
                className={classes.actionbtn}
                variant="outlined"
                color="primary"
                disabled={buttonDisabled}
              >
                Submit
              </Button>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </ThemeProvider>
  );
};

export default VedorTypeForm;
