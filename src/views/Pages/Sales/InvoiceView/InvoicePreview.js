import React from "react";
import {
  Paper,
  makeStyles,
  Grid,
  Box,
  Divider,
  withStyles,
} from "@material-ui/core";
import PageTitle from "../../HelperComponent/PageTitle";
import { getInvoiceBySalesId } from "../../../../services/invoiceLIstService";
import { getItemDetailById } from "../../../../services/saleService/addEnqueryService";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "./invoicePreview.css";
import {
  appFontWeightThin,
  appDefaultColor,
  appSecondColor,
  borderColor,
  appDefaultFamily,
  appFontWeight,
  tblBodyHoverColor,
} from "assets/jss/material-dashboard-pro-react";

import MrudharName from "../../../../assets/applogo/marudhar-name.png";
import MrudharLogo from "../../../../assets/applogo/marudhar-logo.png";
import { useHistory, useLocation } from "react-router-dom";
import { useStateValue } from "../../../../context/context";
import { actionTypes } from "../../../../context/reducer";
import { currencyFormate, priceInWord } from "../../HelperComponent/utils";
import { AutoScaleAxis } from "chartist";

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
  title_labelN: {
    color: appSecondColor,
    fontWeight: 500,
    fontSize: "1rem",
  },
  title_label: {
    color: appSecondColor,
    fontWeight: 500,
    fontSize: "1",
    width: "100%",

  },
 
  text_label1:{
    fontWeight:500,
    fontSize:"0.7rem",
    width: "100%",
    marginTop: "-10px"
  },
  title_label1: {
    
    fontWeight: 500,
    fontSize: "0.8rem",
    width: "100%",
    
  },
  title_label_2: {
    color: appSecondColor,
    fontWeight: 500,
    fontSize: ".7rem",
   
  },
  title_label_21: {
    color: appSecondColor,
    fontWeight: 500,
    fontSize: ".6rem",
    marginTop: "-18px",
    textDecoration: "underline",
   
  },
  footer_one1: {
    padding: "2px",
    borderBottom:"none"
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
    fontSize: ".6rem",
  },
  inv: {
    textAlign: "center",
    color: appSecondColor,
    fontWeight: 500,
    fontSize: "1rem",
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
    height: "145px",
    borderBottom: "1px solid " + borderColor,
  },
  section_two: {
    padding: "0 4px 8px 4px",
    height: "145px",
    borderBottom: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
  },
  section_four: {
    padding: "8px",
    // borderLeft: "1px solid " + borderColor,
  },
  section_three: {
    padding: "8px",
  },
  invoice_prv_container: {
    width: "100%",
    minWidth: "750px",
    height: "auto",
    outline: ".1px solid",
  },
  boxBorder0: {
    padding: "8px",
  },
  boxBorder1: {
    height: 45,
    padding: "8px",
    // borderLeft: "1px solid " + borderColor,
    
  },
  boxBorder2: {
    height: 35,
    padding: "8px",
    borderTop: "1px solid " + borderColor,
    // borderBottom: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,

  },
  boxBorder4: {
    height: 35,
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
    // borderBottom: "1px solid " + borderColor,
    // borderRight: "1px solid " + borderColor,
    marginBottom: "20px",
  },

  boxBorder011: {
    padding: "15px",
  },

  
  footer_two1: {
    padding: "5px",
  },

  tablContainer: {
    marginBottom: "15px",
    borderLeft: "1px solid " + borderColor,
    borderRight: "1px solid " + borderColor,
    borderTop: "1px solid " + borderColor,
    
    
    
    
  },
  serial_Id: { width: "5%",  borderRight: "1px solid " + borderColor },
  item_desc: { width: "35%", borderRight: "1px solid " + borderColor },
  hsn_code: { width: "13%", borderRight: "1px solid " + borderColor},
  qty: { width: "12%", borderRight: "1px solid " + borderColor },
  rate: { width: "10%", borderRight: "1px solid " + borderColor },
  per: { width: "5%", borderRight: "1px solid " + borderColor },
  disc: { width: "5%", borderRight: "1px solid " + borderColor },
  amount: { width: "10%", },
  // gst: { width: "13%", borderRight: "1px solid " + borderColor },
  // disc: { width: "13%", borderRight: "1px solid " + borderColor },
  large_width: { width: "95%", borderRight: "1px solid " + borderColor },
  
  large_amount:{width: "100%",borderBottom:"none",fontSize:".8rem",fontWeight:520},

  hsn_code_2: { width: "25%", borderRight: "1px solid " + borderColor },
  taxable_value: { width: "19%", borderRight: "1px solid " + borderColor },
  central_tax: { width: "18%", borderRight: "1px solid " + borderColor },
  state_tax: { width: "18%", borderRight: "1px solid " + borderColor },
  tax_total_amount: { width: "15%",borderRight: "1px solid " + borderColor },
 

  footerDetails: {
    height: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    width: "100%",
    border: "1px solid " + borderColor,
    borderTop:"none",
  },

  footer_one: {
    padding: "5px",
    borderBottom: "1px solid " + borderColor,
    borderTop:"1px solid " + borderColor,
  },
  footer_two: {
    padding: "5px",
    borderBottom: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
    borderTop:"1px solid " + borderColor,

    
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
  insideBorder7: {
   
    borderRight: "1px solid " + borderColor,
    fontWeight: 650,
  },
  

  insideBorder6: {
    borderBottom: "none",
    fontSize:".6rem"
   
  },
  // insideBorder11: {
  //   borderBottom: rowInfo.index === lastRowIndex? `1px solid`:``
   
  // },
 


}));

