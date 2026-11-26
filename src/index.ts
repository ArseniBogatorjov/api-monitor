import "dotenv/config";
import {checkMultipleApis} from "./services/api-checker.js"
import {getCliArgs, parseCliArgs} from "./cli/args.js";

async function main(): Promise<void> {
  const args = getCliArgs()
  const parsedArgs = parseCliArgs(args)
  const urls = parsedArgs.urls

  switch(parsedArgs.command) {
    case 'check': {
      if(urls.length === 0) {
        console.error('At least one url is required')
        return
      }
      const responses = await checkMultipleApis(urls)
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
      break;
    }
    case 'help': {
      // TODO: make normal help list
      console.log('Possible commands:\ncheck http://api.example-url\nhelp')
      break
    }
    default: {
      console.error('Invalid command, type help to list list of commands')
      break
    }
  }

}

main()

