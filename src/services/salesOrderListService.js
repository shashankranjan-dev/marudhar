import webApi from "./webApi/webApi";
import { dateFormate, timestamp } from "../views/Pages/HelperComponent/utils";



export const getAllSalesOrderonLoad = async (onSuccess, onFailure, New) => {


  let customMenu;
  if (New) {
    customMenu = [
      {
        label: "View",
        link: "/admin/sales/selected-sales-order-view",
      },
      {
        label: "Edit",
        itemEdit: true,
        link: "/admin/sales/add-new-sales-order",
      },
      {
        label: "Update To Do",
        link: "/admin/sales/selected-sales-order-view",
        updateTask: true,
      },
      {
        label: "Update Status",
        link: "/admin/sales/selected-sales-order-view",
        updateStatus: true,
      },
      {
        label: "Create Delivery Order",
        link: "/admin/sales/create-delivery-order",
      },
    ];
  } else {
    customMenu = [
      {
        label: "View",
        link: "/admin/sales/selected-sales-order-view",
      },
      {
        label: "Edit",
        itemEdit: true,
        link: "/admin/sales/add-new-sales-order",
      },
      {
        label: "Update To Do",
        link: "/admin/sales/selected-sales-order-view",
        updateTask: true,
      },
      {
        label: "Update Status",
        link: "/admin/sales/selected-sales-order-view",
        updateStatus: true,
      },
      {
        label: "Create Delivery Order",
        link: "/admin/sales/create-delivery-order",
      },
    ];
  }


  try {
  
    const res = await webApi.post("/master/sales/list", {
      // query: searchQuery?.txt_keyword_pharse,
      // sales_order_no:searchQuery?.txt_sales_order_no,
      // sales_customer:searchQuery?.ddl_customer?.value,
      // enquiry_status:searchQuery?.ddl_status?.value,
      // sales_order_from_date:timestamp(searchQuery?.txt_sales_order_date_from),
      // sales_order_to_date:timestamp(searchQuery?.txt_sales_order_date_to),
      // sales_key_phrase:searchQuery?.txt_keyword_pharse,
      sales_status : 24,
    });
    if (res.status === 200) {
      const r = res.data;
      let j=0;
      let allItems = [];
      r.map((r, i) => {
        if (r.sales_order_item_details.length) {
          if(r.sales_order_no[0]==""){}
          else{
            j=j+1;
          } 
          allItems.push({
            slID: j,
            sales_serial: i + 1,
            sales_id: r.sales_id,
            sales_order_date: dateFormate(r.sales_order_date),
            sales_order_no: r.sales_order_no[0],
            sales_order_note: r.sales_order_note,
            purchase_order_no: r.purchase_order_no,
            purchase_order_date: dateFormate(r.purchase_order_date),
            sales_quotation_no: r.quotation_no[0],
            sales_enquiry_no: r.enquiry_no[0],
            sales_customer: r.customer_name,
            enquiry_status: r.sales_status,
            sales_action: "view-action",
            menu: customMenu,
          });
        }
      });
      if (allItems.length) {
        return onSuccess(allItems);
        } else {
          return onFailure("Sales Order Not Found");
        }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};
export const  getAllSalesOrder = async (onSuccess, onFailure, searchQuery,sales_id) => {


  let customMenu;
  if (searchQuery.ddl_status?.label==="New") {
    customMenu = [
      {
        label: "View",
        // link: "/admin/sales/selected-sales-order-view",
        clickBtn: true,
      },
     
      {
        label: "Edit",
        itemEdit: true,
        link: "/admin/sale/sale-edit",
      },
      {
        label: "Update To Do",
        link: "/admin/sales/selected-sales-order-view",
        updateTask: true,
      },
      {
        label: "Update Status",
        link: "/admin/sales/selected-sales-order-view",
        updateStatus: true,
      },
      {
        label: "Print ",
        clickBtn: true,
        modelName: "printInvoice",
      },
      {
        label: "Create Delivery Order",
        link: "/admin/sales/create-delivery-order",
      },
    ];
  } 
  else if (searchQuery.ddl_status?.label==="D.O. Gen. partly"){
    customMenu = [
      {
        label: "View",
        // link: "/admin/sales/selected-sales-order-view",
        clickBtn: true,
      
      },
      {
        label: "Print ",
        clickBtn: true,
        modelName: "printInvoice",
      },
      {
        label: "Edit",
        itemEdit: true,
        link: "/admin/sales/add-new-sales-order",
      },
      {
        label: "Update To Do",
        link: "/admin/sales/selected-sales-order-view",
        updateTask: true,
      },
      {
        label: "Update Status",
        link: "/admin/sales/selected-sales-order-view",
        updateStatus: true,
      },
      {
        label: "Create Delivery Order",
        link: "/admin/sales/create-delivery-order",
      },
    ];
  }
  else {
    customMenu = [
      {
        label: "View",
        // link: "/admin/sales/selected-sales-order-view",
        clickBtn: true,

      },
      {
        label: "Print ",
        clickBtn: true,
        modelName: "printInvoice",
      },
      // {
      //   label: "Edit",
      //   itemEdit: true,
      //   link: "/admin/sales/add-new-sales-order",
      // },
      // {
      //   label: "Update To Do",
      //   link: "/admin/sales/selected-sales-order-view",
      //   updateTask: true,
      // },
      // {
      //   label: "Update Status",
      //   link: "/admin/sales/selected-sales-order-view",
      //   updateStatus: true,
      // },
      // {
      //   label: "Create Delivery Order",
      //   link: "/admin/sales/create-delivery-order",
      // },
    ];
  }
  
  try {
  
    // const res = await webApi.post("/master/sales/list", {
      if(searchQuery?.txt_keyword_pharse){
        let res = await webApi.post("/master/keyword_pharse_sales_search/list", {
          keyword_pharse: searchQuery.txt_keyword_pharse,
          sales_from_date: timestamp(searchQuery.txt_sales_order_date_from),
          sales_to_date: timestamp(searchQuery.txt_sales_order_date_to),
          // enquiry_status: q.ddl_status?.label != "All" ? String(q.ddl_status.value) : "",
        })

        console.log(res.data,"sen1009/res")
        if (res.status === 200) {
          // const rw1 = res.data.sort(function(c, d) { if(c.customer_name.toLowerCase() >d.customer_name.toLowerCase() ) return 1} );
          // const r = rw1.sort((a, b) => b.sales_order_date - a.sales_order_date);
          // const r = res.data.sort((a, b) => b.sales_order_date - a.sales_order_date);
          let j=0;
          let allItems = [];
          let sumValue = 0;
          let sumOtherChargeValue=0;
          let rw = res.data

         rw.map((a,b)=>{
          a.sales.length>0?
          a.sales.map((r, i) => {

            if (r.sales_order_item_details.length) {
              if(r.sales_order_no[0]==""){}
              else{
                j=j+1;
              }
            
    
            //  if( r.sales_order_other_charges){
            
            //  }
    
              //console.log(r.sales_order_other_charges.reduce(
              //   (sum, li)=> li.charge_type === "+" ? sum + Number(li.charge_amount): sum - Number(li.charge_amount),0
              // ),'sen220417')

    
              allItems.push({
                slID: j,
                sales_serial: j,
                sales_id: r.sales_id,
                sales_order_date: dateFormate(r.sales_order_date),
                sales_order_no: r.sales_order_no[0],
                sales_order_note: r.sales_order_note,
                purchase_order_no: r.purchase_order_no,
                purchase_order_date: dateFormate(r.purchase_order_date),
                sales_quotation_no: r.quotation_no[0],
                sales_enquiry_no: r.enquiry_no[0],
                sales_customer: r.customer_name,
                // qutCustomer: r.customer_name,
                sales_city: r.city,
                sales_state:r.state,
                sales_street:r.street,
                sales_area:r.area,
                sales_pin:r.pin,
                sales_police:r.police,
                sales_street:r.street,
                sales_value: Number(r.sales_order_item_details.reduce(
                  (sum, li) => 
                  Number(sum) + Number(li.net_value),0) + r.sales_order_other_charges.reduce(
                    (sum, li)=> li.charge_type === "+" ? sum + Number(li.charge_amount): sum - Number(li.charge_amount),0
                  )).toFixed(2),
                sales_status: r.sales_status,
                sales_action: "view-action",
                sales_order_item_details:r.sales_order_item_details,
                sales_order_other_charges:r.sales_order_other_charges,
                menu: customMenu,
              });

              sumValue += r.sales_order_item_details.reduce(
                (sum, li) => Number(sum) + Number(li.net_value),
                0);
            }
            sumOtherChargeValue += r.sales_order_other_charges.reduce(
              (sum, li)=> li.charge_type === "+" ?  sum + Number(li.charge_amount) : sum - Number(li.charge_amount),0
            )
           
          })
          :
          ''
         })
         
          if (allItems.length) {
            console.log(allItems,"sen22046")
            return onSuccess(allItems,sumValue + sumOtherChargeValue);
            } else {
              return onFailure("Sales Order Not Found");
            }
        } else {
          onFailure("Something Wrong! Please Try again later " + res.data);
        }
      }

      else{
        const res = await webApi.post("/master/view_sales_agg/list", {

          sales_id:sales_id,
          // query: searchQuery?.txt_keyword_pharse,
          sales_order_no:searchQuery?.txt_sales_order_no,
          sales_customer:searchQuery.ddl_customer?.value,
          sales_status:searchQuery?.ddl_status?.value,
          sales_order_from_date:timestamp(searchQuery?.txt_sales_order_date_from),
          sales_order_to_date:timestamp(searchQuery?.txt_sales_order_date_to),
          sales_key_phrase:searchQuery?.txt_keyword_pharse,
          // sales_status: searchQuery.ddl_status?.label !="All"?searchQuery.ddl_status.value:"",
          sales_status: searchQuery.ddl_status?.label !="All"?String(searchQuery.ddl_status.value):"",
          sales_order_item_details:searchQuery.sales_order_item_details,
          sales_order_other_charges:searchQuery.sales_order_other_charges,
        });
        if (res.status === 200){
          const rw1 = res.data.sort(function(c, d) { if(c.customer_name >d.customer_name ) return 1} );
          const r = rw1.sort((a, b) => b.sales_order_date - a.sales_order_date);
          // const r = res.data.sort((a, b) => b.sales_order_date - a.sales_order_date);
          let j=0;
          let allItems = [];
          let sumValue = 0;
         let sumOtherChargeValue=0;
         
          r.map((r, i) => {
        
              if (r.sales_order_item_details.length) {
                if(r.sales_order_no[0]==""){}
                else{
                  j=j+1;
                }
      
              //  if( r.sales_order_other_charges){
              
              //  }
      
                //console.log(r.sales_order_other_charges.reduce(
                //   (sum, li)=> li.charge_type === "+" ? sum + Number(li.charge_amount): sum - Number(li.charge_amount),0
                // ),'sen220417')
                console.log(r.sales_order_no[0],"r22r")

      
                allItems.push({
                  slID: j,
                  sales_serial: i + 1,
                  sales_id: r.sales_id,
                  sales_order_date: dateFormate(r.sales_order_date),
                  sales_order_no: r.sales_order_no[0],
                  sales_order_note: r.sales_order_note,
                  purchase_order_no: r.purchase_order_no,
                  purchase_order_date: dateFormate(r.purchase_order_date),
                  sales_quotation_no: r.quotation_no[0],
                  sales_enquiry_no: r.enquiry_no[0],
                  sales_customer: r.customer_name,
                  sales_city: r.customer_details[0]?.address[0]?.txt_city,
                  sales_state:r.customer_details[0]?.address[0]?.ddl_state_label,
                  sales_street:r.customer_details[0]?.address[0]?.txt_street,
                  sales_area:r.customer_details[0]?.address[0]?.area,
                  sales_pin:r.pin,
                  sales_police:r.police,
                  gst_no:r.customer_details[0]?.gst_no,
                  sales_executive_name: r.sales_executive_name,
                  sales_phone:r.sales_phone,
                lower_unit_value: r.sales_order_item_details[0]?.quantity / r.lower_unit_value,
                  lower_caption:r.lower_caption,
                  sales_value: Number(r.sales_order_item_details.reduce(
                    (sum, li) => 
                    Number(sum) + Number(li.net_value),0) + r.sales_order_other_charges.reduce(
                      (sum, li)=> li.charge_type === "+" ? sum + Number(li.charge_amount): sum - Number(li.charge_amount),0
                    )).toFixed(2),
                  sales_status: r.sales_status,
                  sales_action: "view-action",
                  sales_order_item_details:r.sales_order_item_details,
                  sales_order_other_charges:r.sales_order_other_charges,
                  menu: customMenu,
                });

                sumValue += r.sales_order_item_details.reduce(
                  (sum, li) => Number(sum) + Number(li.net_value),
                  0);
              }
              sumOtherChargeValue += r.sales_order_other_charges.reduce(
                (sum, li)=> li.charge_type === "+" ?  sum + Number(li.charge_amount) : sum - Number(li.charge_amount),0
              )
            
           
          });
          if (allItems.length) {
            //console.log(sumOtherChargeValue,"sen22046")
            return onSuccess(allItems,sumValue + sumOtherChargeValue);
            } else {
              return onFailure("Sales Order Not Found");
            }
        } else {
          onFailure("Something Wrong! Please Try again later " + res.data);
        }
      }
   
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// export const getSalesOrderBySalesId = async (id,sales_order_no, onSuccess, onFailure) => {
//   try {
//     const res = await webApi.post("/master/sales/list", {
//       sales_id:id,
//       sales_order_no:sales_order_no,
//     });
//     if (res.status === 200) {
//       const r = res.data;
//       // //console.log(r,"r5")
//       let allItems = [];
//       r.map((r, i) => {
//         allItems.push({
//           sales_serial: i + 1,
//           sales_id: r.sales_id,
//           sales_order_date: dateFormate(r.sales_order_date),
//           sales_order_no: r.sales_order_no[0],
//           qutNo: r.quotation_no[0],
//           sales_order_note: r.sales_order_note,
//           enqNo: r.enquiry_no[0],
//           enqDate: dateFormate(r.enquiry_details[0].enquiry_date),
//           purchase_order_no: r.purchase_order_no,
//           purchase_order_date: dateFormate(r.purchase_order_date),
//           qutDate: r.quotation_date,
//           enqCustomer: r.customer_name,
//           enqCustomer_id:r.customer_id,
//           status: r.sales_status,
//           email: r.email,
//           mobile: r.mobile,
//           quotation_item_details: r.quotation_item_details,
//           sales_order_item_details: r.sales_order_item_details,
//           sales_order_other_charges:r.sales_order_other_charges,
//         });
//       });
//       return onSuccess(allItems[0]);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   }
//    catch (error)
//    {
//     // onFailure("Something Wrong! Please Try again later " + error);
//   }
// };


export const getSalesOrderBySalesId = async (id,sales_order_no, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/ledger_by_salesorder/list", {
      sales_id:id,
      sales_order_no:sales_order_no,
    });
    if (res.status === 200) {
      const r = res.data;
      console.log(r,"r5")
      let allItems = [];
      r.map((r, i) => {
        allItems.push({
          sales_serial: i + 1,
          sales_id: r.sales_id,
          sales_order_date: dateFormate(r.sales_order_date),
          sales_order_no: r.sales_order_no[0],
          qutNo: r.quotation_no[0],
          // sales_order_note: r.sales_order_note,
          enqNo: r.enquiry_no[0],
          // enqDate: dateFormate(r.enquiry_details[0].enquiry_date),
          // purchase_order_no: r.purchase_order_no,
          // purchase_order_date: dateFormate(r.purchase_order_date),
          // qutDate: r.quotation_date,
          enqCustomer: r.customer_name,
          // enqCustomer_id:r.customer_id,
          status: r.sales_status,
          // email: r.email,
          // mobile: r.mobile,
          // quotation_item_details: r.quotation_item_details,
          sales_order_item_details: r.sales_order_item_details,
          sales_order_other_charges:r.sales_order_other_charges,
        });
      });
      console.log(allItems[0],"sankhaooo")
      return onSuccess(allItems[0]);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const postSalesOrder = async (
  info,
  updatedItem,
  updateOtherCharges,
  onSuccess,
  onFailure
) => {
  // //console.log(updateOtherCharges,"updatedItem1")
  try {
    let res;
    if (info.edit) {
      res = await webApi.post("/master/sales/update", {
        sales_id: info.sales_id,
        sales_order_date: timestamp(info.txt_sales_order_date),
        purchase_order_no: info.txt_purchase_order_no,
        purchase_order_date: timestamp(info.txt_purchase_order_date),
        sales_order_note: info.txt_sales_order_note,
        sales_order_item_details: updatedItem,
        sales_order_other_charges:updateOtherCharges
      });
    } else {
      res = await webApi.post("/master/sales/update", {
        sales_id: info.sales_id,
        module: "SALES_ORDER",
        quotation_status: info.quotation_status,
        sales_status: info.sales_status,
        purchase_order_no: info.txt_purchase_order_no,
        sales_order_date: timestamp(info.txt_sales_order_date),
        purchase_order_date: timestamp(info.txt_purchase_order_date),
        sales_order_note: info.txt_sales_order_note,
        sales_order_item_details: updatedItem,
        sales_order_other_charges:updateOtherCharges
        
      }
     );
    //  //console.log(res,"res")
    }
    if (res.status === 200) {
      const r = res.data;
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// export const getSalesOrderBySalesIdUpdate = async (id, onSuccess, onFailure) => {
//   try {
//     const res = await webApi.post("/master/sales/list", {
//       sales_id: id,
//     });
//     if (res.status === 200) {
//       const r = res.data;
//       // //console.log(r,"r5")
//       let allItems = [];
//       r.map((r, i) => {
//         allItems.push({
//           sales_serial: i + 1,
//           sales_id: r.sales_id,
//           sales_order_date: dateFormate(r.sales_order_date),
//           sales_order_no: r.sales_order_no[0],
//           qutNo: r.quotation_no[0],
//           sales_order_note: r.sales_order_note,
//           enqNo: r.enquiry_no[0],
//           enqDate: dateFormate(r.enquiry_details[0].enquiry_date),
//           purchase_order_no: r.purchase_order_no,
//           purchase_order_date: dateFormate(r.purchase_order_date),
//           qutDate: r.quotation_date,
//           enqCustomer: r.customer_name,
//           enqCustomer_id:r.customer_id,
//           status: r.enquiry_status,
//           email: r.email,
//           mobile: r.mobile,
//           quotation_item_details: r.quotation_item_details,
//           sales_order_item_details: r.sales_order_item_details,
//           sales_order_other_charges:r.sales_order_other_charges,
//         });
//       });
//       return onSuccess(allItems[0]);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

export const updateSalesOrder = async (
  info,
  updatedItem,
  updateOtherCharges,
  onSuccess,
  onFailure
) => {
// //console.log(updatedItem,"from5 service updatedItem")
// //console.log(updateOtherCharges,"from5 service info")
  try {
    let res;

      res = await webApi.post("/master/sales/update", {
        sales_id: info.sales_id,
        sales_order_date: timestamp(info.txt_sales_order_date),
        purchase_order_no: info.txt_purchase_order_no,
        purchase_order_date: timestamp(info.txt_purchase_order_date),
        sales_order_note: info.txt_sales_order_note,
        sales_order_item_details: updatedItem,
        sales_order_other_charges:updateOtherCharges
      });
    
    if (res.status === 200) {
      const r = res.data;
      onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};



export const getAllSalesOrderPrint = async ( onSuccess, onFailure, searchQuery,sales_id) => {
  try {
    const res = await webApi.post("/master/view_print/list", {
      sales_id:sales_id,
          // query: searchQuery?.txt_keyword_pharse,
          sales_order_no:searchQuery?.txt_sales_order_no,
          sales_customer:searchQuery.ddl_customer?.value,
          sales_status:searchQuery?.ddl_status?.value,
          sales_order_from_date:timestamp(searchQuery?.txt_sales_order_date_from),
          sales_order_to_date:timestamp(searchQuery?.txt_sales_order_date_to),
          sales_key_phrase:searchQuery?.txt_keyword_pharse,
          // sales_status: searchQuery.ddl_status?.label !="All"?searchQuery.ddl_status.value:"",
          sales_status: searchQuery.ddl_status?.label !="All"?String(searchQuery.ddl_status.value):"",
          sales_order_item_details:searchQuery.sales_order_item_details,
          sales_order_other_charges:searchQuery.sales_order_other_charges,
    });
    if (res.status === 200) {
      const rw1 = res.data.sort(function(c, d) { if(c.customer_name >d.customer_name ) return 1} );
      const r = rw1.sort((a, b) => b.sales_order_date - a.sales_order_date);
      // const r = res.data.sort((a, b) => b.sales_order_date - a.sales_order_date);
      let j=0;
      let allItems = [];
      let sumValue = 0;
     let sumOtherChargeValue=0;
     
      r.map((r, i) => {
        if (r.sales_order_item_details.length) {
          if(r.sales_order_no[0]==""){}
          else{
            j=j+1;
          }

        //  if( r.sales_order_other_charges){
        
        //  }

          //console.log(r.sales_order_other_charges.reduce(
          //   (sum, li)=> li.charge_type === "+" ? sum + Number(li.charge_amount): sum - Number(li.charge_amount),0
          // ),'sen220417')
  console.log(r.sales_order_item_details[0]?.quantity,"r22r")


          allItems.push({
            slID: j,
            sales_serial: i + 1,
            sales_id: r.sales_id,
            sales_order_date: dateFormate(r.sales_order_date),
            sales_order_no: r.sales_order_no[0],
            sales_order_note: r.sales_order_note,
            purchase_order_no: r.purchase_order_no,
            purchase_order_date: dateFormate(r.purchase_order_date),
            sales_quotation_no: r.quotation_no[0],
            sales_enquiry_no: r.enquiry_no[0],
            sales_customer: r.customer_name,
            sales_city: r.customer_details[0]?.address[0]?.txt_city,
            sales_state:r.customer_details[0]?.address[0]?.ddl_state_label,
            sales_street:r.customer_details[0]?.address[0]?.txt_street,
            sales_area:r.customer_details[0]?.address[0]?.area,
            sales_pin:r.pin,
            sales_police:r.police,
            gst_no:r.customer_details[0]?.gst_no,
            sales_executive_name: r.sales_executive_name,
            sales_phone:r.sales_phone,
            // lower_unit_value: Math.round(r.sales_order_item_details[0]?.quantity / r.lower_unit_value),
            lower_unit_value:r.lower_unit_value,
            lower_caption:r.lower_caption,
            sales_value: Number(r.sales_order_item_details.reduce(
              (sum, li) => 
              Number(sum) + Number(li.net_value),0) + r.sales_order_other_charges.reduce(
                (sum, li)=> li.charge_type === "+" ? sum + Number(li.charge_amount): sum - Number(li.charge_amount),0
              )).toFixed(2),
            sales_status: r.sales_status,
            sales_action: "view-action",
            sales_order_item_details:r.sales_order_item_details,
            sales_order_other_charges:r.sales_order_other_charges,
            // menu: customMenu,
          });
          sumValue += r.sales_order_item_details.reduce(
            (sum, li) => Number(sum) + Number(li.net_value),
            0);
        }
        sumOtherChargeValue += r.sales_order_other_charges.reduce(
          (sum, li)=> li.charge_type === "+" ?  sum + Number(li.charge_amount) : sum - Number(li.charge_amount),0
        )
       
      });
      if (allItems.length) {
        //console.log(sumOtherChargeValue,"sen22046")
        return onSuccess(allItems,sumValue + sumOtherChargeValue);
        } else {
          return onFailure("Sales Order Not Found");
        }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};





export const getSalesOrderBySalesIdUpdate = async (id, sales_order_no, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/view_sales_agg/list", {
      sales_id: id,
      sales_order_no: sales_order_no,
    });

    if (res.status === 200) {
      const r = res.data;
      console.log(r, "r5");

    
        const allItems = r.map((item, i) => {
      console.log(item, "r51");

          return {
            // sales_serial: i + 1,
            sales_id: item.sales_id,
            sales_order_date: dateFormate(item.sales_order_date), 
            sales_order_no: item.sales_order_no,
            qutNo: item.quotation_no[0],
            sales_order_note: item.sales_order_note,
            enqNo: item.enquiry_no[0],
            enqDate: dateFormate(item.enquiry_date), 
            purchase_order_no: item.purchase_order_no,
            purchase_order_date: dateFormate(item.purchase_order_date), 
            qutDate: item.quotation_date,
            enqCustomer: item.customer_name,
            enqCustomer_id: item.customer_id,
            status: item.enquiry_status,
            email: item.email,
            mobile: item.mobile,
            quotation_item_details: item.quotation_item_details,
            sales_order_item_details: item.sales_order_item_details,
            sales_order_other_charges: item.sales_order_other_charges,
          };
        });

        console.log(allItems[0], "sankhaallItems");
        return onSuccess(allItems[0]);
     
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error.message);
  }
};