import OrderGeneration from "views/Purchase/OrderGeneration.js";
/*/
    Direct Purchase
    Goods Received
    Purchase Return

Sales
    Wish List
    Order List
    Sales Return
    Stock Transfer

Accounts
    Receipts
    Payments
    Vouchers
    Ledger View
    

Report
    Purchase Register
    Sales Register
    Stock Register
    Day Report
    Ledger Balance

Master
    Item
    Customer
    Vendors
    Accounts
    Users
    Agents / Referrer
    Settings
   /*/

import Buttons from "views/Components/Buttons.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import ErrorPage from "views/Pages/ErrorPage.js";
import GridSystem from "views/Components/GridSystem.js";
import Icons from "views/Components/Icons.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import Notifications from "views/Components/Notifications.js";
import Panels from "views/Components/Panels.js";
import PricingPage from "views/Pages/PricingPage.js";
import SelectLocationPage from "views/Pages/SelectLocationPage";

import ModulePage from "views/Pages/SettingsPages/ModulePage";
import StatutoryPage from "views/Pages/SettingsPages/StatutoryPage";
import TermsPage from "views/Pages/SettingsPages/TermsPage";
import VehiclePage from "views/Pages/SettingsPages/VehiclePage";
import AreaPage from "views/Pages/SettingsPages/AreaPage";

import SourcePage from "views/Pages/SettingsPages/SourcePage";
import RolePage from "views/Pages/SettingsPages/RolePage";
import ItemPage from "views/Pages/ItemDetailsPage/Item";
import Category from "views/Pages/ItemDetailsPage/Category";
import AddBrandPage from "views/Pages/ItemDetailsPage/AddBrandPage";

import DirectSellPageOne from "views/Pages/DirectSellPageOne";

// import LedgerAccountPage from "views/Pages/LedgerAccountPage";

import AddItemPage from "views/Pages/ItemDetailsPage/AddItemPage";
import RTLSupport from "views/Pages/RTLSupport.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import SweetAlert from "views/Components/SweetAlert.js";
import TimelinePage from "views/Pages/Timeline.js";
import Typography from "views/Components/Typography.js";
import UserProfile from "views/Pages/UserProfile.js";

// @mui/icons-material
import Apps from "@mui/icons-material/Apps";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Image from "@mui/icons-material/Image";

import LedgerGroupPage from "views/Pages/AccountsPages/LedgerGroupPage";
import GroupsPage from "views/Pages/SettingsPages/GroupsPage";
import BankPage from "views/Pages/SettingsPages/BankPage";
import AddStatusPage from "views/Pages/SettingsPages/AddStatusPage";
import LedgerAccountPage from "views/Pages/AccountsPages/LedgerAccountPage";
import OtherChargesPage from "views/Pages/AccountsPages/OtherChargesPage";
import TaxMasterPage from "views/Pages/AccountsPages/TaxMasterPage";
import UnitMesurementPage from "views/Pages/ItemDetailsPage/UnitMesurementPage";
import AddItemPageSec from "views/Pages/ItemDetailsPage/AddItemPageSec";
import AddCustomerPage from "views/Pages/CustomerPage/CustomerPage";
import ProcurementPage from "views/Pages/ProcurementPage";
import DirectPurchasePage from "views/Pages/ProcurementPages/DirectPurchasePage";
import PurchaseOrderPage from "views/Pages/ProcurementPages/PurchaseOrderPage";
import VendorTypeForm from "views/Pages/VendorPage/VedorTypeForm";
import Associate from "views/Pages/Associate";
import IncentivesPage from "views/Pages/IncentivesPage";
import IncentivesReferencePage from "views/Pages/IncentivesReferencePage";
import ReceivedPage from "views/Pages/ProcurementPages/ReceivedPage";
import DirectPurchaseForm from "views/Pages/ProcurementPages/DirectPurchaseForm";
import CustomerListPage from "views/Pages/CustomerPage/CustomerListPage";
import customerLedgerPage from "views/Pages/CustomerPage/customerLedgerPage";
import EditInvoice from "views/Pages/Sales/EditInvoicePage";
import VendorList from "views/Pages/VendorPage/VendorList";
import InvoiceListPage from "views/Pages/Sales/InvoiceLIstPage";
import DirectInvoice from "views/Pages/Sales/DirectSalesOrder/DirectInvoice";
import PurchaseOrderForm from "views/Pages/ProcurementPages/PurchaseOrderForm";
import PendingPOPage from "views/Pages/PendingPOPage";
import PoDetailsAddForm from "views/Pages/PoDetailAddForm";
import EnquiryListPage from "views/Pages/Sales/EnquiryListPage";
import SalesQuatation from "views/Pages/Sales/Quatation";
import SalesQuatationView from "views/Pages/Sales/QuatationSelectView";
import EnquiryListView from "views/Pages/Sales/EnquiryListView";
import ItemReceivedViewPage from "views/Pages/ItemReceivedViewPage";
import ShowroomWarehousePage from "views/Pages/SettingsPages/ShowroomWarehousePage";
import ReferencesPage from "views/Pages/ReferencesPage";
import AddQuatationPage from "views/Pages/Sales/AddQuatationPage";
import AddJournalPage from "views/Pages/Accounts/AddJournalPage";
import SalesOrderPage from "views/Pages/Sales/SalesOrderPage";
import AddEnquiryPage from "views/Pages/Sales/AddEnquiryPage";
import AddNewQuatationForm from "views/Pages/Sales/AddNewQuatationForm";
import EditEnquiryPage from "views/Pages/Sales/EditEnquiryPage";
import SelectQuotationList from "views/Pages/SelectQuotationList";
import AddNewSalesOrderForm from "views/Pages/Sales/AddNewSalesOrderForm";
import InvoiceView from "views/Pages/Sales/InvoiceView";
import MenuPage from "views/Pages/SettingsPages/MenuPage";
import PurchaseReturnListPage from "views/Pages/ProcurementPages/PurchaseReturnListPage";
import AddPurchaseReturnListPage from "views/Pages/ProcurementPages/AddPurchaseReturnListPage";
import AddPurchaseReturnPage from "views/Pages/ProcurementPages/AddPurchaseReturnPage";
import EditDeliveryOrderReturn from "views/Pages/Sales/SalesReturnPages/EditSalesReturnPage";
import SalesReturnListPage from "views/Pages/Sales/SalesReturnPages/SalesReturnListPage";
import NewSalesReturnPage from "views/Pages/Sales/SalesReturnPages/NewSalesReturnPage";
import SalesReturnListViewPage from "views/Pages/Sales/SalesReturnPages/SalesReturnListViewPage";
import InvoiceListForSalesReturn from "views/Pages/Sales/SalesReturnPages/InvoiceListForSalesReturn";
import DispatchReturnPage from "views/Pages/Sales/SalesReturnPages/DispatchReturnPage";
import ReturnDispatchOrder from "views/Pages/Sales/SalesReturnPages/ReturnDispatchOrder";
import EditNewQuotationForm from "views/Pages/Sales/EditNewQuatationForm"
import EditNewSalesOrderForm from "views/Pages/Sales/EditNewSalesOrderForm"
import OutstandingBySalesOrder from "views/Pages/MisReportPage/OutstandingBySalesOrder";

