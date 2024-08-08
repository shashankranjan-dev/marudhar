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

import ModulePage from "views/Pages/SettingsPages/ModulePage";
import StatutoryPage from "views/Pages/SettingsPages/StatutoryPage";
import TermsPage from "views/Pages/SettingsPages/TermsPage";
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
import DirectPurchaseView from "views/Pages/ProcurementPages/DirectPurchaseView";
import ShowroomWarehousePage from "views/Pages/SettingsPages/ShowroomWarehousePage";
import ReferencesPage from "views/Pages/ReferencesPage";
import AddQuatationPage from "views/Pages/Sales/AddQuatationPage";
import AddJournalPage from "views/Pages/Accounts/AddJournalPage";
import SalesOrderPage from "views/Pages/Sales/SalesOrderPage";
import AddEnquiryPage from "views/Pages/Sales/AddEnquiryPage";
import AddNewQuatationForm from "views/Pages/Sales/AddNewQuatationForm";
import SelectQuotationList from "views/Pages/SelectQuotationList";
import AddNewSalesOrderForm from "views/Pages/Sales/AddNewSalesOrderForm";
import DeliveryOrdersPage from "views/Pages/Sales/DeliveryOrdersPage";
import DispatchOrderListPage from "views/Pages/DispatchPages/DispatchOrderListPage";
import DeliveryOrderView from "views/Pages/Sales/DeliveryOrderView";

import AddGRNPage from "views/Pages/ProcurementPages/AddGRNPage";
import ItemRecievedPage from "views/Pages/ProcurementPages/ItemRecievedPage";
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
import JournalPage from "views/Pages/Accounts/JournalPage";
import DirectQuotation from "views/Pages/Sales/DirectQuotation/DirectQuotation";
import DirectSalesOrder from "views/Pages/Sales/DirectSalesOrder/DirectSalesOrder";
import PurchaseRegisterPage from "views/Pages/MisReportPage/PurchaseRegisterPage";
import SalesRegisterPage from "views/Pages/MisReportPage/SalesRegisterPage";
import StockRegisterPage from "views/Pages/MisReportPage/StockRegisterPage";
import LedgerBalancePage from "views/Pages/MisReportPage/LedgerBalancePage";
import CashBookPage from "views/Pages/MisReportPage/CashBook";
import BankBookPage from "views/Pages/MisReportPage/BankBook";
import CustomerViewPage from "views/Pages/CustomerPage/CustomerViewPage";
import VendorViewPage from "views/Pages/VendorPage/VendorViewPage";

// MIS Report Page
import ShowroomWiseSalePage from "views/Pages/MisReportPage/ShowroomWiseSalePage";
import SalesmanWiseSalePage from "views/Pages/MisReportPage/SalesmanWiseSalePage";
import ReferenceWiseSalesPage from "views/Pages/MisReportPage/ReferenceWiseSalesPage";
import TrialbalancePage from "views/Pages/MisReportPage/TrialbalancePage";
import TradingAccountPage from "views/Pages/MisReportPage/TradingAccountPage";
// Icons
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export const DotIcon = () => {
  return <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />;
};

