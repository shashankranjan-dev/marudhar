export const deliveryOrderRowData = [
  {
    id: "1",
    item_details: {
      brand: "Marudhar",
      category: "Amazon white",
      item_own_code: "[MM12952]",
      itemName: "Glassy Marble",
      stock: "343",
      mrp: "15,000",
    },
    item_Img: "",
    quantity: "100 Pieces",
    rate: "50",
    disc_per: "0",
    disc_value: "0",
    gst_per: "0",
    gst_value: "0",
    net_value: "20,000",
    warehouses: [
      {
        id: "1",
        wareHouseName: "Warehouse1",
        stock: "500 Pieces",
      },
      {
        id: "2",
        wareHouseName: "Warehouse2",
        stock: "600 Pieces",
      },
      {
        id: "3",
        wareHouseName: "Warehouse3",
        stock: "700 Pieces",
      },
    ],
  },
  {
    id: "2",
    item_details: {
      brand: "Marudhar",
      category: "Amazon white",
      item_own_code: "[MM12952]",
      itemName: "Glassy Marble",
      stock: "343",
      mrp: "15,000",
    },
    item_Img: "",
    quantity: "200 boxes",
    rate: "50",
    disc_per: "0",
    disc_value: "0",
    gst_per: "0",
    gst_value: "0",
    net_value: "20,000",
    warehouses: [
      {
        id: "1",
        wareHouseName: "Warehouse1",
        stock: "500 Pieces",
      },
      {
        id: "2",
        wareHouseName: "Warehouse2",
        stock: "500 Pieces",
      },
      {
        id: "3",
        wareHouseName: "Warehouse3",
        stock: "500 Pieces",
      },
    ],
  },
  {
    id: "3",
    item_details: {
      brand: "Marudhar",
      category: "Amazon white",
      item_own_code: "[MM12952]",
      itemName: "Glassy Marble",
      stock: "343",
      mrp: "15,000",
    },
    item_Img: "",
    quantity: "300 boxes",
    rate: "50",
    disc_per: "0",
    disc_value: "0",
    gst_per: "0",
    gst_value: "0",
    net_value: "20,000",
    warehouses: [
      {
        id: "1",
        wareHouseName: "Warehouse1",
        stock: "500 Pieces",
      },
      {
        id: "2",
        wareHouseName: "Warehouse2",
        stock: "500 Pieces",
      },
      {
        id: "3",
        wareHouseName: "Warehouse3",
        stock: "500 Pieces",
      },
    ],
  },
  // {
  //   id: "3",
  //   item_details: {
  //     brand: "Marudhra",
  //     category: "Amazon white",
  //     item_own_code: "[MM12952]",
  //     itemName: "Glassy Marble",
  //     stock: "343",
  //     mrp: "15,000",
  //   },
  //   item_Img: "",
  //   quantity: "10,000",
  //   rate: "50",
  //   disc_per: "0",
  //   disc_value: "0",
  //   gst_per: "0",
  //   gst_value: "0",
  //   net_value: "20,000",
  //   warehouses: [
  //     {
  //       id: "1",
  //       wareHouseName: "Kolkata",
  //       stock: "500",
  //     },
  //     {
  //       id: "2",
  //       wareHouseName: "Delhi",
  //       stock: "500",
  //     },
  //     {
  //       id: "3",
  //       wareHouseName: "Kolkata",
  //       stock: "500",
  //     },
  //   ],
  // },
  //   {
  //     id: "2",
  //     item_details: {
  //       brand: "Marudhra",
  //       category: "Amazon white",
  //       item_own_code: "[MM12952]",
  //       itemName: "Glassy Marble",
  //       stock: "343",
  //       mrp: "15,000",
  //     },
  //     item_Img: "",
  //     quantity_field: "quantity_field",
  //     rate_field: "rate_field",
  //     disc_field: "",
  //     cgst_field: "",
  //     // sgst_field:"",
  //     // igst_field:"",
  //     net_value_field: "value_field",
  //     value_field: "value_field",
  //     action: "add_purchase_item",
  //   },
  //   {
  //     id: "3",
  //     item_details: {
  //       brand: "-",
  //       category: "Amazon white",
  //       item_own_code: "[MM12952]",
  //       itemName: "Glassy Marble",
  //       stock: "343",
  //       mrp: "15,000",
  //     },
  //     item_Img: "",
  //     quantity_field: "quantity_field",
  //     rate_field: "rate_field",
  //     disc_field: "",
  //     cgst_field: "",
  //     // sgst_field:"",
  //     // igst_field:"",
  //     net_value_field: "value_field",
  //     value_field: "value_field",
  //     action: "add_purchase_item",
  //   },
];

