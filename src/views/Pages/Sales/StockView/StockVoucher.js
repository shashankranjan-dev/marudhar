import React, { useEffect, useState } from "react";
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
// import "./StockVoucher.css";
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
import { currencyFormate, dateFormate, priceInWord } from "../../HelperComponent/utils";
import { AutoScaleAxis } from "chartist";
import GridItem from "components/Grid/GridItem";

import { PurchaseListOfItem } from "../../../../services/stockVoucherService";
import { timestamp } from "services/Utils/utils";


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
    textAlign: "center",
    color: appSecondColor,
    fontWeight: 500,
    fontSize: "20pt",
    marginTop: "10px",
    marginBottom: "10px",

  },
  searched_date: {
    textAlign: "right",
    color: appSecondColor,
    fontWeight: 500,
    fontSize: ".8rem",
  },
  text_label1: {
    fontWeight: 500,
    fontSize: "20pt",
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
    fontSize: ".6rem",

  },
  title_label_21: {
    color: appSecondColor,
    fontWeight: 500,
    fontSize: ".6rem",
    marginTop: "-18px",
    textDecoration: "underline",

  },
  title_label_3: {
    textAlign: "right",
    color: appSecondColor,
    fontWeight: 500,
    fontSize: ".8rem",
  },

  inv: {
    textAlign: "center",
    color: appSecondColor,
    fontWeight: 500,
    fontSize: "25pt",
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
    // height: "45px",
    // borderBottom: "1px solid " + borderColor,
  },
  section_two: {
    // padding: "0 8px 8px 8px",
    // height: "180px",
  },

  boxBorder0: {
    padding: "18px",
  },

  tablContainer: {
    // marginBottom: "15px",
    borderLeft: "1px solid " + borderColor,
    borderRight: "1px solid " + borderColor,
    borderTop: "1px solid " + borderColor,
  },
  date: {
    width: "10%",
    borderRight: "1px solid " + borderColor
  },
  particular: {
    width: "15%",
    borderRight: "1px solid " + borderColor
  },
  voucher_type: {
    width: "10%",
    borderRight: "1px solid " + borderColor
  },
  qty: {
    width: "12%",
    border: "1px solid " + borderColor
  },
  table: {
    width: "100%",
  },
  stock_voucher_container: {
    width: "135%",
    // border:"solid",
    marginLeft: "-9rem",
  }
}));


