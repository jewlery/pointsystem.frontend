import React from 'react';
import { IconEdit, IconTrash, IconDotsVertical } from '@tabler/icons';
import {
    TableCell,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material';

const ActionButtons = ({ row, onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        onEdit(row);
        handleClose();
    };

    const handleDelete = () => {
        onDelete(row.id);
        handleClose();
    };

    return (
        <>
            <Tooltip title="Actions">
                <IconButton
                    aria-controls="action-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <IconDotsVertical width="16" />
                </IconButton>
            </Tooltip>
            <Menu
                id="action-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEdit}>
                    <IconEdit style={{ marginRight: '8px' }} />
                    Modifier
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <IconTrash style={{ marginRight: '8px' }} />
                    Supprimer
                </MenuItem>
            </Menu>
        </>
    );
};

export default ActionButtons;
