import { axiosInstance } from "../utils/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { config } from "../config/config";
import { DateRange } from "@mui/lab";

const loadTransactionsAnalytics = (timeRange: DateRange<number>) => {
    return axiosInstance.get(`${config.apiUrl}/transaction/analytics?from=${timeRange[0]}&to=${timeRange[1]}`).then((response: AxiosResponse) => {
        return response.data;
    }).catch((error: AxiosError) => {
        throw new Error(`Something went wrong while trying to load analytics, ${(error.response ? error.response?.data?.message : error.message)}`);
    })
}

const analyticsService = {
    loadTransactionsAnalytics
};

export default analyticsService;