const StockVoucher = ({ itemDetails, itemInfo, searchedInfo, rowInfo, openingStock }) => {
  const classes = useStyles();
  // const [itemDetails, setItemDetails] = useState([])
  const [globalState, dispatch] = useStateValue();
  const [refresh, setRefresh] = React.useState(false);


  let item_id = itemInfo[0]?.item_id;
  // console.log(itemInfo, "sen28/id")
  // let OpeningQty = openingStock[0]?.stock;
  
  // console.log(openingStock,"sen31",rowInfo)

  let OpeningQty = rowInfo.stoOpening;
  let opPurchase_Qty=openingStock[0]?.opPurchase_Qty;
  let opPurchase_Value=openingStock[0]?.opPurchase_Value

  // let opening_rate = openingStock[0]?.avg_cost > 0 ?
  // openingStock[0]?.rate_before_purchase === 0 ?
  //   Number(openingStock[0]?.avg_cost)
  //   :
  //   Number(openingStock[0]?.rate_before_purchase)
  // :
  // itemInfo[0]?.opening_rate ?
  //   itemInfo[0]?.opening_rate
  //   : 0

  // old
  let opening_rate = openingStock[0]?.avg_cost > 0 ? 
                        (openingStock[0]?.avg_cost )
                        : 
                        itemInfo[0]?.opening_rate ? 
                          itemInfo[0]?.opening_rate 
                          : 0




  // let opening_rate = itemInfo[0]?.opening_rate ? 
  // itemInfo[0]?.opening_rate 
  // : 0
  let closing_value = 0
  let total_purchase = opPurchase_Qty?opPurchase_Qty:0
  let total_valuation=opPurchase_Value?opPurchase_Value:0

  // console.log(openingStock[0]?.avg_cost, "sen2304id")
  // console.log(searchedInfo, "sen2304id")
  // console.log(rowInfo.stoOpening, "sen13/id2")
  //Table Data
  const headerData = [
    {
      id: "serial_no",
      label: "#",
      align: "left",
    },
    {
      id: "date",
      label: "Data",
      align: "left",
    },
    {
      id: "particular",
      label: "Particular",
      align: "left",
    },
    {
      id: "voucher_type",
      label: "Voucher Type",
      align: "left",
    },
    {
      id: "voucher_no",
      label: "Voucher No.",
      align: "right",
    },
  ];


  return (

    <div className={classes.stock_voucher_container}>
      <Box>
        <div className={classes.inv}>
          Stock Voucher
        </div>
        <div className={classes.title_label}>
          Marudhar Marble & Granite
        </div>
      </Box>
      <Grid conatainer justify="center">

        <Grid xs={12} className={classes.headerDetails}>
          <Grid container>
            {/* Item Name Section*/}
            <Grid xs={6} className={classes.section_one}>
              <Grid container className={classes.heightfull}>
                <GridItem xs="12">
                  <div className={classes.text_label}>
                    <b>Stock Item : {itemInfo[0]?.item}</b>
                  </div>
                </GridItem>
              </Grid>
            </Grid>
            {/* Searched Date Section */}
            <Grid xs={6} className={classes.section_one}>
              <Grid container className={classes.heightfull}>

                <GridItem xs="12">
                  <div className={classes.searched_date}>
                    {dateFormate(timestamp(searchedInfo.txt_from_date))} To {dateFormate(timestamp(searchedInfo.txt_to_date))}
                  </div>
                </GridItem>


              </Grid>
            </Grid>
          </Grid>

          {/* Item info*/}
          <Grid item xs={12} className={classes.section_two}>
            {/* <div className={classes.tablContainer}> */}
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left" className={classes.date}>
                      Date
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.particular}>
                      Particular
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.voucher_type}>
                      Voucher Type
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.voucher_type}>
                      S.O. No
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.voucher_type}>
                      Voucher No
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.voucher_type}>
                      Inwards
                      <TableRow>
                        <StyledTableCell align="center" className={classes.qty}>
                          Qty
                        </StyledTableCell>
                        <StyledTableCell align="center" className={classes.qty}>
                          Rate
                        </StyledTableCell>
                        <StyledTableCell align="center" className={classes.qty}>
                          Value
                        </StyledTableCell>
                      </TableRow>
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.voucher_type}>
                      Outwards
                      <TableRow>
                        <StyledTableCell align="center" className={classes.qty}>
                          Qty
                        </StyledTableCell>
                        <StyledTableCell align="center" className={classes.qty}>
                          Rate
                        </StyledTableCell>
                        <StyledTableCell align="center" className={classes.qty}>
                          Value
                        </StyledTableCell>
                      </TableRow>
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.voucher_type}>
                      Closing
                      <TableRow>
                        <StyledTableCell align="center" className={classes.qty}>
                          Qty
                        </StyledTableCell>
                        <StyledTableCell align="center" className={classes.qty}>
                          Rate
                        </StyledTableCell>
                        <StyledTableCell align="center" className={classes.qty}>
                          Value
                        </StyledTableCell>
                      </TableRow>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>

                {/* Opening Balance */}
                <TableBody>
                  <StyledTableRow  >
                    <StyledTableCell
                      align="left"
                      className={classes.date}
                    >
                      {dateFormate(timestamp(searchedInfo.txt_from_date))}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className={classes.particular}
                    >
                      <b>Opening Balance</b>
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.voucher_type}>
                      {/* {row.module} */}
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.voucher_type}>
                      {/* Voucher No. Space */}
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.voucher_type}>
                      {/* Voucher No. Space */}
                    </StyledTableCell>
                    {/* Inward */}
                    <StyledTableCell align="center" className={classes.voucher_type}>

                      <StyledTableCell align="center" className={classes.qty}>
                        {/* {row.module === "Purchase" ? row.received_item_details.receivedQty : 0} */}
                        {OpeningQty}
                      </StyledTableCell>
                      <StyledTableCell align="center" className={classes.qty}>
                        {/* {row.module === "Purchase" ? row.received_item_details.rate : 0} */}
                        {Number(opening_rate).toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell align="center" className={classes.qty}>
                        {(closing_value = Number(opening_rate) * Number(rowInfo?.stoOpening)).toFixed(2)}
                        {/* {(total_valuation=total_valuation+(Number(opening_rate) * Number(rowInfo?.stoOpening))) } */}
                        {/* {row.module === "Purchase" ? row.received_item_details.net_value : 0} */}
                      </StyledTableCell>
                    </StyledTableCell>
                    {/* Outward */}
                    <StyledTableCell align="right" className={classes.voucher_type}>

                      <StyledTableCell align="center" className={classes.qty}>
                        {/* {row.module === "Sales" ? row.invoice_item_details[0]?.now_dispatch_qty : 0} */}
                      </StyledTableCell>
                      <StyledTableCell align="center" className={classes.qty}>
                        {/* {row.module === "Sales" ? row.invoice_item_details[0]?.rate : 0} */}
                      </StyledTableCell>
                      <StyledTableCell align="center" className={classes.qty}>
                        {/* {row.module === "Sales" ? row.invoice_item_details[0]?.net_value : 0} */}
                      </StyledTableCell>

                    </StyledTableCell>

                    <StyledTableCell align="center" className={classes.voucher_type}>
                      {/* Closing */}
                      <StyledTableCell align="center" className={classes.qty}>
                        {/* {row.module === "Purchase" ? row.received_item_details.receivedQty : 0} */}
                        {/* {openingStock[0]?.stock}
                         */}
                        {OpeningQty}
                      </StyledTableCell>
                      <StyledTableCell align="center" className={classes.qty}>
                        {/* {row.module === "Purchase" ? row.received_item_details.rate : 0} */}
                        {Number(opening_rate).toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell align="center" className={classes.qty}>
                        {(Number(opening_rate) * Number(rowInfo?.stoOpening)).toFixed(2)}
                        {/* {row.module === "Purchase" ? row.received_item_details.net_value : 0} */}
                      </StyledTableCell>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>

                {/* {total_purchase=total_purchase+OpeningQty} */}
               
                {/* main section */}
                {/* {console.log(itemDetails, "sen28")} */}
                <TableBody>
                  {itemDetails.length > 0 ?
                    itemDetails.map((row, i) => {

                      if (row.module === "Purchase") {
                        // console.log("Help",row.quantity)
                        total_purchase += row.quantity
                        closing_value += row.quantity * row.rate
                        total_valuation += row.quantity * row.rate
                      }
                      else {
                        total_purchase += 0
                        closing_value += 0
                      }

                      // if (row.id != null) {
                      return (
                        <StyledTableRow  >

                          {row.id === null ? null
                            :
                            <StyledTableCell
                              align="left"
                              className={classes.date}
                            >
                              {/* {row.invoice_date ? dateFormate(timestamp(row.invoice_date)) : dateFormate(timestamp(row.inserted_by_date))} */}
                              {row.module === "Sales" || row.module === "Sales Return" ?
                                dateFormate(row.voucher_date[0])
                                :
                                dateFormate(row.voucher_date[0] ? row.voucher_date[0] : row.voucher_date)
                                //  row.approved_by_date ? dateFormate(row.approved_by_date[0]) :
                                //  dateFormate(timestamp(row.inserted_by_date[0]))

                              }
                            </StyledTableCell>
                          }
                          {row.id === null ? null
                            :
                            <StyledTableCell
                              align="center"
                              className={classes.particular}
                            >
                              {
                                row.module === "Stock Recieved" || row.module === "Stock Transfer" ?
                                  row.from_showroom_warehouse ? row.from_showroom_warehouse : row.to_showroom_warehouse

                                  : row.company_name
                              }
                            </StyledTableCell>

                          }
                          {row.id === null ? null
                            :
                            <StyledTableCell align="center" className={classes.voucher_type}>
                              {row.module}
                            </StyledTableCell>
                          }
                          {row.id === null ? null
                            :
                            <StyledTableCell align="center" className={classes.voucher_type}>
                              {/* Voucher No. Space */}

                              {row.sales_order_no ? row.sales_order_no : "--"}
                            </StyledTableCell>
                          }
                          {row.id === null ? null
                            :
                            <StyledTableCell align="center" className={classes.voucher_type}>
                              {/* Voucher No. Space */}
                              {row.transaction_id ? row.transaction_id : row.stock_transfer_no}
                            </StyledTableCell>
                          }
                          {/* Inward */}
                          <StyledTableCell align="center" className={classes.voucher_type}>
                            {row.id === null ? null
                              :
                              <StyledTableCell align="center" className={classes.qty}>

                                {row.module === "Purchase" || row.module === "Sales Return" || row.module === "Stock Recieved"  || row.module === "ConvertedWaste" ?

                                  row.quantity

                                  : 0}

                              </StyledTableCell>
                            }
                            {row.id === null ? null
                              :
                              <StyledTableCell align="center" className={classes.qty}>
                                {row.module === "Purchase" || row.module === "Sales Return" ?
                                  row.disc_value ?
                                    (Number(row.rate) - Number(row.disc_value)).toFixed(2) : (Number(row.rate)).toFixed(2)

                                  : 0}

                              </StyledTableCell>
                            }
                            {row.id === null ? null
                              :
                              <StyledTableCell align="center" className={classes.qty}>
                                {row.module === "Purchase" || row.module === "Sales Return" ?
                                  row.disc_value ?
                                    (Number(row.quantity) * (Number(row.rate) - Number(row.disc_value))).toFixed(2)
                                    : (Number(row.quantity) * (Number(row.rate))).toFixed(2) : 0}
                              </StyledTableCell>
                            }
                          </StyledTableCell>

                          {/* {////////////////////Outward/////////////////////////////////} */}

                          <StyledTableCell align="right" className={classes.voucher_type}>

                            {row.id === null ? null
                              :
                              <StyledTableCell align="center" className={classes.qty}>
                                {row.module === "Sales" || row.module === "Purchase Return" || row.module === "Stock Transfer" || row.module === "waste" ?
                                  // row.invoice_item_details[0].now_dispatch_qty
                                  row.quantity
                                  :
                                  // row.module === "Purchase Return" ?
                                  //   row.quantity
                                  //   :
                                  0
                                }
                              </StyledTableCell>
                            }
                            {row.id === null ? null
                              :
                              <StyledTableCell align="center" className={classes.qty}>
                                {row.module === "Sales" || row.module === "Purchase Return" ?

                                  // row.invoice_item_details[0].rate 
                                  row.disc_value ?
                                    (Number(row.rate) - Number(row.disc_value)).toFixed(2) : (Number(row.rate)).toFixed(2)
                                  :
                                  // row.module === "Purchase Return" ?
                                  //   Number(row.rate).toFixed(2)
                                  //   :
                                  0}
                              </StyledTableCell>
                            }
                            {row.id === null ? null
                              :
                              <StyledTableCell align="center" className={classes.qty}>
                                {row.module === "Sales" || row.module === "Purchase Return" ?
                                  // Number(row.invoice_item_details[0].now_dispatch_qty) * Number(row.invoice_item_details[0].rate)
                                  row.disc_value ?
                                    (Number(row.quantity) * (Number(row.rate) - Number(row.disc_value))).toFixed(2)
                                    : (Number(row.quantity) * (Number(row.rate))).toFixed(2)
                                  :
                                  // row.module === "Purchase Return" ?
                                  //   (Number(row.quantity) * Number(row.rate)).toFixed(2)
                                  //   :
                                  0

                                }
                              </StyledTableCell>
                            }
                          </StyledTableCell>

                          <StyledTableCell align="center" className={classes.voucher_type}>
                            {/* Closing */}

                            {row.id === null ? null
                              :
                              <StyledTableCell align="center" className={classes.qty}>
                                {
                                  row.module === "Sales" || row.module === "Purchase Return" || row.module === "Stock Transfer"  || row.module === "waste" ?
                                    (OpeningQty = Number(OpeningQty)
                                      - Number(row.quantity)).toFixed(2)
                                    :
                                    OpeningQty = Number(row.quantity) + Number(OpeningQty)

                                }
                              </StyledTableCell>
                            }
                         

                            {row.id === null ? null
                              :
                              <StyledTableCell align="center" className={classes.qty}>
                                {row.module === "Sales" || row.module === "Purchase Return" ?
                                  // Number(row.invoice_item_details[0]?.rate).toFixed(2)
                                  opening_rate = Number(opening_rate).toFixed(2)
                                  :
                                  row.module === "Purchase" ?
                                    (opening_rate =
                                      (total_valuation / Number(total_purchase))).toFixed(2)
                                    :
                                    opening_rate =
                                    Number(opening_rate).toFixed(2)
                                }

                              </StyledTableCell>
                            }
                            {/* {console.log(total_valuation, total_purchase, "HKHKHK11")} */}
                            {row.id === null ? null
                              :
                              <StyledTableCell align="center" className={classes.qty}>
                                {
                                  row.module === "Sales" ?
                                    // (Number(OpeningQty) * Number(row.invoice_item_details[0]?.rate)).toFixed(2)
                                    (Number(opening_rate) * Number(OpeningQty)).toFixed(2)
                                    :
                                    (Number(opening_rate) * Number(OpeningQty)).toFixed(2)

                                }

                              </StyledTableCell>
                            }
                          </StyledTableCell>
                        </StyledTableRow>

                      );
                      // i + 1

                      // }
                      // else {
                      //   return 'No Transaction'
                      // }
                    })
                    :
                    <h5
                      align="center"
                      style={
                        {
                          fontWeight: "bold",
                          paddingLeft: "5rem",
                        }
                      }> No Transaction</h5>

                  }
                </TableBody>

              </Table>
            </TableContainer>
            {/* </div> */}
          </Grid>

        </Grid>

      </Grid>

    </div>
  );
};


