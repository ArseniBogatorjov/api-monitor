interface ApiOnlineResult {
    status: "ONLINE"
    httpCode: number;
    responseTime: number;
}

interface ApiFailureResult {
    status: "OFFLINE" | "ERROR";
    errorMessage: string;
}

type CheckApiResult = ApiOnlineResult | ApiFailureResult;

async function checkApi(url: string): Promise<CheckApiResult> {
    if(!url) {
        return { status: 'ERROR', errorMessage: 'Url not given'};
    }

    const startTime = performance.now();

    try {
        const response = await fetch(url, {
            method: 'GET',
            signal: AbortSignal.timeout(5000)
        })

        const endTime = performance.now();
        const responseTime = Math.floor(endTime - startTime);

        return {
            status: 'ONLINE',
            httpCode: response.status,
            responseTime,
        }

    } catch (error) {
        if(error instanceof Error) {
            return {
                status: "OFFLINE",
                errorMessage: error.message,
            }
        } else {
            return {
                status: 'ERROR',
                errorMessage: String(error)
            }
        }
    }

}

async function main(): Promise<void> {
    const args = process.argv
    const url = args[2]

    if(!url) {
        console.error("Url is required")
        return
    }


    const response = await checkApi(url);


    if(response.status !== "ONLINE") {
        console.log(`Api status: ${response.status}\nError: ${response.errorMessage}`);
        return;
    }

    console.log(`Api status: ${response.status}\nHTTP status: ${response.httpCode}\nResponse time: ${response.responseTime} ms`)
}

main()