var dashRoutes = [
  {
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
    icon: Apps,
    state: "salestCollapse",
    views: [
      {
        path: "/sales/direct-invoice",
        component: DirectInvoice,
        layout: "/admin",
      },
      {
        path: "/sales/selected-sales-order-view",
        component: SelectedSalesOrderPage,
        layout: "/admin",
      },
      {
        path: "/sales/selected-delivery-order-view",
        component: SelectedDeliveryOrderPage,
        layout: "/admin",
      },

      {
        path: "/sales/quotation-add",
        component: DirectQuotation,
        layout: "/admin",
      },
      {
        path: "/sales/sales-order-add",
        component: DirectSalesOrder,
        layout: "/admin",
      },
      {
        path: "/sales/add-delivery-orders-form",
        component: DeliveryOrdersPage,
        layout: "/admin",
      },
      {
        path: "/sales/create-delivery-order",
        component: DeliveryOrderView,
        layout: "/admin",
      },

      {
        path: "/sales/invoice/create",
        component: CreateInvoice,
        layout: "/admin",
      },
      {
        path: "/sales/add-quatation",
        component: AddQuatationPage,
        layout: "/admin",
      },
      {
        path: "/sales/add-new-quatation",
        component: AddNewQuatationForm,
        layout: "/admin",
      },
      {
        path: "/sales/select-quotation-list",
        component: SelectQuotationList,
        layout: "/admin",
      },
      {
        path: "/sales/add-new-sales-order",
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
        component: AddEnquiryPage,
        layout: "/admin",
      },
      {
        path: "/sale/quatation",
        name: "Quotation",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
        component: SalesQuatation,
        layout: "/admin",
      },
      {
        path: "/sale/quatation-view",
        component: SalesQuatationView,
        layout: "/admin",
      },
      {
        path: "/sale/sale-order",
        name: "Sales Order",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
        component: SalesOrderPage,
        layout: "/admin",
      },
      {
        path: "/sale/delivery-order",
        name: "Delivery Order",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
        component: DeliveryOrdersPage,
        layout: "/admin",
      },
     
      {
        path: "/enquiry-list-view",
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
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
        component: InvoiceListPage,
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
    icon: Apps,
    state: "procrumentCollapse",
    views: [
      {
        path: "/procurement/direct-purchase",
        component: DirectPurchasePage,
        layout: "/admin",
        name: "Direct Purchase",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/procurement/add-direct-purchase",
        component: DirectPurchaseForm,
        layout: "/admin",
      },
      {
        path: "/procurement/purchase-order-form",
        component: PurchaseOrderForm,
        layout: "/admin",
      },
      {
        path: "/procurement/po-details-add-product",
        component: PoDetailsAddForm,
        layout: "/admin",
      },
      {
        path: "/procurement/add-grn",
        component: AddGRNPage,
        layout: "/admin",
      },
      {
        path: "/procurement/purchase-order",
        component: PurchaseOrderPage,
        layout: "/admin",
        name: "Purchase Order",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/procurement/received",
        component: ReceivedPage,
        layout: "/admin",
        name: "Item Received",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
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
      },
    ],
  },
  {
    collapse: true,
    name: "Account",
    icon: Apps,
    state: "Account",
    views: [
      {
        path: "/account/receipt",
        component: ReceiptListPage,
        layout: "/admin",
        name: "Receipt",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },

      {
        path: "/account/payment",
        component: PaymentPage,
        layout: "/admin",
        name: "Payment",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },

      {
        path: "/account/journal",
        component: JournalPage,
        layout: "/admin",
        name: "Journal",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/account/ledger",
        component: LedgerPage,
        layout: "/admin",
        name: "Ledger",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/account/add-journal",
        component: AddJournalPage,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "MIS Reports",
    icon: Apps,
    state: "misReports",
    views: [
      {
        path: "/mis-reports/purchase-register",
        component: PurchaseRegisterPage,
        layout: "/admin",
        name: "Purchase Register",
        mini: <DotIcon />,
      },
      {
        path: "/mis-reports/sales-register",
        component: SalesRegisterPage,
        layout: "/admin",
        name: "Sales Register",
        mini: <DotIcon />,
      },
      {
        path: "/mis-reports/stock-register",
        component: StockRegisterPage,
        layout: "/admin",
        name: "Stock Register",
        mini: <DotIcon />,
      },

      {
        path: "/mis-reports/showroom-wise-sales",
        component: ShowroomWiseSalePage,
        layout: "/admin",
        name: "Showroom wise Sales",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/mis-reports/salesman-wise-sales",
        component: SalesmanWiseSalePage,
        layout: "/admin",
        name: "Salesman wise Sales",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
      },
      {
        path: "/mis-reports/reference-wise-sales",
        component: ReferenceWiseSalesPage,
        layout: "/admin",
        name: "Reference wise Sales",
        mini: <DotIcon />,
      },
      {
        name: "Day report",
        mini: <DotIcon />,
      },

      {
        path: "/mis-reports/ledger",
        component: LedgerMisPage,
        layout: "/admin",
        name: "Ledger",
        mini: <DotIcon />,
      },
      {
        path: "/mis-reports/ledger-balance",
        component: LedgerBalancePage,
        layout: "/admin",
        name: "Ledger Balance",
        mini: <DotIcon />,
      },
      {
        name: "Cash Book",
        path: "/mis-reports/cash-book",
        layout: "/admin",
        component: CashBookPage,
        mini: <DotIcon />,
      },

      {
        name: "Bank Book",
        path: "/mis-reports/bank-book",
        layout: "/admin",
        component: BankBookPage,
        mini: <DotIcon />,
      },

      {
        path: "/mis-reports/trialbalance",
        component: TrialbalancePage,
        layout: "/admin",
        name: "Trial Balance",
        mini: <DotIcon />,
      },

      {
        path: "/mis-reports/trading-account",
        component: TradingAccountPage,
        layout: "/admin",
        name: "Trading Account",
        mini: <DotIcon />,
      },
    ],
  },
  {
    collapse: true,
    name: "Master",
    icon: Apps,
    state: "masterCollapse",
    views: [
      {
        state: "itemCollapse",
        menuName: "Item Details",
        mini: (
          <FiberManualRecordIcon style={{ fontSize: ".8rem", marginTop: 4 }} />
        ),
        layout: "/admin",
        views: [
          {
            path: "/master/item",
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
            mini: "C",
          },

          {
            path: "/master/brands",
            component: AddBrandPage,
            name: "Brand",
            layout: "/admin",
          },
          {
            path: "/master/unit-measurement",
            component: UnitMesurementPage,
            layout: "/admin",
            name: "Unit of Measurement",
            mini: "U",
          },
        ],
      },
      {
        path: "/master/add-item_update_stock",
        component: AddItemPageSec,
        layout: "/admin",
      },

      {
        state: "itemCollapse",
        menuName: "Account",
        mini: <DotIcon />,
        layout: "/admin",
        views: [
          {
            path: "/master/account/primary-group",
            component: PrimaryGroupPage,
            layout: "/admin",
            name: "Primary Group",
          },
          {
            path: "/master/account/ledger-group",
            component: LedgerGroupPage,
            layout: "/admin",
            name: "Ledger Group",
            mini: "LG",
          },
          {
            path: "/master/account/ledger-account",
            name: "Ledger Account",
            component: LedgerAccountPage,
            mini: "LA",
            layout: "/admin",
          },
          {
            path: "/master/account/other-charges",
            component: OtherChargesPage,
            layout: "/admin",
            name: "Other Charges",
            mini: "O",
          },

          {
            path: "/master/account/tax-master",
            component: TaxMasterPage,
            name: "Tax Master",
            layout: "/admin",
          },
        ],
      },
      {
        path: "/master/item",
        component: ItemPage,
        layout: "/admin",
      },
      {
        path: "/master/account/primary-group",
        component: PrimaryGroupPage,
        layout: "/admin",
      },
      {
        path: "/master/unit-measurement",
        component: UnitMesurementPage,
        layout: "/admin",
        // name: "UOM",
        // mini: "U",
      },
      {
        path: "/master/settings",
        component: GroupsPage,
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
        layout: "/admin",
      },
      {
        path: "/master/customer",
        name: "Customer",
        mini: <DotIcon />,
        component: CustomerListPage,
        layout: "/admin",
      },
      {
        path: "/master/customer-add",
        component: AddCustomerPage,
        layout: "/admin",
      },
      {
        path: "/master/customer-view",
        component: CustomerViewPage,
        layout: "/admin",
      },

      {
        path: "/master/add-vendor",
        component: VendorTypeForm,
        layout: "/admin",
      },
      {
        path: "/master/vendor/view",
        component: VendorViewPage,
        layout: "/admin",
      },
      {
        path: "/master/vendors",
        name: "Vendor",
        mini: <DotIcon />,
        component: VendorList,
        layout: "/admin",
      },
      {
        path: "/master/references",
        name: "References",
        mini: <DotIcon />,
        component: ReferencesPage,
        layout: "/admin",
      },
      {
        path: "/master/ShowroomWarehousePage",
        component: ShowroomWarehousePage,
        mini: <DotIcon />,
        name: "Showroom / Warehouse",
        layout: "/admin",
      },
      {
        state: "itemCollapse",
        menuName: "Incentives",
        mini: <DotIcon />,
        layout: "/admin",
        views: [
          {
            path: "/master/incentives",
            component: IncentivesPage,
            layout: "/admin",
            name: "Employee",
            mini: <DotIcon />,
          },
          {
            path: "/master/incentives-reference",
            component: IncentivesReferencePage,
            layout: "/admin",
            name: "Reference",
            mini: <DotIcon />,
          },
        ],
      },

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
        mini: <DotIcon />,
      },
      {
        state: "settingCollapse",
        menuName: "Settings",
        mini: <DotIcon />,
        layout: "/admin",
        views: [
          {
            path: "/master/bank",
            component: BankPage,
            name: "Bank",
          

            layout: "/admin",
          },
          {
            path: "/master/settings",
            component: GroupsPage,
            name: "Group",
            mini: "I",

            layout: "/admin",
          },
          {
            path: "/master/statutory",
            component: StatutoryPage,
            layout: "/admin",
            name: "Statutory",
            mini: "S",
          },

          {
            path: "/master/module",
            component: ModulePage,
            name: "Module",
            layout: "/admin",
          },
          {
            path: "/master/terms",
            component: TermsPage,
            layout: "/admin",
            name: "Terms",
            mini: "T",
          },
          {
            path: "/master/source",
            component: SourcePage,
            layout: "/admin",
            name: "Source",
          },
          {
            path: "/master/role",
            component: RolePage,
            layout: "/admin",
            name: "Role",
          },
        ],
      },
      {
        path: "/master/role",
        component: RolePage,
        layout: "/admin",
      },
      {
        path: "/master/source",
        component: SourcePage,
        layout: "/admin",
      },

      {
        path: "/master/incentives",
        component: IncentivesPage,
        layout: "/admin",
      },
      {
        path: "/master/incentives-reference",
        component: IncentivesReferencePage,
        layout: "/admin",
      },

      {
        path: "/master/category",
        component: Category,
        layout: "/admin",
      },

      {
        path: "/master/account/other-charges",
        component: OtherChargesPage,
        layout: "/admin",
      },
      {
        path: "/master/account/tax-master",
        component: TaxMasterPage,
        layout: "/admin",
      },
      {
        path: "/master/account/ledger-group",
        component: LedgerGroupPage,
        layout: "/admin",
      },

      {
        path: "/master/account/ledger-account",
        component: LedgerAccountPage,
        layout: "/admin",
      },

      {
        path: "/master/brands",
        component: AddBrandPage,
        layout: "/admin",
      },

      {
        path: "/master/add-items",
        component: AddItemPage,
        layout: "/admin",
      },
      {
        path: "/master/module",
        component: ModulePage,

        layout: "/admin",
      },
      {
        path: "/master/terms",
        component: TermsPage,

        layout: "/admin",
      },
      {
        path: "/master/statutory",
        component: StatutoryPage,
        layout: "/admin",
      },
      {
        path: "/master/bank",
        component: BankPage,
        layout: "/admin",
      },
    ],
  },

  // inside Menu testing
  // {
  //   collapse: true,
  //   name: "Working Progress",
  //   icon: Apps,
  //   state: "workingProgressCollapse",
  //   views: [
  //     {
  //       state: "itemCollapse",
  //       menuName: "Item Details",
  //       layout: "/admin",
  //       views: [
  //         {
  //           path: "/sales/sales-order-add",
  //           name: "Direct Quotation",
  //           mini: "D",
  //           component: DirectSalesOrder,
  //           layout: "/admin",
  //         },
  //         {
  //           path: "/item",
  //           name: "Item Details",
  //           mini: "I",
  //           component: ItemPage,
  //           layout: "/admin",
  //         },
  //         {
  //           path: "/item/category",
  //           component: Category,
  //           layout: "/admin",
  //           name: "Category",
  //           mini: "C",
  //         },
  //         {
  //           path: "/item/unit-measurement",
  //           component: UnitMesurementPage,
  //           layout: "/admin",
  //           name: "UOM",
  //           mini: "U",
  //         },
  //         {
  //           path: "/item/brands",
  //           component: AddBrandPage,
  //           layout: "/admin",
  //           name: "Brand",
  //           mini: "B",
  //         },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   collapse: true,
  //   name: "Components",
  //   rtlName: "المكونات",
  //   icon: Apps,
  //   state: "componentsCollapse",
  //   views: [
  //     {
  //       collapse: true,
  //       name: "Multi Level Collapse",
  //       rtlName: "انهيار متعدد المستويات",
  //       mini: "MC",
  //       rtlMini: "ر",
  //       state: "multiCollapse",
  //       layout: "#sample-layout",
  //       views: [
  //         {
  //           path: "/dashboard",
  //           name: "Dashboard",
  //           rtlName: "لوحة القيادة",
  //           icon: DashboardIcon,
  //           component: Dashboard,
  //           layout: "/admin",
  //         },
  //       ],
  //     },
  //   ],
  // },

  // // {
  // //   collapse: true,
  // //   name: "Pages",
  // //   rtlName: "صفحات",
  // //   icon: Image,
  // //   state: "pageCollapse",
  // //   views: [
  // //     {
  // //       path: "/pricing-page",
  // //       name: "Pricing Page",
  // //       rtlName: "عالتسعير",
  // //       mini: "PP",
  // //       rtlMini: "ع",
  // //       component: PricingPage,
  // //       layout: "/auth",
  // //     },
  // //     {
  // //       path: "/rtl-support-page",
  // //       name: "RTL Support",
  // //       rtlName: "صودعم رتل",
  // //       mini: "RS",
  // //       rtlMini: "صو",
  // //       component: RTLSupport,
  // //       layout: "/rtl",
  // //     },
  // //     {
  // //       path: "/timeline-page",
  // //       name: "Timeline Page",
  // //       rtlName: "تيالجدول الزمني",
  // //       mini: "T",
  // //       rtlMini: "تي",
  // //       component: TimelinePage,
  // //       layout: "/admin",
  // //     },
  {
    path: "/login-page",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: LoginPage,
    layout: "/auth",
  },
  //     {
  //       path: "/register-page",
  //       name: "Register Page",
  //       rtlName: "تسجيل",
  //       mini: "R",
  //       rtlMini: "صع",
  //       component: RegisterPage,
  //       layout: "/auth",
  //     },
  //     {
  //       path: "/lock-screen-page",
  //       name: "Lock Screen Page",
  //       rtlName: "اقفل الشاشة",
  //       mini: "LS",
  //       rtlMini: "هذاع",
  //       component: LockScreenPage,
  //       layout: "/auth",
  //     },
  //     {
  //       path: "/user-page",
  //       name: "User Profile",
  //       rtlName: "ملف تعريفي للمستخدم",
  //       mini: "UP",
  //       rtlMini: "شع",
  //       component: UserProfile,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/error-page",
  //       name: "Error Page",
  //       rtlName: "صفحة الخطأ",
  //       mini: "E",
  //       rtlMini: "البريد",
  //       component: ErrorPage,
  //       layout: "/auth",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Components",
  //   rtlName: "المكونات",
  //   icon: Apps,
  //   state: "componentsCollapse",
  //   views: [
  //     {
  //       collapse: true,
  //       name: "Multi Level Collapse",
  //       rtlName: "انهيار متعدد المستويات",
  //       mini: "MC",
  //       rtlMini: "ر",
  //       state: "multiCollapse",
  //       views: [
  //         {
  //           path: "#sample-path",
  //           name: "Example",
  //           rtlName: "مثال",
  //           mini: "E",
  //           rtlMini: "ه",
  //           component: () => {},
  //           layout: "#sample-layout",
  //         },
  //       ],
  //     },
  //     {
  //       path: "/buttons",
  //       name: "Buttons",
  //       rtlName: "وصفت",
  //       mini: "B",
  //       rtlMini: "ب",
  //       component: Buttons,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/grid-system",
  //       name: "Grid System",
  //       rtlName: "نظام الشبكة",
  //       mini: "GS",
  //       rtlMini: "زو",
  //       component: GridSystem,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/panels",
  //       name: "Panels",
  //       rtlName: "لوحات",
  //       mini: "P",
  //       rtlMini: "ع",
  //       component: Panels,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/sweet-alert",
  //       name: "Sweet Alert",
  //       rtlName: "الحلو تنبيه",
  //       mini: "SA",
  //       rtlMini: "ومن",
  //       component: SweetAlert,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/notifications",
  //       name: "Notifications",
  //       rtlName: "إخطارات",
  //       mini: "N",
  //       rtlMini: "ن",
  //       component: Notifications,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/icons",
  //       name: "Icons",
  //       rtlName: "الرموز",
  //       mini: "I",
  //       rtlMini: "و",
  //       component: Icons,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/typography",
  //       name: "Typography",
  //       rtlName: "طباعة",
  //       mini: "T",
  //       rtlMini: "ر",
  //       component: Typography,
  //       layout: "/admin",
  //     },
  //   ],
  // },
];
export default dashRoutes;