export default StockVoucher;




////////////////OLD Code////////////////////////////////////
// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   makeStyles,
//   Grid,
//   Box,
//   Divider,
//   withStyles,
// } from "@material-ui/core";
// import PageTitle from "../../HelperComponent/PageTitle";
// import { getInvoiceBySalesId } from "../../../../services/invoiceLIstService";
// import { getItemDetailById } from "../../../../services/saleService/addEnqueryService";

// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// // import "./StockVoucher.css";
// import {
//   appFontWeightThin,
//   appDefaultColor,
//   appSecondColor,
//   borderColor,
//   appDefaultFamily,
//   appFontWeight,
//   tblBodyHoverColor,
// } from "assets/jss/material-dashboard-pro-react";

// import MrudharName from "../../../../assets/applogo/marudhar-name.png";
// import MrudharLogo from "../../../../assets/applogo/marudhar-logo.png";
// import { useHistory, useLocation } from "react-router-dom";
// import { useStateValue } from "../../../../context/context";
// import { actionTypes } from "../../../../context/reducer";
// import { currencyFormate, dateFormate, priceInWord } from "../../HelperComponent/utils";
// import { AutoScaleAxis } from "chartist";
// import GridItem from "components/Grid/GridItem";

// import { PurchaseListOfItem } from "../../../../services/stockVoucherService";
// import { timestamp } from "services/Utils/utils";


// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: "#eee",
//     color: appSecondColor,
//     padding: "0px 5px",
//     fontWeight: appFontWeight,
//     fontFamily: appDefaultFamily,
//     fontSize: "14px",
//   },
//   body: {
//     color: appSecondColor,
//     padding: "5px 5px",
//     fontWeight: appFontWeightThin,
//     fontFamily: appDefaultFamily,

//     fontSize: "12.6px",
//     borderBottom: "1px solid rgba(224, 224, 224, 1)",
//   },
// }))(TableCell);
// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     "&:nth-of-type(odd)": {},
//     "&:hover": {
//       backgroundColor: tblBodyHoverColor,
//     },
//   },
// }))(TableRow);
// const useStyles = makeStyles((theme) => ({
//   invoicePaper: {
//     width: "100%",
//     height: "800px",
//     borderRadius: "0",
//     marginTop: 15,
//     padding: "5px 15px",
//   },
//   title_label: {
//     textAlign: "center",
//     color: appSecondColor,
//     fontWeight: 500,
//     fontSize: "20pt",
//     marginTop: "10px",
//     marginBottom: "10px",

//   },
//   searched_date: {
//     textAlign: "right",
//     color: appSecondColor,
//     fontWeight: 500,
//     fontSize: ".8rem",
//   },
//   text_label1: {
//     fontWeight: 500,
//     fontSize: "20pt",
//     width: "100%",
//     marginTop: "-10px"
//   },
//   title_label1: {

