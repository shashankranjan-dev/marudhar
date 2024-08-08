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
  deleteMenu,
  getAllMenu,
  postmenu,
  updateMenu,
  getListMenu,
  
 
} from "../../../services/menuService";
// import {getAllParentMenu,} from "../../../services/parentMenuService";
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
import { ThemeProvider } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PageTitle from "../HelperComponent/PageTitle";
import theme from "../../../theme/theme";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import React from "react";
import {
  appLabelFont,
  appFontWeight,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ColorPicker from "material-ui-color-picker";
import ReactSelect from "react-select";
import itemViewPage from "../ItemDetailsPage/itemViewPage";

let options1 = [
  { value: "0", label: "Parent" },
  { value: "1", label: "Dashboard" },
  { value: "2", label: "Sales" },
  { value: "3", label: "Procurement" },
  { value: "4", label: "Account" },
  { value: "5", label: "MIS Reports" },
  { value: "6", label: "Master" },
  { value: "7", label: "Tools" },
];

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
  customSelect: {
    marginBottom: 15,
  },
}));

const MenuPage = () => {
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allMenu, setAllMenu] = React.useState([]);
  const [allListMenu, setAllListMenu] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [parent,setParent] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [addMenu, setAddMenu] = React.useState({
    edit: false,
    ddl_menu_for_0: 1,
    ddl_menu_for_0_label: "Parent",
    menu_id: "",
    ddl_menu_for: "",
    parent_id: 0,
    switch_active_status: false,
    txt_sub_menu: "",
    txt_link: "",
  });
  const [visibile,setVisibile] = React.useState(false);
  const [allSubMenus, setAllSubMenus] = React.useState([]);
  
  const [error, setError] = React.useState({
    txt_sub_menu: false,
  });

  React.useEffect(() => {
    setLoading(true);
    getAllMenu(
     
      (r) => {
        //console.log(r, "77a")
        setAllMenu(r);
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

    getListMenu(
      (r) => {
        //console.log(r, "77A");
        setAllListMenu([
          {
            name: `ddl_menu_for_0`,
            label: " Menu ",
            hidden: false,
            required: true,
            data_type: "string",
            html_element: "select_two",
            options: [ {value: 0, label: "Parent", parent_id: 0 }, ...r],
            parent_id: 0,
            error: false,
          }
        ]);
        setLoading(false);
      },

      (err) => {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }, {parent_id: 0},
    );
  }, [refresh]);

  const onSetActive = (e) => {
    setAddMenu((prv) => ({ ...prv, [e.target.name]: e.target.checked }));
  };

  const onSelect = (name, v) => {
    const {value, label, parent_id} = v;
    //console.log("sl", name, value, parent_id);
    setVisibile(true);
    setAddMenu((prv) => ({ ...prv, 
      [name]: value, 
      [`${name}_label`]: label, 
      parent_id: value }));
    
    getListMenu(
      (r) => {
        //console.log(r, "77A");
        setAllListMenu((prv) => {
          
          let selMenu = prv.filter((r,i) => r.name === `ddl_menu_for_pid_${parent_id}`);
          //console.log("sel_menu", selMenu);
          let prMenu = prv;

          if(selMenu.length > 0) {
            prMenu = prMenu.filter((m, i) => m.name !== selMenu[0].name);
          }
          //console.log("pr_menu", prMenu);

          if(r.length > 0 && label !== "Parent") {
             return [...prMenu, 
              {
                name: `ddl_menu_for_pid_${parent_id}`,
                label: " Menu ",
                hidden: false,
                required: true,
                data_type: "string",
                html_element: "select_two",
                options: r,
                error: false,
                parent_id: value,
              },
            ];
          }

          else {
            return prMenu;
          }
        });

        setLoading(false);
      },

      (err) => {
        setLoading(false);
        //console.log("holi poli", parent_id);
        setAllListMenu((prv) => {
          //console.log("pres", prv);

          let prid = prv.map((p,i) => {
            if(p.name === `ddl_menu_for_pid_${parent_id}`) {
              return i;
              }
            }
          ).filter(p => typeof p !== 'undefined');

          //console.log("holi poli2", prid, " ", prv.length);
          if(prid[0] === prv.length - 1)
            return prv.slice(0, prid[0]); 

          else
            return prv;
        });
      }, 
      
      {parent_id: value}
    );
  };

  const headerData = [
    {
      id: "menu_serial_id",
      label: "#",
    },
    {
      id: "parent_menu",
      label: "Parent Menu",
    },
    {
      id: "sub_menu",
      label: "Sub Menu",
    },
    {
        id: "menu_link",
        label: "Link",
      },
    // {
    //   id: "menu_color",
    //   label: "Color",
    //   menuColorIcon: (v) => v,
    // },
    
    {
      id: "menu_status",
      label: "Active Status",
      statusBtn: (v) => (v === "Y" ? true : false),
      align: "center",
    },
    {
      id: "menu_action",
      label: "Action",
      align: "right",
    },
  ];
  // onSubmit called
  const onSubmitModel = (e) => {
    e.preventDefault();
    if (!addMenu.txt_sub_menu) {
      setError({
        txt_sub_menu: !addMenu.txt_sub_menu,
      });
    } else {
      if (addMenu.edit) {
        updateMenu(
          addMenu,
          (r) => {
            onCloseModel();
            setRefresh(!refresh);
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Menu Updated Successfully",
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
      } 
      
      else {
        postmenu(
          addMenu,
          globalState?.user?.serial_id,
          (r) => {
            dispatch({
              type: actionTypes.SET_OPEN_MSG,
              payload: {
                msg: "Menu added Successfully",
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
  const onDeleteMenu = (row, next) => {
    deleteMenu(
      row.menu_id,
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
  const onChange = (e) => {
    const { value, name } = e.target;
    setAddMenu({ ...addMenu, [name]: value });
  };
  const onPickColor = (color) => {
    setAddMenu({ ...addMenu, txt_status_color: color });
  };

  // on Edit called
  const onUpdateMenu = (row) => {
    setClassicModal(true);
    setAddMenu({
      ...addMenu,
      edit: true,
      menu_id: row.menu_id,
      ddl_menu_for: { value: row.menu_for, label: row.menu_for },
      
      switch_active_status: row.menu_status === "Y" ? true : false,
      txt_sub_menu: row.sub_menu,
      txt_link: row.menu_link,
    });
  };

  const classes = useStyles();

  // on Close Model
  const onCloseModel = () => {
    setClassicModal(false);
    setError({ txt_sub_menu: false });

    getListMenu(
      (r) => {
        //console.log(r, "77A");
        setAllListMenu([
          {
            name: `ddl_menu_for_0`,
            label: " Menu ",
            hidden: false,
            required: true,
            data_type: "string",
            html_element: "select_two",
            options: r,
            parent_id: 0,
            error: false,
          },
        ]);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
       }, {parent_id: 0},
    );
    
    setAddMenu({
      edit: false,
      ddl_menu_for_0: 1,
      ddl_menu_for_0_label: "Parent",
      ddl_menu_for: "",
      txt_sub_menu:"",
      parent_id: 0,
      switch_active_status: false,
      txt_link: "",
    });
  };

  const formData = {
    formName: "Add a Menu",
    fields: [
      // {
      //   name: "ddl_menu_for",
      //   label: " Menu ",
      //   hidden: false,
      //   required: true,
      //   data_type: "string",
      //   html_element: "select_two",
      //   options: allListMenu,
      //   error: false,
      // },

      ...allListMenu,
      {
        
        name: "txt_sub_menu",
        label: " New Sub Menu",
        hidden: false,
        required: false,
        data_type: "string",
        html_element: "TextField",
        

        error: false,


      },

      {
        name: "txt_link",
        label: "Link",
        hidden: false,
        required: true,
        data_type: "string",
        html_element: "TextField",
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

  return (
    <ThemeProvider theme={theme}>
      <PageTitle
        title="Master > Setting > Menu"
        btnToolTip="Add New Menu"
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
                okBtnText="Submit"
                modelName="Add a Menu"
                onClickOk={onSubmitModel}
              >
                <div style={{ padding: "20px 10px", width: "100%" }}>
                  <GridContainer>
                    {formData.fields.map((item, key) => {
                      return (
                        <>
                       
                          <GridItem xs={12} key={key}>
                            {item.html_element === "select_two" && (
                              <>
                                <InputLabel required={item.required} id="label">
                                  {item.label}
                                </InputLabel>
                                {/* {//console.log("lel", item.options)} */}
                                <ReactSelect
                                  name={item.name}
                                  options={item.options}
                                  formatGroupLabel={(d) => d.label}
                                  styles={reactSelectStyles}
                                  className={
                                    item.marginBottom !== 0 &&
                                    classes.customSelect
                                  }
                                  
                                  onChange={(v, info) => onSelect(info.name, v)}
                                  value={{
                                    value: addMenu[item.name],
                                    label: addMenu[`${item.name}_label`]
                                  }}
                                />
                                
                                {error[item.name] && (
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
                                  size="small"
                                  required={item.required}
                                  placeholder={item.label}
                                  name={item.name}
                                  onChange={onChange}
                                  error={error.txt_sub_menu}
                                  
                                  FormHelperTextProps={{
                                    style: { textAlign: "right" },
                                  }}
                                  helperText={
                                    error.txt_status_name
                                      ? "Status is required"
                                      : ""
                                  }
                                  id="outlined-basic"
                                  fullWidth={true}
                                  variant="outlined"
                                  value={addMenu[item.name]}
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
                                  value={addMenu[item.name]}
                                  variant="outlined"
                                />
                              </>
                            )}
                            {item.html_element === "color_picker" && (
                              <>
                                <InputLabel id="label">{item.label}</InputLabel>
                                <ColorPicker
                                  size="small"
                                  name={item.name}
                                  style={{ overflow: "hidden" }}
                                  inputProps={{
                                    overflow: "hidden",
                                    style: {
                                      borderRadius: "4px",
                                      background: addStatus.txt_status_color,
                                    },
                                  }}
                                  placeholder={item.label}
                                  fullWidth={true}
                                  variant="outlined"
                                  onChange={onPickColor}
                                  value={addStatus.txt_status_color}
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
                                  checked={addMenu[item.name]}
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
            <CustomCard cdTitle="Menu" maxHeight="auto">
              <MuiTable
                onClickEdit={onUpdateMenu}
                onClickDelete={onDeleteMenu}
                columns={headerData}
                rows={allMenu}
              />
            </CustomCard>
          )}
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default MenuPage;
