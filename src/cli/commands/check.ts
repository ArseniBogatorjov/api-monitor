import {checkMultipleApis} from "../../services/api-checker.js";

export async function checkCommand(urls: string[], timeout:  number | undefined): Promise<void> {
  if(urls.length === 0) {
    console.error('At least one url is required')
    return
  }
  const responses = await checkMultipleApis(urls, timeout)
  for (const response of responses) {
    console.log("Checking url:", response.url);
    console.log("Api status:", response.status);

    if (response.httpCode !== undefined) {
      console.log("HTTP code:", response.httpCode);
    }

    if (response.responseTime !== undefined) {
      console.log("Response time:", `${response.responseTime} ms`);
    }

    if (response.status !== "ONLINE") {
      console.log("Error:", response.errorMessage);
    }

    console.log();
  }
}