//     fontWeight: 500,
//     fontSize: "0.8rem",
//     width: "100%",

//   },
//   title_label_2: {
//     color: appSecondColor,
//     fontWeight: 500,
//     fontSize: ".6rem",

//   },
//   title_label_21: {
//     color: appSecondColor,
//     fontWeight: 500,
//     fontSize: ".6rem",
//     marginTop: "-18px",
//     textDecoration: "underline",

//   },
//   title_label_3: {
//     textAlign: "right",
//     color: appSecondColor,
//     fontWeight: 500,
//     fontSize: ".8rem",
//   },

//   inv: {
//     textAlign: "center",
//     color: appSecondColor,
//     fontWeight: 500,
//     fontSize: "25pt",
//   },
//   text: {
//     color: appSecondColor,
//     fontWeight: 400,
//     fontSize: ".9rem",
//     lineHeight: "1.6",
//   },
//   heightfull: {
//     height: "100%",
//   },
//   headerDetails: {
//     marginBottom: 20,
//     height: "auto",
//     width: "100%",
//     border: "1px solid " + borderColor,
//   },
//   section_one: {
//     padding: "8px",
//     // height: "45px",
//     // borderBottom: "1px solid " + borderColor,
//   },
//   section_two: {
//     // padding: "0 8px 8px 8px",
//     // height: "180px",
//   },

//   boxBorder0: {
//     padding: "18px",
//   },

//   tablContainer: {
//     // marginBottom: "15px",
//     borderLeft: "1px solid " + borderColor,
//     borderRight: "1px solid " + borderColor,
//     borderTop: "1px solid " + borderColor,
//   },
//   date: {
//     width: "10%",
//     borderRight: "1px solid " + borderColor
//   },
//   particular: {
//     width: "15%",
//     borderRight: "1px solid " + borderColor
//   },
//   voucher_type: {
//     width: "10%",
//     borderRight: "1px solid " + borderColor
//   },
//   qty: {
//     width: "12%",
//     border: "1px solid " + borderColor
//   },
//   table: {
//     width: "100%",
//   },
//   stock_voucher_container: {
//     width: "135%",
//     // border:"solid",
//     marginLeft: "-9rem",
//   }
// }));


// const StockVoucher = ({ itemDetails, itemInfo, searchedInfo, rowInfo, openingStock }) => {
//   const classes = useStyles();
//   // const [itemDetails, setItemDetails] = useState([])
//   const [globalState, dispatch] = useStateValue();
//   const [refresh, setRefresh] = React.useState(false);


//   let item_id = itemInfo[0]?.item_id;
//   // console.log(itemInfo, "sen28/id")
//   // let OpeningQty = openingStock[0]?.stock;
//   let OpeningQty = rowInfo.stoOpening;
//   let opening_rate = itemInfo[0]?.opening_rate?itemInfo[0]?.opening_rate:0
//   let closing_value = 0
//   let total_purchase = 0

//   console.log(itemInfo, "sen2304id")
//   // console.log(searchedInfo, "sen2304id")
//   console.log(rowInfo.stoOpening, "sen13/id2")
//   //Table Data
//   const headerData = [
//     {
//       id: "serial_no",
//       label: "#",
//       align: "left",
//     },
//     {
//       id: "date",
//       label: "Data",
//       align: "left",
//     },
//     {
//       id: "particular",
//       label: "Particular",
//       align: "left",
//     },
//     {
//       id: "voucher_type",
//       label: "Voucher Type",
//       align: "left",
//     },
//     {
//       id: "voucher_no",
//       label: "Voucher No.",
//       align: "right",
//     },
//   ];


//   return (

//     <div className={classes.stock_voucher_container}>
//       <Box>
//         <div className={classes.inv}>
//           Stock Voucher
//         </div>
//         <div className={classes.title_label}>
//           Marudhar Marble & Granite
//         </div>
//       </Box>
//       <Grid conatainer justify="center">

