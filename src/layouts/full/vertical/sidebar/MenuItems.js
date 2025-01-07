import {
    IconAward,
    IconBoxMultiple,
    IconPoint,
    IconBan,
    IconStar,
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
        icon: IconReportMoney,
        href: '/users'
    },
    {
        id: uniqueId(),
        title: 'Employees',
        icon: IconCashBanknote,
        href: '/employees'
    },
    {
        id: uniqueId(),
        title: 'Companies',
        icon: IconReceipt,
        href: '/companies'
    },
    {
        id: uniqueId(),
        title: 'EmployeeWorkDay',
        icon: IconCoin,
        href: '/employee-work-day'
    },
    {
        id: uniqueId(),
        title: 'TPE',
        icon: IconDeviceTablet,
        href: '/tpe-page'
    },
    {
        id: uniqueId(),
        title: 'Luise',
        icon: IconDiamond,
        href: '/luise-page'
    },
    // {
    //     id: uniqueId(),
    //     title: 'Cheques',
    //     icon: IconReceipt2,
    //     href: '/cheque-page'
    // }
];

export default Menuitems;
