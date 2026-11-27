export interface CliArgsObj {
  command: "check" | "help",
  urls: string[],
  options: {
    timeout?: number
  }
}