import OutstandingByInvoice from "views/Pages/MisReportPage/OutstandingByInvoice";
import EditJournalPage from "views/Pages/Accounts/EditJournalPage";

import CreateDeliveryOrder from "views/Pages/Sales/CreateDeliveryOrder";
import EditDeliveryOrder from "views/Pages/Sales/EditDeliveryOrder";
import DeliveryOrdersPage from "views/Pages/Sales/DeliveryOrdersPage";

import DispatchOrderListPage from "views/Pages/Sales/DispatchPages/DispatchOrderListPage";
import DispatchOrderForm from "views/Pages/Sales/DispatchPages/DispatchOrderForm";
import DispatchOrderView from "views/Pages/Sales/DispatchPages/DispatchOrderView";

import AddGRNPage from "views/Pages/ProcurementPages/AddGRNPage";
import PurchaseView from "views/Pages/ProcurementPages/PurchaseView";
import ReceivedViewPage from "views/Pages/ProcurementPages/ReceivedViewPage";
import ReceivedEditPage from "views/Pages/ProcurementPages/ReceivedEditPage";

import DeleteDirectPurchase from "views/Pages/ProcurementPages/DeleteDirectPurchase"

import DirectPurchaseView from "views/Pages/ProcurementPages/DirectPurchaseView";
import ApproveDirectPurchaseForm from "views/Pages/ProcurementPages/ApproveDirectPurchaseForm";
import EditDirectPurchaseForm from "views/Pages/ProcurementPages/EditDirectPurchaseForm";
import ApprovedDirectPurchase from "views/Pages/ProcurementPages/ApprovedDirectPurchase";
import TobeApproveDirectPurchaseList from "views/Pages/ProcurementPages/TobeApproveDirectPurchaseList";

import ItemRecievedPage from "views/Pages/ProcurementPages/ItemRecievedPage";
import itemViewPage from "views/Pages/ItemDetailsPage/itemViewPage";

import CreateInvoice from "views/Pages/Sales/CreateInvoice";
import SelectedSalesOrderPage from "views/Pages/Sales/SelectedSalesOrderPage";
import SelectedDeliveryOrderPage from "views/Pages/Sales/SelectedDeliveryOrderPage";
import ChangePasswordPage from "views/Pages/ChangePasswordPage";
import ReceiptListPage from "views/Pages/Accounts/ReceiptListPage";

import PaymentPage from "views/Pages/Accounts/PaymentPage";
import PaymentFormPage from "views/Pages/PaymentFormPage";
import LedgerPage from "views/Pages/Accounts/LedgerPage";
////////
import PrimaryGroupPage from "views/Pages/AccountsPages/PrimaryGroupPage";
import LedgerMisPage from "views/Pages/MisReportPage/LedgerMisPage";
import LedgerBySalesOrder from "views/Pages/MisReportPage/LedgerBySalesOrder";
import JournalPage from "views/Pages/Accounts/JournalPage";
import DirectQuotation from "views/Pages/Sales/DirectQuotation/DirectQuotation";
import DirectSalesOrder from "views/Pages/Sales/DirectSalesOrder/DirectSalesOrder";
import PurchaseRegisterPage from "views/Pages/MisReportPage/PurchaseRegisterPage";
import SalesRegisterPage from "views/Pages/MisReportPage/SalesRegisterPage";
import  StockRegisterPage from "views/Pages/MisReportPage/StockRegisterPage";
import LedgerBalancePage from "views/Pages/MisReportPage/LedgerBalancePage";
import CashBookPage from "views/Pages/MisReportPage/CashBook";
import BankBookPage from "views/Pages/MisReportPage/BankBook";
import ProfitlossPage from "views/Pages/MisReportPage/ProfitlossPage";

import ProfitlossViewPage from "views/Pages/MisReportPage/ProfitlossViewPage";
import BalanceSheetPage from "views/Pages/MisReportPage/BalanceSheetPage";
import BalanceSheetViewPage from "views/Pages/MisReportPage/BalanceSheetViewPage";
import CustomerViewPage from "views/Pages/CustomerPage/CustomerViewPage";
import VendorViewPage from "views/Pages/VendorPage/VendorViewPage";
import StockTransferPage from "views/Pages/Sales/StockTransferPage/StockTransferPage";
import StockTransListPage from "views/Pages/Sales/StockTransferPage/StockTransferListPage";
import StockTransferView from "views/Pages/Sales/StockTransferPage/StockTransferView";

// MIS Report Page
import ShowroomWiseSalePage from "views/Pages/MisReportPage/ShowroomWiseSalePage";
import SalesmanWiseSalePage from "views/Pages/MisReportPage/SalesmanWiseSalePage";
import ReferenceWiseSalesPage from "views/Pages/MisReportPage/ReferenceWiseSalesPage";
import TrialbalancePage from "views/Pages/MisReportPage/TrialbalancePage";
import TradingAccountPage from "views/Pages/MisReportPage/TradingAccountPage";
import ItemQRCodeGenerator from "views/Pages/MisReportPage/ItemQRCodeGenerator";
// Icons
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// Tools Page
import StockMovementListPage from "views/Pages/StockMovementListPage";
import dataMigration from "views/Pages/dataMigration";
import Pdf from "views/Pages/Pdf";

import CustomerWiseSalesReportPage from "views/Pages/MisReportPage/CustomerWiseSalesReportPage";
import SalesOrderByInvoicePage from "views/Pages/MisReportPage/SalesOrderByInvoicePage";
import referenceItemWiseSalesReportPage from "views/Pages/MisReportPage/referenceItemWiseSalesReportPage";
import JournalByGrn from "views/Pages/MisReportPage/JournalByGrn";


