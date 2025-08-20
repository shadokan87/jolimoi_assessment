import type { AxiosResponse } from "axios";
import { ConvertService } from "./convertService";

export type SseCallback<T> = {
    success: (data: T) => void,
    error: (e: Event) => void,
    timeout: () => void
}

const services = {
    convert: new ConvertService(import.meta.env.VITE_API_BASEURL)
}

export default services;