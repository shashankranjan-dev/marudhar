import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Select from "@material-ui/core/Select";
import MuiTable from "../Components/MuITable";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import MasterModel from "../Components/MasterModel";
import { CustomCard } from "../Components/CustomCard";
import CustomButton, {
  CircleAddBtn,
  ColoseButton,
} from "../Components/CustomButton";
import {
  directPurchaseFormRowData,
  addedItemServiceRowData,
  dummyRowData,
} from "../../services/DrectQuotation/DirectQuotationService";
import { incentivesReferenceServiceData } from "../../services/incentivesReferenceService";
//SERVICE
import { getListReference } from "../../services/referencesService";
import { useStateValue } from "../../context/context";
import { actionTypes } from "../../context/reducer";
import ReactSelect from "react-select";
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

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { IconButton, OutlinedInput } from "@material-ui/core";
import ViewListIcon from "@mui/icons-material/ViewList";

import theme from "../../theme/theme";

import React from "react";
import { useHistory } from "react-router-dom";
import CardLinkButton from "views/Components/CardLinkButton";
import { activeText } from "assets/jss/material-dashboard-pro-react";
import { Autocomplete } from "@material-ui/lab";
import { AllInbox } from "@mui/icons-material";
// import { CloseButton } from "../Components/CustomButton";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  appDefaultFamily,
  appFontWeight,
  reactSelectStyles,
} from "assets/jss/material-dashboard-pro-react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@material-ui/core";

import PageTitle from "./HelperComponent/PageTitle";
import StepProceedModel from "./HelperComponent/StepProceedModel";
import {
  currentDate,
  calculatePer,
  calculatePerValue,
} from "./HelperComponent/utils";

import { Typography } from "@material-ui/core";
// import{currentDate} from "./HelperComponent/utils";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: appSecondColor,
    padding: "15px 5px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "10px 5px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    switchBtn: {
      width: 180,
      height: "100%",
    },
  },
  addBtn: {
    width: 30,
    height: 38,
    fontSize: "12px",
  },

  searchBar: {
    marginTop: 10,
    marginBottom: 15,
    padding: "15px 20px",
  },
  activeText: {
    ...activeText,
  },
  input: {
    height: 40,
    lineLight: 40,
    padding: "0 10px",
    marginBottom: "20px",
  },
  actionbtns: {
    marginTop: 20,
    float: "right",
  },
  name: {
    width: "30%",
  },
  role: {
    width: "25%",
  },
  sales: {
    width: "10%",
  },
  email: {
    width: "20%",
  },
  mobile: {
    width: "20%",
  },
  incentives: {
    width: "10%",
  },
  applicationForm: {
    width: "15%",
  },
  customSelect: {
    marginBottom: 15,
  },
}));

