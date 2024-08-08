import React from "react";
import {
  Paper,
  makeStyles,
  Grid,
  Box,
  Divider,
  withStyles,
  Tooltip,
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
// import ItemViewCard from "../HelperComponent/ItemViewCard";
import ItemNameCard from "../HelperComponent/ItemNameCard";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";

import MrudharName from "../../../assets/applogo/marudhar-name.png";

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
import { padding } from "@mui/system";

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
    paddingBottom:"5px"
  },
  title_label: {
    color: appSecondColor,
    fontWeight: 500,
    fontSize: "1rem",
  },
  title_label_2: {
    color: appSecondColor,
    fontWeight: 500,
    fontSize: ".8rem",
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
  text: {
    color: appSecondColor,
    fontWeight: 400,
    fontSize: ".9rem",
    lineHeight: "1.6",
  },
  heightfull: {
    height: "100%",
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
    // width: 950,
    minWidth: "700px",
    height: "auto",
    border: "1px solid",
  },
  boxBorder0: {
    padding: "8px",
  },
  boxBorder01: {
    padding: "8px",
    borderTop: "1px solid " + borderColor,
  },
  boxBorder011: {
    padding: "15px",
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
  serial_Id: { width: "3%", borderRight: "1px solid " + borderColor },
  serial_Id1: { width: "7%", borderRight: "1px solid " + borderColor },

  item_desc: { width: "32%", borderRight: "1px solid " + borderColor },
  qty: { width: "8%", borderRight: "1px solid " + borderColor },
  large_width: { width: "45%", borderRight: "1px solid " + borderColor },
  per: { width: "6%", borderRight: "1px solid " + borderColor },
  disc: { width: "6%", borderRight: "1px solid " + borderColor },
  gst: { width: "8%", borderRight: "1px solid " + borderColor },
  amount: { width: "20%" },
  amount1: { width: "25%", borderRight: "none" },

  rate: { width: "10%", borderRight: "1px solid " + borderColor },
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
  footer_one1: {
    padding: "2px",
    borderBottom:"none"
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
    fontWeight: 650,
  },
  insideBorder21: {
    borderBottom: "none",
    fontWeight: 650,
  },
  insideBorder211: {
    borderBottom: "none",
    borderLeft: "1px solid " + borderColor,
    fontWeight: 650,
  },
  insideBorder2111: {
    borderBottom: "none",
    borderLeft: "1px solid " + borderColor,
    fontWeight: 650,
  },
  insideBorder6: {
    borderBottom: "none",
    fontSize: ".6rem",
  },
  itemImgPaper: {
    width: "70px",
    height: "70px",
    overflow: "hidden",
  },
}));

