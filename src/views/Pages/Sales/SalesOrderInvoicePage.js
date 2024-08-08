import React from "react";
import {
  Paper,
  makeStyles,
  Grid,
  Box,
  Divider,
  withStyles,
} from "@material-ui/core";
import ItemImg from "../HelperComponent/ItemImg";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getAllTerm } from "../../../services/termsService";
import { getAllModule } from "../../../services/termsService";
import { currentDate } from "../HelperComponent/utils";
import ItemNameCard from "../HelperComponent/ItemNameCard";
import MrudharName from "../../../assets/applogo/marudhar-name.png";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  borderColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
} from "assets/jss/material-dashboard-pro-react";
import { currencyFormate, priceInWord } from "../HelperComponent/utils";

// import MrudharName from "../../../../assets/applogo/marudhar-name.png";
// import MrudharLogo from "../../../../assets/applogo/marudhar-logo.png";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#eee",
    color: appSecondColor,
    padding: "0px 5px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "5px 5px",
    fontWeight: appFontWeightThin,
    fontFamily: appDefaultFamily,
    fontSize: "12.6px",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {},
    "&:hover": {
      backgroundColor: tblBodyHoverColor,
    },
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  invoicePaper: {
    width: "100%",
    height: "800px",
    borderRadius: "0",
    marginTop: 15,
    padding: "5px 15px",
  },
  title_label11: {
    color: appSecondColor,
    fontWeight: 550,
    fontSize: "1.4rem",
    textAlign: "center",
  },
  title_label: {
    color: appSecondColor,
    fontWeight: 500,
    fontSize: "1rem",
  },
  title_label_2: {
    color: appSecondColor,
    fontWeight: 500,
    fontSize: ".7rem",
  },
  boxBorder011: {
    padding: "15px",
  },
  title_label_3: {
    textAlign: "right",
    color: appSecondColor,
    fontWeight: 500,
    fontSize: ".8rem",
  },
  title_label_4: {
    textAlign: "right",
    color: appSecondColor,
    fontWeight: 500,
    fontSize: ".7rem",
  },
  footer_one1: {
    padding: "2px",
    borderBottom: "none"
  },
  text: {
    color: appSecondColor,
    fontWeight: 400,
    fontSize: ".9rem",
    lineHeight: "1.6",
  },
  heightfull: {
    height: "100%",
  },
  itemImgPaper: {
    width: "70px",
    height: "70px",
    overflow: "hidden",
  },
  headerDetails: {
    marginBottom: 20,
    height: "auto",
    width: "100%",
    border: "1px solid " + borderColor,
  },
  section_one: {
    padding: "8px",
    height: "auto",
    borderBottom: "1px solid " + borderColor,
  },
  section_two: {
    padding: "0 8px 0 8px",
    height: "auto",
    borderBottom: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
  },
  section_four: {
    padding: "8px",
    borderLeft: "1px solid " + borderColor,
  },
  section_three: {
    padding: "8px",
  },
  invoice_prv_container: {
    width: "100%",
    minWidth: "700px",
    height: "auto",
    outline: ".1px solid",
  },
  footer_two1: {
    padding: "5px",
  },
  boxBorder0: {
    padding: "8px",
  },
  boxBorder1: {
    padding: "8px",
    borderLeft: "1px solid " + borderColor,
  },
  boxBorder2: {
    height: 50,
    padding: "8px",
    borderTop: "1px solid " + borderColor,
    borderBottom: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
  },
  boxBorder3: {
    height: 50,
    padding: "8px",
    borderTop: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
    borderBottom: "1px solid " + borderColor,
    borderRight: "1px solid " + borderColor,
  },

  tablContainer: {
    marginBottom: "20px",
    borderLeft: "1px solid " + borderColor,
    borderRight: "1px solid " + borderColor,
    borderTop: "1px solid " + borderColor,
  },
  serial_Id: { width: "5%", borderRight: "1px solid " + borderColor },
  item_desc: { width: "20%", borderRight: "1px solid " + borderColor },
  qty: { width: "8%", borderRight: "1px solid " + borderColor },
  large_width: { width: "45%", borderRight: "1px solid " + borderColor },
  rate: { width: "10%", borderRight: "1px solid " + borderColor },
  per: { width: "6%", borderRight: "1px solid " + borderColor },
  amount: { width: "15%" },
  disc: { width: "6%", borderRight: "1px solid " + borderColor },
  img: { width: "13%", borderRight: "1px solid " + borderColor },

  footerDetails: {
    height: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    width: "100%",
    border: "1px solid " + borderColor,
  },

  footer_one: {
    padding: "5px",
    borderBottom: "1px solid " + borderColor,
  },
  footer_two: {
    padding: "5px",
    borderBottom: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
  },
  footer_four: {
    padding: "5px",
    borderLeft: "1px solid " + borderColor,
  },
  footer_three: {
    padding: "5px",
  },
  footer_sec_title: {
    marginBottom: 0,
    fontSize: ".8rem",
    fontWeight: 500,
    color: appSecondColor,
    textDecoration: "underline",
  },
  footer_desc: {
    fontSize: ".8rem",
    lineHeight: "1.6",
  },
  insideBorder1: {
    margin: "0 -5px",
    borderBottom: "1px solid " + borderColor,
  },
  insideBorder2: {
    borderBottom: "none",
    borderRight: "1px solid " + borderColor,
    fontWeight: 650,
  },
  insideBorder6: {
    borderBottom: "none",
    fontSize: ".6rem",
  },
}));

