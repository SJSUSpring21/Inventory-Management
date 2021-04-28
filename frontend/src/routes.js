import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import ResourceListView from 'src/views/customer/ResourceListView';
import BalanceSheetView from 'src/views/customer/ResourceListView/BalanceSheetView'
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import AddPersonView from 'src/views/InventoryView/AddPersonView';
import AddResourceView from 'src/views/InventoryView/AddResourceView';
import InwardView from 'src/views/InventoryView/InwardView';
import OutwardView from 'src/views/InventoryView/OutwardView';
import SettingsView from 'src/views/settings/SettingsView';
import AddReturnView from './views/customer/ResourceListView/AddReturnView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'resources', element: <ResourceListView /> },
      { path: 'balanceSheet', element: <BalanceSheetView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'register', element: <RegisterView /> },
      { path: 'addPerson', element: <AddPersonView /> },
      { path: 'addResource', element: <AddResourceView /> },
      { path: 'addInward', element: <InwardView /> },
      { path: 'addOutward', element: <OutwardView /> },
      { path: 'addReturn', element: <AddReturnView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
