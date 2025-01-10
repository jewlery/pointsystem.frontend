import React, {lazy} from 'react';
import {Navigate} from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

import AuthGuard from 'src/guards/authGuard/AuthGuard';
import GuestGuard from 'src/guards/authGuard/GuestGaurd';
/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const UsersPage = Loadable(lazy(() => import('../views/users-page/UsersPage')))
const CreditPage = Loadable(lazy(() => import('../views/credit-page/CreditPage')))
const ClientCreditPage = Loadable(lazy(() => import('../views/client-credit-page/ClientCreditPage')))
const AchatPage = Loadable(lazy(() => import('../views/achat-page/AchatPage')))
const TpePage = Loadable(lazy(() => import('../views/tpe-page/TpePage')))
const CompanyPage = Loadable(lazy(() => import('../views/company-page/CompanyPage')))
const WorkDayPage = Loadable(lazy(() => import('../views/workday-page/WorkDayPage')))
const BenifPage = Loadable(lazy(() => import('../views/benif-page/BenifPage')))
const LuisePage = Loadable(lazy(() => import('../views/luise-page/LuisePage')))
const EmployeesPage = Loadable(lazy(() => import('../views/employees-page/EmployeesPage')))
const DashboardPage = Loadable(lazy(() => import('../views/dashboard-page/DashboardPage')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login2')));

const Router = [
    {
        path: '/',
        element: (
            <AuthGuard>
                <FullLayout/>
            </AuthGuard>
        ),
        children: [
            {path: '/', element: <DashboardPage/>},
            {path: '/client-credit-page', exact: true, element: <ClientCreditPage/>},
            {path: '/credit-page', exact: true, element: <CreditPage/>},
            {path: '/achat-page', exact: true, element: <AchatPage/>},
            {path: '/tpe-page', exact: true, element: <TpePage/>},
            {path: '/benif-page', exact: true, element: <BenifPage/>},
            {path: '/luise-page', exact: true, element: <LuisePage/>},
            {path: '/users', exact: true, element: <UsersPage />},
            {path: '/employees', exact: true, element: <EmployeesPage />},
            {path: '/companies', exact: true, element: <CompanyPage />},
            {path: '/work-day', exact: true, element: <WorkDayPage />},
            {path: '*', element: <Navigate to="/auth/404"/>},
        ],
    },
    {
        path: '/auth',
        element: (
            <GuestGuard>
                <BlankLayout />
            </GuestGuard>
        ),
        children: [
            { path: '/auth/login', element: <Login2 /> }
        ],
    },
    {
        path: '/auth',
        element: <BlankLayout/>,
        children: [
            {path: '404', element: <Error/>},
            {path: '*', element: <Navigate to="/auth/404"/>},
        ],
    },
];

export default Router;
