import type {CliArgsObj} from "../types/cli-args.js";

export function getCliArgs(): string[] {
  return process.argv.slice(2)
}

export function parseCliArgs(args: string[]): CliArgsObj {
  const [command, ...rest] = args

  if(command === undefined) {
    throw new Error("No command given")
  }

  return {
    command,
    urls: rest,
    options: {}
  }
}