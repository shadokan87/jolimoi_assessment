import type { AxiosResponse } from "axios";
import { ConvertService } from "./convertService";

export type ApiResponse<T> = Promise<AxiosResponse<T>>;
const services = {
    convert: new ConvertService(import.meta.env.VITE_API_BASEURL)
}

export default services;