import React from "react";
import {
  Paper,
  makeStyles,
  Grid,
  Box,
  Divider,
  withStyles,
} from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {getAllTerm} from "../../../services/termsService"
import {getAllModule} from "../../../services/termsService"



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
    padding: "0 8px 8px 8px",
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
    minWidth: 1100,
    height: "auto",
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
  item_desc: { width: "35%", borderRight: "1px solid " + borderColor },
  hsn_code: { width: "8%", borderRight: "1px solid " + borderColor },
  qty: { width: "8%", borderRight: "1px solid " + borderColor },
  rate: { width: "8%", borderRight: "1px solid " + borderColor },
  gst: { width: "13%", borderRight: "1px solid " + borderColor },
  disc: { width: "13%", borderRight: "1px solid " + borderColor },
  large_width: { width: "85%", borderRight: "1px solid " + borderColor },
  amount: { width: "15%" },

  hsn_code_2: { width: "25%", borderRight: "1px solid " + borderColor },
  taxable_value: { width: "18%", borderRight: "1px solid " + borderColor },
  central_tax: { width: "18%", borderRight: "1px solid " + borderColor },

  state_tax: { width: "18%", borderRight: "1px solid " + borderColor },
  tax_total_amount: { width: "15%" },

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
    borderRight: "1px solid " + borderColor,
  },
}));