//         <Grid xs={12} className={classes.headerDetails}>
//           <Grid container>
//             {/* Item Name Section*/}
//             <Grid xs={6} className={classes.section_one}>
//               <Grid container className={classes.heightfull}>
//                 <GridItem xs="12">
//                   <div className={classes.text_label}>
//                     <b>Stock Item : {itemInfo[0]?.item}</b>
//                   </div>
//                 </GridItem>
//               </Grid>
//             </Grid>
//             {/* Searched Date Section */}
//             <Grid xs={6} className={classes.section_one}>
//               <Grid container className={classes.heightfull}>

//                 <GridItem xs="12">
//                   <div className={classes.searched_date}>
//                     {dateFormate(timestamp(searchedInfo.txt_from_date))} To {dateFormate(timestamp(searchedInfo.txt_to_date))}
//                   </div>
//                 </GridItem>


//               </Grid>
//             </Grid>
//           </Grid>

//           {/* Item info*/}
//           <Grid item xs={12} className={classes.section_two}>
//             {/* <div className={classes.tablContainer}> */}
//             <TableContainer>
//               <Table className={classes.table} aria-label="customized table">
//                 <TableHead>
//                   <TableRow>
//                     <StyledTableCell align="left" className={classes.date}>
//                       Date
//                     </StyledTableCell>
//                     <StyledTableCell align="center" className={classes.particular}>
//                       Particular
//                     </StyledTableCell>
//                     <StyledTableCell align="center" className={classes.voucher_type}>
//                       Voucher Type
//                     </StyledTableCell>
//                     <StyledTableCell align="center" className={classes.voucher_type}>
//                       S.O. No
//                     </StyledTableCell>
//                     <StyledTableCell align="center" className={classes.voucher_type}>
//                       Voucher No
//                     </StyledTableCell>
//                     <StyledTableCell align="center" className={classes.voucher_type}>
//                       Inwards
//                       <TableRow>
//                         <StyledTableCell align="center" className={classes.qty}>
//                           Qty
//                         </StyledTableCell>
//                         <StyledTableCell align="center" className={classes.qty}>
//                           Rate
//                         </StyledTableCell>
//                         <StyledTableCell align="center" className={classes.qty}>
//                           Value
//                         </StyledTableCell>
//                       </TableRow>
//                     </StyledTableCell>
//                     <StyledTableCell align="center" className={classes.voucher_type}>
//                       Outwards
//                       <TableRow>
//                         <StyledTableCell align="center" className={classes.qty}>
//                           Qty
//                         </StyledTableCell>
//                         <StyledTableCell align="center" className={classes.qty}>
//                           Rate
//                         </StyledTableCell>
//                         <StyledTableCell align="center" className={classes.qty}>
//                           Value
//                         </StyledTableCell>
//                       </TableRow>
//                     </StyledTableCell>
//                     <StyledTableCell align="center" className={classes.voucher_type}>
//                       Closing
//                       <TableRow>
//                         <StyledTableCell align="center" className={classes.qty}>
//                           Qty
//                         </StyledTableCell>
//                         <StyledTableCell align="center" className={classes.qty}>
//                           Rate
//                         </StyledTableCell>
//                         <StyledTableCell align="center" className={classes.qty}>
//                           Value
//                         </StyledTableCell>
//                       </TableRow>
//                     </StyledTableCell>
//                   </TableRow>
//                 </TableHead>

//                 {/* Opening Balance */}
//                 <TableBody>
//                   <StyledTableRow  >
//                     <StyledTableCell
//                       align="left"
//                       className={classes.date}
//                     >
//                       {dateFormate(timestamp(searchedInfo.txt_from_date))}
//                     </StyledTableCell>
//                     <StyledTableCell
//                       align="center"
//                       className={classes.particular}
//                     >
//                       <b>Opening Balance</b>
//                     </StyledTableCell>
//                     <StyledTableCell align="center" className={classes.voucher_type}>
//                       {/* {row.module} */}
//                     </StyledTableCell>
//                     <StyledTableCell align="center" className={classes.voucher_type}>
//                       {/* Voucher No. Space */}
//                     </StyledTableCell>
//                     <StyledTableCell align="center" className={classes.voucher_type}>
//                       {/* Voucher No. Space */}
//                     </StyledTableCell>
//                     {/* Inward */}
//                     <StyledTableCell align="center" className={classes.voucher_type}>

//                       <StyledTableCell align="center" className={classes.qty}>
//                         {/* {row.module === "Purchase" ? row.received_item_details.receivedQty : 0} */}
//                         {total_purchase = OpeningQty}
//                       </StyledTableCell>
//                       <StyledTableCell align="center" className={classes.qty}>
//                         {/* {row.module === "Purchase" ? row.received_item_details.rate : 0} */}
//                         {Number(opening_rate).toFixed(2)}
//                       </StyledTableCell>
//                       <StyledTableCell align="center" className={classes.qty}>
//                         {(closing_value = Number(opening_rate) * Number(rowInfo?.stoOpening)).toFixed(2)}
//                         {/* {row.module === "Purchase" ? row.received_item_details.net_value : 0} */}
//                       </StyledTableCell>
//                     </StyledTableCell>
//                     {/* Outward */}
//                     <StyledTableCell align="right" className={classes.voucher_type}>

