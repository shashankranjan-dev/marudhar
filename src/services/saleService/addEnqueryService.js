import webApi from "../webApi/webApi";
import { timestamp } from "../Utils/utils";
import {
  dateFormateField,
  currentDate,
  dateFormate,
} from "../../views/Pages/HelperComponent/utils";

export const getAllEnquiry = async (onSuccess, onFailure, New) => {

  let customMenu;
  if (New) {
    customMenu = [
      {
        label: "View",
        link: "/admin/enquiry-list-view",
        visible: true,
      },
      {
        label: "Edit",
        link: "/admin/sales/add-enquiry",
        itemEdit: true,

      },
      {
        label: "Update To Do",
        link: "/admin/enquiry-list-view",
        updateTask: true,
        visible: true,
      },
      {
        label: "Update Status",
        link: "/admin/enquiry-list-view",
        updateStatus: true,
        visible: true,
      },

      {
        label: "Create Quotation",
        link: "/admin/sales/add-new-quatation",
      },
    ];
  } else {
    customMenu = [
      {
        label: "View",
        link: "/admin/enquiry-list-view",
        visible: true,
      },
      {
        label: "Edit",
        link: "/admin/sales/add-enquiry",
        itemEdit: true,
        visible: true,
      },
      {
        label: "Update To Do",
        link: "/admin/enquiry-list-view",
        updateTask: true,
        visible: true,
      },
      {
        label: "Update Status",
        link: "/admin/enquiry-list-view",
        updateStatus: true,
        visible: true,
      },
      {
        label: "",
        link: "",
      },

    ];
  }



  try {
    const res = await webApi.post("/master/sales/list", {
      active_status: 20,
    });

    if (res.status === 200) {
      const r = res.data;

      let allItems = [];
      r.map((r, i) => {
        allItems.push({
          enquire_serial: i + 1,
          sales_id: r.sales_id,
          enqDate: dateFormate(r.enquiry_details[0].enquiry_date),
          enqNo: r.enquiry_no[0],
          enqCustomer: r.customer_name,
          customer_id: r.customer_id,
          enqSalesExecutive: r.sales_executive_name,
          sales_executive_id: r.sales_executive_id,
          enqShowroom: r.showroom_warehouse_name,
          showroom_warehouse_id: r.showroom_warehouse_id,
          enqSource: r.source_name,
          // enqSource: r.enquiry_details[0].source_id,

          source_id: r.source_id,
          enqStatus: r.enquiry_status,


          enqAction: "view-action",

          menu: customMenu,
        });
      });
      return onSuccess(allItems);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

////////New//////////////////
// export const getShowroomDetailByIdForStock = async ( itemId,showroomId,onSuccess, onFailure) => {

//   console.log(itemId,showroomId,"cheking ids");

//   try {

// //old
//     const res = await webApi.post("/reports/stockRegister/list", {
//       showroom_warehouse_id: showroomId,
//       item_id: itemId,
//       to_date:timestamp(currentDate()),
//       from_date:timestamp("01/04/2021")
//     });
//     // console.log(res,"res check")
//     if (res.status === 200) {
//       const r = res.data;
//       let allItems = [];
//       r.map((r, i) => {

//         console.log(r,"R check");
//         let stock_details = r.stock_details;
//         console.log(stock_details, "es");
//         if(stock_details) {
//           console.log("rish", stock_details.sumOpeningPlus - stock_details.sumOpeningMinus);
//           allItems.push({
//             stoClosing: Number(r.stock_by_location.quantity) + (stock_details.sumOpeningPlus - stock_details.sumOpeningMinus) + stock_details.sumPurchase - stock_details.sumSales,
//           });
//         }

//         else {
//           allItems.push({

//             stoClosing: (r.stock_by_location.quantity ? Number(r.stock_by_location.quantity) : 0),
//           });
//         }
//       });

//       console.log(allItems,"allItemsallItems")
//       if (allItems.length) {
//         return onSuccess(allItems);
//       } else {
//         return onFailure("Item not Found");
//       }
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };


export const getEnquiryBySalesId = async (id, onSuccess, onFailure) => {
  try {

    const res = await webApi.post("/master/view_sales_agg/list", {

      sales_id: id,
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      console.log(r, "eq")
      r.map((r, i) => {

        allItems.push({

          sales_id: r.sales_id,
          enqDate: dateFormate(r.enquiry_details?.enquiry_date),
          enqDateField: dateFormate(r.enquiry_details?.enquiry_date),
          enqNo: r.enquiry_no[0],
          quotation_no: r.quotation_no[0],

          enqCustomer: r.customer_name,
          enqSalesExecutive: r.sales_executive_name,
          enqSource: r.source_name,
          enqShowroom: r.showroom_warehouse_name,

          ddl_enqCustomer: { label: r.customer_name, value: r.customer_id },
          ddl_enqSalesExecutive: {
            label: r.sales_executive_name,
            value: r.enquiry_details?.sales_executive_id,
          },
          ddl_enqShowroom: {
            label: r.showroom_warehouse_name,
            value: r.enquiry_details?.showroom_warehouse_id,
          },
          ddl_enqSource: {
            label: r.source_name,
            value: r.enquiry_details?.source_id,
          },

          delivery_from_date: dateFormate(
            r.enquiry_details?.delivery_from_date
          ),
          delivery_to_date: dateFormate(r.enquiry_details?.delivery_to_date),
          note: r.enquiry_details?.note,
          status: r.enquiry_status,

          item_details: r.enquiry_item_details,
        });
      });
      return onSuccess(allItems[0]);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// Post Enquery List

export const postEnquery = async (info, allItems, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/sales/insert", {
      module: "ENQUIRY",
      customer_id: info.ddl_customer?.value,
      enquiry_status: info.enquiry_status,
      enquiry_details: {
        enquiry_date: timestamp(info.date_enq),
        source_id: info.ddl_sales_source?.value,
        sales_executive_id: info.ddl_sales_executive?.value,
        showroom_warehouse_id: info.ddl_sales_showroom?.value,
        delivery_from_date: timestamp(info.date_sales_delivery_start),
        delivery_to_date: timestamp(info.date_sales_delivery_end),
        note: info.txt_enquiry_note,
        cust_name: info.ddl_customer?.label,
        sales_exe_name: info.ddl_sales_executive?.label,
        showroom_name: info.ddl_sales_showroom?.label,
      },
      enquiry_item_details: allItems,
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

// update Enquiry
export const updateEnquery = async (info, allItems, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/sales/update", {
      sales_id: info.sales_id,
      customer_id: info.ddl_customer?.value,
      enquiry_details: {
        enquiry_date: timestamp(info.date_enq),
        source_id: info.ddl_sales_source?.value,
        sales_executive_id: info.ddl_sales_executive?.value,
        showroom_warehouse_id: info.ddl_sales_showroom?.value,
        delivery_from_date: timestamp(info.date_sales_delivery_start),
        delivery_to_date: timestamp(info.date_sales_delivery_end),
        note: info.txt_enquiry_note,
        cust_name: info.ddl_customer?.label,
        sales_exe_name: info.ddl_sales_executive?.label,
        showroom_name: info.ddl_sales_showroom?.label,
      },
      enquiry_item_details: allItems,
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

export const getAllSource = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/source/list", {});
    if (res.status === 200) {
      const r = res.data;
      let allSource = [];
      r.map((r) => {
        allSource.push({
          value: r.source_id,
          label: r.source,
        });
      });
      onSuccess(allSource);
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// Searching Items function for every place
export const getSearchItem = async (onSuccess, onFailure, q) => {
  try {
    const res = await webApi.post("/master/item/list", {
      query: q,
    });
    if (res.status === 200) {
      const r = res.data;
      console.log(r, "rarara")


      let allItems = [];
      r.map((r, i) => {

        allItems.push({
          // id: i + 1,
          id: r.item_id,
          item_id: r.item_id,
          item: r.item,
          brand_name: r.brand_name,
          stock: r.current_over_stock,
          mrp: r.mrp,
          selling_price: r.selling_price,
          cgst_percentage: r.cgst_percentage,
          igst_percentage: r.igst_percentage,
          sgst_percentage: r.sgst_percentage,
          details: r.details,
          hsn_code: r.hsn_code,
          uom_name: r.uom_name,
          uom_id: r.uom_id,
          alt_uom_id: r.alt_uom_id,
          alt_uom: r.alt_uom,
          lower_unit_value: r.lower_unit_value,
          higher_unit_value: r.higher_unit_value,
          lower_caption: r.alt_uom_name,
        });
      });

      if (allItems.length) {
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

export const getSearchEnquiry = async (onSuccess, onFailure, q) => {
  console.log(q, "2121")

  let customMenu;
  if (q.ddl_status.label === "Quoted") {
    customMenu = [
      {
        label: "View",
        // link: "/admin/enquiry-list-view",
        clickBtn: true,

      },
      // {
      //   label: "Edit",
      //   link: "/admin/sales/add-enquiry",
      //   itemEdit:true,
      // },
      // {
      //   label: "Update To Do",
      //   link: "/admin/enquiry-list-view",
      //   updateTask: true,
      //   visible: true,
      // },
      // {
      //   label: "Update Status",
      //   link: "/admin/enquiry-list-view",
      //   updateStatus: true,
      //   visible: true,
      // },
    ];
  } else if (q.ddl_status.label === "New") {
    customMenu = [
      {
        label: "View",
        // link: "/admin/enquiry-list-view",
        clickBtn: true,

      },
      {
        label: "Edit",
        link: "/admin/sales/edit-enquiry",
        itemEdit: true,
      },
      {
        label: "Update To Do",
        link: "/admin/enquiry-list-view",
        updateTask: true,
        visible: true,
      },
      {
        label: "Update Status",
        link: "/admin/enquiry-list-view",
        updateStatus: true,
        visible: true,
      },
      {
        label: "Create Quotation",
        link: "/admin/sales/add-new-quatation",
      },
    ];
  }
  else {
    customMenu = [
      {
        label: "View",
        // link: "/admin/enquiry-list-view",
        clickBtn: true,

      },

    ];
  }

  try {

    console.log(q.ddl_status.value, "hey12345");
    // const res = await webApi.post("/master/sales/list", {

    if (q.txt_keyword_pharse) {
      let res = await webApi.post("/master/keyword_pharse/list", {
        keyword_pharse: q.txt_keyword_pharse,
        enquiry_from_date: timestamp(q.txt_from_date),
        enquiry_to_date: timestamp(q.txt_to_date),
        enquiry_status: q.ddl_status?.label != "All" ? String(q.ddl_status.value) : "",
      })
      if (res.status === 200) {
        // const rw1 = res.data.sort(function(c, d) { if(c.customer_name.toLowerCase() >d.customer_name.toLowerCase() ) return 1} );
        // const r =rw1.sort((a, b) => b.enquiry_details[0].enquiry_date - a.enquiry_details[0].enquiry_date);
        // const r =rw1.sort((a, b) => b.enquiry_details.enquiry_date - a.enquiry_details.enquiry_date);


        let r1 = res.data;
        let allItems = [];
        console.log(r1, "sen0909/res1")
        let k = 0

        r1.map((a, b) => {
          // a.sales.length > 0 ?
          a?.sales.map((r, i) => {
            k = k + 1
            allItems.push({
              enquire_serial: k,
              sales_id: r.sales_id,
              // enqDate: dateFormate(r.enquiry_details[0].enquiry_date),
              enqDate: dateFormate(r.enquiry_details.enquiry_date),
              enqNo: r.enquiry_no[0],
              enqCustomer: r.customer_name,
              customer_id: r.customer_id,
              enqSalesExecutive: r.sales_executive_name,
              sales_executive_id: r.sales_executive_id,
              enqShowroom: r.showroom_warehouse_name,
              showroom_warehouse_id: r.showroom_warehouse_id,
              enqSource: r.source_name,
              source_id: r.source_id,
              enqStatus: r.enquiry_status,
              enqAction: "view-action",
              menu: customMenu,
            });
          })
          // : ''
        })
        // let allItems = [];

        // r.map((r, i) => {
        //   console.log(r, "12")
        //   allItems.push({
        //     enquire_serial: i + 1,
        //     sales_id: r.sales_id,
        //     // enqDate: dateFormate(r.enquiry_details[0].enquiry_date),
        //     enqDate: dateFormate(r.enquiry_details.enquiry_date),
        //     enqNo: r.enquiry_no[0],
        //     enqCustomer: r.customer_name,
        //     customer_id: r.customer_id,
        //     enqSalesExecutive: r.sales_executive_name,
        //     sales_executive_id: r.sales_executive_id,
        //     enqShowroom: r.showroom_warehouse_name,
        //     showroom_warehouse_id: r.showroom_warehouse_id,
        //     enqSource: r.source_name,
        //     source_id: r.source_id,
        //     enqStatus: r.enquiry_status,
        //     enqAction: "view-action",
        //     menu: customMenu,
        //   });
        // });

        if (allItems.length) {

          return onSuccess(allItems);
        } else {
          return onFailure("Enquiry not Found");
        }
      } else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    }
    else {
      let res = await webApi.post("/master/view_sales_agg/list", {

        source_id: q?.ddl_source.value,
        enq_no: q.txt_enquiry_no,
        enquiry_from_date: timestamp(q.txt_from_date),
        enquiry_to_date: timestamp(q.txt_to_date),
        keyword_pharse: q.txt_keyword_pharse,
        enquiry_status: q.ddl_status?.label != "All" ? String(q.ddl_status.value) : "",
        exclude_fields:
          ["edit_log", "invoice_details", "invoice_no", "invoice_item_details", "invoice_other_charges",
            "invoice_note",
            "invoice_task",
            "invoice_status",
            "invoice_status_note",
            "dispatch_order_item_details",
            "sales_order_date",
            "sales_order_details",
            "sales_order_item_details",
            "sales_order_no",
            "sales_order_note",
            "sales_order_other_charges",
            "sales_status",
            "sales_status_note",
            "delivery_order_details",
            "delivery_order_item_details",
            "delivery_order_no",
            "delivery_task",
            "dispatch_order_date",
            "dispatch_order_details",
            "dispatch_order_no",
            "dispatch_order_note",
            "dispatch_status",
            "dispatch_status_note",
            "dispatch_task",
            "edit_by_date",
          ]
      });

      if (res.status === 200) {
        // const rw1 = res.data.sort(function(c, d) { if(c.customer_name.toLowerCase() >d.customer_name.toLowerCase() ) return 1} );
        // const r =rw1.sort((a, b) => b.enquiry_details[0].enquiry_date - a.enquiry_details[0].enquiry_date);
        // const r =rw1.sort((a, b) => b.enquiry_details.enquiry_date - a.enquiry_details.enquiry_date);


        const r = res.data;
        let allItems = [];

        r.map((r, i) => {
          console.log(r, "12")
          allItems.push({
            enquire_serial: i + 1,
            sales_id: r.sales_id,
            // enqDate: dateFormate(r.enquiry_details[0].enquiry_date),
            enqDate: dateFormate(r.enquiry_details.enquiry_date),
            enqNo: r.enquiry_no[0],
            enqCustomer: r.customer_name,
            customer_id: r.customer_id,
            enqSalesExecutive: r.sales_executive_name,
            sales_executive_id: r.sales_executive_id,
            enqShowroom: r.showroom_warehouse_name,
            showroom_warehouse_id: r.showroom_warehouse_id,
            enqSource: r.source_name,
            source_id: r.source_id,
            enqStatus: r.enquiry_status,
            enqAction: "view-action",
            menu: customMenu,
          });
        });

        if (allItems.length) {

          return onSuccess(allItems);
        } else {
          return onFailure("Enquiry not Found");
        }
      } else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    }


    if (res.status === 200) {
      // const rw1 = res.data.sort(function(c, d) { if(c.customer_name.toLowerCase() >d.customer_name.toLowerCase() ) return 1} );
      // const r =rw1.sort((a, b) => b.enquiry_details[0].enquiry_date - a.enquiry_details[0].enquiry_date);
      // const r =rw1.sort((a, b) => b.enquiry_details.enquiry_date - a.enquiry_details.enquiry_date);


      const r = res.data;
      let allItems = [];

      r.map((r, i) => {
        console.log(r, "12")
        allItems.push({
          enquire_serial: i + 1,
          sales_id: r.sales_id,
          // enqDate: dateFormate(r.enquiry_details[0].enquiry_date),
          enqDate: dateFormate(r.enquiry_details.enquiry_date),
          enqNo: r.enquiry_no[0],
          enqCustomer: r.customer_name,
          customer_id: r.customer_id,
          enqSalesExecutive: r.sales_executive_name,
          sales_executive_id: r.sales_executive_id,
          enqShowroom: r.showroom_warehouse_name,
          showroom_warehouse_id: r.showroom_warehouse_id,
          enqSource: r.source_name,
          source_id: r.source_id,
          enqStatus: r.enquiry_status,
          enqAction: "view-action",
          menu: customMenu,
        });
      });

      if (allItems.length) {

        return onSuccess(allItems);
      } else {
        return onFailure("Enquiry not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {


    onFailure("Session out please login again " + error);
  }
};

// export const getSearchEnquiry = async (onSuccess, onFailure, q) => {
//   console.log(q,"2121")

//     let customMenu;
//     if (q.ddl_status.label==="Quoted") {
//       customMenu = [
//         {
//           label: "View",
//           // link: "/admin/enquiry-list-view",
//           clickBtn: true,

//         },
//         // {
//         //   label: "Edit",
//         //   link: "/admin/sales/add-enquiry",
//         //   itemEdit:true,
//         // },
//         // {
//         //   label: "Update To Do",
//         //   link: "/admin/enquiry-list-view",
//         //   updateTask: true,
//         //   visible: true,
//         // },
//         // {
//         //   label: "Update Status",
//         //   link: "/admin/enquiry-list-view",
//         //   updateStatus: true,
//         //   visible: true,
//         // },
//       ];
//     } else if (q.ddl_status.label==="New"){
//       customMenu = [
//         {
//           label: "View",
//           // link: "/admin/enquiry-list-view",
//           clickBtn: true,

//         },
//         {
//           label: "Edit",
//           link: "/admin/sales/edit-enquiry",
//           itemEdit:true,
//         },
//         {
//           label: "Update To Do",
//           link: "/admin/enquiry-list-view",
//           updateTask: true,
//           visible: true,
//         },
//         {
//           label: "Update Status",
//           link: "/admin/enquiry-list-view",
//           updateStatus: true,
//           visible: true,
//         },
//         {
//           label: "Create Quotation",
//           link: "/admin/sales/add-new-quatation",
//         },
//       ];
//     }
//     else {    
//       customMenu = [
//       {
//         label: "View",
//         // link: "/admin/enquiry-list-view",
//         clickBtn: true,

//       },

//     ];
//   }

//     try {

//       console.log(q.ddl_status.value,"hey12345");
//       // const res = await webApi.post("/master/sales/list", {
//       const res = await webApi.post("/master/view_sales_agg/list", {

//         source_id: q?.ddl_source.value,
//         enq_no: q.txt_enquiry_no,
//         enquiry_from_date: timestamp( q.txt_from_date),
//         enquiry_to_date: timestamp( q.txt_to_date),
//         keyword_pharse: q.txt_keyword_pharse,
//         enquiry_status: q.ddl_status?.label !="All"?String(q.ddl_status.value):"",
//         exclude_fields:
//         ["edit_log", "invoice_details", "invoice_no", "invoice_item_details", "invoice_other_charges",
//           "invoice_note",
//           "invoice_task",
//           "invoice_status",
//           "invoice_status_note",
//           "dispatch_order_item_details",
//           "sales_order_date",
//           "sales_order_details",
//           "sales_order_item_details",
//           "sales_order_no",
//           "sales_order_note",
//           "sales_order_other_charges",
//           "sales_status",
//           "sales_status_note",
//           "delivery_order_details",
//           "delivery_order_item_details",
//           "delivery_order_no",
//           "delivery_task",
//           "dispatch_order_date",
//           "dispatch_order_details",
//           "dispatch_order_no",
//           "dispatch_order_note",
//           "dispatch_status",
//           "dispatch_status_note",
//           "dispatch_task",
//           "edit_by_date",
//         ]
//       });


//       if (res.status === 200) {
//         // const rw1 = res.data.sort(function(c, d) { if(c.customer_name.toLowerCase() >d.customer_name.toLowerCase() ) return 1} );
//         // const r =rw1.sort((a, b) => b.enquiry_details[0].enquiry_date - a.enquiry_details[0].enquiry_date);
//         // const r =rw1.sort((a, b) => b.enquiry_details.enquiry_date - a.enquiry_details.enquiry_date);


//         const r=res.data;
//         let allItems = [];

//         r.map((r, i) => {
//           console.log(r,"12")
//           allItems.push({
//             enquire_serial: i +1,
//             sales_id: r.sales_id,
//             // enqDate: dateFormate(r.enquiry_details[0].enquiry_date),
//             enqDate: dateFormate(r.enquiry_details.enquiry_date),
//             enqNo: r.enquiry_no[0],
//             enqCustomer: r.customer_name,
//             customer_id: r.customer_id,
//             enqSalesExecutive: r.sales_executive_name,
//             sales_executive_id: r.sales_executive_id,
//             enqShowroom: r.showroom_warehouse_name,
//             showroom_warehouse_id: r.showroom_warehouse_id,
//             enqSource: r.source_name,
//             source_id: r.source_id,
//             enqStatus: r.enquiry_status,
//             enqAction: "view-action",
//             menu: customMenu,
//           });
//         });

//         if (allItems.length) {

//           return onSuccess(allItems);
//         } else {
//           return onFailure("Enquiry not Found");
//         }
//       } else {
//         onFailure("Something Wrong! Please Try again later " + res.data);
//       }
//     } catch (error) {


//       onFailure("Session out please login again " + error);
//     }
//   };


export const getItemDetailById = async (itemId, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/item/list", {
      item_id: itemId,
      to_date: timestamp(currentDate()),
      from_date: timestamp("01/04/2021")
    });

    // const res2=await webApi.post("/reports/stockRegister/list",{  
    //   // showroom_warehouse_id: localStorage.getItem("user_location"),
    //   item_id: itemId,

    // })


    if (res.status === 200) {
      const r = res.data;
      // const r2 = res2.data;
      let allItems = [];

      r.map((r, i) => {

        if (r.stock_details.length > 0) {
          console.log(r, "sen1305/r1")
          allItems.push({
            item_Img: r.picture_path,
            item: r.item,
            brand: r.brand_name,
            brand_id: r.brand_id,
            uom_name: r.uom_name,
            category: r.category_name,
            category_id: r.category_id,
            item_own_code: r.item_own_code,
            itemName: r.item,
            size: r.size,

            // stock:r.current_over_stock,
            //stock: Number(r2.stock_by_location.quantity) + (r2.stock_details.sumOpeningPlus - r2.stock_details.sumOpeningMinus) + r2.stock_details.sumPurchase - r2.stock_details.sumSales,
            stock: r.stock_by_location.reduce((p, c) => p + (c.quantity ? Number(c.quantity) : 0), 0)
              + (r.stock_details.reduce((p, c) => p + (c.sumOpeningPlus ? c.sumOpeningPlus : 0), 0)
                - r.stock_details.reduce((p, c) => p + (c.stock_details ? c.stock_details.sumOpeningMinus : 0), 0))
              + (r.stock_details.reduce((p, c) => p + (c.sumPurchase ? c.sumPurchase : 0), 0)
                -
                r.stock_details.reduce((p, c) => p + (c.sumSales ? c.sumSales : 0), 0))
              +
              r.stock_details.reduce((p, c) => p + (c.sumSalesReturn ? c.sumSalesReturn : 0), 0)
              -
              r.stock_details.reduce((p, c) => p + (c.sumPurchaseReturn ? c.sumPurchaseReturn : 0), 0)
              -
              r.sumWaste ? r.sumWaste:0
              ,
            mrp: r.mrp,
            details: r.details,
            hsn_code: r.hsn_code,
            stock_by_location: r.stock_by_location,
          });
        }
        else {
          console.log(r, "sen1305/r2")
          allItems.push({
            item_Img: r.picture_path,
            item: r.item,
            brand: r.brand_name,
            brand_id: r.brand_id,
            uom_name: r.uom_name,
            category: r.category_name,
            category_id: r.category_id,
            item_own_code: r.item_own_code,
            itemName: r.item,
            size: r.size,

            stock: r.current_over_stock,
            // stock: r.stock_by_location.quantity ? Number(r.stock_by_location.quantity) : 0,
            mrp: r.mrp,
            details: r.details,
            hsn_code: r.hsn_code,
            stock_by_location: r.stock_by_location,
          });
        }
      }
      );

      // }
      // else{
      //   console.log("reached else from service")
      //   console.log(res2.data,"from item view card services res2 else")
      // console.log(res.data,"from item view card services res else")
      //   r.map((r, i) => {

      //     r2.map((r2, i) => {

      //     allItems.push({
      //       item_Img: r.picture_path,
      //       item:r.item,
      //       brand: r.brand_name,
      //       brand_id: r.brand_id,
      //       uom_name: r.uom_name,
      //       category: r.category_name,
      //       category_id: r.category_id,
      //       item_own_code: r.item_own_code,
      //       itemName: r.item,
      //       size: r.size,
      //       // stock:r.current_over_stock,
      //       stock: Number(r2.stock_by_location.quantity) + (r2.stock_details.sumOpeningPlus - r2.stock_details.sumOpeningMinus) + r2.stock_details.sumPurchase - r2.stock_details.sumSales,
      //       mrp: r.mrp,
      //       details: r.details,
      //       hsn_code: r.hsn_code,
      //       stock_by_location:r.stock_by_location,
      //     });
      //   }

      // );
      // });

      // }

      console.log(allItems, "sen1305/view")
      if (allItems.length) {
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
// export const getItemDetailById = async (itemId, onSuccess, onFailure) => {
//   try {
//     const res = await webApi.post("/master/item/list",{
//       item_id: itemId,
//     });

//     const res2=await webApi.post("/reports/stockRegister/list",{
//       // showroom_warehouse_id: localStorage.getItem("user_location"),
//       item_id: itemId,
//       to_date:timestamp(currentDate()),
//       from_date:timestamp("01/04/2021")
//     })


//     if (res.status === 200) {
//       const r = res.data;
//       const r2 = res2.data;
//       let allItems = [];

//       // console.log(res.data,"from item view card services res")
//       // console.log(res2.data,"from item view card services res2")

//       // if(res2.length > 0){

//         console.log(res.data,res.status,"from item view card services res");
//         console.log(res2.data,r2.length,"from item view card services res2");

//         // let r3 = r2.filter(o => o.stock_by_location?.showroom_warehouse_id === o.stock_details?.showroom_warehouse_id);
//         // console.log("r33", r3.length);

//         r.map((r, i) => {
//           if(r2.length > 0){

//           allItems.push({
//             item_Img: r.picture_path,
//             item:r.item,
//             brand: r.brand_name,
//             brand_id: r.brand_id,
//             uom_name: r.uom_name,
//             category: r.category_name,
//             category_id: r.category_id,
//             item_own_code: r.item_own_code,
//             itemName: r.item,
//             size: r.size,

//             // stock:r.current_over_stock,
//             //stock: Number(r2.stock_by_location.quantity) + (r2.stock_details.sumOpeningPlus - r2.stock_details.sumOpeningMinus) + r2.stock_details.sumPurchase - r2.stock_details.sumSales,
//             stock: r.stock_by_location.reduce((p, c) => p + (c.quantity ? Number(c.quantity) : 0), 0) + 
//             (r2.reduce((p, c) => p + (c.stock_details ? c.stock_details.sumOpeningPlus : 0), 0) - r2.reduce((p, c) => p + (c.stock_details ? c.stock_details.sumOpeningMinus : 0)), 0)
//             + 
//             (r2.reduce((p, c) => p + (c.stock_details ? c.stock_details.sumPurchase : 0), 0) 
//             - 
//             r2.reduce((p, c) => p + (c.stock_details ? c.stock_details.sumSales : 0), 0) ) 
//             + 
//             r2.reduce((p, c) => p + (c.stock_details ? c.stock_details.sumSalesReturn : 0), 0)
//             - 
//             r2.reduce((p, c) => p + (c.stock_details ? c.stock_details.sumPurchaseReturn : 0), 0),
//             mrp: r.mrp,
//             details: r.details,
//             hsn_code: r.hsn_code,
//             stock_by_location:r.stock_by_location,
//           });
//         }
//         else{
//           console.log("stock 0 from service")
//               allItems.push({
//                 item_Img: r.picture_path,
//                 item:r.item,
//                 brand: r.brand_name,
//                 brand_id: r.brand_id,
//                 uom_name: r.uom_name,
//                 category: r.category_name,
//                 category_id: r.category_id,
//                 item_own_code: r.item_own_code,
//                 itemName: r.item,
//                 size: r.size,

//                 stock:r.current_over_stock,
//                 // stock: r.stock_by_location.quantity ? Number(r.stock_by_location.quantity) : 0,
//                 mrp: r.mrp,
//                 details: r.details,
//                 hsn_code: r.hsn_code,
//                 stock_by_location:r.stock_by_location,
//               });
//         }
//       }
//         );

//       // }
//       // else{
//       //   console.log("reached else from service")
//       //   console.log(res2.data,"from item view card services res2 else")
//       // console.log(res.data,"from item view card services res else")
//       //   r.map((r, i) => {

//       //     r2.map((r2, i) => {

//       //     allItems.push({
//       //       item_Img: r.picture_path,
//       //       item:r.item,
//       //       brand: r.brand_name,
//       //       brand_id: r.brand_id,
//       //       uom_name: r.uom_name,
//       //       category: r.category_name,
//       //       category_id: r.category_id,
//       //       item_own_code: r.item_own_code,
//       //       itemName: r.item,
//       //       size: r.size,
//       //       // stock:r.current_over_stock,
//       //       stock: Number(r2.stock_by_location.quantity) + (r2.stock_details.sumOpeningPlus - r2.stock_details.sumOpeningMinus) + r2.stock_details.sumPurchase - r2.stock_details.sumSales,
//       //       mrp: r.mrp,
//       //       details: r.details,
//       //       hsn_code: r.hsn_code,
//       //       stock_by_location:r.stock_by_location,
//       //     });
//       //   }

//         // );
//         // });

//       // }

//       console.log(allItems,"from item view card allItems from service")
//       if (allItems.length) {
//         return onSuccess(allItems);
//       } else {
//         return onFailure("Item not Found");
//       }
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };

export const getShowroomDetailById = async (itemId, showroomId, onSuccess, onFailure) => {
  try {


    const res = await webApi.post("/master/item/list", {
      showroom_warehouse_id: showroomId,
      item_id: itemId,

    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
        allItems.push({

          stock_by_location: r.stock_by_location
        });
      });

      if (allItems.length) {
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
////////New//////////////////
export const getShowroomDetailByIdForStock = async (itemId, showroomId, onSuccess, onFailure) => {

  console.log(itemId, showroomId, "cheking ids");

  try {

    //old
    const res = await webApi.post("/reports/stockRegister/list", {
      showroom_warehouse_id: showroomId,
      item_id: itemId,
      to_date: timestamp(currentDate()),
      from_date: timestamp("2021-04-01")
    });



    if (res.status === 200) {
      const rq = res.data;
      let allItems = [];

      rq.map((r, i) => {

        console.log(r, "R check for stockview");

        let stock_details = r.stock_details;
        // console.log(stock_details, "es");

        if (r.stock_details) {
          // console.log("rish", stock_details.sumOpeningPlus - stock_details.sumOpeningMinus);
          allItems.push({
            item_id: r.item_id,
            showroom_warehouse_id: r.stock_details.showroom_warehouse_id,
            quantity: Number(r.stock_by_location.length > 0 ? r.stock_by_location[0].quantity : 0) + (stock_details.sumOpeningPlus - stock_details.sumOpeningMinus) + stock_details.sumPurchase - stock_details.sumSales,
          });
        }
        else {
          allItems.push({
            item_id: r.item_id,
            showroom_warehouse_id: r.stock_by_location[0]?.showroom_warehouse_id,
            quantity: (r.stock_by_location.length > 0 ? Number(r.stock_by_location[0].quantity) : 0),
          });
        }

      });

      console.log(allItems, "allItemsallItems")
      if (allItems.length) {
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

export const getItemImgById = async (itemId, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/item/list", {
      item_id: itemId,
    });
    if (res.status === 200) {
      const r = res.data;
      console.log(r, "sen1506")
      if (r.length) {
        return onSuccess(r);
      } else {
        return onFailure("Image not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

export const getOpeningStock = async (item_id, onSuccess, onFailure) => {
  console.log(timestamp(new Date()), "sen10")
  try {
    const res = await webApi.post("/reports/stockRegisterOpening/list", {
      item_id: item_id,
      txt_from_date: timestamp(new Date() * 1000),
    });
    if (res.status === 200) {
      const r = res.data;
      let openingStock = [];
      let sum1 = 0;
      r.map((a, b) => {
        // console.log(a.stock_by_location.reduce((sum,li)=> sum1=sum1+sum.quantity?sum.quantity+li.quantity:sum1+li.quantity ),"sen0108")

        openingStock.push(
          {
            // stock: a.stock_by_location.reduce((a, b) => a + (b.quantity ? Number(b.quantity) : 0), 0) + a.sumOpeningPlus //old 1
            // stock: a.stock_by_location.quantity + a.sumOpeningPlus //old 2
            // stock: a.stock_by_location.reduce((sum,li)=> sum1=sum1+sum.quantity?sum.quantity+li.quantity:sum1+li.quantity )+ a.sumOpeningPlus //old 3
            stock: a.stock_by_location.length > 1 ?
              a.stock_by_location.reduce((sum, li) => sum1 = sum1 + sum.quantity ? sum.quantity + li.quantity : sum1 + li.quantity) + a.sumOpeningPlus  
              :
               a.sumOpeningPlus 
          }
        )
      }
      )

      if (openingStock.length) {
        console.log(openingStock, "sen09067")

        return onSuccess(openingStock);
      } else {
        return onFailure("Image not Found");
      }
    } else {
      onFailure("Something Wrong! Please Try again later " + res.data);
    }
  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }

}


export const getShowroomDetailByIdForStock2 = async (itemId, showroomId, onSuccess, onFailure) => {

  console.log(itemId, showroomId, "cheking ids");

  try {

    //old
    const res = await webApi.post("/reports/stockRegisterOpening/list", {
      showroom_warehouse_id: showroomId,
      item_id: itemId,
      to_date: timestamp(currentDate()),
      txt_from_date: timestamp(new Date()) * 1000
    });
    if (res.status === 200) {
      const rq = res.data;
      let allItems = [];

      rq.map((r, i) => {

        // console.log(r.stock_by_location, "sen10/90");
        //   console.log(showroomId, "allItemsallItems1")
        allItems.push({
          item_id: r.item_id,
          showroom_warehouse_id: r.showroom_warehouse_id,
          quantity: Number(r?.stock_by_location?.quantity > 0 ? Number(r.stock_by_location?.quantity) + Number(r.sumOpeningPlus) : r.sumOpeningPlus)
        })

      });

      console.log(allItems, "allItemsallItems")
      if (allItems.length) {
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


// Searching Items function for every place
export const getItems = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/item/list", {
      // query: q,
    });
    if (res.status === 200) {
      const r = res.data;

      let allItems = [];
      r.map((r, i) => {

        allItems.push({
          // id: i + 1,
          label:r.item,
          value:r.item_id,
        });
      });

      if (allItems.length) {
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