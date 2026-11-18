interface ApiOnlineResult {
    url: string
    status: "ONLINE"
    httpCode: number;
    responseTime: number;
}

interface ApiFailureResult {
    url: string
    status: "OFFLINE" | "ERROR";
    errorMessage: string;
}

type CheckApiResult = ApiOnlineResult | ApiFailureResult;

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

async function checkMultipleApis(urls: string[]): Promise<CheckApiResult[]> {

    return Promise.all(urls.map(url => checkApi(url)));

}

async function main(): Promise<void> {
    const args = process.argv
    const urls = args.slice(2)

    if(urls.length === 0) {
        console.error("At least one url is required")
        return
    }

    const responses = await checkMultipleApis(urls)
    for(const response of responses) {
        console.log('Checking url:', response.url)
        if(response.status !== "ONLINE") {
            console.log(`Api status: ${response.status}\nError: ${response.errorMessage}\n`);
            continue;
        }
        console.log(`Api status: ${response.status}\nHTTP status: ${response.httpCode}\nResponse time: ${response.responseTime} ms\n`)
    }

}

main()