//                       <StyledTableCell align="center" className={classes.qty}>
//                         {/* {row.module === "Sales" ? row.invoice_item_details[0]?.now_dispatch_qty : 0} */}
//                       </StyledTableCell>
//                       <StyledTableCell align="center" className={classes.qty}>
//                         {/* {row.module === "Sales" ? row.invoice_item_details[0]?.rate : 0} */}
//                       </StyledTableCell>
//                       <StyledTableCell align="center" className={classes.qty}>
//                         {/* {row.module === "Sales" ? row.invoice_item_details[0]?.net_value : 0} */}
//                       </StyledTableCell>

//                     </StyledTableCell>

//                     <StyledTableCell align="center" className={classes.voucher_type}>
//                       {/* Closing */}
//                       <StyledTableCell align="center" className={classes.qty}>
//                         {/* {row.module === "Purchase" ? row.received_item_details.receivedQty : 0} */}
//                         {/* {openingStock[0]?.stock}
//                          */}
//                         {OpeningQty}
//                       </StyledTableCell>
//                       <StyledTableCell align="center" className={classes.qty}>
//                         {/* {row.module === "Purchase" ? row.received_item_details.rate : 0} */}
//                         {Number(opening_rate).toFixed(2)}
//                       </StyledTableCell>
//                       <StyledTableCell align="center" className={classes.qty}>
//                         {(Number(opening_rate) * Number(rowInfo?.stoOpening)).toFixed(2)}
//                         {/* {row.module === "Purchase" ? row.received_item_details.net_value : 0} */}
//                       </StyledTableCell>
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 </TableBody>

//                 {/* main section */}

//                 {console.log(itemDetails, "sen28")}
//                 <TableBody>
//                   {itemDetails.length > 0 ?
//                     itemDetails.map((row, i) => {

//                       if (row.module === "Purchase") {
//                         total_purchase += row.quantity
//                         closing_value += row.quantity * row.rate
//                       }
//                       else {
//                         total_purchase += 0
//                         closing_value += 0
//                       }

//                       if (row.id != null) {
//                         return (
//                           <StyledTableRow  >

//                             {row.id === null ? null
//                               :
//                               <StyledTableCell
//                                 align="left"
//                                 className={classes.date}
//                               >
//                                 {/* {row.invoice_date ? dateFormate(timestamp(row.invoice_date)) : dateFormate(timestamp(row.inserted_by_date))} */}
//                                 {row.module === "Sales" || row.module === "Sales Return" ?
//                                   dateFormate(row.voucher_date[0])
//                                   :
//                                   dateFormate(row.voucher_date[0] ? row.voucher_date[0] : row.voucher_date)
//                                   //  row.approved_by_date ? dateFormate(row.approved_by_date[0]) :
//                                   //  dateFormate(timestamp(row.inserted_by_date[0]))

//                                 }
//                               </StyledTableCell>
//                             }
//                             {row.id === null ? null
//                               :
//                               <StyledTableCell
//                                 align="center"
//                                 className={classes.particular}
//                               >
//                                 {
//                                   row.module === "Stock Recieved" || row.module === "Stock Transfer" ?
//                                     row.from_showroom_warehouse ? row.from_showroom_warehouse : row.to_showroom_warehouse

//                                     : row.company_name
//                                 }
//                               </StyledTableCell>

//                             }
//                             {row.id === null ? null
//                               :
//                               <StyledTableCell align="center" className={classes.voucher_type}>
//                                 {row.module}
//                               </StyledTableCell>
//                             }
//                             {row.id === null ? null
//                               :
//                               <StyledTableCell align="center" className={classes.voucher_type}>
//                                 {/* Voucher No. Space */}

//                                 {row.sales_order_no ? row.sales_order_no : "--"}
//                               </StyledTableCell>
//                             }
//                             {row.id === null ? null
//                               :
//                               <StyledTableCell align="center" className={classes.voucher_type}>
//                                 {/* Voucher No. Space */}
//                                 {row.transaction_id ? row.transaction_id : row.stock_transfer_no}
//                               </StyledTableCell>
//                             }
//                             {/* Inward */}
//                             <StyledTableCell align="center" className={classes.voucher_type}>
//                               {row.id === null ? null
//                                 :
//                                 <StyledTableCell align="center" className={classes.qty}>

//                                   {row.module === "Purchase" || row.module === "Sales Return" || row.module === "Stock Recieved" ?

//                                     row.quantity

//                                     : 0}

//                                 </StyledTableCell>
//                               }
//                               {row.id === null ? null
//                                 :
//                                 <StyledTableCell align="center" className={classes.qty}>
//                                   {row.module === "Purchase" || row.module === "Sales Return" ?
//                                     row.disc_value ?
//                                       (Number(row.rate) - Number(row.disc_value)).toFixed(2) : (Number(row.rate)).toFixed(2)

//                                     : 0}

