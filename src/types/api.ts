interface ApiOnlineResult {
    url: string
    status: "ONLINE"
    httpCode: number;
    responseTime: number;
}

interface ApiFailureResult {
    url: string
    status: "OFFLINE" | "ERROR";
    httpCode?: number;
    responseTime?: number;
    errorMessage: string;
}

export type CheckApiResult = ApiOnlineResult | ApiFailureResult;