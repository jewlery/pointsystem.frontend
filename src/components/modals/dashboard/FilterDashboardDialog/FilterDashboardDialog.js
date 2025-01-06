import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import { fr } from 'date-fns/locale'; // Import French locale
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css';
import {useTheme} from "@mui/material/styles";
import moment from "moment"; // Theme CSS file

const FilterDashboardDialog = ({ open, onClose, onApply }) => {
    const theme = useTheme();
    // Initialiser l'état avec des valeurs par défaut
    const [selectionRange, setSelectionRange] = useState({
        startDate: moment().startOf('month').startOf('day').toDate(), // Default to undefined
        endDate: moment().endOf('month').startOf('day').toDate(),   // Default to undefined
        key: 'selection',
    });


    const handleSelect = (ranges) => {
        setSelectionRange(ranges.selection);
    };

    const handleApply = () => {
        onApply(selectionRange);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Sélectionner une plage de dates</DialogTitle>
            <DialogContent>
                <Box display="flex" justifyContent="center"> {/* Centering the DateRangePicker */}
                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                        locale={fr} // Set French locale here
                        rangeColors={[theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main]}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Annuler
                </Button>
                <Button onClick={handleApply} color="primary">
                    Appliquer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FilterDashboardDialog;
