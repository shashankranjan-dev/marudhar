
import webApi from "./webApi/webApi";
import { dateFormate ,currentDate} from "../views/Pages/HelperComponent/utils";
import { timestamp } from "./Utils/utils";

// export const getAllDispatchOrder = async (
//   onSuccess,
//   onFailure,
//   searchQuery
// ) => {
//   try {
//     const res = await webApi.post("/master/sales/list", {
//       dispatch_order_no:searchQuery?.txt_dispatch_order_no,
//       delivery_order_no:searchQuery?.txt_delivery_order_no,
//       sales_order_no:searchQuery?.txt_sales_order_no,

//       dispatch_customer: searchQuery ?. ddl_customer?.value,
//       dispatch_date_from: timestamp(searchQuery?.txt_dispatch_date_from),
//       dispatch_date_to:timestamp(searchQuery?.txt_dispatch_date_to),
//       delivery_date_from: timestamp(searchQuery?.txt_delivery_date_from),
//       delivery_date_to: timestamp(searchQuery?.txt_delivery_date_to),
   
//       dispatch_key_phrase:searchQuery?.txt_dispatch_key_phrase,
//     });
//     if (res.status === 200) {
//       const r = res.data;
//       let j=0;
//       let allItems = [];
//       r.map((r, i) => {
//         if (r.dispatch_order_item_details.length) {
//           if(r.dispatch_order_no[0]==""){}
//           else{
//             j=j+1;
//           } 
//             {
//             {
//               allItems.push({
//                 disID: i + 1,
//                 sales_id: r.sales_id,
//                 disdispatchDate: dateFormate(r.dispatch_order_date),
//                 disDispatchNo: r.dispatch_order_no,
//                 disDeliveryOrderhNo: r.delivery_order_no[0],
//                 disCustomer: r.customer_name,
//                 disSalesOrderNo: r.sales_order_no[0],
//                 disStatus: r.dispatch_status,
//                 disAction: "view-action",
//                 menu: [
//                   {
//                     label: "View",
//                     link: "/admin/sales/dispatch-order-view",
//                   },
//                   {
//                     label: "Edit",
//                     itemEdit: true,
//                     link: "/admin/sales/dispatch-order",
//                   },
//                   {
//                     label: "Update To Do",
//                     link: "/admin/sales/dispatch-order-view",
//                     updateTask: true,
//                   },
//                   {
//                     label: "Update Status",
//                     link: "/admin/sales/dispatch-order-view",
//                     updateStatus: true,
//                   },
//                   {
//                     label: "Create Invoice",
//                     link: "/admin/sales/invoice/create",
//                   },
//                   {
//                     label: "Share",
//                     link: "",
//                   },
//                 ],
//               });
//             }
//           }
//         }
//       });
//       return onSuccess(allItems);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