import SalesmanItemwiseSalesReportPage from "views/Pages/MisReportPage/SalesmanItemwiseSalesReportPage";
import DirectPurchaseEdit from "views/Pages/ProcurementPages/DirectPurchaseEdit";
import ledgerDataStorage from "views/Pages/MisReportPage/ledgerDataStorage";
import OutstandingInvoiceFromStorage from "views/Pages/MisReportPage/OutstandingInvoiceFromStorage";
import BrandWiseReport from "views/Pages/MisReportPage/BrandWiseReport";

import WasteManager from "views/Pages/StockJournal/WasteManager";
import WasteManagerForm from "views/Pages/StockJournal/WasteManagerForm";
import SalesOrderViewPageForLedger from "views/Pages/MisReportPage/SalesOrderViewPageForLedger";
import PendingOrderPage from "views/Pages/MisReportPage/PendingOrderPage";
import FinancialMigration from "views/Pages/FinancialMigration/FinancialMigration";
import OutstandingByPurchase from "views/Pages/MisReportPage/OutstandingByPurchase";
import ShowroomWiseClosingStockPage from "./views/Pages/MisReportPage/ShowroomClosingStockPage";
import LedgerStorage from "views/Pages/FinancialMigration/LedgerStorage";
import Remigration from "views/Pages/FinancialMigration/Remigration";
import ItemOpeningClosingValuePage from "views/Pages/MisReportPage/ItemOpeningClosingStockValue";
import LedgerAccountClosingPage from "views/Pages/AccountsPages/LedgerAccountClosingPage";

import BrandWisePurchaseReport from "views/Pages/MisReportPage/BrandWisePurchaseReport";

import vendorLedgerPage from "views/Pages/CustomerPage/vendorLedgerPage";
import TrialOpeningClosingPage from "views/Pages/MisReportPage/TrialOpeningClosingPage";




export const DotIcon = () => {
  return <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />;
};

