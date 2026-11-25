import type {Config} from "../types/config.js";

let timeout = 5000

if(process.env.API_TIMEOUT_MS !== undefined) timeout = Number(process.env.API_TIMEOUT_MS)
if(!Number.isInteger(timeout) || timeout <= 0) throw new Error("timeout should be a positive integer");


export const config: Config = {
    API_TIMEOUT_MS: timeout,
}