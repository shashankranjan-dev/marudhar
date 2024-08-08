
import webApi from "./webApi/webApi";
import { timestamp } from "./Utils/utils";
import { currencyFormate 
} from "../views/Pages/HelperComponent/utils";
export const getAllSalesOrderByInvoice = async (onSuccess, onFailure,addSearch ) => {
    try {
     
      const res = await webApi.post("/reports/salesOrderByInvoice/list", {
        customer_id:addSearch.ddl_customer.value,
        txt_to_date:timestamp(addSearch.txt_to_date),
        txt_from_date:timestamp(addSearch.txt_from_date),
        txt_sales_no:addSearch?.txt_sales_no,
        });
      //console.log(addSearch,"HK")
      if (res.status === 200) {

       
        const r = res.data;
        //console.log(r,"rrr")
        let allItems = [];
        let combineCharges = [];
        let invoiceCharges = [];
        let pdf = [];

        r.map((r, i) => {
          //console.log(r,"sank23")
          //console.log("sank24",r._id[0])
          
          combineCharges = r.salesOrderOtherCharges.reduce((s,l) => s.concat(l))
          invoiceCharges = r.invoiceOtherCharges.reduce((s,l) => s.concat(l))


          allItems.push({
            id: i + 1,
            sales_order_no:r._id[0],
            customer_name:r.customer_name,
            sales_status:r.sales_status,
            
            sumNetValue:combineCharges.length > 0
            ? Number(r.sumSalesOrderNetValue) +
            combineCharges.reduce(
                (s, l) =>
                  l.charge_type === "+"
                    ? s + Number(l.charge_amount)
                    : s - Number(l.charge_amount),
                0
              )
            : Number(r.sumSalesOrderNetValue),

           // sumInvoiceNetValue:r.sumInvoiceNetValue,

           sumInvoiceNetValue:invoiceCharges.length > 0
           ? Number(r.sumInvoiceNetValue.reduce(
            (sum, li) => Number(sum) + Number(li),
            0
          ),) +
           invoiceCharges.reduce(
               (s, l) =>
                 l.charge_type === "+"
                   ? s + Number(l.charge_amount)
                   : s - Number(l.charge_amount),
               0
             )
           : Number(r.sumInvoiceNetValue.reduce(
            (sum, li) => Number(sum) + Number(li),
            0
          ),),
      
            invoice_count:r.invoice_count,          
             
          });
          pdf.push ([
            i + 1,
            r._id[0],
            r.customer_name,
            combineCharges.length > 0
            ? Number(r.sumSalesOrderNetValue) +
            combineCharges.reduce(
                (s, l) =>
                  l.charge_type === "+"
                    ? s + Number(l.charge_amount)
                    : s - Number(l.charge_amount),
                0
              )
            : Number(r.sumSalesOrderNetValue),
            r.invoice_count,  
            invoiceCharges.length > 0
           ? Number(r.sumInvoiceNetValue.reduce(
            (sum, li) => Number(sum) + Number(li),
            0
          ),) +
           invoiceCharges.reduce(
               (s, l) =>
                 l.charge_type === "+"
                   ? s + Number(l.charge_amount)
                   : s - Number(l.charge_amount),
               0
             )
           : Number(r.sumInvoiceNetValue.reduce(
            (sum, li) => Number(sum) + Number(li),
            0
          ),),
          r.sales_status,



          ])
        });
        if (allItems.length) {
      
          return onSuccess(allItems,pdf);
        } else {
          return onFailure("Data not Found");
        }
      } else {
        onFailure("Something Wrong! Please Try again later " + res.data);
      }
    } catch (error) {
      onFailure("Something Wrong! Please Try again later " + error);
    }
  };