const InvoicePreview = ({ invoiceDetails, invItemDetails, customerDetail,invOtherChargesDetails,totalOtherCharges }) => {
  const classes = useStyles();
  // const [calOtherCharges,setCalOtherCharges]=React.useState(0)
//   let total=0,other_charges=0;
//   calOther(invOtherChargesDetails);
//   const calOther=(invOtherChargesDetails)=>{
//     // console.log(invOtherChargesDetails,"invOtherChargesDetails")
//     other_charges=invOtherChargesDetails.reduce((sum,li)=> li.charge_type === "+"?
//     Number(sum)+ Number(li.charge_amount)
//     :Number(sum)- Number(li.charge_amount),0
//     ).toFixed(2)
//     return (other_charges)
//   }
  
// console.log(other_charges,"other_charges")


  return (

    <div className={classes.invoice_prv_container}>
      <Box>
        <div className={classes.inv}>
        Tax Invoice
        </div>
        <div className={classes.footer_two1}> </div>

      </Box>
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
                  <div className={classes.title_labelN}>Marudhar Marble & Granite </div>
                  <div className={classes.text_label}>
                   10/1A, KALAKAR STREET, KOLKATA
                  </div>
                  <div className={classes.text_label}>
                  
                    
                  </div>
                  <div className={classes.text_label}>
                    Alter-1/3A,Mahendra Roy Lane, Kolkata-46
                    
                  </div>
                  <div className={classes.text_label}>
                    
                    
                  </div>
                  <div className={classes.text_label}>
                  GSTIN : 19AAJFM6393R1Z3
                  </div>
                  <div className={classes.text_label}>
                    State Name: West Bengal, Code : 19
                  </div>
                  <div className={classes.text_label}>
                  Email : mmgranite@gmail.com
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {/* Section Two*/}

             


            <Grid item xs={6} className={classes.section_two}>
              <Grid container >
                <Grid item xs={6} className={classes.boxBorder1}>
                  <div className={classes.text_label}>Invoice No </div>
                  <Box >
                    <div className={classes.title_label}>
                      {invoiceDetails.invoice_no}
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder1}>
                  <div className={classes.text_label}>Date </div>
                  <Box>
                    <div className={classes.title_label}>
                      {invoiceDetails.invoice_date}
                    </div>
                  </Box>
                </Grid>
                {/* <Grid item xs={6} className={classes.boxBorder2}>
                  <div className={classes.text_label1}>Delivery Note</div>
                  <Box mt={1} mb={1}>
                    <div className={classes.title_label}>
                    
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder2}>
                  <div className={classes.text_label1}>Mode/Terms of Payment
                  </div>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder2}>
                  <div className={classes.text_label1}>References No & Date

                  </div>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder2}>
                  <div className={classes.text_label1}>Other References</div>
                  <Box mt={1} mb={1}>
                    <div className={classes.title_label}>
                      
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder2}>
                  <div className={classes.text_label1}>Buyer's Order No. : {invoiceDetails.purchase_order_no}
                  </div>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder2}>
                  <div className={classes.text_label1}>Date</div>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder2}>
                  <div className={classes.text_label1}>Dispatched Doc No.</div>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder2}>
                  <div className={classes.text_label1}>Delivery Note Date</div>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder2}>
                  <div className={classes.text_label1}>Dispatched through</div>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder4}>
                  <div className={classes.text_label1}>Destination</div>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder3}>
                  <div className={classes.text_label1}>Terms of Delivery</div>
                </Grid> */}
              </Grid>
            </Grid>

            {/* Section Three */}
                {console.log("sank210",invoiceDetails)}
            <Grid item xs={6} className={classes.section_three}>
              <div className={classes.title_label}>Buyer</div>
              <div className={classes.title_label}>
                 {invoiceDetails?.enqCustomer}
              </div>
              <div className={classes.text_label}>
                {invoiceDetails?.address[0]?.txt_street}
              </div>

              <div className={classes.text_label}>
                {invoiceDetails.address[0]?.txt_city} - {invoiceDetails.address[0]?.txt_pin} , {"  "}
                {invoiceDetails.address[0]?.ddl_state}
              </div>

              <div className={classes.text_label}>
                GSTIN :
                <span className={classes.title_label}>
                  {" "}
                  {invoiceDetails.gst_no}
                </span>
              </div>
            </Grid>

            {/* Section Four */}

            {/* <Grid item xs={6} className={classes.section_four}></Grid> */}
          </Grid>
        </Grid>

        {/* Item Description Table */}
        <div className={classes.tablContainer}>
          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left"  className={classes.serial_Id}>
                   SL No.
                  </StyledTableCell>
                  <StyledTableCell align="center"  className={classes.item_desc}>
                    Description of Goods
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.hsn_code}>
                    HSN/SAC
                  </StyledTableCell>
                  <StyledTableCell align="center"  className={classes.qty}>
                    Qty
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.rate}>
                    Rate
                  </StyledTableCell>
                  {/* <StyledTableCell align="center" className={classes.per}>
                    Per
                  </StyledTableCell> */}
                  <StyledTableCell align="center" className={classes.disc}>
                  Gst%
                  </StyledTableCell>
                  {/* <StyledTableCell align="center" className={classes.disc}>
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
                  </StyledTableCell> */}

                  <StyledTableCell align="center" className={classes.amount}>
                    Amount
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invItemDetails.length &&
                  invItemDetails.map((row, i) => {
                    
                    console.log(row,"test");
                    return (
                      <StyledTableRow  >
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
                          {row.item}
                          
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                     
                          className={classes.hsn_code}
                        >
                          {row.hsn_code}
                        </StyledTableCell>
                        <StyledTableCell align="center" className={classes.qty}>
                          {row.now_dispatch_qty} {row.uom_name}
                        </StyledTableCell>
                        <StyledTableCell align="right"  className={classes.rate}>
                          {currencyFormate(row.rate)}
                        </StyledTableCell>
                        {/* <StyledTableCell align="center"  className={classes.per}>
                          {(row.uom_name)}
                        </StyledTableCell> */}
                        <StyledTableCell align="center"  className={classes.disc}>
                          {(row.gst_percentage)}
                        </StyledTableCell>
                        {/* <StyledTableCell
                          align="center"
                          className={classes.disc}
                        >
                          <Grid
                            container
                            justifyContent="center"
                            alignItem="center"
                          >
                            <Grid item xs={6} className={classes.insideBorder2}>
                              <Box textAlign="right">
                                {Number(row.disc_percentage)}
                              </Box>
                            </Grid>
                            <Grid item xs={6} className={classes.insideBorder3}>
                              <Box textAlign="right">{row.disc_value}</Box>
                            </Grid>
                          </Grid>
                        </StyledTableCell>
                        <StyledTableCell align="center" className={classes.gst}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItem="center"
                          >
                            <Grid item xs={6} className={classes.insideBorder2}>
                              <Box textAlign="right">
                                {Number(row.gst_percentage)}
                              </Box>
                            </Grid>
                            <Grid item xs={6} className={classes.insideBorder3}>
                              <Box textAlign="right">{row.gst_value}</Box>
                            </Grid>
                          </Grid>
                        </StyledTableCell> */}
                        <StyledTableCell
                          align="right"
                          colSpan={6}
                          className={classes.amount}
                        >
                          {currencyFormate(row.net_value)}
                        </StyledTableCell>
                      </StyledTableRow>
                      

                      
                    );
                  })}

                  
              

            
                {/* <StyledTableRow>
                  <StyledTableCell
                    colSpan={2}
                    align="right"
                    className={classes.insideBorder2}
                  >
                    CGST
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.amount}>
                    {invItemDetails.length &&
                      currencyFormate(
                        invItemDetails.reduce(
                          (sum, li) => Number(sum) + Number(li.net_value),
                          0
                        )
                      )}
                  </StyledTableCell>
                  
                  {Number(gst_value)}
                </StyledTableRow> */}
                {/* <StyledTableRow>
                  <StyledTableCell
                    colSpan={2}
                    align="right"
                    className={classes.insideBorder2}
                  >
                    SGST
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.amount}>
                    {invItemDetails.length &&
                      currencyFormate(
                        invItemDetails.reduce(
                          (sum, li) => Number(sum) + Number(li.net_value),
                          0
                        )
                      )}
                  </StyledTableCell>
                  
                </StyledTableRow> */}



                <StyledTableRow>
                  <StyledTableCell
                    colSpan={6}
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
                    {invItemDetails.length &&
                      currencyFormate(
                        invItemDetails.reduce(
                          (sum, li) => Number(sum) + Number(li.net_value) -  Number(li.gst_value),
                          0
                        )
                      )}
                  </StyledTableCell>
                  
                </StyledTableRow>



                {/* {invItemDetails.length>0 &&
                  invItemDetails.map((row, i) => {
                    return ( */}
                <StyledTableRow>

                  
        
                  <StyledTableCell
                    colSpan={6}
                    align="right"
                    className={classes.insideBorder2}
                  >
                   CGST
               
                  </StyledTableCell>



                  <StyledTableCell
                  //  colSpan={7} 
                   align="right" 
                   className={classes.insideBorder2}>

                  {invItemDetails.length > 0 &&
                      currencyFormate(
                        invItemDetails.reduce(
                          (sum, li) => Number(sum) + Number(li.gst_value/2),
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
              
                   {/* );
                  })} */}

              

                {/* { 
                  invItemDetails.map((row, i) => {
                    return ( */}
                <StyledTableRow>

                  
        
                  <StyledTableCell
                    colSpan={6}
                    align="right"
                    className={classes.insideBorder2}
                  >
                    SGST
                
                  </StyledTableCell>

                  <StyledTableCell
                  //  colSpan={7}
                   align="right" className={classes.insideBorder2}>

                  {invItemDetails.length > 0 &&
                      currencyFormate(
                        invItemDetails.reduce(
                          (sum, li) => Number(sum) + Number(li.gst_value/2),
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
              
                   {/* );
                  })} */}

                {invOtherChargesDetails.length > 0 &&
                  invOtherChargesDetails.map((row, i) => {
                    return (
                <StyledTableRow>
        
                  <StyledTableCell
                    colSpan={6}
                    align="right"
                    className={classes.insideBorder2}
                  >
                    
                   {row.charges} ({row.charge_type})

                  </StyledTableCell>



                  <StyledTableCell 
                  // colSpan={7}
                   align="right" className={classes.insideBorder2}>

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
                    colSpan={6}
                    align="right"
                    className={classes.insideBorder7}
                  >
                    Total
                  </StyledTableCell>
                 
                 
                  <StyledTableCell 
                  // colSpan={7} 
                  align="right" className={classes.large_width}>
                    {/* {console.log(invItemDetails,"invItemDetails")} */}
                    {invItemDetails.length > 0 &&
                      currencyFormate(
                        invItemDetails.reduce(
                          (sum, li) => Number(sum) + Number(li.net_value) + totalOtherCharges ,
                          0
                        )
                      )}
                  </StyledTableCell>
                  
                </StyledTableRow>
                
              
                <StyledTableRow>
                  <StyledTableCell colSpan={2}
                  align="left"
                  className={classes.insideBorder6}
                 >
                    Amount Chargeable(in words) : 
                  
                
                  <span className={classes.large_amount}>
                  &nbsp;  INR &nbsp;
                    {/* Rupees Fifty three thousand six hundred only */}

                    {invItemDetails.length &&
                      priceInWord( 
                        Number(
                          invItemDetails
                            .reduce(
                              (sum, li) => Number(sum) + Number(li.net_value)+ totalOtherCharges ,
                              0
                            )
                            .toFixed(0)
                        )
                      )}
                      </span>
                 
  </StyledTableCell>
                  {/* <StyledTableCell align="right" className={classes.amount}>
                    {invItemDetails.length &&
                      currencyFormate(
                        invItemDetails.reduce(
                          (sum, li) => Number(sum) + Number(li.net_value)+ totalOtherCharges,
                          0
                        )
                      )}
                  </StyledTableCell> */}
                </StyledTableRow>
              </TableBody>
              
            </Table>
          </TableContainer>
        </div>
        {/* Item Description Table */}
        <div className={classes.tablContainer}>
          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left" className={classes.serial_Id}>
                    SL NO.
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className={classes.hsn_code_2}
                  >
                    HSN/SAC
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
                    <Grid container justifyContent="center" alignItem="center">
                      <Grid item xs={12} className={classes.insideBorder1}>
                        Central Tax
                      </Grid>
                      <Grid item xs={6} className={classes.rate}>
                        Rate
                      </Grid>
                      <Grid item xs={6} className={classes.insideBorder3}>
                        Amount
                      </Grid>
                    </Grid>
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.state_tax}>
                    <Grid container justifyContent="center" alignItem="center">
                      <Grid item xs={12} className={classes.insideBorder1}>
                        State Tax
                      </Grid>
                      <Grid item xs={6} className={classes.rate}>
                        Rate
                      </Grid>
                      <Grid item xs={6}>
                        Amount
                      </Grid>
                    </Grid>
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
                {invItemDetails.length &&
                  invItemDetails.map((row, i) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell
                          align="left"
                          className={classes.serial_Id}
                        >
                          {i + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.hsn_code_2}
                        >
                          {row.hsn_code}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.taxable_value}
                        >
                          <Box textAlign="right">{Number(row.net_value).toFixed(2)}</Box>
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.central_tax}
                        >
                          <Grid
                            container
                            justifyContent="flex-end"
                            alignItem="flex-end"
                          >
                            <Grid item xs={6} className={classes.rate}>
                              <Box textAlign="right">
                                {(row.gst_percentage / 2).toFixed(2)}
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box textAlign="right">
                                {(row.gst_value / 2).toFixed(2)}
                              </Box>
                            </Grid>
                          </Grid>
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.state_tax}
                        >
                          <Grid
                            container
                            justifyContent="flex-end"
                            alignItem="flex-end"
                          >
                            <Grid item xs={6} className={classes.rate}>
                              <Box textAlign="right">
                                {(row.gst_percentage / 2).toFixed(2)}
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box textAlign="right">{(row.gst_value / 2).toFixed(2)}</Box>
                            </Grid>
                          </Grid>
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          className={classes.tax_total_amount}
                        >
                          <Box textAlign="right">{Number(row.gst_value).toFixed(2)}</Box>
                        </StyledTableCell>
                      </StyledTableRow>
                      
                    );
                  })}

                 {/* {invItemDetails.length &&
                  invItemDetails.map((row, i) => {

                    return ( */}
                <StyledTableRow>
                  <StyledTableCell colSpan={2}align="right" className={classes.insideBorder7}> Total</StyledTableCell>
                   <StyledTableCell
                            align="right"
                          className={classes.tax_total_amount}
                        >
                          <Box textAlign="right">{invItemDetails.length > 0 &&
                      currencyFormate(
                        invItemDetails.reduce(
                          (sum, li) => Number(sum) + Number(li.net_value),
                          0
                        )
                      )}</Box>
                        </StyledTableCell>
                        <StyledTableCell
                            align="right"
                          className={classes.tax_total_amount}
                        >
                          <Box textAlign="right">{invItemDetails.length > 0 &&
                      currencyFormate(
                        invItemDetails.reduce(
                          (sum, li) => Number(sum) + Number(li.gst_value/2),
                          0
                        )
                      )}</Box>
                        </StyledTableCell>
                        <StyledTableCell
                            align="right"
                          className={classes.tax_total_amount}
                        >
                          <Box textAlign="right">{invItemDetails.length > 0 &&
                      currencyFormate(
                        invItemDetails.reduce(
                          (sum, li) => Number(sum) + Number(li.gst_value/2),
                          0
                        )
                      )}</Box>
                        </StyledTableCell>
                  <StyledTableCell colSpan={7} align="right" className={classes.amount}>
                    {invItemDetails.length > 0 &&
                      currencyFormate(
                        invItemDetails.reduce(
                          (sum, li) => Number(sum) + Number(li.gst_value),
                          0
                        )
                      )}
                  </StyledTableCell>
                </StyledTableRow>



                <StyledTableRow>
                  <StyledTableCell colSpan={2}className={classes.insideBorder6}>
                    <span style={{ whiteSpace: 'nowrap' }}>
                    Tax Amount(in words):
                    </span>
                <span className={classes.large_amount} style={{ whiteSpace: 'nowrap' }}>
                &nbsp; INR &nbsp;
                    {invItemDetails.length &&
                      priceInWord(
                        Number(
                          invItemDetails
                            .reduce(
                              (sum, li) => Number(sum) + Number(li.gst_value),
                              0
                            )
                            .toFixed(0)
                        )
                      )}
                  </span>
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
              <p style={{paddingLeft:"180px"}}>Scan To Pay</p>              
            <img 
            
             src={require("../../../../assets/img/marudhar-qrcode.jpg").default} 
             style={{paddingLeft:"170px"}}
            />
          </StyledTableCell>
              </Grid>

            <Grid item xs={6} className={classes.footer_two}>
              <p className={classes.footer_sec_title}>Company's Bank Details</p>
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
                      <div className={classes.title_label_2}>ICICI BANK LTD.-126205001191(c.c)</div>
                      <div className={classes.title_label_2}>
                        126205001191
                      </div>
                      
                      <div className={classes.title_label_2}>
                        TOPSIA & ICIC0001262
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={6} className={classes.footer_three}>
              <p className={classes.title_label_2}>Company's PAN  : AAJFM6393R</p>
              <Grid item xs={6} className={classes.footer_three}>
              <p className={classes.title_label_21}>Declaration</p>
              <p className={classes.title_label_2}>All Disputes subject to Kolkata Jurisdiction</p>
              {/* <Box m={1}>
                <div className={classes.footer_desc}>
                 
                </div>
              </Box> */}
            </Grid>
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
  );
};


export default InvoicePreview;
