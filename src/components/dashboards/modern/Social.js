import React from 'react';
import {Link} from 'react-router-dom';
import {Stack, Typography, Avatar, Box, AvatarGroup} from '@mui/material';
import {IconMessage2} from '@tabler/icons';

import DashboardCard from '../../shared/DashboardCard';
import User3Img from '../../../assets/images/profile/user-4.jpg';
import User4Img from '../../../assets/images/profile/user-5.jpg';
import {toFixedWithoutRounding} from "../../../utils/helper";

const Social = ({data}) => {
    return (
        <DashboardCard title="Partage des bénéfices" subtitle="bénéfice de alpha et de beta">
            <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Avatar
                        src={User3Img}
                        alt={User3Img}
                        sx={{borderRadius: '8px', width: 70, height: 70}}
                    />
                    <Box>
                        <Typography variant="h5">Alpha</Typography>
                        <Typography variant="subtitle2" color="green">
                            Capital vendu: {data['capital_vendu']}
                        </Typography>
                        <Typography variant="subtitle2" color="green">
                            + Benefice net: ({data['benefice_net']} * 0.75)
                        </Typography>
                        <Typography variant="subtitle2" color="green">
                            - Credit: {data['credit_alpha']}
                        </Typography>
                        <Typography variant="subtitle2" color="green">
                            - Chèque envoyé: {data['banque']}
                        </Typography>
                        <Typography variant="subtitle2" color="green">
                            - Tpe: {data['tpe']}
                        </Typography>
                        <Typography variant="subtitle2" color="green">
                            - Achat d'or neuf: {data['achat_neuf_total']}
                        </Typography>
                        <Typography variant="subtitle2" color="green">
                            - Achat d'or chedaya: {data['achat_chdaya_total']}
                        </Typography>

                        <Typography variant="h6" color="blue">
                            = {toFixedWithoutRounding(data['total_alpha'] || 0, 2)} DH
                        </Typography>

                        <Typography variant="subtitle2" color="black">
                            (Espèce: {toFixedWithoutRounding((data['total_alpha'] || 0) - data['cheque'], 2)} +
                            Chèque: {data['cheque']})
                        </Typography>
                    </Box>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Avatar
                        src={User4Img}
                        alt={User4Img}
                        sx={{borderRadius: '8px', width: 70, height: 70}}
                    />
                    <Box>
                        <Typography variant="h5">Beta</Typography>
                        <Typography variant="h6" color="blue">
                            {toFixedWithoutRounding((data['benefice_net'] * 0.25) - data['credit_haj'], 2)} DH
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </DashboardCard>
    );
};

export default Social;
