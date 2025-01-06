import React from 'react';
import {Link} from 'react-router-dom';
import {Box, CardContent, Grid, Typography} from '@mui/material';

import icon1 from '../../../assets/images/svgs/icon-connect.svg';
import icon2 from '../../../assets/images/svgs/icon-user-male.svg';
import icon3 from '../../../assets/images/svgs/icon-briefcase.svg';
import icon4 from '../../../assets/images/svgs/icon-mailbox.svg';
import icon5 from '../../../assets/images/svgs/icon-favorites.svg';
import icon6 from '../../../assets/images/svgs/icon-speech-bubble.svg';
import icon7 from '../../../assets/images/svgs/payment-terminal.svg';
import icon8 from '../../../assets/images/svgs/cheque.svg';
import icon9 from '../../../assets/images/svgs/earning.svg';
import icon10 from '../../../assets/images/svgs/bank.svg';
import icon11 from '../../../assets/images/svgs/sac-gold.svg';
import icon12 from '../../../assets/images/svgs/gold.svg';
import icon13 from '../../../assets/images/svgs/LoanIcon.svg';
import {toFixedWithoutRounding} from "../../../utils/helper";


const topcards = [
    {
        href: '/user-profile',
        icon: icon2,
        title: 'CAPITAL VENDU',
        name: 'capital_vendu',
        digits: '3,685 DH',
        bgcolor: 'primary',
        currency: true,
    },
    {
        href: '/apps/blog/posts',
        icon: icon3,
        title: 'CHAIFFRE D\'AFFAIRE',
        name: 'turnover',
        digits: '256K DH',
        bgcolor: 'warning',
        currency: true,
    },
    {
        href: '/apps/calendar',
        icon: icon4,
        title: 'STOCK VENDU',
        name: 'stock_vendu',
        digits: '932',
        bgcolor: 'secondary',
        currency: false,
    },
    {
        href: '/apps/email',
        icon: icon5,
        title: 'LES CHARGES',
        name: 'expenses',
        digits: '348K DH',
        bgcolor: 'error',
        currency: true,
    },
    {
        href: '/apps/chats',
        icon: icon6,
        title: 'Bénéfice',
        name: 'capital_benefit',
        digits: '96K DH',
        bgcolor: 'success',
        currency: true,
    },
    {
        href: '/apps/chats',
        icon: icon6,
        title: 'Bénéfice Net',
        name: 'benefice_net',
        digits: '96K DH',
        bgcolor: 'success',
        currency: true,
    },
    {
        href: '/apps/contacts',
        icon: icon1,
        title: 'CRÉDIT',
        name: 'credit',
        digits: '48K DH',
        bgcolor: 'error',
        currency: true,
    },
    {
        href: '/apps/contacts',
        icon: icon7,
        title: 'TPE',
        name: 'tpe',
        digits: '48K DH',
        bgcolor: 'primary',
        currency: true,
    },
    {
        href: '/apps/contacts',
        icon: icon8,
        title: 'Chèque',
        name: 'cheque',
        digits: '48K DH',
        bgcolor: 'warning',
        currency: true,
    },
    {
        href: '/apps/contacts',
        icon: icon9,
        title: 'Bénéfice div',
        name: 'benefit',
        digits: '48K DH',
        bgcolor: 'primary',
        currency: true,
    },
    {
        href: '/apps/contacts',
        icon: icon10,
        name: 'banque',
        title: 'Banque',
        digits: '48K DH',
        bgcolor: 'info',
        currency: true,
    },
    {
        href: '/apps/contacts',
        icon: icon11,
        title: 'Achat d\'or chedaya',
        name: 'achat_chdaya_total',
        digits: '48K DH',
        bgcolor: 'warning',
        currency: true,
    },
    {
        href: '/apps/contacts',
        icon: icon12,
        title: 'Achat d\'or neuf',
        name: 'achat_neuf_total',
        digits: '48K DH',
        bgcolor: 'warning',
        currency: true,
    },
    {
        href: '/apps/contacts',
        icon: icon12,
        title: 'Cash estimate',
        name: 'estimation_caisse',
        digits: '48K DH',
        bgcolor: 'success',
        currency: true,
    },
];

const TopCards = ({data}) => {
    return (
        <Grid container spacing={3} mt={3}>
            {topcards.map((topcard, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <Box>

                        <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
                            <CardContent>
                                <img src={topcard.icon} alt={topcard.icon} width="50"/>
                                <Typography
                                    color={topcard.bgcolor + '.main'}
                                    mt={1}
                                    variant="subtitle1"
                                    fontWeight={600}
                                >
                                    {topcard.title}
                                </Typography>
                                <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                                    {data[topcard.name] || 0} {topcard.currency && "DH"}
                                </Typography>
                            </CardContent>
                        </Box>
                        {
                            topcard.name == "stock_vendu" && (
                                <Box gap="5px" flexDirection="row" display="flex" justifyContent="space-between"
                                     flexWrap="wrap">
                                    <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center" marginTop="1em"
                                         padding="1em">
                                        <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                                            <>
                                                {toFixedWithoutRounding(data["capital_vendu"] / data[topcard.name], 2)}
                                                <sub><small>p/g</small></sub></>

                                        </Typography>
                                    </Box>
                                    <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center" marginTop="1em"
                                         padding="1em">
                                        <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                                            <>
                                                {toFixedWithoutRounding(data["turnover"] / data[topcard.name], 2)}
                                                <sub><small>p/g</small></sub></>

                                        </Typography>
                                    </Box>
                                </Box>
                            )
                        }

                        {
                            topcard.name == "achat_chdaya_total" && (
                                <Box gap="5px" flexDirection="row" display="flex" justifyContent="space-between">
                                    <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center" marginTop="1em"
                                         padding="1em">
                                        <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                                            {toFixedWithoutRounding(data["achat_chdaya_weight"] , 2)}
                                            <sub><small>g</small></sub>
                                        </Typography>
                                    </Box>
                                    <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center" marginTop="1em"
                                         padding="1em">
                                        <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                                            {toFixedWithoutRounding(data[topcard.name] / data["achat_chdaya_weight"] ,2)}
                                            <sub><small>prix/g</small></sub>
                                        </Typography>
                                    </Box>
                                </Box>
                            )
                        }


                        {
                            topcard.name == "achat_neuf_total" && (
                                <Box gap="5px" flexDirection="row" display="flex" justifyContent="space-between">
                                    <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center" marginTop="1em"
                                         padding="1em">
                                        <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                                            {toFixedWithoutRounding(data["achat_neuf_weight"] , 2)}
                                            <sub><small>g</small></sub>
                                        </Typography>
                                    </Box>
                                    <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center" marginTop="1em"
                                         padding="1em">
                                        <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                                            {toFixedWithoutRounding(data[topcard.name] / data["achat_neuf_weight"], 2)}
                                            <sub><small>prix/g</small></sub>
                                        </Typography>
                                    </Box>
                                </Box>
                            )
                        }
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default TopCards;