export const getDispatchBySalesId = async (id, onSuccess, onFailure) => {
  try {
    
    const res = await webApi.post("/master/create_dispatch_order/list", {
      sales_id: id,
    });
    if (res.status === 200) {
      const r = res.data;

      let allItems = [];
      r.map((r, i) => {

       
        allItems.push({
          sales_id: r.sales_id,
          dispatch_order_no: r.dispatch_order_no,
          dispatch_order_date: dateFormate(r.dispatch_order_date),          
          vehicle_no:r.vehicle_no,
          contractor_id:r.contractor_id,
          dispatch_order_note: r.dispatch_order_note,
          status: r.dispatch_status,
          
          enqNo: r.enquiry_no[0],
          qutNo: r.quotation_no[0],

          delivery_order_no: r.delivery_order_no[0],
          delivery_order_date: dateFormate(r.delivery_order_date),
          delivery_order_to_date: dateFormate(r.delivery_order_to_date),
          delivery_order_from_date: dateFormate(r.delivery_order_from_date),

          delivery_order_no: r.delivery_order_no[0],
          sales_order_no: r.sales_order_no[0],
          purchase_order_no: r.purchase_order_no,

          customer_name: r.customer_name,
          enqShowroom: r.showroom_warehouse_name,
          customer_id: r.customer_id,
          ddl_customer_name: { label: r.customer_name, value: r.customer_id },
          mobile: r.mobile,
          email: r.email,
          ddl_enqShowroom: {
            label: r.showroom_warehouse_name,
            value: r.enquiry_details[0].showroom_warehouse_id,
          },
          delivery_status: r.delivery_status,
          delivery_order_item_details: r.dispatch_order_item_details,
          delivery_order_item_details_prv: r.delivery_order_item_details,
          do_item_details_with_dispatch: r.dispatch_order_item_details,
          sales_other_charge : r.sales_order_other_charges,
          invoice_other_charges: r.invoice_other_charges,
          
        });
      });
      console.log(allItems[0],"sankh25622=>")
      return onSuccess(allItems[0]);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllDispatchOrderOnLoad = async (
  onSuccess,
  onFailure,
  New
) => {
  try {
    const res = await webApi.post("/master/dispatch/list", {});
    if (res.status === 200) {
      const r = res.data;
      let j=0;
      let allItems = [];

      r.map((r, i) => {
          allItems.push({
            disID: i + 1,
            disCustomer: r.customer_name,
            sales_id: r.sales_id,
            disdispatchDate: dateFormate(r.dispatch_order_date),
            disSalesOrderNo: r.sales_order_no[0],
            disQuotationNo: r.quotation_no[0],
            disDispatchNo: r.dispatch_order_no,
            disDeliveryOrderNo: r.dispatch_order_details.delivery_order_no,
            dispatch_order_item_details: r.dispatch_order_item_details,
            //DelMobile: r.mobile,
            //DelSalesExecutive: r.sales_executive_name,
            //sales_executive_id: r.sales_executive_id,
            disStatus: r.dispatch_order_details.status,
            disAction: "view-action",
            menu: [
              {
                label: "View",
                link: "/admin/sales/dispatch-order-view",
              },
              {
                label: "Edit",
                itemEdit: true,
                link: "/admin/sales/edit-delivery-order",
              },
              {
                label: "Update To Do",
                link: "/admin/sales/dispatch-order-view",
                updateTask: true,
              },
              {
                label: "Update Status",
                link: "/admin/sales/dispatch-order-view",
                updateStatus: true,
              },
              {
                label: "Create Invoice",
                link: "/admin/sales/invoice/create",
              },
              {
                label: "Share",
                link: "",
              },
            ],
          });
        //}
      });
      if (allItems.length > 0) {
        //console.log("Aee", allItems);
        return onSuccess(allItems);
        } else {
          return onFailure("Dispatch Order not found");
        }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getAllDispatchOrder = async (
  onSuccess,
  onFailure,
  searchQuery,
  inv = true
) => {
  try {
    //console.log("SQ", searchQuery);
    const res = await webApi.post("/master/dispatch/list", {
      sales_id: searchQuery?.sales_id,
      dispatch_order_no: searchQuery?.txt_dispatch_order_no,
      delivery_order_no: searchQuery?.txt_delivery_order_no,
      sales_order_no: searchQuery?.txt_sales_order_no,
      quotation_no: searchQuery?.txt_quotation_no,
      dispatch_customer_id: searchQuery ? (searchQuery.ddl_customer ? searchQuery.ddl_customer.value : searchQuery.customer_id) : '',
      dispatch_status: (searchQuery.ddl_status?.label !="All") ?searchQuery.ddl_status.value:"",
      dispatch_date_from: (inv ? '' : timestamp(searchQuery?.txt_dispatch_date_from)),
      dispatch_date_to: (inv ? '' : timestamp(searchQuery?.txt_dispatch_date_to)),
      // dispatch_delivery_from_date: (inv ? '' : timestamp(searchQuery?.txt_delivery_date_from)),
      // dispatch_delivery_to_date: (inv ? '' : timestamp(searchQuery?.txt_delivery_date_to)),
    });

    if (res.status === 200) {
      const rw1 = res.data.sort((c, d) => c.customer_name.localeCompare(d.customer_name));
      let rd = rw1.sort((a, b) => b.dispatch_order_date - a.dispatch_order_date);
      // let rd = res.data.sort((a, b) => b.dispatch_order_date - a.dispatch_order_date);
      let j=0;
      let allItems = [];

      let customMenu = [];

      
      if (searchQuery.ddl_status?.label==="Billed") {
        customMenu = [
          {
            label: "View",
            // link: "/admin/sales/dispatch-order-view",
            clickBtn: true,
          },
        ];
      }
    else  if (searchQuery.ddl_status?.label==="Unbilled") {
      customMenu = [
        {
          label: "View",
          // link: "/admin/sales/dispatch-order-view",
          clickBtn: true,
        },
        {
          label: "Edit",
          itemEdit: true,
          link: "/admin/sales/dispatch-order",
        },
        {
          label: "Update To Do",
          link: "/admin/sales/dispatch-order-view",
          updateTask: true,
        },
        {
          label: "Update Status",
          link: "/admin/sales/dispatch-order-view",
          updateStatus: true,
        },
        {
          label: "Create Invoice",
          link: "/admin/sales/invoice/create",
        },
        // {
        //   label: "Share",
        //   link: "",
        // },
      ];
      }
    
      else {
        customMenu = [
          {
            label: "View",
            // link: "/admin/sales/dispatch-order-view",
            clickBtn: true,
          },
        ];
       
      }

      //console.log("respd", rd);

      rd.map((r, i) => {
        //console.log("riri", r);
        if (r.dispatch_order_item_details) {
          // if(r.delivery_order_no[0]==""){}
          // else{
          //   j=j+1;
          // }
          
          allItems.push({
            disQuotationNo: r.quotation_no[0],
            disID: i + 1,
            sales_id: r.sales_id,
            disdispatchDate: dateFormate(r.dispatch_order_date),
            disDispatchNo: r.dispatch_order_no,
            disDeliveryOrderNo: r.dispatch_order_details.delivery_order_no,
            disCustomer: r.customer_name,
            disSalesOrderNo: r.sales_order_no[0],
            // disStatus: r.dispatch_order_details.status,
            disStatus: r.dispatch_order_details.status,

            dispatch_order_details: r.dispatch_order_details,
            dispatch_order_item_details: r.dispatch_order_item_details,
            disAction: "view-action",
            menu: customMenu,
          });
        }
      });

      //console.log("alI87", allItems.length);

      if (allItems.length) {
        
        if(inv) {
          //console.log("inv_d", allItems);
          return onSuccess(allItems[0]);
        }
        else {
          return onSuccess(allItems);
        }
      } else {
        return onFailure("Dispatch Order not found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getDeliveryOrderBySalesIdDpON = async (id, dispatch_no, onSuccess, onFailure) => {
  try {
    //console.log("tau", dispatch_no);
    const res = await webApi.post("/master/dispatch/list", {
      sales_id: id,
      dispatch_order_no: dispatch_no,
      //vehicle_id:id,
    });
    if (res.status === 200) {
      const r = res.data;
      let j=0;
      let allItems = [];

      r.map((r, i) => {
       // if (Object.keys(r.delivery_order_item_details).length > 0) {
          // if(r.delivery_order_no[0]==""){}
          // else{
          //   j=j+1;
          // }
          //console.log("nina",  r.contact_person[0]?.txt_name);
          
          allItems.push({
            // DelID: ++j,
            //customer_name: r.customer_name,
            enqCustomer: r.customer_name,
            ledgerName:r.contact_person[0]?.txt_name,
            dispatch_order_date: dateFormate(r.dispatch_order_date),
            delivery_order_no: r.dispatch_order_details.delivery_order_no,
            sales_order_no: r.sales_order_no[0],
            //delivery_order_date: dateFormate(r.dispatch_order_details.delivery_order_date),
            qutNo: r.quotation_no[0],
            dispatch_order_no: r.dispatch_order_no,
            enqNo: r.enquiry_no[0],
            vehicle_no: r.vehicle_no,
            
            contractor_id: r.dispatch_order_details.contractor_id,
            status: r.dispatch_order_details.status,
            dispatch_order_item_details: r.dispatch_order_item_details,
            sales_order_item_details: r.sales_order_item_details,
            sales_order_other_charges: r.sales_order_other_charges,
        });
      });
      //console.log("allItemsallItemsallItems", allItems);
      return onSuccess(allItems[0]);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! gaba Please Try again later " + error);
  }
};

export const postDispatchOrder = async (
  info,
  updatedItem,
  onSuccess,
  onFailure
) => {
  try {
    let res;
    if (info.edit) {
      //console.log("bye")
      
      res = await webApi.post("/master/sales/update", {
        sales_id: info.sales_id,
        dispatch_order_date: timestamp(info.txt_dispatch_date),
        vehicle_no: info.txt_vehicle_no,
        contractor_id:info.ddl_contractor,
        dispatch_order_note: info.txt_dispatch_note,
        dispatch_order_item_details: updatedItem,
      });
      // updatedItem.map((item) => {
      //   const movRes = webApi.post("/master/stock_movement/update", {
      //     transaction_type: "D",
      //     transaction_id: info.sales_id,
      //     transaction_date: timestamp(currentDate()),
      //     showroom_warehouse_id: Number(item.showroom_warehouse_id),
      //     item_id: item.item_id,
      //     plus_qty: 0,
      //     minus_qty: Number(item.dispatched_qty),
      //     unit_id: item.uom_id,
      //   });
      // });

    } else {
      //console.log("hiii",info.ddl_contractor)
      //console.log(info.ddl_vehicle_no,"ddl_vehicle_no")

      res = await webApi.post("/master/sales/update", {
        sales_id: info.sales_id,
        module: "DISPATCH_ORDER",
        //dispatch_status: info.dispatch_status,
        dispatch_order_date: timestamp(info.txt_dispatch_date),
        vehicle_id: info.ddl_vehicle_no.value,
        contractor_id:info.ddl_contractor.value,
        dispatch_order_note: info.txt_dispatch_note,        
        dispatch_order_item_details: updatedItem,
        do_num: info.do_num,
      });
     
      // updatedItem.map((item) => {
      //   const movRes = webApi.post("/master/stock_movement/insert", {
      //     transaction_type: "D",
      //     transaction_id: info.sales_id,
      //     transaction_date: timestamp(currentDate()),
      //     showroom_warehouse_id: Number(item.showroom_warehouse_id),
      //     item_id: item.item_id,
      //     plus_qty: 0,
      //     minus_qty: Number(item.dispatched_qty),
      //     unit_id: item.uom_id,
      //   });
      // });
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



//FOR Contractor
export const getContractorById = async (q,onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/vendor/list", {
  vendor_id:q
    });
    if (res.status === 200) {
      //console.log("reached555",res)
      const r = res.data;
      let allvendor = [];
      r.map((r, i) => {
        allvendor.push({

          value: r.vendor_id,
          label: r.company_name,
        });
      });
      
      return onSuccess(allvendor);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

//FOR journal
export const getJournalById = async (q,onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/journal_id/list", {
      invoice_no:q
    });
    if (res.status === 200) {
      const r = res.data;
      // let allvendor = [];
      // r.map((r, i) => {
      //   allvendor.push({
      //     value: r.vendor_id,
      //     label: r.company_name,
      //   });
      // });
      //console.log("reached555",r[0])
      
      return onSuccess(r);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};