const QuotationInvoicePage = ({
  quotationDetails,
  deliveryDetails,
  totalOtherCharges,
}) => {
  // console.log("Mrb", quotationDetails);
  const classes = useStyles();
  const [globalState, dispatch] = useStateValue();

  const [allTerms, setAllTerms] = React.useState([]);
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
        <div className={classes.title_label11}>Quotation</div>
      </Grid>
      <div className={classes.invoice_prv_container}>
        <Grid item xs={12} className={classes.headerDetails}>
          <Grid container>
            {/* Section One */}
            <Grid item xs={6} className={classes.section_one}>
              <Grid container className={classes.heightfull}>
                <Grid item xs={4}>
                  <Box with={200} m={1} style={{ paddingTop: "30px" }}>
                    <img width="100%" height="100%" src={MrudharName} />
                  </Box>
                </Grid>

                <Grid item xs={8}>
                  <div className={classes.title_label}>
                    Marudhar Marble and Granite{" "}
                  </div>
                  <div className={classes.text_label}>
                    10/1A, KALAKAR STREET, KOLKATA
                  </div>
                  <div className={classes.text_label}>
                    Alter - 1/3A, Mahendra Roy Lane,
                    <div className={classes.text_label}>Kolkata - 700046</div>
                  </div>
                  <div className={classes.text_label}>
                    GSTIN/UIN : 19AAJFM7393R1Z3
                  </div>
                  <div className={classes.text_label}>
                    State Name : West Bengal, Code : 19
                  </div>
                  <div className={classes.text_label}>
                    Email : mmgranite@gmail.com
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {/* Section Two*/}

            <Grid item xs={6} className={classes.section_two}>
              <Grid container>
                <Grid item xs={6} className={classes.boxBorder0}>
                  <div className={classes.text_label}>Quotation No</div>

                  <Box mt={1} mb={1}>
                    <div className={classes.title_label}>
                      {/* {console.log(quotationDetails[0],"5656")} */}
                      {quotationDetails[0]?.qutNo}
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder0}>
                  <div className={classes.text_label}>Date</div>
                  <Box mt={1} mb={1}>
                    {/* {console.log(quotationDetails,"quotationDetails?.qutDate")} */}
                    <div className={classes.title_label}>
                      {quotationDetails[0]?.qutDate}
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder01}>
                  <div className={classes.text_label}>Sales Executive</div>
                  <div className={classes.title_label}>
                    {quotationDetails[0]?.qutSalesExecutive}
                  </div>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder01}>
                  <div className={classes.text_label}>Phone Number</div>
                   
                  <div className={classes.title_label}>
                      {quotationDetails[0]?.qutsales_phone}
                    </div>
                </Grid>
              </Grid>
            </Grid>

            {/* Section Four */}
            {console.log("sank210",quotationDetails[0])}

            <Grid item xs={6} className={classes.section_four}>
              <div className={classes.title_label}>Buyer</div>
              <div className={classes.title_label}>
                {quotationDetails[0]?.qutCustomer}
              </div>
              <div className={classes.text_label}>
                {quotationDetails[0]?.qutstreet}
              </div>

              <div className={classes.text_label}>
                {quotationDetails[0]?.qutcity} - {quotationDetails[0]?.qutpin} , {"  "}
                {quotationDetails[0]?.qutstate}
              </div>

              <div className={classes.text_label}>
              GSTIN : {quotationDetails[0]?.gst_no}
                <span className={classes.title_label}>
                  {/* {" "} */}
                  {/* {invoiceDetails.gst_no} */}
                </span>
              </div>
            </Grid>
          </Grid>
        </Grid>

        {/* Item Description Table */}
        <div className={classes.tablContainer}>
          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left" className={classes.serial_Id1}>
                    SL No.
                  </StyledTableCell>
                  <StyledTableCell align="left" className={classes.serial_Id}>
                    Image
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.item_desc}>
                    Description of Goods
                  </StyledTableCell>

                  <StyledTableCell align="center" className={classes.qty}>
                    Qty
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.rate}>
                    Rate
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.disc}>
                  Disc %
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.rate}>
                    Net Rate
                  </StyledTableCell>
                  

                  <StyledTableCell align="center" className={classes.gst}>
                    GST%
                  </StyledTableCell>

                  <StyledTableCell align="center" className={classes.amount1}>
                    Amount
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              {console.log(
                quotationDetails,
                " quotationDetails?.quotation_item_details"
              )}
              <TableBody>
                {quotationDetails[0]?.quotation_item_details &&
                  quotationDetails[0]?.quotation_item_details?.map((row, i) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell align="left" className={classes.qutID}>
                          {i + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.boxBorder3}
                        >
                          <Paper
                            className={classes.itemImgPaper}
                            // style={{ paddingLeft: "20%" }}
                          >
                            <ItemImg item_id={row.item_id} />
                          </Paper>
                          {/* {<ItemViewCard item_id={row.item_id} />} */}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.boxBorder3}
                        >
                          {<ItemNameCard item_id={row.item_id} />}
                        </StyledTableCell>

                        {console.log(row, "rrrr")}
                        <StyledTableCell align="right" className={classes.qty}>
                          {row?.quantity} {row?.uom_name}
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.rate}>
                          {currencyFormate(row.mrp)}
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.disc}>
                      {(Number(row?.disc_percentage).toFixed(2))}
                      </StyledTableCell>
                        <StyledTableCell align="right" className={classes.rate}>
                          {currencyFormate(row.mrp - row.disc_value)}
                        </StyledTableCell>
                      

                        {/* <StyledTableCell align="right" className={classes.disc}>
                        {(currencyFormate(row?.disc_value))}
                        {console.log((Number(row?.disc_percentage).toFixed(2)), "row?.disc_percentage")}
                      </StyledTableCell> */}
                        <StyledTableCell align="right" className={classes.gst}>
                          {Number(
                            row?.gst_type === 1 ? row?.gst_percentage : 0
                          ).toFixed(2)}
                          {/* {console.log((Number(row?.gst_percentage).toFixed(2)), "row?.gst_percentage")} */}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.amount}
                        >
                          {currencyFormate(row.net_value)}
                        </StyledTableCell>

                        <StyledTableCell align="right" className={classes.rate}>
                          <Table
                            className={classes.table}
                            aria-label="customized table"
                          >
                            {/* {console.log(quotationDetails[0]?.quotation_item_details, "sank2501")} */}
                            <TableBody>
                              {deliveryDetails?.enqShowroom[i] &&
                                deliveryDetails?.enqShowroom[i].map((det) => {
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
                                })}
                            </TableBody>
                          </Table>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                <StyledTableRow>
               
                  <StyledTableCell
                    colSpan={8}
                    align="right"
                    className={classes.insideBorder21}
                  >
                    Taxable Amount
                  </StyledTableCell>
                  

                  <StyledTableCell
                    align="right"
                    className={classes.insideBorder211}
                  >
                    {quotationDetails[0]?.quotation_item_details.length &&
                      currencyFormate(
                        quotationDetails[0]?.quotation_item_details.reduce(
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
                    colSpan={8}
                    align="right"
                    className={classes.insideBorder21}
                  >
                    CGST
                  </StyledTableCell>

                 
                  <StyledTableCell
                    align="right"
                    className={classes.insideBorder211}
                  >
                    {quotationDetails[0]?.quotation_item_details.length > 0 &&
                      currencyFormate(
                        quotationDetails[0]?.quotation_item_details.reduce(
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
                    colSpan={8}

                    align="right"
                    className={classes.insideBorder21}
                  >
                    {" "}
                    SGST
                  </StyledTableCell>

                
                  <StyledTableCell
                    align="right"
                    className={classes.insideBorder211}
                  >
                    {quotationDetails[0]?.quotation_item_details.length > 0 &&
                      currencyFormate(
                        quotationDetails[0]?.quotation_item_details.reduce(
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
{console.log(quotationDetails,"sankhaquotationDetails")}
                {/* othercharges start */}
                {quotationDetails[0]?.quotation_other_charges.length > 0 &&
                  quotationDetails[0]?.quotation_other_charges.map((row, i) => {
                    return (
                      <StyledTableRow>
                     

                        <StyledTableCell
                    colSpan={8}

                          align="right"
                          className={classes.insideBorder21}
                        >
                          {row.charges} ({row.charge_type})
                        </StyledTableCell>

                        {/* <StyledTableCell
                          className={classes.insideBorder21}
                        ></StyledTableCell> */}
                        {/* <StyledTableCell
                          align="right"
                          className={classes.insideBorder21}
                        ></StyledTableCell>
                        <StyledTableCell
                          className={classes.insideBorder21}
                        ></StyledTableCell> */}
                        {/* <StyledTableCell
                          align="right"
                          className={classes.insideBorder21}
                        ></StyledTableCell> */}

                        <StyledTableCell
                          align="right"
                          className={classes.insideBorder211}
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
                  })}
                <StyledTableRow>
                  

                  <StyledTableCell
                    colSpan={8}
                    align="right"
                    className={classes.insideBorder2}
                  >
                    Total
                  </StyledTableCell>
                  {/* {console.log(totalOtherCharges, "jj")} */}
              

                  <StyledTableCell
                    //  colSpan={7}
                    align="right"
                    className={classes.insideBorder2111}
                  >
                    {quotationDetails[0]?.quotation_item_details.length > 0 &&
                      currencyFormate(
                        quotationDetails[0]?.quotation_item_details.reduce(
                          (sum, li) =>
                            Number(sum) +
                            Number(li.net_value) +
                            totalOtherCharges,
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
            <Grid item xs={6} className={classes.footer_one}
           
            >
              <StyledTableCell className={classes.footer_one1}>
              <p style={{paddingLeft:"180px"}}>Scan To Pay</p>              
            <img 
            
             src={require("../../../assets/img/marudhar-qrcode.jpg").default} 
             style={{paddingLeft:"170px"}}
            />
          </StyledTableCell>
            </Grid>

            <Grid item xs={6} className={classes.footer_two}>
            <div className={classes.boxBorder011}></div>

              <p className={classes.footer_sec_title}>Company's Bank Details</p>

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
            </Grid>

            <Grid item xs={6} className={classes.title_label_2}>
               <p className={classes.footer_sec_title}>Terms & conditions</p>
              <div className={classes.title_label_2}>
                1. Delivery and Lifting Charges will be Charged as Per Actuals.
              </div>
              <div className={classes.title_label_2}>
                2. Delivery Schedule will be Confirmed at the time of Delivery.
              </div>
              <div className={classes.title_label_2}>
                3. This Quotation is valid for 15 Days.
              </div>
              <ol>
                {allTerms.map((t) => {
                  return <li>{t.terms}</li>;
                })}
              </ol>
              <p className={classes.footer_sec_title}>Declaration</p>
              1. All Disputes Subject to Kolkata Jurisdiction.
              <Box m={1}>
                <div className={classes.footer_desc}></div>
              </Box>
              <Box m={1}>
                <div className={classes.footer_desc}></div>
              </Box>
            </Grid>

            <Grid item xs={6} className={classes.footer_four}>
              <Box>
                <div className={classes.title_label_3}>
                  For Marudhar Marble & Granite
                </div>
                <div className={classes.title_label_3}></div>
                <Box m={1}>
                  <div className={classes.boxBorder011}></div>
                  <div className={classes.boxBorder011}></div>
                  <div className={classes.boxBorder011}></div>
                  <div className={classes.boxBorder011}></div>

                </Box>
                <div className={classes.title_label_4}>
                  Authorised Signatory
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default QuotationInvoicePage;
