import {checkMultipleApis} from "./services/api-checker.js"

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