const SalesOrderInvoicePage = ({
  salesOrderDetails,
  deliveryDetails,
  totalOtherCharges,
}) => {
  console.log("Mrb", salesOrderDetails);
  const classes = useStyles();
  const [allTerms, setAllTerms] = React.useState([]);
  const [globalState, dispatch] = useStateValue();

  React.useEffect(() => {
    getAllTerm(
      (terms) => {
        setAllTerms(
          terms.filter((term) => term.modules_name === "Purchase Order")
        );
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  }, []);
  return (
    <Grid conatainer justify="center">
      <Grid>
        <div className={classes.title_label11}>Sales Order</div>
        <div className={classes.footer_two1}> </div>
      </Grid>
      <div className={classes.invoice_prv_container}>
        <Grid conatainer justify="center">
          <Grid item xs={12} className={classes.headerDetails}>
            <Grid container>
              {/* Section One */}
              <Grid item xs={6} className={classes.section_one}>
                <Grid container className={classes.heightfull}>
                  <Grid item xs={4}>
                    <Box with={200} m={2}>
                      <img width="100%" height="100%" src={MrudharName} />
                    </Box>
                  </Grid>

                  <Grid item xs={8}>
                    <div className={classes.title_label}>
                      Marudhar Marble and Granite{" "}
                    </div>
                    <div className={classes.text_label}>
                      {/* 10/1A, KALAKAR STREET, KOLKATA */}
                    </div>
                    <div className={classes.text_label}>
                      1/3A, Mahendra Roy Lane,

                    </div>
                    <div className={classes.text_label}>

                      Kolkata - 700046
                    </div>
                    <div className={classes.text_label}>
                      {/* GSTIN/UIN : 19AAJFM7393R1Z3 */}
                    </div>
                    <div className={classes.text_label}>
                      {/* State Name : West Bengal, Code : 19 */}
                    </div>
                    <div className={classes.text_label}>
                      {/* Email : mmgranite@gmail.com */}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {/* Section Two*/}

              <Grid item xs={6} className={classes.section_two}>
                <Grid container>
                  <Grid item xs={6} className={classes.boxBorder0}>
                    <div className={classes.text_label}>Sales Order No</div>

                    <Box mt={1} mb={1}>
                      <div className={classes.title_label}>
                        {/* {console.log(salesOrderDetails[0],"5656")} */}
                        {salesOrderDetails[0]?.sales_order_no}
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={6} className={classes.boxBorder0}>
                    <div className={classes.text_label}>Date</div>
                    <Box mt={1} mb={1}>
                      {/* {console.log(salesOrderDetails[0]?.sales_order_date
,"sank1012")} */}
                      <div className={classes.title_label}>
                        {salesOrderDetails[0]?.sales_order_date}
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={6} className={classes.boxBorder0}>
                    <div className={classes.text_label}>
                      Salesman Name
                    </div>
                    <div className={classes.title_label}>
                      {salesOrderDetails[0]?.sales_executive_name}
                    </div>
                  </Grid>

                  <Grid item xs={6} className={classes.boxBorder0}>
                    <div className={classes.text_label}>
                      Phone Number
                    </div>
                    <div className={classes.title_label}>
                      {salesOrderDetails[0]?.sales_phone}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {/* Section Three */}
              {console.log("sank210", salesOrderDetails[0])}
              <Grid item xs={6} className={classes.section_three}>
                <div className={classes.title_label}>Buyer</div>
                <div className={classes.title_label}>
                  {salesOrderDetails[0]?.sales_customer}
                </div>
                <div className={classes.text_label}>
                  {salesOrderDetails[0]?.sales_street}
                </div>

                <div className={classes.text_label}>
                  {salesOrderDetails[0]?.sales_city} , {"  "}
                  {/* - {salesOrderDetails[0]?.pin}  */}
                  {salesOrderDetails[0]?.sales_state}
                </div>

                <div className={classes.text_label}>
                  GSTIN :   {salesOrderDetails[0]?.gst_no}
                  <span className={classes.title_label}>
                    {/* {" "} */}
                    {/* {invoiceDetails.gst_no} */}
                  </span>
                </div>
              </Grid>

              {/* Section Four */}

              <Grid item xs={6} className={classes.section_four}></Grid>
            </Grid>
          </Grid>

          {/* Item Description Table */}
          <div className={classes.tablContainer}>
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left" className={classes.serial_Id}>
                      SL No.
                    </StyledTableCell>
                    <StyledTableCell align="left" className={classes.img}>
                      Image
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className={classes.item_desc}
                    >
                      Description of Goods
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.qty}>
                      Alt. Qty
                    </StyledTableCell>

                    <StyledTableCell align="center" className={classes.qty}>
                      Qty
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.rate}>
                      Rate
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.per}>
                      Disc%
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.rate}>
                      Net Rate
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.disc}>
                      GST%
                    </StyledTableCell>

                    <StyledTableCell align="center" className={classes.amount}>
                      Amount
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                {console.log(salesOrderDetails[0], " salesOrderDetails")}
                <TableBody>
                  {salesOrderDetails[0]?.sales_order_item_details &&
                    salesOrderDetails[0]?.sales_order_item_details?.map(
                      (row, i) => {
                        console.log(row, "sankhappop")
                        return (
                          <StyledTableRow>
                            <StyledTableCell
                              align="left"
                              className={classes.qutID}
                            >
                              {i + 1}
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className={classes.boxBorder3}
                            >
                              <Paper className={classes.itemImgPaper}>
                                <ItemImg item_id={row.item_id} />
                              </Paper>
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              className={classes.boxBorder3}
                            >
                              {<ItemNameCard item_id={row.item_id} />}
                            </StyledTableCell>

                            {/* comment by mritunjay for NAN value showing */}

                            <StyledTableCell align="center" className={classes.qty} >
                              <Table className={classes.table} aria-label="customized table" >
                                <TableBody>
                                  {salesOrderDetails[i] && (
                                    <StyledTableRow key={salesOrderDetails[i].id} style={{ borderBottom: "None" }}>
                                      <StyledTableCell
                                        style={{ borderBottom: "None" }}
                                        align="right"
                                      >
                                        {Math.round(row?.quantity / salesOrderDetails[i].lower_unit_value)} {salesOrderDetails[i].lower_caption}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  )}
                                </TableBody>
                              </Table>
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.qty}
                            >
                              {row?.quantity} {row?.uom_name}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.rate}
                            >
                              {currencyFormate(row.rate)}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.per}
                            >
                              {Number(row?.disc_percentage).toFixed(2)}
                            </StyledTableCell>

                            <StyledTableCell
                              align="right"
                              className={classes.per}
                            >
                              {currencyFormate(row?.mrp - row?.disc_value)}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              className={classes.disc}
                            >
                              {Number(
                                row?.gst_type === 1 ? row?.gst_percentage : 0
                              ).toFixed(2)}
                            </StyledTableCell>

                            <StyledTableCell
                              align="right"
                              className={classes.amount}
                            >
                              {currencyFormate(row.net_value)}
                            </StyledTableCell>

                            {/* <StyledTableCell
                              align="right"
                              className={classes.rate}
                            >
                              <Table
                                className={classes.table}
                                aria-label="customized table"
                              >
                                <TableBody>
                                  {deliveryDetails?.enqShowroom[i] &&
                                    deliveryDetails?.enqShowroom[i].map(
                                      (det) => {
                                        return (
                                          <StyledTableRow
                                            style={{ borderBottom: "None" }}
                                          >
                                            <StyledTableCell
                                              style={{ borderBottom: "None" }}
                                            >
                                              {det.showroom_name}
                                            </StyledTableCell>

                                            <StyledTableCell
                                              style={{ borderBottom: "None" }}
                                            >
                                              {det.quantity}
                                            </StyledTableCell>
                                          </StyledTableRow>
                                        );
                                      }
                                    )}
                                </TableBody>
                              </Table>
                            </StyledTableCell> */}
                          </StyledTableRow>
                        );
                      }
                    )}
                  <StyledTableRow>
                    <StyledTableCell
                      colSpan={4}
                      align="right"
                      className={classes.insideBorder2}
                    ></StyledTableCell>
                    {/* <StyledTableCell colSpan={7} align="right" className={classes.insideBorder2}>
                    {salesOrderDetails[0]?.sales_order_item_details?.length &&
                      currencyFormate(
                        salesOrderDetails[0]?.sales_order_item_details.reduce(
                          (sum, li) => Number(sum) + Number(li.net_value),
                          0
                        )
                      )}
                  </StyledTableCell> */}
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell
                      colSpan={9}
                      align="right"
                      className={classes.insideBorder2}
                    >
                      Taxable Amount
                    </StyledTableCell>
                    <StyledTableCell
                      //  colSpan={7}
                      align="right"
                      className={classes.insideBorder2}
                    >
                      {salesOrderDetails[0]?.sales_order_item_details?.length &&
                        currencyFormate(
                          salesOrderDetails[0]?.sales_order_item_details.reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(li.net_value) -
                              Number(li.gst_value),
                            0
                          )
                        )}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell
                      colSpan={9}
                      align="right"
                      className={classes.insideBorder2}
                    >
                      CGST
                    </StyledTableCell>

                    {/* {console.log(salesOrderDetails[0]?.sales_order_item_details
,"sank10121")} */}
                    <StyledTableCell
                      // colSpan={7}
                      align="right"
                      className={classes.insideBorder2}
                    >
                      {salesOrderDetails[0]?.sales_order_item_details?.length >
                        0 &&
                        currencyFormate(
                          salesOrderDetails[0]?.sales_order_item_details.reduce(
                            (sum, li) => Number(sum) + Number(li.gst_value / 2),
                            0
                          )
                        )}

                      {/* 
{   
 

other_charges=invItemDetails?
invItemDetails.reduce(
  (sum,li)=>
  li.charge_type === "+" ?
  Number(sum) + Number(li.charge_amount)
  :Number(sum) - Number(li.charge_amount),
  0
)
.toFixed(2)
: currencyFormate(0)
} */}
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell
                      colSpan={9}
                      align="right"
                      className={classes.insideBorder2}
                    >
                      {" "}
                      SGST
                    </StyledTableCell>

                    <StyledTableCell
                      // colSpan={7}
                      align="right"
                      className={classes.insideBorder2}
                    >
                      {salesOrderDetails[0]?.sales_order_item_details?.length >
                        0 &&
                        currencyFormate(
                          salesOrderDetails[0]?.sales_order_item_details.reduce(
                            (sum, li) => Number(sum) + Number(li.gst_value / 2),
                            0
                          )
                        )}

                      {/*                       
{   
 

other_charges=invItemDetails?
invItemDetails.reduce(
  (sum,li)=>
  li.charge_type === "+" ?
  Number(sum) + Number(li.charge_amount)
  :Number(sum) - Number(li.charge_amount),
  0
)
.toFixed(2)
: currencyFormate(0)
} */}
                    </StyledTableCell>
                  </StyledTableRow>

                  {/* othercharges start */}
                  {salesOrderDetails[0]?.sales_order_other_charges?.length > 0 &&
                    salesOrderDetails[0]?.sales_order_other_charges.map(
                      (row, i) => {
                        return (
                          <StyledTableRow>
                            <StyledTableCell
                              colSpan={9}
                              align="right"
                              className={classes.insideBorder2}
                            >
                              {row.charges} ({row.charge_type})
                            </StyledTableCell>

                            <StyledTableCell
                              // colSpan={7}
                              align="right"
                              className={classes.insideBorder2}
                            >
                              {currencyFormate(row.charge_amount)}

                              {/* 
                 {   
                   
               
                  other_charges=invItemDetails?
                  invItemDetails.reduce(
                    (sum,li)=>
                    li.charge_type === "+" ?
                    Number(sum) + Number(li.charge_amount)
                    :Number(sum) - Number(li.charge_amount),
                    0
                  )
                  .toFixed(2)
                  : currencyFormate(0)
                  } */}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      }
                    )}
                  <StyledTableRow>
                    <StyledTableCell
                      colSpan={9}
                      align="right"
                      className={classes.insideBorder2}
                    >
                      Total
                    </StyledTableCell>
                    {/* { console.log(totalOtherCharges,"jj")} */}

                    <StyledTableCell
                      // colSpan={7}
                      align="right"
                      className={classes.insideBorder2}
                    >
                      {salesOrderDetails[0]?.sales_order_item_details?.length >
                        0 &&
                        currencyFormate(
                          salesOrderDetails[0]?.sales_order_item_details.reduce(
                            (sum, li) =>
                              Number(sum) +
                              Number(li.net_value) +
                              totalOtherCharges,
                            0
                          )
                          +
                          salesOrderDetails[0]?.sales_order_other_charges.reduce(
                            (sum, li) => {
                              if (li.charge_type === '+') {
                                return Number(sum) + Math.abs(Number(li.charge_amount));
                              } else {
                                return Number(sum) - Math.abs(Number(li.charge_amount));
                              }
                            },
                            0
                          )
                        )}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <Grid item xs={12} className={classes.footerDetails}>
            <Grid container>
              <Grid item xs={6} className={classes.footer_two}>
                <StyledTableCell className={classes.footer_one1}>
                  <p style={{ paddingLeft: "180px" }}>Scan To Pay</p>
                  <img

                    src={require("../../../assets/img/qrcode.jpg").default}
                    style={{ paddingLeft: "160px",height:"140px",width:"300px" }}
                  />
                </StyledTableCell>
              </Grid>
              <Grid item xs={6} className={classes.footer_two}>
                <div className={classes.boxBorder011}></div>

                <p className={classes.footer_sec_title}>
                  Company's Bank Details
                </p>
                <Box mx={2} mt={1}>
                  <Grid container>
                    <Grid item xs={6}>
                      <div className={classes.title_label_2}>Bank Name</div>
                      <div className={classes.title_label_2}>A/C No.</div>
                      <div className={classes.title_label_2}>A/C Name</div>

                      <div className={classes.title_label_2}>
                        Branch & IFSC Code
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className={classes.bankDetails}>
                        <div className={classes.title_label_2}>HDFC BANK</div>
                        <div className={classes.title_label_2}>
                          50200011112280
                        </div>
                        <div className={classes.title_label_2}>
                          Marudhar Marble and Granite
                        </div>

                        <div className={classes.title_label_2}>
                          TOPSIA & HDFC0009633
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
                {/* <p className={classes.footer_sec_title}>Company's Bank Details</p>
              <Box mx={2} mt={1}>
                <Grid container>
                  <Grid item xs={6}>
                    <div className={classes.title_label_2}>Bank Name</div>
                    <div className={classes.title_label_2}>A/C No.</div>
                   
                    <div className={classes.title_label_2}>
                      Branch & IFSC Code
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className={classes.bankDetails}>
                      <div className={classes.title_label_2}>HDFC New A/c(50200011112280)</div>
                      <div className={classes.title_label_2}>
                        50200011112280
                      </div>
                      
                      <div className={classes.title_label_2}>
                        HDFC0009633
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Box> */}
              </Grid>

              {/* <Grid item xs={6} className={classes.footer_two}>
              <p className={classes.footer_sec_title}></p>
              <Box mx={2} mt={1}>
               
              </Box>
            </Grid> */}

              <Grid item xs={6} className={classes.footer_three}>
                <p className={classes.footer_sec_title}>Terms  & Conditions</p>

                <Box m={1}>
                  <div className={classes.title_label_2}>
                    1. Delivery will be in 48 hours from confirmation(unless specified otherwise).
                  </div>
                  <div className={classes.title_label_2}>
                    2. Slight color variations beyond our control may be present in delivered goods.
                  </div>
                  <div className={classes.title_label_2}>
                    3. The customer accepts a breakage risk of 3% of total delivered products.
                  </div>
                </Box>



              </Grid>

              <Grid item xs={6} className={classes.footer_four}>
                <Box>
                  <div className={classes.title_label_3}>
                    For Marudhar Marble & Granite
                  </div>
                  <div className={classes.boxBorder011}></div>
                  <div className={classes.boxBorder011}></div>

                  <div className={classes.boxBorder011}></div>




                  <div className={classes.title_label_4}>
                    ............................................
                  </div>
                  <div className={classes.title_label_4}>

                    Authorised Signatory
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default SalesOrderInvoicePage;
