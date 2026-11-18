import type {CheckApiResult} from "../types/api.js";

async function checkApi(url: string): Promise<CheckApiResult> {
    const startTime = performance.now();

    try {
        const response = await fetch(url, {
            method: 'GET',
            signal: AbortSignal.timeout(5000)
        })

        const endTime = performance.now();
        const responseTime = Math.floor(endTime - startTime);

        return {
            url,
            status: 'ONLINE',
            httpCode: response.status,
            responseTime,
        }
    } catch (error) {
        if(error instanceof Error) {
            return {
                url,
                status: "OFFLINE",
                errorMessage: error.message,
            }
        } else {
            return {
                url,
                status: 'ERROR',
                errorMessage: String(error)
            }
        }
    }
}

export async function checkMultipleApis(urls: string[]): Promise<CheckApiResult[]> {
    return Promise.all(urls.map(url => checkApi(url)));
}



