import { DateRange } from "@mui/lab";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import analyticsService from "../../services/analytics.service";
import { RootState } from "../../types/types";
import { Analytic, AnalyticsState } from "./analytics.model";

export const fetchAnalyticsThunk = createAsyncThunk<
    Omit<AnalyticsState, 'loading'>,
    { dateRange: DateRange<number> } | undefined>(
        'transaction/analytics',
        async (payload, thunkApi) => {
            try {
                const dateRange: DateRange<number> = payload?.dateRange || (thunkApi.getState() as RootState).analytics.dateRange;
                const { transactionsAmountPerDay, transactionsAmountByStatus } = await analyticsService.loadTransactionsAnalytics(dateRange);
                const transactionsPerDay: Analytic = {};
                transactionsAmountPerDay.forEach((data: { date: string, count: string }) => {
                    const date = moment(data.date);
                    transactionsPerDay[date.format('MM/DD/YYYY')] = parseInt(data.count);
                });
                return { transactionsPerDay, transactionsAmountByStatus, dateRange };
            } catch (error: any) {
                return thunkApi.rejectWithValue(error.message);
            }
        }
    );

const initialState: AnalyticsState = {
    transactionsPerDay: {},
    transactionsAmountByStatus: {},
    dateRange: [moment().add(-7, 'd').valueOf(), moment().valueOf()],
    loading: false
};

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            return {
                ...state,
                dateRange: action.payload.dateRange
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnalyticsThunk.fulfilled, (state, action) => {
                state.transactionsPerDay = action.payload.transactionsPerDay;
                state.transactionsAmountByStatus = action.payload.transactionsAmountByStatus;
                state.dateRange = action.payload.dateRange;
                state.loading = false;
            })
            .addCase(fetchAnalyticsThunk.pending, (state, action) => {
                state.loading = true;
            })
    },
});
export const { setDateRange } = analyticsSlice.actions
const { reducer } = analyticsSlice;
export default reducer;