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
]);