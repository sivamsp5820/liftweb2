import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Categories } from "./pages/Categories";
import { SubCategory } from "./pages/SubCategory";
import { ProductDetail } from "./pages/ProductDetail";
import { Checkout } from "./pages/Checkout";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import { Variants } from "./pages/Variants";
import { Cart } from "./pages/Cart";
import { Auth } from "./pages/Auth";
import { MyAccount } from "./pages/MyAccount";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AgentManagement } from "./pages/admin/AgentManagement";
import { SystemConfig } from "./pages/admin/SystemConfig";
import { OrderManagement } from "./pages/management/OrderManagement";
import { CustomerCRM } from "./pages/management/CustomerCRM";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "categories", Component: Categories },
      { path: "category/:categoryId", Component: SubCategory },
      { path: "category/:categoryId/:subcategoryId/:productId/variants", Component: Variants },
      { path: "product/:productId", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "confirmation", Component: OrderConfirmation },
      { path: "auth", Component: Auth },
      { path: "account", Component: MyAccount },
    ],
  },
  // Admin Portal - Separate from main layout
  { path: "admin", Component: AdminDashboard },
  { path: "admin/agents", Component: AgentManagement },
  { path: "admin/config", Component: SystemConfig },
  // Management Portal - Separate from main layout
  { path: "management", Component: OrderManagement },
  { path: "management/crm", Component: CustomerCRM },
]);