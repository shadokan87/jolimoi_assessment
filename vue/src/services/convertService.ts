import type { SubmitNumberSchema } from "@/schema/submitNumber";
import axios, { type AxiosResponse } from "axios";
import { success } from "zod";
import type { SseCallback } from ".";

export interface IConvertService {
    numberToRomanNumeral(query: SubmitNumberSchema, sse: SseCallback<SubmitNumberSchema>): Promise<void>
}

export class ConvertService implements IConvertService {
    constructor(private baseUrl: string) { }

    /**
     * Converts an integer value in the query to its Roman numeral representation by calling the backend API.
     * @param query - The input object containing the number to convert.
     * @returns A promise resolving to the API response with the Roman numeral result.
     */
    async numberToRomanNumeral(query: SubmitNumberSchema, sse: SseCallback<SubmitNumberSchema>) {
        await new Promise(resolve => setTimeout(resolve, 700));
        const eventSource = new EventSource(`${this.baseUrl}/api/convert?userInput=${query.userInput}`);

        // Set a timeout for 5 seconds
        const timeoutId = setTimeout(() => {
            sse.timeout();
            eventSource.close();
        }, 5000);

        eventSource.onmessage = (event) => {
            clearTimeout(timeoutId);
            const data = JSON.parse(event.data) as { result: SubmitNumberSchema };
            sse.success(data.result);
            eventSource.close();
        };

        eventSource.onerror = (e) => {
            clearTimeout(timeoutId);
            sse.error(e);
            eventSource.close();
        };
    }
}