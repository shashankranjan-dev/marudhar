// Not in use

// export const wishListData = [
//   {
//     enquire_serial: "1",
//     enqCustomer: "Abishake khennd",
//     enqDate: "14/8/2021",
//     enqNo: "MM/EQ/21-22/0007",
//     enqSalesExecutive: "Rajesh Sharma",
//     enqShowroom: "Showroom",
//     enqSource: "Email",
//     enqStatus: "Pending",
//     enqAction: "view-action",
//     menu: [
//       {
//         label: "View",
//         link: "/admin/enquiry-list-view",
//       },
//       {
//         label: "Create Quotation",
//         link: "/admin/sales/add-new-quatation",
//       },
//     ],
//   },
//   {
//     enquire_serial: "2",
//     enqDate: "13/8/2021",
//     enqNo: "MM/EQ/21-22/0006",
//     enqCustomer: "Ganesh Bhandav",
//     grossAmount: "121200",
//     action: "action",
//     enqSalesExecutive: "Anisha Karmakar",
//     enqShowroom: "Showroom",
//     enqSource: "Email",
//     enqStatus: "Pending",
//     enqAction: "view-action",
//     menu: [
//       {
//         label: "View",
//         link: "/admin/enquiry-list-view",
//       },
//       {
//         label: "Create Quotation",
//         link: "/admin/sales/add-new-quatation",
//       },
//     ],
//   },
//   {
//     enquire_serial: "3",
//     enqDate: "13/8/2021",
//     enqNo: "MM/EQ/21-22/0004",
//     enqCustomer: "Mushavaf Kadn",
//     enqSalesExecutive: "Md Rahitulla Hossain Gazi",
//     enqShowroom: "Showroom",
//     enqSource: "Email",
//     enqStatus: "Pending",
//     enqAction: "view-action",
//     menu: [
//       {
//         label: "View",
//         link: "/admin/enquiry-list-view",
//       },
//       {
//         label: "Create Quotation",
//         link: "/admin/sales/add-new-quatation",
//       },
//     ],
//   },
//   {
//     enquire_serial: "4",
//     enqDate: "12/8/2021",
//     enqNo: "MM/EQ/21-22/0003",
//     enqCustomer: "Naued Ahmed",
//     grossAmount: "155200",
//     enqSalesExecutive: "Raju Singh",
//     enqShowroom: "Showroom",
//     enqSource: "Email",
//     enqStatus: "Pending",
//     enqAction: "view-action",
//     menu: [
//       {
//         label: "View",
//         link: "/admin/enquiry-list-view",
//       },
//       {
//         label: "Create Quotation",
//         link: "/admin/sales/add-new-quatation",
//       },
//     ],
//   },
//   {
//     enquire_serial: "5",
//     enqDate: "12/8/2021",
//     enqNo: "MM/EQ/21-22/0002",
//     enqCustomer: "HM Plaza",
//     enqSalesExecutive: "Kapil Ale",
//     enqShowroom: "Showroom",
//     enqSource: "Email",
//     enqStatus: "Pending",
//     enqAction: "view-action",
//     menu: [
//       {
//         label: "View",
//         link: "/admin/enquiry-list-view",
//       },
//       {
//         label: "Create Quotation",
//         link: "/admin/sales/add-new-quatation",
//       },
//     ],
//   },
// ];
// import webApi from "./webApi/webApi";
// export const getAllSources = async (onSuccess, onFailure) => {
//   try {
//     const res = await webApi.post("/master/source/list", {});
//     if (res.status === 200) {
//       const r = res.data;

//       let arr = [];
//       r.map((r, i) => {
//         arr.push({
//           value: r.source_id,
//           label: r.source,
//         });
//       });
//       return onSuccess(arr);
//     } else {
//       onFailure("Something Wrong! Please Try again later" + res.data);
//     }
//   } catch (error) {
//     onFailure("Something Wrong! Please Try again later" + error);
//   }
// };
