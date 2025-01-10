import {
    IconUsers,
    IconUsb,
    IconReportAnalytics,
    Icon24Hours,
    IconBuildingSkyscraper,
    IconMoodSmile,
    IconAperture,
    IconDashboard,
    IconReport,
    IconReportMoney,
    IconShoppingCart,
    IconReceipt,
    IconCoin,
    IconDeviceTablet,
    IconDiamond,
    IconReceipt2,
    IconHeartHandshake, IconCashBanknote
} from '@tabler/icons';

import {uniqueId} from 'lodash';

const Menuitems = [
    {
        navlabel: true,
        subheader: 'Rapport',
    },

    {
        id: uniqueId(),
        title: 'Dashboard',
        icon: IconDashboard,
        href: '/'
    },
    // {
    //     id: uniqueId(),
    //     title: 'Rapport credit',
    //     icon: IconReport,
    //     href: '/rapport-credit-page',
    // },
    {
        navlabel: true,
        subheader: 'Applications',
    },

    {
        id: uniqueId(),
        title: 'Users',
        icon: IconUsers,
        href: '/users'
    },
    {
        id: uniqueId(),
        title: 'Employees',
        icon: IconMoodSmile,
        href: '/employees'
    },
    {
        id: uniqueId(),
        title: 'Companies',
        icon: IconBuildingSkyscraper,
        href: '/companies'
    },
    {
        id: uniqueId(),
        title: 'WorkDay',
        icon: Icon24Hours,
        href: '/work-day'
    },
    {
        id: uniqueId(),
        title: 'Devices',
        icon: IconUsb,
        href: '/devices-page'
    },
    {
        id: uniqueId(),
        title: 'Reports',
        icon: IconReportAnalytics,
        href: '/reports-page'
    },
    // {
    //     id: uniqueId(),
    //     title: 'Cheques',
    //     icon: IconReceipt2,
    //     href: '/cheque-page'
    // }
];

export default Menuitems;