const InvoicePreview = ({ invoiceDetail, vendorDetail, address }) => {
  const classes = useStyles();
  const [allTerms,setAllTerms] = React.useState([])
  React.useEffect(() => {
    getAllTerm(
      (terms) => {
        setAllTerms(terms.filter(term =>term.modules_name === "Purchase Order"));
      },
      (err) => {
        dispatch({
          type: actionTypes.SET_OPEN_MSG,
          payload: { msg: err, msgType: "error" },
        });
      }
    );
  },[])
  return (
    <div className={classes.invoice_prv_container}>
      <Grid conatainer justify="center">
        <Grid item xs={12} className={classes.headerDetails}>
          <Grid container>
            {/* Section One */}
            <Grid item xs={6} className={classes.section_one}>
              <Grid container className={classes.heightfull}>
                {/* <Grid item xs={4}>
                  <Box with={200} m={2}>
                    <img width="100%" height="100%" src={MrudharName} />
                  </Box>
                </Grid> */}
                <Grid item xs={8}>
                  <div className={classes.title_label}>Marudhar Marble and Granite </div>
                  <div className={classes.text_label}>
                  10/1A, KALAKAR STREET, KOLKATA
                  </div>
                  <div className={classes.text_label}>
                  Alter - 1/3A, Mahendra Roy Lane, Kolkata - 46
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
                  <div className={classes.text_label}>Purchase Order No</div>
                  <Box mt={1} mb={1}>
                    <div className={classes.title_label}>
                      {invoiceDetail?.polNo}
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder1}>
                  <div className={classes.text_label}>Date</div>
                  <Box mt={1} mb={1}>
                    <div className={classes.title_label}>
                      {invoiceDetail?.polDate}
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder2}>
                  <div className={classes.text_label}>Vendor's Ref. No.</div>
                  <div className={classes.title_label}>
                      {invoiceDetail?.refNo}
                    </div>
                 
                </Grid>
                <Grid item xs={6} className={classes.boxBorder3}>
                  <div className={classes.text_label}>Date</div>
                   
                  <div className={classes.title_label}>
                      {invoiceDetail?.refDate}
                    </div>
                </Grid>
              </Grid>
            </Grid>

            {/* Section Three */}

            <Grid item xs={6} className={classes.section_three}>
              <div className={classes.title_label}>Vendor</div>
              <div className={classes.title_label}>
               {invoiceDetail?.polVendor}
              </div>
              <div className={classes.text_label}>
                {address?.txt_street} , {/* {address?.txt_street} */}
              </div>
              <div className={classes.text_label}>
                {address?.txt_city} - 
                {address?.txt_pin} , {address?.ddl_state} 
              </div>

              <div className={classes.text_label}>
                GSTIN :{" "}
                <span className={classes.title_label}>{vendorDetail?.gst}</span>
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
                    SL NO.
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.item_desc}>
                    Description of Item
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.hsn_code}>
                    HSN/SAC
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.qty}>
                    Qty
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.rate}>
                    Rate
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.disc}>
                    <Grid container justifyContent="center" alignItem="center">
                      <Grid item xs={12} className={classes.insideBorder1}>
                        Disc
                      </Grid>
                      <Grid item xs={6} className={classes.insideBorder2}>
                        %
                      </Grid>
                      <Grid item xs={6} className={classes.insideBorder3}>
                        Value
                      </Grid>
                    </Grid>
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.gst}>
                    <Grid container justifyContent="center" alignItem="center">
                      <Grid item xs={12} className={classes.insideBorder1}>
                        GST
                      </Grid>
                      <Grid item xs={6} className={classes.insideBorder2}>
                        %
                      </Grid>
                      <Grid item xs={6} className={classes.insideBorder3}>
                        Value
                      </Grid>
                    </Grid>
                  </StyledTableCell>

                  <StyledTableCell align="center" className={classes.amount}>
                    Amount
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceDetail?.item_details?.length &&
                  invoiceDetail?.item_details?.map((row, i) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell
                          align="left"
                          className={classes.serial_Id}
                        >
                          {i + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          className={classes.item_desc}
                        >
                          {row.item}  {row.brand_name ? `- (${row.brand_name})`: ""}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.hsn_code}
                        >
                          {row.hsn_code}
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.qty}>
                          {row.quantity} {row.uom_name}
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.rate}>
                          {currencyFormate(row.rate)}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.disc}
                        >
                          <Grid
                            container
                            justifyContent="right"
                            alignItem="right"
                          >
                            <Grid item xs={6} className={classes.insideBorder2}>
                              <Box textAlign="right">{row.disc_percentage}</Box>
                            </Grid>
                            <Grid item xs={6} className={classes.insideBorder3}>
                              <Box textAlign="right">{row.disc_value}</Box>
                            </Grid>
                          </Grid>
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.gst}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItem="center"
                          >
                            <Grid item xs={6} className={classes.insideBorder2}>
                             <Box textAlign="right">{row.gst_percentage}</Box> 
                            </Grid>
                            <Grid item xs={6} className={classes.insideBorder3}>
                              <Box textAlign="right">{row.gst_value}</Box>
                            </Grid>
                          </Grid>
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className={classes.amount}
                        >
                          {currencyFormate(row.net_value)}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}

                <StyledTableRow>
                  <StyledTableCell
                    colSpan={7}
                    align="right"
                    className={classes.large_width}
                  >
                    Total Charges including Taxes
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.amount}>
                    {invoiceDetail?.item_details?.length &&
                      currencyFormate(
                        invoiceDetail?.item_details?.reduce(
                          (sum, li) => Number(sum) + Number(li.net_value),
                          0
                        )
                      )}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={7}
                    align="right"
                    className={classes.large_width}
                  >
                   <b> {invoiceDetail?.item_details?.length &&
                      priceInWord(
                        Number(
                          invoiceDetail?.item_details
                            .reduce(
                              (sum, li) => Number(sum) + Number(li.net_value),
                              0
                            )
                            .toFixed(0)
                        )
                      )}</b>
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.amount}>
                   <b> {invoiceDetail?.item_details?.length &&
                      currencyFormate(
                        invoiceDetail?.item_details?.reduce(
                          (sum, li) => Number(sum) + Number(li.net_value),
                          0
                        )
                      )}</b>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* Item Description Table */}
        {/* <div className={classes.tablContainer}>
          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left" className={classes.serial_Id}>
                    #
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className={classes.hsn_code_2}
                  >
                    HSN
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className={classes.taxable_value}
                  >
                    Taxable Value
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className={classes.central_tax}
                  >
                    Central Tax
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.state_tax}>
                    State Tax
                  </StyledTableCell>

                  <StyledTableCell
                    align="center"
                    className={classes.tax_total_amount}
                  >
                    Total Tax Amount
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell align="left" className={classes.serial_Id}>
                    1
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className={classes.hsn_code_2}
                  >
                    4552
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className={classes.taxable_value}
                  >
                    85,442.00
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className={classes.central_tax}
                  >
                    9
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.state_tax}>
                    11.356.00
                  </StyledTableCell>

                  <StyledTableCell
                    align="right"
                    className={classes.tax_total_amount}
                  >
                    45,424.00
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell
                    colSpan={5}
                    align="right"
                    className={classes.large_width}
                  >
                    Rupees Fifty three thousand six hundred only
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.amount}>
                    53,600.00
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div> */}

        <Grid item xs={12} className={classes.footerDetails}>
          <Grid container>
            <Grid item xs={6} className={classes.footer_one}>
              <p className={classes.footer_sec_title}>Terms & conditions</p>
              <div className={classes.footer_one}>
              1. Please send two copy of your invoice.
              </div>
              <div className={classes.footer_one}>
              2. Enter the order in accordance with the prices, terms,
                 delivary method and specification listed.
                 </div>
                 <div className={classes.footer_one}>
              3. Please notify us immedately if you are unable to ship as specified.
              </div>
              <ol>
              {allTerms.map(t=>{
                return(
                <li>
                 {t.terms}
                </li>
                )
              })}
              </ol>
            </Grid>

            <Grid item xs={6} className={classes.footer_two}>
              <p className={classes.footer_sec_title}></p>
              <Box mx={2} mt={1}>
                {/* <Grid container>
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
                        485220156451554
                      </div>
                      <div className={classes.title_label_2}>
                        KORE INFOSYSTEMS
                      </div>
                      <div className={classes.title_label_2}>
                        NEW ALIPORE & HDFC00000125
                      </div>
                    </div>
                  </Grid>
                </Grid> */}
              </Box>
            </Grid>

            <Grid item xs={6} className={classes.footer_three}>
              <p className={classes.footer_sec_title}>Declaration</p>
              All Disputes Subject to Kolkata Jurisdiction.
              <Box m={1}>
                <div className={classes.footer_desc}>
              
                </div>
              </Box>
            </Grid>

            <Grid item xs={6} className={classes.footer_four}>
              <Box>
                <div className={classes.title_label_3}>For Marudhar Marble & Granite</div>
                
                <div className={classes.title_label_4}>
                  Authorised Signatory
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default InvoicePreview;
