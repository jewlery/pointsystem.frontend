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
        title: 'Credit',
        icon: IconReportMoney,
        href: '/credit-page'
    },
    {
        id: uniqueId(),
        title: 'Credit Client',
        icon: IconCashBanknote,
        href: '/client-credit-page'
    },
    {
        id: uniqueId(),
        title: 'Achat',
        icon: IconReceipt,
        href: '/achat-page'
    },
    {
        id: uniqueId(),
        title: 'Benif',
        icon: IconCoin,
        href: '/benif-page'
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
