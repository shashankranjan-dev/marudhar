

import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import {
  dateFormateField,
  dateFormate,
} from "../views/Pages/HelperComponent/utils";

export const getAllQuotation = async (onSuccess, onFailure,New,sales_id) => {
//console.log(sales_id,"New12")

  let customMenu;
  if (New.ddl_status?.label==="Sales Order Gen.") {
    customMenu = [
      {
        label: "View",
        link: "/admin/sale/quatation-view",
      },
      {
        label: "Edit",
        itemEdit: true,
        // link:"src/views/Pages/Sales/EditQuatationForm"
        link: "/admin/sales/add-new-quatation",
      },
      {
        label: "Update To Do",
        link: "/admin/sale/quatation-view",
        updateTask: true,
      },
      {
        label: "Update Status",
        link: "/admin/sale/quatation-view",
        updateStatus: true,
      },
      {
        label: "Create Sales Order",
        link: "/admin/sales/add-new-sales-order",
      },
      {
        label: "Share",
        link: "",
      },
    ];
  } 
  else if (New.ddl_status?.label==="New"){
    customMenu = [
      {
        label: "View",
        link: "/admin/enquiry-list-view",
      },
      {
        label: "Edit",
        link: "/admin/sales/add-enquiry",
        itemEdit:true,
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
        link: "/admin/sale/quatation-view",
      },
      
    ];
  }

  try {

    
    //console.log(New.ddl_status.label,"Quotation Status");
    const res = await webApi.post("/master/sales/list", {
      //query: searchQuery?.txt_keyword_pharse,
      // quotation_status:22,
      // quotation_no:qutNo,
      sales_id:sales_id
    });
    if (res.status === 200) {
      const r = res.data;
      console.log(r,"r22r")
      let j=0;
      let allItems = [];
      r.map((r, i) => {
        if (r.quotation_item_details.length) {
          if(r.quotation_no[0] === ""){}
          else{
            j=j+1;
          }
          // //console.log(j);
          // //console.log("jdjdjdjd")
          allItems.push({
            qutID:j,
            sales_id: r.sales_id,
            qutDate: dateFormate(r.quotation_date),
            qutNo: r.quotation_no[0],
            qutEnquiryNo: r.enquiry_no[0],
            qutCustomer: r.company_name,
            qutcity: r.city,
            qutstate:r.state,
            qutstreet:r.street,
            qutarea:r.area,
            qutpin:r.pin,
            qutpolice:r.police,
            qutstreet:r.street,
            qutMobile: r.customer_mobile,
            gst_no:r.gst_no,
            qutSalesExecutive: r.sales_executive_name,
            qutsales_phone:r.sales_phone,

            sales_executive_id: r.sales_executive_id,
            qutSalesSource: r.source_name,
            source_id: r.source_id,
            qutStatus: r.quotation_status,
            qutAction: "view-action",
            quotation_item_details:r.quotation_item_details,
            quotation_other_charges:r.quotation_other_charges,
            menu: customMenu,
            totalOtherCharges: r.quotation_other_charges.reduce(
              (sum, li) => li.charge_type === "+" ?
                Number(sum) + Number(li.charge_amount) :
                Number(sum) - Number(li.charge_amount)
              ,
              0
            ),
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


export const getSearchAllQuotation = async (onSuccess, onFailure, searchQuery) => {



  let customMenu;
  if (searchQuery.ddl_status.label === "Sales Order Gen.") {
    customMenu = [
      {
        label: "View",
        // link: "/admin/sale/quatation-view",
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
      //   // link:"src/views/Pages/Sales/EditQuatationForm"
      //   link: "/admin/sales/add-new-quatation",
      // },
      // {
      //   label: "Update To Do",
      //   link: "/admin/sale/quatation-view",
      //   updateTask: true,
      // },
      // {
      //   label: "Update Status",
      //   link: "/admin/sale/quatation-view",
      //   updateStatus: true,
      // },
      // {
      //   label: "Create Sales Order",
      //   link: "/admin/sales/add-new-sales-order",
      // },

      // {
      //   label: "Share",
      //   link: "",
      // },
    ];
  } else if (searchQuery.ddl_status.label === "New") {
    customMenu = [
      {
        label: "View",
        // link: "/admin/sale/quatation-view",
        clickBtn: true,

      },
      {
        label: "Edit",
        link: "/admin/sale/quatation-edit",
        itemEdit: true,
      },
      {
        label: "Update To Do",
        link: "/admin/sale/quatation-view",
        updateTask: true,
        visible: true,
      },
      {
        label: "Update Status",
        link: "/admin/sale/quatation-view",
        updateStatus: true,
        visible: true,
      },
      {
        label: "Create Sales Order",
        link: "/admin/sales/add-new-sales-order",
      },
      {
        label: "Print ",
        clickBtn: true,
        modelName: "printInvoice",
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
        // link: "/admin/sale/quatation-view",
        clickBtn: true,

      },

    ];
  }

  try {


    // const res = await webApi.post("/master/sales/list", {
    if (searchQuery.txt_keyword_pharse) {
      let res = await webApi.post("/master/keyword_pharse_quotation_search/list", {
        keyword_pharse: searchQuery.txt_keyword_pharse,
        quatation_from_date: timestamp(searchQuery.txt_quotation_date_from),
        quatation_to_date: timestamp(searchQuery.txt_quotation_date_to),
        // enquiry_status: q.ddl_status?.label != "All" ? String(q.ddl_status.value) : "",
      })
        // //console.log(res,"sen1009/res")

      if (res.status === 200) {
        let rw = res.data
        // const rw1 = rw2.sort(function(c, d) { if(c.customer_name.toLowerCase() > d.customer_name.toLowerCase() )  return //console.log(c.customer_name,d.customer_name,"sen235")} );
        // const r = rw1.sort((a, b) => b.quotation_date - a.quotation_date);
        // const r = res.data.sort((a, b) => b.quotation_date - a.quotation_date);
        let allItems = [];
        //console.log(rw,"sen1009/res")
        let k=0

        rw.map((a, b) => {

          // a.sales.length > 0 ?/
            a?.sales.map((r, i) => {
              k=k+1
              allItems.push({
                qutID: k,
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
                qutStatus: r.quotation_status,
                qutAction: "view-action",
                menu: customMenu,
              })
            })

            // : ''
        });
        if (allItems.length) {
          return onSuccess(allItems);
        } else {
          return onFailure("Quotation Not Found");
        }
      } else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    }
    else {
      let res = await webApi.post("/master/view_sales_agg/list", {

        // query: q?.txt_keyword_pharse,
        customer_id: searchQuery.ddl_customer?.value,
        quotation_no: searchQuery.txt_quotation_no,
        quotation_from_date: timestamp(searchQuery.txt_quotation_date_from),
        quotation_to_date: timestamp(searchQuery.txt_quotation_date_to),
        quotation_status: searchQuery.ddl_status?.value,
        quotation_keyword: searchQuery.txt_keyword_pharse,
        // quotation_status: searchQuery.ddl_status?.label !="All" ? searchQuery.ddl_status.value:"",
        quotation_status: searchQuery.ddl_status?.label != "All" ? String(searchQuery.ddl_status.value) : "",


      });
      if (res.status === 200) {
        const rw1 = res.data.sort(function (c, d) { 
          // if (c.customer_name.toLowerCase() > d.customer_name.toLowerCase())
           return c.customer_name - d.customer_name });
        const r = rw1.sort((a, b) => b.quotation_date - a.quotation_date);
        // const r = res.data.sort((a, b) => b.quotation_date - a.quotation_date);
        let allItems = [];
        r.map((r, i) => {

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
            qutStatus: r.quotation_status,
            qutAction: "view-action",
            menu: customMenu,
          });

        });
        if (allItems.length) {
          return onSuccess(allItems);
        } else {
          return onFailure("Quotation Not Found");
        }
      } else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    }



  } catch (error) {
    onFailure("Something Wrong! Please Try again later " + error);
  }
};

// export const getSearchAllQuotation = async (onSuccess, onFailure, searchQuery
//   ) => {


    
//   let customMenu;
//   if (searchQuery.ddl_status.label==="Sales Order Gen.") {
//     customMenu = [
//       {
//         label: "View",
//         // link: "/admin/sale/quatation-view",
//         clickBtn: true,

//       },
//       // {
//       //   label: "Edit",
//       //   itemEdit: true,
//       //   // link:"src/views/Pages/Sales/EditQuatationForm"
//       //   link: "/admin/sales/add-new-quatation",
//       // },
//       // {
//       //   label: "Update To Do",
//       //   link: "/admin/sale/quatation-view",
//       //   updateTask: true,
//       // },
//       // {
//       //   label: "Update Status",
//       //   link: "/admin/sale/quatation-view",
//       //   updateStatus: true,
//       // },
//       // {
//       //   label: "Create Sales Order",
//       //   link: "/admin/sales/add-new-sales-order",
//       // },
  
//       // {
//       //   label: "Share",
//       //   link: "",
//       // },
//     ];
//   }   else if (searchQuery.ddl_status.label==="New"){
//     customMenu = [
//       {
//         label: "View",
//         // link: "/admin/sale/quatation-view",
//         clickBtn: true,

//       },
//       {
//         label: "Edit",
//         link: "/admin/sale/quatation-edit",
//         itemEdit:true,
//       },
//       {
//         label: "Update To Do",
//         link: "/admin/sale/quatation-view",
//         updateTask: true,
//         visible: true,
//       },
//       {
//         label: "Update Status",
//         link: "/admin/sale/quatation-view",
//         updateStatus: true,
//         visible: true,
//       },
//       {
//         label: "Create Sales Order",
//         link: "/admin/sales/add-new-sales-order",
//       },
//       {
//         label: "Print ",
//         clickBtn: true,
//         modelName: "printInvoice",
//       },
//       // {
//       //   label: "Share",
//       //   link: "",
//       // },
//     ];
//   }
//   else {

//     customMenu = [
//       {
//         label: "View",
//         // link: "/admin/sale/quatation-view",
//         clickBtn: true,

//       },
      
//     ];
//   }

//   try {
 

//     // const res = await webApi.post("/master/sales/list", {
//       const res = await webApi.post("/master/view_sales_agg/list", {

//       // query: q?.txt_keyword_pharse,
//       customer_id:searchQuery.ddl_customer?.value,
//       quotation_no:searchQuery.txt_quotation_no,
//       quotation_from_date:timestamp(searchQuery.txt_quotation_date_from),
//       quotation_to_date:timestamp(searchQuery.txt_quotation_date_to),
//       quotation_status:searchQuery.ddl_status?.value,
//       quotation_keyword:searchQuery.txt_keyword_pharse,
//       // quotation_status: searchQuery.ddl_status?.label !="All" ? searchQuery.ddl_status.value:"",
//       quotation_status: searchQuery.ddl_status?.label !="All" ? String(searchQuery.ddl_status.value):"",


//     });
 
//     if (res.status === 200) {
//       const rw1 = res.data.sort(function(c, d) { if(c.customer_name.toLowerCase() > d.customer_name.toLowerCase() )  return //console.log(c.customer_name,d.customer_name,"sen235")} );
//       const r = rw1.sort((a, b) => b.quotation_date - a.quotation_date);
//       // const r = res.data.sort((a, b) => b.quotation_date - a.quotation_date);
//       let allItems = [];
//       r.map((r, i) => {
        
//           allItems.push({
//             qutID: i + 1,
//             sales_id: r.sales_id,
//             qutDate: dateFormate(r.quotation_date),
//             qutNo: r.quotation_no[0],
//             qutEnquiryNo: r.enquiry_no[0],
//             qutCustomer: r.customer_name,
//             qutMobile: r.customer_mobile,
//             qutSalesExecutive: r.sales_executive_name,
//             sales_executive_id: r.sales_executive_id,
//             qutSalesSource: r.source_name,
//             source_id: r.source_id,
//             qutStatus: r.quotation_status,
//             qutAction: "view-action",
//             menu: customMenu,
//           });
        
//       });
//       if(allItems.length){
//       return onSuccess(allItems);
//       } else {
//         return onFailure("Quotation Not Found");
//       }
//     } else {
//       onFailure("Something Wrong! Please Try again later " + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later " + error);
//   }
// };








// export const getQuotationBySalesId = async (id, onSuccess, onFailure) => {
//   try {
//     const res = await webApi.post("/master/sales/list", {
//       sales_id: id,
//     });
//     if (res.status === 200) {
//       const r = res.data;
//       let allItems = [];
//       r.map((r, i) => {
//         allItems.push({
//           sales_id: r.sales_id,
//           enqDate: dateFormate(r.enquiry_details[0].enquiry_date),
//           enqDateField: dateFormate(r.enquiry_details[0].enquiry_date),
//           enqNo: r.enquiry_no[0],
//           qutNo: r.quotation_no[0],
//           qutDate: dateFormate(r.quotation_date),

//           enqCustomer: r.customer_name,
//           enqSalesExecutive: r.sales_executive_name,
//           enqSource: r.source_name,
//           enqShowroom: r.showroom_warehouse_name,

//           ddl_enqCustomer: { label: r.customer_name, value: r.customer_id },
//           ddl_enqSalesExecutive: {
//             label: r.sales_executive_name,
//             value: r.enquiry_details[0].sales_executive_id,
//           },
//           ddl_enqShowroom: {
//             label: r.showroom_warehouse_name,
//             value: r.enquiry_details[0].showroom_warehouse_id,
//           },
//           ddl_enqSource: {
//             label: r.source_name,
//             value: r.enquiry_details[0].source_id,
//           },

//           delivery_from_date: dateFormate(
//             r.enquiry_details[0].delivery_from_date
//           ),
//           delivery_to_date: dateFormate(r.enquiry_details[0].delivery_to_date),
//           note: r.enquiry_details[0].note,
//           quotation_note: r.quotation_note,
//           status: r.quotation_status,
//           item_details: r.enquiry_item_details,
//           quotation_item_details: r.quotation_item_details,
//           quotation_other_charges :r.quotation_other_charges,
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


// new

export const getQuotationBySalesId = async (id, onSuccess, onFailure) => {
  try {
    const res = await webApi.post("/master/view_sales_agg/list", {
      sales_id: id,
     
    });
    if (res.status === 200) {
      const r = res.data;
      let allItems = [];
      r.map((r, i) => {
        console.log(r,"sankhar")
        allItems.push({
          sales_id: r.sales_id,
          enqDate: dateFormate(r.enquiry_date),
          enqDateField: dateFormate(r.enquiry_date),
          enqNo: r.enquiry_no[0],
          qutNo: r.quotation_no[0],
          qutDate: dateFormate(r.quotation_date),

          enqCustomer: r.customer_name,
          enqSalesExecutive: r.sales_executive_name,
          enqSource: r.source_name,
          enqShowroom: r.showroom_warehouse_name,

          ddl_enqCustomer: { label: r.customer_name, value: r.customer_id },
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
          // delivery_to_date: dateFormate(r.enquiry_details[0].delivery_to_date),
          // note: r.enquiry_details[0].note,
          quotation_note: r.quotation_note,
          status: r.quotation_status,
          item_details: r.enquiry_item_details,
          quotation_item_details: r.quotation_item_details,
          quotation_other_charges :r.quotation_other_charges,
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
