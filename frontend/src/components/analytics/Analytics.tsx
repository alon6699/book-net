import { DateRange } from "@mui/lab";
import {
    Grid,
    Paper
} from "@mui/material";
import {
    ArcElement,
    CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
    Tooltip
} from 'chart.js';
import { Moment } from "moment";
import { useCallback } from "react";
import { Line, Pie } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { Analytic } from "../../features/analytics/analytics.model";
import { selectAnalyticsDateRange, selectAnalyticsTransaction, selectAnalyticsTransactionStatus } from "../../features/analytics/analytics.selectors";
import BasicDateRangePicker from "./DateRangePicker";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true
};

const getDaysBetweenDates = (startDate: Moment, endDate: Moment) => {
    const now = startDate.clone();
    const dates = [];
    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format('MM/DD/YYYY'));
        now.add(1, 'days');
    }
    return dates;
};

const Analytics = () => {
    const analytics: Analytic = useSelector(selectAnalyticsTransaction);
    const transactionsAmountByStatus: Analytic = useSelector(selectAnalyticsTransactionStatus);
    const dateRage: DateRange<Moment> = useSelector(selectAnalyticsDateRange);
    const labels = getDaysBetweenDates(dateRage[0]!, dateRage[1]!);
    const calculateAmounts = useCallback(
        (): number[] => labels.map(label => analytics[label] || 0)
        , [analytics, labels]
    );
    const data = {
        labels,
        datasets: [
            {
                label: 'transactions created',
                data: calculateAmounts(),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }
        ],
    };

    const data1 = {
        labels: Object.keys(transactionsAmountByStatus),
        datasets: [
            {
                label: '# of Votes',
                data: Object.values(transactionsAmountByStatus),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <Grid container paddingX={2} marginTop={2} columnSpacing={0}>
            <Grid item xs={6}>
                <Paper
                    elevation={3}
                    sx={{
                        margin: 'auto',
                        padding: 2,
                        maxWidth: '100%',
                        flexGrow: 1
                    }}
                >
                    <BasicDateRangePicker></BasicDateRangePicker>
                    <Line options={options} data={data} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={3}
                    sx={{
                        margin: 'auto',
                        maxWidth: '70%',
                        padding: 2,
                        flexGrow: 2,
                        flexDirection: 'column'
                    }}
                >
                    <Pie options={options} data={data1} />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Analytics;
