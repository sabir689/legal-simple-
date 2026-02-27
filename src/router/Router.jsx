import { createBrowserRouter } from "react-router";
import RootLayOut from "../layouts/RootLayOut";
import PrivateRoute from "../router/PrivateRoute";
import Home from "../pages/home/Home";
import Features from "../pages/features/Features";
import Process from "../pages/process/Process";
import BlogPage from "../pages/blog/BlogPage";
import Register from "../pages/auth/Register";
import LogIn from "../pages/auth/LogIn";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import CreateContract from "../pages/dashboard/CreateContract";
import ContractsPage from "../pages/dashboard/ContractsPage";
import EscrowPage from "../pages/dashboard/EscrowPage";
import ClientsPage from "../pages/dashboard/ClientsPage";
import NotificationsPage from "../pages/dashboard/NotificationsPage";
import SettingsPage from "../pages/dashboard/SettingsPage";
import ActiveContracts from "../pages/dashboard/ActiveContracts";





export const router = createBrowserRouter([
    // 1. PUBLIC LANDING PAGES
    {
        path: '/',
        Component: RootLayOut,
        children: [
            { index: true, Component: Home },
            { path: 'features', element: <Features /> },
            { path: 'process', element: <Process /> },
            { path: 'blog', element: <BlogPage /> },
            { path: 'register', element: <Register /> },
            { path: 'logIn', element: <LogIn /> },
        ]
    },

    // 2. PRIVATE VAULT (DASHBOARD)
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            // Shared Routes
            { index: true, element: <DashboardHome /> },
            { path: 'notifications', element: <NotificationsPage></NotificationsPage> },
            { path: 'settings', element: <SettingsPage></SettingsPage> },

            // Freelancer Specific Routes
            { path: 'contracts', element: <ContractsPage></ContractsPage> },
            { path: 'create', element: <CreateContract></CreateContract> },
            { path: 'escrow', element: <EscrowPage></EscrowPage> },
            { path: 'clients', element: <ClientsPage></ClientsPage> },

            // Client Specific Routes
            { path: 'active', element: <ActiveContracts></ActiveContracts> },
            { path: 'payments', element: <div>Financial Ledger</div> },
        ]
    }
]);