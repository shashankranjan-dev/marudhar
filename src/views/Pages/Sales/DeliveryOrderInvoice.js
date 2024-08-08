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
import { getAllTerm } from "../../../services/termsService";
import { getAllModule } from "../../../services/termsService";
import { currentDate, dateFormate, dateFormateField } from "../HelperComponent/utils";
import ItemNameCard from "../HelperComponent/ItemNameCard";
import MrudharName from "../../../assets/applogo/marudhar-name.png";
import { useStateValue } from "../../../context/context";
import { actionTypes } from "../../../context/reducer";
import TextField from "@material-ui/core/TextField";

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
    padding: "0px 4px",
    fontWeight: appFontWeight,
    fontFamily: appDefaultFamily,
    fontSize: "14px",
  },
  body: {
    color: appSecondColor,
    padding: "0px 4px",
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
  title_label1: {
    color: appSecondColor,
    fontWeight: 600,
    fontSize: "1.4rem",
    textAlign: "center",

  },
  title_label: {
    color: appSecondColor,
    fontWeight: 500,
    fontSize: "1rem",
  },
  largeLabel: {
    fontSize: '1.2rem', 
  },
  noBottomBorder: {
    '&:before': {
      borderBottom: 'none',
    },
    '&:after': {
      borderBottom: 'none',
    },
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
    fontSize: ".9rem",
  },
  title_label_41: {
    textAlign: "right",
    color: appSecondColor,
    fontWeight: 500,
    fontSize: ".9rem",
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
    width: "100%",
    minWidth: "700px",
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
    paddingTop:"18px",
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
  item_desc: { width: "40%", borderRight: "1px solid " + borderColor },
  qty: { width: "10%", borderRight: "1px solid " + borderColor },
  alt_qty: {
    width: "10%",
    borderRight: "1px solid " + borderColor,
    borderLeft: "1px solid " + borderColor,
  },

  large_width: { width: "45%", borderRight: "1px solid " + borderColor },

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
  footer_two1: {
    padding: "5px",
  },
  footer_two12: {
    padding: "5px",
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
    fontSize: ".9rem",
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

const DeliveryOrderInvoice = ({
  deliveryDetails,
  showroom,
  vendorDetail,
  address,
  searchDetail,
 
}) => {
  // console.log("Mrb", globalState?.user?.iat  );
  const classes = useStyles();
  const [allTerms, setAllTerms] = React.useState([]);
  const [globalState, dispatch] = useStateValue();
  const [deliveryAddress, setDeliveryAddress] = React.useState('');
  


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
    <div className={classes.invoice_prv_container}>
      <Grid conatainer justify="center">
        <Grid  >
          <div className={classes.title_label1}>
          Delivery Order
          </div>
          <div className={classes.footer_two1}>      </div>
          <div className={classes.footer_two1}>      </div>

          <Grid>

          </Grid>
         
        </Grid>
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
                    10/1A, KALAKAR STREET, KOLKATA
                  </div>
                  <div className={classes.text_label}>
                    Alter - 1/3A, Mahendra Roy Lane,
                  </div>
                  <div className={classes.text_label}>
                     Kolkata - 700046
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
                  <div className={classes.text_label}>SO No</div>

                  <Box mt={1} mb={1}>
                    <div className={classes.title_label}>
                      {deliveryDetails?.DelSalesOrderNo}
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder0}>
                  <div className={classes.text_label}>Delivery Order Number</div>
                  <Box mt={1} mb={1}>
                    <div className={classes.title_label}>
                    {deliveryDetails?.DelNo}
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder0}>
                  <div className={classes.text_label}>
                  Delivery Order Date
                  </div>
                  <div className={classes.title_label}>
                  {deliveryDetails?.DelDate}
                  </div>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder0}>
                  <div className={classes.text_label}>Delivery Order Print Date</div>

                  <div className={classes.title_label}>
                    {dateFormate(globalState?.user?.iat)}
                  </div>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder0}>
                <div className={classes.text_label}>
                  Salesman Name 
                </div>
                <div className={classes.title_label}>
                {deliveryDetails.DelSalesExecutive}
                </div>
                </Grid>
                <Grid item xs={6} className={classes.boxBorder0}>
                <div className={classes.text_label}>
                  Phone Number 
                </div>
                <div className={classes.title_label}>
                {deliveryDetails.sales_phone}
                </div>
                </Grid>
              </Grid>
            </Grid>

            {/* Section Four */}
{console.log(deliveryDetails,"sankhagstin")}
            <Grid item xs={6} className={classes.section_four}>
            <div className={classes.title_label}>Buyer :</div>

              <div className={classes.title_label}>
                 {deliveryDetails?.company_name}
              </div>
              <div className={classes.text_label}>
                  {deliveryDetails?.Delstreet}
                </div>

                <div className={classes.text_label}>
                  {deliveryDetails?.Delcity} , {"  "}
                  {/* - {salesOrderDetails[0]?.pin}  */}
                  {deliveryDetails?.Delstate}
                </div>

                <div className={classes.text_label}>
                GSTIN : {deliveryDetails?.gst_no}
                  <span className={classes.title_label}>
                    {/* {" "} */}
                    {/* {invoiceDetails.gst_no} */}
                  </span>
                </div>
            </Grid>
            <Grid item xs={6} className={classes.section_four}>
            <div className={classes.title_label}>Delivery Address :</div>
            <TextField
          // label="Delivery Address"
          // variant="outlined"
          fullWidth
          multiline
          rows={4}
          rowsMax={5}
          InputLabelProps={{
            classes: {
              root: classes.largeLabel,
            },
          }}
          InputProps={{ 
            classes: {
              root: classes.noBottomBorder, 
            },
          }}
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          
        />
            </Grid>
          </Grid>
        </Grid>
{/* {console.log(deliveryDetails,"sankdeliveryDetails")} */}
        {/* Item Description Table */}
        <div className={classes.tablContainer}>
          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left" className={classes.serial_Id}>
                    SL NO.
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.alt_qty}>
                    Alt. Qty.
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.item_desc}>
                    Description of Item
                  </StyledTableCell>

                  <StyledTableCell align="center" className={classes.qty}>
                    Qty
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className={classes.showrooms_warehouse_id}
                  >
                    Godown Name
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deliveryDetails?.delivery_order_item_details &&
                  deliveryDetails?.delivery_order_item_details.map((row, i) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell align="left" className={classes.qutID}>
                          {i + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className={classes.alt_qty}
                        >
                          {/* {row.uom_name} */}

                          <Table
                            className={classes.table}
                            aria-label="customized table"
                          >
                            <TableBody>
                              {deliveryDetails?.enqShowroom[i] &&
                                deliveryDetails?.enqShowroom[i].map((det) => {
                                  return (
                                    <StyledTableRow
                                      style={{ borderBottom: "None" }}
                                    >
                                      <StyledTableCell
                                        style={{ borderBottom: "None" }}
                                        align="right"
                                      >
                                        {det.lower_unit} {det.lower_caption}
                                      </StyledTableCell>

                                      {/* <StyledTableCell style={{borderBottom: "None"}}>
                                  {det.quantity}
                                </StyledTableCell> */}
                                    </StyledTableRow>
                                  );
                                })}
                            </TableBody>
                          </Table>
                        </StyledTableCell>
                        <StyledTableCell
                        
                          align="center"
                          className={classes.boxBorder3}
                        >
                          {<ItemNameCard item_id={row.item_id} />}
                        </StyledTableCell>

                        <StyledTableCell align="right" className={classes.qty}>
                          {/* {row.delivered_qty}  */}
                          <Table
                            className={classes.table}
                            aria-label="customized table"
                          >
                            <TableBody>
                              {deliveryDetails?.enqShowroom[i] &&
                                deliveryDetails?.enqShowroom[i].map((det) => {
                                  return (
                                    <StyledTableRow
                                      style={{ borderBottom: "None" }}
                                    >
                                      <StyledTableCell
                                        style={{ borderBottom: "None" }}
                                        align="right"
                                      >
                                        {det.quantity} {row.uom_name}
                                      </StyledTableCell>

                                      {/* <StyledTableCell style={{borderBottom: "None"}}>
                                  {det.quantity}
                                </StyledTableCell> */}
                                    </StyledTableRow>
                                  );
                                })}
                            </TableBody>
                          </Table>
                        </StyledTableCell>
                        <StyledTableCell align="right" className={classes.rate}>
                          <Table
                            className={classes.table}
                            aria-label="customized table"
                          >
                            <TableBody>
                              {deliveryDetails?.enqShowroom[i] &&
                                deliveryDetails?.enqShowroom[i].map((det) => {
                                  return (
                                    <StyledTableRow
                                      style={{ borderBottom: "None" }}
                                    >
                                      <StyledTableCell
                                        style={{ borderBottom: "None" }}
                                        align="center"

                                      >
                                        {det.showroom_name}
                                      </StyledTableCell>

                                      {/* <StyledTableCell style={{borderBottom: "None"}}>
                                  {det.quantity}
                                </StyledTableCell> */}
                                    </StyledTableRow>
                                  );
                                })}
                            </TableBody>
                          </Table>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}

                {/* <StyledTableRow>
                  <StyledTableCell
                    colSpan={3}
                    align="right"
                    className={classes.large_width}
                  >
                   <b> {deliveryDetails?.delivery_order_item_details?.length &&
                      priceInWord(
                        Number(
                          deliveryDetails?.delivery_order_item_details
                            .reduce(
                              (sum, li) => Number(sum) + (Number(li.delivered_qty) * Number(li.rate)),
                              0
                            )
                            .toFixed(0)
                        )
                      )}</b>
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.amount}>
                   <b> {deliveryDetails?.delivery_order_item_details?.length &&
                      currencyFormate(
                        deliveryDetails?.delivery_order_item_details?.reduce(
                          (sum, li) => Number(sum) + (Number(li.delivered_qty) * Number(li.rate)),
                          0
                        )
                      )}</b>
                  </StyledTableCell>
                </StyledTableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Grid item xs={12} className={classes.footerDetails}>
          <Grid Container>
            <Grid item xs={6} className={classes.footer_two1}>
              <p className={classes.footer_sec_title}>
                Measurement Sheet / Remarks
              </p>
              <div className={classes.footer_two1}></div>
              <div className={classes.footer_two1}></div>
              <div className={classes.footer_two1}></div>
              <div className={classes.footer_two1}></div>
              <div className={classes.footer_two1}></div>
              <div className={classes.footer_two1}></div>
              <div className={classes.footer_two1}></div>
              <div className={classes.footer_two1}></div>
              <div className={classes.footer_two1}></div>
              <div className={classes.footer_two1}></div>
              <div className={classes.footer_two1}></div>
              <div className={classes.footer_two1}></div>
              <div className={classes.footer_two1}></div>
              <div className={classes.footer_two1}></div>

              
              <ol className={classes.footer_two1}></ol>
            </Grid>

            <Grid item xs={6} className={classes.footer_two1}>
              <p className={classes.footer_sec_title}></p>
              <Box mx={2} mt={1}></Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.footerDetails}>
          <Grid  container>

          <Grid item xs={6} className={classes.footer_three}>
              <p className={classes.footer_sec_title}>Declaration</p>
              All Disputes Subject to Kolkata Jurisdiction.
              <Box m={1}>
                <div className={classes.footer_desc}></div>
              </Box>
              
            </Grid>

            {/* <Grid item xs={6} className={classes.footer_four}>
              <Box>
                <div className={classes.footer_two1}>
                   
                </div>
          <div className={classes.footer_two1}>      </div>

          <div className={classes.footer_two1}>      </div>

          <div className={classes.footer_two1}>      </div>
          <div className={classes.footer_two1}>      </div>
          <div className={classes.footer_two1}>      </div>

          <div className={classes.footer_two1}>      </div>

          <div className={classes.footer_two1}>      </div>


                <div className={classes.title_label_41}>
                  Salesman Name: {deliveryDetails.DelSalesExecutive}
                </div>
              </Box>
            </Grid> */}
</Grid>
</Grid>
        

        <Grid item xs={12} className={classes.footerDetails}>
          <Grid container>
            {/* <Grid item xs={6} className={classes.footer_one}>
              <p className={classes.footer_sec_title}></p>
              <div className={classes.footer_one}>
               
              </div>
              <div className={classes.footer_one}>
             
              </div>
              <div className={classes.footer_one}>
             Received The under Mentioned Goods in Order & Good Condition.
              </div>
              <ol>
                
              </ol>
            </Grid>

            <Grid item xs={6} className={classes.footer_two}>
              <p className={classes.footer_sec_title}></p>
              <Box mx={2} mt={1}></Box>
            </Grid> */}

           
            <Grid item xs={6} className={classes.footer_four}>
        <Box>
        <p className={classes.footer_sec_title}>  Customer Signatory</p>
          <div className={classes.footer_two1}>      </div>
          <div className={classes.footer_two1}>      </div>
          <div className={classes.footer_two1}>      </div>

          <div className={classes.footer_two1}>      </div>

          <div className={classes.footer_two1}>      </div>
          <div className={classes.footer_two1}>      </div>

          <div className={classes.footer_two1}>      </div>

        <div className={classes.footer_two1}>
                  {/* Customer Signatory */}
                  Received The under Mentioned Goods in Order & Good Condition.        
                </div>
                </Box>
            </Grid>

            <Grid item xs={6} className={classes.footer_four}>
              <Box>
                <div className={classes.title_label_3}>
                  For Marudhar Marble & Granite
                </div>
                <div className={classes.footer_two1}>      </div>
                <div className={classes.footer_two1}>      </div>
                <div className={classes.footer_two1}>      </div>
                <div className={classes.footer_two1}>      </div>
          <div className={classes.footer_two1}>      </div>
          <div className={classes.footer_two1}>      </div>
          <div className={classes.footer_two1}>      </div>
          <div className={classes.footer_two1}>      </div>
          <div className={classes.footer_two1}>      </div>
          <div className={classes.footer_two1}>      </div>

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

export default DeliveryOrderInvoice;