var dashRoutes = [
  {
    taskOn: "1.Dashboard",
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Sales",
    taskOn: "2.Sales",
    icon: Apps,
    state: "salestCollapse",
    views: [
      {
        path: "/sales/direct-invoice",
        component: DirectInvoice,
        taskOn:"2.6.Invoices",
        layout: "/admin",
      },
      {
        path: "/sales/selected-sales-order-view",
        taskOn:"2.3.Sales Order",
        component: SelectedSalesOrderPage,
        layout: "/admin",
      },
      {
        path: "/sales/selected-delivery-order-view",
        taskOn:"2.4.Delivery Order",
        component: SelectedDeliveryOrderPage,
        layout: "/admin",
      },
      {
        path: "/sales/quotation-add",
        taskOn:"2.2.Quotation",
        component: DirectQuotation,
        layout: "/admin",
      },
      {
        path: "/sales/sales-order-add",
        taskOn:"2.3.Sales Order",
        component: DirectSalesOrder,
        layout: "/admin",
      },
      {
        path: "/sales/add-delivery-orders-form",
        taskOn:"2.4.Delivery Order",
        component: DeliveryOrdersPage,
        layout: "/admin",
      },
      {
        path: "/sales/create-delivery-order",
        taskOn:"2.4.Delivery Order",
        component: CreateDeliveryOrder,
        layout: "/admin",
      },
      {
        path: "/sales/edit-delivery-order",
        taskOn:"2.4.Delivery Order",
        component: EditDeliveryOrder,
        layout: "/admin",
      },

      {
        path: "/sales/invoice/create",
        component: CreateInvoice,
        taskOn:"2.6.Invoices",
        layout: "/admin",
      },
      {
        path: "/sales/add-quatation",
        taskOn:"2.2.Quotation",
        component: AddQuatationPage,
        layout: "/admin",
      },
      {
        path: "/sales/add-new-quatation",
        taskOn:"2.2.Quotation",
        component: AddNewQuatationForm,
        layout: "/admin",
      },
      {
        path: "/sales/select-quotation-list",
        taskOn:"2.2.Quotation",
        component: SelectQuotationList,
        layout: "/admin",
      },
      {
        path: "/sales/add-new-sales-order",
        taskOn:"2.3.Sales Order",
        component: AddNewSalesOrderForm,
        layout: "/admin",
      },
      {
        path: "/sales/direct-Sale-one",
        component: DirectSellPageOne,
        layout: "/admin",
      },
      {
        path: "/sales/enquiry",
        name: "Enquiry",
        taskOn: "2.1.Enquiry",
        mini: <DotIcon />,
        component: EnquiryListPage,
        layout: "/admin",
      },
      {
        path: "/sales/ChangePasswordPage",
        // name: "ChangePasswordPage",
        // mini: "E",
        component: ChangePasswordPage,
        layout: "/admin",
      },
      {
        path: "/sales/add-enquiry",
        taskOn: "2.1.Enquiry",
        component: AddEnquiryPage,
        layout: "/admin",
      },
      {
        path: "/sales/edit-enquiry",
        taskOn: "2.1.Enquiry",
        component: EditEnquiryPage,
        layout: "/admin",
      },
      {
        path: "/sale/quotation",
        name: "Quotation",
        taskOn: "2.2.Quotation",
        mini: <DotIcon />,
        component: SalesQuatation,
        layout: "/admin",
      },
      {
        path: "/sale/quatation-view",
        taskOn: "2.2.Quotation",
        component: SalesQuatationView,
        layout: "/admin",
      },
      {
        path: "/sale/quatation-edit",
        taskOn: "2.2.Quotation",
        component: EditNewQuotationForm,
        layout: "/admin",
      },
      {
        path: "/sale/sale-edit",
        component: EditNewSalesOrderForm,
        layout: "/admin",
        taskOn: "2.3.Sales Order",

      },
      {
        path: "/sale/sale-order",
        name: "Sales Order",
        taskOn: "2.3.Sales Order",
        mini: <DotIcon />,
        component: SalesOrderPage,
        layout: "/admin",
      },
      {
        path: "/sale/delivery-order",
        name: "Delivery Order",
        taskOn: "2.4.Delivery Order",
        mini: <DotIcon />,
        component: DeliveryOrdersPage,
        layout: "/admin",
      },
      {
        path: "/sales/dispatch-order-list",
        component: DispatchOrderListPage,
        layout: "/admin",
        name: "Dispatch Order",
        taskOn: "2.5.Dispatch Order",
        mini: <DotIcon />,
      },
      {
        path: "/sales/dispatch-order-view",
        component: DispatchOrderView,
        taskOn: "2.5.Dispatch Order",
        layout: "/admin",
      },
      {
        path: "/sales/dispatch-order",
        component: DispatchOrderForm,
        taskOn:"2.5.Dispatch Order",
        layout: "/admin",
      },
      {
        path: "/enquiry-list-view",
        taskOn: "2.1.Enquiry",
        component: EnquiryListView,
        layout: "/admin",
      },
      {
        path: "/item-received-view",
        component: ItemReceivedViewPage,
        layout: "/admin",
      },
     
      {
        path: "/direct-purchase-view",
        component: DirectPurchaseView,
        layout: "/admin",
      },

      {
        path: "/sales/invoices",
        name: "Invoices",
        taskOn: "2.6.Invoices",
        mini: <DotIcon />,
        component: InvoiceListPage,
        layout: "/admin",
      },
      {
        path: "/sales/invoice-view",
        component: InvoiceView,
        taskOn: "2.6.Invoices",
        layout: "/admin",
      },
      {
        path: "/sales/invoice-edit",
        component: EditInvoice,
        taskOn: "2.6.Invoices",
        layout: "/admin",
      },
      // {
      //   path: "/sales/stock-transfer",
      //   name: "Stock Transfer",
      //   taskOn: "Stock Transfer",
      //   mini: <DotIcon />,
      //   component: StockTransListPage,
      //   layout: "/admin",
      // },
      // {
      //   path: "/sales/stock-transfer-add",
      //   component: StockTransferPage,
      //   taskOn: "Stock Transfer",
      //   layout: "/admin",
      // },
      // {
      //   path: "/sales/stock-transfer-edit",
      //   component: StockTransferPage,
      //   taskOn: "Stock Transfer",
      //   layout: "/admin",
      // },
      // {
      //   path: "/sales/stock-transfer-view",
      //   component: StockTransferView,
      //   taskOn: "Stock Transfer",
      //   layout: "/admin",
      // },
      {
        path: "/sales/delivery-return-list",
        name: "Return Delivery Order",
        taskOn: "2.8.Return Delivery Order",
        mini: <DotIcon />,
        component: SalesReturnListPage,
        layout: "/admin",
      },
      {
        path: "/sales/delivery-return-list-view",
        taskOn:"2.8.Return Delivery Order",
        component: SalesReturnListViewPage,
        layout: "/admin",
      },
      {
        path: "/sales/dispatch-return-list",
        name: "Return Dispatch Order",
        taskOn: "2.9.Return Dispatch Order",
        mini: <DotIcon />,
        component: ReturnDispatchOrder,
        layout: "/admin",
      },
      {
        path: "/sales/new-sales-return",
        component: NewSalesReturnPage,
        taskOn:"2.8.Return Delivery Order",

        layout: "/admin",
      },
      {
        path: "/sales/return-dispatch-invoice",
        component: EditDeliveryOrderReturn,
        taskOn:"2.9.Return Dispatch Order", 

        layout: "/admin",
      },
      {
        path: "/sales/invoices-sales-return",
        taskOn:"2.8.Return Delivery Order",
        component: InvoiceListForSalesReturn,
        layout: "/admin",
      },
      {
        path: "/sales/dispatch-return-page",
        taskOn:"2.9.Return Dispatch Order",
        component: DispatchReturnPage,
        layout: "/admin",
      },
    ],
  },

  // Temporary closed

  // {
  //   collapse: true,
  //   name: "Sales & Dispatch",
  //   icon: Apps,
  //   state: "dispatchCollapse",
  //   views: [
  //     {
  //       path: "/dispatch/dispatch-order-list",
  //       component: DispatchOrderListPage,
  //       layout: "/admin",
  //       name: "Dispatch Order",
  //       mini: (
  //         <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
  //       ),
  //     },
  //   ],
  // },
  {
    collapse: true,
    name: "Procurement",
    taskOn: "3.Procurement",
    icon: Apps,
    state: "procrumentCollapse",
    views: [
      {
        path: "/procurement/direct-purchase",
        component: DirectPurchasePage,
        layout: "/admin",
        name: "Direct Purchase",
        taskOn: "3.1.Direct Purchase",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      // {
      //   path: "/procurement/approve-direct-purchase",
      //   component: ApprovedDirectPurchase,
      //   layout: "/admin",
      //   name: "Approve Direct Purchase",
      //   mini: (
      //     <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
      //   ),
      // },
      {
        path: "/procurement/add-direct-purchase",
        taskOn:"3.1.Direct Purchase",
        component: DirectPurchaseForm,
        layout: "/admin",
      },
      {
        path: "/procurement/edit-direct-purchase",
        taskOn:"3.1.Direct Purchase",
        component: DirectPurchaseEdit,
        layout: "/admin",
      },
      {
        path: "/procurement/tobe-approve-direct-purchase",
        taskOn:"3.1.Direct Purchase",
        component: TobeApproveDirectPurchaseList,
        layout: "/admin",
      },
      {
        path: "/procurement/Edit-direct-purchase",
        taskOn:"3.1.Direct Purchase",
        component: EditDirectPurchaseForm,
        layout: "/admin",
      },
      {
        path: "/procurement/direct-purchase-view",
        taskOn:"3.1.Direct Purchase",
        component: DirectPurchaseView,
        layout: "/admin",
      },
      {
        path: "/procurement/direct-purchase-edit",
        taskOn:"3.1.Direct Purchase",
        component: DirectPurchaseEdit,
        layout: "/admin",
      },
      {
        path: "/procurement/approve-direct-purchase-form",
        taskOn:"3.1.Direct Purchase",
        component: ApproveDirectPurchaseForm,
        layout: "/admin",
      },
      {
        path: "/procurement/delete-direct-purchase",
        taskOn:"3.1.Direct Purchase",
        component: DeleteDirectPurchase,
        layout: "/admin",
      },
      {
        path: "/procurement/purchase-view",
        taskOn:"3.2.Purchase Order",
        component: PurchaseView,
        layout: "/admin",
      },
      {
        path: "/procurement/received-view",
        taskOn:"3.3.Item Received",
        component: ReceivedViewPage,
        layout: "/admin",
      },
      {
        path: "/procurement/received-edit",
        taskOn:"3.3.Item Received",
        component: ReceivedEditPage,
        layout: "/admin",
      },
      {
        path: "/procurement/purchase-order-form",
        taskOn:"3.2.Purchase Order",
        component: PurchaseOrderForm,
        layout: "/admin",
      },
      {
        path: "/procurement/po-details-add-product",
        taskOn:"3.2.Purchase Order",
        component: PoDetailsAddForm,
        layout: "/admin",
      },
      {
        path: "/procurement/add-grn",
        component: AddGRNPage,
        layout: "/admin",
        taskOn: "3.3.Item Received",
      },
      {
        path: "/procurement/purchase-order",
        component: PurchaseOrderPage,
        layout: "/admin",
        name: "Purchase Order",
        taskOn: "3.2.Purchase Order",

        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/procurement/received",
        component: ReceivedPage,
        layout: "/admin",
        name: "Item Received",
        taskOn: "3.3.Item Received",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },

      {
        path: "/procurement/purchase-return",
        component: PurchaseReturnListPage,
        layout: "/admin",
        name: "Purchase Return",
        taskOn: "3.4.Purchase Return",

        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/procurement/add-purchase-return",
        component: AddPurchaseReturnListPage,
        layout: "/admin",
        taskOn: "3.4.Purchase Return",

      },
      {
        path: "/procurement/add-purchase",
        component: AddPurchaseReturnPage,
        layout: "/admin",
        taskOn: "3.4.Purchase Return",

      },

      {
        path: "/procurement/pending-po-orders",
        component: PendingPOPage,
        layout: "/admin",
      },
      {
        path: "/procurement/item-received",
        component: ItemRecievedPage,
        layout: "/admin",
        taskOn: "3.3.Item Received",

      },
      {
        path: "/procurement/stock-transfer",
        name: "Stock Transfer",
        taskOn: "3.5.Stock Transfer",
        mini: <DotIcon />,
        component: StockTransListPage,
        layout: "/admin",
      },
      {
        path: "/procurement/stock-transfer-add",
        component: StockTransferPage,
        taskOn: "3.5.Stock Transfer",
        layout: "/admin",
      },
      {
        path: "/procurement/stock-transfer-edit",
        component: StockTransferPage,
        taskOn: "3.5.Stock Transfer",
        layout: "/admin",
      },
      {
        path: "/procurement/stock-transfer-view",
        component: StockTransferView,
        taskOn: "3.5.Stock Transfer",
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Stock Journal",
    taskOn: "7.Waste Managment",
    icon: Apps,
    state: "stockCollapse",
    views: [
      {
        path: "/stock/WasteManager",
        component: WasteManager,
        layout: "/admin",
        name: "Waste Manager",
        taskOn: "7.3.Waste Manager",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/stock/wasteManagerForm",
        taskOn: "7.3.Waste Manager",
        component: WasteManagerForm,
        layout: "/admin",
      }
    ],
  },
  {
    collapse: true,
    name: "Account",
    taskOn: "4.Account",
    icon: Apps,
    state: "Account",
    views: [
      {
        path: "/account/receipt",
        component: ReceiptListPage,
        layout: "/admin",
        name: "Receipt",
        taskOn: "4.1.Receipt",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },

      {
        path: "/account/payment",
        component: PaymentPage,
        layout: "/admin",
        name: "Payment",
        taskOn: "4.2.Payment",

        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },

      {
        path: "/account/journal",
        component: JournalPage,
        layout: "/admin",
        name: "Journal",
        taskOn: "4.3.Journal",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      // {
      //   path: "/account/ledger",
      //   component: LedgerPage,
      //   layout: "/admin",
      //   name: "Ledger",
      //   mini: (
      //     <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
      //   ),
      // },
      {
        path: "/mis-reports/ledger",
        component: LedgerMisPage,
        layout: "/admin",
        name: "Ledger",
        taskOn: "4.4.Ledger",
        mini: <DotIcon />,
      },
      {
        path: "/mis-reports/ledger-by-salesorder",
        component: LedgerBySalesOrder,
        layout: "/admin",
        name: "Ledger By Sales Order",
        taskOn: "4.5.Ledger By Sales Order",
        mini: <DotIcon />,
      },
      {
        path: "/mis-reports/Sales-order-view",
        taskOn:"4.5.Ledger By Sales Order",
        component: SalesOrderViewPageForLedger,
        layout: "/admin",
      },
      {
        path: "/account/add-journal",
        taskOn:"4.3.Journal",
        component: AddJournalPage,
        layout: "/admin",
      },
      {
        path: "/account/edit-journal",
        taskOn:"4.3.Journal",
        component: EditJournalPage,
        layout: "/admin",
      }
    ],
  },
  {
    collapse: true,
    name: "MIS Reports",
    taskOn: "5.MIS Reports",
    icon: Apps,
    state: "misReports",
    views: [
      {
        path: "/mis-reports/items-qr-code",
        component: ItemQRCodeGenerator,
        layout: "/admin",
        name: "Item QR Code Generator",
        taskOn: "5.01.Item QR Code Generator",

        mini: <DotIcon />,
      },
      {
        path: "/mis-reports/purchase-register",
        component: PurchaseRegisterPage,
        layout: "/admin",
        name: "Purchase Register",
        taskOn: "5.02.Purchase Register",

        mini: <DotIcon />,
      },
      {
        path: "/mis-reports/pending-order",
        component: PendingOrderPage,
        layout: "/admin",
        name: "Pending Order",
        taskOn: "5.02a.Pending Order",

        mini: <DotIcon />,
      },
      {
        path: "/mis-reports/journal-by-grn",
        component: JournalByGrn,
        layout: "/admin",
        name: "Journal By Grn",
        taskOn: "5.03.Journal By Grn",

        mini: <DotIcon />,
      },

      {
        path: "/mis-reports/sales-register",
        component: SalesRegisterPage,
        layout: "/admin",
        name: "Sales Register",
        taskOn: "5.04.Sales Register",
        mini: <DotIcon />,
      },
      {
        path: "/mis-reports/stock-register",
        component: StockRegisterPage,
        layout: "/admin",
        name: "Stock Register",
        taskOn: "5.05.Stock Register",
        mini: <DotIcon />,
      },

      {
        path: "/mis-reports/showroom-wise-sales",
        component: ShowroomWiseSalePage,
        layout: "/admin",
        name: "Showroom wise Closing St.",
        taskOn: "5.06.Showroom wise Closing St.",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/mis-reports/showroom-wise-Closing-Stock",
        component: ShowroomWiseClosingStockPage,
        layout: "/admin",
        name: "ShowroomClosing St.",
        taskOn: "5.06a.ShowroomClosing St.",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      // {
      //   path: "/mis-reports/salesman-wise-sales",
      //   component: SalesmanWiseSalePage,
      //   layout: "/admin",
      //   name: "Salesman wise Sales",
      //   mini: (
      //     <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
      //   ),
      // },
      {
        path: "/mis-reports/salesman-Item-wise-sales-Report",
        component: SalesmanItemwiseSalesReportPage,
        layout: "/admin",
        name: "Salesman Item Wise Sales",
        taskOn: "5.07.Salesman Item Wise Sales Report",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/mis-reports/brand-wise-report",
        component: BrandWiseReport,
        layout: "/admin",
        name: "Brand Wise Report ",
        taskOn: "5.07a.brand wise report",

        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/mis-reports/brand-wise-report-purchase",
        component: BrandWisePurchaseReport,
        layout: "/admin",
        name: "Brand Wise Purchase Report",
        taskOn: "5.07a.brand wise report",

        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/mis-reports/customer-wise-sales-Report",
        component: CustomerWiseSalesReportPage,
        layout: "/admin",
        name: "Customer wise sales report ",
        taskOn: "5.08.Customer wise sales report",

        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/mis-reports/reference-item-wise-sales-Report",
        component: referenceItemWiseSalesReportPage,
        layout: "/admin",
        name: "Reference item wise Sales ",
        taskOn: "5.09.Reference item wise Sales",

        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/mis-reports/reference-wise-sales-report",
        component: ReferenceWiseSalesPage,
        layout: "/admin",
        name: "Reference wise sales report",
        taskOn: "5.10.Reference wise sales report sales",
        mini: <DotIcon />,
      },

      {
        path: "/mis-reports/sales-order-invoice-Report",
        component: SalesOrderByInvoicePage,
        layout: "/admin",
        name: "Sales order by invoice",
        taskOn: "5.11.Sales order by invoice",

        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },

      {
        path: "/mis-reports/outstanding-by-invoice",
        component: OutstandingByInvoice,
        layout: "/admin",
        name: "Outstanding By Invoice",
        taskOn: "5.12.Outstanding By Invoice",

        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      // {
      //   path: "/mis-reports/outstanding-by-invoice-storage",
      //   component: OutstandingInvoiceFromStorage,
      //   layout: "/admin",
      //   name: "Outstanding By Invoice From Storage",
      //   taskOn: "5.13a.Outstanding By Invoice From Storage",

      //   mini: (
      //     <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
      //   ),
      // },
      {
        path: "/mis-reports/outstanding-by-sales-order",
        component: OutstandingBySalesOrder,
        layout: "/admin",
        name: "Outstanding By Sales Order",
        taskOn: "5.13.Outstanding By Sales Order",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/mis-reports/outstanding-by-purchase",
        component: OutstandingByPurchase,
        layout: "/admin",
        name: "Outstanding By Purchase",
        taskOn: "5.13a.Outstanding By Purchase",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/mis-reports/opening_closing_stock_valuation",
        component: ItemOpeningClosingValuePage,
        layout: "/admin",
        name: "Opening Closing Stock Valuation",
        taskOn: "5.13b.Opening Closing Stock Valuation",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      // {
      //   name: "Day report",
      //   mini: <DotIcon />,
      // },

      // {
      //   path: "/mis-reports/ledger",
      //   component: LedgerMisPage,
      //   layout: "/admin",
      //   name: "Ledger",
      //   mini: <DotIcon />,
      // },
      {
        path: "/mis-reports/ledger-balance",
        component: LedgerBalancePage,
        layout: "/admin",
        name: "Ledger Balance",
        taskOn: "5.14.Ledger Balance",
        mini: <DotIcon />,
      },
      // {
      //   name: "Cash Book",
      //   path: "/mis-reports/cash-book",
      //   layout: "/admin",
      //   component: CashBookPage,
      //   mini: <DotIcon />,
      // },

      // {
      //   name: "Bank Book",
      //   path: "/mis-reports/bank-book",
      //   layout: "/admin",
      //   component: BankBookPage,
      //   mini: <DotIcon />,
      // },

      {
        path: "/mis-reports/trialbalance",
        component: TrialbalancePage,
        layout: "/admin",
        name: "Trial Balance",
        taskOn: "5.15.Trial Balance",
        mini: <DotIcon />,
      },
      {
        path: "/mis-reports/trialbalanceOpeningClosing",
        component: TrialOpeningClosingPage,
        layout: "/admin",
        name: "Trial Balance Opening Closing",
        taskOn: "5.16.Trial Balance Opening Closing",
        mini: <DotIcon />,
      },

      // {
      //   path: "/mis-reports/trading-account",
      //   component: TradingAccountPage,
      //   layout: "/admin",
      //   name: "Trading Account",
      //   mini: <DotIcon />,
      // },
      {
        path: "/mis-reports/ProfitlossViewPage",
        component: ProfitlossViewPage,
        layout: "/admin",


      },
      {
        path: "/mis-reports/reference-item-wise-sales-Report",
        component: referenceItemWiseSalesReportPage,
        layout: "/admin",

      },
      {
        path: "/mis-reports/BalanceSheetViewPage",
        component: BalanceSheetViewPage,
        layout: "/admin",


      },

      {
        path: "/mis-reports/ProfitlossPage",
        component: ProfitlossPage,
        layout: "/admin",
        name: "Profit & Loss",
        taskOn: "5.16.Profit & Loss",
        mini: <DotIcon />,
      },

      {
        path: "/mis-reports/BalanceSheetPage",
        component: BalanceSheetPage,
        layout: "/admin",
        name: "Balance Sheet",
        taskOn: "5.17.Balance Sheet",
        mini: <DotIcon />,
      },
      {
        path: "/mis-reports/ledgerDataStorage",
        component: ledgerDataStorage,
        layout: "/admin",
        name: "Ledger Data Storage",
        taskOn: "5.12.Ledger Data Storage",

        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
    ],
  },
  {
    collapse: true,
    name: "Master",
    taskOn: "6.Master",
    icon: Apps,
    state: "masterCollapse",
    views: [
      {
        state: "itemCollapse",
        menuName: "Item Details",
        taskOn: "6.1.Item Details",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
        layout: "/admin",
        views: [
          {
            path: "/master/item",
            taskOn: "6.1.Item Details",
            name: "Items",
            
            mini: "I",
            component: ItemPage,
            layout: "/admin",
          },

          {
            path: "/master/category",
            component: Category,
            layout: "/admin",
            name: "Category",
            taskOn:"6.1.Item Details",
            mini: "C",
          },

          {
            path: "/master/brands",
            component: AddBrandPage,
            name: "Brand",
            taskOn:"6.1.Item Details",
            layout: "/admin",
          },
          {
            path: "/master/unit-measurement",
            component: UnitMesurementPage,
            layout: "/admin",
            name: "Unit of Measurement",
            taskOn:"6.1.Item Details",
            mini: "U",
          },
        ],
      },
      {
        path: "/master/add-item_update_stock",
        taskOn:"6.1.Item Details",
        component: AddItemPageSec,
        layout: "/admin",
      },
      
      {
        state: "itemCollapse",
        menuName: "Account",
        taskOn: "6.2.Account",
        mini: <DotIcon />,
        layout: "/admin",
        views: [
          {
            path: "/master/account/primary-group",
            component: PrimaryGroupPage,
            layout: "/admin",
            name: "Primary Group",
            taskOn: "Primary Group",

          },
          {
            path: "/master/account/ledger-group",
            component: LedgerGroupPage,
            layout: "/admin",
            name: "Ledger Group",
            taskOn: "Ledger Group",
            mini: "LG",
          },
          {
            path: "/master/account/ledger-account",
            name: "Ledger Account",
            taskOn: "Ledger Account",
            component: LedgerAccountPage,
            mini: "LA",
            layout: "/admin",
          },
          {
            path: "/master/account/ledger-account-closing",
            name: "Ledger Account Closing",
            taskOn: "Ledger Account Closing",
            component: LedgerAccountClosingPage,
            mini: "LA",
            layout: "/admin",
          },
          {
            path: "/master/account/other-charges",
            component: OtherChargesPage,
            layout: "/admin",
            name: "Other Charges",
            taskOn: "Other Charges",

            mini: "O",
          },

          {
            path: "/master/account/tax-master",
            component: TaxMasterPage,
            name: "Tax Master",
            taskOn: "Tax Master",
            layout: "/admin",
          },
        ],
      },
      {
        path: "/master/item",
        taskOn: "6.1.Item Details",
        component: ItemPage,
        layout: "/admin",
      },
      {
        path: "/master/account/primary-group",
        taskOn: "6.2.Account",
        component: PrimaryGroupPage,
        layout: "/admin",
      },
      {
        path: "/master/unit-measurement",
        taskOn:"6.1.Item Details",
        component: UnitMesurementPage,
        layout: "/admin",
        // name: "UOM",
        // mini: "U",
      },
      {
        path: "/master/settings",
        component: GroupsPage,
        taskOn: "6.10.Setting",
        layout: "/admin",
      },
      {
        path: "/master/ShowroomWarehousePage",
        component: ShowroomWarehousePage,

        layout: "/admin",
      },
      {
        path: "/master/account/ledger-account",
        component: LedgerAccountPage,
        taskOn: "6.2.Account",
        layout: "/admin",
      },
      {
        path: "/master/account/ledger-account-closing",
        component: LedgerAccountClosingPage,
        taskOn: "6.2.Account",
        layout: "/admin",
      },
      {
        path: "/master/customer",
        name: "Customer",
        taskOn: "6.3.Customer",

        mini: <DotIcon />,
        component: CustomerListPage,
        taskOn: "6.3.Customer",
        layout: "/admin",
      },
      {
        path: "/master/customerLedger",
        name: "Customer Ledger",
        // taskOn: "Customer",

        mini: <DotIcon />,
        component: customerLedgerPage,
        taskOn: "6.4.Customer Ledger",
        layout: "/admin",
      },
      
      {
        path: "/master/customer-add",
        taskOn: "6.3.Customer",
        component: AddCustomerPage,
        layout: "/admin",
      },
      {
        path: "/master/customer-view",
        taskOn: "6.3.Customer",
        component: CustomerViewPage,
        layout: "/admin",
      },

      {
        path: "/master/add-vendor",
        component: VendorTypeForm,
        layout: "/admin",
        taskOn: "6.5.Vendor",

      },
      {
        path: "/master/vendor/view",
        component: VendorViewPage,
        taskOn: "6.5.Vendor",
        layout: "/admin",
      },
      {
        path: "/master/vendors",
        name: "Vendor",
        taskOn: "6.5.Vendor",
        mini: <DotIcon />,
        component: VendorList,
        layout: "/admin",
      },

      {
        path: "/master/vendorLedger",
        name: "Vendor Ledger",    
        mini: <DotIcon />,
        component: vendorLedgerPage,
        taskOn: "6.5.1.vendor Ledger",
        layout: "/admin",
      },
      {
        path: "/master/references",
        name: "References",
        taskOn: "6.6.References",

        mini: <DotIcon />,
        component: ReferencesPage,
        layout: "/admin",
      },
      {
        path: "/master/ShowroomWarehousePage",
        component: ShowroomWarehousePage,
        mini: <DotIcon />,
        name: "Showroom / Warehouse",
        taskOn: "6.7.Showroom / Warehouse",
        layout: "/admin",
      },
      // {
      //   state: "itemCollapse",
      //   menuName: "Incentives",
      //   mini: <DotIcon />,
      //   layout: "/admin",
      //   views: [
      //     {
      //       path: "/master/incentives",
      //       component: IncentivesPage,
      //       layout: "/admin",
      //       name: "Employee",
      //       mini: <DotIcon />,
      //     },
      //     {
      //       path: "/master/incentives-reference",
      //       component: IncentivesReferencePage,
      //       layout: "/admin",
      //       name: "Reference",
      //       mini: <DotIcon />,
      //     },
      //   ],
      // },

      {
        path: "/mis-reports/cash-book",
        layout: "/admin",
        component: CashBookPage,
      },

      {
        path: "/master/associate",
        component: Associate,
        layout: "/admin",
        name: "Users",
        taskOn: "6.8.Users",
        mini: <DotIcon />,
      },
      {
        path: "/master/vehicle",
        component: VehiclePage,
        layout: "/admin",
        name: "Vehicle",
        taskOn: "6.9.Vehicle",
        mini: <DotIcon />,
      },
      {
        state: "settingCollapse",
        menuName: "Settings",
        taskOn: "6.10.Setting",

        mini: <DotIcon />,
        layout: "/admin",
        views: [
          {
            path: "/master/bank",
            component: BankPage,
            name: "Bank",
            taskOn: "6.10.Setting",
            layout: "/admin",
          },
          {
            path: "/master/settings",
            component: GroupsPage,
            name: "Group",
            taskOn: "6.10.Setting",
            mini: "I",
            layout: "/admin",
          },
          // {
          //   path: "/master/statutory",
          //   component: StatutoryPage,
          //   layout: "/admin",
          //   name: "Statutory",
          //   taskOn: "Group",

          //   mini: "S",
          // },

          // {
          //   path: "/master/module",
          //   component: ModulePage,
          //   name: "Module",
          //   taskOn: "Module",

          //   layout: "/admin",
          // },
          // {
          //   path: "/master/terms",
          //   component: TermsPage,
          //   layout: "/admin",
          //   taskOn: "6.10.Setting",
          //   name: "Module",
          //   mini: "T",
          // },



          {
            path: "/master/area",
            component: AreaPage,
            layout: "/admin",
            name: "Area",
            taskOn: "6.10.Setting",

            mini: "A",
          },

          // {
          //   path: "/master/source",
          //   component: SourcePage,
          //   layout: "/admin",
          //   name: "Source",
          //   taskOn: "6.10.Setting",
          // },
          {
            path: "/master/role",
            component: RolePage,
            layout: "/admin",
            name: "Role",
            taskOn: "6.10.Setting",
          },
          {
            path: "/master/status",
            component: AddStatusPage,
            layout: "/admin",
            name: "Status",
            taskOn: "6.10.Setting",

          },
          // {
          //   path: "/master/menu",
          //   component: MenuPage,
          //   layout: "/admin",
          //   name: "Menu",
          //   taskOn: "6.10.Setting",

          // },

        ],
      },
      {
        path: "/master/status",
        component: AddStatusPage,
        layout: "/admin",
        taskOn: "6.10.Setting",

      },
      {
        path: "/master/menu",
        component: MenuPage,
        layout: "/admin",
        taskOn: "6.10.Setting",


      },
      {
        path: "/master/role",
        component: RolePage,
        layout: "/admin",
        taskOn: "6.10.Setting",

      },
      // {
      //   path: "/master/source",
      //   component: SourcePage,
      //   layout: "/admin",
      //   taskOn: "6.10.Setting",

      // },

      {
        path: "/master/incentives",
        component: IncentivesPage,
        layout: "/admin",
        taskOn: "6.10.Setting",

      },
      {
        path: "/master/incentives-reference",
        component: IncentivesReferencePage,
        layout: "/admin",
      },

      {
        path: "/master/category",
        taskOn:"Item Details",
        component: Category,
        taskOn:"6.1.Item Details",
        layout: "/admin",
      },

      {
        path: "/master/account/other-charges",
        taskOn: "6.2.Account",
       
        component: OtherChargesPage,
        layout: "/admin",
      },
      {
        path: "/master/account/tax-master",
        taskOn: "6.2.Account",

        component: TaxMasterPage,
        layout: "/admin",
      },
      {
        path: "/master/account/ledger-group",
        taskOn: "6.2.Account",
        
        component: LedgerGroupPage,
        layout: "/admin",
      },

      {
        path: "/master/account/ledger-account",
        taskOn: "6.2.Account",

        component: LedgerAccountPage,
        layout: "/admin",
      },

      {
        path: "/master/brands",
        
        component: AddBrandPage,
        taskOn:"6.1.Item Details",

        layout: "/admin",
      },
      {
        path: "/master/item-view",
        taskOn:"6.1.Item Details",
        component: itemViewPage,
        layout: "/admin",
      },

      {
        path: "/master/add-items",
        
        component: AddItemPage,
        layout: "/admin",
        taskOn:"6.1.Item Details",

      },
      // {
      //   path: "/master/module",
        
      //   component: ModulePage,
      //   taskOn: "6.10.Setting",

      //   layout: "/admin",
      // },
      {
        path: "/master/terms",
       
        component: TermsPage,
        taskOn: "6.10.Setting",

        layout: "/admin",
      },
      {
        path: "/master/vehicle",
       
        component: VehiclePage,
        taskOn: "6.10.Setting",

        layout: "/admin",
      },


      {
        path: "/master/area",
        taskOn: "Settings",
        component: AreaPage,
        taskOn: "6.10.Setting",

        layout: "/admin",
      },


      {
        path: "/master/statutory",
        taskOn: "Settings",
        component: StatutoryPage,
        layout: "/admin",
        taskOn: "6.10.Setting",

      },
      {
        path: "/master/bank",
        taskOn: "Settings",
        component: BankPage,
        layout: "/admin",
        taskOn: "6.10.Setting",

      },
    ],
  },

  {
    path: "/login-page",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: LoginPage,
    layout: "/auth",
  },
  {
    path: "/login/select-location",
    component: SelectLocationPage,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Tools",
    taskOn: "7.Tools",
    icon: Apps,
    state: "toolCollapse",
    views: [
      // {
      //   path: "/tool/stock-movement",
      //   component: StockMovementListPage,
      //   layout: "/admin",
      //   name: "Stock Movement",
      //   taskOn: "Stock Movement",

      //   mini: <DotIcon />,
      // },
      {
        path: "/tool/data-migration",
        component: dataMigration,
        layout: "/admin",
        name: "Data Migration",
        taskOn: "7.2.Data Migration",
        mini: <DotIcon />,
      },
      {
        path: "/tool/financialMigration",
        component: FinancialMigration,
        layout: "/admin",
        name: "Financial Migration",
        taskOn: "7.2.Data Migration",
        mini: <DotIcon />,
      },
      {
        path: "/tool/ledgerStorage",
        component: LedgerStorage,
        layout: "/admin",
        name: "Ledger Storage",
        taskOn: "7.3.Ledger Storage",
        mini: <DotIcon />,
      },
      {
        path: "/tool/remigration",
        component: Remigration,
        layout: "/admin",
        name: "Remigration",
        taskOn: "7.3.Ledger Storage",
        mini: <DotIcon />,
      },
      // {
      //   path: "/tool/pdf",
      //   component: Pdf,
      //   layout: "/admin",
      //   name: "PDF",
      //   taskOn: "Pdf",
      //   mini: <DotIcon />,
      // },
    ],
  },
];
export default dashRoutes;