import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import {
  dateFormateField,
  dateFormate,
} from "../views/Pages/HelperComponent/utils";

export const getAllSalesOrder = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/sales/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
        if (r.quotation_item_details.length) {
          allItems.push({
            qutID: i + 1,
            sales_id: r.sales_id,
            qutDate: dateFormate(r.quotation_date),
            qutNo: r.quotation_no[0],
            qutEnquiryNo: r.enquiry_no[0],
            qutCustomer: r.customer_name,
            qutMobile: r.customer_mobile,
            qutSalesExecutive: r.sales_executive_name,
            sales_executive_id: r.sales_executive_id,
            qutSalesSource: r.source_name,
            source_id: r.source_id,
            qutStatus: r.sales_status,
            qutAction: "view-action",
            menu: [
              {
                label: "View",
                link: "/admin/sale/quatation-view",
              },
              {
                label: "Edit",
                itemEdit: true,
                link: "/admin/sales/add-new-quatation",
              },
              {
                label: "Create Sales Order",
                link: "/admin/sales/add-new-sales-order",
              },
              {
                label: "Share",
                link: "",
              },
            ],
          });
        }
      });
      return onSuccess(allItems);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};


export const getAllDeliveryOrderOnLoad = async (
  onSuccess,
  onFailure,
  New
) => {
  try {
    const res = await webApi.post("/master/delivery/list", {
    
      // delivery_order_no:searchQuery?.txt_delivery_order_no,
      // sales_order_no:searchQuery?.txt_sales_order_no,
      // customer_id: searchQuery?.ddl_customer.value,
      // active_status: searchQuery?.ddl_status.value,
      // delivery_date_from: timestamp(searchQuery?.txt_delivery_date_from),
      // delivery_date_to:timestamp(searchQuery?.txt_delivery_date_to),
      // delivery_sales_order_from_date: timestamp(searchQuery?.txt_sales_order_date_from),
      // delivery_sales_order_to_date: timestamp(searchQuery?.txt_sales_order_date_to),
      // quotation_no:searchQuery?.txt_quotation_no,
      delivery_status: 26,
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
          allItems.push({
            DelID: ++j,
            DelCustomer: r.customer_name,
            sales_id:  r.sales_id,
            DelDate: dateFormate(r.delivery_order_date),
            DelSalesOrderNo: r.sales_order_no[0],
            DelQuotationNo: r.quotation_no[0],
            DelNo: r.delivery_order_no,
            delivery_order_item_details: r.delivery_order_item_details,
            //DelMobile: r.mobile,
            //DelSalesExecutive: r.sales_executive_name,
            //sales_executive_id: r.sales_executive_id,
            DelStatus: r.delivery_status,
            DelAction: "view-action",
            menu: [
              {
                label: "View",
                link: "/admin/sales/selected-delivery-order-view",
              },
              {
                label: "Edit",
                itemEdit: true,
                link: "/admin/sales/edit-delivery-order",
              },
              {
                label: "Update Todo",
                updateTask: true,
                link: "/admin/sales/selected-delivery-order-view",
              },
              {
                label: "Update Status",
                link: "/admin/sales/selected-delivery-order-view",
                updateStatus: true,
              },
              {
                label: "Print",
                clickBtn: true,
                modelName: "printInvoice",
              },
              {
                label: "Create Dispatch",
                link: "/admin/sales/dispatch-order",
              },
            ],
          });
        //}
      });
      if (allItems.length > 0) {
        // console.log("Aee", allItems);
        return onSuccess(allItems);
        } else {
          return onFailure("Delivery Order not found");
        }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};




export const getAllDeliveryOrder = async (
  onSuccess,
  onFailure,
  searchQuery,
  dispt = true
) => {
  try {
    // console.log("SQ", searchQuery);
    const res = await webApi.post("/master/delivery/list", {
      // delivery_date_from: (timestamp(searchQuery?.txt_delivery_date_from)),
      // delivery_date_to: (timestamp(searchQuery?.txt_delivery_date_to)),
      

      delivery_order_no: searchQuery?.txt_delivery_order_no,
      sales_order_no: searchQuery?.txt_sales_order_no,
      quotation_no: searchQuery?.txt_quotation_no,
      delivery_customer_id: searchQuery ? (searchQuery.ddl_customer ? searchQuery.ddl_customer.value : searchQuery.customer_id) : '',
      delivery_status: (searchQuery?.ddl_status && searchQuery?.ddl_status.label !== 'All') ? searchQuery?.ddl_status.value : '',
      delivery_date_from: (dispt ? '' : timestamp(searchQuery?.txt_delivery_date_from)),
      delivery_date_to: (dispt ? '' : timestamp(searchQuery?.txt_delivery_date_to)),
      // delivery_sales_order_from_date: (dispt ? '' : timestamp(searchQuery?.txt_sales_order_date_from)),
      // delivery_sales_order_to_date: (dispt ? '' : timestamp(searchQuery?.txt_sales_order_date_to)),
      quotation_no:searchQuery?.txt_quotation_no,
    });
    if (res.status === 200) {
      // const rw1 = res.data.sort((c, d) => c.customer_name.localeCompare(d.customer_name));
      // const r = rw1.sort((a, b) => b.delivery_order_date - a.delivery_order_date);
      // const r = res.data.sort((a, b) => b.delivery_order_date - a.delivery_order_date);
      const r=res.data;
      let j=0;
      let allItems = [];

      r.map((r, i) => {
        console.log(r,"sank1207del")
        if (r.delivery_order_item_details) {
          //console.log("INera", r.dispatch_order_item_details.filter(o => o.showroom_warehouse_id ===  localStorage.getItem("user_location")));
          let menu = [
            {
              label: "View",
              // link: "/admin/sales/selected-delivery-order-view",
              clickBtn: true,
            },
            {
              label: "Edit",
              itemEdit: true,
              link: "/admin/sales/edit-delivery-order",
            },
            {
              label: "Update Todo",
              updateTask: true,
              link: "/admin/sales/selected-delivery-order-view",
            },
            {
              label: "Update Status",
              link: "/admin/sales/selected-delivery-order-view",
              updateStatus: true,
            },
            {
              label: "Print",
              clickBtn: true,
              modelName: "printInvoice",
            },
            {
              label: "Create Dispatch",
              link: "/admin/sales/dispatch-order",
            },
          ];

          if(searchQuery?.ddl_status?.label === 'All')
            menu = menu.slice(0, 1);

          else if(searchQuery?.ddl_status?.label === 'Dis.Order Gen.Fully')
            menu = [menu[0], menu[4]];
          
          else if (searchQuery?.ddl_status?.label === 'Dis.Order Gen.partly') {
            if(r.dispatch_order_item_details?.filter(o => o.showroom_warehouse_id === 
              localStorage.getItem("user_location")).length > 0)
             { menu.pop();}
             else { menu = [menu[0],menu[1],menu[2],menu[3], menu[4],menu[5]];}
          }
            
//i was just CHECKING
//ok ma'am, it some how workd, but multiple menus are still coming
//others are just getting hidden
//yes i can see tht
          allItems.push({
            DelID: ++j,
            sales_id:  r.sales_id,
            DelCustomer: r.customer_name,
            DelItem: r.item_name,
            DelDate: dateFormate(r.delivery_order_date),
            DelSalesOrderNo: r.sales_order_no[0],
            DelQuotationNo: r.quotation_no[0],
            DelNo: r.delivery_order_no,
            enqShowroom: r.showroom_details,
            DelMobile: r.mobile,
            Delcity: r.city,
            Delstate:r.state,
            Delstreet:r.street,
            Delarea:r.area,
            Delpin:r.pin,
            Delpolice:r.police,
            Delstreet:r.street,
            DelSalesExecutive: r.sales_executive_name,
            sales_phone:r.sales_phone,

            gst_no:r.gst_no,
            company_name:r.company_name,
            DelStatus: r.delivery_status,
            delivery_order_item_details: r.delivery_order_item_details,
            dispatch_order_item_details: r.dispatch_order_item_details,
            enqDate: dateFormate(r.enquiry_details?.enquiry_date),
            enqNo: r.enquiry_no[0],
            enqDetails: r.enquiry_details,
            DelAction: "view-action",
            menu: menu,
          });
        }
      });

      if (allItems.length) {
        //console.log("alI", allItems.length);

        if(dispt) {
          // console.log("dispatch!", allItems);
          return onSuccess(allItems[0]);
        }
        else {
          // console.log("workla", allItems);
          return onSuccess(allItems);
        }
      } else {
        return onFailure("Delivery Order not found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// export const getSalesOrderBySalesId = async (id, onSuccess, onFailure) => {
//   try {
//     const res = await webApi.post("/master/sales/list", {
//       sales_id: id,
//     });
//     if (res.status === 200) {
//        const r = res.data;
//       let allItems = [];
//       r.map((r, i) => {
        
//           allItems.push({
//           id: i + 1,
//           sales_id: r.sales_id,
//           enqNo: r.enquiry_no[0],
//           enqCustomer: r.customer_name,
//           enqSalesExecutive: r.enquiry_details[0].sales_executive_id,
//           enqSource: r.source_name,
//           enqShowroom: r.showroom_warehouse_name,
//           enqDate: dateFormate(r.enquiry_details[0].enquiry_date),
//           note: r.enquiry_details[0].note,
//           // enqDateField: dateFormate(r.enquiry_details[0].enquiry_date),

//           qutDate: dateFormate(r.quotation_date),
//           qutNo: r.quotation_no[0],
//           quotation_note: r.quotation_note,

//           sales_order_date: dateFormate(r.sales_order_date),
//           sales_order_no: r.sales_order_no[0],
//           sales_order_note: r.sales_order_note,
//           status: r.sales_status,

//           purchase_order_no: r.purchase_order_no,
//           purchase_order_date: dateFormate(r.purchase_order_date),

//           delivery_order_no: r.delivery_order_no,
//           delivery_order_date: dateFormate(r.delivery_order_date),
//           delivery_order_to_date: dateFormate(r.delivery_order_to_date),
//           delivery_order_from_date: dateFormate(r.delivery_order_from_date),
//           delivery_order_note: r.delivery_order_note,
//           delivery_status: r.delivery_status,
//           delivery_to_date: dateFormate(r.enquiry_details[0].delivery_to_date),

//           // for drop down selected
//           ddl_enqCustomer: { label: r.customer_name, value: r.customer_id },
//           // ddl_enqSalesExecutive: {
//           //   label: r.sales_executive_name,
//           //   value: r.enquiry_details[0].sales_executive_id,
//           // },
//           // ddl_enqShowroom: {
//           //   label: r.showroom_warehouse_name,
//           //   value: r.enquiry_details[0].showroom_warehouse_id,
//           // },
//           // ddl_enqSource: {
//           //   label: r.source_name,
//           //   value: r.enquiry_details[0].source_id,
//           // },

//           delivery_from_date: dateFormate(
//             r.enquiry_details[0].delivery_from_date
//           ),
//           sales_order_item_details: r.sales_order_item_details,
//           //delivery_order_item_details: (delivery_order_no ? r.delivery_order_item_details.filter((o) => o.delivery_no === delivery_order_no) : r.delivery_order_item_details),
//           delivery_order_item_details: r.delivery_order_item_details,
//           dispatch_order_item_details: r.dispatch_order_item_details,
//         });
//       });
//       // console.log("datata", allItems[0]);
//       return onSuccess(allItems[0]);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };



export const getSalesOrderBySalesId = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/Create_delivery_order/list", {
      sales_id: id,
    });
    if (res.status === 200) {

       const r = res.data;
       
      let allItems = [];
      r.map((r, i) => {
        
          allItems.push({
          id : i + 1,          
          sales_id: r.sales_id,
          enqNo: r.enquiry_no[0],
          enqCustomer: r.customer_name,
          // enqSalesExecutive: r.enquiry_details[0].sales_executive_id,
          // enqSource: r.source_name,
          // enqShowroom: r.showroom_warehouse_name,
          // enqDate: dateFormate(r.enquiry_details[0].enquiry_date),
          // note: r.enquiry_details[0].note,
          // enqDateField: dateFormate(r.enquiry_details[0].enquiry_date),

          qutDate: dateFormate(r.quotation_date),
          qutNo: r.quotation_no[0],
          quotation_note: r.quotation_note,

          sales_order_date: dateFormate(r.sales_order_date),
          sales_order_no: r.sales_order_no[0],
          sales_order_note: r.sales_order_note,
          status: r.sales_status,

          // purchase_order_no: r.purchase_order_no,
          // purchase_order_date: dateFormate(r.purchase_order_date),

          // delivery_order_no: r.delivery_order_no,
          // delivery_order_date: dateFormate(r.delivery_order_date),
          // delivery_order_to_date: dateFormate(r.delivery_order_to_date),
          // delivery_order_from_date: dateFormate(r.delivery_order_from_date),
          // delivery_order_note: r.delivery_order_note,
          // delivery_status: r.delivery_status,
          // delivery_to_date: dateFormate(r.enquiry_details[0].delivery_to_date),

          // for drop down selected
          // ddl_enqCustomer: { label: r.customer_name, value: r.customer_id },
          // ddl_enqSalesExecutive: {
          //   label: r.sales_executive_name,
          //   value: r.enquiry_details[0].sales_executive_id,
          // },
          // ddl_enqShowroom: {
          //   label: r.showroom_warehouse_name,
          //   value: r.enquiry_details[0].showroom_warehouse_id,
          // },
          // ddl_enqSource: {
          //   label: r.source_name,
          //   value: r.enquiry_details[0].source_id,
          // },

          // delivery_from_date: dateFormate(
          //   r.enquiry_details[0].delivery_from_date
          // ),
          sales_order_item_details: r.sales_order_item_details,
          //delivery_order_item_details: (delivery_order_no ? r.delivery_order_item_details.filter((o) => o.delivery_no === delivery_order_no) : r.delivery_order_item_details),
          delivery_order_item_details: r.delivery_order_item_details,
          dispatch_order_item_details: r.dispatch_order_item_details,
        });
      });
      console.log("datata", allItems[0]);
      return onSuccess(allItems[0]);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};


export const getDeliveryOrderBySalesIdDON = async (id, delivery_no, onSuccess, onFailure) => {
  try {
    // console.log("tau", delivery_no);
    const res = await webApi.post("/master/delivery/list", {
      sales_id: id,
      delivery_order_no: delivery_no,
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
          // console.log("nina", r);
          allItems.push({
            // DelID: ++j,
            enqCustomer: r.customer_name,
            showroom_details:r.showroom_details,
            DelDate: dateFormate(r.delivery_order_date),
            sales_order_no: r.sales_order_no[0],
            sales_order_date: r.sales_order_date,
            qutNo: r.quotation_no[0],
            DelNo: r.delivery_order_no,
            enqNo: r.enquiry_no[0],
            uom_details:r.uom_details,
            // //DelMobile: r.mobile,
            // //DelSalesExecutive: r.sales_executive_name,
            // //sales_executive_id: r.sales_executive_id,
            DelStatus: r.delivery_status,
            lower_unit_value:r.lower_unit_value,
            delivery_order_item_details: r.delivery_order_item_details,
            sales_order_item_details: r.sales_order_item_details,
            other_dois: r.other_dois,
          });
      });
      // console.log("rrr",allItems)

      return onSuccess(allItems[0]);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// export const getDeliveryOrderBySalesIdDON = async (id, delivery_no, onSuccess, onFailure) => {
//   try {
//     // console.log("tau", delivery_no);
//     const res = await webApi.post("/master/delivery_order_view/list", {
//       sales_id: id,
//       delivery_order_no: delivery_no,
//     });
//     if (res.status === 200) {
//       const r = res.data;
//       let j=0;
//       let allItems = [];

//       r.map((r, i) => {
//        // if (Object.keys(r.delivery_order_item_details).length > 0) {
//           // if(r.delivery_order_no[0]==""){}
//           // else{
//           //   j=j+1;
//           // }
//           // console.log("nina", r);
//           allItems.push({
//             // DelID: ++j,
//             enqCustomer: r.customer_name,
//             showroom_details:r.showroom_warehouse_name,
//             DelDate: dateFormate(r.delivery_order_date),
//             sales_order_no: r.sales_order_no[0],
//             sales_order_date: r.sales_order_date,
//             qutNo: r.quotation_no[0],
//             DelNo: r.delivery_order_no,
//             enqNo: r.enquiry_no[0],
//             uom_details:r.uom_details,
//             // //DelMobile: r.mobile,
//             // //DelSalesExecutive: r.sales_executive_name,
//             // //sales_executive_id: r.sales_executive_id,
//             DelStatus: r.delivery_status,
//             lower_unit_value:r.lower_unit_value,
//             delivery_order_item_details: r.delivery_order_item_details,
//             sales_order_item_details: r.sales_order_item_details,
//             other_dois: r.other_dois,
//           });
//       });
//       // console.log("rrr",allItems)

//       return onSuccess(allItems[0]);
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

export const getShoormLocationByItemId = async (
  itemId,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post("/master/item/list", {
      item_id: itemId,
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
        allItems.push({
          current_over_stock: r.current_over_stock,
          stock_by_location: r.stock_by_location, //.filter((o) => o.value !== null ),
        });
      });

      if (allItems.length) {
        // console.log("rfd", allItems);
        return onSuccess(allItems);
      } else {
        return onFailure("Item not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const postDeliveryOrder = async (
  info,
  updatedItem,
  do_total_till_now,
  onSuccess,
  onFailure
) => {
  try {
    let res;
    // console.log("do_tot", (do_total_till_now + updatedItem.reduce((p,c) => p + Number(c.delivered_qty), 0)));
    if (info.edit) {
      res = await webApi.post("/master/sales/update", {
        isDeliveryOrder: info.edit,
        sales_id: info.sales_id,
        module: "DELIVERY_ORDER",
        edit: info.edit,
        delivery_order_date: timestamp(info.txt_delivery_order_date),
        delivery_order_note: info.txt_delivery_order_note,
        delivery_order_to_date: timestamp(info.txt_delivery_period_to),
        delivery_order_from_date: timestamp(info.txt_delivery_period_from),
        delivery_order_item_details: [...info.other_dois, ...updatedItem],
        total_do: do_total_till_now, // + updatedItem.reduce((p,c) => p + Number(c.delivered_qty), 0),
      });
    } else {
    //  console.log("jdjdjdjd",updatedItem);

      res = await webApi.post("/master/sales/update", {
        module: "DELIVERY_ORDER",
        isDeliveryOrder: !info.edit,
        sales_id: info.sales_id,
        delivery_status: info.delivery_status,
        sales_status: info.sales_status,
        delivery_order_date: timestamp(info.txt_delivery_order_date),
        delivery_order_note: info.txt_delivery_order_note,
        delivery_order_to_date: timestamp(info.txt_delivery_period_to),
        delivery_order_from_date: timestamp(info.txt_delivery_period_from),
        delivery_order_item_details: updatedItem.filter(u => u.delivered_qty > 0),
        // sales_order_item_details:updatedItem,
        total_do: do_total_till_now + updatedItem.reduce((p,c) => p + Number(c.delivered_qty), 0),
      });
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