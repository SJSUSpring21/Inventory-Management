import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import AccountView from "./views/account/AccountView";
import ResourceListView from "./views/customer/ResourceListView";
import BalanceSheetView from "./views/customer/ResourceListView/BalanceSheetView";
import DashboardView from "./views/reports/DashboardView";
import LoginView from "./views/auth/LoginView";
import NotFoundView from "./views/errors/NotFoundView";
import ProductListView from "./views/product/ProductListView";
import RegisterView from "./views/auth/RegisterView";
import AddPersonView from "./views/InventoryView/AddPersonView";
import AddResourceView from "./views/InventoryView/AddResourceView";
import InwardView from "./views/InventoryView/InwardView";
import OutwardView from "./views/InventoryView/OutwardView";
import SettingsView from "./views/settings/SettingsView";
import AddReturnView from "./views/customer/ResourceListView/AddReturnView";

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "account", element: <AccountView /> },
      { path: "resources", element: <ResourceListView /> },
      { path: "balanceSheet", element: <BalanceSheetView /> },
      { path: "dashboard", element: <DashboardView /> },
      { path: "products", element: <ProductListView /> },
      { path: "settings", element: <SettingsView /> },
      { path: "register", element: <RegisterView /> },
      { path: "addPerson", element: <AddPersonView /> },
      { path: "addResource", element: <AddResourceView /> },
      { path: "addInward", element: <InwardView /> },
      { path: "addOutward", element: <OutwardView /> },
      { path: "addReturn", element: <AddReturnView /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <LoginView /> },
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Navigate to="/login" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