//                                 </StyledTableCell>
//                               }
//                               {row.id === null ? null
//                                 :
//                                 <StyledTableCell align="center" className={classes.qty}>
//                                   {row.module === "Purchase" || row.module === "Sales Return" ?
//                                     row.disc_value ?
//                                       (Number(row.quantity) * (Number(row.rate) - Number(row.disc_value))).toFixed(2)
//                                       : (Number(row.quantity) * (Number(row.rate))).toFixed(2) : 0}
//                                 </StyledTableCell>
//                               }
//                             </StyledTableCell>

//                             {/* {////////////////////Outward/////////////////////////////////} */}

//                             <StyledTableCell align="right" className={classes.voucher_type}>

//                               {row.id === null ? null
//                                 :
//                                 <StyledTableCell align="center" className={classes.qty}>
//                                   {row.module === "Sales" || row.module === "Purchase Return" || row.module === "Stock Transfer" ?
//                                     // row.invoice_item_details[0].now_dispatch_qty
//                                     row.quantity
//                                     :
//                                     // row.module === "Purchase Return" ?
//                                     //   row.quantity
//                                     //   :
//                                     0
//                                   }
//                                 </StyledTableCell>
//                               }
//                               {row.id === null ? null
//                                 :
//                                 <StyledTableCell align="center" className={classes.qty}>
//                                   {row.module === "Sales" || row.module === "Purchase Return" ?

//                                     // row.invoice_item_details[0].rate 
//                                     row.disc_value ?
//                                       (Number(row.rate) - Number(row.disc_value)).toFixed(2) : (Number(row.rate)).toFixed(2)
//                                     :
//                                     // row.module === "Purchase Return" ?
//                                     //   Number(row.rate).toFixed(2)
//                                     //   :
//                                     0}
//                                 </StyledTableCell>
//                               }
//                               {row.id === null ? null
//                                 :
//                                 <StyledTableCell align="center" className={classes.qty}>
//                                   {row.module === "Sales" || row.module === "Purchase Return" ?
//                                     // Number(row.invoice_item_details[0].now_dispatch_qty) * Number(row.invoice_item_details[0].rate)
//                                     row.disc_value ?
//                                       (Number(row.quantity) * (Number(row.rate) - Number(row.disc_value))).toFixed(2)
//                                       : (Number(row.quantity) * (Number(row.rate))).toFixed(2)
//                                     :
//                                     // row.module === "Purchase Return" ?
//                                     //   (Number(row.quantity) * Number(row.rate)).toFixed(2)
//                                     //   :
//                                     0

//                                   }
//                                 </StyledTableCell>
//                               }
//                             </StyledTableCell>

//                             <StyledTableCell align="center" className={classes.voucher_type}>
//                               {/* Closing */}
//                               {row.id === null ? null
//                                 :
//                                 <StyledTableCell align="center" className={classes.qty}>
//                                   {
//                                     row.module === "Sales" || row.module === "Purchase Return" || row.module === "Stock Transfer" ?
//                                       (OpeningQty = Number(OpeningQty)
//                                         - Number(row.quantity)).toFixed(2)
//                                       :
//                                       OpeningQty = Number(row.quantity) + Number(OpeningQty)

//                                   }
//                                 </StyledTableCell>
//                               }
//                               {console.log(Number(row.quantity), Number(OpeningQty), closing_value, total_purchase, "sen19072022")}

//                               {row.id === null ? null
//                                 :
//                                 <StyledTableCell align="center" className={classes.qty}>
//                                   {row.module === "Sales" || row.module === "Purchase Return" ?
//                                     // Number(row.invoice_item_details[0]?.rate).toFixed(2)
//                                     opening_rate = Number(opening_rate).toFixed(2)
//                                     :
//                                     row.module === "Purchase" ?
//                                       (opening_rate =
//                                         (closing_value / total_purchase)).toFixed(2)
//                                       :
//                                       opening_rate =
//                                       Number(opening_rate).toFixed(2)
//                                   }

//                                 </StyledTableCell>
//                               }
//                               {row.id === null ? null
//                                 :
//                                 <StyledTableCell align="center" className={classes.qty}>
//                                   {
//                                     row.module === "Sales" ?
//                                       // (Number(OpeningQty) * Number(row.invoice_item_details[0]?.rate)).toFixed(2)
//                                       (Number(opening_rate) * Number(OpeningQty)).toFixed(2)
//                                       :
//                                       (Number(opening_rate) * Number(OpeningQty)).toFixed(2)

//                                   }

//                                 </StyledTableCell>
//                               }
//                             </StyledTableCell>
//                           </StyledTableRow>

//                         );
//                         // i + 1

//                       }
//                       else {
//                         return 'No Transaction'
//                       }
//                     })
//                     :
//                     <h5
//                       align="center"
//                       style={
//                         {
//                           fontWeight: "bold",
//                           paddingLeft: "5rem",
//                         }
//                       }> No Transaction</h5>

//                   }
//                 </TableBody>

//               </Table>
//             </TableContainer>
//             {/* </div> */}
//           </Grid>

//         </Grid>

//       </Grid>

//     </div>
//   );
// };


// export default StockVoucher;
