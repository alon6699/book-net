import { DateRange } from "@mui/lab";
import { Dictionary } from "@reduxjs/toolkit";

export type Analytic = Dictionary<number>;

export interface AnalyticsState {
    transactionsPerDay: Analytic;
    transactionsAmountByStatus: Analytic;
    dateRange: DateRange<number>;
    loading: boolean;
}
