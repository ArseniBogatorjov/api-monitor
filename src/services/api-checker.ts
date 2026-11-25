import type {CheckApiResult} from "../types/api.js";
import {config} from "../config/index.js";
import {checkIsValidUrl} from "../validations/url-validation.js";

async function checkApi(url: string): Promise<CheckApiResult> {
    const isValidUrl = checkIsValidUrl(url);

    if(!isValidUrl) {
        return {
            url,
            status: 'ERROR',
            errorMessage: `Invalid URL`,
        }
    }

    const startTime = performance.now();
        try {
            const response = await fetch(url, {
                method: 'GET',
                signal: AbortSignal.timeout(config.API_TIMEOUT_MS)
            })

            const endTime = performance.now();
            const responseTime = Math.floor(endTime - startTime);

            if(!response.ok) {
                return {
                    url,
                    status: 'ERROR',
                    httpCode: response.status,
                    errorMessage: `HTTP error: ${response.status}`,
                    responseTime
                }
            }

            return {
                url,
                status: 'ONLINE',
                httpCode: response.status,
                responseTime,
            }
        } catch (error) {
            const endTime = performance.now();
            const responseTime = Math.floor(endTime - startTime);
            if(error instanceof Error && (error.name === 'TimeoutError' || error.name === 'TypeError')) {
                return {
                    url,
                    status: "OFFLINE",
                    errorMessage: error.message,
                    responseTime
                }
            } else {
                return {
                    url,
                    status: 'ERROR',
                    errorMessage: String(error),
                    responseTime
                }
            }
        }
    }


export async function checkMultipleApis(urls: string[]): Promise<CheckApiResult[]> {
    return Promise.all(urls.map(url => checkApi(url)));
}



