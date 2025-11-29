import axios from "axios";

import { DATASOURCE_URL } from "@/config/constant";

export const request = axios.create({
    paramsSerializer: params => new URLSearchParams(params).toString(),
    headers: { Accept: "application/json" },
    validateStatus: status => status <= 500,
    baseURL: DATASOURCE_URL,
});
