import { createBrowserRouter } from "react-router-dom";
import EnhancedAdminDashboard from "../pages/EnhancedAdminDashboard.jsx";
import Homepage from "../pages/Homepage.jsx";
import Login from "../pages/Login.jsx";
import CardPage from "../pages/CardPage.jsx";
import TermsPage from "../pages/TermsPage.jsx";
import PrivacyPage from "../pages/PrivacyPage.jsx";
import GroupTicketsPage from "../pages/GroupTicketsPage.jsx";
import RegisterSuccessPage from "../pages/RegisterSuccessPage.jsx";
import DynamicRegisterPage from "../pages/DynamicRegisterPage.jsx";
import RegistrationSuccessPage from "../pages/RegistrationSuccessPage.jsx";

export const routes = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <Login /> }, 
  { path: "/managexcel", element: <EnhancedAdminDashboard /> },
  { path: "/card/:id", element: <CardPage /> },
  { path: "/group-tickets/:groupId", element: <GroupTicketsPage /> },
  { path: "/terms", element: <TermsPage /> },
  { path: "/privacy", element: <PrivacyPage /> },
  { path: "/register", element: <DynamicRegisterPage /> },
  { path: "/register-success/:id", element: <RegisterSuccessPage /> },
  { path: "/registration-success", element: <RegistrationSuccessPage /> },
]);