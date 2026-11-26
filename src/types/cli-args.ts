export interface CliArgsObj {
  // TODO: make strict command types
  command: string,
  urls: string[],
  options: {
    timeout?: number
  }
}