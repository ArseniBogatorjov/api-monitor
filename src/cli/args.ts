import type {CliArgsObj} from "../types/cli-args.js";

export function getCliArgs(): string[] {
  return process.argv.slice(2)
}

export function parseCliArgs(args: string[]): CliArgsObj {
  const [command, ...rest] = args

  if(command === undefined) {
    throw new Error("No command given")
  }

  if(command !== 'help' && command !== 'check') {
    throw new Error('Invalid command given')
  }

  let options: CliArgsObj['options'] = {}
  const urls: string[] = []

  for(let i = 0; i < rest.length; i++) {
    const arg = rest[i]

    if(arg === undefined) {
      throw new Error("No url or options given")
    }

    if(arg === '--timeout') {
      if(rest[i + 1] === undefined) {
        throw new Error('No value passed for option')
      }
      const optionValue = Number(rest[i + 1])

      if(Number.isNaN(optionValue)) {
        throw new Error('Invalid option value')
      } else if (!Number.isInteger(optionValue) || optionValue <= 0) {
        throw new Error('Option value must be a positive Integer')
      }

      options.timeout = optionValue

      i++
    } else {
      urls.push(arg)
    }
  }

  return {
    command,
    urls,
    options
  }
}