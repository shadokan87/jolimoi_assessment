import type { SubmitNumberSchema } from "@/schema/submitNumber";
import axios, { type AxiosResponse } from "axios";
import type { ApiResponse } from ".";

export interface IConvertService {
    numberToRomanNumeral(query: SubmitNumberSchema): ApiResponse<{result: SubmitNumberSchema}>
}

export class ConvertService implements IConvertService {
    constructor(private baseUrl: string) {}

    /**
     * Converts an integer value in the query to its Roman numeral representation by calling the backend API.
     * @param query - The input object containing the number to convert.
     * @returns A promise resolving to the API response with the Roman numeral result.
     */
    async numberToRomanNumeral(query: SubmitNumberSchema): ApiResponse<{result: SubmitNumberSchema}> {
        await new Promise(resolve => setTimeout(resolve, 700));
        return await axios.post(`${this.baseUrl}/api/convert`, {
            ...query
        });
    }
}