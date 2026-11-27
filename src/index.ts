import "dotenv/config";
import {getCliArgs, parseCliArgs} from "./cli/args.js";
import {checkCommand} from "./cli/commands/check.js";
import {helpCommand} from "./cli/commands/help.js";

async function main(): Promise<void> {
  try {
    const args = getCliArgs()
    const parsedArgs = parseCliArgs(args)
    const urls = parsedArgs.urls

    switch(parsedArgs.command) {
      case 'check': {
        await checkCommand(urls, parsedArgs.options.timeout)
        break
      }
      case 'help': {
        // TODO: make normal help list
        helpCommand()
        break
      }
    }
  } catch(error) {
    if(error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(String(error))
    }
    process.exit(1)
  }

}

main()

