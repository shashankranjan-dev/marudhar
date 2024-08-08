import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../Components/MasterModel";
import { CustomCard } from "../Components/CustomCard";
import CustomButton, { CircleAddBtn } from "../Components/CustomButton";
import { salesRowData } from "../../services/salesService";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input, Paper } from "@material-ui/core";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemeProvider } from "@material-ui/core";
import ReactSelect from "react-select";
//IMPORT SERVICE OF SHOWROOM WAREHOUSE
import { getListShowroomWarehouse } from "../../services/showroomWarehouseService";

import { useStateValue } from "../../context/context";
import { actionTypes } from "../../context/reducer";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Autocomplete } from "@material-ui/lab";
import { IconButton, OutlinedInput } from "@material-ui/core";
// import InvoicePreview from "./InvoicePreview";

import theme from "../../theme/theme";
import { currentDate } from "../Pages/HelperComponent/utils";

// import React from "react";
import {
  appDefaultColor,
  appSecondColor,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { appDefaultFamily } from "assets/jss/material-dashboard-pro-react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import React, { useState } from "react";
import PageTitle from "../Pages/HelperComponent/PageTitle";
import { getListCustomers } from "../../services/customerListService";
import * as XLSX from "xlsx";

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  dateField: {
    [theme.breakpoints.up("md")]: {
      marginTop: "25px",
    },
  },

  searchBar: {
    padding: "10px",
  },
  customSelect: {
    marginBottom: 15,
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
}));

const dataMigration = () => {
  const [items, setItems] = React.useState([]);
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [allUnits, setAllUnits] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [allShowroomWarehouse, setAllShowroomWarehouse] = React.useState([]);
  const [flName, setFlName] = React.useState("");
  const [addSearch, setAddSearch] = React.useState({
    txt_from_date: currentDate(),
    txt_to_date: currentDate(),
  });
  const [allCustomer, setAllCustomer] = React.useState([]);
  const [viewLocs, setViewLocs] = React.useState("hidden");
  const [error, setError] = React.useState({
    ddl_module: false,
    ddl_shw: false,
  });

  React.useEffect(() => {
    fetchData();
    setAllUnits(salesRowData);
  }, []);

  const classes = useStyles();

  //Fetching Data
  const fetchData = () => {
    getListCustomers(
      (r) => {
        setAllCustomer(r);
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
        setAllShowroomWarehouse(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };

  const readExcel = (file) => {
    var fileName = "";

    if (document.getElementById("real-file").value) {
      var filevalue = document.getElementById("real-file").value;
      fileName = filevalue.split("\\");
      document.getElementById("file-name").innerHTML =
        fileName[fileName.length - 1];
    } else {
      document.getElementById("file-name").innerHTML = "No file choosen";
    }
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve([fileName, data]);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((data) => {
      const [fileName, d] = data;
      //console.log("fln", d);
      console.table(d.slice(0, 10));
      setFlName(fileName[fileName.length - 1].split(".")[0]);
      setItems(d);
    });
  };

  //console.log(location.hostname === "beta.marudhar.app", "gs");

  const submit = () => {
    let url = "";

    //console.log("selectedVal", selectedShowroom);
    if (!selectedValue.value) {
      setError({
        ...error,
        ddl_module: !selectedValue.value,
      });
      //console.log("hiii");
    } else if (selectedValue.value === 4 && selectedShowroom.label !== flName) {
      setError({
        ...error,
        ddl_shw: !selectedShowroom.value,
      });
    } else {
      if (process.env.NODE_ENV === "production") {
        //for beta
        // url = "https://api.marudhar.app/betaAPI/master/data-migration/insert";

        //for live
        url = "https://api.marudhar.app/master/data-migration/insert";
      } else {
        url = "http://localhost:3000/master/data-migration/insert";
      }

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj1),
      }).then((res) => {
        //console.log(obj1, "itemsss");

        //console.log(res);
      });

      dispatch({
        type: actionTypes.SET_OPEN_MSG,
        payload: {
          msg: "Data Migrated ",
          msgType: "success",
        },
      });
    }
  };

  const data = [
    {
      value: 1,
      label: "Vendor",
    },
    {
      value: 2,
      label: "Customer",
    },
    {
      value: 3,
      label: "Item",
    },
    {
      value: 4,
      label: "Stock",
    },
    {
      value: 5,
      label: "Update Item",
    },
  ];

  const [selectedValue, setSelectedValue] = useState({
    ddl_module: "",
    ddl_module_label: "Select",
  });

  const [selectedShowroom, setSelectedShowroom] = useState({
    ddl_shw: "",
    ddl_shw_label: "Select",
  });

  const handleChange = (obj) => {
    //console.log("sale sale sale", obj.value);
    setSelectedValue(obj);

    if (obj.value === 4) setViewLocs("visible");
  };

  const handleShowroomChange = (obj) => {
    setSelectedShowroom(obj);
  };

  var obj1 = {
    selectedValue: selectedValue.value,
    items: items,
    showroom_warehouse_id: selectedShowroom?.value,
  };

  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="Tools > Data Migration " />

      <GridContainer>
        <GridItem xs="12">
          <CustomCard cdTitle="Data Migration " filterIcon>
            <Paper elevation="0" className={classes.searchBar}>
              <GridContainer justifyContent="flex-start" alignItems="flex-end">
                <GridItem xs="4">
                  <InputLabel id="label">Module</InputLabel>
                  <ReactSelect
                    options={data}
                    placeholder="Select"
                    onChange={handleChange}
                    formatGroupLabel={(d) => d.label}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    name="ddl_module"
                    style={{
                      whiteSpace: "noWrap",
                      overflow: "scroll",
                      maxHeight: "50px",
                      // textOverflow: "ellipsis",
                    }}
                  />
                </GridItem>

                <GridItem xs="8">
                  <input
                    id="real-file"
                    hidden="hidden"
                    type="file"
                    accept=".csv, .xlsx"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      readExcel(file);
                    }}
                  />

                  <Button
                    style={{ marginBottom: "10px", width: "115px" }}
                    onClick={() => document.getElementById("real-file").click()}
                    color="primary"
                    variant="contained"
                    size="medium"
                  >
                    Choose a file
                  </Button>
                  <label id="file-name" style={{ marginLeft: "5px" }}>
                    No file Choosen
                  </label>
                </GridItem>

                <GridItem xs="3" style={{ visibility: viewLocs }}>
                  <InputLabel id="label">Showroom / Warehouse</InputLabel>
                  <ReactSelect
                    options={allShowroomWarehouse}
                    placeholder="Select"
                    formatGroupLabel={(d) => d.label}
                    menuPortalTarget={document.body}
                    styles={reactSelectStyles}
                    className={classes.customSelect}
                    onChange={handleShowroomChange}
                  />
                </GridItem>

                <GridItem xs="12">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Button
                      style={{ width: "120px" }}
                      onClick={() => submit()}
                      color="primary"
                      variant="contained"
                      size="medium"
                    >
                      Data Migrate
                    </Button>
                  </div>
                </GridItem>

                {Object.keys(error).map(
                  (err) =>
                    error[err] && (
                      <div className={classes.ddlError}>{err} is Required</div>
                    )
                )}
              </GridContainer>
              <GridContainer
                justifyContent="flex-start"
                alignItems="center"
              ></GridContainer>
            </Paper>
          </CustomCard>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.root}></GridContainer>
    </ThemeProvider>
  );
};

export default dataMigration;
