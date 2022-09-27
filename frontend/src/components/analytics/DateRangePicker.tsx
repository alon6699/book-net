import { DateRange, DateRangePicker } from '@mui/lab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAnalyticsDateRange } from '../../features/analytics/analytics.selectors';
import { fetchAnalyticsThunk } from '../../features/analytics/analytics.slice';

export default function BasicDateRangePicker() {
    const dateRage = useSelector(selectAnalyticsDateRange);
    const dispatch = useDispatch();
    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{ start: 'start', end: 'end' }}
        >
            <DateRangePicker
                value={dateRage}
                maxDate={moment()}
                onChange={(newValue) => {
                    if (newValue[0] && newValue[1]) {
                        dispatch(fetchAnalyticsThunk({ dateRange: [newValue[0]?.startOf('day').valueOf(), newValue[1]?.endOf('day').valueOf()] }));
                    }
                }}
                renderInput={(startProps, endProps) => (
                    <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                    </React.Fragment>
                )}
            />
        </LocalizationProvider>
    );
}