const IncentivesReferencePage = () => {
  const history = useHistory();
  const [classicModal, setClassicModal] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [allUnits, setAllUnits] = React.useState([]);
  const [billDetail, setBillDetail] = React.useState({});
  const [globalState, dispatch] = useStateValue();
  const [allReferences, setAllReferences] = React.useState([]);
  const [addSearch, setAddSearch] = React.useState({
    serarchItem: "",
  });

  const [addItem, setAddItem] = React.useState({
    txtQuantity: "",
    txtRate: "",
    txtValue: "",
    item: "",
    brand: "",
    category: "",
    itemImg: "",
  });

  const onChangeBillDate = (e) => {
    const { name, value } = e.target;
    setBillDetail({ ...billDetail, [name]: value });
  };
  const fetchData = () => {
    getListReference(
      (r) => {
        setAllReferences(r);
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  };
  React.useEffect(() => {
    fetchData();
    setAllUnits(directPurchaseFormRowData);
  }, []);

  const onAddSearch = (e) => {
    const { name, value } = e.target;
    setAddSearch((prv) => ({ ...prv, [name]: value }));
  };

  const onAddItem = (v) => {
    // setAddItem({
    //   ...addItem,
    //   itemImg: v.itemImg,
    //   brand: v.brand,
    //   item: v.item,
    // });
    // setAddedItems([...addedItems, addItem]);
    // console.log(addItem);
    // setAddItem({
    //   txtQuantity: "",
    //   txtRate: "",
    //   txtValue: "",
    //   item: "",
    //   brand: "",
    //   category: "",
    //   itemImg: "",
    // });
  };

  const onChange = (e, row) => {
    const { name, value } = e.target;
    let defaultQuantity = row.quantity_field;
  };

  const onClickSubmit = () => {
    history.push("/admin/sales/create-delivery-order");
    setClassicModal(false);
  };
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <PageTitle title="Master > Incentives >Reference" />
      <GridContainer>
        <GridItem xs="12">
          <CustomCard
            cdTitle="Select Reference"
            filterIcon
            onClickFilter={() => {}}
          >
            <GridContainer
              style={{ padding: "10px" }}
              justifyContent="flex-start"
              alignItems="center"
            >
              <GridItem xs="5">
                <InputLabel id="label">Reference</InputLabel>
                <ReactSelect
                  options={allReferences}
                  menuPortalTarget={document.body}
                  formatGroupLabel={(d) => d.label}
                  className={classes.customSelect}
                  styles={reactSelectStyles}
                  // onChange={(v) => onSelect(item.name, v)}
                  // value={{
                  //   value: billDetail[item.name],
                  //   label:
                  //   billDetail[`${item.name}_label`],
                  // }}
                />
              </GridItem>

              <GridItem xs="7">
                <div
                  style={{
                    float: "right",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CustomButton
                    name="btn_refres"
                    style={{ marginRight: "10px" }}
                  >
                    <SearchIcon />
                  </CustomButton>
                  <CustomButton name="btn_refres">
                    <RotateLeftIcon />
                  </CustomButton>
                </div>
              </GridItem>
            </GridContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>

      {/* Select and Add Items */}

      <GridContainer className={classes.root}>
        <GridItem xs="12">
          <CustomCard cdTitle="Update Incentives For Reference" height={350}>
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">#</StyledTableCell>
                    <StyledTableCell align="left">Reference</StyledTableCell>
                    <StyledTableCell align="left">Mobile</StyledTableCell>
                    <StyledTableCell align="left">Email</StyledTableCell>
                    <StyledTableCell align="left">Sales</StyledTableCell>
                    <StyledTableCell align="left">Incentive</StyledTableCell>
                    <StyledTableCell align="left">
                      Applicable From
                    </StyledTableCell>
                    <StyledTableCell align="right">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incentivesReferenceServiceData.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="center" className={classes.id}>
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.name}>
                        {row.reference}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.mobile}>
                        {row.mobile}
                      </StyledTableCell>
                      <StyledTableCell align="left" className={classes.email}>
                        {row.email}
                      </StyledTableCell>
                      <StyledTableCell align="right" className={classes.sales}>
                        <div>
                          <TextField
                            size="small"
                            placeholder="Sales"
                            name={`txtDiscPer${row.id}`}
                            style={{ marginBottom: -20 }}
                            //   defaultValue={row.discPer_field}

                            onChange={(e) => onChange(e, row)}
                            inputProps={{ style: { textAlign: "left" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            value={addItem[`txtDiscPer${row.id}`]}
                            variant="outlined"
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        className={classes.incentives}
                      >
                        <div>
                          <TextField
                            size="small"
                            placeholder="Incentives"
                            name={`txtDiscPer${row.id}`}
                            style={{ marginBottom: -20 }}
                            //   defaultValue={row.discPer_field}
                            type="number"
                            onChange={(e) => onChange(e, row)}
                            inputProps={{ style: { textAlign: "right" } }}
                            id="outlined-basic"
                            fullWidth={true}
                            value={addItem[`txtDiscPer${row.id}`]}
                            variant="outlined"
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className={classes.applicationForm}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div>
                            <TextField
                              size="small"
                              id="date"
                              variant="outlined"
                              type="date"
                              fullWidth={true}
                              defaultValue={currentDate()}
                              style={{ marginBottom: -20 }}
                              // onChange={(v) => console.log(v.target.value)}
                              // className={classes.dateField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </div>
                        </div>
                      </StyledTableCell>
                      {/* disc value  field */}
                      <StyledTableCell
                        align="right"
                        className={classes[row.action]}
                      >
                        <div>
                          <Button
                            className={classes.addBtn}
                            size="small"
                            varient="outlined"
                            color="primary"
                          >
                            Update
                          </Button>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        </GridItem>
      </GridContainer>
    </ThemeProvider>
  );
};

export default IncentivesReferencePage;
