import { DateRange } from "@mui/lab";
import { createSelector } from "@reduxjs/toolkit";
import moment from "moment";
import { Moment } from "moment";
import { RootState } from "../../types/types";
import { Analytic, AnalyticsState } from "./analytics.model";

const selectAnalyticsState = (state: RootState): AnalyticsState => state.analytics;

export const selectAnalyticsTransaction = createSelector(
    [selectAnalyticsState],
    (analyticsState: AnalyticsState): Analytic => analyticsState.transactionsPerDay
);

export const selectAnalyticsTransactionStatus = createSelector(
    [selectAnalyticsState],
    (analyticsState: AnalyticsState): Analytic => analyticsState.transactionsAmountByStatus
);

export const selectAnalyticsDateRange = createSelector(
    [selectAnalyticsState],
    (analyticsState: AnalyticsState): DateRange<Moment> => analyticsState.dateRange.map(date => moment(date)) as DateRange<Moment>
);
